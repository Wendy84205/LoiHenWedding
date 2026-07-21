import { allowMethod, authorizeOrderAccess, createGuestToken, getPublicOrigin, getServiceClient, requireAdmin, sendError, signAssetUrls } from '../server/commerce.js';
import { deleteOrderSchema, updateOrderSchema } from '../server/validators.js';
import { createScenePatch } from '../src/commerce/scene/sceneSchema.js';
import { getSceneTemplate } from '../src/commerce/scene/sceneTemplates.js';

function groupBy(items, key) {
  return items.reduce((groups, item) => {
    const value = item[key];
    if (!groups.has(value)) groups.set(value, []);
    groups.get(value).push(item);
    return groups;
  }, new Map());
}

async function loadOrder(supabase, orderId) {
  const { data: order, error } = await supabase
    .from('orders')
    .select('id, public_id, package_code, template_slug, status, amount_total, deposit_amount, deposit_status, revision_limit, revision_count, customer_note, internal_note, expires_at, created_at, updated_at, customers(id, full_name, email, phone, zalo), invitations(id, slug, template_slug, status, content, theme, design, draft_content, draft_theme, draft_design, draft_version, seo_title, seo_description, published_at, expires_at)')
    .eq('id', orderId)
    .single();
  if (error || !order) {
    const notFound = new Error('Không tìm thấy đơn hàng.');
    notFound.statusCode = 404;
    throw notFound;
  }

  const invitation = Array.isArray(order.invitations) ? order.invitations[0] : order.invitations;
  if (invitation) {
    invitation.live_content = invitation.content;
    invitation.live_theme = invitation.theme;
    invitation.live_design = invitation.design;
    invitation.content = invitation.draft_content || invitation.content;
    invitation.theme = invitation.draft_theme || invitation.theme;
    invitation.design = invitation.draft_design || invitation.design;
    delete invitation.draft_content;
    delete invitation.draft_theme;
    delete invitation.draft_design;
  }
  if (order.status === 'published' && invitation?.expires_at && new Date(invitation.expires_at).getTime() <= Date.now()) order.status = 'expired';
  const invitationId = invitation?.id;
  const [{ data: events }, { data: assets }, { data: payments }, { data: revisions }, { data: rsvps }, { data: wishes }, { data: guests }] = await Promise.all([
    invitationId ? supabase.from('events').select('*').eq('invitation_id', invitationId).order('sort_order') : { data: [] },
    supabase.from('assets').select('*').eq('order_id', orderId).order('kind').order('sort_order'),
    supabase.from('payments').select('id, provider, status, amount, reference, paid_at, created_at').eq('order_id', orderId).order('created_at', { ascending: false }),
    supabase.from('revisions').select('*').eq('order_id', orderId).order('created_at', { ascending: false }),
    invitationId ? supabase.from('rsvps').select('id, full_name, phone, attendance, party_size, note, created_at').eq('invitation_id', invitationId).order('created_at', { ascending: false }) : { data: [] },
    invitationId ? supabase.from('wishes').select('id, full_name, message, is_approved, created_at').eq('invitation_id', invitationId).order('created_at', { ascending: false }) : { data: [] },
    invitationId ? supabase.from('guests').select('id, full_name, phone, group_name, invited_count, created_at').eq('invitation_id', invitationId).order('created_at') : { data: [] },
  ]);
  const base = getPublicOrigin();
  const personalizedGuests = (guests || []).map((guest) => ({ ...guest, personal_url: `${base}/w/${invitation.slug}?guest=${encodeURIComponent(createGuestToken(guest.id, invitation.id))}` }));
  return { ...order, invitation, events: events || [], assets: await signAssetUrls(supabase, assets || []), payments: payments || [], revisions: revisions || [], rsvps: rsvps || [], wishes: wishes || [], guests: personalizedGuests };
}

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['GET', 'PATCH', 'DELETE'])) return;
  try {
    const supabase = getServiceClient();
    const orderId = String(req.query.id || req.body?.orderId || '');

    if (req.method === 'DELETE') {
      const { profile } = await requireAdmin(req, supabase);
      if (profile.role !== 'admin') {
        const forbidden = new Error('Chỉ quản trị viên chính có thể xóa vĩnh viễn đơn hàng.');
        forbidden.statusCode = 403;
        throw forbidden;
      }
      const input = deleteOrderSchema.parse(req.body || {});
      const { data: target, error: targetError } = await supabase
        .from('orders')
        .select('id, public_id, customer_id')
        .eq('id', input.orderId)
        .single();
      if (targetError || !target) {
        const notFound = new Error('Không tìm thấy đơn hàng.');
        notFound.statusCode = 404;
        throw notFound;
      }
      if (input.confirmPublicId !== target.public_id) {
        const invalidConfirmation = new Error('Mã xác nhận không khớp với đơn hàng.');
        invalidConfirmation.statusCode = 409;
        throw invalidConfirmation;
      }

      const [{ data: assets, error: assetError }, { data: reservations, error: reservationError }] = await Promise.all([
        supabase.from('assets').select('storage_bucket, storage_path').eq('order_id', input.orderId),
        supabase.from('asset_upload_reservations').select('storage_path').eq('order_id', input.orderId),
      ]);
      if (assetError || reservationError) throw assetError || reservationError;
      const cleanupRows = [
        ...(assets || []).map((asset) => ({ order_id: input.orderId, storage_bucket: asset.storage_bucket, storage_path: asset.storage_path })),
        ...(reservations || []).map((reservation) => ({ order_id: input.orderId, storage_bucket: 'order-assets', storage_path: reservation.storage_path })),
      ].filter((item, index, values) => values.findIndex((candidate) => candidate.storage_bucket === item.storage_bucket && candidate.storage_path === item.storage_path) === index);
      if (cleanupRows.length) {
        const { error: jobError } = await supabase.from('asset_cleanup_jobs').upsert(cleanupRows, { onConflict: 'storage_bucket,storage_path' });
        if (jobError) throw jobError;
      }

      const { error: deleteError } = await supabase.from('orders').delete().eq('id', input.orderId);
      if (deleteError) {
        if (cleanupRows.length) await supabase.from('asset_cleanup_jobs').delete().eq('order_id', input.orderId).eq('status', 'pending');
        throw deleteError;
      }

      let storageCleanupPending = false;
      for (const [bucket, rows] of groupBy(cleanupRows, 'storage_bucket')) {
        const { error: storageError } = await supabase.storage.from(bucket).remove(rows.map((item) => item.storage_path));
        if (storageError) {
          storageCleanupPending = true;
          await supabase.from('asset_cleanup_jobs').update({
            attempts: 1,
            last_error: String(storageError.message || 'Storage cleanup failed').slice(0, 1000),
          }).eq('order_id', input.orderId).eq('storage_bucket', bucket);
        } else {
          await supabase.from('asset_cleanup_jobs').update({
            status: 'completed',
            completed_at: new Date().toISOString(),
          }).eq('order_id', input.orderId).eq('storage_bucket', bucket);
        }
      }

      const [{ count: remainingOrders }, { data: customer }] = await Promise.all([
        supabase.from('orders').select('id', { count: 'exact', head: true }).eq('customer_id', target.customer_id),
        supabase.from('customers').select('auth_user_id').eq('id', target.customer_id).maybeSingle(),
      ]);
      if (!remainingOrders && !customer?.auth_user_id) await supabase.from('customers').delete().eq('id', target.customer_id);
      res.status(200).json({ ok: true, storageCleanupPending });
      return;
    }

    const role = await authorizeOrderAccess(req, supabase, orderId);

    if (req.method === 'GET') {
      const order = await loadOrder(supabase, orderId);
      if (role !== 'staff') {
        delete order.internal_note;
      }
      res.status(200).json({ order });
      return;
    }

    if (role === 'customer') {
      const message = String(req.body?.revisionMessage || '').trim().slice(0, 2000);
      const customerNote = String(req.body?.customerNote || '').trim().slice(0, 2000);
      if (!message && !customerNote) {
        const invalid = new Error('Không có nội dung cần cập nhật.');
        invalid.statusCode = 400;
        throw invalid;
      }
      if (customerNote) await supabase.from('orders').update({ customer_note: customerNote }).eq('id', orderId);
      if (message) {
        const { error: revisionError } = await supabase.rpc('request_order_revision', { p_order_id: orderId, p_message: message });
        if (revisionError?.message?.includes('revision_limit_reached')) {
          const limitReached = new Error('Đơn hàng đã sử dụng hết số lần chỉnh sửa trong gói.');
          limitReached.statusCode = 409;
          throw limitReached;
        }
        if (revisionError) throw revisionError;
      }
    } else {
      const update = updateOrderSchema.parse(req.body || {});
      const orderPatch = {};
      if (update.status) orderPatch.status = update.status;
      if (update.depositStatus) orderPatch.deposit_status = update.depositStatus;
      if (update.customerNote !== undefined) orderPatch.customer_note = update.customerNote || null;
      if (update.internalNote !== undefined) orderPatch.internal_note = update.internalNote || null;
      if (Object.keys(orderPatch).length) {
        const { error } = await supabase.from('orders').update(orderPatch).eq('id', orderId);
        if (error) throw error;
      }
      if (update.depositStatus) {
        const paymentPatch = { status: update.depositStatus };
        if (update.depositStatus === 'paid') paymentPatch.paid_at = new Date().toISOString();
        const { error } = await supabase.from('payments').update(paymentPatch).eq('order_id', orderId);
        if (error) throw error;
      }

      if (update.content || update.seoTitle !== undefined || update.seoDescription !== undefined) {
        const invitationPatch = {};
        if (update.seoTitle !== undefined) invitationPatch.seo_title = update.seoTitle || null;
        if (update.seoDescription !== undefined) invitationPatch.seo_description = update.seoDescription || null;
        if (Object.keys(invitationPatch).length) {
          const { error } = await supabase.from('invitations').update(invitationPatch).eq('order_id', orderId);
          if (error) throw error;
        }
        if (update.content) {
          const { data: currentInvitation, error: currentError } = await supabase.from('invitations').select('draft_version, draft_theme, draft_design, template_slug').eq('order_id', orderId).single();
          if (currentError) throw currentError;
          const currentTemplate = getSceneTemplate(currentInvitation.template_slug);
          const { error: draftError } = await supabase.rpc('save_invitation_draft', {
            p_order_id: orderId,
            p_expected_version: currentInvitation.draft_version,
            p_content: update.content,
            p_theme: currentInvitation.draft_theme || {},
            p_design: currentInvitation.draft_design || (currentTemplate ? createScenePatch(currentTemplate) : null),
            p_created_by: 'staff',
          });
          if (draftError) throw draftError;
        }
        if (update.content?.event) {
          const { data: invitationRow, error: invitationError } = await supabase.from('invitations').select('id').eq('order_id', orderId).single();
          if (invitationError) throw invitationError;
          const eventPatch = {
            starts_at: update.content.event.startsAt,
            venue_name: update.content.event.venueName,
            address: update.content.event.address,
            map_url: update.content.event.mapUrl,
          };
          const { error: eventError } = await supabase.from('events').update(eventPatch).eq('invitation_id', invitationRow.id).eq('sort_order', 0);
          if (eventError) throw eventError;
        }
      }
    }

    res.status(200).json({ order: await loadOrder(supabase, orderId) });
  } catch (error) {
    sendError(res, error);
  }
}

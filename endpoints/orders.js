import { allowMethod, createAccessToken, createPublicOrderId, getBearerToken, getClientAddress, getServiceClient, hashValue, requireAdmin, requireUser, sendError } from '../server/commerce.js';
import { createOrderSchema } from '../server/validators.js';
import { buildInitialInvitationContent, commercePackages, slugifyWedding } from '../src/commerce/invitationContent.js';
import { createScenePatch } from '../src/commerce/scene/sceneSchema.js';
import { getSceneTemplate } from '../src/commerce/scene/sceneTemplates.js';
import { escapeEmailHtml, getNotificationConfiguration, sendTransactionalEmailSafely } from '../server/notifications.js';

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['GET', 'POST'])) return;

  try {
    const supabase = getServiceClient();

    if (req.method === 'GET') {
      await requireAdmin(req, supabase);
      const { data, error } = await supabase
        .from('orders')
        .select('id, public_id, package_code, template_slug, status, amount_total, deposit_amount, deposit_status, revision_limit, revision_count, expires_at, created_at, updated_at, customers(id, full_name, email, phone, zalo), invitations(id, slug, status, published_at)')
        .order('created_at', { ascending: false })
        .limit(250);
      if (error) throw error;
      res.status(200).json({ orders: data || [] });
      return;
    }

    const input = createOrderSchema.parse(req.body || {});
    const packageInfo = commercePackages[input.packageCode];
    const sourceHash = hashValue(getClientAddress(req));
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count: recentOrders, error: rateError } = await supabase.from('orders').select('id', { count: 'exact', head: true }).eq('source_hash', sourceHash).gte('created_at', oneHourAgo);
    if (rateError) throw rateError;
    if ((recentOrders || 0) >= 5) {
      const limited = new Error('Bạn đã gửi nhiều yêu cầu trong thời gian ngắn. Vui lòng liên hệ trực tiếp với studio.');
      limited.statusCode = 429;
      throw limited;
    }
    const accessToken = createAccessToken();
    const previewToken = accessToken;
    const publicId = createPublicOrderId();
    const initialSlug = `${slugifyWedding(`${input.groomName}-${input.brideName}`) || 'thiep-cuoi'}-${publicId.slice(-6).toLowerCase()}`;
    const expiresAt = new Date();
    expiresAt.setMonth(expiresAt.getMonth() + packageInfo.retentionMonths);

    const accountUser = getBearerToken(req) ? await requireUser(req, supabase) : null;
    let customerId = null;
    let customerCreated = false;
    let orderId = null;
    try {
      if (accountUser) {
        const { data: existingCustomer, error: existingError } = await supabase.from('customers').select('id').eq('auth_user_id', accountUser.id).maybeSingle();
        if (existingError) throw existingError;
        if (existingCustomer) {
          customerId = existingCustomer.id;
          const { error: updateCustomerError } = await supabase.from('customers').update({
            full_name: input.fullName,
            email: input.email || accountUser.email || null,
            phone: input.phone,
            zalo: input.zalo || null,
            consent_at: new Date().toISOString(),
          }).eq('id', customerId);
          if (updateCustomerError) throw updateCustomerError;
        }
      }
      if (!customerId) {
        const { data: customer, error: customerError } = await supabase
          .from('customers')
          .insert({
            auth_user_id: accountUser?.id || null,
            full_name: input.fullName,
            email: input.email || accountUser?.email || null,
            phone: input.phone,
            zalo: input.zalo || null,
            consent_at: new Date().toISOString(),
          })
          .select('id')
          .single();
        if (customerError) throw customerError;
        customerId = customer.id;
        customerCreated = true;
      }

      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          public_id: publicId,
          customer_id: customerId,
          package_code: input.packageCode,
          template_slug: input.templateSlug,
          status: 'awaiting_deposit',
          amount_total: packageInfo.amount,
          deposit_amount: packageInfo.depositAmount,
          access_token_hash: hashValue(accessToken),
          source_hash: sourceHash,
          revision_limit: packageInfo.revisionLimit,
          customer_note: input.customerNote || null,
          expires_at: expiresAt.toISOString(),
        })
        .select('id')
        .single();
      if (orderError) throw orderError;
      orderId = order.id;

      const content = buildInitialInvitationContent(input);
      const design = createScenePatch(getSceneTemplate(input.templateSlug));
      const { data: invitation, error: invitationError } = await supabase
        .from('invitations')
        .insert({
          order_id: orderId,
          slug: initialSlug,
          template_slug: input.templateSlug,
          content,
          draft_content: content,
          draft_theme: {},
          draft_design: design,
          preview_token_hash: hashValue(accessToken),
          seo_title: `${input.groomName} & ${input.brideName} | Thiệp cưới`,
          seo_description: input.invitationMessage || content.copy.intro,
          expires_at: expiresAt.toISOString(),
        })
        .select('id, slug')
        .single();
      if (invitationError) throw invitationError;

      const { error: versionError } = await supabase.from('invitation_versions').insert({
        invitation_id: invitation.id,
        version: 1,
        content,
        theme: {},
        design,
        template_slug: input.templateSlug,
        created_by: 'customer',
      });
      if (versionError) throw versionError;

      const startsAt = content.event.startsAt;
      const { error: eventError } = await supabase.from('events').insert({
        invitation_id: invitation.id,
        name: 'Lễ thành hôn',
        starts_at: startsAt,
        venue_name: input.venueName,
        address: input.address,
        map_url: content.event.mapUrl,
      });
      if (eventError) throw eventError;

      const { error: paymentError } = await supabase.from('payments').insert({
        order_id: orderId,
        amount: packageInfo.depositAmount,
        status: 'pending',
      });
      if (paymentError) throw paymentError;

      const origin = process.env.PUBLIC_SITE_URL || 'https://thiep-moi-online.vercel.app';
      const customerEmail = input.email || accountUser?.email || '';
      const notification = getNotificationConfiguration();
      const customerPortalUrl = `${origin}/don-hang/${orderId}?token=${encodeURIComponent(accessToken)}`;
      const adminUrl = `${origin}/admin/orders/${orderId}`;
      await Promise.all([
        sendTransactionalEmailSafely({
          to: notification.studioEmail,
          subject: `[${publicId}] Đơn thiệp cưới mới`,
          text: `${input.fullName} vừa đặt mẫu ${input.templateSlug}. Ngày cưới: ${input.eventDate} ${input.eventTime}. Mở đơn: ${adminUrl}`,
          html: `<h1>Đơn thiệp cưới mới</h1><p><strong>${escapeEmailHtml(publicId)}</strong></p><p>Khách: ${escapeEmailHtml(input.fullName)} · ${escapeEmailHtml(input.phone)}</p><p>Mẫu: ${escapeEmailHtml(input.templateSlug)} · Gói: ${escapeEmailHtml(packageInfo.name)}</p><p>Ngày cưới: ${escapeEmailHtml(input.eventDate)} ${escapeEmailHtml(input.eventTime)}</p><p><a href="${escapeEmailHtml(adminUrl)}">Mở đơn trong quản trị</a></p>`,
          idempotencyKey: `${orderId}-created-studio`,
        }),
        customerEmail ? sendTransactionalEmailSafely({
          to: customerEmail,
          subject: `${publicId} · Lời Hẹn đã nhận yêu cầu của bạn`,
          text: `Lời Hẹn đã nhận yêu cầu thiệp của ${input.groomName} & ${input.brideName}. Link quản lý riêng: ${customerPortalUrl}`,
          html: `<h1>Lời Hẹn đã nhận yêu cầu</h1><p>Mã đơn: <strong>${escapeEmailHtml(publicId)}</strong></p><p>Thiệp của ${escapeEmailHtml(input.groomName)} &amp; ${escapeEmailHtml(input.brideName)}</p><p><a href="${escapeEmailHtml(customerPortalUrl)}">Mở cổng quản lý riêng</a></p><p>Không chuyển tiếp link này cho người khác.</p>`,
          idempotencyKey: `${orderId}-created-customer`,
        }) : Promise.resolve({ sent: false, skipped: true }),
      ]);

      res.status(201).json({
        orderId,
        publicId,
        accessToken,
        previewToken,
        invitationSlug: invitation.slug,
        status: 'awaiting_deposit',
        amountTotal: packageInfo.amount,
        depositAmount: packageInfo.depositAmount,
      });
    } catch (error) {
      if (orderId) await supabase.from('orders').delete().eq('id', orderId);
      if (customerCreated && customerId) await supabase.from('customers').delete().eq('id', customerId);
      throw error;
    }
  } catch (error) {
    sendError(res, error);
  }
}

import crypto from 'node:crypto';
import { allowMethod, authorizeOrderAccess, enforceAssetQuota, getServiceClient, sendError } from '../server/commerce.js';
import { cancelUploadSchema, uploadSchema } from '../server/validators.js';

function safeName(value) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9._-]+/g, '-').slice(-120);
}

async function removeExpiredReservations(supabase, orderId) {
  const { data, error } = await supabase
    .from('asset_upload_reservations')
    .select('id, storage_path')
    .eq('order_id', orderId)
    .eq('status', 'pending')
    .lte('expires_at', new Date().toISOString())
    .limit(20);
  if (error) throw error;
  if (!data?.length) return;
  await supabase.storage.from('order-assets').remove(data.map((item) => item.storage_path));
  const { error: updateError } = await supabase
    .from('asset_upload_reservations')
    .update({ status: 'expired' })
    .in('id', data.map((item) => item.id));
  if (updateError) throw updateError;
}

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['POST', 'DELETE'])) return;
  try {
    const supabase = getServiceClient();
    if (req.method === 'DELETE') {
      const input = cancelUploadSchema.parse(req.body || {});
      await authorizeOrderAccess(req, supabase, input.orderId);
      const { data: reservation, error: reservationError } = await supabase
        .from('asset_upload_reservations')
        .select('id, storage_path, status')
        .eq('id', input.uploadId)
        .eq('order_id', input.orderId)
        .maybeSingle();
      if (reservationError) throw reservationError;
      if (reservation?.status === 'pending') {
        await supabase.storage.from('order-assets').remove([reservation.storage_path]);
        const { error: cancelError } = await supabase
          .from('asset_upload_reservations')
          .update({ status: 'cancelled' })
          .eq('id', reservation.id)
          .eq('status', 'pending');
        if (cancelError) throw cancelError;
      }
      res.status(200).json({ ok: true });
      return;
    }
    const input = uploadSchema.parse(req.body || {});
    await authorizeOrderAccess(req, supabase, input.orderId);
    await removeExpiredReservations(supabase, input.orderId);

    const [{ count: pendingCount, error: pendingError }, { count: recentCount, error: recentError }] = await Promise.all([
      supabase.from('asset_upload_reservations').select('id', { count: 'exact', head: true })
        .eq('order_id', input.orderId).eq('status', 'pending').gt('expires_at', new Date().toISOString()),
      supabase.from('asset_upload_reservations').select('id', { count: 'exact', head: true })
        .eq('order_id', input.orderId).gte('created_at', new Date(Date.now() - 60 * 60 * 1000).toISOString()),
    ]);
    if (pendingError || recentError) throw pendingError || recentError;
    if ((pendingCount || 0) >= 6 || (recentCount || 0) >= 24) {
      const limited = new Error('Bạn đang có quá nhiều lượt tải lên. Hãy hoàn tất các tệp hiện tại rồi thử lại.');
      limited.statusCode = 429;
      throw limited;
    }
    await enforceAssetQuota(supabase, input.orderId, input.kind, input.byteSize);

    const path = `${input.orderId}/${input.kind}/${crypto.randomUUID()}-${safeName(input.fileName)}`;
    const expiresAt = new Date(Date.now() + 125 * 60 * 1000).toISOString();
    const { data: reservation, error: reservationError } = await supabase
      .from('asset_upload_reservations')
      .insert({
        order_id: input.orderId,
        storage_path: path,
        kind: input.kind,
        original_name: input.fileName,
        content_type: input.contentType,
        byte_size: input.byteSize,
        expires_at: expiresAt,
      })
      .select('id')
      .single();
    if (reservationError) throw reservationError;
    const { data, error } = await supabase.storage.from('order-assets').createSignedUploadUrl(path);
    if (error) {
      await supabase.from('asset_upload_reservations').delete().eq('id', reservation.id);
      throw error;
    }
    res.status(200).json({
      uploadId: reservation.id,
      bucket: 'order-assets',
      path,
      token: data.token,
      signedUrl: data.signedUrl,
      expiresAt,
    });
  } catch (error) {
    sendError(res, error);
  }
}

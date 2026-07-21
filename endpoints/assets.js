import { allowMethod, authorizeOrderAccess, enforceAssetQuota, getServiceClient, sendError } from '../server/commerce.js';
import { deleteAssetSchema, registerAssetSchema, updateAssetSchema } from '../server/validators.js';

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['POST', 'PATCH', 'DELETE'])) return;
  try {
    const supabase = getServiceClient();
    if (req.method === 'PATCH') {
      const input = updateAssetSchema.parse(req.body || {});
      await authorizeOrderAccess(req, supabase, input.orderId);
      const { data: currentAsset, error: currentError } = await supabase.from('assets').select('id, kind, content_type').eq('id', input.assetId).eq('order_id', input.orderId).single();
      if (currentError || !currentAsset) {
        const notFound = new Error('Không tìm thấy tệp.');
        notFound.statusCode = 404;
        throw notFound;
      }
      if (currentAsset.kind === 'payment_proof') {
        const locked = new Error('Không thể dùng biên nhận thanh toán làm tư liệu thiệp.');
        locked.statusCode = 409;
        throw locked;
      }
      const isAudio = String(currentAsset.content_type || '').startsWith('audio/');
      if ((input.kind === 'music') !== isAudio && input.kind !== 'other') {
        const invalidKind = new Error(isAudio ? 'Tệp âm thanh chỉ có thể dùng làm nhạc nền.' : 'Ảnh không thể dùng làm nhạc nền.');
        invalidKind.statusCode = 400;
        throw invalidKind;
      }
      const { data, error } = await supabase.from('assets').update({ kind: input.kind }).eq('id', currentAsset.id).select('id, kind, storage_path, original_name, content_type, byte_size, sort_order').single();
      if (error) throw error;
      res.status(200).json({ asset: data });
      return;
    }

    if (req.method === 'DELETE') {
      const input = deleteAssetSchema.parse(req.body || {});
      const role = await authorizeOrderAccess(req, supabase, input.orderId);
      const { data: asset, error: assetError } = await supabase.from('assets').select('id, kind, storage_bucket, storage_path').eq('id', input.assetId).eq('order_id', input.orderId).single();
      if (assetError || !asset) {
        const notFound = new Error('Không tìm thấy tệp.');
        notFound.statusCode = 404;
        throw notFound;
      }
      if (role !== 'staff' && asset.kind === 'payment_proof') {
        const locked = new Error('Biên nhận thanh toán chỉ có thể được xử lý bởi studio.');
        locked.statusCode = 403;
        throw locked;
      }
      const { error: storageDeleteError } = await supabase.storage.from(asset.storage_bucket).remove([asset.storage_path]);
      if (storageDeleteError) throw storageDeleteError;
      const { error: deleteError } = await supabase.from('assets').delete().eq('id', asset.id);
      if (deleteError) throw deleteError;
      res.status(200).json({ ok: true });
      return;
    }

    const input = registerAssetSchema.parse(req.body || {});
    if (!input.storagePath.startsWith(`${input.orderId}/${input.kind}/`)) {
      const invalid = new Error('Đường dẫn tệp không hợp lệ.');
      invalid.statusCode = 400;
      throw invalid;
    }
    await authorizeOrderAccess(req, supabase, input.orderId);

    const { data: reservation, error: reservationError } = await supabase
      .from('asset_upload_reservations')
      .select('id, order_id, storage_path, kind, original_name, content_type, byte_size, status, expires_at, asset_id')
      .eq('id', input.uploadId)
      .eq('order_id', input.orderId)
      .maybeSingle();
    if (reservationError) throw reservationError;
    if (!reservation) {
      const invalidReservation = new Error('Lượt tải lên không tồn tại hoặc đã bị hủy.');
      invalidReservation.statusCode = 409;
      throw invalidReservation;
    }
    const reservationMatches = reservation.storage_path === input.storagePath
      && reservation.kind === input.kind
      && reservation.original_name === input.fileName
      && reservation.content_type === input.contentType
      && Number(reservation.byte_size) === input.byteSize;
    if (!reservationMatches) {
      const invalidReservation = new Error('Thông tin tệp không khớp với lượt tải lên đã cấp.');
      invalidReservation.statusCode = 400;
      throw invalidReservation;
    }
    if (reservation.status === 'completed' && reservation.asset_id) {
      const { data: existingAsset, error: existingError } = await supabase
        .from('assets')
        .select('id, kind, storage_path, original_name, content_type, byte_size, sort_order')
        .eq('id', reservation.asset_id)
        .single();
      if (existingError) throw existingError;
      res.status(200).json({ asset: existingAsset });
      return;
    }
    if (reservation.status !== 'pending' || new Date(reservation.expires_at).getTime() <= Date.now()) {
      await supabase.storage.from('order-assets').remove([input.storagePath]);
      await supabase.from('asset_upload_reservations').update({ status: 'expired' }).eq('id', reservation.id);
      const expired = new Error('Lượt tải lên đã hết hạn. Vui lòng chọn lại tệp.');
      expired.statusCode = 409;
      throw expired;
    }

    const separator = input.storagePath.lastIndexOf('/');
    const directory = input.storagePath.slice(0, separator);
    const objectName = input.storagePath.slice(separator + 1);
    const { data: objects, error: storageError } = await supabase.storage.from('order-assets').list(directory, { limit: 10, search: objectName });
    if (storageError) throw storageError;
    const storedObject = (objects || []).find((item) => item.name === objectName);
    const storedSize = Number(storedObject?.metadata?.size ?? storedObject?.metadata?.contentLength ?? 0);
    const storedType = String(storedObject?.metadata?.mimetype || '');
    if (!storedObject || (storedSize && storedSize !== input.byteSize) || (storedType && storedType !== input.contentType)) {
      await supabase.storage.from('order-assets').remove([input.storagePath]);
      await supabase.from('asset_upload_reservations').update({ status: 'cancelled' }).eq('id', reservation.id);
      const invalidUpload = new Error('Tệp tải lên không khớp với thông tin đăng ký.');
      invalidUpload.statusCode = 400;
      throw invalidUpload;
    }

    try {
      await enforceAssetQuota(supabase, input.orderId, input.kind, input.byteSize, reservation.id);
    } catch (error) {
      await supabase.storage.from('order-assets').remove([input.storagePath]);
      await supabase.from('asset_upload_reservations').update({ status: 'cancelled' }).eq('id', reservation.id);
      throw error;
    }

    const { data: invitation, error: invitationError } = await supabase.from('invitations').select('id').eq('order_id', input.orderId).single();
    if (invitationError || !invitation) throw invitationError || new Error('Không tìm thấy thiệp của đơn hàng.');
    const { data, error } = await supabase.from('assets').insert({
      order_id: input.orderId,
      invitation_id: invitation.id,
      kind: input.kind,
      storage_path: input.storagePath,
      original_name: input.fileName,
      content_type: input.contentType,
      byte_size: input.byteSize,
    }).select('id, kind, storage_path, original_name').single();
    if (error) throw error;
    const { error: completionError } = await supabase
      .from('asset_upload_reservations')
      .update({ status: 'completed', asset_id: data.id, completed_at: new Date().toISOString() })
      .eq('id', reservation.id)
      .eq('status', 'pending')
      .select('id')
      .single();
    if (completionError) {
      await supabase.from('assets').delete().eq('id', data.id);
      throw completionError;
    }
    if (input.kind === 'payment_proof') {
      await Promise.all([
        supabase.from('orders').update({ deposit_status: 'submitted' }).eq('id', input.orderId),
        supabase.from('payments').update({ status: 'submitted', proof_asset_id: data.id }).eq('order_id', input.orderId).in('status', ['pending', 'submitted']),
      ]);
    }
    res.status(201).json({ asset: data });
  } catch (error) {
    sendError(res, error);
  }
}

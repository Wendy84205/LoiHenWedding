import { allowMethod, getServiceClient, isCronAuthorized, sendError } from '../server/commerce.js';

function groupBy(items, key) {
  return items.reduce((groups, item) => {
    const value = item[key];
    if (!groups.has(value)) groups.set(value, []);
    groups.get(value).push(item);
    return groups;
  }, new Map());
}

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['GET'])) return;
  try {
    if (!isCronAuthorized(req)) {
      const unauthorized = new Error('Cron authorization failed.');
      unauthorized.statusCode = 401;
      throw unauthorized;
    }

    const supabase = getServiceClient();
    const now = new Date().toISOString();
    const { data: expiredInvitations, error: invitationQueryError } = await supabase
      .from('invitations')
      .select('id, order_id')
      .eq('status', 'published')
      .lte('expires_at', now)
      .limit(500);
    if (invitationQueryError) throw invitationQueryError;

    const invitationIds = (expiredInvitations || []).map((item) => item.id);
    const orderIds = (expiredInvitations || []).map((item) => item.order_id);
    if (invitationIds.length) {
      const [{ error: invitationUpdateError }, { error: orderUpdateError }] = await Promise.all([
        supabase.from('invitations').update({ status: 'expired' }).in('id', invitationIds),
        supabase.from('orders').update({ status: 'expired' }).in('id', orderIds),
      ]);
      if (invitationUpdateError || orderUpdateError) throw invitationUpdateError || orderUpdateError;
    }

    const { data: expiredUploads, error: uploadQueryError } = await supabase
      .from('asset_upload_reservations')
      .select('id, storage_path')
      .eq('status', 'pending')
      .lte('expires_at', now)
      .limit(100);
    if (uploadQueryError) throw uploadQueryError;
    if (expiredUploads?.length) {
      const paths = expiredUploads.map((item) => item.storage_path);
      const { error: storageError } = await supabase.storage.from('order-assets').remove(paths);
      if (storageError) throw storageError;
      const { error: reservationError } = await supabase
        .from('asset_upload_reservations')
        .update({ status: 'expired' })
        .in('id', expiredUploads.map((item) => item.id));
      if (reservationError) throw reservationError;
    }

    const cleanupBefore = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const { error: cleanupError } = await supabase
      .from('asset_upload_reservations')
      .delete()
      .in('status', ['completed', 'cancelled', 'expired'])
      .lt('created_at', cleanupBefore);
    if (cleanupError) throw cleanupError;

    const { data: cleanupJobs, error: cleanupQueryError } = await supabase
      .from('asset_cleanup_jobs')
      .select('id, storage_bucket, storage_path, attempts')
      .eq('status', 'pending')
      .order('created_at')
      .limit(100);
    if (cleanupQueryError) throw cleanupQueryError;
    let completedCleanupJobs = 0;
    let failedCleanupJobs = 0;
    const buckets = groupBy(cleanupJobs || [], 'storage_bucket');
    for (const [bucket, jobs] of buckets) {
      const { error: storageCleanupError } = await supabase.storage.from(bucket).remove(jobs.map((job) => job.storage_path));
      if (storageCleanupError) {
        failedCleanupJobs += jobs.length;
        await Promise.all(jobs.map((job) => supabase.from('asset_cleanup_jobs').update({
          attempts: Number(job.attempts || 0) + 1,
          last_error: String(storageCleanupError.message || 'Storage cleanup failed').slice(0, 1000),
        }).eq('id', job.id)));
      } else {
        completedCleanupJobs += jobs.length;
        const { error: jobUpdateError } = await supabase.from('asset_cleanup_jobs').update({
          status: 'completed',
          completed_at: new Date().toISOString(),
          last_error: null,
        }).in('id', jobs.map((job) => job.id));
        if (jobUpdateError) throw jobUpdateError;
      }
    }

    res.status(200).json({
      ok: true,
      expiredInvitations: invitationIds.length,
      expiredUploads: expiredUploads?.length || 0,
      completedCleanupJobs,
      failedCleanupJobs,
      timestamp: now,
    });
  } catch (error) {
    sendError(res, error);
  }
}

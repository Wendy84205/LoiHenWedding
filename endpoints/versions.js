import { allowMethod, authorizeOrderAccess, getServiceClient, sendError } from '../server/commerce.js';
import { restoreVersionSchema } from '../server/validators.js';

async function getInvitation(supabase, orderId) {
  const { data, error } = await supabase
    .from('invitations')
    .select('id, draft_version')
    .eq('order_id', orderId)
    .single();
  if (error || !data) {
    const notFound = new Error('Không tìm thấy thiệp của đơn hàng.');
    notFound.statusCode = 404;
    throw notFound;
  }
  return data;
}

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['GET', 'POST'])) return;
  try {
    const supabase = getServiceClient();
    const orderId = String(req.query?.orderId || req.body?.orderId || '');
    const role = await authorizeOrderAccess(req, supabase, orderId);
    const invitation = await getInvitation(supabase, orderId);

    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('invitation_versions')
        .select('id, version, template_slug, created_by, created_at')
        .eq('invitation_id', invitation.id)
        .order('version', { ascending: false })
        .limit(50);
      if (error) throw error;
      res.status(200).json({ currentVersion: invitation.draft_version, versions: data || [] });
      return;
    }

    const input = restoreVersionSchema.parse(req.body || {});
    const { data, error } = await supabase.rpc('restore_invitation_version', {
      p_order_id: orderId,
      p_version: input.version,
      p_created_by: role,
    });
    if (error?.message?.includes('version_not_found')) {
      const notFound = new Error('Không tìm thấy phiên bản cần khôi phục.');
      notFound.statusCode = 404;
      throw notFound;
    }
    if (error) throw error;
    res.status(200).json({ content: data.draft_content, theme: data.draft_theme, design: data.draft_design, templateSlug: data.template_slug, version: data.draft_version, updatedAt: data.updated_at });
  } catch (error) {
    sendError(res, error);
  }
}

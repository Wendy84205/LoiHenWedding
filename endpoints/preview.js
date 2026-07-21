import { allowMethod, authorizeOrderAccess, createAdminPreviewToken, getPublicOrigin, getServiceClient, sendError } from '../server/commerce.js';

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['POST'])) return;
  try {
    const supabase = getServiceClient();
    const orderId = String(req.body?.orderId || '');
    await authorizeOrderAccess(req, supabase, orderId);
    const { data: invitation, error } = await supabase
      .from('invitations')
      .select('id, slug, status')
      .eq('order_id', orderId)
      .single();
    if (error || !invitation) {
      const notFound = new Error('Không tìm thấy thiệp của đơn hàng.');
      notFound.statusCode = 404;
      throw notFound;
    }
    const base = getPublicOrigin();
    const token = createAdminPreviewToken(invitation.id);
    res.status(200).json({ url: `${base}/w/${invitation.slug}?preview=${encodeURIComponent(token)}`, expiresIn: 3600 });
  } catch (error) {
    sendError(res, error);
  }
}

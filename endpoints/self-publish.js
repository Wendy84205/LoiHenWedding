import { allowMethod, authorizeOrderAccess, getPublicOrigin, getServiceClient, sendError } from '../server/commerce.js';
import { selfPublishSchema } from '../server/validators.js';
import { getSceneTemplate } from '../src/commerce/scene/sceneTemplates.js';
import { runInvitationPreflight } from '../src/commerce/scene/scenePreflight.js';

const autoPublishPackages = new Set(['basic', 'premium']);

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['POST'])) return;
  try {
    const input = selfPublishSchema.parse(req.body || {});
    const supabase = getServiceClient();
    await authorizeOrderAccess(req, supabase, input.orderId);
    const { data: order, error } = await supabase
      .from('orders')
      .select('id, package_code, template_slug, deposit_status, invitations(id, slug, draft_content, draft_theme, draft_design, draft_version, seo_title, seo_description, expires_at)')
      .eq('id', input.orderId)
      .single();
    if (error || !order) {
      const notFound = new Error('Không tìm thấy đơn hàng.');
      notFound.statusCode = 404;
      throw notFound;
    }
    const invitation = Array.isArray(order.invitations) ? order.invitations[0] : order.invitations;
    if (!invitation) throw new Error('Không tìm thấy thiệp của đơn hàng.');

    if (!autoPublishPackages.has(order.package_code)) {
      const { error: reviewError } = await supabase.from('orders').update({ status: 'customer_review' }).eq('id', input.orderId);
      if (reviewError) throw reviewError;
      res.status(200).json({ ok: true, reviewRequired: true, status: 'customer_review' });
      return;
    }
    if (order.deposit_status !== 'paid') {
      const unpaid = new Error('Studio cần xác nhận tiền cọc trước khi tự phát hành.');
      unpaid.statusCode = 409;
      throw unpaid;
    }

    const preflight = runInvitationPreflight({
      content: invitation.draft_content,
      design: invitation.draft_design,
      template: getSceneTemplate(order.template_slug),
      slug: invitation.slug,
      expiresAt: invitation.expires_at,
      seoTitle: invitation.seo_title,
      seoDescription: invitation.seo_description,
    });
    if (!preflight.ok) {
      const invalid = new Error(`Thiệp chưa thể phát hành: ${preflight.errors.map((item) => item.message).join(' ')}`);
      invalid.statusCode = 422;
      throw invalid;
    }

    const { data: duplicate, error: duplicateError } = await supabase
      .from('invitations')
      .select('id')
      .eq('slug', invitation.slug)
      .neq('id', invitation.id)
      .maybeSingle();
    if (duplicateError) throw duplicateError;
    if (duplicate) {
      const conflict = new Error('Link thiệp này đã được sử dụng.');
      conflict.statusCode = 409;
      throw conflict;
    }

    const { data: published, error: publishError } = await supabase.rpc('publish_invitation_draft', {
      p_order_id: input.orderId,
      p_slug: invitation.slug,
      p_expires_at: invitation.expires_at || null,
      p_expected_version: invitation.draft_version,
      p_require_paid: true,
    });
    if (publishError?.message?.includes('draft_version_conflict')) {
      const conflict = new Error('Bản thiệp vừa thay đổi. Hãy tải lại trước khi phát hành.');
      conflict.statusCode = 409;
      throw conflict;
    }
    if (publishError?.message?.includes('deposit_not_paid')) {
      const unpaid = new Error('Studio cần xác nhận tiền cọc trước khi tự phát hành.');
      unpaid.statusCode = 409;
      throw unpaid;
    }
    if (publishError?.message?.includes('slug_already_used') || publishError?.code === '23505') {
      const conflict = new Error('Link thiệp này đã được sử dụng.');
      conflict.statusCode = 409;
      throw conflict;
    }
    if (publishError) throw publishError;
    const publicInvitation = {
      id: published.id,
      slug: published.slug,
      status: published.status,
      expires_at: published.expires_at,
    };
    res.status(200).json({
      ok: true,
      reviewRequired: false,
      status: 'published',
      invitation: publicInvitation,
      url: `${getPublicOrigin()}/w/${publicInvitation.slug}`,
      preflight,
    });
  } catch (error) {
    sendError(res, error);
  }
}

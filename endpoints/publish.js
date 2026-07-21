import { allowMethod, getPublicOrigin, getServiceClient, requireAdmin, sendError } from '../server/commerce.js';
import { publishInvitationSchema } from '../server/validators.js';
import { getSceneTemplate } from '../src/commerce/scene/sceneTemplates.js';
import { runInvitationPreflight } from '../src/commerce/scene/scenePreflight.js';

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['POST'])) return;
  try {
    const supabase = getServiceClient();
    await requireAdmin(req, supabase);
    const input = publishInvitationSchema.parse(req.body || {});
    if (input.expiresAt && new Date(input.expiresAt).getTime() <= Date.now()) {
      const invalidExpiry = new Error('Ngày hết hạn phải nằm trong tương lai.');
      invalidExpiry.statusCode = 400;
      throw invalidExpiry;
    }
    const { data: existing } = await supabase.from('invitations').select('id').eq('slug', input.slug).neq('order_id', input.orderId).maybeSingle();
    if (existing) {
      const conflict = new Error('Link thiệp này đã được sử dụng.');
      conflict.statusCode = 409;
      throw conflict;
    }
    const { data: draft, error: draftError } = await supabase.from('invitations').select('template_slug, draft_content, draft_theme, draft_design, draft_version, seo_title, seo_description, expires_at').eq('order_id', input.orderId).single();
    if (draftError || !draft) throw draftError || new Error('Không tìm thấy bản nháp thiệp.');
    const preflight = runInvitationPreflight({
      content: draft.draft_content,
      design: draft.draft_design,
      template: getSceneTemplate(draft.template_slug),
      slug: input.slug,
      expiresAt: input.expiresAt || draft.expires_at,
      seoTitle: draft.seo_title,
      seoDescription: draft.seo_description,
    });
    if (!preflight.ok) {
      const invalid = new Error(`Thiệp chưa thể phát hành: ${preflight.errors.map((item) => item.message).join(' ')}`);
      invalid.statusCode = 422;
      throw invalid;
    }
    const { data: invitation, error } = await supabase.rpc('publish_invitation_draft', {
      p_order_id: input.orderId,
      p_slug: input.slug,
      p_expires_at: input.expiresAt || null,
      p_expected_version: draft.draft_version,
      p_require_paid: false,
    });
    if (error?.message?.includes('draft_version_conflict')) {
      const conflict = new Error('Bản thiệp vừa thay đổi. Hãy kiểm tra lại trước khi phát hành.');
      conflict.statusCode = 409;
      throw conflict;
    }
    if (error?.message?.includes('slug_already_used') || error?.code === '23505') {
      const conflict = new Error('Link thiệp này đã được sử dụng.');
      conflict.statusCode = 409;
      throw conflict;
    }
    if (error) throw error;
    const base = getPublicOrigin();
    const published = { id: invitation.id, slug: invitation.slug, status: invitation.status, expires_at: invitation.expires_at };
    res.status(200).json({ invitation: published, url: `${base}/w/${published.slug}`, preflight });
  } catch (error) {
    sendError(res, error);
  }
}

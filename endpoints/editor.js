import { allowMethod, authorizeOrderAccess, getServiceClient, sendError } from '../server/commerce.js';
import { editorActionSchema, editorDraftSchema } from '../server/validators.js';
import { commercialTemplateSlugs } from '../src/commerce/invitationContent.js';
import { createScenePatch } from '../src/commerce/scene/sceneSchema.js';
import { getSceneTemplate } from '../src/commerce/scene/sceneTemplates.js';

async function assertEditableOrder(supabase, orderId) {
  const { data, error } = await supabase.from('orders').select('id, status, template_slug').eq('id', orderId).single();
  if (error || !data) {
    const notFound = new Error('Không tìm thấy đơn hàng.');
    notFound.statusCode = 404;
    throw notFound;
  }
  if (['cancelled', 'expired'].includes(data.status)) {
    const locked = new Error('Đơn hàng đã đóng và không thể tiếp tục chỉnh sửa.');
    locked.statusCode = 409;
    throw locked;
  }
  if (!commercialTemplateSlugs.includes(data.template_slug)) {
    const unsupported = new Error('Mẫu thiệp này chưa hỗ trợ tự chỉnh sửa.');
    unsupported.statusCode = 409;
    throw unsupported;
  }
  return data;
}

export default async function handler(req, res) {
  if (!allowMethod(req, res, ['PATCH', 'POST'])) return;
  try {
    const supabase = getServiceClient();

    if (req.method === 'PATCH') {
      const input = editorDraftSchema.parse(req.body || {});
      const role = await authorizeOrderAccess(req, supabase, input.orderId);
      const order = await assertEditableOrder(supabase, input.orderId);
      const template = getSceneTemplate(order.template_slug);
      if (!template || input.design.templateVersion !== template.version) {
        const invalidDesign = new Error('Bố cục thiệp không khớp với phiên bản mẫu hiện tại.');
        invalidDesign.statusCode = 409;
        throw invalidDesign;
      }
      const { data, error } = await supabase.rpc('save_invitation_draft', {
        p_order_id: input.orderId,
        p_expected_version: input.expectedVersion,
        p_content: input.content,
        p_theme: input.theme,
        p_design: input.design,
        p_created_by: role,
      });
      if (error?.message?.includes('draft_version_conflict')) {
        const conflict = new Error('Bản thiệp đã được thay đổi ở tab khác. Hãy tải lại trước khi tiếp tục.');
        conflict.statusCode = 409;
        throw conflict;
      }
      if (error) throw error;
      res.status(200).json({ content: data.draft_content, theme: data.draft_theme, design: data.draft_design, version: data.draft_version, updatedAt: data.updated_at });
      return;
    }

    const input = editorActionSchema.parse(req.body || {});
    const role = await authorizeOrderAccess(req, supabase, input.orderId);
    const order = await assertEditableOrder(supabase, input.orderId);
    if (input.action === 'switch_template') {
      if (order.template_slug === input.templateSlug) {
        res.status(200).json({ ok: true, templateSlug: input.templateSlug });
        return;
      }
      const { data, error } = await supabase.rpc('switch_invitation_template', {
        p_order_id: input.orderId,
        p_template_slug: input.templateSlug,
        p_design: createScenePatch(getSceneTemplate(input.templateSlug)),
        p_created_by: role,
      });
      if (error) throw error;
      res.status(200).json({ ok: true, templateSlug: data.template_slug, version: data.draft_version });
      return;
    }
    const { error } = await supabase.from('orders').update({ status: 'customer_review' }).eq('id', input.orderId);
    if (error) throw error;
    res.status(200).json({ ok: true, status: 'customer_review' });
  } catch (error) {
    sendError(res, error);
  }
}

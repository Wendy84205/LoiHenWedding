import { normalizeInvitationContent } from '../invitationContent.js';
import { resolveSceneDocument, scenePatchSchema } from './sceneSchema.js';

const publicSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function issue(code, message, nodeId = '') {
  return { code, message, ...(nodeId ? { nodeId } : {}) };
}

function estimateTextOverflow(node, content) {
  if (node.type !== 'text') return false;
  const fieldPath = node.binding?.fieldPath;
  const raw = fieldPath
    ? fieldPath.split('.').reduce((value, key) => value?.[key], content)
    : node.props.text;
  const value = String(raw || '');
  if (!value) return false;
  const fontSize = node.style.fontSize || 20;
  const lineHeight = node.style.lineHeight || 1.25;
  const charsPerLine = Math.max(1, Math.floor(node.width / Math.max(5, fontSize * 0.52)));
  const estimatedLines = value.split('\n').reduce(
    (total, line) => total + Math.max(1, Math.ceil(line.length / charsPerLine)),
    0,
  );
  return estimatedLines * fontSize * lineHeight > node.height * 1.15;
}

export function runInvitationPreflight({
  content: contentValue, design, template, slug = '', expiresAt = '', seoTitle = '', seoDescription = '',
}) {
  const errors = [];
  const warnings = [];
  const content = normalizeInvitationContent(contentValue);
  if (!content.couple.groomName.trim()) errors.push(issue('groom_name_missing', 'Thiếu tên chú rể.'));
  if (!content.couple.brideName.trim()) errors.push(issue('bride_name_missing', 'Thiếu tên cô dâu.'));
  if (!content.event.venueName.trim()) errors.push(issue('venue_missing', 'Thiếu tên địa điểm tổ chức.'));
  if (Number.isNaN(new Date(content.event.startsAt).getTime())) errors.push(issue('event_date_invalid', 'Ngày giờ tổ chức không hợp lệ.'));
  if (slug && (!publicSlugPattern.test(slug) || slug.length > 72)) errors.push(issue('slug_invalid', 'Link thiệp không hợp lệ.'));
  if (expiresAt && new Date(expiresAt).getTime() <= Date.now()) errors.push(issue('expiry_invalid', 'Ngày hết hạn phải nằm trong tương lai.'));
  if (!seoTitle?.trim()) errors.push(issue('share_title_missing', 'Thiếu tiêu đề chia sẻ.'));
  if (!seoDescription?.trim()) errors.push(issue('share_description_missing', 'Thiếu mô tả chia sẻ.'));
  if (!content.media.social) warnings.push(issue('share_image_missing', 'Chưa có ảnh chia sẻ 1200×630 riêng.'));

  if (!template) {
    warnings.push(issue('legacy_renderer', 'Mẫu đang dùng renderer cũ và chưa hỗ trợ scene editor.'));
    return { ok: errors.length === 0, errors, warnings };
  }

  const parsedDesign = scenePatchSchema.safeParse(design);
  if (!parsedDesign.success || parsedDesign.data.templateVersion !== template.version) {
    errors.push(issue('design_invalid', 'Bố cục không khớp phiên bản mẫu hiện tại.'));
    return { ok: false, errors, warnings };
  }

  const scene = resolveSceneDocument(template, parsedDesign.data);
  for (const node of scene.nodes) {
    if (node.hidden) continue;
    const completelyOutside = node.x + node.width <= 0 || node.y + node.height <= 0
      || node.x >= scene.canvas.width || node.y >= scene.canvas.height;
    const partlyOutside = node.x < 0 || node.y < 0
      || node.x + node.width > scene.canvas.width || node.y + node.height > scene.canvas.height;
    if (completelyOutside) errors.push(issue('node_outside_canvas', `${node.label} nằm hoàn toàn ngoài thiệp.`, node.id));
    else if (partlyOutside) warnings.push(issue('node_clipped', `${node.label} đang bị cắt một phần.`, node.id));
    if (estimateTextOverflow(node, content)) warnings.push(issue('text_overflow', `${node.label} có thể bị tràn chữ.`, node.id));
  }

  return { ok: errors.length === 0, errors, warnings };
}

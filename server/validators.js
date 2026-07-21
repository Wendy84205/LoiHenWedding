import { z } from 'zod';
import {
  commercePackages, commercialTemplateSlugs, invitationFontKeys, invitationLayerEffectKeys, invitationLayerKeys,
  invitationMediaPositionKeys, invitationPaletteKeys, invitationTextAlignKeys, isInvitationTextFieldKey,
} from '../src/commerce/invitationContent.js';
import { currentCatalogSlugs } from '../src/data/invitationCatalog.js';
import { scenePatchSchema } from '../src/commerce/scene/sceneSchema.js';

const shortText = z.string().trim().min(1).max(120);
const optionalText = z.string().trim().max(1000).optional().default('');
const calendarDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const [year, month, day] = value.split('-').map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month - 1 && parsed.getUTCDate() === day;
}, 'Ngày tổ chức không hợp lệ.');
const clockTime = z.string().regex(/^\d{2}:\d{2}$/).refine((value) => {
  const [hour, minute] = value.split(':').map(Number);
  return hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59;
}, 'Giờ tổ chức không hợp lệ.');
const contentText = (max = 240) => z.string().trim().max(max);
const secureUrl = (max = 500) => z.string().trim().url().max(max).refine(
  (value) => /^https:\/\//i.test(value),
  'Liên kết phải sử dụng HTTPS.',
);
const optionalSecureUrl = (max = 500) => z.union([z.literal(''), secureUrl(max)]);
const mediaValue = z.string().max(2048).refine((value) => !value || value.startsWith('/') || /^https:\/\//i.test(value), 'Đường dẫn tư liệu không hợp lệ.');
const musicMediaValue = z.string().max(2048).refine(
  (value) => !value || value.startsWith('/') || /^https:\/\//i.test(value) || /^asset:[0-9a-f-]{36}$/i.test(value),
  'Đường dẫn nhạc không hợp lệ.',
);

export const invitationContentSchema = z.object({
  couple: z.object({
    groomName: contentText(80), groomFullName: contentText(120), groomBirthDate: contentText(40),
    brideName: contentText(80), brideFullName: contentText(120), brideBirthDate: contentText(40),
  }),
  families: z.object({
    groomFather: contentText(120), groomMother: contentText(120), groomAddress: contentText(240),
    brideFather: contentText(120), brideMother: contentText(120), brideAddress: contentText(240),
  }),
  event: z.object({
    startsAt: z.string().datetime({ offset: true }),
    venueName: contentText(180),
    address: contentText(300),
    mapUrl: optionalSecureUrl(),
    lunarDate: contentText(160),
  }),
  copy: z.object({
    intro: contentText(1000), story: contentText(4000), quote: contentText(1000), thankYou: contentText(1500),
  }),
  schedule: z.array(z.object({ time: contentText(20), label: contentText(160) })).min(1).max(8),
  media: z.object({
    hero: mediaValue, bride: mediaValue, groom: mediaValue, couple: mediaValue, venue: mediaValue,
    final: mediaValue, social: mediaValue, music: musicMediaValue, giftQr: mediaValue, gallery: z.array(mediaValue).max(60),
  }),
  gift: z.object({ groomQr: mediaValue, brideQr: mediaValue }),
});

export const invitationThemeSchema = z.object({
  hiddenLayers: z.array(z.enum(invitationLayerKeys)).max(invitationLayerKeys.length),
  motion: z.enum(['full', 'reduced']),
  palette: z.enum(invitationPaletteKeys),
  font: z.enum(invitationFontKeys),
  colors: z.object({
    surface: z.union([z.literal(''), z.string().regex(/^#[0-9a-f]{6}$/i)]),
    ink: z.union([z.literal(''), z.string().regex(/^#[0-9a-f]{6}$/i)]),
    accent: z.union([z.literal(''), z.string().regex(/^#[0-9a-f]{6}$/i)]),
  }),
  mediaPositions: z.partialRecord(
    z.enum(invitationMediaPositionKeys),
    z.object({ x: z.number().int().min(0).max(100), y: z.number().int().min(0).max(100) }),
  ),
  layerEffects: z.partialRecord(z.enum(invitationLayerKeys), z.enum(invitationLayerEffectKeys)),
  textStyles: z.record(
    z.string().max(64),
    z.object({
      fontSize: z.number().int().min(10).max(96).optional(),
      color: z.string().regex(/^#[0-9a-f]{6}$/i).optional(),
      align: z.enum(invitationTextAlignKeys).optional(),
      font: z.enum(invitationFontKeys.filter((key) => key !== 'original')).optional(),
      bold: z.literal(true).optional(),
      italic: z.literal(true).optional(),
    }),
  ).refine((styles) => Object.keys(styles).every(isInvitationTextFieldKey), 'Trường chữ không hỗ trợ.'),
});

export const editorDraftSchema = z.object({
  orderId: z.string().uuid(),
  expectedVersion: z.number().int().positive(),
  content: invitationContentSchema,
  theme: invitationThemeSchema,
  design: scenePatchSchema,
});

export const editorActionSchema = z.discriminatedUnion('action', [
  z.object({ orderId: z.string().uuid(), action: z.literal('submit_review') }),
  z.object({ orderId: z.string().uuid(), action: z.literal('switch_template'), templateSlug: z.enum(commercialTemplateSlugs) }),
]);

export const restoreVersionSchema = z.object({
  orderId: z.string().uuid(),
  version: z.number().int().positive(),
});

export const selfPublishSchema = z.object({
  orderId: z.string().uuid(),
});

export const createOrderSchema = z.object({
  fullName: shortText,
  email: z.union([z.literal(''), z.string().trim().email().max(160)]).optional().default(''),
  phone: z.string().trim().min(8).max(24),
  zalo: z.string().trim().max(80).optional().default(''),
  packageCode: z.enum(Object.keys(commercePackages)),
  templateSlug: z.enum(commercialTemplateSlugs),
  groomName: shortText,
  brideName: shortText,
  eventDate: calendarDate,
  eventTime: clockTime,
  venueName: shortText,
  address: shortText,
  mapUrl: optionalSecureUrl().optional().default(''),
  invitationMessage: optionalText,
  customerNote: optionalText,
  consent: z.literal(true),
  website: z.string().max(0).optional().default(''),
});

const consultationServices = ['Thiệp cưới Online', 'Tráp cưới', 'Trình chiếu sự kiện', 'Gói dịch vụ trọn bộ'];
const consultationStatuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];

export const consultationSchema = z.object({
  fullName: shortText,
  phone: z.string().trim().min(8).max(24),
  email: z.union([z.literal(''), z.string().trim().email().max(160)]).optional().default(''),
  service: z.enum(consultationServices),
  templateSlug: z.union([z.literal(''), z.enum(currentCatalogSlugs)]).optional().default(''),
  preferredDate: calendarDate,
  preferredTime: clockTime,
  note: z.string().trim().max(1200).optional().default(''),
  consent: z.literal(true),
  website: z.string().max(0).optional().default(''),
});

export const updateConsultationSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(consultationStatuses),
  internalNote: z.string().trim().max(4000).optional().default(''),
});

export const updateOrderSchema = z.object({
  status: z.enum(['new', 'awaiting_deposit', 'in_progress', 'customer_review', 'revision', 'approved', 'published', 'expired', 'cancelled']).optional(),
  depositStatus: z.enum(['pending', 'submitted', 'paid', 'failed', 'refunded']).optional(),
  customerNote: z.string().trim().max(2000).optional(),
  internalNote: z.string().trim().max(4000).optional(),
  content: z.record(z.string(), z.unknown()).optional(),
  seoTitle: z.string().trim().max(120).optional(),
  seoDescription: z.string().trim().max(240).optional(),
});

export const deleteOrderSchema = z.object({
  orderId: z.string().uuid(),
  confirmPublicId: z.string().trim().min(6).max(80),
});

export const publishInvitationSchema = z.object({
  orderId: z.string().uuid(),
  slug: z.string().trim().min(3).max(72).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  expiresAt: z.string().datetime({ offset: true }).optional(),
});

const uploadFieldsSchema = z.object({
  orderId: z.string().uuid(),
  accessToken: z.string().min(20).optional(),
  fileName: z.string().trim().min(1).max(180),
  contentType: z.enum(['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'audio/mpeg', 'audio/mp4']),
  byteSize: z.number().int().positive().max(15728640),
  kind: z.enum(['hero', 'bride', 'groom', 'couple', 'venue', 'final', 'gallery', 'music', 'social', 'payment_proof', 'gift_qr', 'other']),
});

function validateAssetMedia(input, context) {
  const isAudio = input.contentType.startsWith('audio/');
  if (input.kind === 'music' && !isAudio) {
    context.addIssue({ code: 'custom', path: ['contentType'], message: 'Nhạc nền phải là tệp âm thanh.' });
  } else if (!['music', 'other'].includes(input.kind) && isAudio) {
    context.addIssue({ code: 'custom', path: ['contentType'], message: 'Vị trí ảnh không thể dùng tệp âm thanh.' });
  }
}

export const uploadSchema = uploadFieldsSchema.superRefine(validateAssetMedia);

export const registerAssetSchema = uploadFieldsSchema.extend({
  uploadId: z.string().uuid(),
  storagePath: z.string().trim().min(10).max(500),
}).superRefine(validateAssetMedia);

export const cancelUploadSchema = z.object({
  orderId: z.string().uuid(),
  uploadId: z.string().uuid(),
});

export const deleteAssetSchema = z.object({
  orderId: z.string().uuid(),
  assetId: z.string().uuid(),
});

export const updateAssetSchema = z.object({
  orderId: z.string().uuid(),
  assetId: z.string().uuid(),
  kind: z.enum(['hero', 'bride', 'groom', 'couple', 'venue', 'final', 'gallery', 'music', 'social', 'gift_qr', 'other']),
});

export const claimOrderSchema = z.object({
  orderId: z.string().uuid(),
  accessToken: z.string().trim().min(20).max(500),
});

export const rsvpSchema = z.object({
  slug: z.string().trim().min(3).max(72),
  fullName: shortText,
  phone: z.string().trim().max(24).optional().default(''),
  attendance: z.enum(['yes', 'no', 'unsure']),
  partySize: z.number().int().min(0).max(20),
  note: z.string().trim().max(500).optional().default(''),
  guestToken: z.string().trim().max(600).optional().default(''),
  website: z.string().max(0).optional().default(''),
});

export const wishSchema = z.object({
  slug: z.string().trim().min(3).max(72),
  fullName: shortText,
  message: z.string().trim().min(2).max(500),
  guestToken: z.string().trim().max(600).optional().default(''),
  website: z.string().max(0).optional().default(''),
});

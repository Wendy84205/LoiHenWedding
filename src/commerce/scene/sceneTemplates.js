import { templateSceneSchema } from './sceneSchema.js';
import { profileSceneRegistry } from './sceneProfileTemplates.js';
import { batch2SceneRegistry } from './sceneBatch2Templates.js';

const serif = 'Cormorant Garamond, Georgia, serif';
const display = 'Playfair Display, Georgia, serif';
const script = 'Great Vibes, cursive';
const sans = 'Montserrat, Arial, sans-serif';

function animation(entrance = 'rise', delay = 0, continuous = 'none') {
  return { entrance, duration: 0.85, delay, easing: 'ease-out', continuous };
}

function text(id, label, x, y, width, height, options = {}) {
  return {
    id, type: 'text', label, x, y, width, height,
    rotation: options.rotation || 0,
    zIndex: options.zIndex ?? 10,
    locked: Boolean(options.locked), hidden: false,
    ...(options.binding ? { binding: options.binding } : {}),
    props: { text: options.value || '', ...(options.props || {}) },
    style: {
      color: options.color || '#222222',
      fontFamily: options.font || serif,
      fontSize: options.fontSize || 24,
      fontWeight: options.fontWeight || 400,
      fontStyle: options.fontStyle || 'normal',
      textDecoration: 'none', textTransform: options.textTransform || 'none',
      textAlign: options.align || 'center', lineHeight: options.lineHeight || 1.2,
      letterSpacing: options.letterSpacing || 0,
      opacity: options.opacity ?? 1,
      padding: options.padding || 0,
      backgroundColor: options.backgroundColor || 'transparent',
      borderRadius: options.borderRadius || 0,
    },
    animation: options.animation || animation('rise', options.delay || 0),
  };
}

function image(id, label, role, x, y, width, height, slug, options = {}) {
  return {
    id, type: 'image', label, x, y, width, height,
    rotation: options.rotation || 0,
    zIndex: options.zIndex ?? 4,
    locked: Boolean(options.locked), hidden: false,
    binding: { mediaRole: role },
    props: { src: `/social/${slug}.jpg`, alt: label },
    style: {
      backgroundColor: options.backgroundColor || '#eeeeee',
      borderRadius: options.borderRadius || 0,
      borderWidth: options.borderWidth || 0,
      borderColor: options.borderColor || '#ffffff',
      borderStyle: 'solid',
      opacity: options.opacity ?? 1,
      objectFit: options.objectFit || 'cover',
      objectPositionX: options.objectPositionX ?? 50,
      objectPositionY: options.objectPositionY ?? 50,
      boxShadow: options.boxShadow || '',
    },
    animation: options.animation || animation(options.entrance || 'fade', options.delay || 0),
  };
}

function shape(id, label, x, y, width, height, options = {}) {
  return {
    id, type: 'shape', label, x, y, width, height,
    rotation: options.rotation || 0,
    zIndex: options.zIndex ?? 0,
    locked: options.locked ?? true, hidden: false,
    props: { shape: options.shape || 'rectangle' },
    style: {
      backgroundColor: options.backgroundColor || '#ffffff',
      borderRadius: options.borderRadius || 0,
      borderWidth: options.borderWidth || 0,
      borderColor: options.borderColor || '#ffffff',
      borderStyle: options.borderStyle || 'solid',
      opacity: options.opacity ?? 1,
      boxShadow: options.boxShadow || '',
    },
    animation: options.animation || animation('none'),
  };
}

function widget(type, id, label, x, y, width, height, options = {}) {
  return {
    id, type, label, x, y, width, height,
    rotation: options.rotation || 0,
    zIndex: options.zIndex ?? 8,
    locked: Boolean(options.locked), hidden: false,
    ...(options.binding ? { binding: options.binding } : {}),
    props: { ...(options.props || {}) },
    style: {
      color: options.color || '#222222',
      backgroundColor: options.backgroundColor || 'transparent',
      fontFamily: options.font || serif,
      fontSize: options.fontSize || 18,
      fontWeight: options.fontWeight || 400,
      textAlign: options.align || 'center', lineHeight: options.lineHeight || 1.3,
      letterSpacing: options.letterSpacing || 0,
      borderRadius: options.borderRadius || 0,
      borderWidth: options.borderWidth || 0,
      borderColor: options.borderColor || '#ffffff',
      borderStyle: options.borderStyle || 'solid',
      opacity: options.opacity ?? 1,
      padding: options.padding || 0,
      boxShadow: options.boxShadow || '',
      objectFit: options.objectFit || 'cover',
      objectPositionX: options.objectPositionX ?? 50,
      objectPositionY: options.objectPositionY ?? 50,
    },
    animation: options.animation || animation(options.entrance || 'rise', options.delay || 0),
  };
}

function makeWeddingScene(config) {
  const { slug, name, paper, ink, accent, soft, heroLayout = 'full', envelope = false, darkEvent = false } = config;
  const hero = heroLayout === 'split'
    ? image('hero-photo', 'Ảnh mở đầu', 'hero', 206, 70, 272, 620, slug, { borderRadius: 2, entrance: 'right' })
    : image('hero-photo', 'Ảnh mở đầu', 'hero', 24, 70, 452, 680, slug, { borderRadius: heroLayout === 'rounded' ? 42 : 2, entrance: 'fade' });
  const heroTextX = heroLayout === 'split' ? 20 : 44;
  const heroTextWidth = heroLayout === 'split' ? 190 : 412;
  const heroTextColor = heroLayout === 'split' ? ink : '#ffffff';
  const familyTop = envelope ? 1120 : 930;
  const storyTop = familyTop + 1050;
  const eventTop = storyTop + 1020;
  const finalTop = eventTop + 1240;
  const height = finalTop + 1900;

  const nodes = [
    shape('canvas-paper', 'Nền thiệp', 0, 0, 500, height, { backgroundColor: paper, zIndex: -20 }),
    hero,
    ...(heroLayout === 'full' ? [shape('hero-shade', 'Lớp phủ ảnh', 24, 70, 452, 680, { backgroundColor: '#000000', opacity: 0.28, zIndex: 5 })] : []),
    text('hero-kicker', 'Dòng mở đầu', heroTextX, 112, heroTextWidth, 40, {
      value: config.kicker || 'SAVE OUR DATE', color: heroTextColor, font: sans, fontSize: 12,
      letterSpacing: 4, zIndex: 8, animation: animation('fade', 0.1),
    }),
    text('groom-name', 'Tên chú rể', heroTextX, 220, heroTextWidth, 90, {
      binding: { fieldPath: 'couple.groomName', format: 'plain' }, color: heroTextColor,
      font: config.nameFont || script, fontSize: config.nameSize || 54, zIndex: 8, animation: animation('left', 0.2),
    }),
    text('name-and', 'Dấu nối tên', heroTextX, 312, heroTextWidth, 52, {
      value: '&', color: accent, font: display, fontSize: 34, zIndex: 8, animation: animation('zoom', 0.35),
    }),
    text('bride-name', 'Tên cô dâu', heroTextX, 372, heroTextWidth, 90, {
      binding: { fieldPath: 'couple.brideName', format: 'plain' }, color: heroTextColor,
      font: config.nameFont || script, fontSize: config.nameSize || 54, zIndex: 8, animation: animation('right', 0.45),
    }),
    text('hero-date', 'Ngày cưới', heroTextX, 590, heroTextWidth, 54, {
      binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color: heroTextColor,
      font: display, fontSize: 22, letterSpacing: 3, zIndex: 8, animation: animation('fade', 0.55),
    }),
    widget('particle', 'hero-particle', 'Lấp lánh', 24, 70, 452, 680, {
      locked: true, zIndex: 9, props: { particle: config.particle || 'sparkle' }, animation: animation('fade', 0, 'none'),
    }),
    ...(envelope ? [
      text('invite-title', 'Tiêu đề thiệp', 40, 790, 420, 78, { value: 'Wedding Invitation', font: script, fontSize: 48, color: ink }),
      widget('envelope', 'opening-envelope', 'Phong bì mở thiệp', 85, 880, 330, 210, {
        color: ink, backgroundColor: soft, borderRadius: 4, boxShadow: '0 18px 35px #00000022',
        props: { heading: 'Chạm để mở thiệp', lockedUntilOpen: true }, entrance: 'zoom',
      }),
    ] : [
      text('intro-copy', 'Lời mời đầu', 54, 780, 392, 120, {
        binding: { fieldPath: 'copy.intro', format: 'plain' }, color: ink, fontSize: 20, lineHeight: 1.45,
      }),
    ]),

    text('family-heading', 'Tiêu đề gia đình', 40, familyTop, 420, 58, {
      value: 'TWO FAMILIES, ONE LOVE', color: accent, font: sans, fontSize: 14, letterSpacing: 3,
    }),
    image('groom-photo', 'Ảnh chú rể', 'groom', 28, familyTop + 94, 210, 360, slug, {
      borderRadius: config.photoRadius || 4, entrance: 'left', objectPositionX: 48,
    }),
    image('bride-photo', 'Ảnh cô dâu', 'bride', 262, familyTop + 94, 210, 360, slug, {
      borderRadius: config.photoRadius || 4, entrance: 'right', objectPositionX: 52,
    }),
    text('groom-full-name', 'Họ tên chú rể', 25, familyTop + 474, 216, 56, {
      binding: { fieldPath: 'couple.groomFullName', format: 'plain' }, color: ink, font: display, fontSize: 22,
    }),
    text('bride-full-name', 'Họ tên cô dâu', 259, familyTop + 474, 216, 56, {
      binding: { fieldPath: 'couple.brideFullName', format: 'plain' }, color: ink, font: display, fontSize: 22,
    }),
    shape('family-line', 'Đường phân cách', 72, familyTop + 570, 356, 2, { backgroundColor: accent, zIndex: 2 }),
    text('groom-family', 'Gia đình nhà trai', 28, familyTop + 606, 210, 220, {
      value: 'NHÀ TRAI', props: {}, color: ink, font: sans, fontSize: 13, fontWeight: 600, letterSpacing: 2,
    }),
    text('groom-father', 'Cha chú rể', 28, familyTop + 654, 210, 46, {
      binding: { fieldPath: 'families.groomFather', format: 'plain' }, color: ink, fontSize: 17,
    }),
    text('groom-mother', 'Mẹ chú rể', 28, familyTop + 700, 210, 46, {
      binding: { fieldPath: 'families.groomMother', format: 'plain' }, color: ink, fontSize: 17,
    }),
    text('groom-address', 'Địa chỉ nhà trai', 28, familyTop + 758, 210, 58, {
      binding: { fieldPath: 'families.groomAddress', format: 'plain' }, color: ink, fontSize: 14, lineHeight: 1.35,
    }),
    text('bride-family', 'Gia đình nhà gái', 262, familyTop + 606, 210, 220, {
      value: 'NHÀ GÁI', color: ink, font: sans, fontSize: 13, fontWeight: 600, letterSpacing: 2,
    }),
    text('bride-father', 'Cha cô dâu', 262, familyTop + 654, 210, 46, {
      binding: { fieldPath: 'families.brideFather', format: 'plain' }, color: ink, fontSize: 17,
    }),
    text('bride-mother', 'Mẹ cô dâu', 262, familyTop + 700, 210, 46, {
      binding: { fieldPath: 'families.brideMother', format: 'plain' }, color: ink, fontSize: 17,
    }),
    text('bride-address', 'Địa chỉ nhà gái', 262, familyTop + 758, 210, 58, {
      binding: { fieldPath: 'families.brideAddress', format: 'plain' }, color: ink, fontSize: 14, lineHeight: 1.35,
    }),

    shape('story-paper-back', 'Giấy nền câu chuyện', 38, storyTop + 58, 424, 680, {
      backgroundColor: soft, rotation: -2.2, zIndex: 1, boxShadow: '0 12px 28px #00000018',
    }),
    shape('story-paper', 'Giấy câu chuyện', 48, storyTop + 46, 404, 664, {
      backgroundColor: '#ffffff', rotation: 1.4, zIndex: 2, boxShadow: '0 10px 24px #00000018',
    }),
    text('story-heading', 'Tiêu đề câu chuyện', 75, storyTop + 104, 350, 74, {
      value: config.storyHeading || 'OUR LOVE STORY', color: accent, font: display, fontSize: 34, zIndex: 4, align: 'left',
    }),
    image('story-photo', 'Ảnh câu chuyện', 'couple', 78, storyTop + 196, 344, 250, slug, {
      zIndex: 4, borderRadius: 2, entrance: 'fade',
    }),
    text('story-copy', 'Câu chuyện tình yêu', 78, storyTop + 470, 344, 142, {
      binding: { fieldPath: 'copy.story', format: 'plain' }, color: ink, fontSize: 18, lineHeight: 1.35, zIndex: 4, align: 'left',
    }),
    text('story-quote', 'Trích dẫn', 78, storyTop + 620, 344, 70, {
      binding: { fieldPath: 'copy.quote', format: 'plain' }, color: accent, font: script, fontSize: 25, zIndex: 4,
    }),

    shape('event-band', 'Nền ngày cưới', 0, eventTop, 500, 1140, {
      backgroundColor: darkEvent ? ink : soft, zIndex: 0,
    }),
    text('save-date-title', 'Save the date', 40, eventTop + 78, 420, 80, {
      value: 'SAVE THE DATE', color: darkEvent ? paper : accent, font: display, fontSize: 38, letterSpacing: 2,
    }),
    text('event-time', 'Giờ cưới', 50, eventTop + 174, 400, 44, {
      binding: { fieldPath: 'event.startsAt.time', format: 'time' }, color: darkEvent ? '#ffffff' : ink,
      font: sans, fontSize: 17, letterSpacing: 2,
    }),
    widget('calendar', 'wedding-calendar', 'Lịch ngày cưới', 40, eventTop + 246, 420, 370, {
      color: darkEvent ? '#ffffff' : ink, backgroundColor: 'transparent', font: sans,
      props: { calendarStyle: config.calendarStyle || 'heart' },
    }),
    widget('countdown', 'wedding-countdown', 'Đếm ngược', 35, eventTop + 652, 430, 110, {
      color: darkEvent ? '#ffffff' : ink, backgroundColor: darkEvent ? '#000000' : '#ffffff',
      borderRadius: 4, padding: 12, props: { orientation: 'horizontal' }, entrance: 'zoom',
    }),
    text('venue-name', 'Địa điểm cưới', 48, eventTop + 798, 404, 64, {
      binding: { fieldPath: 'event.venueName', format: 'plain' }, color: darkEvent ? paper : accent,
      font: display, fontSize: 27,
    }),
    text('venue-address', 'Địa chỉ cưới', 62, eventTop + 874, 376, 70, {
      binding: { fieldPath: 'event.address', format: 'plain' }, color: darkEvent ? '#ffffff' : ink,
      fontSize: 18, lineHeight: 1.35,
    }),
    widget('map', 'venue-map', 'Nút xem bản đồ', 145, eventTop + 972, 210, 58, {
      color: darkEvent ? ink : '#ffffff', backgroundColor: darkEvent ? paper : accent,
      borderRadius: 4, font: sans, fontSize: 15, fontWeight: 600,
      binding: { fieldPath: 'event.mapUrl', format: 'plain' }, props: { buttonLabel: 'XEM BẢN ĐỒ' },
    }),

    text('album-heading', 'Tiêu đề album', 40, finalTop + 62, 420, 74, {
      value: 'ALBUM OF LOVE', color: accent, font: display, fontSize: 36,
    }),
    widget('album', 'wedding-album', 'Album ảnh cưới', 24, finalTop + 164, 452, 520, {
      backgroundColor: darkEvent ? ink : accent, borderRadius: 3, padding: 14,
      props: { maxItems: 12, columns: 3 }, entrance: 'fade',
    }),
    widget('rsvp', 'wedding-rsvp', 'Xác nhận tham dự', 48, finalTop + 740, 404, 310, {
      color: ink, backgroundColor: '#ffffff', borderRadius: 4, borderWidth: 1,
      borderColor: soft, boxShadow: '0 12px 32px #00000015', padding: 24,
      props: { heading: 'Xác nhận tham dự', buttonLabel: 'GỬI XÁC NHẬN' },
    }),
    widget('giftQr', 'wedding-gift-qr', 'QR mừng cưới', 150, finalTop + 1090, 200, 230, {
      color: ink, backgroundColor: '#ffffff', borderRadius: 4, borderWidth: 1,
      borderColor: soft, padding: 12, objectFit: 'contain', binding: { mediaRole: 'giftQr' },
      props: { heading: 'QR mừng cưới' }, entrance: 'zoom',
    }),
    widget('wish', 'wedding-wish', 'Gửi lời chúc', 48, finalTop + 1360, 404, 330, {
      color: ink, backgroundColor: '#ffffff', borderRadius: 4, borderWidth: 1,
      borderColor: soft, boxShadow: '0 12px 32px #00000015', padding: 24,
      props: { heading: 'Gửi lời chúc', buttonLabel: 'GỬI LỜI CHÚC' },
    }),
    text('thank-you', 'Lời cảm ơn', 60, finalTop + 1730, 380, 120, {
      binding: { fieldPath: 'copy.thankYou', format: 'plain' }, color: ink, fontSize: 19, lineHeight: 1.4,
    }),
  ];

  return templateSceneSchema.parse({
    slug, version: '2026.07.16-2', name,
    canvas: { width: 500, height, backgroundColor: paper },
    nodes,
    capabilities: ['text', 'image', 'shape', 'calendar', 'countdown', 'map', 'rsvp', 'wish', 'giftQr', 'envelope', 'album', 'carousel', 'particle'],
  });
}

export const sceneTemplateRegistry = Object.freeze({
  ...profileSceneRegistry,
  ...batch2SceneRegistry,
  'thiep-cuoi-39': makeWeddingScene({
    slug: 'thiep-cuoi-39', name: 'Editorial Red', paper: '#ffffff', ink: '#181616', accent: '#9d1728', soft: '#f4e8e8',
    heroLayout: 'split', nameFont: display, nameSize: 40, storyHeading: 'OUR LOVE STORY', calendarStyle: 'heart', darkEvent: true,
  }),
  'thiep-cuoi-44': makeWeddingScene({
    slug: 'thiep-cuoi-44', name: 'Minimal Envelope', paper: '#ffffff', ink: '#252321', accent: '#a18569', soft: '#e8e0d4',
    heroLayout: 'rounded', envelope: true, nameFont: script, storyHeading: 'MY LOVER', calendarStyle: 'minimal', particle: 'sparkle',
  }),
  'thiep-cuoi-47': makeWeddingScene({
    slug: 'thiep-cuoi-47', name: 'Ruby Editorial', paper: '#fffafa', ink: '#260c0d', accent: '#7b1519', soft: '#f1dedd',
    heroLayout: 'full', nameFont: display, nameSize: 48, storyHeading: 'THE STORY OF US', calendarStyle: 'editorial', darkEvent: true,
  }),
  'thiep-cuoi-61': makeWeddingScene({
    slug: 'thiep-cuoi-61', name: 'Nắng Mai', paper: '#f8f1ed', ink: '#35251f', accent: '#a75c21', soft: '#f0ded3',
    heroLayout: 'rounded', nameFont: script, nameSize: 58, storyHeading: 'INTERVIEW', calendarStyle: 'heart', particle: 'sparkle',
  }),
  'thiep-cuoi-104': makeWeddingScene({
    slug: 'thiep-cuoi-104', name: 'Illustrated Vows', paper: '#fff8ef', ink: '#36231f', accent: '#e75543', soft: '#fbe4d5',
    heroLayout: 'split', nameFont: display, nameSize: 38, storyHeading: 'HÀNH TRÌNH YÊU', calendarStyle: 'heart', particle: 'petal',
  }),
});

export const sceneTemplateSlugs = Object.freeze(Object.keys(sceneTemplateRegistry));

export function getSceneTemplate(slug) {
  return sceneTemplateRegistry[slug] || null;
}

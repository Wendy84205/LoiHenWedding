import { templateSceneSchema } from './sceneSchema.js';
import { zenLoveManifestItems } from '../zenloveManifest.js';
import visualMetrics from '../../../docs/zenlove-visual-metrics-2026-09-26.json';
import { closingNodes, image, motion, shape, text, widget } from './sceneProfileTemplates.js';
import { profileSceneRegistry } from './sceneProfileTemplates.js';
import { batch2SceneRegistry } from './sceneBatch2Templates.js';

const serif = 'Cormorant Garamond, Georgia, serif';
const display = 'Playfair Display, Georgia, serif';
const script = 'Great Vibes, cursive';
const sans = 'Montserrat, Arial, sans-serif';

const palettes = [
  { paper: '#fffdf8', ink: '#2b2522', accent: '#9a3e48', soft: '#ead8cf' },
  { paper: '#fbf8f1', ink: '#292622', accent: '#8b6b4e', soft: '#d9c9b8' },
  { paper: '#fbfdf9', ink: '#243229', accent: '#637f69', soft: '#ccd9cb' },
  { paper: '#22201f', ink: '#f6eee3', accent: '#c59a5b', soft: '#4b3d30' },
  { paper: '#fff9f6', ink: '#38272b', accent: '#b34f62', soft: '#e6bec1' },
  { paper: '#fbfcfd', ink: '#25313c', accent: '#4c7187', soft: '#c6d4dd' },
];
const heroes = ['editorial', 'portrait', 'traditional', 'letter', 'minimal', 'full'];
const alignments = ['left', 'center', 'right'];

function hashSlug(slug) {
  return [...slug].reduce((hash, character) => ((hash * 31) + character.charCodeAt(0)) >>> 0, 11);
}

function profileFor(item) {
  const hash = hashSlug(item.slug);
  return {
    ...palettes[hash % palettes.length],
    hero: heroes[(hash >>> 3) % heroes.length],
    align: alignments[(hash >>> 5) % alignments.length],
    compact: item.targetPageType === 'FORM' || hash % 5 === 0,
    heading: [display, serif, script][(hash >>> 7) % 3],
    nameSize: 38 + ((hash >>> 9) % 15),
    title: item.name || item.slug,
  };
}

const sourceSceneRegistry = { ...profileSceneRegistry, ...batch2SceneRegistry };

function baseSlugCandidates(item) {
  const candidates = [
    ...(item.localAssetCandidates || []),
    item.slug,
    item.slug.replace(/-(?:pre|premium|basic|new|2025)$/, ''),
  ];
  return [...new Set(candidates)];
}

function mediaSourcesFor(item) {
  for (const candidate of baseSlugCandidates(item)) {
    const sourceScene = sourceSceneRegistry[candidate];
    if (!sourceScene) continue;
    const byId = new Map(sourceScene.nodes.map((node) => [node.id, node]));
    const byRole = new Map();
    sourceScene.nodes.forEach((node) => {
      const role = node.binding?.mediaRole;
      const src = node.props?.src || '';
      if (role && src && !byRole.has(role)) byRole.set(role, src);
    });
    const source = (id, role) => byId.get(id)?.props?.src || byRole.get(role) || '';
    const media = {
      hero: source('hero-photo', 'hero'),
      couple: source('couple-photo', 'couple') || source('story-photo', 'couple'),
      groom: source('groom-photo', 'groom'),
      bride: source('bride-photo', 'bride'),
      story: source('story-photo', 'couple'),
    };
    if (Object.values(media).some(Boolean)) return media;
  }
  return { hero: '', couple: '', groom: '', bride: '', story: '' };
}

function sceneFor(item) {
  const config = profileFor(item);
  const media = mediaSourcesFor(item);
  const heroHeight = config.compact ? 780 : 900;
  const familyTop = heroHeight + 90;
  const storyTop = familyTop + 900;
  const eventTop = storyTop + 980;
  const closingTop = eventTop + 1100;
  const referenceMetric = visualMetrics.metrics[item.slug];
  const baseHeight = closingTop + 1950;
  const referenceHeight = referenceMetric?.aspectRatio ? Math.round(500 * referenceMetric.aspectRatio) : baseHeight;
  const height = Math.min(20000, Math.max(1, referenceHeight));
  const textAlign = config.align;
  const textX = config.align === 'left' ? 28 : config.align === 'right' ? 62 : 40;
  const textWidth = config.align === 'center' ? 420 : 380;
  const heroImage = config.hero === 'portrait'
    ? image('hero-photo', 'Ảnh mở đầu', 'hero', 112, 46, 276, heroHeight - 160, { src: media.hero, borderRadius: 138, objectPositionY: 42, entrance: 'fade' })
    : image('hero-photo', 'Ảnh mở đầu', 'hero', 0, 0, 500, heroHeight, { src: media.hero, entrance: 'fade', objectPositionY: 42 });
  const heroBackground = shape('hero-paper', 'Nền mở đầu', 0, 0, 500, heroHeight, { backgroundColor: config.paper, zIndex: -1 });
  const heroOverlay = config.hero === 'full'
    ? shape('hero-shade', 'Lớp phủ mở đầu', 0, 0, 500, heroHeight, { backgroundColor: '#000000', opacity: 0.24, zIndex: 5 })
    : null;
  const heroColor = config.hero === 'full' ? '#ffffff' : config.ink;

  const nodes = [
    shape('canvas-paper', 'Nền thiệp', 0, 0, 500, baseHeight, { backgroundColor: config.paper, zIndex: -30 }),
    heroBackground,
    heroImage,
    ...(heroOverlay ? [heroOverlay] : []),
    text('hero-kicker', 'Dòng mở đầu', textX, 62, textWidth, 34, { value: item.targetPageType === 'FORM' ? 'WEDDING INVITATION' : 'SAVE THE DATE', color: config.accent, font: sans, fontSize: 11, letterSpacing: 3, align: textAlign, zIndex: 8, animation: motion('fade', 0.1) }),
    text('hero-catalog-name', 'Tên mẫu tham chiếu', textX, 112, textWidth, 34, { value: config.title, color: heroColor, font: sans, fontSize: 10, letterSpacing: 2, align: textAlign, opacity: 0.72, zIndex: 8 }),
    text('groom-name', 'Tên chú rể', textX, 230, textWidth, 68, { binding: { fieldPath: 'couple.groomName', format: 'plain' }, color: heroColor, font: config.heading, fontSize: config.nameSize, align: textAlign, zIndex: 8, animation: motion('left', 0.2) }),
    text('name-and', 'Dấu nối tên', textX, 300, textWidth, 44, { value: '&', color: config.accent, font: display, fontSize: 27, align: textAlign, zIndex: 8, animation: motion('zoom', 0.3) }),
    text('bride-name', 'Tên cô dâu', textX, 350, textWidth, 68, { binding: { fieldPath: 'couple.brideName', format: 'plain' }, color: heroColor, font: config.heading, fontSize: config.nameSize, align: textAlign, zIndex: 8, animation: motion('right', 0.4) }),
    text('hero-date', 'Ngày cưới', textX, heroHeight - 100, textWidth, 34, { binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color: heroColor, font: sans, fontSize: 13, letterSpacing: 3, align: textAlign, zIndex: 8 }),
    widget('particle', 'hero-particle', 'Chi tiết trang trí', 0, 0, 500, heroHeight, { locked: true, zIndex: 9, props: { particle: config.hero === 'traditional' ? 'petal' : 'sparkle' }, animation: motion('fade') }),

    text('family-heading', 'Tiêu đề gia đình', 40, familyTop, 420, 52, { value: 'TWO FAMILIES, ONE LOVE', color: config.accent, font: sans, fontSize: 13, letterSpacing: 3 }),
    image('groom-photo', 'Ảnh chú rể', 'groom', 28, familyTop + 80, 210, 300, { src: media.groom, borderRadius: config.hero === 'portrait' ? 105 : 4, backgroundColor: config.soft, entrance: 'left' }),
    image('bride-photo', 'Ảnh cô dâu', 'bride', 262, familyTop + 80, 210, 300, { src: media.bride, borderRadius: config.hero === 'portrait' ? 105 : 4, backgroundColor: config.soft, entrance: 'right' }),
    text('groom-family', 'Gia đình nhà trai', 28, familyTop + 410, 210, 100, { binding: { fieldPath: 'families.groomFather', format: 'plain' }, color: config.ink, font: serif, fontSize: 18, align: 'center' }),
    text('bride-family', 'Gia đình nhà gái', 262, familyTop + 410, 210, 100, { binding: { fieldPath: 'families.brideFather', format: 'plain' }, color: config.ink, font: serif, fontSize: 18, align: 'center' }),
    text('groom-mother', 'Mẹ chú rể', 28, familyTop + 525, 210, 55, { binding: { fieldPath: 'families.groomMother', format: 'plain' }, color: config.ink, font: sans, fontSize: 12, align: 'center' }),
    text('bride-mother', 'Mẹ cô dâu', 262, familyTop + 525, 210, 55, { binding: { fieldPath: 'families.brideMother', format: 'plain' }, color: config.ink, font: sans, fontSize: 12, align: 'center' }),
    text('groom-address', 'Địa chỉ nhà trai', 28, familyTop + 590, 210, 55, { binding: { fieldPath: 'families.groomAddress', format: 'plain' }, color: config.accent, font: sans, fontSize: 11, align: 'center' }),
    text('bride-address', 'Địa chỉ nhà gái', 262, familyTop + 590, 210, 55, { binding: { fieldPath: 'families.brideAddress', format: 'plain' }, color: config.accent, font: sans, fontSize: 11, align: 'center' }),

    shape('story-panel', 'Nền câu chuyện', 24, storyTop, 452, 760, { backgroundColor: config.soft, opacity: 0.38, zIndex: -1 }),
    text('story-heading', 'Tiêu đề câu chuyện', 40, storyTop + 58, 420, 52, { value: 'OUR LOVE STORY', color: config.accent, font: config.heading, fontSize: 32, align: 'left' }),
    image('story-photo', 'Ảnh câu chuyện', 'couple', 55, storyTop + 140, 390, 250, { src: media.story || media.couple, backgroundColor: config.soft, entrance: 'fade' }),
    text('story-copy', 'Câu chuyện tình yêu', 55, storyTop + 430, 390, 160, { binding: { fieldPath: 'copy.story', format: 'plain' }, color: config.ink, font: serif, fontSize: 20, lineHeight: 1.45, align: 'left' }),
    text('story-quote', 'Lời trích dẫn', 55, storyTop + 630, 390, 70, { binding: { fieldPath: 'copy.quote', format: 'plain' }, color: config.accent, font: config.heading, fontSize: 20, lineHeight: 1.3, align: 'center' }),

    text('event-heading', 'Tiêu đề ngày cưới', 40, eventTop, 420, 60, { value: 'THE WEDDING DAY', color: config.accent, font: sans, fontSize: 13, letterSpacing: 3 }),
    widget('calendar', 'wedding-calendar', 'Lịch ngày cưới', 35, eventTop + 85, 200, 250, { props: { calendarStyle: config.hero === 'traditional' ? 'heart' : 'editorial' }, color: config.ink, backgroundColor: config.soft, borderRadius: 4 }),
    text('event-venue', 'Địa điểm tổ chức', 260, eventTop + 100, 205, 100, { binding: { fieldPath: 'event.venueName', format: 'plain' }, color: config.ink, font: config.heading, fontSize: 24, align: 'left' }),
    text('event-address', 'Địa chỉ tổ chức', 260, eventTop + 220, 205, 80, { binding: { fieldPath: 'event.address', format: 'plain' }, color: config.ink, font: sans, fontSize: 12, lineHeight: 1.5, align: 'left' }),
    widget('map', 'venue-map', 'Mở bản đồ', 260, eventTop + 325, 205, 54, { binding: { fieldPath: 'event.mapUrl' }, props: { buttonLabel: 'Xem chỉ đường' }, color: config.paper, backgroundColor: config.accent, borderRadius: 3 }),
    widget('countdown', 'wedding-countdown', 'Đếm ngược ngày cưới', 40, eventTop + 450, 420, 100, { color: config.accent, font: sans, props: { targetDate: '2027-12-15T10:30:00+07:00' } }),

    ...closingNodes({ ...config, albumHeading: 'ALBUM OF LOVE' }, closingTop),
    widget('rsvp', 'rsvp-form', 'Xác nhận tham dự', 40, closingTop + 430, 420, 320, { props: { heading: 'Xác nhận tham dự', buttonLabel: 'Gửi xác nhận' }, backgroundColor: config.soft, color: config.ink, borderRadius: 3 }),
    widget('wish', 'wish-form', 'Gửi lời chúc', 40, closingTop + 790, 420, 300, { props: { heading: 'Gửi lời chúc', buttonLabel: 'Gửi lời chúc' }, backgroundColor: config.paper, color: config.ink, borderRadius: 3 }),
  ];

  const verticalScale = height / baseHeight;
  const scaledNodes = nodes.map((node) => ({
    ...node,
    y: Math.round(node.y * verticalScale * 100) / 100,
    height: Math.round(node.height * verticalScale * 100) / 100,
    style: node.style?.fontSize
      ? { ...node.style, fontSize: Math.max(8, Math.round(node.style.fontSize * verticalScale * 100) / 100) }
      : node.style,
  }));

  return templateSceneSchema.parse({
    slug: item.slug,
    version: '2026.09.26-reconstructed',
    name: `${config.title} · Reconstructed scene`,
    canvas: { width: 500, height, backgroundColor: config.paper },
    nodes: scaledNodes,
    capabilities: ['text', 'image', 'shape', 'calendar', 'countdown', 'map', 'rsvp', 'wish', 'giftQr', 'album', 'carousel', 'particle'],
  });
}

const rebuiltItems = zenLoveManifestItems.filter((item) => item.localImplementation === 'reconstructed');

export const zenLoveRebuiltSceneRegistry = Object.freeze(
  Object.fromEntries(rebuiltItems.map((item) => [item.slug, sceneFor(item)])),
);

export const zenLoveRebuiltSceneSlugs = Object.freeze(Object.keys(zenLoveRebuiltSceneRegistry));
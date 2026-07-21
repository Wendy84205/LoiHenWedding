import { batch2SceneRegistry } from './scene/sceneBatch2Templates.js';
import { profileSceneRegistry } from './scene/sceneProfileTemplates.js';

const commonSlots = [
  { kind: 'hero', label: 'Ảnh mở đầu', accept: 'image/jpeg,image/png,image/webp' },
  { kind: 'couple', label: 'Ảnh cặp đôi', accept: 'image/jpeg,image/png,image/webp' },
  { kind: 'bride', label: 'Ảnh cô dâu', accept: 'image/jpeg,image/png,image/webp' },
  { kind: 'groom', label: 'Ảnh chú rể', accept: 'image/jpeg,image/png,image/webp' },
  { kind: 'gallery', label: 'Album ảnh', accept: 'image/jpeg,image/png,image/webp,image/gif', multiple: true },
  { kind: 'music', label: 'Nhạc nền', accept: 'audio/mpeg,audio/mp4' },
  { kind: 'gift_qr', label: 'QR mừng cưới', accept: 'image/jpeg,image/png,image/webp' },
];

function layers(selectors) {
  return [
    { key: 'cover', label: 'Mở đầu', tab: 'media', selector: selectors.cover },
    { key: 'couple', label: 'Cặp đôi', tab: 'couple', selector: selectors.couple },
    { key: 'families', label: 'Gia đình', tab: 'families', selector: selectors.families },
    { key: 'event', label: 'Ngày cưới', tab: 'event', selector: selectors.event },
    { key: 'story', label: 'Câu chuyện', tab: 'story', selector: selectors.story },
    { key: 'media', label: 'Album ảnh', tab: 'media', selector: selectors.media },
  ].filter((item) => item.selector);
}

const sceneLayers = [
  { key: 'cover', label: 'Mở đầu', tab: 'media', selector: '.sceneInvitation [data-scene-node^="hero-"],.sceneInvitation [data-scene-node^="opening-"]' },
  { key: 'couple', label: 'Cặp đôi', tab: 'couple', selector: '.sceneInvitation [data-scene-node^="groom-"],.sceneInvitation [data-scene-node^="bride-"]' },
  { key: 'families', label: 'Gia đình', tab: 'families', selector: '.sceneInvitation [data-scene-node^="family-"]' },
  { key: 'event', label: 'Ngày cưới', tab: 'event', selector: '.sceneInvitation [data-scene-node^="event-"],.sceneInvitation [data-scene-node^="wedding-calendar"],.sceneInvitation [data-scene-node^="wedding-countdown"],.sceneInvitation [data-scene-node^="venue-"]' },
  { key: 'story', label: 'Câu chuyện', tab: 'story', selector: '.sceneInvitation [data-scene-node^="story-"]' },
  { key: 'media', label: 'Album ảnh', tab: 'media', selector: '.sceneInvitation [data-scene-node^="album-"],.sceneInvitation [data-scene-node^="wedding-album"],.sceneInvitation [data-scene-node^="thank-you"]' },
];

function sceneManifest(name, accent) {
  return {
    name, accent, rootSelector: '.sceneInvitation', slots: commonSlots,
    mediaRoles: ['hero', 'couple', 'bride', 'groom', 'venue', 'final', 'gallery'],
    layers: sceneLayers,
  };
}

const batch2EditorManifests = Object.fromEntries(
  Object.entries({ ...profileSceneRegistry, ...batch2SceneRegistry }).map(([slug, template]) => {
    const accent = template.nodes.find((node) => node.id === 'venue-map')?.style?.backgroundColor
      || template.nodes.find((node) => node.id === 'hero-accent-line')?.style?.backgroundColor
      || '#8a6d5a';
    return [slug, sceneManifest(template.name, accent)];
  }),
);

export const editorTemplateManifests = {
  ...batch2EditorManifests,
  'thiep-cuoi-2': sceneManifest('Golden Vow', '#ad8d60'),
  'thiep-cuoi-16': sceneManifest('Beige Love Story', '#9d8775'),
  'thiep-cuoi-19': sceneManifest('White Editorial', '#887a6f'),
  'thiep-cuoi-36': sceneManifest('Oval Promise', '#d94747'),
  'thiep-cuoi-38': sceneManifest('Red Double Joy', '#8f2428'),
  'thiep-cuoi-40': sceneManifest('Pearl Portrait', '#7c3436'),
  'thiep-cuoi-42': sceneManifest('Crimson Envelope', '#b13b44'),
  'thiep-cuoi-46': sceneManifest('Red Arch Schedule', '#8b181c'),
  'thiep-cuoi-48': sceneManifest('Botanical Envelope', '#385c3d'),
  'thiep-cuoi-60': sceneManifest('Pink Envelope', '#b85f79'),
  'thiep-cuoi-39': {
    name: 'Editorial Red', accent: '#9d1728', rootSelector: '.template39', slots: commonSlots,
    mediaRoles: ['hero', 'bride', 'groom', 'venue', 'final'],
    layers: layers({ cover: '.t39-cover', couple: '.t39-couple', families: '.t39-families', event: '.t39-save', story: '.t39-story', media: '.t39-final' }),
  },
  'thiep-cuoi-44': {
    name: 'Minimal Envelope', accent: '#a18569', rootSelector: '.template44', slots: commonSlots,
    mediaRoles: ['hero', 'couple', 'bride', 'groom', 'final', 'gallery'],
    layers: layers({ cover: '.t44-cover', couple: '.t44-couple', families: '.t44-openInvite', event: '.t44-calendarSection', story: '.t44-quotePaper', media: '.t44-welcome' }),
  },
  'thiep-cuoi-47': {
    name: 'Ruby Editorial', accent: '#7b1519', rootSelector: '.template47', slots: commonSlots,
    mediaRoles: ['hero', 'couple', 'gallery'],
    layers: layers({ cover: '.t47-cover', couple: '.t47-familyPortrait', families: '.t47-family', event: '.t47-invitation', story: '.t47-story', media: '.t47-album' }),
  },
  'thiep-cuoi-61': {
    name: 'Nắng Mai', accent: '#a75c21', rootSelector: '.template61', slots: commonSlots,
    mediaRoles: ['hero', 'couple', 'bride', 'groom', 'final', 'gallery'],
    layers: layers({ cover: '.t61-opening, .t61-hero', couple: '.t61-invitation', families: '.t61-familyGrid', event: '.t61-saveDate', story: '.t61-interview', media: '.t61-gallery' }),
  },
  'thiep-cuoi-104': {
    name: 'Illustrated Vows', accent: '#e75543', rootSelector: '.t104n', slots: commonSlots,
    mediaRoles: ['hero', 'venue'],
    layers: layers({ cover: '.t104n-intro, .t104n-hero', couple: '.t104n-title', event: '.t104n-invite', story: '.t104n-note', media: '.t104n-timeline' }),
  },
};

export function getEditorManifest(templateSlug) {
  return editorTemplateManifests[templateSlug] || null;
}

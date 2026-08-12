import { currentCatalogSlugs } from '../data/invitationCatalog.js';

export const catalogTemplateSlugs = Object.freeze([...currentCatalogSlugs]);
export const editableTemplateSlugs = Object.freeze([
  'thiep-cuoi-1',
  'thiep-cuoi-2',
  'thiep-cuoi-3',
  'thiep-cuoi-4',
  'thiep-cuoi-5',
  'thiep-cuoi-6',
  'thiep-cuoi-7',
  'thiep-cuoi-8',
  'thiep-cuoi-9',
  'thiep-cuoi-10',
  'thiep-cuoi-11',
  'thiep-cuoi-12',
  'thiep-cuoi-13',
  'thiep-cuoi-14',
  'thiep-cuoi-15',
  'thiep-cuoi-16',
  'thiep-cuoi-17',
  'thiep-cuoi-18',
  'thiep-cuoi-19',
  'thiep-cuoi-20',
  'thiep-cuoi-21',
  'thiep-cuoi-22',
  'thiep-cuoi-23',
  'thiep-cuoi-24',
  'thiep-cuoi-25',
  'thiep-cuoi-26',
  'thiep-cuoi-27',
  'thiep-cuoi-28',
  'thiep-cuoi-29',
  'thiep-cuoi-30',
  'thiep-cuoi-31',
  'thiep-cuoi-32',
  'thiep-cuoi-33',
  'thiep-cuoi-34',
  'thiep-cuoi-35',
  'thiep-cuoi-36',
  'thiep-cuoi-37',
  'thiep-cuoi-38',
  'thiep-cuoi-39',
  'thiep-cuoi-40',
  'thiep-cuoi-41',
  'thiep-cuoi-42',
  'thiep-cuoi-43',
  'thiep-cuoi-44',
  'thiep-cuoi-46',
  'thiep-cuoi-47',
  'thiep-cuoi-48',
  'thiep-cuoi-49',
  'thiep-cuoi-50',
  'thiep-cuoi-52',
  'thiep-cuoi-53',
  'thiep-cuoi-54',
  'thiep-cuoi-55',
  'thiep-cuoi-56',
  'thiep-cuoi-57',
  'thiep-cuoi-58',
  'thiep-cuoi-59',
  'thiep-cuoi-60',
  'thiep-cuoi-61',
  'thiep-cuoi-62',
  'thiep-cuoi-63',
  'thiep-cuoi-64',
  'thiep-cuoi-65',
  'thiep-cuoi-66',
  'thiep-cuoi-67',
  'thiep-cuoi-68',
  'thiep-cuoi-69',
  'thiep-cuoi-70',
  'thiep-cuoi-71',
  'thiep-cuoi-72',
  'thiep-cuoi-73',
  'thiep-cuoi-74',
  'thiep-cuoi-75',
  'thiep-cuoi-76',
  'thiep-cuoi-77',
  'thiep-cuoi-78',
  'thiep-cuoi-79',
  'thiep-cuoi-80',
  'thiep-cuoi-81',
  'thiep-cuoi-82',
  'thiep-cuoi-83',
  'thiep-cuoi-84',
  'thiep-cuoi-85',
  'thiep-cuoi-86',
  'thiep-cuoi-87',
  'thiep-cuoi-88',
  'thiep-cuoi-89',
  'thiep-cuoi-90',
  'thiep-cuoi-91',
  'thiep-cuoi-92',
  'thiep-cuoi-93',
  'thiep-cuoi-94',
  'thiep-cuoi-95',
  'thiep-cuoi-96',
  'thiep-cuoi-97',
  'thiep-cuoi-98',
  'thiep-cuoi-99',
  'thiep-cuoi-100',
  'thiep-cuoi-101',
  'thiep-cuoi-102',
  'thiep-cuoi-103',
  'thiep-cuoi-104',
  'thiep-cuoi-105',
  'thiep-cuoi-106',
  'thiep-cuoi-107',
  'thiep-cuoi-108',
  'thiep-bw-1',
  'thiep-cuoi-tone-xanh',
]);

// Kept as a compatibility export for the existing order and editor flows.
export const commercialTemplateSlugs = editableTemplateSlugs;

export const invitationLayerKeys = ['cover', 'couple', 'families', 'event', 'story', 'media'];
export const invitationLayerEffectKeys = ['original', 'fade', 'rise', 'left', 'right', 'zoom'];

export const invitationPaletteKeys = ['original', 'pearl', 'blush', 'sage', 'midnight', 'custom'];
export const invitationFontKeys = ['original', 'classic', 'modern', 'romantic'];
export const invitationMediaPositionKeys = ['hero', 'couple', 'bride', 'groom', 'venue', 'final', 'gallery'];
export const invitationTextAlignKeys = ['left', 'center', 'right'];
export const invitationTextFieldKeys = [
  'couple.groomName', 'couple.groomFullName', 'couple.groomBirthDate',
  'couple.brideName', 'couple.brideFullName', 'couple.brideBirthDate',
  'families.groomFather', 'families.groomMother', 'families.groomAddress',
  'families.brideFather', 'families.brideMother', 'families.brideAddress',
  'event.startsAt.date', 'event.startsAt.time', 'event.lunarDate',
  'event.venueName', 'event.address', 'event.mapUrl',
  'copy.intro', 'copy.story', 'copy.quote', 'copy.thankYou',
];

export function isInvitationTextFieldKey(value) {
  return invitationTextFieldKeys.includes(value) || /^schedule\.[0-7]\.(?:time|label)$/.test(value || '');
}

export const invitationPalettePresets = {
  original: {
    name: 'Nguyên bản', description: 'Giữ màu sắc riêng của mẫu', surface: '', ink: '', accent: '',
  },
  pearl: {
    name: 'Ngọc trai', description: 'Trắng thanh lịch, nhấn champagne', surface: '#fffdf9', ink: '#262321', accent: '#a58661',
  },
  blush: {
    name: 'Hồng phấn', description: 'Ấm áp và lãng mạn', surface: '#fff7f7', ink: '#3d292c', accent: '#a84e5e',
  },
  sage: {
    name: 'Xanh lá', description: 'Tự nhiên và nhẹ nhàng', surface: '#f7faf6', ink: '#26332b', accent: '#6a806d',
  },
  midnight: {
    name: 'Dạ tiệc', description: 'Tương phản tối, nhấn ánh kim', surface: '#191918', ink: '#f7f3ea', accent: '#cfaf75',
  },
};

export const invitationFontPresets = {
  original: { name: 'Nguyên bản', description: 'Giữ đúng bộ chữ của mẫu', body: '', heading: '' },
  classic: {
    name: 'Cổ điển', description: 'Thanh lịch, dễ đọc',
    body: '"Cormorant Garamond", Georgia, serif', heading: '"Playfair Display", Georgia, serif',
  },
  modern: {
    name: 'Hiện đại', description: 'Gọn, rõ trên điện thoại',
    body: '"Outfit", Arial, sans-serif', heading: '"Montserrat", "Outfit", Arial, sans-serif',
  },
  romantic: {
    name: 'Lãng mạn', description: 'Nét viết tay cho tiêu đề',
    body: '"Cormorant Garamond", Georgia, serif', heading: '"Great Vibes", "Cormorant Garamond", cursive',
  },
};

export const defaultInvitationTheme = {
  hiddenLayers: [],
  motion: 'full',
  palette: 'original',
  font: 'original',
  colors: { surface: '', ink: '', accent: '' },
  mediaPositions: {},
  layerEffects: {},
  textStyles: {},
};

export const commercePackages = {
  basic: {
    code: 'basic',
    name: 'Thiệp cưới Online',
    amount: 50000,
    depositAmount: 50000,
    revisionLimit: 3,
    retentionMonths: 12,
    limits: { images: 50, assets: 60, storageBytes: 524288000, guests: 1000 },
    description: 'Một mức giá cho mọi mẫu: tự chỉnh sửa ảnh, nội dung, nhạc, RSVP, lời chúc, QR mừng cưới và link chia sẻ riêng.',
  },
};

export const defaultInvitationContent = {
  couple: {
    groomName: 'Minh Trí',
    groomFullName: 'Nguyễn Minh Trí',
    groomBirthDate: '06.05.1998',
    brideName: 'Thanh Hằng',
    brideFullName: 'Phạm Thanh Hằng',
    brideBirthDate: '20.08.2001',
  },
  families: {
    groomFather: 'Ông. Phạm Minh Hải',
    groomMother: 'Bà. Nguyễn Mai Thu',
    groomAddress: 'TP. Hà Nội',
    brideFather: 'Ông. Trần Anh Tài',
    brideMother: 'Bà. Nguyễn Thanh Mai',
    brideAddress: 'TP. Quảng Ninh',
  },
  event: {
    startsAt: '2027-12-15T10:30:00+07:00',
    venueName: 'Khách sạn Mường Thanh Luxury Quảng Ninh',
    address: 'Phường Bãi Cháy, tỉnh Quảng Ninh',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Muong+Thanh+Luxury+Quang+Ninh',
    lunarDate: 'Tức ngày 17 tháng 11 năm Bính Ngọ',
  },
  copy: {
    intro: 'Trân trọng kính mời bạn đến chung vui cùng gia đình chúng mình.',
    story: 'Giữa muôn vàn gặp gỡ, chúng mình may mắn tìm thấy nhau. Từ những ngày đầu bỡ ngỡ, qua bao vui buồn và thử thách, tình yêu vẫn lớn dần thành sự thấu hiểu và đồng hành.',
    quote: 'Chúng mình gặp nhau giữa dòng đời và rồi chúng mình thuộc về nhau.',
    thankYou: 'Cảm ơn bạn đã dành tình cảm cho chúng mình. Sự hiện diện của bạn chính là món quà ý nghĩa nhất trong ngày trọng đại này.',
  },
  schedule: [
    { time: '10:30', label: 'Đón tiếp khách' },
    { time: '10:45', label: 'Lễ thành hôn' },
    { time: '11:00', label: 'Khai tiệc' },
  ],
  media: {
    hero: '',
    bride: '',
    groom: '',
    couple: '',
    venue: '',
    final: '',
    social: '',
    music: '',
    giftQr: '',
    gallery: [],
  },
  gift: {
    groomQr: '',
    brideQr: '',
  },
};

export function normalizeInvitationTheme(value = {}) {
  const hiddenLayers = Array.isArray(value?.hiddenLayers)
    ? [...new Set(value.hiddenLayers.filter((key) => invitationLayerKeys.includes(key)))]
    : [];
  const normalizeColor = (color) => (/^#[0-9a-f]{6}$/i.test(String(color || '')) ? String(color).toLowerCase() : '');
  const palette = invitationPaletteKeys.includes(value?.palette) ? value.palette : 'original';
  const font = invitationFontKeys.includes(value?.font) ? value.font : 'original';
  const mediaPositions = Object.fromEntries(invitationMediaPositionKeys.flatMap((key) => {
    const position = value?.mediaPositions?.[key];
    if (!position || typeof position !== 'object' || Array.isArray(position)) return [];
    const x = Number(position.x);
    const y = Number(position.y);
    if (!Number.isFinite(x) || !Number.isFinite(y)) return [];
    return [[key, {
      x: Math.round(Math.min(100, Math.max(0, x))),
      y: Math.round(Math.min(100, Math.max(0, y))),
    }]];
  }));
  const layerEffects = Object.fromEntries(invitationLayerKeys.flatMap((key) => {
    const effect = value?.layerEffects?.[key];
    return invitationLayerEffectKeys.includes(effect) && effect !== 'original' ? [[key, effect]] : [];
  }));
  const textStyles = Object.fromEntries(Object.entries(value?.textStyles || {}).flatMap(([fieldPath, style]) => {
    if (!isInvitationTextFieldKey(fieldPath) || !style || typeof style !== 'object' || Array.isArray(style)) return [];
    const normalized = {};
    const fontSize = Number(style.fontSize);
    const color = normalizeColor(style.color);
    if (Number.isFinite(fontSize) && fontSize > 0) normalized.fontSize = Math.round(Math.min(96, Math.max(10, fontSize)));
    if (color) normalized.color = color;
    if (invitationTextAlignKeys.includes(style.align)) normalized.align = style.align;
    if (invitationFontKeys.includes(style.font) && style.font !== 'original') normalized.font = style.font;
    if (style.bold === true) normalized.bold = true;
    if (style.italic === true) normalized.italic = true;
    return Object.keys(normalized).length ? [[fieldPath, normalized]] : [];
  }));
  return {
    hiddenLayers,
    motion: value?.motion === 'reduced' ? 'reduced' : 'full',
    palette,
    font,
    colors: {
      surface: normalizeColor(value?.colors?.surface),
      ink: normalizeColor(value?.colors?.ink),
      accent: normalizeColor(value?.colors?.accent),
    },
    mediaPositions,
    layerEffects,
    textStyles,
  };
}

export function resolveInvitationPalette(value = {}, fallbackAccent = '#9b7657') {
  const theme = normalizeInvitationTheme(value);
  const preset = invitationPalettePresets[theme.palette] || invitationPalettePresets.original;
  return {
    surface: theme.colors.surface || preset.surface || '#ffffff',
    ink: theme.colors.ink || preset.ink || '#202020',
    accent: theme.colors.accent || preset.accent || fallbackAccent,
  };
}

function mergeObject(base, value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return { ...base };
  return { ...base, ...value };
}

export function normalizeInvitationContent(value = {}) {
  return {
    ...defaultInvitationContent,
    ...value,
    couple: mergeObject(defaultInvitationContent.couple, value.couple),
    families: mergeObject(defaultInvitationContent.families, value.families),
    event: mergeObject(defaultInvitationContent.event, value.event),
    copy: mergeObject(defaultInvitationContent.copy, value.copy),
    media: mergeObject(defaultInvitationContent.media, value.media),
    gift: mergeObject(defaultInvitationContent.gift, value.gift),
    schedule: Array.isArray(value.schedule) && value.schedule.length
      ? value.schedule.slice(0, 8)
      : defaultInvitationContent.schedule,
  };
}

export function slugifyWedding(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

export function buildInitialInvitationContent(input) {
  const startsAt = input.eventDate
    ? `${input.eventDate}T${input.eventTime || '11:00'}:00+07:00`
    : defaultInvitationContent.event.startsAt;

  return normalizeInvitationContent({
    couple: {
      groomName: input.groomName,
      groomFullName: input.groomName,
      brideName: input.brideName,
      brideFullName: input.brideName,
    },
    event: {
      startsAt,
      venueName: input.venueName,
      address: input.address,
      mapUrl: input.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(input.address || input.venueName || '')}`,
    },
    copy: {
      intro: input.invitationMessage || defaultInvitationContent.copy.intro,
    },
  });
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value || 0);
}

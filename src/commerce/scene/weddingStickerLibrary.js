export const WEDDING_STICKER_CATEGORIES = Object.freeze([
  Object.freeze({
    id: 'love',
    label: 'Tình yêu',
    description: 'Biểu tượng của lời hẹn và hai người về chung một nhà.',
    stickers: Object.freeze([
      Object.freeze({ id: 'heart', label: 'Trái tim', glyph: '♥', color: '#b3184b' }),
      Object.freeze({ id: 'heart-outline', label: 'Trái tim đôi', glyph: '♡', color: '#b3184b' }),
      Object.freeze({ id: 'ring', label: 'Cặp nhẫn', glyph: '💍', color: '#9b7657' }),
      Object.freeze({ id: 'infinity', label: 'Mãi mãi', glyph: '∞', color: '#9b7657' }),
      Object.freeze({ id: 'love-letter', label: 'Thư tình', glyph: '✉', color: '#b3184b' }),
      Object.freeze({ id: 'kiss', label: 'Dấu hôn', glyph: '❣', color: '#b3184b' }),
    ]),
  }),
  Object.freeze({
    id: 'floral',
    label: 'Hoa lá',
    description: 'Điểm xuyết nhẹ nhàng cho thiệp botanical và lãng mạn.',
    stickers: Object.freeze([
      Object.freeze({ id: 'flower', label: 'Hoa nhỏ', glyph: '✿', color: '#b3184b' }),
      Object.freeze({ id: 'rose', label: 'Hoa hồng', glyph: '🌹', color: '#b3184b' }),
      Object.freeze({ id: 'blossom', label: 'Cánh hoa', glyph: '❀', color: '#d65c7b' }),
      Object.freeze({ id: 'leaf', label: 'Cành lá', glyph: '❦', color: '#507052' }),
      Object.freeze({ id: 'botanical', label: 'Lá xanh', glyph: '🌿', color: '#507052' }),
      Object.freeze({ id: 'wreath', label: 'Vòng nguyệt quế', glyph: '❧', color: '#9b7657' }),
    ]),
  }),
  Object.freeze({
    id: 'celebration',
    label: 'Ngày vui',
    description: 'Nhấn nhá cho các khung chúc mừng, tiệc và khoảnh khắc đáng nhớ.',
    stickers: Object.freeze([
      Object.freeze({ id: 'champagne', label: 'Nâng ly', glyph: '🥂', color: '#b68a4d' }),
      Object.freeze({ id: 'cake', label: 'Bánh cưới', glyph: '🎂', color: '#b3184b' }),
      Object.freeze({ id: 'bow', label: 'Nơ', glyph: '🎀', color: '#b3184b' }),
      Object.freeze({ id: 'confetti', label: 'Pháo hoa giấy', glyph: '🎊', color: '#b68a4d' }),
      Object.freeze({ id: 'bells', label: 'Chuông cưới', glyph: '🔔', color: '#b68a4d' }),
      Object.freeze({ id: 'sparkle', label: 'Tỏa sáng', glyph: '✦', color: '#b68a4d' }),
    ]),
  }),
  Object.freeze({
    id: 'moments',
    label: 'Khoảnh khắc',
    description: 'Gợi ý trực quan cho ngày cưới, địa điểm, ảnh và âm nhạc.',
    stickers: Object.freeze([
      Object.freeze({ id: 'calendar-mark', label: 'Ngày hẹn', glyph: '▣', color: '#9b7657' }),
      Object.freeze({ id: 'location-pin', label: 'Địa điểm', glyph: '⌖', color: '#b3184b' }),
      Object.freeze({ id: 'camera', label: 'Ảnh kỷ niệm', glyph: '📷', color: '#9b7657' }),
      Object.freeze({ id: 'music-note', label: 'Bản tình ca', glyph: '♪', color: '#b3184b' }),
      Object.freeze({ id: 'toast', label: 'Chúc mừng', glyph: '✧', color: '#b68a4d' }),
      Object.freeze({ id: 'photo-frame', label: 'Khung ảnh', glyph: '▱', color: '#9b7657' }),
    ]),
  }),
  Object.freeze({
    id: 'soft',
    label: 'Dịu dàng',
    description: 'Những điểm chạm thơ mộng dành cho thiệp tối giản và cinematic.',
    stickers: Object.freeze([
      Object.freeze({ id: 'dove', label: 'Bồ câu', glyph: '🕊', color: '#9b7657' }),
      Object.freeze({ id: 'butterfly', label: 'Bươm bướm', glyph: '🦋', color: '#b3184b' }),
      Object.freeze({ id: 'stars', label: 'Sao đêm', glyph: '⋆', color: '#b68a4d' }),
      Object.freeze({ id: 'moon', label: 'Trăng khuyết', glyph: '☾', color: '#9b7657' }),
      Object.freeze({ id: 'cloud', label: 'Mây mềm', glyph: '☁', color: '#9b7657' }),
      Object.freeze({ id: 'ribbon', label: 'Dải lụa', glyph: '〰', color: '#b3184b' }),
    ]),
  }),
]);

export const WEDDING_STICKERS = Object.freeze(WEDDING_STICKER_CATEGORIES.flatMap((category) => category.stickers));
export const WEDDING_STICKER_IDS = Object.freeze(WEDDING_STICKERS.map((sticker) => sticker.id));
export const DEFAULT_WEDDING_STICKER_ID = 'heart';

export function getWeddingSticker(stickerId) {
  return WEDDING_STICKERS.find((sticker) => sticker.id === stickerId) || WEDDING_STICKERS[0];
}

export function getWeddingStickerCategory(stickerId) {
  return WEDDING_STICKER_CATEGORIES.find((category) => category.stickers.some((sticker) => sticker.id === stickerId)) || WEDDING_STICKER_CATEGORIES[0];
}

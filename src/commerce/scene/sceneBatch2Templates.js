import { templateSceneSchema } from './sceneSchema.js';
import { closingNodes, image, motion, shape, text, widget } from './sceneProfileTemplates.js';

const serif = 'Cormorant Garamond, Georgia, serif';
const display = 'Playfair Display, Georgia, serif';
const script = 'Great Vibes, cursive';
const sans = 'Montserrat, Arial, sans-serif';
const narrow = 'Oswald, Arial Narrow, sans-serif';

function coupleNameRow(config, y, color, options = {}) {
  const font = options.font || config.nameFont || script;
  const size = options.size || 32;
  return [
    text('groom-name', 'Tên chú rể', 22, y, 205, 58, {
      binding: { fieldPath: 'couple.groomName', format: 'plain' }, color, font, fontSize: size,
      entrance: 'left', zIndex: options.zIndex || 10,
    }),
    text('name-and', 'Dấu nối tên', 225, y + 5, 50, 48, {
      value: '&', color: options.accent || config.accent, font: display, fontSize: Math.max(20, size - 7),
      entrance: 'zoom', delay: 0.12, zIndex: options.zIndex || 10,
    }),
    text('bride-name', 'Tên cô dâu', 273, y, 205, 58, {
      binding: { fieldPath: 'couple.brideName', format: 'plain' }, color, font, fontSize: size,
      entrance: 'right', delay: 0.2, zIndex: options.zIndex || 10,
    }),
  ];
}

function heroNodes(config) {
  if (config.hero === 'ocean') return [
    image('hero-photo', 'Ảnh biển mở đầu', 'hero', 0, 0, 500, 920, { src: config.heroSrc, entrance: 'fade', objectPositionY: 45 }),
    shape('hero-shade', 'Lớp phủ xanh', 0, 0, 500, 920, { backgroundColor: '#20394d', opacity: 0.16, zIndex: 5 }),
    text('hero-topline', 'Thông điệp đầu trang', 24, 24, 452, 40, { value: 'YOU ARE                  THE LOVE OF                  MY LIFE', color: '#ffffff', font: sans, fontSize: 12, letterSpacing: 1, zIndex: 8, entrance: 'fade' }),
    text('hero-title', 'We got married', 55, 78, 390, 190, { value: 'We got\nMarried', color: '#ffffff', font: script, fontSize: 68, lineHeight: 0.86, zIndex: 8, entrance: 'zoom' }),
    text('hero-quote', 'Lời mở đầu', 45, 300, 410, 72, { binding: { fieldPath: 'copy.quote', format: 'plain' }, color: '#ffffff', font: serif, fontSize: 18, lineHeight: 1.35, zIndex: 8 }),
    ...coupleNameRow(config, 690, '#ffffff', { size: 31, zIndex: 8 }),
    text('hero-date', 'Ngày cưới', 125, 760, 250, 40, { binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color: '#ffffff', font: sans, fontSize: 16, letterSpacing: 3, zIndex: 8 }),
    widget('particle', 'hero-particle', 'Ánh nắng trên biển', 0, 0, 500, 920, { locked: true, zIndex: 9, props: { particle: 'sparkle' }, animation: motion('fade') }),
  ];

  if (config.hero === 'traditional') return [
    shape('hero-paper', 'Nền giấy truyền thống', 0, 0, 500, 920, { backgroundColor: config.paper }),
    text('hero-kicker', 'Thông báo thành hôn', 25, 38, 290, 36, { value: 'WE ARE GETTING MARRIED', color: config.ink, font: sans, fontSize: 11, letterSpacing: 5, align: 'left', entrance: 'left' }),
    text('hero-subtitle', 'Our wedding', 25, 85, 210, 40, { value: 'OUR WEDDING', color: config.ink, font: display, fontSize: 16, align: 'left' }),
    text('hero-double-joy', 'Song hỷ', 375, 24, 105, 120, { value: '囍', color: config.accent, font: serif, fontSize: 82, locked: true, entrance: 'right' }),
    image('hero-photo', 'Ảnh mở đầu', 'hero', 150, 145, 330, 615, { src: config.heroSrc, entrance: 'right', objectPositionY: 36 }),
    shape('hero-name-card', 'Thẻ tên', 25, 650, 330, 228, { backgroundColor: '#fffdf9', opacity: 0.94, zIndex: 6 }),
    text('groom-name', 'Tên chú rể', 48, 675, 250, 66, { binding: { fieldPath: 'couple.groomName', format: 'plain' }, color: config.ink, font: narrow, fontSize: 42, align: 'left', zIndex: 8, entrance: 'left' }),
    text('name-and', 'Dấu nối tên', 50, 735, 55, 44, { value: '&', color: config.accent, font: display, fontSize: 28, align: 'left', zIndex: 8, entrance: 'zoom' }),
    text('bride-name', 'Tên cô dâu', 48, 775, 250, 66, { binding: { fieldPath: 'couple.brideName', format: 'plain' }, color: config.ink, font: narrow, fontSize: 42, align: 'left', zIndex: 8, entrance: 'left' }),
    text('hero-date', 'Ngày cưới', 48, 850, 250, 32, { binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color: config.ink, font: sans, fontSize: 11, letterSpacing: 4, align: 'left', zIndex: 8 }),
  ];

  if (config.hero === 'letter') return [
    shape('hero-paper', 'Nền thư', 0, 0, 500, 920, { backgroundColor: '#ffffff' }),
    text('hero-date-line', 'Save the date', 28, 30, 430, 70, { value: 'Save The Date | Chúng mình kết hôn rồi !!!', color: config.ink, font: sans, fontSize: 16, align: 'left', entrance: 'left' }),
    text('hero-date', 'Ngày và giờ', 28, 72, 250, 36, { binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color: config.ink, font: serif, fontSize: 18, align: 'left' }),
    text('hero-intro', 'Lời nhắn mở đầu', 185, 135, 285, 110, { binding: { fieldPath: 'copy.intro', format: 'plain' }, color: config.ink, font: serif, fontSize: 16, lineHeight: 1.35, align: 'right', entrance: 'right' }),
    text('hero-welcome', 'Welcome to our wedding', 45, 245, 410, 58, { value: 'welcome to our wedding', color: config.ink, font: narrow, fontSize: 32, entrance: 'rise' }),
    image('hero-photo', 'Ảnh chân dung mở đầu', 'hero', 70, 315, 360, 570, { src: config.heroSrc, entrance: 'rise', objectPositionY: 35 }),
    ...coupleNameRow(config, 820, '#8d313b', { font: narrow, size: 25, zIndex: 8 }),
  ];

  if (config.hero === 'red-poster') return [
    shape('hero-red', 'Nền poster đỏ', 0, 0, 500, 920, { backgroundColor: config.accent }),
    text('hero-quote', 'Thông điệp mở đầu', 50, 165, 400, 76, { value: 'YOU ARE MY TODAY\nAND ALL OF MY TOMORROW', color: config.soft, font: display, fontSize: 18, lineHeight: 1.45, letterSpacing: 1, entrance: 'fade' }),
    image('hero-photo', 'Ảnh poster', 'hero', 28, 270, 444, 390, { src: config.heroSrc, entrance: 'zoom', objectPositionY: 35 }),
    text('hero-date', 'Ngày cưới', 80, 710, 340, 54, { binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color: config.soft, font: display, fontSize: 31, letterSpacing: 2 }),
    ...coupleNameRow(config, 775, config.soft, { font: display, size: 24, accent: '#ffffff' }),
    text('hero-welcome', 'Welcome to our wedding', 40, 850, 420, 48, { value: 'WELCOME TO OUR WEDDING', color: config.soft, font: display, fontSize: 22, letterSpacing: 2 }),
  ];

  if (config.hero === 'music-dark') return [
    shape('hero-black', 'Nền máy nghe nhạc', 0, 0, 500, 920, { backgroundColor: '#050505' }),
    text('hero-title', 'Wedding day', 28, 45, 300, 120, { value: 'WEDDING\nDAY', color: '#ffffff', font: display, fontSize: 39, lineHeight: 1.8, letterSpacing: 5, align: 'left', entrance: 'left' }),
    image('hero-photo', 'Ảnh bìa ngày cưới', 'hero', 28, 195, 444, 565, { src: config.heroSrc, entrance: 'zoom', borderRadius: 28, objectPositionY: 42 }),
    shape('hero-player-card', 'Thẻ bài hát', 28, 790, 444, 105, { backgroundColor: '#b9b8c4', borderRadius: 24, zIndex: 6 }),
    image('hero-player-cover', 'Ảnh bìa bài hát', 'couple', 45, 808, 72, 72, { src: config.coupleSrc, borderRadius: 8, zIndex: 8, entrance: 'fade' }),
    text('hero-player-title', 'Tên bài hát', 135, 808, 305, 36, { value: 'I will love you', color: '#111111', font: sans, fontSize: 17, fontWeight: 700, align: 'left', zIndex: 8 }),
    text('hero-player-subtitle', 'Thông tin bài hát', 135, 846, 305, 30, { value: 'Valentine · Our wedding song', color: '#333333', font: sans, fontSize: 11, align: 'left', zIndex: 8 }),
    ...coupleNameRow(config, 680, '#ffffff', { size: 25, zIndex: 10 }),
  ];

  if (config.hero === 'ribbon') return [
    shape('hero-white', 'Nền trắng', 0, 0, 500, 920, { backgroundColor: '#ffffff' }),
    text('hero-intro', 'Thông tin mở đầu', 34, 30, 432, 92, { value: 'OUR WEDDING | THIỆP CƯỚI CỦA CHÚNG MÌNH\nFROM HANOI WITH LOVE', color: config.ink, font: sans, fontSize: 13, lineHeight: 2.1, align: 'right' }),
    text('hero-date', 'Ngày cưới', 270, 105, 196, 30, { binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color: config.ink, font: sans, fontSize: 13, align: 'right' }),
    shape('hero-ribbon-one', 'Ruy băng một', 100, 165, 370, 38, { backgroundColor: config.accent, rotation: 10, zIndex: 2 }),
    shape('hero-ribbon-two', 'Ruy băng hai', 300, 185, 170, 42, { backgroundColor: config.accent, rotation: 72, zIndex: 2 }),
    shape('hero-ribbon-three', 'Ruy băng ba', 25, 690, 210, 36, { backgroundColor: config.accent, rotation: -32, zIndex: 2 }),
    image('hero-photo', 'Ảnh mở đầu', 'hero', 80, 205, 340, 540, { src: config.heroSrc, entrance: 'zoom', zIndex: 5, objectPositionY: 42 }),
    text('hero-title', 'Wedding invitation', 40, 780, 420, 50, { value: 'WEDDING INVITATION', color: config.ink, font: sans, fontSize: 25, letterSpacing: 1, zIndex: 8 }),
    ...coupleNameRow(config, 835, config.ink, { font: sans, size: 20, accent: config.accent, zIndex: 8 }),
  ];

  if (config.hero === 'scrapbook') return [
    shape('hero-red', 'Nền scrapbook đỏ', 0, 0, 500, 920, { backgroundColor: config.accent }),
    shape('hero-paper', 'Giấy kraft', 0, 205, 500, 520, { backgroundColor: '#c8a878', zIndex: 2 }),
    shape('hero-paper-note', 'Mảnh giấy ghi chú', 270, 220, 205, 180, { backgroundColor: '#e7d1aa', rotation: -5, zIndex: 3 }),
    text('hero-married', 'We are married', 18, 25, 280, 90, { value: "We're Married", color: '#efb4a7', font: script, fontSize: 48, align: 'left', zIndex: 8, entrance: 'left' }),
    text('groom-name', 'Tên chú rể', 255, 75, 215, 55, { binding: { fieldPath: 'couple.groomName', format: 'plain' }, color: config.soft, font: narrow, fontSize: 28, align: 'left', zIndex: 8 }),
    text('name-and', 'Dấu nối tên', 292, 130, 50, 42, { value: '&', color: config.soft, font: display, fontSize: 25, zIndex: 8 }),
    text('bride-name', 'Tên cô dâu', 325, 132, 150, 55, { binding: { fieldPath: 'couple.brideName', format: 'plain' }, color: config.soft, font: narrow, fontSize: 28, align: 'left', zIndex: 8 }),
    image('hero-photo', 'Ảnh cutout mở đầu', 'hero', 12, 165, 476, 560, { src: config.heroSrc, entrance: 'zoom', objectFit: 'contain', zIndex: 6 }),
    shape('hero-tape', 'Băng dính đỏ', 190, 610, 250, 42, { backgroundColor: '#a72f29', rotation: -5, zIndex: 8 }),
    text('hero-note', 'Thông điệp nhận thiệp', 22, 775, 456, 100, { value: 'Khi bạn nhận được chiếc thiệp này', color: config.soft, font: narrow, fontSize: 29, rotation: -5, zIndex: 8, entrance: 'left' }),
    text('hero-date', 'Ngày cưới', 310, 855, 165, 30, { binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color: config.soft, font: sans, fontSize: 12, letterSpacing: 2, zIndex: 8 }),
  ];

  if (config.hero === 'cinematic') return [
    image('hero-photo', 'Ảnh điện ảnh mở đầu', 'hero', 0, 0, 500, 920, { src: config.heroSrc, entrance: 'fade', objectPositionY: 48 }),
    shape('hero-shade', 'Lớp phủ điện ảnh', 0, 0, 500, 920, { backgroundColor: '#0a0a08', opacity: 0.38, zIndex: 5 }),
    text('hero-kicker', 'Phong cách tiệc cưới', 30, 585, 300, 34, { value: 'AN INTIMATE WEDDING', color: '#ffffff', font: sans, fontSize: 10, letterSpacing: 4, align: 'left', zIndex: 8 }),
    text('groom-name', 'Tên chú rể', 30, 625, 320, 76, { binding: { fieldPath: 'couple.groomName', format: 'plain' }, color: '#ffffff', font: display, fontSize: 48, align: 'left', zIndex: 8, entrance: 'left' }),
    text('name-and', 'Dấu nối tên', 30, 695, 70, 55, { value: '&', color: config.accent, font: display, fontSize: 38, align: 'left', zIndex: 8 }),
    text('bride-name', 'Tên cô dâu', 30, 748, 340, 76, { binding: { fieldPath: 'couple.brideName', format: 'plain' }, color: '#ffffff', font: display, fontSize: 48, align: 'left', zIndex: 8, entrance: 'left' }),
    text('hero-date', 'Ngày cưới', 30, 840, 240, 34, { binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color: '#ffffff', font: sans, fontSize: 12, letterSpacing: 5, align: 'left', zIndex: 8 }),
  ];

  if (config.hero === 'minimal-stamp') return [
    shape('hero-white', 'Nền tối giản', 0, 0, 500, 920, { backgroundColor: '#ffffff' }),
    text('hero-title', 'Wedding invitation', 135, 20, 330, 115, { value: 'Wedding\nInvitation', color: config.ink, font: narrow, fontSize: 45, lineHeight: 0.86, align: 'left', entrance: 'rise' }),
    text('hero-the', 'The', 25, 98, 100, 30, { value: 'THE', color: config.ink, font: sans, fontSize: 10, letterSpacing: 5, align: 'left' }),
    ...coupleNameRow(config, 112, config.ink, { font: sans, size: 14, accent: config.ink }),
    image('hero-photo', 'Ảnh tối giản', 'hero', 25, 160, 450, 555, { src: config.heroSrc, entrance: 'rise', objectPositionY: 42 }),
    shape('hero-stamp', 'Dấu ngày cưới', 405, 680, 72, 72, { backgroundColor: '#ffffff', borderWidth: 1, borderColor: config.ink, borderRadius: 36, zIndex: 7 }),
    text('hero-stamp-date', 'Ngày đóng dấu', 414, 693, 54, 48, { binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color: config.ink, font: serif, fontSize: 11, lineHeight: 1.2, zIndex: 8 }),
    text('hero-quote', 'Trích dẫn mở đầu', 65, 805, 370, 88, { binding: { fieldPath: 'copy.quote', format: 'plain' }, color: config.ink, font: narrow, fontSize: 22, lineHeight: 1.35, entrance: 'fade' }),
  ];

  if (config.hero === 'red-life') return [
    shape('hero-red', 'Nền đỏ cổ điển', 0, 0, 500, 920, { backgroundColor: config.accent }),
    text('hero-topmark', 'Love life', 145, 42, 210, 60, { value: '喜 欢 你\nLOVE LIFE', color: '#ffffff', font: serif, fontSize: 12, lineHeight: 1.5, letterSpacing: 2, zIndex: 8 }),
    image('hero-photo', 'Ảnh mở đầu đỏ', 'hero', 0, 105, 500, 715, { src: config.heroSrc, entrance: 'fade', objectPositionY: 38 }),
    shape('hero-shade', 'Lớp phủ đỏ', 0, 105, 500, 715, { backgroundColor: '#620000', opacity: 0.18, zIndex: 5 }),
    text('hero-kicker', 'Love life', 150, 595, 200, 32, { value: '喜 欢 你 · LOVE LIFE', color: '#ffffff', font: sans, fontSize: 10, letterSpacing: 3, zIndex: 8 }),
    text('groom-name', 'Tên chú rể', 120, 630, 260, 60, { binding: { fieldPath: 'couple.groomName', format: 'plain' }, color: '#ffffff', font: script, fontSize: 41, zIndex: 8, entrance: 'left' }),
    text('name-and', 'Dấu nối tên', 225, 683, 50, 40, { value: '&', color: '#ffffff', font: script, fontSize: 28, zIndex: 8 }),
    text('bride-name', 'Tên cô dâu', 120, 715, 260, 60, { binding: { fieldPath: 'couple.brideName', format: 'plain' }, color: '#ffffff', font: script, fontSize: 41, zIndex: 8, entrance: 'right' }),
    text('hero-date', 'Ngày cưới', 135, 785, 230, 34, { binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color: '#ffffff', font: display, fontSize: 16, letterSpacing: 2, zIndex: 8 }),
  ];

  if (config.hero === 'spacious') return [
    shape('hero-paper', 'Nền khoảng trắng', 0, 0, 500, 920, { backgroundColor: config.paper }),
    text('hero-kicker', 'Happy wedding', 150, 45, 200, 30, { value: 'HAPPY WEDDING', color: config.ink, font: sans, fontSize: 10, letterSpacing: 5 }),
    text('groom-name', 'Tên chú rể', 35, 82, 200, 65, { binding: { fieldPath: 'couple.groomName', format: 'plain' }, color: config.ink, font: narrow, fontSize: 38, entrance: 'left' }),
    text('name-and', 'Dấu nối tên', 225, 86, 50, 55, { value: '&', color: config.accent, font: display, fontSize: 30, entrance: 'zoom' }),
    text('bride-name', 'Tên cô dâu', 265, 82, 200, 65, { binding: { fieldPath: 'couple.brideName', format: 'plain' }, color: config.ink, font: narrow, fontSize: 38, entrance: 'right' }),
    text('hero-date', 'Ngày cưới', 140, 150, 220, 32, { binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color: config.ink, font: sans, fontSize: 12, letterSpacing: 2 }),
    image('hero-photo', 'Ảnh mở đầu khoảng trắng', 'hero', 25, 485, 450, 400, { src: config.heroSrc, entrance: 'rise', objectPositionY: 38 }),
    shape('hero-accent-line', 'Dải màu cuối trang', 0, 885, 500, 35, { backgroundColor: config.accent, zIndex: 6 }),
  ];

  return [
    shape('hero-beige', 'Nền vòm beige', 0, 0, 500, 920, { backgroundColor: config.paper }),
    image('hero-photo', 'Ảnh vòm mở đầu', 'hero', 55, 45, 390, 620, { src: config.heroSrc, entrance: 'zoom', borderRadius: 195, objectPositionY: 40 }),
    shape('hero-frame', 'Viền vòm', 42, 32, 416, 646, { backgroundColor: 'transparent', borderWidth: 1, borderColor: config.accent, borderRadius: 208, zIndex: 5 }),
    text('hero-kicker', 'Invitation', 125, 710, 250, 34, { value: 'INVITATION', color: config.ink, font: sans, fontSize: 11, letterSpacing: 6 }),
    ...coupleNameRow(config, 752, config.ink, { font: narrow, size: 33, accent: config.accent }),
    text('hero-date', 'Ngày cưới', 140, 830, 220, 34, { binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color: config.ink, font: serif, fontSize: 15, letterSpacing: 2 }),
  ];
}

function familyColumns(config, top, startY, color) {
  return [
    text('family-groom-label', 'Nhà trai', 25, startY, 215, 34, { value: 'NHÀ TRAI', color: config.accent, font: sans, fontSize: 12, letterSpacing: 3 }),
    text('family-groom-father', 'Cha chú rể', 25, startY + 42, 215, 34, { binding: { fieldPath: 'families.groomFather', format: 'plain' }, color, fontSize: 15 }),
    text('family-groom-mother', 'Mẹ chú rể', 25, startY + 78, 215, 34, { binding: { fieldPath: 'families.groomMother', format: 'plain' }, color, fontSize: 15 }),
    text('family-groom-address', 'Địa chỉ nhà trai', 25, startY + 116, 215, 52, { binding: { fieldPath: 'families.groomAddress', format: 'plain' }, color, fontSize: 13, lineHeight: 1.35 }),
    text('family-bride-label', 'Nhà gái', 260, startY, 215, 34, { value: 'NHÀ GÁI', color: config.accent, font: sans, fontSize: 12, letterSpacing: 3 }),
    text('family-bride-father', 'Cha cô dâu', 260, startY + 42, 215, 34, { binding: { fieldPath: 'families.brideFather', format: 'plain' }, color, fontSize: 15 }),
    text('family-bride-mother', 'Mẹ cô dâu', 260, startY + 78, 215, 34, { binding: { fieldPath: 'families.brideMother', format: 'plain' }, color, fontSize: 15 }),
    text('family-bride-address', 'Địa chỉ nhà gái', 260, startY + 116, 215, 52, { binding: { fieldPath: 'families.brideAddress', format: 'plain' }, color, fontSize: 13, lineHeight: 1.35 }),
  ];
}

function familyNodes(config, top) {
  const dark = config.family === 'dark';
  const surface = dark ? config.ink : (config.familySurface || config.paper);
  const color = dark ? '#ffffff' : config.ink;
  const base = [
    shape('family-surface', 'Nền phần gia đình', 0, top, 500, 900, { backgroundColor: surface }),
    text('family-heading', 'Tiêu đề gia đình', 40, top + 50, 420, 54, { value: config.familyHeading, color: dark ? config.soft : config.accent, font: display, fontSize: config.familyHeading.length > 22 ? 23 : 30, letterSpacing: 2 }),
  ];

  if (config.family === 'parents-first') return [
    ...base,
    ...familyColumns(config, top, top + 135, color),
    image('family-couple-photo', 'Ảnh hai gia đình', 'couple', 65, top + 360, 370, 390, { src: config.coupleSrc, entrance: 'zoom', borderRadius: config.familyRadius || 2 }),
    text('family-groom-name', 'Tên chú rể', 42, top + 780, 190, 48, { binding: { fieldPath: 'couple.groomName', format: 'plain' }, color, font: config.nameFont || script, fontSize: 28, entrance: 'left' }),
    text('family-and', 'Dấu nối tên gia đình', 225, top + 785, 50, 40, { value: '&', color: config.accent, font: display, fontSize: 22 }),
    text('family-bride-name', 'Tên cô dâu', 268, top + 780, 190, 48, { binding: { fieldPath: 'couple.brideName', format: 'plain' }, color, font: config.nameFont || script, fontSize: 28, entrance: 'right' }),
  ];

  if (config.family === 'wide' || config.family === 'dark') return [
    ...base,
    image('family-couple-photo', 'Ảnh cặp đôi gia đình', 'couple', 35, top + 125, 430, 370, { src: config.coupleSrc, entrance: 'fade', borderRadius: config.familyRadius || 2 }),
    text('family-groom-name', 'Tên chú rể', 35, top + 520, 195, 48, { binding: { fieldPath: 'couple.groomName', format: 'plain' }, color, font: config.nameFont || display, fontSize: 25, entrance: 'left' }),
    text('family-and', 'Dấu nối tên gia đình', 225, top + 525, 50, 40, { value: '&', color: config.accent, font: display, fontSize: 22 }),
    text('family-bride-name', 'Tên cô dâu', 270, top + 520, 195, 48, { binding: { fieldPath: 'couple.brideName', format: 'plain' }, color, font: config.nameFont || display, fontSize: 25, entrance: 'right' }),
    ...familyColumns(config, top, top + 610, color),
  ];

  return [
    ...base,
    image('family-groom-photo', 'Ảnh chú rể', 'groom', 28, top + 125, 210, 340, { src: config.groomSrc, entrance: 'left', borderRadius: config.familyRadius || 2 }),
    image('family-bride-photo', 'Ảnh cô dâu', 'bride', 262, top + 125, 210, 340, { src: config.brideSrc, entrance: 'right', borderRadius: config.familyRadius || 2 }),
    text('family-groom-name', 'Tên chú rể', 28, top + 485, 210, 48, { binding: { fieldPath: 'couple.groomName', format: 'plain' }, color, font: config.nameFont || display, fontSize: 24 }),
    text('family-bride-name', 'Tên cô dâu', 262, top + 485, 210, 48, { binding: { fieldPath: 'couple.brideName', format: 'plain' }, color, font: config.nameFont || display, fontSize: 24 }),
    ...familyColumns(config, top, top + 570, color),
  ];
}

function storyNodes(config, top) {
  if (config.story === 'dark-film') return [
    shape('story-surface', 'Nền phim', 0, top, 500, 900, { backgroundColor: '#111111' }),
    text('story-heading', 'Tiêu đề câu chuyện', 35, top + 45, 430, 58, { value: config.storyHeading, color: config.soft, font: sans, fontSize: 18, letterSpacing: 5 }),
    image('story-photo-main', 'Khung phim chính', 'couple', 35, top + 135, 430, 360, { src: config.storySrc, entrance: 'fade' }),
    image('story-photo-small', 'Khung phim phụ', 'hero', 35, top + 520, 190, 260, { src: config.heroSrc, entrance: 'left' }),
    text('story-copy', 'Câu chuyện tình yêu', 250, top + 520, 215, 175, { binding: { fieldPath: 'copy.story', format: 'plain' }, color: '#ffffff', font: serif, fontSize: 17, lineHeight: 1.45, align: 'left', entrance: 'right' }),
    text('story-quote', 'Trích dẫn tình yêu', 250, top + 705, 215, 100, { binding: { fieldPath: 'copy.quote', format: 'plain' }, color: config.soft, font: script, fontSize: 24, lineHeight: 1.35, align: 'left' }),
  ];

  if (config.story === 'paper') return [
    shape('story-paper-back', 'Giấy nền câu chuyện', 38, top + 55, 424, 760, { backgroundColor: config.soft, rotation: -2, zIndex: 1, boxShadow: '0 12px 28px #00000018' }),
    shape('story-paper', 'Tờ giấy câu chuyện', 48, top + 42, 404, 745, { backgroundColor: '#ffffff', rotation: 1, zIndex: 2, boxShadow: '0 10px 24px #00000018' }),
    text('story-heading', 'Tiêu đề câu chuyện', 72, top + 88, 356, 58, { value: config.storyHeading, color: config.accent, font: display, fontSize: 28, zIndex: 4 }),
    image('story-photo-main', 'Ảnh câu chuyện', 'couple', 75, top + 170, 350, 300, { src: config.storySrc, entrance: 'zoom', zIndex: 4 }),
    text('story-copy', 'Câu chuyện tình yêu', 78, top + 500, 344, 150, { binding: { fieldPath: 'copy.story', format: 'plain' }, color: config.ink, font: serif, fontSize: 17, lineHeight: 1.45, zIndex: 4 }),
    text('story-quote', 'Trích dẫn tình yêu', 78, top + 665, 344, 90, { binding: { fieldPath: 'copy.quote', format: 'plain' }, color: config.accent, font: script, fontSize: 24, zIndex: 4 }),
  ];

  if (config.story === 'collage') return [
    shape('story-surface', 'Nền collage', 0, top, 500, 900, { backgroundColor: config.familySurface || config.paper }),
    text('story-heading', 'Tiêu đề câu chuyện', 40, top + 48, 420, 58, { value: config.storyHeading, color: config.accent, font: display, fontSize: 30, letterSpacing: 2 }),
    image('story-photo-main', 'Ảnh collage chính', 'couple', 30, top + 130, 315, 430, { src: config.storySrc, entrance: 'left', rotation: -2 }),
    image('story-photo-small', 'Ảnh collage phụ', 'hero', 295, top + 340, 175, 270, { src: config.heroSrc, entrance: 'right', rotation: 3, borderWidth: 8, borderColor: '#ffffff' }),
    text('story-copy', 'Câu chuyện tình yêu', 45, top + 620, 410, 135, { binding: { fieldPath: 'copy.story', format: 'plain' }, color: config.ink, font: serif, fontSize: 17, lineHeight: 1.45 }),
    text('story-quote', 'Trích dẫn tình yêu', 55, top + 770, 390, 90, { binding: { fieldPath: 'copy.quote', format: 'plain' }, color: config.accent, font: script, fontSize: 24 }),
  ];

  return [
    shape('story-surface', 'Nền câu chuyện', 0, top, 500, 900, { backgroundColor: config.paper }),
    text('story-heading', 'Tiêu đề câu chuyện', 40, top + 48, 420, 58, { value: config.storyHeading, color: config.accent, font: display, fontSize: 30, letterSpacing: 2 }),
    image('story-photo-main', 'Ảnh câu chuyện', 'couple', 25, top + 135, 230, 520, { src: config.storySrc, entrance: 'left' }),
    text('story-copy', 'Câu chuyện tình yêu', 280, top + 170, 190, 250, { binding: { fieldPath: 'copy.story', format: 'plain' }, color: config.ink, font: serif, fontSize: 17, lineHeight: 1.45, align: 'left', entrance: 'right' }),
    text('story-quote', 'Trích dẫn tình yêu', 280, top + 460, 190, 165, { binding: { fieldPath: 'copy.quote', format: 'plain' }, color: config.accent, font: script, fontSize: 25, lineHeight: 1.35, align: 'left', entrance: 'right' }),
    image('story-photo-small', 'Ảnh câu chuyện phụ', 'hero', 280, top + 650, 190, 190, { src: config.heroSrc, entrance: 'rise' }),
  ];
}

function eventNodes(config, top) {
  const dark = config.event === 'dark';
  const surface = dark ? config.ink : (config.eventSurface || config.soft);
  const color = dark ? '#ffffff' : config.ink;
  const accent = dark ? config.soft : config.accent;
  if (config.event === 'side') return [
    shape('event-surface', 'Nền ngày cưới', 0, top, 500, 1120, { backgroundColor: surface }),
    text('event-heading', 'Save the date', 30, top + 48, 440, 60, { value: config.eventHeading, color: accent, font: display, fontSize: 31, letterSpacing: 2 }),
    widget('calendar', 'wedding-calendar', 'Lịch ngày cưới', 22, top + 150, 290, 345, { color, backgroundColor: 'transparent', font: sans, props: { calendarStyle: config.calendarStyle || 'minimal' }, entrance: 'left' }),
    text('event-date', 'Ngày cưới', 325, top + 165, 150, 80, { binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color: accent, font: display, fontSize: 25, lineHeight: 1.2, entrance: 'right' }),
    text('event-time', 'Giờ cưới', 325, top + 260, 150, 42, { binding: { fieldPath: 'event.startsAt.time', format: 'time' }, color, font: sans, fontSize: 18, letterSpacing: 2, entrance: 'right' }),
    text('venue-name', 'Địa điểm cưới', 325, top + 330, 150, 72, { binding: { fieldPath: 'event.venueName', format: 'plain' }, color: accent, font: display, fontSize: 20, entrance: 'right' }),
    text('venue-address', 'Địa chỉ cưới', 325, top + 415, 150, 78, { binding: { fieldPath: 'event.address', format: 'plain' }, color, fontSize: 14, lineHeight: 1.35, entrance: 'right' }),
    widget('countdown', 'wedding-countdown', 'Đếm ngược', 35, top + 545, 430, 108, { color, backgroundColor: dark ? '#000000' : '#ffffff', borderRadius: 3, padding: 10, props: { orientation: 'horizontal' }, entrance: 'zoom' }),
    widget('map', 'venue-map', 'Nút xem bản đồ', 145, top + 705, 210, 56, { color: '#ffffff', backgroundColor: config.accent, borderRadius: 3, font: sans, fontSize: 13, fontWeight: 600, binding: { fieldPath: 'event.mapUrl', format: 'plain' }, props: { buttonLabel: 'XEM BẢN ĐỒ' } }),
    text('event-lunar', 'Ngày âm lịch', 60, top + 800, 380, 52, { binding: { fieldPath: 'event.lunarDate', format: 'plain' }, color, fontSize: 15 }),
    image('event-photo', 'Ảnh địa điểm', 'venue', 50, top + 875, 400, 200, { src: config.coupleSrc, entrance: 'rise' }),
  ];

  return [
    shape('event-surface', 'Nền ngày cưới', 0, top, 500, 1120, { backgroundColor: surface }),
    text('event-heading', 'Save the date', 35, top + 48, 430, 62, { value: config.eventHeading, color: accent, font: display, fontSize: 32, letterSpacing: 2 }),
    text('event-date', 'Ngày cưới', 80, top + 125, 340, 42, { binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color, font: sans, fontSize: 16, letterSpacing: 3 }),
    text('event-time', 'Giờ cưới', 140, top + 172, 220, 36, { binding: { fieldPath: 'event.startsAt.time', format: 'time' }, color, font: sans, fontSize: 15, letterSpacing: 2 }),
    widget('calendar', 'wedding-calendar', 'Lịch ngày cưới', 40, top + 235, 420, 350, { color, backgroundColor: 'transparent', font: sans, props: { calendarStyle: config.calendarStyle || 'heart' }, entrance: 'rise' }),
    widget('countdown', 'wedding-countdown', 'Đếm ngược', 35, top + 610, 430, 105, { color, backgroundColor: dark ? '#000000' : '#ffffff', borderRadius: 3, padding: 10, props: { orientation: 'horizontal' }, entrance: 'zoom' }),
    text('venue-name', 'Địa điểm cưới', 45, top + 755, 410, 62, { binding: { fieldPath: 'event.venueName', format: 'plain' }, color: accent, font: display, fontSize: 25 }),
    text('venue-address', 'Địa chỉ cưới', 60, top + 830, 380, 70, { binding: { fieldPath: 'event.address', format: 'plain' }, color, fontSize: 16, lineHeight: 1.35 }),
    widget('map', 'venue-map', 'Nút xem bản đồ', 145, top + 920, 210, 56, { color: dark ? config.ink : '#ffffff', backgroundColor: dark ? config.soft : config.accent, borderRadius: 3, font: sans, fontSize: 13, fontWeight: 600, binding: { fieldPath: 'event.mapUrl', format: 'plain' }, props: { buttonLabel: 'XEM BẢN ĐỒ' } }),
    text('event-lunar', 'Ngày âm lịch', 60, top + 1010, 380, 52, { binding: { fieldPath: 'event.lunarDate', format: 'plain' }, color, fontSize: 15 }),
  ];
}

function makeScene(config) {
  const familyTop = 940;
  const storyTop = 1840;
  const eventTop = 2740;
  const closingTop = 3860;
  const height = 5710;
  const nodes = [
    shape('canvas-paper', 'Nền thiệp', 0, 0, 500, height, { backgroundColor: config.paper, zIndex: -20 }),
    ...heroNodes(config),
    ...familyNodes(config, familyTop),
    ...storyNodes(config, storyTop),
    ...eventNodes(config, eventTop),
    ...closingNodes(config, closingTop),
  ];
  return templateSceneSchema.parse({
    slug: config.slug,
    version: '2026.07.16-batch-2',
    name: config.name,
    canvas: { width: 500, height, backgroundColor: config.paper },
    nodes,
    capabilities: ['text', 'image', 'shape', 'calendar', 'countdown', 'map', 'rsvp', 'wish', 'giftQr', 'album', 'carousel', 'particle'],
  });
}

const base = (slug) => `/assets/new-templates/${slug}`;

const profiles = [
  { slug: 'thiep-cuoi-1', name: 'Blue Horizon', hero: 'ocean', family: 'portraits', familyHeading: 'MEET US BY THE SEA', familySurface: '#eef6fa', story: 'split', storyHeading: 'OUR BLUE STORY', event: 'side', eventHeading: 'SAVE THE DATE', eventSurface: '#e5f0f6', paper: '#ffffff', ink: '#243947', accent: '#6e93ac', soft: '#d7e8f1', heroSrc: `${base('thiep-cuoi-1')}/image-2.jpg`, coupleSrc: `${base('thiep-cuoi-1')}/image-6.jpg`, groomSrc: `${base('thiep-cuoi-1')}/image-3.jpg`, brideSrc: `${base('thiep-cuoi-1')}/image-5.jpg`, storySrc: `${base('thiep-cuoi-1')}/image-8.jpg`, albumHeading: 'MEMORIES BY THE SEA' },
  { slug: 'thiep-cuoi-3', name: 'Traditional Split', hero: 'traditional', family: 'parents-first', familyHeading: 'HAI GIA ĐÌNH · MỘT NIỀM VUI', familySurface: '#fffaf2', story: 'paper', storyHeading: 'OUR LOVE STORY', event: 'side', eventHeading: 'NGÀY THÀNH HÔN', paper: '#fffaf2', ink: '#402c31', accent: '#b04d59', soft: '#efd9d8', nameFont: narrow, heroSrc: `${base('thiep-cuoi-3')}/image-1.webp`, coupleSrc: `${base('thiep-cuoi-3')}/image-2.webp`, groomSrc: `${base('thiep-cuoi-3')}/image-3.webp`, brideSrc: `${base('thiep-cuoi-3')}/image-4.webp`, storySrc: `${base('thiep-cuoi-3')}/image-3.webp`, albumHeading: 'ALBUM NGÀY VUI' },
  { slug: 'thiep-cuoi-4', name: 'Dear Wedding', hero: 'letter', family: 'wide', familyHeading: 'OUR DEAREST FAMILIES', story: 'split', storyHeading: 'OUR LOVE STORY', event: 'full', eventHeading: 'OUR WEDDING DAY', paper: '#ffffff', ink: '#2f2927', accent: '#a96166', soft: '#f3e9e4', nameFont: narrow, heroSrc: `${base('thiep-cuoi-4')}/image-1.webp`, coupleSrc: `${base('thiep-cuoi-4')}/image-2.webp`, groomSrc: `${base('thiep-cuoi-4')}/image-5.webp`, brideSrc: `${base('thiep-cuoi-4')}/image-4.webp`, storySrc: `${base('thiep-cuoi-4')}/image-6.webp`, albumHeading: 'OUR LITTLE MOMENTS' },
  { slug: 'thiep-cuoi-5', name: 'Red Valentine', hero: 'red-poster', family: 'portraits', familyHeading: 'THE BRIDE & GROOM', familySurface: '#fff6ef', story: 'collage', storyHeading: 'WE CHOOSE EACH OTHER', event: 'dark', eventHeading: 'VALENTINE WEDDING', paper: '#fff7f0', ink: '#3d201a', accent: '#a82b20', soft: '#f1c36e', heroSrc: `${base('thiep-cuoi-5')}/image-1.jpg`, coupleSrc: `${base('thiep-cuoi-5')}/image-6.jpg`, groomSrc: `${base('thiep-cuoi-5')}/image-4.jpg`, brideSrc: `${base('thiep-cuoi-5')}/image-3.jpg`, storySrc: `${base('thiep-cuoi-5')}/image-7.jpg`, albumHeading: 'RED LOVE DIARY' },
  { slug: 'thiep-cuoi-6', name: 'Love On Repeat', hero: 'music-dark', family: 'dark', familyHeading: 'NOW PLAYING · OUR LOVE', story: 'dark-film', storyHeading: 'LOVE LETTER', event: 'dark', eventHeading: 'THE WEDDING OF', paper: '#0a0a0a', ink: '#111111', accent: '#e24682', soft: '#f4bed4', heroSrc: `${base('thiep-cuoi-6')}/image-1.jpg`, coupleSrc: `${base('thiep-cuoi-6')}/image-3.jpg`, groomSrc: `${base('thiep-cuoi-6')}/image-6.jpg`, brideSrc: `${base('thiep-cuoi-6')}/image-8.png`, storySrc: `${base('thiep-cuoi-6')}/image-4.jpg`, albumHeading: 'PLAY OUR MEMORIES' },
  { slug: 'thiep-cuoi-7', name: 'Red Ribbon', hero: 'ribbon', family: 'wide', familyHeading: 'TRỌN VẸN BÊN NHAU', story: 'collage', storyHeading: 'LOVE IN MOTION', event: 'side', eventHeading: 'TRÂN TRỌNG KÍNH MỜI', paper: '#ffffff', ink: '#171717', accent: '#a50000', soft: '#f0d6d3', nameFont: sans, heroSrc: `${base('thiep-cuoi-7')}/image-1.jpg`, coupleSrc: `${base('thiep-cuoi-7')}/image-4.jpg`, groomSrc: `${base('thiep-cuoi-7')}/image-6.jpg`, brideSrc: `${base('thiep-cuoi-7')}/image-5.jpg`, storySrc: `${base('thiep-cuoi-7')}/image-8.jpg`, albumHeading: 'LOVE IN MOTION' },
  { slug: 'thiep-cuoi-8', name: 'Red Scrapbook', hero: 'scrapbook', family: 'parents-first', familyHeading: 'CÔ DÂU & CHÚ RỂ', familySurface: '#f2dfbd', story: 'paper', storyHeading: 'OUR RED DIARY', event: 'side', eventHeading: 'WEDDING INVITATION', eventSurface: '#f3e1c4', paper: '#fff7ec', ink: '#4a2b24', accent: '#b13b2f', soft: '#f0d5bd', nameFont: narrow, heroSrc: `${base('thiep-cuoi-8')}/preview.webp`, coupleSrc: `${base('thiep-cuoi-8')}/image-5.png`, groomSrc: `${base('thiep-cuoi-8')}/image-3.png`, brideSrc: `${base('thiep-cuoi-8')}/image-2.png`, storySrc: `${base('thiep-cuoi-8')}/image-4.png`, albumHeading: 'OUR RED DIARY' },
  { slug: 'thiep-cuoi-9', name: 'Forest Cinema', hero: 'cinematic', family: 'dark', familyHeading: 'TWO SOULS · ONE STORY', story: 'dark-film', storyHeading: '35 MM · OUR STORY', event: 'dark', eventHeading: 'THE CELEBRATION', paper: '#14120f', ink: '#14120f', accent: '#c58a92', soft: '#ead1d5', heroSrc: `${base('thiep-cuoi-9')}/image-1.webp`, coupleSrc: `${base('thiep-cuoi-9')}/image-2.webp`, groomSrc: `${base('thiep-cuoi-9')}/image-3.webp`, brideSrc: `${base('thiep-cuoi-9')}/image-4.webp`, storySrc: `${base('thiep-cuoi-9')}/image-3.webp`, albumHeading: 'TO THE MOON AND BACK' },
  { slug: 'thiep-cuoi-10', name: 'Minimal Stamp', hero: 'minimal-stamp', family: 'portraits', familyHeading: 'THE TWO OF US', story: 'split', storyHeading: 'WE GROW TOGETHER', event: 'side', eventHeading: 'WEDDING DAY', paper: '#ffffff', ink: '#191919', accent: '#1b1b1b', soft: '#eeeeec', nameFont: sans, heroSrc: `${base('thiep-cuoi-10')}/image-1.webp`, coupleSrc: `${base('thiep-cuoi-10')}/image-4.webp`, groomSrc: `${base('thiep-cuoi-10')}/image-6.webp`, brideSrc: `${base('thiep-cuoi-10')}/image-5.webp`, storySrc: `${base('thiep-cuoi-10')}/image-4.webp`, albumHeading: 'ANOTHER DAY SUN' },
  { slug: 'thiep-cuoi-11', name: 'Love Life Red', hero: 'red-life', family: 'portraits', familyHeading: 'THE BEGINNING', familySurface: '#fff8ed', story: 'collage', storyHeading: 'LOVE STORY', event: 'dark', eventHeading: 'THIỆP MỜI THÀNH HÔN', paper: '#fff8ed', ink: '#3f1414', accent: '#750000', soft: '#f1c8bc', heroSrc: `${base('thiep-cuoi-11')}/image-1.jpg`, coupleSrc: `${base('thiep-cuoi-11')}/image-7.jpg`, groomSrc: `${base('thiep-cuoi-11')}/image-3.jpg`, brideSrc: `${base('thiep-cuoi-11')}/image-4.jpg`, storySrc: `${base('thiep-cuoi-11')}/image-6.jpg`, albumHeading: 'LOVE LIFE' },
  { slug: 'thiep-cuoi-12', name: 'Spacious Vows', hero: 'spacious', family: 'wide', familyHeading: 'HAPPY WEDDING', story: 'paper', storyHeading: 'YOU + ME · FOREVER', event: 'side', eventHeading: 'THE WEDDING DAY', paper: '#fff8ef', ink: '#361b20', accent: '#b9222c', soft: '#f2d8d2', nameFont: narrow, heroSrc: `${base('thiep-cuoi-12')}/image-1.webp`, coupleSrc: `${base('thiep-cuoi-12')}/image-2.webp`, groomSrc: `${base('thiep-cuoi-12')}/image-3.webp`, brideSrc: `${base('thiep-cuoi-12')}/image-4.webp`, storySrc: `${base('thiep-cuoi-12')}/image-3.webp`, albumHeading: 'HAPPY MOMENTS' },
  { slug: 'thiep-cuoi-13', name: 'Mèo Cưới Vui', hero: 'scrapbook', family: 'wide', familyHeading: 'OUR PLAYFUL WEDDING', familySurface: '#ffe29d', story: 'collage', storyHeading: 'HAPPY TOGETHER', event: 'side', eventHeading: 'SAVE OUR DATE', eventSurface: '#fff0c7', paper: '#ffd77f', ink: '#4e2b1d', accent: '#ce7a20', soft: '#fff0c4', heroSrc: `${base('thiep-cuoi-13')}/image-1.webp`, coupleSrc: `${base('thiep-cuoi-13')}/image-3.webp`, groomSrc: `${base('thiep-cuoi-13')}/image-4.webp`, brideSrc: `${base('thiep-cuoi-13')}/image-5.webp`, storySrc: `${base('thiep-cuoi-13')}/image-8.webp`, albumHeading: 'HAPPY LITTLE MOMENTS' },
  { slug: 'thiep-cuoi-14', name: 'Beige Arch', hero: 'beige-arch', family: 'portraits', familyHeading: 'A LONG TIME AGO', familySurface: '#f5ecdf', story: 'collage', storyHeading: 'GROW OLD WITH YOU', event: 'full', eventHeading: 'OUR WEDDING DAY', paper: '#eadbc2', ink: '#4f402e', accent: '#856b45', soft: '#d9c2a3', nameFont: narrow, familyRadius: 105, heroSrc: `${base('thiep-cuoi-14')}/image-2.webp`, coupleSrc: `${base('thiep-cuoi-14')}/image-10.webp`, groomSrc: `${base('thiep-cuoi-14')}/image-7.webp`, brideSrc: `${base('thiep-cuoi-14')}/image-9.webp`, storySrc: `${base('thiep-cuoi-14')}/image-12.webp`, albumHeading: 'FOUR SEASONS WITH YOU' },
  { slug: 'thiep-cuoi-15', name: 'Hẹn Nhau Ở Đám Cưới', hero: 'red-poster', family: 'wide', familyHeading: 'LOVE · YOU · FOREVER', familySurface: '#fff8f5', story: 'paper', storyHeading: 'OUR SWEET DAY', event: 'side', eventHeading: 'HẸN NHAU Ở ĐÁM CƯỚI', paper: '#fff9f4', ink: '#342426', accent: '#b7182b', soft: '#f2c5c8', heroSrc: `${base('thiep-cuoi-15')}/image-2.webp`, coupleSrc: `${base('thiep-cuoi-15')}/image-3.webp`, groomSrc: `${base('thiep-cuoi-15')}/image-6.webp`, brideSrc: `${base('thiep-cuoi-15')}/image-8.webp`, storySrc: `${base('thiep-cuoi-15')}/image-9.webp`, albumHeading: 'OUR SWEET DAY' },
  { slug: 'thiep-cuoi-17', name: 'Hỷ Sự Đỏ', hero: 'red-life', family: 'portraits', familyHeading: 'MY LOVER', familySurface: '#fff9f1', story: 'dark-film', storyHeading: 'BORN FREE · LOVING FEARLESS', event: 'dark', eventHeading: 'LỄ THÀNH HÔN', paper: '#fff9f1', ink: '#321d1b', accent: '#ad160f', soft: '#efc1ac', heroSrc: `${base('thiep-cuoi-17')}/image-1.jpg`, coupleSrc: `${base('thiep-cuoi-17')}/image-6.jpg`, groomSrc: `${base('thiep-cuoi-17')}/image-4.jpg`, brideSrc: `${base('thiep-cuoi-17')}/image-5.jpg`, storySrc: `${base('thiep-cuoi-17')}/image-7.jpg`, albumHeading: 'HỶ SỰ' },
  { slug: 'thiep-cuoi-18', name: 'Love Forever', hero: 'red-poster', family: 'portraits', familyHeading: 'BÀ XÃ & ÔNG XÃ', familySurface: '#fff7f0', story: 'collage', storyHeading: 'I LOVE YOU', event: 'side', eventHeading: 'WELCOME TO OUR WEDDING', eventSurface: '#f8e8de', paper: '#fff8f2', ink: '#3b2421', accent: '#9c1a15', soft: '#f3c4b9', heroSrc: `${base('thiep-cuoi-18')}/image-1.webp`, coupleSrc: `${base('thiep-cuoi-18')}/image-6.webp`, groomSrc: `${base('thiep-cuoi-18')}/image-4.webp`, brideSrc: `${base('thiep-cuoi-18')}/image-3.webp`, storySrc: `${base('thiep-cuoi-18')}/image-5.webp`, albumHeading: 'LOVE FOREVER' },
  { slug: 'thiep-cuoi-20', name: 'Lucky Me', hero: 'music-dark', family: 'wide', familyHeading: 'LOVE IS EVERYWHERE', familySurface: '#fff6f3', story: 'collage', storyHeading: 'CHỐN NHÂN GIAN LÃNG MẠN', event: 'side', eventHeading: 'WEDDING INVITATION', eventSurface: '#f8e7e4', paper: '#fff8f5', ink: '#32272a', accent: '#c77474', soft: '#efc7c7', heroSrc: `${base('thiep-cuoi-20')}/image-1.webp`, coupleSrc: `${base('thiep-cuoi-20')}/image-4.webp`, groomSrc: `${base('thiep-cuoi-20')}/image-3.webp`, brideSrc: `${base('thiep-cuoi-20')}/image-2.webp`, storySrc: `${base('thiep-cuoi-20')}/image-6.webp`, albumHeading: 'I WILL LOVE YOU FOREVER' },
  { slug: 'thiep-cuoi-21', name: 'Thiệp Thơ Ngày Cưới', hero: 'scrapbook', family: 'parents-first', familyHeading: 'WEDDING INFORMATION', familySurface: '#fff6ec', story: 'paper', storyHeading: 'BỐN MÙA · CƠM TRẮNG · GIẤC ÊM', event: 'side', eventHeading: 'THÔNG TIN ĐÁM CƯỚI', eventSurface: '#f7e6dc', paper: '#fffaf4', ink: '#442e2c', accent: '#c98c80', soft: '#f1cfc4', heroSrc: `${base('thiep-cuoi-21')}/preview.png`, coupleSrc: `${base('thiep-cuoi-21')}/image-3.png`, groomSrc: `${base('thiep-cuoi-21')}/image-4.png`, brideSrc: `${base('thiep-cuoi-21')}/image-5.png`, storySrc: `${base('thiep-cuoi-21')}/image-6.png`, albumHeading: 'WEDDING PROCESS' },
  { slug: 'thiep-cuoi-22', name: 'Nâu Huyền', hero: 'cinematic', family: 'dark', familyHeading: 'TWO SOULS · ONE STORY', story: 'dark-film', storyHeading: 'MOCHA NOCTURNE', event: 'dark', eventHeading: 'THE WEDDING NIGHT', paper: '#2e211a', ink: '#231914', accent: '#a77f70', soft: '#eadfd6', heroSrc: `${base('thiep-cuoi-22')}/image-1.webp`, coupleSrc: `${base('thiep-cuoi-22')}/image-2.webp`, groomSrc: `${base('thiep-cuoi-22')}/image-4.webp`, brideSrc: `${base('thiep-cuoi-22')}/image-5.webp`, storySrc: `${base('thiep-cuoi-22')}/image-7.webp`, albumHeading: 'AFTER DARK' },
  { slug: 'thiep-cuoi-23', name: 'Garden Memories', hero: 'ocean', family: 'wide', familyHeading: 'OUR DEAREST FAMILIES', familySurface: '#f3f5eb', story: 'collage', storyHeading: 'OUR LOVE GROWS HERE', event: 'side', eventHeading: 'GARDEN WEDDING', eventSurface: '#e8eee0', paper: '#fafbf4', ink: '#263226', accent: '#4b603b', soft: '#d9e0cd', heroSrc: `${base('thiep-cuoi-23')}/image-1.jpg`, coupleSrc: `${base('thiep-cuoi-23')}/image-4.jpg`, groomSrc: `${base('thiep-cuoi-23')}/image-5.jpg`, brideSrc: `${base('thiep-cuoi-23')}/image-6.jpg`, storySrc: `${base('thiep-cuoi-23')}/image-7.jpg`, albumHeading: 'GARDEN MEMORIES' },
  { slug: 'thiep-cuoi-24', name: 'At This Moment', hero: 'minimal-stamp', family: 'wide', familyHeading: 'AT THIS MOMENT', familySurface: '#fffdf8', story: 'collage', storyHeading: 'LOVE AND BE LOVED', event: 'side', eventHeading: 'WEDDING ADDRESS', eventSurface: '#f4eee3', paper: '#fffdf8', ink: '#292522', accent: '#a91919', soft: '#e9d7c4', heroSrc: `${base('thiep-cuoi-24')}/image-2.webp`, coupleSrc: `${base('thiep-cuoi-24')}/image-5.webp`, groomSrc: `${base('thiep-cuoi-24')}/image-6.webp`, brideSrc: `${base('thiep-cuoi-24')}/image-7.webp`, storySrc: `${base('thiep-cuoi-24')}/image-11.webp`, albumHeading: 'GIÂY PHÚT NÀY' },
  { slug: 'thiep-cuoi-25', name: 'Hỷ Tân Hôn', hero: 'traditional', family: 'parents-first', familyHeading: 'HAI GIA ĐÌNH · MỘT NIỀM VUI', familySurface: '#fffaf2', story: 'paper', storyHeading: 'HÀNH TRÌNH CỦA CHÚNG MÌNH', event: 'dark', eventHeading: 'HỶ TÂN HÔN', paper: '#fffaf2', ink: '#302523', accent: '#ae1d28', soft: '#efd1cf', heroSrc: `${base('thiep-cuoi-25')}/image-1.webp`, coupleSrc: `${base('thiep-cuoi-25')}/image-3.webp`, groomSrc: `${base('thiep-cuoi-25')}/image-4.webp`, brideSrc: `${base('thiep-cuoi-25')}/image-5.webp`, storySrc: `${base('thiep-cuoi-25')}/image-8.webp`, albumHeading: 'ALBUM TÂN HÔN' },
  { slug: 'thiep-cuoi-26', name: 'Ngày Vui Của Chúng Mình', hero: 'scrapbook', family: 'portraits', familyHeading: 'THE BRIDE & GROOM', familySurface: '#fff5ed', story: 'collage', storyHeading: 'ĐI CÙNG NHAU CẢ ĐỜI', event: 'side', eventHeading: 'WEDDING DAY', eventSurface: '#f8e4dc', paper: '#fff8f2', ink: '#3d2925', accent: '#bd2a2a', soft: '#f0c4b6', heroSrc: `${base('thiep-cuoi-26')}/image-1.webp`, coupleSrc: `${base('thiep-cuoi-26')}/image-4.webp`, groomSrc: `${base('thiep-cuoi-26')}/image-3.webp`, brideSrc: `${base('thiep-cuoi-26')}/image-2.webp`, storySrc: `${base('thiep-cuoi-26')}/image-6.webp`, albumHeading: 'HẠNH PHÚC LÀ CÓ NHAU' },
  { slug: 'thiep-cuoi-27', name: 'Modern Portrait Grid', hero: 'minimal-stamp', family: 'wide', familyHeading: 'THE TWO OF US', familySurface: '#f4f3ee', story: 'split', storyHeading: 'CHỨNG KIẾN HẠNH PHÚC', event: 'full', eventHeading: 'OUR WEDDING DAY', paper: '#f8f7f2', ink: '#202020', accent: '#8e8a80', soft: '#dedbd2', nameFont: sans, heroSrc: `${base('thiep-cuoi-27')}/image-1.webp`, coupleSrc: `${base('thiep-cuoi-27')}/image-3.webp`, groomSrc: `${base('thiep-cuoi-27')}/image-4.webp`, brideSrc: `${base('thiep-cuoi-27')}/image-5.webp`, storySrc: `${base('thiep-cuoi-27')}/image-8.webp`, albumHeading: 'MODERN MEMORIES' },
];

export const batch2SceneRegistry = Object.freeze(Object.fromEntries(
  profiles.map((profile) => [profile.slug, makeScene(profile)]),
));

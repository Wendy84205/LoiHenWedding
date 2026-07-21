import { templateSceneSchema } from './sceneSchema.js';

const serif = 'Cormorant Garamond, Georgia, serif';
const display = 'Playfair Display, Georgia, serif';
const script = 'Great Vibes, cursive';
const sans = 'Montserrat, Arial, sans-serif';

function motion(entrance = 'rise', delay = 0, continuous = 'none') {
  return { entrance, duration: 0.9, delay, easing: 'ease-out', continuous };
}

function text(id, label, x, y, width, height, options = {}) {
  return {
    id, type: 'text', label, x, y, width, height,
    rotation: options.rotation || 0, zIndex: options.zIndex ?? 10,
    locked: Boolean(options.locked), hidden: false,
    ...(options.binding ? { binding: options.binding } : {}),
    props: { text: options.value || '' },
    style: {
      color: options.color || '#222222', fontFamily: options.font || serif,
      fontSize: options.fontSize || 24, fontWeight: options.fontWeight || 400,
      fontStyle: options.fontStyle || 'normal', textDecoration: 'none',
      textTransform: options.textTransform || 'none', textAlign: options.align || 'center',
      lineHeight: options.lineHeight || 1.2, letterSpacing: options.letterSpacing || 0,
      opacity: options.opacity ?? 1, padding: options.padding || 0,
      backgroundColor: options.backgroundColor || 'transparent', borderRadius: options.borderRadius || 0,
    },
    animation: options.animation || motion(options.entrance || 'rise', options.delay || 0, options.continuous || 'none'),
  };
}

function image(id, label, role, x, y, width, height, options = {}) {
  return {
    id, type: 'image', label, x, y, width, height,
    rotation: options.rotation || 0, zIndex: options.zIndex ?? 4,
    locked: Boolean(options.locked), hidden: false,
    binding: { mediaRole: role },
    props: { src: options.src || '', alt: label },
    style: {
      backgroundColor: options.backgroundColor || '#eeeeee', borderRadius: options.borderRadius || 0,
      borderWidth: options.borderWidth || 0, borderColor: options.borderColor || '#ffffff',
      borderStyle: 'solid', opacity: options.opacity ?? 1, objectFit: options.objectFit || 'cover',
      objectPositionX: options.objectPositionX ?? 50, objectPositionY: options.objectPositionY ?? 50,
      boxShadow: options.boxShadow || '',
    },
    animation: options.animation || motion(options.entrance || 'fade', options.delay || 0),
  };
}

function shape(id, label, x, y, width, height, options = {}) {
  return {
    id, type: 'shape', label, x, y, width, height,
    rotation: options.rotation || 0, zIndex: options.zIndex ?? 0,
    locked: options.locked ?? true, hidden: false,
    props: { shape: options.shape || 'rectangle' },
    style: {
      backgroundColor: options.backgroundColor || '#ffffff', borderRadius: options.borderRadius || 0,
      borderWidth: options.borderWidth || 0, borderColor: options.borderColor || '#ffffff',
      borderStyle: options.borderStyle || 'solid', opacity: options.opacity ?? 1,
      boxShadow: options.boxShadow || '',
    },
    animation: options.animation || motion('none'),
  };
}

function widget(type, id, label, x, y, width, height, options = {}) {
  return {
    id, type, label, x, y, width, height,
    rotation: options.rotation || 0, zIndex: options.zIndex ?? 8,
    locked: Boolean(options.locked), hidden: false,
    ...(options.binding ? { binding: options.binding } : {}),
    props: { ...(options.props || {}) },
    style: {
      color: options.color || '#222222', backgroundColor: options.backgroundColor || 'transparent',
      fontFamily: options.font || serif, fontSize: options.fontSize || 18,
      fontWeight: options.fontWeight || 400, textAlign: options.align || 'center',
      lineHeight: options.lineHeight || 1.3, letterSpacing: options.letterSpacing || 0,
      borderRadius: options.borderRadius || 0, borderWidth: options.borderWidth || 0,
      borderColor: options.borderColor || '#ffffff', borderStyle: options.borderStyle || 'solid',
      opacity: options.opacity ?? 1, padding: options.padding || 0,
      boxShadow: options.boxShadow || '', objectFit: options.objectFit || 'cover',
      objectPositionX: options.objectPositionX ?? 50, objectPositionY: options.objectPositionY ?? 50,
    },
    animation: options.animation || motion(options.entrance || 'rise', options.delay || 0),
  };
}

function heroNodes(config) {
  const commonNames = (x, y, width, color, size = 50) => [
    text('groom-name', 'Tên chú rể', x, y, width, 72, {
      binding: { fieldPath: 'couple.groomName', format: 'plain' }, color,
      font: config.nameFont || script, fontSize: size, entrance: 'left', delay: 0.15,
    }),
    text('name-and', 'Dấu nối tên', x, y + 70, width, 40, { value: '&', color: config.accent, font: display, fontSize: 28, entrance: 'zoom', delay: 0.25 }),
    text('bride-name', 'Tên cô dâu', x, y + 112, width, 72, {
      binding: { fieldPath: 'couple.brideName', format: 'plain' }, color,
      font: config.nameFont || script, fontSize: size, entrance: 'right', delay: 0.35,
    }),
    text('hero-date', 'Ngày cưới', x, y + 205, width, 42, {
      binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color,
      font: sans, fontSize: 14, letterSpacing: 3, entrance: 'fade', delay: 0.45,
    }),
  ];

  if (config.hero === 'full-golden') return [
    image('hero-photo', 'Ảnh mở đầu', 'hero', 0, 0, 500, 820, { src: config.heroSrc, entrance: 'fade' }),
    shape('hero-shade', 'Lớp phủ ảnh', 0, 0, 500, 820, { backgroundColor: '#000000', opacity: 0.2, zIndex: 5 }),
    text('hero-quote', 'Trích dẫn mở đầu', 62, 38, 376, 70, { value: 'I love three things in this world.\nSun, moon and you.', color: '#ffffff', fontSize: 17, lineHeight: 1.35, zIndex: 8, entrance: 'fade' }),
    text('hero-kicker', 'Tiêu đề mở đầu', 58, 340, 384, 42, { value: 'WELCOME TO OUR WEDDING', color: '#ffffff', font: display, fontSize: 18, zIndex: 8, letterSpacing: 1 }),
    ...commonNames(60, 390, 380, '#ffffff', 44),
    widget('particle', 'hero-particle', 'Ánh nắng', 0, 0, 500, 820, { locked: true, zIndex: 9, props: { particle: 'sparkle' }, animation: motion('fade') }),
  ];

  if (config.hero === 'beige-frame') return [
    shape('hero-beige', 'Nền beige', 0, 0, 500, 840, { backgroundColor: config.soft, zIndex: 0 }),
    text('hero-kicker', 'Wedding', 8, 150, 190, 70, { value: 'WEDDING', color: config.ink, font: display, fontSize: 32, align: 'left', letterSpacing: 5, entrance: 'left' }),
    image('hero-photo', 'Ảnh mở đầu', 'hero', 168, 92, 286, 470, { src: config.heroSrc, entrance: 'right', borderRadius: 143, objectPositionY: 45 }),
    shape('hero-frame', 'Viền ảnh', 154, 78, 314, 498, { backgroundColor: 'transparent', borderWidth: 1, borderColor: config.accent, borderRadius: 157, zIndex: 5 }),
    text('hero-intro', 'Lời mở đầu', 58, 595, 384, 98, { binding: { fieldPath: 'copy.quote', format: 'plain' }, color: config.ink, fontSize: 20, lineHeight: 1.35 }),
    ...commonNames(58, 700, 384, config.ink, 38),
  ];

  if (config.hero === 'white-editorial') return [
    text('hero-kicker', 'Welcome', 8, 48, 190, 86, { value: 'WELCOME\nTO', color: config.ink, font: display, fontSize: 23, align: 'left', lineHeight: 1.25, letterSpacing: 3, entrance: 'left' }),
    text('hero-title', 'Our wedding', 210, 100, 280, 44, { value: 'OUR WEDDING', color: config.ink, font: display, fontSize: 22, align: 'right', letterSpacing: 2, entrance: 'right' }),
    image('hero-photo', 'Ảnh mở đầu', 'hero', 0, 170, 500, 650, { src: config.heroSrc, entrance: 'fade', objectPositionY: 42 }),
    text('hero-married', 'Thông báo kết hôn', 8, 142, 250, 30, { value: 'Chúng mình kết hôn rồi!', color: config.ink, fontSize: 15, align: 'left' }),
    ...commonNames(225, 575, 245, '#ffffff', 34),
  ];

  if (config.hero === 'oval') return [
    text('hero-quote', 'Trích dẫn mở đầu', 36, 24, 428, 56, { value: 'Sun for morning, moon for night, and you forever.', color: config.ink, font: sans, fontSize: 14, lineHeight: 1.35 }),
    text('hero-kicker', 'Wedding invitation', 55, 92, 390, 42, { value: 'WEDDING INVITATION', color: config.ink, font: sans, fontSize: 12, letterSpacing: 7 }),
    image('hero-photo', 'Ảnh mở đầu', 'hero', 65, 135, 370, 570, { src: config.heroSrc, entrance: 'zoom', borderRadius: 185, borderWidth: 1, borderColor: config.soft }),
    shape('hero-oval-line', 'Viền oval', 52, 122, 396, 596, { backgroundColor: 'transparent', borderWidth: 1, borderColor: config.soft, borderRadius: 198, zIndex: 5 }),
    text('groom-name', 'Tên chú rể', 22, 740, 205, 55, { binding: { fieldPath: 'couple.groomName', format: 'plain' }, color: config.ink, font: script, fontSize: 31, entrance: 'left' }),
    text('name-and', 'Dấu nối tên', 225, 745, 50, 44, { value: '&', color: config.accent, font: display, fontSize: 24, entrance: 'zoom', delay: 0.15 }),
    text('bride-name', 'Tên cô dâu', 273, 740, 205, 55, { binding: { fieldPath: 'couple.brideName', format: 'plain' }, color: config.ink, font: script, fontSize: 31, entrance: 'right', delay: 0.2 }),
    text('hero-date', 'Ngày cưới', 130, 808, 240, 34, { binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color: config.accent, font: sans, fontSize: 13, letterSpacing: 3, entrance: 'fade', delay: 0.3 }),
  ];

  if (config.hero === 'red-cutout') return [
    shape('hero-red', 'Nền đỏ', 0, 0, 500, 820, { backgroundColor: config.accent, zIndex: 0 }),
    text('hero-save', 'Save the date', 18, 16, 230, 58, { value: 'Save The Date', color: '#ffffff', font: script, fontSize: 31, align: 'left', entrance: 'left' }),
    text('hero-date-corner', 'Ngày cưới góc trái', 20, 76, 180, 30, { binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color: '#ffffff', font: display, fontSize: 14, align: 'left' }),
    text('groom-name', 'Tên chú rể', 190, 74, 230, 58, { binding: { fieldPath: 'couple.groomName', format: 'plain' }, color: '#ffffff', font: script, fontSize: 32, entrance: 'right' }),
    text('name-and', 'Dấu nối tên', 282, 130, 48, 38, { value: '&', color: config.soft, font: display, fontSize: 24, entrance: 'zoom', delay: 0.15 }),
    text('bride-name', 'Tên cô dâu', 190, 166, 230, 58, { binding: { fieldPath: 'couple.brideName', format: 'plain' }, color: '#ffffff', font: script, fontSize: 32, entrance: 'right', delay: 0.25 }),
    image('hero-photo', 'Ảnh mở đầu', 'hero', 116, 218, 268, 532, { src: config.heroSrc, entrance: 'rise', objectFit: 'contain' }),
    text('double-joy', 'Song hỷ', 382, 145, 100, 110, { value: '囍', color: config.soft, font: serif, fontSize: 78, opacity: 0.28, locked: true, entrance: 'right' }),
  ];

  if (config.hero === 'gray-portrait') return [
    image('hero-photo', 'Ảnh mở đầu', 'hero', 0, 0, 500, 760, { src: config.heroSrc, entrance: 'fade', objectPositionY: 38 }),
    text('hero-married', 'We get married', 70, 130, 360, 70, { value: 'We get married!', color: config.accent, font: script, fontSize: 46, entrance: 'zoom' }),
    ...commonNames(62, 425, 376, config.accent, 38),
    widget('countdown', 'hero-countdown', 'Đếm ngược mở đầu', 0, 760, 500, 105, { color: config.accent, backgroundColor: '#ffffff', props: { orientation: 'horizontal' }, entrance: 'rise' }),
  ];

  if (config.hero === 'red-arch') return [
    shape('hero-red', 'Nền đỏ', 0, 0, 500, 820, { backgroundColor: config.accent, zIndex: 0 }),
    text('hero-arc-title', 'I love you', 20, 36, 170, 40, { value: 'I LOVE YOU', color: '#ffffff', font: display, fontSize: 17, letterSpacing: 2, align: 'left', entrance: 'left' }),
    image('hero-photo', 'Ảnh mở đầu', 'hero', 25, 80, 320, 610, { src: config.heroSrc, entrance: 'zoom', borderRadius: 160, objectFit: 'contain', backgroundColor: config.soft }),
    text('hero-schedule-one', 'Lịch nhà trai', 352, 270, 145, 105, { value: 'THƯ MỜI TIỆC CƯỚI\nTHỨ BẢY · 16:30\n05 · 12 · 2027', color: '#ffffff', font: display, fontSize: 11, lineHeight: 1.7, entrance: 'right' }),
    shape('hero-schedule-line', 'Đường lịch', 375, 390, 110, 1, { backgroundColor: '#ffffff', zIndex: 6 }),
    text('hero-schedule-two', 'Lịch thành hôn', 352, 410, 145, 105, { value: 'LỄ THÀNH HÔN\nCHỦ NHẬT · 12:00\n06 · 12 · 2027', color: '#ffffff', font: display, fontSize: 11, lineHeight: 1.7, entrance: 'right', delay: 0.2 }),
    text('groom-name', 'Tên chú rể', 22, 710, 205, 55, { binding: { fieldPath: 'couple.groomName', format: 'plain' }, color: '#ffffff', font: script, fontSize: 30, entrance: 'left' }),
    text('name-and', 'Dấu nối tên', 225, 716, 50, 42, { value: '&', color: config.soft, font: display, fontSize: 23, entrance: 'zoom', delay: 0.15 }),
    text('bride-name', 'Tên cô dâu', 273, 710, 205, 55, { binding: { fieldPath: 'couple.brideName', format: 'plain' }, color: '#ffffff', font: script, fontSize: 30, entrance: 'right', delay: 0.2 }),
  ];

  const envelopeColor = config.hero === 'green-envelope'
    ? '#355b3e'
    : config.hero === 'pink-envelope'
      ? '#d589a4'
      : config.hero === 'blue-envelope'
        ? '#4870a3'
        : '#b83d45';
  return [
    text('opening-title', 'Tiêu đề phong bì', 38, 48, 424, 72, { value: config.hero === 'green-envelope' ? 'Save our date' : 'Wedding Invitation', color: config.accent, font: script, fontSize: 48, entrance: 'rise' }),
    widget('envelope', 'opening-envelope', 'Phong bì mở thiệp', 70, 165, 360, 250, {
      color: '#ffffff', backgroundColor: envelopeColor, borderRadius: 3,
      boxShadow: '0 18px 35px #00000022', props: { heading: 'Chạm để mở thiệp', lockedUntilOpen: true, src: config.heroSrc }, entrance: 'zoom',
    }),
    text('opening-prompt', 'Hướng dẫn mở thiệp', 80, 445, 340, 46, { value: 'Chạm để mở thiệp', color: config.ink, font: display, fontSize: 18, entrance: 'fade', delay: 0.25 }),
    text('groom-name', 'Tên chú rể', 25, 525, 205, 58, { binding: { fieldPath: 'couple.groomName', format: 'plain' }, color: config.ink, font: script, fontSize: 31, entrance: 'left' }),
    text('name-and', 'Dấu nối tên', 225, 531, 50, 44, { value: '&', color: config.accent, font: display, fontSize: 24, entrance: 'zoom', delay: 0.15 }),
    text('bride-name', 'Tên cô dâu', 270, 525, 205, 58, { binding: { fieldPath: 'couple.brideName', format: 'plain' }, color: config.ink, font: script, fontSize: 31, entrance: 'right', delay: 0.2 }),
    text('opening-date', 'Ngày cưới', 130, 595, 240, 34, { binding: { fieldPath: 'event.startsAt.date', format: 'date-dot' }, color: config.accent, font: sans, fontSize: 13, letterSpacing: 3, entrance: 'fade', delay: 0.3 }),
    ...(config.hero === 'green-envelope' ? [
      text('opening-flower-left', 'Trang trí hoa trái', 12, 92, 95, 140, { value: '❀', color: config.accent, fontSize: 76, rotation: -12, locked: true, entrance: 'left' }),
      text('opening-flower-right', 'Trang trí hoa phải', 398, 92, 90, 140, { value: '❀', color: config.accent, fontSize: 70, rotation: 12, locked: true, entrance: 'right' }),
    ] : []),
  ];
}

function familyNodes(config, top) {
  const familyHeading = config.familyHeading || 'WEDDING INVITATION';
  const familyHeadingSize = config.familyHeadingSize || (familyHeading.length > 23 ? 23 : 31);
  const heading = text('family-heading', 'Tiêu đề gia đình', 40, top + 58, 420, 62, {
    value: familyHeading, color: config.accent, font: display, fontSize: familyHeadingSize,
    letterSpacing: familyHeading.length > 23 ? 1 : 2,
  });
  if (config.family === 'minimal') return [
    heading,
    text('groom-family', 'Nhà trai', 30, top + 155, 205, 170, { value: 'NHÀ TRAI', color: config.ink, font: display, fontSize: 20 }),
    text('groom-father', 'Cha chú rể', 30, top + 210, 205, 38, { binding: { fieldPath: 'families.groomFather', format: 'plain' }, color: config.ink, fontSize: 16 }),
    text('groom-mother', 'Mẹ chú rể', 30, top + 250, 205, 38, { binding: { fieldPath: 'families.groomMother', format: 'plain' }, color: config.ink, fontSize: 16 }),
    text('groom-address', 'Địa chỉ nhà trai', 30, top + 290, 205, 48, { binding: { fieldPath: 'families.groomAddress', format: 'plain' }, color: config.ink, fontSize: 14, lineHeight: 1.35 }),
    text('bride-family', 'Nhà gái', 265, top + 155, 205, 170, { value: 'NHÀ GÁI', color: config.ink, font: display, fontSize: 20 }),
    text('bride-father', 'Cha cô dâu', 265, top + 210, 205, 38, { binding: { fieldPath: 'families.brideFather', format: 'plain' }, color: config.ink, fontSize: 16 }),
    text('bride-mother', 'Mẹ cô dâu', 265, top + 250, 205, 38, { binding: { fieldPath: 'families.brideMother', format: 'plain' }, color: config.ink, fontSize: 16 }),
    text('bride-address', 'Địa chỉ nhà gái', 265, top + 290, 205, 48, { binding: { fieldPath: 'families.brideAddress', format: 'plain' }, color: config.ink, fontSize: 14, lineHeight: 1.35 }),
    image('family-photo', 'Ảnh cặp đôi gia đình', 'couple', 75, top + 350, 350, 380, { src: config.coupleSrc, borderRadius: 175, entrance: 'zoom' }),
    text('family-names', 'Tên cô dâu chú rể', 60, top + 755, 380, 62, { value: 'TWO FAMILIES · ONE LOVE', color: config.accent, font: sans, fontSize: 13, letterSpacing: 3 }),
  ];
  if (config.family === 'editorial') return [
    heading,
    text('family-groom-name', 'Tên chú rể', 28, top + 118, 198, 48, { binding: { fieldPath: 'couple.groomName', format: 'plain' }, color: config.ink, font: display, fontSize: 20, entrance: 'left' }),
    text('family-name-and', 'Dấu nối tên', 226, top + 120, 48, 42, { value: '&', color: config.accent, font: display, fontSize: 20, entrance: 'zoom' }),
    text('family-bride-name', 'Tên cô dâu', 274, top + 118, 198, 48, { binding: { fieldPath: 'couple.brideName', format: 'plain' }, color: config.ink, font: display, fontSize: 20, entrance: 'right' }),
    image('family-photo', 'Ảnh cặp đôi gia đình', 'couple', 25, top + 175, 450, 360, { src: config.coupleSrc, entrance: 'fade' }),
    text('groom-family', 'Nhà trai', 30, top + 565, 205, 60, { value: 'NHÀ TRAI', color: config.accent, font: sans, fontSize: 14, letterSpacing: 2 }),
    text('groom-father', 'Cha chú rể', 30, top + 620, 205, 36, { binding: { fieldPath: 'families.groomFather', format: 'plain' }, color: config.ink, fontSize: 16 }),
    text('groom-mother', 'Mẹ chú rể', 30, top + 658, 205, 36, { binding: { fieldPath: 'families.groomMother', format: 'plain' }, color: config.ink, fontSize: 16 }),
    text('groom-address', 'Địa chỉ nhà trai', 30, top + 696, 205, 44, { binding: { fieldPath: 'families.groomAddress', format: 'plain' }, color: config.ink, fontSize: 14, lineHeight: 1.3 }),
    text('bride-family', 'Nhà gái', 265, top + 565, 205, 60, { value: 'NHÀ GÁI', color: config.accent, font: sans, fontSize: 14, letterSpacing: 2 }),
    text('bride-father', 'Cha cô dâu', 265, top + 620, 205, 36, { binding: { fieldPath: 'families.brideFather', format: 'plain' }, color: config.ink, fontSize: 16 }),
    text('bride-mother', 'Mẹ cô dâu', 265, top + 658, 205, 36, { binding: { fieldPath: 'families.brideMother', format: 'plain' }, color: config.ink, fontSize: 16 }),
    text('bride-address', 'Địa chỉ nhà gái', 265, top + 696, 205, 44, { binding: { fieldPath: 'families.brideAddress', format: 'plain' }, color: config.ink, fontSize: 14, lineHeight: 1.3 }),
    shape('family-rule', 'Đường phân cách', 70, top + 750, 360, 1, { backgroundColor: config.accent }),
  ];
  return [
    heading,
    image('groom-photo', 'Ảnh chú rể', 'groom', 28, top + 145, 210, 350, { src: config.groomSrc, borderRadius: config.photoRadius || 4, entrance: 'left' }),
    image('bride-photo', 'Ảnh cô dâu', 'bride', 262, top + 145, 210, 350, { src: config.brideSrc, borderRadius: config.photoRadius || 4, entrance: 'right' }),
    text('groom-full-name', 'Họ tên chú rể', 26, top + 515, 214, 56, { binding: { fieldPath: 'couple.groomFullName', format: 'plain' }, color: config.ink, font: display, fontSize: 22 }),
    text('bride-full-name', 'Họ tên cô dâu', 260, top + 515, 214, 56, { binding: { fieldPath: 'couple.brideFullName', format: 'plain' }, color: config.ink, font: display, fontSize: 22 }),
    text('groom-father', 'Cha chú rể', 26, top + 600, 214, 36, { binding: { fieldPath: 'families.groomFather', format: 'plain' }, color: config.ink, fontSize: 15 }),
    text('groom-mother', 'Mẹ chú rể', 26, top + 638, 214, 36, { binding: { fieldPath: 'families.groomMother', format: 'plain' }, color: config.ink, fontSize: 15 }),
    text('groom-address', 'Địa chỉ nhà trai', 26, top + 676, 214, 50, { binding: { fieldPath: 'families.groomAddress', format: 'plain' }, color: config.ink, fontSize: 13, lineHeight: 1.3 }),
    text('bride-father', 'Cha cô dâu', 260, top + 600, 214, 36, { binding: { fieldPath: 'families.brideFather', format: 'plain' }, color: config.ink, fontSize: 15 }),
    text('bride-mother', 'Mẹ cô dâu', 260, top + 638, 214, 36, { binding: { fieldPath: 'families.brideMother', format: 'plain' }, color: config.ink, fontSize: 15 }),
    text('bride-address', 'Địa chỉ nhà gái', 260, top + 676, 214, 50, { binding: { fieldPath: 'families.brideAddress', format: 'plain' }, color: config.ink, fontSize: 13, lineHeight: 1.3 }),
    shape('family-rule', 'Đường phân cách', 70, top + 750, 360, 1, { backgroundColor: config.accent }),
  ];
}

function storyNodes(config, top) {
  if (config.story === 'split') return [
    text('story-heading', 'Tiêu đề câu chuyện', 40, top + 48, 420, 70, { value: 'OUR LOVE STORY', color: config.accent, font: display, fontSize: 34 }),
    image('story-photo', 'Ảnh câu chuyện', 'couple', 24, top + 145, 222, 520, { src: config.storySrc || config.coupleSrc, entrance: 'left' }),
    text('story-copy', 'Câu chuyện tình yêu', 268, top + 170, 205, 260, { binding: { fieldPath: 'copy.story', format: 'plain' }, color: config.ink, fontSize: 18, lineHeight: 1.45, align: 'left', entrance: 'right' }),
    text('story-quote', 'Trích dẫn', 270, top + 470, 200, 160, { binding: { fieldPath: 'copy.quote', format: 'plain' }, color: config.accent, font: script, fontSize: 28, lineHeight: 1.35, entrance: 'right' }),
  ];
  if (config.story === 'full') return [
    text('story-heading', 'Tiêu đề câu chuyện', 40, top + 50, 420, 72, { value: 'OUR STORY', color: config.accent, font: script, fontSize: 42 }),
    image('story-photo', 'Ảnh câu chuyện', 'couple', 40, top + 145, 420, 470, { src: config.storySrc || config.coupleSrc, entrance: 'fade', borderRadius: 4 }),
    text('story-copy', 'Câu chuyện tình yêu', 58, top + 645, 384, 160, { binding: { fieldPath: 'copy.story', format: 'plain' }, color: config.ink, fontSize: 18, lineHeight: 1.45 }),
    text('story-quote', 'Trích dẫn', 62, top + 805, 376, 84, { binding: { fieldPath: 'copy.quote', format: 'plain' }, color: config.accent, font: script, fontSize: 26 }),
  ];
  const paper = config.story === 'paper';
  return [
    ...(paper ? [
      shape('story-paper-back', 'Giấy nền câu chuyện', 38, top + 58, 424, 730, { backgroundColor: config.soft, rotation: -2, zIndex: 1, boxShadow: '0 12px 28px #00000018' }),
      shape('story-paper', 'Giấy câu chuyện', 48, top + 46, 404, 716, { backgroundColor: '#ffffff', rotation: 1, zIndex: 2, boxShadow: '0 10px 24px #00000018' }),
    ] : []),
    text('story-heading', 'Tiêu đề câu chuyện', 70, top + 98, 360, 70, { value: 'OUR LOVE STORY', color: config.accent, font: display, fontSize: 34, zIndex: 4 }),
    image('story-photo', 'Ảnh câu chuyện', 'couple', 75, top + 190, 350, 300, { src: config.storySrc || config.coupleSrc, entrance: 'zoom', zIndex: 4, borderRadius: paper ? 2 : 150 }),
    text('story-copy', 'Câu chuyện tình yêu', 78, top + 520, 344, 150, { binding: { fieldPath: 'copy.story', format: 'plain' }, color: config.ink, fontSize: 18, lineHeight: 1.4, zIndex: 4 }),
    text('story-quote', 'Trích dẫn', 78, top + 682, 344, 82, { binding: { fieldPath: 'copy.quote', format: 'plain' }, color: config.accent, font: script, fontSize: 25, zIndex: 4 }),
  ];
}

function eventNodes(config, top) {
  const dark = config.event === 'dark';
  const surface = dark ? config.ink : config.soft;
  const eventInk = dark ? '#ffffff' : config.ink;
  return [
    shape('event-band', 'Nền ngày cưới', 0, top, 500, 1140, { backgroundColor: surface, zIndex: 0 }),
    text('event-heading', 'Save the date', 40, top + 55, 420, 72, { value: 'SAVE THE DATE', color: dark ? config.paper : config.accent, font: display, fontSize: 36, letterSpacing: 2 }),
    text('event-time', 'Giờ cưới', 50, top + 135, 400, 42, { binding: { fieldPath: 'event.startsAt.time', format: 'time' }, color: eventInk, font: sans, fontSize: 16, letterSpacing: 2 }),
    widget('calendar', 'wedding-calendar', 'Lịch ngày cưới', 40, top + 205, 420, 355, { color: eventInk, backgroundColor: 'transparent', font: sans, props: { calendarStyle: config.calendarStyle || 'heart' }, entrance: 'rise' }),
    widget('countdown', 'wedding-countdown', 'Đếm ngược', 35, top + 585, 430, 105, { color: eventInk, backgroundColor: dark ? '#000000' : '#ffffff', borderRadius: 3, padding: 10, props: { orientation: 'horizontal' }, entrance: 'zoom' }),
    text('venue-name', 'Địa điểm cưới', 45, top + 730, 410, 70, { binding: { fieldPath: 'event.venueName', format: 'plain' }, color: dark ? config.paper : config.accent, font: display, fontSize: 27 }),
    text('venue-address', 'Địa chỉ cưới', 62, top + 810, 376, 76, { binding: { fieldPath: 'event.address', format: 'plain' }, color: eventInk, fontSize: 18, lineHeight: 1.35 }),
    widget('map', 'venue-map', 'Nút xem bản đồ', 145, top + 920, 210, 58, { color: dark ? config.ink : '#ffffff', backgroundColor: dark ? config.paper : config.accent, borderRadius: 3, font: sans, fontSize: 14, fontWeight: 600, binding: { fieldPath: 'event.mapUrl', format: 'plain' }, props: { buttonLabel: 'XEM BẢN ĐỒ' }, entrance: 'rise' }),
    text('event-lunar', 'Ngày âm lịch', 55, top + 1010, 390, 60, { binding: { fieldPath: 'event.lunarDate', format: 'plain' }, color: eventInk, fontSize: 16 }),
  ];
}

function closingNodes(config, top) {
  return [
    text('album-heading', 'Tiêu đề album', 40, top + 55, 420, 72, { value: config.albumHeading || 'ALBUM OF LOVE', color: config.accent, font: display, fontSize: 35 }),
    widget('album', 'wedding-album', 'Album ảnh cưới', 24, top + 150, 452, 520, { backgroundColor: config.accent, borderRadius: 3, padding: 14, props: { maxItems: 12, columns: 3, src: config.coupleSrc }, entrance: 'fade' }),
    widget('rsvp', 'wedding-rsvp', 'Xác nhận tham dự', 48, top + 725, 404, 310, { color: config.ink, backgroundColor: '#ffffff', borderRadius: 4, borderWidth: 1, borderColor: config.soft, boxShadow: '0 12px 32px #00000015', padding: 24, props: { heading: 'Xác nhận tham dự', buttonLabel: 'GỬI XÁC NHẬN' } }),
    widget('giftQr', 'wedding-gift-qr', 'QR mừng cưới', 150, top + 1080, 200, 230, { color: config.ink, backgroundColor: '#ffffff', borderRadius: 4, borderWidth: 1, borderColor: config.soft, padding: 12, objectFit: 'contain', binding: { mediaRole: 'giftQr' }, props: { heading: 'QR mừng cưới' }, entrance: 'zoom' }),
    widget('wish', 'wedding-wish', 'Gửi lời chúc', 48, top + 1350, 404, 310, { color: config.ink, backgroundColor: '#ffffff', borderRadius: 4, borderWidth: 1, borderColor: config.soft, boxShadow: '0 12px 32px #00000015', padding: 24, props: { heading: 'Gửi lời chúc', buttonLabel: 'GỬI LỜI CHÚC' } }),
    text('thank-you', 'Lời cảm ơn', 60, top + 1690, 380, 118, { binding: { fieldPath: 'copy.thankYou', format: 'plain' }, color: config.ink, fontSize: 19, lineHeight: 1.4 }),
  ];
}

function makeProfileScene(config) {
  const familyTop = config.hero.includes('envelope') ? 1180 : 900;
  const storyTop = familyTop + 850;
  const eventTop = storyTop + 920;
  const closingTop = eventTop + 1140;
  const height = closingTop + 1850;
  const nodes = [
    shape('canvas-paper', 'Nền thiệp', 0, 0, 500, height, { backgroundColor: config.paper, zIndex: -20 }),
    ...heroNodes(config),
    ...familyNodes(config, familyTop),
    ...storyNodes(config, storyTop),
    ...eventNodes(config, eventTop),
    ...closingNodes(config, closingTop),
  ];
  return templateSceneSchema.parse({
    slug: config.slug, version: '2026.07.16-batch-1', name: config.name,
    canvas: { width: 500, height, backgroundColor: config.paper }, nodes,
    capabilities: ['text', 'image', 'shape', 'calendar', 'countdown', 'map', 'rsvp', 'wish', 'giftQr', 'envelope', 'album', 'carousel', 'particle'],
  });
}

const profiles = [
  { slug: 'thiep-cuoi-2', name: 'Golden Vow', hero: 'full-golden', family: 'portraits', familyHeading: 'TOGETHER WITH OUR FAMILIES', story: 'full', event: 'dark', paper: '#fffdf8', ink: '#2c2925', accent: '#ad8d60', soft: '#eee1cf', heroSrc: '/assets/template61/couple-hero.webp', coupleSrc: '/assets/template61/couple-close.webp', brideSrc: '/assets/template44/bride-portrait.webp', groomSrc: '/assets/template44/groom-portrait.webp', storySrc: '/assets/template61/gallery-2.webp' },
  { slug: 'thiep-cuoi-16', name: 'Beige Love Story', hero: 'beige-frame', family: 'minimal', familyHeading: 'OUR WEDDING', story: 'full', event: 'light', paper: '#f8f4ed', ink: '#4b443d', accent: '#9d8775', soft: '#d8cdbd', heroSrc: '/assets/template16-ref/side.png', coupleSrc: '/assets/template16-ref/wide.jpg', brideSrc: '/assets/template16-ref/bride.png', groomSrc: '/assets/template16-ref/groom.jpg', storySrc: '/assets/template16-ref/couple-full.jpg' },
  { slug: 'thiep-cuoi-19', name: 'White Editorial', hero: 'white-editorial', family: 'editorial', familyHeading: 'MEET THE COUPLE', story: 'split', event: 'light', paper: '#ffffff', ink: '#302c2a', accent: '#887a6f', soft: '#eee8e2', heroSrc: '/assets/template19-ref/hero.jpg', coupleSrc: '/assets/template19-ref/couple.jpg', brideSrc: '/assets/template19-ref/bride-profile.png', groomSrc: '/assets/template19-ref/groom-profile.jpg', storySrc: '/assets/template19-ref/kiss.png' },
  { slug: 'thiep-cuoi-36', name: 'Oval Promise', hero: 'oval', family: 'portraits', familyHeading: 'BRIDE & GROOM', story: 'paper', event: 'light', paper: '#ffffff', ink: '#3b3432', accent: '#d94747', soft: '#f6dede', heroSrc: '/assets/template36-ref/hero.jpg', coupleSrc: '/assets/template36-ref/wide-a.jpg', brideSrc: '/assets/template36-ref/bride.jpg', groomSrc: '/assets/template36-ref/groom.jpg', storySrc: '/assets/template36-ref/veil.jpg', photoRadius: 105 },
  { slug: 'thiep-cuoi-38', name: 'Red Double Joy', hero: 'red-cutout', family: 'minimal', familyHeading: 'TRÂN TRỌNG KÍNH MỜI', story: 'paper', event: 'dark', paper: '#fffaf0', ink: '#34201e', accent: '#8f2428', soft: '#e4b9b7', heroSrc: '/assets/template44/couple-sticker.webp', coupleSrc: '/assets/template39/couple-red.webp', brideSrc: '/assets/template44/bride-portrait.webp', groomSrc: '/assets/template44/groom-portrait.webp', storySrc: '/assets/template39/couple-red-seated.webp', calendarStyle: 'heart' },
  { slug: 'thiep-cuoi-40', name: 'Pearl Portrait', hero: 'gray-portrait', family: 'portraits', familyHeading: 'THE TWO OF US', story: 'full', event: 'light', paper: '#ffffff', ink: '#312b2b', accent: '#7c3436', soft: '#eee5e4', heroSrc: '/assets/template40-ref/hero.jpg', coupleSrc: '/assets/template40-ref/couple.jpg', brideSrc: '/assets/template40-ref/bride.jpg', groomSrc: '/assets/template40-ref/groom.jpg', storySrc: '/assets/template40-ref/save.jpg' },
  { slug: 'thiep-cuoi-42', name: 'Crimson Envelope', hero: 'red-envelope', family: 'portraits', familyHeading: 'OUR BELOVED FAMILIES', story: 'paper', event: 'light', paper: '#fffdfb', ink: '#3a2b29', accent: '#b13b44', soft: '#f1d9dc', heroSrc: '/assets/template61/couple-close.webp', coupleSrc: '/assets/template61/couple-hero.webp', brideSrc: '/assets/template44/bride-portrait.webp', groomSrc: '/assets/template44/groom-portrait.webp', storySrc: '/assets/template61/gallery-1.webp' },
  { slug: 'thiep-cuoi-46', name: 'Red Arch Schedule', hero: 'red-arch', family: 'minimal', familyHeading: 'TRÂN TRỌNG KÍNH MỜI', story: 'split', event: 'light', paper: '#ffffff', ink: '#3a2928', accent: '#8b181c', soft: '#c99a99', heroSrc: '/assets/template44/couple-sticker.webp', coupleSrc: '/assets/template44/sea-couple.webp', brideSrc: '/assets/template44/bride-portrait.webp', groomSrc: '/assets/template44/groom-portrait.webp', storySrc: '/assets/template61/couple-close.webp' },
  { slug: 'thiep-cuoi-48', name: 'Botanical Envelope', hero: 'green-envelope', family: 'editorial', familyHeading: 'TOGETHER FOREVER', story: 'full', event: 'light', paper: '#f8f5ed', ink: '#2f3b2f', accent: '#385c3d', soft: '#dce5d7', heroSrc: '/assets/template48-ref/hero.png', coupleSrc: '/assets/template48-ref/hill-run.png', brideSrc: '/assets/template48-ref/bride.png', groomSrc: '/assets/template48-ref/groom.png', storySrc: '/assets/template48-ref/lake.png', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-60', name: 'Pink Envelope', hero: 'pink-envelope', family: 'portraits', familyHeading: 'THE BRIDE & GROOM', story: 'full', event: 'light', paper: '#fff8fa', ink: '#4d2935', accent: '#b85f79', soft: '#f3d5df', heroSrc: '/assets/new-templates/thiep-cuoi-60/preview.png', coupleSrc: '/assets/new-templates/thiep-cuoi-60/image-2.png', brideSrc: '/assets/new-templates/thiep-cuoi-60/image-5.png', groomSrc: '/assets/new-templates/thiep-cuoi-60/image-6.png', storySrc: '/assets/new-templates/thiep-cuoi-60/image-3.png', calendarStyle: 'heart' },
  { slug: 'thiep-cuoi-28', name: 'White Botanical', hero: 'beige-frame', family: 'portraits', familyHeading: 'BLOOMING TOGETHER', story: 'paper', event: 'light', paper: '#f8f8f0', ink: '#344238', accent: '#61765c', soft: '#e1e7dc', heroSrc: '/assets/new-templates/thiep-cuoi-28/image-1.jpg', coupleSrc: '/assets/new-templates/thiep-cuoi-28/image-2.jpg', brideSrc: '/assets/new-templates/thiep-cuoi-28/image-4.jpg', groomSrc: '/assets/new-templates/thiep-cuoi-28/image-3.jpg', storySrc: '/assets/new-templates/thiep-cuoi-28/image-7.jpg', calendarStyle: 'minimal', photoRadius: 105 },
  { slug: 'thiep-cuoi-29', name: 'City Sunset', hero: 'full-golden', family: 'editorial', familyHeading: 'THE CITY IS OURS', story: 'full', event: 'dark', paper: '#171615', ink: '#1e1b19', accent: '#d09b73', soft: '#ead5c5', heroSrc: '/assets/new-templates/thiep-cuoi-29/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-29/image-4.webp', brideSrc: '/assets/new-templates/thiep-cuoi-29/image-5.webp', groomSrc: '/assets/new-templates/thiep-cuoi-29/image-6.webp', storySrc: '/assets/new-templates/thiep-cuoi-29/image-8.webp' },
  { slug: 'thiep-cuoi-30', name: 'Mountain Promise', hero: 'full-golden', family: 'portraits', familyHeading: 'WELCOME TO OUR WEDDING', story: 'full', event: 'light', paper: '#f4f3e9', ink: '#27352d', accent: '#5d7545', soft: '#dce2d2', heroSrc: '/assets/new-templates/thiep-cuoi-30/image-1.jpg', coupleSrc: '/assets/new-templates/thiep-cuoi-30/image-2.jpg', brideSrc: '/assets/new-templates/thiep-cuoi-30/image-6.jpg', groomSrc: '/assets/new-templates/thiep-cuoi-30/image-5.jpg', storySrc: '/assets/new-templates/thiep-cuoi-30/image-8.jpg', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-31', name: 'Love Playlist', hero: 'gray-portrait', family: 'editorial', familyHeading: 'NOW PLAYING · OUR LOVE', story: 'split', event: 'dark', paper: '#f6f1e8', ink: '#171717', accent: '#111111', soft: '#dfd6c8', heroSrc: '/assets/new-templates/thiep-cuoi-31/image-1.jpg', coupleSrc: '/assets/new-templates/thiep-cuoi-31/image-3.jpg', brideSrc: '/assets/new-templates/thiep-cuoi-31/image-4.jpg', groomSrc: '/assets/new-templates/thiep-cuoi-31/image-3.jpg', storySrc: '/assets/new-templates/thiep-cuoi-31/image-4.jpg', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-32', name: 'Modern Terracotta', hero: 'white-editorial', family: 'editorial', familyHeading: 'MODERN LOVE', story: 'split', event: 'light', paper: '#faf5ed', ink: '#26201d', accent: '#b55231', soft: '#ead8cb', heroSrc: '/assets/new-templates/thiep-cuoi-32/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-32/image-7.webp', brideSrc: '/assets/new-templates/thiep-cuoi-32/image-5.webp', groomSrc: '/assets/new-templates/thiep-cuoi-32/image-4.webp', storySrc: '/assets/new-templates/thiep-cuoi-32/image-8.webp' },
  { slug: 'thiep-cuoi-33', name: 'Oriental Minimal', hero: 'oval', family: 'minimal', familyHeading: 'DUYÊN GẶP GỠ', story: 'paper', event: 'light', paper: '#fffdf8', ink: '#201d1c', accent: '#a43842', soft: '#eed9d8', heroSrc: '/assets/new-templates/thiep-cuoi-33/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-33/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-33/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-33/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-33/image-7.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-34', name: 'Forest Vows', hero: 'full-golden', family: 'editorial', familyHeading: 'FOREST · LOVE · FOREVER', story: 'full', event: 'dark', paper: '#f2f1e8', ink: '#26382e', accent: '#38523f', soft: '#dedecf', heroSrc: '/assets/new-templates/thiep-cuoi-34/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-34/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-34/image-5.webp', groomSrc: '/assets/new-templates/thiep-cuoi-34/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-34/image-6.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-35', name: 'Mộng Hỷ', hero: 'red-cutout', family: 'minimal', familyHeading: 'HỶ SỰ THÀNH HÔN', story: 'paper', event: 'dark', paper: '#fffafa', ink: '#34272a', accent: '#b72634', soft: '#efd0d4', heroSrc: '/assets/new-templates/thiep-cuoi-35/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-35/image-3.webp', brideSrc: '/assets/new-templates/thiep-cuoi-35/image-6.webp', groomSrc: '/assets/new-templates/thiep-cuoi-35/image-5.webp', storySrc: '/assets/new-templates/thiep-cuoi-35/image-8.webp' },
  { slug: 'thiep-cuoi-37', name: 'Bold Wedding Type', hero: 'white-editorial', family: 'editorial', familyHeading: 'ABOUT US', story: 'split', event: 'dark', paper: '#ffffff', ink: '#171717', accent: '#650000', soft: '#e9d7cf', heroSrc: '/assets/new-templates/thiep-cuoi-37/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-37/image-6.webp', brideSrc: '/assets/new-templates/thiep-cuoi-37/image-3.webp', groomSrc: '/assets/new-templates/thiep-cuoi-37/image-2.webp', storySrc: '/assets/new-templates/thiep-cuoi-37/image-4.webp' },
  { slug: 'thiep-cuoi-41', name: 'Forest Envelope', hero: 'green-envelope', family: 'minimal', familyHeading: 'TWO FAMILIES · ONE LOVE', story: 'full', event: 'light', paper: '#f7f6ef', ink: '#2e3b32', accent: '#4e765e', soft: '#dbe4da', heroSrc: '/assets/new-templates/thiep-cuoi-41/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-41/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-41/image-5.webp', groomSrc: '/assets/new-templates/thiep-cuoi-41/image-4.webp', storySrc: '/assets/new-templates/thiep-cuoi-41/image-3.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-43', name: 'Scarlet Double Joy', hero: 'red-arch', family: 'minimal', familyHeading: 'TRÂN TRỌNG KÍNH MỜI', story: 'paper', event: 'dark', paper: '#fff8f3', ink: '#3b201f', accent: '#a40808', soft: '#edc7b8', heroSrc: '/assets/new-templates/thiep-cuoi-43/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-43/image-4.webp', brideSrc: '/assets/new-templates/thiep-cuoi-43/image-3.webp', groomSrc: '/assets/new-templates/thiep-cuoi-43/image-2.webp', storySrc: '/assets/new-templates/thiep-cuoi-43/image-5.webp' },
  { slug: 'thiep-cuoi-49', name: 'Joyful Red Arch', hero: 'red-cutout', family: 'minimal', familyHeading: 'LỄ THÀNH HÔN', story: 'full', event: 'dark', paper: '#fff8ef', ink: '#3d1716', accent: '#8d0808', soft: '#f0c2aa', heroSrc: '/assets/new-templates/thiep-cuoi-49/image-1.png', coupleSrc: '/assets/new-templates/thiep-cuoi-49/image-2.jpg', brideSrc: '/assets/new-templates/thiep-cuoi-49/image-5.png', groomSrc: '/assets/new-templates/thiep-cuoi-49/image-6.jpg', storySrc: '/assets/new-templates/thiep-cuoi-49/image-8.jpg' },
  { slug: 'thiep-cuoi-50', name: 'Golden Ceremony', hero: 'beige-frame', family: 'minimal', familyHeading: 'THƯ MỜI DỰ TIỆC', story: 'paper', event: 'dark', paper: '#faf3e3', ink: '#462a1d', accent: '#7b1d0e', soft: '#d8bc80', heroSrc: '/assets/new-templates/thiep-cuoi-50/image-1.png', coupleSrc: '/assets/new-templates/thiep-cuoi-50/image-5.jpg', brideSrc: '/assets/new-templates/thiep-cuoi-50/image-7.jpg', groomSrc: '/assets/new-templates/thiep-cuoi-50/image-6.jpg', storySrc: '/assets/new-templates/thiep-cuoi-50/image-8.png' },
  { slug: 'thiep-cuoi-52', name: 'He & She Editorial', hero: 'white-editorial', family: 'portraits', familyHeading: 'HE & SHE', story: 'split', event: 'light', paper: '#f8f2eb', ink: '#342a25', accent: '#61473a', soft: '#e4d5c9', heroSrc: '/assets/new-templates/thiep-cuoi-52/image-1.jpg', coupleSrc: '/assets/new-templates/thiep-cuoi-52/image-2.png', brideSrc: '/assets/new-templates/thiep-cuoi-52/image-3.jpg', groomSrc: '/assets/new-templates/thiep-cuoi-52/image-4.jpg', storySrc: '/assets/new-templates/thiep-cuoi-52/image-8.png' },
  { slug: 'thiep-cuoi-53', name: 'Blue Letter', hero: 'blue-envelope', family: 'minimal', familyHeading: 'NHÀ TRAI · NHÀ GÁI', story: 'paper', event: 'light', paper: '#fffdf9', ink: '#252b35', accent: '#4870a3', soft: '#d9e3ef', heroSrc: '/assets/new-templates/thiep-cuoi-53/image-3.jpg', coupleSrc: '/assets/new-templates/thiep-cuoi-53/image-2.jpg', brideSrc: '/assets/new-templates/thiep-cuoi-53/image-5.jpg', groomSrc: '/assets/new-templates/thiep-cuoi-53/image-5.jpg', storySrc: '/assets/new-templates/thiep-cuoi-53/image-4.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-54', name: 'Indigo Celebration', hero: 'white-editorial', family: 'editorial', familyHeading: 'TWO FAMILIES · ONE JOY', story: 'split', event: 'light', paper: '#ffffff', ink: '#193f5c', accent: '#80439c', soft: '#e4c3d4', heroSrc: '/assets/new-templates/thiep-cuoi-54/image-1.jpg', coupleSrc: '/assets/new-templates/thiep-cuoi-54/image-6.webp', brideSrc: '/assets/new-templates/thiep-cuoi-54/image-4.png', groomSrc: '/assets/new-templates/thiep-cuoi-54/image-5.png', storySrc: '/assets/new-templates/thiep-cuoi-54/image-8.png' },
  { slug: 'thiep-cuoi-55', name: 'Emerald Letter', hero: 'green-envelope', family: 'portraits', familyHeading: 'THE WEDDING OF', story: 'full', event: 'light', paper: '#f5f4ea', ink: '#29483f', accent: '#3f6e60', soft: '#d8e2d8', heroSrc: '/assets/new-templates/thiep-cuoi-55/preview.jpg', coupleSrc: '/assets/new-templates/thiep-cuoi-55/image-4.webp', brideSrc: '/assets/new-templates/thiep-cuoi-55/image-3.webp', groomSrc: '/assets/new-templates/thiep-cuoi-55/image-2.webp', storySrc: '/assets/new-templates/thiep-cuoi-55/image-8.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-56', name: 'Scarlet Bow', hero: 'red-arch', family: 'minimal', familyHeading: 'THƯ MỜI TIỆC CƯỚI', story: 'paper', event: 'dark', paper: '#faf4ed', ink: '#4f2725', accent: '#8d0e12', soft: '#e8c5b9', heroSrc: '/assets/new-templates/thiep-cuoi-56/image-2.jpg', coupleSrc: '/assets/new-templates/thiep-cuoi-56/image-5.jpg', brideSrc: '/assets/new-templates/thiep-cuoi-56/image-4.jpg', groomSrc: '/assets/new-templates/thiep-cuoi-56/image-3.jpg', storySrc: '/assets/new-templates/thiep-cuoi-56/image-8.jpg' },
  { slug: 'thiep-cuoi-57', name: 'Golden Hour Vows', hero: 'full-golden', family: 'editorial', familyHeading: 'L.O.V.E', story: 'full', event: 'dark', paper: '#f4e5d2', ink: '#4a2b27', accent: '#963b3b', soft: '#e7c38e', heroSrc: '/assets/new-templates/thiep-cuoi-57/image-1.jpg', coupleSrc: '/assets/new-templates/thiep-cuoi-57/image-2.jpg', brideSrc: '/assets/new-templates/thiep-cuoi-57/image-5.jpg', groomSrc: '/assets/new-templates/thiep-cuoi-57/image-3.jpg', storySrc: '/assets/new-templates/thiep-cuoi-57/image-7.jpg' },
  { slug: 'thiep-cuoi-58', name: 'Lake Como Gold', hero: 'beige-frame', family: 'portraits', familyHeading: 'OUR LOVE STORY', story: 'full', event: 'dark', paper: '#f7f1e8', ink: '#352b20', accent: '#9b6c28', soft: '#e7d6b5', heroSrc: '/assets/new-templates/thiep-cuoi-58/preview.png', coupleSrc: '/assets/new-templates/thiep-cuoi-58/image-1.webp', brideSrc: '/assets/new-templates/thiep-cuoi-58/image-3.webp', groomSrc: '/assets/new-templates/thiep-cuoi-58/image-8.webp', storySrc: '/assets/new-templates/thiep-cuoi-58/image-8.webp' },
  { slug: 'thiep-cuoi-59', name: 'Rose Garden Frame', hero: 'oval', family: 'portraits', familyHeading: 'LOVE IN THE GARDEN', story: 'paper', event: 'light', paper: '#fffdf8', ink: '#382a27', accent: '#7a1521', soft: '#ead9d2', heroSrc: '/assets/new-templates/thiep-cuoi-59/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-59/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-59/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-59/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-59/image-7.webp' },
  { slug: 'thiep-cuoi-62', name: 'Violet Fairytale', hero: 'full-golden', family: 'portraits', familyHeading: 'A FAIRYTALE OF US', story: 'full', event: 'dark', paper: '#eee8f5', ink: '#423351', accent: '#70447c', soft: '#ded6eb', heroSrc: '/assets/new-templates/thiep-cuoi-62/preview.png', coupleSrc: '/assets/new-templates/thiep-cuoi-62/image-1.jpg', brideSrc: '/assets/new-templates/thiep-cuoi-62/image-3.jpg', groomSrc: '/assets/new-templates/thiep-cuoi-62/image-2.jpg', storySrc: '/assets/new-templates/thiep-cuoi-62/image-7.jpg' },
  { slug: 'thiep-cuoi-63', name: 'Phoenix Invitation', hero: 'red-envelope', family: 'minimal', familyHeading: 'NGÀY CHUNG ĐÔI', story: 'paper', event: 'dark', paper: '#fff8ed', ink: '#3c211e', accent: '#9b1b1e', soft: '#e0bd74', heroSrc: '/assets/new-templates/thiep-cuoi-63/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-63/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-63/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-63/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-63/image-5.webp' },
  { slug: 'thiep-cuoi-64', name: 'Moonlight Playlist', hero: 'gray-portrait', family: 'editorial', familyHeading: 'LOVE IS OUR UNIVERSE', story: 'split', event: 'dark', paper: '#f6f4ef', ink: '#181818', accent: '#181818', soft: '#d8d3c8', heroSrc: '/assets/new-templates/thiep-cuoi-64/image-4.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-64/image-6.webp', brideSrc: '/assets/new-templates/thiep-cuoi-64/image-2.webp', groomSrc: '/assets/new-templates/thiep-cuoi-64/image-1.webp', storySrc: '/assets/new-templates/thiep-cuoi-64/image-5.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-65', name: 'Beauty and the Rose', hero: 'red-cutout', family: 'minimal', familyHeading: 'OUR STORYBOOK WEDDING', story: 'paper', event: 'light', paper: '#fff8f5', ink: '#4a3330', accent: '#b45d60', soft: '#efd4d2', heroSrc: '/assets/new-templates/thiep-cuoi-65/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-65/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-65/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-65/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-65/image-8.webp' },
  { slug: 'thiep-cuoi-66', name: 'Paper Frame Romance', hero: 'white-editorial', family: 'editorial', familyHeading: 'MODERN LOVE STORY', story: 'split', event: 'light', paper: '#f9f3f1', ink: '#332c2d', accent: '#8e3542', soft: '#e8d3d4', heroSrc: '/assets/new-templates/thiep-cuoi-66/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-66/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-66/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-66/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-66/image-7.webp' },
  { slug: 'thiep-cuoi-67', name: 'Photograph of Love', hero: 'beige-frame', family: 'editorial', familyHeading: 'TWO HEARTS · ONE FOREVER', story: 'full', event: 'light', paper: '#f6f4ee', ink: '#1e1e1e', accent: '#881100', soft: '#e5d8c7', heroSrc: '/assets/new-templates/thiep-cuoi-67/image-2.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-67/image-4.webp', brideSrc: '/assets/new-templates/thiep-cuoi-67/image-1.webp', groomSrc: '/assets/new-templates/thiep-cuoi-67/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-67/image-6.webp' },
  { slug: 'thiep-cuoi-68', name: 'Sunlit Editorial', hero: 'full-golden', family: 'editorial', familyHeading: 'WELCOME TO OUR WEDDING', story: 'full', event: 'dark', paper: '#f7f3e9', ink: '#28221d', accent: '#9b6742', soft: '#e1c6aa', heroSrc: '/assets/new-templates/thiep-cuoi-68/image-11.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-68/image-9.webp', brideSrc: '/assets/new-templates/thiep-cuoi-68/image-5.webp', groomSrc: '/assets/new-templates/thiep-cuoi-68/image-8.webp', storySrc: '/assets/new-templates/thiep-cuoi-68/image-13.webp' },
  { slug: 'thiep-cuoi-69', name: 'Blessing Begins', hero: 'red-arch', family: 'minimal', familyHeading: 'BLESSING BEGINS', story: 'paper', event: 'dark', paper: '#fffaf5', ink: '#321f20', accent: '#780b12', soft: '#e3b7a8', heroSrc: '/assets/new-templates/thiep-cuoi-69/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-69/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-69/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-69/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-69/image-5.webp' },
  { slug: 'thiep-cuoi-70', name: 'Retro Red Date', hero: 'white-editorial', family: 'editorial', familyHeading: 'FALL IN LOVE', story: 'split', event: 'light', paper: '#fffdf8', ink: '#25211f', accent: '#c11820', soft: '#ecd3cf', heroSrc: '/assets/new-templates/thiep-cuoi-70/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-70/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-70/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-70/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-70/image-7.webp' },
  { slug: 'thiep-cuoi-71', name: 'Blush Typography', hero: 'oval', family: 'editorial', familyHeading: 'LOVE IN SOFT LIGHT', story: 'paper', event: 'light', paper: '#f9f5f1', ink: '#2e2927', accent: '#c28d9e', soft: '#eadadd', heroSrc: '/assets/new-templates/thiep-cuoi-71/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-71/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-71/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-71/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-71/image-7.webp' },
  { slug: 'thiep-cuoi-72', name: 'Black Ivory Type', hero: 'white-editorial', family: 'minimal', familyHeading: 'HAPPY WEDDING', story: 'split', event: 'dark', paper: '#fffdf9', ink: '#191919', accent: '#111111', soft: '#dedbd4', heroSrc: '/assets/new-templates/thiep-cuoi-72/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-72/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-72/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-72/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-72/image-8.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-73', name: 'Botanical Announcement', hero: 'green-envelope', family: 'minimal', familyHeading: 'THIỆP BÁO HỶ', story: 'full', event: 'light', paper: '#f8f5ec', ink: '#2f4034', accent: '#3e5c48', soft: '#dce5d9', heroSrc: '/assets/new-templates/thiep-cuoi-73/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-73/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-73/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-73/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-73/image-5.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-74', name: 'Ink and Blush', hero: 'white-editorial', family: 'editorial', familyHeading: 'INK ROMANCE', story: 'split', event: 'light', paper: '#f8f1ee', ink: '#332b2a', accent: '#a35b64', soft: '#e5d2d0', heroSrc: '/assets/new-templates/thiep-cuoi-74/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-74/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-74/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-74/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-74/image-8.webp' },
  { slug: 'thiep-cuoi-75', name: 'Red Pop Love', hero: 'red-cutout', family: 'minimal', familyHeading: 'POP LOVE', story: 'paper', event: 'dark', paper: '#fff8ef', ink: '#2d2020', accent: '#bc101b', soft: '#f0c5bd', heroSrc: '/assets/new-templates/thiep-cuoi-75/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-75/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-75/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-75/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-75/image-7.webp' },
  { slug: 'thiep-cuoi-76', name: 'Violet Poetry', hero: 'white-editorial', family: 'editorial', familyHeading: 'OUR VIOLET STORY', story: 'paper', event: 'light', paper: '#fffefd', ink: '#362c36', accent: '#8b1b7c', soft: '#ead9e8', heroSrc: '/assets/new-templates/thiep-cuoi-76/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-76/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-76/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-76/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-76/image-8.webp' },
  { slug: 'thiep-cuoi-77', name: 'Soft Foliage', hero: 'beige-frame', family: 'portraits', familyHeading: 'FALL IN LOVE', story: 'full', event: 'light', paper: '#f8f3ef', ink: '#302b27', accent: '#75685c', soft: '#ddd3ca', heroSrc: '/assets/new-templates/thiep-cuoi-77/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-77/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-77/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-77/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-77/image-7.webp', photoRadius: 105 },
  { slug: 'thiep-cuoi-78', name: 'Candy Collage', hero: 'pink-envelope', family: 'portraits', familyHeading: 'OUR COLORFUL STORY', story: 'paper', event: 'light', paper: '#fffafa', ink: '#393034', accent: '#f28aa8', soft: '#f4d5df', heroSrc: '/assets/new-templates/thiep-cuoi-78/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-78/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-78/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-78/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-78/image-8.webp' },
  { slug: 'thiep-cuoi-79', name: 'Forest Vow Cinema', hero: 'full-golden', family: 'editorial', familyHeading: 'FOREST VOW', story: 'full', event: 'dark', paper: '#142119', ink: '#142119', accent: '#6b8060', soft: '#cbd7c5', heroSrc: '/assets/new-templates/thiep-cuoi-79/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-79/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-79/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-79/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-79/image-7.webp' },
  { slug: 'thiep-cuoi-80', name: 'Camcorder Love', hero: 'gray-portrait', family: 'editorial', familyHeading: 'REC · OUR LOVE', story: 'split', event: 'light', paper: '#fffafa', ink: '#382629', accent: '#d95e6b', soft: '#f0d4d8', heroSrc: '/assets/new-templates/thiep-cuoi-80/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-80/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-80/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-80/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-80/image-8.webp' },
  { slug: 'thiep-cuoi-81', name: 'Red Bow Formal', hero: 'red-arch', family: 'minimal', familyHeading: 'WEDDING INVITATION', story: 'paper', event: 'dark', paper: '#fff9f3', ink: '#332321', accent: '#9b1717', soft: '#eac4b7', heroSrc: '/assets/new-templates/thiep-cuoi-81/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-81/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-81/image-2.webp', groomSrc: '/assets/new-templates/thiep-cuoi-81/image-1.webp', storySrc: '/assets/new-templates/thiep-cuoi-81/image-4.webp' },
  { slug: 'thiep-cuoi-82', name: 'Illustrated Letter', hero: 'beige-frame', family: 'portraits', familyHeading: 'INVITATION', story: 'paper', event: 'light', paper: '#fffdf8', ink: '#292929', accent: '#8b5d42', soft: '#eadfcd', heroSrc: '/assets/new-templates/thiep-cuoi-82/image-4.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-82/image-6.webp', brideSrc: '/assets/new-templates/thiep-cuoi-82/image-1.webp', groomSrc: '/assets/new-templates/thiep-cuoi-82/image-2.webp', storySrc: '/assets/new-templates/thiep-cuoi-82/image-5.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-83', name: 'Gia Lễ Heritage', hero: 'red-cutout', family: 'minimal', familyHeading: 'GIA LỄ THÀNH HÔN', story: 'paper', event: 'dark', paper: '#fffdf8', ink: '#342523', accent: '#930000', soft: '#e6c3b5', heroSrc: '/assets/new-templates/thiep-cuoi-83/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-83/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-83/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-83/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-83/image-8.webp' },
  { slug: 'thiep-cuoi-84', name: 'Contemporary Classic', hero: 'red-arch', family: 'minimal', familyHeading: 'TRÂN TRỌNG BÁO TIN', story: 'split', event: 'light', paper: '#fffdf9', ink: '#332728', accent: '#9f2630', soft: '#e8c9c5', heroSrc: '/assets/new-templates/thiep-cuoi-84/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-84/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-84/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-84/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-84/image-7.webp' },
  { slug: 'thiep-cuoi-85', name: 'Crimson Heritage', hero: 'full-golden', family: 'minimal', familyHeading: 'NHÂN DANH TÌNH YÊU', story: 'paper', event: 'dark', paper: '#fff7ee', ink: '#371d1d', accent: '#6a060d', soft: '#d9b297', heroSrc: '/assets/new-templates/thiep-cuoi-85/image-2.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-85/image-5.webp', brideSrc: '/assets/new-templates/thiep-cuoi-85/image-6.webp', groomSrc: '/assets/new-templates/thiep-cuoi-85/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-85/image-6.webp' },
  { slug: 'thiep-cuoi-86', name: 'Pearl Typography', hero: 'white-editorial', family: 'editorial', familyHeading: 'TOGETHER IS BEAUTIFUL', story: 'split', event: 'light', paper: '#f5f4e9', ink: '#36342c', accent: '#9a8d55', soft: '#e6e2cf', heroSrc: '/assets/new-templates/thiep-cuoi-86/image-2.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-86/image-5.webp', brideSrc: '/assets/new-templates/thiep-cuoi-86/image-7.webp', groomSrc: '/assets/new-templates/thiep-cuoi-86/image-2.webp', storySrc: '/assets/new-templates/thiep-cuoi-86/image-7.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-87', name: 'Blush Botanical Frame', hero: 'oval', family: 'portraits', familyHeading: 'OUR LOVE BLOOMS', story: 'full', event: 'light', paper: '#faf3f1', ink: '#362e2f', accent: '#8f6265', soft: '#ead7d5', heroSrc: '/assets/new-templates/thiep-cuoi-87/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-87/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-87/image-5.webp', groomSrc: '/assets/new-templates/thiep-cuoi-87/image-6.webp', storySrc: '/assets/new-templates/thiep-cuoi-87/image-7.webp', photoRadius: 105 },
  { slug: 'thiep-cuoi-88', name: 'Phoenix Red Pop', hero: 'red-cutout', family: 'portraits', familyHeading: 'WELCOME TO OUR WEDDING', story: 'paper', event: 'dark', paper: '#fffdf8', ink: '#3b2525', accent: '#8e1018', soft: '#e9c9b1', heroSrc: '/assets/new-templates/thiep-cuoi-88/image-7.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-88/image-7.webp', brideSrc: '/assets/new-templates/thiep-cuoi-88/image-6.webp', groomSrc: '/assets/new-templates/thiep-cuoi-88/image-7.webp', storySrc: '/assets/new-templates/thiep-cuoi-88/image-8.webp' },
  { slug: 'thiep-cuoi-89', name: 'Playful Illustrated Poster', hero: 'beige-frame', family: 'minimal', familyHeading: 'HAPPY WEDDING', story: 'paper', event: 'light', paper: '#fffdfa', ink: '#3e2f2e', accent: '#e26765', soft: '#f4dfd8', heroSrc: '/assets/new-templates/thiep-cuoi-89/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-89/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-89/image-6.webp', groomSrc: '/assets/new-templates/thiep-cuoi-89/image-7.webp', storySrc: '/assets/new-templates/thiep-cuoi-89/image-3.webp' },
  { slug: 'thiep-cuoi-90', name: 'Sunset Cinema', hero: 'full-golden', family: 'editorial', familyHeading: 'AN INTIMATE WEDDING', story: 'full', event: 'dark', paper: '#191615', ink: '#2a211f', accent: '#b88a7a', soft: '#d8c0b6', heroSrc: '/assets/new-templates/thiep-cuoi-90/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-90/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-90/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-90/image-6.webp', storySrc: '/assets/new-templates/thiep-cuoi-90/image-7.webp' },
  { slug: 'thiep-cuoi-91', name: 'Midnight Garden', hero: 'full-golden', family: 'editorial', familyHeading: 'LOVE NEVER FAILS', story: 'full', event: 'dark', paper: '#f6f1e6', ink: '#1a3127', accent: '#315b47', soft: '#d7dfd2', heroSrc: '/assets/new-templates/thiep-cuoi-91/image-3.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-91/image-1.webp', brideSrc: '/assets/new-templates/thiep-cuoi-91/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-91/image-5.webp', storySrc: '/assets/new-templates/thiep-cuoi-91/image-6.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-92', name: 'Vintage Train Letter', hero: 'white-editorial', family: 'portraits', familyHeading: 'YOU ARE MY DESTINATION', story: 'split', event: 'light', paper: '#f8f2e9', ink: '#3a2e2b', accent: '#9f2f35', soft: '#e7d8cb', heroSrc: '/assets/new-templates/thiep-cuoi-92/image-5.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-92/image-7.webp', brideSrc: '/assets/new-templates/thiep-cuoi-92/image-3.webp', groomSrc: '/assets/new-templates/thiep-cuoi-92/image-8.webp', storySrc: '/assets/new-templates/thiep-cuoi-92/image-10.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-93', name: 'Scarlet Noir Cinema', hero: 'full-golden', family: 'editorial', familyHeading: '35 MM · OUR STORY', story: 'full', event: 'dark', paper: '#0d0d0d', ink: '#181313', accent: '#a50f1c', soft: '#d2b8b7', heroSrc: '/assets/new-templates/thiep-cuoi-93/image-2.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-93/image-7.webp', brideSrc: '/assets/new-templates/thiep-cuoi-93/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-93/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-93/image-6.webp' },
  { slug: 'thiep-cuoi-94', name: 'Monochrome Manifesto', hero: 'white-editorial', family: 'editorial', familyHeading: 'LOVE / LIFE', story: 'full', event: 'dark', paper: '#f7f6f3', ink: '#202020', accent: '#242424', soft: '#ddd9d2', heroSrc: '/assets/new-templates/thiep-cuoi-94/image-4.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-94/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-94/image-5.webp', groomSrc: '/assets/new-templates/thiep-cuoi-94/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-94/image-6.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-95', name: 'Black Type Ceremony', hero: 'gray-portrait', family: 'minimal', familyHeading: 'HUY & NGỌC', story: 'split', event: 'dark', paper: '#ffffff', ink: '#151515', accent: '#111111', soft: '#e6e2db', heroSrc: '/assets/new-templates/thiep-cuoi-95/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-95/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-95/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-95/image-5.webp', storySrc: '/assets/new-templates/thiep-cuoi-95/image-6.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-96', name: 'Layered Love Letter', hero: 'beige-frame', family: 'portraits', familyHeading: 'SAVE THE DATE', story: 'paper', event: 'light', paper: '#fffdf8', ink: '#302a28', accent: '#851925', soft: '#e8ded6', heroSrc: '/assets/new-templates/thiep-cuoi-96/image-4.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-96/image-1.webp', brideSrc: '/assets/new-templates/thiep-cuoi-96/image-3.webp', groomSrc: '/assets/new-templates/thiep-cuoi-96/image-6.webp', storySrc: '/assets/new-templates/thiep-cuoi-96/image-5.webp', photoRadius: 84 },
  { slug: 'thiep-cuoi-97', name: 'Navy Formal Seal', hero: 'red-arch', family: 'minimal', familyHeading: 'TRÂN TRỌNG KÍNH MỜI', story: 'paper', event: 'dark', paper: '#122d59', ink: '#162c4e', accent: '#122d59', soft: '#c3a445', heroSrc: '/assets/new-templates/thiep-cuoi-97/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-97/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-97/image-2.webp', groomSrc: '/assets/new-templates/thiep-cuoi-97/image-1.webp', storySrc: '/assets/new-templates/thiep-cuoi-97/image-2.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-98', name: 'Emerald Formal Seal', hero: 'red-arch', family: 'minimal', familyHeading: 'TRÂN TRỌNG KÍNH MỜI', story: 'paper', event: 'dark', paper: '#153823', ink: '#173623', accent: '#153823', soft: '#b49d53', heroSrc: '/assets/new-templates/thiep-cuoi-98/image-3.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-98/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-98/image-2.webp', groomSrc: '/assets/new-templates/thiep-cuoi-98/image-1.webp', storySrc: '/assets/new-templates/thiep-cuoi-98/image-3.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-99', name: 'Modern Photo Grid', hero: 'white-editorial', family: 'portraits', familyHeading: 'A MODERN LOVE STORY', story: 'split', event: 'light', paper: '#fffdf9', ink: '#252525', accent: '#555555', soft: '#dfddd7', heroSrc: '/assets/new-templates/thiep-cuoi-99/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-99/image-3.webp', brideSrc: '/assets/new-templates/thiep-cuoi-99/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-99/image-5.webp', storySrc: '/assets/new-templates/thiep-cuoi-99/image-6.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-100', name: 'Ruby Formal Seal', hero: 'red-arch', family: 'minimal', familyHeading: 'LỄ THÀNH HÔN', story: 'paper', event: 'dark', paper: '#fff8ef', ink: '#4a211f', accent: '#651217', soft: '#c5a64d', heroSrc: '/assets/new-templates/thiep-cuoi-100/image-3.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-100/image-2.webp', brideSrc: '/assets/new-templates/thiep-cuoi-100/image-2.webp', groomSrc: '/assets/new-templates/thiep-cuoi-100/image-1.webp', storySrc: '/assets/new-templates/thiep-cuoi-100/image-3.webp' },
  { slug: 'thiep-cuoi-101', name: 'Sage Modern Grid', hero: 'white-editorial', family: 'portraits', familyHeading: 'EVERY FRAME, A PROMISE', story: 'split', event: 'light', paper: '#fffdf8', ink: '#2b3329', accent: '#738e68', soft: '#dce4d7', heroSrc: '/assets/new-templates/thiep-cuoi-101/image-2.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-101/image-3.webp', brideSrc: '/assets/new-templates/thiep-cuoi-101/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-101/image-2.webp', storySrc: '/assets/new-templates/thiep-cuoi-101/image-7.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-102', name: 'Dragon Phoenix Formal', hero: 'red-arch', family: 'minimal', familyHeading: 'LONG PHỤNG SUM VẦY', story: 'paper', event: 'dark', paper: '#fff7ed', ink: '#4a211f', accent: '#7d1115', soft: '#d9b46b', heroSrc: '/assets/new-templates/thiep-cuoi-102/image-4.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-102/image-4.webp', brideSrc: '/assets/new-templates/thiep-cuoi-102/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-102/image-4.webp', storySrc: '/assets/new-templates/thiep-cuoi-102/image-4.webp' },
  { slug: 'thiep-cuoi-103', name: 'Forest Film Vows', hero: 'full-golden', family: 'editorial', familyHeading: 'LOVE IN EVERY FRAME', story: 'full', event: 'dark', paper: '#142219', ink: '#18251c', accent: '#658449', soft: '#cbd7c3', heroSrc: '/assets/new-templates/thiep-cuoi-103/image-6.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-103/image-7.webp', brideSrc: '/assets/new-templates/thiep-cuoi-103/image-5.webp', groomSrc: '/assets/new-templates/thiep-cuoi-103/image-4.webp', storySrc: '/assets/new-templates/thiep-cuoi-103/image-8.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-105', name: 'Sage Meadow Story', hero: 'full-golden', family: 'portraits', familyHeading: 'FIND YOU · LOVE YOU · MARRY YOU', story: 'full', event: 'light', paper: '#f7f8f1', ink: '#2f382a', accent: '#60784b', soft: '#dbe4d2', heroSrc: '/assets/new-templates/thiep-cuoi-105/image-11.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-105/image-18.webp', brideSrc: '/assets/new-templates/thiep-cuoi-105/image-13.webp', groomSrc: '/assets/new-templates/thiep-cuoi-105/image-14.webp', storySrc: '/assets/new-templates/thiep-cuoi-105/image-19.webp', calendarStyle: 'minimal', photoRadius: 105 },
  { slug: 'thiep-cuoi-106', name: 'Red Line Invitation', hero: 'red-envelope', family: 'minimal', familyHeading: 'WEDDING INVITATION', story: 'paper', event: 'light', paper: '#fbf4f1', ink: '#392d2e', accent: '#b34450', soft: '#ead6d2', heroSrc: '/assets/new-templates/thiep-cuoi-106/image-4.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-106/image-4.webp', brideSrc: '/assets/new-templates/thiep-cuoi-106/image-3.webp', groomSrc: '/assets/new-templates/thiep-cuoi-106/image-3.webp', storySrc: '/assets/new-templates/thiep-cuoi-106/image-3.webp' },
  { slug: 'thiep-cuoi-107', name: 'Retro Film Typography', hero: 'gray-portrait', family: 'editorial', familyHeading: 'TOGETHER IS A BEAUTIFUL PLACE', story: 'split', event: 'light', paper: '#f7f4ee', ink: '#25221f', accent: '#8f7265', soft: '#ddd2c5', heroSrc: '/assets/new-templates/thiep-cuoi-107/image-1.webp', coupleSrc: '/assets/new-templates/thiep-cuoi-107/image-3.webp', brideSrc: '/assets/new-templates/thiep-cuoi-107/image-4.webp', groomSrc: '/assets/new-templates/thiep-cuoi-107/image-6.webp', storySrc: '/assets/new-templates/thiep-cuoi-107/image-3.webp', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-108', name: 'Autumn Metasequoia', hero: 'full-golden', family: 'portraits', familyHeading: 'FLOWER METASEQUOIA', story: 'full', event: 'light', paper: '#f6efe3', ink: '#3c251a', accent: '#7b321c', soft: '#d9c4a4', heroSrc: '/assets/new-templates/thiep-cuoi-108/image-1.jpg', coupleSrc: '/assets/new-templates/thiep-cuoi-108/image-5.jpg', brideSrc: '/assets/new-templates/thiep-cuoi-108/image-2.jpg', groomSrc: '/assets/new-templates/thiep-cuoi-108/image-1.jpg', storySrc: '/assets/new-templates/thiep-cuoi-108/image-8.jpg', calendarStyle: 'minimal' },
  { slug: 'thiep-bw-1', name: 'Black and White Vows', hero: 'full-golden', family: 'portraits', familyHeading: 'BLACK · WHITE · FOREVER', story: 'full', event: 'dark', paper: '#ffffff', ink: '#151515', accent: '#303030', soft: '#dedede', heroSrc: '/assets/new-templates/thiep-bw-1/image-1.jpg', coupleSrc: '/assets/new-templates/thiep-bw-1/image-4.jpg', brideSrc: '/assets/new-templates/thiep-bw-1/image-3.jpg', groomSrc: '/assets/new-templates/thiep-bw-1/image-4.jpg', storySrc: '/assets/new-templates/thiep-bw-1/image-3.jpg', calendarStyle: 'minimal' },
  { slug: 'thiep-cuoi-tone-xanh', name: 'Hỷ Xanh Illustrated', hero: 'green-envelope', family: 'portraits', familyHeading: 'HỶ SỰ THÀNH HÔN', story: 'full', event: 'light', paper: '#f8fbf8', ink: '#315b45', accent: '#315f47', soft: '#c4dcd2', heroSrc: '/assets/new-templates/thiep-cuoi-tone-xanh/preview.png', coupleSrc: '/assets/new-templates/thiep-cuoi-tone-xanh/image-2.jpg', brideSrc: '/assets/new-templates/thiep-cuoi-tone-xanh/image-4.jpg', groomSrc: '/assets/new-templates/thiep-cuoi-tone-xanh/image-5.jpg', storySrc: '/assets/new-templates/thiep-cuoi-tone-xanh/image-8.jpg', calendarStyle: 'minimal', photoRadius: 105 },
];

export const profileSceneRegistry = Object.freeze(Object.fromEntries(
  profiles.map((profile) => [profile.slug, makeProfileScene(profile)]),
));

export { closingNodes, image, motion, shape, text, widget };

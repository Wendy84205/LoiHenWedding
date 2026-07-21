const missingTemplateProfiles = [
  [3, 'Hồng Song Hỷ', 'Traditional', 'ivory & rose'],
  [9, 'Vượt Qua Năm Tháng', 'Cinematic', 'forest story'],
  [12, 'Uyên Ương Họa', 'Illustration', 'red illustration'],
  [13, 'Mèo Cưới Vui', 'Illustration', 'playful yellow'],
  [22, 'Nâu Huyền', 'Cinematic', 'mocha nocturne'],
  [25, 'Hỷ Tân Hôn', 'Traditional', 'clean red'],
  [27, 'Chứng Kiến Hạnh Phúc', 'Editorial', 'photo journal'],
  [29, 'Hoàng Hôn Thành Thị', 'Cinematic', 'sunset portrait'],
  [32, 'Modern Terracotta', 'Editorial', 'terracotta grid'],
  [33, 'Duyên Bất Kiến', 'Editorial', 'oriental minimal'],
  [35, 'Mộng Hỷ', 'Traditional', 'white & red'],
  [59, 'Vườn Hồng', 'Botanical', 'rose garden'],
  [65, 'Beauty and the Rose', 'Illustration', 'storybook rose'],
  [66, 'Tình Khung Đỏ', 'Editorial', 'paper frame'],
  [70, 'Retro Save the Date', 'Editorial', 'film red'],
  [71, 'Blush Portrait', 'Romantic red', 'soft blush'],
  [72, 'Happy Wedding Minimal', 'Editorial', 'black & ivory'],
  [74, 'Ink Romance', 'Editorial', 'ink & blush'],
  [75, 'Red Pop Love', 'Traditional', 'pop red'],
  [76, 'Violet Poetry', 'Editorial', 'violet type'],
  [77, 'Fall in Love', 'Botanical', 'soft foliage'],
  [78, 'Candy Collage', 'Illustration', 'pastel collage'],
  [79, 'Forest Vow', 'Botanical', 'forest green'],
  [80, 'Camcorder Love', 'Cinematic', 'retro camera'],
  [83, 'Gia Lễ', 'Traditional', 'heritage ivory'],
  [84, 'Contemporary Classic', 'Traditional', 'modern ivory'],
  [86, 'Olive Typography', 'Editorial', 'olive minimal'],
  [87, 'Dusty Rose Formal', 'Romantic red', 'dusty rose'],
  [88, 'Phượng Hỷ', 'Traditional', 'phoenix red'],
  [89, 'Cartoon Love', 'Illustration', 'colorful story'],
  [90, 'Warm Film', 'Cinematic', 'warm grain'],
  [93, 'Dark Ballroom', 'Cinematic', 'black editorial'],
  [97, 'Royal Blue', 'Traditional', 'royal blue'],
  [98, 'Jade Green', 'Traditional', 'jade green'],
  [100, 'Vermilion Red', 'Traditional', 'vermilion'],
  [101, 'Garden Ivory', 'Botanical', 'green ivory'],
  [102, 'Long Phụng', 'Traditional', 'ornate red'],
  [103, 'Forest Story', 'Botanical', 'natural green'],
  [106, 'Wedding Letter', 'Editorial', 'handwritten blush'],
  [107, 'Modern Portrait', 'Editorial', 'black & ivory'],
];

export const missingInvitationIds = missingTemplateProfiles.map(([id]) => id);

export const additionalInvitationItems = missingTemplateProfiles.map(([id, title, category, mood]) => ({
  title,
  category,
  subtitle: `Mẫu ${id} · ${mood}`,
  image: `/assets/new-templates/thiep-cuoi-${id}/preview.webp`,
  details: ['Bố cục riêng theo mẫu', 'Animation khi cuộn', 'Nhạc, lịch, bản đồ & RSVP'],
  path: `/template/thiep-cuoi-${id}`,
}));

const currentNumericIds = Array.from({ length: 108 }, (_, index) => index + 1)
  .filter((id) => id !== 45 && id !== 51);

export const currentCatalogSlugs = [
  'thiep-bw-1',
  ...currentNumericIds.map((id) => `thiep-cuoi-${id}`),
  'thiep-cuoi-tone-xanh',
];

export const archivedInvitationSlugs = ['thiep-cuoi-51', 'thiep-cuoi-112'];

export const allInvitationSlugs = [...currentCatalogSlugs, ...archivedInvitationSlugs]
  .sort((left, right) => left.localeCompare(right, 'vi', { numeric: true }));

const profileTitleBySlug = Object.fromEntries(
  missingTemplateProfiles.map(([id, title]) => [`thiep-cuoi-${id}`, title]),
);

const featuredTitles = {
  'thiep-cuoi-39': 'Đỏ Nhung',
  'thiep-cuoi-44': 'Thiên Thanh',
  'thiep-cuoi-47': 'Hỷ Đỏ',
  'thiep-cuoi-61': 'Nắng Mai',
  'thiep-cuoi-tone-xanh': 'Hỷ Xanh',
  'thiep-bw-1': 'Black & White',
};

export function getInvitationDisplayTitle(slug) {
  if (profileTitleBySlug[slug]) return profileTitleBySlug[slug];
  if (featuredTitles[slug]) return featuredTitles[slug];
  const number = slug.match(/thiep-cuoi-(\d+)/)?.[1];
  return number ? `Mẫu thiệp cưới ${number}` : 'Mẫu thiệp cưới online';
}

export function getInvitationPath(slug) {
  return `/template/${slug}`;
}

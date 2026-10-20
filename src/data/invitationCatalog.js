export const keptTemplateIds = [3, 4, 7, 10, 14, 16, 27, 47, 48, 55, 56, 122, 123, 124, 125, 127];

export const currentCatalogSlugs = keptTemplateIds.map((id) => `thiep-cuoi-${id}`);

export const archivedInvitationSlugs = [];

export const allInvitationSlugs = [...currentCatalogSlugs];

export const missingInvitationIds = [];
export const additionalInvitationItems = [];

export const templateProfiles = {
  'thiep-cuoi-3': { id: 3, title: 'Hồng Song Hỷ', category: 'Traditional', mood: 'ivory & rose' },
  'thiep-cuoi-4': { id: 4, title: 'Blush Diary', category: 'Romantic', mood: 'soft blush' },
  'thiep-cuoi-7': { id: 7, title: 'Ribbon Love', category: 'Romantic', mood: 'ribbon red' },
  'thiep-cuoi-10': { id: 10, title: 'Black Vow', category: 'Cinematic', mood: 'editorial black' },
  'thiep-cuoi-14': { id: 14, title: 'Sepia Circle', category: 'Editorial', mood: 'warm sepia' },
  'thiep-cuoi-16': { id: 16, title: 'Thảo My', category: 'Editorial', mood: 'clean modern' },
  'thiep-cuoi-27': { id: 27, title: 'Chứng Kiến Hạnh Phúc', category: 'Editorial', mood: 'photo journal' },
  'thiep-cuoi-47': { id: 47, title: 'Hỷ Đỏ', category: 'Traditional', mood: 'oriental red' },
  'thiep-cuoi-48': { id: 48, title: 'Mộc Nhiên', category: 'Botanical', mood: 'natural green' },
  'thiep-cuoi-55': { id: 55, title: 'Lãng Mạn', category: 'Romantic', mood: 'soft pastel' },
  'thiep-cuoi-56': { id: 56, title: 'Khánh Hỷ', category: 'Traditional', mood: 'classic red' },
  'thiep-cuoi-122': { id: 122, title: 'Minimalism Đỏ Đậm', category: 'Minimalist', mood: 'burgundy & cream' },
  'thiep-cuoi-123': { id: 123, title: 'Minimalism Xanh', category: 'Minimalist', mood: 'sage green & ivory' },
  'thiep-cuoi-124': { id: 124, title: 'Thanh Diệp Xanh', category: 'Botanical', mood: 'forest green & white' },
  'thiep-cuoi-125': { id: 125, title: 'Hoa Lan Xanh Rêu', category: 'Botanical', mood: 'moss green & white orchid' },
  'thiep-cuoi-127': { id: 127, title: 'Thảo Đài', category: 'Romantic', mood: 'cream & sage' },
};

export function getInvitationDisplayTitle(slug) {
  if (templateProfiles[slug]) return templateProfiles[slug].title;
  const number = slug?.match(/thiep-cuoi-(\d+)/)?.[1];
  return number ? `Mẫu thiệp cưới ${number}` : 'Mẫu thiệp cưới online';
}

export function getInvitationPath(slug) {
  return `/template/${slug}`;
}

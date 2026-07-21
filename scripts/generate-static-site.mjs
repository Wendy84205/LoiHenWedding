import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { allInvitationSlugs, archivedInvitationSlugs, getInvitationDisplayTitle } from '../src/data/invitationCatalog.js';

const distDir = new URL('../dist/', import.meta.url).pathname;
const sourceHtml = await readFile(join(distDir, 'index.html'), 'utf8');
const siteUrl = (process.env.SITE_URL || 'https://thiep-moi-online.vercel.app').replace(/\/$/, '');
const buildDate = new Date().toISOString().slice(0, 10);

const publicRoutes = [
  ['/', 'Lời Hẹn Wedding Studio', 'Thiệp cưới online, tráp cưới và trình chiếu ngày cưới được thiết kế trọn gói.', '/social/studio.jpg'],
  ['/mau-thiep', '108 mẫu thiệp cưới Online | Lời Hẹn Studio', 'Thư viện 108 mẫu thiệp cưới React đang phục vụ, có bố cục và animation riêng.', '/social/studio.jpg'],
  ['/dich-vu/thiep-cuoi-online', 'Dịch vụ thiệp cưới Online trọn gói | Lời Hẹn Studio', 'Thiết kế, cá nhân hóa, RSVP, QR, ảnh chia sẻ và link thiệp chính thức.', '/social/studio.jpg'],
  ['/dich-vu/trap-cuoi', 'Dịch vụ tráp cưới | Lời Hẹn Studio', 'Tư vấn concept, danh sách mẫu, báo giá, đặt thuê và đặt mua tráp cưới.', '/social/studio.jpg'],
  ['/dich-vu/trinh-chieu', 'Trình chiếu ảnh cưới | Lời Hẹn Studio', 'Video album ảnh cưới và background sự kiện tối ưu cho TV, máy chiếu và màn LED.', '/social/studio.jpg'],
  ['/tu-van', 'Đặt lịch tư vấn | Lời Hẹn Studio', 'Chọn ngày, giờ và dịch vụ để nhận phương án concept cưới phù hợp.', '/social/studio.jpg'],
  ['/dat-thiep', 'Đặt thiệp cưới Online | Lời Hẹn Studio', 'Chọn gói, mẫu thiệp và gửi thông tin để nhận link xem trước riêng tư.', '/social/studio.jpg'],
  ['/chinh-sach-bao-mat', 'Chính sách bảo mật | Lời Hẹn Studio', 'Chính sách tiếp nhận, sử dụng và bàn giao dữ liệu thiệp cưới online.', '/social/studio.jpg'],
  ['/dieu-khoan-dich-vu', 'Điều khoản dịch vụ | Lời Hẹn Studio', 'Điều khoản đặt làm, nghiệm thu, lưu trữ và sử dụng sản phẩm.', '/social/studio.jpg'],
];

const privateRoutes = [
  ['/admin', 'Quản trị đơn hàng | Lời Hẹn Studio', 'Khu vực quản trị nội bộ.', '/social/studio.jpg', { noIndex: true }],
  ['/tai-khoan', 'Tài khoản khách hàng | Lời Hẹn Studio', 'Khu vực quản lý thiệp và đơn hàng riêng tư.', '/social/studio.jpg', { noIndex: true }],
  ['/don-hang', 'Cổng khách hàng | Lời Hẹn Studio', 'Theo dõi tiến độ và gửi tư liệu cho đơn hàng.', '/social/studio.jpg', { noIndex: true }],
  ['/chinh-sua-thiep', 'Chỉnh sửa thiệp | Lời Hẹn Studio', 'Khu vực chỉnh sửa thiệp riêng tư dành cho khách hàng.', '/social/studio.jpg', { noIndex: true }],
];

const projectionRoutes = [
  'opening-frame', 'white-palace', 'sea-of-us', 'love-countdown', 'polaroid-memories',
  'film-strip', 'cinematic-crossfade', 'coverflow-gallery', 'background-dam-ngo',
  'background-an-hoi', 'background-dinh-hon',
].map((slug) => [
  `/trinh-chieu/${slug}`,
  `${slug.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ')} | Lời Hẹn Studio`,
  'Mẫu trình chiếu ảnh cưới và background sự kiện dành cho TV, máy chiếu và màn LED.',
  '/social/studio.jpg',
]);

const invitationRoutes = allInvitationSlugs.map((slug) => {
  const title = getInvitationDisplayTitle(slug);
  return [
    `/template/${slug}`,
    `${title} | Thiệp cưới Online`,
    `${title} - mẫu thiệp cưới online có animation, album ảnh, lịch, bản đồ, nhạc và RSVP.`,
    `/social/${slug}.jpg`,
    archivedInvitationSlugs.includes(slug) ? { noIndex: true } : undefined,
  ];
});

const routes = [...publicRoutes, ...privateRoutes, ...projectionRoutes, ...invitationRoutes];

function escapeHtml(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function renderHtml(path, title, description, image, { noIndex = false } = {}) {
  const canonical = `${siteUrl}${path === '/' ? '' : path}`;
  const socialImage = `${siteUrl}${image}`;
  const metadata = `
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="vi_VN" />
    <meta property="og:site_name" content="Lời Hẹn Wedding Studio" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${socialImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${socialImage}" />${noIndex ? '\n    <meta name="robots" content="noindex, nofollow" />' : ''}`;

  const routeHtml = sourceHtml
    .replace(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>\s*/gi, '')
    .replace(/<meta\b(?=[^>]*\bproperty=["']og:[^"']+["'])[^>]*>\s*/gi, '')
    .replace(/<meta\b(?=[^>]*\bname=["']twitter:[^"']+["'])[^>]*>\s*/gi, '')
    .replace(/<meta\b(?=[^>]*\bname=["']robots["'])[^>]*>\s*/gi, '');

  return routeHtml
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace('</head>', `${metadata}\n  </head>`);
}

for (const [path, title, description, image, options] of routes) {
  const file = path === '/' ? join(distDir, 'index.html') : join(distDir, path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, renderHtml(path, title, description, image, options));
}

await writeFile(
  join(distDir, '404.html'),
  renderHtml('/404', 'Không tìm thấy trang | Lời Hẹn Studio', 'Đường link không tồn tại hoặc đã hết thời gian lưu trữ.', '/social/studio.jpg', { noIndex: true }),
);

const sitemapEntries = routes
  .filter(([path, , , , options]) => !options?.noIndex && !['/tu-van'].includes(path))
  .map(([path]) => `  <url><loc>${siteUrl}${path === '/' ? '' : path}</loc><lastmod>${buildDate}</lastmod></url>`)
  .join('\n');

await writeFile(
  join(distDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries}\n</urlset>\n`,
);
await writeFile(join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);

console.log(`Generated ${routes.length} static routes, sitemap.xml and 404.html.`);

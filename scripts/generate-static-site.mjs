import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { allInvitationSlugs, getInvitationDisplayTitle } from '../src/data/invitationCatalog.js';

const distDir = new URL('../dist/', import.meta.url).pathname;
const sourceHtml = await readFile(join(distDir, 'index.html'), 'utf8');
const siteUrl = (process.env.SITE_URL || 'https://thiep-moi-online.vercel.app').replace(/\/$/, '');
const buildDate = new Date().toISOString().slice(0, 10);

const publicRoutes = [
  ['/', 'Mẫu thiệp cưới Online | Lời Hẹn Wedding Studio', 'Khám phá bộ sưu tập 11 mẫu thiệp cưới online tuyển chọn của Lời Hẹn Wedding Studio.', '/social/studio.jpg'],
  ['/mau-thiep', '11 Mẫu Thiệp Cưới Online Tuyển Chọn | Lời Hẹn Wedding Studio', 'Thư viện 11 mẫu thiệp cưới tuyển chọn tinh tế, có bố cục và animation riêng.', '/social/studio.jpg'],
];

const invitationRoutes = allInvitationSlugs.map((slug) => {
  const title = getInvitationDisplayTitle(slug);
  return [
    `/template/${slug}`,
    `${title} | Thiệp cưới Online | Lời Hẹn Wedding Studio`,
    `${title} - mẫu thiệp cưới online tuyển chọn của Lời Hẹn Wedding Studio.`,
    `/social/${slug}.jpg`,
  ];
});

const routes = [...publicRoutes, ...invitationRoutes];

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

for (const [path, title, description, image, options = {}] of routes) {
  const canonicalUrl = `${siteUrl}${path === '/' ? '' : path}`;
  const imageUrl = `${siteUrl}${image}`;
  let html = sourceHtml
    .replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(description)}">`)
    .replace(/<meta\s+property="og:title"\s+content=".*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(title)}">`)
    .replace(/<meta\s+property="og:description"\s+content=".*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(description)}">`)
    .replace(/<meta\s+property="og:url"\s+content=".*?"\s*\/?>/i, `<meta property="og:url" content="${escapeHtml(canonicalUrl)}">`)
    .replace(/<meta\s+property="og:image"\s+content=".*?"\s*\/?>/i, `<meta property="og:image" content="${escapeHtml(imageUrl)}">`)
    .replace(/<meta\s+name="twitter:title"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(title)}">`)
    .replace(/<meta\s+name="twitter:description"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(description)}">`)
    .replace(/<meta\s+name="twitter:image"\s+content=".*?"\s*\/?>/i, `<meta name="twitter:image" content="${escapeHtml(imageUrl)}">`)
    .replace(/<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i, `<link rel="canonical" href="${escapeHtml(canonicalUrl)}">`);

  if (options.noIndex) {
    html = html.replace(/<meta\s+name="robots"\s+content=".*?"\s*\/?>/i, '<meta name="robots" content="noindex, nofollow">');
  }

  const outPath = path === '/' ? join(distDir, 'index.html') : join(distDir, path.replace(/^\//, ''), 'index.html');
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, html, 'utf8');
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter(([, , , , options = {}]) => !options.noIndex)
  .map(([path]) => `  <url>\n    <loc>${siteUrl}${path === '/' ? '' : path}</loc>\n    <lastmod>${buildDate}</lastmod>\n  </url>`)
  .join('\n')}
</urlset>\n`;

await writeFile(join(distDir, 'sitemap.xml'), sitemap, 'utf8');
await writeFile(join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`, 'utf8');
await writeFile(join(distDir, '404.html'), sourceHtml, 'utf8');

console.log(`Generated static pages for ${routes.length} routes.`);

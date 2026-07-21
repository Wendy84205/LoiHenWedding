import { currentCatalogSlugs } from '../src/data/invitationCatalog.js';
import { getPublicOrigin, getServiceClient, hasCommerceEnvironment } from '../server/commerce.js';

const publicPaths = [
  '', '/mau-thiep', '/dich-vu/thiep-cuoi-online', '/dich-vu/trap-cuoi', '/dich-vu/trinh-chieu', '/dat-thiep',
  '/chinh-sach-bao-mat', '/dieu-khoan-dich-vu', '/trinh-chieu/opening-frame', '/trinh-chieu/white-palace',
  '/trinh-chieu/sea-of-us', '/trinh-chieu/love-countdown', '/trinh-chieu/polaroid-memories', '/trinh-chieu/film-strip',
  '/trinh-chieu/cinematic-crossfade', '/trinh-chieu/coverflow-gallery', '/trinh-chieu/background-dam-ngo',
  '/trinh-chieu/background-an-hoi', '/trinh-chieu/background-dinh-hon',
];

function xmlEscape(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

export default async function handler(req, res) {
  const origin = getPublicOrigin();
  const urls = publicPaths.map((path) => ({ url: `${origin}${path}`, updatedAt: new Date().toISOString() }));
  urls.push(...currentCatalogSlugs.map((slug) => ({ url: `${origin}/template/${slug}`, updatedAt: new Date().toISOString() })));

  if (hasCommerceEnvironment()) {
    const supabase = getServiceClient();
    const { data } = await supabase
      .from('invitations')
      .select('slug, updated_at')
      .eq('status', 'published')
      .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`);
    urls.push(...(data || []).filter((item) => item.slug).map((item) => ({ url: `${origin}/w/${item.slug}`, updatedAt: item.updated_at })));
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((item) => `  <url><loc>${xmlEscape(item.url)}</loc><lastmod>${new Date(item.updatedAt).toISOString().slice(0, 10)}</lastmod></url>`).join('\n')}\n</urlset>`;
  res.setHeader('Content-Type', 'application/xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(body);
}

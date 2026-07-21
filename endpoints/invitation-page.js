import { getPublicOrigin } from '../server/commerce.js';
import { getInvitationBundle } from '../server/invitations.js';

function removeDefaultMeta(html) {
  return html
    .replace(/<title>.*?<\/title>/is, '')
    .replace(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>\s*/gi, '')
    .replace(/<meta\b(?=[^>]*\bname=["']description["'])[^>]*>\s*/gi, '')
    .replace(/<meta\b(?=[^>]*\bproperty=["']og:[^"']+["'])[^>]*>\s*/gi, '')
    .replace(/<meta\b(?=[^>]*\bname=["']twitter:[^"']+["'])[^>]*>\s*/gi, '');
}

function escapeHtml(value) {
  return String(value || '').replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function getShellOrigin(req) {
  if (process.env.VERCEL_URL && /^[a-z0-9.-]+$/i.test(process.env.VERCEL_URL)) return `https://${process.env.VERCEL_URL}`;
  const host = String(req.headers.host || '');
  if (/^(localhost|127\.0\.0\.1)(:\d+)?$/i.test(host)) return `http://${host}`;
  return getPublicOrigin();
}

function absoluteUrl(value, origin) {
  try {
    return new URL(value || '/', origin).toString();
  } catch {
    return `${origin}/social/studio.jpg`;
  }
}

export default async function handler(req, res) {
  try {
    const slug = String(req.query.slug || '').trim();
    const preview = String(req.query.preview || '').trim();
    const guest = String(req.query.guest || '').trim();
    const invitation = await getInvitationBundle(slug, preview, guest);
    const origin = getPublicOrigin();
    const shellResponse = await fetch(`${getShellOrigin(req)}/`);
    if (!shellResponse.ok) throw new Error('Unable to load application shell.');
    const shell = removeDefaultMeta(await shellResponse.text());
    const couple = invitation.content.couple;
    const title = invitation.seo.title || `${couple.groomName} & ${couple.brideName} | Thiệp cưới`;
    const description = invitation.seo.description || invitation.content.copy.intro;
    const canonical = `${origin}/w/${invitation.slug}`;
    const image = absoluteUrl(invitation.content.media.social || invitation.content.media.hero || `/social/${invitation.templateSlug}.jpg`, origin);
    const isPrivateView = invitation.preview || Boolean(guest);
    const meta = `<title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    ${isPrivateView ? '<meta name="robots" content="noindex,nofollow,noarchive" />' : ''}
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="vi_VN" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />`;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', isPrivateView ? 'private, no-store' : 'public, s-maxage=60, stale-while-revalidate=300');
    res.status(200).send(shell.replace('</head>', `${meta}\n</head>`));
  } catch (error) {
    const status = Number(error.statusCode) || 500;
    res.status(status).setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`<!doctype html><html lang="vi"><head><meta name="robots" content="noindex"><title>Không tìm thấy thiệp</title></head><body><main><h1>Không tìm thấy thiệp</h1><p>${escapeHtml(error.message)}</p></main></body></html>`);
  }
}

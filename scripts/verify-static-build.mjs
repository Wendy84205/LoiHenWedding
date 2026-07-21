import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { allInvitationSlugs, archivedInvitationSlugs } from '../src/data/invitationCatalog.js';

const dist = new URL('../dist/', import.meta.url).pathname;
const failures = [];

for (const slug of allInvitationSlugs) {
  const file = join(dist, 'template', slug, 'index.html');
  try {
    const html = await readFile(file, 'utf8');
    for (const marker of ['property="og:image"', 'rel="canonical"', 'name="description"']) {
      if (!html.includes(marker)) failures.push(`${slug}: missing ${marker}`);
    }
    const expectedUrl = `https://thiep-moi-online.vercel.app/template/${slug}`;
    const canonicals = [...html.matchAll(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*\bhref=["']([^"']+)["'][^>]*>/gi)];
    const openGraphImages = [...html.matchAll(/<meta\b(?=[^>]*\bproperty=["']og:image["'])[^>]*\bcontent=["']([^"']+)["'][^>]*>/gi)];
    if (canonicals.length !== 1 || canonicals[0][1] !== expectedUrl) {
      failures.push(`${slug}: expected one route-specific canonical`);
    }
    if (openGraphImages.length !== 1 || !openGraphImages[0][1].endsWith(`/social/${slug}.jpg`)) {
      failures.push(`${slug}: expected one route-specific Open Graph image`);
    }
    if (archivedInvitationSlugs.includes(slug) && !html.includes('name="robots" content="noindex, nofollow"')) {
      failures.push(`${slug}: archived invitation must be noindex`);
    }
  } catch {
    failures.push(`${slug}: missing static HTML`);
  }
}

for (const file of ['404.html', 'sitemap.xml', 'robots.txt']) {
  try { await access(join(dist, file)); } catch { failures.push(`missing ${file}`); }
}

try {
  const sitemap = await readFile(join(dist, 'sitemap.xml'), 'utf8');
  for (const slug of archivedInvitationSlugs) {
    if (sitemap.includes(`/template/${slug}`)) failures.push(`${slug}: archived invitation found in sitemap`);
  }
} catch {
  failures.push('unable to verify sitemap archive exclusions');
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Verified metadata for ${allInvitationSlugs.length} invitations plus 404, sitemap and robots.`);

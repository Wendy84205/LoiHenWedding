import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = new URL('../', import.meta.url).pathname;
const catalogPath = join(root, 'docs/zenlove-catalog-2026-09-26.json');
const manifestPath = join(root, 'src/commerce/data/zenlove-local-manifest-2026-09-26.json');
const previewDir = join(root, 'public/assets/zenlove-previews');
const previewHost = 'https://cdn-resource.zenlove.me/';

const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
await mkdir(previewDir, { recursive: true });

function buildPreviewUrl(template) {
  const source = template.longThumbnailKey || template.thumbnailKey;
  if (!source) return null;
  const url = new URL(source.replace(/^\/+/, ''), previewHost);
  url.searchParams.delete('crop');
  url.searchParams.set('format', 'webp');
  url.searchParams.set('quality', '85');
  return url;
}

async function downloadPreview(template) {
  const url = buildPreviewUrl(template);
  if (!url) return null;

  const response = await fetch(url, { headers: { accept: 'image/avif,image/webp,image/*,*/*;q=0.8' } });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  const contentType = response.headers.get('content-type') || '';
  const extension = contentType.includes('png') ? '.png' : contentType.includes('jpeg') ? '.jpg' : '.webp';
  const fileName = `${template.slug}${extension}`;
  const localPath = join(previewDir, fileName);
  await writeFile(localPath, Buffer.from(await response.arrayBuffer()));
  return { fileName, sourceUrl: url.toString(), contentType };
}

const previewBySlug = new Map();
let downloaded = 0;
let failed = 0;

for (const template of catalog.items) {
  try {
    const preview = await downloadPreview(template);
    if (preview) {
      previewBySlug.set(template.slug, preview);
      downloaded += 1;
      console.log(`Downloaded ${template.slug}`);
    }
  } catch (error) {
    failed += 1;
    console.warn(`Skipped ${template.slug}: ${error.message}`);
  }
}

for (const item of manifest.items) {
  const preview = previewBySlug.get(item.slug);
  item.localPreviewPath = preview ? `/assets/zenlove-previews/${preview.fileName}` : null;
  item.previewAvailable = Boolean(preview);
  item.previewSource = preview?.sourceUrl || null;
}

await writeFile(manifestPath, `${JSON.stringify({
  ...manifest,
  generatedAt: new Date().toISOString(),
}, null, 2)}\n`);

console.log(`Downloaded ${downloaded} ZenLove previews; ${failed} failed.`);
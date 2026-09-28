import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { profileSceneRegistry } from '../src/commerce/scene/sceneProfileTemplates.js';
import { batch2SceneRegistry } from '../src/commerce/scene/sceneBatch2Templates.js';

const root = new URL('../', import.meta.url).pathname;
const catalogPath = join(root, 'docs/zenlove-catalog-2026-09-26.json');
const outputPath = join(root, 'src/commerce/data/zenlove-local-manifest-2026-09-26.json');

const catalog = JSON.parse(await readFile(catalogPath, 'utf8'));
let previousManifest = null;
try {
  previousManifest = JSON.parse(await readFile(outputPath, 'utf8'));
} catch {
  previousManifest = null;
}
const previousItems = new Map((previousManifest?.items || []).map((item) => [item.slug, item]));
const assetEntries = await readdir(join(root, 'public/assets/new-templates'), { withFileTypes: true });
const localAssetSlugs = new Set(assetEntries.filter((entry) => entry.isDirectory()).map((entry) => entry.name));
const previewEntries = await readdir(join(root, 'public/assets/zenlove-previews'), { withFileTypes: true }).catch(() => []);
const localPreviewPaths = new Map(
  previewEntries
    .filter((entry) => entry.isFile())
    .map((entry) => [entry.name.replace(/\.(?:png|jpe?g|webp)$/i, ''), `/assets/zenlove-previews/${entry.name}`]),
);

const localSceneSlugs = new Set([
  ...Object.keys(profileSceneRegistry),
  ...Object.keys(batch2SceneRegistry),
]);

function getNumericAssetCandidates(slug) {
  const match = slug.match(/^thiep-cuoi-0*(\d+)(?:-|$)/);
  if (!match) return [];
  const normalized = `thiep-cuoi-${Number(match[1])}`;
  return localAssetSlugs.has(normalized) ? [normalized] : [];
}

const items = catalog.items.map((template) => {
  const assetAvailable = localAssetSlugs.has(template.slug);
  const sceneAvailable = localSceneSlugs.has(template.slug);
  const localAssetCandidates = assetAvailable ? [] : getNumericAssetCandidates(template.slug);
  const previous = previousItems.get(template.slug) || {};
  const localPreviewPath = localPreviewPaths.get(template.slug) || previous.localPreviewPath || null;
  return {
    id: template.id,
    slug: template.slug,
    name: template.name,
    description: template.description || '',
    categoryId: template.categoryId,
    templateType: template.templateType,
    targetPageType: template.targetPageType,
    isActive: template.isActive,
    usageCount: template.usageCount ?? 0,
    likeCount: template.likeCount ?? 0,
    viewCount: template.viewCount ?? 0,
    updatedAt: template.updatedAt,
    thumbnailKey: template.thumbnailKey,
    longThumbnailKey: template.longThumbnailKey,
    zenlovePreviewPath: `/template-preview/${template.slug}`,
    localRoute: `/template/${template.slug}`,
    assetAvailable,
    sceneAvailable,
    localAssetCandidates,
    localImplementation: sceneAvailable ? 'scene' : assetAvailable ? 'asset-only' : 'reconstructed',
    localPreviewPath,
    previewAvailable: Boolean(localPreviewPath),
    ...(previous.previewSource ? { previewSource: previous.previewSource } : {}),
  };
});

const summary = items.reduce((result, item) => {
  result[item.localImplementation] += 1;
  result[item.targetPageType] = (result[item.targetPageType] || 0) + 1;
  return result;
}, { scene: 0, 'asset-only': 0, 'catalog-only': 0, reconstructed: 0, CANVAS: 0, FORM: 0 });

await writeFile(outputPath, `${JSON.stringify({
  source: catalog.source,
  fetchedAt: catalog.fetchedAt,
  generatedAt: new Date().toISOString(),
  summary,
  items,
}, null, 2)}\n`);

console.log(`Generated ${items.length} ZenLove comparison entries.`);
console.log(JSON.stringify(summary));
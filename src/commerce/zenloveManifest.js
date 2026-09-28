import manifest from './data/zenlove-local-manifest-2026-09-26.json' with { type: 'json' };

export const zenLoveManifestItems = Object.freeze(manifest.items);
export const zenLoveManifestBySlug = Object.freeze(
  Object.fromEntries(zenLoveManifestItems.map((item) => [item.slug, item])),
);

export function getZenLovePreviewItem(slug) {
  const item = zenLoveManifestBySlug[slug];
  return item?.previewAvailable && item.localPreviewPath ? item : null;
}

export function isZenLoveCatalogOnly(slug) {
  return ['catalog-only', 'reconstructed'].includes(getZenLovePreviewItem(slug)?.localImplementation);
}

export function isZenLoveReconstructed(slug) {
  return getZenLovePreviewItem(slug)?.localImplementation === 'reconstructed';
}
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { getSceneTemplate } from './scene/sceneTemplates.js';
import { profileSceneRegistry } from './scene/sceneProfileTemplates.js';
import { batch2SceneRegistry } from './scene/sceneBatch2Templates.js';

const root = resolve(process.cwd());
const manifest = JSON.parse(readFileSync(resolve(root, 'docs/zenlove-local-manifest-2026-09-26.json'), 'utf8'));

describe('ZenLove local comparison manifest', () => {
  it('keeps the complete snapshot and summary internally consistent', () => {
    expect(manifest.items).toHaveLength(205);
    expect(manifest.summary).toMatchObject({
      scene: 3,
      'asset-only': 0,
      reconstructed: 202,
      CANVAS: 163,
      FORM: 42,
    });
    expect(manifest.items.filter((item) => item.localImplementation === 'scene').map((item) => item.slug))
      .toEqual(['thiep-cuoi-3', 'thiep-cuoi-4', 'thiep-cuoi-2']);
  });

  it('keeps every scene-backed ZenLove item connected to a valid local scene and asset set', () => {
    const sceneItems = manifest.items.filter((item) => item.localImplementation === 'scene');
    expect(sceneItems).toHaveLength(3);

    for (const item of sceneItems) {
      const scene = getSceneTemplate(item.slug);
      expect(scene, `${item.slug} has no scene registry entry`).toBeTruthy();
      expect(scene.slug).toBe(item.slug);
      expect(item.localRoute).toBe(`/template/${item.slug}`);

      for (const node of scene.nodes) {
        const source = node.props?.src;
        if (!source?.startsWith('/')) continue;
        expect(existsSync(resolve(root, `public${source}`)), `${item.slug} is missing ${source}`).toBe(true);
      }
    }
  });

  it('keeps numeric slug similarities as candidates instead of false implementations', () => {
    const candidateItems = manifest.items.filter((item) => item.localAssetCandidates?.length);
    expect(candidateItems.length).toBeGreaterThan(0);
    expect(candidateItems.every((item) => item.localImplementation === 'reconstructed')).toBe(true);
    expect(candidateItems.some((item) => item.slug === 'thiep-cuoi-01' && item.localAssetCandidates.includes('thiep-cuoi-1'))).toBe(true);
    expect(candidateItems.some((item) => item.slug === 'thiep-cuoi-103-premium' && item.localAssetCandidates.includes('thiep-cuoi-103'))).toBe(true);
  });

  it('keeps downloaded previews separate from executable local implementations', () => {
    const previewItems = manifest.items.filter((item) => item.previewAvailable);
    expect(previewItems.length).toBeGreaterThan(0);
    expect(previewItems.every((item) => item.localPreviewPath?.startsWith('/assets/zenlove-previews/'))).toBe(true);
    expect(previewItems.every((item) => ['scene', 'reconstructed'].includes(item.localImplementation))).toBe(true);
  });

  it('keeps every current preview item renderable through a scene registry', () => {
    for (const item of manifest.items.filter((entry) => entry.previewAvailable)) {
      expect(getSceneTemplate(item.slug), `${item.slug} has no renderable local scene`).toBeTruthy();
    }
  });

  it('does not classify project-local legacy scenes as ZenLove scenes', () => {
    const registrySlugs = new Set([
      ...Object.keys(profileSceneRegistry),
      ...Object.keys(batch2SceneRegistry),
    ]);
    const catalogSlugs = new Set(manifest.items.map((item) => item.slug));
    const sceneSlugs = manifest.items
      .filter((item) => item.localImplementation === 'scene')
      .map((item) => item.slug);

    expect(sceneSlugs.every((slug) => registrySlugs.has(slug) && catalogSlugs.has(slug))).toBe(true);
    expect(registrySlugs.has('thiep-cuoi-2')).toBe(true);
    expect(catalogSlugs.has('thiep-cuoi-2')).toBe(true);
    expect(sceneSlugs).toEqual(['thiep-cuoi-3', 'thiep-cuoi-4', 'thiep-cuoi-2']);
    expect(sceneSlugs).not.toContain('thiep-cuoi-1');
    expect(sceneSlugs).not.toContain('thiep-cuoi-5');
  });
});
import { describe, expect, it } from 'vitest';
import { commercialTemplateSlugs } from './invitationContent.js';
import { editorTemplateManifests, getEditorManifest } from './editorTemplateManifests.js';

describe('editor template manifests', () => {
  it('supports every template offered by the commercial order form', () => {
    expect(Object.keys(editorTemplateManifests).sort()).toEqual([...commercialTemplateSlugs].sort());
  });

  it('defines the operational media slots required by each template', () => {
    for (const slug of commercialTemplateSlugs) {
      const manifest = getEditorManifest(slug);
      expect(manifest.name).toBeTruthy();
      expect(manifest.rootSelector).toMatch(/^\./);
      expect(manifest.slots.map((slot) => slot.kind)).toEqual(expect.arrayContaining(['hero', 'couple', 'gallery', 'music', 'gift_qr']));
      expect(manifest.layers.map((layer) => layer.key)).toEqual(expect.arrayContaining(['cover', 'couple', 'event', 'media']));
      expect(manifest.layers.every((layer) => layer.selector.startsWith('.'))).toBe(true);
    }
  });

  it('supports the final catalog profiles and still rejects unknown layouts', () => {
    expect(getEditorManifest('thiep-bw-1')?.rootSelector).toBe('.sceneInvitation');
    expect(getEditorManifest('thiep-cuoi-tone-xanh')?.rootSelector).toBe('.sceneInvitation');
    expect(getEditorManifest('not-a-real-template')).toBeNull();
  });
});

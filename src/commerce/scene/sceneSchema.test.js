import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  addSceneNode, clampSceneTransform, createScenePatch, deleteSceneNode,
  normalizeScenePatch, patchSceneNode, resolveSceneDocument, scenePatchSchema,
  templateSceneSchema,
} from './sceneSchema.js';
import { getSceneTemplate, sceneTemplateRegistry, sceneTemplateSlugs } from './sceneTemplates.js';
import { editableTemplateSlugs } from '../invitationContent.js';

describe('scene graph schema', () => {
  it('validates every unlocked template and keeps scene registry aligned with the editable allowlist', () => {
    expect([...sceneTemplateSlugs].sort()).toEqual([...editableTemplateSlugs].sort());
    expect(sceneTemplateSlugs).toHaveLength(108);
    for (const template of Object.values(sceneTemplateRegistry)) {
      expect(templateSceneSchema.parse(template)).toStrictEqual(template);
      expect(new Set(template.nodes.map((node) => node.id)).size).toBe(template.nodes.length);
      expect(template.nodes.some((node) => node.type === 'rsvp')).toBe(true);
      expect(template.nodes.some((node) => node.type === 'wish')).toBe(true);
      expect(template.nodes.some((node) => node.type === 'giftQr')).toBe(true);
      expect(template.nodes.every((node) => node.y + node.height <= template.canvas.height)).toBe(true);
      for (const fieldPath of [
        'families.groomFather', 'families.groomMother', 'families.groomAddress',
        'families.brideFather', 'families.brideMother', 'families.brideAddress',
      ]) {
        expect(template.nodes.some((node) => node.binding?.fieldPath === fieldPath), `${template.slug} is missing ${fieldPath}`).toBe(true);
      }
      expect(template.nodes.some((node) => ['couple.groomName', 'couple.groomFullName'].includes(node.binding?.fieldPath))).toBe(true);
      expect(template.nodes.some((node) => ['couple.brideName', 'couple.brideFullName'].includes(node.binding?.fieldPath))).toBe(true);
    }
  });

  it('ships every local scene asset and keeps the database switch allowlist aligned', () => {
    for (const template of Object.values(sceneTemplateRegistry)) {
      for (const node of template.nodes) {
        const source = node.props?.src;
        if (!source?.startsWith('/')) continue;
        expect(existsSync(resolve(process.cwd(), `public${source}`)), `${template.slug} is missing ${source}`).toBe(true);
      }
    }

    const migration = readFileSync(
      resolve(process.cwd(), 'supabase/migrations/202607160007_expand_editable_templates.sql'),
      'utf8',
    );
    const databaseSlugs = [...new Set(migration.match(/'(?:thiep-cuoi-[^']+|thiep-bw-1)'/g) || [])]
      .map((value) => value.slice(1, -1))
      .sort();
    expect(databaseSlugs).toEqual([...editableTemplateSlugs].sort());
  });

  it('creates sparse node overrides and preserves the original template', () => {
    const template = getSceneTemplate('thiep-cuoi-44');
    const sourceNode = template.nodes.find((node) => node.type === 'text');
    const patch = patchSceneNode(createScenePatch(template), template, sourceNode.id, {
      x: sourceNode.x + 20,
      style: { color: '#112233', fontSize: 42 },
      animation: { entrance: 'zoom' },
    });
    const resolved = resolveSceneDocument(template, patch);
    const node = resolved.nodes.find((item) => item.id === sourceNode.id);
    expect(patch.nodeOverrides[sourceNode.id]).toMatchObject({
      x: sourceNode.x + 20,
      style: { color: '#112233', fontSize: 42 },
      animation: { entrance: 'zoom' },
    });
    expect(node).toMatchObject({ x: sourceNode.x + 20, style: { color: '#112233', fontSize: 42 } });
    expect(sourceNode.style.color).not.toBe('#112233');
  });

  it('adds and deletes nodes without accepting arbitrary executable payloads', () => {
    const template = getSceneTemplate('thiep-cuoi-39');
    const node = {
      id: 'custom-text-1', type: 'text', label: 'Nội dung mới', x: 20, y: 20,
      width: 220, height: 80, rotation: 0, zIndex: 20, locked: false, hidden: false,
      props: { text: 'Xin chào' }, style: { color: '#111111' },
      animation: { entrance: 'fade', duration: 0.8, delay: 0, easing: 'ease-out', continuous: 'none' },
    };
    const added = addSceneNode(createScenePatch(template), template, node);
    expect(resolveSceneDocument(template, added).nodes.some((item) => item.id === node.id)).toBe(true);
    expect(resolveSceneDocument(template, deleteSceneNode(added, template, node.id)).nodes.some((item) => item.id === node.id)).toBe(false);
    expect(() => scenePatchSchema.parse({
      ...createScenePatch(template),
      addedNodes: [{ ...node, props: { text: 'ok', html: '<script>alert(1)</script>' } }],
    })).toThrow();
    expect(() => scenePatchSchema.parse({
      ...createScenePatch(template),
      nodeOverrides: { [node.id]: { style: { backgroundImage: 'url(javascript:alert(1))' } } },
    })).toThrow();
    expect(() => scenePatchSchema.parse({
      ...createScenePatch(template),
      addedNodes: [{ ...node, id: 'bad-map', type: 'map', props: { mapUrl: 'javascript:alert(1)' } }],
    })).toThrow();
  });

  it('resets invalid or stale patches and clamps transforms to safe bounds', () => {
    const template = getSceneTemplate('thiep-cuoi-61');
    expect(normalizeScenePatch({ ...createScenePatch(template), templateVersion: 'old' }, template))
      .toEqual(createScenePatch(template));
    expect(normalizeScenePatch({ schemaVersion: 1, templateVersion: template.version, javascript: 'alert(1)' }, template))
      .toEqual(createScenePatch(template));
    expect(clampSceneTransform({ x: -9999, y: 99999, width: 4000, height: 40000, rotation: -30 }, template.canvas))
      .toEqual({ x: -999, y: template.canvas.height - 1, width: 1000, height: template.canvas.height, rotation: 330 });
  });
});

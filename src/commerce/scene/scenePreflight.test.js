import { describe, expect, it } from 'vitest';
import { defaultInvitationContent } from '../invitationContent.js';
import { createScenePatch, patchSceneNode } from './sceneSchema.js';
import { getSceneTemplate } from './sceneTemplates.js';
import { runInvitationPreflight } from './scenePreflight.js';

describe('invitation scene preflight', () => {
  const template = getSceneTemplate('thiep-cuoi-44');
  const baseInput = {
    content: { ...defaultInvitationContent, media: { ...defaultInvitationContent.media, social: '/social/thiep-cuoi-44.jpg' } },
    design: createScenePatch(template),
    template,
    slug: 'minh-tri-thanh-hang',
    expiresAt: '2030-01-01T00:00:00+07:00',
    seoTitle: 'Minh Trí & Thanh Hằng',
    seoDescription: 'Trân trọng kính mời',
  };

  it('accepts a valid pilot invitation', () => {
    const result = runInvitationPreflight(baseInput);
    expect(result.errors).toEqual([]);
    expect(result.ok).toBe(true);
  });

  it('blocks invalid metadata and nodes completely outside the canvas', () => {
    const node = template.nodes.find((item) => item.type === 'text');
    const design = patchSceneNode(baseInput.design, template, node.id, { x: 900, y: 900 });
    const result = runInvitationPreflight({ ...baseInput, design, slug: 'Link Không Hợp Lệ', seoTitle: '' });
    expect(result.ok).toBe(false);
    expect(result.errors.map((item) => item.code)).toEqual(expect.arrayContaining([
      'slug_invalid', 'share_title_missing', 'node_outside_canvas',
    ]));
  });

  it('keeps legacy invitations publishable while reporting that scene editing is unavailable', () => {
    const result = runInvitationPreflight({ ...baseInput, template: null, design: null });
    expect(result.ok).toBe(true);
    expect(result.warnings.map((item) => item.code)).toContain('legacy_renderer');
  });
});

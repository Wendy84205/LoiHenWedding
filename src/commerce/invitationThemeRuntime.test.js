import { describe, expect, it } from 'vitest';
import { getEditorManifest } from './editorTemplateManifests.js';
import { buildInvitationThemeCss } from './invitationThemeRuntime.js';

describe('invitation theme runtime', () => {
  const manifest = getEditorManifest('thiep-cuoi-44');

  it('keeps an untouched template completely original', () => {
    expect(buildInvitationThemeCss(manifest, {})).toBe('');
  });

  it('scopes visibility, motion, palette and font overrides to the template', () => {
    const css = buildInvitationThemeCss(manifest, {
      hiddenLayers: ['story'], motion: 'reduced', palette: 'sage', font: 'modern',
      colors: { surface: '', ink: '', accent: '' },
    });
    expect(css).toContain('.t44-quotePaper{display:none!important}');
    expect(css).toContain('animation-duration:.01ms!important');
    expect(css).toContain('.template44{background-color:#f7faf6!important');
    expect(css).toContain('color:#6a806d!important');
    expect(css).toContain('font-family:"Montserrat", "Outfit", Arial, sans-serif!important');
    expect(css).not.toContain('undefined');
  });

  it('positions only marked media roles and supports background pseudo-elements', () => {
    const css = buildInvitationThemeCss(manifest, {
      mediaPositions: { hero: { x: 20, y: 36 }, bride: { x: 74, y: 18 } },
    });
    expect(css).toContain('.template44 [data-media-role="hero"],.template44 [data-media-role="hero"]::before');
    expect(css).toContain('object-position:20% 36%!important;background-position:20% 36%!important');
    expect(css).toContain('object-position:74% 18%!important;background-position:74% 18%!important');
    expect(css).not.toContain('[data-media-role="groom"]');
  });

  it('applies custom entrance effects to one manifest layer and respects reduced motion', () => {
    const css = buildInvitationThemeCss(manifest, { layerEffects: { story: 'left' } });
    expect(css).toContain('@keyframes loihen-layer-left');
    expect(css).toContain('.t44-quotePaper{animation:loihen-layer-left .95s');
    expect(buildInvitationThemeCss(manifest, { motion: 'reduced', layerEffects: { story: 'left' } }))
      .not.toContain('@keyframes loihen-layer-left');
  });

  it('formats only explicitly tagged invitation text fields', () => {
    const css = buildInvitationThemeCss(manifest, {
      textStyles: {
        'couple.groomName': { fontSize: 48, color: '#1f4d3a', align: 'center', font: 'romantic', bold: true, italic: true },
      },
    });
    expect(css).toContain('.template44 [data-editor-field="couple.groomName"]{');
    expect(css).toContain('font-size:48px!important');
    expect(css).toContain('color:#1f4d3a!important');
    expect(css).toContain('text-align:center!important');
    expect(css).toContain('font-weight:700!important');
    expect(css).toContain('font-style:italic!important');
    expect(css).toContain('font-family:"Great Vibes", "Cormorant Garamond", cursive!important');
  });
});

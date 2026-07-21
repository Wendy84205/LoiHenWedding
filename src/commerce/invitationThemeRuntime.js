import {
  invitationFontPresets, normalizeInvitationTheme, resolveInvitationPalette,
} from './invitationContent.js';

function splitSelectors(value = '') {
  return value.split(',').map((selector) => selector.trim()).filter(Boolean);
}

const layerEffectAnimations = {
  fade: 'loihen-layer-fade .9s ease both',
  rise: 'loihen-layer-rise .95s cubic-bezier(.22,1,.36,1) both',
  left: 'loihen-layer-left .95s cubic-bezier(.22,1,.36,1) both',
  right: 'loihen-layer-right .95s cubic-bezier(.22,1,.36,1) both',
  zoom: 'loihen-layer-zoom 1s cubic-bezier(.22,1,.36,1) both',
};

const layerEffectKeyframes = '@keyframes loihen-layer-fade{from{opacity:0}to{opacity:1}}'
  + '@keyframes loihen-layer-rise{from{opacity:0;transform:translateY(44px)}to{opacity:1;transform:none}}'
  + '@keyframes loihen-layer-left{from{opacity:0;transform:translateX(-58px)}to{opacity:1;transform:none}}'
  + '@keyframes loihen-layer-right{from{opacity:0;transform:translateX(58px)}to{opacity:1;transform:none}}'
  + '@keyframes loihen-layer-zoom{from{opacity:0;transform:scale(.93)}to{opacity:1;transform:none}}';

export function buildInvitationThemeCss(manifest, value = {}) {
  if (!manifest) return '';
  const theme = normalizeInvitationTheme(value);
  const hiddenCss = manifest.layers
    .filter((layer) => theme.hiddenLayers.includes(layer.key))
    .map((layer) => `${layer.selector}{display:none!important}`)
    .join('');
  const motionCss = theme.motion === 'reduced'
    ? '*,:before,:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}'
    : '';

  const layerSelectors = [...new Set(manifest.layers.flatMap((layer) => splitSelectors(layer.selector)))];
  const copySelectors = [...new Set(manifest.layers
    .filter((layer) => !['cover', 'media'].includes(layer.key))
    .flatMap((layer) => splitSelectors(layer.selector)))];
  const hasPaletteOverride = theme.palette !== 'original' || Object.values(theme.colors).some(Boolean);
  let paletteCss = '';
  if (hasPaletteOverride && layerSelectors.length) {
    const palette = resolveInvitationPalette(theme, manifest.accent);
    const headingTargets = layerSelectors.map((selector) => `${selector} :is(h1,h2,h3,h4)`).join(',');
    const copyTargets = copySelectors.map((selector) => `${selector} :is(p,small)`).join(',');
    paletteCss = `${manifest.rootSelector || layerSelectors[0]}{background-color:${palette.surface}!important;color:${palette.ink};accent-color:${palette.accent}}`;
    paletteCss += `${layerSelectors.join(',')}{background-color:${palette.surface}!important}`;
    if (headingTargets) paletteCss += `${headingTargets}{color:${palette.accent}!important}`;
    if (copyTargets) paletteCss += `${copyTargets}{color:${palette.ink}!important}`;
  }

  const fontPreset = invitationFontPresets[theme.font];
  let fontCss = '';
  if (theme.font !== 'original' && fontPreset && layerSelectors.length) {
    const bodyTargets = layerSelectors.flatMap((selector) => [selector, `${selector} :is(p,span,small,strong,em,i,time,label,a,button,input,select,textarea)`]).join(',');
    const headingTargets = layerSelectors.map((selector) => `${selector} :is(h1,h2,h3,h4)`).join(',');
    fontCss = `${bodyTargets}{font-family:${fontPreset.body}!important}`;
    fontCss += `${headingTargets}{font-family:${fontPreset.heading}!important}`;
  }

  const mediaCss = Object.entries(theme.mediaPositions).map(([role, position]) => {
    const selector = `${manifest.rootSelector} [data-media-role="${role}"]`;
    const targets = `${selector},${selector}::before`;
    return `${targets}{object-position:${position.x}% ${position.y}%!important;background-position:${position.x}% ${position.y}%!important}`;
  }).join('');

  const layerEffects = theme.motion === 'full' ? Object.entries(theme.layerEffects).flatMap(([layerKey, effect]) => {
    const layer = manifest.layers.find((item) => item.key === layerKey);
    const animation = layerEffectAnimations[effect];
    return layer && animation ? [`${layer.selector}{animation:${animation}!important}`] : [];
  }).join('') : '';
  const effectCss = layerEffects ? `${layerEffectKeyframes}${layerEffects}` : '';

  const textCss = Object.entries(theme.textStyles).map(([fieldPath, style]) => {
    const declarations = [];
    if (style.fontSize) declarations.push(`font-size:${style.fontSize}px!important`);
    if (style.color) declarations.push(`color:${style.color}!important`);
    if (style.align) declarations.push(`text-align:${style.align}!important`);
    if (style.bold) declarations.push('font-weight:700!important');
    if (style.italic) declarations.push('font-style:italic!important');
    if (style.font && invitationFontPresets[style.font]) {
      const useHeading = fieldPath.startsWith('couple.') || fieldPath === 'event.venueName';
      declarations.push(`font-family:${useHeading ? invitationFontPresets[style.font].heading : invitationFontPresets[style.font].body}!important`);
    }
    return declarations.length
      ? `${manifest.rootSelector} [data-editor-field="${fieldPath}"]{${declarations.join(';')}}`
      : '';
  }).join('');

  return `${hiddenCss}${motionCss}${paletteCss}${fontCss}${mediaCss}${effectCss}${textCss}`;
}

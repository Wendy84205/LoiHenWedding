import { chromium } from 'playwright';
import fs from 'node:fs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 500, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await page.goto('https://cinelove.me/template/thiep-cuoi-3', { waitUntil: 'domcontentloaded', timeout: 180000 });
await page.waitForTimeout(15000);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1500);

const info = await page.evaluate(() => {
  const root = document.querySelector('#root-page-container');
  if (!root) return { error: 'no root' };
  const cr = root.getBoundingClientRect();
  const rootCs = getComputedStyle(root);
  // node layer: direct children of the wrapper inside root
  const nodeSel = ':scope > div > div > div[data-node-id]';
  let nodes = [...root.querySelectorAll(nodeSel)];
  if (!nodes.length) {
    nodes = [...root.querySelectorAll('div[data-node-id]')];
  }
  const readNode = (el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    // inner wrapper (the div that actually holds content)
    const inner = el.querySelector(':scope > div');
    const ic = inner ? getComputedStyle(inner) : null;
    const ir = inner ? inner.getBoundingClientRect() : null;
    const leaves = [...el.querySelectorAll('*')].filter((c) => c.children.length === 0 && c.textContent.trim());
    const imgs = [...el.querySelectorAll('img')].map((im) => ({
      src: im.getAttribute('src') || im.currentSrc,
      w: Math.round(im.getBoundingClientRect().width),
      h: Math.round(im.getBoundingClientRect().height),
      fit: getComputedStyle(im).objectFit,
      cls: (im.className || '').toString(),
    }));
    const svgs = [...el.querySelectorAll('svg')].map((s) => ({
      cls: (s.getAttribute('class') || ''),
      w: Math.round(s.getBoundingClientRect().width),
      h: Math.round(s.getBoundingClientRect().height),
      html: s.outerHTML.slice(0, 700),
    }));
    return {
      id: el.dataset.nodeId,
      cls: (el.className || '').toString(),
      rect: [+(r.left - cr.left).toFixed(2), +(r.top - cr.top).toFixed(2), +r.width.toFixed(2), +r.height.toFixed(2)],
      style: { top: el.style.top, left: el.style.left, width: el.style.width, height: el.style.height, transform: el.style.transform, opacity: el.style.opacity, zIndex: el.style.zIndex },
      cs: {
        z: cs.zIndex, opacity: cs.opacity, transform: cs.transform, bg: cs.backgroundColor,
        bgimg: cs.backgroundImage === 'none' ? 'none' : cs.backgroundImage.slice(0, 220),
        borderRadius: cs.borderRadius, border: cs.border, overflow: cs.overflow, display: cs.display,
        textAlign: cs.textAlign, color: cs.color, font: cs.font,
      },
      inner: inner ? {
        rect: [+(ir.left - cr.left).toFixed(2), +(ir.top - cr.top).toFixed(2), +ir.width.toFixed(2), +ir.height.toFixed(2)],
        cls: (inner.className || '').toString(),
        bg: ic.backgroundColor,
        bgimg: ic.backgroundImage === 'none' ? 'none' : ic.backgroundImage.slice(0, 220),
        borderRadius: ic.borderRadius,
        pad: ic.padding,
        border: ic.border,
        display: ic.display,
      } : null,
      leaves: leaves.slice(0, 30).map((c) => {
        const ccs = getComputedStyle(c);
        return {
          tag: c.tagName, text: c.textContent.trim().slice(0, 120),
          ff: ccs.fontFamily, fs: ccs.fontSize, fw: ccs.fontWeight, fst: ccs.fontStyle,
          lh: ccs.lineHeight, ls: ccs.letterSpacing, ta: ccs.textAlign, color: ccs.color,
          tt: ccs.textTransform,
        };
      }),
      imgs, svgs,
    };
  };
  const canvasRect = root.querySelector(':scope > div > div') ? root.querySelector(':scope > div > div').getBoundingClientRect() : cr;
  return {
    root: { rect: [cr.left, cr.top, cr.width, cr.height], overflow: rootCs.overflow, bg: rootCs.backgroundColor },
    canvas: { w: canvasRect.width, h: canvasRect.height },
    count: nodes.length,
    nodes: nodes.map(readNode),
  };
});

fs.writeFileSync('/tmp/t3_measure.json', JSON.stringify(info, null, 1));
fs.writeFileSync('/tmp/t3_measure_raw.json', JSON.stringify(info, null, 1));
console.log('canvas', JSON.stringify(info.canvas), 'nodes', info.count);
if (info.nodes) {
  info.nodes.slice(0, 6).forEach((n) => console.log(n.id, JSON.stringify(n.rect), n.cls.slice(0, 40), 'leaves', n.leaves.length, 'imgs', n.imgs.length, 'svgs', n.svgs.length));
}
await browser.close();
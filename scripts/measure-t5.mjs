import { chromium } from 'playwright';
import fs from 'node:fs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1200 }, deviceScaleFactor: 1 });
await page.goto('https://cinelove.me/template/thiep-cuoi-5', { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.waitForTimeout(12000);

const info = await page.evaluate(() => {
  const root = document.querySelector('#root-page-container');
  if (!root) return { error: 'no root' };
  const canvasRect = root.getBoundingClientRect();
  const nodes = [...root.querySelectorAll(':scope > div > div > div[data-node-id]')];
  const read = (el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      id: el.dataset.nodeId,
      top: +(r.top - canvasRect.top).toFixed(2),
      left: +(r.left - canvasRect.left).toFixed(2),
      w: +r.width.toFixed(2),
      h: +r.height.toFixed(2),
      z: cs.zIndex,
      bg: cs.backgroundColor,
      bgimg: cs.backgroundImage,
      transform: cs.transform,
      opacity: cs.opacity,
    };
  };
  const texts = [];
  for (const el of nodes) {
    // walk to find leaf elements with text
    const leaves = [...el.querySelectorAll('*')].filter((c) => c.children.length === 0 && c.textContent.trim());
    texts.push({
      id: el.dataset.nodeId,
      leaves: leaves.slice(0, 12).map((c) => {
        const cs = getComputedStyle(c);
        return {
          tag: c.tagName,
          text: c.textContent.trim().slice(0, 80),
          fs: cs.fontSize,
          fw: cs.fontWeight,
          ff: cs.fontFamily,
          color: cs.color,
          lh: cs.lineHeight,
          ls: cs.letterSpacing,
          ta: cs.textAlign,
          tt: cs.textTransform,
        };
      }),
    });
  }
  return {
    canvas: { w: canvasRect.width, h: canvasRect.height, bg: getComputedStyle(root).backgroundColor, bgimg: getComputedStyle(root).backgroundImage },
    count: nodes.length,
    nodes: nodes.map(read),
    texts,
  };
});

fs.writeFileSync('/tmp/t5_measure.json', JSON.stringify(info, null, 1));
console.log('canvas', JSON.stringify(info.canvas), 'nodes', info.count);
await browser.close();

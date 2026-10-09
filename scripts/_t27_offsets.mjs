import fs from 'node:fs';
import { chromium } from 'playwright';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1 });
await p.goto('https://cinelove.me/template/thiep-cuoi-27', { waitUntil: 'domcontentloaded', timeout: 180000 });
await p.waitForTimeout(9000);
await p.evaluate(async () => {
  const step = 600;
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); }
  window.scrollTo(0, 0);
});
await p.waitForTimeout(1200);

// tắt reveal (transform/opacity) trước khi đo để không lấy nhầm vị trí đang animate
await p.evaluate(() => {
  document.querySelectorAll('*').forEach((el) => {
    const st = el.getAttribute('style') || '';
    if (st.includes('translate') || st.includes('opacity: 0')) {
      el.style.transform = 'none';
      el.style.opacity = '1';
    }
  });
});
await p.waitForTimeout(600);

const res = await p.evaluate(() => {
  const canvas = document.querySelector('#root-page-container');
  const all = [...canvas.querySelectorAll('div[data-node-id]')];
  const nodes = all.filter((el) => el.parentElement.closest('div[data-node-id]') === null);
  const base = canvas.getBoundingClientRect();
  return {
    canvas: { w: canvas.offsetWidth, h: canvas.offsetHeight, cls: canvas.getAttribute('class') },
    scroller: (() => { const s = canvas.parentElement; return { w: s.offsetWidth, h: s.offsetHeight, cls: s.getAttribute('class'), scrollH: s.scrollHeight }; })(),
    nodes: nodes.map((el) => {
      const r = el.getBoundingClientRect();
      const mapIframe = el.querySelector('div[class*="simple-map"] iframe') || (el.getAttribute('data-node-id') && el.querySelector('iframe'));
      return {
        id: el.dataset.nodeId,
        top: Math.round(r.top - base.top),
        left: Math.round(r.left - base.left),
        w: Math.round(r.width),
        h: Math.round(r.height),
        z: getComputedStyle(el).zIndex,
        map: el.querySelector('iframe') ? el.querySelector('iframe').getAttribute('src') : null,
        inner: el.getAttribute('style') ? el.getAttribute('style').slice(0, 120) : null,
      };
    }),
  };
});
fs.writeFileSync('/tmp/t27_offsets.json', JSON.stringify(res, null, 1));
console.log('canvas', JSON.stringify(res.canvas), 'scroller', JSON.stringify(res.scroller));
const missing = res.nodes.filter((n) => n.w === 0 && n.h === 0);
console.log('zero-size nodes', missing.map((n) => n.id));
console.log('map node', JSON.stringify(res.nodes.find((n) => n.map), null, 1));
await b.close();

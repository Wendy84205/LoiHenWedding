import fs from 'node:fs';
import { chromium } from 'playwright';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await p.goto('https://cinelove.me/template/thiep-cuoi-27', { waitUntil: 'domcontentloaded', timeout: 180000 });
await p.waitForTimeout(9000);
await p.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); }
  window.scrollTo(0, 0);
});
await p.waitForTimeout(1500);
await p.evaluate(() => {
  document.querySelectorAll('*').forEach((el) => {
    const st = el.getAttribute('style') || '';
    if (st.includes('translate') || st.includes('opacity: 0')) { el.style.transform = 'none'; el.style.opacity = '1'; }
  });
});
await p.waitForTimeout(600);

const out = await p.evaluate(() => {
  const canvas = document.querySelector('#root-page-container');
  const base = canvas.getBoundingClientRect();
  const res = [];
  const mapWrap = document.querySelector('#root-page-container div[class*="simple-map-container"]');
  let cur = mapWrap;
  while (cur && cur !== canvas) {
    const r = cur.getBoundingClientRect();
    const cs = getComputedStyle(cur);
    res.push({
      cls: String(cur.getAttribute('class') || '').slice(0, 50),
      nodeId: cur.dataset.nodeId || null,
      pos: cs.position,
      rect: [Math.round(r.left - base.left), Math.round(r.top - base.top), Math.round(r.width), Math.round(r.height)],
      inline: (cur.getAttribute('style') || '').slice(0, 140),
    });
    cur = cur.parentElement;
  }
  return res;
});
console.log(JSON.stringify(out, null, 1));
fs.writeFileSync('/tmp/t27_mapchain.json', JSON.stringify(out, null, 1));
await b.close();

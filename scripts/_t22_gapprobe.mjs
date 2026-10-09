import { chromium } from 'playwright';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, reducedMotion: 'reduce' });
p.on('pageerror', (e) => console.log('PAGEERROR', String(e).slice(0, 300)));
await p.goto('http://127.0.0.1:5173/template/thiep-cuoi-22', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(2500);

const info = await p.evaluate(() => {
  const ranges = [[1600, 1950], [2990, 3250], [4180, 4520], [4780, 5010], [7290, 7540], [2330, 2540]];
  const out = { hits: [], canvas: null, total: 0 };
  const canvas = document.querySelector('.t22n-canvas');
  const cb = canvas.getBoundingClientRect();
  out.canvas = { x: Math.round(cb.x), y: Math.round(cb.y + scrollY), w: Math.round(cb.width), h: Math.round(cb.height), children: canvas.children.length };
  const all = document.querySelectorAll('*');
  out.total = all.length;
  for (const el of all) {
    const r = el.getBoundingClientRect();
    const y0 = r.y + scrollY, y1 = y0 + r.height;
    for (const [a, bnd] of ranges) {
      if (r.width > 40 && r.height > 30 && y0 < bnd && y1 > a) {
        const cs = getComputedStyle(el);
        out.hits.push({
          rng: `${a}-${bnd}`, tag: el.tagName, cls: String(el.className).slice(0, 50),
          y: Math.round(y0), x: Math.round(r.x), w: Math.round(r.width), h: Math.round(r.height),
          pos: cs.position, op: cs.opacity, bg: (cs.backgroundImage || '').slice(0, 90),
        });
        break;
      }
    }
  }
  return out;
});
console.log(JSON.stringify(info, null, 1));
await b.close();
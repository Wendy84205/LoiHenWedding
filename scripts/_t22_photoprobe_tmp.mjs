import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 } });
await p.goto('http://localhost:5173/template/thiep-cuoi-22', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(3000);
const info = await p.evaluate(() => {
  const photos = [...document.querySelectorAll('.t22n-photo')];
  return photos.map((el, i) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const wrap = el.closest('.t22n-node');
    const wcs = wrap ? getComputedStyle(wrap) : null;
    const wr = wrap ? wrap.getBoundingClientRect() : null;
    return { i, bg: cs.backgroundImage.slice(0, 80), w: Math.round(r.width), h: Math.round(r.height), op: cs.opacity, wrapOp: wcs ? wcs.opacity : '?', wrapY: wr ? Math.round(wr.y + window.scrollY) : '?', wrapVis: wcs ? wcs.visibility : '?' };
  });
});
console.log(JSON.stringify(info, null, 1));
await b.close();

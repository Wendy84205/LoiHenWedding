import { chromium } from 'playwright';

const URL = process.argv[2];
const SEL = process.argv[3] || '#root-page-container';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await p.goto(URL, { waitUntil: 'load', timeout: 90000 });
await p.waitForTimeout(4000);

const chain = await p.evaluate((sel) => {
  let el = document.querySelector(sel);
  const out = [];
  while (el && out.length < 8) {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    out.push({
      tag: el.tagName, id: el.id, cls: String(el.className).slice(0, 60),
      rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
      pos: cs.position, overflow: cs.overflow, transform: cs.transform.slice(0, 60),
      opacity: cs.opacity, display: cs.display,
    });
    el = el.parentElement;
  }
  return out;
}, SEL);
console.log(JSON.stringify(chain, null, 1));
await p.screenshot({ path: '/tmp/dbg_ref_vp.png' });
console.log('saved /tmp/dbg_ref_vp.png');
await b.close();

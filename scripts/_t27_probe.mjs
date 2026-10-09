import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:5173/template/thiep-cuoi-27';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await p.goto(url, { waitUntil: 'load', timeout: 120000 });
await p.waitForTimeout(4000);

const info = await p.evaluate(() => {
  const pick = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return {
      style: el.getAttribute('style'),
      rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
      h: cs.height, w: cs.width, display: cs.display, transform: cs.transform, position: cs.position,
      bgImage: cs.backgroundImage.slice(0, 90),
    };
  };
  return {
    scrollY: window.scrollY,
    docH: document.documentElement.scrollHeight,
    bodyH: document.body.scrollHeight,
    rsvpNode: pick('.t27n-node.t27n-rsvp'),
    rsvpForm: pick('.t27n-rsvp'),
    firstPhotoNode: pick('.t27n-node.t27n-photo'),
    firstPhotoInner: pick('.t27n-node.t27n-photo .t27n-photo'),
    textNode: pick('.t27n-node.t27n-text'),
  };
});
console.log(JSON.stringify(info, null, 1));
await b.close();

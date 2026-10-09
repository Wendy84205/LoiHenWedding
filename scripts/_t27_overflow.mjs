import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:5173/template/thiep-cuoi-27';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await p.goto(url, { waitUntil: 'load', timeout: 120000 });
await p.waitForTimeout(4000);

const info = await p.evaluate(() => {
  const wide = [];
  document.querySelectorAll('body *').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.right > 500.5 || r.left < -0.5) {
      wide.push({ tag: el.tagName, cls: String(el.className).slice(0, 50), l: Math.round(r.left), r: Math.round(r.right), w: Math.round(r.width) });
    }
  });
  return {
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    wide: wide.slice(0, 15),
    docH: document.documentElement.scrollHeight,
  };
});
console.log(JSON.stringify(info, null, 1));
await b.close();

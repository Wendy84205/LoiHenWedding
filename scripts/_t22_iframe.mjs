import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, reducedMotion: 'reduce' });
p.on('pageerror', (e) => console.log('PAGEERROR', String(e).slice(0, 300)));
await p.goto('http://localhost:5173/template/thiep-cuoi-22', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(4000);
const o = await p.evaluate(() => {
  const out = {};
  const f = document.querySelector('.t22n-mapframe');
  out.map = !!f;
  if (f) {
    const r = f.getBoundingClientRect();
    out.mapRect = { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) };
    out.mapSrc = (f.src || '').slice(0, 90);
    out.mapDisplay = getComputedStyle(f).display;
  }
  const btn = document.querySelector('button.t22n-music');
  if (btn) { const r = btn.getBoundingClientRect(); out.music = { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), pos: getComputedStyle(btn).position, bg: getComputedStyle(btn).backgroundColor }; }
  const docodau = document.body.innerText.includes('Do cô dâu');
  out.docodau = docodau;
  const n2022 = document.body.innerText.includes('2022 – 2025');
  out.text2022 = n2022;
  return out;
});
console.log(JSON.stringify(o, null, 1));
await b.close();

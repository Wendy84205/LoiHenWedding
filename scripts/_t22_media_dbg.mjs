// Chẩn đoán media (img/video) trên cinelove ref t22: rect + load state.
import { chromium } from 'playwright';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await p.goto('https://cinelove.me/template/thiep-cuoi-22', { waitUntil: 'load', timeout: 90000 });
await p.waitForTimeout(7000);
// scroll chậm để trigger lazy load
const info = await p.evaluate(async () => {
  const c = document.querySelector('#root-page-container');
  let sc = null;
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 200) {
      if (c && c.contains(el)) return;
      if (!sc || el.scrollHeight > sc.scrollHeight) sc = el;
    }
  });
  const target = sc || document.scrollingElement;
  const h = sc ? sc.scrollHeight : document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 400) { target.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
  target.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 1500));
  const box = (el) => { const r = el.getBoundingClientRect(); return { y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) }; };
  const media = [];
  document.querySelectorAll('img').forEach((el) => media.push({ tag: 'img', alt: (el.alt || '').slice(0, 40), src: (el.currentSrc || el.src || '').slice(-70), loading: el.getAttribute('loading'), complete: el.complete, nw: el.naturalWidth, ...box(el) }));
  document.querySelectorAll('video').forEach((el) => media.push({ tag: 'video', src: (el.currentSrc || el.src || '').slice(-70), poster: (el.poster || '').slice(-50), rs: el.readyState, ...box(el) }));
  document.querySelectorAll('*').forEach((el) => {
    const bg = getComputedStyle(el).backgroundImage;
    if (bg && bg !== 'none') media.push({ tag: 'bg', cls: (el.className || '').toString().slice(0, 50), bg: bg.slice(0, 110), ...box(el) });
  });
  media.sort((a, b2) => a.y - b2.y);
  return media;
});
console.log(JSON.stringify(info, null, 1));
await b.close();

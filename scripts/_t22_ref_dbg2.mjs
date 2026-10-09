// Tìm lý do một số photo-bg-wrap bị trống trong ref capture (opacity/transform/clip/ancestor).
import { chromium } from 'playwright';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await p.goto('https://cinelove.me/template/thiep-cuoi-22', { waitUntil: 'load', timeout: 90000 });
await p.waitForTimeout(7000);
const report = await p.evaluate(async () => {
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
  for (let y = 0; y < h; y += 400) { target.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); }
  target.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 1000));
  const out = [];
  document.querySelectorAll('.photo-bg-wrap').forEach((el) => {
    const r = el.getBoundingClientRect();
    const y = Math.round(r.y + window.scrollY);
    if (Math.abs(y - 1360) > 60 && Math.abs(y - 4792) > 60 && Math.abs(y - 3559) > 60) return; // so sánh: trống(1360,4792) vs hiển thị(3559)
    const chain = [];
    let a = el;
    for (let i = 0; i < 6 && a; i++, a = a.parentElement) {
      const cs = getComputedStyle(a);
      chain.push({
        cls: (a.className || '').toString().slice(0, 40),
        op: cs.opacity, tr: cs.transform.slice(0, 60), clip: cs.clipPath.slice(0, 60),
        vis: cs.visibility, disp: cs.display, overflow: cs.overflow + '/' + cs.overflowX + ',' + cs.overflowY,
        cv: cs.contentVisibility, mask: (cs.maskImage || 'none').slice(0, 40),
        w: Math.round(a.getBoundingClientRect().width), hgt: Math.round(a.getBoundingClientRect().height),
      });
    }
    out.push({ y, w: Math.round(r.width), h: Math.round(r.height), bg: getComputedStyle(el).backgroundImage.slice(0, 90), chain });
  });
  return out;
});
console.log(JSON.stringify(report, null, 1));
await b.close();

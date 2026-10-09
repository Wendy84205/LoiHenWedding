// Kiểm tra URL background của các photo-bg-wrap hay bị trống (cần scroll để mount).
import { chromium } from 'playwright';
import fs from 'node:fs';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, reducedMotion: 'reduce' });
await p.goto('https://cinelove.me/template/thiep-cuoi-22', { waitUntil: 'load', timeout: 90000 });
await p.waitForTimeout(6000);
const r = await p.evaluate(async () => {
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
  for (let y = 0; y < h; y += 400) { target.scrollTo(0, y); await new Promise((r2) => setTimeout(r2, 80)); }
  target.scrollTo(0, 0);
  await new Promise((r2) => setTimeout(r2, 1500));
  const els = [...document.querySelectorAll('.photo-bg-wrap')];
  const want = [1360, 2999, 4206, 4792, 7303, 3559, 8480];
  const res = [];
  for (const y0 of want) {
    const el = els.find((e) => Math.abs(Math.round(e.getBoundingClientRect().y + scrollY) - y0) < 60);
    if (!el) { res.push({ y0, missing: true }); continue; }
    const cs = getComputedStyle(el);
    const url = cs.backgroundImage.slice(5, -2);
    let st = 'n/a';
    try {
      const resp = await fetch(url, { method: 'GET' });
      const buf = await resp.arrayBuffer();
      st = `${resp.status} ${(resp.headers.get('content-type') || '')} bytes=${buf.byteLength}`;
    } catch (e) { st = `ERR ${e.message}`; }
    res.push({ y0, url, st });
  }
  return res;
});
fs.writeFileSync('/tmp/t22_bgchk.json', JSON.stringify(r, null, 1));
await b.close();
console.log('DONE');

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/Users/wendy/Documents/LoiHenWedding';
const OUT = path.join(ROOT, 'artifacts/fidelity-report/thiep-cuoi-47');
fs.mkdirSync(OUT, { recursive: true });

const forceVisible = () => {
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.position === 'fixed') el.style.setProperty('display', 'none', 'important');
    if (parseFloat(cs.opacity) < 1) el.style.opacity = '1';
    const st = el.getAttribute('style') || '';
    if (st.includes('translate') || st.includes('opacity: 0')) { el.style.transform = 'none'; el.style.opacity = '1'; }
  });
};

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await p.goto('http://127.0.0.1:5173/template/thiep-cuoi-47', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(2500);
await p.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 800));
});
await p.evaluate(forceVisible);
await p.waitForTimeout(300);
const box = await p.evaluate(() => {
  const el = document.querySelector('main.template47') || document.body;
  const r = el.getBoundingClientRect();
  const sc = document.scrollingElement;
  return { x: r.x + (window.scrollX || sc.scrollLeft), y: r.y + (window.scrollY || sc.scrollTop), w: r.width, h: r.height };
});
const vh = Math.min(Math.ceil(box.h) + 2, 16000);
await p.setViewportSize({ width: 500, height: vh });
await p.waitForTimeout(1000);
await p.evaluate(forceVisible);
await p.screenshot({ path: path.join(OUT, 'local.png'), clip: { x: box.x, y: box.y, width: box.w, height: box.h }, animations: 'disabled', timeout: 120000 });
console.log('captured', JSON.stringify(box));
await b.close();

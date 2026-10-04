import { chromium } from 'playwright';
import fs from 'node:fs';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, reducedMotion: 'reduce' });
await p.goto('http://127.0.0.1:5173/template/thiep-cuoi-5', { waitUntil: 'networkidle' });
await p.waitForTimeout(3000);

const cal = await p.evaluate(() => {
  const canvas = document.querySelector('.t5n-canvas');
  const cr = canvas.getBoundingClientRect();
  const rel = (el) => {
    const r = el.getBoundingClientRect();
    return [+(r.left - cr.left).toFixed(2), +(r.top - cr.top).toFixed(2), +r.width.toFixed(2), +r.height.toFixed(2)];
  };
  const style = (el, keys) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const o = { box: rel(el) };
    for (const k of keys) o[k] = cs[k];
    return o;
  };
  const K = ['backgroundColor', 'color', 'fontSize', 'fontFamily', 'lineHeight', 'border', 'borderRadius', 'padding'];
  const box = canvas.querySelector('.t5n-cal');
  const q = (s) => box.querySelector(s);
  return {
    cal: style(box, K),
    back: style(q('.t5n-cal-back'), K),
    head: style(q('.t5n-cal-head'), K),
    body: style(q('.t5n-cal-body'), K),
    weeks: [...box.querySelectorAll('.t5n-cal-week')].map(rel),
    firstDays: [...box.querySelectorAll('.t5n-cal-body > div:not(.t5n-cal-week):not(.t5n-cal-year)')].slice(0, 8).map(rel),
    wedding: style(q('.t5n-cal-wedding'), K),
    heart: style(q('.t5n-cal-heart'), ['width', 'height', 'top', 'left', 'zIndex']),
    year: style(q('.t5n-cal-year'), K),
  };
});
fs.writeFileSync('/tmp/t5_cal_local.json', JSON.stringify(cal, null, 1));
console.log(JSON.stringify(cal, null, 1));
await b.close();

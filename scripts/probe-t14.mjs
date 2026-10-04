import { chromium } from 'playwright';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1 });
const f404 = [];
p.on('response', (r) => { if (r.status() >= 400) f404.push(r.status() + ' ' + r.url()); });
await p.goto('http://127.0.0.1:5173/template/thiep-cuoi-14', { waitUntil: 'load' });
await p.waitForTimeout(6000);

const res = await p.evaluate(() => {
  const docW = document.documentElement.scrollWidth;
  const wide = [];
  document.querySelectorAll('*').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.right > docW + 1 || r.left < -1) {
      wide.push([el.tagName + '.' + String(el.className).slice(0, 40), Math.round(r.left), Math.round(r.right), Math.round(r.width)]);
    }
  });
  const imgs = [...document.querySelectorAll('.t14n-photo')].map((d) => {
    const r = d.getBoundingClientRect();
    return { bg: getComputedStyle(d).backgroundImage.slice(-40), w: Math.round(r.width), h: Math.round(r.height) };
  });
  const cal = document.querySelector('.t14n-cal');
  const calr = cal && cal.getBoundingClientRect();
  const heart = document.querySelector('.heart-date');
  const hr = heart && heart.getBoundingClientRect();
  return {
    docW,
    docH: document.documentElement.scrollHeight,
    wide: wide.slice(0, 20),
    nodes: document.querySelectorAll('.t14n-node').length,
    imgs,
    cal: calr && { l: calr.left, t: calr.top, w: calr.width, h: calr.height },
    heart: hr && { l: hr.left, t: hr.top, w: hr.width, h: hr.height },
    fonts: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family).slice(0, 20),
  };
});
console.log(JSON.stringify(res, null, 1));
console.log('HTTP>=400:', JSON.stringify(f404.slice(0, 10), null, 1));
await b.close();
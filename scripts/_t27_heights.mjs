import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:5173/template/thiep-cuoi-27';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await p.goto(url, { waitUntil: 'load', timeout: 120000 });
await p.waitForTimeout(4000);

const info = await p.evaluate(() => {
  const h = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return [Math.round(r.top), Math.round(r.height)];
  };
  return {
    html: h('html'),
    body: h('body'),
    root: h('#root'),
    main: h('.t27n'),
    canvas: h('.t27n-canvas'),
    docH: document.documentElement.scrollHeight,
    kids: [...document.body.firstElementChild.children].map((el) => ({ tag: el.tagName, cls: String(el.className).slice(0, 40), h: Math.round(el.getBoundingClientRect().height) })),
  };
});
console.log(JSON.stringify(info, null, 1));
await b.close();

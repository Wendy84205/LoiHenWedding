import { chromium } from 'playwright';
import fs from 'node:fs';
import { PNG } from 'pngjs';

const browser = await chromium.launch();

const probe = async ({ label, url, vw, wait, canvasSel }) => {
  const page = await browser.newPage({ viewport: { width: vw, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 180000 });
  await page.waitForTimeout(wait);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);

  const dom = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return { error: 'not found ' + sel };
    const chain = [];
    let p = el;
    while (p && chain.length < 12) {
      const c = getComputedStyle(p);
      const r = p.getBoundingClientRect();
      chain.push({
        tag: p.tagName,
        cls: (p.className || '').toString().slice(0, 90),
        rect: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)],
        transform: c.transform,
        width: c.width,
        maxWidth: c.maxWidth,
        bg: c.backgroundColor,
        boxShadow: c.boxShadow,
        border: c.border,
        filter: c.filter,
      });
      p = p.parentElement;
    }
    const c = getComputedStyle(el);
    return {
      chain,
      canvas: {
        rect: (() => { const r = el.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)]; })(),
        bg: c.backgroundColor,
        boxShadow: c.boxShadow,
        border: c.border,
        transform: c.transform,
      },
      bodyBg: getComputedStyle(document.body).backgroundColor,
      htmlBg: getComputedStyle(document.documentElement).backgroundColor,
      scrollY: window.scrollY,
      docH: document.documentElement.scrollHeight,
    };
  }, canvasSel);

  const shot = `/tmp/b2-${label}-${vw}.png`;
  await page.screenshot({ path: shot, fullPage: false });
  const png = PNG.sync.read(fs.readFileSync(shot));
  const px = (x, y) => {
    const i = (png.width * y + x) << 2;
    return [png.data[i], png.data[i + 1], png.data[i + 2]];
  };
  const row = (y, x0, x1) => {
    const out = [];
    let prev = null;
    for (let x = x0; x <= x1; x += 1) {
      const c = px(x, y).join(',');
      if (c !== prev) { out.push([x, c]); prev = c; }
    }
    return out;
  };
  const cl = dom.canvas ? dom.canvas.rect[0] : 0;
  const cw = dom.canvas ? dom.canvas.rect[2] : 0;
  const cr = cl + cw;
  const res = {
    label, url, vw, dom,
    leftEdge: [200, 240, 300, 400, 500].map((y) => ({ y, prof: row(y, Math.max(0, cl - 14), cl + 5) })),
    rightEdge: [200, 240, 300, 400, 500].map((y) => ({ y, prof: row(y, cr - 5, cr + 14) })),
    fullRow: { y: 240, prof: row(240, 300, Math.min(vw - 1, cr + 300)) },
  };
  await page.close();
  return res;
};

const targets = [
  { label: 't10orig', url: 'https://cinelove.me/template/thiep-cuoi-10', vw: 1400, wait: 15000, canvasSel: '#root-page-container' },
  { label: 't10orig', url: 'https://cinelove.me/template/thiep-cuoi-10', vw: 500, wait: 15000, canvasSel: '#root-page-container' },
  { label: 't10local', url: 'http://127.0.0.1:5173/template/thiep-cuoi-10', vw: 1400, wait: 6000, canvasSel: '.t10n-canvas' },
  { label: 't16orig', url: 'https://cinelove.me/template/thiep-cuoi-16', vw: 1400, wait: 15000, canvasSel: '#root-page-container' },
  { label: 't16orig', url: 'https://cinelove.me/template/thiep-cuoi-16', vw: 500, wait: 15000, canvasSel: '#root-page-container' },
  { label: 't16local', url: 'http://127.0.0.1:5173/template/thiep-cuoi-16', vw: 1400, wait: 6000, canvasSel: '.t16n-canvas' },
];

const results = [];
for (const t of targets) {
  try {
    const r = await probe(t);
    results.push(r);
    console.log('ok', t.label, t.vw, r.dom.canvas ? r.dom.canvas.rect.join('/') : r.dom.error);
  } catch (e) {
    console.log('fail', t.label, t.vw, e.message);
  }
}
fs.writeFileSync('/tmp/border-report2.json', JSON.stringify(results, null, 1));
await browser.close();
import { chromium } from 'playwright';
import fs from 'node:fs';
import { PNG } from 'pngjs';

const W = 1400;
const H = 900;
const browser = await chromium.launch();

const probe = async ({ label, url, wait }) => {
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 180000 });
  await page.waitForTimeout(wait);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);

  const dom = await page.evaluate(() => {
    const out = {};
    const cs = (el) => (el ? getComputedStyle(el) : null);
    const describe = (el, name) => {
      if (!el) return;
      const c = cs(el);
      const r = el.getBoundingClientRect();
      out[name] = {
        tag: el.tagName,
        cls: (el.className || '').toString().slice(0, 120),
        rect: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)],
        bg: c.backgroundColor,
        bgImage: c.backgroundImage.slice(0, 200),
        boxShadow: c.boxShadow,
        border: c.border,
        borderLeft: c.borderLeft,
        borderRight: c.borderRight,
        margin: c.margin,
        maxWidth: c.maxWidth,
        width: c.width,
      };
    };
    describe(document.documentElement, 'html');
    describe(document.body, 'body');
    // main canvas candidates
    describe(document.querySelector('#root-page-container'), 'rootContainer');
    describe(document.querySelector('.t10n-canvas, .t16n-canvas, [class*="-canvas"]'), 'canvasClass');
    // cinelove original wrapper detection
    const divs = [...document.querySelectorAll('body > div, body > div > div, #__next > div, #root > div')].slice(0, 8);
    divs.forEach((d, i) => describe(d, 'top' + i));
    // find element whose width is ~500 centered
    const all = [...document.querySelectorAll('body *')];
    const cand = all.find((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 495 && r.width < 505 && r.left > 100 && r.top < 200;
    });
    describe(cand, 'width500');
    if (cand) {
      let p = cand.parentElement;
      let i = 0;
      while (p && i < 5) {
        describe(p, 'ancestor' + i);
        p = p.parentElement;
        i += 1;
      }
    }
    out.docBg = cs(document.documentElement).backgroundColor + ' | ' + cs(document.body).backgroundColor;
    return out;
  });

  const shot = `/tmp/border-${label}.png`;
  await page.screenshot({ path: shot });
  const png = PNG.sync.read(fs.readFileSync(shot));
  const px = (x, y) => {
    const i = (png.width * y + x) << 2;
    return [png.data[i], png.data[i + 1], png.data[i + 2]];
  };
  // find left edge of the centred 500px canvas: scan y=300 row for first non-uniform pixel
  const row = 300;
  const scan = [];
  for (let x = 640; x <= 780; x += 1) scan.push([x, px(x, row).join(',')]);

  await page.close();
  return { label, url, dom, scan };
};

const targets = [
  { label: 't10-orig', url: 'https://cinelove.me/template/thiep-cuoi-10', wait: 15000 },
  { label: 't10-local', url: 'http://127.0.0.1:5173/template/thiep-cuoi-10', wait: 6000 },
  { label: 't16-orig', url: 'https://cinelove.me/template/thiep-cuoi-16', wait: 15000 },
  { label: 't16-local', url: 'http://127.0.0.1:5173/template/thiep-cuoi-16', wait: 6000 },
];

const results = {};
for (const t of targets) {
  try {
    results[t.label] = await probe(t);
    console.log('ok', t.label);
  } catch (e) {
    console.log('fail', t.label, e.message);
  }
}
fs.writeFileSync('/tmp/border-report.json', JSON.stringify(results, null, 1));
await browser.close();
import { chromium } from 'playwright';
import fs from 'node:fs';
import { PNG } from 'pngjs';

const browser = await chromium.launch();
const ORIG = JSON.parse(fs.readFileSync('/tmp/border-report2.json', 'utf8'));

// profile pixel của bản gốc, lấy từ ORIG (t10orig/t16orig ở vw=1400)
const origProf = (key) => {
  const r = ORIG.find((x) => x.label === key && x.vw === 1400);
  return r.leftEdge.find((e) => e.y === 300).prof;
};

const cases = [
  ['t5local', 'http://127.0.0.1:5173/template/thiep-cuoi-5', '.t5n-canvas'],
  ['t10local', 'http://127.0.0.1:5173/template/thiep-cuoi-10', '.t10n-canvas'],
  ['t16local', 'http://127.0.0.1:5173/template/thiep-cuoi-16', '.t16n-canvas'],
];

for (const vw of [1400, 500]) {
  for (const [label, url, sel] of cases) {
    const page = await browser.newPage({ viewport: { width: vw, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(5000);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);

    const dom = await page.evaluate((s) => {
      const el = document.querySelector(s);
      const r = el.getBoundingClientRect();
      const root = document.getElementById('root');
      const rr = root.getBoundingClientRect();
      const main = el.parentElement;
      const mr = main.getBoundingClientRect();
      return {
        root: [Math.round(rr.left), Math.round(rr.width)],
        main: [Math.round(mr.left), Math.round(mr.width)],
        canvas: [Math.round(r.left), Math.round(r.width), Math.round(r.height)],
        bodyBg: getComputedStyle(document.body).backgroundColor,
        rootBorderL: getComputedStyle(root).borderLeftWidth + ' ' + getComputedStyle(root).borderLeftColor,
        rootShadow: getComputedStyle(root).boxShadow,
      };
    }, sel);

    const shot = `/tmp/vf-${label}-${vw}.png`;
    await page.screenshot({ path: shot });
    const png = PNG.sync.read(fs.readFileSync(shot));
    const px = (x, y) => { const i = (png.width * y + x) << 2; return `${png.data[i]},${png.data[i + 1]},${png.data[i + 2]}`; };
    const cl = dom.canvas[0];
    const prof = [];
    let prev = null;
    for (let x = cl - 14; x <= cl + 1; x += 1) { const c = px(x, 300); if (c !== prev) { prof.push([x, c]); prev = c; } }

    console.log('='.repeat(74));
    console.log(`${label} vw=${vw}  canvas left=${cl} w=${dom.canvas[1]} h=${dom.canvas[2]}  root=[${dom.root}] main=[${dom.main}]`);
    console.log(`  bodyBg=${dom.bodyBg}  rootBorderL=${dom.rootBorderL}`);
    console.log(`  rootShadow=${dom.rootShadow}`);
    console.log(`  LEFT profile: ${prof.map(([x, c]) => `${x}:${c}`).join('  ')}`);
    if (vw === 1400 && label !== 't5local') {
      const o = origProf(label.replace('local', 'orig'));
      console.log('  ORIGINAL    : ' + o.map(([x, c]) => `${x}:${c}`).join('  '));
      const orr = ORIG.find((x) => x.label === label.replace('local', 'orig') && x.vw === 1400);
      const rp = orr.rightEdge.find((e) => e.y === 300).prof.slice(-6);
      console.log('  ORIG right  : ' + rp.map(([x, c]) => `${x}:${c}`).join('  '));
      const cw = dom.canvas[1];
      const mine = [];
      let p2 = null;
      for (let x = cl + cw - 6; x <= cl + cw + 12; x += 1) { const c = px(x, 300); if (c !== p2) { mine.push([x, c]); p2 = c; } }
      console.log('  local right : ' + mine.map(([x, c]) => `${x}:${c}`).join('  '));
    }
    await page.close();
  }
}
await browser.close();
import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = '/tmp/lhw-local/t10';
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
await page.goto('http://127.0.0.1:5173/template/thiep-cuoi-10', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);
await page.evaluate(() => {
  document.querySelectorAll('.t10n-node').forEach((n) => {
    n.style.transition = 'none';
    n.style.opacity = '1';
  });
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1500);
const rows = await page.evaluate(() => {
  const canvas = document.querySelector('.t10n-canvas').getBoundingClientRect();
  return [...document.querySelectorAll('.t10n-node')].map((n) => {
    const r = n.getBoundingClientRect();
    const p = n.style;
    return {
      top: parseFloat(p.top),
      left: parseFloat(p.left),
      real: [Math.round(r.top - canvas.top), Math.round(r.width), Math.round(r.height)],
    };
  });
});
fs.writeFileSync('/tmp/local-nodes.json', JSON.stringify(rows, null, 1));
const textInfo = await page.evaluate(() => {
  const canvas = document.querySelector('.t10n-canvas').getBoundingClientRect();
  return [...document.querySelectorAll('.t10n-text')].map((n) => {
    const inner = n.querySelector('.t10n-textwrap');
    const r = inner.getBoundingClientRect();
    return { nodeTop: Math.round(n.getBoundingClientRect().top - canvas.top), innerTop: Math.round(r.top - canvas.top), h: Math.round(r.height), ps: inner.children.length };
  });
});
fs.writeFileSync('/tmp/local-text.json', JSON.stringify(textInfo, null, 1));
const height = await page.evaluate(() => document.querySelector('.t10n-canvas').getBoundingClientRect().height);
console.log('canvas height', height);
const canvas = await page.$('.t10n-canvas');
await canvas.screenshot({ path: `${OUT}/full.png` });
const calInfo = await page.evaluate(() => {
  const canvas = document.querySelector('.t10n-canvas').getBoundingClientRect();
  const box = document.querySelector('.t10n-cal');
  const pick = (sel) => [...document.querySelectorAll(`.t10n-cal ${sel}`)].slice(0, 8).map((e) => {
    const r = e.getBoundingClientRect();
    return [Math.round(r.top - canvas.top), Math.round(r.left - canvas.left), Math.round(r.width), Math.round(r.height)];
  });
  const r = box.getBoundingClientRect();
  return {
    box: [Math.round(r.top - canvas.top), Math.round(r.left - canvas.left), Math.round(r.width), Math.round(r.height)],
    head: pick('.t10n-cal-head div'),
    week: pick('.t10n-cal-week'),
    firstCells: pick('.t10n-cal-cell'),
  };
});
fs.writeFileSync('/tmp/local-cal.json', JSON.stringify(calInfo, null, 1));
await browser.close();

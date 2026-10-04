import { chromium } from 'playwright';
import fs from 'node:fs';

const OUT = '/tmp/t5-local';
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 2, reducedMotion: 'reduce' });
await page.goto('http://127.0.0.1:5173/template/thiep-cuoi-5', { waitUntil: 'networkidle' });
await page.waitForTimeout(3000);
await page.evaluate(() => {
  document.querySelectorAll('.t5n-node').forEach((n) => {
    n.style.transition = 'none';
    n.style.opacity = '1';
    n.style.transform = 'none';
  });
  window.scrollTo(0, 0);
});
await page.waitForTimeout(1200);

const canvas = await page.$('.t5n-canvas');
await canvas.scrollIntoViewIfNeeded();
await page.waitForTimeout(6000);
await canvas.screenshot({ path: `${OUT}/full.png`, timeout: 120000 });

const h = await page.evaluate(() => document.querySelector('.t5n-canvas').getBoundingClientRect().height);
console.log('canvas height', h);
await browser.close();

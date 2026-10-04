import { chromium } from 'playwright';
const url = process.argv[2];
const out = process.argv[3];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(2500);
await page.evaluate(() => {
  document.querySelectorAll('[style*=\"translate\"]').forEach((el) => { el.style.transform = 'none'; el.style.opacity = '1'; });
  window.scrollTo(0, 0);
});
const h = await page.evaluate(() => document.documentElement.scrollHeight);
console.log('PAGE_H=' + h);
await page.screenshot({ path: out, fullPage: true });
await browser.close();

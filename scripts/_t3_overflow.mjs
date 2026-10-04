import { chromium } from 'playwright';
const url = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
await page.waitForTimeout(2000);
const info = await page.evaluate(() => {
  const out = { scrollW: document.documentElement.scrollWidth, offenders: [] };
  document.querySelectorAll('*').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.right > 501 || r.left < -1) {
      out.offenders.push({
        tag: el.tagName,
        cls: (el.className && el.className.toString ? el.className.toString() : '').slice(0, 80),
        left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width),
      });
    }
  });
  out.offenders = out.offenders.slice(0, 30);
  return out;
});
console.log(JSON.stringify(info, null, 1));
await browser.close();

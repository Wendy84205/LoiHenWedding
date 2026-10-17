import { chromium } from 'playwright';
import fs from 'fs';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 900, height: 1000 }, deviceScaleFactor: 1 });

async function shootInner(page, name, scrollFn, total) {
  const dir = `/tmp/shots_${name}`;
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  let i = 0;
  for (let y = 0; y <= total; y += 900) {
    await scrollFn(y);
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${dir}/${String(i).padStart(2, '0')}.png`, clip: { x: 200, y: 0, width: 500, height: 1000 } });
    i += 1;
  }
  return i;
}

{
  const page = await ctx.newPage();
  await page.goto('https://cinelove.me/template/thiep-cuoi-46', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(5000);
  await page.evaluate(() => {
    document.querySelectorAll('#audio-control-wrapper, .fixed, [class*="comment"], [class*="gift-float"], [class*="chat"], [class*="float"], [class*="toolbar"]').forEach((el) => { el.style.setProperty('display', 'none', 'important'); });
  });
  const total = await page.evaluate(() => document.querySelector('.styles_customScroll__X5r6w')?.scrollHeight || 0);
  console.log('ref total', total);
  const n = await shootInner(page, 'ref', async (y) => {
    await page.evaluate((yy) => { const c = document.querySelector('.styles_customScroll__X5r6w'); if (c) c.scrollTop = yy; }, y);
  }, total);
  console.log('ref shots', n);
  await page.close();
}
{
  const page = await ctx.newPage();
  await page.goto('http://127.0.0.1:5173/template/thiep-cuoi-46', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(4000);
  const total = await page.evaluate(() => document.body.scrollHeight);
  console.log('local total', total);
  const n = await shootInner(page, 'local', async (y) => {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
  }, total);
  console.log('local shots', n);
  await page.close();
}
await browser.close();

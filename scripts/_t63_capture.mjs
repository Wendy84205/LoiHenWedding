import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';

const OUT = '/tmp/t63_shots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });

async function capture(url, prefix, width = 500) {
  const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 2 });
  page.on('pageerror', (e) => console.error(`${prefix} pageerror:`, e.message));
  try {
    console.log(`[${prefix}] loading ${url}`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
    await page.waitForTimeout(4000);
    // cover screenshot
    await page.screenshot({ path: `${OUT}/${prefix}-cover.png`, fullPage: false });
    // open the invitation
    const btn = page.locator('button:has-text("Mở thiệp")');
    if (await btn.count()) {
      await btn.first().click();
      await page.waitForTimeout(3500);
    } else {
      console.log(`[${prefix}] no open button found`);
    }
    await page.screenshot({ path: `${OUT}/${prefix}-full.png`, fullPage: true });
    const text = await page.evaluate(() => document.body?.innerText || '');
    writeFileSync(`${OUT}/${prefix}-text.txt`, text);
    const height = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log(`[${prefix}] done, scrollHeight=${height}, textLen=${text.length}`);
  } catch (err) {
    console.error(`[${prefix}] ERROR:`, err.message);
    try { await page.screenshot({ path: `${OUT}/${prefix}-error.png`, fullPage: true }); } catch {}
  } finally {
    await page.close();
  }
}

await capture('https://cinelove.me/template/thiep-cuoi-63', 'live');
await capture('http://localhost:5173/template/thiep-cuoi-63', 'local');

await browser.close();
console.log('All captures done');

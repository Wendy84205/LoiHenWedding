import { chromium } from 'playwright';

const url = 'https://cinelove.me/template/thiep-cuoi-63';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 1200 } });

try {
  console.log('Loading:', url);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  const text = await page.evaluate(() => document.body?.innerText || '');
  console.log(text);
} catch (err) {
  console.error('ERROR:', err.message);
} finally {
  await browser.close();
}

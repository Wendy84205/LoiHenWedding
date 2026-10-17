import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const url = 'http://localhost:4173/template/thiep-cuoi-63';
const out = '/tmp/t63_local_rendered';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 1200 } });

try {
  console.log('Navigating to', url);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(6000);

  const html = await page.content();
  writeFileSync(`${out}.html`, html);
  console.log('Wrote HTML size', html.length);

  const text = await page.evaluate(() => document.body?.innerText || '');
  writeFileSync(`${out}.txt`, text);
  console.log('Wrote text size', text.length);

  const checks = await page.evaluate(() => ({
    has2027: /2027/.test(document.body?.innerText || ''),
    has2026: /2026/.test(document.body?.innerText || ''),
    hasTC: /Techcombank/.test(document.body?.innerText || ''),
    hasVB: /Vietinbank/.test(document.body?.innerText || ''),
    hasGuestbook: /Họ và tên/.test(document.body?.innerText || ''),
    hasSchedule: /Khai tiệc/.test(document.body?.innerText || ''),
    hasCeremony: /Ngày Chung Đôi/.test(document.body?.innerText || ''),
    title: document.title,
  }));

  console.log('Checks:', JSON.stringify(checks, null, 2));
  writeFileSync(`${out}.checks.json`, JSON.stringify(checks, null, 2));

  await page.screenshot({ path: `${out}.png`, fullPage: true });
  console.log('Wrote screenshot');
} catch (err) {
  console.error('ERROR:', err.message);
  await page.screenshot({ path: `${out}.error.png`, fullPage: true });
  process.exit(1);
} finally {
  await browser.close();
}

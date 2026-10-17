import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1418 }, deviceScaleFactor: 1 });
page.on('pageerror', (e) => console.error('pageerror:', e.message));
await page.goto('http://127.0.0.1:5173/template/thiep-cuoi-63', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1800);
await page.screenshot({ path: '/tmp/t63_cover_local.png' });
await browser.close();
console.log('done');

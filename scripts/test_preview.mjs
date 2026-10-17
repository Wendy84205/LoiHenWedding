import { chromium } from 'playwright';

const url = 'http://localhost:4174/template/thiep-cuoi-63';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

page.on('console', msg => console.log('Browser console:', msg.type(), msg.text()));

try {
  console.log('Loading:', url);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(4000);
  const title = await page.title();
  console.log('Title:', title);
  const text = await page.evaluate(() => document.body?.innerText || '');
  console.log('--- Local template text ---');
  console.log(text.slice(0, 2000));
} catch (err) {
  console.error('ERROR:', err.message);
} finally {
  await browser.close();
}

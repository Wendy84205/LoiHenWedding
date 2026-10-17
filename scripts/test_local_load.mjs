import { chromium } from 'playwright';

const url = 'file:///Users/wendy/Documents/LoiHenWedding/dist/template/thiep-cuoi-63/index.local.html';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

page.on('console', msg => {
  console.log('Browser console:', msg.type(), msg.text());
});

page.on('pageerror', err => {
  console.error('Page error:', err.message);
});

try {
  await page.goto(url, { waitUntil: 'load', timeout: 60000 });
  const title = await page.title();
  console.log('Title:', title);
  const html = await page.content();
  console.log('HTML length:', html.length);
  console.log('First 1200 chars:');
  console.log(html.slice(0, 1200));
} catch (e) {
  console.error('Error:', e.message);
} finally {
  await browser.close();
}

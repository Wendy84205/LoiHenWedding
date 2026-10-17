import { chromium } from 'playwright';

const url = 'https://cinelove.me/template/thiep-cuoi-63';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  const data = await page.evaluate(() => {
    const elements = Array.from(document.querySelectorAll('body *'));
    const texts = elements.map(el => el.innerText.trim()).filter(t => t.length > 0 && t !== ' ');
    const idx = texts.findIndex(t => t.includes('Nhà Có Hỷ'));
    if (idx === -1) return { notFound: true };
    const context = texts.slice(idx - 2, idx + 3).join(' | ');
    return { context };
  });
  console.log('Context:', JSON.stringify(data.context));
} catch (err) {
  console.error('ERROR:', err.message);
} finally {
  await browser.close();
}

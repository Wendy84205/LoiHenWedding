import { chromium } from 'playwright';

const url = 'https://cinelove.me/template/thiep-cuoi-63';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  const data = await page.evaluate(() => {
    const allText = document.body.innerText;
    const idx = allText.search('Có Hỷ');
    const start = Math.max(0, idx - 30);
    const end = Math.min(allText.length, idx + 100);
    const section = allText.slice(start, end).replace(/\n\s*/g, ' ');
    return { section };
  });
  console.log('Section around ' + 'Có Hỷ' + ':', data.section);
} catch (err) {
  console.error('ERROR:', err.message);
} finally {
  await browser.close();
}

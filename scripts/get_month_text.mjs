import { chromium } from 'playwright';

const url = 'https://cinelove.me/template/thiep-cuoi-63';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  const data = await page.evaluate(() => {
    const allText = document.body.innerText;
    // Find occurrences of 'Tháng'
    const matches = allText.match(/Tháng\s*0?\d/gi);
    return { matches: matches ? matches.join('; ') : 'none', ctx: allText.slice(0, 500) };
  });
  console.log('Matches:', data.matches);
  console.log('First 500 chars:', data.ctx);
} catch (err) {
  console.error('ERROR:', err.message);
} finally {
  await browser.close();
}

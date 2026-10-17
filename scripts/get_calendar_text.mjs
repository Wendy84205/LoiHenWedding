import { chromium } from 'playwright';

const url = 'https://cinelove.me/template/thiep-cuoi-63';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  const data = await page.evaluate(() => {
    const calendar = document.querySelector('.t63n .ni-calendar') || document.querySelector('.ni-calendar');
    const calendarText = calendar ? calendar.innerText : 'N/A';
    const allText = document.body.innerText;
    // Find surrounding context
    const idx = allText.indexOf('Tháng 06') !== -1 ? allText.indexOf('Tháng 06') : allText.indexOf('June');
    const start = Math.max(0, idx - 50);
    const end = Math.min(allText.length, idx + 80);
    const context = allText.slice(start, end).replace(/\n\s*/g, ' ');
    return { calendarText, context };
  });
  console.log('Calendar text:', JSON.stringify(data.calendarText));
  console.log('Context:', data.context);
} catch (err) {
  console.error('ERROR:', err.message);
} finally {
  await browser.close();
}

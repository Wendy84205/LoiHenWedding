import { chromium } from 'playwright';

const url = 'https://cinelove.me/template/thiep-cuoi-63';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

try {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(3000);
  const data = await page.evaluate(() => {
    const allText = document.body.innerText;
    // Find the phrase 'Tháng 06' or 'June' near the calendar
    const idx = allText.search(/Tháng 06|June/);
    const start = Math.max(0, idx - 30);
    const end = Math.min(allText.length, idx + 120);
    const context = allText.slice(start, end).replace(/\n\s*/g, ' ');
    // Also find the calendar months
    const calendarSection = allText.slice(idx, idx + 200).replace(/\n\s*/g, ' ');
    return { context, calendarSection };
  });
  console.log('Context:', data.context);
  console.log('Calendar section:', data.calendarSection);
} catch (err) {
  console.error('ERROR:', err.message);
} finally {
  await browser.close();
}

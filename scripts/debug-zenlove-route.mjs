import { chromium } from 'playwright';

const baseUrl = process.env.ZENLOVE_BASE_URL || 'http://127.0.0.1:4187';
const slug = process.argv[2] || 'thiep-cuoi-3';
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
});
const page = await browser.newPage({ viewport: { width: 818, height: 1440 } });
const consoleErrors = [];
const pageErrors = [];
page.on('console', (message) => consoleErrors.push(`${message.type()}: ${message.text()}`));
page.on('pageerror', (error) => pageErrors.push(error.stack || error.message));

try {
  const response = await page.goto(`${baseUrl}/template/${slug}`, { waitUntil: 'commit', timeout: 10_000 });
  await page.waitForTimeout(3_000);
  console.log(JSON.stringify({
    status: response?.status(),
    url: page.url(),
    title: await page.title(),
    bodyText: (await page.locator('body').innerText()).slice(0, 2_000),
    sceneSurfaceCount: await page.locator('.sceneSurface').count(),
    mainCount: await page.locator('main').count(),
    consoleErrors,
    pageErrors,
  }, null, 2));
} finally {
  await browser.close();
}
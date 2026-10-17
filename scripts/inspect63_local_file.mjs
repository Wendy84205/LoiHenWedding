import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const staticHtml = readFileSync(
  join(process.cwd(), 'dist', 'template', 'thiep-cuoi-63', 'index.html'),
  'utf8'
);

const tmpFilePath = join(process.cwd(), 'dist', 'template', 'thiep-cuoi-63', 'index.local.html');
writeFileSync(tmpFilePath, staticHtml);

const url = `file://${tmpFilePath}`;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 1200 } });

try {
  console.log('Loading file URL:', url);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(6000);

  const title = await page.title();
  console.log('Page title:', title);

  const text = await page.evaluate(() => document.body?.innerText || '');
  console.log('--- Local template text ---');
  console.log(text);
} catch (err) {
  console.error('ERROR:', err.message);
  await page.screenshot({ path: '/tmp/t63_local_file_error.png', fullPage: true });
  console.log('--- Screenshot saved ---');
  const logs = await page.context().logs();
  console.log('Browser logs:', logs.join('\n'));
} finally {
  await browser.close();
}

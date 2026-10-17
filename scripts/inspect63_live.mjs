import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'fs';

const url = 'https://cinelove.me/template/thiep-cuoi-63';
const outDir = '/tmp/t63_live';
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1280, height: 1200 },
  deviceScaleFactor: 2,
});

try {
  console.log('Navigating to', url);
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  console.log('Page loaded, waiting 6s for animations...');
  await page.waitForTimeout(6000);

  const html = await page.content();
  writeFileSync(`${outDir}/rendered.html`, html);
  console.log('Wrote rendered.html size', html.length);

  const text = await page.evaluate(() => document.body?.innerText || '');
  writeFileSync(`${outDir}/rendered.txt`, text);
  console.log('Wrote rendered.txt size', text.length);

  const inlineScripts = await page.evaluate(() => {
    const scripts = Array.from(document.querySelectorAll('script:not([type])'));
    return scripts.map(s => s.textContent).join('\n//---SCRIPT---\n');
  });
  writeFileSync(`${outDir}/inline-scripts.js`, inlineScripts);
  console.log('Wrote inline-scripts.js size', inlineScripts.length);

  const details = await page.evaluate(() => {
    const get = (sel) => {
      const el = document.querySelector(sel);
      return el ? (el.innerText || '').trim().slice(0, 200) : null;
    };
    return {
      title: document.title,
      bodyClass: document.body?.className || null,
      metaDesc: document.querySelector('meta[name="description"]')?.content || null,
      metaOgTitle: document.querySelector('meta[property="og:title"]')?.content || null,
      heroDate: get('.t63n-heroCount') || get('.t63n-heroDate') || get('h1, b'),
      main: get('main'),
      has2027: /2027/.test(document.body?.innerText || ''),
      has2026: /2026/.test(document.body?.innerText || ''),
    };
  });

  console.log('Details:', JSON.stringify(details, null, 2));
  writeFileSync(`${outDir}/details.json`, JSON.stringify(details, null, 2));

  await page.screenshot({ path: `${outDir}/screenshot-desktop.png`, fullPage: true });
  console.log('Wrote screenshot-desktop.png');
} catch (err) {
  console.error('ERROR:', err.message);
  await page.screenshot({ path: `${outDir}/screenshot-error.png`, fullPage: true });
  process.exit(1);
} finally {
  await browser.close();
}

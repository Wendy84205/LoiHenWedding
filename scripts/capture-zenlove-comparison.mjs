import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';

const root = new URL('../', import.meta.url).pathname;
const manifestPath = join(root, 'src/commerce/data/zenlove-local-manifest-2026-09-26.json');
const outputDir = join(root, 'artifacts/zenlove-comparison');
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const baseUrl = process.env.ZENLOVE_BASE_URL || 'http://127.0.0.1:4174';
const requestedSlugs = process.argv.slice(2);
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const existingManifestPath = join(outputDir, 'manifest.json');
let existingResults = [];
try {
  existingResults = JSON.parse(await readFile(existingManifestPath, 'utf8')).results || [];
} catch {
  existingResults = [];
}
const items = requestedSlugs.length
  ? manifest.items.filter((item) => requestedSlugs.includes(item.slug))
  : manifest.items.filter((item) => item.localImplementation === 'reconstructed');

if (!items.length) throw new Error('No ZenLove comparison items matched the requested slugs.');
await mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true, executablePath });
const results = [];

try {
  for (const item of items) {
    const page = await browser.newPage({ viewport: { width: 818, height: 1440 }, deviceScaleFactor: 818 / 500 });
    const consoleErrors = [];
    const pageErrors = [];
    page.on('console', (message) => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });
    page.on('pageerror', (error) => pageErrors.push(error.message));
    const url = `${baseUrl}/template/${item.slug}`;
    const startedAt = Date.now();
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    await page.evaluate(async () => {
      if (document.fonts?.ready) await document.fonts.ready;
      const images = [...document.images];
      await Promise.all(images.map((image) => image.complete ? Promise.resolve() : new Promise((resolve) => {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
      })));
      document.querySelectorAll('.sceneNode').forEach((node) => node.classList.add('is-visible'));
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    });
    const surface = page.locator('.sceneSurface').first();
    try {
      await surface.waitFor({ state: 'visible', timeout: 30_000 });
    } catch (error) {
      const diagnosticPath = join(outputDir, `${item.slug}-diagnostic.png`);
      await page.screenshot({ path: diagnosticPath, fullPage: true });
      throw new Error(`${item.slug}: scene surface not visible; console=${JSON.stringify(consoleErrors)} pageErrors=${JSON.stringify(pageErrors)} body=${JSON.stringify((await page.locator('body').innerText()).slice(0, 1000))}; diagnostic=${diagnosticPath}; cause=${error.message}`);
    }
    const box = await surface.boundingBox();
    const imagePath = join(outputDir, `${item.slug}.png`);
    await surface.screenshot({ path: imagePath, animations: 'disabled' });
    results.push({
      slug: item.slug,
      url,
      previewPath: item.localPreviewPath,
      screenshotPath: imagePath,
      renderedBox: box,
      screenshotSize: box ? { width: Math.round(box.width), height: Math.round(box.height) } : null,
      elapsedMs: Date.now() - startedAt,
    });
    await page.close();
    console.log(`${item.slug}: ${box?.width}x${box?.height}`);
  }
} finally {
  await browser.close();
}

const mergedResults = [...existingResults.filter((result) => !results.some((item) => item.slug === result.slug)), ...results]
  .sort((a, b) => a.slug.localeCompare(b.slug));
await writeFile(existingManifestPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), results: mergedResults }, null, 2)}\n`);
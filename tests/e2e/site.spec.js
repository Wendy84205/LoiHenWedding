import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { editableTemplateSlugs } from '../../src/commerce/invitationContent.js';
import { currentCatalogSlugs } from '../../src/data/invitationCatalog.js';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('homepage and invitation library expose the complete catalog', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Lời Hẹn');
  await page.goto('/mau-thiep');
  await expect(page.locator('.studioLibraryCard')).toHaveCount(currentCatalogSlugs.length);
  await expect(page.locator('.studioEditableBadge')).toHaveCount(editableTemplateSlugs.length);
  await expect(page.getByRole('link', { name: 'Tùy chỉnh' })).toHaveCount(editableTemplateSlugs.length);
  await expect(page.getByRole('link', { name: 'Đặt theo mẫu' })).toHaveCount(currentCatalogSlugs.length - editableTemplateSlugs.length);
  await expect(page.locator('a[href="/template/thiep-cuoi-112"]')).toHaveCount(0);
});

test('template previews expose the correct commercial action without changing the invitation', async ({ page }) => {
  await page.goto('/template/thiep-cuoi-44');
  const editableBar = page.getByRole('complementary', { name: 'Hành động cho mẫu thiệp' });
  await expect(editableBar).toContainText('CÓ THỂ TỰ CHỈNH SỬA');
  await expect(editableBar.getByRole('link', { name: 'Tùy chỉnh mẫu' })).toHaveAttribute('href', '/dat-thiep?template=thiep-cuoi-44&source=template-preview');

  await page.goto('/template/thiep-bw-1');
  const blackAndWhiteBar = page.getByRole('complementary', { name: 'Hành động cho mẫu thiệp' });
  await expect(blackAndWhiteBar).toContainText('CÓ THỂ TỰ CHỈNH SỬA');
  await expect(blackAndWhiteBar.getByRole('link', { name: 'Tùy chỉnh mẫu' })).toHaveAttribute('href', '/dat-thiep?template=thiep-bw-1&source=template-preview');

  await page.goto('/template/thiep-cuoi-112');
  await expect(page.getByRole('complementary', { name: 'Hành động cho mẫu thiệp' })).toContainText('MẪU THAM KHẢO');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow,noarchive');
});

test('representative source-aligned invitation families render without broken images or horizontal overflow', async ({ page }) => {
  const routes = [3, 13, 22, 32, 59, 71, 75, 97].map((id) => `/template/thiep-cuoi-${id}`);
  for (const route of routes) {
    await page.goto(route);
    const openButton = page.getByRole('button', { name: 'Mở thiệp' });
    if (await openButton.count()) await openButton.click();
    await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
    await expect(page.locator('main.source-template')).toBeVisible();
    const metrics = await page.evaluate(() => ({
      bodyWidth: document.body.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
      brokenImages: [...document.images].filter((image) => image.complete && image.naturalWidth === 0).length,
    }));
    expect(metrics.brokenImages, `${route} has broken images`).toBe(0);
    expect(metrics.bodyWidth, `${route} overflows horizontally`).toBeLessThanOrEqual(metrics.viewportWidth + 1);
  }
});

test('known accessibility regression pages have no serious or critical axe violations', async ({ page }) => {
  for (const route of ['/template/thiep-cuoi-39', '/template/thiep-cuoi-47', '/template/thiep-cuoi-53']) {
    await page.goto(route);
    const results = await new AxeBuilder({ page }).analyze();
    const blocking = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact));
    expect(blocking, `${route}: ${blocking.map((item) => item.id).join(', ')}`).toEqual([]);
  }
});

test('unknown route renders the dedicated not-found page', async ({ page }) => {
  await page.goto('/duong-dan-khong-ton-tai');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('không tồn tại');
});

test('key invitation intros animate and resolve to usable content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });

  await page.goto('/template/thiep-cuoi-44');
  const envelope44 = page.locator('.t44-envelope');
  await envelope44.click();
  await expect(envelope44).toHaveClass(/open/);
  await page.waitForTimeout(950);
  const envelopeState = await page.locator('.t44-envPhoto').evaluate((element) => ({
    height: element.getBoundingClientRect().height,
    transform: getComputedStyle(element).transform,
  }));
  expect(envelopeState.height).toBeGreaterThan(100);
  expect(envelopeState.transform).not.toBe('none');

  await page.goto('/template/thiep-cuoi-61');
  const sparkle = page.locator('.t61-openingSparkles i').first();
  await expect(sparkle).toBeVisible();
  expect(await sparkle.evaluate((element) => getComputedStyle(element).animationName)).not.toBe('none');
  await page.getByRole('button', { name: /skip/i }).click();
  await expect(page.locator('.t61-opening')).toHaveCount(0);
  await expect(page.locator('.t61-hero')).toBeVisible();

  await page.goto('/template/thiep-cuoi-42');
  await page.getByRole('button', { name: /chạm để mở thiệp/i }).click();
  await expect(page.locator('.t42-envelope')).toHaveClass(/is-opening/);
  await expect(page.locator('.t42-intro')).toHaveCount(0, { timeout: 3_000 });
  await expect(page.locator('.t42-hero')).toBeVisible();
});

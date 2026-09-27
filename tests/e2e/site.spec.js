import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('homepage and invitation library expose the complete catalog', async ({ page }) => {
  await page.goto('/');
  const catalogHeader = page.locator('.studioCatalogHeader');
  await expect(catalogHeader.locator('a')).toHaveCount(1);
  await expect(catalogHeader).toContainText('Lời Hẹn');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Mẫu Thiệp Cưới');
  await expect(page.locator('.tpl-hero-subtitle')).toHaveCount(0);
  await page.goto('/dich-vu/trap-cuoi');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Mẫu Thiệp');
  await page.goto('/mau-thiep');
  await expect(page.locator('.tpl-card')).toHaveCount(15);
  await expect(page.getByRole('link', { name: 'Xem preview local' })).toHaveCount(0);
  await expect(page.locator('.tpl-card .tpl-card-image-link')).toHaveCount(15);
  await expect(page.locator('.tpl-card-actions, .tpl-card-copy, .tpl-search, .tpl-sort, .tpl-filter-toolbar, .tpl-filter-panel, .tpl-filter-row, .tpl-filter-group, .tpl-favorite-filter')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Lãng mạn' })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Đã lưu' })).toHaveCount(0);
  await expect(page.locator('.tpl-card .tpl-card-image-link').first()).toHaveAttribute('href', /^\/template\//);
  for (const number of [107, 106, 101, 98, 97, 83, 80, 79, 78, 75, 66, 65, 60, 52, 50, 44, 43, 42, 32]) {
    await expect(page.locator(`.tpl-card a[href="/template/thiep-cuoi-${number}"]`)).toHaveCount(0);
  }
  await expect(page.getByRole('navigation', { name: 'Phân trang thiệp' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Trang 1' })).toHaveAttribute('aria-current', 'page');
  const firstPageHref = await page.locator('.tpl-card-image-link').first().getAttribute('href');
  await page.getByRole('button', { name: 'Trang 2' }).click();
  await expect(page.locator('.tpl-card')).toHaveCount(15);
  await expect(page.getByRole('button', { name: 'Trang 2' })).toHaveAttribute('aria-current', 'page');
  await expect(page.locator('.tpl-card-image-link').first()).not.toHaveAttribute('href', firstPageHref);
  await page.getByRole('button', { name: 'Trang 6' }).click();
  await expect(page.locator('.tpl-card')).toHaveCount(14);
  await page.getByRole('button', { name: 'Trang 1' }).click();
  await expect(page.locator('.tpl-card')).toHaveCount(15);
  await expect(page.getByRole('link', { name: 'Khám phá bộ sưu tập' })).toHaveAttribute('href', '#thu-vien');
  await expect(page.locator('a[href="/template/thiep-cuoi-112"]')).toHaveCount(0);
  await page.goto('/template/thiep-cuoi-107');
  await expect(page.getByRole('complementary', { name: 'Thông tin mẫu thiệp' })).toContainText('Thiệp cưới số 107');
});

test('clicking an invitation card opens its wedding invitation', async ({ page }) => {
  await page.goto('/mau-thiep');
  const invitationLink = page.locator('.tpl-card .tpl-card-image-link').first();
  const invitationPath = await invitationLink.getAttribute('href');
  await invitationLink.click();
  await expect(page).toHaveURL((url) => url.pathname === invitationPath);
  await expect(page.getByRole('complementary', { name: 'Thông tin mẫu thiệp' })).toBeVisible();
});

test('hovering a card scrolls its invitation preview without zooming', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name === 'mobile-chromium', 'Hover previews are for pointer devices.');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/mau-thiep');
  const preview = page.locator('.tpl-card-image-link[href="/template/thiep-cuoi-1"]');
  const previewImage = preview.locator('img');
  await expect.poll(() => previewImage.evaluate((image) => image.complete && image.naturalHeight > 0)).toBe(true);
  const maxScroll = await preview.evaluate((element) => element.scrollHeight - element.clientHeight);
  expect(maxScroll).toBeGreaterThan(0);
  await preview.hover();
  await expect.poll(() => preview.evaluate((element) => element.scrollTop)).toBeGreaterThan(0);
  await expect(previewImage).toHaveCSS('transform', 'none');
  await page.mouse.move(0, 0);
  await expect.poll(() => preview.evaluate((element) => element.scrollTop)).toBe(0);
});

test('template preview footer only shows back navigation and template identity', async ({ page }) => {
  await page.goto('/template/thiep-cuoi-44');
  const editableBar = page.getByRole('complementary', { name: 'Thông tin mẫu thiệp' });
  await expect(editableBar).toContainText('Thiệp cưới số 44');
  await expect(editableBar).not.toContainText(/đặt thiệp|chọn mẫu|gửi tư liệu|quét qr/i);
  await expect(editableBar.getByRole('link')).toHaveCount(1);
  await expect(editableBar.getByRole('link', { name: 'Quay lại thư viện mẫu' })).toHaveAttribute('href', '/mau-thiep');

  await page.goto('/template/thiep-bw-1');
  const blackAndWhiteBar = page.getByRole('complementary', { name: 'Thông tin mẫu thiệp' });
  await expect(blackAndWhiteBar).toContainText('Black & White');
  await expect(blackAndWhiteBar.getByRole('link')).toHaveCount(1);

  await page.goto('/template/thiep-cuoi-112');
  await expect(page.getByRole('complementary', { name: 'Thông tin mẫu thiệp' })).toContainText('Thiệp cưới số 112');
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

test('unknown route returns to the invitation library', async ({ page }) => {
  await page.goto('/duong-dan-khong-ton-tai');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Mẫu Thiệp');
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
    imageSource: element.querySelector('img')?.getAttribute('src') || '',
  }));
  expect(envelopeState.height).toBeGreaterThan(100);
  expect(envelopeState.imageSource).not.toBe('');
  await expect(envelope44).toHaveAttribute('aria-pressed', 'true');

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

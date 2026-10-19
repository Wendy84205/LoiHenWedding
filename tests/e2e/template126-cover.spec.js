import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/template/thiep-cuoi-126');
  await expect(page.locator('.t126n-frame')).toBeVisible();
});

test('vuon xuan cover matches the reference layout', async ({ page }) => {
  const cover = page.locator('.t126n-coverOverlay');
  await expect(cover.locator('h1 > span').first()).toHaveText('Mai Lan ');
  await expect(cover.locator('h1 > span').nth(2)).toHaveText('Tuấn Minh');
  await expect(cover.locator('.t126n-date')).toHaveText('1 tháng 2, 2026');
  await expect(cover.locator('.t126n-invitationLabel')).toHaveText('Kính mời');
  await expect(cover.locator('.t126n-guestBadge h2')).toHaveText('Bạn & người thương');
  await expect(
    cover.getByRole('button', { name: 'Mở thiệp cưới', exact: true }),
  ).toHaveText('Mở thiệp');
  await expect(cover).not.toContainText('Cordially Invites');
  await expect(page.locator('.t126n-sheet')).toBeHidden();

  const metrics = await cover.evaluate(async (element) => {
    await document.fonts.ready;
    const frame = element.querySelector('.t126n-frame');
    const names = [...element.querySelectorAll('.t126n-coupleName > span')];
    const images = [...element.querySelectorAll('img')];
    await Promise.all(images.map((image) => image.decode()));
    return {
      background: getComputedStyle(element).backgroundImage,
      borderWidth: getComputedStyle(element.querySelector('.t126n-card')).borderTopWidth,
      nameFont: getComputedStyle(frame).getPropertyValue('--slr-font-display'),
      nameTops: names.map((name) => name.getBoundingClientRect().top),
      imageWidths: images.map((image) => image.naturalWidth),
      symbolCount: element.querySelectorAll('.t126n-floatSymbol').length,
      frame: frame.getBoundingClientRect().toJSON(),
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      documentWidth: document.documentElement.scrollWidth,
      scrollLocked: document.body.style.overflow === 'hidden',
      fontLoaded: document.fonts.check('16px "UNI Chu truyen thong"'),
    };
  });

  expect(metrics.background).toContain('linear-gradient');
  expect(metrics.background).toContain('rgb(54, 65, 49)');
  expect(metrics.borderWidth).toBe('1px');
  expect(metrics.nameFont).toContain('UNI Chu truyen thong');
  expect(metrics.nameTops[0]).toBeLessThan(metrics.nameTops[1]);
  expect(metrics.nameTops[1]).toBeLessThan(metrics.nameTops[2]);
  expect(metrics.imageWidths).toHaveLength(2);
  expect(metrics.imageWidths.every((width) => width > 0)).toBe(true);
  expect(metrics.symbolCount).toBe(12);
  expect(metrics.frame.x).toBeGreaterThanOrEqual(0);
  expect(metrics.frame.y).toBeGreaterThanOrEqual(0);
  expect(metrics.frame.right).toBeLessThanOrEqual(metrics.viewportWidth);
  expect(metrics.frame.bottom).toBeLessThanOrEqual(metrics.viewportHeight);
  expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.viewportWidth);
  expect(metrics.scrollLocked).toBe(true);
  expect(metrics.fontLoaded).toBe(true);
});

for (const key of ['Enter', 'Space']) {
  test(`open button opens the invitation with ${key}`, async ({ page }) => {
    const button = page.getByRole('button', { name: 'Mở thiệp cưới', exact: true });
    await button.focus();
    await button.press(key);
    await expect(page.locator('.t126n-coverOverlay')).toHaveCount(0);
    await expect(page.locator('.t126n-sheet')).toBeVisible();
    await expect(page.locator('.t126n-sheet')).toHaveAttribute('aria-hidden', 'false');
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  });
}

test('open button works with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.getByRole('button', { name: 'Mở thiệp cưới', exact: true }).click();
  await expect(page.locator('.t126n-coverOverlay')).toHaveCount(0);
  await expect(page.locator('.t126n-sheet')).toBeVisible();
  await expect(page.locator('main h1')).toBeVisible();
});

test('cover remains usable on a small landscape viewport', async ({ page }) => {
  await page.setViewportSize({ width: 568, height: 320 });
  const button = page.getByRole('button', { name: 'Mở thiệp cưới', exact: true });
  await button.scrollIntoViewIfNeeded();
  await expect(button).toBeInViewport();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(568);
  await button.click();
  await expect(page.locator('.t126n-coverOverlay')).toHaveCount(0);
});
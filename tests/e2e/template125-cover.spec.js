import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/template/thiep-cuoi-125');
  await expect(page.locator('.t125n-coverCard')).toBeVisible();
});

test('orchid cover matches the moss-green reference layout', async ({ page }) => {
  const cover = page.locator('.t125n-coverOverlay');
  await expect(cover.locator('h1 > span')).toHaveText(['Thái Sơn', '&', 'Lan Hương']);
  await expect(cover.locator('.t125n-coverDateVi')).toHaveText('20 tháng 12, 2026');
  await expect(cover.locator('.t125n-coverInviteLabel')).toHaveText('Thân Mời');
  await expect(cover.getByRole('button', { name: 'Mở thiệp cưới', exact: true })).toHaveText('Mở thiệp');
  await expect(cover).not.toContainText('Cordially Invites');
  await expect(cover).not.toContainText('Quý khách đại gia');
  await expect(page.locator('.t125n-sheet')).toBeHidden();

  const metrics = await cover.evaluate(async (element) => {
    await document.fonts.ready;
    const card = element.querySelector('.t125n-coverCard');
    const names = [...element.querySelectorAll('.t125n-coverNames > span')];
    const images = [...element.querySelectorAll('img')];
    await Promise.all(images.map((image) => image.decode()));
    return {
      background: getComputedStyle(element).backgroundImage,
      borderWidth: getComputedStyle(card).borderTopWidth,
      nameFont: getComputedStyle(names[0].parentElement).fontFamily,
      nameTops: names.map((name) => name.getBoundingClientRect().top),
      imageWidths: images.map((image) => image.naturalWidth),
      card: card.getBoundingClientRect().toJSON(),
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      documentWidth: document.documentElement.scrollWidth,
      scrollLocked: document.body.style.overflow === 'hidden',
    };
  });

  expect(metrics.background).toContain('linear-gradient');
  expect(metrics.background).toContain('rgb(142, 150, 99)');
  expect(metrics.borderWidth).toBe('1px');
  expect(metrics.nameFont).toContain('HoaLan Rosellinda');
  expect(metrics.nameTops[0]).toBeLessThan(metrics.nameTops[1]);
  expect(metrics.nameTops[1]).toBeLessThan(metrics.nameTops[2]);
  expect(metrics.imageWidths).toHaveLength(2);
  expect(metrics.imageWidths.every((width) => width > 0)).toBe(true);
  expect(metrics.card.x).toBeGreaterThanOrEqual(0);
  expect(metrics.card.y).toBeGreaterThanOrEqual(0);
  expect(metrics.card.right).toBeLessThanOrEqual(metrics.viewportWidth);
  expect(metrics.card.bottom).toBeLessThanOrEqual(metrics.viewportHeight);
  expect(metrics.documentWidth).toBeLessThanOrEqual(metrics.viewportWidth);
  expect(metrics.scrollLocked).toBe(true);
});

for (const key of ['Enter', 'Space']) {
  test(`heart button opens the invitation with ${key}`, async ({ page }) => {
    const heart = page.getByRole('button', { name: 'Mở thiệp bằng nút trái tim', exact: true });
    await heart.focus();
    await heart.press(key);
    await expect(page.locator('.t125n-coverOverlay')).toHaveCount(0);
    await expect(page.locator('.t125n-sheet')).toBeVisible();
    await expect(page.locator('.t125n-sheet')).toHaveAttribute('aria-hidden', 'false');
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe('hidden');
  });
}

test('open button works with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.t125n-coverPetals')).toBeHidden();
  await page.getByRole('button', { name: 'Mở thiệp cưới', exact: true }).click();
  await expect(page.locator('.t125n-coverOverlay')).toHaveCount(0);
  await expect(page.locator('.t125n-sheet')).toBeVisible();
});

test('cover remains usable on a small landscape viewport', async ({ page }) => {
  await page.setViewportSize({ width: 568, height: 320 });
  const button = page.getByRole('button', { name: 'Mở thiệp cưới', exact: true });
  await button.scrollIntoViewIfNeeded();
  await expect(button).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(568);
  await button.click();
  await expect(page.locator('.t125n-coverOverlay')).toHaveCount(0);
});
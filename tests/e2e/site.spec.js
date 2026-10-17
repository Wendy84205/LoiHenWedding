import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { allInvitationSlugs } from '../../src/data/invitationCatalog.js';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('homepage and invitation library expose the complete 11 templates', async ({ page }) => {
  await page.goto('/');
  const catalogHeader = page.locator('.studioCatalogHeader');
  await expect(catalogHeader.locator('a')).toHaveCount(1);
  await expect(catalogHeader).toContainText('Lời Hẹn');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Mẫu Thiệp Cưới');

  await page.goto('/mau-thiep');
  await expect(page.locator('.tpl-card')).toHaveCount(11);
  for (const slug of allInvitationSlugs) {
    await expect(page.locator(`.tpl-card a[href="/template/${slug}"]`)).toBeVisible();
  }
});

test('clicking an invitation card opens its wedding invitation', async ({ page }) => {
  await page.goto('/mau-thiep');
  const invitationLink = page.locator('.tpl-card a.tpl-card-btn').first();
  const invitationPath = await invitationLink.getAttribute('href');
  await invitationLink.click();
  await expect(page).toHaveURL((url) => url.pathname === invitationPath);
  await expect(page.locator('main')).toBeVisible();
});

test('unknown route returns to the invitation library', async ({ page }) => {
  await page.goto('/duong-dan-khong-ton-tai');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Mẫu Thiệp');
});

test('key invitation intros animate and resolve to usable content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });

  await page.goto('/template/thiep-cuoi-48');
  const envelope48 = page.locator('.t48-envelope');
  await envelope48.click();
  await expect(envelope48).toHaveClass(/is-open/);
  await page.waitForTimeout(950);
  const envelopeState = await page.locator('.t48-envelopeCard').evaluate((element) => ({
    height: element.getBoundingClientRect().height,
    imageSource: element.querySelector('img')?.getAttribute('src') || '',
  }));
  expect(envelopeState.height).toBeGreaterThan(100);
  expect(envelopeState.imageSource).not.toBe('');
  await expect(envelope48).toHaveAttribute('aria-expanded', 'true');
});

test('accessibility checks pass on kept template', async ({ page }) => {
  await page.goto('/template/thiep-cuoi-47');
  const results = await new AxeBuilder({ page }).analyze();
  const blocking = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact));
  expect(blocking, `thiep-cuoi-47: ${blocking.map((item) => item.id).join(', ')}`).toEqual([]);
});

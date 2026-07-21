import { expect, test } from '@playwright/test';
import { allInvitationSlugs } from '../../src/data/invitationCatalog.js';

const routeGroups = Array.from(
  { length: Math.ceil(allInvitationSlugs.length / 10) },
  (_, index) => allInvitationSlugs.slice(index * 10, index * 10 + 10),
);

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

for (const [groupIndex, slugs] of routeGroups.entries()) {
  test(`invitation catalog group ${groupIndex + 1} renders cleanly`, async ({ page }) => {
    test.setTimeout(120_000);

    for (const slug of slugs) {
      const route = `/template/${slug}`;
      const runtimeErrors = [];
      const onPageError = (error) => runtimeErrors.push(error.message);
      const onConsole = (message) => {
        if (message.type() === 'error') runtimeErrors.push(message.text());
      };

      page.on('pageerror', onPageError);
      page.on('console', onConsole);

      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response?.status(), `${route} returned an invalid HTTP status`).toBeLessThan(400);

      const openButton = page.getByRole('button', { name: /mở thiệp/i });
      if (await openButton.count()) await openButton.first().click({ force: true });

      await expect(
        page.locator('main'),
        `${route} did not finish loading its lazy invitation bundle`,
      ).toBeVisible({ timeout: 20_000 });
      await expect(page.locator('h1')).not.toHaveCount(0);
      await page.waitForTimeout(120);

      const metrics = await page.evaluate(() => ({
        viewportWidth: document.documentElement.clientWidth,
        documentWidth: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
        brokenImages: [...document.images]
          .filter((image) => image.complete && image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src),
      }));

      expect(metrics.brokenImages, `${route} contains broken images`).toEqual([]);
      expect(metrics.documentWidth, `${route} overflows horizontally`).toBeLessThanOrEqual(metrics.viewportWidth + 2);
      expect(runtimeErrors, `${route} emitted runtime errors`).toEqual([]);

      page.off('pageerror', onPageError);
      page.off('console', onConsole);
    }
  });
}

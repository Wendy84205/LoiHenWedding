import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

test('retired studio and commerce URLs return to the invitation library', async ({ page }) => {
  for (const route of [
    '/dich-vu/thiep-cuoi-online',
    '/dich-vu/trap-cuoi',
    '/tu-van',
    '/dat-thiep',
    '/tai-khoan',
    '/don-hang/LH-DEMO-001',
    '/admin',
    '/admin/orders/LH-DEMO-001',
    '/chinh-sach-bao-mat',
    '/dieu-khoan-dich-vu',
    '/trinh-chieu/opening-frame',
  ]) {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Mẫu Thiệp Cưới');
    await expect(page.getByRole('region', { name: 'Duyệt mẫu thiệp' })).toBeVisible();
  }
});
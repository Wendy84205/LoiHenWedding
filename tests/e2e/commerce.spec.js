import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

async function openDemoAccount(page, email = 'an@example.com') {
  await page.goto('/tai-khoan');
  const dashboard = page.locator('.dash-layout');
  const demoButton = page.getByRole('button', { name: /mở tài khoản demo/i });
  await expect(dashboard.or(demoButton)).toBeVisible();
  if (await dashboard.isVisible()) return;
  await page.getByLabel(/Email của bạn/i).fill(email);
  await demoButton.click();
  await expect(dashboard).toBeVisible();
}

async function createOrder(page) {
  await openDemoAccount(page);
  await page.goto('/dat-thiep?template=thiep-cuoi-44');
  await page.getByRole('button', { name: /đặt thiệp với mẫu này/i }).click();
  await expect(page).toHaveURL(/\/don-hang\/[^/]+$/);
  const orderId = new URL(page.url()).pathname.split('/').pop();
  const publicId = await page.locator('.commercePortalHeader h1').innerText();
  return { portalUrl: `/don-hang/${orderId}`, publicId };
}

test('customer creates an order and is sent to the customer portal instead of an editor', async ({ page }) => {
  const { portalUrl } = await createOrder(page);
  expect(portalUrl).toContain('/don-hang/');
  await expect(page.getByText('CỔNG KHÁCH HÀNG')).toBeVisible();
  await expect(page.getByRole('link', { name: /tự chỉnh sửa/i })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /mở thiệp/i })).toBeVisible();
  await expect(page.getByText(/thanh toán để phát hành/i).first()).toBeVisible();
});

test('account dashboard sends existing orders to their customer portals', async ({ page }) => {
  await openDemoAccount(page);
  await page.getByRole('button', { name: 'Quản lý thiệp' }).click();
  const order = page.locator('.dash-order-card').filter({ hasText: 'LH-DEMO-001' });
  await expect(order).toBeVisible();
  await expect(order.getByRole('link', { name: /xem đơn hàng/i })).toHaveAttribute('href', /\/don-hang\//);
});

test('published invitation exposes handoff, RSVP dashboard and personalized links', async ({ page }) => {
  await openDemoAccount(page);
  await page.getByRole('button', { name: 'Quản lý thiệp' }).click();
  const order = page.locator('.dash-order-card').filter({ hasText: 'LH-DEMO-001' });
  await order.getByRole('link', { name: 'Đã thanh toán' }).click();
  await expect(page.getByRole('heading', { name: 'Thiệp đã sẵn sàng để gửi khách' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Phản hồi tham dự' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Quản lý link gửi riêng' })).toBeVisible();
});
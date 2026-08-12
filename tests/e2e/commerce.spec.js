import { expect, test } from '@playwright/test';
import { commercialTemplateSlugs } from '../../src/commerce/invitationContent.js';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
});

async function openDemoAccount(page, email = 'an@example.com') {
  await page.goto('/tai-khoan');
  await page.getByLabel('Email').fill(email);
  await page.getByRole('button', { name: /mở tài khoản demo/i }).click();
  await expect(page.locator('.dash-layout')).toBeVisible();
}

async function openDemoEditor(page) {
  await openDemoAccount(page);
  const order = page.locator('.accountOrderList article').filter({ hasText: 'LH-DEMO-001' });
  await order.getByRole('link', { name: /chỉnh thiệp/i }).click();
  await expect(page.locator('.invitationEditor')).toBeVisible();
  await expect(page.locator('.sceneEditorShell')).toBeAttached();
}

async function waitForAutosave(page) {
  const saveState = page.locator('.editorSaveState');
  await expect(saveState).toContainText(/Chờ lưu|Đang lưu|Đã lưu/);
  await expect(saveState).toContainText('Đã lưu', { timeout: 15_000 });
}

async function createOrder(page) {
  await openDemoAccount(page);
  await page.goto('/dat-thiep?template=thiep-cuoi-44');
  await page.getByRole('button', { name: /dùng mẫu này và bắt đầu chỉnh sửa/i }).click();
  await expect(page.locator('.invitationEditor')).toBeVisible();
  const editorUrl = page.url();
  const orderId = new URL(editorUrl).pathname.split('/').pop();
  return { editorUrl, portalUrl: `/don-hang/${orderId}` };
}

test('customer can create an order, edit before payment and open the QR payment portal when ready to publish', async ({ page }) => {
  const { editorUrl, portalUrl } = await createOrder(page);
  expect(editorUrl).toContain('/chinh-sua-thiep/');
  await page.goto(editorUrl);
  await expect(page.locator('.invitationEditor')).toBeVisible();
  await expect(page.getByText(/thanh toán 50.000đ để phát hành/i)).toBeVisible();
  expect(portalUrl).toContain('/don-hang/');
  await page.goto(portalUrl);
  await expect(page.getByText('CỔNG KHÁCH HÀNG')).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: /tên chú rể/i })).toBeVisible();
  await expect(page.getByText(/thanh toán để phát hành/i).first()).toBeVisible();
});

test('catalog selection opens a direct editable draft at the single fixed price', async ({ page }) => {
  await openDemoAccount(page);
  await page.goto('/dat-thiep?template=thiep-cuoi-61');
  await expect(page.getByText(/thiệp nháp.*nắng mai/i)).toBeVisible();
  await expect(page.getByText('50.000đ').first()).toBeVisible();
  await expect(page.getByRole('button', { name: /dùng mẫu này và bắt đầu chỉnh sửa/i })).toBeVisible();

  await page.goto('/dat-thiep?template=thiep-cuoi-8');
  await expect(page.getByText(/thiệp nháp.*thiệp cưới 8/i)).toBeVisible();
});

test('studio consultation retains the selected template context', async ({ page }) => {
  await page.goto('/tu-van?service=Thi%E1%BB%87p+c%C6%B0%E1%BB%9Bi+Online&template=thiep-bw-1');
  await expect(page.locator('.studioBookingTemplate')).toContainText('Black & White');
  await page.getByLabel('Họ và tên').fill('Nguyễn An');
  await page.getByLabel('Số điện thoại').fill('0901234567');
  await page.getByLabel('Email').fill('an@example.com');
  await page.getByLabel('Ngày tư vấn').fill(new Date(Date.now() + 86400000).toISOString().slice(0, 10));
  await page.getByLabel('Nhu cầu cần trao đổi').fill('Mình cần tư vấn cách cá nhân hóa mẫu Black & White.');
  await page.getByLabel(/Tôi đồng ý để Lời Hẹn Studio/).check();
  await page.getByRole('button', { name: /gửi yêu cầu tư vấn/i }).click();
  await expect(page.getByRole('status')).toContainText(/Đã tiếp nhận yêu cầu LH-TV-DEMO/);

  await page.goto('/admin');
  const login = page.getByRole('button', { name: 'Đăng nhập' });
  if (await login.count()) await login.click();
  await page.getByRole('tab', { name: /Tư vấn/ }).click();
  const lead = page.locator('.commerceConsultationCard').filter({ hasText: 'Nguyễn An' });
  await expect(lead).toContainText('thiep-bw-1');
  await lead.locator('select').selectOption('qualified');
  await lead.locator('textarea').fill('Đã xác nhận nhu cầu và ngân sách.');
  await lead.getByRole('button', { name: 'Lưu lead' }).click();
  await expect(lead.getByRole('status')).toContainText('Đã lưu');
  await expect(lead.locator('.commerceLeadStatus')).toContainText('Đủ điều kiện');
});

test('homepage consultation is persisted in the admin lead inbox', async ({ page }) => {
  await page.goto('/#tu-van');
  await page.getByLabel('Họ và tên').fill('Trần Minh');
  await page.getByLabel('Số điện thoại').fill('0912345678');
  await page.getByLabel('Ngày tư vấn').fill(new Date(Date.now() + 172800000).toISOString().slice(0, 10));
  await page.getByLabel(/Tôi đồng ý để Lời Hẹn Studio liên hệ/).check();
  await page.getByRole('button', { name: /gửi yêu cầu tư vấn/i }).click();
  await expect(page.getByRole('status')).toContainText(/Đã tiếp nhận yêu cầu LH-TV-DEMO/);

  await page.goto('/admin');
  const login = page.getByRole('button', { name: 'Đăng nhập' });
  if (await login.count()) await login.click();
  await page.getByRole('tab', { name: /Tư vấn/ }).click();
  const lead = page.locator('.commerceConsultationCard').filter({ hasText: 'Trần Minh' });
  await expect(lead).toBeVisible();
  await expect(lead).toContainText('Thiệp cưới Online');
});

test('customer can claim an existing private order into an account', async ({ page }) => {
  const { publicId, portalUrl } = await createOrder(page);
  await openDemoAccount(page);
  await expect(page.getByText(publicId)).toHaveCount(0);
  await page.getByPlaceholder('Dán link quản lý đơn hàng...').fill(portalUrl);
  await page.getByRole('button', { name: /thêm đơn/i }).click();
  await expect(page.getByText('Đã thêm đơn hàng vào tài khoản.')).toBeVisible();
  const claimedOrder = page.locator('.accountOrderList article').filter({ hasText: publicId });
  await expect(claimedOrder).toBeVisible();
  await claimedOrder.getByRole('link', { name: /quản lý đơn/i }).click();
  await expect(page.getByText('CỔNG KHÁCH HÀNG')).toBeVisible();
});

test('published invitation exposes handoff, RSVP dashboard and personalized links', async ({ page }) => {
  await openDemoAccount(page);
  const order = page.locator('.accountOrderList article').filter({ hasText: 'LH-DEMO-001' });
  await order.getByRole('link', { name: /quản lý đơn/i }).click();
  await expect(page.getByRole('heading', { name: 'Thiệp đã sẵn sàng để gửi khách' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Phản hồi tham dự' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Quản lý link gửi riêng' })).toBeVisible();
  await page.getByLabel('Tên khách mời').fill('Cô Mai');
  await page.getByLabel('Nhóm khách').fill('Nhà gái');
  await page.getByRole('button', { name: /thêm khách/i }).click();
  await expect(page.getByText('Đã tạo link mời cá nhân hóa.')).toBeVisible();
  await expect(page.locator('.commerceGuestList').getByText('Cô Mai')).toBeVisible();
});

test('customer can sign in with Google in demo mode and retain the session', async ({ page }) => {
  await page.goto('/tai-khoan');
  await page.getByRole('button', { name: 'Đăng nhập bằng Google' }).click();
  await expect(page.locator('.dash-layout')).toBeVisible();
  await expect(page.getByText('google-demo@loihen.local')).toBeVisible();
  await page.reload();
  await expect(page.getByText('google-demo@loihen.local')).toBeVisible();
});

test('customer can open the demo account without entering an email', async ({ page }) => {
  await page.goto('/tai-khoan');
  await expect(page.getByLabel('Email (không bắt buộc trong demo)')).not.toHaveAttribute('required', '');
  await page.getByRole('button', { name: 'Mở tài khoản demo' }).click();
  await expect(page.locator('.dash-layout')).toBeVisible();
  await expect(page.getByText('khach@loihen.local')).toBeVisible();
});

test('desktop scene editor selects, transforms, styles and restores a bound text node', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop Moveable behavior is covered in the desktop project.');
  await openDemoEditor(page);

  const groomNode = page.locator('[data-scene-node="groom-name"]');
  await groomNode.scrollIntoViewIfNeeded();
  await groomNode.click();
  const inspector = page.locator('.sceneNodeInspector');
  await expect(inspector.getByRole('heading', { name: 'Tên chú rể' })).toBeVisible();
  await expect(page.locator('.moveable-control')).toHaveCount(10);

  await inspector.getByLabel('X', { exact: true }).fill('92');
  await inspector.getByLabel('Cỡ chữ').fill('46');
  await inspector.getByLabel('Màu', { exact: true }).fill('#1f4d3a');
  await inspector.getByLabel('Font').selectOption('Montserrat, Arial, sans-serif');
  await inspector.getByTitle('Căn phải').click();
  await inspector.getByLabel('Xuất hiện').selectOption('zoom');
  await inspector.getByLabel('Chuyển động liên tục').selectOption('float');

  await page.locator('.sceneEditorShell').focus();
  await page.locator('.sceneEditorShell').press('ArrowRight');
  await expect(groomNode).toHaveAttribute('data-scene-animate', 'zoom');
  await expect(groomNode).toHaveClass(/continuous-float/);
  await expect.poll(() => groomNode.evaluate((node) => node.style.transform)).toContain('translate(93px');
  await expect(groomNode.locator('.sceneNodeContent')).toHaveCSS('font-size', '46px');
  await expect(groomNode.locator('.sceneNodeContent')).toHaveCSS('color', 'rgb(31, 77, 58)');

  await groomNode.dblclick();
  const groomInput = page.locator('[data-editor-field-input="couple.groomName"]');
  await expect(groomInput).toBeFocused();
  await groomInput.fill('Anh Khoa');
  await expect(groomNode).toContainText('Anh Khoa');
  await waitForAutosave(page);

  await page.reload();
  await expect(page.locator('.invitationEditor')).toBeVisible();
  const restoredNode = page.locator('[data-scene-node="groom-name"]');
  await expect(restoredNode).toContainText('Anh Khoa');
  await expect.poll(() => restoredNode.evaluate((node) => node.style.transform)).toContain('translate(93px');
  await restoredNode.click();
  await expect(page.locator('.sceneNodeInspector').getByLabel('X', { exact: true })).toHaveValue('93');
  await expect(page.locator('.sceneNodeInspector').getByLabel('Cỡ chữ')).toHaveValue('46');
});

test('desktop scene editor manages layers, duplicate, lock, delete and undo', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Layer keyboard and Moveable controls are covered in the desktop project.');
  await openDemoEditor(page);
  const originalCount = await page.locator('[data-scene-node]').count();

  await page.getByRole('button', { name: 'Thành phần', exact: true }).click();
  await page.locator('.sceneElementsPanel').getByRole('button', { name: 'Hình khối' }).click();
  await expect(page.locator('[data-scene-node]')).toHaveCount(originalCount + 1);
  const inspector = page.locator('.sceneNodeInspector');
  await expect(inspector.getByRole('heading', { level: 2, name: 'Hình khối' })).toBeVisible();

  await inspector.getByRole('button', { name: 'Nhân bản' }).click();
  await expect(page.locator('[data-scene-node]')).toHaveCount(originalCount + 2);
  await inspector.getByRole('button', { name: 'Khóa' }).click();
  await expect(page.locator('.moveable-control')).toHaveCount(0);
  await inspector.getByRole('button', { name: 'Mở khóa' }).click();
  await expect(page.locator('.moveable-control')).toHaveCount(10);

  await inspector.getByRole('button', { name: 'Xóa' }).click();
  await expect(page.locator('[data-scene-node]')).toHaveCount(originalCount + 1);
  await page.getByRole('button', { name: 'Hoàn tác' }).click();
  await expect(page.locator('[data-scene-node]')).toHaveCount(originalCount + 2);
  await waitForAutosave(page);

  await page.reload();
  await expect(page.locator('[data-scene-node]')).toHaveCount(originalCount + 2);
});

test('desktop scene editor persists palette, font and image focal point', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Desktop canvas computed styles are covered in the desktop project.');
  await openDemoEditor(page);

  await page.getByRole('button', { name: 'Phong cách', exact: true }).click();
  await page.getByRole('button', { name: /Hồng phấn/ }).click();
  await page.getByRole('button', { name: /Hiện đại/ }).click();
  await expect(page.locator('.sceneSurface')).toHaveCSS('background-color', 'rgb(255, 247, 247)');
  await expect(page.locator('[data-scene-node="groom-name"] .sceneNodeContent')).toHaveCSS('font-family', /Outfit/);

  const hero = page.locator('[data-scene-node="hero-photo"]');
  await hero.click();
  const inspector = page.locator('.sceneNodeInspector');
  await inspector.getByLabel('Lấy nét ngang').fill('23');
  await inspector.getByLabel('Lấy nét dọc').fill('31');
  await expect(hero.locator('img')).toHaveCSS('object-position', '23% 31%');
  await waitForAutosave(page);

  await page.reload();
  const restoredHero = page.locator('[data-scene-node="hero-photo"]');
  await expect(restoredHero.locator('img')).toHaveCSS('object-position', '23% 31%');
  await restoredHero.click();
  await expect(page.locator('.sceneNodeInspector').getByLabel('Lấy nét ngang')).toHaveValue('23');
  await expect(page.locator('.sceneNodeInspector').getByLabel('Lấy nét dọc')).toHaveValue('31');
});

test('mobile editor edits from layers, previews the canvas and stays within the viewport', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile layout is covered in the mobile project.');
  await openDemoEditor(page);
  await page.getByRole('button', { name: 'Lớp', exact: true }).click();
  const groomLayer = page.locator('.sceneLayerList article').filter({
    has: page.locator('strong').filter({ hasText: /^Tên chú rể$/ }),
  });
  await groomLayer.locator('button').first().click();
  await expect(page.locator('.sceneNodeInspector').getByRole('heading', { level: 2, name: 'Tên chú rể', exact: true })).toBeVisible();
  await page.locator('.sceneNodeInspector').getByLabel('X', { exact: true }).fill('88');
  await waitForAutosave(page);

  await page.locator('.editorMobileSwitch').getByRole('button', { name: 'Xem trước' }).click();
  await expect(page.locator('.sceneEditorShell')).toBeVisible();
  await expect.poll(() => page.locator('[data-scene-node="groom-name"]').evaluate((node) => node.style.transform)).toContain('translate(88px');
  const metrics = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
  }));
  expect(metrics.document).toBeLessThanOrEqual(metrics.viewport + 2);

  await page.locator('[data-scene-node="bride-name"]').click();
  await expect(page.locator('.sceneNodeInspector').getByRole('heading', { name: 'Tên cô dâu' })).toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: 'Lớp', exact: true }).click();
  await page.locator('.sceneLayerList article').filter({
    has: page.locator('strong').filter({ hasText: /^Tên chú rể$/ }),
  }).locator('button').first().click();
  await expect(page.locator('.sceneNodeInspector').getByLabel('X', { exact: true })).toHaveValue('88');
});

test('editor detects an optimistic concurrency conflict between two tabs', async ({ page, context, isMobile }) => {
  test.skip(isMobile, 'Concurrency is covered once in the desktop project.');
  await openDemoEditor(page);
  const secondPage = await context.newPage();
  await secondPage.goto(page.url());
  await expect(secondPage.locator('.invitationEditor')).toBeVisible();

  await page.locator('[data-scene-node="groom-name"]').click();
  await page.locator('.sceneNodeInspector').getByLabel('X', { exact: true }).fill('101');
  await waitForAutosave(page);

  await secondPage.locator('[data-scene-node="bride-name"]').click();
  await secondPage.locator('.sceneNodeInspector').getByLabel('X', { exact: true }).fill('104');
  await expect(secondPage.locator('.editorSaveState')).toContainText('Xung đột', { timeout: 15_000 });
  await expect(secondPage.getByText(/tab khác/i)).toBeVisible();
  await secondPage.close();
});

test('customer can upload a gift QR and preview persisted music', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Upload and popup preview are covered once in the desktop project.');
  await openDemoEditor(page);

  await page.getByRole('button', { name: 'Hình ảnh', exact: true }).click();
  const giftSlot = page.locator('.editorAssetSlot').filter({ hasText: 'QR mừng cưới' });
  await giftSlot.locator('input').setInputFiles('public/assets/template40-ref/qr.png');
  await expect(page.getByText('Đã cập nhật tư liệu.')).toBeVisible();
  const giftNode = page.locator('[data-scene-node="wedding-gift-qr"]');
  await expect(giftNode.locator('img')).toHaveCount(1);
  await expect.poll(() => giftNode.locator('img').evaluate((image) => image.complete && image.naturalWidth > 0)).toBe(true);

  await page.getByRole('button', { name: 'Âm nhạc', exact: true }).click();
  await page.getByRole('button', { name: 'Chọn nhạc Wedding 01' }).click();
  await waitForAutosave(page);
  const [preview] = await Promise.all([
    page.waitForEvent('popup'),
    page.locator('.editorOpenPreview').click(),
  ]);
  await expect(preview.locator('audio')).toHaveAttribute('src', '/assets/audio/wedding-01.mp3');
  await expect(preview.locator('[data-scene-node="wedding-gift-qr"] img')).toHaveCount(1);
  await preview.close();

  await page.reload();
  await page.getByRole('button', { name: 'Âm nhạc', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Chọn nhạc Wedding 01' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: /Không dùng nhạc/ }).click();
  await waitForAutosave(page);
});

test('customer can switch scene templates and restore the complete previous version', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Version switching is covered once in the desktop project.');
  await openDemoEditor(page);
  await page.getByRole('button', { name: 'Mẫu', exact: true }).click();
  await expect(page.locator('.editorTemplateGrid button')).toHaveCount(commercialTemplateSlugs.length);
  await page.getByRole('button', { name: 'Chọn mẫu Minimal Envelope' }).click();
  await expect(page.locator('.editorIdentity')).toContainText('Minimal Envelope');
  await expect(page.locator('[data-scene-node="opening-envelope"]')).toHaveCount(1);

  await page.getByRole('button', { name: 'Lịch sử', exact: true }).click();
  const originalVersion = page.locator('.editorVersionList article').filter({ hasText: 'Bản 1' });
  await expect(originalVersion).toContainText('Illustrated Vows');
  page.once('dialog', (dialog) => dialog.accept());
  await originalVersion.getByRole('button', { name: 'Khôi phục' }).click();
  await expect(page.getByText(/Đã khôi phục bản 1/)).toBeVisible();
  await expect(page.locator('.editorIdentity')).toContainText('Illustrated Vows');
  await expect(page.locator('[data-scene-node="opening-envelope"]')).toHaveCount(0);
  await expect(page.locator('[data-scene-node="groom-name"]')).toContainText('Tuấn Hà');
});

test('all five pilot scenes retain their distinct visual contracts and complete widgets', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Pilot conversion audit is covered once in the desktop project.');
  await openDemoEditor(page);
  const pilots = [
    ['Editorial Red', 'rgb(255, 255, 255)', '272px'],
    ['Minimal Envelope', 'rgb(255, 255, 255)', '452px'],
    ['Ruby Editorial', 'rgb(255, 250, 250)', '452px'],
    ['Nắng Mai', 'rgb(248, 241, 237)', '452px'],
    ['Illustrated Vows', 'rgb(255, 248, 239)', '272px'],
  ];

  for (const [name, background, heroWidth] of pilots) {
    await page.getByRole('button', { name: 'Mẫu', exact: true }).click();
    const option = page.getByRole('button', { name: `Chọn mẫu ${name}` });
    if (!(await option.isDisabled())) await option.click();
    await expect(page.locator('.editorIdentity')).toContainText(name);
    await expect(page.locator('.sceneSurface')).toHaveCSS('background-color', background);
    await expect(page.locator('[data-scene-node="hero-photo"]')).toHaveCSS('width', heroWidth);
    await expect(page.locator('[data-scene-node="wedding-rsvp"]')).toHaveCount(1);
    await expect(page.locator('[data-scene-node="wedding-wish"]')).toHaveCount(1);
    await expect(page.locator('[data-scene-node="wedding-gift-qr"]')).toHaveCount(1);
    const brokenImages = await page.locator('.sceneSurface img').evaluateAll((images) => images
      .filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
    expect(brokenImages, `${name} contains broken scene images`).toEqual([]);
  }

  await expect(page.locator('[data-scene-node="hero-particle"] .sceneParticles')).toHaveClass(/is-petal/);
});

test('the first ten converted scene profiles keep distinct layouts and complete commercial widgets', async ({ page, isMobile }) => {
  test.skip(isMobile, 'Batch conversion audit is covered once in the desktop project.');
  test.setTimeout(120_000);
  await openDemoEditor(page);
  const profiles = [
    ['Golden Vow', 'rgb(255, 253, 248)', 'hero-photo', '500px'],
    ['Beige Love Story', 'rgb(248, 244, 237)', 'hero-photo', '286px'],
    ['White Editorial', 'rgb(255, 255, 255)', 'hero-photo', '500px'],
    ['Oval Promise', 'rgb(255, 255, 255)', 'hero-photo', '370px'],
    ['Red Double Joy', 'rgb(255, 250, 240)', 'hero-photo', '268px'],
    ['Pearl Portrait', 'rgb(255, 255, 255)', 'hero-photo', '500px'],
    ['Crimson Envelope', 'rgb(255, 253, 251)', 'opening-envelope', '360px'],
    ['Red Arch Schedule', 'rgb(255, 255, 255)', 'hero-photo', '320px'],
    ['Botanical Envelope', 'rgb(248, 245, 237)', 'opening-envelope', '360px'],
    ['Pink Envelope', 'rgb(255, 248, 250)', 'opening-envelope', '360px'],
  ];

  for (const [name, background, contractNode, width] of profiles) {
    await page.getByRole('button', { name: 'Mẫu', exact: true }).click();
    const option = page.getByRole('button', { name: `Chọn mẫu ${name}` });
    if (!(await option.isDisabled())) await option.click();
    await expect(page.locator('.editorIdentity')).toContainText(name);
    await expect(page.locator('.sceneSurface')).toHaveCSS('background-color', background);
    await expect(page.locator(`[data-scene-node="${contractNode}"]`)).toHaveCSS('width', width);
    await expect(page.locator('[data-scene-node="wedding-rsvp"]')).toHaveCount(1);
    await expect(page.locator('[data-scene-node="wedding-wish"]')).toHaveCount(1);
    await expect(page.locator('[data-scene-node="wedding-gift-qr"]')).toHaveCount(1);
    if (name === 'Golden Vow') {
      await expect(page.locator('[data-scene-node="hero-shade"] .sceneNodeContent')).toHaveCSS('opacity', '0.2');
    }
    if (name === 'Red Double Joy') {
      await expect(page.locator('[data-scene-node="double-joy"] .sceneNodeContent')).toHaveCSS('opacity', '0.28');
    }
    const brokenImages = await page.locator('.sceneSurface img').evaluateAll((images) => images
      .filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
    expect(brokenImages, `${name} contains broken scene images`).toEqual([]);
  }
});

test('the next fifteen scene profiles preserve their own visual contracts and valid media', async ({ page, isMobile }) => {
  test.skip(isMobile, 'The complete batch visual audit is covered once in the desktop project.');
  test.setTimeout(180_000);
  await openDemoEditor(page);
  const profiles = [
    ['White Botanical', 'rgb(248, 248, 240)', 'hero-photo', '286px'],
    ['City Sunset', 'rgb(23, 22, 21)', 'hero-photo', '500px'],
    ['Mountain Promise', 'rgb(244, 243, 233)', 'hero-photo', '500px'],
    ['Love Playlist', 'rgb(246, 241, 232)', 'hero-photo', '500px'],
    ['Modern Terracotta', 'rgb(250, 245, 237)', 'hero-photo', '500px'],
    ['Oriental Minimal', 'rgb(255, 253, 248)', 'hero-photo', '370px'],
    ['Forest Vows', 'rgb(242, 241, 232)', 'hero-photo', '500px'],
    ['Mộng Hỷ', 'rgb(255, 250, 250)', 'hero-photo', '268px'],
    ['Bold Wedding Type', 'rgb(255, 255, 255)', 'hero-photo', '500px'],
    ['Forest Envelope', 'rgb(247, 246, 239)', 'opening-envelope', '360px'],
    ['Scarlet Double Joy', 'rgb(255, 248, 243)', 'hero-photo', '320px'],
    ['Joyful Red Arch', 'rgb(255, 248, 239)', 'hero-photo', '268px'],
    ['Golden Ceremony', 'rgb(250, 243, 227)', 'hero-photo', '286px'],
    ['He & She Editorial', 'rgb(248, 242, 235)', 'hero-photo', '500px'],
    ['Blue Letter', 'rgb(255, 253, 249)', 'opening-envelope', '360px'],
  ];

  for (const [name, background, contractNode, width] of profiles) {
    await page.getByRole('button', { name: 'Mẫu', exact: true }).click();
    const option = page.getByRole('button', { name: `Chọn mẫu ${name}` });
    if (!(await option.isDisabled())) await option.click();
    await expect(page.locator('.editorIdentity')).toContainText(name);
    await expect(page.locator('.sceneSurface')).toHaveCSS('background-color', background);
    await expect(page.locator(`[data-scene-node="${contractNode}"]`)).toHaveCSS('width', width);
    await expect(page.locator('[data-scene-node="wedding-rsvp"]')).toHaveCount(1);
    await expect(page.locator('[data-scene-node="wedding-wish"]')).toHaveCount(1);
    await expect(page.locator('[data-scene-node="wedding-gift-qr"]')).toHaveCount(1);
    const brokenImages = await page.locator('.sceneSurface img').evaluateAll((images) => images
      .filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
    expect(brokenImages, `${name} contains broken scene images`).toEqual([]);
  }
});

test('the third scene batch keeps its ceremony, editorial and envelope contracts intact', async ({ page, isMobile }) => {
  test.skip(isMobile, 'The complete batch visual audit is covered once in the desktop project.');
  test.setTimeout(180_000);
  await openDemoEditor(page);
  const profiles = [
    ['Indigo Celebration', 'rgb(255, 255, 255)', 'hero-photo', '500px'],
    ['Emerald Letter', 'rgb(245, 244, 234)', 'opening-envelope', '360px'],
    ['Scarlet Bow', 'rgb(250, 244, 237)', 'hero-photo', '320px'],
    ['Golden Hour Vows', 'rgb(244, 229, 210)', 'hero-photo', '500px'],
    ['Lake Como Gold', 'rgb(247, 241, 232)', 'hero-photo', '286px'],
    ['Rose Garden Frame', 'rgb(255, 253, 248)', 'hero-photo', '370px'],
    ['Violet Fairytale', 'rgb(238, 232, 245)', 'hero-photo', '500px'],
    ['Phoenix Invitation', 'rgb(255, 248, 237)', 'opening-envelope', '360px'],
    ['Moonlight Playlist', 'rgb(246, 244, 239)', 'hero-photo', '500px'],
    ['Beauty and the Rose', 'rgb(255, 248, 245)', 'hero-photo', '268px'],
    ['Paper Frame Romance', 'rgb(249, 243, 241)', 'hero-photo', '500px'],
    ['Photograph of Love', 'rgb(246, 244, 238)', 'hero-photo', '286px'],
    ['Sunlit Editorial', 'rgb(247, 243, 233)', 'hero-photo', '500px'],
    ['Blessing Begins', 'rgb(255, 250, 245)', 'hero-photo', '320px'],
    ['Retro Red Date', 'rgb(255, 253, 248)', 'hero-photo', '500px'],
  ];

  for (const [name, background, contractNode, width] of profiles) {
    await page.getByRole('button', { name: 'Mẫu', exact: true }).click();
    const option = page.getByRole('button', { name: `Chọn mẫu ${name}` });
    if (!(await option.isDisabled())) await option.click();
    await expect(page.locator('.editorIdentity')).toContainText(name);
    await expect(page.locator('.sceneSurface')).toHaveCSS('background-color', background);
    await expect(page.locator(`[data-scene-node="${contractNode}"]`)).toHaveCSS('width', width);
    await expect(page.locator('[data-scene-node="wedding-rsvp"]')).toHaveCount(1);
    await expect(page.locator('[data-scene-node="wedding-wish"]')).toHaveCount(1);
    await expect(page.locator('[data-scene-node="wedding-gift-qr"]')).toHaveCount(1);
    const brokenImages = await page.locator('.sceneSurface img').evaluateAll((images) => images
      .filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
    expect(brokenImages, `${name} contains broken scene images`).toEqual([]);
  }
});

test('the fourth scene batch preserves fifteen distinct late-catalog visual contracts', async ({ page, isMobile }) => {
  test.skip(isMobile, 'The complete batch visual audit is covered once in the desktop project.');
  test.setTimeout(180_000);
  await openDemoEditor(page);
  const profiles = [
    ['Blush Typography', 'rgb(249, 245, 241)', 'hero-photo', '370px'],
    ['Black Ivory Type', 'rgb(255, 253, 249)', 'hero-photo', '500px'],
    ['Botanical Announcement', 'rgb(248, 245, 236)', 'opening-envelope', '360px'],
    ['Ink and Blush', 'rgb(248, 241, 238)', 'hero-photo', '500px'],
    ['Red Pop Love', 'rgb(255, 248, 239)', 'hero-photo', '268px'],
    ['Violet Poetry', 'rgb(255, 254, 253)', 'hero-photo', '500px'],
    ['Soft Foliage', 'rgb(248, 243, 239)', 'hero-photo', '286px'],
    ['Candy Collage', 'rgb(255, 250, 250)', 'opening-envelope', '360px'],
    ['Forest Vow Cinema', 'rgb(20, 33, 25)', 'hero-photo', '500px'],
    ['Camcorder Love', 'rgb(255, 250, 250)', 'hero-photo', '500px'],
    ['Red Bow Formal', 'rgb(255, 249, 243)', 'hero-photo', '320px'],
    ['Illustrated Letter', 'rgb(255, 253, 248)', 'hero-photo', '286px'],
    ['Gia Lễ Heritage', 'rgb(255, 253, 248)', 'hero-photo', '268px'],
    ['Contemporary Classic', 'rgb(255, 253, 249)', 'hero-photo', '320px'],
    ['Crimson Heritage', 'rgb(255, 247, 238)', 'hero-photo', '500px'],
  ];

  for (const [name, background, contractNode, width] of profiles) {
    await page.getByRole('button', { name: 'Mẫu', exact: true }).click();
    const option = page.getByRole('button', { name: `Chọn mẫu ${name}` });
    if (!(await option.isDisabled())) await option.click();
    await expect(page.locator('.editorIdentity')).toContainText(name);
    await expect(page.locator('.sceneSurface')).toHaveCSS('background-color', background);
    await expect(page.locator(`[data-scene-node="${contractNode}"]`)).toHaveCSS('width', width);
    const brokenImages = await page.locator('.sceneSurface img').evaluateAll((images) => images
      .filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
    expect(brokenImages, `${name} contains broken scene images`).toEqual([]);
  }
});

test('the fifth scene batch uses valid wedding media instead of decorative previews', async ({ page, isMobile }) => {
  test.skip(isMobile, 'The complete batch visual audit is covered once in the desktop project.');
  test.setTimeout(180_000);
  await openDemoEditor(page);
  const profiles = [
    ['Pearl Typography', 'rgb(245, 244, 233)', 'hero-photo', '500px'],
    ['Blush Botanical Frame', 'rgb(250, 243, 241)', 'hero-photo', '370px'],
    ['Phoenix Red Pop', 'rgb(255, 253, 248)', 'hero-photo', '268px'],
    ['Playful Illustrated Poster', 'rgb(255, 253, 250)', 'hero-photo', '286px'],
    ['Sunset Cinema', 'rgb(25, 22, 21)', 'hero-photo', '500px'],
    ['Midnight Garden', 'rgb(246, 241, 230)', 'hero-photo', '500px'],
    ['Vintage Train Letter', 'rgb(248, 242, 233)', 'hero-photo', '500px'],
    ['Scarlet Noir Cinema', 'rgb(13, 13, 13)', 'hero-photo', '500px'],
    ['Monochrome Manifesto', 'rgb(247, 246, 243)', 'hero-photo', '500px'],
    ['Black Type Ceremony', 'rgb(255, 255, 255)', 'hero-photo', '500px'],
    ['Layered Love Letter', 'rgb(255, 253, 248)', 'hero-photo', '286px'],
    ['Navy Formal Seal', 'rgb(18, 45, 89)', 'hero-photo', '320px'],
    ['Emerald Formal Seal', 'rgb(21, 56, 35)', 'hero-photo', '320px'],
    ['Modern Photo Grid', 'rgb(255, 253, 249)', 'hero-photo', '500px'],
    ['Ruby Formal Seal', 'rgb(255, 248, 239)', 'hero-photo', '320px'],
  ];

  for (const [name, background, contractNode, width] of profiles) {
    await page.getByRole('button', { name: 'Mẫu', exact: true }).click();
    const option = page.getByRole('button', { name: `Chọn mẫu ${name}` });
    if (!(await option.isDisabled())) await option.click();
    await expect(page.locator('.editorIdentity')).toContainText(name);
    await expect(page.locator('.sceneSurface')).toHaveCSS('background-color', background);
    await expect(page.locator(`[data-scene-node="${contractNode}"]`)).toHaveCSS('width', width);
    await expect(page.locator('[data-scene-node="wedding-rsvp"]')).toHaveCount(1);
    await expect(page.locator('[data-scene-node="wedding-wish"]')).toHaveCount(1);
    const brokenImages = await page.locator('.sceneSurface img').evaluateAll((images) => images
      .filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
    expect(brokenImages, `${name} contains broken scene images`).toEqual([]);
  }
});

test('the final scene profiles complete the editable catalog on valid assets and widgets', async ({ page, isMobile }) => {
  test.skip(isMobile, 'The complete batch visual audit is covered once in the desktop project.');
  test.setTimeout(150_000);
  await openDemoEditor(page);
  const profiles = [
    ['Sage Modern Grid', 'rgb(255, 253, 248)', 'hero-photo', '500px'],
    ['Dragon Phoenix Formal', 'rgb(255, 247, 237)', 'hero-photo', '320px'],
    ['Forest Film Vows', 'rgb(20, 34, 25)', 'hero-photo', '500px'],
    ['Illustrated Vows', 'rgb(255, 248, 239)', 'hero-photo', '272px'],
    ['Sage Meadow Story', 'rgb(247, 248, 241)', 'hero-photo', '500px'],
    ['Red Line Invitation', 'rgb(251, 244, 241)', 'opening-envelope', '360px'],
    ['Retro Film Typography', 'rgb(247, 244, 238)', 'hero-photo', '500px'],
    ['Autumn Metasequoia', 'rgb(246, 239, 227)', 'hero-photo', '500px'],
    ['Black and White Vows', 'rgb(255, 255, 255)', 'hero-photo', '500px'],
    ['Hỷ Xanh Illustrated', 'rgb(248, 251, 248)', 'opening-envelope', '360px'],
  ];

  for (const [name, background, contractNode, width] of profiles) {
    await page.getByRole('button', { name: 'Mẫu', exact: true }).click();
    const option = page.getByRole('button', { name: `Chọn mẫu ${name}` });
    if (!(await option.isDisabled())) await option.click();
    await expect(page.locator('.editorIdentity')).toContainText(name);
    await expect(page.locator('.sceneSurface')).toHaveCSS('background-color', background);
    await expect(page.locator(`[data-scene-node="${contractNode}"]`)).toHaveCSS('width', width);
    await expect(page.locator('[data-scene-node="wedding-rsvp"]')).toHaveCount(1);
    await expect(page.locator('[data-scene-node="wedding-wish"]')).toHaveCount(1);
    await expect(page.locator('[data-scene-node="wedding-gift-qr"]')).toHaveCount(1);
    const brokenImages = await page.locator('.sceneSurface img').evaluateAll((images) => images
      .filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
    expect(brokenImages, `${name} contains broken scene images`).toEqual([]);
  }
});

test('representative scene profiles fit the mobile editor canvas', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Mobile scene fitting is covered in the mobile project.');
  test.setTimeout(120_000);
  await openDemoEditor(page);
  const profiles = [
    'Golden Vow', 'Beige Love Story', 'White Editorial', 'Oval Promise', 'Red Double Joy',
    'Pearl Portrait', 'Crimson Envelope', 'Red Arch Schedule', 'Botanical Envelope', 'Pink Envelope',
    'City Sunset', 'Oriental Minimal', 'Blue Letter',
    'Emerald Letter', 'Scarlet Bow', 'Violet Fairytale',
    'Botanical Announcement', 'Forest Vow Cinema', 'Red Bow Formal',
    'Pearl Typography', 'Phoenix Red Pop', 'Layered Love Letter',
    'Sage Modern Grid', 'Dragon Phoenix Formal', 'Red Line Invitation',
    'Autumn Metasequoia', 'Black and White Vows', 'Hỷ Xanh Illustrated',
  ];

  for (const name of profiles) {
    await page.getByRole('button', { name: 'Chỉnh sửa', exact: true }).click();
    await page.getByRole('button', { name: 'Mẫu', exact: true }).click();
    const option = page.getByRole('button', { name: `Chọn mẫu ${name}` });
    if (!(await option.isDisabled())) await option.click();
    await expect(page.locator('.editorIdentity')).toContainText(name);
    await page.getByRole('button', { name: 'Xem trước', exact: true }).click();
    await expect.poll(() => page.locator('.sceneEditorStage').evaluate((stage) => {
      const viewport = stage.closest('.editorCanvasViewport');
      const stageRect = stage.getBoundingClientRect();
      const viewportRect = viewport.getBoundingClientRect();
      return stageRect.width <= viewportRect.width + 1 && stageRect.left >= viewportRect.left - 1;
    })).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth + 1)).toBe(true);
    const brokenImages = await page.locator('.sceneSurface img').evaluateAll((images) => images
      .filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.src));
    expect(brokenImages, `${name} contains broken mobile scene images`).toEqual([]);
  }
});

test('customer can edit, autosave and submit a new invitation draft', async ({ page }) => {
  test.setTimeout(90_000);
  const { portalUrl } = await createOrder(page);
  await page.goto(portalUrl);
  await page.getByRole('link', { name: /tự chỉnh sửa/i }).click();
  await expect(page.locator('.invitationEditor')).toBeVisible();

  await page.getByRole('button', { name: 'Văn bản', exact: true }).click();
  const groomName = page.locator('[data-editor-field-input="couple.groomName"]');
  await groomName.fill('Anh Khoa');
  await groomName.focus();
  await page.getByLabel('Cỡ chữ riêng').fill('48');
  await page.getByRole('button', { name: 'Chữ đậm' }).click();
  await waitForAutosave(page);

  await page.reload();
  await page.getByRole('button', { name: 'Văn bản', exact: true }).click();
  const restoredName = page.locator('[data-editor-field-input="couple.groomName"]');
  await restoredName.focus();
  await expect(restoredName).toHaveValue('Anh Khoa');
  await expect(page.getByLabel('Cỡ chữ riêng')).toHaveValue('48');
  await expect(page.getByRole('button', { name: 'Chữ đậm' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: /gửi duyệt/i }).click();
  await expect(page.getByText('Bản thiệp đã được gửi studio duyệt.')).toBeVisible();
});

test('admin can publish an order and create a personalized guest link', async ({ page }) => {
  const { publicId } = await createOrder(page);
  await page.goto('/admin');
  const login = page.getByRole('button', { name: 'Đăng nhập' });
  if (await login.count()) await login.click();
  await page.getByRole('link', { name: new RegExp(publicId) }).click();
  await page.getByRole('button', { name: /phát hành thiệp/i }).click();
  await expect(page.locator('.status-published')).toBeVisible();
  await page.getByLabel('Tên khách mời').fill('Cô Mai');
  await page.getByLabel('Nhóm khách').fill('Họ nhà gái');
  await page.getByLabel('Số người được mời').fill('2');
  await page.getByRole('button', { name: /thêm khách/i }).click();
  const guestUrl = await page.locator('.commerceGuestList code').last().textContent();
  await page.goto(guestUrl);
  await expect(page.locator('.commerceGuestGreeting')).toContainText('Cô Mai');
});

test('published scene invitation records RSVP and wishes', async ({ page }) => {
  await page.goto('/w/tuan-ha-minh-vy-demo');
  const rsvp = page.locator('[data-scene-node="wedding-rsvp"]');
  await rsvp.scrollIntoViewIfNeeded();
  await rsvp.getByLabel('Họ và tên').fill('Khách thử nghiệm');
  await rsvp.getByRole('button', { name: /gửi xác nhận/i }).click();
  await expect(rsvp.getByText(/cảm ơn bạn đã xác nhận/i)).toBeVisible();

  const wish = page.locator('[data-scene-node="wedding-wish"]');
  await wish.scrollIntoViewIfNeeded();
  await wish.getByLabel('Họ và tên').fill('Khách thử nghiệm');
  await wish.getByLabel('Lời chúc').fill('Chúc hai bạn trăm năm hạnh phúc.');
  await wish.getByRole('button', { name: /gửi lời chúc/i }).click();
  await expect(wish.getByText(/lời chúc đã được gửi/i)).toBeVisible();
});

import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await p.goto('http://127.0.0.1:5173/template/thiep-cuoi-14', { waitUntil: 'load' });
await p.waitForTimeout(3000);
// scroll through page to trigger reveals
const total = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < total; y += 450) {
  await p.evaluate((yy) => window.scrollTo(0, yy), y);
  await p.waitForTimeout(80);
}
await p.evaluate(() => window.scrollTo(0, 0));
await p.waitForTimeout(1500);
// settle remaining reveal transforms
await p.evaluate(() => {
  document.querySelectorAll('[style*="translate"]').forEach((el) => { el.style.transform = 'none'; el.style.opacity = '1'; });
});
await p.waitForTimeout(500);
console.log('docW', await p.evaluate(() => document.documentElement.scrollWidth), 'docH', await p.evaluate(() => document.documentElement.scrollHeight));
await p.screenshot({ path: '/tmp/t14_local_full.png', fullPage: true });
await b.close();

import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 900 }, deviceScaleFactor: 1 });
await p.goto('http://127.0.0.1:5173/template/thiep-cuoi-14', { waitUntil: 'load' });
await p.waitForTimeout(2500);

// scroll slowly to trigger reveals naturally
for (let y = 0; y <= 3900; y += 300) {
  await p.evaluate((yy) => window.scrollTo(0, yy), y);
  await p.waitForTimeout(150);
}
await p.evaluate(() => window.scrollTo(0, 3400));
await p.waitForTimeout(2500);
await p.screenshot({ path: '/tmp/t14cmp2/live_rot.png' });

for (let y = 3900; y <= 5300; y += 300) {
  await p.evaluate((yy) => window.scrollTo(0, yy), y);
  await p.waitForTimeout(150);
}
await p.evaluate(() => window.scrollTo(0, 4450));
await p.waitForTimeout(2500);
await p.screenshot({ path: '/tmp/t14cmp2/live_anh1.png' });

await p.evaluate(() => window.scrollTo(0, 4830));
await p.waitForTimeout(2500);
await p.screenshot({ path: '/tmp/t14cmp2/live_anh2.png' });
await b.close();
console.log('done');

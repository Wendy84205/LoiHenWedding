import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, reducedMotion: 'reduce' });
p.on('requestfailed', (r) => { if (r.url().includes('google') || r.url().includes('maps')) console.log('REQFAIL', r.url().slice(0, 100), r.failure()?.errorText); });
await p.goto('http://localhost:5173/template/thiep-cuoi-22', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(3000);
const frames = p.frames().map((f) => f.url().slice(0, 90));
console.log('frames:', JSON.stringify(frames, null, 1));
// chờ thêm cho map load
await p.waitForTimeout(8000);
const frames2 = p.frames().map((f) => ({ url: f.url().slice(0, 60) }));
console.log('frames after 11s:', JSON.stringify(frames2));
// chụp riêng vùng map sau khi chờ
await p.setViewportSize({ width: 500, height: 16000 });
await p.waitForTimeout(1500);
await p.evaluate(() => window.scrollTo(0, 9100));
await p.waitForTimeout(2000);
const el = await p.$('.t22n-mapframe');
if (el) { await el.screenshot({ path: '/tmp/t22_mapshot.png' }); console.log('saved /tmp/t22_mapshot.png'); }
else console.log('mapframe not found');
await b.close();

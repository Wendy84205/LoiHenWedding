import { chromium } from 'playwright';
const b = await chromium.launch();
const p1 = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1 });
await p1.goto('https://cinelove.me/template/thiep-cuoi-27', { waitUntil: 'load', timeout: 120000 });
await p1.waitForTimeout(7000);
await p1.evaluate(async () => {
  const sc = document.querySelector('[class*=\"customScroll\"]');
  if (sc) { const h = sc.scrollHeight; for (let y = 0; y < h; y += 500) { sc.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } sc.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 600)); }
});
await p1.evaluate(() => { document.querySelectorAll('*').forEach((el) => { const st = el.getAttribute('style') || ''; if (st.includes('translate') || st.includes('opacity: 0')) { el.style.transform = 'none'; el.style.opacity = '1'; } }); });
await p1.waitForTimeout(400);
await p1.locator('#root-page-container').screenshot({ path: '/tmp/t27_ref_full.png' });
console.log('saved ref canvas');
await p1.close();
const p2 = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1 });
await p2.goto('http://localhost:5173/template/thiep-cuoi-27', { waitUntil: 'load', timeout: 120000 });
await p2.waitForTimeout(5000);
await p2.evaluate(async () => { const h = document.documentElement.scrollHeight; for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); } window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 600)); });
await p2.locator('.t27n-canvas').screenshot({ path: '/tmp/t27_local_full.png' });
console.log('saved local canvas');
await p2.close();
await b.close();

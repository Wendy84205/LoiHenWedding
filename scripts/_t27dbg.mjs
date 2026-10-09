import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1 });
await p.goto('http://localhost:5173/template/thiep-cuoi-27', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(4000);
for (const y of [0, 2000, 5000]) {
  await p.evaluate((yy) => window.scrollTo(0, yy), y);
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `/tmp/t27_dbg_${y}.png` });
}
const info = await p.evaluate(() => {
  const nodes = document.querySelectorAll('.t27n-node');
  let hidden = 0, total = nodes.length;
  nodes.forEach((n) => { const cs = getComputedStyle(n); if (parseFloat(cs.opacity) < 0.9) hidden++; });
  return { total, hidden, scrollH: document.documentElement.scrollHeight };
});
console.log(JSON.stringify(info));
await b.close();

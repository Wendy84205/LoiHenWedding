import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 500, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await page.goto('https://cinelove.me/template/thiep-cuoi-3', { waitUntil: 'domcontentloaded', timeout: 180000 });
await page.waitForTimeout(12000);

const info = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 50) {
      out.push({ tag: el.tagName, id: el.id, cls: (el.className || '').toString().slice(0, 60), sh: el.scrollHeight, ch: el.clientHeight, rect: el.getBoundingClientRect().height });
    }
  });
  return out;
});
console.log(JSON.stringify(info, null, 1));

// use the biggest scroller
const sel = await page.evaluate(() => {
  let best = null;
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 50) {
      if (!best || el.scrollHeight > best.sh) best = { el, sh: el.scrollHeight };
    }
  });
  if (!best) return null;
  best.el.setAttribute('data-scroller', '1');
  return { sh: best.sh };
});
console.log('scroller', JSON.stringify(sel));

const total = sel ? sel.sh : 0;
// progressive scroll in 850 steps; also deep-scroll first to load all lazy bgs then come back
await page.evaluate(async () => {
  const el = document.querySelector('[data-scroller]');
  const h = el.scrollHeight;
  for (let y = 0; y < h; y += 400) { el.scrollTop = y; await new Promise(r => setTimeout(r, 90)); }
  el.scrollTop = 0;
});
await page.waitForTimeout(2500);

for (let y = 0; y < total; y += 850) {
  await page.evaluate((yy) => { document.querySelector('[data-scroller]').scrollTop = yy; }, y);
  await page.waitForTimeout(800);
  await page.screenshot({ path: `/tmp/t3o_${String(y).padStart(5, '0')}.png` });
}
console.log('done', total);
await browser.close();

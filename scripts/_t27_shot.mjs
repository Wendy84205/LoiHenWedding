import { chromium } from 'playwright';

// reducedMotion: Reveal (framer-motion useReducedMotion) bo animation -> node hien ngay
const b = await chromium.launch();
const forceVisible = () => {
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    if (parseFloat(cs.opacity) < 1) el.style.opacity = '1';
    const st = el.getAttribute('style') || '';
    if (st.includes('translate') || st.includes('opacity: 0')) {
      el.style.transform = 'none';
      el.style.opacity = '1';
    }
  });
};
// ref: trang gốc cuộn trong container riêng + chrome header -> chụp element canvas
const pickScroller = `() => {
  const c = document.querySelector('#root-page-container');
  let best = null;
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 200) {
      if (c && c.contains(el)) return;
      if (!best || el.scrollHeight > best.scrollHeight) best = el;
    }
  });
  return best;
}`;
{
  const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await p.goto('https://cinelove.me/template/thiep-cuoi-27', { waitUntil: 'load', timeout: 120000 });
  await p.waitForTimeout(7000);
  const scInfo = await p.evaluate(async (pickSrc) => {
    const fn = new Function('return (' + pickSrc + ')')();
    const sc = fn();
    if (!sc) return { found: false };
    const h = sc.scrollHeight;
    for (let y = 0; y < h; y += 500) { sc.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); }
    sc.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
    const r = sc.getBoundingClientRect();
    return { found: true, sh: h, rect: [r.x, r.y, r.width, r.height], cls: sc.getAttribute('class') };
  }, pickScroller);
  console.log('scroller', JSON.stringify(scInfo));
  await p.evaluate(forceVisible);
  await p.waitForTimeout(400);
  const refCanvas = p.locator('#root-page-container');
  const refBox = await refCanvas.boundingBox();
  console.log('refCanvasBox', JSON.stringify(refBox));
  await refCanvas.screenshot({ path: '/tmp/t27_ref_full.png' });
  console.log('saved ref canvas');
  await p.close();
}
// local
{
  const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await p.goto('http://localhost:5173/template/thiep-cuoi-27', { waitUntil: 'load', timeout: 120000 });
  await p.waitForTimeout(5000);
  await p.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 30)); }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
  });
  await p.evaluate(forceVisible);
  await p.waitForTimeout(300);
  await p.locator('.t27n-canvas').screenshot({ path: '/tmp/t27_local_full.png' });
  console.log('saved local canvas');
  await p.close();
}
await b.close();

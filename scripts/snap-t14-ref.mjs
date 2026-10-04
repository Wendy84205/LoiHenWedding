import { chromium } from 'playwright';

const url = process.argv[2];
const out = process.argv[3];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 180000 });
await page.waitForTimeout(12000);

const info = await page.evaluate(() => {
  let best = null;
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 50) {
      if (!best || el.scrollHeight > best.sh) best = { el, sh: el.scrollHeight };
    }
  });
  if (best) {
    best.el.setAttribute('data-scroller', '1');
    return { sh: best.sh, tag: best.el.tagName, cls: String(best.el.className).slice(0, 60) };
  }
  return { sh: document.documentElement.scrollHeight, tag: 'document', cls: '' };
});
console.log('SCROLLER=' + JSON.stringify(info));

// deep-scroll to trigger lazy backgrounds/images
await page.evaluate(async () => {
  const el = document.querySelector('[data-scroller]') || document.scrollingElement;
  const step = 700;
  for (let y = 0; y < el.scrollHeight; y += step) {
    el.scrollTop = y;
    await new Promise((r) => setTimeout(r, 60));
  }
  el.scrollTop = 0;
  await new Promise((r) => setTimeout(r, 400));
});

await page.waitForTimeout(1500);

const canvasH = await page.evaluate(() => {
  const el = document.querySelector('[data-scroller]');
  if (el) {
    const prevH = el.style.height;
    const prevOverflow = el.style.overflow;
    el.style.height = el.scrollHeight + 'px';
    el.style.overflow = 'visible';
    return { h: el.scrollHeight, prevH, prevOverflow };
  }
  return { h: document.documentElement.scrollHeight };
});
console.log('CANVAS_H=' + canvasH.h);

await page.setViewportSize({ width: 500, height: Math.min(canvasH.h, 20000) });
await page.waitForTimeout(1200);
await page.evaluate(() => {
  document.querySelectorAll('*').forEach((el) => {
    const st = el.getAttribute('style') || '';
    if (st.includes('translate')) {
      el.style.transform = 'none';
      el.style.opacity = '1';
    }
  });
});
await page.waitForTimeout(500);
await page.screenshot({ path: out, fullPage: true });
console.log('SAVED ' + out);
await browser.close();
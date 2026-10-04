import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 500, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await page.goto('http://127.0.0.1:5173/template/thiep-cuoi-3', { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.waitForTimeout(3000);

const dump = async (label) => {
  const info = await page.evaluate(() => {
    const findText = (t) => [...document.querySelectorAll('div,p,h1,h2,span')].find((e) => e.children.length === 0 && (e.textContent || '').includes(t));
    const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { top: Math.round(b.top + window.scrollY), h: Math.round(b.height) }; };
    const canv = document.querySelector('.t3n-canvas');
    return {
      scrollY: window.scrollY,
      scrollH: document.documentElement.scrollHeight,
      canvas: r(canv),
      hero: r(findText("We're getting married")),
      wish: r(document.querySelector('.t3n-wish, form')),
      bodyChildren: [...document.body.children].map((e) => ({ tag: e.tagName, cls: (e.className || '').toString().slice(0, 40), h: Math.round(e.getBoundingClientRect().height) })),
      mainChildren: [...(document.querySelector('main') || document.body).children].map((e) => ({ tag: e.tagName, cls: (e.className || '').toString().slice(0, 40), h: Math.round(e.getBoundingClientRect().height) })),
    };
  });
  console.log(label, JSON.stringify(info, null, 1));
};

await dump('FRESH');
// pre-pass like capture
await page.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 450) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(3000);
await dump('AFTER_PREPASS');
await page.evaluate(() => {
  window.__reset = () => document.querySelectorAll('[style*="translate"]').forEach((el) => { el.style.transform = 'none'; el.style.opacity = '1'; });
  window.__reset();
  window.__iv = setInterval(window.__reset, 400);
});
await page.waitForTimeout(1000);
await dump('AFTER_RESET');
await page.evaluate(() => window.scrollTo(0, 4250));
await page.waitForTimeout(500);
await dump('AT_4250');
await page.screenshot({ path: '/tmp/t3dbg_4250.png' });
await page.evaluate(() => clearInterval(window.__iv));
await browser.close();

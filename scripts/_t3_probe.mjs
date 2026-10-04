import { chromium } from 'playwright';
const urls = [
  'http://127.0.0.1:5173/template/thiep-cuoi-3',
  'https://cinelove.me/template/thiep-cuoi-3',
];
const browser = await chromium.launch();
for (const url of urls) {
  const page = await browser.newPage({ viewport: { width: 500, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.waitForTimeout(6000);
    const info = await page.evaluate(() => {
      const out = { scrollH: document.documentElement.scrollHeight, bodyH: document.body.scrollHeight, anchors: [] };
      const add = (label, el) => {
        if (!el) { out.anchors.push({ label, missing: true }); return; }
        const r = el.getBoundingClientRect();
        out.anchors.push({ label, top: Math.round(r.top + window.scrollY), left: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height) });
      };
      // find canvas-ish container
      const canv = document.querySelector('[class*="canvas"], main > div, [class*="Canvas"]');
      add('canvas-ish', canv);
      const findText = (t) => [...document.querySelectorAll('div,p,h1,h2,span')].find((e) => e.children.length === 0 && (e.textContent || '').includes(t));
      add('hero-getting', findText("We're getting married"));
      add('bravest', findText('bravest moment'));
      add('dia-diem', findText('Địa điểm'));
      add('welcome-script', [...document.querySelectorAll('img,div')].find((e) => /welcome/i.test(e.className || '') || (e.src || '').includes('welcome')));
      add('wish-form', document.querySelector('form, [class*="wish"]'));
      add('life30k', findText('30,000 days'));
      // scrollers
      out.scrollers = [];
      document.querySelectorAll('*').forEach((el) => {
        const cs = getComputedStyle(el);
        if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 50) {
          out.scrollers.push({ tag: el.tagName, cls: (el.className || '').toString().slice(0, 50), sh: el.scrollHeight, ch: el.clientHeight });
        }
      });
      return out;
    });
    console.log('=== ' + url);
    console.log(JSON.stringify(info, null, 1));
  } catch (e) {
    console.log('=== ' + url + ' ERROR ' + e.message);
  }
  await page.close();
}
await browser.close();

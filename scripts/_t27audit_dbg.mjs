import { chromium } from 'playwright';

const URL = process.argv[2] || 'http://localhost:5173/template/thiep-cuoi-27';
const SEL = process.argv[3] || '[class$="-canvas"]';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await p.goto(URL, { waitUntil: 'load', timeout: 90000 });
await p.waitForTimeout(4000);

const probe = () => p.evaluate((sel) => {
  const r = document.querySelector(sel) || document.body;
  const rect = r.getBoundingClientRect();
  const sc = document.scrollingElement;
  return {
    rect: [Math.round(rect.x), Math.round(rect.y), Math.round(rect.width), Math.round(rect.height)],
    docBox: [Math.round(rect.x + (window.scrollX || sc.scrollLeft)), Math.round(rect.y + (window.scrollY || sc.scrollTop))],
    docH: document.documentElement.scrollHeight,
    textLen: (r.innerText || '').length,
    head: (r.innerText || '').slice(0, 80).replace(/\n/g, ' | '),
    opac0: [...r.querySelectorAll('*')].filter((e) => getComputedStyle(e).opacity === '0').length,
    total: r.querySelectorAll('*').length,
    imgs: [...r.querySelectorAll('img')].length,
    imgsOk: [...r.querySelectorAll('img')].filter((i) => i.complete && i.naturalWidth > 0).length,
  };
}, SEL);
console.log('BEFORE', JSON.stringify(await probe()));

await p.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 25)); }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 400));
});
console.log('AFTER-SCROLL', JSON.stringify(await probe()));

await p.evaluate((rootSel) => {
  const root = document.querySelector(rootSel) || document.body;
  const hidden = [];
  document.querySelectorAll('*').forEach((el) => {
    if (el === root) return;
    const cs = getComputedStyle(el);
    if (cs.position === 'fixed' && !root.contains(el) && !el.contains(root)) {
      hidden.push(`${el.tagName}.${el.className}`.slice(0, 60));
      el.style.setProperty('display', 'none', 'important');
      return;
    }
    if (parseFloat(cs.opacity) < 1) el.style.opacity = '1';
    const st = el.getAttribute('style') || '';
    if (st.includes('translate') || st.includes('opacity: 0')) {
      el.style.transform = 'none';
      el.style.opacity = '1';
    }
  });
  const re = /xem thiệp|mở thiệp|xem thiệp cưới|get started|nhận thiệp/i;
  const gate = [...document.querySelectorAll('button,a,div,span')]
    .find((el) => re.test((el.textContent || '').trim()) && el.offsetParent !== null && (el.textContent || '').trim().length < 40);
  window.__hidden = hidden;
  window.__gate = gate ? gate.textContent.trim() : 'none';
  if (gate) gate.click();
}, SEL);
await p.waitForTimeout(300);
console.log('AFTER-FORCE', JSON.stringify(await probe()), 'hidden=', JSON.stringify(await p.evaluate(() => window.__hidden)), 'gate=', await p.evaluate(() => window.__gate));

const box = await p.evaluate((sel) => {
  const el = document.querySelector(sel) || document.body;
  const r = el.getBoundingClientRect();
  const sc = document.scrollingElement;
  return { x: r.x + (window.scrollX || sc.scrollLeft), y: r.y + (window.scrollY || sc.scrollTop), w: r.width, h: r.height };
}, SEL);
console.log('CLIP', JSON.stringify(box));
await p.screenshot({ path: '/tmp/dbg_local_clip.png', clip: { x: box.x, y: box.y, width: box.w, height: box.h }, animations: 'disabled', timeout: 60000 });
console.log('saved /tmp/dbg_local_clip.png');
await b.close();

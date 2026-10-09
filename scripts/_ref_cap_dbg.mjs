import { chromium } from 'playwright';

const URL = process.argv[2];
const SEL = process.argv[3] || '#root-page-container';
const OUT = process.argv[4] || '/tmp/dbg_ref_full.png';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await p.goto(URL, { waitUntil: 'load', timeout: 90000 });
await p.waitForTimeout(4000);

// --- giống flow trong _fidelity_audit.mjs ---
await p.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 25)); }
  const sc = document.querySelector('#root-page-container')?.parentElement;
  if (sc && sc.scrollHeight > sc.clientHeight) {
    for (let y = 0; y < sc.scrollHeight; y += 600) { sc.scrollTop = y; await new Promise((r) => setTimeout(r, 25)); }
    sc.scrollTop = 0;
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 400));
});
await p.evaluate(async (rootSel) => {
  const root = document.querySelector(rootSel) || document.body;
  document.querySelectorAll('*').forEach((el) => {
    if (el === root) return;
    const cs = getComputedStyle(el);
    if (cs.position === 'fixed' && !root.contains(el) && !el.contains(root)) {
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
  if (gate) gate.click();
  await new Promise((r) => setTimeout(r, 500));

  // overlay intro phủ kín root: bấm giữa, vẫn còn thì ẩn
  const isCover = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return false;
    if (cs.position !== 'absolute' && cs.position !== 'fixed') return false;
    const z = Number(cs.zIndex);
    if (!(z >= 30)) return false;
    const m = cs.backgroundColor.match(/rgba?\(([^)]+)\)/);
    if (!m) return false;
    const parts = m[1].split(',').map((x) => parseFloat(x));
    const alpha = parts.length > 3 ? parts[3] : 1;
    if (alpha < 0.9) return false;
    const r = el.getBoundingClientRect();
    return r.width > 300 && r.height > 300
      && r.width >= window.innerWidth * 0.9 && r.height >= window.innerHeight * 0.9;
  };
  const ov = [...document.querySelectorAll('div,section,main')].find(isCover);
  if (ov) {
    try { ov.click(); } catch { /* noop */ }
    await new Promise((r) => setTimeout(r, 700));
    if (isCover(ov)) ov.style.setProperty('display', 'none', 'important');
    window.__overlay = true;
  } else {
    window.__overlay = false;
  }
}, SEL);
console.log('OVERLAY-HANDLED', await p.evaluate(() => window.__overlay));

const measure = () => p.evaluate((s) => {
  const el = s ? document.querySelector(s) : null;
  const r = (el || document.body).getBoundingClientRect();
  const sc = document.scrollingElement;
  return { x: r.x + (window.scrollX || sc.scrollLeft), y: r.y + (window.scrollY || sc.scrollTop), w: r.width, h: r.height };
}, SEL);

let box = await measure();
console.log('BOX-1', JSON.stringify(box));
const vh = Math.min(Math.ceil(box.h) + 2, 16000);
if (Math.abs(vh - 1000) > 2) {
  await p.setViewportSize({ width: 500, height: vh });
  await p.waitForTimeout(600);
  box = await measure();
  console.log('BOX-2', JSON.stringify(box));
}
// soi style của container + 3 con đầu NGAY TRƯỚC khi chụp
console.log('STYLES', JSON.stringify(await p.evaluate((s) => {
  const root = document.querySelector(s);
  const pick = (el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { tag: el.tagName, cls: String(el.className).slice(0, 40), op: cs.opacity, vis: cs.visibility, disp: cs.display, anim: cs.animationName.slice(0, 40), rect: [Math.round(r.y), Math.round(r.height)] };
  };
  return [pick(root), ...[...root.children].slice(0, 4).map(pick)];
}, SEL)));
// nội dung overlay intro (div bg-white z-50 phủ toàn root)
console.log('OVERLAY', JSON.stringify(await p.evaluate((s) => {
  const root = document.querySelector(s) || document.body;
  const rh = root.getBoundingClientRect().height;
  const ov = [...document.querySelectorAll('div')].find((el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return cs.position === 'absolute' && cs.zIndex !== 'auto' && Number(cs.zIndex) >= 40
      && r.width > 400 && r.height > Math.max(rh, 900) * 0.9;
  });
  if (!ov) return null;
  return {
    parent: `${ov.parentElement?.tagName}#${ov.parentElement?.id}.${String(ov.parentElement?.className).slice(0, 50)}`,
    text: (ov.innerText || '').slice(0, 200).replace(/\n/g, ' | '),
    buttons: [...ov.querySelectorAll('button,a,[role=button]')].map((b) => (b.textContent || '').trim().slice(0, 40)),
  };
}, SEL)));
// 1) chụp CÓ animations:disabled
try {
  await p.screenshot({ path: OUT, clip: { x: box.x, y: box.y, width: box.w, height: box.h }, animations: 'disabled', timeout: 120000 });
  console.log('saved(disabled)', OUT);
} catch (e) {
  console.log('SHOT-ERR', e.message.slice(0, 300));
}
// 2) chụp KHÔNG animations option
try {
  await p.screenshot({ path: OUT.replace(/\.png$/, '_anim.png'), clip: { x: box.x, y: box.y, width: box.w, height: box.h }, timeout: 120000 });
  console.log('saved(allow-anim)', OUT.replace(/\.png$/, '_anim.png'));
} catch (e) {
  console.log('SHOT-ERR2', e.message.slice(0, 300));
}
await b.close();

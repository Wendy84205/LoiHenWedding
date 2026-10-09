// Fidelity audit: capture local vs cinelove reference screenshots for every
// numeric template into artifacts/fidelity-report/thiep-cuoi-NN/{local,ref}.png
// Usage: node scripts/_fidelity_audit.mjs [id1,id2,...]
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const OUT = path.join(ROOT, 'artifacts/fidelity-report');

const ids = fs.readdirSync(path.join(ROOT, 'src/templates/new'))
  .map((f) => /^Template(\d+)New\.jsx$/.exec(f)?.[1])
  .filter(Boolean).map(Number).sort((a, b) => a - b);
const only = process.argv[2] ? process.argv[2].split(',').map(Number) : ids;

const forceVisible = (rootSel) => {
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
  // intro gate (nếu có): bấm nút mở thiệp
  const re = /xem thiệp|mở thiệp|xem thiệp cưới|get started|nhận thiệp/i;
  const gate = [...document.querySelectorAll('button,a,div,span')]
    .find((el) => re.test((el.textContent || '').trim()) && el.offsetParent !== null
      && (el.textContent || '').trim().length < 40);
  if (gate) gate.click();
  return true;
};

const b = await chromium.launch();
fs.mkdirSync(OUT, { recursive: true });
const results = [];

// Chụp theo vùng clip. Lưu ý: clip bị clamp theo viewport, nên phải resize
// viewport = chiều cao nội dung trước khi chụp.
async function shotRegion(p, sel, outPath) {
  const measure = () => p.evaluate((s) => {
    const el = s ? document.querySelector(s) : null;
    const r = (el || document.body).getBoundingClientRect();
    const sc = document.scrollingElement;
    return { x: r.x + (window.scrollX || sc.scrollLeft), y: r.y + (window.scrollY || sc.scrollTop), w: r.width, h: r.height };
  }, sel);
  let box = await measure();
  const vh = Math.min(Math.ceil(box.h) + 2, 16000);
  if (Math.abs(vh - 1000) > 2) {
    await p.setViewportSize({ width: 500, height: vh });
    await p.waitForTimeout(1000);
    box = await measure();
    await p.waitForTimeout(400);
  }
  // overlay intro che kín (thường xuất hiện muộn): bấm giữa, vẫn còn thì ẩn
  await p.evaluate(async (rootSel) => {
    const root = document.querySelector(rootSel) || document.body;
    const isCover = (el) => {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return false;
      if (cs.position !== 'absolute' && cs.position !== 'fixed') return false;
      const z = Number(cs.zIndex);
      if (!(z >= 30)) return false;
      const m = cs.backgroundColor.match(/rgba?\(([^)]+)\)/);
      if (!m) return false;
      const parts = m[1].split(',').map((x) => parseFloat(x));
      if (parts.length > 3 && parts[3] < 0.9) return false;
      const r = el.getBoundingClientRect();
      return r.width > 300 && r.height > 300
        && r.width >= window.innerWidth * 0.9 && r.height >= window.innerHeight * 0.9;
    };
    const ov = [...document.querySelectorAll('div,section,main')].find(isCover);
    if (ov) {
      try { ov.click(); } catch { /* noop */ }
      await new Promise((r) => setTimeout(r, 700));
      if (isCover(ov)) ov.style.setProperty('display', 'none', 'important');
    }
    // gate text lần cuối (phòng overlay có nút bấm) — chỉ bấm phần tử nổi (z>=20) hoặc button/a
    const re = /xem thiệp|mở thiệp|mở thư|xem thư|get started|nhận thiệp|nhấn để mở|bấm để mở/i;
    const gate = [...document.querySelectorAll('button,a,div,span')]
      .find((el) => {
        const t = (el.textContent || '').trim();
        if (!re.test(t) || t.length >= 40 || el.offsetParent === null) return false;
        if (el.tagName === 'BUTTON' || el.tagName === 'A') return true;
        return Number(getComputedStyle(el).zIndex) >= 20;
      });
    if (gate) gate.click();
    await new Promise((r) => setTimeout(r, 400));
    if (root) {
      const r0 = root.getBoundingClientRect();
      if (r0.top < -1 && Math.abs(r0.top) < 2000) root.scrollIntoView();
    }
  }, sel);
  box = await measure();
  await p.screenshot({ path: outPath, clip: { x: box.x, y: box.y, width: box.w, height: box.h }, animations: 'disabled', timeout: 120000 });
  return box;
}


for (const id of only) {
  const dir = path.join(OUT, `thiep-cuoi-${id}`);
  fs.mkdirSync(dir, { recursive: true });
  const meta = { id, local: null, ref: null, errors: [] };
  const slug = `thiep-cuoi-${id}`;

  // ---------- local ----------
  try {
    const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    const resp = await p.goto(`http://localhost:5173/template/${slug}`, { waitUntil: 'load', timeout: 60000 });
    meta.localStatus = resp?.status();
    await p.waitForTimeout(2500);
    await p.evaluate(async () => {
      const h = document.documentElement.scrollHeight;
      for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 800));
    });
    await p.evaluate(forceVisible, '[class$="-canvas"]');
    await p.waitForTimeout(300);
    // Google Map iframe load async -> chờ frame điều hướng sang maps.google
    // rồi thêm thời gian cho tile vẽ xong trước khi chụp.
    if (await p.locator('iframe[src*="maps.google"]').count()) {
      const t0 = Date.now();
      while (Date.now() - t0 < 15000) {
        if (p.frames().some((f) => f.url().includes('maps.google'))) break;
        await p.waitForTimeout(400);
      }
      await p.waitForTimeout(4000);
    }
    const hasCanvas = await p.locator('[class$="-canvas"]').count();
    meta.localBox = await shotRegion(p, hasCanvas ? '[class$="-canvas"]' : null, path.join(dir, 'local.png'));
    meta.local = hasCanvas ? 'canvas' : 'body';
    meta.localHeight = await p.evaluate(() => document.documentElement.scrollHeight);
    await p.close();
  } catch (e) { meta.errors.push(`local: ${e.message.split('\n')[0]}`); }

  // ---------- ref ----------
  try {
    const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    const resp = await p.goto(`https://cinelove.me/template/${slug}`, { waitUntil: 'load', timeout: 90000 });
    meta.refStatus = resp?.status();
    if (meta.refStatus && meta.refStatus < 400) {
      await p.waitForTimeout(7000);
      meta.refScroller = await p.evaluate(async () => {
        const c = document.querySelector('#root-page-container');
        let sc = null;
        document.querySelectorAll('*').forEach((el) => {
          const cs = getComputedStyle(el);
          if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 200) {
            if (c && c.contains(el)) return;
            if (!sc || el.scrollHeight > sc.scrollHeight) sc = el;
          }
        });
        if (!sc) return { found: false };
        const h = sc.scrollHeight;
        for (let y = 0; y < h; y += 400) { sc.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
        sc.scrollTo(0, 0);
        // chờ ảnh nền (lazy mount + load) hoàn tất sau khi đã cuộn toàn trang
        await new Promise((r) => setTimeout(r, 2500));
        return { found: true, sh: h };
      });
      await p.evaluate(forceVisible, '#root-page-container');
      await p.waitForTimeout(300);
      meta.refBox = await shotRegion(p, '#root-page-container', path.join(dir, 'ref.png'));
      meta.ref = 'root-page-container';
      meta.refHeight = await p.evaluate(() => document.querySelector('#root-page-container')?.scrollHeight || document.documentElement.scrollHeight);
    }
    await p.close();
  } catch (e) { meta.errors.push(`ref: ${e.message.split('\n')[0]}`); }

  fs.writeFileSync(path.join(dir, 'meta.json'), JSON.stringify(meta, null, 2));
  results.push(meta);
  console.log(`[${only.indexOf(id) + 1}/${only.length}] ${slug} local=${meta.localStatus || '-'} ref=${meta.refStatus || '-'} lh=${meta.localHeight || '-'} rh=${meta.refHeight || '-'} ${meta.errors.length ? 'ERR: ' + meta.errors.join(' | ') : ''}`);
}

fs.writeFileSync(path.join(OUT, 'summary.json'), JSON.stringify(results, null, 2));
await b.close();
console.log('DONE', results.length);



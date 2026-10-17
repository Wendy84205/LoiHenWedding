import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'fs';

const OUT = '/tmp/t63_shots';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 500, height: 900 }, deviceScaleFactor: 2 });

try {
  await page.goto('https://cinelove.me/template/thiep-cuoi-63', { waitUntil: 'networkidle', timeout: 90000 });
  await page.waitForTimeout(4000);
  const btn = page.locator('button:has-text("Mở thiệp")');
  if (await btn.count()) { await btn.first().click(); await page.waitForTimeout(3500); }

  // find the scrollable element (page may scroll inside a container)
  const scrollInfo = await page.evaluate(() => {
    const find = () => {
      const els = Array.from(document.querySelectorAll('div,main,section'));
      for (const el of els) {
        const st = getComputedStyle(el);
        if (/(auto|scroll)/.test(st.overflowY) && el.scrollHeight > el.clientHeight + 100) return el;
      }
      return null;
    };
    const el = find();
    if (el) { el.scrollTop = 0; return { tag: el.tagName, cls: el.className.slice(0, 60), h: el.scrollHeight, client: el.clientHeight }; }
    return { tag: 'WINDOW', h: document.documentElement.scrollHeight, client: innerHeight };
  });
  console.log('scrollable:', JSON.stringify(scrollInfo));

  const total = scrollInfo.h;
  const steps = Math.ceil(total / 800);
  for (let i = 0; i < steps; i++) {
    await page.evaluate((y) => {
      const els = Array.from(document.querySelectorAll('div,main,section'));
      const el = els.find((e) => { const st = getComputedStyle(e); return /(auto|scroll)/.test(st.overflowY) && e.scrollHeight > e.clientHeight + 100; });
      if (el) el.scrollTop = y; else window.scrollTo(0, y);
    }, i * 800);
    await page.waitForTimeout(1600);
    await page.screenshot({ path: `${OUT}/live-s${String(i).padStart(2, '0')}.png` });
  }
  console.log('screenshots:', steps);

  // reset scroll to top before measuring geometry
  await page.evaluate(() => {
    document.querySelectorAll('div,main,section').forEach((e) => { const st = getComputedStyle(e); if (/(auto|scroll)/.test(st.overflowY)) e.scrollTop = 0; });
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);

  // extract full geometry: every div/img with position info + image url + text
  const data = await page.evaluate(() => {
    const root = document.querySelector('.root-page-container') || document.body;
    const rb = root.getBoundingClientRect();
    const items = [];
    root.querySelectorAll('div,img').forEach((el) => {
      const st = getComputedStyle(el);
      if (st.position !== 'absolute') return;
      const r = el.getBoundingClientRect();
      const bg = st.backgroundImage && st.backgroundImage !== 'none' ? st.backgroundImage : null;
      const src = el.tagName === 'IMG' ? el.currentSrc || el.src : null;
      const text = el.childElementCount === 0 ? (el.textContent || '').trim().slice(0, 80) : '';
      if (!bg && !src && !text) return;
      items.push({
        top: +(r.top - rb.top).toFixed(1), left: +(r.left - rb.left).toFixed(1),
        w: +r.width.toFixed(1), h: +r.height.toFixed(1),
        z: st.zIndex, tr: st.transform === 'none' ? '' : st.transform,
        bg: bg ? bg.replace(/^url\(["']?/, '').replace(/["']?\)$/, '').split('/').pop().slice(0, 70) : undefined,
        src: src ? src.split('/').pop().slice(0, 70) : undefined,
        text: text || undefined,
      });
    });
    return items.sort((a, b) => a.top - b.top);
  });
  writeFileSync('/tmp/t63_live_geom.json', JSON.stringify(data, null, 1));
  console.log('geom items:', data.length);
} catch (err) {
  console.error('ERROR:', err.message);
} finally {
  await browser.close();
}

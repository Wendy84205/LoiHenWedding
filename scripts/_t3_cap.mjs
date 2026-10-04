import { chromium } from 'playwright';
const mode = process.argv[2]; // 'local' | 'ref'
const prefix = mode === 'local' ? '/tmp/t3l_' : '/tmp/t3r_';
const url = mode === 'local' ? 'http://127.0.0.1:5173/template/thiep-cuoi-3' : 'https://cinelove.me/template/thiep-cuoi-3';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 500, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 180000 });
await page.waitForTimeout(mode === 'local' ? 3000 : 12000);

const getScroller = () => page.evaluate((isLocal) => {
  if (isLocal) {
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    return { kind: 'window' };
  }
  let best = null;
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 50) {
      if (!best || el.scrollHeight > best.sh) best = { el, sh: el.scrollHeight };
    }
  });
  if (best) { best.el.style.scrollBehavior = 'auto'; best.el.setAttribute('data-capsel', '1'); }
  return best ? { kind: 'el', sh: best.sh } : null;
}, mode === 'local');

const sc = await getScroller();
console.log('scroller', JSON.stringify(sc));
const total = sc && sc.kind === 'el' ? sc.sh : 11900;

// pre-pass: scroll through everything to trigger reveals / lazy loads
await page.evaluate(async ({ kind, total: t }) => {
  const doScroll = (y) => (kind === 'window' ? window.scrollTo(0, y) : document.querySelector('[data-capsel]').scrollTo(0, y));
  for (let y = 0; y < t; y += 450) { doScroll(y); await new Promise((r) => setTimeout(r, 120)); }
  doScroll(0);
}, { kind: sc ? sc.kind : 'window', total });
await page.waitForTimeout(3000);

// kill any remaining inline transforms (reveals) so captures show settled state
await page.evaluate(() => {
  const reset = () => document.querySelectorAll('[style*="translate"]').forEach((el) => { el.style.transform = 'none'; el.style.opacity = '1'; });
  reset();
  window.__t3reset = setInterval(reset, 400);
});

const positions = {};
for (let y = 0; y <= 11050; y += 850) {
  const maxScroll = await page.evaluate((kind) => (kind === 'window' ? document.documentElement.scrollHeight - window.innerHeight : document.querySelector('[data-capsel]').scrollHeight - document.querySelector('[data-capsel]').clientHeight), sc ? sc.kind : 'window');
  const want = Math.min(y, maxScroll);
  for (let attempt = 0; attempt < 5; attempt++) {
    await page.evaluate(({ kind, yy }) => {
      if (kind === 'window') window.scrollTo(0, yy);
      else document.querySelector('[data-capsel]').scrollTo(0, yy);
    }, { kind: sc ? sc.kind : 'window', yy: want });
    await page.waitForTimeout(300);
    const actual = await page.evaluate((kind) => (kind === 'window' ? window.scrollY : document.querySelector('[data-capsel]').scrollTop), sc ? sc.kind : 'window');
    if (Math.abs(actual - want) <= 2) break;
    if (attempt === 4) console.log(`WARN target=${want} actual=${actual}`);
  }
  positions[String(y).padStart(5, '0')] = await page.evaluate((kind) => (kind === 'window' ? window.scrollY : document.querySelector('[data-capsel]').scrollTop), sc ? sc.kind : 'window');
  await page.waitForTimeout(mode === 'local' ? 400 : 1200);
  await page.screenshot({ path: `${prefix}${String(y).padStart(5, '0')}.png` });
}
console.log('POSITIONS ' + JSON.stringify(positions));
await browser.close();

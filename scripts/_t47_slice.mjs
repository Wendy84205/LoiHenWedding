import { chromium } from 'playwright';
const forceVisible = () => {
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    if (parseFloat(cs.opacity) < 1) el.style.opacity = '1';
    const st = el.getAttribute('style') || '';
    if (st.includes('translate') || st.includes('opacity: 0')) { el.style.transform = 'none'; el.style.opacity = '1'; }
  });
};
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, reducedMotion: 'reduce' });
await p.goto('http://127.0.0.1:5173/template/thiep-cuoi-47', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(2000);
await p.evaluate(async () => {
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
  window.scrollTo(0, 0);
});
await p.evaluate(forceVisible);
await p.waitForTimeout(500);
const d = await p.evaluate(() => {
  const sel = ['.t47-cover', '.t47-family', '.t47-invitation', '.t47-ceremony', '.t47-calendar', '.t47-story', '.t47-loveyou', '.t47-rsvp', '.t47-gift', '.t47-album', '.t47-final'];
  return sel.map((s) => { const el = document.querySelector(s); const r = el.getBoundingClientRect(); return { s, top: Math.round(r.top + window.scrollY), h: Math.round(r.height) }; });
});
console.log(JSON.stringify(d));
await b.close();

import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, reducedMotion: 'reduce' });
await p.goto('http://127.0.0.1:5173/template/thiep-cuoi-47', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(2000);
const secs = await p.evaluate(() => {
  const root = document.querySelector('main.template47') || document.body;
  const rootTop = root.getBoundingClientRect().top + window.scrollY;
  return [...root.querySelectorAll(':scope > section, :scope > div')].map((el) => {
    const r = el.getBoundingClientRect();
    return { cls: el.className.toString().slice(0,40), top: Math.round(r.top + window.scrollY - rootTop), h: Math.round(r.height) };
  });
});
console.log(JSON.stringify(secs, null, 0));
await b.close();

import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, reducedMotion: 'reduce' });
p.on('pageerror', (e) => console.log('PAGEERROR', String(e).slice(0, 300)));
await p.goto('http://localhost:5173/template/thiep-cuoi-22', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(2500);
const info = await p.evaluate(() => {
  const out = {};
  const box = (el) => { const r = el.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y + window.scrollY), w: Math.round(r.width), h: Math.round(r.height) }; };
  const form = document.querySelector('.t22n-rsvpBox') || document.querySelector('.ni-rsvp');
  out.form = form ? { ...box(form), cs: (() => { const c = getComputedStyle(form); return { position: c.position, top: c.top, gap: c.gap, padding: c.padding }; })() } : null;
  const canvas = document.querySelector('.t22n-canvas');
  out.canvas = canvas ? box(canvas) : null;
  const btn = document.querySelector('button.t22n-music');
  out.music = btn ? { ...box(btn), pos: getComputedStyle(btn).position } : null;
  if (form) {
    out.children = [...form.children].slice(0, 14).map((el) => ({ tag: el.tagName, cls: String(el.className).slice(0, 36), ...box(el), gap: getComputedStyle(el).gap }));
    const submit = form.querySelector('button');
    if (submit) out.submit = { ...box(submit), minH: getComputedStyle(submit).minHeight, fs: getComputedStyle(submit).fontSize, fw: getComputedStyle(submit).fontWeight };
  }
  const rv = document.querySelector('.t22n-rsvp');
  out.rsvpNode = rv ? box(rv) : null;
  return out;
});
console.log(JSON.stringify(info, null, 1));
await b.close();

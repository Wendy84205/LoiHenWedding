import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, reducedMotion: 'reduce' });
p.on('console', (m) => console.log('CONSOLE', m.type(), m.text().slice(0, 200)));
p.on('pageerror', (e) => console.log('PAGEERROR', String(e).slice(0, 300)));
const resp = await p.goto('http://localhost:5173/template/thiep-cuoi-22', { waitUntil: 'load', timeout: 60000 });
console.log('status', resp.status());
await p.waitForTimeout(2500);
const info = await p.evaluate(() => {
  const out = {};
  const btn = document.querySelector('button.t22n-music, button.ni-music');
  out.btnCount = document.querySelectorAll('button').length;
  if (btn) {
    const r = btn.getBoundingClientRect();
    const cs = getComputedStyle(btn);
    out.btn = { x: r.x, y: r.y, w: r.width, h: r.height, display: cs.display, position: cs.position, opacity: cs.opacity, visibility: cs.visibility, zIndex: cs.zIndex, html: btn.outerHTML.slice(0, 150) };
  } else out.btn = null;
  const audio = document.querySelector('audio[data-wedding-music]');
  out.audio = audio ? audio.getAttribute('src') : null;
  out.docH = document.documentElement.scrollHeight;
  const nodes = document.querySelectorAll('.t22n-node');
  out.nodeCount = nodes.length;
  // text 'Do cô'?
  out.docodau = [...document.querySelectorAll('*')].some((el) => (el.childNodes.length && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.includes('Do cô dâu'))));
  return out;
});
console.log(JSON.stringify(info, null, 1));
await b.close();

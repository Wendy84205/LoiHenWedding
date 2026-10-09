import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 } });
await p.goto('https://cinelove.me/template/thiep-cuoi-27', { waitUntil: 'load', timeout: 120000 });
await p.waitForTimeout(7000);
const info = await p.evaluate(async () => {
  const sc = document.querySelector('[class*=customScroll]');
  if (sc) { for (let y = 0; y < sc.scrollHeight; y += 600) { sc.scrollTop = y; await new Promise((r) => setTimeout(r, 40)); } sc.scrollTop = 0; }
  await new Promise((r) => setTimeout(r, 800));
  const iframes = [...document.querySelectorAll('iframe')].map((f) => {
    const r = f.getBoundingClientRect();
    return { src: (f.getAttribute('src') || '').slice(0, 160), rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)], parentId: (f.closest('div[data-node-id]') || {}).dataset?.nodeId || null };
  });
  const heads = [...document.querySelectorAll('h3')].map((h) => h.textContent).slice(0, 20);
  const bodyHead = document.body.innerText.slice(0, 1500);
  return { iframes, heads, bodyHead };
});
console.log(JSON.stringify(info, null, 1));
await b.close();

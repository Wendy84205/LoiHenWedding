import { chromium } from 'playwright';
const ids = ['KW2IhOcqS-', '9o4PVEtwt8', '0Bqpg5B6Iv', '-uqxMyuesN', 'GbIqFjPoez', '1vZ2mzHSNO', '9dFeiTjtMD', '3c0HlKcb6Z', '8dZuhx3iOm', 'hQJwiB84FE', 'pcK9YyLtN7', '50_sY5_2X8', 'dR1yjcCqy1', 'IVNQdjGNIt', '5W149ucdOf', 'CL0ygcp7iH', 'nFd9fvuhZU', 'xS5uZJ9yBt', 'VxD8KK04wh', '22PDlnh2Mo', 'YV1_D_letr', 'Kty-fBWHSU', 'cGt4xFOjgu', '1faee750'];
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 900, height: 1000 } })).newPage();
await page.goto('https://cinelove.me/template/thiep-cuoi-46', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(5000);
const res = await page.evaluate((list) => {
  const out = {};
  for (const id of list) {
    let el = document.querySelector(`[data-node-id="${id}"]`);
    if (!el && id === '1faee750') el = [...document.querySelectorAll('div')].find((n) => (getComputedStyle(n).backgroundImage || '').includes('1faee750'));
    if (!el) { out[id] = 'missing'; continue; }
    const found = [];
    const walk = (n, depth) => {
      if (depth > 6 || found.length > 6) return;
      const cs = getComputedStyle(n);
      const r = n.getBoundingClientRect();
      const rec = {};
      if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') rec.bg = cs.backgroundColor;
      if (cs.backgroundImage && cs.backgroundImage !== 'none') rec.bgi = cs.backgroundImage.slice(0, 140);
      if (cs.borderTopWidth !== '0px' || cs.borderLeftWidth !== '0px') rec.border = `${cs.borderTopWidth} ${cs.borderTopColor} / ${cs.borderLeftWidth} ${cs.borderLeftColor}`;
      if (cs.borderRadius && cs.borderRadius !== '0px') rec.radius = cs.borderRadius;
      if (cs.boxShadow && cs.boxShadow !== 'none') rec.shadow = cs.boxShadow.slice(0, 90);
      if (cs.opacity !== '1') rec.op = cs.opacity;
      if (cs.webkitMaskImage && cs.webkitMaskImage !== 'none') rec.mask = cs.webkitMaskImage.slice(0, 100);
      if (Object.keys(rec).length) found.push({ ...rec, w: Math.round(r.width), h: Math.round(r.height), tag: n.tagName });
      for (const c of n.children) walk(c, depth + 1);
    };
    walk(el, 0);
    out[id] = found;
  }
  return out;
}, ids);
console.log(JSON.stringify(res, null, 1));
await browser.close();

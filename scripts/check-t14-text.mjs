import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await p.goto('http://127.0.0.1:5173/template/thiep-cuoi-14', { waitUntil: 'load' });
await p.waitForTimeout(4000);
const res = await p.evaluate(() => {
  const out = [];
  document.querySelectorAll('.t14n-textwrap p').forEach((el) => {
    const t = el.textContent;
    if (t.includes('Anh yêu em')) {
      const wrap = el.closest('.t14n-node');
      const wr = wrap.getBoundingClientRect();
      const rr = el.getBoundingClientRect();
      out.push({
        text: t.slice(0, 70),
        nodeStyleTransform: wrap.style.transform || '(none)',
        nodeComputedTransform: getComputedStyle(wrap).transform,
        nodeRect: [Math.round(wr.left), Math.round(wr.top + scrollY), Math.round(wr.width), Math.round(wr.height)],
        pRect: [Math.round(rr.left), Math.round(rr.top + scrollY), Math.round(rr.width), Math.round(rr.height)],
        rectCount: el.getClientRects().length,
        scrollW: el.scrollWidth,
        clientW: el.clientWidth,
        font: getComputedStyle(el).font,
        color: getComputedStyle(el).color,
        overflow: getComputedStyle(el.parentElement.parentElement).overflow,
      });
    }
  });
  return { docW: document.documentElement.scrollWidth, items: out };
});
console.log(JSON.stringify(res, null, 1));
await b.close();

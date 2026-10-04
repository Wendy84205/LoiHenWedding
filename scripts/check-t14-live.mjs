import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 900 }, deviceScaleFactor: 1 });
await p.goto('http://127.0.0.1:5173/template/thiep-cuoi-14', { waitUntil: 'load' });
await p.waitForTimeout(3000);

const targets = ['Anh yêu em'];
for (const t of targets) {
  // scroll so the text is inside viewport, triggering reveal
  await p.evaluate((text) => {
    const els = [...document.querySelectorAll('.t14n-textwrap p')];
    const el = els.find((e) => e.textContent.includes(text));
    if (el) el.closest('.t14n-node')?.scrollIntoView({ block: 'center' });
  }, t);
  await p.waitForTimeout(2500);
  const info = await p.evaluate((text) => {
    const els = [...document.querySelectorAll('.t14n-textwrap p')];
    const el = els.find((e) => e.textContent.includes(text));
    if (!el) return { missing: true };
    const node = el.closest('.t14n-node');
    const r = node.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    return {
      text: el.textContent.slice(0, 40),
      nodeInlineStyle: node.getAttribute('style'),
      nodeComputedTransform: getComputedStyle(node).transform,
      nodeRectX: Math.round(r.left), nodeRectRight: Math.round(r.right),
      nodeRectW: Math.round(r.width), nodeRectH: Math.round(r.height),
      pRectX: Math.round(er.left), pRectRight: Math.round(er.right),
      pLines: el.getClientRects().length,
      pScrollW: el.scrollWidth, pClientW: el.clientWidth,
      pOverflowVisible: getComputedStyle(el).overflow,
      docW: document.documentElement.scrollWidth,
      font: getComputedStyle(el).font,
      weight: getComputedStyle(el).fontWeight,
    };
  }, t);
  console.log('=== ' + t);
  console.log(JSON.stringify(info, null, 1));
}
await b.close();

import { chromium } from 'playwright';

const browser = await chromium.launch();
for (const [label, url, sel] of [
  ['t10', 'http://127.0.0.1:5173/template/thiep-cuoi-10', '.t10n'],
  ['t16', 'http://127.0.0.1:5173/template/thiep-cuoi-16', '.t16n'],
]) {
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  const info = await page.evaluate((s) => {
    const el = document.querySelector(s);
    const out = [];
    let p = el;
    while (p && out.length < 6) {
      const c = getComputedStyle(p);
      const r = p.getBoundingClientRect();
      out.push({
        node: `${p.tagName}${p.id ? '#' + p.id : ''}${p.className ? '.' + (p.className || '').toString().replace(/\s+/g, '.').slice(0, 60) : ''}`,
        rect: [Math.round(r.left), Math.round(r.width)],
        width: c.width,
        maxWidth: c.maxWidth,
        display: c.display,
        margin: c.margin,
        alignSelf: c.alignSelf,
        justifyContent: c.justifyContent,
      });
      p = p.parentElement;
    }
    const main = document.querySelector(s);
    const mcs = getComputedStyle(main);
    return { chain: out, mainWidth: mcs.width, mainMaxW: mcs.maxWidth, mainDisplay: mcs.display };
  }, sel);
  console.log('===', label);
  console.log('   main width', info.mainWidth, 'maxW', info.mainMaxW, 'display', info.mainDisplay);
  info.chain.forEach((c) => console.log('  ', c.node, 'rect', JSON.stringify(c.rect), 'w', c.width, 'maxW', c.maxWidth, 'disp', c.display, 'margin', c.margin));
  await page.close();
}
await browser.close();
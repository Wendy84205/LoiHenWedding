import { chromium } from 'playwright';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1 });
await p.goto('https://cinelove.me/template/thiep-cuoi-27', { waitUntil: 'domcontentloaded', timeout: 180000 });
await p.waitForTimeout(8000);

const info = await p.evaluate(() => {
  const el = document.querySelector('div[data-node-id]');
  const chain = [];
  let cur = el;
  while (cur && cur !== document.documentElement) {
    const cs = getComputedStyle(cur);
    const r = cur.getBoundingClientRect();
    chain.push({
      tag: cur.tagName,
      cls: (cur.getAttribute('class') || '').slice(0, 70),
      id: cur.id,
      rect: [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)],
      pos: cs.position,
      w: cs.width, h: cs.height,
      bg: cs.backgroundColor, bgImage: cs.backgroundImage === 'none' ? null : cs.backgroundImage.slice(0, 80),
      overflow: cs.overflowY, transform: cs.transform,
      borderLeft: cs.borderLeftWidth, boxShadow: cs.boxShadow.slice(0, 50),
    });
    cur = cur.parentElement;
  }
  const scroller = document.querySelector('[class*="customScroll"]');
  const cs2 = scroller ? getComputedStyle(scroller) : null;
  return {
    chain,
    docChrome: [...document.querySelectorAll('body > *')].map((x) => ({ tag: x.tagName, id: x.id, cls: (x.getAttribute('class') || '').slice(0, 60) })),
    scrollH: document.documentElement.scrollHeight,
    bodyW: document.body.getBoundingClientRect().width,
    htmlBg: getComputedStyle(document.documentElement).backgroundColor,
    bodyBg: getComputedStyle(document.body).backgroundColor,
    bodyBgImage: getComputedStyle(document.body).backgroundImage === 'none' ? null : getComputedStyle(document.body).backgroundImage.slice(0, 120),
    scrollerCls: cs2 ? cs2.backgroundColor : null,
  };
});
console.log(JSON.stringify(info, null, 1));
await b.close();

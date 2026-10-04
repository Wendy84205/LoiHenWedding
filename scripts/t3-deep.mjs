import { chromium } from 'playwright';
import fs from 'node:fs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 500, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await page.goto('https://cinelove.me/template/thiep-cuoi-3', { waitUntil: 'domcontentloaded', timeout: 180000 });
await page.waitForTimeout(12000);
// slow scroll to load lazy bgs
await page.evaluate(async () => {
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); }
  window.scrollTo(0, 0);
});
await page.waitForTimeout(2500);

const data = await page.evaluate(() => {
  const root = document.querySelector('#root-page-container');
  const cr = root.getBoundingClientRect();
  const nodes = [...root.querySelectorAll('div[data-node-id]')];
  return nodes.map((el) => {
    const r = el.getBoundingClientRect();
    const inner = el.querySelector(':scope > div');
    const bgOf = (e) => {
      const c = getComputedStyle(e);
      return { bg: c.backgroundColor, img: c.backgroundImage === 'none' ? null : c.backgroundImage.slice(0, 600), size: c.backgroundSize, pos: c.backgroundPosition, repeat: c.backgroundRepeat, mask: (c.maskImage && c.maskImage !== 'none' ? c.maskImage.slice(0,400) : null) || (c.webkitMaskImage && c.webkitMaskImage !== 'none' ? c.webkitMaskImage.slice(0,400) : null), radius: c.borderRadius, op: c.opacity };
    };
    // find descendant divs with bg images
    const bgKids = [...el.querySelectorAll('div')].map(bgOf).filter(b => b.img).slice(0, 4);
    const txt = el.textContent.trim().slice(0, 80).replace(/\s+/g, ' ');
    return { id: el.dataset.nodeId, rect: [+(r.left - cr.left).toFixed(0), +(r.top - cr.top).toFixed(0), +r.width.toFixed(0), +r.height.toFixed(0)], self: bgOf(el), inner: inner ? bgOf(inner) : null, kids: bgKids, text: txt };
  });
});
fs.writeFileSync('/tmp/t3_bg.json', JSON.stringify(data, null, 1));
console.log('nodes', data.length);
const withBg = data.filter(n => (n.self && n.self.img) || (n.inner && n.inner.img) || n.kids.length);
console.log('withBg', withBg.length);
for (const n of withBg) {
  console.log(`y=${n.rect[1]} ${n.rect[2]}x${n.rect[3]} id=${n.id} txt=${n.text.slice(0,50)}`);
  if (n.self.img) console.log('   self:', n.self.img.slice(0, 300));
  if (n.inner.img) console.log('   inner:', n.inner.img.slice(0, 300));
  for (const k of n.kids) console.log('   kid:', k.img.slice(0, 300), '| mask:', (k.mask||'').slice(0,120));
}
// tiled screenshots every 850px
const total = await page.evaluate(() => document.querySelector('#root-page-container').getBoundingClientRect().height);
console.log('total height', total);
for (let y = 0; y < total; y += 850) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(700);
  await page.screenshot({ path: `/tmp/t3sec_${String(y).padStart(5, '0')}.png` });
  console.log('shot', y);
}
await browser.close();

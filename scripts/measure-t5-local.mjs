import { chromium } from 'playwright';
import fs from 'node:fs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await page.goto('http://127.0.0.1:5173/template/thiep-cuoi-5', { waitUntil: 'networkidle' });
await page.waitForTimeout(3500);

const info = await page.evaluate(() => {
  const canvas = document.querySelector('.t5n-canvas');
  const cr = canvas.getBoundingClientRect();
  // node map có class riêng, không thuộc danh sách 61 node của bản gốc
  const nodes = [...canvas.querySelectorAll('.t5n-node:not(.t5n-map)')].map((el) => {
    const r = el.getBoundingClientRect();
    const wrap = el.querySelector('.t5n-textwrap');
    const cs = wrap ? getComputedStyle(wrap) : null;
    return {
      top: +(r.top - cr.top).toFixed(2),
      left: +(r.left - cr.left).toFixed(2),
      w: +r.width.toFixed(2),
      h: +r.height.toFixed(2),
      fs: cs ? cs.fontSize : null,
      color: cs ? cs.color : null,
      ff: cs ? cs.fontFamily : null,
      lh: cs ? cs.lineHeight : null,
      ls: cs ? cs.letterSpacing : null,
      ta: cs ? cs.textAlign : null,
      text: wrap ? wrap.textContent.slice(0, 40) : null,
    };
  });
  return { canvas: { w: cr.width, h: cr.height }, nodes };
});

const order = JSON.parse(fs.readFileSync('/tmp/t5_nodes_final.json', 'utf8'));
info.nodes.forEach((n, i) => { n.origId = order[i] ? order[i].id : '?'; });

fs.writeFileSync('/tmp/t5_local_measure.json', JSON.stringify(info, null, 1));
console.log('canvas', JSON.stringify(info.canvas), 'nodes', info.nodes.length);
await browser.close();
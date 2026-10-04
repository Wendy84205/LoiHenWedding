import { chromium } from 'playwright';
import fs from 'node:fs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1200 }, deviceScaleFactor: 1 });
await page.goto('https://cinelove.me/template/thiep-cuoi-5', { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.waitForTimeout(15000);

const svgs = await page.evaluate(() => {
  const root = document.querySelector('#root-page-container');
  const out = {};
  for (const el of root.querySelectorAll('[data-node-id]')) {
    if (!el.querySelector(':scope > div > div > svg, :scope > div > div > div > svg')) continue;
    const r = el.getBoundingClientRect();
    const sv = el.querySelector('svg');
    out[el.dataset.nodeId] = {
      box: [+(r.left - root.getBoundingClientRect().left).toFixed(2), +(r.top - root.getBoundingClientRect().top).toFixed(2), +r.width.toFixed(2), +r.height.toFixed(2)],
      html: sv ? sv.outerHTML : null,
    };
  }
  return out;
});

fs.writeFileSync('/tmp/t5_svgs.json', JSON.stringify(svgs, null, 1));
console.log(Object.keys(svgs).join(' '));
for (const [k, v] of Object.entries(svgs)) console.log(k, JSON.stringify(v.box), (v.html || '').length);
await browser.close();

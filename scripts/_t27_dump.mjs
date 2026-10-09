import fs from 'node:fs';
import { chromium } from 'playwright';

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1 });
await p.goto('https://cinelove.me/template/thiep-cuoi-27', { waitUntil: 'domcontentloaded', timeout: 180000 });
await p.waitForTimeout(9000);
await p.evaluate(async () => {
  const step = 600;
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += step) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); }
  window.scrollTo(0, 0);
});
await p.waitForTimeout(1200);

const out = await p.evaluate(() => {
  const pick = (id) => document.querySelector(`#root-page-container div[data-node-id="${id}"]`);
  const grab = (id) => {
    const el = pick(id);
    if (!el) return null;
    return el.outerHTML;
  };
  const ids = ['WiLJA5c1zk', 'DFEQchcIf9', 'eHZVVUM7qX', 'FZh7ThzHCR', 'Iq7T0OLmp7'];
  const res = {};
  ids.forEach((id) => { res[id] = grab(id); });

  // CSS rules matching selectors inside calendar/countdown/rsvp
  const rules = [];
  for (const sheet of document.styleSheets) {
    let list;
    try { list = sheet.cssRules; } catch { continue; }
    for (const r of list) {
      if (r.cssText) rules.push(r.cssText);
    }
  }
  return { res, rules };
});

fs.writeFileSync('/tmp/t27_widgets.json', JSON.stringify(out.res, null, 1));
fs.writeFileSync('/tmp/t27_pagecss.txt', out.rules.join('\n'));
console.log('widgets', Object.keys(out.res).map((k) => k + '=' + (out.res[k] || '').length).join(' '));
console.log('css rules', out.rules.length, 'chars', out.rules.join('\n').length);
await b.close();

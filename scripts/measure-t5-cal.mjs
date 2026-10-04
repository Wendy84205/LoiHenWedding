import { chromium } from 'playwright';
import fs from 'node:fs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1200 }, deviceScaleFactor: 1 });
await page.goto('https://cinelove.me/template/thiep-cuoi-5', { waitUntil: 'domcontentloaded', timeout: 120000 });
await page.waitForTimeout(15000);

const cal = await page.evaluate(() => {
  const root = document.querySelector('#root-page-container');
  const rr = root.getBoundingClientRect();
  const box = root.querySelector('.calendar');
  if (!box) return { error: 'no calendar' };
  const rel = (el) => {
    const r = el.getBoundingClientRect();
    return [+(r.left - rr.left).toFixed(2), +(r.top - rr.top).toFixed(2), +r.width.toFixed(2), +r.height.toFixed(2)];
  };
  const styleOf = (el, keys) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const o = { box: rel(el) };
    for (const k of keys) o[k] = cs[k];
    return o;
  };
  const K = ['backgroundColor', 'color', 'fontSize', 'fontFamily', 'lineHeight', 'border', 'borderRadius', 'padding', 'margin', 'display', 'gridTemplateColumns', 'height', 'width', 'textAlign', 'letterSpacing'];
  const q = (s) => box.querySelector(s);
  const weeks = [...box.querySelectorAll('.body-week')].map((e) => rel(e));
  const days = [...box.querySelectorAll('.one-body > div:not(.empty):not(.body-year)')].map((e) => rel(e));
  return {
    box: styleOf(box, K),
    one: styleOf(q('.template-one'), K),
    back: styleOf(q('.one-back'), K),
    head: styleOf(q('.one-head'), K),
    body: styleOf(q('.one-body'), K),
    year: styleOf(q('.body-year'), K),
    week0: styleOf(q('.body-week'), K),
    day0: styleOf(q('.one-body > div:not(.empty):not(.body-year)'), K),
    dayInner: styleOf(q('.one-body > div:not(.empty):not(.body-year) > div'), K),
    empty0: styleOf(q('.empty'), K),
    colorF: styleOf(q('.colorF'), K),
    heart: styleOf(q('img.heart-date'), ['width', 'height', 'position', 'top', 'left', 'zIndex']),
    headText: q('.one-head') ? q('.one-head').textContent : null,
    weeks,
    dayCount: days.length,
    days: days.slice(0, 8),
    bodyChildren: box.querySelector('.one-body').children.length,
  };
});

fs.writeFileSync('/tmp/t5_cal.json', JSON.stringify(cal, null, 1));
console.log(JSON.stringify(cal, null, 1));
await browser.close();

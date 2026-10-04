import { chromium } from 'playwright';
import fs from 'node:fs';

const targets = [
  ['local', 'http://127.0.0.1:5173/template/thiep-cuoi-3', 3500],
  ['ref', 'https://cinelove.me/template/thiep-cuoi-3', 12000],
];

const probe = () => {
  const pick = (el) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      cls: (el.className || '').toString().slice(0, 80),
      rect: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)],
      display: cs.display,
      gap: cs.gap,
      flexWrap: cs.flexWrap,
      alignItems: cs.alignItems,
      justifyContent: cs.justifyContent,
      bg: cs.backgroundColor,
      color: cs.color,
      font: cs.fontFamily,
      fs: cs.fontSize,
      fw: cs.fontWeight,
      lh: cs.lineHeight,
      radius: cs.borderRadius,
      border: cs.border,
      pad: cs.padding,
      text: (el.textContent || '').trim().slice(0, 60),
    };
  };

  const out = {};

  // countdown
  const cd = document.querySelector('.countdown') || document.querySelector('[class*="countdown"]');
  out.countdown = pick(cd);
  out.countdownCells = cd ? [...cd.children].map((c) => ({ ...pick(c), inner: (c.textContent || '').trim() })) : [];

  // calendar
  const cal = document.querySelector('.calendar') || document.querySelector('.t3n-cal');
  out.calendarWrap = pick(cal);
  const tt = document.querySelector('.template-three');
  out.templateThree = pick(tt);
  out.calCells = tt ? [...tt.children].slice(0, 8).map(pick) : [];
  const heart = document.querySelector('.heart-date');
  out.heart = pick(heart);
  const day25 = tt ? [...tt.children].find((c) => (c.textContent || '').trim() === '25') : null;
  out.day25 = pick(day25);
  out.day25inner = day25 ? pick(day25.querySelector('div')) : null;

  // map
  const iframe = document.querySelector('iframe[src*="maps.google"]');
  out.mapIframe = pick(iframe);
  out.mapWrap = pick(iframe ? iframe.parentElement : null);
  out.mapOuter = pick(iframe ? iframe.parentElement?.parentElement : null);

  // small fixed/absolute floating widgets (music button etc.)
  out.floats = [...document.querySelectorAll('body *')]
    .filter((el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return (cs.position === 'fixed' || cs.position === 'absolute')
        && r.width > 18 && r.width < 80 && r.height > 18 && r.height < 80
        && r.top < 200 && r.left > 300;
    })
    .slice(0, 6)
    .map((el) => ({ ...pick(el), src: el.querySelector('img')?.getAttribute('src') || null, html: el.outerHTML.slice(0, 260) }));

  // reference/floating chrome (avoid counting huge wrappers)
  out.viewport = [window.innerWidth, window.innerHeight];
  out.docHeight = document.documentElement.scrollHeight;
  return out;
};

const result = {};
for (const [name, url, wait] of targets) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 500, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 180000 });
  await page.waitForTimeout(wait);
  // scroll through to trigger reveals
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 7500);
  });
  await page.waitForTimeout(1500);
  result[name] = await page.evaluate(probe);
  await browser.close();
}

fs.writeFileSync('/tmp/t3_parts.json', JSON.stringify(result, null, 1));
console.log(JSON.stringify(result, null, 1).slice(0, 6000));
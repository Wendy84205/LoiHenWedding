import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 } });
const errors = [];
p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
p.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
await p.goto('file:///Users/wendy/Documents/Thiepcuoi28-10-2026/thiep/index.html', { waitUntil: 'load', timeout: 30000 });
await p.waitForTimeout(1500);
const info = await p.evaluate(() => {
  const txt = (s) => { const el = document.querySelector(s); return el ? (el.textContent || '').trim().slice(0, 40) : 'MISSING'; };
  const imgLoaded = (s) => { const el = document.querySelector(s); return el && el.src ? { hasSrc: true, natural: el.naturalWidth } : { hasSrc: false }; };
  return {
    height: Math.round(document.querySelector('.template47').getBoundingClientRect().height),
    cover: document.querySelector('#cover').style.getPropertyValue('--t47-cover'),
    groom: txt('#c-groom'), bride: txt('#c-bride'),
    familyGroom: txt('#f-groomName'),
    inv1date: txt('#inv1-date'), vqday: txt('#vq-day'), thday: txt('#th-day'),
    calDays: document.querySelectorAll('#cal-grid .t47-calDay').length,
    calMarked: document.querySelectorAll('#cal-grid .t47-calDay.marked').length,
    albumThumbs: document.querySelectorAll('#album-thumbs button').length,
    countdown: txt('#cd-d') + '/' + txt('#cd-h') + '/' + txt('#cd-m') + '/' + txt('#cd-s'),
    coupleImg: imgLoaded('#f-couple'),
    thank: txt('#th-thank'),
  };
});
console.log(JSON.stringify(info, null, 1));
console.log('CONSOLE ERRORS:', errors.length ? errors.join(' | ') : 'none');
await b.close();

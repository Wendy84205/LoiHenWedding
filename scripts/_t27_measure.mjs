import { chromium } from 'playwright';

const url = process.argv[2] || 'http://localhost:5173/template/thiep-cuoi-27';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await p.goto(url, { waitUntil: 'load', timeout: 120000 });
await p.waitForTimeout(4000);

const info = await p.evaluate(() => {
  const canvas = document.querySelector('.t27n-canvas');
  const rect = canvas ? canvas.getBoundingClientRect() : null;
  const bodyCs = getComputedStyle(document.body);
  const root = document.querySelector('#root');
  const photos = [...document.querySelectorAll('.t27n-photo')];
  const photoParents = {};
  photos.forEach((el) => {
    const p2 = el.closest('[data-node-id], .t27n-node, section, footer, div');
    const key = `${el.className}|${(p2 && p2.className) || ''}`;
    photoParents[key] = (photoParents[key] || 0) + 1;
  });
  const noBg = photos.filter((el) => getComputedStyle(el).backgroundImage === 'none');
  return {
    docH: document.documentElement.scrollHeight,
    bodyH: document.body.scrollHeight,
    canvasRect: rect ? [Math.round(rect.width), Math.round(rect.height)] : null,
    bodyBg: bodyCs.backgroundColor,
    bodyClass: document.body.className,
    rootRect: root ? [Math.round(root.getBoundingClientRect().width), Math.round(root.getBoundingClientRect().height)] : null,
    nodeCount: document.querySelectorAll('.t27n-node').length,
    svgCount: document.querySelectorAll('.t27n-art').length,
    photoCount: photos.length,
    textCount: document.querySelectorAll('.t27n-textwrap').length,
    fonts: getComputedStyle(document.querySelector('.t27n-textwrap p') || document.body).fontFamily,
    imgsMissing: noBg.length,
    noBgSample: noBg.slice(0, 3).map((el) => ({ style: el.getAttribute('style'), parent: (el.parentElement && el.parentElement.getAttribute('style')) || '' })),
    bodyKids: [...document.body.children].map((el) => ({ tag: el.tagName, cls: String(el.className).slice(0, 60), h: Math.round(el.getBoundingClientRect().height) })),
    lowest: (() => {
      let best = null;
      document.querySelectorAll('body *').forEach((el) => {
        const b = el.getBoundingClientRect().bottom + window.scrollY;
        if (!best || b > best.bottom) best = { bottom: Math.round(b), tag: el.tagName, cls: String(el.className).slice(0, 70), style: (el.getAttribute('style') || '').slice(0, 80) };
      });
      return best;
    })(),
  };
});
console.log(JSON.stringify(info, null, 1));
await b.close();

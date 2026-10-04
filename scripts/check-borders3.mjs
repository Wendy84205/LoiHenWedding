import { chromium } from 'playwright';
import fs from 'node:fs';
import { PNG } from 'pngjs';

const browser = await chromium.launch();

const widths = [500, 560, 600, 640, 700, 750, 767, 768, 800, 900, 1024, 1200, 1400];
console.log('--- t10 original: frame mode by viewport width ---');
for (const vw of widths) {
  const page = await browser.newPage({ viewport: { width: vw, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  await page.goto('https://cinelove.me/template/thiep-cuoi-10', { waitUntil: 'domcontentloaded', timeout: 180000 });
  await page.waitForTimeout(9000);
  const info = await page.evaluate(() => {
    const pc = document.querySelector('.pc-content');
    const mob = document.querySelector('.mobile-view');
    const root = document.querySelector('#root-page-container');
    const r = root ? root.getBoundingClientRect() : null;
    return {
      pc: !!pc,
      mob: !!mob,
      mobileClass: document.body.className,
      canvas: r ? [Math.round(r.left), Math.round(r.width)] : null,
      pcStyle: pc ? (() => { const c = getComputedStyle(pc); return { border: c.border, shadow: c.boxShadow, maxW: c.maxWidth, w: c.width, h: c.height }; })() : null,
    };
  });
  console.log(`vw=${String(vw).padStart(4)} pc=${info.pc ? 'Y' : 'n'} mobile=${info.mob ? 'Y' : 'n'} canvas=${JSON.stringify(info.canvas)}`);
  if (info.pc && vw === 800) console.log('   pcStyle', JSON.stringify(info.pcStyle));
  await page.close();
}

console.log('\n--- t5 original frame profile (vw=1400) ---');
const p5 = await browser.newPage({ viewport: { width: 1400, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
await p5.goto('https://cinelove.me/template/thiep-cuoi-5', { waitUntil: 'domcontentloaded', timeout: 180000 });
await p5.waitForTimeout(12000);
const c5 = await p5.evaluate(() => {
  const root = document.querySelector('#root-page-container');
  const r = root.getBoundingClientRect();
  const pc = document.querySelector('.pc-content');
  const c = pc ? getComputedStyle(pc) : null;
  return { rect: [Math.round(r.left), Math.round(r.width)], pc: c ? { border: c.border, shadow: c.boxShadow } : null };
});
console.log('t5 canvas', JSON.stringify(c5));
const shot = '/tmp/b2-t5orig-1400.png';
await p5.screenshot({ path: shot });
const png = PNG.sync.read(fs.readFileSync(shot));
const px = (x, y) => { const i = (png.width * y + x) << 2; return [png.data[i], png.data[i + 1], png.data[i + 2]]; };
const cl = c5.rect[0];
for (const y of [300, 500]) {
  const seg = [];
  for (let x = cl - 14; x <= cl + 1; x += 1) seg.push(`${x}:${px(x, y).join(',')}`);
  console.log(`y=${y} ` + seg.join('  '));
}
await p5.close();
await browser.close();
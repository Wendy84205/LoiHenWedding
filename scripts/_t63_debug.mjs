import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 1418 } });
await page.goto('http://127.0.0.1:5173/template/thiep-cuoi-63', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1000);
const info = await page.evaluate(() => {
  const card = document.querySelector('.t63n-coverCard');
  const deco = document.querySelector('.t63n-coverDeco');
  const img = document.querySelector('.t63n-coverPhoenix--left');
  const ccs = getComputedStyle(card);
  return {
    cardPosition: ccs.position,
    cardDisplay: ccs.display,
    cardContainerType: ccs.containerType,
    decoPosition: getComputedStyle(deco).position,
    decoRect: deco.getBoundingClientRect(),
    imgPosition: getComputedStyle(img).position,
    imgOffsetW: img.offsetWidth,
    imgOffsetH: img.offsetHeight,
  };
});
console.log(JSON.stringify(info, null, 2));
await browser.close();

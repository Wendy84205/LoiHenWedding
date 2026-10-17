import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('https://cinelove.me/template/thiep-cuoi-63', { waitUntil: 'networkidle', timeout: 60000 });
await new Promise((r) => setTimeout(r, 5000));

const result = await page.evaluate(() => {
  const txt = document.body ? document.body.innerText : '';
  const imgs = Array.from(document.images).map((i) => i.src || i.getAttribute('src') || '');
  const links = Array.from(document.links).map(
    (a) => a.getAttribute('href') || a.getAttribute('data-href') || ''
  );
  const scripts = Array.from(document.scripts).map((s) => s.textContent || '');
  const matching = scripts.filter(
    (s) =>
      /window\.__|__NEXT_DATA__|__INITIAL_STATE__|__PRELOADED_STATE__|window\.config|window\.app|window\.initial/i.test(s)
  );
  return {
    innerText: txt.slice(0, 30000),
    imgs: imgs.slice(0, 120),
    links: links.slice(0, 120),
    matchingScripts: matching.slice(0, 10),
  };
});

console.log(JSON.stringify(result, null, 2));
await browser.close();

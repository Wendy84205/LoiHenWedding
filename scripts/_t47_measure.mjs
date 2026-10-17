import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 } });
await p.goto('http://127.0.0.1:5173/template/thiep-cuoi-47', { waitUntil: 'load', timeout: 60000 });
await p.waitForTimeout(2000);
const data = await p.evaluate(() => {
  const sel = ['.t47-cover','.t47-family','.t47-invitation','.t47-ceremony','.t47-calendar','.t47-story','.t47-loveyou','.t47-rsvp','.t47-gift','.t47-album','.t47-final'];
  return sel.map(s => { const el=document.querySelector(s); return { s, h: el ? Math.round(el.getBoundingClientRect().height) : null }; });
});
console.log(JSON.stringify(data));
await b.close();

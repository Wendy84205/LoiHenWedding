import { chromium } from 'playwright';
const url = process.argv[2]; const out = process.argv[3];
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:500,height:900}, deviceScaleFactor:1 });
await p.goto(url,{waitUntil:'domcontentloaded',timeout:120000});
await p.waitForTimeout(12000);
// scroll to trigger lazy images
await p.evaluate(async()=>{ const h=document.body.scrollHeight; for(let y=0;y<h;y+=600){window.scrollTo(0,y); await new Promise(r=>setTimeout(r,120));} window.scrollTo(0,0); });
await p.waitForTimeout(2000);
await p.screenshot({path:out, fullPage:true});
console.log('saved',out);
await b.close();

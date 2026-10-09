/* Trích xuất 1:1 cấu trúc thiệp cưới 27 từ trang sống cinelove.me/template/thiep-cuoi-27
   -> /tmp/t27_live.json (dùng để sinh Template27New.jsx + template27New.css)
   Đọc DOM sau khi hydrate nên lấy được cả các "material" do JS render. */
import fs from 'node:fs';
import { chromium } from 'playwright';

const URL = process.env.REF_URL || 'https://cinelove.me/template/thiep-cuoi-27';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 500, height: 1000 }, deviceScaleFactor: 1 });

await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 180000 });
await page.waitForTimeout(9000);

// cuộn hết trang để kích hoạt lazy background + hiệu ứng reveal
await page.evaluate(async () => {
  const step = 600;
  const h = document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 60));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 500));
});
await page.waitForTimeout(1500);

const dump = await page.evaluate(() => {
  const parseStyle = (s) => {
    const out = {};
    (s || '').split(';').forEach((part) => {
      const i = part.indexOf(':');
      if (i < 0) return;
      const k = part.slice(0, i).trim();
      const v = part.slice(i + 1).replace(/\s+/g, ' ').trim();
      if (k) out[k] = v;
    });
    return out;
  };
  const px = (v) => {
    const m = /^(-?[\d.]+)px$/.exec((v || '').trim());
    return m ? Number(m[1]) : null;
  };
  const pick = (cs, keys) => {
    const o = {};
    keys.forEach((k) => { o[k] = cs[k]; });
    return o;
  };

  const root = document.querySelector('#root-page-container') || document.body;
  const all = [...root.querySelectorAll('div[data-node-id]')];
  const nodes = all.filter((el) => el.parentElement.closest('div[data-node-id]') === null);

  const out = nodes.map((el, idx) => {
    const st = parseStyle(el.getAttribute('style'));
    const trans = el.querySelector(':scope > div[data-transition-key]');
    const tkey = trans ? trans.getAttribute('data-transition-key') : '';
    const tm = /^(.*)-(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)-([a-z-]+)-(true|false)$/.exec(tkey);
    const box = trans ? trans.querySelector(':scope > div') : null;
    const boxCs = box ? getComputedStyle(box) : null;
    const inner = box ? box.firstElementChild : null;
    const innerCs = inner ? getComputedStyle(inner) : null;
    const rotate = /rotate\(([-\d.]+)deg\)/.exec(st.transform || '');

    const rec = {
      idx,
      id: el.dataset.nodeId,
      top: px(st.top),
      left: px(st.left),
      width: px(st.width),
      height: st.height && st.height !== 'auto' ? px(st.height) : null,
      z: Number(st['z-index'] || 0),
      rotate: rotate ? Number(rotate[1]) : 0,
      anim: tm ? { name: tm[1].slice(el.dataset.nodeId.length + 1), dur: Number(tm[2]), delay: Number(tm[3]), easing: tm[4], once: tm[5] === 'true' } : null,
      rect: (() => { const r = el.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)]; })(),
      boxCs: boxCs ? pick(boxCs, ['display', 'alignItems', 'justifyContent', 'backgroundColor', 'padding', 'borderRadius', 'boxShadow', 'opacity', 'border', 'textShadow', 'overflow']) : null,
      outerCls: el.getAttribute('class') || '',
      innerCls: inner ? (inner.getAttribute('class') || '') : '',
    };

    const textEl = box
      ? [...box.querySelectorAll('div[contenteditable="false"], div[contenteditable="true"]')]
        .find((d) => d.closest('div[data-node-id]')?.dataset.nodeId === el.dataset.nodeId)
      : null;
    const phoneEl = box ? box.querySelector('button.phone-button') : null;
    const photoEl = box ? box.querySelector('.photo-bg-wrap') : null;
    const imgEl = box ? box.querySelector('img') : null;
    const calEl = box ? box.querySelector('[class*="calen"]') : null;
    const cdEl = box ? box.querySelector('[class*="countdown"]') : null;
    const mapEl = box ? box.querySelector('iframe') : null;
    const svgEl = box ? box.querySelector('svg') : null;

    if (cdEl) rec.kind = 'countdown';
    else if (calEl) rec.kind = 'calendar';
    else if (mapEl) rec.kind = 'map';
    else if (phoneEl) rec.kind = 'phone';
    else if (textEl) rec.kind = 'text';
    else if (photoEl || imgEl) rec.kind = 'photo';
    else if (svgEl) rec.kind = 'svg';
    else rec.kind = 'blank';

    if (rec.kind === 'text' && textEl) {
      const ts = getComputedStyle(textEl);
      rec.text = {
        fontFamily: ts.fontFamily, fontSize: ts.fontSize, fontWeight: ts.fontWeight,
        fontStyle: ts.fontStyle, lineHeight: ts.lineHeight, letterSpacing: ts.letterSpacing,
        textAlign: ts.textAlign, color: ts.color, textTransform: ts.textTransform,
        textDecoration: ts.textDecorationLine, whiteSpace: ts.whiteSpace, width: ts.width,
        html: textEl.innerHTML,
      };
    }
    if (rec.kind === 'photo') {
      const t = photoEl || imgEl;
      const ts = getComputedStyle(t);
      rec.photo = {
        bg: ts.backgroundImage === 'none' ? null : ts.backgroundImage,
        size: ts.backgroundSize, position: ts.backgroundPosition, repeat: ts.backgroundRepeat,
        radius: ts.borderRadius, opacity: ts.opacity, filter: ts.filter,
        mask: ts.maskImage && ts.maskImage !== 'none' ? ts.maskImage : null,
        webkitMask: ts.webkitMaskImage && ts.webkitMaskImage !== 'none' ? ts.webkitMaskImage : null,
        tag: t.tagName, cls: t.getAttribute('class') || '',
        src: t.getAttribute('src') || null,
        width: Math.round(t.getBoundingClientRect().width), height: Math.round(t.getBoundingClientRect().height),
      };
    }
    if (rec.kind === 'blank' || rec.kind === 'svg') {
      const html = inner ? inner.innerHTML.replace(/\s+/g, ' ').trim() : '';
      rec.blank = {
        html: html.slice(0, 4000),
        bg: innerCs && innerCs.backgroundColor !== 'rgba(0, 0, 0, 0)' ? innerCs.backgroundColor : null,
        bgImage: innerCs && innerCs.backgroundImage !== 'none' ? innerCs.backgroundImage : null,
        radius: innerCs ? innerCs.borderRadius : null,
        opacity: innerCs ? innerCs.opacity : null,
        border: innerCs ? innerCs.border : null,
      };
    }
    if (rec.kind === 'phone' && phoneEl) {
      const ps = getComputedStyle(phoneEl);
      rec.phone = {
        label: phoneEl.textContent, color: ps.color, fontSize: ps.fontSize, fontFamily: ps.fontFamily,
        gap: ps.gap, svg: phoneEl.querySelector('svg') ? phoneEl.querySelector('svg').outerHTML : null,
        boxBg: boxCs.backgroundColor,
      };
    }
    if (rec.kind === 'countdown' && cdEl) {
      const cs = getComputedStyle(cdEl);
      rec.countdown = { color: cs.color, bg: cs.backgroundColor, fontSize: cs.fontSize, fontFamily: cs.fontFamily, html: cdEl.outerHTML.slice(0, 1200) };
    }
    if (rec.kind === 'calendar' && calEl) {
      const cs = getComputedStyle(calEl);
      rec.calendar = { color: cs.color, fontSize: cs.fontSize, fontFamily: cs.fontFamily, radius: cs.borderRadius, html: calEl.outerHTML.slice(0, 2500) };
    }
    if (rec.kind === 'map' && mapEl) rec.map = { src: mapEl.getAttribute('src'), radius: boxCs.borderRadius, border: boxCs.border };
    return rec;
  });

  const bodyCs = getComputedStyle(document.body);
  const htmlCs = getComputedStyle(document.documentElement);
  const scroller = (() => {
    let best = null;
    document.querySelectorAll('*').forEach((el) => {
      const cs = getComputedStyle(el);
      if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 50) {
        if (!best || el.scrollHeight > best.sh) best = { el, sh: el.scrollHeight };
      }
    });
    if (!best) return null;
    const cs = getComputedStyle(best.el);
    best.el.setAttribute('data-scroller', '1');
    return { sh: best.sh, bg: cs.backgroundColor, bgImage: cs.backgroundImage === 'none' ? null : cs.backgroundImage, cls: best.el.getAttribute('class') };
  })();

  return {
    bodyBg: bodyCs.backgroundColor,
    htmlBg: htmlCs.backgroundColor,
    scroller,
    scrollHeight: document.documentElement.scrollHeight,
    nodes: out,
  };
});


fs.writeFileSync('/tmp/t27_live.json', JSON.stringify(dump, null, 1));

// ảnh tham chiếu full-page (tắt hiệu ứng reveal)
await page.evaluate(() => {
  document.querySelectorAll('*').forEach((el) => {
    const st = el.getAttribute('style') || '';
    if (st.includes('translate') || st.includes('opacity:0')) {
      el.style.transform = 'none';
      el.style.opacity = '1';
    }
  });
});
await page.waitForTimeout(400);
const h = Math.min(await page.evaluate(() => document.documentElement.scrollHeight), 20000);
await page.setViewportSize({ width: 500, height: h });
await page.waitForTimeout(600);
await page.screenshot({ path: '/tmp/t27_ref_full.png', fullPage: true });

const byKind = {};
dump.nodes.forEach((n) => { byKind[n.kind] = (byKind[n.kind] || 0) + 1; });
console.log('nodes', dump.nodes.length, byKind);
console.log('scrollHeight', dump.scrollHeight, 'bodyBg', dump.bodyBg, 'scroller', JSON.stringify(dump.scroller));
for (const n of dump.nodes) {
  const t = n.kind === 'text' ? ` ${n.text.fontFamily} ${n.text.fontSize} ${n.text.color} "${n.text.html.replace(/<[^>]+>/g, ' ').slice(0, 40)}"` : '';
  const p = n.kind === 'photo' ? ` ${(n.photo.bg || n.photo.src || '').slice(0, 110)} size=${n.photo.size} pos=${n.photo.position} r=${n.photo.radius}` : '';
  const b = n.kind === 'blank' ? ` bg=${n.blank.bg} img=${(n.blank.bgImage || '').slice(0, 80)} r=${n.blank.radius} html=${n.blank.html.slice(0, 60)}` : '';
  const ph = n.kind === 'phone' ? ` "${n.phone.label}" ${n.phone.color} ${n.phone.fontSize} ${n.phone.fontFamily}` : '';
  console.log(`#${String(n.idx).padStart(3)} ${n.id} ${n.kind.padEnd(9)} t=${n.top} l=${n.left} w=${n.width} h=${n.height} z=${n.z} anim=${n.anim ? n.anim.name + '+' + n.anim.delay : '-'}${t}${p}${b}${ph}`);
}
await browser.close();

// Trích xuất cấu trúc layout của ref t22 ĐÚNG trạng thái capture (giống _fidelity_audit.mjs):
// forceVisible + dismiss overlay intro → toạ độ khớp ref.png.
// Output: /tmp/t22_layout.json + /tmp/t22_layout.txt
import { chromium } from 'playwright';
import fs from 'node:fs';

const forceVisible = (rootSel) => {
  const root = document.querySelector(rootSel) || document.body;
  document.querySelectorAll('*').forEach((el) => {
    if (el === root) return;
    const cs = getComputedStyle(el);
    if (cs.position === 'fixed' && !root.contains(el) && !el.contains(root)) {
      el.style.setProperty('display', 'none', 'important');
      return;
    }
    if (parseFloat(cs.opacity) < 1) el.style.opacity = '1';
    const st = el.getAttribute('style') || '';
    if (st.includes('translate') || st.includes('opacity: 0')) {
      el.style.transform = 'none';
      el.style.opacity = '1';
    }
  });
  const re = /xem thiệp|mở thiệp|xem thiệp cưới|get started|nhận thiệp/i;
  const gate = [...document.querySelectorAll('button,a,div,span')]
    .find((el) => re.test((el.textContent || '').trim()) && el.offsetParent !== null
      && (el.textContent || '').trim().length < 40);
  if (gate) gate.click();
  return true;
};

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 500, height: 1000 }, reducedMotion: 'reduce' });
await p.goto('https://cinelove.me/template/thiep-cuoi-22', { waitUntil: 'load', timeout: 90000 });
await p.waitForTimeout(7000);
await p.evaluate(async () => {
  const c = document.querySelector('#root-page-container');
  let sc = null;
  document.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    if ((cs.overflowY === 'auto' || cs.overflowY === 'scroll') && el.scrollHeight > el.clientHeight + 200) {
      if (c && c.contains(el)) return;
      if (!sc || el.scrollHeight > sc.scrollHeight) sc = el;
    }
  });
  const target = sc || document.scrollingElement;
  const h = sc ? sc.scrollHeight : document.documentElement.scrollHeight;
  for (let y = 0; y < h; y += 400) { target.scrollTo(0, y); await new Promise((r2) => setTimeout(r2, 100)); }
  target.scrollTo(0, 0);
  await new Promise((r2) => setTimeout(r2, 2000));
});
await p.evaluate(forceVisible, '#root-page-container');
await p.evaluate(async () => {
  const isCover = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return false;
    if (cs.position !== 'absolute' && cs.position !== 'fixed') return false;
    const z = Number(cs.zIndex);
    if (!(z >= 30)) return false;
    const m = cs.backgroundColor.match(/rgba?\(([^)]+)\)/);
    if (!m) return false;
    const parts = m[1].split(',').map((x) => parseFloat(x));
    if (parts.length > 3 && parts[3] < 0.9) return false;
    const r = el.getBoundingClientRect();
    return r.width > 300 && r.height > 300 && r.width >= window.innerWidth * 0.9 && r.height >= window.innerHeight * 0.9;
  };
  const ov = [...document.querySelectorAll('div,section,main')].find(isCover);
  if (ov) {
    try { ov.click(); } catch { /* noop */ }
    await new Promise((r2) => setTimeout(r2, 700));
    if (isCover(ov)) ov.style.setProperty('display', 'none', 'important');
  }
  const root = document.querySelector('#root-page-container');
  if (root && root.getBoundingClientRect().top < -1) root.scrollIntoView();
});
await p.waitForTimeout(500);
const data = await p.evaluate(() => {
  const out = [];
  const anc = (el) => {
    const names = [];
    let e = el.parentElement;
    for (let i = 0; e && i < 4; i++, e = e.parentElement) {
      names.push((typeof e.className === 'string' ? e.className : '').split(' ').filter((s) => s && !s.startsWith('jsx-')).join('.'));
    }
    return names.join(' < ');
  };
  const walk = (el) => {
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') return;
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return;
    const text = el.innerText ? el.innerText.replace(/\s+/g, ' ').trim() : '';
    const cls = (typeof el.className === 'string' ? el.className : '').slice(0, 120);
    const hasBg = cs.backgroundColor !== 'rgba(0, 0, 0, 0)' || cs.backgroundImage !== 'none';
    const hasBorder = cs.borderTopWidth !== '0px' || cs.borderLeftWidth !== '0px';
    const leafText = text.length > 0 && ![...el.children].some((k) => k.textContent.trim().length > 0);
    if (el.tagName === 'IMG' || hasBg || hasBorder || leafText || (text && el.children.length <= 2 && r.height > 40)) {
      out.push({
        tag: el.tagName, cls, anc: anc(el), fx: cs.position === 'fixed' ? 1 : (cs.position === 'absolute' ? 2 : 0),
        y: Math.round(r.y + scrollY), x: Math.round(r.x), w: Math.round(r.width), h: Math.round(r.height),
        bg: cs.backgroundColor, bgi: cs.backgroundImage !== 'none' ? cs.backgroundImage.slice(0, 320) : '',
        bgs: cs.backgroundSize, bgp: cs.backgroundPosition,
        color: cs.color, ff: cs.fontFamily.split(',')[0].replace(/["']/g, ''), fs: cs.fontSize, fw: cs.fontWeight,
        fst: cs.fontStyle, lh: cs.lineHeight, ls: cs.letterSpacing, ta: cs.textAlign, tt: cs.textTransform,
        bd: hasBorder ? `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}` : '',
        br: cs.borderRadius, op: cs.opacity, txt: text.slice(0, 400),
      });
    }
    for (const ch of el.children) walk(ch);
  };
  walk(document.body);
  out.sort((a, b2) => a.y - b2.y || a.x - b2.x);
  return out;
});
fs.writeFileSync('/tmp/t22_layout.json', JSON.stringify(data, null, 1));
const lines = data.map((d) => `${String(d.y).padStart(5)} ${String(d.x).padStart(4)} ${String(d.w).padStart(4)}x${String(d.h).padStart(4)}${d.fx ? ' fx' + d.fx : '   '} <${d.tag}.${(d.cls.split(' ').filter((s) => s && !s.startsWith('jsx-'))[0] || '')}> bg=${d.bg}${d.bgi ? ' IMG:' + d.bgi.slice(0, 120) : ''} c=${d.color} f=${d.ff}/${d.fs}/${d.fw}/${d.fst} ls=${d.ls} lh=${d.lh} ta=${d.ta} bd=${d.bd}${d.br !== '0px' ? ' r=' + d.br : ''} | ${d.txt}`);
fs.writeFileSync('/tmp/t22_layout.txt', lines.join('\n'));
await b.close();
console.log('DONE', data.length);

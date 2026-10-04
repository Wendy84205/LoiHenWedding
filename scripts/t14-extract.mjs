/* Trích xuất 1:1 cấu trúc thiệp cưới 3 từ bản lưu HTML của cinelove.me
   -> /tmp/t14_nodes.json (dùng để sinh Template3New.jsx + template3New.css) */
import fs from 'node:fs';
import { JSDOM } from 'jsdom';

const dom = new JSDOM(fs.readFileSync('/tmp/t14orig.html', 'utf8'));
const doc = dom.window.document;
const root = doc.querySelector('#root-page-container');
if (!root) throw new Error('no #root-page-container');

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

const all = [...root.querySelectorAll('div[data-node-id]')];
const nodes = all.filter((el) => el.parentElement.closest('div[data-node-id]') === null);

const out = [];
for (const el of nodes) {
  const st = parseStyle(el.getAttribute('style'));
  const trans = el.querySelector(':scope > div[data-transition-key]');
  const tkey = trans ? trans.getAttribute('data-transition-key') : '';
  const tm = /^(.*)-(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)-([a-z-]+)-(true|false)$/.exec(tkey);
  const box = trans ? trans.querySelector(':scope > div') : null;
  const boxStyle = box ? parseStyle(box.getAttribute('style')) : {};
  const rotate = /rotate\(([-\d.]+)deg\)/.exec(st.transform || '');
  const scale = /scale\(([-\d.]+), *([-\d.]+)\)/.exec(st.transform || '');

  const inner = box ? (box.firstElementChild || null) : null;
  const innerCls = inner ? (inner.getAttribute('class') || '') : '';

  const rec = {
    idx: out.length,
    id: el.dataset.nodeId,
    top: px(st.top),
    left: px(st.left),
    width: px(st.width),
    height: st.height && st.height !== 'auto' ? px(st.height) : null,
    z: Number(st['z-index'] || 0),
    rotate: rotate ? Number(rotate[1]) : 0,
    scale: scale ? Number(scale[1]) : 1,
    anim: tm ? { name: tm[1].slice(el.dataset.nodeId.length + 1), dur: Number(tm[2]), delay: Number(tm[3]), easing: tm[4], once: tm[5] === 'true' } : null,
    box: {
      disp: boxStyle.display, ai: boxStyle['align-items'], jc: boxStyle['justify-content'],
      bg: boxStyle['background-color'], pad: boxStyle.padding, radius: boxStyle['border-radius'],
      shadow: boxStyle['box-shadow'], opacity: boxStyle.opacity, border: boxStyle.border,
      textShadow: boxStyle['text-shadow'],
    },
    innerCls,
    cls: (el.getAttribute('class') || '').trim(),
  };

  const textEl = box
    ? [...box.querySelectorAll('div[contenteditable="false"], div[contenteditable="true"]')]
        .find((d) => d.closest('div[data-node-id]')?.dataset.nodeId === el.dataset.nodeId)
    : null;
  const photoEl = box ? [...box.querySelectorAll('.photo-bg-wrap')][0] : null;
  const mapEl = box ? box.querySelector('iframe') : null;
  const svgEl = box ? box.querySelector('svg') : null;
  const calEl = box ? box.querySelector('[class*="calen"]') : null;
  const cdEl = box ? box.querySelector('[class*="countdown"]') : null;

  if (cdEl) rec.kind = 'countdown';
  else if (calEl) rec.kind = 'calendar';
  else if (mapEl) rec.kind = 'map';
  else if (svgEl) rec.kind = 'svg';
  else if (textEl && !photoEl) rec.kind = 'text';
  else if (photoEl) rec.kind = 'photo';
  else rec.kind = 'empty';

  if (rec.kind === 'text') {
    const ts = parseStyle(textEl.getAttribute('style'));
    rec.text = {
      color: ts.color, fontSize: ts['font-size'], fontWeight: ts['font-weight'],
      fontFamily: ts['font-family'], textAlign: ts['text-align'], lineHeight: ts['line-height'],
      letterSpacing: ts['letter-spacing'], textTransform: ts['text-transform'],
      textDecoration: ts['text-decoration'], fontStyle: ts['font-style'], minWidth: ts['min-width'],
      html: textEl.innerHTML.replace(/\s+$/g, ''),
    };
  }
  if (rec.kind === 'photo' || rec.kind === 'svg' || rec.kind === 'empty') {
    const target = photoEl || inner;
    rec.material = {
      style: target ? parseStyle(target.getAttribute('style')) : {},
      cls: target ? (target.getAttribute('class') || '') : '',
      html: inner && inner.children.length === 0 ? inner.innerHTML.slice(0, 400) : null,
    };
  }
  if (rec.kind === 'map') rec.mapSrc = mapEl.getAttribute('src');
  if (rec.kind === 'calendar') {
    rec.cal = { html: calEl.outerHTML.slice(0, 400), cls: calEl.getAttribute('class') };
    rec.calStyle = inner ? parseStyle(inner.getAttribute('style')) : {};
  }
  if (rec.kind === 'countdown') {
    rec.cdStyle = inner ? parseStyle(inner.getAttribute('style')) : {};
    rec.cdHtml = cdEl.outerHTML.slice(0, 300);
  }
  out.push(rec);
}

fs.writeFileSync('/tmp/t14_nodes.json', JSON.stringify(out, null, 1));
console.log('nodes', out.length);
const byKind = {};
out.forEach((n) => { byKind[n.kind] = (byKind[n.kind] || 0) + 1; });
console.log(byKind);
for (const n of out) {
  console.log(`#${String(n.idx).padStart(2)} ${n.id} ${n.kind.padEnd(9)} t=${n.top} l=${n.left} w=${n.width} h=${n.height} z=${n.z} rot=${n.rotate} anim=${n.anim ? n.anim.name + '+' + n.anim.delay : '-'} ${n.kind === 'text' ? JSON.stringify(n.text.fontFamily) + ' ' + n.text.fontSize + ' ' + n.text.color + ' :: ' + n.text.html.replace(/<[^>]+>/g, ' ').slice(0, 60) : ''}${n.material && n.material.style['background-image'] ? ' BG:' + n.material.style['background-image'].slice(0, 90) : ''}`);
}
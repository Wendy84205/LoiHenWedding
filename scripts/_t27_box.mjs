import fs from 'node:fs';
const d = JSON.parse(fs.readFileSync('/tmp/t27_live.json', 'utf8'));
const interesting = [];
for (const n of d.nodes) {
  const b = n.boxCs;
  if (!b) continue;
  const odd = {};
  if (b.opacity && b.opacity !== '1') odd.opacity = b.opacity;
  if (b.backgroundColor && b.backgroundColor !== 'rgba(0, 0, 0, 0)' && b.backgroundColor !== 'rgb(255, 255, 255)') odd.bg = b.backgroundColor;
  if (b.border && !/^0px (solid|none)/.test(b.border)) odd.border = b.border;
  if (b.borderRadius && b.borderRadius !== '0px') odd.radius = b.borderRadius;
  if (b.boxShadow && b.boxShadow !== 'none') odd.shadow = b.boxShadow;
  if (b.padding && b.padding !== '0px 0px 0px 0px') odd.padding = b.padding;
  if (b.textShadow && !b.textShadow.includes('rgba(0, 0, 0, 0)') && b.textShadow !== 'none') odd.textShadow = b.textShadow;
  if (b.overflow && b.overflow !== 'visible') odd.overflow = b.overflow;
  if (Object.keys(odd).length) {
    interesting.push({ idx: n.idx, id: n.id, kind: n.kind, top: n.top, w: n.width, h: n.height, odd });
  }
}
console.log('nodes with non-default box style:', interesting.length);
for (const x of interesting) console.log(JSON.stringify(x));

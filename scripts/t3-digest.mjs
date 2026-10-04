import fs from 'node:fs';

const M = JSON.parse(fs.readFileSync('/tmp/t3_measure.json', 'utf8'));
const B = JSON.parse(fs.readFileSync('/tmp/t3_bg.json', 'utf8'));
const bById = new Map(B.map((b) => [b.id, b]));

const lines = [];
lines.push(`CANVAS ${JSON.stringify(M.canvas)} nodes ${M.count}`);
M.nodes.forEach((n, i) => {
  const b = bById.get(n.id) || {};
  const st = n.style || {};
  lines.push('');
  lines.push(`#${i} ${n.id} @ x=${n.rect[0]} y=${n.rect[1]} ${n.rect[2]}x${n.rect[3]} z=${n.cs.z} styleTop=${st.top} styleLeft=${st.left} w=${st.width} h=${st.height} tf=${st.transform} op=${st.opacity} cls=${(n.cls || '').slice(0, 44)}`);
  const selfBg = n.cs.bgimg && n.cs.bgimg !== 'none' ? n.cs.bgimg : (n.cs.bg !== 'rgba(0, 0, 0, 0)' ? `BGCOLOR ${n.cs.bg}` : '');
  if (selfBg) lines.push(`  SELFBG ${selfBg.slice(0, 220)} r=${n.cs.borderRadius} ovf=${n.cs.overflow}`);
  if (b.self && (b.self.img || b.self.bg !== 'rgba(0, 0, 0, 0)')) lines.push(`  deepSelf img=${(b.self.img || '-').slice(0, 200)} bg=${b.self.bg} size=${b.self.size} pos=${b.self.pos} r=${b.self.radius} mask=${(b.self.mask || '').slice(0, 120)}`);
  if (n.inner) {
    const ibg = n.inner.bgimg && n.inner.bgimg !== 'none' ? n.inner.bgimg : '';
    lines.push(`  inner @ x=${n.inner.rect[0]} y=${n.inner.rect[1]} ${n.inner.rect[2]}x${n.inner.rect[3]} bgc=${n.inner.bg} ${ibg ? 'img=' + ibg.slice(0, 200) : ''} r=${n.inner.borderRadius} pad=${n.inner.pad} border=${n.inner.border} disp=${n.inner.display}`);
  }
  (b.kids || []).forEach((k, ki) => lines.push(`  kid${ki} img=${(k.img || '-').slice(0, 200)} size=${k.size} pos=${k.pos} r=${k.radius} mask=${(k.mask || '').slice(0, 130)} bg=${k.bg}`));
  (n.imgs || []).forEach((im) => lines.push(`  IMG ${im.w}x${im.h} fit=${im.fit} src=${(im.src || '').slice(0, 170)} cls=${im.cls.slice(0, 30)}`));
  (n.svgs || []).forEach((s) => lines.push(`  SVG ${s.w}x${s.h} cls=${s.cls.slice(0, 40)} ${s.html.replace(/\s+/g, ' ').slice(0, 320)}`));
  (n.leaves || []).forEach((l) => lines.push(`  T<${l.tag}> "${l.text}" ff=${l.ff} fs=${l.fs} fw=${l.fw} fst=${l.fst} lh=${l.lh} ls=${l.ls} ta=${l.ta} col=${l.color} tt=${l.tt}`));
});

fs.writeFileSync('/tmp/t3_digest.txt', lines.join('\n'));
console.log('wrote /tmp/t3_digest.txt', lines.length, 'lines');

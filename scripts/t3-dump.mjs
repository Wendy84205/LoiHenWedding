/* In bảng tóm tắt node (text / photo / empty) từ /tmp/t3_nodes.json */
import fs from 'node:fs';
const nodes = JSON.parse(fs.readFileSync('/tmp/t3_nodes.json', 'utf8'));
const lines = [];
for (const x of nodes) {
  const head = `#${x.idx} [${x.id}] ${x.kind.padEnd(8)} t=${x.top} l=${x.left} w=${x.width} h=${x.height} z=${x.z} rot=${x.rotate} anim=${x.anim ? `${x.anim.name}@${x.anim.delay}` : '-'}`;
  if (x.kind === 'text') {
    const t = x.text;
    lines.push(`${head} | ff=${t.fontFamily} fs=${t.fontSize} fw=${t.fontWeight} ta=${t.textAlign} lh=${t.lineHeight} col=${t.color} fst=${t.fontStyle} | boxbg=${x.box.bg} ai=${x.box.ai} jc=${x.box.jc} | ${t.html}`);
  } else {
    const s = x.material?.style || {};
    lines.push(`${head} | boxbg=${x.box.bg} boxR=${x.box.radius} | img=${s['background-image'] || '-'} size=${s['background-size'] || '-'} pos=${s['background-position'] || '-'} radius=${s['border-radius'] || '-'} shadow=${s['box-shadow'] || '-'}`);
  }
}
fs.writeFileSync('/tmp/t3_dump.txt', lines.join('\n'));
console.log('wrote', lines.length, 'lines');

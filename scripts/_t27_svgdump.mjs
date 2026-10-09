import fs from 'node:fs';
const d = JSON.parse(fs.readFileSync('/tmp/t27_live.json', 'utf8'));
console.log('=== NULL-GEOMETRY NODES');
for (const n of d.nodes) {
  if (n.top === null || n.left === null || n.width === null) {
    console.log(JSON.stringify({ id: n.id, idx: n.idx, kind: n.kind, rect: n.rect, top: n.top, left: n.left, w: n.width, h: n.height, outerCls: n.outerCls, innerCls: n.innerCls, boxCs: n.boxCs, anim: n.anim }, null, 1));
  }
}
console.log('=== SVG NODES');
for (const n of d.nodes) {
  if (n.kind !== 'svg') continue;
  const html = (n.blank && n.blank.html) || '';
  const fill = (html.match(/fill:\s*(#[0-9a-fA-F]{3,8})/) || [])[1];
  const paths = [...html.matchAll(/<path\b[^>]*?\sd="([^"]+)"/g)].map((m) => m[1]);
  const viewBox = (html.match(/viewBox="([^"]+)"/) || [])[1];
  const others = (html.match(/<(circle|rect|polygon|line|g|image|ellipse)\b[^>]*>/g) || []).map((s) => s.slice(0, 90));
  console.log(`#${n.idx} ${n.id} ${n.width}x${n.height} fill=${fill} viewBox=${viewBox} paths=${paths.length} others=${JSON.stringify(others)}`);
  paths.forEach((p) => console.log('   d=' + p));
}

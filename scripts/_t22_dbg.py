#!/usr/bin/env python3
from PIL import Image
import numpy as np
RD = '/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/'
a = np.asarray(Image.open(RD + 'ref.png').convert('RGB')).astype(int)
page = np.array([71, 53, 41])
# quét 1 hàng đầy đủ y8860-8890 tìm mọi square
for y0 in range(8860, 8895, 5):
    row = a[y0]
    m = np.abs(row - page).sum(axis=1) > 30
    xs = np.where(m)[0]
    if len(xs):
        print('y', y0, 'nonbg xs', xs.min(), xs.max(), 'n', len(xs),
              'colors', [tuple(int(v) for v in row[x]) for x in xs[:6]])
# cả vùng rộng
m = (np.abs(a[8855:8895] - page).sum(axis=2) > 30)
ys, xs = np.where(m)
if len(xs):
    print('region x', xs.min(), xs.max(), 'y', 8855 + ys.min(), 8855 + ys.max(), 'n', len(xs))
# debug 'Do cô' tree trong layout
import json
j = json.load(open('/tmp/t22_layout.json'))
targets = [e for e in j if 'Do cô' in (e.get('txt') or '')]
print('targets', len(targets), [(round(e['y']), round(e['x']), round(e['w']), round(e['h'])) for e in targets])
t = targets[0]
# element chứa t (txt của m == con trỏ con của t)
def contains(m, n):
    return (m['y'] <= n['y'] + .5 and m['x'] <= n['x'] + .5
            and m['y'] + m['h'] >= n['y'] + n['h'] - .5 and m['x'] + m['w'] >= n['x'] + n['w'] - .5)
for m in j:
    if m is not t and contains(m, t):
        same = abs(m['y'] - t['y']) < .5 and abs(m['x'] - t['x']) < .5
        print('containing:', m['tag'], round(m['y']), round(m['x']), round(m['w']), round(m['h']),
              'fs', m['fs'], 'rect_eq', same, 'txt[:40]', repr((m['txt'] or '')[:40]))

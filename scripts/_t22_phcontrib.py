#!/usr/bin/env python3
"""Tính mean diff bên trong 8 slot placeholder vs phần còn lại."""
from PIL import Image
import numpy as np, json, re
RD = '/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/'
l = np.asarray(Image.open(RD + 'local.png').convert('RGB')).astype(np.int16)
r = np.asarray(Image.open(RD + 'ref.png').convert('RGB')).astype(np.int16)
h = max(l.shape[0], r.shape[0]); w = max(l.shape[1], r.shape[1])
def pad(a):
    o = np.full((h, w, 3), 255, np.int16); o[:a.shape[0], :a.shape[1]] = a; return o
l, r = pad(l), pad(r)
g = np.abs(l - r).max(axis=2)

PH = {1136, 1360, 2339, 2999, 4206, 4792, 4827, 7303}
D = json.load(open('/tmp/t22_layout.json'))
mask = np.zeros((h, w), bool)
for e in D:
    bgi = e.get('bgi') or ''
    if e['y'] in PH and 'url(' in bgi:
        y0, x0 = int(e['y']), int(e['x'])
        y1, x1 = int(e['y'] + e['h']), int(e['x'] + e['w'])
        mask[y0:y1, x0:x1] = True
        print(f"slot y{e['y']} x{e['x']} {e['w']}x{e['h']} diff_mean {g[y0:y1, x0:x1].mean():.1f}")
inm, outm = g[mask], g[~mask]
print('placeholder regions:', round(float(inm.mean()), 1), 'pixels', int(mask.sum()))
print('rest:', round(float(outm.mean()), 2), 'pixels', int((~mask).sum()))
print('overall:', round(float(g.mean()), 2))
print('=> nếu rest về 0, overall sẽ là', round(float(inm.mean()) * mask.mean(), 2))
# nếu fix hết rest (trừ placeholder): overall = placeholder contribution

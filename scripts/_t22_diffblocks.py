#!/usr/bin/env python3
"""Phân tích diff local vs ref theo block -> liệt kê vùng chưa khớp."""
from PIL import Image
import numpy as np
RD = '/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/'
l = np.asarray(Image.open(RD + 'local.png').convert('RGB')).astype(np.int16)
r = np.asarray(Image.open(RD + 'ref.png').convert('RGB')).astype(np.int16)
h = max(l.shape[0], r.shape[0]); w = max(l.shape[1], r.shape[1])
def pad(a):
    o = np.full((h, w, 3), 255, np.int16); o[:a.shape[0], :a.shape[1]] = a; return o
l, r = pad(l), pad(r)
g = np.abs(l - r).max(axis=2)
print('mean', round(float(g.mean()), 2), 'strong%', round(float((g > 60).mean() * 100), 2))
# block 100x100 -> xếp theo mean
blocks = []
for y in range(0, h, 100):
    for x in range(0, w, 100):
        b = g[y:y+100, x:x+100]
        blocks.append((float(b.mean()), y, x, int((b > 60).mean() * 100)))
blocks.sort(reverse=True)
print('top 40 blocks (mean, y, x, strong%):')
for m, y, x, s in blocks[:40]:
    print(f'  y{y:5d} x{x:3d}  mean {m:6.1f} strong {s:3d}%')
# đóng nhóm theo y liên tiếp
print('bands 100px tổng hợp (mean>5):')
band = {}
for m, y, x, s in blocks:
    band[y] = band.get(y, 0) + m
for y in sorted(band):
    if band[y] / 5 > 5:
        print(f'  y{y:5d} avg {band[y]/5:6.1f}')

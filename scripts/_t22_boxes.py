#!/usr/bin/env python3
"""Probe solid boxes trong 1 vùng: python3 _t22_boxes.py y0 y1 x0 x1"""
from PIL import Image
import numpy as np
import sys

img_path = '/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/ref.png'
y0, y1, x0, x1 = map(int, sys.argv[1:5])
a = np.asarray(Image.open(img_path).convert('RGB')).astype(int)
PAGE = np.array([71, 53, 41])
sub = a[y0:y1, x0:x1]
nonbg = (np.abs(sub - PAGE).sum(axis=2) > 24)

boxes = []
Hs, Ws = nonbg.shape
for y in range(Hs - 6):
    row = nonbg[y]
    d = np.diff(row.astype(int))
    starts = np.where(d == 1)[0] + 1
    ends = np.where(d == -1)[0] + 1
    if row[0]:
        starts = np.r_[0, starts]
    if row[-1]:
        ends = np.r_[ends, Ws]
    for s, e in zip(starts, ends):
        L = e - s
        if L < 7 or L > 40:
            continue
        yy = y + 1
        while yy < min(y + 40, Hs):
            if nonbg[yy, s:e].mean() < 0.85:
                break
            yy += 1
        h = yy - y
        if h < 7 or h > 40 or abs(L - h) > 5:
            continue
        c = sub[y:yy, s:e].reshape(-1, 3).mean(0)
        std = sub[y:yy, s:e].std()
        if std > 14:
            continue
        # bỏ nếu là ảnh lớn (vùng xung quanh cũng nonbg đặc)
        yb0, yb1 = max(0, y - 6), min(Hs, yy + 6)
        xb0, xb1 = max(0, s - 6), min(Ws, e + 6)
        if nonbg[yb0:yb1, xb0:xb1].mean() > 0.92:
            continue
        boxes.append((x0 + s, y0 + y, e - s, h, tuple(int(v) for v in c), round(float(std), 1)))
boxes.sort(key=lambda b: (b[1], b[0]))
out = []
for b in boxes:
    if any(not (b[0] + b[2] < o[0] - 2 or o[0] + o[2] + 2 < b[0] or b[1] + b[3] < o[1] - 2 or o[1] + o[3] + 2 < b[1]) for o in out):
        continue
    out.append(b)
for b in out:
    print('box x', b[0], 'y', b[1], 'w', b[2], 'h', b[3], 'c', b[4], 'std', b[5])
print('TOTAL', len(out))

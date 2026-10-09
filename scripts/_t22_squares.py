#!/usr/bin/env python3
"""Tìm mọi ô vuông solid (swatch) trong ref.png: run-length non-bg + grow."""
from PIL import Image
import numpy as np

img_path = '/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/ref.png'
a = np.asarray(Image.open(img_path).convert('RGB')).astype(int)
H, W, _ = a.shape
PAGE = np.array([71, 53, 41])
nonbg = (np.abs(a - PAGE).sum(axis=2) > 24)  # không phải nền

boxes = []
for y in range(H - 26):
    row = nonbg[y]
    d = np.diff(row.astype(int))
    starts = np.where(d == 1)[0] + 1
    ends = np.where(d == -1)[0] + 1
    if row[0]:
        starts = np.r_[0, starts]
    if row[-1]:
        ends = np.r_[ends, len(row)]
    for s, e in zip(starts, ends):
        L = e - s
        if L < 8 or L > 26:
            continue
        # grow xuống tối đa 26 hàng, kiểm tra solid
        x0, x1 = s, e
        yy = y + 1
        while yy < min(y + 26, H):
            seg = nonbg[yy, x0:x1]
            if seg.mean() < 0.85:
                break
            yy += 1
        h = yy - y
        if h < 8 or h > 26:
            continue
        if abs((x1 - x0) - h) > 4:
            continue
        # box cần ít nhất 2 hàng nữa solid (tránh text)
        if yy + 1 < H and nonbg[yy + 1, x0:x1].mean() > 0.5:
            continue
        box = a[y:yy, x0:x1]
        if box.std() > 12:
            continue
        boxes.append((x0, y, x1 - x0, h, tuple(int(v) for v in box.reshape(-1, 3).mean(0))))

# dedupe lồng nhau
boxes.sort(key=lambda b: (b[1], b[0]))
out = []
for b in boxes:
    if any(not (b[0] + b[2] < o[0] or o[0] + o[2] < b[0] or b[1] + b[3] < o[1] or o[1] + o[3] < b[1]) for o in out):
        continue
    out.append(b)
for b in out:
    print('sw', 'x', b[0], 'y', b[1], 'w', b[2], 'h', b[3], 'c', b[4])
print('TOTAL', len(out))

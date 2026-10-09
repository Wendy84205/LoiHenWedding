#!/usr/bin/env python3
from PIL import Image
import numpy as np
r = np.asarray(Image.open('/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/ref.png').convert('RGB'))

def px(y, x):
    return tuple(int(t) for t in r[y, x])

# 1. MAP: tìm box (viền xám sáng, bo góc) vùng y9180-9580
def islight(c):
    return c[0] > 140 and c[1] > 140 and c[2] > 140
# scan row để tìm mép trái/phải map (viền sáng)
for y in [9210, 9250, 9380, 9540, 9555]:
    xs = [x for x in range(0, 500) if islight(px(y, x))]
    print('map row', y, 'x', (xs[0], xs[-1]) if xs else None, 'n', len(xs))
for x in [60, 250, 450]:
    ys = [y for y in range(9180, 9600) if islight(px(y, x))]
    print('map col', x, 'y', (ys[0], ys[-1]) if ys else None, 'n', len(ys))
print('border color', px(9215, 60), px(9380, 56), px(9560, 250))

# 2. Chapter highlight boxes (peach #E6BCA3) quanh y3461/4665/5876
PEACH = (230, 188, 163)
def peach_runs(y, x0=0, x1=500):
    out = []
    s = None
    for x in range(x0, x1):
        v = all(abs(px(y, x)[i] - PEACH[i]) <= 12 for i in range(3))
        if v and s is None:
            s = x
        if not v and s is not None:
            if x - s > 8:
                out.append((s, x - 1))
            s = None
    if s is not None and x1 - s > 8:
        out.append((s, x1 - 1))
    return out
for y0, lab in [(3461, 'ch1'), (4665, 'ch2'), (5876, 'ch3')]:
    for dy in range(-14, 34, 4):
        rr = peach_runs(y0 + dy, 150, 420)
        if rr:
            print(lab, 'y', y0 + dy, rr)
    # vertical extent at box x
for y0, lab in [(3461, 'ch1'), (4665, 'ch2'), (5876, 'ch3')]:
    rr = peach_runs(y0 + 10, 150, 420)
    if rr:
        x = rr[0][0] + 5
        ys = [y for y in range(y0 - 20, y0 + 50) if all(abs(px(y, x)[i] - PEACH[i]) <= 12 for i in range(3))]
        print(lab, 'box y', (ys[0], ys[-1]) if ys else None)

# 3. Swatch trios cạnh chapter (x330-360)
def col_runs(x, y0, y1):
    out = []
    prev = None
    for y in range(y0, y1):
        c = px(y, x)
        k = 'bg' if all(abs(c[i] - (71, 53, 41)[i]) <= 6 for i in range(3)) else 'x'
        if k != prev:
            print('  sw col x', x, 'y', y, c)
            prev = k
for y0, lab in [(3420, 'ch1'), (4620, 'ch2'), (5845, 'ch3')]:
    print(lab, 'swatches probe x337..355')
    col_runs(345, y0, y0 + 100)

# 4. Địa điểm/map trên text còn gì? bounding box chính xác address overlay
# (đã có text y9269)

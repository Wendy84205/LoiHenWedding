#!/usr/bin/env python3
from PIL import Image
import numpy as np
r = np.asarray(Image.open('/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/ref.png').convert('RGB'))

def px(y, x):
    return tuple(int(t) for t in r[y, x])

PAGE = (71, 53, 41)
def isbg(c, tol=7):
    return all(abs(c[i] - PAGE[i]) <= tol for i in range(3))

# 1. MAP: detector xám (border 139,135,135) + nội dung sáng
def grayish(c):
    return 120 < c[0] < 250 and 120 < c[1] < 250 and 120 < c[2] < 250 and abs(c[0]-c[1]) < 45 and abs(c[1]-c[2]) < 45
for y in [9200, 9220, 9240, 9260, 9280, 9300, 9400, 9550, 9560, 9570]:
    xs = [x for x in range(0, 500) if grayish(px(y, x)) or not isbg(px(y, x), 40)]
    print('map row', y, 'x', (xs[0], xs[-1]) if xs else None, 'n', len(xs), 'c@60', px(y, 60) if xs else None)
for x in [54, 56, 60, 250, 448, 452]:
    ys = [y for y in range(9180, 9600) if not isbg(px(y, x), 40)]
    print('map col', x, 'y', (ys[0], ys[-1]) if ys else None, 'n', len(ys))

# 2. Chapter highlight boxes (#FFC0A1)
HL = (255, 192, 161)
def hl_runs(y, x0=0, x1=500, minlen=8):
    out, s = [], None
    for x in range(x0, x1):
        v = all(abs(px(y, x)[i] - HL[i]) <= 14 for i in range(3))
        if v and s is None:
            s = x
        if not v and s is not None:
            if x - s >= minlen:
                out.append((s, x - 1))
            s = None
    return out
for y0, lab in [(3470, 'ch1'), (4678, 'ch2'), (5889, 'ch3')]:
    print(lab, 'rows:')
    for y in range(y0 - 25, y0 + 35, 3):
        rr = hl_runs(y, 100, 450)
        if rr:
            print('  y', y, rr)
for y0, lab, xguess in [(3470, 'ch1', 330), (4678, 'ch2', 260), (5889, 'ch3', 330)]:
    ys = [y for y in range(y0 - 30, y0 + 40) if hl_runs(y, xguess, xguess + 10, 3)]
    print(lab, 'box y-extent at x', xguess, (ys[0], ys[-1]) if ys else None)

# 3. Swatch trios: mọi pixel không-bg quanh chapter (x300-400, y3400-3540 / 4600-4740 / 5830-5970)
def scan_area(y0, y1, x0, x1, lab):
    seen = {}
    for y in range(y0, y1):
        for x in range(x0, x1):
            c = px(y, x)
            if not isbg(c, 6):
                k = (c[0] // 32, c[1] // 32, c[2] // 32)
                s = seen.setdefault(k, {'n': 0, 'x0': x, 'x1': x, 'y0': y, 'y1': y, 'c': c})
                s['n'] += 1
                s['x0'] = min(s['x0'], x); s['x1'] = max(s['x1'], x)
                s['y0'] = min(s['y0'], y); s['y1'] = max(s['y1'], y)
    print(lab, 'non-bg clusters (n>30):')
    for k, s in sorted(seen.items(), key=lambda kv: -kv[1]['n']):
        if s['n'] > 30:
            print('  c', s['c'], 'n', s['n'], 'x', s['x0'], '-', s['x1'], 'y', s['y0'], '-', s['y1'])
for y0, y1, lab in [(3400, 3540, 'ch1'), (4600, 4740, 'ch2'), (5830, 5970, 'ch3')]:
    scan_area(y0, y1, 300, 400, lab)

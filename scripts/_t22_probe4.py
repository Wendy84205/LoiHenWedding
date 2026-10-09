#!/usr/bin/env python3
from PIL import Image
import numpy as np
import sys
img = sys.argv[1] if len(sys.argv) > 1 else 'ref'
r = np.asarray(Image.open(f'/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/{img}.png').convert('RGB'))

def px(y, x):
    return tuple(int(t) for t in r[y, x])
PAGE = (71, 53, 41)
def isbg(c, tol=6):
    return all(abs(c[i] - PAGE[i]) <= tol for i in range(3))
HL = (255, 192, 161)
def hl_bbox(y0, y1, x0, x1, lab):
    xs, ys = [], []
    for y in range(y0, y1):
        for x in range(x0, x1):
            if all(abs(px(y, x)[i] - HL[i]) <= 14 for i in range(3)):
                xs.append(x); ys.append(y)
    if xs:
        print(lab, 'hl box x', min(xs), max(xs), 'y', min(ys), max(ys), 'n', len(xs))
    else:
        print(lab, 'no hl')
# highlight boxes
hl_bbox(2355, 2425, 120, 340, 'groom-name')   # Manh Hải
hl_bbox(2635, 2710, 260, 470, 'bride-name')    # Yến Trang
# swatch trios: quét all swatch colors (113,95,82)/(122,81,56)/(31,16,11)
TARGETS = [(113, 95, 82), (122, 81, 56), (31, 16, 11)]
def sw_scan(y0, y1, x0, x1, lab):
    for t in TARGETS:
        pts = [(y, x) for y in range(y0, y1) for x in range(x0, x1)
               if all(abs(px(y, x)[i] - t[i]) <= 5 for i in range(3))]
        if len(pts) > 60:
            ys = [p[0] for p in pts]; xs = [p[1] for p in pts]
            print(lab, t, 'x', min(xs), max(xs), 'y', min(ys), max(ys), 'n', len(pts))
sw_scan(4610, 4710, 320, 360, 'ch2-sw')
sw_scan(3400, 3540, 120, 260, 'ch1-sw-left')
sw_scan(5830, 5970, 120, 260, 'ch3-sw-left')
sw_scan(3400, 3540, 360, 500, 'ch1-sw-right')
sw_scan(30, 110, 350, 500, 'top-sw')
# music button top: circle trắng y0-60 x440-500
pts = [(y, x) for y in range(0, 70) for x in range(430, 500) if not isbg(px(y, x), 10)]
if pts:
    ys = [p[0] for p in pts]; xs = [p[1] for p in pts]
    print(img, 'top-right nonbg x', min(xs), max(xs), 'y', min(ys), max(ys), 'n', len(pts))
else:
    print(img, 'top-right empty')
# rule (1188) y5085
pts = [(y, x) for y in range(5070, 5100) for x in range(0, 500) if not isbg(px(y, x), 8)]
if pts:
    ys = [p[0] for p in pts]; xs = [p[1] for p in pts]
    print(img, 'rule y', min(ys), max(ys), 'x', min(xs), max(xs), 'n', len(pts))

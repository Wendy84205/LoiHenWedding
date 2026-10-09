#!/usr/bin/env python3
from PIL import Image
import numpy as np
r = np.asarray(Image.open('/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/ref.png').convert('RGB'))
PAGE = (71, 53, 41)

def px(y, x):
    return tuple(int(t) for t in r[y, x])

def isbg(c, tol=6):
    return all(abs(c[i] - PAGE[i]) <= tol for i in range(3))

# 1. bracket boxes: print non-bg pixels in each L box region
for (bx, by, lab) in [(188, 8913, 'TG-TL'), (299, 8953, 'TG-BR'), (185, 9126, 'DD-TL'), (299, 9166, 'DD-BR'), (185, 9981, 'TP-TL'), (302, 10023, 'TP-BR')]:
    pts = [(y, x) for y in range(by - 6, by + 50) for x in range(bx - 6, bx + 36) if not isbg(px(y, x))]
    if pts:
        ys = [p[0] for p in pts]; xs = [p[1] for p in pts]
        # find horizontal runs (rows with many px) and vertical runs (cols with many px)
        from collections import Counter
        rc = Counter(ys); cc = Counter(xs)
        hrows = sorted([y for y, n in rc.items() if n >= 8])
        vcols = sorted([x for x, n in cc.items() if n >= 8])
        print(lab, 'bbox y', min(ys), max(ys), 'x', min(xs), max(xs), 'color', px(ys[0], xs[0]), 'hrows', hrows[:1], hrows[-1:] , 'vcols', vcols[:1], vcols[-1:])
    else:
        print(lab, 'EMPTY')

# 2. header boxes (#7A5138) bounds
BROWN = (122, 81, 56)
def browrun(y, x0, x1):
    xs = [x for x in range(x0, x1) if all(abs(px(y, x)[i] - BROWN[i]) <= 10 for i in range(3))]
    return (xs[0], xs[-1], len(xs)) if xs else None
for y, lab in [(8957, 'thoigian mid'), (8935, 'thoigian top'), (8975, 'thoigian bot'), (9168, 'diadiem mid'), (10026, 'tips mid')]:
    print('hdrbox', lab, browrun(y, 140, 380))
def browcol(x, y0, y1):
    ys = [y for y in range(y0, y1) if all(abs(px(y, x)[i] - BROWN[i]) <= 10 for i in range(3))]
    return (ys[0], ys[-1], len(ys)) if ys else None
for x, lab in [(250, 'thoigian'), (250, 'diadiem2')]:
    pass
print('hdrbox col x250 y8920-8995', browcol(250, 8920, 8995))
print('hdrbox col x250 y9140-9215', browcol(250, 9140, 9215))
print('hdrbox col x250 y9995-10055', browcol(250, 9995, 10055))
print('hdrbox row y9168', browrun(9168, 140, 380))
print('hdrbox row y10026', browrun(10026, 140, 380))

# 3. music toggle: samples
for (y, x) in [(25, 465), (25, 470), (12, 475), (25, 485), (38, 475), (25, 462)]:
    print('toggle', (y, x), px(y, x))

# 4. buttons vertical bounds (col x190 & x345 white)
white = lambda c: c[0] > 230 and c[1] > 225 and c[2] > 225
for x in (190, 250, 350, 470):
    ys = [y for y in range(840, 910) if white(px(y, x))]
    print('btn col x', x, (min(ys), max(ys)) if ys else None)

# 5. gray badge center color + radius probes (corners)
print('gray badge y750 x350', px(750, 350), 'y740 x275', px(740, 275), 'y760 x440', px(760, 440))
print('gold badge y750 x190', px(750, 190))
# radius: rating card corner (24,938): find first card-colored px per row near corner
CARD = (59, 40, 34)
for dy in range(0, 14):
    xs = [x for x in range(24, 50) if all(abs(px(938 + dy, x)[i] - CARD[i]) <= 6 for i in range(3))]
    print('rating corner dy', dy, 'first x', xs[0] - 24 if xs else None)

# 6. song card corner radius
SONG = (119, 115, 115)
for dy in range(0, 18):
    xs = [x for x in range(24, 55) if all(abs(px(1124 + dy, x)[i] - SONG[i]) <= 8 for i in range(3))]
    print('song corner dy', dy, 'first x', xs[0] - 24 if xs else None)

# 7. buttons corner radius (btn1 x185)
for dy in range(0, 10):
    xs = [x for x in range(185, 210) if white(px(856 + dy, x))]
    print('btn corner dy', dy, 'first x', (xs[0] - 185) if xs else None)

# 8. SAVE band corner + peach outer corner
BAND = (230, 188, 163)
for dy in range(0, 8):
    xs = [x for x in range(32, 50) if all(abs(px(8761 + dy, x)[i] - BAND[i]) <= 8 for i in range(3))]
    print('band corner dy', dy, 'first x', (xs[0] - 32) if xs else None)
for dy in range(0, 12):
    xs = [x for x in range(47, 70) if all(abs(px(7289 + dy, x)[i] - BAND[i]) <= 8 for i in range(3))]
    print('peach corner dy', dy, 'first x', (xs[0] - 47) if xs else None)

# 9. quote rules full extent (wide scan)
for y0, y1, x0, x1, lab in [(3865, 3880, 0, 300, 'q1'), (5072, 5090, 200, 500, 'q2'), (6258, 6280, 0, 500, 'q3'), (2905, 2925, 0, 500, 'couple-q')]:
    for y in range(y0, y1):
        xs = [x for x in range(x0, x1) if not isbg(px(y, x), 5)]
        if len(xs) > 60 and (xs[-1] - xs[0] + 1) - len(xs) < 15:
            print('rule?', lab, 'y', y, 'x', xs[0], '-', xs[-1], 'n', len(xs), px(y, xs[len(xs) // 2]))

# 10. bracket color precise (TG-TL region print row runs)
for y in range(8913, 8935):
    xs = [x for x in range(185, 225) if not isbg(px(y, x), 5)]
    if xs:
        print('bracket row', y, xs, px(y, xs[0]))

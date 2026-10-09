#!/usr/bin/env python3
from PIL import Image
import numpy as np
RD = '/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/'
a = np.asarray(Image.open(RD + 'ref.png').convert('RGB')).astype(int)
b = np.asarray(Image.open(RD + 'local.png').convert('RGB')).astype(int)
page = np.array([71, 53, 41])

# trio y8869 siblings
for c in [(122, 81, 56), (31, 16, 11), (113, 95, 82)]:
    pts = [(y, x) for y in range(8855, 8900) for x in range(240, 380)
           if all(abs(int(a[y, x][i]) - c[i]) <= 6 for i in range(3))]
    if pts:
        ys = [p[0] for p in pts]; xs = [p[1] for p in pts]
        print('8869', c, 'n', len(pts), 'x', min(xs), max(xs), 'y', min(ys), max(ys))

# tips brown siblings
for c in [(122, 81, 56)]:
    for y0, y1, lab in [(10410, 10435, 't1'), (10578, 10603, 't2'), (10779, 10805, 't3')]:
        pts = [(y, x) for y in range(y0, y1) for x in range(15, 55)
               if all(abs(int(a[y, x][i]) - c[i]) <= 6 for i in range(3))]
        if pts:
            ys = [p[0] for p in pts]; xs = [p[1] for p in pts]
            print('tips', lab, 'brown x', min(xs), max(xs), 'y', min(ys), max(ys), 'n', len(pts))

# intro text right edge
for name, img in [('ref', a), ('loc', b)]:
    m = (np.abs(img[140:330] - page).sum(axis=2) > 40)
    xs = np.where(m.any(axis=0))[0]
    print(name, 'intro text x', xs.min(), xs.max())

# music band right region content
for name, img in [('ref', a), ('loc', b)]:
    m = (np.abs(img[1120:1340, 340:500] - page).sum(axis=2) > 40)
    ys, xs = np.where(m)
    if len(xs):
        print(name, 'band-right x', 340 + xs.min(), 340 + xs.max(), 'y', 1120 + ys.min(), 1120 + ys.max(), 'n', len(xs))
    else:
        print(name, 'band-right empty')

# local: 'Do cô dâu' region rows10855-10969
for name, img in [('ref', a), ('loc', b)]:
    m = (np.abs(img[10855:10975, 15:490] - page).sum(axis=2) > 40)
    print(name, 'docodau n', m.sum())

# local music button top-right rows0-50 x440-500
for name, img in [('ref', a), ('loc', b)]:
    m = (np.abs(img[0:55, 435:500] - page).sum(axis=2) > 40)
    ys, xs = np.where(m)
    if len(xs):
        print(name, 'topbtn x', 435 + xs.min(), 435 + xs.max(), 'y', ys.min(), ys.max(), 'n', len(xs))
    else:
        print(name, 'topbtn empty')

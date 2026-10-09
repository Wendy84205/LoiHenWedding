#!/usr/bin/env python3
"""Row profile bên trong card RSVP ref & local: tìm button/input/text rows."""
from PIL import Image
import numpy as np
RD = '/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/'
r = np.asarray(Image.open(RD + 'ref.png').convert('RGB')).astype(int)
l = np.asarray(Image.open(RD + 'local.png').convert('RGB')).astype(int)

def profile(img, name):
    print('==', name)
    # brown button: (122,81,56) trong card
    m = (np.abs(img[9600:9970, 80:420] - np.array([122, 81, 56])).max(axis=2) <= 10)
    ys, xs = np.where(m)
    if len(xs):
        print('  brown button y', 9600 + int(ys.min()), 9600 + int(ys.max()), 'x', 80 + int(xs.min()), 80 + int(xs.max()), 'n', int(m.sum()))
    # input border: xám ~(200-220) nhạt, full-width trong card
    for y in range(9610, 9960):
        row = img[y, 120:390]
        nonwhite = ((row.sum(axis=1) < 720) & (row.sum(axis=1) > 250)).sum()
        if nonwhite > 200:
            print('  row', y, 'nonwhite-line n', int(nonwhite), 'sample', tuple(row[10]))
    # text rows (dark pixels)
    rows = []
    for y in range(9610, 9960):
        row = img[y, 90:410]
        dark = (row.sum(axis=1) < 450).sum()
        if dark > 3: rows.append((y, int(dark)))
    # gộp thành cụm
    clusters = []
    for y, n in rows:
        if clusters and y - clusters[-1][1] <= 3:
            clusters[-1][1] = y; clusters[-1][2] += n
        else:
            clusters.append([y, y, n])
    print('  text clusters:', [(c[0], c[1]) for c in clusters])

profile(r, 'REF')
profile(l, 'LOC')
# blue radio (Có, tôi sẽ tham dự) — màu xanh
for name, img in [('REF', r), ('LOC', l)]:
    m = (img[9600:9970, 80:420, 2] > 150) & (img[9600:9970, 80:420, 0] < 120) & (img[9600:9970, 80:420, 1] < 150)
    ys, xs = np.where(m)
    if len(xs):
        print(name, 'blue radio y', 9600 + int(ys.min()), 9600 + int(ys.max()), 'x', 80 + int(xs.min()), 80 + int(xs.max()))

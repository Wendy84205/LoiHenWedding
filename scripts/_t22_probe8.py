#!/usr/bin/env python3
"""Tìm bbox các ô vuông nhỏ theo màu trong ref: trio 'To', tips, SAVE y11500."""
from PIL import Image
import numpy as np
RD = '/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/'
r = np.asarray(Image.open(RD + 'ref.png').convert('RGB')).astype(int)
l = np.asarray(Image.open(RD + 'local.png').convert('RGB')).astype(int)

COLORS = {
    'brown': (122, 81, 56), 'dark': (31, 16, 11), 'gray': (113, 95, 82),
    'peach': (230, 188, 163), 'light': (247, 244, 244), 'sgray': (165, 165, 165),
}

def scan(img, y0, y1, x0, x1, c, tol=8):
    m = (np.abs(img[y0:y1, x0:x1] - np.array(c)).max(axis=2) <= tol)
    ys, xs = np.where(m)
    if len(xs) < 8: return None
    return dict(x=(x0 + int(xs.min()), x0 + int(xs.max())), y=(y0 + int(ys.min()), y0 + int(ys.max())), n=int(m.sum()))

# region (label, y0,y1,x0,x1, colors)
regions = [
    ('trio3703 To', 3690, 3725, 0, 500, ['gray', 'brown', 'dark']),
    ('trio3703 y-phan-bo', 3690, 3725, 0, 500, ['peach', 'light']),
    ('trio7707 To', 7695, 7725, 0, 500, ['gray', 'brown', 'dark']),
    ('trio8869', 8860, 8890, 200, 340, ['gray', 'brown', 'dark', 'peach']),
    ('tips1 10400-10450', 10395, 10455, 0, 60, ['gray', 'brown', 'dark']),
    ('tips2 10565-10620', 10560, 10625, 0, 60, ['gray', 'brown', 'dark']),
    ('tips3 10765-10820', 10760, 10825, 0, 60, ['gray', 'brown', 'dark']),
    ('SAVE y11450-11572', 11440, 11572, 0, 500, ['peach', 'light', 'brown', 'gray']),
]
for lab, y0, y1, x0, x1, cols in regions:
    print(lab)
    for cn in cols:
        rr = scan(r, y0, y1, x0, x1, COLORS[cn])
        ll = scan(l, y0, y1, x0, x1, COLORS[cn])
        if rr or ll:
            print(f'  {cn:6s} ref={rr} loc={ll}')

# màu nút nhạc ref
print('music btn px ref:', tuple(r[25, 475]), 'border?', tuple(r[12, 475]), tuple(r[10 + 15, 460 + 0]))
print('music btn ref colors unique:', sorted({tuple(r[y, x]) for y in range(8, 42) for x in range(458, 492)}, key=lambda t: -sum(t))[:6])
# white circle? đếm pixel khác nền
m = (np.abs(r[5:45, 455:495] - np.array([71, 53, 41])).max(axis=2) > 20)
ys, xs = np.where(m)
print('btn nonpage n', int(m.sum()), 'bbox', (455 + int(xs.min()), 455 + int(xs.max()), 5 + int(ys.min()), 5 + int(ys.max())) if len(xs) else None)

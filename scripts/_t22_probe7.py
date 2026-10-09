#!/usr/bin/env python3
"""Vẽ bbox thẻ trắng (RSVP) trong y1300-2100; và kiểm tra y9560-9760 pixel."""
from PIL import Image
import numpy as np
RD = '/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/'
l = np.asarray(Image.open(RD + 'local.png').convert('RGB')).astype(int)
r = np.asarray(Image.open(RD + 'ref.png').convert('RGB')).astype(int)

def white_bbox(img, y0, y1, x0=0, x1=500):
    reg = img[y0:y1, x0:x1]
    m = (reg[:, :, 0] > 235) & (reg[:, :, 1] > 230) & (reg[:, :, 2] > 225)
    ys, xs = np.where(m)
    if not len(xs): return None
    return dict(x=(x0 + int(xs.min()), x0 + int(xs.max())), y=(y0 + int(ys.min()), y0 + int(ys.max())), n=int(m.sum()))

for lab, y0, y1 in [('form 1300-2100', 1300, 2100), ('bottom 9560-9760', 9560, 9760)]:
    print(lab)
    print('  ref ', white_bbox(r, y0, y1))
    print('  loc ', white_bbox(l, y0, y1))
# bảng màu theo dòng ở các mốc để chắc chắn
for y in [1550, 1600, 1650, 1700, 1750, 1800, 1850, 1900, 1950, 2000]:
    print('y', y, 'ref x100', tuple(r[y, 100]), 'loc x100', tuple(l[y, 100]),
          '| ref x250', tuple(r[y, 250]), 'loc x250', tuple(l[y, 250]))

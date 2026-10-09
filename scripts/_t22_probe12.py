#!/usr/bin/env python3
"""Màu/kiểu chữ 'Do cô dâu' ref vs local + kiểm tra pixel y5206 theo dòng."""
from PIL import Image
import numpy as np
RD = '/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/'
r = np.asarray(Image.open(RD + 'ref.png').convert('RGB')).astype(int)
l = np.asarray(Image.open(RD + 'local.png').convert('RGB')).astype(int)
page = np.array([71, 53, 41])
# color text 'Do cô' : chọn pixel sáng nhất trong region
for name, img in [('ref', r), ('loc', l)]:
    reg = img[10860:10885, 20:480]
    m = (np.abs(reg - page).sum(axis=2) > 90)
    px = reg[m]
    if len(px):
        print(name, 'docodau bright px n', len(px), 'mean', tuple(int(v) for v in px.mean(axis=0)),
              'p90', tuple(int(v) for v in np.percentile(px, 90, axis=0)))
# y5206: dòng nào local thiếu? đếm nonbg theo dòng
for y in range(5206, 5416, 10):
    mr = (np.abs(r[y:y+10, 20:480] - page).sum(axis=2) > 40).sum()
    ml = (np.abs(l[y:y+10, 20:480] - page).sum(axis=2) > 40).sum()
    print('y', y, 'ref', mr, 'loc', ml)

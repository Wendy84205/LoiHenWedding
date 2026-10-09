#!/usr/bin/env python3
from PIL import Image
import numpy as np
RD = '/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/'
r = Image.open(RD + 'ref.png').convert('RGB')
l = Image.open(RD + 'local.png').convert('RGB')
a = np.asarray(r).astype(int)
print('ref shape', a.shape, 'px[9760,90]', a[9760, 90], 'px[9760,250]', a[9760, 250])
# panel riêng
r.crop((0, 9600, 500, 9990)).resize((500, 390)).save('/tmp/t22_ref_rsvp.png')
l.crop((0, 9600, 500, 9990)).resize((500, 390)).save('/tmp/t22_loc_rsvp.png')
r.crop((0, 9340, 500, 9640)).save('/tmp/t22_ref_9340.png')
l.crop((0, 9340, 500, 9640)).save('/tmp/t22_loc_9340.png')
# dải màu theo dòng trung bình |ref - white|
for y in range(9600, 9990, 30):
    row = a[y, 60:440]
    print('y', y, 'ref mean rgb', tuple(int(v) for v in row.mean(axis=0)))
print('saved')

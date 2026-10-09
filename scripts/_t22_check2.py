#!/usr/bin/env python3
from PIL import Image
import numpy as np
RD = '/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/'
l = np.asarray(Image.open(RD + 'local.png').convert('RGB')).astype(int)
r = np.asarray(Image.open(RD + 'ref.png').convert('RGB')).astype(int)
page = np.array([71, 53, 41])
for lab, y0, y1, x0, x1 in [('y5206 block', 5200, 5420, 20, 480),
                            ('y6367 block', 6360, 6470, 10, 360),
                            ('y3968 quote1', 3960, 4180, 25, 480),
                            ('intro y89', 80, 340, 0, 500)]:
    m = (np.abs(l[y0:y1, x0:x1] - page).sum(axis=2) > 40).sum()
    mr = (np.abs(r[y0:y1, x0:x1] - page).sum(axis=2) > 40).sum()
    print(f'{lab:14s} loc n={m:6d} ref n={mr:6d}')

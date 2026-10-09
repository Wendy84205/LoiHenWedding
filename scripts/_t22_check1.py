#!/usr/bin/env python3
from PIL import Image
import numpy as np
RD = '/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/'
l = np.asarray(Image.open(RD + 'local.png').convert('RGB')).astype(int)
r = np.asarray(Image.open(RD + 'ref.png').convert('RGB')).astype(int)
page = np.array([71, 53, 41])
regions = [('map', 9280, 9560, 51, 452), ('docodau', 10855, 10970, 15, 490),
           ('musicbtn', 5, 45, 455, 495), ('trio7707', 7700, 7720, 45, 105),
           ('tips1', 10395, 10455, 20, 45), ('trio8869', 8860, 8890, 230, 300),
           ('rsvp-btn', 9850, 9910, 110, 390)]
for lab, y0, y1, x0, x1 in regions:
    m = (np.abs(l[y0:y1, x0:x1] - page).sum(axis=2) > 40).sum()
    mr = (np.abs(r[y0:y1, x0:x1] - page).sum(axis=2) > 40).sum()
    print(f'{lab:10s} loc n={m:6d} ref n={mr:6d}')

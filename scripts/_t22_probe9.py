#!/usr/bin/env python3
from PIL import Image
import numpy as np
from collections import Counter
RD = '/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/'
r = np.asarray(Image.open(RD + 'ref.png').convert('RGB')).astype(int)
# gray trio7707 tight
m = (np.abs(r[7700:7725, 45:70] - np.array([113, 95, 82])).max(axis=2) <= 8)
ys, xs = np.where(m)
print('gray7707 tight', (45 + int(xs.min()), 45 + int(xs.max()), 7700 + int(ys.min()), 7700 + int(ys.max())), len(xs)) if len(xs) else print('none')
# icon dark pixels trong button circle
circ = r[8:42, 458:492]
dark = np.where(circ.sum(axis=2) < 560)
if len(dark[0]):
    print('dark in circle n', len(dark[0]), 'bbox y', 8 + int(dark[0].min()), 8 + int(dark[0].max()), 'x', 458 + int(dark[1].min()), 458 + int(dark[1].max()))
    cols = [tuple(int(v) for v in circ[y, x]) for y, x in zip(*dark)]
    print('common dark', Counter(cols).most_common(5))
cols = Counter(tuple(int(v) for v in circ[y, x]) for y in range(34) for x in range(34))
print('common any', cols.most_common(6))
# crops
Image.open(RD + 'ref.png').convert('RGB').crop((455, 5, 495, 45)).resize((320, 320), Image.NEAREST).save('/tmp/t22_btn_ref.png')
Image.open(RD + 'local.png').convert('RGB').crop((455, 5, 495, 45)).resize((320, 320), Image.NEAREST).save('/tmp/t22_btn_loc.png')
# RSVP full region ref|local
def crop_pair(y0, y1, out):
    l = Image.open(RD + 'local.png').convert('RGB').crop((0, y0, 500, y1))
    rr = Image.open(RD + 'ref.png').convert('RGB').crop((0, y0, 500, y1))
    w, h = l.size
    o = Image.new('RGB', (w * 2 + 8, h), (255, 0, 255))
    o.paste(rr, (0, 0)); o.paste(l, (w + 8, 0)); o.save(out)
    print(out, o.size)
crop_pair(9340, 9990, '/tmp/t22_rsvp.png')
print('done')

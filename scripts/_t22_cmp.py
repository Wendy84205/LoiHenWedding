#!/usr/bin/env python3
"""Ghép ref|local dọc cho dải y cho trước -> /tmp/t22_cmp_<name>.png"""
import sys
from PIL import Image, ImageDraw

RD = '/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/'
bands = [
    ('y0_1000', 0, 1000),
    ('y1000_2000', 1000, 2000),
    ('y2000_3000', 2000, 3000),
    ('y3000_4000', 3000, 4000),
    ('y4000_5000', 4000, 5000),
    ('y5000_6000', 5000, 6000),
    ('y6000_7000', 6000, 7000),
    ('y7000_8000', 7000, 8000),
    ('y8000_9000', 8000, 9000),
    ('y9000_10000', 9000, 10000),
    ('y10000_11000', 10000, 11000),
    ('y11000_11572', 11000, 11572),
]
if len(sys.argv) > 1:
    bands = [b for b in bands if b[0] in sys.argv[1:]]
ref = Image.open(RD + 'ref.png').convert('RGB')
loc = Image.open(RD + 'local.png').convert('RGB')
for name, y0, y1 in bands:
    h = y1 - y0
    r = ref.crop((0, y0, 500, min(y1, ref.height)))
    l = loc.crop((0, y0, 500, min(y1, loc.height)))
    canvas = Image.new('RGB', (1010, h), (255, 0, 255))
    canvas.paste(r, (0, 0))
    canvas.paste(l, (510, 0))
    d = ImageDraw.Draw(canvas)
    d.text((5, 5), 'REF', fill=(255, 0, 0))
    d.text((515, 5), 'LOCAL', fill=(255, 0, 0))
    canvas.save(f'/tmp/t22_cmp_{name}.png')
    print('saved', name)

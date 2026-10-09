#!/usr/bin/env python3
"""Crop ref/local/diff dải y -> /tmp/t22_z_<y0>.png (ref trên, local dưới)."""
import sys
from PIL import Image
import numpy as np
RD = '/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/'
y0, y1 = int(sys.argv[1]), int(sys.argv[2])
x0, x1 = (int(sys.argv[3]), int(sys.argv[4])) if len(sys.argv) > 4 else (0, 500)
l = Image.open(RD + 'local.png').convert('RGB').crop((x0, y0, x1, min(y1, 11572)))
r = Image.open(RD + 'ref.png').convert('RGB').crop((x0, y0, x1, min(y1, 11572)))
w, h = l.size
out = Image.new('RGB', (w * 2 + 8, h), (255, 0, 255))
out.paste(r, (0, 0))      # ref trái
out.paste(l, (w + 8, 0))  # local phải
p = f'/tmp/t22_z_{y0}.png'
out.save(p)
print(p, 'ref|local', out.size)

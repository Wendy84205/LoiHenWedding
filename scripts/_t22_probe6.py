#!/usr/bin/env python3
"""Probe: map bbox, RSVP card bbox, photo y8350, diff detail 1250-1400."""
from PIL import Image
import numpy as np, json
RD = '/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/'
l = np.asarray(Image.open(RD + 'local.png').convert('RGB')).astype(int)
r = np.asarray(Image.open(RD + 'ref.png').convert('RGB')).astype(int)
page = np.array([71, 53, 41])

def bbox(img, y0, y1, x0, x1, th=40):
    m = (np.abs(img[y0:y1, x0:x1] - page).sum(axis=2) > th)
    ys, xs = np.where(m)
    if not len(xs): return None
    return (x0 + xs.min(), x0 + xs.max(), y0 + ys.min(), y0 + ys.max(), int(m.sum()))

print('MAP region y9150-9650:')
print('  ref ', bbox(r, 9150, 9650, 0, 500))
print('  loc ', bbox(l, 9150, 9650, 0, 500))
# map iframe: pixel khác nền trong ref y9230-9560 (text địa chỉ ở ~9260? tách)
print('  ref y9280-9600 (sau text):', bbox(r, 9280, 9600, 0, 500))

print('RSVP y9460-9760:')
print('  ref white card:', bbox(r, 9460, 9770, 0, 500, th=200))
print('  loc white card:', bbox(l, 9460, 9770, 0, 500, th=200))

print('photo y8300-8560:')
print('  ref ', bbox(r, 8300, 8560, 0, 500))
print('  loc ', bbox(l, 8300, 8560, 0, 500))
D = json.load(open('/tmp/t22_layout.json'))
for e in D:
    if 8200 <= e['y'] <= 8600 and ('url(' in (e.get('bgi') or '')):
        print('  layout photo', e['y'], e['x'], e['w'], e['h'], (e.get('bgi') or '')[-60:])

print('band/detail y1250-1420:')
for name, img in [('ref', r), ('loc', l)]:
    m = (np.abs(img[1240:1420] - page).sum(axis=2) > 40)
    ys, xs = np.where(m)
    if len(xs):
        print(' ', name, 'x', xs.min(), xs.max(), 'y', 1240 + ys.min(), 1240 + ys.max(), 'n', int(m.sum()))

# diff per-row 9400-9600 để thấy RSVP card top
g = np.abs(l.astype(np.int16) - r.astype(np.int16)).max(axis=2)
for y in range(9460, 9770, 20):
    print('row', y, 'diff', round(float(g[y:y+20].mean()), 1))

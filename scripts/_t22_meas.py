"""Đo ink bbox / màu / line-gap của ref vs local theo dải y (fix y5206, y10855)."""
from PIL import Image
import collections
import sys

ref = Image.open('artifacts/fidelity-report/thiep-cuoi-22/ref.png').convert('RGB')
loc = Image.open('artifacts/fidelity-report/thiep-cuoi-22/local.png').convert('RGB')
print('ref', ref.size, 'local', loc.size)


def strip(img, y0, y1, x0=20, x1=490, label=''):
    px = img.load()
    cnt = collections.Counter()
    for y in range(y0, y1):
        for x in range(x0, x1):
            cnt[px[x, y]] += 1
    bg = cnt.most_common(1)[0][0]
    rows, ink, xs = [], [], []
    for y in range(y0, y1):
        r = 0
        xsr = []
        for x in range(x0, x1):
            c = px[x, y]
            if abs(c[0] - bg[0]) + abs(c[1] - bg[1]) + abs(c[2] - bg[2]) > 90:
                r += 1
                xsr.append(x)
                ink.append(c)
        if r:
            rows.append((y, r))
            xs.extend(xsr)
    if not rows:
        print(f'  {label} bg={bg} NO INK')
        return
    ys = [y for y, _ in rows]
    p90 = sorted(ink, key=lambda c: sum(c))[int(len(ink) * 0.9)]
    gaps = []
    for i in range(1, len(rows)):
        if rows[i][0] - rows[i - 1][0] > 1:
            gaps.append((rows[i - 1][0], rows[i][0]))
    print(f'  {label} bg={bg} ink y {min(ys)}-{max(ys)} (h={max(ys)-min(ys)+1}) '
          f'x {min(xs)}-{max(xs)} (w={max(xs)-min(xs)+1}) n={len(ink)} p90={p90} gaps={gaps}')


for (y0, y1, name) in [
    (5210, 5236, 'heading 2022-2025 (fs20)'),
    (5240, 5415, 'body y5206'),
    (6360, 6460, 'block y6367 (fs20 known)'),
    (10855, 10970, 'docodau y10855 (fs20 known)'),
]:
    print(name)
    strip(ref, y0, y1, label='REF ')
    strip(loc, y0, y1, label='LOC ')

from PIL import Image
import numpy as np
r = np.asarray(Image.open('/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/ref.png').convert('RGB'))
PAGE = (71, 53, 41)
def near(c, t, tol=6):
    return abs(int(c[0]) - t[0]) <= tol and abs(int(c[1]) - t[1]) <= tol and abs(int(c[2]) - t[2]) <= tol
def scan_rows(x, y0, y1, label):
    print(f'-- rows x={x} {y0}..{y1} {label}')
    prev = None
    for y in range(y0, y1):
        c = tuple(r[y, x])
        if c != prev:
            print(f'  y={y} rgb{c}')
            prev = c
def scan_cols(y, x0, x1, label):
    print(f'-- cols y={y} {x0}..{x1} {label}')
    prev = None
    for x in range(x0, x1):
        c = tuple(r[y, x])
        if c != prev:
            print(f'  x={x} rgb{c}')
            prev = c
# 1. SAVE THE DATE band (x250)
scan_rows(250, 8740, 8840, 'savedate band')
# 2. rating card left edge + vertical extent (x30 vertical, y930..1090)
scan_rows(30, 930, 1090, 'rating card')
scan_cols(955, 10, 50, 'rating card left edge')
scan_cols(955, 440, 495, 'rating card right edge')
# 3. song card extent
scan_rows(30, 1090, 1340, 'song card')
scan_cols(1150, 10, 50, 'song card left')
scan_cols(1150, 440, 495, 'song card right')
# 4. swatches row
scan_cols(1300, 200, 340, 'swatches')
scan_rows(225, 1275, 1330, 'swatch1 rows')
# 5. quote rules
for yy, xx0, xx1, lab in [(3872, 10, 200, 'quote1 rule y3872'), (5114, 260, 420, 'quote2 rule'), (6268, 10, 200, 'quote3 rule')]:
    row = r[yy, xx0:xx1]
    nz = [i + xx0 for i, c in enumerate(row) if not near(c, PAGE, 4)]
    print(f'{lab}: nonbg x -> {nz[:3]}..{nz[-3:] if nz else []} count={len(nz)} color={tuple(r[yy, nz[0]]) if nz else None}')
# 6. peach frame left border
scan_cols(7400, 45, 80, 'peach frame left')
# 7. 'xếp hạng' line to right (y957)
row = r[957, 170:470]
nz = [i + 170 for i, c in enumerate(row) if not near(c, PAGE, 4)]
print('xep hang line y957 nonbg:', len(nz), nz[:2], nz[-2:] if nz else None, tuple(r[957, nz[0]]) if nz else None)
# 8. rules near Time/Location headers
for yy in range(8975, 9010):
    row = r[yy, 100:400]
    nz = [i + 100 for i, c in enumerate(row) if not near(c, PAGE, 4)]
    if len(nz) > 100:
        print(f'time rule? y={yy} count={len(nz)} x{nz[0]}..{nz[-1]} color={tuple(r[yy, nz[0]])}')

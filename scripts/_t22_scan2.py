#!/usr/bin/env python3
from PIL import Image
import numpy as np
r = np.asarray(Image.open('/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/ref.png').convert('RGB'))

def runs(y, x0, x1, pred, label):
    out = []
    start = None
    for x in range(x0, x1):
        v = pred(tuple(int(t) for t in r[y, x]))
        if v and start is None:
            start = x
        if not v and start is not None:
            out.append((start, x - 1))
            start = None
    if start is not None:
        out.append((start, x1 - 1))
    print(label, [s for s in out if s[1] - s[0] > 4])

white = lambda c: c[0] > 235 and c[1] > 230 and c[2] > 230
runs(870, 170, 495, white, 'btn row y870 white runs:')

# badge vertical bounds
gold = lambda c: abs(c[0] - 250) < 12 and abs(c[1] - 208) < 14 and abs(c[2] - 148) < 18
gray = lambda c: abs(c[0] - 104) < 10 and abs(c[1] - 97) < 10 and abs(c[2] - 91) < 12
for x, pred, lab in [(200, gold, 'gold x200 col'), (300, gray, 'gray x300 col'), (440, gray, 'gray x440 col')]:
    ys = [y for y in range(715, 785) if pred(tuple(int(t) for t in r[y, x]))]
    print(lab, (min(ys), max(ys)) if ys else None)

# rating line inside card: rows y945..975, x172..470, compare vs card bg (59,40,34)
card = lambda c: abs(c[0] - 59) < 7 and abs(c[1] - 40) < 7 and abs(c[2] - 34) < 7
for y in range(945, 975):
    xs = [x for x in range(172, 470) if not card(tuple(int(t) for t in r[y, x]))]
    if len(xs) > 30:
        print('rating line y=', y, 'x', xs[0], '-', xs[-1], 'n=', len(xs), 'c=', tuple(int(t) for t in r[y, xs[len(xs) // 2]]))

# header bg boxes (thoi gian / dia diem / tips)
for (y, x, lab) in [(8950, 250, 'thoigian box'), (8940, 205, 'tg box left'), (9160, 250, 'diadiem box'), (10018, 250, 'tips box'), (9668, 250, 'rsvp title bg'), (9650, 100, 'rsvp card tl')]:
    print(lab, (y, x), tuple(int(t) for t in r[y, x]))

# bracket color at L boxes
print('bracket px', tuple(int(t) for t in r[8921, 195]), tuple(int(t) for t in r[8975, 320]))
# save the date band x-extent (row y8775)
runs(8775, 0, 500, lambda c: abs(c[0]-230)<10 and abs(c[1]-188)<10 and abs(c[2]-163)<12, 'savedate band x:')
# peach frame bounds
runs(7400, 0, 500, lambda c: (abs(c[0]-230)<10 and abs(c[1]-188)<10 and abs(c[2]-163)<12) or (abs(c[0]-190)<10 and abs(c[1]-146)<10 and abs(c[2]-109)<12), 'peach frame x y7400:')
ys = [y for y in range(7270, 7560) if (abs(int(r[y,50,0])-230)<10 and abs(int(r[y,50,1])-188)<10 and abs(int(r[y,50,2])-163)<12)]
print('peach frame col x50 y:', (min(ys), max(ys)) if ys else None)
# quote rule rows precise (quote1/2/3)
for y0, y1, x0, x1, lab in [(3855, 3880, 70, 220, 'q1'), (5060, 5100, 280, 470, 'q2'), (6255, 6290, 10, 220, 'q3')]:
    for y in range(y0, y1):
        xs = [x for x in range(x0, x1) if not (abs(int(r[y,x,0])-71)<5 and abs(int(r[y,x,1])-53)<5 and abs(int(r[y,x,2])-41)<5)]
        if len(xs) > 60 and (xs[-1]-xs[0]+1) - len(xs) < 12:
            print('rule', lab, 'y=', y, 'x', xs[0], '-', xs[-1], 'c=', tuple(int(t) for t in r[y, xs[len(xs)//2]]))

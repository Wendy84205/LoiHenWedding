import json
from PIL import Image
import numpy as np

D = json.load(open('/tmp/t22_layout.json'))
print('--- elements with border or radius ---')
seen = set()
for d in D:
    if d['bd'].startswith('0px') and d['br'] == '0px':
        continue
    k = (d['y'], d['x'], d['w'], d['h'], d['bd'], d['br'])
    if k in seen:
        continue
    seen.add(k)
    cls = ' '.join(c for c in d['cls'].split() if not c.startswith('jsx-'))[:34]
    print(f"{d['y']:5} {d['x']:4} {d['w']:4}x{d['h']:<4} <{cls}> bg={d['bg']} bd={d['bd']} br={d['br']} txt={d['txt'][:36]}")

r = np.asarray(Image.open('/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/ref.png').convert('RGB'))
def px(name, y, x, h=4, w=4):
    reg = r[y:y+h, x:x+w].reshape(-1, 3).mean(0).round(0).astype(int)
    print(f'{name}: rgb({reg[0]},{reg[1]},{reg[2]}) #{reg[0]:02x}{reg[1]:02x}{reg[2]:02x}')
print('--- pixel samples ---')
px('swatch1 y1295 x220', 1295, 220, 14, 14)
px('swatch2 y1295 x260', 1295, 260, 14, 14)
px('swatch3 y1295 x300', 1295, 300, 14, 14)
px('rating card bg y960 x40', 960, 40, 8, 8)
px('song card bg y1150 x40', 1150, 40, 8, 8)
px('song card bg y1230 x450', 1230, 450, 8, 8)
px('peach frame border y7300 x60', 7299, 60, 3, 3)
px('peach interior y7400 x200', 7400, 200, 8, 8)
px('savedate band y8775 x60', 8774, 60, 8, 8)
px('savedate band y8775 x400', 8774, 400, 8, 8)
px('rsvp card bg y9620 x80', 9620, 80, 8, 8)
px('rsvp card bg y9940 x400', 9940, 400, 8, 8)
px('btn Muon xem y865 x200', 862, 200, 8, 8)
px('NO1 badge y742 x185', 742, 185, 8, 8)
px('Phim badge y742 x300', 742, 300, 8, 8)
px('page bg y3400 x480', 3400, 480, 8, 8)
px('rule y5118 x300', 5114, 300, 3, 60)
px('rule y2260 x150', 2258, 150, 3, 60)
px('time rule y8990 x150', 8988, 150, 3, 60)
px('tips rule y10060 x150', 10058, 150, 3, 60)

import json
D = json.load(open('/tmp/t22_layout.json'))
seen = set()
out = []
for d in D:
    k = (d['y'], d['x'], d['w'], d['h'], d['txt'][:60])
    if k in seen:
        continue
    seen.add(k)
    out.append(d)
lines = []
for d in out:
    cls = ' '.join(c for c in d['cls'].split() if not c.startswith('jsx-'))[:40]
    bgi = ' IMG:' + d['bgi'].split('/')[-1][:40] if d['bgi'] else ''
    txt = d['txt'][:90]
    fx = ' FX' + str(d['fx']) if d['fx'] else '    '
    lines.append(f"{d['y']:5} {d['x']:4} {d['w']:4}x{d['h']:<4}{fx} <{cls}> bg={d['bg']}{bgi} f={d['ff'][:9]}/{d['fs']}/{d['fw']}/{d['fst'][:3]} c={d['color']} ta={d['ta']} | {txt}")
open('/tmp/t22_c.txt', 'w').write('\n'.join(lines))
print('dedup', len(out))
print('--- blocks h>=150 (sections/photos) ---')
for d in out:
    if d['fx'] == 0 and d['h'] >= 150 and d['w'] >= 150:
        cls = ' '.join(c for c in d['cls'].split() if not c.startswith('jsx-'))[:36]
        print(f"{d['y']:5} {d['x']:4} {d['w']:4}x{d['h']:<5} <{cls}> bg={d['bg']} bgs={d['bgs']} bgp={d['bgp']} txt={d['txt'][:40]}")

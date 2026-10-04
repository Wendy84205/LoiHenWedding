import json

ref = json.load(open('/tmp/t5_measure.json'))
loc = json.load(open('/tmp/t5_local_measure.json'))

print('canvas ref', ref['canvas'], '| local', loc['canvas'])
R = {n['id']: n for n in ref['nodes']}
bad = []
for n in loc['nodes']:
    r = R.get(n['origId'])
    if not r:
        bad.append((n['origId'], 'KHÔNG CÓ Ở BẢN GỐC'))
        continue
    d = []
    for k in ('top', 'left', 'w', 'h'):
        if abs(n[k] - r[k]) > 1.5:
            d.append('%s %.2f vs %.2f (lệch %+.2f)' % (k, n[k], r[k], n[k] - r[k]))
    if d:
        bad.append((n['origId'], '; '.join(d)))

print('\n%d/%d node lệch quá 1.5px' % (len(bad), len(loc['nodes'])))
for nid, msg in bad:
    print(' ', nid, msg)

# so sánh text style của các node chữ
TL = {t['origId']: t for t in loc['nodes'] if t.get('text')}
print('\n--- style chữ ---')
for t in ref['texts']:
    lid = t['id']
    l = next((x for x in loc['nodes'] if x['origId'] == lid), None)
    if not l:
        print(' %-13s THIẾU node cục bộ' % lid)
        continue
    if not l.get('text'):
        continue
    if not t['leaves']:
        continue
    r0 = t['leaves'][0]
    diffs = []
    if r0['fs'] != l['fs']:
        diffs.append('fs %s vs %s' % (r0['fs'], l['fs']))
    if r0['color'] != l['color']:
        diffs.append('color %s vs %s' % (r0['color'], l['color']))
    if r0['ff'].replace('"', '') != l['ff'].split(',')[0].strip('"'):
        diffs.append('ff %s vs %s' % (r0['ff'], l['ff']))
    if r0['ta'] != l['ta']:
        diffs.append('align %s vs %s' % (r0['ta'], l['ta']))
    if diffs:
        print(' %-13s %s' % (lid, ' | '.join(diffs)))

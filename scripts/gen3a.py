import json, re, os
from html import unescape
n = json.load(open('/tmp/t3_nodes.json'))
files = sorted(os.listdir('public/assets/template3-ref'))
Q = chr(34)
NL = chr(10)

def local_for(x):
    u = (x.get('material') or {}).get('style', {}).get('background-image', '')
    m = re.search(r'url\((https?[^)]+)\)', u or '')
    if not m:
        return None
    for f in files:
        if x['id'] in f:
            return f
    return None

def clean(html):
    s = re.sub(r'</?(div|p|br)[^>]*>', NL, html or '', flags=re.I)
    s = re.sub(r'<[^>]+>', '', s)
    s = unescape(s)
    parts = [re.sub(r'\s+', ' ', ln).strip() for ln in s.split(NL)]
    return [p for p in parts if p]

def jesc(s):
    return s.replace('\\', '\\\\').replace('"', '\\"')

sigs = {}
for x in n:
    if x['kind'] != 'text':
        continue
    t = x['text']
    key = (t.get('fontFamily'), t.get('fontSize'), t.get('fontWeight'), t.get('textAlign'), t.get('lineHeight'), t.get('color'), t.get('fontStyle'), t.get('letterSpacing'))
    if key not in sigs:
        sigs[key] = 't3n-tx%d' % len(sigs)

L = []
A = L.append
A('import React from %sreact%s;' % (Q, Q))
A('import {')
A('  Countdown,')
A('  GiftNote,')
A('  MusicButton,')
A('  Reveal,')
A('  WishForm,')
A('  useInvitationPage,')
A('} from %s./NewInvitationCommon.jsx%s;' % (Q, Q))
A('import %s./template3New.css%s;' % (Q, Q))
A('')
A('const R = %s/assets/template3-ref%s;' % (Q, Q))
A('')
A('const CAL_EMPTY = [%se1%s, %se2%s, %se3%s, %se4%s, %se5%s];' % (Q, Q, Q, Q, Q, Q, Q, Q, Q, Q))
A('const CAL_DAYS = Array.from({ length: 31 }, (_, index) => index + 1);')
A('')
A('const NODES = [')
for x in sorted(n, key=lambda z: z['idx']):
    sid = x['id']
    st = []
    if x['top'] is not None:
        st.append('top: %spx' % x['top'])
    if x['left'] is not None:
        st.append('left: %spx' % x['left'])
    if x['width'] is not None:
        st.append('width: %spx' % x['width'])
    if x['height'] is not None:
        st.append('height: %spx' % x['height'])
    an = x.get('anim') or {}
    nm = an.get('name') or ''
    d = 'right' if nm == 'slide-right' else ('left' if nm == 'slide-left' else 'up')
    dl = an.get('delay')
    if dl is None:
        dl = 0.0
    sty = ', '.join('%s: %s%s%s' % (s.split(':')[0].strip(), Q, s.split(': ', 1)[1], Q) for s in st)
    dd = '%s%s%s' % (Q, d, Q)
    kind = 'blank' if x['kind'] == 'empty' else x['kind']
    base = 'id: %s%s%s, kind: %s%s%s, style: { %s }, direction: %s, delay: %s' % (Q, sid, Q, Q, kind, Q, sty, dd, dl)
    if x['kind'] == 'text':
        t = x['text']
        key = (t.get('fontFamily'), t.get('fontSize'), t.get('fontWeight'), t.get('textAlign'), t.get('lineHeight'), t.get('color'), t.get('fontStyle'), t.get('letterSpacing'))
        cls = sigs[key]
        ls = clean(t.get('html', ''))[:6]
        lsj = ', '.join('%s%s%s' % (Q, jesc(s), Q) for s in ls)
        A('  { %s, cls: %s%s%s, lines: [%s] },' % (base, Q, cls, Q, lsj))
    elif x['kind'] == 'photo':
        lf = local_for(x)
        src = '`${R}/%s`' % lf if lf else 'null'
        A('  { %s, src: %s },' % (base, src))
    else:
        A('  { %s },' % base)
A('];')
open('/tmp/t3_nodes_part.jsx', 'w').write(NL.join(L) + NL)
print('wrote', len([l for l in L if l.startswith('  { id:')]), 'nodes')

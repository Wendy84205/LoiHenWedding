import json, re
from html import unescape
n = json.load(open('/tmp/t3_nodes.json'))
import os
files = sorted(os.listdir('public/assets/template3-ref'))

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
    s = re.sub(r'</?(div|p|br)[^>]*>', chr(10), html or '', flags=re.I)
    s = re.sub(r'<[^>]+>', '', s)
    s = unescape(s)
    parts = [re.sub(r'\s+', ' ', ln).strip() for ln in s.split(chr(10))]
    return [p for p in parts if p]

def esc(s):
    return s.replace(chr(92), chr(92) + chr(92)).replace('"', chr(92) + '"')

def style_of(x):
    st = []
    st.append('top: %spx' % x['top'] if x['top'] is not None else 'top: 0px')
    st.append('left: %spx' % x['left'] if x['left'] is not None else 'left: 0px')
    st.append('width: %spx' % x['width'] if x['width'] is not None else 'width: 100pct')
    if x['height'] is not None:
        st.append('height: %spx' % x['height'])
    if x.get('z'):
        st.append('zIndex: %s' % x['z'])
    if x.get('rotate'):
        st.append('transform: rotate(%sdeg)' % x['rotate'])
    return st

def anim_of(x):
    an = x.get('anim') or {}
    nm = an.get('name') or ''
    if nm == 'slide-right':
        d = 'right'
    elif nm == 'slide-left':
        d = 'left'
    else:
        d = 'up'
    dl = an.get('delay')
    if dl is None:
        dl = 0.0
    return d, dl

sigs = {}
for x in n:
    if x['kind'] != 'text':
        continue
    t = x['text']
    key = (t.get('fontFamily'), t.get('fontSize'), t.get('fontWeight'), t.get('textAlign'), t.get('lineHeight'), t.get('color'), t.get('fontStyle'), t.get('letterSpacing'))
    if key not in sigs:
        sigs[key] = 't3n-tx%d' % len(sigs)

out = []
for x in sorted(n, key=lambda z: z['idx']):
    st = style_of(x)
    d, dl = anim_of(x)
    sq = chr(39)
    if x['kind'] == 'text':
        t = x['text']
        key = (t.get('fontFamily'), t.get('fontSize'), t.get('fontWeight'), t.get('textAlign'), t.get('lineHeight'), t.get('color'), t.get('fontStyle'), t.get('letterSpacing'))
        cls = sigs[key]
        ls = clean(t.get('html', ''))[:6]
        lsj = ', '.join('%s%s%s' % (chr(34), esc(s), chr(34)) for s in ls)
        out.append('NODE text %s %s || %s' % (x['id'], cls, lsj[:80]))
    elif x['kind'] == 'photo':
        lf = local_for(x)
        out.append('NODE photo %s %s' % (x['id'], lf))
    else:
        out.append('NODE %s %s' % (x['kind'], x['id']))
open('/tmp/t3_check.txt', 'w').write(chr(10).join(out))
print('total nodes:', len(out))
print('text sigs:', len(sigs))

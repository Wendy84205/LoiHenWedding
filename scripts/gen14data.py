import json, re, os
from html import unescape

n = json.load(open('/tmp/t14_nodes.json'))
files = sorted(os.listdir('public/assets/template14-ref'))


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
    s = unescape(s).replace(chr(160), ' ')
    parts = [re.sub(r'\s+', ' ', ln).strip() for ln in s.split(chr(10))]
    return [p for p in parts if p]


sigs = {}
for x in n:
    if x['kind'] != 'text':
        continue
    t = x['text']
    key = (t.get('fontFamily'), t.get('fontSize'), t.get('fontWeight'), t.get('textAlign'),
           t.get('lineHeight'), t.get('color'), t.get('fontStyle'), t.get('letterSpacing'))
    if key not in sigs:
        sigs[key] = 't14n-tx%d' % len(sigs)

css = ['/* Text classes measured 1:1 from cinelove.me/template/thiep-cuoi-14 */']
for key, cls in sigs.items():
    ff, fs, fw, ta, lh, col, fst, ls = key
    jc = 'center' if (ta or 'center') == 'center' else ('flex-end' if ta == 'right' else 'flex-start')
    fam = (ff or '"Signora"').strip('"')
    css.append('.%s { font-family: "%s", serif; font-size: %s; font-weight: %s; font-style: %s; '
               'line-height: %s; letter-spacing: %s; text-align: %s; color: %s; justify-content: %s; }'
               % (cls, fam, fs or '16px', fw or 'normal', fst or 'normal', lh or 'normal',
                  ls or '0px', ta or 'center', col or '#000', jc))
open('/tmp/t14_textcss.txt', 'w').write(chr(10).join(css) + chr(10))

rows = []
for x in sorted(n, key=lambda z: z['idx']):
    base = {'idx': x['idx'], 'id': x['id'], 'top': x['top'], 'left': x['left'],
            'width': x['width'], 'height': x['height'], 'z': x['z'],
            'rotate': x['rotate'], 'anim': x.get('anim')}
    if x['kind'] == 'text':
        t = x['text']
        key = (t.get('fontFamily'), t.get('fontSize'), t.get('fontWeight'), t.get('textAlign'),
               t.get('lineHeight'), t.get('color'), t.get('fontStyle'), t.get('letterSpacing'))
        base.update({'kind': 'text', 'cls': sigs[key], 'lines': clean(t.get('html', ''))})
    elif x['kind'] == 'photo':
        base.update({'kind': 'photo', 'file': local_for(x)})
    else:
        if x['idx'] == 77:
            base['kind'] = 'rsvp'
        elif x['kind'] in ('calendar', 'countdown', 'map', 'svg'):
            base['kind'] = x['kind']
        else:
            base['kind'] = 'blank'
    rows.append(base)

open('/tmp/t14_rows.json', 'w').write(json.dumps(rows))
print(len(sigs), 'text classes,', len(rows), 'rows')
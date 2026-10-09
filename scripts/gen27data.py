"""Sinh dữ liệu 1:1 cho Template27New.jsx từ bản trích xuất /tmp/t27_live.json
   -> /tmp/t27_rows.json, /tmp/t27_head.jsx, /tmp/t27_textcss.txt
"""
import json, os, re
from html import unescape

live = json.load(open('/tmp/t27_live.json'))
offsets = json.load(open('/tmp/t27_offsets.json'))
off = {o['id']: o for o in offsets['nodes']}
nodes = live['nodes']
files = sorted(os.listdir('public/assets/template27-ref'))

REF = '/assets/template27-ref'


def photo_file(n):
    prefix = 't27-%02d-' % n['idx']
    for f in files:
        if f.startswith(prefix):
            return f
    return None


def hex_color(c):
    m = re.match(r'rgba?\((\d+), (\d+), (\d+)', c or '')
    if not m:
        return c
    return '#%02x%02x%02x' % (int(m.group(1)), int(m.group(2)), int(m.group(3)))


def clean(html):
    s = re.sub(r'</?(div|p|br)[^>]*>', '\n', html or '', flags=re.I)
    s = re.sub(r'<[^>]+>', '', s)
    s = unescape(s).replace('\u00a0', ' ')
    parts = [re.sub(r'\s+', ' ', ln).strip() for ln in s.split('\n')]
    return [p for p in parts if p]


def svg_bits(n):
    html = (n.get('blank') or {}).get('html') or ''
    fill = (re.search(r'fill:\s*(#[0-9a-fA-F]{3,8})', html) or [None, '#000000'])[1]
    d = (re.search(r'<path\b[^>]*?\sd="([^"]+)"', html) or [None, ''])[1]
    vb = (re.search(r'viewBox="([^"]+)"', html) or [None, '0 0 100 100'])[1]
    return fill, vb, d


def direction_of(n):
    an = n.get('anim') or {}
    nm = an.get('name') or ''
    d = 'right' if nm == 'slide-right' else ('left' if nm == 'slide-left' else 'up')
    return d, an.get('delay') or 0


sigs = {}
rows = []
for n in nodes:
    kind = n['kind']
    if 'rsvp-form' in (n.get('innerCls') or '') or 'rsvp-form' in (n.get('outerCls') or ''):
        kind = 'rsvp'
    if kind == 'blank' and off.get(n['id'], {}).get('map'):
        kind = 'map'

    o = off.get(n['id'], {})
    top, left, width, height = n['top'], n['left'], n['width'], n['height']
    if top is None and left is None and width is None:
        # node chỉ có style chuyển động ở bản gốc -> lấy hình học từ DOM đã render
        top, left, width, height = o.get('top'), o.get('left'), o.get('w'), o.get('h')
    d, delay = direction_of(n)
    if not n.get('anim') and n['id'] == 'vnPph5GcZX':
        delay = 0.3

    row = {'idx': n['idx'], 'id': n['id'], 'kind': kind, 'top': top, 'left': left,
           'width': width, 'height': height, 'z': n.get('z') or 0,
           'rotate': n.get('rotate') or 0, 'direction': d, 'delay': delay,
           'opacity': (n.get('boxCs') or {}).get('opacity')}

    if kind == 'text':
        t = n['text']
        key = (t['fontFamily'], t['fontSize'], t['fontWeight'], t['fontStyle'], t['textAlign'],
               t['lineHeight'], t['letterSpacing'], t['color'])
        if key not in sigs:
            sigs[key] = 't27n-tx%d' % len(sigs)
        row['cls'] = sigs[key]
        row['lines'] = clean(t.get('html', ''))
    elif kind == 'photo':
        row['file'] = photo_file(n)
    elif kind == 'svg':
        row['fill'], row['viewBox'], row['d'] = svg_bits(n)
    elif kind == 'phone':
        row['label'] = (n.get('phone') or {}).get('label', '').strip()
    rows.append(row)

json.dump(rows, open('/tmp/t27_rows.json', 'w'), ensure_ascii=False)

# --- CSS cho từng nhóm text (đo 1:1 từ bản gốc) ---
css = ['/* Text classes measured 1:1 from cinelove.me/template/thiep-cuoi-27 */']
for key, cls in sigs.items():
    ff, fs, fw, fst, ta, lh, ls, col = key
    jc = 'center' if (ta or 'center') == 'center' else ('flex-end' if ta == 'right' else 'flex-start')
    fam = (ff or 'Signora').split(',')[0].strip().strip('"')
    css.append('.%s { font-family: "%s", serif; font-size: %s; font-weight: %s; font-style: %s; '
               'line-height: %s; letter-spacing: %s; text-align: %s; color: %s; justify-content: %s; }'
               % (cls, fam, fs or '16px', fw or 'normal', fst or 'normal',
                  lh or 'normal', '0px' if (ls or 'normal') == 'normal' else ls,
                  ta or 'center', hex_color(col), jc))
open('/tmp/t27_textcss.txt', 'w').write('\n'.join(css) + '\n')

# --- Mảng NODES cho JSX ---
Q = '"'
lines = ['const NODES = [']
for r in rows:
    style = '{ ' + ', '.join('%s: %s%s%s' % (k, Q, v, Q) for k, v in [
        ('top', '%gpx' % (r['top'] if r['top'] is not None else 0)),
        ('left', '%gpx' % (r['left'] if r['left'] is not None else 0)),
        ('width', '%gpx' % (r['width'] if r['width'] is not None else 500)),
    ] + ([('height', '%gpx' % r['height'])] if r['height'] is not None else []) +
        ([('zIndex', str(r['z']))] if r['z'] else []) +
        ([('transform', 'rotate(%gdeg)' % r['rotate'])] if r['rotate'] else [])) + ' }'
    head = ('  { id: %s, kind: %s, style: %s, direction: %s, delay: %s'
            % (Q + r['id'] + Q, Q + r['kind'] + Q, style, Q + r['direction'] + Q, r['delay']))
    if r.get('opacity') and r['opacity'] != '1':
        head += ', opacity: %s' % r['opacity']
    if r['kind'] == 'text':
        ls = ', '.join('%s%s%s' % (Q, s.replace('\\', '\\\\').replace('"', '\\"'), Q) for s in r['lines'])
        lines.append('%s, cls: %s, lines: [%s] },' % (head, Q + r['cls'] + Q, ls))
    elif r['kind'] == 'photo':
        lines.append('%s, src: `%s/%s` },' % (head, '${R}', r['file']))
    elif r['kind'] == 'svg':
        lines.append('%s, fill: %s, viewBox: %s, d: %s },' % (head, Q + r['fill'] + Q, Q + r['viewBox'] + Q, Q + r['d'] + Q))
    elif r['kind'] == 'phone':
        lines.append('%s, label: %s },' % (head, Q + r['label'] + Q))
    else:
        lines.append('%s },' % head)
lines.append('];')
open('/tmp/t27_head.jsx', 'w').write('\n'.join(lines) + '\n')

print(len(sigs), 'text classes,', len(rows), 'rows')
print('kinds', {k: sum(1 for r in rows if r['kind'] == k) for k in set(r['kind'] for r in rows)})
print('missing files', [r['file'] for r in rows if r['kind'] == 'photo' and not r['file']])
print('empty lines', [r['id'] for r in rows if r['kind'] == 'text' and not r['lines']])

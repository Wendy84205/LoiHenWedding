import json

rows = json.load(open('/tmp/t14_rows.json'))
R = '/assets/template14-ref'
Q = chr(34)
D = chr(34)


def esc(s):
    return s.replace(chr(92), chr(92) * 2).replace(D, chr(92) + D)


def style_of(x):
    pairs = [('top', '%spx' % (x['top'] if x['top'] is not None else 0)),
             ('left', '%spx' % (x['left'] if x['left'] is not None else 0)),
             ('width', '%spx' % (x['width'] if x['width'] is not None else 500))]
    if x.get('height') is not None:
        pairs.append(('height', '%spx' % x['height']))
    if x.get('z'):
        pairs.append(('zIndex', '%s' % x['z']))
    if x.get('rotate'):
        pairs.append(('transform', 'rotate(%sdeg)' % x['rotate']))
    return '{ ' + ', '.join('%s: %s%s%s' % (k, D, v, D) for k, v in pairs) + ' }'


def anim_of(x):
    an = x.get('anim') or {}
    nm = an.get('name') or ''
    d = 'right' if nm == 'slide-right' else ('left' if nm == 'slide-left' else 'up')
    return d, an.get('delay') or 0


lines = []
lines.append('import React from "react";')
lines.append('import {')
lines.append('  Countdown,')
lines.append('  MusicButton,')
lines.append('  Reveal,')
lines.append('  RsvpForm,')
lines.append('  useInvitationPage,')
lines.append('} from "./NewInvitationCommon.jsx";')
lines.append('import "./template14New.css";')
lines.append('')
lines.append('const R = "%s";' % R)
lines.append('')
lines.append('const NODES = [')
for x in rows:
    d, dl = anim_of(x)
    st = style_of(x)
    if x['kind'] == 'text':
        ls = ', '.join('%s%s%s' % (D, esc(s), D) for s in x['lines'])
        lines.append('  { id: %s, kind: "text", style: %s, direction: %s, delay: %s, cls: %s, lines: [%s] },'
                     % (D + x['id'] + D, st, D + d + D, dl, D + x['cls'] + D, ls))
    elif x['kind'] == 'photo':
        lines.append('  { id: %s, kind: "photo", style: %s, direction: %s, delay: %s, src: `${R}/%s` },'
                     % (D + x['id'] + D, st, D + d + D, dl, x['file']))
    else:
        lines.append('  { id: %s, kind: %s, style: %s, direction: %s, delay: %s },'
                     % (D + x['id'] + D, D + x['kind'] + D, st, D + d + D, dl))
lines.append('];')
lines.append('')

body = chr(10).join(lines)
open('/tmp/t14_head.jsx', 'w').write(body)
print('nodes', len(rows))
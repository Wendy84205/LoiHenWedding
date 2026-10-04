"""Sinh Template5New.jsx + template5New.css từ dữ liệu đã trích từ cinelove.me."""
import json, re

d = json.load(open('/tmp/t5_full.json'))
REF = '/assets/template5-ref'
FONT_MAP = {
    'PlayfairDisplay': '"PlayfairDisplay", Georgia, serif',
    'Sacramento': '"Sacramento", cursive',
    'Signora': '"Signora", cursive',
    'Roboto': 'Roboto, "OpenSans", Arial, sans-serif',
    'Arial': 'Arial, sans-serif',
    'Playfair Display, serif': '"PlayfairDisplay", Georgia, serif',
}


def clean(s):
    return (s.replace('&nbsp;', '\u00a0').replace('&amp;', '&')
            .replace('&quot;', '"').replace('&#39;', "'").replace('&lt;', '<').replace('&gt;', '>'))


def to_lines(html):
    html = re.sub(r'<span[^>]*>', '', html).replace('</span>', '')
    out = []
    for p in re.split(r'<div[^>]*>', html):
        p = clean(re.sub(r'<[^>]+>', '', p)).strip()
        if p:
            out.append(p)
    return out


def px(v):
    return v.replace('px', '').strip()


def direction(k):
    if 'right' in k:
        return 'right'
    if 'left' in k:
        return 'left'
    if 'down' in k:
        return 'down'
    return 'up'


def js_str(s):
    return json.dumps(s, ensure_ascii=False)


nodes, rules = [], []
for r in d:
    style = {'top': px(r['top']), 'left': px(r['left']), 'width': px(r['width'])}
    if r['height'] and r['height'] != 'auto':
        style['height'] = px(r['height'])
    if r['z'] != '0':
        style['zIndex'] = r['z']
    node = {
        'id': r['id'], 'style': style,
        'direction': direction(r.get('anim', '')),
        'delay': float(r.get('delay', 0) or 0),
    }
    k = r['kind']
    if k == 'text':
        cls = 't5n-t' + r['id'].replace('-', '_')
        lines = to_lines(r['html'])
        node.update({'kind': 'text', 'cls': cls, 'lines': lines})
        ff = clean(r.get('font-family') or '').strip()
        decl = [
            'width: 100%',
            'font-size: %s' % r['font-size'],
            'font-weight: %s' % r['font-weight'],
            'color: %s' % r['color'],
            'text-align: %s' % (r.get('text-align') or 'left'),
            'font-family: %s' % FONT_MAP.get(ff, ff or 'inherit'),
        ]
        lh = r.get('line-height')
        if lh and lh != 'normal':
            decl.append('line-height: %s' % lh)
        ls = r.get('letter-spacing')
        if ls and ls not in ('0px', 'normal', '0'):
            decl.append('letter-spacing: %s' % ls)
        pad = r.get('padding')
        if pad and pad != '0px 0px 0px 0px':
            decl.append('padding: %s' % pad)
        # cls nằm trên .t5n-textwrap, không phải trên node
        rules.append('.t5n .t5n-node .t5n-textwrap.%s { %s; }' % (cls, '; '.join(decl)))
    elif k == 'photo':
        node.update({'kind': 'photo', 'src': REF + '/' + r['src'].rsplit('/', 1)[-1]})
        if r.get('mask'):
            node['mask'] = REF + '/' + r['mask'].rsplit('/', 1)[-1]
    elif k == 'svg':
        node.update({'kind': 'svg', 'src': REF + '/svg/%s.svg' % r['id']})
    elif k == 'calendar':
        node['kind'] = 'calendar'
    elif k == 'other':
        # shape client-render: đã trích sẵn svg/ theo id node
        node.update({'kind': 'svg', 'src': REF + '/svg/%s.svg' % r['id']})
    if k == 'text' and not node['lines']:
        node['kind'] = 'blank'
    nodes.append(node)

json.dump(nodes, open('/tmp/t5_nodes_final.json', 'w'), ensure_ascii=False, indent=1)
open('/tmp/t5_textcss.json', 'w').write(json.dumps(rules, ensure_ascii=False, indent=1))
print(len(nodes), 'nodes,', len(rules), 'text rules')

import json

nodes = json.load(open('/tmp/t5_nodes_final.json'))
rules = json.load(open('/tmp/t5_textcss.json'))
JSX = '/Users/wendy/Documents/LoiHenWedding/src/templates/new/Template5New.jsx'
CSS = '/Users/wendy/Documents/LoiHenWedding/src/templates/new/template5New.css'


def js(s):
    return json.dumps(s, ensure_ascii=False)


def build_nodes():
    out = []
    for n in nodes:
        p = ["id: " + js(n['id']),
             "kind: " + js(n['kind']),
             "style: { %s }" % ', '.join(
                 ("zIndex: '%s'" % v) if k == 'zIndex' else ("%s: '%spx'" % (k, v))
                 for k, v in n['style'].items())]
        if n['kind'] == 'text':
            p.append("cls: " + js(n['cls']))
            p.append("lines: [%s]" % ', '.join(js(x) for x in n['lines']))
        if n['kind'] in ('photo', 'svg'):
            p.append("src: " + js(n['src']))
        if n['kind'] == 'photo' and n.get('mask'):
            p.append("mask: " + js(n['mask']))
        if n['kind'] == 'shape':
            p.append("fill: " + js(n['fill']))
        p.append("direction: " + js(n['direction']))
        p.append("delay: %s" % n['delay'])
        out.append('  { %s },' % ', '.join(p))
    return '\n'.join(out)


head = open('/tmp/t5_head.jsx', encoding='utf-8').read()
body = open('/tmp/t5_body.jsx', encoding='utf-8').read()
base_css = open('/tmp/t5_base.css', encoding='utf-8').read()
cal_css = open('/tmp/t5_cal.css', encoding='utf-8').read()

open(JSX, 'w').write(head + build_nodes() + body)
open(CSS, 'w').write(base_css + cal_css + '\n' + '\n'.join(rules) + '\n')
print('written', len(nodes), 'nodes,', len(rules), 'rules')

import re, json

h = open('/tmp/t5.html', encoding='utf-8').read()
start = h.find('<div id="root-page-container"')
end = h.find('Made with Cinelove')
body = h[start:end]

pat = re.compile(r'<div data-node-id="([A-Za-z0-9_-]+)" style="position:absolute;[^"]*"')
ms = list(pat.finditer(body))

out = []
for idx, m in enumerate(ms):
    nid = m.group(1)
    outer = m.group(0)
    endpos = ms[idx + 1].start() if idx + 1 < len(ms) else len(body)
    seg = body[m.start():endpos]

    def sget(k, d=''):
        mm = re.search(k + r':\s*([^;"]*)', outer)
        return mm.group(1).strip() if mm else d

    rec = {
        'id': nid,
        'top': sget('top'), 'left': sget('left'),
        'width': sget('width'), 'height': sget('height'),
        'z': sget('z-index', '0'),
        'cls': (re.search(r'class="([^"]*)"', seg).group(1) if re.search(r'class="([^"]*)"', seg) else ''),
    }
    tk = re.search(r'data-transition-key="([^"]*)"', seg)
    if tk:
        # dạng: <id có thể chứa '-'>-<anim>-<duration>-<delay>-ease-out-<bool>
        key = tk.group(1)
        m2 = re.search(r'-(slide-(?:up|down|left|right)|zoom-in|zoom-out|fade-up|fade-down|fade-left|fade-right|fade)-(\d+(?:\.\d+)?)-(\d+(?:\.\d+)?)-ease', key)
        if m2:
            rec['anim'] = m2.group(1)
            rec['duration'] = m2.group(2)
            rec['delay'] = m2.group(3)
        else:
            rec['anim'] = 'slide-up'
            rec['duration'] = '1.3'
            rec['delay'] = '0'

    # text box
    if 'text-box-component' in rec['cls']:
        rec['kind'] = 'text'
        inner = re.search(r'<div disabled="" style="([^"]*)"[^>]*>(.*?)</div></div></div>', seg, re.S)
        if inner:
            style = inner.group(1)
            content = inner.group(2)
            for k in ('color', 'font-size', 'font-weight', 'text-align', 'line-height', 'letter-spacing', 'text-transform', 'font-style'):
                v = re.search(k + r':\s*([^;"]*)', style)
                rec[k] = v.group(1).strip() if v else None
            # &quot; chứa ký tự ';' nên phải tách riêng font-family
            mf = re.search(r'font-family:([^;]*(?:;[^;]*?)*?);(?=\s*[a-z-]+:)', style)
            rec['font-family'] = mf.group(1).strip() if mf else None
            wrap = re.search(r'display:flex;align-items:(\w+);justify-content:(\w+)', seg)
            if wrap:
                rec['align'] = wrap.group(1)
                rec['justify'] = wrap.group(2)
            pad = re.search(r'padding:\s*([^;"]*)', seg)
            rec['padding'] = pad.group(1).strip() if pad else None
            # split lines: top-level divs inside
            rec['html'] = content
    elif 'photo-component' in seg or 'photo-bg-wrap' in seg:
        rec['kind'] = 'photo'
        u = re.search(r'background-image:url\(([^)]*)\)', seg)
        rec['src'] = u.group(1) if u else None
        mk = re.search(r'mask-image:url\(([^)]*)\)', seg)
        rec['mask'] = mk.group(1) if mk else None
    elif 'simple-map-container' in seg:
        rec['kind'] = 'map'
        u = re.search(r'src="(https://maps[^"]*)"', seg)
        rec['src'] = u.group(1) if u else None
    elif 'calendar componentBOX' in seg:
        rec['kind'] = 'calendar'
    elif '<svg' in seg:
        rec['kind'] = 'svg'
        u = re.search(r'background-image:url\(([^)]*)\)', seg)
        rec['src'] = u.group(1) if u else None
        sv = re.search(r'<svg[^>]*>.*?</svg>', seg, re.S)
        rec['svg'] = sv.group(0) if sv else None
        br = re.findall(r'border-radius:(\d+)px', seg)
        rec['radius'] = br
    else:
        rec['kind'] = 'other'
        rec['raw'] = seg[:400]
    out.append(rec)

json.dump(out, open('/tmp/t5_full.json', 'w'), ensure_ascii=False, indent=1)
print(len(out))
for r in out:
    print(r['kind'], r['id'], r['top'], r['left'], r['width'], r['height'], 'z' + r['z'], r.get('delay', ''), (r.get('html') or '')[:60].replace('\n', ' '))

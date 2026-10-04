import json, os, re, urllib.request

nodes = json.load(open('/tmp/t14_nodes.json'))
out = 'public/assets/template14-ref'
os.makedirs(out, exist_ok=True)

for i, x in enumerate(nodes):
    if x['kind'] != 'photo':
        continue
    st = (x.get('material') or {}).get('style', {})
    u = st.get('background-image', '')
    m = re.search(r'url\((https?[^)]+)\)', u or '')
    if not m:
        print('NO URL', x['id'], (u or '')[:60])
        continue
    url = m.group(1).split('?')[0]
    ext = os.path.splitext(url.split('/')[-1])[1].lower() or '.jpg'
    if ext not in ('.jpg', '.jpeg', '.png', '.webp', '.gif'):
        ext = '.jpg'
    fn = 't14-%02d-%s%s' % (i, x['id'], ext)
    p = os.path.join(out, fn)
    if os.path.exists(p) and os.path.getsize(p) > 1000:
        continue
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        d = urllib.request.urlopen(req, timeout=40).read()
        if len(d) < 500:
            print('SMALL', x['id'], len(d))
            continue
        open(p, 'wb').write(d)
        print('ok', fn, len(d))
    except Exception as e:
        print('ERR', x['id'], e)
"""Tải toàn bộ ảnh của thiệp cưới 27 (bản gốc cinelove.me) về public/assets/template27-ref."""
import json, os, re, urllib.request

nodes = json.load(open('/tmp/t27_live.json'))['nodes']
out = 'public/assets/template27-ref'
os.makedirs(out, exist_ok=True)

UA = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'}


def src_url(n):
    raw = (n.get('photo') or {}).get('bg') or (n.get('photo') or {}).get('src') or ''
    m = re.search(r'url\((["\']?)(https?[^"\')]+)\1\)', raw)
    if m:
        return m.group(2)
    if raw.startswith('http'):
        return raw
    return None


count = 0
for n in nodes:
    if n['kind'] != 'photo':
        continue
    url = src_url(n)
    if not url:
        print('NO URL', n['idx'], n['id'])
        continue
    path = url.split('?')[0]
    ext = os.path.splitext(path)[1].lower()
    if ext not in ('.jpg', '.jpeg', '.png', '.webp', '.gif'):
        ext = '.jpg'
    fn = 't27-%02d-%s%s' % (n['idx'], n['id'], ext)
    dest = os.path.join(out, fn)
    if os.path.exists(dest) and os.path.getsize(dest) > 800:
        continue
    try:
        req = urllib.request.Request(url, headers=UA)
        data = urllib.request.urlopen(req, timeout=60).read()
        if len(data) < 500:
            print('SMALL', fn, len(data))
            continue
        open(dest, 'wb').write(data)
        count += 1
        print('ok', fn, len(data))
    except Exception as exc:  # pragma: no cover - mang
        print('ERR', n['id'], exc)

print('downloaded', count)

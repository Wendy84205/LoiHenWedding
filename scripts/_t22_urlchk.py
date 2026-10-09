#!/usr/bin/env python3
"""Check HTTP status của tất cả background-image / img URL trong /tmp/t22_layout.json + media."""
import json
import re
import urllib.request
from concurrent.futures import ThreadPoolExecutor

D = json.load(open('/tmp/t22_layout.json'))
urls = {}
for d in D:
    for m in re.findall(r'url\(["\']?(.*?)["\']?\)', d.get('bgi') or ''):
        if m.startswith('http'):
            urls.setdefault(m, []).append(d['y'])
try:
    M = json.load(open('/tmp/t22_media.json'))
    for m in M:
        if m.get('src', '').startswith('http'):
            urls.setdefault(m['src'], []).append(m.get('y'))
except FileNotFoundError:
    pass


def check(u):
    req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=25) as r:
            head = r.read(2048)
            return u, r.status, r.headers.get('Content-Type', ''), len(head)
    except Exception as e:  # noqa: BLE001
        code = getattr(e, 'code', None)
        return u, code or f'ERR:{e}', '', 0


with ThreadPoolExecutor(max_workers=10) as ex:
    results = list(ex.map(check, sorted(urls)))

out = []
for u, st, ct, _n in results:
    ys = sorted(set(urls[u]))
    name = u.split('/')[-1][:48]
    out.append({'status': st, 'y': ys, 'name': name, 'url': u})
    print(st, ys, name, flush=True)
json.dump(out, open('/tmp/t22_urlstatus.json', 'w'), indent=1)
print('total', len(out), 'OK', sum(1 for o in out if o['status'] == 200))

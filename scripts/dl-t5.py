import re, os, urllib.request, sys

h = open('/tmp/t5.html', encoding='utf-8').read()
start = h.find('<div id="root-page-container"')
end = h.find('Made with Cinelove')
body = h[start:end]

OUT = '/Users/wendy/Documents/LoiHenWedding/public/assets/template5-ref'
os.makedirs(OUT, exist_ok=True)

urls = sorted(set(re.findall(r'background-image:url\((https://[^)]+)\)', body)))
urls += sorted(set(re.findall(r'src="(https://assets\.cinelove\.me/assets/[^"]+\.png)"', body)))
urls = sorted(set(urls))
print(len(urls), 'urls')
for u in urls:
    name = u.rsplit('/', 1)[-1].split('?')[0]
    path = os.path.join(OUT, name)
    if os.path.exists(path):
        print('skip', name)
        continue
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'Mozilla/5.0'})
        data = urllib.request.urlopen(req, timeout=60).read()
        open(path, 'wb').write(data)
        print('ok  ', name, len(data))
    except Exception as e:
        print('FAIL', name, e)

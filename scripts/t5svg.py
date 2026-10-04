import json, re, os

svgs = json.load(open('/tmp/t5_svgs.json'))
out_dir = '/Users/wendy/Documents/LoiHenWedding/public/assets/template5-ref/svg'
os.makedirs(out_dir, exist_ok=True)

for nid, v in svgs.items():
    html = v['html']
    paths = re.findall(r'<path[^>]*\sd="([^"]+)"', html)
    if not paths:
        print('no path', nid)
        continue
    vb = re.search(r'viewBox="([^"]+)"', html).group(1)
    d = ' '.join(paths)
    # collapse whitespace in path data
    d = re.sub(r'\s+', ' ', d).strip()
    content = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" preserveAspectRatio="none"><path d="{d}" fill="#932c20"/></svg>'
    fn = f'{nid}.svg'
    open(os.path.join(out_dir, fn), 'w').write(content)
    print('ok', fn, vb, len(paths), len(d))

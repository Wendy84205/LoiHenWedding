import json, urllib.request, os, re
n=json.load(open('/tmp/t3_nodes.json'))
dst='public/assets/template3-ref'
os.makedirs(dst, exist_ok=True)
seen={}
for x in n:
  if x['kind']!='photo': continue
  u=(x.get('material') or {}).get('style',{}).get('background-image','')
  m=re.search(r'url\((https?[^)]+)\)', u or '')
  if m: seen[m.group(1).split('?')[0]]=x['id']
print('unique photo urls:', len(seen))
ok=fail=0
for i,(u,nid) in enumerate(sorted(seen.items())):
  ext='.png' if u.endswith('.png') else '.jpg'
  fn=f't3-{i:02d}-{nid}{ext}'
  p=os.path.join(dst, fn)
  if os.path.exists(p) and os.path.getsize(p)>0: ok+=1; continue
  try:
    req=urllib.request.Request(u, headers={'User-Agent':'Mozilla/5.0','Referer':'https://cinelove.me/'})
    with urllib.request.urlopen(req, timeout=30) as r, open(p,'wb') as f:
      f.write(r.read())
    ok+=1
    print('ok', fn)
  except Exception as e:
    print('FAIL', u[:100], e); fail+=1
print('downloaded/existing:', ok, 'fail:', fail)

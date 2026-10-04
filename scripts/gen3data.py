import json, re
from html import unescape
n=json.load(open('/tmp/t3_nodes.json'))
# photo url -> local file
import os
files=sorted(os.listdir('public/assets/template3-ref'))
def local_for(x):
  u=(x.get('material') or {}).get('style',{}).get('background-image','')
  m=re.search(r'url\((https?[^)]+)\)', u or '')
  if not m: return None
  base=m.group(1).split('?')[0]
  for f in files:
    # match by node id in filename
    if x['id'] in f: return f
  return None
def clean(html):
  # convert <div> breaks to newlines then strip tags
  s=re.sub(r'</?(div|p|br)[^>]*>', '\n', html or '', flags=re.I)
  s=re.sub(r'<[^>]+>', '', s)
  s=unescape(s)
  lines=[re.sub(r'\s+',' ',ln).strip() for ln in s.split('\n')]
  lines=[ln for ln in lines if ln]
  return lines
# text style signature -> class
sigs={}
order=[]
for x in n:
  if x['kind']!='text': continue
  t=x['text']
  key=(t.get('fontFamily'),t.get('fontSize'),t.get('fontWeight'),t.get('textAlign'),t.get('lineHeight'),t.get('color'),t.get('fontStyle'),t.get('letterSpacing'))
  if key not in sigs:
    sigs[key]=f't3n-tx{len(sigs)}'
    order.append((sigs[key],key))
lines=[]
lines.append('/* text classes (measured 1:1 from cinelove.me/template/thiep-cuoi-3) */')
for cls,key in order:
  ff,fs,fw,ta,lh,col,fst,ls=key
  jc='center' if (ta or 'center')=='center' else ('flex-end' if ta=='right' else 'flex-start')
  lines.append('.%s { font-family: %s, serif; font-size: %s; font-weight: %s; font-style: %s; line-height: %s; letter-spacing: %s; text-align: %s; color: %s; justify-content: %s; }' % (cls, ff or '\"PlayfairDisplay\"', fs or '16px', fw or '500', fst or 'normal', lh or 'normal', ls or '0px', ta or 'center', col or '#000', jc))
open('/tmp/t3_textcss.txt','w').write('\n'.join(lines)+'\n')
print(len(sigs),'classes')
for cls,key in order: print(cls, key)
# node table for JSX gen
rows=[]
for x in sorted(n, key=lambda z: z['idx']):
  if x['kind']=='text':
    t=x['text']
    key=(t.get('fontFamily'),t.get('fontSize'),t.get('fontWeight'),t.get('textAlign'),t.get('lineHeight'),t.get('color'),t.get('fontStyle'),t.get('letterSpacing'))
    rows.append((x['idx'],x['id'],'text',sigs[key],clean(t.get('html',''))[:6],x['top'],x['left'],x['width'],x['height'],(x.get('anim') or {}).get('name'),(x.get('anim') or {}).get('delay')))
  elif x['kind']=='photo':
    rows.append((x['idx'],x['id'],'photo',local_for(x),None,x['top'],x['left'],x['width'],x['height'],(x.get('anim') or {}).get('name'),(x.get('anim') or {}).get('delay')))
  else:
    rows.append((x['idx'],x['id'],x['kind'],None,None,x['top'],x['left'],x['width'],x['height'],(x.get('anim') or {}).get('name'),(x.get('anim') or {}).get('delay')))
import pickle
open('/tmp/t3_rows.json','w').write(json.dumps(rows))
for r in rows: print(r[0], r[1][:8], r[2], r[3] if r[2]!='text' else r[3], (r[4][0][:40] if r[4] else ''))

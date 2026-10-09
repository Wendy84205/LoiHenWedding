#!/usr/bin/env python3
"""Sinh src/templates/new/Template22New.jsx từ /tmp/t22_layout.json (extract ref t22)
+ tải asset 200 OK về public/assets/template22-ref/.

Layout strategy (giống t27): canvas 500x11572 tuyệt đối, node rời theo toạ độ ref.
- text: đệ quy theo cây element để tách dòng theo đúng y của ref (ref dùng \n
  hard-break nên wrap tự nhiên có thể lệch -> dùng từng leaf element).
- photo-bg-wrap: tải URL ref (200); slot 404 -> ảnh webp local (đã chốt mapping).
- pseudo-element (card/badge/button/band/bracket/rule) -> node box thủ công đo pixel.
"""
import hashlib
import json
import math
import re
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

ROOT = Path('/Users/wendy/Documents/LoiHenWedding')
REF_DIR = ROOT / 'public/assets/template22-ref'
REF_DIR.mkdir(parents=True, exist_ok=True)
D = json.load(open('/tmp/t22_layout.json'))

CANVAS_W, CANVAS_H = 500, 11572

# Slot 404 trên CDN ref (đã thử mọi biến thể crop/w/v: chết hẳn) -> ref hiển
# thị nền nâu trơn. Giữ khung trống cùng màu nền canvas để khớp ref.
EMPTY_PHOTO_Y = {1136, 1360, 2339, 2999, 4206, 4792, 4827, 7303}
SKIP_Y = {856, 860, 1205}  # icon 404 -> ref trống, bỏ luôn

# Pseudo boxes đo từ ref.png (không có trong extract)
BR = {'borderTop': '2px solid rgb(147, 113, 86)', 'borderLeft': '2px solid rgb(147, 113, 86)', 'boxSizing': 'border-box'}
BRL = {'borderBottom': '2px solid rgb(147, 113, 86)', 'borderRight': '2px solid rgb(147, 113, 86)', 'boxSizing': 'border-box'}
MANUAL = [
    (938, 24, 452, 146, {'background': 'rgb(59, 40, 34)', 'borderRadius': '8px'}),       # rating card
    (1124, 24, 452, 114, {'background': 'rgb(119, 115, 115)', 'borderRadius': '10px'}),  # song card
    (1290, 215, 18, 18, {'background': 'rgb(31, 16, 11)'}),                              # swatches
    (1290, 251, 18, 18, {'background': 'rgb(122, 81, 56)'}),
    (1290, 292, 18, 18, {'background': 'rgb(113, 95, 82)'}),
    (853, 185, 136, 36, {'background': 'rgb(247, 244, 244)', 'borderRadius': '4px'}),    # buttons
    (853, 342, 136, 36, {'background': 'rgb(247, 244, 244)', 'borderRadius': '4px'}),
    (734, 185, 72, 32, {'background': 'rgb(250, 208, 148)'}),                            # NO.1 badge
    (734, 268, 176, 32, {'background': 'rgb(103, 95, 89)'}),                             # Phim badge
    (8761, 32, 435, 51, {'background': 'rgb(230, 188, 163)'}),                           # SAVE band
    (7289, 47, 405, 256, {'background': 'rgb(230, 188, 163)'}),                          # peach outer
    (8940, 202, 113, 33, {'background': 'rgb(122, 81, 56)'}),                            # header boxes
    (9152, 201, 113, 33, {'background': 'rgb(122, 81, 56)'}),
    (10008, 202, 113, 33, {'background': 'rgb(122, 81, 56)'}),
    # brackets 'L' quanh header (đo pixel: L-shape 2px #937156)
    (8931, 193, 19, 31, BR), (8961, 304, 19, 19, BRL),
    (9144, 190, 19, 31, BR), (9173, 304, 19, 19, BRL),
    (9998, 191, 19, 31, BR), (10031, 306, 19, 19, BRL),
    # rules trên quote 1 & 2 (quote 3 không có)
    (3872, 86, 143, 2, {'background': 'rgb(149, 120, 112)'}),
    (5079, 241, 170, 2, {'background': 'rgb(149, 120, 112)'}),
    # trio swatch 'To' y7707 (đo pixel ref: 9/10/10px)
    (7707, 52, 9, 9, {'background': 'rgb(113, 95, 82)'}),
    (7707, 71, 10, 10, {'background': 'rgb(122, 81, 56)'}),
    (7707, 89, 10, 10, {'background': 'rgb(31, 16, 11)'}),
    # trio y8869: peach/xám/nâu
    (8869, 237, 11, 11, {'background': 'rgb(230, 188, 163)'}),
    (8869, 261, 12, 12, {'background': 'rgb(113, 95, 82)'}),
    (8869, 283, 12, 12, {'background': 'rgb(122, 81, 56)'}),
    # tips: 3 cụm xám/nâu/tối 13x13 (y10402/10570/10770)
    (10402, 24, 13, 13, {'background': 'rgb(113, 95, 82)'}),
    (10419, 24, 13, 13, {'background': 'rgb(122, 81, 56)'}),
    (10436, 24, 13, 13, {'background': 'rgb(31, 16, 11)'}),
    (10570, 26, 13, 13, {'background': 'rgb(113, 95, 82)'}),
    (10588, 26, 13, 13, {'background': 'rgb(122, 81, 56)'}),
    (10605, 26, 13, 13, {'background': 'rgb(31, 16, 11)'}),
    (10770, 24, 13, 13, {'background': 'rgb(113, 95, 82)'}),
    (10788, 24, 13, 13, {'background': 'rgb(122, 81, 56)'}),
    (10806, 24, 13, 13, {'background': 'rgb(31, 16, 11)'}),
]


def in_rsvp(e):
    return e['y'] >= 9595 and e['x'] >= 60 and e['y'] + e['h'] <= 9965 and e['x'] + e['w'] <= 430


def in_music(e):
    return e['y'] < 60 and e['x'] > 440


def is_themed(e):
    return e['fs'] not in ('13px', '0px')


def is_p(e):
    # text wrapper mặc định (font hệ điều hành) -> dùng làm node cha
    return bool(e['txt']) and e['fs'] == '13px' and e['ff'] == '-apple-system' and e['h'] <= 500


def contains(a, b, tol=2):
    return (a['y'] <= b['y'] + tol and a['x'] <= b['x'] + tol
            and a['y'] + a['h'] >= b['y'] + b['h'] - tol
            and a['x'] + a['w'] >= b['x'] + b['w'] - tol)


def rect_eq(a, b, tol=2):
    return abs(a['y'] - b['y']) <= tol and abs(a['x'] - b['x']) <= tol and abs(a['h'] - b['h']) <= tol and abs(a['w'] - b['w']) <= tol


def area(e):
    return e['w'] * e['h']


# ---------- 1. Phân loại element ----------
url_seen = []
photos = []
texts_all = []
boxes_extract = []
for e in D:
    if in_rsvp(e) or in_music(e):
        continue
    bgi = e['bgi'] or ''
    m = re.match(r'url\(["\']?(https?://[^"\')]+)', bgi)
    if m and e['h'] >= 10 and e['w'] >= 10:
        if e['y'] in SKIP_Y:
            continue
        photos.append(e)
        if m.group(1) not in url_seen:
            url_seen.append(m.group(1))
        continue
    if e['bg'] not in ('rgba(0, 0, 0, 0)', '', 'rgb(0, 0, 0)') and e['h'] >= 10 and e['w'] >= 10 and not m:
        if e['y'] in (0, 10, 15) or e['h'] >= 900:
            continue
        boxes_extract.append(e)
    if e['txt'] and (is_themed(e) or is_p(e)):
        if e['txt'] == 'L' and e['h'] == 44:
            continue
        texts_all.append(e)

# Extract nhân bản nhiều copy cùng rect -> gộp để is_top hoạt động đúng
def _dkey(e):
    return (round(e['y']), round(e['x']), round(e['w']), round(e['h']), e['txt'])
texts_all = list({_dkey(e): e for e in texts_all}.values())

# ---------- 2. Download ảnh 200 OK ----------
def check_and_download(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
            if r.status != 200 or len(data) < 100:
                return url, None
            ext = '.png'
            mm = re.search(r'\.(png|jpe?g|gif|webp)', url.split('?')[0], re.I)
            if mm:
                ext = '.' + mm.group(1).lower().replace('jpeg', 'jpg')
            name = 't22-' + hashlib.md5(url.encode()).hexdigest()[:8] + ext
            (REF_DIR / name).write_bytes(data)
            return url, name
    except Exception:
        return url, None

url_file = {}
with ThreadPoolExecutor(max_workers=8) as ex:
    for url, name in ex.map(check_and_download, url_seen):
        if name:
            url_file[url] = name
print(f'downloaded {len(url_file)}/{len(url_seen)}')
missing = [u for u in url_seen if u not in url_file]
print('MISSING(non-200):', len(missing))
for u in missing:
    print('  ', u.split("/")[-1][:60])

# ---------- 3. Text nodes: đệ quy cây theo y ----------
def parse_px(s):
    try:
        return float(str(s).replace('px', ''))
    except Exception:
        return None


def style_of(e):
    st = {
        'top': f"{e['y']}px", 'left': f"{e['x']}px",
        'width': f"{e['w']}px", 'height': f"{e['h']}px",
        'fontFamily': 'Arial, sans-serif' if e['ff'] == 'Arial' else e['ff'],
        'fontSize': e['fs'],
        'fontWeight': e['fw'],
        'color': e['color'],
    }
    if e['fst'] not in ('normal', ''):
        st['fontStyle'] = e['fst']
    if e['lh'] not in ('normal', ''):
        st['lineHeight'] = e['lh']
    if e['ta'] in ('left', 'center', 'right'):
        st['textAlign'] = e['ta']
    if e['ls'] not in ('normal', ''):
        st['letterSpacing'] = e['ls']
    if e['tt'] not in ('none', ''):
        st['textTransform'] = e['tt']
    return st


nodes = []


def add(kind, style, direction='up', delay=0, **kw):
    n = {'id': f'{kind}{len(nodes)}', 'kind': kind, 'style': style,
         'direction': direction, 'delay': delay}
    n.update(kw)
    nodes.append(n)


def min_children(node, pool):
    """Themed element nằm bên trong node, loại bị chứa bởi anh em; bỏ rect bằng node."""
    inner = [c for c in pool if c is not node and contains(node, c) and not rect_eq(c, node)]
    inner.sort(key=lambda c: (c['y'], c['x']))
    minimal = [c for c in inner if not any(contains(o, c) for o in inner if o is not c)]
    return [c for c in minimal if is_themed(c)]


def emit_text(node, style_src, pool):
    st = style_of(style_src)
    lh = parse_px(style_src['lh']) or (parse_px(style_src['fs']) or 16) * 1.47
    # Node tự nó có h < lh (vd '2022 – 2025' h19 lh34.4): ref render ink sát
    # top của box, còn local bị half-leading đẩy xuống ~7px -> lineHeight = h.
    if style_src is node:
        hpx = parse_px(style_src['h'])
        if hpx and hpx < lh:
            st['lineHeight'] = f"{hpx}px"
            lh = hpx
    children = min_children(node, pool)
    txt = node['txt']
    if not children:
        if not is_themed(node):
            return  # P không có themed con (trường hợp 'L' đã bỏ)
        add('text', st, text=txt)
        return
    first, last = children[0], max(children, key=lambda c: c['y'] + c['h'])
    gap = first['y'] - node['y']
    if gap >= 0.5 * lh:
        # dòng đầu là text của node (label) -> emit label rồi các con
        idx = txt.find(first['txt'])
        own = txt[:idx].strip() if idx >= 0 else ''
        if own:
            own_st = dict(st)
            own_st['top'] = f"{node['y']}px"
            own_st['height'] = f"{gap}px"
            own_st['width'] = f"{node['w']}px"
            own_st['left'] = f"{node['x']}px"
            add('text', own_st, text=own)
        for c in children:
            emit_text(c, c, pool)
    else:
        # con bắt đầu từ dòng 1 (label là child) -> text còn lại phía sau con
        for c in children:
            emit_text(c, c, pool)
        idx = txt.rfind(last['txt'])
        own = txt[idx + len(last['txt']):].strip() if idx >= 0 else ''
        if own:
            last_end = last['y'] + last['h']
            lines_used = max(1, math.ceil((last_end - node['y']) / lh))
            own_y = node['y'] + lh * lines_used
            if own_y <= node['y'] + node['h'] - 4:
                own_st = dict(st)
                own_st['top'] = f"{own_y:.1f}px"
                own_st['height'] = f"{node['y'] + node['h'] - own_y:.1f}px"
                # luôn bám rect node cha: style_src có thể là child hẹp (vd w89)
                own_st['width'] = f"{node['w']}px"
                own_st['left'] = f"{node['x']}px"
                add('text', own_st, text=own)


def is_top(n):
    """Top-level: không bị element khác có txt chứa; cùng rect -> ưu tiên themed."""
    for m in texts_all:
        if m is n or not contains(m, n):
            continue
        if rect_eq(m, n):
            if is_themed(m) and not is_themed(n):
                return False
            if is_themed(n):
                continue
            return False
        return False
    return True


tops = [n for n in texts_all if is_top(n)]
tops.sort(key=lambda e: (e['y'], e['x']))
for n in tops:
    if is_themed(n):
        emit_text(n, n, texts_all)
    else:
        kids = min_children(n, texts_all)
        if not kids:
            # wrapper fs13 không có con themed -> chính nó là text (font hệ điều hành)
            add('text', style_of(n), text=n['txt'])
            continue
        emit_text(n, max(kids, key=area), texts_all)

# (bỏ emit tay 'Do cô dâu' - cây thường đã emit đủ text100-103; emit tay từng
#  tạo bản sao fs13 -apple-system chồng lên trên gây lệch màu ở y10855)

# emit riêng dòng đầu của 4 khối P+Signora bị rớt (node Signora đầu bị
# dedup gộp mất; rect/style lấy đúng toạ độ ref)
FIRST_LINES = [
    (89, 185, 299, 27, '19px', 'Signora', 'rgb(247, 244, 244)', '500', '27.17px', 'right', '1px', 'Chào bạn~'),
    (3968, 32, 450, 34, '20px', 'Signora', 'rgb(206, 189, 181)', '700', '34.4px', 'left', '1px', '2022/05/21'),
    (5213, 34, 89, 19, '20px', 'Signora', 'rgb(206, 189, 181)', '700', '34.4px', 'left', '1px', '2022 – 2025'),
    (6367, 17, 336, 29, '20px', 'Signora', 'rgb(206, 189, 181)', '500', '29.2px', 'left', '1px', '20/08/2025'),
]
_emitted_first = ' || '.join(n.get('text', '') for n in nodes if n['kind'] == 'text')
for (_y, _x, _w, _h, _fs, _ff, _col, _fw, _lh, _ta, _ls, _txt) in FIRST_LINES:
    if _txt not in _emitted_first:
        add('text', {'top': f'{_y}px', 'left': f'{_x}px', 'width': f'{_w}px',
                     'height': f'{_h}px', 'fontFamily': _ff, 'fontSize': _fs,
                     'fontWeight': _fw, 'color': _col, 'lineHeight': _lh,
                     'textAlign': _ta, 'letterSpacing': _ls}, text=_txt)

# Diagnostic: text nào của layout không xuất hiện trong node nào đã emit?
_emitted = ' || '.join(n.get('text', '') for n in nodes if n['kind'] == 'text')
_missing = set()
for e in texts_all:
    t = (e['txt'] or '').strip()
    if len(t) > 12 and t[:14] not in _emitted:
        _missing.add((round(e['y']), t[:40]))
if _missing:
    print('MISSING-TEXT:')
    for y, t in sorted(_missing):
        print(f'  y{y}: {t}')


# ---------- 4. Photo nodes ----------
for e in sorted(photos, key=lambda e: e['y']):
    m = re.match(r'url\(["\']?(https?://[^"\')]+)', e['bgi'])
    url = m.group(1)
    if round(e['y']) in EMPTY_PHOTO_Y:
        continue  # CDN ref chết -> ref nền trơn, bỏ khung để khớp
    fname = url_file.get(url)
    if not fname:
        print('WARN missing photo url for y', e['y'])
        continue
    src = f"`${{R}}/{fname}`"
    style = {'top': f"{e['y']}px", 'left': f"{e['x']}px",
             'width': f"{e['w']}px", 'height': f"{e['h']}px"}
    if e['br'] not in ('0px', ''):
        style['borderRadius'] = e['br']
    add('photo', style, direction='up', delay=0.2,
        src=src, size=e['bgs'] or 'cover', pos=e['bgp'] or '50% 50%')

# ---------- 5. Box nodes (bg từ extract + pseudo đo tay) ----------
for e in sorted(boxes_extract, key=lambda e: e['y']):
    style = {'top': f"{e['y']}px", 'left': f"{e['x']}px",
             'width': f"{e['w']}px", 'height': f"{e['h']}px",
             'background': e['bg']}
    if e['br'] not in ('0px', ''):
        style['borderRadius'] = e['br']
    add('box', style)
for (y, x, w, h, extra) in MANUAL:
    style = {'top': f"{y}px", 'left': f"{x}px", 'width': f"{w}px", 'height': f"{h}px"}
    style.update(extra)
    add('box', style)

# RSVP card (component tự render form bên trong)
add('rsvp', {'top': '9603px', 'left': '71px', 'width': '355px', 'height': '350px'},
    direction='up', delay=0.2)

# Google Map embed (ref: iframe x51 y9280 401x278, số đo từ ref.png)
add('map', {'top': '9280px', 'left': '51px', 'width': '401px', 'height': '278px'},
    src='https://maps.google.com/maps?q=52%20Mi%E1%BB%85u%20%C4%90%C3%A2m%2C%20M%E1%BB%85%20Tr%C3%AC%2C%20Nam%20T%E1%BB%AB%20Li%C3%AAm%2C%20H%C3%A0%20N%E1%BB%99i&t=&z=14&ie=UTF8&iwloc=&output=embed')

kind_rank = {'box': 0, 'photo': 1, 'map': 1, 'text': 2, 'rsvp': 2}
nodes.sort(key=lambda n: (float(n['style']['top'].replace('px', '')), kind_rank[n['kind']]))
print('nodes:', len(nodes),
      '| text:', sum(1 for n in nodes if n['kind'] == 'text'),
      '| photo:', sum(1 for n in nodes if n['kind'] == 'photo'),
      '| box:', sum(1 for n in nodes if n['kind'] == 'box'))

# ---------- 6. Ghi file JSX ----------
def js_node(n):
    order = ['id', 'kind', 'style', 'direction', 'delay', 'src', 'size', 'pos', 'text']
    d = {k: n[k] for k in order if k in n}
    line = json.dumps(d, ensure_ascii=False)
    if 'src' in n and n['src'].startswith('`'):
        # src đã ở dạng "``${R}/file``" -> giữ template literal nguyên vẹn;
        # URL thường (map) là chuỗi thường -> KHÔNG cắt ký tự đầu/cuối.
        line = line.replace(json.dumps(n['src'], ensure_ascii=False), n['src'])
    return '  ' + line


HEAD = '''/* Thiệp cưới mẫu 22 - dựng 1:1 theo cinelove.me/template/thiep-cuoi-22.
   NODES sinh bởi scripts/_t22_gen.py từ /tmp/t22_layout.json + số đo pixel ref.png.
   Ảnh: /assets/template22-ref (tải từ ref); slot 404 -> ảnh webp local. */
import React from "react";
import { MusicButton, RsvpForm, useInvitationPage } from "./NewInvitationCommon.jsx";
import "./template22New.css";

const R = "/assets/template22-ref";

const NODES = [
'''
TAIL = '''];

function NodeContent({ node }) {
  if (node.kind === "photo") {
    return (
      <div
        className="t22n-photo"
        style={{
          backgroundImage: `url(${node.src})`,
          backgroundSize: node.size || "cover",
          backgroundPosition: node.pos || "50% 50%",
        }}
      />
    );
  }
  if (node.kind === "text") {
    return <div className="t22n-text">{node.text}</div>;
  }
  if (node.kind === "map") {
    return <iframe className="t22n-mapframe" src={node.src} title="Bản đồ" />;
  }
  if (node.kind === "rsvp") {
    return (
      <RsvpForm
        className="t22n-rsvpBox"
        accent="#7a5138"
        declineLabel="Tôi bận, rất tiếc không thể tham dự"
        showPartySize={false}
      />
    );
  }
  return null;
}

export default function Template22New() {
  useInvitationPage("template22new-page", "2025-08-20T12:00:00+07:00");

  return (
    <main className="new-invitation-page t22n">
      <div className="t22n-canvas">
        <MusicButton className="t22n-music" />
        {NODES.map((node) => (
          <div
            key={node.id}
            className={`t22n-node t22n-node-static t22n-${node.kind}`}
            style={node.style}
          >
            <NodeContent node={node} />
          </div>
        ))}
      </div>
    </main>
  );
}
'''
body = ',\n'.join(js_node(n) for n in nodes)
out = ROOT / 'src/templates/new/Template22New.jsx'
out.write_text(HEAD + body + '\n' + TAIL)
print('WROTE', out, out.stat().st_size, 'bytes')


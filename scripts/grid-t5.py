"""Ghép từng lát: ref bên trái, local bên phải, chồng lên nhau."""
from PIL import Image

SLICE = 900
ref = Image.open('/tmp/t5-ref/canvas.png')
loc = Image.open('/tmp/t5-local/canvas.png')
W, H = ref.size

for i in range(0, H, SLICE):
    h = min(SLICE, H - i)
    a = ref.crop((0, i, W, i + h))
    b = loc.crop((0, i, W, i + h))
    out = Image.new('RGB', (W * 2 + 12, h), 'white')
    out.paste(a, (0, 0))
    out.paste(b, (W + 12, 0))
    out.save('/tmp/t5-local/cmp-%02d.png' % (i // SLICE))
    print('cmp-%02d.png' % (i // SLICE), out.size)

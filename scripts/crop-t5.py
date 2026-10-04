"""Crop canvas gốc + bản local về cùng kích thước, ghép cạnh nhau để so."""
import json
from PIL import Image

origin = json.load(open('/tmp/t5-ref/origin.json'))
W, H = 500, 7116

ref = Image.open('/tmp/t5-ref/page.png').convert('RGB')
x, y = origin['x'], origin['y']
ref_canvas = ref.crop((x, y, x + W, y + H))
ref_canvas.save('/tmp/t5-ref/canvas.png')

loc = Image.open('/tmp/t5-local/full.png').convert('RGB')
# local chụp deviceScaleFactor 2 -> chia 2
loc = loc.resize((W, H), Image.LANCZOS)
loc.save('/tmp/t5-local/canvas.png')

print('ref canvas', ref_canvas.size, '| local canvas', loc.size)

from PIL import Image
import os, sys

OUT = "artifacts/fidelity-report/thiep-cuoi-47"

def slice_img(path, prefix, n=9):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    step = h / n
    for i in range(n):
        top = int(round(i * step))
        bot = int(round((i + 1) * step)) if i < n - 1 else h
        im.crop((0, top, w, bot)).save(os.path.join(OUT, f"{prefix}_{i+1}.png"))
    print(f"{path}: {w}x{h} -> {n} slices")

loc = os.path.join(OUT, "local.png")
slice_img(loc, "loc", 9)

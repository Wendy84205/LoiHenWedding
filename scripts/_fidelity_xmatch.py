#!/usr/bin/env python3
"""Cross-match: mỗi local NN so với MỌI ref MM (ảnh co 1/10, pad về chung kích thước).
In ra ref tốt nhất cho từng local — phát hiện đánh số lệch."""
import itertools
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "artifacts" / "fidelity-report"
S = 10  # downsampling factor


def small(p):
    im = Image.open(p).convert("L")
    w, h = im.size
    im = im.resize((w // S, max(h // S, 1)))
    return np.asarray(im, dtype=np.float32)


ids = sorted(int(d.name.split("-")[-1]) for d in ROOT.glob("thiep-cuoi-*")
             if (d / "local.png").exists() and (d / "ref.png").exists())
loc = {i: small(ROOT / f"thiep-cuoi-{i}" / "local.png") for i in ids}
ref = {i: small(ROOT / f"thiep-cuoi-{i}" / "ref.png") for i in ids}


def dist(a, b):
    h = max(a.shape[0], b.shape[0])
    def pad(x):
        out = np.full((h, x.shape[1]), 255, dtype=np.float32)
        out[: x.shape[0]] = x
        return out
    return float(np.abs(pad(a) - pad(b)).mean())


rows = []
for i in ids:
    scores = [(dist(loc[i], ref[j]), j) for j in ids]
    scores.sort()
    best = scores[0]
    identity = next(s for s, j in scores if j == i)
    rank_id = [j for _, j in scores].index(i) + 1
    rows.append((i, best[1], round(best[0], 1), round(identity, 1), rank_id))

print(f"{'local':>6} {'best_ref':>8} {'d_best':>7} {'d_self':>7} {'self_rank':>9}")
mis = 0
for i, bj, db, ds, rk in rows:
    flag = "" if bj == i else "   <<< MISMATCH"
    if bj != i:
        mis += 1
    print(f"{i:>6} {bj:>8} {db:>7} {ds:>7} {rk:>9}{flag}")
print("mismatches:", mis, "/", len(ids))

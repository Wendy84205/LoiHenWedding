#!/usr/bin/env python3
"""So sánh local.png vs ref.png cho từng template trong artifacts/fidelity-report/.

Kết quả:
- artifacts/fidelity-report/thiep-cuoi-NN/diff.png   (ảnh diff xám)
- artifacts/fidelity-report/thiep-cuoi-NN/metrics.json
- artifacts/fidelity-report/report.json              (xếp hạng toàn bộ)

Metric:
- mean     : trung bình |diff| grayscale (0..255)
- strong%  : % pixel có max-channel diff > 60
- textal%  : % pixel "đỏ" (nội dung khác nền, dùng so sánh tương đối)
"""
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent / "artifacts" / "fidelity-report"
STRONG = 60


def load_pair(d: Path):
    l = np.asarray(Image.open(d / "local.png").convert("RGB"), dtype=np.int16)
    r = np.asarray(Image.open(d / "ref.png").convert("RGB"), dtype=np.int16)
    h = max(l.shape[0], r.shape[0])
    w = max(l.shape[1], r.shape[1])

    def pad(a):
        out = np.full((h, w, 3), 255, dtype=np.int16)
        out[: a.shape[0], : a.shape[1]] = a
        return out

    return pad(l), pad(r)


def diff_one(d: Path) -> dict:
    l, r = load_pair(d)
    ad = np.abs(l - r)  # H,W,3
    gdiff = ad.max(axis=2)  # per-pixel strength
    strong = float((gdiff > STRONG).mean() * 100)
    mean = float(gdiff.mean())
    # bản đồ nhiệt: xám -> đỏ theo mức diff
    heat = np.zeros((*gdiff.shape, 3), dtype=np.uint8)
    g = gdiff.astype(np.uint8)
    heat[..., 0] = np.clip(g.astype(np.int32) * 2, 0, 255).astype(np.uint8)  # đỏ tăng nhanh
    heat[..., 1] = g
    heat[..., 2] = g
    Image.fromarray(heat).save(d / "diff.png")
    # thống kê theo dải 1000px (troubleshoot)
    bands = []
    for y in range(0, gdiff.shape[0], 1000):
        seg = gdiff[y : y + 1000]
        bands.append({"y": int(y), "mean": round(float(seg.mean()), 1),
                      "strong%": round(float((seg > STRONG).mean() * 100), 1)})
    bands.sort(key=lambda b: -b["mean"])
    m = {
        "mean": round(mean, 2),
        "strong%": round(strong, 2),
        "size": [int(gdiff.shape[1]), int(gdiff.shape[0])],
        "worst_bands": bands[:5],
    }
    # phát hiện capture hỏng (ảnh gần như trắng toàn bộ)
    for name, a in (("local", l), ("ref", r)):
        g = a.mean(axis=2)
        m[f"{name}_mean"] = round(float(g.mean()), 1)
        if g.mean() > 252:
            m.setdefault("blank", []).append(name)
    (d / "metrics.json").write_text(json.dumps(m, ensure_ascii=False, indent=2))
    return m


def main():
    ids = sys.argv[1:] if len(sys.argv) > 1 else None
    results = {}
    for d in sorted(ROOT.glob("thiep-cuoi-*")):
        if not (d / "local.png").exists() or not (d / "ref.png").exists():
            continue
        tid = d.name.replace("thiep-cuoi-", "")
        if ids and tid not in ids:
            continue
        results[tid] = diff_one(d)
        print(tid, results[tid]["mean"], results[tid]["strong%"], flush=True)
    ranked = sorted(results.items(), key=lambda kv: -kv[1]["mean"])
    report = {
        "threshold": STRONG,
        "ranked": [{"id": k, **v} for k, v in ranked],
        "worst": [k for k, _ in ranked],
    }
    (ROOT / "report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2))
    print("WROTE", ROOT / "report.json")
    print("RANK:", " > ".join(f"{k}:{v['mean']}" for k, v in ranked))


if __name__ == "__main__":
    main()

from PIL import Image
import numpy as np
r = np.asarray(Image.open('/Users/wendy/Documents/LoiHenWedding/artifacts/fidelity-report/thiep-cuoi-22/ref.png').convert('RGB'))
print('ref shape', r.shape)
checks = [
    ('photo y0 (368x613)?', 0, 613, 0, 368),
    ('T&H y67', 60, 120, 180, 370),
    ('date y116', 110, 145, 300, 460),
    ('photo y642 x13 156x251', 642, 893, 13, 169),
    ('wish bubble y764 x26 pink?', 760, 790, 16, 310),
    ('music y1186', 1180, 1205, 54, 190),
    ('rating y1042', 1040, 1060, 353, 468),
    ('photo y1360 (404 slot)', 1360, 1915, 54, 449),
    ('Lễ đường y1143', 1140, 1175, 54, 270),
    ('photo y3559 renders?', 3559, 3921, 229, 469),
    ('photo y8480 renders?', 8480, 8761, 33, 468),
    ('pink btn y864 x456', 860, 900, 452, 495),
    ('giftbar y936 x8', 936, 975, 8, 160),
    ('peach box y7297', 7297, 7538, 54, 444),
    ('flower y11200?', 11300, 11500, 180, 330),
]
for name, y0, y1, x0, x1 in checks:
    reg = r[y0:y1, x0:x1]
    if reg.size == 0:
        print(f'{name}: OUT OF BOUNDS')
        continue
    mean = reg.reshape(-1, 3).mean(0).round(0)
    std = reg.reshape(-1, 3).std(0).round(1)
    print(f'{name}: mean={mean} std={std}')

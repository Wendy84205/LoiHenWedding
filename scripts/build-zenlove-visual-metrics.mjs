import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const execFileAsync = promisify(execFile);
const root = new URL('../', import.meta.url).pathname;
const manifest = JSON.parse(await readFile(join(root, 'src/commerce/data/zenlove-local-manifest-2026-09-26.json'), 'utf8'));
const metrics = {};

for (const item of manifest.items) {
  if (!item.localPreviewPath) continue;
  const imagePath = join(root, 'public', item.localPreviewPath.replace(/^\//, ''));
  try {
    const { stdout } = await execFileAsync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', imagePath]);
    const width = Number(stdout.match(/pixelWidth:\s+(\d+)/)?.[1]);
    const height = Number(stdout.match(/pixelHeight:\s+(\d+)/)?.[1]);
    if (width && height) {
      metrics[item.slug] = {
        width,
        height,
        aspectRatio: Number((height / width).toFixed(6)),
      };
    }
  } catch {
    // Keep the metric optional when a preview file is unavailable.
  }
}

await writeFile(
  join(root, 'src/commerce/data/zenlove-visual-metrics-2026-09-26.json'),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), source: 'localPreviewPath image dimensions', metrics }, null, 2)}\n`,
);
console.log(`Generated ${Object.keys(metrics).length} ZenLove visual metrics.`);
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { join } from 'node:path';
import { PNG } from 'pngjs';

const execFileAsync = promisify(execFile);
const root = new URL('../', import.meta.url).pathname;
const artifactDir = join(root, 'artifacts/zenlove-comparison');
const normalizedDir = join(artifactDir, 'normalized-reference');
const diffDir = join(artifactDir, 'diff');
const captureManifest = JSON.parse(await readFile(join(artifactDir, 'manifest.json'), 'utf8'));
const catalog = JSON.parse(await readFile(join(root, 'docs/zenlove-local-manifest-2026-09-26.json'), 'utf8'));
const catalogBySlug = new Map(catalog.items.map((item) => [item.slug, item]));

await mkdir(diffDir, { recursive: true });
await mkdir(normalizedDir, { recursive: true });

function requireBuffer(path) {
  return readFileSync(path);
}

function writePng(path, png) {
  return writeFile(path, PNG.sync.write(png));
}

function metric(local, reference) {
  const width = local.width;
  const height = local.height;
  let different = 0;
  let totalDelta = 0;
  const rowDelta = new Array(height).fill(0);
  const diff = new PNG({ width, height });

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const localIndex = (local.width * y + x) * 4;
      const referenceX = Math.min(reference.width - 1, Math.floor((x / width) * reference.width));
      const referenceY = Math.min(reference.height - 1, Math.floor((y / height) * reference.height));
      const referenceIndex = (reference.width * referenceY + referenceX) * 4;
      const diffIndex = (width * y + x) * 4;
      const delta = Math.abs(local.data[localIndex] - reference.data[referenceIndex])
        + Math.abs(local.data[localIndex + 1] - reference.data[referenceIndex + 1])
        + Math.abs(local.data[localIndex + 2] - reference.data[referenceIndex + 2]);
      totalDelta += delta;
      rowDelta[y] += delta;
      if (delta > 24) different += 1;
      const value = Math.min(255, delta * 3);
      diff.data[diffIndex] = value;
      diff.data[diffIndex + 1] = Math.max(0, 255 - value);
      diff.data[diffIndex + 2] = 0;
      diff.data[diffIndex + 3] = 255;
    }
  }

  const bands = [];
  const bandHeight = 100;
  for (let start = 0; start < height; start += bandHeight) {
    const end = Math.min(height, start + bandHeight);
    const delta = rowDelta.slice(start, end).reduce((sum, value) => sum + value, 0);
    bands.push({ start, end, delta });
  }
  bands.sort((a, b) => b.delta - a.delta);

  return {
    width,
    height,
    comparedPixels: width * height,
    differentPixels: different,
    differentPercent: Number((different / (width * height) * 100).toFixed(3)),
    meanRgbDelta: Number((totalDelta / (width * height * 3)).toFixed(3)),
    strongestBands: bands.slice(0, 8),
    diff,
  };
}

const results = [];
for (const capture of captureManifest.results) {
  const item = catalogBySlug.get(capture.slug);
  if (!item?.localPreviewPath || !existsSync(capture.screenshotPath)) continue;
  const source = join(root, 'public', item.localPreviewPath.replace(/^\//, ''));
  const normalizedPath = join(normalizedDir, `${capture.slug}.png`);
  await execFileAsync('sips', ['-s', 'format', 'png', source, '--out', normalizedPath]);
  const local = PNG.sync.read(requireBuffer(capture.screenshotPath));
  const reference = PNG.sync.read(requireBuffer(normalizedPath));
  const result = metric(local, reference);
  await writePng(join(diffDir, `${capture.slug}.png`), result.diff);
  delete result.diff;
  results.push({ slug: capture.slug, referencePath: item.localPreviewPath, ...result });
  console.log(`${capture.slug}: ${result.differentPercent}% / mean ${result.meanRgbDelta}`);
}

results.sort((a, b) => b.differentPercent - a.differentPercent);
await writeFile(join(artifactDir, 'pixel-diff-report.json'), `${JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2)}\n`);
console.log(`Analyzed ${results.length} screenshots.`);
console.log('Top 20:', results.slice(0, 20).map((item) => `${item.slug}:${item.differentPercent}%`).join(', '));
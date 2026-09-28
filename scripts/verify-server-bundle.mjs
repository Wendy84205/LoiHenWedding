// Guard for the single Vercel Function bundle (`api/router.js`).
//
// Vercel runs the function with Node ESM and copies only the files it can trace
// from the entry point. Anything the server imports must therefore live inside
// api/, endpoints/, server/ or src/, exist on disk, and — for JSON — be imported
// with the `with { type: 'json' }` attribute. A violation here makes every
// /api/* and /w/* request fail with FUNCTION_INVOCATION_FAILED in production.
import { readFile, stat } from 'node:fs/promises';
import { dirname, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const entries = ['api/router.js'];
const allowedRoots = new Set(['api', 'endpoints', 'server', 'src']);
const runtimeExtensions = new Set(['.js', '.mjs', '.cjs']);
const unsupportedExtensions = new Set(['.jsx', '.ts', '.tsx', '.css', '.json']);

const staticImportPattern = /(?:^|[^\w.$])(?:import|export)\s+(?:[^'"]*?\sfrom\s+)?['"]([^'"]+)['"]/g;
const dynamicImportPattern = /import\(\s*['"]([^'"]+)['"]\s*\)/g;

const visited = new Set();
const problems = [];

function toRepoPath(file) {
  return relative(root, file).split('\\').join('/');
}

function specifierPatterns(specifier) {
  return [`'${specifier}'`, `"${specifier}"`];
}

function hasJsonAttribute(code, specifier, index) {
  const tail = code.slice(index, index + 160);
  return specifierPatterns(specifier).some((quoted) => {
    const position = tail.indexOf(quoted);
    if (position === -1) return false;
    return new RegExp(`^\\s*with\\s*\\{\\s*type\\s*:\\s*['"]json['"]\\s*\\}`).test(tail.slice(position + quoted.length));
  });
}

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

async function walk(file) {
  const repoPath = toRepoPath(file);
  if (visited.has(repoPath)) return;
  visited.add(repoPath);

  const code = await readFile(file, 'utf8');
  const matches = [...code.matchAll(staticImportPattern), ...code.matchAll(dynamicImportPattern)];

  for (const match of matches) {
    const specifier = match[1];
    if (!specifier.startsWith('.')) continue;
    const target = resolve(dirname(file), specifier);
    const targetRepoPath = toRepoPath(target);
    const topSegment = targetRepoPath.split('/')[0];
    const extension = target.slice(target.lastIndexOf('.'));

    if (!(await exists(target))) {
      problems.push(`${repoPath} → "${specifier}" không tồn tại (${targetRepoPath}).`);
      continue;
    }
    if (!allowedRoots.has(topSegment)) {
      problems.push(`${repoPath} → "${specifier}" nằm ngoài bundle function (${targetRepoPath}); hãy chuyển vào src/, server/, endpoints/ hoặc api/.`);
      continue;
    }
    if (unsupportedExtensions.has(extension)) {
      if (extension !== '.json') {
        problems.push(`${repoPath} → "${specifier}" dùng ${extension}, Node runtime không đọc được file này.`);
      }
      continue;
    }
    if (extension === '.json') {
      if (!hasJsonAttribute(code, specifier, match.index)) continue;
      continue;
    }
    if (extension === '.js' && specifier.endsWith('.json')) continue;
    if (!runtimeExtensions.has(extension) && extension !== '') {
      problems.push(`${repoPath} → "${specifier}" dùng đuôi ${extension} không hỗ trợ trong Node runtime.`);
      continue;
    }
    if (extension === '.json') continue;
    await walk(target);
  }

  for (const match of code.matchAll(staticImportPattern)) {
    const specifier = match[1];
    if (!specifier.endsWith('.json')) continue;
    if (hasJsonAttribute(code, specifier, match.index)) continue;
    problems.push(`${repoPath} → "${specifier}" thiếu thuộc tính import \`with { type: 'json' }\`.`);
  }
}

for (const entry of entries) {
  await walk(resolve(root, entry));
}

if (problems.length) {
  console.error('Server bundle check failed:');
  for (const problem of problems) console.error(` - ${problem}`);
  process.exit(1);
}

console.log(`Server bundle check passed: ${visited.size} module(s) trong bundle function đều tự chứa và chạy được trên Node runtime.`);

import { access, mkdir, writeFile } from 'node:fs/promises';

const fontSlugs = [
  'abbassy-script',
  'alton-jnl',
  'amherst',
  'amstirdam',
  'antro-vectra',
  'arcittya-begatri',
  'baskervillebook',
  'beezle',
  'binerka',
  'brownycakessignature',
  'bucthu',
  'chetta-vissto',
  'chillatos',
  'clodia',
  'eastin-hikary',
  'edwardianscriptregular',
  'ephesis-regular',
  'faugllin-balseyn',
  'gasthony-signature',
  'gillastone',
  'lobster',
  'logate',
  'lora-regular',
  'lumios-marker',
  'madam-ghea',
  'marmelad-regular',
  'mentawai',
  'miller-banner',
  'moon-light',
  'outer-sans-light',
  'outer-sans-thin',
  'paris-regular',
  'perfect-beloved',
  'pingfangsatuoti',
  'plus-jakarta-sans',
  'right-here',
  'sacramento',
  'showcasesans',
  'svn-desire',
  'sunshine-script',
  'the-hamstter',
  'times-new-normal',
];

const destination = new URL('../public/assets/fonts/cinelove/', import.meta.url);
await mkdir(destination, { recursive: true });

let downloaded = 0;
for (const slug of fontSlugs) {
  const file = new URL(`${slug}.woff2`, destination);
  try {
    await access(file);
    continue;
  } catch {
    // Download only files that are not already bundled.
  }

  const source = `https://assets.cinelove.me/fonts/webfonts/${slug}/${slug}.woff2`;
  const response = await fetch(source);
  if (!response.ok) throw new Error(`Could not download ${source}: ${response.status}`);
  await writeFile(file, Buffer.from(await response.arrayBuffer()));
  downloaded += 1;
}

console.log(`Downloaded ${downloaded} source font files.`);

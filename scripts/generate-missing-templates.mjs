import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const target = new URL('../src/templates/new/', import.meta.url).pathname;

const profiles = [
  [3, 'TraditionalSplitTemplate', 'traditional', 'Hương', 'Anh', '#b04d59', '#fffaf2', '#402c31', 'PlayfairDisplay', 'Signora'],
  [9, 'DarkCinematicTemplate', 'cinematic', 'Tuấn Kiệt', 'Gia Vy', '#c58a92', '#14120f', '#f8f1e9', 'Signora', 'Mallong'],
  [12, 'IllustratedPosterTemplate', 'illustrated', 'Quốc Thiên', 'Thanh Tú', '#b9222c', '#fff8ef', '#361b20', 'Quicksand', 'Signora'],
  [13, 'IllustratedPosterTemplate', 'illustrated', 'Minh Khang', 'Hà My', '#ce7a20', '#ffd77f', '#4e2b1d', 'Poppins', 'Mallong'],
  [22, 'DarkCinematicTemplate', 'cinematic', 'Trí Hưng', 'Thùy An', '#a77f70', '#2e211a', '#eadfd6', 'Quicksand', 'Signora'],
  [25, 'TraditionalSplitTemplate', 'traditional', 'Duy Anh', 'Hồng Ngọc', '#ae1d28', '#fffaf2', '#302523', 'Quicksand', 'Signora'],
  [27, 'ModernGridTemplate', 'modern', 'Anh Quân', 'Như Ý', '#8e8a80', '#f8f7f2', '#202020', 'Quicksand', 'Mallong'],
  [29, 'DarkCinematicTemplate', 'cinematic', 'Minh Châu', 'Huyền Anh', '#d09b73', '#171615', '#f8eee4', 'Quicksand', 'Signora'],
  [32, 'ModernGridTemplate', 'modern', 'Đức Minh', 'Hải Yến', '#b55231', '#faf5ed', '#26201d', 'PlayfairDisplay', 'Carlytte'],
  [33, 'ModernGridTemplate', 'modern', 'Minh Trí', 'Bảo Anh', '#a43842', '#fffdf8', '#201d1c', 'PlayfairDisplay', 'Mallong'],
  [35, 'TraditionalSplitTemplate', 'traditional', 'Mạnh Tùng', 'Ngọc Linh', '#b72634', '#fffafa', '#34272a', 'PlayfairDisplay', 'Signora'],
  [59, 'BotanicalFrameTemplate', 'botanical', 'Văn Khang', 'Phúc Hương', '#7a1521', '#fffdf8', '#382a27', 'Cinelove Times', 'Signora', true],
  [65, 'IllustratedPosterTemplate', 'illustrated', 'Hoàng Anh', 'Yến Nhi', '#b45d60', '#fff8f5', '#4a3330', 'PlayfairDisplay', 'Aquarelle'],
  [66, 'ModernGridTemplate', 'modern', 'Minh Đức', 'Ngân Hà', '#8e3542', '#f9f3f1', '#332c2d', 'Cinelove Times', 'Signora'],
  [70, 'ModernGridTemplate', 'modern', 'Quang Thịnh', 'Lan Hương', '#c11820', '#fffdf8', '#25211f', 'PlayfairDisplay', 'Signora'],
  [71, 'TypographicTemplate', 'typographic', 'Hải Đăng', 'Ngọc Mai', '#c28d9e', '#f9f5f1', '#2e2927', 'Quicksand', 'Mallong'],
  [72, 'TypographicTemplate', 'typographic', 'Hữu Quân', 'Tuấn Tú', '#111111', '#fffdf9', '#191919', 'PlayfairDisplay', 'Anisa Signature'],
  [74, 'ModernGridTemplate', 'modern', 'Tuấn Minh', 'Khánh Vy', '#a35b64', '#f8f1ee', '#332b2a', 'PlayfairDisplay', 'Signora'],
  [75, 'RedPopTemplate', 'redpop', 'Quang Anh', 'Khả Hân', '#bc101b', '#fff8ef', '#2d2020', 'PlayfairDisplay', 'Signora'],
  [76, 'TypographicTemplate', 'typographic', 'Tuấn Anh', 'Hà My', '#8b1b7c', '#fffefd', '#362c36', 'Cinelove Times', 'Mallong'],
  [77, 'BotanicalFrameTemplate', 'botanical', 'Minh Phúc', 'Kiều Anh', '#75685c', '#f8f3ef', '#302b27', 'PlayfairDisplay', 'Signora'],
  [78, 'IllustratedPosterTemplate', 'illustrated', 'Gia Huy', 'An Nhiên', '#f28aa8', '#fffafa', '#393034', 'PlayfairDisplay', 'Mallong'],
  [79, 'DarkCinematicTemplate', 'cinematic', 'Đức Huy', 'Bảo Trâm', '#6b8060', '#142119', '#edf2e9', 'Poppins', 'Signora'],
  [80, 'RedPopTemplate', 'redpop', 'Trọng Nghĩa', 'Tâm An', '#d95e6b', '#fffafa', '#382629', 'PlayfairDisplay', 'Signora'],
  [83, 'TraditionalSplitTemplate', 'traditional', 'Quốc Bảo', 'Nguyễn Nhi', '#930000', '#fffdf8', '#342523', 'Cinelove Times', 'scarlet-bradley.regular'],
  [84, 'TraditionalSplitTemplate', 'traditional', 'Trọng Vinh', 'Hà Linh', '#9f2630', '#fffdf9', '#332728', 'PlayfairDisplay', 'Signora'],
  [86, 'TypographicTemplate', 'typographic', 'Minh Đức', 'Ngân Hà', '#9a8d55', '#f5f4e9', '#36342c', 'Quicksand', 'Signora'],
  [87, 'BotanicalFrameTemplate', 'botanical', 'Thanh Nam', 'Vân Anh', '#8f6265', '#faf3f1', '#362e2f', 'Quicksand', 'Mallong'],
  [88, 'RedPopTemplate', 'redpop', 'Quốc Bảo', 'Ngọc Mai', '#8e1018', '#fffdf8', '#3b2525', 'Cinelove Times', 'Signora', true],
  [89, 'IllustratedPosterTemplate', 'illustrated', 'Hải Nam', 'Mỹ Linh', '#e26765', '#fffdfa', '#3e2f2e', 'Signora', 'Mallong'],
  [90, 'DarkCinematicTemplate', 'cinematic', 'Thomas', 'Alice', '#b88a7a', '#191615', '#f5ede8', 'Quicksand', 'scarlet-bradley.regular'],
  [93, 'DarkCinematicTemplate', 'cinematic', 'Mai Anh', 'Tuấn Kiệt', '#a50f1c', '#0d0d0d', '#f5f1eb', 'Signora', 'Mallong'],
  [97, 'CompactFormalTemplate', 'formal', 'Hoàng Quân', 'Mai Anh', '#c3a445', '#122d59', '#f4e8bd', 'OpenSans', 'Lobster', true],
  [98, 'CompactFormalTemplate', 'formal', 'Hải Nam', 'Mỹ Linh', '#b49d53', '#153823', '#efe4b9', 'OpenSans', 'Lobster', true],
  [100, 'CompactFormalTemplate', 'formal', 'Văn Toàn', 'Phương Nhi', '#c5a64d', '#651217', '#f7e6bd', 'OpenSans', 'Lobster', true],
  [101, 'ModernGridTemplate', 'modern', 'Yến Nhi', 'Hải Đăng', '#738e68', '#fffdf8', '#2b3329', 'PlayfairDisplay', 'Signora'],
  [102, 'CompactFormalTemplate', 'formal', 'Anh Tuấn', 'Thu Trang', '#b9984d', '#7d1115', '#f7e2b8', 'Cinelove Times', 'Signora', true],
  [103, 'DarkCinematicTemplate', 'cinematic', 'Minh Tuấn', 'Hà Anh', '#658449', '#142219', '#edf1e8', 'Quicksand', 'Signora'],
  [106, 'ModernGridTemplate', 'modern', 'Jonh', 'Ammy', '#b34450', '#fbf4f1', '#392d2e', 'Quicksand', 'Signora'],
  [107, 'TypographicTemplate', 'typographic', 'Minh Tuệ', 'Hải Minh', '#c9beb0', '#f7f4ee', '#25221f', 'scarlet-bradley.regular', 'Signora'],
];

for (const [id, component, family, groom, bride, accent, paper, ink, font, script, intro = false] of profiles) {
  const slug = `thiep-cuoi-${id}`;
  const day = 10 + (id % 18);
  const month = 8 + (id % 4);
  const source = `import React from 'react';\nimport { ${component} } from './SourceTemplateFamilies.jsx';\n\nconst config = {\n  slug: '${slug}',\n  family: '${family}',\n  groom: '${groom}',\n  bride: '${bride}',\n  date: '2027-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T10:30:00+07:00',\n  accent: '${accent}',\n  paper: '${paper}',\n  ink: '${ink}',\n  font: '${font}',\n  script: '${script}',\n  intro: ${intro},\n};\n\nexport default function Template${id}New() {\n  return <${component} config={config} />;\n}\n`;
  await writeFile(join(target, `Template${id}New.jsx`), source);
}

console.log(`Generated ${profiles.length} source-aligned React templates.`);

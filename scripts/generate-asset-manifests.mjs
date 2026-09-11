import { readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const cosmeticsRoot = join(root, 'assets', 'cosmetics');
const folders = {
  hairstyles: 'hairstyles',
  outfits: 'outfits',
  handAccessories: 'hand-accessories',
  shoes: 'shoes'
};

const titleFromFile = (filename) => filename
  .replace(/\.glb$/i, '')
  .replace(/[_-]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase());

const manifest = {};
for (const [category, folder] of Object.entries(folders)) {
  const directory = join(cosmeticsRoot, folder);
  const filenames = (await readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && /\.glb$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  manifest[category] = filenames.map((filename) => ({
    id: filename.replace(/\.glb$/i, ''),
    name: titleFromFile(filename),
    path: relative(root, join(directory, filename)).split('\\').join('/')
  }));
}

await writeFile(
  join(cosmeticsRoot, 'manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
  'utf8'
);
console.log(`Generated cosmetic manifest with ${Object.values(manifest).flat().length} GLB files.`);

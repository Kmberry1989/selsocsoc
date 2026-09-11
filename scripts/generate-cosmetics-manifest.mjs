import { readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const categories = {
  hairstyles: 'hairstyles',
  outfits: 'outfits',
  handAccessories: 'hand-accessories',
  shoes: 'shoes'
};

const displayName = (filename) => filename
  .replace(/\.glb$/i, '')
  .replace(/[_-]+/g, ' ')
  .replace(/\s+/g, ' ')
  .trim()
  .replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase());

const manifest = {};
for (const [category, folder] of Object.entries(categories)) {
  const directory = path.join(root, 'assets', 'cosmetics', folder);
  const files = (await readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && /\.glb$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
  manifest[category] = files.map((filename) => ({
    id: filename.replace(/\.glb$/i, ''),
    name: displayName(filename),
    path: `assets/cosmetics/${folder}/${filename}`
  }));
}

await writeFile(
  path.join(root, 'assets', 'cosmetics', 'manifest.json'),
  `${JSON.stringify(manifest, null, 2)}\n`,
  'utf8'
);
console.log(`Generated cosmetic catalogue with ${Object.values(manifest).flat().length} GLB files.`);

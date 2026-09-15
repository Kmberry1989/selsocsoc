import { readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const categories = ['buildings', 'trees', 'props'];
const title = (filename) => filename.replace(/\.glb$/i, '').replace(/[_-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
const manifest = {};
for (const category of categories) {
  const folder = join(root, category);
  const files = (await readdir(folder, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && /\.glb$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
  manifest[category] = files.map((filename) => ({
    id: filename.replace(/\.glb$/i, ''),
    name: title(filename),
    path: `assets/environment-props/${category}/${filename}`,
  }));
}
await writeFile(join(root, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Environment manifest updated: ${categories.map((category) => `${manifest[category].length} ${category}`).join(', ')}`);

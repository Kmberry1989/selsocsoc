import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const categories = ['buildings', 'trees', 'props'];
const title = (filename) => filename.replace(/\.glb$/i, '').replace(/[_-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

async function scan(category) {
  const folder = join(root, category);
  await mkdir(folder, { recursive: true });
  return (await readdir(folder, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && /\.glb$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

const manifest = {};
for (const category of categories) {
  const files = await scan(category);
  manifest[category] = files.map((filename) => ({
    id: filename.replace(/\.glb$/i, ''),
    name: title(filename),
    path: `assets/environment-props/${category}/${filename}`,
  }));
}
await writeFile(join(root, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Environment manifest updated: ${categories.map((category) => `${manifest[category].length} ${category}`).join(', ')}`);

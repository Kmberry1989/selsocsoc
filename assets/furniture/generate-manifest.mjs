import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const title = (filename) => filename.replace(/\.glb$/i, '').replace(/[_-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
await mkdir(root, { recursive: true });
const files = (await readdir(root, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && /\.glb$/i.test(entry.name))
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));
const manifest = {
  furniture: files.map((filename) => ({
    id: filename.replace(/\.glb$/i, ''),
    name: title(filename),
    path: `assets/furniture/${filename}`,
  })),
};
await writeFile(join(root, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Furniture manifest updated: ${manifest.furniture.length} furniture`);

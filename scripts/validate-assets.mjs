import { access, readFile, readdir } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';

const root = process.cwd();
const ignored = new Set(['archive', 'node_modules', '.git', '.firebase']);
const textExtensions = new Set(['.html', '.css', '.js', '.mjs', '.json']);
const errors = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (ignored.has(entry.name) || entry.name === '.DS_Store') continue;
    const path = join(directory, entry.name);
    if (relative(root, path).replaceAll('\\', '/').startsWith('assets/vendor/')) continue;
    if (entry.isDirectory()) files.push(...await walk(path));
    else files.push(path);
  }
  return files;
}

async function exists(path) {
  try { await access(join(root, path)); return true; } catch { return false; }
}

const files = await walk(root);
const referenced = new Map();
for (const file of files.filter((path) => textExtensions.has(extname(path)))) {
  const source = await readFile(file, 'utf8');
  for (const match of source.matchAll(/assets\/[A-Za-z0-9_./ -]+\.(?:webp|png|jpe?g|svg|glb|wav|mp3|ogg|mp4|webm|wasm)/gi)) {
    if (!referenced.has(match[0])) referenced.set(match[0], relative(root, file));
  }
  if (!file.endsWith('artwork-manifest.json')) continue;
  const manifest = JSON.parse(source);
  const groups = [
    ['garden-art', ...Object.values(manifest.garden || {})],
    ['painting-art', manifest.painting || []],
    ['fishing-art', manifest.fishing || []],
    ['sprites', manifest.worldSprites || []],
    ['textures', manifest.materials || []],
  ];
  for (const [folder, ...lists] of groups) {
    for (const name of lists.flat()) referenced.set(`assets/${folder}/${name}`, relative(root, file));
  }
}

for (const [path, source] of referenced) if (!await exists(path)) errors.push(`Missing referenced asset: ${path} (from ${source})`);

const runtimePngs = files
  .map((path) => relative(root, path).replaceAll('\\', '/'))
  .filter((path) => path.endsWith('.png') && !path.startsWith('assets/outfit-textures/') && !path.startsWith('assets/painted-accessories/') && !path.startsWith('assets/npc-faces/') && !path.startsWith('assets/sprites/'));
for (const path of runtimePngs) errors.push(`Unexpected runtime PNG: ${path}`);

const textureManifest = JSON.parse(await readFile(join(root, 'assets/textures/manifest.json'), 'utf8'));
const textureIds = Object.keys(textureManifest);
if (new Set(textureIds).size !== textureIds.length) errors.push('Duplicate texture manifest IDs');
for (const [id, item] of Object.entries(textureManifest)) {
  if (!item?.path || !/\.(?:svg|webp|png|jpe?g)$/i.test(item.path)) errors.push(`Unsupported texture path for ${id}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Asset validation passed: ${referenced.size} referenced files, ${textureIds.length} texture IDs.`);

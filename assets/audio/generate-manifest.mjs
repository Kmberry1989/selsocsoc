import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const audioRoot = path.join(root, "assets", "audio");
const supported = new Set([".wav", ".mp3", ".ogg", ".m4a"]);

async function scan(group) {
  const folder = path.join(audioRoot, group);
  const files = (await readdir(folder, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && supported.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
  return files.map((file) => ({
    id: path.basename(file, path.extname(file)).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
    file: `assets/audio/${group}/${file}`,
  }));
}

const manifest = { music: await scan("music"), sfx: await scan("sfx") };
await writeFile(path.join(audioRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Audio manifest: ${manifest.music.length} music tracks, ${manifest.sfx.length} sound effects.`);

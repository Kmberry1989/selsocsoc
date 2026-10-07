import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const directory = path.join(process.cwd(), "assets", "menu-wallpaper");
const files = (await readdir(directory, { withFileTypes: true }))
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .filter((name) => !/^(README\.md|manifest\.json|generate-manifest\.mjs)$/i.test(name));

const rank = (name, canonical, extensionRank) => {
  const lower = name.toLowerCase();
  const canonicalIndex = canonical.indexOf(lower);
  if (canonicalIndex !== -1) return canonicalIndex;
  const extension = path.extname(lower);
  return canonical.length + extensionRank.indexOf(extension);
};
const assetPath = (name) => `assets/menu-wallpaper/${name}`;
const videoType = (name) => /\.mp4$/i.test(name) ? "video/mp4" : "video/webm";

const videos = files
  .filter((name) => /\.(mp4|webm)$/i.test(name))
  .sort((a, b) => rank(a, ["menu.mp4", "menu.webm"], [".mp4", ".webm"]) - rank(b, ["menu.mp4", "menu.webm"], [".mp4", ".webm"]) || a.localeCompare(b))
  .map((name) => ({ path: assetPath(name), type: videoType(name) }));

const posters = files
  .filter((name) => /\.(webp|jpe?g|png)$/i.test(name))
  .sort((a, b) => rank(a, ["menu.webp", "menu.jpg", "menu.jpeg", "menu.png"], [".webp", ".jpg", ".jpeg", ".png"]) - rank(b, ["menu.webp", "menu.jpg", "menu.jpeg", "menu.png"], [".webp", ".jpg", ".jpeg", ".png"]) || a.localeCompare(b));

const manifest = { poster: posters[0] ? assetPath(posters[0]) : "", videos };
await writeFile(path.join(directory, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`Menu wallpaper manifest: ${videos.length} video source(s), ${manifest.poster ? "1 poster" : "no poster"}.`);

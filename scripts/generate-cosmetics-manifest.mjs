import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const categories = {
  hairstyles: "hairstyles",
  headAccessories: "head-accessories",
  outfits: "outfits",
  handAccessories: "hand-accessories",
  shoes: "shoes"
};

const displayName = (filename) => filename
  .replace(/\.glb$/i, "")
  .replace(/[_-]+/g, " ")
  .replace(/\s+/g, " ")
  .trim()
  .replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase());

const reviewsPath = path.join(root, "assets", "cosmetics", "fit-reviews.json");
let fitReviews = {};
try {
  const parsed = JSON.parse(await readFile(reviewsPath, "utf8"));
  if (parsed && !Array.isArray(parsed) && typeof parsed === "object") fitReviews = parsed;
} catch (error) {
  // fit-reviews.json is optional. A missing or unreadable file means that every
  // discovered cosmetic starts unapproved and appears in Fit Check.
  if (error?.code !== "ENOENT" && error?.name !== "SyntaxError") {
    console.warn(`Fit reviews unavailable; continuing with none (${error.message}).`);
  }
}

const manifest = { fitReviews };
for (const [category, folder] of Object.entries(categories)) {
  const directory = path.join(root, "assets", "cosmetics", folder);
  await mkdir(directory, { recursive: true });
  const files = (await readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && /\.glb$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  manifest[category] = files.map((filename) => ({
    id: filename.replace(/\.glb$/i, ""),
    name: displayName(filename),
    path: `assets/cosmetics/${folder}/${filename}`
  }));
}

await writeFile(
  path.join(root, "assets", "cosmetics", "manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8"
);
console.log(`Cosmetics manifest: ${Object.keys(categories).reduce((count, category) => count + manifest[category].length, 0)} GLB files; ${Object.keys(fitReviews).length} fit approval(s).`);

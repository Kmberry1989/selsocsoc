import { readdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const definitions = {
  'coin-scramble': 'Coin Scramble',
  'plaza-tag': 'Plaza Tag',
  'room-quiz': 'Room Quiz',
  'balloon-pop': 'Balloon Pop',
  'plaza-sprint': 'Plaza Sprint',
  'pond-fishing': 'Pond Fishing',
  'hot-potato': 'Hot Potato',
  'hide-and-seek': 'Hide & Seek',
  'musical-statues': 'Musical Statues',
  'memory-match': 'Memory Match',
  'pattern-parade': 'Pattern Parade',
  'draw-and-guess': 'Draw & Guess',
  'cat-herding': 'Cat Herding',
  'bridge-builders': 'Bridge Builders',
  'coin-curling': 'Coin Curling',
  'emote-charades': 'Emote Charades',
  'sneaky-snug': 'Sneaky Snug',
  'scavenger-snap': 'Scavenger Snap',
  'dodge-puffs': 'Dodge Puffs',
  'freeze-tag': 'Freeze Tag',
  'treasure-dig': 'Treasure Dig',
  'snowball-toss': 'Snowball Toss',
  'lantern-hunt': 'Lantern Hunt',
  'petal-catch': 'Petal Catch',
};

const games = {};
for (const [id, name] of Object.entries(definitions)) {
  const folder = join(root, id, 'props');
  let filenames = [];
  try { filenames = await readdir(folder); } catch {}
  const props = filenames
    .filter((filename) => filename.toLowerCase().endsWith('.glb') && !filename.toLowerCase().startsWith('template-'))
    .sort((a, b) => a.localeCompare(b))
    .map((filename) => ({ name: filename.replace(/\.glb$/i, '').replace(/[_-]+/g, ' '), path: `assets/minigames/${id}/props/${filename}` }));
  games[id] = { name, props };
}

await writeFile(join(root, 'manifest.json'), `${JSON.stringify({ generatedAt: new Date().toISOString(), games }, null, 2)}\n`);
console.log(`Wrote ${relative(process.cwd(), join(root, 'manifest.json'))}`);

# Selfie Social Society minigame assets

Every blueprint minigame has a drop-in prop folder. Put authored `.glb` files in `assets/minigames/<game>/props/`, then run `node assets/minigames/generate-manifest.mjs` before publishing. The browser asset pipeline reads `manifest.json`; when a folder has no GLBs, the game keeps its built-in primitive fallback.

## Wave folders

- Wave 0: `coin-scramble`, `plaza-tag`, `room-quiz`
- Wave 1: `balloon-pop`, `plaza-sprint`, `pond-fishing`
- Wave 2: `hot-potato`, `hide-and-seek`, `musical-statues`
- Wave 3: `memory-match`, `pattern-parade`, `draw-and-guess`
- Wave 4: `cat-herding`, `bridge-builders`, `coin-curling`
- Wave 5: `emote-charades`, `sneaky-snug`, `scavenger-snap`
- Wave 6: `dodge-puffs`, `freeze-tag`, `treasure-dig`
- Seasonal: `snowball-toss`, `lantern-hunt`, `petal-catch`

Export GLB in meters with embedded textures. Draco compression is supported through the game's bundled decoder. Keep collisions forgiving and props away from the player's core path.

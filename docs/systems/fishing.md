# Fishing

**Status:** SHIPPED

## What it is

Pond fishing: a `pond-fishing` minigame exists in the minigame catalog, with fishing reward art (shells: conch, scallop, spiral) in `assets/fishing-art/`. **Bobby Gill** is the fishing mentor NPC in the roster, and his mentor content is now wired in-game.

## How it works for the player

- The `pond-fishing` minigame is one of the 24 catalogued minigames (see `minigames.md`): players fish at the pond for catches and rewards.
- Fishing rewards include collectible shell art (`assets/fishing-art/shell-conch.webp`, `shell-scallop.webp`, `shell-spiral.webp`).
- Talking to Bobby Gill and tapping “Visit fishing practice” on his final intro line opens his mentor front (`assets/npc-fronts.js`): voiced pond tips plus his live pond-quest readout, before routing to Solo Practice.

## Bobby Gill’s mentor content

All tips are grounded in the real mechanics in `assets/multiplayer.js`:

- Six casts per run; cast when the ripple sits inside the golden ring.
- Each ripple cycle runs about 38 seconds.
- Casting before the window reads “Too early — wait for the golden ring”; after it, “Too late — the fish slipped away”.
- Gear pointers: the Casting Bell (34 shells, chimes the timing cue) and the Lucky Bobber (luck for rarer pond surprises), both real catalog items.
- Pond quest: when Dottie’s board pins a fishing quest (e.g. “Catch 3 fish”, +24 shells), Bobby reads its live progress and bonus state from `window.__snugDailyLoop`; otherwise he notes the pond always pays practice.

Bobby speaks with his roster voice (rate 0.8, pitch 0.72) and the dialogue reuses the game’s `.city-npc-dialogue` markup, bloom captions, and TTS conventions.

## Key code files

- `assets/minigames/pond-fishing/` — the minigame's folder in the catalog.
- `assets/fishing-art/` — shell reward art.
- `assets/minigame-stages.js` — staged minigame presentation (references Bobby Gill in staged content).
- `assets/npc-fronts.js` — Bobby’s voiced mentor front (tips + pond-quest readout), additive over the roster.
- `assets/society-plus.js` — exposes `window.__snugDailyLoop` (quest progress/claim state) that Bobby’s quest line reads.

## Where state lives

Catches and rewards flow into the standard inventory/player save like other minigame winnings. Quest progress comes from the daily-loop state (`players/{uid}` → `gameplay.daily`).

## NPCs involved

- **Bobby Gill** — Fishing mentor. Present in the NPC roster (`assets/npc-roster.js`); in-game mentor content (pond tips, pond quests) is wired through `assets/npc-fronts.js`.

# Fishing

**Status:** PARTIAL

## What it is

Pond fishing: a `pond-fishing` minigame exists in the minigame catalog, with fishing reward art (shells: conch, scallop, spiral) in `assets/fishing-art/`. **Bobby Gill** is the fishing mentor NPC in the roster.

## How it works for the player

- The `pond-fishing` minigame is one of the 24 catalogued minigames (see `minigames.md`): players fish at the pond for catches and rewards.
- Fishing rewards include collectible shell art (`assets/fishing-art/shell-conch.webp`, `shell-scallop.webp`, `shell-spiral.webp`).

## Key code files

- `assets/minigames/pond-fishing/` — the minigame's folder in the catalog.
- `assets/fishing-art/` — shell reward art.
- `assets/minigame-stages.js` — staged minigame presentation (references Bobby Gill in staged content).

## Where state lives

Catches and rewards flow into the standard inventory/player save like other minigame winnings.

## NPCs involved

- **Bobby Gill** — Fishing mentor. Currently present in the NPC roster (`assets/npc-roster.js`); in-game mentor content (pond tips, pond quests) is not yet wired beyond roster/staged references.

## Why PARTIAL

The minigame and reward art are real, but Bobby Gill's mentor role (tips, quests) exists only as roster data so far. The full "fishing mentor" experience is not yet built out.

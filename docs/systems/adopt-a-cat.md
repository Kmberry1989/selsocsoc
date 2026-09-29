# Adopt-a-Cat

**Status:** SHIPPED

## What it is

Players can adopt a cat that follows them around town and reacts to emotes.

## How it works for the player

- Adopt a stray-cat follower "for a while, courtesy of Agnes Alley" (inventory item in `assets/inventory-system.js`).
- The adopted cat follows the player and reacts to emotes.
- Cats are 3D: per the art direction, pets stay 3D (silhouette matters), unlike the 2D-sprite treatment for plants and inventory items.

## Key code files

- `assets/inventory-system.js` — the adoption item and follower grant.
- `assets/npc-roster.js` — Agnes Alley's roster entry ("Cat shelter keeper").
- Bundled app code — follower behavior and emote reactions (9 adopt references in game code).

## Where state lives

Adoption state folds into the standard player save (`players/{uid}`).

## NPCs involved

- **Agnes Alley** — Cat shelter keeper; runs the adoption.

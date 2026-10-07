# Gardening

**Status:** SHIPPED

## What it is

A full planting loop: buy seeds, plant crops, water them, and harvest. Run by Fern Bramble and her seed cart.

## How it works for the player

- **Fern Bramble's seed cart** sells seed packets (packets hold three seeds). Moonbloom stock appears at night.
- Players plant seeds in garden plots, water them, and harvest mature crops.
- Crop/seed/tool art is 2D sprite art (per the art direction: plants, flowers, and crops are transparent camera-facing sprites). The repo's `assets/garden-art/` folder holds the gardening artwork, and crop art is wired into the system (`seedArt`).
- Seeds cost shells (`seedCost`); harvests feed back into inventory/economy.

## Key code files

- `assets/gardening-system.js` + `assets/gardening-system.css` — planting, watering, growth, harvest, seed-cart shop UI.
- `assets/garden-art/` — crop/seed/tool sprite art.
- `assets/plant-billboards.js` — billboard/sprite rendering for compatible plants/trees/rocks/fences.
- `assets/textures/` — garden-related material entries in the texture manifest.

## Where state lives

Garden state is covered by the Firebase rules bundle — see `assets/MULTIPLAYER-SETUP.md` ("garden data") and the Realtime Database rules file. Crop/inventory mutations land in the standard player save.

## NPCs involved

- **Fern Bramble** — Gardener; runs the seed cart.

## Known limitations

Complete planting-to-harvest timing, garden persistence across reloads, and inventory mutations from harvesting were source/static-reviewed but not destructively exercised (GAMEPLAY-AUDIT.md). A live session check is still worthwhile.

# World Editor — Selfie Social Society

Author the world of Cyclical City: paint biome blends onto the terrain, lay out
NPC patrol paths, and place trigger zones that fire dialogue, quest, sound, or
camera events when players walk in.
Part of the Creator Suite (four external editors for expanding the game).

## Run it
Serve this folder with any static server (or open `index.html`) and paint.

## Pipeline
1. Paint biomes (`layout.biomePaint[]`), NPC routes (`layout.npcPaths[]`),
   trigger zones (`layout.triggerZones[]`)
2. Export the layout JSON
3. Copy the export to `assets/world/layout.json` in the game repo
   (`Kmberry1989/selsocsoc`) — manual step
4. Push — Vercel auto-deploys

Schema reference: `NEW-TOOLS-SCHEMA.md`

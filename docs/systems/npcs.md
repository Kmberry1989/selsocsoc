# NPCs of Cyclical City

**Status:** SHIPPED

## What it is

The town's cast: neighbors with distinct roles, a shared facial style (so players read as foreigners/guests), individual personalities, and black toon/cel outlines on characters and 3D scenery.

## The roster

| NPC | Role |
|---|---|
| Mayor Mayor | The mayor; welcoming committee |
| Gideon | Eccentric tour guide; Mayor Mayor's father — "He's Mr. Mayor Mayor now!" |
| Lyla Lens | Newspaper photographer (portrait appointments) |
| Chip Chance | Minigame host & showman; game-show host/announcer |
| Barnaby Bargain | Shopkeeper (rotating daily shop) |
| Pip Parade | Festival organizer |
| Agnes Alley | Cat shelter keeper (adopt-a-cat) |
| Dottie Daly | Quest giver (daily quests, login streak) |
| Peggy Plank | Bridge foreman (Moonlight Footbridge) |
| Mr. Buck Coinsworth | Banker (Snug Board bank, Banker bonus star) |
| Fern Bramble | Gardener (seed cart) |
| Stanley Stamp | Mail carrier (gifts, trade deliveries) |
| Bobby Gill | Fishing mentor |
| Tilly Turner | Game-show co-host ("Keeper of the answers" in Nosy Neighbors) |

Eleven of these ship as data in `assets/npc-roster.js` (id, name, role, dialogue, position, voice rate/pitch); Mayor Mayor and Gideon live in the welcome bundle; Tilly Turner appears in the game-show code. Per-NPC folders with portraits/notes live under `assets/npc-roster/`.

## Speaking & dialogue

- Speaking mouths smoothly morph and scale (somewhat randomly) while talking, set lower on the face; speaking characters shake and wiggle upright in the air.
- Captions bloom word-by-word in speech order; full lines remain accessible to assistive tech; reduced-motion mode shows static readable text.
- **Gideon** gets a unique voice: rate 0.88, pitch 0.6 (masculine, older, low-pitched); his sung dialogue stays sung. **Mayor Mayor** speaks at rate 0.95.
- Text selection is disabled throughout the game.

## Key code files

- `assets/npc-roster.js` — roster data + Three.js-powered roster rendering.
- `assets/npc-roster/` — per-NPC folders, `manifest.json`, `README.md`.
- `assets/speaking-mouth.js` — the speaking-mouth performance system.
- `assets/selfie-social-society-welcome.bundle.js` — Gideon/Mayor Mayor ceremony content.

## NPC vs player distinction

NPC faces follow a set style while keeping individual qualities, so players (with their selfie faces) read as visitors in the NPCs' world.

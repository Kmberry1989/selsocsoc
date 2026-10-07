# Festivals

**Status:** SHIPPED

## What it is

Rotating in-game festivals that change up the town: event quests, festival-exclusive rewards, and themed wearables. Organized by **Pip Parade**.

## How it works for the player

- Festivals rotate on a schedule, each bringing event quests and exclusive rewards (e.g. the wearable glowing festival crown from Pip Parade's **Starlight Jamboree**, found as an inventory item in `assets/inventory-system.js`).
- Festival content plugs into the existing quest/economy systems: expression events react to festival/achievement events (docs/PARTY_NIGHT_AUDIT.md).

## Key code files

- `assets/inventory-system.js` — festival reward items (e.g. Starlight Jamboree crown).
- `assets/gardening-system.js` — festival hooks in the garden system.
- Bundled app code — festival rotation and event-quest wiring (79 festival references across the game bundles).

## Where state lives

Festival participation and rewards fold into the standard player save (`players/{uid}`); event quests ride the quest system (see `daily-loop.md`).

## NPCs involved

- **Pip Parade** — Festival organizer; runs the three rotating festivals and their event quests.

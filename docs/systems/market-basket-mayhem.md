# Market Basket Mayhem

**Status:** SHIPPED

## What it is

A grocery-run minigame in the shared minigame catalog: race a market stall course with a shopping basket, grabbing readable grocery items and checking out at the finish. Added in the party-night upgrade as a featured activity.

## How it works for the player

- Joins the shared game catalog and challenge contract like other minigames: it appears in Solo Practice's shared challenge set and room rotations.
- Market-stall course theme with a carried basket prop and grocery-item sprites; checkout stand as the visible finish target.

## Key code files

- `assets/multiplayer.js` — the `GAME_DEF` wiring Market Basket Mayhem into the shared catalog and challenge contract.
- `assets/minigames/market-basket-mayhem/` — the minigame's folder (currently holds `README.md`; arena/prop art per the wish list below).
- `assets/minigame-stages.js` — staged presentation shared with other minigames.

## Where state lives

Same as other minigames: RTDB `minigames/{roomId}/events` for round events; winnings fold into the Firestore player save.

## NPCs involved

None specifically — it runs through the shared minigame host flow (Chip Chance).

## Known limitations

The party-night audit's "exact asset wish list" for this game was never built: `market-stall.glb` arena shell, `shopping-basket.glb` carried prop, `items.webp` grocery-item sprite atlas, and `checkout.glb` finish target. Existing CSS shapes, icons, and town props are usable fallbacks until those assets exist (docs/PARTY_NIGHT_AUDIT.md).

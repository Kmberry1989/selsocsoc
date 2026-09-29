# Inventory & Economy

**Status:** SHIPPED

## What it is

One shared inventory and one currency. Everything the player earns or carries lives here.

## How it works for the player

- **Shells** are the single currency: earned from minigames, board games, shows, quests, and harvests; spent at shops (seed cart, daily shop, board shops). There is no second currency — minigame winnings fold directly into the Firestore player save.
- **Inventory/bag:** everything a character carries is 2D (per the art direction: all inventory and carried items are flat sprites, never 3D).
- Wearables, crops, shells rewards, festival items, and the adopt-a-cat follower all route through the inventory system.

## Key code files

- `assets/inventory-system.js` + `assets/inventory-system.css` — inventory UI, item grants, equip logic.
- `assets/inventory/` — inventory item art (2D sprites).

## Where state lives

- Firestore `players/{uid}` — inventory contents, shell balance, outfit state. The single source of truth; every earning path writes here.

## NPCs involved

- **Barnaby Bargain** — Shopkeeper (rotating daily shop); roster-only presence so far (see `daily-loop.md`).
- **Mr. Buck Coinsworth** — Banker for Snug Board winnings.

## Known limitations

Inventory mutations from newer paths (fishing catches, garden harvests, minigame exits) were source/static-reviewed but not destructively exercised end-to-end (GAMEPLAY-AUDIT.md).

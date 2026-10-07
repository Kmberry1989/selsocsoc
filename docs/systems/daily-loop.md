# Daily Loop (Quests, Streak, Rotating Shop)

**Status:** SHIPPED

## What it is

The retention loop: daily quests, a login streak, and a rotating daily shop that together give players a reason to come back every day. The named NPC fronts for the loop — Dottie Daly and Barnaby Bargain — now have in-game dialogue/scenes wired to the real systems.

## How it works for the player

- **Daily quests:** quest content lives in `assets/society-plus.js` — including "Dottie's bonus" payouts landing in the shell balance. Talking to **Dottie Daly** and tapping “Check today’s quests” on her final intro line opens her voiced quest-giver front (`assets/npc-fronts.js`): she reads the live streak, login-bonus state, and each of today’s three quests with real progress, then routes to the Today panel. The Today panel itself now opens under her named header (portrait mark, role, and a contextual line about streak/unclaimed bonuses).
- **Login streak:** streak tracking lives in `assets/society-plus.js`; Dottie’s dialogue and panel header both surface the live streak and whether today’s welcome is claimed.
- **Rotating shop:** the real rotating daily shop is `rotatingShop()` in `assets/society-plus.js` — three deterministic daily picks from the approved catalog with a 10-shell markdown, purchasable from the “Daily market shelf” in the Today panel. Talking to **Barnaby Bargain** and tapping “Browse today’s shop” on his final intro line opens his voiced shopkeeper front: he presents the three live deals by name with real discounted prices and owned state, then routes to the Today panel scrolled to the Daily market shelf (where the deals are actually purchasable). The shelf now carries his named shopkeeper header.

## NPC dialogue wiring

- `assets/npc-fronts.js` (new, additive — the minified roster is never edited) listens for the roster dialogue’s final action tap for these NPCs, tears the roster dialogue down through its own path, and opens an extended front reusing the game’s `.city-npc-dialogue` markup, bloom captions, and per-NPC TTS voice/rate/pitch.
- `assets/society-plus.js` exposes a small public API, `window.__snugDailyLoop`, over the real quest/streak/shop state (quest list, progress, claim state, streak, login reward/claim, rotating shop, daily price, owned state) for the fronts to read. Nothing is invented.

## Key code files

- `assets/society-plus.js` — quest bonus payouts, streak, rotating shop, `window.__snugDailyLoop`, and the Dottie/Barnaby panel headers in the Today view.
- `assets/npc-fronts.js` — Dottie’s quest-giver dialogue and Barnaby’s shopkeeper dialogue.
- `assets/npc-fronts.css` — panel header styles for the two NPC fronts.
- `assets/npc-roster.js` — roster entries for the loop's NPCs (unchanged).

## Where state lives

Quest/streak/shop state folds into the standard player save (`players/{uid}`).

## NPCs involved

- **Dottie Daly** — Quest giver (daily quests, login streak). In-game quest-giver dialogue and a named Today-panel header are wired through `assets/npc-fronts.js` / `assets/society-plus.js`.
- **Barnaby Bargain** — Shopkeeper (rotating daily shop). In-game shopkeeper dialogue presenting the real rotating deals, plus a named header on the Daily market shelf, wired through the same files.

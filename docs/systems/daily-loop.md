# Daily Loop (Quests, Streak, Rotating Shop)

**Status:** PARTIAL

## What it is

The retention loop: daily quests, a login streak, and a rotating daily shop that together give players a reason to come back every day.

## How it works for the player

- **Daily quests:** quest content exists in the game bundles (48 quest references), with quest-giver wiring through `assets/society-plus.js` — including "Dottie's bonus" payouts landing in the shell balance.
- **Login streak:** streak tracking exists (10 references in game code).
- **Rotating shop:** shop systems exist (14 shop references); the daily shop offers a rotating selection.

## Key code files

- `assets/society-plus.js` — quest bonus payouts and daily-loop wiring.
- `assets/npc-roster.js` — roster entries for the loop's NPCs.

## Where state lives

Quest/streak/shop state folds into the standard player save (`players/{uid}`).

## NPCs involved

- **Dottie Daly** — Quest giver (daily quests, login streak). Quest *systems* are implemented; Dottie herself currently appears only in the NPC roster — in-game quest-giver dialogue/scenes for her are not yet wired beyond the roster.
- **Barnaby Bargain** — Shopkeeper (rotating daily shop). Same caveat: present in the roster; the shop systems exist but Barnaby's in-game shopkeeper presence is roster-only so far.

## Why PARTIAL

The underlying systems (quests, streak, rotating shop) are real and referenced throughout the game code, but the named NPC fronts for them — Dottie Daly and Barnaby Bargain — are roster entries without in-game scenes yet.

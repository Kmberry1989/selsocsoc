# Game Shows — Framework

**Status:** SHIPPED

## What it is

Selfie Social Society's game shows are staged, hosted TV-style events inside Cyclical City. Each show is a self-contained full-screen overlay with its own set dressing, hosts, sound package, and rules — built to feel like produced television, not a minigame reskin.

## How it works for the player

- Shows are launched from Town Life / event entry points and take over the screen with a marquee, host introductions, and staged rounds.
- Each show has bespoke presentation: logo lockups, animated set dressing, host dialogue, and a full sound package (themes, stingers, countdowns).
- Shows are local/pass-and-play experiences; results (wins, winnings) fold into the normal shell economy.

## Key code files

- `assets/game-show-audio.js` — the shared game-show sound package: theme music, stingers, and transitions the shows call into. Designed to be extensible for future game shows.
- `assets/nosy-neighbors.js` + `assets/nosy-neighbors.css` — Nosy Neighbors (shipped).
- `assets/whirl-of-resources.js` + `assets/whirl-of-resources.css` — Whirl of Resources (shipped).
- `assets/family-feud-show.js` + `assets/family-feud-show.css` — Survey Showdown, the one-on-one survey show (shipped).
- `assets/mailbox-system.js` — show-related achievements (e.g. "Whirl Winner" listens for the `snug-whirl-result` event).

## Where state lives

Show results that pay out (wins, shells) flow into the standard player save. See `inventory-economy.md` and `multiplayer-architecture.md`.

## NPCs involved

- **Chip Chance** — minigame host and showman; hosts/announces across the game-show lineup.
- **Tilly Turner** — co-host ("Keeper of the answers" in Nosy Neighbors).

## Shows

- [Whirl of Resources](whirl-of-resources.md) — SHIPPED
- [Nosy Neighbors](nosy-neighbors.md) — SHIPPED
- [Family Feud-style one-on-one](family-feud-show.md) — SHIPPED (as **Survey Showdown**)

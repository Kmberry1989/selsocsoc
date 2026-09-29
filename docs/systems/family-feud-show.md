# Family Feud-style One-on-One Show

**Status:** PLANNED

> Design direction only. There is no code for this show in the repo. Do not treat this guide as a description of shipped behavior.

## What it is

A planned Family Feud-style one-on-one game show for the Cyclical City game-show lineup: two players face off guessing the most popular answers to survey-style questions.

## Planned design (not yet built)

- One-on-one survey-answer format in the style of Family Feud, staged like the other game shows (marquee, hosts, set dressing, sound package).
- Intended to reuse the shared game-show framework: `assets/game-show-audio.js` for the sound package and the staged-overlay presentation pattern established by [Nosy Neighbors](nosy-neighbors.md).
- Like the other shows, it should be extensible for future game-show additions rather than a one-off.

## What exists in the repo today

Nothing. No files, styles, or hooks reference this show. The extensible audio/show systems (`assets/game-show-audio.js`) were built with future shows like this one in mind.

## Key code files (when built)

- New show logic + CSS files (not yet written)
- `assets/game-show-audio.js` — shared sound package to build on

## NPCs involved

Undecided. Chip Chance hosts the game-show lineup generally; casting for this show is open.

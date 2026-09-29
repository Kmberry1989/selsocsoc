# Whirl of Resources

**Status:** PLANNED

> Design direction is locked; the game itself is not implemented yet. Do not treat this guide as a description of shipped behavior.

## What it is

A Wheel-of-Fortune-style word-puzzle game show: spin a big prize wheel, call letters, and solve the puzzle on the board. It is planned as the flagship game show of Cyclical City.

## Planned design (not yet built)

- **Turn indicator:** **"GIVE THE WHIRL A TWIRL!"**
- **Hosts:** Chip Chance (cheesy spoken catchphrases, radio-show announcer voice with showmanship) co-hosting with **Tilly Turner**.
- Wheel-of-Fortune-style loop: spin the wheel, buy vowels / call consonants, solve the puzzle, bank winnings.
- Winnings pay out in shells into the normal player economy.

## What exists in the repo today

- `assets/whirl-of-resources.css` — a complete style sheet for the planned show UI (`.whirl-game` stage, spinning `.whirl-wheel`, `.whirl-tiles` puzzle board, `.whirl-banner`, and host faces including `.whirl-host-face.chip` and `.whirl-host-face.tilly`). The styles are currently orphaned: no JavaScript builds this DOM.
- `assets/mailbox-system.js` — a "Whirl Winner" achievement (`Win a round of Whirl of Resources`) that unlocks on the `snug-whirl-result` event. Nothing in the repo dispatches that event yet; it is a forward hook for the future game.
- `index.html` loads `assets/whirl-of-resources.css`.

## Key code files (when built)

- `assets/whirl-of-resources.css` (exists — styles only)
- Game logic file: not yet written
- `assets/game-show-audio.js` — the shared sound package the show should use

## Where state will live

Undecided. Winnings should fold into the standard shell balance (see `inventory-economy.md`); round state can stay local unless a shared-room mode is designed.

## NPCs involved

- **Chip Chance** — host/announcer
- **Tilly Turner** — co-host

## Open work

Write the game logic, wire it to the existing CSS classes, dispatch `snug-whirl-result` on round end so the mailbox achievement unlocks, and add the show's sound cues to the game-show audio package.

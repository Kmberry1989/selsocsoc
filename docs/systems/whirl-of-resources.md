# Whirl of Resources

**Status:** SHIPPED

## What it is

A Wheel-of-Fortune-style word-puzzle game show: spin the big prize wheel, call letters, and solve the puzzle on the board. The flagship game show of Cyclical City, co-hosted by Chip Chance and Tilly Turner.

## How it works for the player

- Launch **Whirl of Resources** from the Play panel or Solo Practice grid — the show takes over the screen with its marquee, hosts, and the big wheel.
- Tilly Turner welcomes you; the turn indicator **"GIVE THE WHIRL A TWIRL!"** prompts every spin.
- Tap the wheel (or SPIN) — it spins with tick sounds and eased deceleration, then lands on a segment:
  - **Shell wedges** (100–500): call a consonant; each occurrence banks that many shells.
  - **★ wedges**: hide real inventory prizes (Golden Dice, Card Folio, Festival Ticket) — call a correct consonant to take the prize home.
  - **BUST**: loses your round bank. **SKIP**: loses your turn.
- Vowels cost 100 shells from your bank and can be bought instead of spinning.
- Solve the puzzle any time with the solve form. Solving banks your shells into the normal economy and fires the `snug-whirl-result` event (unlocking the "Whirl Winner" mailbox achievement).

## Key code files

- `assets/whirl-of-resources.js` — full show logic: wheel physics, puzzle board, letter/vowel/solve flow, host TTS, economy wiring, launch cards.
- `assets/whirl-of-resources.css` — show styling (stage, wheel, tiles, banners, host faces, launch card). Previously orphaned; now fully wired.
- `assets/game-show-audio.js` — shared sound package: `spinTick` while the wheel turns, `reveal` per tile, `solve`/`fanfare` on wins, `wrong` on misses.
- `assets/mailbox-system.js` — the "Whirl Winner" achievement unlocks on the `snug-whirl-result` event this show dispatches.

## Where state lives

Round state (puzzle, bank, used letters) is local to the show session. Winnings flow into the standard systems: shells via the `snug-award-coins` event, prize items via the `snug-player-patch` event into the player inventory. See `inventory-economy.md`.

## NPCs involved

- **Chip Chance** — announcer; cheesy spoken catchphrases in his radio-show announcer voice (rate 1.28, pitch 1.1, matching his roster voice).
- **Tilly Turner** — co-host; intro, turn indicator, and prize presentations.

## Puzzle pack and puzzle editor

12 starter puzzles, all Cyclical City canon (town names, landmarks, neighbors, show sayings — including Gideon's "HE IS MR MAYOR MAYOR NOW").

The in-show puzzle editor ("Puzzle editor" on the show home screen) mirrors the Nosy Neighbors show editor: it is another internal `state.view`, session-only, with JSON download/import and restore-starter. The show plays from `state.puzzles` (deep-cloned from the starter pack), so edits take effect immediately.

Validation per puzzle:
- Category required; phrase required and normalized to A–Z + spaces (the same normalization the game uses when checking solves).
- Empty phrases rejected; a 60-character cap keeps phrases board-friendly.
- The editor shows a live letter count and notes any invalid characters it strips.

Export format: `{ "format": "whirl-of-resources-puzzle-pack", "version": 1, "title": "Whirl of Resources", "puzzles": [{ category, phrase }] }`. Import accepts the same shape (or a bare array) and validates each puzzle before adding it. Starting a show requires at least one valid puzzle per round; otherwise the host explains what is missing instead of starting.

## 3D prize wheel

The show ships a procedural 3D prize wheel, `assets/game-shows/whirl-of-resources/prize-wheel.glb` (872 triangles, ~96 KB): 12 wedges in `SEGMENTS` order with vertex colors matched to the CSS wheel, a gold rim, hub and knob, plus a static stand (two glTF nodes, `Wheel` and `Stand`). On show open the game lazy-loads it with the repo's dynamic-import three.js pattern (`assets/vendor/three/three.module.js` + `GLTFLoader.js`); the `Wheel` node rotation is driven from `state.rotation` so the `segmentAtPointer()` mapping stays exact. If three.js or the GLB fails to load, the CSS wheel remains in place untouched — the 3D wheel is strictly an enhancement layer.

## Follow-ups

- Shared-room/multiplayer show mode.

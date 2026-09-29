# Snug Board

**Status:** SHIPPED

## What it is

A Mario-Party-style board game: 2–4 players race around a board across coin, event, minigame, shop, and star spaces over a configurable number of rounds. Empty seats are filled by bots that roll, buy, and play on their own.

## How it works for the player

- From the room sheet, players enter the Snug Board waiting room; the host picks 2–4 players (default 4), everyone readies up, and the host starts.
- Rounds are configurable: **5, 10, or 15 rounds**, with **Casual or Strategic** rule styles and **three bot difficulties** (Party Setup, from the party-night upgrade).
- Each movement round ends with an everyone-plays minigame worth ranked coin payouts.
- Shops sell dice boosts, traps, and steals; a **relocating prize star** moves around the board.
- Final tally awards bonus stars that can flip the winner: the **Banker Star** (most coins banked) and the **Minigame Star** (most minigame wins).
- Bots fill every empty seat and take full turns (rolling, buying, playing minigame turns) through host-authored board events.

## Key code files

- `assets/multiplayer.js` — board game logic: `GAME_DEF`s, lobby/ready-up, turn flow, shops, items, events, bot turns, bonus stars, and the `window.__snugPartySettings` configuration (rounds, rules, bot difficulty).
- `assets/MULTIPLAYER-SETUP.md` — the "Snug Board" section documents the intended flow.

## Where state lives

- RTDB `boardGames/{roomId}/events` — the append-only board session: movement rolls, shop purchases, item uses, and each player's minigame score. The client requests the latest 240 events so a full match stays deterministic across devices.
- Winnings fold into the Firestore player save (`players/{uid}`).

## NPCs involved

- **Mr. Buck Coinsworth** — Banker; runs the Snug Board bank and the Banker bonus star.
- **Chip Chance** — minigame host; hypes games and announces winners.

## Known limitations

Complete multi-round playthroughs with real concurrent clients (including bot-filled seats) need a live multi-device session to fully verify.

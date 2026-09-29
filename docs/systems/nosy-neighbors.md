# Nosy Neighbors

**Status:** SHIPPED

## What it is

A Newlywed-style one-on-one game show: two neighbors answer questions about each other, predict each other's answers, and score points for matches. Pass-and-play on one device.

Tagline: "Join us as we cross property lines to find out who the nosiest know-it-all really is in… Nosy Neighbors!"

## How it works for the player

- From the marquee screen ("Start a show" / "Open show editor"), two players enter their names and pick a show length (6, 8, 10, or 12 questions).
- Each card belongs to a round: **Front Porch Forecasts** (predictions), **Pick a Fence** (this-or-that choices), **Choice Chatter** (multiple choice), and **Riddle the Rooftops** (riddles with fixed solutions).
- Turn flow per card: one neighbor answers privately → "Pass the porch" (hand the device over) → the other predicts → "Cross the property line" reveals both → the host scores it: **2 points for a match, 1 for "close enough," 0 otherwise**. The host's call is final.
- Riddle cards are answered by one player and scored against the card's solution.
- The finale names the winner ("knows the block!") or declares a neighborly tie.
- A built-in **show editor** lets players author their own question cards.

## Key code files

- `assets/nosy-neighbors.js` — the entire show: starter deck, setup, play phases (answer → pass → predict → reveal), scoring, finale, and the card editor.
- `assets/nosy-neighbors.css` — marquee, show-card, scoreboard, and finale styling.
- `assets/game-show-audio.js` — sound package the show plays through (`audio()?.resume?.()`, `stopTheme`).

## Where state lives

Show state (deck, players, scores, card index, phase) is local to the session in `assets/nosy-neighbors.js`. No server state; nothing persists between shows.

## NPCs involved

- **Chip Chance** — "Master of neighborly ceremonies"
- **Tilly Turner** — "Keeper of the answers"

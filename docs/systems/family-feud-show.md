# Survey Showdown (Family Feud-style One-on-One)

**Status:** SHIPPED

## What it is

Cyclical City's one-on-one survey game show: the player faces a rival bot across three survey questions, buzzing in for face-offs, running the board on correct guesses, and surviving three-strike steal rounds. Staged like the other shows — marquee, hosts, set dressing, full sound package.

## How it works for the player

- Launched from a **Survey Showdown** card in the Play panel and the Solo Practice grid (same MutationObserver injection pattern as the other shows).
- Home marquee: pick rival difficulty (**Easy / Normal / Hard**), then start.
- **Face-off:** the survey question appears with a 15-second buzz race. Buzz in first, then name an answer within 12 seconds — or the rival answers first and you get one chance to beat their rank. Higher answer (lower rank) controls the board; ties go to the player.
- **Board round:** the controller names answers. Each hit reveals the answer and banks its survey points; each miss is a strike. Three strikes hands the other side a single **steal** attempt — a hit steals the whole bank, a miss leaves it with the controller.
- Three questions per show; the third is the **double round** (all points ×2). Most total points wins.
- Winner: 200 shells + points as bonus shells and the **Mayor's Brass Button** (`keepsake-mayor-button`) inventory item. Runner-up: 25 shells.
- Answers match forgivingly: case/punctuation-insensitive, plural-tolerant, with authored aliases per answer (e.g. "tomato" matches "Tomatoes").
- Sound toggle, reduced-motion support (no buzz-race animation pressure, shortened delays), keyboard/touch-friendly forms, clean Leave that reports an unfinished result.

## Key code files

- `assets/family-feud-show.js` — show logic (~950 lines): survey data, face-off/board/steal state machine, difficulty-aware rival bot, TTS hosting, economy hooks, launch-card injection.
- `assets/family-feud-show.css` — marquee, survey board, strikes, buzz button, scoreboard, responsive + reduced-motion.
- `assets/game-show-audio.js` — shared sound package (theme, stingers, reveal/wrong/fanfare).
- Loaded by `index.html` after `assets/whirl-of-resources.js`.

## Where state lives

- In-show state is local to the overlay; results flow into the standard player save.
- Win/loss dispatches `snug-feud-result` (`{ won, playerPoints, rivalPoints, difficulty, finished }`), mirroring the `snug-whirl-result` convention.
- Shells via `snug-award-coins`; the prize item via `snug-player-patch` (same conventions as the other live systems).
- Survey pack exposed as `window.__snugFeudSurveys` (deep copies); the in-show survey editor edits the session pack. Test hooks at `window.__snugFeudTest`.

## Survey content and survey editor

26 starter questions with Cyclical City flavor (neighbors, landmarks, town life, festivals, the NPC roster), each with 5–8 ranked answers whose points sum to 100 (100 neighbors surveyed).

The in-show survey editor ("Survey editor" on the show home screen) mirrors the Nosy Neighbors show editor: it is another internal `state.view`, session-only, with JSON download/import and restore-starter. The showdown plays from `state.surveys` (deep-cloned from the starter pack), so edits take effect immediately.

Validation per question:
- At least 3 answers, points totaling exactly 100.
- Duplicate detection uses the game's own matching (case/punctuation/plural-insensitive across answer text + aliases).
- A note (not a block) when a question has fewer than the usual 5+ answers.
- The board preview shows the ranked answers before saving.

Export format: `{ "format": "survey-showdown-survey-pack", "version": 1, "title": "Survey Showdown", "surveys": [{ q, answers: [{ t, p, aka }] }] }`. Import accepts the same shape (or a bare array) and validates each question before adding it. Starting a show requires at least 3 valid questions in the session pack; otherwise the host explains what is missing instead of starting.

## The rival bot

Self-contained and difficulty-aware (Easy/Normal/Hard, mirroring the Snug Board convention):
- **Buzz speed:** hard buzzes in ~2–5s, easy in ~8–12s.
- **Face-off answers:** weighted toward top-ranked answers by difficulty.
- **Board play:** knows more answers and strikes less on hard (8% strike chance) than easy (34%).
- **Steals:** succeeds ~65% on hard, ~28% on easy.

## NPCs involved

- **Chip Chance** — host and announcer (cheesy catchphrases, roster voice: rate 1.28, pitch 1.1).
- **Tilly Turner** — Keeper of the Answers (rate 1.06, pitch 1.24).

## Follow-ups (deliberate)

- Multiplayer/shared-room show mode.

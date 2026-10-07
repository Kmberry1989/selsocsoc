# Mailbox, Gifting & Trading

**Status:** SHIPPED

## What it is

The mailbox system handles player-to-player gifts and trade deliveries, plus achievement stamps. **Stanley Stamp** is the mail carrier NPC.

## How it works for the player

- Players send gifts to friends; gifts are delivered through the mailbox (friends accept first — gifting is opt-in on the receiving side).
- Trade deliveries also route through Stanley Stamp. When a trade offer is accepted, the original offerer keeps their offered item out of inventory, but the incoming parcel **waits in the mailbox** until they unwrap it — nothing is auto-credited in the background.
- The mailbox tracks achievements/stamps, including show-related ones (e.g. "Whirl Winner" unlocks on the `snug-whirl-result` event).
- Paintings can be gifted: `paintingGifts` flow with accept-first semantics (see `painting-studio.md`).

## The home mailbox

- A 3D, tap-to-open mailbox stands at the player's home in the residential cottage district (`assets/mailbox/home-mailbox.glb`, 242 triangles, loaded by `assets/mailbox-home.js` with a primitive fallback if the GLB can't load).
- Tapping it opens the mailbox panel; the flag raises while mail is unread and the paint follows the player's mailbox customization.
- `window.__snugMailboxUI` (defined in `assets/mailbox-system.js`) exposes `openPanel`, `unreadCount`, and `mailbox` for world integrations; `window.__snugHomeMailbox` exposes the home mailbox's `position`, `open`, and `ready` state.

## Key code files

- `assets/mailbox-system.js` + `assets/mailbox-system.css` — mailbox UI, gift send/accept, trade deliveries, achievement stamps.
- `assets/mailbox-home.js` — loads the home mailbox GLB at the player's home, flag animation, tap-to-open picking.
- `assets/mailbox/home-mailbox.glb` — procedural home mailbox model (paint tintable at runtime via `SnugPaint`).
- `assets/society-plus.js` — gift/trade sending; `trade-accepted` return parcels stay in the mailbox until unwrapped.
- `index.html` loads these files.

## Where state lives

- Firestore `players/{uid}/mail/{messageId}` — per-player mailbox records (verified in `assets/firebase-firestore.rules`). Gift and `trade-accepted` parcels persist here until unwrapped.
- Firestore `players/{uid}/paintingGifts/{giftId}` — gifted paintings awaiting acceptance.

## NPCs involved

- **Stanley Stamp** — Mail carrier; handles gifts and trade deliveries.

## Stamp unlock wiring

All 12 starter stamps live in `STAMPS` in `assets/mailbox-system.js` and are stored on the player save (`mailbox.stamps`). Unlocks fire two ways: direct `unlockStamp()` event listeners, and `reconcileStamps()` which re-checks stat-based conditions after every `snug-player-patch` (i.e. after any profile save).

Direct event listeners (mailbox-system.js):
- `snug-garden-planted` → Sprout Badge (dispatched by gardening-system.js)
- `snug-garden-harvest` (detail.golden) → Golden Harvest (gardening-system.js)
- `snug-whirl-result` (detail.won) → Whirl Winner (whirl-of-resources.js)
- `snug-board-result` (detail.won) → Star Sailor (dispatched once per ended game by multiplayer.js)
- `snug-house-renovation` (detail.stories ≥ 2) → Master Builder (no dispatcher yet — pending the housing construction feature)
- `snug-project-contribution` (project matches /bridge/i) → Bridge Crew (town-life.js footbridge contributions)
- `snug-cat-adopted` → Cat Whisperer (town-life.js)
- `snug-photo-captured` → increments the 25-photo Shutterbug counter (town-life.js)

Stat-based conditions checked by `reconcileStamps()`:
- Pen Pal — `mailbox.sentCount` ≥ 10 (tracked by mailbox-system.js on send)
- Night Owl — current hour is after midnight (00:00–05:00 local)
- Festival Friend — 3+ `gameplay.festivalRewards` (society-plus.js)
- Cyclical Citizen — expression photos saved during the welcoming committee

Rare stamps (Golden Harvest, Master Builder, Whirl Winner, Star Sailor) get an animated holographic shine via `.stamp-rare` in mailbox-system.css (disabled under `prefers-reduced-motion`).

## Known limitations

Mailbox delivery and gift acceptance across two real users needs a live two-client session to fully verify (GAMEPLAY-AUDIT.md).
Master Builder cannot be earned yet — no housing system writes `house.stories` or dispatches `snug-house-renovation`; the wiring is in place for when housing construction ships.

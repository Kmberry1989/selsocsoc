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

## Known limitations

Mailbox delivery and gift acceptance across two real users needs a live two-client session to fully verify (GAMEPLAY-AUDIT.md).

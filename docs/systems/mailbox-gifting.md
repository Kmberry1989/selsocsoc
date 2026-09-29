# Mailbox, Gifting & Trading

**Status:** SHIPPED

## What it is

The mailbox system handles player-to-player gifts and trade deliveries, plus achievement stamps. **Stanley Stamp** is the mail carrier NPC.

## How it works for the player

- Players send gifts to friends; gifts are delivered through the mailbox (friends accept first — gifting is opt-in on the receiving side).
- Trade deliveries also route through Stanley Stamp.
- The mailbox tracks achievements/stamps, including show-related ones (e.g. "Whirl Winner" unlocks on the `snug-whirl-result` event).
- Paintings can be gifted: `paintingGifts` flow with accept-first semantics (see `painting-studio.md`).

## Key code files

- `assets/mailbox-system.js` + `assets/mailbox-system.css` — mailbox UI, gift send/accept, trade deliveries, achievement stamps.
- `index.html` loads both files.

## Where state lives

- Firestore `players/{uid}/mail/{messageId}` — per-player mailbox records (verified in `assets/firebase-firestore.rules`).
- Firestore `players/{uid}/paintingGifts/{giftId}` — gifted paintings awaiting acceptance.

## NPCs involved

- **Stanley Stamp** — Mail carrier; handles gifts and trade deliveries.

## Known limitations

Mailbox delivery and gift acceptance across two real users needs a live two-client session to fully verify (GAMEPLAY-AUDIT.md).

# Painting Studio

**Status:** SHIPPED

## What it is

A canvas painting mode ("Home workshop"): players paint with real brushes, save named canvases, hang them in their home, and gift them to friends.

## How it works for the player

- Tools: pencil, pen, round, flat, textured, spray, and marker brushes; color picker; size/opacity controls; undo/redo.
- Paintings are saved as named canvases, persist to Firebase, and can be hung in the player's home.
- Paintings are giftable: the recipient accepts first (opt-in, like other gifts).
- Paintings inside frames are 2D (flat art in frames), per the art direction.

## Key code files

- `assets/painting-mode.js` + `assets/painting-mode.css` — the studio UI, brush engine, save/share flow.
- `assets/painting-art/` — painting-tool sprite art.
- `index.html` loads both files.

## Where state lives

- Firestore `paintings/{paintingId}` — saved paintings (verified in `assets/firebase-firestore.rules`).
- Firestore `players/{uid}/paintingGifts/{giftId}` — gifted paintings awaiting acceptance.

## NPCs involved

None — the studio is the player's own workshop.

## Known limitations

Painting save/reload across sessions and the gift-accept flow need a live two-client check to be fully proven; controls and asset paths were source/static-reviewed (GAMEPLAY-AUDIT.md).

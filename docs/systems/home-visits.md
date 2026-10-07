# Home Visits (Strolling Stretch)

**Status:** SHIPPED

## What it is

Players can visit each other's homes. **Strolling Stretch** is the neighborhood sector where the home-visit directory lives: a "Visit a friend at home" entry point for dropping in on another player's house.

## How it works for the player

- From the Strolling Stretch prompt ("Visit a friend at home"), the player picks whose home to visit ("Who would you like to visit?").
- The visit loads the friend's saved home (their `houses/{uid}` record) so guests see the host's furnishings and layout.

## Key code files

- `assets/visit-system.js` + `assets/visit-system.css` — the visit flow: directory UI, visit session, and teardown.
- `index.html` loads both files.

## Where state lives

- Firestore `houses/{uid}` — the visited home is read from the host's saved house record.
- Presence during a visit follows the normal room presence path (see `multiplayer-architecture.md`).

## NPCs involved

None — visits are player-to-player.

## Known limitations

Real two-user visit behavior (guest sees host's home correctly, both see each other) needs a live two-client session to fully verify.

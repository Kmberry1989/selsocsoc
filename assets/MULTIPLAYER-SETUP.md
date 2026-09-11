# Snug Society multiplayer setup

The game uses Firebase Realtime Database for room presence, positions, the last 50 chat messages, and the last 50 minigame events in the current room. Firestore remains the source of truth for profiles, inventory, currency, minigame winnings, and houses.

## One-time Firebase setup

1. In Firebase Console, open **Build → Realtime Database** and create the database.
2. Open the **Rules** tab.
3. Replace the rules with `firebase-realtime-database.rules.json` from this folder, then publish.
4. Keep Anonymous Authentication enabled.
5. If your database URL is not the standard `<project-id>-default-rtdb.firebaseio.com` form, add its exact `databaseURL` field to the Firebase config in the game.

Publish the bundled rules again whenever this file changes. The current rules include the missing-private-flag fix (`private !== true`) and the pre-release hardening described below.

## What the hardened rules enforce

- Private room records can only be created by their owner and cannot be rewritten by ordinary members.
- A player may only add or remove their own membership entry; knowing the invite code is still the bearer permission to join.
- Presence can only be written to the signed-in player's own record, with bounded coordinates and a fixed field set.
- Chat messages are append-only. A player cannot replace or delete a message after it is sent, and the sender UID must match Firebase Authentication.
- Minigame events are append-only, must point to a real round, and must use the expected fields and ranges for that game. Reward claims are rejected until the round has ended.
- Reads remain limited to the public plaza or a private room the signed-in player has joined.

## Data layout

- `rooms/{roomId}` stores private-room metadata and membership.
- `presence/{roomId}/{uid}` stores the player's current position and a heartbeat. The client ignores entries older than 20 seconds.
- `messages/{roomId}` stores room chat. The client requests only the latest 50 messages.
- `minigames/{roomId}/events` stores dice rolls, pickups, tags, quiz answers, and reward claims. The client requests only the latest 50 events for its current room.

The Play button rolls one shared round of Coin Scramble, Plaza Tag, or Room Quiz for everyone currently in the room. Earned shells are folded into the existing Firestore player save; no second currency store is introduced.

Private room codes are random bearer invitations: anyone with the code may join, and room data is otherwise hidden from non-members. Do not post an invite code publicly.

## Production boundary

These rules stop ordinary room edits, message replacement/deletion, cross-user presence writes, malformed events, and early reward claims. They do not make a browser client an authoritative anti-cheat server: a determined player can still automate valid-looking movement or game events. Before prizes have real-world value or the game opens at large scale, move scoring and reward issuance into trusted Cloud Functions with App Check and rate limits.

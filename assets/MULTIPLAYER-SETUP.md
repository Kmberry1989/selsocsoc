# Snug Society multiplayer setup

The game uses Firebase Realtime Database for room presence, positions, and the last 50 chat messages. Firestore remains the source of truth for profiles, inventory, currency, and houses.

## One-time Firebase setup

1. In Firebase Console, open **Build → Realtime Database** and create the database.
2. Open the **Rules** tab.
3. Replace the rules with `firebase-realtime-database.rules.json` from this folder, then publish.
4. Keep Anonymous Authentication enabled.
5. If your database URL is not the standard `<project-id>-default-rtdb.firebaseio.com` form, add its exact `databaseURL` field to the Firebase config in the game.

## Data layout

- `rooms/{roomId}` stores private-room metadata and membership.
- `presence/{roomId}/{uid}` stores the player's current position and a heartbeat. The client ignores entries older than 20 seconds.
- `messages/{roomId}` stores room chat. The client requests only the latest 50 messages.

Private room codes are random bearer invitations: anyone with the code may join, and room data is otherwise hidden from non-members. The bundled rules validate ownership, message size, and player-scoped presence writes.

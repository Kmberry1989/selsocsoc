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
- `minigames/{roomId}/events` stores dice rolls, pickups, tags, quiz answers, tile eliminations, board moves, and reward claims. The client requests only the latest 50 events for its current room.
- `boardGames/{roomId}/events` stores the append-only five-round Snug Board session: movement rolls, shop purchases, item uses, and each player’s minigame score. The client requests only the latest 240 board events so a complete room-sized match stays deterministic across devices.
- `voicePresence/{roomId}/{uid}` stores a short heartbeat only while that player has joined room voice.
- `voiceSignals/{roomId}/{targetUid}` carries recipient-only WebRTC offers, answers, and ICE candidates; handled rows are deleted by the recipient.

The Play button rolls one shared round for everyone currently in the room. The current rotation is Coin Scramble, Plaza Tag, Room Quiz, Tumble Tiles, Four in a Row, and Noughts & Crosses. Tumble Tiles builds a 3D floor that blinks and falls away; the two board games place full 3D boards in the plaza and accept turns by tapping their columns or squares. Earned shells are folded into the existing Firestore player save; no second currency store is introduced.

## Snug Board

Open the room sheet and choose **Snug Board** to enter its shared waiting room. The host chooses a two-, three-, or four-player game (four by default), everyone present readies up, and the host starts. Empty seats are filled by town-player bots that roll, use items, shop, and post competitive minigame scores through host-authored board events. Players take turns across coin, event, minigame, shop, and star spaces. Each movement round ends with an everyone-plays timing challenge worth ranked coin payouts; the final tally adds a Banker Star for the most coins banked and a Minigame Star for the most wins. Publish the included Realtime Database rules update before testing this mode.

## Solo Practice

The Practice tab runs Coin Scramble, Plaza Tag, and Room Quiz without waiting for another player. These are still real backend rounds: their starts, scoring events, and reward claims are written to the current room's `minigames/{roomId}/events` feed and validated by the same Realtime Database rules as multiplayer rounds. Solo Plaza Tag supplies a moving 3D practice pal; Solo Quiz uses accessible answer buttons instead of requiring chat. At the end of every solo round, the result card shows the player's shell balance before the payout, the awarded amount, and the new balance after the payout. The award then flows into the existing Firestore player save in exactly the same way as a multiplayer reward.

## Room voice chat

Room voice uses browser WebRTC audio in a small peer-to-peer mesh, with Realtime Database used only for short-lived signaling and voice-presence heartbeats. Players must tap the microphone control and approve microphone access before sending audio. Speaking players get a live indicator in the room list and animated hand gestures on their 3D avatar.

The bundled rules include `voicePresence/{roomId}/{uid}` and recipient-only `voiceSignals/{roomId}/{targetUid}` paths. Publish this updated rules file before testing voice. The game deletes handled signaling messages, but the Realtime Database dashboard may occasionally show short-lived offer, answer, or ICE candidate rows during connection setup.

WebRTC works best over HTTPS (including Vercel previews and production deployments). The client uses direct peer connections and does not send network-discovery data to a third-party STUN provider, which suits a small family group on the same home network. Voice across different or restrictive networks requires a TURN/STUN relay that you explicitly choose and operate.

Private room codes are random bearer invitations: anyone with the code may join, and room data is otherwise hidden from non-members. Do not post an invite code publicly.

## Production boundary

These rules stop ordinary room edits, message replacement/deletion, cross-user presence writes, malformed events, and early reward claims. They do not make a browser client an authoritative anti-cheat server: a determined player can still automate valid-looking movement or game events. Before prizes have real-world value or the game opens at large scale, move scoring and reward issuance into trusted Cloud Functions with App Check and rate limits.

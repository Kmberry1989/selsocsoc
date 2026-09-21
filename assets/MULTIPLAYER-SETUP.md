# Selfie Social Society multiplayer setup

The game uses Firebase Realtime Database for room presence, positions, the last 50 chat messages, the last 50 minigame events in the current room, FCM tokens, and short-lived family-room ping requests. Firestore remains the source of truth for profiles, inventory, currency, minigame winnings, and houses.

## One-time Firebase setup

1. In Firebase Console, open **Build → Realtime Database** and create the database.
2. Open the **Rules** tab.
3. Replace the rules with `firebase-realtime-database.rules.json` from this folder, then publish.
4. Open **Build → Firestore Database → Rules**, replace the rules with `firebase-firestore.rules` from this folder, then publish. The shared accessory-fit document is publicly readable, while writes are locked to `kylematthewberry@gmail.com` through the signed-in Google token.
5. In **Build → Authentication → Sign-in method**, keep **Anonymous** enabled.
6. In the same Sign-in method list, open **Google**, turn it on, choose the project support email, and save. This is a one-time step; the menu's Google button then uses Firebase Auth's Google provider.
7. In **Authentication → Settings → Authorized domains**, add every hostname that serves the game (your production Vercel domain and any custom domain). Add preview hostnames only when you intentionally test sign-in from them. Google uses a popup on desktop and a redirect on mobile, so each origin must be authorized.
8. If your database URL is not the standard `<project-id>-default-rtdb.firebaseio.com` form, add its exact `databaseURL` field to the Firebase config in the game.

A returning Google player is restored from the Firestore `players/{uid}` and `houses/{uid}` records tied to that Google account, including their saved character, shell balance, inventory, and house progress. Returning players skip the welcoming ceremony; a Google account with no existing save starts as a new neighbor. The existing browser-session restore remains available beside Google sign-in.

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

## Family room push notifications

Push notifications are opt-in. The game asks for permission only after the player turns on **Notify me about family pings** in Pause & Help.

1. In Firebase Console, open **Project settings → Cloud Messaging → Web configuration → Web Push certificates**.
2. Choose **Generate key pair**, copy the public key, and replace `PASTE_FIREBASE_WEB_PUSH_CERTIFICATE_KEY_PAIR_HERE` in `assets/push-notifications.js`.
3. Copy `functions/.env.example` to `functions/.env` and set `SITE_URL` to the deployed HTTPS origin, without a path or trailing slash—for example, `https://your-game.example`. The function adds `?room=room-…` itself.
4. Install the function dependencies with `npm --prefix functions install`.
5. Deploy with `firebase deploy --only functions`.
6. Publish the updated `assets/firebase-realtime-database.rules.json`.
7. Deploy the site. `firebase-messaging-sw.js` must stay at the repository and deployment root so notification taps can open `/?room=room-…`.

Blaze billing note: Cloud Functions require the Blaze plan; normal charges depend on actual function invocations and outbound messaging work, so review the Firebase pricing page and set budget alerts for the project.

On iPhone and iPad, web push works only after the player adds the site to the Home Screen and opens it from that installed icon. The browser may also require notification permission to be enabled in system settings.

The function reads `rooms/{roomId}/members`, excludes the sender, sends one multicast to the remaining members’ tokens, removes tokens Firebase reports as invalid, and deletes the processed `pings/{roomId}/{pingId}` request.

## Production boundary

These rules stop ordinary room edits, message replacement/deletion, cross-user presence writes, malformed events, and early reward claims. They do not make a browser client an authoritative anti-cheat server: a determined player can still automate valid-looking movement or game events. Before prizes have real-world value or the game opens at large scale, move scoring and reward issuance into trusted Cloud Functions with App Check and rate limits.


## Wave 0 shared minigame framework

The room-scoped minigame feed now exposes a shared contract through `window.CylindricMinigames`. Every released game uses the same lifecycle (`lobby → countdown → play → results → payout`), derives a room snapshot with `phase`, `players`, `scores`, and `timer`, and uses placement payout bands. Shared rounds accept 2–4 players and fill an undersized roster with deterministic bot archetypes; a disconnected player keeps their earned score while the round finishes.

Solo Practice uses the same start, score, claim, cloud-award, and visible `before + payout = after` receipt path. The framework dispatches `snug-minigame-achievement` events for participation, wins, and new in-session personal bests, while the existing `snug-award-coins` event continues to advance the daily-round hook.

Optional authored GLBs live under `assets/minigames/<game>/props/`. Run `node assets/minigames/generate-manifest.mjs` before publishing; the shared asset pipeline exposes the manifest as `minigames` and built-in primitives remain the fallback.

## Wave 1 games

- **Balloon Pop** (`balloon`) — tap drifting balloons; collector bots score against the same clock.
- **Plaza Sprint** (`sprint`) — use tap-to-move through eight ordered 3D gates; racer bots advance by deterministic waypoint timing.
- **Pond Fishing** (`fishing`) — tap **Cast** while the ripple is inside the golden timing ring; bot timing varies by seed.

All three appear in Solo Practice and in the shared released-game rotation. Publish the matching `firebase-realtime-database.rules.json` before testing Wave 1 against Firebase; it adds the three game IDs and their bounded `balloon-pop`, `sprint-checkpoint`, and `fishing-catch` events.

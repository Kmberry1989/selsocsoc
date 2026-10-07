# Multiplayer Architecture

**Status:** SHIPPED

## What it is

Firebase-only multiplayer — no separate realtime game server. Auth, database, server logic, and push all run on Firebase.

- **Firebase Auth** — anonymous sign-in on launch, plus Google sign-in (popup on desktop, redirect on mobile). Returning players restore from their save and skip onboarding.
- **Firestore** — source of truth for profiles, inventory, currency, minigame winnings, houses, paintings, and mail.
- **Realtime Database (RTDB)** — live movement, room chat, and presence.
- **Cloud Functions** — `sendFamilyRoomPing`: multicasts tap-to-join room links to room members' FCM tokens (opt-in family pings).
- **Cloud Messaging** — push notifications for family pings; always opt-in via "Notify me about family pings."
- **Project:** `spatial-canvas-a9726`.

## Data layout (verified in code)

RTDB (`assets/MULTIPLAYER-SETUP.md`, `assets/firebase-realtime-database.rules.json`):

- `rooms/{roomId}` — private-room metadata and membership.
- `presence/{roomId}/{uid}` — position + heartbeat; entries older than 20s are ignored.
- `messages/{roomId}` — room chat; client requests the latest 50.
- `minigames/{roomId}/events` — append-only round events; latest 50 per room. Reward claims rejected until the round ends.
- `boardGames/{roomId}/events` — append-only Snug Board session; latest 240 events keep a full match deterministic.
- `voicePresence/{roomId}/{uid}` — heartbeat while in room voice.
- `voiceSignals/{roomId}/{targetUid}` — recipient-only WebRTC offers/answers/ICE; deleted by recipient after handling.
- `pings/{roomId}/{pingId}` — short-lived family-room ping requests (triggers the Cloud Function).
- `users/{uid}/fcmTokens` — push tokens.

Firestore (`assets/firebase-firestore.rules`):

- `players/{uid}` — profile, character, shell balance, inventory, house progress.
- `houses/{uid}` — saved house layout/furnishings.
- `paintings/{paintingId}` — saved paintings.
- `players/{uid}/mail/{messageId}` — mailbox.
- `players/{uid}/paintingGifts/{giftId}` — gifted paintings awaiting acceptance.
- `gameConfig/fitReviews` — shared accessory-fit data (publicly readable; writes locked to the dev Google account).

Rules enforce: private rooms creatable only by owner; players can only touch their own membership/presence; chat and minigame events are append-only with sender-UID matching; reads limited to the public plaza or joined private rooms.

## Key code files

- `assets/multiplayer.js` — rooms, presence, chat, minigame/board event feeds, Snug Board.
- `assets/MULTIPLAYER-SETUP.md` — the full setup and data-layout doc (read this first).
- `assets/firebase-firestore.rules`, `assets/firebase-realtime-database.rules.json` — bundled rules to publish in the Firebase console.
- `assets/push-notifications.js` + `firebase-messaging-sw.js` — FCM opt-in and service worker.
- `functions/index.js` — `sendFamilyRoomPing` (needs `SITE_URL` in `functions/.env`; requires Blaze plan).

## NPCs involved

None — this is the platform everything else runs on.

## Known limitations

Anonymous sign-in has shown `auth/unknown-error` in production when the Anonymous provider isn't enabled — verify it's on in the Firebase console. Genuine two-user behavior (presence, chat, board sync, visit sync) needs live two-client sessions; the rules and flows were reviewed but not all proven end-to-end.

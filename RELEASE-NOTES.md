# 0.9.14 — Living town-gate title screen

- Restores the live Three.js village behind the title choices and frames the camera on a new open town gate.
- Adds a subtle animated WebGL light-wave layer with a CSS/reduced-motion fallback.
- Adds an auto-generated animated menu-wallpaper slot for MP4/WebM loops and an optional still poster.
- Adds a returning-player option that restores the browser's existing anonymous Firebase identity and skips the welcoming ceremony when saved records exist.
- Turns the expression portraits into a Penny Press-directed photo shoot with spoken coaching, camera reactions, and the existing per-photo avatar previews.
- Speeds up Mayor Mayor's voice and retimes his opening choreography.
- Keeps the placeholder title music selected until the menu has actually closed.

# Snug Society project snapshot

**Snapshot:** 2026-09-13 hosting export  
**Package version:** 0.9.13

## Feature versions included

- **Startup and mode selection — 2026-09-13 build:** placeholder title visuals, tap-to-start, and choices for Solo Practice, multiplayer, and Snug Board.
- **Solo Practice — 2026-09-13 build:** Coin Scramble, Plaza Tag with a practice pal, and Room Quiz with answer buttons. Each round shows balance before, payout, and balance after.
- **Multiplayer rooms — current hardened build:** public plaza, invite-code family rooms, live movement, room chat, family invite flow, and player-scoped presence.
- **Room voice chat — current family-group build:** WebRTC microphone opt-in, speaking indicators, and avatar hand/body animation while speaking. Direct peer connections are intended for a small family group; restrictive networks may require a separately chosen TURN/STUN service.
- **Multiplayer minigames — 2026-09-13 rotation:** Coin Scramble, Plaza Tag, Room Quiz, Tumble Tiles, Four in a Row, and Noughts & Crosses.
- **Snug Board — 2026-09-13 build:** five rounds; coin, event, minigame, shop, and star spaces; dice boosts, traps, and steals; everyone-plays minigames; Banker and Minigame bonus stars.
- **Snug Board lobby — 2026-09-13 build:** host selects 2, 3, or 4 total players (default 4), players ready up, and bots fill empty seats. Lobby and board events use the included Realtime Database rules.
- **Audio placeholders — 2026-09-13 build:** six looping music slots (title, plaza, board, minigames, shops, home) and ten SFX slots (UI, dice, coins, win, footsteps, ready, start, purchase, bot turn), with automatic manifest generation.
- **Avatar and expression system — current build:** floating coin head, independently buoyant body parts, corrected inward thumbs, nine expression-photo slots, atlas-backed face switching, framing controls, avatar previews, body mass/height/skin options, and expression-linked body gestures.
- **Welcoming committee — 2026-09-12 cinematic build:** 3D Mayor Mayor, Gideon, and Penny Press sequence with speech synthesis, larger captions, skip/voice options in Pause & Help, and documented replacement slots for faces, outfits, shoes, and accessories.
- **Cosmetic asset pipeline — current five-category build:** hairstyles, head accessories, outfits, hand accessories, and shoes; ordinary or Draco-compressed GLBs; filename-to-display-name conversion; templates and attachment notes included.
- **World and economy — current build:** walk-up shops, spendable minigame currency, day/night, seasons and storms, birds/rabbits/varied cats, and collision boundaries.
- **Firebase Realtime Database rules — 2026-09-13 board-enabled rules:** hardened rooms, self-scoped presence, append-only chat/minigame events, six multiplayer game event types, `boardGames/{roomId}/events` for lobby and board activity, plus WebRTC voice presence/signaling.

## Hosting notes

The game is static and expects HTTPS for Firebase and microphone access; Vercel provides HTTPS automatically. Publish the bundled Realtime Database rules separately in Firebase Console after deployment. The ZIP does not deploy Firebase rules for you.

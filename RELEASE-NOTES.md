# Selfie Social Society — hotfix: welcoming-committee stall + arrival handoff (September 26, 2026)

- Fixed the welcoming committee stalling after any tap: tapping the dialogue or panel used to cancel the auto-advance timer without advancing the line, leaving the scene stuck until the Continue button was found. Tapping now advances to the next line once the current line has been spoken; taps during speech no longer kill the pending auto-advance.
- Fixed the arrival fallback leaving a permanent black overlay: if the 3D world wasn't ready when a mode was confirmed, the fade stayed opaque and the arrival class stayed set, trapping the player. The fallback now lifts the fade exactly like the full glide.
- Fixed the ambient parachutist stream resurrecting for one frame at the end of the arrival glide (a full scene recompile hitch right as the committee starts).

# Selfie Social Society 0.9.45 — texture art pass: terrain, rugs, buildings, FX

**Snapshot:** September 23, 2026  
**Package version:** 0.9.45

This release puts the new texture artwork to work across the game while preserving every existing system and all NPC lore.

## Included in 0.9.45

- Terrain now uses the new artwork with tiling: dark meadow grass on the village ground (12x repeat), dirt path on the path ribbon (6x), teal pond water (3x) — all untinted so the art shows as authored.
- 9 new placeable rugs in the Furniture shop (Diamond, Royal, Knit, Plaid Red/Tartan/Navy, Awning Coral, Burlap, Wicker), each a thin textured GLB auto-discovered from `assets/furniture/manifest.json`.
- Cottage roofs use the new thatch art; cottage walls use the new plaster art (keeps each cottage's tint color); tree trunks on oak, pine, apple, maple, and willow use the new bark art (birch keeps its white bark).
- Town hall roofs in the living world use the new shingles art.
- Snowfall now renders the snowflake decal as particle sprites; lightning strikes during thunderstorms show a lightning-bolt decal in the sky; grass-tuft decals are scattered across the meadow (magenta chroma-keyed to transparent at load).
- Bumped the project ZIP label to v0.9.45.

# Cylinder Social Society 0.9.43 — procedural cat voices

**Snapshot:** September 20, 2026  
**Package version:** 0.9.43

This release gives adopted companions and Agnes Alley's shelter cats a subtle procedural voice while preserving every existing activity and audio control.

## Included in 0.9.43

- Added the supplied eight-voice `ProceduralCatAudioEngine`: meow, questioning call, purr, hiss, trill, prey chatter, warning growl, and distressed yowl.
- Routed the cat engine through the game's existing single `AudioContext`, including first-gesture resume behavior and the Pause & Help sound toggle.
- Wired purrs to petting and snacks, friendly meows or trills to adoption and approaches, occasional questions to attention-seeking, and prey chatter near daytime butterflies.
- Kept yowls, hisses, and growls reserved for explicit scare or threat events so ordinary companion moments remain cozy.
- Preserved drop-in audio-file priority and documented the eight new `cat-*.wav` replacement names.
- Refreshed the downloadable project archive as version 0.9.43.

# Cylinder Social Society 0.9.42 — procedural character voices and world audio

**Snapshot:** September 20, 2026  
**Package version:** 0.9.42

This release expands the procedural audio layer with expressive character sounds, minigame cues, and quiet world ambience while keeping spoken NPC performances and gameplay unchanged.

## Included in 0.9.42

- Added the supplied 10-voice `ProceduralEmoteEngine` for laughter, effort, confusion, questions, excitement, cheer, idle chatter, mumbling, surprise, and sadness.
- Added the supplied 12-sound `ProceduralAudioEngine` for referee whistles, stopwatch ticks, final-seconds alarms, rain, snow footsteps, fire, impacts, ball movement, paint splatters, buzzers, and an available-but-unwired siren.
- Wired character expressions, round results, timed countdowns, weather, footsteps, and matching minigame interactions without replacing Mayor Mayor, Gideon, or any other spoken NPC dialogue.
- Routed both new engines through the existing SFX engine's single shared `AudioContext`, with mobile gesture resume and the Pause & Help sound toggle preserved.
- Preserved drop-in file priority for every new sound and documented all replacement filenames in the audio guide.
- Refreshed the downloadable project archive as version 0.9.42.

# Cylinder Social Society 0.9.41 — procedural SFX engine

**Snapshot:** September 20, 2026  
**Package version:** 0.9.41

This release replaces the placeholder sound-effect files with the supplied procedural Web Audio engine while leaving the music system unchanged.

## Included in 0.9.41

- Added the complete 12-sound `GameSoundEngine` as the built-in SFX source: UI tap, confirm, back, coin collect, payout shower, minigame win and lose, countdown beep and go, achievement unlock, dialogue blip, and error.
- Wired the engine to menu and gameplay controls, reward events, round outcomes, countdown displays, achievements, spoken-dialogue captions, and visible error states.
- Preserved the Pause & Help sound toggle and first-gesture AudioContext unlock for mobile browsers.
- Preserved audio-folder overrides: a matching file discovered in `assets/audio/sfx/` takes priority over its synthesized default.
- Removed the old bundled placeholder SFX files, refreshed the audio guide, and updated the downloadable project archive.

# Cylinder Social Society 0.9.40 — new name for the society and town

**Snapshot:** September 20, 2026  
**Package version:** 0.9.40

This release carries the new **Cylinder Social Society** name and **Cyclical City** town name across the complete game and project package.

## Included in 0.9.40

- Redrew the illustrated main-menu wordmark for **Cylinder Social Society**, retaining the coin-headed neighbor motif and adding the **Cyclical City** signature.
- Updated player-facing menus, prompts, onboarding dialogue, activity panels, invitations, captions, and help text with the new names.
- Updated asset guides, manifests, release notes, and the downloadable project archive while preserving infrastructure identifiers and gameplay behavior.

# Cylinder Social Society 0.9.39 — custom identity and iconography

**Snapshot:** September 19, 2026  
**Package version:** 0.9.39

This release gives Cylinder Social Society a hand-drawn visual identity while keeping the orbiting-town menu and every existing game flow intact.

## Included in 0.9.39

- Replaced the plain main-menu title with a crisp illustrated **Cylinder Social Society** SVG wordmark featuring a coin-headed neighbor and a small **Cyclical City** signature.
- Added a consistent warm, black-outlined icon set for the main menu, game dock, shop, chat, camera, voice, notifications, photo mode, and Pause & Help.
- Added a distinct custom SVG glyph for every game in the full 30-minigame catalogue, and wired the set into Solo Practice and active-round displays.
- Added `assets/icons/README.md` with stable filenames, viewBox sizes, and replacement guidance so any icon or the logo can be redrawn later without changing game code.
- Kept the icon-only main menu, transparent confirmation overlay, town camera, minigame catalogue, NPCs, environments, and multiplayer behavior unchanged.
- Refreshed the downloadable project archive as **v0.9.39**, including the complete icon library and runtime enhancer.

# Cylinder Social Society 0.9.38 — editable Cyclical City layout

**Snapshot:** September 19, 2026  
**Package version:** 0.9.38

This release connects Cylinder Social Society to the World Editor’s shared layout format, so a redeployed `assets/world/layout.json` can reposition the shipped town without changing game code.

## Included in 0.9.38

- Added `assets/world/default-layout.json`, a 463-object reference map covering the shipped buildings, trees, props, NPC spawns, lantern posts, string-light runs, pond, gate, path details, garden plots, and minigame anchors.
- Added a validated partial-override loader for `assets/world/layout.json`; omitted entries keep their defaults, unknown IDs are ignored with a console warning, invalid files fall back silently, and horizontal positions are clamped to the town bounds.
- Moved linked collision and interaction behavior with edited objects, including live NPC proximity, instanced scenery, lantern posts, and multi-point string-light runs.
- Added `assets/world/README.md` with the coordinate contract, canonical and game-specific type IDs, exact NPC names, and the World Editor export-and-redeploy workflow.
- Refreshed the downloadable project archive as **v0.9.38**, including the world-layout files and updated source.

# Cylinder Social Society 0.9.37 — game-night economy

**Snapshot:** September 19, 2026  
**Package version:** 0.9.37

This release begins the next strategy-blueprint stage with a full minigame economy pass, rotating Dottie Daly quests, quieter anti-farming rules, and clearer payout feedback from Chip Chance.

## Included in 0.9.37

- Added duration-scaled first-, second-, third-, and participation payout bands across the full 30-game catalogue, including Solo Practice, shared rooms, bot-filled rounds, and Snug Board minigames.
- Added genuine-participation checks: a player now completes at least one scored objective before any round payout, while the existing winner bonus remains intact.
- Replaced the generic daily quest rotation with 30 minigame quests spanning the whole slate, including **win a race**, **catch 3 fish**, and **find 5 lanterns**.
- Added minigame-score quest progress to the existing Dottie Daly journal and login-streak display.
- Added the same **before + bonus = after** receipt presentation to claimed daily quest rewards.
- Extended Chip Chance’s shared-round result lines to announce each player’s shell payout after the winner.
- Updated Gideon’s signature line to **“He’s Mr. Mayor Mayor now!”** and moved his speech profile to a lower, older-sounding masculine voice while preserving sung-line pitch handling.
- Preserved the full 13-NPC cast, Firebase coin persistence, existing environment upgrades, and discovery-first presentation without an economy tutorial.
- Refreshed the downloadable project archive as **v0.9.37** on September 19, 2026 at 3:15 PM EDT (**12.0 MiB**), including updated source files and checksums.

# Cylinder Social Society 0.9.36 — lantern-lit living town

**Snapshot:** September 19, 2026  
**Package version:** 0.9.36

This release gives Cyclical City a fuller day-to-night atmosphere, re-centers every procedural rooftop over its supporting building, and adds warm gathering-place lighting without changing gameplay or character systems.

## Included in 0.9.36

- Re-seated cottage, town hall, tower, pavilion, and base-world rooftops over their supporting structures, with runtime checks that also cover generated buildings.
- Added eight overhead string-light sections across the plaza, festival grounds, shop row, and Moonlight Footbridge approach, supported by sixteen slim lantern posts.
- Added warm lantern glow at night, a gentle reduced-motion-aware sway, and shared instanced bulb geometry for mobile performance.
- Added daytime butterflies, nighttime fireflies, drifting garden petals, grass tufts, path-edge flower patches, and animated pond shimmer with spreading ripples.
- Kept the existing gradient sky, sun and moon, stars, shooting stars, golden-hour lighting, and weather system. The rainbow still appears only after rain clears during daylight and remains hidden during rain, snow, thunderstorms, and night.
- Preserved all avatar, NPC, speaking-mouth, collision, tap-to-move, camera, onboarding, multiplayer, Snug Board, and minigame behavior.
- Refreshed the downloadable project archive as **v0.9.36** on September 19, 2026 at 12:37 PM EDT (**12.0 MiB**), including the complete web project, Firebase files, environment upgrade source, drop-in asset folders, and checksums.

# Cylinder Social Society 0.9.35 — the Cyclical City cast

**Snapshot:** September 19, 2026  
**Package version:** 0.9.35

This release writes the full confirmed town roster into Cyclical City as interactive, voiced NPCs while preserving the existing game loops.

## Included in 0.9.35

- Added **Lyla Lens, Chip Chance, Barnaby Bargain, Pip Parade, Agnes Alley, Dottie Daly, Peggy Plank, Mr. Buck Coinsworth, Fern Bramble, Stanley Stamp,** and **Bobby Gill** as buoyant coin-headed townspeople placed beside their jobs.
- Wired the cast into portraits, shared-room minigames, the rotating shop, festivals, cat adoption, daily quests and streaks, Moonlight Footbridge progress, Snug Board, gardening, gifts and trading, and fishing practice where those systems already exist.
- Added short in-character introductions, large subtitles, tap-to-skip and hold-to-hurry controls, eleven distinct speech profiles, and the shared wavy speaking mouth.
- Added direct character tapping and proximity talk cards without narrowing the town walkways.
- Added documented face, outfit, head-accessory, hand, shoe, and held-item replacement slots under `assets/npc-roster/` for the user-authored final art.
- Renamed the newspaper photographer everywhere from the never-canon placeholder to **Lyla Lens** and preserved Mayor Mayor’s exact opening line.
- Chip Chance now announces shared minigame names and winners from the existing minigame event stream.
- Refreshed the downloadable project archive as **v0.9.35** on September 19, 2026 at 11:04 AM EDT (**12.0 MiB**), including the complete web project, Firebase files, NPC source and slot manifests, and checksums.

# Cylinder Social Society 0.9.34 — full minigame slate and living speech

**Snapshot:** September 19, 2026  
**Package version:** 0.9.34

This release completes the seven-wave minigame blueprint, expands Solo Practice across the full 24-game slate, and gives every speaking character a distinctive animated mouth treatment.

## Included in 0.9.34

- Added 17 more blueprint games: **Hide & Seek, Musical Statues, Memory Match, Pattern Parade, Draw & Guess, Cat Herding, Bridge Builders, Coin Curling, Emote Charades, Sneaky Snug, Scavenger Snap, Dodge Puffs, Freeze Tag, Treasure Dig, Snowball Toss, Lantern Hunt,** and **Petal Catch**.
- Completed the 24-game blueprint alongside Coin Scramble, Plaza Tag, Room Quiz, Balloon Pop, Plaza Sprint, Pond Fishing, and the expanded five-minute Hot Potato round.
- Kept the six established extras — Tumble Tiles, Four in a Row, Noughts & Crosses, Village Scavenger Hunt, Obstacle Relay, and Mayor Says — for a 30-game catalogue.
- Added Solo Practice to all 24 blueprint games. Every practice round ends with a clear **before + payout = after** shell receipt.
- Added game-specific action surfaces for targets, memory pairs, color sequences, sketch guessing, charades, bluff spotting, photo prompts, lane choices, and curling power.
- Added deterministic Fisher–Yates memory layouts, locked tile input while a mismatched pair closes, and game-aware bot pacing for normal room rounds.
- Tightened Realtime Database validation so challenge-point events are accepted only for their intended game IDs while legacy event types keep their own limits.
- Added auto-discovered prop folders and manifest entries for all 24 blueprint minigames.
- Added a small black speaking mouth to Mayor Mayor, Gideon, Lyla Lens, and player avatars. Its edge ripples with speech, rotates gently while active, settles during pauses, and relaxes back to a plain circle when the line ends; subtitles and full-body speaking gestures remain intact.

# Cylinder Social Society 0.9.33 — atmospheric rainbows

**Snapshot:** September 19, 2026  
**Package version:** 0.9.33

This release turns the after-rain rainbow into a true sky event while preserving the family-room push notifications and all other features from 0.9.32.

## Included in 0.9.33

- Rebuilt the rainbow as a much larger arc high beyond Cyclical City, safely above and outside the walkable map.
- Positioned the rainbow opposite the sun's azimuth, anchored to the world sky instead of following the camera.
- Kept the environmental rain-to-clear trigger and gentle fade timing; the rainbow is suppressed during rain, snow, thunderstorms, and nighttime.
- No gameplay or UI behavior changed.

## Included in 0.9.32

- Added an explicit **Notify me about family pings** switch to Pause & Help. The game never asks for notification permission on launch.
- Added Firebase Cloud Messaging token registration at `users/{uid}/fcmTokens/{token}`, including token refresh checks and opt-out cleanup.
- Added foreground family-ping toasts with a **Join** button.
- Added **Ping family** inside private family-room panels. It writes a short-lived request to `pings/{roomId}/{pushId}`.
- Added a Node 20 Cloud Function that verifies the private room, gathers current member tokens except the sender, sends one multicast, removes invalid tokens, and deletes the processed ping.
- Added `firebase-messaging-sw.js` at the deployment root. Background notification taps open `/?room=room-…`, which uses the existing automatic family-room join path.
- Updated Realtime Database rules so players can manage only their own FCM tokens and only room members can create pings for that room.
- Added setup instructions for the public VAPID key, `SITE_URL`, Functions deployment, Blaze billing, and iOS Home Screen requirements.
- All gameplay, saves, controls, multiplayer behavior, and UI outside the new toggle, toast, and ping button are unchanged.

## Deploy

1. Extract `snug-society-project.zip` and upload the extracted **contents** to the root of the existing GitHub repository connected to Vercel.
2. Follow the **Family room push notifications** section in `README.md` to set the VAPID key and `SITE_URL`.
3. Run `npm --prefix functions install`, then `firebase deploy --only functions`.
4. Publish `assets/firebase-realtime-database.rules.json` and `assets/firebase-firestore.rules` in Firebase Console.
5. Push the project so Vercel deploys the updated client and root service worker.

The ZIP includes `CHECKSUMS.sha256` for file verification.

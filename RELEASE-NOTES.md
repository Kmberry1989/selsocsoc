# Snug Society 0.9.21 — NPC speaking performance

**Snapshot:** September 15, 2026  
**Package version:** 0.9.21

This refresh brings the downloadable GitHub/Vercel project ZIP up to the current game build and adds a full-body 3D speaking performance for the welcoming committee.

## New in 0.9.21

- Speaking NPCs now wind up by squishing toward the ground and spinning before each speech performance.
- The active speaker springs several feet into the air, hovers there, and continues facing the player.
- While airborne, the speaker gently pulses and wiggles while the hands and feet perform small jumping-jack gestures paced to the character’s voice rate.
- Speech emits a gentle fountain of bold black `!`, `@`, `#`, `?`, and `%` glyphs that grow from tiny marks into readable particles.
- Glyph particles use marble-like motion: varied launch trajectories, gravity, randomized ground bounces, rolling slowdown, fade-in, fade-out, and final cleanup.
- The visual performance remains synchronized to captions when device speech ends early or voices are turned off.
- Reduced-motion mode keeps the dialogue readable without the wind-up, hover, or particle motion.

## Current build included

- Visible-viewport sizing and safe-area handling keep screens and overlays inside the usable display area across phones, tablets, and desktop browsers.
- Fit Check waits until the 3D gameplay world and player avatar are ready, layers above other panels, and remains manually reopenable after dismissal.
- Primitive-detail pass across avatars, cottages, the town gate, trees, shrubs, pond, and town hall.
- Compact step-by-step welcoming photo shoot, app-wide text-selection suppression, the faster updated Mayor Mayor voice, roomier village spacing, and forgiving collisions.
- Automatic Blender Z-up to game Y-up orientation correction for cosmetic and replacement-world GLBs.
- Compact icon-only mode dock, translucent tap-to-confirm mode overlays, Google sign-in, and returning-player shortcuts.
- Higher, farther-back orbiting menu camera around a noticeably globe-shaped world.
- In-game zoom/orbit camera controls and local occlusion fading for scenery blocking the player.
- Replaceable building, tree, and prop folders; texture slots; and automatic ordinary/Draco GLB catalogues for hairstyles, head accessories, outfits, hand accessories, and shoes.
- Slower day/night cycle; gradual weather fades; progressive snow accumulation; varied clouds; and smooth rain/snow particles.
- Town Life features, adoptable cats, festivals, photo mode, multiplayer/family rooms, voice chat, minigames, Snug Board, shops, economy, templates, and current Firebase rules.
- Six longer, slower placeholder music arrangements with changing melodies, rests, varied accompaniment, and gentle crossfades.

## Deploy

1. Extract `snug-society-project.zip` and upload the extracted **contents** to the root of the GitHub repository connected to Vercel.
2. Push so Vercel runs the included manifest generators.
3. Publish `assets/firebase-realtime-database.rules.json` in Firebase Console.
4. Enable Google under Firebase Authentication → Sign-in method and add the Vercel domain under Authorized domains.

The ZIP includes `CHECKSUMS.sha256` for file verification.

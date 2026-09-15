# Snug Society 0.9.24 — automatic Firebase connection

**Snapshot:** September 15, 2026  
**Package version:** 0.9.24

This refresh makes the supplied Firebase project the automatic default while preserving the Player-profile configuration field as an override.

## New in 0.9.24

- Fresh devices connect to the built-in `spatial-canvas-a9726` Firebase project automatically; no browser-stored configuration is required.
- A valid Firebase config saved from the Player profile still takes precedence over the built-in default.
- Removing a saved override immediately reconnects through the built-in project instead of leaving cloud multiplayer waiting for a pasted config.
- The optional Realtime Database URL is now preserved when a profile override is parsed and saved.

## Current build included

- Visible-viewport sizing and safe-area handling keep screens and overlays inside the usable display area across phones, tablets, and desktop browsers.
- Fit Check waits until the 3D gameplay world and player avatar are ready, layers above other panels, and remains manually reopenable after dismissal.
- Primitive-detail pass across avatars, cottages, the town gate, trees, shrubs, pond, and town hall.
- Compact step-by-step welcoming photo shoot, app-wide text-selection suppression, the faster updated Mayor Mayor voice, roomier village spacing, and forgiving collisions.
- Speaking NPCs wind up, spring into a hover, gesture at their speech rate, and emit bounded dialogue-derived word and letter particles; reduced-motion mode keeps dialogue calm and readable.
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
4. Enable Google under Firebase Authentication → Sign-in method and add the exact Vercel domain under Authorized domains.

The ZIP includes `CHECKSUMS.sha256` for file verification.

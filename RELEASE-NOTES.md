# Snug Society 0.9.16 — orientation-ready GitHub/Vercel project refresh

**Snapshot:** September 14, 2026  
**Package version:** 0.9.16

This refresh brings the downloadable GitHub/Vercel project ZIP up to the current hosted build.

## New in 0.9.16

- Added automatic Blender Z-up to game Y-up orientation correction for GLBs loaded from every cosmetic folder: hairstyles, head accessories, outfits, hand accessories, and shoes.
- Extended the same automatic orientation check to replacement-world GLBs in the buildings, trees, and props folders.
- Correctly exported Y-up GLBs stay untouched. The correction is deliberately conservative for ambiguous, nearly square props.
- Updated the modeling guides: creators can keep models upright in Blender, preserve the documented attachment origin, export, and drop the resulting GLB into its category folder.
- Rebuilt the complete project archive from the latest game source, asset manifests, audio, templates, vendor files, setup guides, and Firebase rules.

## Current build included

- Compact icon-only mode dock, translucent tap-to-confirm mode overlays, and Google sign-in with the required Firebase setup notes.
- Higher, farther-back orbiting menu camera around a noticeably globe-shaped world.
- In-game zoom/orbit camera controls and local occlusion fading for scenery blocking the player.
- Disabled document-style text selection, dragging, and callouts across the game surface.
- Larger, more widely spaced terrain; world replacement folders for buildings, trees, and props; texture slots; automatic ordinary/Draco GLB catalogues for hairstyles, head accessories, outfits, hand accessories, and shoes.
- Slower day/night cycle; gradual weather fades; progressive snow accumulation; varied, evenly scattered clouds; and smoother rain/snow particles.
- Town Life: Moonlight Footbridge co-op project, adoptable cats, Fireworks Night, Meteor Shower, Costume Parade, and full photo mode.
- Six longer, slower placeholder music arrangements with changing melodies, rests, varied accompaniment, and gentle crossfades.
- Current welcoming sequence, multiplayer/family rooms and voice chat, minigames, Snug Board, shops/economy, Firebase rules, templates, vendor files, and setup documentation.

## Deploy

1. Extract `snug-society-project.zip` and upload the extracted **contents** to the root of the GitHub repository connected to Vercel.
2. Push so Vercel runs the included manifest generators.
3. Publish `assets/firebase-realtime-database.rules.json` in Firebase Console.
4. Enable Google under Firebase Authentication → Sign-in method and add the Vercel domain under Authorized domains.

The full detailed notes are also inside the ZIP, along with `CHECKSUMS.sha256` for file verification.

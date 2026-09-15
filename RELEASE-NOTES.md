# Snug Society 0.9.17 — current GitHub/Vercel project refresh

**Snapshot:** September 14, 2026  
**Package version:** 0.9.17

This refresh brings the downloadable GitHub/Vercel project ZIP up to the current game build and hardens the asset workflow for real repositories.

## New in 0.9.17

- Made every generated asset manifest resilient to missing category folders. The environment generator recreates absent `buildings`, `trees`, and `props` directories and treats them as empty instead of stopping a Vercel build.
- Added tracked `.gitkeep` placeholders to empty asset directories so GitHub preserves the complete folder structure after upload.
- Reworked the welcoming photo shoot into a compact, step-by-step flow: take one expression photo, refine its placement and size, then move to the next expression. The refinement preview shows only the coin head and fits within one mobile screen without a long scrolling gallery.
- Suppressed document-style text selection, drag highlighting, and iOS touch callouts across the game surface.
- Kept Mayor Mayor’s character while switching to a different preferred built-in voice and increasing his speaking rate, with the existing subtitle and gesture timing retained.
- Opened up the village layout and made collisions more forgiving, leaving wider walking lanes around buildings, trees, and props.
- Included the current accessory fit-review workflow and its support files, so new GLBs can be previewed, adjusted, and approved before appearing in the Style catalogue.

## Current build included

- Automatic Blender Z-up to game Y-up orientation correction for cosmetic and replacement-world GLBs.
- Compact icon-only mode dock, translucent tap-to-confirm mode overlays, Google sign-in, and returning-player shortcuts.
- Higher, farther-back orbiting menu camera around a noticeably globe-shaped world.
- In-game zoom/orbit camera controls and local occlusion fading for scenery blocking the player.
- Larger, more widely spaced terrain; replaceable building, tree, and prop folders; texture slots; and automatic ordinary/Draco GLB catalogues for hairstyles, head accessories, outfits, hand accessories, and shoes.
- Slower day/night cycle; gradual weather fades; progressive snow accumulation; varied clouds; and smooth rain/snow particles.
- Town Life features, adoptable cats, festivals, photo mode, multiplayer/family rooms, voice chat, minigames, Snug Board, shops, economy, templates, and current Firebase rules.
- Six longer, slower placeholder music arrangements with changing melodies, rests, varied accompaniment, and gentle crossfades.

## Deploy

1. Extract `snug-society-project.zip` and upload the extracted **contents** to the root of the GitHub repository connected to Vercel.
2. Push so Vercel runs the included manifest generators.
3. Publish `assets/firebase-realtime-database.rules.json` in Firebase Console.
4. Enable Google under Firebase Authentication → Sign-in method and add the Vercel domain under Authorized domains.

The ZIP includes `CHECKSUMS.sha256` for file verification.

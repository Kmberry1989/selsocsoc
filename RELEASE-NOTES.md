# Snug Society 0.9.23 — welcoming sequence and toon definition

**Snapshot:** September 15, 2026  
**Package version:** 0.9.23

This refresh brings the downloadable GitHub/Vercel project ZIP up to the current game build, keeps the welcoming committee uninterrupted, and adds a restrained toon-outline pass.

## New in 0.9.23

- The welcoming-committee sequence now owns its active layer until the player intentionally finishes or skips it. A guarded, idempotent cleanup path prevents stray menu state, duplicate transitions, removed overlays, or a 3D scene failure from dropping the player back at the main menu mid-dialogue.
- The spoken-particle fountain now emits the current speaker's actual dialogue words and letters in white with a crisp black outline, uses dynamically fitted textures so longer words remain legible, and keeps a tighter mobile particle budget.
- Characters gain subtle silhouette definition and polygonal world geometry gains restrained dark edge lines. The same policy is applied to newly loaded world and cosmetic meshes where practical, while transparent faces, sprites, particles, sky effects, and oversized meshes are excluded for clarity and mobile performance.
- Mobile and touch-first devices now use Firebase's redirect-based Google sign-in flow; desktop browsers keep the popup flow.
- Google redirect results are completed on return before the game restores the player's Firebase profile and decides whether to skip the welcoming committee.
- Sign-in failures now stay visible on the main menu and include the Firebase error code plus a targeted next step instead of silently returning to the menu.
- Popup-blocked and unsupported popup errors on desktop automatically fall back to redirect sign-in.
- Cosmetic fit approvals are embedded into the generated cosmetics manifest at build time. A missing optional `assets/cosmetics/fit-reviews.json` silently becomes an empty approval list, so the hosted game no longer requests that missing file or logs its 404.

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

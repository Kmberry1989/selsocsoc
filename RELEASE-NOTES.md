# Snug Society 0.9.29 — growing gardens and purposeful paths

**Snapshot:** September 17, 2026  
**Package version:** 0.9.29

This package refreshes the downloadable GitHub/Vercel project to match the current game build.

## Included in 0.9.29

- Town Life now includes a six-plot community garden where players choose and plant a Moonflower, Button fern, or Cozy oak.
- Each flower, plant, and tree grows through four named stages over real elapsed time, becoming visibly larger and changing form at each phase.
- Players can water once per stage to move growth forward by five minutes; planting, watering, clearing, timestamps, and growth progress save to the player’s Firebase garden profile.
- The village renders each saved garden plot as a growing 3D plant, flower, or tree in the dedicated beds.
- The expanded countryside path network is now defined as connected routes with named destinations: cottage districts, shops, the pond bank, pavilion, community garden, town gate, and town hall.
- The pond was moved fully away from the walkway, and procedural trees and flowers now observe clearance zones around every path, destination, cottage, the pond, pavilion, and garden beds.
- Penny Press retains the warmer, calmer, more understanding photographer voice profile added in 0.9.28.
- The complete 0.9.27 update remains included: the plush-doll player and welcoming-committee visual pass, browser-safe music-volume clamping, and the tintable facial-hair cosmetic pipeline.

## Deploy

1. Extract `snug-society-project.zip` and upload the extracted **contents** to the root of the GitHub repository connected to Vercel.
2. Push so Vercel runs the included manifest generators.
3. Publish `assets/firebase-realtime-database.rules.json` and `assets/firebase-firestore.rules` in Firebase Console. The Realtime Database rules include the new per-player garden data.
4. Enable Google under Firebase Authentication → Sign-in method and add the exact Vercel domain under Authorized domains.

The ZIP includes `CHECKSUMS.sha256` for file verification.

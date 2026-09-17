# Snug Society 0.9.27 — plush welcoming committee and audio safety

**Snapshot:** September 17, 2026  
**Package version:** 0.9.27

This package refreshes the downloadable GitHub/Vercel project to match the current game build.

## Included in 0.9.27

- The full plush-doll player visual pass: felt-like matte materials, stitched seams around the thick coin heads and body hems, soft grounding shadows, toon outlines, and buoyant unrigged movement.
- Mayor Mayor, Gideon, and Penny Press now use that same player-character construction in the welcoming ceremony while retaining their own colors, faces, props, accessories, dialogue, and choreography.
- The music crossfade now clamps every interpolation and volume assignment to the browser-safe `0–1` range, preventing rare negative-volume errors.
- A dedicated auto-discovered `facial-hair` cosmetic slot for mustaches, beards, goatees, and sideburns, including fit review, tinting, catalogue discovery, and Firebase save/load support.
- A new `assets/cosmetics/facial-hair/template-facial-hair.glb` sizing and attachment guide.
- The Vercel cosmetics manifest generator scans all ten wearable categories, including facial hair.
- All previous 0.9.25 features remain included: cloud-saved fit transforms, tinting, daily activities, expanded minigames and social systems, the expanded village, current Firebase rules, and the living sky.

## Deploy

1. Extract `snug-society-project.zip` and upload the extracted **contents** to the root of the GitHub repository connected to Vercel.
2. Push so Vercel runs the included manifest generators.
3. Publish `assets/firebase-realtime-database.rules.json` and `assets/firebase-firestore.rules` in Firebase Console.
4. Enable Google under Firebase Authentication → Sign-in method and add the exact Vercel domain under Authorized domains.

The ZIP includes `CHECKSUMS.sha256` for file verification.

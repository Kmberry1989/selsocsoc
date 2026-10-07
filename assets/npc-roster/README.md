# Cyclical City NPC replacement slots

The eleven named townspeople render with procedural placeholder bodies and faces. Each exposes stable Three.js attachment groups so developer-authored art can replace a primitive without changing dialogue or role wiring.

## Runtime slots

Every character in `manifest.json` has a `runtimePrefix`. The corresponding root exposes:

- `FaceSlot_<Prefix>` — front-facing face art.
- `OutfitSlot_<Prefix>` — the complete peg-body outfit.
- `HeadAccessorySlot_<Prefix>` — hair, hats, and head accessories.
- `HandSlot_<Prefix>_Left` and `HandSlot_<Prefix>_Right` — hand anchors.
- `ShoeSlot_<Prefix>_Left` and `ShoeSlot_<Prefix>_Right` — shoe anchors.
- `HeldItemSlot_<Prefix>` — a held prop anchor attached to the right hand.

Replace the matching placeholder GLB in a character folder or update the manifest. Face art should be a PNG or WebP; do not bake names or dialogue into it. Model in meters, +Y up, with the character front toward +Z. Keep pivots at attachment points and leave clearance around the coin head and floating hands.

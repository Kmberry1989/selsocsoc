# Welcoming committee replacement slots

The onboarding trio starts with procedural placeholder bodies and faces, but each character now exposes stable, named Three.js attachment groups so developer-authored art can replace each primitive without changing cinematic code.

## Character keys

| Character | Folder key | Runtime prefix |
|---|---|---|
| Mayor Mayor | `mayor-mayor` | `MayorMayor` |
| Gideon | `gideon` | `Gideon` |
| Penny Press, newspaper photographer | `penny-press` | `PennyPress` |

## Runtime slots

For each prefix, the character root stores these names in `group.userData.attachmentSlots`:

- `FaceSlot_<Prefix>` — front-facing face-art plane/group; replace or hide `PrimitiveFace_<Prefix>`.
- `OutfitSlot_<Prefix>` — body/outfit group; replace or hide `PrimitiveOutfit_<Prefix>` and `PrimitiveOutfitShoulders_<Prefix>`.
- `HeadAccessorySlot_<Prefix>` — hats, hair, and head accessories.
- `HandSlot_<Prefix>_Left` and `HandSlot_<Prefix>_Right` — hand accessory anchors. Left/right are the character's own sides.
- `ShoeSlot_<Prefix>_Left` and `ShoeSlot_<Prefix>_Right` — shoe anchors.
- `HeldItemSlot_<Prefix>` — cameras, instruments, papers, or other held props.

Each folder contains small GLB placeholders copied from the existing cosmetic templates. Replace the contents while retaining the filenames, or update `manifest.json` when introducing final names. Face artwork is intentionally not represented by a GLB: it should be a developer-authored PNG or WebP texture applied to the named face slot's plane.

## Modeling notes

- Model in meters with `+Y` up and character front toward `+Z`.
- Keep pivots at each item's attachment point.
- Export as binary `.glb`; Draco compression is supported.
- Keep a little clearance around the coin head and floating hands so the independent buoyancy animation remains visible.
- Mayor Mayor's hat must remain under `HeadAccessorySlot_MayorMayor`; the opening greeting moves that complete slot during the hat tip.
- Do not bake face text, character names, or dialogue into textures.

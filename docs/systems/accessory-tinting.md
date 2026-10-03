# Accessory Tinting

**Status:** SHIPPED (2026-10-03)

## What it is

Curated swatch tints for equipped cosmetics: players recolor accessories,
hairstyles, and outfits from a cozy 16-swatch palette in the Style menu.
The tint is a color multiply over the authored look, so textures and shading
are preserved — a pink hat still looks like the same hat, just pink.

## How it works for the player

- Open the Style menu and pick an item as usual. A **Tint** swatch row sits
  below every cosmetic row (Outfit, Painted outfit, hairstyles, accessories…).
- Tap a swatch for an instant live preview on the avatar. Tap **None** to
  reset the item to its authored colors.
- Tints are stored per slot on the player save and survive reloads. Changing
  a tint never needs re-approval or a new fit review.

## Code & state

- `assets/accessory-tinting.js` — the picker UI, save/load, re-application.
  Loads after `cosmetic-tints.js` and `outfit-textures.js`.
- `assets/accessory-tinting.css` — picker styles (mobile tap targets,
  keyboard focus rings, reduced-motion safe).
- `assets/cosmetic-tints.js` — the underlying tint engine: per-instance
  material clones, sRGB multiply, `NoTint`/`Untinted` name opt-outs.
- State: `tints: { "<slotKey>": { item, tint } }` on `players/{uid}` (Firestore),
  saved via the standard `snug-player-patch` pattern.

## Notes & follow-ups

- 3D cosmetics tint through the engine's per-mesh material clones, so one
  player's pink hat never recolors anyone else's.
- 2D painted outfits tint the overlay material color; the tint is re-applied
  after the overlay is recreated (wrapped `__snugApplyTextureOutfit` plus a
  retry loop for the async image load).
- Fit review stays untinted — tints apply only to the equipped avatar in-game.
- Worth an on-phone check: picker layout in the Style menu, live preview on
  equipped GLB accessories, tinted painted outfits, and tint persistence
  across reloads.

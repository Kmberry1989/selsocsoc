# Snug Society cosmetic GLB guide

Players do not upload models. These folders are for developer-authored `.glb` files shipped with the game:

- `hairstyles/`
- `head-accessories/`
- `outfits/`
- `hand-accessories/`
- `shoes/`

The included `template-*.glb` files are low-poly sizing guides. Replace their mesh geometry while keeping the same origin, facing direction, and approximate bounds.

## Shared conventions

- Format: binary glTF 2.0 (`.glb`), Y-up, meters, +Z facing the camera/front of the avatar.
- Apply/freeze transforms before export. Use scale `1,1,1` and rotation `0,0,0`.
- Put the model origin at its attachment point.
- Keep materials and textures embedded in the GLB. Avoid external texture files.
- Models are overlays. Do not include a body, head, hands, or feet in a cosmetic file.
- Keep each asset light enough for mobile: aim below 25k triangles and 2 MB; use 1024px textures or smaller.
- Give meshes stable names and avoid cameras, lights, and unused animation clips.

## Template bounds and anchors

All dimensions are approximate local-space meters.

| Folder | Attachment origin | Template bounds | Runtime behavior |
|---|---|---|---|
| `hairstyles/` | center of the coin head | about 0.92 W × 0.55 H × 0.34 D | follows head bob/tilt; the coin is about 0.80 wide and 0.24 thick |
| `head-accessories/` | center of the coin head | about 1.00 W × 0.70 H × 0.46 D | follows head bob/tilt; use for glasses, masks, antennae, crowns, and other non-hair head pieces |
| `outfits/` | center of the body | about 0.78 W × 1.10 H × 0.54 D | scales in X/Z with body mass and in Y with height; always overlays the body |
| `hand-accessories/` | center of one hand | about 0.26 W × 0.08 H × 0.26 D | loaded on both floating hands and follows each hand independently |
| `shoes/` | center of one foot | about 0.28 W × 0.16 H × 0.42 D | loaded on both wedge feet and follows the foot-plop motion |

## Adding a new cosmetic

1. Place the Draco-compressed GLB in the matching folder and push it to the GitHub repository connected to Vercel.
2. Vercel runs the included build script, regenerates `manifest.json`, and deploys every `.glb` file into the matching in-game selector automatically.
3. Check the asset at every body-mass and height extreme on a phone-sized viewport.

Display names come directly from filenames: underscores and hyphens become spaces and each word is capitalized (`yellow_raincoat.glb` becomes **Yellow Raincoat**). No catalogue code or manual manifest edit is needed for the Vercel build. For GitHub Pages or other hosts without a build step, run `npm run build` before committing the generated manifest.

The shared loader supports Draco-compressed and ordinary GLBs. It mounts hairstyles and head accessories to the coin head, hand accessories to each hand, shoes to each foot, and outfits to the avatar root. Missing files fail silently so a broken cosmetic cannot stop the game.

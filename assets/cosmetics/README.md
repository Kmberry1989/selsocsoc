# Selfie Social Society cosmetic GLB guide

Players do not upload models. These folders are for developer-authored `.glb` files shipped with the game:

- `hairstyles/`
- `head-accessories/`
- `outfits/`
- `hand-accessories/`
- `shoes/`
- `face-wear/`
- `facial-hair/`
- `held-items/`
- `back-items/`
- `neckwear/`

The included `template-*.glb` files are low-poly sizing guides. Replace their mesh geometry while keeping the same origin, facing direction, and approximate bounds.

## Shared conventions

- Format: binary glTF 2.0 (`.glb`), meters, with the model facing forward in your Blender scene.
- You can leave the model upright as authored. On load, the game compares its proportions with the category template and automatically corrects a clear Blender Z-up versus glTF Y-up mismatch. Correctly exported Y-up models are left untouched.
- Apply/freeze transforms before export. Use scale `1,1,1` and rotation `0,0,0`; the automatic orientation correction does not change your attachment origin.
- Put the model origin at its attachment point.
- Keep materials and textures embedded in the GLB. Avoid external texture files.
- Author colorable fabric, hair, and accessory surfaces with a white or neutral albedo. The game multiplies the player's chosen tint over the material color and embedded maps, so woven texture, painted shading, normal maps, roughness, metallic response, transparency, and alpha cutouts remain intact.
- Split details that must keep their original color—eyes, buckles, buttons, lenses, metal trim, logos—into a separate material or mesh. Name that material or mesh with `NoTint` (for example, `GoldBuckle_NoTint`) or set the glTF extras value `snugTint` to `false`. Those parts are copied without tinting.
- A non-white base color also multiplies with the player's tint. Use it intentionally for shaded variation; use `NoTint` when an exact authored color must never change.
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
| `face-wear/` | center of the coin face | about 0.82 W × 0.42 H × 0.28 D | anchored just in front of the face; use for glasses, goggles, and masks |
| `facial-hair/` | center-front of the coin face | about 0.62 W × 0.42 H × 0.12 D | sits close to the mouth and chin; use for mustaches, beards, goatees, and sideburns; equips separately so face wear remains available |
| `held-items/` | center of the right-hand grip | about 0.72 W × 0.92 H × 0.32 D | loaded on one hand only and never mirrored; use for wands, umbrellas, cameras, and tools |
| `back-items/` | center of the body, on the rear surface | about 0.90 W × 1.15 H × 0.40 D | follows the body; model forward should face away from the avatar's back |
| `neckwear/` | center of the head/body joint | about 0.82 W × 0.36 H × 0.42 D | follows the body while sitting directly below the floating coin head |

## Adding a new cosmetic

1. Place the Draco-compressed GLB in the matching folder and push it to the GitHub repository connected to Vercel.
2. Vercel runs the included build script, regenerates `manifest.json`, and deploys every `.glb` file into the fit-review queue automatically.
3. Open the game. Each new GLB appears on the current player's own avatar before it can enter Style. Review the plain-language scale, sit-point, and clipping notes; drag to turn the avatar, adjust size/position if needed, then choose **Approve for Style**.
4. After the queue is complete, download `fit-reviews.json` and replace `assets/cosmetics/fit-reviews.json` in the repo. The Vercel build embeds these approvals into `manifest.json`; if the optional review file is missing, the build silently uses an empty approval list and the game opens every discovered cosmetic for review.
5. Check outfits at every body-mass and height extreme on a phone-sized viewport.

Display names come directly from filenames: underscores and hyphens become spaces and each word is capitalized (`yellow_raincoat.glb` becomes **Yellow Raincoat**). No catalogue code or manual manifest edit is needed for the Vercel build. Unapproved GLBs stay out of the Style and shop menus until the fit check is approved. For GitHub Pages or other hosts without a build step, run `npm run build` before committing the generated manifest.

The shared loader supports Draco-compressed and ordinary GLBs. It mounts hairstyles, head accessories, face wear, and facial hair to the coin head; hand accessories to each hand; shoes to each foot; and outfits to the avatar root. Facial hair has its own slot, so mustaches and beards can be worn at the same time as glasses or other face wear. Missing files fail silently so a broken cosmetic cannot stop the game.

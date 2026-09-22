# Selfie Social Society furniture assets

Furniture in this folder is discovered through `manifest.json`, sold in the rotating shop under **Furniture**, and placed automatically in the player's house after purchase.

Included pieces:

- `cozy-sofa.glb`
- `reading-armchair.glb`
- `coffee-table.glb`
- `bookcase.glb`
- `panel-bed.glb`
- `dresser.glb`
- `floor-lamp.glb`
- `dining-table.glb`
- `dining-chair.glb`
- `sideboard.glb`
- `woven-rug.glb`

To add another piece, place a binary glTF 2.0 `.glb` here, keep its origin at ground center, and run:

```bash
node assets/furniture/generate-manifest.mjs
```

Use lowercase kebab-case filenames. Export in meters with embedded materials and textures. Keep each asset under 25k triangles and 2 MB when possible.

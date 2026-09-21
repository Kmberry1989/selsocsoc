# Selfie Social Society replaceable world assets

This is the developer-authored GLB pipeline for Cyclical City. Players never upload models. The build scans the three category folders and rewrites `manifest.json`; the game then discovers every listed GLB automatically.

## Folder structure

- `buildings/` — cottages and other large structures.
- `trees/` — trees and tall natural scenery.
- `props/` — rocks, fences, lanterns, flower patches, bushes, benches, signs, and other small scenery.

After adding, renaming, or removing a `.glb`, run:

```bash
node assets/environment-props/generate-manifest.mjs
```

The manifest generator derives the display name from the filename (`willow_tree.glb` becomes `Willow Tree`) and keeps paths same-origin for Vercel/GitHub hosting.

## Named replacement slots

Use these exact filenames when a model should replace a built-in placeholder at its designed plot:

### Buildings

- `cottage-rose.glb`
- `cottage-gold.glb`
- `cottage-blue.glb`
- `cottage-lilac.glb`

When one of these files is present, the matching primitive cottage is omitted and the GLB takes its place. Other building filenames are auto-discovered and placed on available outer Cyclical City plots.

### Trees

- `tree-oak.glb` — replaces the repeated primitive trees. The included stand-in is intentionally simple and may be overwritten in place.

Additional uniquely named tree GLBs are discovered and distributed among the village's tree plots.

### Props

The included replaceable slots are:

- `rock-cluster.glb`
- `fence-segment.glb`
- `lantern-post.glb`
- `flower-patch.glb`
- `bush-round.glb`

Additional prop filenames are discovered and placed on open scenery points around expanded Cyclical City.

## Export and naming guide

- Format: binary glTF 2.0 (`.glb`), meters, with the model facing forward in your Blender scene.
- You can leave the model upright as authored. On load, the game automatically corrects a clear Blender Z-up versus game Y-up mismatch; correctly exported Y-up assets stay untouched. Nearly square props are left alone when the orientation is ambiguous.
- Use lowercase kebab-case filenames, such as `willow-tree.glb` or `bakery-awning.glb`.
- Apply/freeze transforms before export. Keep root scale `1,1,1` and rotation `0,0,0`; the correction preserves the model's origin.
- Put the origin at ground center.
- Embed materials and textures. Do not reference external texture files.
- Avoid cameras, lights, hidden helpers, and unused animation clips.
- Mobile target: preferably under 25k triangles and 2 MB per asset, with textures no larger than 1024px.
- Draco-compressed meshes are supported through the bundled decoder.

If a GLB cannot load, the rest of Cyclical City still renders. Named cottages keep their primitive fallback unless the replacement path is present in the generated manifest.

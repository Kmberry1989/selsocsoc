# Snug Society environment prop GLB guide

Players never upload these models. This folder is the developer-authored pipeline for detailed environment items that should replace primitive scenery over time. The included `.glb` files are deliberately simple, clearly named stand-ins; replace their geometry while keeping each filename, origin, and approximate footprint stable.

| Placeholder | What the final model should represent | Approximate bounds and origin |
|---|---|---|
| `tree-oak.glb` | A soft, broad-canopy village tree with a readable trunk silhouette | About 1.9 W × 2.2 H × 1.2 D; origin centered at ground level |
| `rock-cluster.glb` | A small asymmetrical cluster of 2–4 rounded landscape rocks | About 1.3 W × 0.6 H × 0.9 D; origin centered at ground level |
| `fence-segment.glb` | One modular two-rail wooden fence span, ends aligned for tiling | About 2.1 W × 1.1 H × 0.25 D; origin at ground center |
| `lantern-post.glb` | A cozy village path lantern with a simple warm-light housing | About 0.6 W × 2.0 H × 0.6 D; origin at base center |
| `flower-patch.glb` | A low mixed-flower planting patch with several distinct blossoms | About 1.2 W × 0.6 H × 0.8 D; origin centered at ground level |
| `bush-round.glb` | A low rounded shrub with a slightly irregular silhouette | About 1.4 W × 0.9 H × 1.0 D; origin centered at ground level |

## Shared conventions

- Format: binary glTF 2.0 (`.glb`), Y-up, meters, +Z as the model's front.
- Apply/freeze transforms before export. Keep root scale `1,1,1` and rotation `0,0,0`.
- Keep the origin on the ground so placement positions do not need per-model Y corrections.
- Embed materials and textures in the GLB. Avoid external texture files for props.
- Name the root and primary mesh descriptively; remove every `PLACEHOLDER_` name when final art replaces the stand-in.
- Avoid cameras, lights, unused animation clips, and hidden helper meshes.
- Mobile target: preferably under 25k triangles and 2 MB per prop, with 1024px textures or smaller.
- Add or change entries in `manifest.json`, then mirror placement changes in `snugEnvironmentSpawns` inside `index.html`.

The build fails softly when one prop is missing, so scenery can still load while a model is being replaced.

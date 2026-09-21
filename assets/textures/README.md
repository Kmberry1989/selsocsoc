# Selfie Social Society terrain texture guide

These are developer-owned placeholder textures for the primitive terrain surfaces. The current build loads them directly, so keep the filenames stable while replacing the artwork.

| File | Runtime use | Suggested final treatment |
|---|---|---|
| `grass.svg` | Cyclical City ground cylinder | Soft, seamless grass with little directional detail |
| `path.svg` | Cyclical City path cylinder | Warm stone or packed-earth path, readable from the game camera |
| `water.svg` | Pond cylinder | Gentle stylized ripples; avoid high-frequency detail |
| `sky.svg` | Cyclical City scene background | Wide sky artwork without landmarks or baked horizon props |
| `soil.svg` | Reserved for garden beds and future planting areas | Dark tilled soil that remains distinct from the path |

## Replacement notes

- Replace with SVG, PNG, or WebP files under this folder and update `snugTerrainTextures` in `index.html` if the extension changes.
- Use sRGB color artwork. Keep grass, path, water, and soil seamless on every edge.
- Start at 1024 × 1024 for square terrain tiles and 2048 × 1024 for a sky; optimize for mobile before shipping.
- Avoid text, logos, hard lighting, or scale cues that clash when a primitive is resized.
- The loader keeps a flat-color fallback, so a missing texture cannot block the scene.

# Text Legibility & Accessibility Pass

**Status:** SHIPPED

## What it is

A runtime legibility enforcement layer: any text NOT inside a text container gets bold weight plus a contrast outline (dark outline on light text, light on dark), and every text container's effective background is raised to at least 80% opacity.

## How it works for the player

- Floating/uncontained text automatically gains bold weight and an outline so it reads over busy 3D scenes.
- Containers below 80% effective opacity are raised to 80%; containers already at/above 80% are untouched.
- Backdrops, scrims, and veils are never treated as containers and never raised.
- A MutationObserver covers dynamically added UI.
- Reduced-motion mode presents readable, non-traveling text; captions stay accessible to assistive technology.

## Key code files

- `assets/text-legibility.js` + `assets/text-legibility.css` — the enforcement pass; both loaded by `index.html`.
- `assets/orientation-fix.js` + `assets/orientation-fix.css` — renderer, camera, and menu layout readjust cleanly on portrait↔landscape rotation.

## Where state lives

Nowhere — it's a pure presentation layer over the DOM.

## NPCs involved

None.

## Known limitations

Canvas/3D-texture text cannot be reached by the DOM pass. No complete phone visual sweep has been done; real-device verification is still worthwhile.

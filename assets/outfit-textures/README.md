# Player painted outfit textures

This folder is the drop-in source for 2D outfits painted directly over the player body. It is additive: the existing `assets/cosmetics/outfits/` GLB pipeline remains available in the Style menu.

## Template

Each outfit is ONE continuous wraparound texture, **2240 × 1120** (2:1), grayscale (monochrome) — the tint renderer multiplies the player's chosen tint over it, so no color in the texture itself.

Image layout, left to right: **BACK (seam) | RIGHT SIDE | FRONT | LEFT SIDE**, with FRONT centered. The left and right edges must match so the back wraps seamlessly. Fabric fills the entire image edge to edge — no gaps, no background.

The runtime (`assets/outfit-textures.js`) maps the body's angle around Y to u (front = 0.5) with RepeatWrapping, so no custom UV work is needed.

## Naming and catalog rules

- Use a lowercase kebab-case filename ending in `.png`, such as `rainy-day-tunic.png`.
- Export a 1024 × 1024 RGBA PNG. Do not flatten transparency.
- Keep the texture mobile-friendly (prefer under 1 MB).
- Add the file's `id`, display `name`, and relative `path` to `manifest.json`. The browser texture-outfit pipeline reads that manifest and adds every valid PNG entry to the **Painted outfit** selector inside Style; no game-bundle edit is needed.
- A repository build may regenerate `manifest.json` by enumerating PNG files in this folder, using the filename for `id` and converting hyphens to spaces for the display name. Exclude `peg-body-uv-template.png` from player choices.

## Runtime behavior

The selected PNG is wrapped around a transparent overlay cloned from the live peg body geometry. The underlying 3D body stays intact, so alpha holes show the chosen body color. Because the overlay uses the current body's geometry, it automatically follows body-mass and height changes without a separate fit or clipping pass. Selecting a painted outfit clears the 3D outfit slot; selecting a 3D outfit clears the painted layer. Hats, accessories, shoes, and held items are unchanged.

`painted-pastel-tunic.png` is the proof-of-concept conversion of the simple tunic template: thick charcoal outlines, a pastel teal body, coral bands, gold piping, and cel-shaded side panels.

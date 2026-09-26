# Peg-body painted outfit textures

This folder is the drop-in source for 2D outfits painted directly over the peg body. It is additive: the existing `assets/cosmetics/outfits/` GLB pipeline remains available in the Style menu.

## Template

Start from `peg-body-uv-template.png` (1024 × 1024 RGBA). Its four vertical islands map to the peg body as follows:

1. **FRONT** — the avatar-facing front quarter
2. **RIGHT SIDE** — the avatar's right quarter
3. **BACK** — the rear quarter
4. **LEFT SIDE** — the avatar's left quarter

The top of each island maps to the top shoulder/collar edge; the bottom maps to the hem/foot edge. Keep the area outside the four islands transparent. Transparent pixels reveal the body color beneath, so cutouts, short hems, and painted collars do not require a second mesh. The body cap remains the underlying body color.

## Naming and catalog rules

- Use a lowercase kebab-case filename ending in `.png`, such as `rainy-day-tunic.png`.
- Export a 1024 × 1024 RGBA PNG. Do not flatten transparency.
- Keep the texture mobile-friendly (prefer under 1 MB).
- Add the file's `id`, display `name`, and relative `path` to `manifest.json`. The browser texture-outfit pipeline reads that manifest and adds every valid PNG entry to the **Painted outfit** selector inside Style; no game-bundle edit is needed.
- A repository build may regenerate `manifest.json` by enumerating PNG files in this folder, using the filename for `id` and converting hyphens to spaces for the display name. Exclude `peg-body-uv-template.png` from player choices.

## Runtime behavior

The selected PNG is wrapped around a transparent overlay cloned from the live peg body geometry. The underlying 3D body stays intact, so alpha holes show the chosen body color. Because the overlay uses the current body's geometry, it automatically follows body-mass and height changes without a separate fit or clipping pass. Selecting a painted outfit clears the 3D outfit slot; selecting a 3D outfit clears the painted layer. Hats, accessories, shoes, and held items are unchanged.

`painted-pastel-tunic.png` is the proof-of-concept conversion of the simple tunic template: thick charcoal outlines, a pastel teal body, coral bands, gold piping, and cel-shaded side panels.

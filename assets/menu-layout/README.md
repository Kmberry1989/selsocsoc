# Main menu artwork guide

Edit these files in Figma, Illustrator, Inkscape, or another image editor while
keeping every filename and SVG `viewBox` unchanged. The game supplies accessible
button names and click behavior separately, so text inside artwork is decorative.

## File order and dimensions

Work through the files in this order. Dimensions are width × height in pixels or
equivalent SVG design units.

Ready-to-edit guides are in [`placeholders/`](placeholders/) with matching
numbered filenames. Copy the finished artwork into the corresponding live file;
do not point the game at the guide templates themselves.

| Order | File | Source canvas | Menu use |
| ---: | --- | ---: | --- |
| 1 | `background.svg` | 1600 × 900 | Full-screen 16:9 backdrop |
| 2 | `cloud-varieties.webp` | 1774 × 887 | Transparent 4 × 2 sheet of eight individual clouds |
| 3 | `logo.svg` | 720 × 260 | Top-center logo, displayed up to 320 px wide |
| 4 | `options-frame.svg` | 760 × 120 | Stretchable frame behind the bottom option dock |
| 5 | `town.svg` | 320 × 180 | Enter Cyclical City tile |
| 6 | `solo.svg` | 220 × 180 | Solo Practice tile |
| 7 | `family.svg` | 220 × 180 | Play Together tile |
| 8 | `board.svg` | 220 × 180 | Snug Board tile |

The option artwork is shown inside 44–56 px square buttons. Keep its important
symbol near the center and use large, simple shapes that remain legible at that
size. The source canvases are intentionally larger for easy editing.

## Image guidance

### Background

- Compose at 1600 × 900 (16:9) and cover the whole canvas.
- Keep the central 60% visually quiet so the moving clouds and world remain clear.
- Keep essential details away from the outer 10%; `object-fit: cover` crops edges
  on tall phones and wide displays.
- Avoid placing text, logos, or button-like objects into the background.

### Clouds

- Keep a transparent background and exactly four cells across by two cells down.
- Put one cloud silhouette in each cell—never a cluster or multiple separated
  clouds—and leave generous transparent padding around it.
- Use the same soft storybook shading, cool blue-gray shadow, and feathered edge
  treatment across all eight shapes.
- Do not add text, hard borders, scenery, or a colored sheet background.
- For a future replacement sheet, prefer 1600 × 800 so every cell is exactly
  400 × 400. The current 1774 × 887 file remains valid with the existing CSS.
- Export lossless WebP with transparency and keep the filename
  `cloud-varieties.webp`.

### Logo

- Design at 720 × 260 and keep the title inside a 36 px inset safe area.
- The logo is centered at the top with at least 18 px plus device safe-area
  padding; it scales down to fit narrow phones.
- Prefer strong contrast and limited fine detail because its maximum display
  width is 320 px.

### Option frame

- Design at 760 × 120 with transparent space through the center.
- Keep corners and ornaments within 18 px of the outer edge so stretching does
  not cover the buttons.
- The frame is stretched to the dock's responsive width; avoid circles, text,
  or motifs that must preserve an exact aspect ratio in its middle section.

### Option tiles

- Preserve each tile's existing canvas: 320 × 180 for Town and 220 × 180 for
  Solo, Family, and Board.
- Center the primary icon and keep it within the middle 55% of the canvas.
- Use thick strokes, high contrast, and minimal text. Tiny copy will not be
  readable at the 44–56 px displayed size.
- Do not encode interaction states into the image; hover, focus, selected, and
  disabled presentation is supplied by the interface.

## Visual stacking order

From back to front, the title menu renders:

1. Animated cloud sheet
2. `background.svg`
3. Optional menu wallpaper
4. Color/light shader overlays
5. `logo.svg`
6. `options-frame.svg`
7. Town, Solo, Family, and Board tiles

Keeping artwork within these roles prevents a replacement image from hiding the
logo, reducing button contrast, or fighting the animated cloud layer.

## Visual reference

`menu-art-direction.webp` is a non-runtime style reference showing the intended
background, individual-cloud, plaque/frame, and four option-tile treatments.
Use it for palette, softness, shape language, and detail density—not as a sprite
sheet or exact layout template. The dimensions and filenames in this guide remain
the source of truth.

## Editable placeholder files

1. [`01-background-template.svg`](placeholders/01-background-template.svg)
2. [`02-cloud-varieties-template.svg`](placeholders/02-cloud-varieties-template.svg)
3. [`03-logo-template.svg`](placeholders/03-logo-template.svg)
4. [`04-options-frame-template.svg`](placeholders/04-options-frame-template.svg)
5. [`05-town-template.svg`](placeholders/05-town-template.svg)
6. [`06-solo-template.svg`](placeholders/06-solo-template.svg)
7. [`07-family-template.svg`](placeholders/07-family-template.svg)
8. [`08-board-template.svg`](placeholders/08-board-template.svg)

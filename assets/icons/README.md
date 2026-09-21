# Selfie Social Society icon system

This folder contains the replaceable SVG wordmark, navigation/action icons, and one glyph for every minigame in the shipped catalogue.

## Naming

- `logo-selfie-social-society.svg` — main-menu wordmark (520 × 250 viewBox).
- Core icons: `plaza.svg`, `play.svg`, `board.svg`, `minigames.svg`, `house.svg`, `style.svg`, `shop.svg`, `photo.svg`, `pause-help.svg`, `chat.svg`, `emotes.svg`, `camera-controls.svg`, `camera-left.svg`, `camera-right.svg`, `camera-zoom-in.svg`, `camera-zoom-out.svg`, `voice.svg`, `notifications.svg`, `profile.svg`, and `sign-in.svg`.
- Minigames: `minigame-<folder-name>.svg`, matching the names in the minigame catalogue.

## Replacing art

Keep the filename and the `0 0 64 64` viewBox for icons so replacements fit every mobile target without code changes. Keep the logo's `0 0 520 190` viewBox. SVGs should have a transparent canvas, bold silhouettes, rounded joins, and enough contrast to read around 24 px. Avoid embedded raster images, external URLs, scripts, text labels inside icons, and strokes thinner than 3 px.

The runtime enhancer in `icon-system.js` applies these files to the main menu, game dock, action controls, and minigame picker. Replacing a file and redeploying updates every matching use.

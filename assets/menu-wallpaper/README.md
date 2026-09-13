# Main-menu animated wallpaper

Drop custom title-screen artwork in this folder, regenerate `manifest.json`, and deploy. The game automatically prefers these files over the live 3D town fallback; the gentle animated light shader remains on top.

## Canonical filenames

- `menu.mp4` — recommended primary loop. Encode H.264 video with no audio track for iPhone/iPad compatibility.
- `menu.webm` — optional alternate loop for browsers that prefer WebM.
- `menu.jpg`, `menu.png`, or `menu.webp` — optional poster/still shown while video loads, or used alone when no video is present.

Other filenames with the same extensions are also discovered. MP4 is listed first, then WebM; still-image priority is WebP, JPG/JPEG, then PNG. AVIF is intentionally unsupported by this artifact pipeline.

## Artwork guidance

- Design for a 16:9 center-safe composition, ideally 1920×1080 or 2560×1440.
- Keep the open town gate and important characters away from the right third on desktop and the lower half on phones, where the menu panel sits.
- Make the first and last frames match for a seamless loop.
- Aim for 8–15 seconds, 24 or 30 fps, muted/no audio, and under about 8 MB for quick mobile loading.
- Use restrained motion. The page honors reduced-motion preferences by keeping the shader still; the supplied video should also be gentle.

## Regenerate the manifest

From the repository root, run the normal project build (`npm run build`). It runs `assets/menu-wallpaper/generate-manifest.mjs` along with the existing cosmetics and audio manifest generators. Do not hand-edit generated paths.

When this folder contains no supported files, `manifest.json` remains empty and the title screen automatically falls back to the live Three.js town framed on the open gate, with the animated light shader above it.

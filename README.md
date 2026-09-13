# Snug Society — hosting project

This is the complete static project snapshot exported on **September 13, 2026**. Upload the contents of this folder to the root of your GitHub repository, then connect that repository to Vercel.

## Deploy with GitHub + Vercel

1. Extract the ZIP.
2. Upload **the contents of the extracted folder** to the root of your GitHub repository.
3. Commit and push.
4. In Vercel, import the repository. The included `vercel.json` runs `npm run build` and publishes the repository root.
5. Add the deployed Vercel domain in Firebase Authentication → Settings → Authorized domains.
6. In Firebase Console → Realtime Database → Rules, replace the existing rules with `assets/firebase-realtime-database.rules.json` and publish.

The Firebase web configuration is already embedded in `index.html`. Firebase web configuration is public client configuration; access is controlled by Firebase Authentication and database rules.

## Included game snapshot

See `RELEASE-NOTES.md` for the exact feature inventory. This export includes the current title screen, Solo Practice, multiplayer rooms and voice chat, Snug Board with its 2–4 player lobby and bot filling, the welcoming sequence, shops and economy, weather and wildlife, current asset pipelines, placeholder audio, and the current Realtime Database rules including board events.

## Add cosmetic GLBs

Place Draco-compressed or ordinary `.glb` files in one of these folders:

- `assets/cosmetics/hairstyles/`
- `assets/cosmetics/head-accessories/`
- `assets/cosmetics/outfits/`
- `assets/cosmetics/hand-accessories/`
- `assets/cosmetics/shoes/`

Commit and push. The Vercel build regenerates `assets/cosmetics/manifest.json`. Filenames become catalogue labels: `yellow_raincoat.glb` becomes **Yellow Raincoat**.

Read `assets/cosmetics/README.md` before modeling or exporting. The template GLBs show the current attachment origins and approximate bounds.

## Replace placeholder audio

Use the established filenames in:

- `assets/audio/music/`
- `assets/audio/sfx/`

Read `assets/audio/README.md` for the complete slot list and supported formats. The Vercel build regenerates `assets/audio/manifest.json` automatically.

## Other asset folders

- `assets/textures/` — terrain texture slots and notes.
- `assets/environment-props/` — starter prop GLBs and modeling notes.
- `assets/welcome-committee/` — named placeholders for Mayor Mayor, Gideon, and Penny Press.
- `assets/vendor/` — bundled Three.js module files and Draco decoders.

## Multiplayer and Firebase rules

Read `assets/MULTIPLAYER-SETUP.md`, then publish `assets/firebase-realtime-database.rules.json`. The rules cover rooms, append-only chat and minigame events, board-game lobby and turn events, and WebRTC presence/signaling.

## Local preview

Serve the folder over HTTP; ES modules will not load correctly from a `file://` URL.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

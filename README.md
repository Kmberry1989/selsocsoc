# Snug Society

A mobile-first 3D social game client backed by Firebase Authentication, Firestore, and Realtime Database.

## Upload to GitHub

1. Extract this ZIP.
2. Upload **the contents of this folder** to the root of your GitHub repository.
3. Commit and push.
4. In Vercel, import that repository. Vercel will run `npm run build` and publish the project root.
5. Add the deployed Vercel domain to Firebase Authentication → Settings → Authorized domains.
6. In Firebase Realtime Database → Rules, replace the current rules with `assets/firebase-realtime-database.rules.json` and publish.

The Firebase web configuration is already embedded in `index.html`. Firebase web configuration is public client configuration; access is controlled by Authentication and database rules.

## Add cosmetics

Place Draco-compressed or ordinary `.glb` files in one of these folders:

- `assets/cosmetics/hairstyles/`
- `assets/cosmetics/outfits/`
- `assets/cosmetics/hand-accessories/`
- `assets/cosmetics/shoes/`

Commit and push. The build script regenerates `assets/cosmetics/manifest.json`, and the game turns the filename into the catalogue name. For example, `yellow_raincoat.glb` becomes **Yellow Raincoat**.

Before modeling or exporting, read `assets/cosmetics/README.md`. The included template GLBs show the current attachment origins and approximate bounds. Keep the templates until your replacements are tested.

## Other asset folders

- `assets/textures/` contains terrain texture slots and notes.
- `assets/environment-props/` contains the starter prop set and modeling notes.
- `assets/vendor/` contains the bundled Three.js and Draco loader/decoder files.

## Multiplayer

Read `assets/MULTIPLAYER-SETUP.md`, then publish `assets/firebase-realtime-database.rules.json` in the Realtime Database Rules tab. The bundled rules are the tightened version: ordinary room members cannot rewrite room records, chat messages are append-only, presence is player-scoped, and minigame events are validated.

## Local preview

Serve the folder over HTTP; ES modules will not load correctly from a `file://` URL.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

# Selfie Social Society — hosting project

This is the complete Selfie Social Society **0.9.44** project snapshot exported on **September 21, 2026**. Upload the contents of this folder to the root of your GitHub repository, then connect that repository to Vercel and deploy the included Firebase Function.

## Deploy with GitHub + Vercel

1. Extract the ZIP.
2. Upload **the contents of the extracted folder** to the root of your GitHub repository.
3. Commit and push.
4. In Vercel, import the repository. The included `vercel.json` runs `npm run build` and publishes the repository root.
5. Add the deployed Vercel domain in Firebase Authentication → Settings → Authorized domains.
6. In Firebase Console, publish both bundled rule files: `assets/firebase-realtime-database.rules.json` and `assets/firebase-firestore.rules`.

The Firebase web configuration is already embedded in `index.html`. Firebase web configuration is public client configuration; access is controlled by Firebase Authentication and database rules.

## Included game snapshot

See `RELEASE-NOTES.md` for the exact release changes. Version 0.9.44 renames the game to Selfie Social Society while preserving the complete game and Cyclical City feature set.

## Edit the town layout

Open `assets/world/default-layout.json` in the World Editor, make the town changes, export `layout.json`, replace `assets/world/layout.json`, and redeploy. The game applies only the IDs included in the override, keeps every omitted object at its shipped placement, clamps positions to the world bounds, and silently keeps the defaults if the override is missing or invalid.

## Tint-ready cosmetic GLBs

Each equipped item stores its own color. In Style, players can choose a tint or reset the item to white. The runtime multiplies that tint over the material’s original color and embedded texture maps, preserving authored texture detail instead of replacing it.

For clean color changes, author fabric, hair, and accessory surfaces with white or neutral albedo. Put details that must keep an exact authored color—buckles, buttons, lenses, eyes, logos, or metal trim—on a separate mesh or material and either:

- include `NoTint` or `Untinted` in the mesh/material name, such as `GoldBuckle_NoTint`; or
- set glTF extras `snugTint` to `false`.

Read `assets/cosmetics/README.md` for the full tinting, sizing, attachment, and export guide.

## Add cosmetic GLBs

Place Draco-compressed or ordinary `.glb` files in one of these folders:

- `assets/cosmetics/hairstyles/`
- `assets/cosmetics/head-accessories/`
- `assets/cosmetics/outfits/`
- `assets/cosmetics/hand-accessories/`
- `assets/cosmetics/shoes/`
- `assets/cosmetics/face-wear/`
- `assets/cosmetics/facial-hair/`
- `assets/cosmetics/held-items/`
- `assets/cosmetics/back-items/`
- `assets/cosmetics/neckwear/`

Commit and push. The Vercel build regenerates `assets/cosmetics/manifest.json`. Filenames become catalogue labels: `yellow_raincoat.glb` becomes **Yellow Raincoat**.

The template GLBs show the current attachment origins and approximate bounds. You can leave models upright as authored in Blender: the loader detects and corrects clear Z-up-to-Y-up mismatches while leaving correctly exported Y-up assets untouched.

## Replace or extend audio

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

Read `assets/MULTIPLAYER-SETUP.md`, then publish the bundled Realtime Database and Firestore rules. They cover rooms, append-only chat and minigame events, board-game lobby and turn events, WebRTC presence/signaling, garden data, and authorized fit-review saves.

## Family room push notifications

Push notifications are always opt-in. The game asks for notification permission only when a player turns on **Notify me about family pings** in Pause & Help.

1. In Firebase Console, open **Project settings → Cloud Messaging → Web configuration → Web Push certificates**.
2. Choose **Generate key pair**, copy the public key, and replace `PASTE_FIREBASE_WEB_PUSH_CERTIFICATE_KEY_PAIR_HERE` in `assets/push-notifications.js`.
3. Copy `functions/.env.example` to `functions/.env` and replace the example with the deployed HTTPS origin, without a path or trailing slash:

   ```env
   SITE_URL=https://your-game.example
   ```

4. Install the function dependencies:

   ```bash
   npm --prefix functions install
   ```

5. From the project root, deploy the function:

   ```bash
   firebase deploy --only functions
   ```

6. Publish the updated `assets/firebase-realtime-database.rules.json`, then push the project so Vercel deploys both the client and root `firebase-messaging-sw.js`.

Cloud Functions require the Blaze plan. Charges depend on actual usage, so review Firebase pricing and set budget alerts for the project.

On iPhone and iPad, web push requires the site to be added to the Home Screen. The player must open the installed Home Screen app before turning on family pings.

The client stores each current token at `users/{uid}/fcmTokens/{token}` and rechecks it while the game is active. The **Ping family** button appears only inside a private family room and writes a short-lived request to `pings/{roomId}/{pushId}`. The Node 20 function sends one multicast to other room members, removes invalid tokens, and deletes the processed ping. Notification taps open `/?room=room-…`, which uses the existing automatic join path.

## Local preview

Serve the folder over HTTP; ES modules will not load correctly from a `file://` URL. Push notifications additionally require HTTPS (or localhost), a configured VAPID key, and the root service worker.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Custom animated menu wallpaper

Add a looping `menu.mp4` (H.264 recommended), optional `menu.webm`, and optional poster such as `menu.webp` to `assets/menu-wallpaper/`. The normal build auto-generates its manifest. If that folder has no media, the main menu shows the live 3D view of Cyclical City framed on the open gate with the animated light shader. See `assets/menu-wallpaper/README.md` for sizing and compression guidance.

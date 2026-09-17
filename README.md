# Snug Society — hosting project

This is the complete Snug Society **0.9.29** static project snapshot exported on **September 17, 2026**. Upload the contents of this folder to the root of your GitHub repository, then connect that repository to Vercel.

## Deploy with GitHub + Vercel

1. Extract the ZIP.
2. Upload **the contents of the extracted folder** to the root of your GitHub repository.
3. Commit and push.
4. In Vercel, import the repository. The included `vercel.json` runs `npm run build` and publishes the repository root.
5. Add the deployed Vercel domain in Firebase Authentication → Settings → Authorized domains.
6. In Firebase Console, publish both bundled rule files: `assets/firebase-realtime-database.rules.json` and `assets/firebase-firestore.rules`.

The Firebase web configuration is already embedded in `index.html`. Firebase web configuration is public client configuration; access is controlled by Firebase Authentication and database rules.

## Included game snapshot

See `RELEASE-NOTES.md` for the exact release changes. This export includes the current title screen, mobile redirect/desktop popup Google sign-in with visible Firebase errors, cloud-saved fit review transforms, accessory tinting across ten cosmetic slots, daily quests and streaks, a rotating market, expanded minigames, reactions, door knocking, gifts, trading, collections, achievements, festival keepsakes, multiplayer rooms and voice chat, Snug Board with its 2–4 player lobby and bot filling, the welcoming sequence with its airborne speech performance and dialogue-word fountain, the expanded village with its connected destination paths and community garden, living sky, shops and economy, weather and wildlife, current asset pipelines, placeholder audio, and current Firebase rules.

## Welcoming committee and plush avatars

Penny Press uses a warmer, more understanding photographer voice profile. Town Life now includes six persistent garden plots for Moonflowers, Button ferns, and Cozy oaks, each growing through four visibly larger real-time phases. The expanded countryside also uses connected, destination-led paths with protected clearances that keep water and procedural scenery off the walkways. Players and welcoming-committee characters share the felt-like matte finish, stitched coin-head and body-hem seams, soft grounding shadows, photographic expression faces, toon outlines, buoyant movement, and floating hands. Facial hair has its own tintable, fit-reviewed slot for mustaches, beards, goatees, and sideburns.

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

Read `assets/cosmetics/README.md` before modeling or exporting. The template GLBs show the current attachment origins and approximate bounds. You can leave models upright as authored in Blender: the loader detects and corrects clear Z-up-to-Y-up mismatches for cosmetic and replacement-world GLBs while leaving correctly exported Y-up assets untouched.

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

Read `assets/MULTIPLAYER-SETUP.md`, then publish the bundled Realtime Database and Firestore rules. They cover rooms, append-only chat and minigame events, board-game lobby and turn events, WebRTC presence/signaling, and authorized fit-review saves.

## Local preview

Serve the folder over HTTP; ES modules will not load correctly from a `file://` URL.

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Custom animated menu wallpaper

Add a looping `menu.mp4` (H.264 recommended), optional `menu.webm`, and optional poster such as `menu.webp` to `assets/menu-wallpaper/`. The normal build auto-generates its manifest. If that folder has no media, the main menu shows the live 3D town framed on the open gate with the animated light shader. See `assets/menu-wallpaper/README.md` for sizing and compression guidance.

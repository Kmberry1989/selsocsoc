# AGENT.md — Selfie Social Society

Operating manual for AI agents working in this repo. Ground every change in the actual code; never invent APIs, file names, collection names, dialogue, or behaviors.

## Project overview

**Selfie Social Society** (town: **Cyclical City**) — a casual mobile-first 3D social web game. Single-page app: `index.html` + `assets/`. Players explore a cozy town with selfie-faced avatars, play minigames and game shows, build/furnish a home, garden, fish, paint, and socialize over Firebase multiplayer.

## Stack & architecture

- **Client:** plain HTML/CSS/JS. `index.html` loads Three.js bundles (`assets/selfie-social-society-*.bundle.js`, `assets/vendor/`) plus feature scripts (`assets/gardening-system.js`, `assets/nosy-neighbors.js`, `assets/painting-mode.js`, …). No framework, no bundler step for feature scripts.
- **Build:** `npm run build` = `generate-cosmetics-manifest.mjs` + audio/menu-wallpaper/environment/minigame manifest generators + `npm run validate:assets` (`node scripts/validate-assets.mjs`). Vercel runs `npm run build` and publishes the repo root (`vercel.json`).
- **Backend: Firebase only** — Auth (anonymous + Google), Firestore, RTDB for movement/chat/presence, Cloud Functions (`functions/`, `sendFamilyRoomPing`), Cloud Messaging. No separate realtime server. Firebase project: `spatial-canvas-a9726`.
- **Deploy:** push to `main` on GitHub → Vercel auto-deploys `selsocsoc.vercel.app`. Repo: https://github.com/Kmberry1989/selsocsoc.

## Verify your work (the repo's own gates)

1. `node --check` on every JS file you touched.
2. `npm run build` — must pass (manifest generators + asset validation).
3. `npm run validate:assets` — must pass (182 referenced files, 60 texture IDs at last check).
4. Never claim browser/device behavior you didn't test — say what's unverified.

## Canon (verbatim — never rename or rewrite)

- Game: **Selfie Social Society**. Town: **Cyclical City**.
- **Mayor Mayor** (mayor; speech rate 0.95) and **Gideon** (eccentric tour guide; Mayor Mayor's father). Gideon's line: **"He's Mr. Mayor Mayor now!"** Gideon voice: rate 0.88, pitch 0.6, masculine/older/low; sung dialogue stays sung.
- NPC roster with roles: Lyla Lens (newspaper photographer), Chip Chance (minigame host/showman), Barnaby Bargain (shopkeeper), Pip Parade (festival organizer), Agnes Alley (cat shelter keeper), Dottie Daly (quest giver), Peggy Plank (bridge foreman), Mr. Buck Coinsworth (banker), Fern Bramble (gardener), Stanley Stamp (mail carrier), Bobby Gill (fishing mentor), Tilly Turner (game-show co-host).
- Whirl of Resources turn indicator: **"GIVE THE WHIRL A TWIRL!"**. Nosy Neighbors tagline: "Join us as we cross property lines to find out who the nosiest know-it-all really is in… Nosy Neighbors!"
- User-supplied names, lore, dialogue, and choreography are canon — implement verbatim.

## Hard rules

- **Never fake it:** no placeholder users, simulated chat/presence/votes/notifications. Start social systems empty; real users fill them.
- **Never delete unrelated repo content.** Update in place; preserve everything already there.
- **Text selection stays disabled** throughout the game.
- **2D vs 3D split:** 2D sprites for trees/plants/flowers/clouds/crops, outfit textures, cards, ALL inventory/carried items, small decor, distant buildings, game-show set dressing, paintings in frames. 3D for large furniture, enterable buildings, interactive show pieces, NPC hats/held items, mailboxes, pets.
- **Statuses are honest:** SHIPPED / PARTIAL / PLANNED. Never present a plan as shipped. If a detail isn't verifiable in the repo, mark it unverified or omit it.

## Pointers

- `docs/systems/README.md` — index of per-system guides (game shows, construction, gardening, multiplayer, …).
- `GAMEPLAY-AUDIT.md` — 2026-09-27 asset/interaction audit (WebP migration, known risks).
- `docs/PARTY_NIGHT_AUDIT.md` — 2026-09-24 party-night upgrade audit.
- `assets/MULTIPLAYER-SETUP.md` — Firebase setup, RTDB/Firestore data layout, Snug Board flow.
- `assets/cosmetics/README.md` — cosmetic authoring guide (slots, tinting, export constraints).

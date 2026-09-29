# Selfie Social Society — System Guides

One guide per major game system in Cyclical City: what it is, how it plays, key code files, where state lives, NPCs involved, and status. Statuses: **SHIPPED** (in the game), **PARTIAL** (real but incomplete), **PLANNED** (design direction only — not in the game yet).

Historical audits live alongside these: `/GAMEPLAY-AUDIT.md` (asset/interaction audit, 2026-09-27) and `/docs/PARTY_NIGHT_AUDIT.md` (party-night upgrade audit, 2026-09-24).

## Game shows

- [Game Shows — Framework](game-shows.md) — SHIPPED — staged show format, shared sound package, hosts
- [Whirl of Resources](whirl-of-resources.md) — PLANNED — wheel-and-puzzle show; CSS stub + achievement hook only
- [Nosy Neighbors](nosy-neighbors.md) — SHIPPED — Newlywed-style one-on-one, pass-and-play, show editor
- [Family Feud-style One-on-One](family-feud-show.md) — PLANNED — no code yet

## Town & home

- [Home Construction & Furnishing](home-construction.md) — SHIPPED — build/furnish your home, persists to Firestore
- [Home Visits — Strolling Stretch](home-visits.md) — SHIPPED — visit friends' homes
- [Town Projects — Moonlight Footbridge](town-projects.md) — SHIPPED — co-op town build
- [NPCs of Cyclical City](npcs.md) — SHIPPED — full roster, speaking/dialogue system

## Activities

- [Gardening](gardening.md) — SHIPPED — seeds, watering, harvest with Fern Bramble
- [Fishing](fishing.md) — PARTIAL — pond-fishing minigame + shell rewards; Bobby Gill mentor content roster-only
- [Painting Studio](painting-studio.md) — SHIPPED — canvas painting, saved/hung/gifted paintings
- [Photography & Portraits — Lyla Lens](photography-portraits.md) — SHIPPED — guided selfie appointment, SnugExpressions API
- [Photo Mode](photo-mode.md) — SHIPPED — freeze the world, stage and capture PNGs
- [Adopt-a-Cat](adopt-a-cat.md) — SHIPPED — follower cats via Agnes Alley
- [Festivals](festivals.md) — SHIPPED — rotating festivals, event quests, exclusive rewards (Pip Parade)

## Games & economy

- [Minigames Catalog](minigames.md) — SHIPPED — 24 minigames + shared challenge contract
- [Market Basket Mayhem](market-basket-mayhem.md) — SHIPPED — grocery-run minigame; arena art still on the wish list
- [Snug Board](snug-board.md) — SHIPPED — 2–4 player board game, bots, bonus stars
- [Mailbox, Gifting & Trading](mailbox-gifting.md) — SHIPPED — gifts, trade deliveries, achievement stamps (Stanley Stamp)
- [Daily Loop — Quests, Streak, Rotating Shop](daily-loop.md) — PARTIAL — systems live; Dottie Daly / Barnaby Bargain fronts roster-only
- [Inventory & Economy](inventory-economy.md) — SHIPPED — single shell currency, 2D inventory

## Platform

- [Multiplayer Architecture](multiplayer-architecture.md) — SHIPPED — Firebase-only: Auth, Firestore, RTDB, Cloud Functions, Cloud Messaging
- [Character Customization](character-customization.md) — SHIPPED — cosmetics, tinting, fit review, 2D outfit textures
- [Welcoming-Committee Onboarding](onboarding.md) — SHIPPED — cinematic photo-shoot onboarding with Gideon & Mayor Mayor
- [Text Legibility & Accessibility Pass](text-legibility.md) — SHIPPED — bold+outline floating text, 80% container floor, reduced motion

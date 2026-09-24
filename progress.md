Original prompt: Review and audit the unfinished game, add features, and suggest ideas inspired by similar party games, with special focus on a user-friendly nine-expression selfie portrait workflow hosted by Lyla Lens.

## 2026-09-24

- Confirmed the intended direction is a balanced cozy-world and party-game hybrid.
- Added Party Setup support for round count, rules style, and bot difficulty.
- Added Market Basket Mayhem to the minigame catalog and shared challenge framework.
- In progress: Lyla Lens live-camera portrait appointment, direct portrait editing, expression event API, deterministic hooks, browser verification, and screenshot-backed audit.
## 2026-09-24 implementation pass

- Added guided live-camera/upload portrait appointment enhancements, contact sheet, manager controls, direct crop editing, privacy copy, versioned portrait metadata, and expression-event API.
- Added Party Setup settings, configurable rounds/rules/difficulty, relocating board prize, bot difficulty behavior, and Market Basket Mayhem.
- Added deterministic text/time hooks and `docs/PARTY_NIGHT_AUDIT.md`.
- Static verification passed (`node --check`, `npm run build`, `git diff --check`).
- Browser accessibility capture reached the title screen. Both the generic game client and in-app browser later stalled on the Three.js WebGL capture surface; do not claim screenshot, camera, Firebase, two-user, or full playthrough verification.
- Next: validate on a real phone camera, complete 5/10-round runs, add true route-choice board interaction, and give the featured eight games bespoke arenas/contracts.

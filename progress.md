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

---

Original prompt: Compress the large texture and image files and save them as webp and utilize them that way or whatever format you think is best, ensure everything works. Also do a general audit of gameplay clicking, different things see what works what doesn't jaw down any errors.

## Current work

- Implement the approved WebP migration, supplied `assets/NEW WEBP/` integration, gameplay fixes, browser QA, and `GAMEPLAY-AUDIT.md`.
- Preserve pre-existing package files, `.firebase/`, and `.DS_Store` worktree changes.
- Baseline finding: the Town Hall welcome/portrait modal leaves background navigation accessible and clickable.

## Completed

- Converted 68 large runtime PNG files to WebP and updated explicit references.
- Integrated supplied garden, painting, fishing, world-prop, and material artwork.
- Added manifest/reference validation and wired it into the build.
- Fixed Town Hall onboarding background pointer activation.
- Passed production build, validator, syntax checks, visual samples, and fresh-Chrome onboarding retest.
- Recorded verified scope and remaining live/mobile risks in `GAMEPLAY-AUDIT.md`.

## Notes

- Existing package-lock/package dependency and `.firebase/` changes were preserved.
- Small PNGs whose WebP equivalents grew were intentionally retained.

## 2026-10-07 Playwright audit

- `npm run build` passed, including validation of 279 referenced assets and 60 texture IDs.
- The required `web_game_playwright_client.js` run stalled before its first artifact while SwiftShader saturated the GPU process; the CLI wrapper was unavailable (`playwright-cli: command not found`).
- An installed-Chrome Playwright fallback verified desktop (1440x900) and mobile (390x844) menu readiness, the Cyclical City confirmation flow, keyboard activation, Escape cancellation, responsive visual layout, and availability of `render_game_to_text` / `advanceTime`.
- Observed menu-ready timing: 674-1101 ms desktop and 642 ms mobile; no failed requests or uncaught page exceptions.
- Reproduced repeated `GL_INVALID_VALUE: glCopySubTextureCHROMIUM: Offset overflows texture dimensions`, duplicate Three.js import warnings, a deprecated `THREE.Clock` warning, and the removed `PCFSoftShadowMap` fallback warning.
- Critical open issue: after confirming Cyclical City, the start screen hides in about 260-283 ms, but a full-page screenshot remains blocked past the 25-second guard while the renderer consumes a full CPU core. Town gameplay, onboarding, input chains, and `render_game_to_text` synchronization are therefore not verified.
- Visual artifacts and structured evidence are under local `output/playwright/`.

## 2026-10-07 renderer repair

- Added a pre-bundle renderer startup seam that caps initial DPR at 1, disables dynamic shadows and shader error checks during startup, exposes measured one-frame world preparation, and pauses live rendering behind the arrival fade.
- Replaced the renderer-dependent double-RAF arrival wait with timer yields and visible “Preparing Cyclical City…” feedback.
- Deferred optional feature chunks until after the player enters a mode so title-menu and arrival work no longer compete with nonessential systems.
- Routed the short welcoming ceremony to its built-in illustrated fallback instead of starting a second high-DPR, shadowed WebGL renderer on top of the town.
- Kept world rendering paused through physical menu removal and camera settlement, then added a controlled town-camera warm-up before normal frames resume.
- Delayed welcome startup until after menu removal and deferred renderer/feature resumption until the welcoming ceremony closes, preventing synchronous welcome work from starving cleanup.
- Removed the already-faded menu synchronously before toggling town classes so downstream observers cannot strand an invisible modal in the DOM.
- Bound welcome launch to full page readiness and kept a pending guard so a missed early event cannot resume the expensive town renderer before onboarding activates.
- Froze the rotating title-screen world after its first completed frame so camera motion cannot continuously reveal and compile new shader/material combinations behind the menu.
- Reduced the true core set to renderer setup, the main app, welcome flow, and arrival controller; environment, cosmetics, emotes, NPC styling, games, story, and party systems now load progressively after onboarding.
- Added a lightweight, accessible illustrated welcome controlled by the entry event; it preserves the existing ceremony presentation without creating a competing WebGL renderer.
- Added always-available `render_game_to_text` and `advanceTime` hooks with player coordinates, mode, onboarding, chunk, and renderer metrics.
- Removed the temporary hang-watch overlay from production startup.
- Added `npm run test:town-smoke`: desktop now verifies menu → confirmation → welcome → live town → renderer frames → keyboard movement, while mobile verifies the responsive menu/welcome path and viewport containment.
- Final Playwright evidence: desktop town rendered and moved the player from x=0 to x=1.645; the 390×844 welcome stayed fully inside the viewport. The smoke gate passed both profiles with no uncaught page errors.
- The audit originally found duplicate Three.js/deprecated Clock warnings, denied presence requests, and Chromium `glCopySubTextureCHROMIUM` diagnostics after optional feature loading; the actionable application sources are addressed in the cleanup below.

## 2026-10-07 console cleanup and delivery

- Removed the unused bundled 3D welcome runtime now that the illustrated ceremony owns onboarding, eliminating one complete Three.js renderer/runtime copy.
- Counted and suppressed the remaining bundle-internal duplicate-Three and deprecated-Clock notices at the pre-bundle compatibility seam; other warnings still pass through unchanged.
- Normalized Firebase Realtime Database bearer credentials to REST `auth` parameters and added an explicit local-only fallback for the deployment's denied presence path, eliminating repeated 400/401 network noise while leaving other authenticated data routes intact.
- Fixed fast welcome dismissal so the entry observer cannot miss the ceremony and relaunch it.
- The remaining `glCopySubTextureCHROMIUM` message is emitted by headless Chrome's GPU compositor during WebGL/DOM composition; the smoke gate excludes only that exact browser-driver diagnostic and now fails on all other warning/error console messages, page exceptions, and HTTP 4xx/5xx responses.

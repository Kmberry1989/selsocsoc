# Playwright Vibe-Coding Prompt Book — Selfie Social Society

**Repo:** `~/workspace/selsocsoc` (github.com/Kmberry1989/selsocsoc)
**Live:** https://selsocsoc.vercel.app · **Local dev:** http://localhost:8080
**Engine:** Custom Three.js engine — `window.__snugWorld` exposes `{ renderer, scene, camera, player, mode }`.
**Chunk loader:** `<script type="application/x-snug-chunk" data-snug-phase="feature" data-src="assets/…">` tags in `index.html`.
**Currency:** "shells". **Town:** Cyclical City.

## Codebase facts every prompt below relies on

| Fact | Value |
|---|---|
| Telemetry hook (exists) | `window.render_game_to_text()` → JSON `{ coordinateSystem, mode, player:{x,y,z}, startOpen, welcomeActive, featureChunksReady, renderer:{ renderedFrames, townPrepareMs, pausedFrames } }` |
| Time advancement (exists) | `window.advanceTime(ms)` → Promise |
| Skip welcome | `window.__snugFinishWelcome?.()` or `window.__snugSkipWelcome = true` |
| Core-ready gate | `typeof window.__snugEnsureCoreReady === "function"` |
| Menu selectors | `.snug-start-screen`, `getByRole("button",{name:"Enter Cyclical City"})`, `getByRole("button",{name:"Confirm"})` |
| Welcome selectors | `.welcome-cinematic`, `.welcome-help`, `.snug-help-skip` |
| Modes | `mode: "village"` (town), plus solo / family / board |
| Movement | Keyboard (`ArrowRight`, `ArrowUp`, `d`, WASD) + tap-to-move |
| Shells event bus | `window.dispatchEvent(new CustomEvent("snug-award-coins",{detail:{amount, message}}))` |
| Feature modules | `__snugGamesHub`, `__snugPhotoContest`, `__snugSeasonalEvents`, `__snugPetCare`, `__snugAudio`, `__snugMealBuff`, `__snugPaintingMode` |
| Games hub API | `window.__snugGamesHub.open()`, `.games` (24 minigames in `assets/minigames/`: balloon-pop, bridge-builders, cat-herding, …) |
| Photo contest API | `window.__snugPhotoContest.{ open, close, refresh, weekId, themeFor }` |
| Seasonal API | `window.__snugSeasonalEvents.{ currentEvent, openPanel, getSeason }` — season = `Math.floor(Date.now()/90000)%4` (0=Spring, 1=Summer, 2=Autumn, 3=Winter) |
| Pet API | `window.__snugPetCare.{ open, close, pet, feed, train, perform }` |
| Meal buffs | `window.__snugMealBuff = { effect, until, name }`, event `snug-meal-buff` |
| localStorage keys | `snug-meal-buff`, `snug-seasonal-events-v1`, `snugPhotoContest:*` |
| Panels | `.play-panel`, `.style-panel`, `.tabbar` buttons |
| Paint UI | `.paint-fab`, `.paint-launch` (proximity-gated: within 3.2u of an easel) |
| Viewports (existing smoke test) | Desktop 1440×900, Mobile 390×844 (touch) |
| Existing test | `scripts/playwright-town-smoke.mjs`, run via `npm run test:town-smoke` (env `AUDIT_URL`) |
| Debug hooks | `__snugArrivalDebug`, `__snugDialogueDebug`, `__snugWelcomeActive`, `__snugWorldRenderPaused`, `__snugRendererStartupMetrics` |

> **Rule for every template:** paste the prompt verbatim into the agent. Replace `[BRACKETS]` with your values.
> Standing project rules: no placeholder/fake people or simulated activity in any build; his sprites used exactly as supplied; dialogue presented as options before implementing.

---
---

# VOLUME 1 — THE FOUNDATIONAL DEBUG & TELEMETRY KIT

Goal: a standardized `window.__DEBUG_GAME__` API inside the running browser that Playwright can read and write.

## 1.1 — Inject the unified debug hook

```
In the Selfie Social Society repo (~/workspace/selsocsoc), create assets/debug-telemetry.js as a self-contained
IIFE (pattern: assets/painting-mode.js) that installs window.__DEBUG_GAME__ with the following API, mapped to
the EXISTING state sources — do NOT invent new state stores:

- state(): returns { mode: window.__snugWorld?.mode, player: JSON.parse(window.render_game_to_text()).player,
  startOpen, welcomeActive, featureChunksReady, shells: (read the live shell balance from wherever the
  snug-award-coins listener stores it — find the actual listener first), season: window.__snugSeasonalEvents?.getSeason(),
  mealBuff: window.__snugMealBuff ?? null, pet: window.__snugPetCare?.pet ?? null, photoContestWeek: window.__snugPhotoContest?.weekId ?? null }
- triggerInput(key, ms): keyboard.down(key) equivalent — dispatch keydown/keyup on document for the given key
  (e.g. "ArrowRight") held for ms milliseconds, mirroring how scripts/playwright-town-smoke.mjs drives movement.
- teleport(x, z): set window.__snugWorld.player.position.x/z directly, then return the new player position from
  render_game_to_text().
- addReward(amount, message): dispatch new CustomEvent("snug-award-coins", { detail: { amount, message } }) and
  return the shell balance before and after (poll up to 2s for the change).
- forceGameOver(): find the currently open minigame or show overlay (e.g. via window.__snugGamesHub) and end it,
  returning the resulting shell delta.
- setSeason(index): override Date.now() for the 90000ms season cycle so getSeason() returns index (0=Spring,
  1=Summer, 2=Autumn, 3=Winter), matching assets/multiplayer.js `Math.floor(now/90000)%4`.
- skipToTown(): replicate the exact menu flow from scripts/playwright-town-smoke.mjs — click "Enter Cyclical
  City", click "Confirm", wait for .welcome-cinematic, call window.__snugFinishWelcome(), wait for the cinematic
  to detach — but do it all via DOM/JS from inside the page so Playwright can call one function.
- snapshots: keep a ring buffer of the last 60 state() calls (one per second) with timestamps; expose history().

Guard with `if (window.__DEBUG_GAME__) return;`. Wire it as a chunk tag in index.html:
<script type="application/x-snug-chunk" data-snug-phase="feature" data-src="assets/debug-telemetry.js"></script>
placed right after the photo-contest chunk. node --check it, run npm run validate:assets, then write a Playwright
spec tests/debug-telemetry.spec.mjs that calls each method via page.evaluate and asserts sane return shapes.
```

## 1.2 — Map every shell transaction

```
In ~/workspace/selsocsoc, find every dispatch of the "snug-award-coins" event (grep assets/*.js). For each one,
record: file, line, the amount expression, and the message string. Then extend window.__DEBUG_GAME__ (from
assets/debug-telemetry.js) with transactions(limit): an in-page listener that has recorded every snug-award-coins
detail ({amount, message, at}) since page load, newest first. Write tests/economy-audit.spec.mjs that loads the game,
calls __DEBUG_GAME__.skipToTown(), dispatches a known set of rewards (addReward(25,"audit"), addReward(-10,"audit")),
and asserts transactions(5) contains both in order. Do not change any existing game code — only the new telemetry file.
```

## 1.3 — Expose minigame lifecycle hooks

```
In ~/workspace/selsocsoc, inspect assets/games-hub.js and the 24 minigame dirs under assets/minigames/ (balloon-pop,
bridge-builders, cat-herding, coin-curling, coin-scramble, dodge-puffs, draw-and-guess, emote-charades, freeze-tag,
hide-and-seek, hot-potato, lantern-hunt, memory-match, musical-statues, pattern-parade, petal-catch, plaza-sprint,
plaza-tag, pond-fishing, room-quiz, scavenger-snap, sneaky-snug, snowball-toss, treasure-dig). Extend
window.__DEBUG_GAME__ with:
- listGames(): return window.__snugGamesHub.games (id, name, tags).
- launchGame(id): open the hub via __snugGamesHub.open(), then activate the game card for id the same way a click
  would (dispatch real click events, not direct function calls).
- gameState(): return whatever the active minigame exposes (score, timer, phase) — survey each minigame's window
  export and normalize to { gameId, score, timeLeft, phase }.
- endGame(): end the active minigame and return { shellsEarned }.
Add tests/minigame-lifecycle.spec.mjs that launches balloon-pop and coin-scramble, asserts gameState().phase changes
from the lobby state, ends the game, and asserts shellsEarned >= 0. Never simulate fake players or activity.
```

## 1.4 — State persistence probes

```
In ~/workspace/selsocsoc, extend window.__DEBUG_GAME__ with persistence probes for the localStorage keys the game
actually uses: "snug-meal-buff", "snug-seasonal-events-v1", and any "snugPhotoContest:*" keys, plus the pet state
written by assets/pet-care.js (localStorage per-UID + players/{uid}.pet in Firebase). Add:
- storageDump(): return { localStorage: {key: value} for every key starting with "snug", firebaseSession: Boolean(window.__snugSession) }.
- clearLocalProgress(): remove only snug-* localStorage keys (never touch Firebase), returning the list removed.
Write tests/persistence.spec.mjs: load page, call __DEBUG_GAME__.addReward(50,"persist-test"), read storageDump(),
reload the page, assert the shell-related keys survived or were intentionally reset (document which). Assert
clearLocalProgress() empties the snug-* keys and the game still boots to the menu without errors.
```

## 1.5 — Performance telemetry surface

```
In ~/workspace/selsocsoc, extend window.__DEBUG_GAME__ with perf():
- renderedFrames and pausedFrames deltas over a 5s window from window.__snugRendererStartupMetrics,
- townPrepareMs,
- drawCalls and triangles from window.__snugWorld.renderer.info,
- featureChunksReady flag and the count of script[type="application/x-snug-chunk"] tags that failed to load.
Write tests/perf-budget.spec.mjs: after skipToTown(), assert renderedFrames advances over 2s, pausedFrames stays 0
while the tab is visible, and renderer.info.drawCalls is under 600 on the 1440×900 viewport. Log the numbers to
console so CI can track them.
```

---
---

# VOLUME 2 — ASSET VALIDATION & RESPONSIVE LAYOUT SMOKE TESTS

## 2.1 — Boot asset audit (404s and chunk failures)

```
In ~/workspace/selsocsoc, write tests/asset-audit.spec.mjs (Playwright, pattern: scripts/playwright-town-smoke.mjs).
It must:
1. Attach page.on("response") and collect every response with status >= 400, recording `${status} ${pathname}`.
2. Attach page.on("pageerror") and page.on("console") (type error/warning, ignoring the known-harmless
   "glCopySubTextureCHROMIUM" message the smoke test already filters).
3. goto(process.env.AUDIT_URL || "http://localhost:8080"), wait for .snug-start-screen visible (15s).
4. Assert typeof window.__snugEnsureCoreReady === "function".
5. Click "Enter Cyclical City" → "Confirm" → wait for .welcome-cinematic → call window.__snugFinishWelcome() →
   wait for .welcome-cinematic detached → waitForFunction(() => window.__snugRendererStartupMetrics?.townPrepareMs !== null, 15s).
6. Assert the 404/error/pageerror lists are EMPTY — but instead of failing silently, print the full list so the
   failure message names the missing asset (e.g. a GLB in assets/furniture/ or a webp in assets/garden-art/).
7. Assert every script[type="application/x-snug-chunk"] has a matching loaded module by checking
   window.__snugFeatureChunksReady === true.
Save a screenshot to the output dir on failure.
```

## 2.2 — Responsive viewport sweep (Desktop / Tablet / Mobile)

```
In ~/workspace/selsocsoc, write tests/responsive-sweep.spec.mjs. For each profile —
desktop {1440,900}, tablet {834,1112}, mobile {390,844} (isMobile:true, hasTouch:true):
1. New context + page, goto AUDIT_URL, run the standard menu flow: .snug-start-screen visible → click
   "Enter Cyclical City" → click "Confirm" → wait .welcome-cinematic → page.evaluate(() => window.__snugFinishWelcome?.())
   → wait for .welcome-cinematic detached → wait for window.__snugWorld?.mode === "village" via waitForFunction (20s).
2. Assert document.documentElement.scrollWidth <= viewport width (no horizontal overflow).
3. Assert every element matching ".play-panel, .style-panel, .tabbar, .room-dock, .voice-toggle-dock" has a
   boundingBox() fully inside the viewport (no clipping off-screen — the standing layout rule: everything must fit,
   nothing may overlap).
4. For each of the 24 minigame cards (open via window.__snugGamesHub.open(), then .games-hub cards), assert the card
   is clickable (not covered by another element: use elementHandle.click({ trial: true })).
5. Screenshot each viewport to selsocsoc-{name}.png.
Fail with the exact selector and viewport that overflowed or got covered.
```

## 2.3 — Overlay non-interference check

```
In ~/workspace/selsocsoc, write tests/overlay-interference.spec.mjs. After reaching town (mode "village"):
1. Open each of these overlays in turn and assert the town canvas still receives input afterwards:
   - the Play tab panel (.play-panel via .tabbar button named "Play"),
   - the photo contest dialog (window.__snugPhotoContest.open()),
   - the seasonal events panel (window.__snugSeasonalEvents.openPanel()),
   - the pet care panel (window.__snugPetCare.open()),
   - the paint panel (.paint-launch button — first teleport near an easel with __DEBUG_GAME__.teleport(11, 8)
     since Paint is proximity-gated within 3.2u).
2. For each overlay: assert it is visible, take its boundingBox, assert it does not cover the center 200×200px of
   the viewport (the tap-to-move zone), then close it (Escape or its close button) and assert it is detached.
3. Assert that after closing all overlays, clicking the canvas center moves the player: read
   JSON.parse(window.render_game_to_text()).player before/after a mouse.click at center and require x or z to change.
```

## 2.4 — Asset manifest cross-check

```
In ~/workspace/selsocsoc, the repo has scripts/validate-assets.mjs and per-folder generate-manifest.mjs scripts
(assets/minigames, assets/furniture, assets/garden-art, assets/environment-props, assets/menu-wallpaper, assets/audio).
Write tests/manifest-sync.spec.mjs that:
1. Runs `npm run validate:assets` as a child process and asserts exit code 0.
2. For each manifest.json found under assets/, fetches every listed file path against AUDIT_URL with page.request.get
   and asserts status 200 — catching the case where the manifest lists a file that was renamed or deleted from disk.
3. Specifically verify the 21 furniture GLBs in assets/furniture/manifest.json (including easel.glb) and the 20 NPC
   accessory GLBs in assets/npc-accessories/ return 200.
Report failures as "manifest lists X but server returned 404".
```

---
---

# VOLUME 3 — CORE GAMEPLAY LOOP & PLAYABILITY AUTOMATION

## 3.1 — Menu → town → movement loop

```
In ~/workspace/selsocsoc, write tests/core-loop.spec.mjs (extend the pattern in scripts/playwright-town-smoke.mjs):
1. Desktop viewport 1440×900. Capture console errors and pageerrors (fail on any, except glCopySubTextureCHROMIUM).
2. Menu phase: assert .snug-start-screen visible; assert the sign-in screen shows the Google button and
   "Continue as guest" link; click Continue as guest → assert Play + Options appear; click Play → assert the 4 mode
   cards appear (town/solo/family/board); click the town card → "Enter Cyclical City" → "Confirm".
3. Welcome phase: wait for .welcome-cinematic visible; click .welcome-help; assert .snug-help-skip visible;
   page.evaluate(() => window.__snugFinishWelcome?.()); wait for .welcome-cinematic detached (5s).
4. Town phase: page.waitForFunction(() => window.__snugRendererStartupMetrics?.townPrepareMs !== null, null, { timeout: 15000 });
   then page.waitForFunction(() => JSON.parse(window.render_game_to_text()).mode === "village", null, { timeout: 20000 }).
5. Movement: record p0 = player from render_game_to_text(); for each key of ["ArrowRight","d","ArrowUp"]:
   keyboard.down(key) → waitForTimeout(650) → keyboard.up(key) → waitForTimeout(200); read p1; break when x or z changed.
   Assert movement happened (notDeepEqual on {x,z}).
6. Assert renderedFrames advanced between two reads 1s apart (renderer is alive).
```

## 3.2 — Tap-to-move and camera

```
In ~/workspace/selsocsoc, write tests/tap-to-move.spec.mjs. After reaching town (reuse the helper from 3.1 —
extract it to tests/helpers/boot-to-town.mjs exporting async function bootToTown(page)):
1. Read player position p0 via render_game_to_text().
2. mouse.click at (viewport.width * 0.7, viewport.height * 0.6) — a ground point away from center.
3. page.waitForFunction(prev => { const p = JSON.parse(window.render_game_to_text()).player;
   return Math.hypot(p.x - prev.x, p.z - prev.z) > 0.5; }, p0, { timeout: 8000 }).
4. Camera: assert window.__snugWorld.camera exists; mouse.wheel(0, -200) to zoom; assert camera position changed;
   drag with mouse.move/down/move/up to rotate; assert camera quaternion changed.
5. Assert nothing blocks the avatar becoming transparent: temporarily teleport the player behind a known prop
   (use __DEBUG_GAME__.teleport near plaza (0,0)) and assert no exception and frames keep advancing.
```

## 3.3 — Gardening loop (plant → water → harvest → cook → eat)

```
In ~/workspace/selsocsoc, write tests/gardening-loop.spec.mjs using the real gardening UI (assets/gardening-system.js).
Do NOT call internal functions directly — drive the DOM:
1. bootToTown(page), then open the garden panel the same way the game does (find its tab/panel trigger in the DOM).
2. Plant a tomato seed (click the seed choice / plot), advance time with window.advanceTime(11*60*1000) (tomato
   takes 10 min), water it via the UI, advance again, then harvest — assert the produce count for tomato increased
   (read it from the panel's inventory strip text or the module state via page.evaluate).
3. Open the kitchen view, click Cook on "Sunny Garden Salad" (needs tomato:2 + carrot:1 — plant/harvest carrots too
   if needed), assert the dish count shows 1 cooked.
4. Click the Eat button for the salad; assert window.__snugMealBuff?.effect === "speed" and until > Date.now().
5. Assert a snug-meal-buff event fired (listen in page.evaluate before clicking).
Timeout protection: every wait uses waitForFunction on the actual UI text (e.g. plot state "ready"), never fixed sleeps,
except the advanceTime jumps.
```

## 3.4 — Fishing loop at the pond

```
In ~/workspace/selsocsoc, write tests/fishing-loop.spec.mjs:
1. bootToTown(page); __DEBUG_GAME__.teleport(-9, 10) — the pond easel spot from assets/world-layout.js, which is at
   the pond.
2. Open the fishing interaction the way the game exposes it (pond UI / Bobby Gill prompt — discover the real trigger
   in the DOM, do not invent one).
3. Attach a page.evaluate listener for the "snug-fishing-loot" event before casting.
4. Cast, wait for the loot event with waitForFunction on a window.__testFishingLoot flag (timeout 30s), assert the
   loot detail contains a fish name and size.
5. Assert the summer fishing tournament tracked it: window.__snugSeasonalEvents stats show the catch counted
   (only meaningful in Summer; use __DEBUG_GAME__.setSeason(1) first).
```

## 3.5 — Minigame end-to-end (Balloon Pop)

```
In ~/workspace/selsocsoc, write tests/minigame-balloon-pop.spec.mjs:
1. bootToTown(page); record shells0 via __DEBUG_GAME__.state().shells.
2. window.__snugGamesHub.open(); wait for the hub panel; click the Balloon Pop card (getByRole button/card with
   accessible name matching /balloon pop/i).
3. page.waitForFunction(() => window.__DEBUG_GAME__.gameState().gameId === "balloon-pop" && window.__DEBUG_GAME__.gameState().phase === "playing", null, { timeout: 15000 }).
4. Play: click every visible balloon target (locator ".balloon" or the real selector — inspect the minigame DOM first)
   for 20 seconds.
5. End the game (its real end button or __DEBUG_GAME__.endGame()); assert shells1 > shells0 and that a
   "snug-award-coins" event with a balloon-pop message was recorded in __DEBUG_GAME__.transactions().
6. Assert no console errors during the whole run.
```

---
---

# VOLUME 4 — VALUE RETURN & REWARD SYSTEM VERIFICATION

## 4.1 — Shell economy round-trip

```
In ~/workspace/selsocsoc, write tests/shell-economy.spec.mjs:
1. bootToTown(page). In page.evaluate, install a recorder: window.__shellLog = []; window.addEventListener("snug-award-coins",
   e => window.__shellLog.push({ amount: e.detail.amount, message: e.detail.message, at: Date.now() })).
2. Read balance0 = await page.evaluate(() => window.__DEBUG_GAME__.state().shells).
3. Trigger three real earning paths (no direct state writes):
   a. Serve a cooked dish: use the gardening kitchen UI to cook + Serve "Sunny Garden Salad" (value 36 shells per RECIPES).
   b. Win a photo contest week: call __DEBUG_GAME__ helpers or the real contest flow to become winner (100 shells).
   c. Complete a barn-raising contribution (assets/barn-raising.js) or sell garden produce to Barnaby.
4. After each, assert __shellLog contains the matching message and amount, and balance increased by exactly that amount.
5. Spend path: buy an autumn decor item from the Harvest Market (window.__snugSeasonalEvents.openPanel(), click a
   30-shell item) and assert balance decreased by exactly 30 and __shellLog has a negative-amount entry.
6. Reload the page; assert the shell balance persisted (localStorage/Firebase round-trip) — document if guest mode is
   intentionally session-only.
```

## 4.2 — UI counters match internal state

```
In ~/workspace/selsocsoc, write tests/counter-sync.spec.mjs:
1. bootToTown(page).
2. Find the visible shell counter in the HUD (inspect the DOM — the element that displays the shell balance).
3. Call __DEBUG_GAME__.addReward(37, "counter-sync-test") and waitForFunction(() => document.querySelector("[HUD shell selector]").textContent.includes("37") || the numeric balance text changed, { timeout: 5000 }).
4. Assert parseInt(counter.textContent) === (await page.evaluate(() => window.__DEBUG_GAME__.state().shells)).
5. Repeat for the garden produce counts: harvest one tomato via the UI and assert the inventory strip number matches
   the module's internal produce.tomato value read via page.evaluate.
6. Repeat for pet stats: feed the cat via __snugPetCare.feed("kibble") and assert the hunger bar width/text in the
   pet panel matches __snugPetCare.pet.hunger.
Any mismatch fails with "UI shows X but state is Y".
```

## 4.3 — Reward persistence across sessions

```
In ~/workspace/selsocsoc, write tests/reward-persistence.spec.mjs:
1. Fresh context (no stored state). bootToTown(page). Earn 25 shells via __DEBUG_GAME__.addReward(25, "persist").
2. Snapshot: await page.evaluate(() => window.__DEBUG_GAME__.storageDump()).
3. Close the page, open a new page in the SAME context, bootToTown again.
4. Assert state().shells equals the post-reward balance (or document the exact reset behavior if guest sessions are
   intentionally ephemeral — the test must encode the intended behavior, not just whatever happens).
5. For signed-in mode: if window.__snugSession exists, assert players/{uid} data includes the updated balance;
   otherwise log "signed-out: localStorage-only path" and assert the snug-* localStorage keys carried the balance.
```

## 4.4 — Minigame payout table verification

```
In ~/workspace/selsocsoc, write tests/payout-table.spec.mjs:
1. In the repo, find every minigame's reward logic (grep "snug-award-coins" across assets/minigames/ and game-show
   files: family-feud-show.js, nosy-neighbors.js, whirl-of-resources.js). Build the expected payout table as a JS
   object in the test file, citing file:line for each.
2. For each of 5 representative minigames (balloon-pop, coin-scramble, pond-fishing, snowball-toss, memory-match):
   launch via __DEBUG_GAME__.launchGame(id), force a win via __DEBUG_GAME__.forceGameOver() or the real win path,
   and assert the awarded amount matches the table.
3. Assert the photo contest winner prize is exactly 100 shells and the seasonal event payouts match the values in
   assets/seasonal-events.js (spring 3/petal + 25 bonus at 20+, summer 20 + 2×biggest, autumn decor prices 30–90,
   winter 15 + hits at 10+).
Any payout not matching its code-cited expectation fails the test.
```

---
---

# VOLUME 5 — AGENTIC SELF-HEALING & LOG DEBUGGING

## 5.1 — Failure triage protocol

```
When any Playwright test in ~/workspace/selsocsoc/tests/ fails, run this exact triage before changing code:
1. Re-run the single failing spec with --trace on and --reporter=line, saving output to /tmp/triage-{name}.log.
2. Read the trace: open the trace.zip's network + console tabs (use `npx playwright show-trace` data or parse
   test-results/). List in order: (a) the last successful expect, (b) the first failing expect with its actual vs
   expected, (c) every console error and pageerror in the 10s before the failure, (d) every request with status >= 400.
3. Cross-reference against THESE known-good anchors — if any anchor is missing, the failure is environmental, not a
   game bug: typeof window.__snugEnsureCoreReady === "function", .snug-start-screen visible within 15s,
   window.__snugRendererStartupMetrics?.townPrepareMs !== null, JSON.parse(window.render_game_to_text()).mode === "village".
   Report which anchor failed and stop — do not "fix" the game for an environment failure.
4. Check for the two most common repo-specific flakes: (a) welcome cinematic timing — the fix is calling
   window.__snugFinishWelcome() via evaluate instead of clicking .snug-help-skip (see scripts/playwright-town-smoke.mjs
   comments); (b) season-dependent tests — the 90s season cycle (Math.floor(Date.now()/90000)%4) means a test asserting
   winter behavior can start in summer; the fix is __DEBUG_GAME__.setSeason() at test start, never a longer wait.
5. Only after 1–4, propose the minimal fix: first the test (selector drift, timing), then the game code. Never change
   game code to satisfy a test that contradicts intended behavior documented in GAMEPLAY-AUDIT.md or MEMORY.md.
Output the triage as a short report: anchor status, failure class (environment/flake/selector-drift/real-bug), and the
one-line fix.
```

## 5.2 — Locator collision resolver

```
When a Playwright test in ~/workspace/selsocsoc fails with "strict mode violation" (multiple elements match), resolve
it using the repo's DOM conventions:
1. Dump all matches: page.locator("{selector}").all() with each element's outerHTML snippet, class list, and
   boundingBox — the repo injects similar buttons into multiple panels (.play-panel, .style-panel, .tabbar), so the
   collision is usually a feature button existing twice (e.g. "Photo Contest" in both .play-panel and a dialog).
2. Disambiguate by nearest stable ancestor, in this priority order: dialog/overlay root > .play-panel > .style-panel >
   .tabbar. Rewrite the locator as page.locator('.play-panel').getByRole("button", { name: "Photo Contest" }) —
   never use nth() unless you comment why the order is stable.
3. If the collision is between the 3D canvas overlay and a DOM button (canvas swallows clicks), assert the canvas is
   NOT the top element at the click point via document.elementFromPoint, and if it is, the fix is in the game CSS
   (pointer-events), not the test.
4. Re-run the spec; if it passes, append the disambiguated locator to tests/LOCATORS.md with the collision noted, so
   future prompts reuse it.
```

## 5.3 — Console-error to code-line mapper

```
When a Playwright run in ~/workspace/selsocsoc reports console errors or pageerrors, map each one to its source:
1. Collect the error text + stack from the trace. For "Uncaught" errors, the stack usually names assets/*.js and a
   line — verify the line against the current file (the repo ships chunk tags; the file may have moved since the error).
2. Classify: (a) Three.js warnings suppressed by assets/renderer-startup.js (THREE.WARNING multiple instances,
   THREE.Clock deprecated) — these are already filtered, ignore; (b) chunk load failure — check the
   script[type="application/x-snug-chunk"][data-src="..."] tag exists in index.html and the file exists on disk;
   (c) Firebase errors when signed out — expected in guest mode, assert window.__snugSession is null and downgrade to
   warning; (d) null-reference in a feature module (e.g. __snugPetCare.pet when no cat adopted) — real bug, fix the
   module's guard.
3. For class (d), write the minimal regression spec first (it must fail), then fix the module, then re-run the full
   tests/ suite. Commit message format: "fix: {module} null-guard — {spec} now passes".
```

---
---

# VOLUME 6 — REFACTORING, OVERHAULS, & NEW FEATURE PROMPTS

## 6.1 — Movement system overhaul (with simultaneous test)

```
In ~/workspace/selsocsoc, overhaul the player movement system (currently keyboard arrows/WASD + tap-to-move driving
window.__snugWorld.player.position, verified via window.render_game_to_text().player):
1. FIRST write tests/movement-v2.spec.mjs capturing the CURRENT contract as regression guardrails — it must pass
   BEFORE you change anything: bootToTown, ArrowRight moves +x, ArrowUp moves -z (or document actual axes from
   render_game_to_text()), tap-to-move relocates the player > 0.5u, renderedFrames keeps advancing, and
   window.__snugWorld.player.position stays within the world bounds from assets/world/default-layout.json.
2. THEN implement the new movement system [DESCRIBE THE NEW SYSTEM HERE]. Keep the exact same external contract:
   window.__snugWorld.player.position.{x,y,z}, render_game_to_text().player shape, and the keyboard events the old
   system listened for.
3. Re-run tests/movement-v2.spec.mjs — it must pass unchanged. If any assertion needs editing, that is a contract
   break: stop and present the diff to the user as options before proceeding (standing dialogue rule).
4. Run the full suite (npm run test:town-smoke + tests/). No push until green.
```

## 6.2 — New feature blueprint (test-first)

```
In ~/workspace/selsocsoc, implement [FEATURE NAME + one-paragraph spec]:
1. Survey the existing module pattern first: read assets/painting-mode.js (IIFE, MutationObserver install,
   window.__snugPaintingMode export) and one recent feature (assets/pet-care.js or assets/photo-contest.js).
   The new file MUST follow it: assets/[feature].js, self-contained IIFE, no imports, guard
   `if (window.__snug[Feature]) return;`, localStorage-first persistence with Firebase players/{uid} upgrade when
   window.__snugSession exists, shells via the "snug-award-coins" CustomEvent, toasts via the game's toast channel.
2. Write the Playwright spec FIRST (tests/[feature].spec.mjs): bootToTown via tests/helpers/boot-to-town.mjs,
   open the feature through its real UI entry point (button injected into .play-panel or .style-panel — assert the
   button exists and is clickable, never call the module API to open it), drive the primary user flow end-to-end,
   and assert the shell/state effects via __DEBUG_GAME__.state(). The spec must FAIL before the feature exists
   (button not found).
3. Implement the feature, wire the chunk tag into index.html after the pet-care chunk, node --check, npm run
   validate:assets.
4. The spec must now pass. Also add the feature's localStorage keys to the Volume 1.4 storageDump() allowlist.
Standing rules apply: no fake/simulated people or activity — start empty, real usage fills it; minimal text in UI;
dialogue presented as options before implementing; his sprites used exactly as supplied.
```

## 6.3 — Multiplayer sync verification harness

```
In ~/workspace/selsocsoc, the multiplayer stack is Firebase-only (Auth, Firestore, RTDB live position sync, Cloud
Functions). Build a two-client sync test:
1. Write tests/multiplayer-sync.spec.mjs using two browser contexts (player A and player B) against AUDIT_URL.
   Both bootToTown and sign in as guests (document whether guest RTDB sync is enabled in
   assets/firebase-realtime-database.rules.json — if not, the test must sign in via the available auth path or be
   marked skip with the reason).
2. Player A moves (keyboard ArrowRight 650ms); player B polls window.__snugWorld for the remote player object
   (find how remote avatars are exposed — likely a peers/avatars map on __snugWorld or an RTDB listener) via
   waitForFunction with a 15s timeout, asserting B sees A's position change.
3. Player A triggers "snug-award-coins" for 10 shells; assert B's shell balance is UNAFFECTED (shells are per-player —
   encode this invariant).
4. Measure sync latency: timestamp when A moves vs when B observes it; log it. Fail if p95 over 10 observations
   exceeds 5s on localhost.
5. On any failure, run the Volume 5.1 triage before touching game code.
```

## 6.4 — Safe large-file refactor (multiplayer.js)

```
assets/multiplayer.js is the largest file in ~/workspace/selsocsoc (weather particles, seasons, leaves, fishing
loot events, shell listeners). Refactor it WITHOUT behavior change:
1. First, extend tests/ to lock the current behavior: season cycle (setSeason + getSeason round-trip for all 4),
   snow in Winter (weatherIndex), leaves in Autumn (the leaf Points object exists in the env), the snug-fishing-loot
   event shape, and the snug-award-coins listener still crediting shells. All must pass BEFORE refactoring.
2. Split into assets/multiplayer-weather.js (particles: rain/snow/leaves, SnugAutumnLeaves, seasonIndex logic),
   assets/multiplayer-fishing.js (pond + snug-fishing-loot), assets/multiplayer-economy.js (snug-award-coins
   listener + shell balance), keeping assets/multiplayer.js as the orchestrator. Preserve every window.__ export name
   and every CustomEvent name exactly — grep the test suite for the names first and assert the count matches after.
3. Re-run the FULL suite plus npm run test:town-smoke. node --check every new file. git commit as one commit with
   message "refactor: split multiplayer.js (no behavior change)" — but do NOT push; present the diff stat to the
   user for review first.
```

---

## Appendix A — Shared test helper (referenced by Volumes 3–4)

```js
// tests/helpers/boot-to-town.mjs
import assert from "node:assert/strict";

export async function bootToTown(page, { timeout = 20000 } = {}) {
  await page.locator(".snug-start-screen").waitFor({ state: "visible", timeout: 15000 });
  await page.getByRole("button", { name: "Enter Cyclical City" }).click();
  await page.getByRole("button", { name: "Confirm" }).click();
  await page.locator(".welcome-cinematic").waitFor({ state: "visible", timeout: 6000 });
  await page.evaluate(() => window.__snugFinishWelcome?.());
  await page.locator(".welcome-cinematic").waitFor({ state: "detached", timeout: 5000 });
  await page.waitForFunction(
    () => window.__snugRendererStartupMetrics?.townPrepareMs !== null,
    null, { timeout }
  );
  await page.waitForFunction(
    () => JSON.parse(window.render_game_to_text()).mode === "village",
    null, { timeout }
  );
}

export function playerState(page) {
  return page.evaluate(() => JSON.parse(window.render_game_to_text()).player);
}
```

## Appendix B — Running the suite

```bash
cd ~/workspace/selsocsoc
AUDIT_URL=http://localhost:8080 npx playwright test tests/ --trace on
npm run test:town-smoke   # the original smoke script (scripts/playwright-town-smoke.mjs)
```

Keep this book in the repo root. When a prompt's anchor (selector, export name, event) drifts, update the book in the same commit as the fix.

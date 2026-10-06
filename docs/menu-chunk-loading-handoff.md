# Menu freeze and chunk-loading handoff

## Summary

The title menu appeared frozen while the browser parsed and initialized the game, including the Three.js world and a large set of optional features. The app could block the main thread for several seconds, especially when WebGL fell back to software rendering.

The updated startup flow now:

1. Renders the title menu in a busy state.
2. Loads the required game and integration scripts in order.
3. Reports core-loading progress in the menu.
4. Enables menu controls only after the core is ready.
5. Loads the remaining feature scripts one at a time during browser idle periods.
6. Recovers instead of permanently disabling the menu when the arrival transition fails or times out.

## Files changed

### `index.html`

- Adds `aria-busy="true"` to the initial title screen.
- Disables title-menu controls until the core-ready event fires.
- Displays `Loading Cyclical City… X/14` while required chunks load.
- Shows a clear refresh message if a required chunk cannot load.
- Adds a 10-second timeout and error recovery to the arrival transition.
- Replaces eagerly executed feature `<script>` tags with inert chunk descriptors.
- Adds the `snug-chunk-loader`, which controls ordered core loading and idle feature loading.

### `assets/mailbox-home.js`

Corrects the dynamic loader import from:

```js
./assets/vendor/three/GLTFLoader.js
```

to:

```js
./vendor/three/GLTFLoader.js
```

### `assets/whirl-of-resources.js`

Applies the same `GLTFLoader.js` path correction.

## Loading architecture

Scripts are declared with inert descriptors rather than executable `src` attributes:

```html
<script
  type="application/x-snug-chunk"
  data-snug-phase="core"
  data-src="assets/selfie-social-society-app.bundle.js">
</script>
```

The loader discovers these descriptors and divides them into two phases.

### Core phase

The following scripts load sequentially and in document order:

1. `selfie-social-society-app.bundle.js`
2. `selfie-social-society-addons.bundle.js`
3. `selfie-social-society-welcome.bundle.js`
4. `world-direction-pass.js`

The required phase also includes the outfit/accessory and emote integrations,
NPC outfits, tutorial, Games Hub, town directory, storyline, and party-night
upgrade. Keeping these modules in the required phase prevents immediate menu
entry from racing Party Setup or entering town before its navigation and quest
systems have registered.

The loader yields to the browser between core scripts and emits:

- `snug-core-progress` after each successful chunk
- `snug-core-ready` after all required chunks load
- `snug-core-error` if a required chunk fails

The menu listens for these events and remains non-interactive until `snug-core-ready`.

### Feature phase

There are 26 optional feature chunks. They preserve their existing document order and load individually after the core phase. Between scripts, the loader uses `requestIdleCallback` with a timeout, falling back to a short timer when idle callbacks are unavailable.

An optional chunk failure is logged but does not prevent later feature chunks from loading. When the queue completes, the loader sets `window.__snugFeatureChunksReady` and emits `snug-feature-chunks-ready`.

### Runtime diagnostics

The loader exposes:

```js
window.__snugCoreReady
window.__snugFeatureChunksReady
window.__snugChunkLoader
```

Loaded script elements also receive `data-snug-loaded-chunk="core"` or `"feature"`, which makes the active loading state inspectable in browser developer tools.

## Arrival-transition recovery

Previously, selecting a mode disabled every menu button and waited indefinitely for `window.__snugArrivalIntro()`.

The transition now races the arrival promise against a 10-second timeout. On failure it:

- logs the underlying error;
- re-enables menu controls; and
- displays `The town took too long to open. Please try again.`

## Validation performed

- `npm run validate:assets`
  - Passed with 279 referenced files and 60 texture IDs.
- `git diff --check`
  - Passed.
- Local HTTP validation
  - Corrected `GLTFLoader.js` URL returned HTTP 200.
- Headless Chromium interaction
  - Menu remained disabled while core loading was incomplete.
  - Progress reached 4/4.
  - Controls enabled after the core-ready event.
  - The Cyclical City confirmation dialog opened.
  - Confirming removed the start screen and entered the town flow.
  - Optional feature chunks continued loading after entry.
  - No JavaScript exception occurred in the tested menu transition.

Headless Chromium used software WebGL and continued to report GPU texture warnings. Those warnings are separate from the chunk-loader control flow.

## Known limitation

The main application bundle is approximately 1.46 MB and remains a single prebuilt file. Chunk loading prevents all optional systems from executing during initial startup and gives the browser scheduling opportunities between files, but it cannot split a long task inside that bundle.

Further improvement requires the original application source and bundler configuration. Recommended follow-up work:

1. Split the main bundle at route or feature boundaries in the source build.
2. Delay creation of the Three.js world until core UI initialization is complete.
3. Move menu-only rendering into a small entry bundle.
4. Load town, multiplayer, portrait, and minigame systems through dynamic imports.
5. Profile on a physical low-end mobile device with hardware WebGL.

## Maintenance guidance

- Add new scripts as `data-snug-phase="feature"` unless the title-to-town path cannot work without them.
- Keep the core list minimal; every core chunk delays menu readiness.
- Preserve descriptor order when one script depends on another.
- Do not make optional chunk failures fatal unless the feature is required to enter the game.
- Test both a normal successful load and a failed core request when changing the loader.

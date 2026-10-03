# Performance Systems — Draw Distance, LOD & Boot Hygiene

**Status:** SHIPPED (2026-10-03)

## What it is

A set of runtime performance systems that keep the Cyclical City 3D village
smooth on phones without changing how the game looks up close.

## Part 1 — Draw distance & LOD (`assets/world-lod.js`)

Runs once the village world is ready (`snug-world-ready`):

- **Far plane alignment:** camera far reduced 180 → 120, just past the fog end
  (fog 36 → 112). The old 180 range drew a fully-fogged band for nothing.
- **THREE.LOD for decorative buildings:** expansion cottages and the town hall
  are wrapped in real `THREE.LOD` objects — full detail up close, and past
  55 units a simplified level (toon outlines and small detail meshes hidden,
  shadows off). Fog masks the transition.
- **Draw-distance culling:** scenery (trees, plants, grass, flowers, bushes,
  clouds, lanterns, decor, rocks, fences) beyond 105 units (85 on mobile) is
  hidden; per-instance culling for the instanced tree rings. Never touches
  NPCs, the player, the mailbox, gardens, houses, or anything interactive —
  and it only ever hides what it hid itself, so it can't fight other systems.
- **Shadow LOD:** meshes stop casting shadows past 60 units (distant shadows
  are invisible under fog anyway) — this shrinks the shadow-map pass a lot.
- **Mobile shadows:** on touch devices / small screens, directional-light
  shadow maps drop to 1024px.

## Part 2 — Companion systems (from the freeze audits)

- **Observer/interval throttling:** background intervals now skip work while
  the tab is hidden (`outfit-textures` 600ms → 2000ms; `accessory-tinting`,
  `mailbox` poll + dock, `snug-audio` monitor + footsteps). The tinting
  full-subtree observer disconnects when idle with no Style menu and
  re-attaches on the next tap/keypress.
- **Lazy feature scripts (`assets/lazy-features.js`):** painting-mode,
  family-feud-show, and nosy-neighbors no longer execute during boot. They
  load on first user gesture or idle; a click that lands before its script
  finishes is held and replayed so nothing is lost. Public APIs unchanged;
  a missed `snug-session` event is re-dispatched after load.
- **modal-interaction-guard failsafe:** if `snug-welcome-active` sticks on
  `<html>` for 30s with no `.welcome-cinematic` in the DOM, the class is
  removed (it would otherwise swallow every tap).

## Follow-ups

- On-device check: distant LOD popping (should be fog-masked), shadow quality
  on phones, lazy scripts opening correctly on first tap.
- Deeper: code-split the 3.2MB of deferred bundles; per-object LOD for
  string-light runs; consider `THREE.LOD` for dense garden plots.

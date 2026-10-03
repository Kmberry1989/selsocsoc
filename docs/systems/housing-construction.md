# Housing Construction & Renovation

**Status:** SHIPPED (2026-10-03)

## What it is

Peggy Plank's construction counter: the player's home in Cyclical City grows
from a 6×6 starter cottage through a seven-step unlock ladder — wall
push-outs, room dividers, fences, a second and third story, porch and balcony,
roof styles, full exterior renovation, and a prestige widow's walk with cupola.
A blueprint editor lets players draw floor plans, check them with Peggy, save
up to 5 plans, and share them with friends through the mailbox.

## How it works for the player

- A "Build" dock button (and tapping the 3D house) opens Peggy's counter with
  tabs: Home, Expand, Rooms, Stories, Exterior, Plans, Mill.
- **Homestead level** (1–50, XP from every build action) gates the ladder:
  cottage (1) → wall push-outs + flooring (3) → dividers + fences (6) →
  second story (10, Peggy's commission) → porch & balcony (14) →
  third story (25) → widow's walk + cupola (35, prestige).
- **Expand:** buy 2-tile lot strips per side from the town office; cost scales
  with strips owned. **Rooms:** 2D floor plan with draggable dividers (rooms
  are implied by furniture, never labeled), free doors on outer walls, flooring
  swaps per room with old flooring kept in storage. **Stories:** staircase
  placement, then new stories; Peggy's commission must be accepted before the
  second story. **Exterior:** siding, trim, shutters, porch, awning, balcony,
  fence styles/segments, and a yard gate that stands open for visitors.
- **Economy:** builds cost shells + lumber. Lumber comes from the mill (buy
  with shells) and from Homestead level-ups. No timers destroy progress; no
  premium-only walls; no real-money fast-forward on structural builds.
- **Blueprints:** 12×12 grid editor (pointer + keyboard: arrows move, W wall,
  E erase, D door, S stairs), Peggy validates (floating walls, missing door)
  in her voice (rate 1.02, pitch 0.78), 3D preview, save/apply/delete, and
  sharing: a plan becomes a `blueprint-<slug>-<uid>-<code>` inventory item,
  sent through the normal mailbox gift flow; the receiver's module reads the
  sender's public player doc and imports the plan into a free slot.
- Completing the second story dispatches `snug-house-renovation`
  `{stories: 2}` — the mailbox's Master Builder stamp listener was already
  waiting for exactly this event.

## Key code files

- `assets/housing-construction.js` + `assets/housing-construction.css` —
  the whole system (data, UI, 3D house, blueprint editor, sharing).
  `window.__snugHousingTest` exposes the pure logic for testing.
- `index.html` — loads both files after the Whirl of Resources assets.

## Where state lives

- Firestore `players/{uid}.housing` — level/xp/lumber, stories, footprint,
  strips, flooring + storage, dividers, doors, stairs, roof, exterior, fences,
  blueprints (max 5), shared plans (max 20), Peggy's quest flags.
- The visible 3D house is the `SnugPlayerHouse` group in the village scene,
  rebuilt from a data signature (same pattern as the gardening plots).

## NPCs involved

- **Peggy Plank** (bridge foreman): runs the counter, offers the second-story
  commission at Homestead level 10, validates blueprints, cheers completions.
  Her roster voice settings (rate 1.02, pitch 0.78) are used for speech; her
  canon lines and character are unchanged.

## Known limitations / follow-ups

- **Barn raising (deferred):** the design doc's co-op tap events need a live
  RTDB write layer for build sessions plus published rules; fair play needs a
  two-device session. Documented here as the next social extension.
- Interior rendering (dividers/doors/flooring) lives in the module's 2D floor
  plan; the bundled home interior UI was not modified.
- Needs an on-phone check: blueprint editor feel, expansion visuals from the
  street, Peggy's speech on mobile Safari, blueprint gift receive flow.

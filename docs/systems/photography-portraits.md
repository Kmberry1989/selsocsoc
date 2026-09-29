# Photography & Portraits (Lyla Lens)

**Status:** SHIPPED

## What it is

The signature selfie system: players photograph their own face for nine expressions, which are packed into a per-player texture atlas and applied to their avatar (switched via UV offset, auto-applied by game situation). **Lyla Lens**, the newspaper photographer, runs it as a guided appointment.

## How it works for the player

- **Lyla Lens guided live-camera flow** (party-night upgrade): camera permission dialog with denial fallback, countdown, immediate preview, **Retake**, and **Keep & continue**.
- **Equal Choose-photo path**: upload instead of camera, with the same appointment shape.
- **Appointment progress** persists across the nine expressions; a **contact sheet** shows the set; per-expression replace, automatic-expression toggle, and complete-set deletion are supported.
- **Direct editing**: drag to position, wheel/pinch to scale, with advanced controls behind Fine tune.
- Versioned local portrait-set metadata tracks crop transforms, completion, confirmation, and sharing state. Raw camera frames are not persisted by the upgrade layer.
- Sharing is opt-in with a toggle to hide: only the cropped face image is ever shared — never the full raw camera photo.

## Key code files

- `assets/party-night-upgrade.js` — the Lyla Lens camera/appointment flow, the central `SnugExpressions` event API (priority, duration, cooldown categories, procedural fallback, deterministic state reporting), and the deterministic hooks `window.render_game_to_text()` and `window.advanceTime(ms)`.
- `assets/party-night-upgrade.css` — appointment/camera dialog styling.
- `assets/welcome-committee/` — named placeholders for Mayor Mayor, Gideon, and Penny Press (onboarding photography).
- `index.html` loads the party-night-upgrade files after `assets/icons/icon-system.js`.

## Where state lives

- Local: versioned portrait-set metadata (nine records) in the browser.
- Cloud: portrait/expression data rides the standard player save; sharing state is per-player.

## NPCs involved

- **Lyla Lens** — Newspaper photographer; hosts the portrait appointment.

## Known limitations

A real-device pass is still required for iOS rotation and permission UX (docs/PARTY_NIGHT_AUDIT.md). The audit also wishes for nine bespoke Lyla example poses (`assets/portraits/lyla-prompts/*.webp`) — not yet authored.

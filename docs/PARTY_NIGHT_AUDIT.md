# Selfie Social Society — Party Night Audit

Date: 2026-09-24
Scope: local checkout only; no production deployment, authenticated Firebase session, physical camera, or true two-user session was used.

## Executive readout

The product already has an unusually strong identity: a cozy social town, a photo-faced avatar, and a large activity catalog. The biggest product risk is not lack of ideas; it is that the title, town, Style, room, board, and minigame layers can feel like separate products. This pass establishes Party Setup, a central expression-event API, a guided Lyla Lens layer, deterministic inspection hooks, a configurable board loop, and Market Basket Mayhem as a featured activity.

The best next investment is depth and authored presentation: eight games should receive bespoke arenas and input teaching, while Snug Board should gain a true route-choice interaction rather than adding more prototypes.

## Audit matrix

| Area | Current evidence | Assessment | Follow-up priority |
| --- | --- | --- | --- |
| Opening flow | Browser accessibility capture exposed six clear entry actions; source inspection found confirmation and restore paths. | Clear choices, but the mode transitions are split between the start overlay and later panels. The new mode inspector makes state observable; a full router remains future architecture work. | High |
| Town exploration | Three.js world, town services, home, shops, journal, avatar, and weather systems are present in the main bundle. | Strong breadth and charm; costly to validate because much of the implementation is a large generated bundle. | Medium |
| Style and portraits | Existing nine-expression atlas, per-expression upload, crop sliders, local/cloud fallback, and sharing control. This pass adds equal camera/upload entry, privacy copy, progress, direct editing, manager controls, and contact sheet. | Signature feature now has an understandable appointment shape. A real-device pass is still required for iOS rotation and permission UX. | Critical |
| Lyla Lens | Existing guided text/upload sequence plus this pass's live camera dialog and expression prompts. | Lyla now behaves like a host rather than a shortcut. Bespoke example portraits/poses would improve comprehension. | High |
| Home | Existing world service and navigation found in source. | Preserve as cozy-world payoff; avoid placing party-critical settings here. | Low |
| Journal/economy | Shell awards, achievements, shop purchases, and board coins exist. Expression events now react to economy/achievement events. | Systems are connected, but board-to-Party-Passport statistics need a dedicated visible summary. | Medium |
| Solo Practice | Large practice catalog and local game starts are implemented. Market Basket Mayhem joins the shared challenge set. | Separate featured games from prototypes more aggressively in the UI. | High |
| Multiplayer | Append-style room/minigame/board events and local fallback exist. | Good shared-reducer direction. This pass did not prove Firebase authorization or concurrent clients. | Critical before release |
| Snug Board | 2–4 seats, bots, items, events, coins, minigame rounds, bonuses, and local/Firebase event paths exist. This pass adds 5/10/15 rounds, rule styles, bot difficulty, and a relocating prize. | Credible board loop. Route branching is still visual/system design debt and should be the next board mechanic. | High |
| Featured minigames | Many activities share a challenge overlay; a few have more bespoke implementations. | Breadth is high, but shared-overlay games do not yet meet the bar of eight distinct polished games. | High |
| Mobile layout | Existing responsive CSS plus new edge-to-edge mobile setup/camera dialogs and touch-safe direct crop surface. | Structural mobile support exists. Real phone camera, orientation, safe-area, and simultaneous touch remain unverified. | Critical |
| Accessibility | Labels, dialog roles, status regions, reduced-motion styling, and keyboard-addressable native controls are present. | Good foundation. Focus trapping/restoration and full screen-reader announcements need browser proof. | High |
| Performance | Build is static and dependency-light at runtime, but the main generated bundle and 3D asset loading are large. | Add asset budgets and lazy-load portrait/party modules in a future pass. | Medium |
| Offline states | Guest/local board path, local portrait metadata, and camera/upload fallback are present. | Local play is structurally supported; offline Firebase transitions need a controlled network test. | High |

## Implemented in this pass

- Lyla Lens guided live-camera flow with camera-denial fallback, countdown, immediate preview, Retake, and Keep & continue.
- Equal Choose photo path, persistent appointment progress, contact sheet, replace-by-expression behavior, automatic-expression toggle, and complete-set deletion.
- Direct drag positioning and wheel scaling, with advanced controls behind Fine tune.
- Versioned local portrait-set metadata for nine records, crop transforms, completion, confirmation, and sharing state. Raw camera frames are not persisted by the upgrade layer.
- Central `SnugExpressions` event API with priority, duration, cooldown categories, procedural fallback, and deterministic state reporting.
- Party Setup with 2–4-player lobby support already in the board, plus 5/10/15 rounds, Casual/Strategic rules, and three bot difficulties.
- Relocating prize-star destination and difficulty-aware bot pace/scores.
- Market Basket Mayhem in the shared game catalog and challenge contract.
- `window.render_game_to_text()` mode/expression/party/portrait output and deterministic `window.advanceTime(ms)` forwarding.

## Verification evidence and limitations

- `node --check` passed for both modified JavaScript files.
- `npm run build` passed: cosmetics, audio, wallpaper, environment, and minigame manifest generators completed.
- `git diff --check` passed.
- The in-app browser accessibility tree confirmed the title screen and its six entry controls.
- The required generic Playwright game client was run. Its Three.js canvas capture did not complete, and the in-app browser later stalled on the same CDP/WebGL surface. Therefore there is no honest screenshot claim for the new dialogs in this report.
- Live camera capture, real mobile rotation, Firebase-unavailable recovery, true two-user visibility, complete 5/10-round playthroughs, and all-game keyboard/pointer/touch playthroughs remain unverified and must not be treated as passed.

## Exact asset wish list

- `assets/portraits/lyla-prompts/calm.webp` through `side-eye.webp`: nine Lyla example poses.
- `assets/minigames/market-basket-mayhem/market-stall.glb`: compact arena shell.
- `assets/minigames/market-basket-mayhem/shopping-basket.glb`: carried basket prop.
- `assets/minigames/market-basket-mayhem/items.webp`: readable grocery-item sprite atlas.
- `assets/minigames/market-basket-mayhem/checkout.glb`: visible finish target.
- `assets/audio/sfx/camera-countdown.wav`, `camera-shutter.wav`, `portrait-keep.wav`: appointment feedback.
- `assets/audio/sfx/prize-move.wav`, `bonus-reveal.wav`: board spectacle.

Existing CSS shapes, icons, and town props remain usable fallbacks until these assets exist.

## Recommended next product ideas

1. **Town Favor routes:** at junctions, choose between a safe neighborhood path and a shorter event-heavy market path.
2. **Lyla's Party Album:** after a match, save a local contact sheet of the funniest triggered expressions; exporting remains explicit.
3. **Neighbor Duos:** occasional cooperative 2-v-2 games that remix friendships without harsh sabotage.
4. **Last Call:** late-night final rounds change lighting, music, and event odds, making longer parties feel authored.
5. **Passport stamps:** cosmetic board borders and dice skins unlocked from existing journal goals, never a new currency.

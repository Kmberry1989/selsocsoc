# Gameplay and Asset Audit

Date: 2026-09-27

## Asset migration

- Replaced 68 runtime PNG files with explicit WebP references: 47 environment/material textures, 14 inventory items, and 7 world sprites.
- Those files fell from 20,629,083 bytes to 2,725,074 bytes, saving 17,904,009 bytes (86.8%).
- Kept the small sprite PNGs and `painted-pastel-tunic.png` because equivalent WebP files were larger. The peg-body UV template and canvas-generated PNG downloads remain PNG intentionally.
- Moved the supplied staging art into `textures`, `garden-art`, `painting-art`, `fishing-art`, and the existing sprite catalog. Stable gameplay IDs and save keys were not renamed.
- Added `artwork-manifest.json` for supplied artwork and expanded the texture manifest with flooring, carpet, wallpaper, fabric, and metal entries.
- Added crop/seed/tool art to gardening, painting-tool art to Painting Studio, shell art to fishing rewards, and compatible plants/trees/rocks/fences to the billboard catalog.
- Representative opaque, transparent, repeating, inventory, and supplied-art files were visually inspected. No WebP halos, clipped alpha, obvious color shift, or illegible details were found.

## Fixed issues

### Town Hall onboarding allowed background activation

Reproduced before the fix: a hidden `Play` control could open Lantern Dash while the welcoming committee was still modal. The modal now marks the primary application shell inert and captures pointer/click/touch events that originate outside the welcoming ceremony. A fresh-browser retest kept the onboarding active when the exposed Town Life control was clicked and did not open a background sheet.

### Asset paths and format assumptions

Updated texture, billboard, inventory, bundled menu/world, and outfit pipeline references to accept or explicitly use WebP. The new validator catches missing referenced files, duplicate texture IDs, unsupported manifest formats, and unexpected large/runtime PNG additions.

## Interaction audit

### Confirmed locally

- Entry screen, mode selection, confirmation, world load, and Town Hall onboarding render and respond in a fresh Chrome session.
- Onboarding pointer isolation was tested against a background Town Life control after the fix.
- The world scene, camera controls, Town Life, mailbox, garden, and Painting Studio entry controls render after world load.
- Production generation and every first-party JavaScript file touched by this change pass syntax/build validation.
- Initial local load showed no failed local asset requests during the confirmed entry/onboarding path.

### Source/static review

- Reviewed the click and close/back wiring for Play, Home, Style, shop, profile, chat, mailbox, garden, Painting Studio, inventory, pause/help, and minigame surfaces.
- Save compatibility is preserved because asset, inventory, crop, and customization IDs were left unchanged.
- Optional supplied art remains additive; current procedural/CSS fallback visuals remain available.

## Remaining risks and follow-up QA

- The automated Playwright harness cannot reliably click the continuously animated start control in this build: it times out waiting for the element to become stable, including when forced. Native Chrome interaction succeeds. Phone-width and touch QA should therefore be repeated manually on a real device or after adding a deterministic test-mode animation switch.
- Complete Play/start/finish timing, fishing catches, purchases, inventory mutations, home save/reload, and every minigame exit were not destructively exercised in this pass. Their controls and asset paths were inspected, but state-changing outcomes remain follow-up QA.
- Firebase-backed presence, chat, mailbox delivery, authentication, and genuine two-user behavior require a live two-client session and were not claimed as locally proven.
- The supplied home materials are registered and available to runtime manifest consumers; the current bundled home UI has hard-coded selections, so they were not forced into saved customization choices without an ID-safe UI migration.

## Verification record

- `npm run build` — passed.
- `npm run validate:assets` — passed: 182 referenced files and 60 texture IDs.
- `node --check` — passed for gardening, inventory, plant billboards, onboarding guard, and the validator.
- Fresh Chrome entry/onboarding/manual pointer-isolation retest — passed.
- WebP sample review — passed for grass, transparent cloud, inventory lantern, tomato crop, and supplied material art.


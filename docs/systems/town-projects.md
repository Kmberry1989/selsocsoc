# Town Projects (Moonlight Footbridge)

**Status:** SHIPPED

## What it is

Co-operative town projects: shared build efforts the whole town contributes to. The flagship project is the **Moonlight Footbridge**.

## How it works for the player

- The footbridge is a communal construction goal — players contribute toward completing it together as a town.
- It is referenced in the game bundles as a live town project.

## Key code files

- Bundled app code — town project state and contribution flow (footbridge references in `assets/selfie-social-society-addons.bundle.js`).

## Where state lives

Project state is shared town state; contributions fold into the player save. Exact collection/path layout for project contributions is unverified in the reviewed code — see `multiplayer-architecture.md` for the general data-layout pattern.

## NPCs involved

- **Peggy Plank** — Bridge foreman. Currently present in the NPC roster; the project itself is live in game code.

## Known limitations

The contribution mechanics and shared progress display were not deeply verified in this pass; the project exists as a live system but its full loop deserves a live check.

# Selfie Social Society — Authoring Tools

These companion tools are for the game's author. They live in this repo so they
share the game's `assets/` folders: adding or updating an asset updates it
everywhere at once.

- `render-studio/` — Render Studio: pose and photograph the player avatar and NPCs.
- `outfit-painter/` — Outfit Painter: paint outfit textures on the in-game avatar.
- `world-editor/` — World Editor: edit the town layout (self-contained).
- `object-creator/` — Object Creator: build objects from primitives (self-contained).

Render Studio and Outfit Painter load the game's shared assets via `../../assets/`.
World Editor and Object Creator keep their own `assets/` folders.

These tools are not part of the public game deployment (see `.vercelignore`).

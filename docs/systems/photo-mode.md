# Photo Mode

**Status:** SHIPPED

## What it is

A photo mode that holds the whole world still so players can stage shots: poses, camera controls, and PNG capture.

## How it works for the player

- "Hold the whole world still": freezing the scene for a staged photograph.
- Poses and camera controls for framing the shot.
- Captures a PNG of the staged scene.

## Key code files

- `assets/town-life.js` — the photo-mode UI and capture flow ("Photo mode" entry, close/exit control).

## Where state lives

Captures are local PNG downloads; nothing persists server-side.

## NPCs involved

None — it's a player camera tool.

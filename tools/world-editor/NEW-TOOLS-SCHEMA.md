# World Editor — New Data Schemas

These three data layers are exported in `layout.json` by the World Editor.
The game does not yet consume them — this document defines the schemas
for game-side hookup.

## 1. Biome Paint (`layout.biomePaint`)

Forward-compatible layer for painted biome blends. The game's current
biomes are hardcoded in `assets/world-direction-pass.js` (`buildBiomes`);
painted dabs use the same biome names so the game can adopt them.

```json
"biomePaint": [
  {
    "x": 10.5,        // meters, east (matches layout axes)
    "z": -3.2,        // meters, south
    "radius": 2.5,    // brush dab radius in meters
    "biome": "Clover Commons",  // one of: "Clover Commons", "Whispering Wood", "Sunmeadow", "Pondmarsh"
    "strength": 0.8   // 0.1–1.0, blend opacity
  }
]
```

**Game hookup needed:** Rasterize dabs into the biome texture layer, or
convert to the existing `[x, z, size, colors, motif, label]` spec format.
Overlapping dabs of different biomes should blend by strength.

## 2. NPC Patrol Paths (`layout.npcPaths`)

Named waypoint routes assigned to NPC types.

```json
"npcPaths": [
  {
    "id": "path-01",           // unique ID
    "name": "Mayor's Rounds",  // display name
    "npc": "Mayor Mayor",      // NPC name (must match game's NPC roster)
    "loop": true,              // true = closed loop, false = ping-pong
    "waypoints": [
      {"x": 0, "z": 0},
      {"x": 10, "z": 5},
      {"x": 5, "z": 12}
    ]
  }
]
```

**Game hookup needed:** NPC system should read `npcPaths`, match `npc`
to the roster, and move the NPC along waypoints (lerp between points,
pause briefly at each). If `loop` is true, wrap from last to first.

## 3. Trigger Zones (`layout.triggerZones`)

Named zones that fire events when the player enters.

```json
"triggerZones": [
  {
    "id": "zone-01",
    "name": "Gate Welcome",
    "shape": "rect",           // "rect" or "circle"
    "x": 0, "z": 0,            // center in meters
    "width": 10, "depth": 8,   // rect only
    "radius": 5,               // circle only
    "event": "dialogue",       // "dialogue" | "quest" | "sound" | "camera"
    "config": {
      // dialogue:
      "speaker": "Gideon",
      "text": "Welcome to Cyclical City!"
      // quest: {"questId": "find-the-gate"}
      // sound: {"soundId": "fanfare"}
      // camera: {"cue": "pan-to-town-hall"}
    }
  }
]
```

**Game hookup needed:** On player position update, check zone bounds
(point-in-rect or distance < radius). On enter (edge-triggered, not
continuous), dispatch the event:
- `dialogue`: show NPC dialogue with `speaker` and `text`
- `quest`: trigger quest `questId` in Dottie Daly's system
- `sound`: play sound effect `soundId`
- `camera`: play camera cue `cue`

Zones should be one-shot per session unless configured otherwise
(future: add `"repeat": true` to config).

# Cyclical City world layout

`default-layout.json` is the reference snapshot of every current building, tree, prop, NPC spawn, lantern post, string-light run, pond, gate, and minigame anchor in the shipped town. `layout.json` is the deploy-time override the game reads when it starts.

## Workflow

1. Open `default-layout.json` in the World Editor.
2. Move, rotate, duplicate, or remove entries there.
3. Export the result as `layout.json`.
4. Drop that exported file into `assets/world/`, replacing the existing `layout.json`.
5. Redeploy Selfie Social Society.

In short: **edit in World Editor → export `layout.json` → drop it into `assets/world/` → redeploy**.

The game treats the override as partial. Objects omitted from `layout.json` keep their shipped defaults. Unknown IDs are ignored with a console warning. A missing or invalid override silently leaves the hardcoded/default town intact. Edited positions are clamped to the walkable world bounds: x from -36 to 36 meters and z from -34 to 34 meters.

## Coordinates and transforms

- `x`: east/west in meters; positive values are east.
- `z`: north/south in meters; positive values are south.
- `y`: vertical offset in meters; positive values are up.
- `rotY`: degrees clockwise when viewed from above. `0` keeps the object's default facing.
- `scale`: uniform scale relative to the shipped object.
- `props`: type-specific data. Unrecognized keys are preserved by the editor and ignored by the game.

Every object must have a unique `id`. Keep IDs from `default-layout.json` when moving shipped objects: the game uses those IDs to attach the override to the existing model, collision shape, and interaction behavior.

String-light `props.points` are local `[x, z]` offsets from the run's own `x` and `z`. `props.height` is the cable height in meters and `props.bulbs` is the shipped bulb count. NPC names in `npc-spawn.props.npc` are exact and case-sensitive.

## Canonical type IDs

- `building-cottage`
- `building-town-hall`
- `building-shop-stall`
- `gate`
- `pond`
- `tree`
- `pine-tree`
- `flower-patch`
- `grass-tuft`
- `lantern-post`
- `string-light-run`
- `bench`
- `fence`
- `npc-spawn`
- `minigame-anchor`
- `checkpoint-gate`

Canonical NPC names are: Mayor Mayor, Gideon, Lyla Lens, Chip Chance, Barnaby Bargain, Pip Parade, Agnes Alley, Dottie Daly, Peggy Plank, Mr. Buck Coinsworth, Fern Bramble, Stanley Stamp, and Bobby Gill.

## Selfie Social Society additions

The shipped default file also uses these game-specific type IDs. The World Editor preserves unknown types as generic markers, so these remain safe to move and export:

- `building-pavilion`: the east festival pavilion.
- `rock-cluster`: the plaza rock prop.
- `bush`: the round plaza bush.
- `garden-plot`: a community-garden bed.
- `district-marker`: an outskirts wayfinding marker.
- `sign`: the community-garden sign.

Some `props` in `default-layout.json` (such as `source`, `instanceIndex`, and `meshIndex`) document how repeated or instanced scenery maps back to the running game. Preserve them when editing by hand.

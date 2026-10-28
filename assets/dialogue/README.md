# Dialogue packs

Dialogue Scripter exports a JSON pack. Drop it here as
`assets/dialogue/<packId>.json`, then open the game with:

- `?dialogue=<packId>` — plays the pack's first scene
- `?dialogue=<packId>:<sceneId>` — plays one scene

Or from game code: `window.__snugDialoguePlayer.playFile('<packId>')`.

Format (the editor's export): `{scenes:[{id,title,location,
nodes:[{id,speaker,line,emotion,animation,condition,advance,next,
choices:[{label,next,condition}]}]}]}`.

v1 notes: conditions are not evaluated — every branch is offered.
Animation and audio cues are carried in the data but not performed.
Playback ends with a `snug-dialogue-complete` event.

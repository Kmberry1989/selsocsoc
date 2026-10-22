# Cinematics

Drop Cinematic Studio sequence JSON files here, one per file:
`<id>.sequence.json` (schema `selsocsoc.cinematic.v1`).

Play one in town with:

```js
window.__snugCinematicPlayer.playFile('<id>')
```

or by opening the game with `?cine=<id>`.

The player stages the sequence in an overlay scene with roster-style
figures (floating coin heads, painted faces, wraparound outfits from the
live NPC manifest), the studio's 8 poses, camera keys, lighting keys, and
dialogue subtitles. Input locks during playback unless the sequence sets
`playback.nonInteractive` to false; Skip and Esc end playback early and
return control.

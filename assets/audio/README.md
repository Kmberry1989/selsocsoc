# Snug Society audio drop-in guide

The included WAV files are lightweight placeholder music and sound effects. The music uses relaxed tempos and longer, changing phrases so each environment can breathe before the loop returns. Replace them with your own audio before release.

## Music

Put looping environment tracks in `assets/audio/music/` using these filenames:

- `title-screen.wav`
- `plaza.wav`
- `board-game.wav`
- `minigames.wav`
- `shops.wav`
- `home.wav`

Music loops automatically and crossfades when the environment changes. Trim silence from the start and end so the loop joins cleanly.

## Sound effects

Put one-shot effects in `assets/audio/sfx/` using these filenames:

- `ui-click.wav`
- `ui-select.wav`
- `dice-roll.wav`
- `coin-pickup.wav`
- `win.wav`
- `footsteps.wav`
- `ready.wav`
- `game-start.wav`
- `shop-buy.wav`
- `bot-turn.wav`

## Supported formats and naming

WAV is the safest replacement format. MP3, OGG, and M4A are also discovered by the build script, subject to browser support. Use lowercase filenames with hyphens and no spaces. The filename without its extension becomes the audio ID, so keep the canonical names above for game-triggered tracks and effects. A new file with a new name is included in the manifest automatically, but it plays only after code calls that ID.

After adding or replacing files, commit and push. Vercel runs `npm run build`, which regenerates `assets/audio/manifest.json`. Music and sound-effect toggles remain available in Pause & help during play.

# Selfie Social Society audio drop-in guide

Music files remain the environment soundtrack. Sound effects now default to the procedural Web Audio engine in `assets/snug-audio.js`, so the game has a complete SFX set even when `assets/audio/sfx/` is empty.

## Music

Put looping environment tracks in `assets/audio/music/` using these filenames:

- `title-screen.wav`
- `plaza.wav`
- `board-game.wav`
- `minigames.wav`
- `shops.wav`
- `home.wav`

Music loops automatically and crossfades when the environment changes. Trim silence from the start and end so the loop joins cleanly.

## Custom sound effects

A file in `assets/audio/sfx/` takes priority over the procedural version with the same ID. Use these canonical filenames to replace individual synthesized sounds:

- `ui-tap.wav`
- `ui-confirm.wav`
- `ui-back.wav`
- `coin-collect.wav`
- `coin-payout-shower.wav`
- `minigame-win.wav`
- `minigame-lose.wav`
- `countdown-beep.wav`
- `countdown-go.wav`
- `achievement-unlock.wav`
- `dialogue-blip.wav`
- `error.wav`

Character-emote replacements:

- `emote-laugh.wav`
- `emote-grunt.wav`
- `emote-confusion.wav`
- `emote-question.wav`
- `emote-excitement.wav`
- `emote-cheerful.wav`
- `emote-talking.wav`
- `emote-mumbling.wav`
- `emote-gasp.wav`
- `emote-sigh.wav`

Cat-vocal replacements:

- `cat-meow.wav`
- `cat-question.wav`
- `cat-purr.wav`
- `cat-hiss.wav`
- `cat-trill.wav`
- `cat-chatter.wav`
- `cat-growl.wav`
- `cat-yowl.wav`

These replace the procedural voices used by adopted cats and Agnes Alley's shelter cats. Hisses, growls, and yowls are reserved for genuine threat or distress events; ordinary companion moments use quieter meows, trills, questions, chatter, and purrs.

Minigame, movement, and ambience replacements:

- `minigame-whistle.wav`
- `minigame-stopwatch.wav`
- `minigame-alarm.wav`
- `minigame-siren.wav`
- `ambience-rain.wav`
- `movement-snow-crunch.wav`
- `ambience-fire.wav`
- `minigame-impact.wav`
- `minigame-ball-whoosh.wav`
- `minigame-ball-catch.wav`
- `minigame-paint-splatter.wav`
- `minigame-buzzer.wav`

The siren stays available for a future event but is not attached to ordinary play. The existing gameplay aliases remain supported, including `ui-click`, `ui-select`, `coin-pickup`, `win`, `ready`, `game-start`, `shop-buy`, `dice-roll`, `bot-turn`, `camera`, and `select`. Optional `footsteps.wav` is also supported; without it, walking stays quiet.

## Supported formats and naming

WAV is the safest replacement format. MP3, OGG, and M4A are also discovered by the build script, subject to browser support. Use lowercase filenames with hyphens and no spaces. The filename without its extension becomes the audio ID.

After adding or replacing files, commit and push. Vercel runs `npm run build`, which regenerates `assets/audio/manifest.json`. Music and sound-effect toggles remain available in Pause & Help during play.

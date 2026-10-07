# Welcoming-Committee Onboarding

**Status:** SHIPPED

## What it is

Character creation reframed as a cinematic welcoming ceremony: instead of a "Create your character" screen, the townspeople greet the new neighbor and the local newspaper sends a photographer. Deliberately a story, not a setup form.

## How it works for the player

- New players meet the welcoming committee in Town Hall: **Gideon** (the eccentric tour guide) and **Mayor Mayor** (who walks out, plants his feet, tips his hat, waves, and hops before delivering his intro standing still).
- The onboarding is a guided **photo shoot** for the player's expressions: the first (idle) photo is a citizenship step for the player's ironic "state" ID (don't smile); the next asks for a blink; further situations elicit the rest, coached like a real shoot; the finale has the newspaper photographer telling the player to say CHEESE and open wide.
- The onboarding is modal: background controls can't be activated mid-ceremony (the shell is marked inert and outside pointer events are captured — fixed after a real bug where a hidden Play control could open Lantern Dash behind the ceremony).
- Returning players skip the ceremony and land back in with character and progress.

## Key code files

- `assets/selfie-social-society-welcome.bundle.js` — the ceremony: committee scenes, Mayor Mayor's choreography, photo-shoot flow.
- `assets/welcome-committee/` — named art placeholders for Mayor Mayor, Gideon, and Penny Press.
- `assets/modal-interaction-guard.js` — the pointer-isolation guard that keeps onboarding modal.

## Where state lives

- Firestore `players/{uid}` — the finished character and progress; its existence is what lets returning players skip the ceremony.

## NPCs involved

- **Gideon** — eccentric tour guide; **Mayor Mayor's father**. Signature line: "He's Mr. Mayor Mayor now!" Unique masculine, older, low-pitched voice (rate 0.88, pitch 0.6); sung dialogue stays sung.
- **Mayor Mayor** — the mayor. Speech rate 0.95. Backstory: a former solo touring guitar-and-singing act whose career stalled after a cease-and-desist from a similarly-named artist's lawyers; then won office in a total landslide (his only opposition literally buried by one).

## Accessibility

Subtitles/closed captions bloom word-by-word as spoken; complete lines stay available to assistive technology; reduced-motion mode shows readable non-traveling text (see `text-legibility.md`).

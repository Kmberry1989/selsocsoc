class GameSoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // 1. UI Tap: Soft rounded wooden click, very short, warm
  uiTap() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.04);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(850, now);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.045);
  }

  // 2. UI Confirm: Bright two-note chime up, cheerful, short
  uiConfirm() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const notes = [1046.50, 1318.51]; // C6 -> E6

    notes.forEach((freq, idx) => {
      const startTime = now + idx * 0.07;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.28, startTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.23);
    });
  }

  // 3. UI Back: Soft low blip down, gentle, very short
  uiBack() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(130, now + 0.075);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(700, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.085);
  }

  // 4. Coin Collect: Sparkling coin ding with shimmer tail, satisfying
  coinCollect(timeOffset = 0, pitchMultiplier = 1.0) {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime + timeOffset;

    const freqs = [987.77 * pitchMultiplier, 1318.51 * pitchMultiplier, 2637.02 * pitchMultiplier];
    const gains = [0.25, 0.2, 0.06];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(gains[idx], now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.42);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    });
  }

  // 5. Coin Payout Shower: Cascade of coin dings rising in pitch, celebratory
  coinPayoutShower() {
    this.init();
    const pitches = [0.8, 0.95, 1.1, 1.25, 1.45, 1.7];
    pitches.forEach((pitch, i) => {
      this.coinCollect(i * 0.048, pitch);
    });
  }

  // 6. Minigame Win: Short triumphant fanfare, brass and chimes, 2 seconds
  minigameWin() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Brass fanfare chords (C4, F4, G4, C5)
    const progression = [
      { time: 0.00, notes: [261.63, 329.63, 392.00], dur: 0.22 }, // C Maj
      { time: 0.20, notes: [349.23, 440.00, 523.25], dur: 0.22 }, // F Maj
      { time: 0.40, notes: [392.00, 493.88, 587.33], dur: 0.28 }, // G Maj
      { time: 0.68, notes: [523.25, 659.25, 783.99, 1046.50], dur: 1.25 } // High C Maj
    ];

    progression.forEach(chord => {
      const startTime = now + chord.time;
      chord.notes.forEach(freq => {
        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gain = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, startTime);

        // Filter for warm brass character
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, startTime);
        filter.frequency.linearRampToValueAtTime(2200, startTime + 0.05);
        filter.frequency.exponentialRampToValueAtTime(900, startTime + chord.dur);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.09, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + chord.dur);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + chord.dur);
      });
    });

    // Sparkling chime overlay on the grand final chord
    const chimePitches = [1318.51, 1567.98, 2093.00, 2637.02];
    chimePitches.forEach((freq, idx) => {
      const chimeTime = now + 0.68 + (idx * 0.06);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, chimeTime);

      gain.gain.setValueAtTime(0.001, chimeTime);
      gain.gain.linearRampToValueAtTime(0.08, chimeTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, chimeTime + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(chimeTime);
      osc.stop(chimeTime + 0.75);
    });
  }

  // 7. Minigame Lose: Gentle descending two-note wah, sympathetic not harsh
  minigameLose() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const notes = [
      { time: 0.00, startF: 311.13, endF: 290.0, dur: 0.38 }, // Eb4
      { time: 0.38, startF: 261.63, endF: 220.0, dur: 0.55 }  // C4 -> A3
    ];

    notes.forEach(n => {
      const startTime = now + n.time;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.startF, startTime);
      osc.frequency.exponentialRampToValueAtTime(n.endF, startTime + n.dur);

      // "Wah" filter envelope
      filter.type = 'lowpass';
      filter.Q.value = 3.5;
      filter.frequency.setValueAtTime(450, startTime);
      filter.frequency.linearRampToValueAtTime(880, startTime + n.dur * 0.35);
      filter.frequency.exponentialRampToValueAtTime(250, startTime + n.dur);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.24, startTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + n.dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + n.dur + 0.02);
    });
  }

  // 8. Countdown Beep: Clean sine blip, neutral
  countdownBeep() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // 9. Countdown Go: Bright upbeat pop, exciting
  countdownGo() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(659.25, now); // E5
    osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.06); // Sweep to C6

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    // Supporting octave chime
    const chime = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    chime.type = 'sine';
    chime.frequency.setValueAtTime(2093.00, now); // C7
    chimeGain.gain.setValueAtTime(0.001, now);
    chimeGain.gain.linearRampToValueAtTime(0.12, now + 0.01);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    chime.connect(chimeGain);
    chimeGain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
    chime.start(now);
    chime.stop(now + 0.26);
  }

  // 10. Achievement Unlock: Magical shimmer swell with soft chime
  achievementUnlock() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Swell chord (warm major 9th)
    const chord = [261.63, 392.00, 493.88, 659.25];
    chord.forEach(freq => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.35);
    });

    // Magical twinkling chimes at peak
    const chimes = [1046.50, 1318.51, 1567.98, 1975.53, 2349.32];
    chimes.forEach((freq, idx) => {
      const startTime = now + 0.38 + (idx * 0.05);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.1, startTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.7);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.75);
    });
  }

  // 11. Dialogue Blip: Tiny cute pop, like a speech bubble appearing
  dialogueBlip() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.exponentialRampToValueAtTime(290, now + 0.028);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  }

  // 12. Error: Soft muted buzz, low volume, not alarming
  error() {
    this.init();
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const pulses = [0.0, 0.08];
    pulses.forEach(offset => {
      const startTime = now + offset;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(130, startTime);

      // Deep low-pass filter to remove harsh square harmonics
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(380, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.12, startTime + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.06);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.065);
    });
  }
}


// Selfie Social Society integration. The synthesis methods above are the
// game's built-in defaults; files discovered in assets/audio/sfx take priority.
(() => {
  const AUDIO_MANIFEST = "assets/audio/manifest.json";
  const audioState = {
    manifest: { music: [], sfx: [] },
    unlocked: false,
    musicEnabled: true,
    sfxEnabled: true,
    context: "",
    music: null,
    footstepAt: 0,
  };
  const synth = new GameSoundEngine();
  const byId = (group, id) => audioState.manifest[group]?.find((entry) => entry.id === id)?.file || "";
  const normalize = (id) => String(id || "").trim().toLowerCase().replace(/_/g, "-");
  const synthMethod = {
    "ui-tap": "uiTap",
    "ui-click": "uiTap",
    "ui-confirm": "uiConfirm",
    "ui-select": "uiConfirm",
    "select": "uiConfirm",
    "ready": "uiConfirm",
    "camera": "uiConfirm",
    "ui-back": "uiBack",
    "back": "uiBack",
    "coin-collect": "coinCollect",
    "coin-pickup": "coinCollect",
    "coin-payout": "coinPayoutShower",
    "coin-payout-shower": "coinPayoutShower",
    "shop-buy": "coinCollect",
    "minigame-win": "minigameWin",
    "win": "minigameWin",
    "minigame-lose": "minigameLose",
    "lose": "minigameLose",
    "countdown-beep": "countdownBeep",
    "countdown-go": "countdownGo",
    "game-start": "countdownGo",
    "achievement": "achievementUnlock",
    "achievement-unlock": "achievementUnlock",
    "dialogue": "dialogueBlip",
    "dialogue-blip": "dialogueBlip",
    "error": "error",
    "dice-roll": "uiTap",
    "bot-turn": "uiBack",
  };
  const canonicalId = {
    uiTap: "ui-tap",
    uiConfirm: "ui-confirm",
    uiBack: "ui-back",
    coinCollect: "coin-collect",
    coinPayoutShower: "coin-payout-shower",
    minigameWin: "minigame-win",
    minigameLose: "minigame-lose",
    countdownBeep: "countdown-beep",
    countdownGo: "countdown-go",
    achievementUnlock: "achievement-unlock",
    dialogueBlip: "dialogue-blip",
    error: "error",
  };

  async function loadManifest() {
    try {
      const response = await fetch(AUDIO_MANIFEST, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Audio manifest ${response.status}`);
      audioState.manifest = await response.json();
    } catch (error) {
      console.warn("Selfie Social Society audio manifest unavailable", error);
    }
  }

  function musicContext() {
    if (document.querySelector(".snug-start-screen:not(.is-leaving)")) return "title-screen";
    if (document.querySelector(".snug-board-backdrop")) return "board-game";
    if (document.querySelector(".room-game-hud,.party-arena-backdrop,.solo-result-backdrop")) return "minigames";
    const shopTitle = [...document.querySelectorAll(".sheet-head h2")].find((node) => /Meadow Market|Curl & Comb|Pocket Mall|Hearth & Home|Green Nook/.test(node.textContent || ""));
    if (shopTitle) return "shops";
    if (window.__snugWorld?.mode === "home") return "home";
    return "plaza";
  }

  function fadeOut(audio) {
    if (!audio) return;
    const started = performance.now();
    const original = audio.volume;
    const step = (now) => {
      const ratio = Math.max(0, Math.min(1, (now - started) / 1400));
      audio.volume = Math.max(0, Math.min(1, original * (1 - ratio)));
      if (ratio < 1) requestAnimationFrame(step);
      else { audio.pause(); audio.remove(); }
    };
    requestAnimationFrame(step);
  }

  function syncMusic(force = false) {
    const next = musicContext();
    if (!force && next === audioState.context) return;
    audioState.context = next;
    const src = byId("music", next);
    const previous = audioState.music;
    audioState.music = null;
    if (!audioState.unlocked || !audioState.musicEnabled || !src) { fadeOut(previous); return; }
    const music = new Audio(src);
    music.loop = true;
    music.preload = "auto";
    music.volume = 0;
    music.dataset.snugMusic = next;
    document.body.appendChild(music);
    music.play().then(() => {
      const started = performance.now();
      const step = (now) => {
        const ratio = Math.max(0, Math.min(1, (now - started) / 1800));
        music.volume = Math.max(0, Math.min(1, .18 * ratio));
        if (ratio < 1 && !music.paused) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }).catch(() => music.remove());
    audioState.music = music;
    fadeOut(previous);
  }

  function playSynth(id) {
    const method = synthMethod[normalize(id)];
    if (!method || typeof synth[method] !== "function") return false;
    try { synth[method](); return true; }
    catch (error) { console.warn(`Procedural SFX failed: ${id}`, error); return false; }
  }

  function playSfx(id, volume = .42) {
    if (!audioState.unlocked || !audioState.sfxEnabled) return;
    const normalized = normalize(id);
    const method = synthMethod[normalized];
    const src = byId("sfx", normalized) || byId("sfx", canonicalId[method]);
    if (!src) { playSynth(normalized); return; }
    const sound = new Audio(src);
    sound.volume = volume;
    sound.preload = "auto";
    sound.addEventListener("ended", () => sound.remove(), { once: true });
    sound.addEventListener("error", () => { sound.remove(); playSynth(normalized); }, { once: true });
    document.body.appendChild(sound);
    sound.play().catch(() => { sound.remove(); playSynth(normalized); });
  }

  function updateToggles() {
    document.querySelectorAll(".snug-help-music-toggle").forEach((button) => {
      button.setAttribute("aria-pressed", String(audioState.musicEnabled));
      button.textContent = audioState.musicEnabled ? "Music on" : "Music off";
    });
    document.querySelectorAll(".snug-help-sfx-toggle").forEach((button) => {
      button.setAttribute("aria-pressed", String(audioState.sfxEnabled));
      button.textContent = audioState.sfxEnabled ? "Sounds on" : "Sounds off";
    });
  }

  function toggleMusic() {
    audioState.musicEnabled = !audioState.musicEnabled;
    if (!audioState.musicEnabled) fadeOut(audioState.music);
    audioState.music = null;
    if (audioState.musicEnabled) syncMusic(true);
    updateToggles();
  }

  function toggleSfx() {
    audioState.sfxEnabled = !audioState.sfxEnabled;
    updateToggles();
    if (audioState.sfxEnabled) playSfx("ui-confirm");
  }

  function unlockAudio() {
    if (audioState.unlocked) return;
    audioState.unlocked = true;
    if (window.AudioContext || window.webkitAudioContext) synth.init();
    syncMusic(true);
  }

  function describeClick(target) {
    if (!(target instanceof Element) || target.closest("button:disabled,[aria-disabled='true']")) return "";
    if (target.closest("[data-board-roll]")) return "dice-roll";
    if (target.closest("[data-board-buy],.shop-item button")) return "shop-buy";
    if (target.closest("[data-board-start]")) return "countdown-go";
    if (target.closest("[data-board-ready]")) return "ui-confirm";
    if (target.closest(".snug-menu-confirm-cancel,[data-close],[data-action='solo-done'],.city-npc-close,.multi-close,.quick-capture-close")) return "ui-back";
    if (target.closest(".snug-menu-confirm-go,.primary,.multi-primary,[data-start-mode],select,[role=option],[data-board-count]")) return "ui-confirm";
    if (target.closest("button,[role=button],a")) return "ui-tap";
    return "";
  }

  document.addEventListener("pointerdown", (event) => {
    unlockAudio();
    const id = describeClick(event.target);
    if (id) playSfx(id);
  }, true);

  document.addEventListener("click", (event) => {
    const music = event.target.closest?.(".snug-help-music-toggle");
    if (music && !event.__snugAudioHandled) {
      event.__snugAudioHandled = true;
      event.stopImmediatePropagation();
      toggleMusic();
    }
    const sfx = event.target.closest?.(".snug-help-sfx-toggle");
    if (sfx && !event.__snugAudioHandled) {
      event.__snugAudioHandled = true;
      event.stopImmediatePropagation();
      toggleSfx();
    }
  }, true);

  window.addEventListener("snug-sfx", (event) => playSfx(event.detail?.id || "ui-confirm"));
  window.addEventListener("snug-award-coins", (event) => playSfx(Number(event.detail?.amount || 0) > 1 ? "coin-payout-shower" : "coin-collect"));
  window.addEventListener("snug-minigame-achievement", (event) => {
    const detail = event.detail || {};
    if (detail.score == null) return;
    playSfx(detail.won ? "minigame-win" : "minigame-lose");
    if (detail.personalBest) setTimeout(() => playSfx("achievement-unlock"), 900);
  });
  window.addEventListener("snug-achievement-unlocked", () => playSfx("achievement-unlock"));

  window.addEventListener("snug-footstep", () => {
    if (performance.now() - audioState.footstepAt < 250) return;
    audioState.footstepAt = performance.now();
    if (byId("sfx", "footsteps")) playSfx("footsteps", .16);
  });

  let lastPlayerPosition = null;
  setInterval(() => {
    const position = window.__snugWorld?.player?.position;
    if (!position) { lastPlayerPosition = null; return; }
    if (lastPlayerPosition) {
      const distance = Math.hypot(position.x - lastPlayerPosition.x, position.z - lastPlayerPosition.z);
      if (distance > .035) window.dispatchEvent(new CustomEvent("snug-footstep"));
    }
    lastPlayerPosition = { x: position.x, z: position.z };
  }, 180);

  const lastText = new WeakMap();
  let dialogueAt = 0;
  let errorAt = 0;
  function inspectAudioCues(root = document) {
    const selector = ".wave1-countdown,.challenge-countdown,.room-game-hud strong,.dialogue-caption,.city-npc-dialogue p,.config-error,.multi-error,.voice-error,[role='alert']";
    const nodes = root instanceof Element ? [...(root.matches(selector) ? [root] : []), ...root.querySelectorAll(selector)] : [...document.querySelectorAll(selector)];
    nodes.forEach((node) => {
      if (!(node instanceof Element) || node.hidden) return;
      const text = (node.textContent || "").trim();
      if (!text || lastText.get(node) === text) return;
      lastText.set(node, text);
      if (node.matches(".wave1-countdown,.challenge-countdown,.room-game-hud strong")) {
        if (/^go!?$/i.test(text)) playSfx("countdown-go");
        else if (/^[1-3]$/.test(text) || /get ready/i.test(text)) playSfx("countdown-beep");
      } else if (node.matches(".dialogue-caption,.city-npc-dialogue p")) {
        if (performance.now() - dialogueAt > 75) { dialogueAt = performance.now(); playSfx("dialogue-blip"); }
      } else if (performance.now() - errorAt > 350) {
        errorAt = performance.now();
        playSfx("error");
      }
    });
  }

  let syncTimer = 0;
  new MutationObserver((records) => {
    clearTimeout(syncTimer);
    syncTimer = setTimeout(() => { syncMusic(); updateToggles(); }, 80);
    records.forEach((record) => {
      if (record.type === "characterData") inspectAudioCues(record.target.parentElement);
      else record.addedNodes.forEach((node) => { if (node.nodeType === Node.ELEMENT_NODE) inspectAudioCues(node); });
      if (record.target instanceof Element) inspectAudioCues(record.target);
    });
  }).observe(document.documentElement, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["class", "hidden"] });

  window.__snugAudio = { playSfx, syncMusic, toggleMusic, toggleSfx, updateToggles, context: () => synth.ctx, state: audioState, synth };
  window.__snugSfxEngine = synth;
  loadManifest().then(() => syncMusic(true));
})();


/* 0.9.44 procedural voice, minigame, ambience, and cat-vocal expansion.
   Every engine borrows the existing SFX engine's AudioContext; none can
   construct a context of its own. Custom files in assets/audio/sfx still win. */
class ProceduralEmoteEngine {
  constructor(contextProvider, outputGain = 0.2) {
    this.contextProvider = contextProvider;
    this.outputGain = outputGain;
    this.output = null;
    this.outputContext = null;
  }

  get ctx() {
    const context = this.contextProvider?.();
    if (!context) throw new Error("Shared AudioContext unavailable");
    if (this.outputContext !== context) {
      this.output = context.createGain();
      this.output.gain.value = this.outputGain;
      this.output.connect(context.destination);
      this.outputContext = context;
    }
    return context;
  }

  _gain(ctx, value) {
    const gain = ctx.createGain();
    gain.gain.value = value;
    gain.connect(this.output);
    return gain;
  }

  laugh() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    for (let i = 0; i < 5; i++) {
      const t = now + i * 0.13;
      const osc = ctx.createOscillator();
      const gain = this._gain(ctx, 0);
      osc.type = "sine";
      osc.frequency.setValueAtTime(280 + Math.sin(i) * 40, t);
      osc.frequency.exponentialRampToValueAtTime(190, t + 0.1);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.connect(gain);
      osc.start(t);
      osc.stop(t + 0.13);
    }
  }

  grunt() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = this._gain(ctx, 0);
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.18);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  confusion() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    [330, 260, 310].forEach((freq, i) => {
      const t = now + i * 0.1;
      const osc = ctx.createOscillator();
      const gain = this._gain(ctx, 0);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.linearRampToValueAtTime(freq + (i === 2 ? 70 : -25), t + 0.09);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.14, t + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc.connect(gain);
      osc.start(t);
      osc.stop(t + 0.11);
    });
  }

  question() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = this._gain(ctx, 0);
    osc.type = "sine";
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(440, now + 0.32);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.36);
    osc.connect(gain);
    osc.start(now);
    osc.stop(now + 0.38);
  }

  excitement() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    [330, 440, 550].forEach((freq, i) => {
      const t = now + i * 0.085;
      const osc = ctx.createOscillator();
      const gain = this._gain(ctx, 0);
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.16, t + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.11);
      osc.connect(gain);
      osc.start(t);
      osc.stop(t + 0.12);
    });
  }

  cheerful() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    [294, 370, 440].forEach((freq, i) => {
      const t = now + i * 0.11;
      const osc = ctx.createOscillator();
      const gain = this._gain(ctx, 0);
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.08, t + 0.1);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.15, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);
      osc.connect(gain);
      osc.start(t);
      osc.stop(t + 0.13);
    });
  }

  talking() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const count = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < count; i++) {
      const t = now + i * 0.09;
      const osc = ctx.createOscillator();
      const gain = this._gain(ctx, 0);
      osc.type = "triangle";
      const base = 170 + Math.random() * 85;
      osc.frequency.setValueAtTime(base, t);
      osc.frequency.linearRampToValueAtTime(base + (Math.random() - 0.5) * 55, t + 0.08);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.11, t + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
      osc.connect(gain);
      osc.start(t);
      osc.stop(t + 0.1);
    }
  }

  mumbling() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    for (let i = 0; i < 7; i++) {
      const t = now + i * 0.065;
      const osc = ctx.createOscillator();
      const gain = this._gain(ctx, 0);
      osc.type = "sine";
      osc.frequency.setValueAtTime(105 + Math.random() * 38, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);
      osc.connect(gain);
      osc.start(t);
      osc.stop(t + 0.08);
    }
  }

  gasp() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = this._gain(ctx, 0);
    const filter = ctx.createBiquadFilter();
    osc.type = "sine";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(520, now + 0.16);
    filter.type = "bandpass";
    filter.frequency.value = 750;
    filter.Q.value = 0.8;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.035);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
    osc.connect(filter);
    filter.connect(gain);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  sigh() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = this._gain(ctx, 0);
    const filter = ctx.createBiquadFilter();
    osc.type = "sine";
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(105, now + 0.62);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(900, now);
    filter.frequency.exponentialRampToValueAtTime(280, now + 0.6);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.66);
    osc.connect(filter);
    filter.connect(gain);
    osc.start(now);
    osc.stop(now + 0.68);
  }
}

class ProceduralAudioEngine {
  constructor(contextProvider, outputGain = 0.42) {
    this.contextProvider = contextProvider;
    this.outputGain = outputGain;
    this.output = null;
    this.outputContext = null;
  }

  get ctx() {
    const context = this.contextProvider?.();
    if (!context) throw new Error("Shared AudioContext unavailable");
    if (this.outputContext !== context) {
      this.output = context.createGain();
      this.output.gain.value = this.outputGain;
      this.output.connect(context.destination);
      this.outputContext = context;
    }
    return context;
  }

  _gain(ctx, value = 0) {
    const gain = ctx.createGain();
    gain.gain.value = value;
    gain.connect(this.output);
    return gain;
  }

  _noiseBuffer(ctx, duration) {
    const buffer = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * duration)), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
  }

  whistle() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = this._gain(ctx, 0);
    osc.type = "sine";
    osc.frequency.setValueAtTime(1320, now);
    osc.frequency.linearRampToValueAtTime(1480, now + 0.08);
    osc.frequency.linearRampToValueAtTime(1250, now + 0.42);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.02);
    gain.gain.setValueAtTime(0.18, now + 0.28);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc.connect(gain);
    osc.start(now);
    osc.stop(now + 0.46);
  }

  stopwatch() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    [0, 0.22].forEach((offset) => {
      const t = now + offset;
      const osc = ctx.createOscillator();
      const gain = this._gain(ctx, 0);
      osc.type = "square";
      osc.frequency.value = 980;
      gain.gain.setValueAtTime(0.14, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.045);
      osc.connect(gain);
      osc.start(t);
      osc.stop(t + 0.05);
    });
  }

  alarm() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const t = now + i * 0.12;
      const osc = ctx.createOscillator();
      const gain = this._gain(ctx, 0);
      osc.type = "square";
      osc.frequency.value = i % 2 ? 720 : 920;
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
      osc.connect(gain);
      osc.start(t);
      osc.stop(t + 0.1);
    }
  }

  siren() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = this._gain(ctx, 0);
    osc.type = "sine";
    osc.frequency.setValueAtTime(430, now);
    osc.frequency.linearRampToValueAtTime(760, now + 0.45);
    osc.frequency.linearRampToValueAtTime(430, now + 0.9);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.04);
    gain.gain.setValueAtTime(0.16, now + 0.78);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.94);
    osc.connect(gain);
    osc.start(now);
    osc.stop(now + 0.95);
  }

  rain() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = this._gain(ctx, 0);
    source.buffer = this._noiseBuffer(ctx, 5.1);
    filter.type = "highpass";
    filter.frequency.value = 1450;
    filter.Q.value = 0.2;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.055, now + 0.7);
    gain.gain.setValueAtTime(0.055, now + 4.25);
    gain.gain.linearRampToValueAtTime(0, now + 5.05);
    source.connect(filter);
    filter.connect(gain);
    source.start(now);
    source.stop(now + 5.1);
  }

  snowCrunch() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = this._gain(ctx, 0);
    source.buffer = this._noiseBuffer(ctx, 0.16);
    filter.type = "bandpass";
    filter.frequency.value = 620;
    filter.Q.value = 1.4;
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    source.connect(filter);
    filter.connect(gain);
    source.start(now);
    source.stop(now + 0.16);
  }

  fire() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = this._gain(ctx, 0);
    source.buffer = this._noiseBuffer(ctx, 4.5);
    filter.type = "lowpass";
    filter.frequency.value = 760;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.6);
    gain.gain.setValueAtTime(0.04, now + 3.75);
    gain.gain.linearRampToValueAtTime(0, now + 4.45);
    source.connect(filter);
    filter.connect(gain);
    source.start(now);
    source.stop(now + 4.5);
  }

  impact() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = this._gain(ctx, 0);
    source.buffer = this._noiseBuffer(ctx, 0.14);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(720, now);
    filter.frequency.exponentialRampToValueAtTime(120, now + 0.13);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    source.connect(filter);
    filter.connect(gain);
    source.start(now);
    source.stop(now + 0.15);
  }

  ballWhoosh() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = this._gain(ctx, 0);
    source.buffer = this._noiseBuffer(ctx, 0.25);
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(360, now);
    filter.frequency.exponentialRampToValueAtTime(1450, now + 0.13);
    filter.frequency.exponentialRampToValueAtTime(480, now + 0.24);
    filter.Q.value = 0.9;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.13, now + 0.06);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    source.connect(filter);
    filter.connect(gain);
    source.start(now);
    source.stop(now + 0.26);
  }

  ballCatch() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = this._gain(ctx, 0);
    osc.type = "sine";
    osc.frequency.setValueAtTime(170, now);
    osc.frequency.exponentialRampToValueAtTime(72, now + 0.16);
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    osc.start(now);
    osc.stop(now + 0.19);
  }

  paintSplatter() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gain = this._gain(ctx, 0);
    source.buffer = this._noiseBuffer(ctx, 0.2);
    filter.type = "bandpass";
    filter.frequency.value = 900;
    filter.Q.value = 0.65;
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.19);
    source.connect(filter);
    filter.connect(gain);
    source.start(now);
    source.stop(now + 0.2);
  }

  buzzer() {
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = this._gain(ctx, 0);
    osc.type = "square";
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.linearRampToValueAtTime(115, now + 0.38);
    gain.gain.setValueAtTime(0.16, now);
    gain.gain.setValueAtTime(0.12, now + 0.28);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
    osc.connect(gain);
    osc.start(now);
    osc.stop(now + 0.43);
  }
}

// Cat vocals keep the supplied acoustic design, but borrow the game's one
// AudioContext and a quiet shared output so companion sounds stay subtle.
class ProceduralCatAudioEngine {
  constructor(contextProvider, outputGain = 0.16) {
    this.contextProvider = contextProvider;
    this.outputGain = outputGain;
    this.output = null;
    this.ctx = null;
  }

  init() {
    const context = this.contextProvider?.();
    if (!context) throw new Error('Shared AudioContext unavailable');
    this.ctx = context;
    if (!this.output || this.output.context !== context) {
      this.output = context.createGain();
      this.output.gain.value = this.outputGain;
      this.output.connect(context.destination);
    }
    if (context.state === 'suspended') context.resume();
    return context;
  }

  // Generate a reusable buffer of white noise
  createNoiseBuffer(duration = 1.0) {
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  // 1. Standard Meow: Sawtooth vocal cord vibration through moving vowel formants
  meow() {
    const ctx = this.init();
    const now = ctx.currentTime;
    const dur = 0.75;

    // Carrier source: Rich vocal cords
    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';

    // Natural pitch contour: Upward glide then descending tail
    osc.frequency.setValueAtTime(410, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + 0.28);
    osc.frequency.exponentialRampToValueAtTime(430, now + dur);

    // Vocal vibrato
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.setValueAtTime(5.5, now);
    vibratoGain.gain.setValueAtTime(0, now);
    vibratoGain.gain.linearRampToValueAtTime(14, now + 0.3);
    vibrato.connect(osc.frequency);

    // Formant Filter 1 (Mouth open/close sweep: 400Hz -> 1400Hz -> 500Hz)
    const f1 = ctx.createBiquadFilter();
    f1.type = 'bandpass';
    f1.Q.value = 4.0;
    f1.frequency.setValueAtTime(420, now);
    f1.frequency.exponentialRampToValueAtTime(1350, now + 0.3);
    f1.frequency.exponentialRampToValueAtTime(520, now + dur);

    // Formant Filter 2 (Oral cavity resonance: 1600Hz -> 2500Hz -> 1400Hz)
    const f2 = ctx.createBiquadFilter();
    f2.type = 'bandpass';
    f2.Q.value = 4.5;
    f2.frequency.setValueAtTime(1500, now);
    f2.frequency.exponentialRampToValueAtTime(2450, now + 0.3);
    f2.frequency.exponentialRampToValueAtTime(1300, now + dur);

    // Amplitude envelope
    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, now);
    amp.gain.linearRampToValueAtTime(0.24, now + 0.12);
    amp.gain.setValueAtTime(0.22, now + dur - 0.25);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    // Parallel formant routing
    osc.connect(f1);
    osc.connect(f2);
    f1.connect(amp);
    f2.connect(amp);
    amp.connect(this.output);

    vibrato.start(now);
    osc.start(now);
    vibrato.stop(now + dur);
    osc.stop(now + dur + 0.05);
  }

  // 2. Question ("Mrr-ow?"): Nasal flutter rolling into an ascending pitch sweep
  question() {
    const ctx = this.init();
    const now = ctx.currentTime;
    const dur = 0.52;

    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';

    // Upward pitch bend (curious inflection)
    osc.frequency.setValueAtTime(360, now);
    osc.frequency.linearRampToValueAtTime(420, now + 0.14);
    osc.frequency.exponentialRampToValueAtTime(740, now + dur);

    // Fast flutter at start for the "Mrr" roll
    const flutter = ctx.createOscillator();
    const flutterGain = ctx.createGain();
    flutter.frequency.setValueAtTime(28, now);
    flutterGain.gain.setValueAtTime(28, now);
    flutterGain.gain.linearRampToValueAtTime(0.1, now + 0.2);
    flutter.connect(osc.frequency);

    // Resonant sweeping formant
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 3.5;
    filter.frequency.setValueAtTime(650, now);
    filter.frequency.exponentialRampToValueAtTime(1950, now + dur);

    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, now);
    amp.gain.linearRampToValueAtTime(0.22, now + 0.08);
    amp.gain.setValueAtTime(0.20, now + dur - 0.1);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    osc.connect(filter);
    filter.connect(amp);
    amp.connect(this.output);

    flutter.start(now);
    osc.start(now);
    flutter.stop(now + dur);
    osc.stop(now + dur + 0.05);
  }

  // 3. Purring: 26 Hz laryngeal modulation over deep tone and filtered breath
  purr() {
    const ctx = this.init();
    const now = ctx.currentTime;
    const dur = 2.4;

    // Sub-bass vocal hum
    const sub = ctx.createOscillator();
    sub.type = 'triangle';
    sub.frequency.setValueAtTime(48, now);

    // Warm breath noise
    const noise = ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer(dur);
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.setValueAtTime(260, now);

    // Glottal motor pacing (~25 Hz flutter)
    const purrLfo = ctx.createOscillator();
    purrLfo.frequency.setValueAtTime(25.5, now);
    const purrDepth = ctx.createGain();
    purrDepth.gain.setValueAtTime(0.7, now);

    // Overall breathing cycle (respiration swell)
    const respLfo = ctx.createOscillator();
    respLfo.frequency.setValueAtTime(0.55, now); // ~1.8s respiratory period
    const respGain = ctx.createGain();
    respGain.gain.setValueAtTime(0.4, now);

    // Tremolo gain node
    const tremolo = ctx.createGain();
    tremolo.gain.setValueAtTime(0.4, now);
    purrLfo.connect(tremolo.gain);

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.linearRampToValueAtTime(0.4, now + 0.3);
    masterGain.gain.setValueAtTime(0.4, now + dur - 0.4);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    sub.connect(tremolo);
    noise.connect(noiseFilter);
    noiseFilter.connect(tremolo);

    tremolo.connect(masterGain);
    masterGain.connect(this.output);

    purrLfo.start(now);
    respLfo.start(now);
    sub.start(now);
    noise.start(now);

    purrLfo.stop(now + dur);
    respLfo.stop(now + dur);
    sub.stop(now + dur);
    noise.stop(now + dur);
  }

  // 4. Hissing: High-pressure turbulent noise burst with dental resonance
  hiss() {
    const ctx = this.init();
    const now = ctx.currentTime;
    const dur = 0.65;

    const noise = ctx.createBufferSource();
    noise.buffer = this.createNoiseBuffer(dur);

    // High-pass to remove low body
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(2800, now);

    // Sharp dental oral resonance
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(5200, now);
    bp.frequency.linearRampToValueAtTime(4600, now + dur);
    bp.Q.value = 2.4;

    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, now);
    amp.gain.linearRampToValueAtTime(0.35, now + 0.05); // sharp bite attack
    amp.gain.setValueAtTime(0.32, now + 0.18);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    noise.connect(hp);
    hp.connect(bp);
    bp.connect(amp);
    amp.connect(this.output);

    noise.start(now);
    noise.stop(now + dur);
  }

  // 5. Trill / Chirrup: High-speed frequency modulation over rising pitch
  trill() {
    const ctx = this.init();
    const now = ctx.currentTime;
    const dur = 0.32;

    const osc = ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(460, now);
    osc.frequency.exponentialRampToValueAtTime(680, now + dur);

    // Fast flutter vibrato (soft palate vibration)
    const flutter = ctx.createOscillator();
    const flutterGain = ctx.createGain();
    flutter.frequency.setValueAtTime(32, now);
    flutterGain.gain.setValueAtTime(42, now);
    flutter.connect(osc.frequency);

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(2200, now + dur);
    filter.Q.value = 3.0;

    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, now);
    amp.gain.linearRampToValueAtTime(0.25, now + 0.04);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    osc.connect(filter);
    filter.connect(amp);
    amp.connect(this.output);

    flutter.start(now);
    osc.start(now);
    flutter.stop(now + dur);
    osc.stop(now + dur + 0.02);
  }

  // 6. Prey Chatter: Staccato series of teeth clicks and high squeaks
  chatter() {
    const ctx = this.init();
    const now = ctx.currentTime;
    const clicks = 8;
    const spacing = 0.055;

    for (let i = 0; i < clicks; i++) {
      const t = now + (i * spacing);
      const clickDur = 0.025;

      // Tiny mouth click
      const noise = ctx.createBufferSource();
      noise.buffer = this.createNoiseBuffer(clickDur);
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2800 + Math.random() * 400, t);
      filter.Q.value = 5.0;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + clickDur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.output);
      noise.start(t);
      noise.stop(t + clickDur);

      // Subtle harmonic chirp transient
      const chirp = ctx.createOscillator();
      const chirpGain = ctx.createGain();
      chirp.type = 'sine';
      chirp.frequency.setValueAtTime(1400, t);
      chirp.frequency.exponentialRampToValueAtTime(950, t + clickDur);

      chirpGain.gain.setValueAtTime(0.08, t);
      chirpGain.gain.exponentialRampToValueAtTime(0.0001, t + clickDur);

      chirp.connect(chirpGain);
      chirpGain.connect(this.output);
      chirp.start(t);
      chirp.stop(t + clickDur);
    }
  }

  // 7. Warning Growl: Low rumbling throat sound with AM distortion
  growl() {
    const ctx = this.init();
    const now = ctx.currentTime;
    const dur = 1.6;

    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc2.type = 'triangle';

    osc1.frequency.setValueAtTime(118, now);
    osc1.frequency.linearRampToValueAtTime(108, now + dur);

    osc2.frequency.setValueAtTime(122, now); // Detuned beat frequency
    osc2.frequency.linearRampToValueAtTime(112, now + dur);

    // Vocal cord roughness AM
    const roughLfo = ctx.createOscillator();
    const roughGain = ctx.createGain();
    roughLfo.frequency.setValueAtTime(38, now);
    roughGain.gain.setValueAtTime(0.35, now);

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);

    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, now);
    amp.gain.linearRampToValueAtTime(0.32, now + 0.2);
    amp.gain.setValueAtTime(0.30, now + dur - 0.3);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(amp);
    amp.connect(this.output);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + dur);
    osc2.stop(now + dur);
  }

  // 8. Distressed Yowl: Caterwaul with undulating pitch and waveshaped saturation
  yowl() {
    const ctx = this.init();
    const now = ctx.currentTime;
    const dur = 1.9;

    const osc = ctx.createOscillator();
    osc.type = 'sawtooth';

    // Undulating pitch bend
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.linearRampToValueAtTime(540, now + 0.45);
    osc.frequency.linearRampToValueAtTime(410, now + 0.95);
    osc.frequency.linearRampToValueAtTime(620, now + 1.45);
    osc.frequency.exponentialRampToValueAtTime(320, now + dur);

    // Wide vibrato
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.setValueAtTime(6.0, now);
    vibratoGain.gain.setValueAtTime(22, now);
    vibrato.connect(osc.frequency);

    // Throat resonance
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.Q.value = 3.2;
    filter.frequency.setValueAtTime(850, now);
    filter.frequency.linearRampToValueAtTime(1400, now + 1.2);
    filter.frequency.linearRampToValueAtTime(700, now + dur);

    const amp = ctx.createGain();
    amp.gain.setValueAtTime(0.0001, now);
    amp.gain.linearRampToValueAtTime(0.24, now + 0.2);
    amp.gain.setValueAtTime(0.24, now + dur - 0.25);
    amp.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    osc.connect(filter);
    filter.connect(amp);
    amp.connect(this.output);

    vibrato.start(now);
    osc.start(now);
    vibrato.stop(now + dur);
    osc.stop(now + dur + 0.05);
  }
}

(function initSnugProceduralAudioExpansion() {
  if (window.__snugProceduralAudio) return;

  const emoteMethods = new Set(["laugh", "grunt", "confusion", "question", "excitement", "cheerful", "talking", "mumbling", "gasp", "sigh"]);
  const suiteMethods = new Set(["whistle", "stopwatch", "alarm", "siren", "rain", "snowCrunch", "fire", "impact", "ballWhoosh", "ballCatch", "paintSplatter", "buzzer"]);
  const catMethods = new Set(["meow", "question", "purr", "hiss", "trill", "chatter", "growl", "yowl"]);
  const catAliases = {
    "cat-meow": "meow", "cat-question": "question", "cat-purr": "purr", "cat-hiss": "hiss",
    "cat-trill": "trill", "cat-chatter": "chatter", "cat-growl": "growl", "cat-yowl": "yowl",
  };
  const catFileIds = {
    meow: "cat-meow", question: "cat-question", purr: "cat-purr", hiss: "cat-hiss",
    trill: "cat-trill", chatter: "cat-chatter", growl: "cat-growl", yowl: "cat-yowl",
  };
  const catThrottleMs = { meow: 12000, question: 18000, purr: 7000, hiss: 45000, trill: 12000, chatter: 30000, growl: 45000, yowl: 60000 };
  const aliases = {
    laughter: "laugh", laughing: "laugh", "minigame-win-laugh": "laugh", cheer: "cheerful", happy: "cheerful",
    surprise: "gasp", surprised: "gasp", sad: "sigh", thinking: "confusion", confused: "confusion",
    mumble: "mumbling", idle_bark: "talking", "idle-bark": "talking", talk: "talking", push: "grunt", jump: "grunt", effort: "grunt",
    "referee-whistle": "whistle", "race-whistle": "whistle", "timer-countdown": "stopwatch", "countdown-ticks": "stopwatch",
    "final-seconds": "alarm", "wrong-answer": "buzzer", timeout: "buzzer", "time-out": "buzzer",
    "snow-crunch": "snowCrunch", "snow-step": "snowCrunch", "ball-whoosh": "ballWhoosh", "ball-catch": "ballCatch",
    "paint-splatter": "paintSplatter", collision: "impact", "snowball-hit": "impact", "puffs-collision": "impact",
  };
  const fileIds = {
    laugh: "emote-laugh", grunt: "emote-grunt", confusion: "emote-confusion", question: "emote-question",
    excitement: "emote-excitement", cheerful: "emote-cheerful", talking: "emote-talking", mumbling: "emote-mumbling",
    gasp: "emote-gasp", sigh: "emote-sigh", whistle: "minigame-whistle", stopwatch: "minigame-stopwatch",
    alarm: "minigame-alarm", siren: "minigame-siren", rain: "ambience-rain", snowCrunch: "movement-snow-crunch",
    fire: "ambience-fire", impact: "minigame-impact", ballWhoosh: "minigame-ball-whoosh", ballCatch: "minigame-ball-catch",
    paintSplatter: "minigame-paint-splatter", buzzer: "minigame-buzzer",
  };
  const throttleMs = {
    laugh: 700, grunt: 280, confusion: 600, question: 600, excitement: 600, cheerful: 650, talking: 1800, mumbling: 900,
    gasp: 600, sigh: 900, whistle: 900, stopwatch: 650, alarm: 2200, siren: 1800, rain: 5100, snowCrunch: 150,
    fire: 4500, impact: 150, ballWhoosh: 170, ballCatch: 170, paintSplatter: 140, buzzer: 600,
  };
  const lastPlayed = new Map();
  let manifestPromise;
  let unlocked = false;
  let lastExpression = "";
  let lastCountdown = new WeakMap();
  let lastWarningKey = "";
  let lastWrongText = "";
  let chatterTimer = 0;

  const normalize = (value) => String(value || "").trim().toLowerCase().replace(/\.(mp3|ogg|wav|m4a)$/i, "").replace(/_/g, "-");
  const sharedContext = () => {
    const context = window.__snugAudio?.context?.() || window.__snugSfxEngine?.ctx || null;
    if (context && window.__snugSfxEngine && window.__snugSfxEngine.ctx !== context) window.__snugSfxEngine.ctx = context;
    return context;
  };
  const emotes = new ProceduralEmoteEngine(sharedContext, 0.18);
  const suite = new ProceduralAudioEngine(sharedContext, 0.38);
  const cats = new ProceduralCatAudioEngine(sharedContext, 0.16);

  async function manifest() {
    if (!manifestPromise) {
      manifestPromise = fetch("assets/audio/manifest.json", { cache: "no-store" }).then((response) => response.ok ? response.json() : {}).catch(() => ({}));
    }
    return manifestPromise;
  }

  function isEnabled() {
    return Boolean(window.__snugAudio?.state?.sfxEnabled);
  }

  async function resume() {
    const context = sharedContext();
    if (!context) return false;
    if (context.state === "suspended") {
      try { await context.resume(); } catch { return false; }
    }
    unlocked = context.state === "running";
    return unlocked;
  }

  async function customFileFor(method) {
    const list = (await manifest()).sfx || [];
    const wanted = fileIds[method] || method;
    const entry = list.find((item) => {
      const id = normalize(typeof item === "string" ? item : (item.id || item.name || item.file || item.src));
      return id === normalize(wanted) || id === normalize(method);
    });
    if (!entry) return "";
    const src = typeof entry === "string" ? entry : (entry.file || entry.src);
    return src ? (/^assets\//.test(src) ? src : `assets/audio/sfx/${src}`) : "";
  }

  async function playCustomFile(src, method, volume) {
    try {
      const audio = new Audio(src);
      audio.preload = "auto";
      audio.volume = volume ?? (emoteMethods.has(method) ? 0.28 : method === "rain" || method === "fire" ? 0.18 : 0.6);
      await audio.play();
      return true;
    } catch {
      return false;
    }
  }

  async function play(rawId, options = {}) {
    if (!isEnabled()) return false;
    const normalized = normalize(rawId);
    const aliasKey = aliases[normalized] || aliases[normalized.replace(/-/g, "_")] || rawId;
    const method = emoteMethods.has(aliasKey) || suiteMethods.has(aliasKey) ? aliasKey : aliases[normalize(aliasKey)];
    if (!method || (!emoteMethods.has(method) && !suiteMethods.has(method))) return false;
    const now = performance.now();
    const limit = options.force ? 0 : (throttleMs[method] || 120);
    if (now - (lastPlayed.get(method) || 0) < limit) return false;
    lastPlayed.set(method, now);
    if (!(await resume())) return false;
    const custom = await customFileFor(method);
    if (custom && await playCustomFile(custom, method)) return true;
    try {
      (emoteMethods.has(method) ? emotes : suite)[method]();
      return true;
    } catch {
      return false;
    }
  }

  async function playCat(rawId, options = {}) {
    if (!isEnabled()) return false;
    const method = catAliases[normalize(rawId)] || (catMethods.has(rawId) ? rawId : "");
    if (!method) return false;
    const now = performance.now();
    const throttleKey = `cat:${method}`;
    const limit = options.force ? 0 : catThrottleMs[method];
    const previous = lastPlayed.get(throttleKey);
    if (previous != null && now - previous < limit) return false;
    lastPlayed.set(throttleKey, now);
    if (!(await resume())) return false;
    const list = (await manifest()).sfx || [];
    const wanted = catFileIds[method];
    const entry = list.find((item) => {
      const id = normalize(typeof item === "string" ? item : (item.id || item.name || item.file || item.src));
      return id === wanted || id === normalize(method);
    });
    const src = entry && (typeof entry === "string" ? entry : (entry.file || entry.src));
    const resolved = src ? (/^assets\//.test(src) ? src : `assets/audio/sfx/${src}`) : "";
    if (resolved && await playCustomFile(resolved, method, 0.28)) return true;
    try {
      cats[method]();
      return true;
    } catch {
      return false;
    }
  }

  function activeGame() {
    return document.querySelector(".challenge-overlay")?.dataset.game
      || document.querySelector(".wave1-overlay")?.dataset.game
      || document.querySelector(".room-game-hud")?.dataset.game
      || "";
  }

  function currentWeather() {
    const badge = document.querySelector(".world-weather");
    const text = badge?.textContent || "";
    if (/snow/i.test(text)) return "Snow";
    if (/rain|thunderstorm/i.test(text) || badge?.classList.contains("storm")) return "Rain";
    return "Clear";
  }

  function spokenDialogueActive() {
    const speech = window.speechSynthesis;
    return Boolean(speech?.speaking || document.querySelector(".welcome-scene:not([hidden]), .npc-dialogue:not([hidden]), .conversation-panel:not([hidden])"));
  }

  function visible(element) {
    if (!element) return false;
    const style = getComputedStyle(element);
    return !element.hidden && style.display !== "none" && style.visibility !== "hidden";
  }

  function handleExpression(value) {
    const expression = normalize(value);
    const map = { laughter: "laugh", laugh: "laugh", happy: "cheerful", cheer: "cheerful", sad: "sigh", "side-eye": "confusion", thinking: "mumbling", confused: "confusion", surprise: "gasp", question: "question", excited: "excitement", excitement: "excitement", angry: "grunt" };
    if (map[expression]) play(map[expression]);
  }

  function inspectTimers() {
    document.querySelectorAll(".wave1-countdown, .challenge-countdown, .room-game-hud strong").forEach((node) => {
      if (!visible(node)) return;
      const value = node.textContent.trim();
      const previous = lastCountdown.get(node) || "";
      if (previous === value) return;
      lastCountdown.set(node, value);
      if (value === "3") play("stopwatch");
      if (/^1$/.test(previous) && /sprint|relay|curling/.test(activeGame())) play("whistle");
      if (/^(5|5s|0:05)$/i.test(value)) {
        const key = `${activeGame()}:${value}`;
        if (lastWarningKey !== key) { lastWarningKey = key; play("alarm"); }
      }
      if (/^go!?$/i.test(value) && /sprint|relay|curling/.test(activeGame())) play("whistle");
    });
  }

  function inspectFeedback() {
    document.querySelectorAll(".challenge-status, .toast, [role='alert']").forEach((node) => {
      if (!visible(node)) return;
      const text = node.textContent.trim();
      if (!text || text === lastWrongText) return;
      if (/wrong|try another|time(?:'s| is)? up|timeout|too late|missed|sequence reset/i.test(text)) {
        lastWrongText = text;
        play("buzzer");
      }
    });
  }

  function inspectPaint() {
    document.querySelectorAll(".challenge-overlay.draw .challenge-sketch:not([data-snug-audio-painted])").forEach((canvas) => {
      canvas.dataset.snugAudioPainted = "true";
      play("paintSplatter");
    });
  }

  function inspectAmbience() {
    if (!unlocked || !isEnabled() || document.hidden) return;
    if (currentWeather() === "Rain") play("rain");
    if (visible(document.querySelector(".challenge-overlay.lantern"))) play("fire");
  }

  function inspectExpression() {
    const expression = window.__snugPlayerAvatar?.faceState || "";
    if (!expression || expression === lastExpression) return;
    lastExpression = expression;
    handleExpression(expression);
  }

  function maybeNpcChatter() {
    if (!unlocked || !isEnabled() || document.hidden || spokenDialogueActive()) return;
    const nearby = document.querySelector(".nearby-card, .nearby-panel, [data-nearby-npc]");
    if (!visible(nearby)) return;
    play("talking");
  }

  window.addEventListener("snug-sfx", (event) => play(event.detail?.id || event.detail));
  window.addEventListener("snug-emote", (event) => play(event.detail?.id || event.detail));
  window.addEventListener("snug-procedural-sfx", (event) => play(event.detail?.id || event.detail));
  window.addEventListener("snug-cat-vocal", (event) => playCat(event.detail?.id || event.detail, event.detail || {}));
  window.addEventListener("snug-player-effort", () => play("grunt"));
  window.addEventListener("snug-minigame-achievement", (event) => {
    const detail = event.detail || {};
    if (detail.score == null || typeof detail.won !== "boolean") return;
    play(detail.won ? "laugh" : "sigh");
  });
  window.addEventListener("snug-footstep", () => { if (currentWeather() === "Snow") play("snowCrunch"); });

  document.addEventListener("pointerdown", (event) => {
    resume();
    const button = event.target.closest?.("button, [role='button']");
    if (button) {
      const label = `${button.dataset.expression || ""} ${button.dataset.emote || ""} ${button.getAttribute("aria-label") || ""} ${button.title || ""} ${button.textContent || ""}`.trim();
      if (/^(Happy|Calm|Cheeky|Angry|Sad|Laughter|Laugh|Yawn|Side-eye|Wave|Cheer|Surprise|Question|Excitement)$/i.test(label)) handleExpression(label);
      if (/jump|push|heave|shove/i.test(label)) play("grunt");
    }
    const target = event.target.closest?.("[data-challenge-target]");
    const overlay = target?.closest?.(".challenge-overlay");
    if (target && overlay?.classList.contains("snowball")) {
      play("ballWhoosh");
      setTimeout(() => play("impact"), 115);
    } else if (target && overlay?.classList.contains("puffs")) {
      play("impact");
    } else if (target && overlay?.classList.contains("potato")) {
      play("ballWhoosh");
      setTimeout(() => play("ballCatch"), 120);
    }
  }, true);

  const observer = new MutationObserver(() => {
    inspectTimers();
    inspectFeedback();
    inspectPaint();
  });
  observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["class", "hidden"] });

  const monitor = setInterval(() => {
    inspectTimers();
    inspectExpression();
    inspectAmbience();
    if (++chatterTimer >= 5) { chatterTimer = 0; maybeNpcChatter(); }
  }, 1000);

  window.addEventListener("pagehide", () => clearInterval(monitor), { once: true });
  window.__snugProceduralAudio = {
    version: "0.9.45",
    context: sharedContext,
    emotes,
    suite,
    cats,
    play,
    playCat,
    aliases: { ...aliases, ...catAliases },
    customFileIds: { ...fileIds, ...Object.fromEntries(Object.entries(catFileIds).map(([key, value]) => [`cat:${key}`, value])) },
    methods: { emotes: [...emoteMethods], suite: [...suiteMethods], cats: [...catMethods] },
    inspect: () => ({ sharedContext: sharedContext() === window.__snugSfxEngine?.ctx && cats.ctx === window.__snugSfxEngine?.ctx, contextState: sharedContext()?.state || "unavailable", sfxEnabled: isEnabled(), weather: currentWeather(), activeGame: activeGame(), lastExpression }),
  };
})();

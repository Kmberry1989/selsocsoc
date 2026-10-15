/* Snug Jam — in-game multiplayer jam sessions for Selfie Social Society.
 *
 * Tappable instruments in the plaza open a jam panel: live-playable voices
 * plus a compact 16-step, 4-track loop sequencer. Loop patterns sync over
 * RTDB (pattern data only, never audio); every client renders all
 * participants' loops locally through its own Web Audio graph. Only real,
 * currently-connected players ever sound — nothing is simulated.
 *
 * Sync model: fixed 96 BPM. Each jam entry carries a shared loop anchor
 * (server ms). Clients estimate server time from the RTDB REST `Date`
 * header on every poll; loops are scheduled against the anchor with a
 * lookahead scheduler. Casual-grade sync (typically < 300ms skew);
 * documented limitation, not sample-accurate.
 */
(() => {
  if (window.__snugJamLoaded) return;
  window.__snugJamLoaded = true;

  const BPM = 96;
  const STEPS = 16;
  const TRACKS = 7;
  const STEP_MS = 60000 / BPM / 4; // 156.25
  const LOOP_MS = STEP_MS * STEPS; // 2500
  const JAM_CUTOFF_MS = 25000;
  const POLL_MS = 4000;
  const HEARTBEAT_MS = 15000;
  const EMPTY_PATTERN = "0000000000000000000000000000";
  const PATTERN_RE = /^[0-9a-f]{28}$/;
  const PATTERN_RE_LEGACY = /^[0-9a-f]{16}$/;

  const INSTRUMENTS = [
    { id: "drum",   name: "Drum",   icon: "\u{1F941}", color: "#d95e4a", notes: [130.81, 146.83, 164.81, 196.00, 220.00], labels: ["C", "D", "E", "G", "A"] },
    { id: "chimes", name: "Chimes", icon: "\u{1F3B6}", color: "#e2b43f", notes: [523.25, 587.33, 659.25, 783.99, 880.00], labels: ["C", "D", "E", "G", "A"] },
    { id: "bass",   name: "Bass",   icon: "\u{1F3B8}", color: "#7a68a6", notes: [65.41, 73.42, 82.41, 98.00, 110.00],   labels: ["C", "D", "E", "G", "A"] },
    { id: "flute",  name: "Flute",  icon: "\u{1F3BA}", color: "#5aa9c7", notes: [261.63, 293.66, 329.63, 392.00, 440.00], labels: ["C", "D", "E", "G", "A"] },
    { id: "piano",  name: "Piano",  icon: "\u{1F3B9}", color: "#2f2f3d", notes: [261.63, 293.66, 329.63, 392.00, 440.00], labels: ["C", "D", "E", "G", "A"] },
    { id: "harp",   name: "Harp",   icon: "\u{1F3BC}", color: "#ddd6c2", notes: [523.25, 587.33, 659.25, 783.99, 880.00], labels: ["C", "D", "E", "G", "A"] },
    { id: "guitar", name: "Guitar", icon: "\u{1FA95}", color: "#9c6b3d", notes: [130.81, 146.83, 164.81, 196.00, 220.00], labels: ["C", "D", "E", "G", "A"] },
  ];

  // Jam spot in the plaza, just south of the festival string lights: 7 instruments on an arc.
  const JAM_SPOT = [];
  for (let i = 0; i < TRACKS; i++) {
    const a = (i - (TRACKS - 1) / 2) * 0.42;
    JAM_SPOT.push({ inst: i, x: 17 + 2.8 * Math.sin(a), z: 10.5 + 2.8 * Math.cos(a) });
  }
  const JAM_MAT = { x: 17, z: 10.5, r: 3.4 };

  const state = {
    session: null,
    roomId: "plaza",
    open: false,
    playing: false,
    instrument: 0,
    pattern: EMPTY_PATTERN,
    grid: null, // [track][step] booleans, local working copy
    muted: new Set(),
    peers: new Map(),
    anchor: 0,
    serverOffset: 0,
    pollTimer: null,
    heartbeatTimer: null,
    pushTimer: null,
    schedTimer: null,
    nextStepIdx: 0,
    nextStepCtx: 0,
    anchorCtx: 0,
    ducked: false,
    jamBus: null,
    group: null,
    worldScene: null,
    raycaster: null,
    pointer: null,
    renderer: null,
    pointerHandler: null,
    threePromise: null,
    ui: null,
    seeded: false,
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = (value) => { const s = document.createElement("span"); s.textContent = String(value ?? ""); return s.innerHTML; };
  const playerName = () => $(".profile-chip b")?.textContent?.trim() || "Player";
  const playerColor = () => $(".avatar-dot")?.style?.background || "#ed765e";

  function roomId() { return window.__snugRoomId || state.roomId || "plaza"; }

  // ---------- pattern encode/decode: 7 tracks x 16 steps -> 28 hex chars ----------
  // Legacy 16-char patterns (4 tracks, from the first jam build) are accepted
  // and expanded: first 4 tracks map over, the rest stay empty.
  function gridToPattern(grid) {
    let hex = "";
    for (let t = 0; t < TRACKS; t++) {
      let val = 0;
      for (let s = 0; s < STEPS; s++) val = (val << 1) | (grid?.[t]?.[s] ? 1 : 0);
      hex += val.toString(16).padStart(4, "0");
    }
    return hex;
  }
  function expandPattern(pattern) {
    if (typeof pattern !== "string") return EMPTY_PATTERN;
    if (PATTERN_RE.test(pattern)) return pattern;
    if (PATTERN_RE_LEGACY.test(pattern)) return pattern + "000000000000";
    return EMPTY_PATTERN;
  }
  function patternToGrid(pattern) {
    const grid = Array.from({ length: TRACKS }, () => Array(STEPS).fill(false));
    const full = expandPattern(pattern);
    if (full === EMPTY_PATTERN && pattern !== EMPTY_PATTERN) return grid;
    for (let t = 0; t < TRACKS; t++) {
      const val = parseInt(full.slice(t * 4, t * 4 + 4), 16);
      for (let s = 0; s < STEPS; s++) grid[t][s] = Boolean((val >> (STEPS - 1 - s)) & 1);
    }
    return grid;
  }
  function bitSet(pattern, track, step) {
    const full = expandPattern(pattern);
    const val = parseInt(full.slice(track * 4, track * 4 + 4), 16);
    return Boolean((val >> (STEPS - 1 - step)) & 1);
  }
  function countSteps(pattern) {
    let n = 0;
    for (let t = 0; t < TRACKS; t++) for (let s = 0; s < STEPS; s++) n += bitSet(pattern, t, s) ? 1 : 0;
    return n;
  }
  function validEntry(e) {
    return !!e && typeof e === "object" && typeof e.uid === "string" && !!e.uid &&
      typeof e.name === "string" && !!e.name && typeof e.pattern === "string" &&
      (PATTERN_RE.test(e.pattern) || PATTERN_RE_LEGACY.test(e.pattern)) &&
      Number.isInteger(e.instrument) && e.instrument >= 0 && e.instrument < TRACKS &&
      typeof e.anchor === "number" && typeof e.updatedAt === "number";
  }
  function validVinyl(v) {
    return !!v && typeof v === "object" && typeof v.id === "string" && !!v.id &&
      typeof v.title === "string" && !!v.title && v.title.length <= 24 &&
      typeof v.artist === "string" &&
      Number.isInteger(v.instrument) && v.instrument >= 0 && v.instrument < TRACKS &&
      typeof v.pattern === "string" && (PATTERN_RE.test(v.pattern) || PATTERN_RE_LEGACY.test(v.pattern)) &&
      (typeof v.bpm !== "number" || (v.bpm >= 40 && v.bpm <= 200));
  }

  // ---------- RTDB (REST, same pattern as the other feature modules) ----------
  function databaseBase() {
    const options = state.session?.app?.options || {};
    return String(options.databaseURL || `https://${options.projectId || state.session?.projectId}-default-rtdb.firebaseio.com`).replace(/\/$/, "");
  }
  async function rtdb(path, options = {}) {
    if (!state.session?.user) throw new Error("Waiting for Firebase sign-in");
    const token = await state.session.user.getIdToken();
    const [pathPart, query = ""] = String(path).split("?");
    const encoded = pathPart.split("/").map(encodeURIComponent).join("/");
    const started = Date.now();
    const response = await fetch(`${databaseBase()}/${encoded}.json${query ? `?${query}` : ""}`, {
      ...options,
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    });
    const rtt = Date.now() - started;
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body?.error || `Jam network returned ${response.status}`);
    }
    const serverDate = Date.parse(response.headers.get("date") || "");
    if (!Number.isNaN(serverDate)) state.serverOffset = serverDate + rtt / 2 - Date.now();
    return response.json().catch(() => null);
  }
  const serverNow = () => Date.now() + state.serverOffset;

  // ---------- audio: procedural voices (SFX-lab principles) ----------
  function ensureCtx() {
    const eng = window.__snugSfxEngine;
    if (!eng) return null;
    try { eng.init(); } catch { return null; }
    const ctx = eng.ctx;
    if (!ctx) return null;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    return ctx;
  }
  function ensureBus(ctx) {
    if (state.jamBus) return state.jamBus;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -18; comp.knee.value = 12; comp.ratio.value = 6;
    comp.attack.value = 0.004; comp.release.value = 0.18;
    const bus = ctx.createGain();
    bus.gain.value = 0.85;
    bus.connect(comp); comp.connect(ctx.destination);
    state.jamBus = bus;
    return bus;
  }
  function noiseBuffer(ctx, seconds) {
    const len = Math.max(1, Math.floor(ctx.sampleRate * seconds));
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    return buf;
  }
  // track -> voice; all follow osc -> filter -> gain-envelope -> bus
  function playVoice(track, freq, t, vol) {
    const ctx = ensureCtx();
    if (!ctx) return;
    const dest = ensureBus(ctx);
    vol = Math.min(0.6, vol);
    if (track === 0) {
      // Sun Drum: membrane pitch drop + click
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(freq * 2, t);
      o.frequency.exponentialRampToValueAtTime(Math.max(30, freq * 0.5), t + 0.12);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
      o.connect(g); g.connect(dest); o.start(t); o.stop(t + 0.3);
      const n = ctx.createBufferSource(); n.buffer = noiseBuffer(ctx, 0.03);
      const nf = ctx.createBiquadFilter(); nf.type = "highpass"; nf.frequency.value = 2500;
      const ng = ctx.createGain();
      ng.gain.setValueAtTime(vol * 0.5, t);
      ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
      n.connect(nf); nf.connect(ng); ng.connect(dest); n.start(t); n.stop(t + 0.04);
    } else if (track === 1) {
      // Star Chimes: bright pluck + octave shimmer
      [[freq, "triangle", vol, 0.5], [freq * 2, "sine", vol * 0.35, 0.32]].forEach(([f, type, v, dur]) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = type; o.frequency.setValueAtTime(f, t);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(v, t + 0.005);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(dest); o.start(t); o.stop(t + dur + 0.02);
      });
    } else if (track === 2) {
      // Moon Bass: sawtooth through a closing lowpass
      const o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      o.type = "sawtooth"; o.frequency.setValueAtTime(freq, t);
      f.type = "lowpass"; f.Q.value = 2;
      f.frequency.setValueAtTime(420, t);
      f.frequency.exponentialRampToValueAtTime(140, t + 0.4);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      o.connect(f); f.connect(g); g.connect(dest); o.start(t); o.stop(t + 0.55);
    } else if (track === 4) {
      // Piano: bright hammered tone — triangle + sine stack, fast attack, exp decay, slight detune
      [[0, "triangle", vol, 0.9], [4, "sine", vol * 0.4, 0.5], [-4, "sine", vol * 0.4, 0.5]].forEach(([cents, type, v, dur]) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.type = type;
        o.frequency.setValueAtTime(freq, t);
        o.detune.setValueAtTime(cents, t);
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(v, t + 0.004);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); g.connect(dest); o.start(t); o.stop(t + dur + 0.02);
      });
    } else if (track === 5) {
      // Harp: plucked shimmer — triangle, fast decay, touch of highpass
      const o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      o.type = "triangle"; o.frequency.setValueAtTime(freq, t);
      f.type = "highpass"; f.frequency.value = 900;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.003);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
      o.connect(f); f.connect(g); g.connect(dest); o.start(t); o.stop(t + 0.75);
      const o2 = ctx.createOscillator(), g2 = ctx.createGain();
      o2.type = "sine"; o2.frequency.setValueAtTime(freq * 3, t);
      g2.gain.setValueAtTime(0.0001, t);
      g2.gain.exponentialRampToValueAtTime(vol * 0.25, t + 0.003);
      g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
      o2.connect(g2); g2.connect(dest); o2.start(t); o2.stop(t + 0.45);
    } else {
      // Guitar: plucked string body — sawtooth through a closing lowpass, short delay for string resonance
      const o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      o.type = "sawtooth"; o.frequency.setValueAtTime(freq, t);
      f.type = "lowpass"; f.Q.value = 1.5;
      f.frequency.setValueAtTime(2400, t);
      f.frequency.exponentialRampToValueAtTime(500, t + 0.35);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(vol, t + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
      o.connect(f); f.connect(g); g.connect(dest);
      const d = ctx.createDelay(0.2); d.delayTime.setValueAtTime(0.09, t);
      const fb = ctx.createGain(); fb.gain.setValueAtTime(0.25, t);
      const wet = ctx.createGain(); wet.gain.setValueAtTime(0.3, t);
      g.connect(d); d.connect(fb); fb.connect(d); d.connect(wet); wet.connect(dest);
      o.start(t); o.stop(t + 0.7);
    }
  }
  // sequencer steps play a pentatonic walk per instrument voice
  function stepNote(track, step) {
    return INSTRUMENTS[track].notes[step % INSTRUMENTS[track].notes.length];
  }

  // ---------- shared beat clock + lookahead scheduler ----------
  function ensureAnchor() {
    let anchor = state.anchor > 0 ? state.anchor : Infinity;
    for (const p of state.peers.values()) {
      if (typeof p.anchor === "number" && p.anchor > 0) anchor = Math.min(anchor, p.anchor);
    }
    if (!isFinite(anchor)) anchor = Math.ceil((serverNow() + 900) / LOOP_MS) * LOOP_MS;
    state.anchor = anchor;
    return anchor;
  }
  function activeParts() {
    const parts = [{ uid: "self", pattern: state.pattern }];
    for (const [uid, p] of state.peers) {
      if (state.muted.has(uid)) continue;
      parts.push({ uid, pattern: p.pattern });
    }
    return parts.slice(0, 8); // voice budget: self + 7 peers max
  }
  function scheduleStep(step, t) {
    let voices = 0;
    for (const part of activeParts()) {
      for (let tr = 0; tr < TRACKS; tr++) {
        if (voices >= 12) return;
        if (bitSet(part.pattern, tr, step)) {
          playVoice(tr, stepNote(tr, step), t, 0.42);
          voices++;
        }
      }
    }
  }
  function schedulerTick() {
    const ctx = ensureCtx();
    if (!ctx || !state.playing || !state.open) return;
    const horizon = ctx.currentTime + 0.18;
    let guard = 0;
    while (state.nextStepCtx < horizon && guard++ < 64) {
      scheduleStep(state.nextStepIdx % STEPS, Math.max(state.nextStepCtx, ctx.currentTime + 0.01));
      state.nextStepIdx++;
      state.nextStepCtx += STEP_MS / 1000;
    }
    paintPlayhead();
  }
  function startScheduler() {
    stopScheduler();
    const ctx = ensureCtx();
    if (!ctx) return;
    ensureBus(ctx);
    const anchor = ensureAnchor();
    const anchorCtx = ctx.currentTime + (anchor - serverNow()) / 1000;
    state.anchorCtx = anchorCtx;
    state.nextStepIdx = Math.max(0, Math.ceil((ctx.currentTime + 0.08 - anchorCtx) / (STEP_MS / 1000)));
    state.nextStepCtx = anchorCtx + state.nextStepIdx * (STEP_MS / 1000);
    state.schedTimer = setInterval(schedulerTick, 25);
  }
  function stopScheduler() {
    if (state.schedTimer) clearInterval(state.schedTimer);
    state.schedTimer = null;
  }

  // ---------- duck area music while jamming ----------
  function duckMusic(on) {
    const A = window.__snugAudio;
    if (!A?.state || typeof A.syncMusic !== "function") return;
    if (on) {
      if (A.state.musicEnabled && !state.ducked) {
        state.ducked = true;
        A.state.musicEnabled = false;
        A.syncMusic(true);
      }
    } else if (state.ducked) {
      state.ducked = false;
      A.state.musicEnabled = true;
      A.syncMusic(true);
    }
  }

  // ---------- sync: pattern data only, never audio ----------
  function queuePush() {
    clearTimeout(state.pushTimer);
    state.pushTimer = setTimeout(pushJam, 700);
  }
  async function pushJam() {
    if (!state.session?.user || !state.open) return;
    try {
      await rtdb(`jam/${roomId()}/${state.session.uid}`, {
        method: "PUT",
        body: JSON.stringify({
          uid: state.session.uid,
          name: playerName().slice(0, 18),
          outfit: String(playerColor()).slice(0, 32),
          instrument: state.instrument,
          pattern: state.pattern,
          anchor: state.anchor,
          updatedAt: Date.now(),
        }),
      });
    } catch { /* offline: local jam continues, sync resumes on next push */ }
  }
  async function pollJam() {
    if (!state.session?.user || !state.open) return;
    try {
      const data = await rtdb(`jam/${roomId()}`);
      const cutoff = Date.now() - JAM_CUTOFF_MS;
      const peers = new Map();
      for (const [uid, entry] of Object.entries(data || {})) {
        if (!entry || uid === state.session.uid) continue;
        if (!validEntry(entry)) continue;
        if (Number(entry.updatedAt) < cutoff) continue;
        peers.set(uid, entry);
      }
      state.peers = peers;
      renderPeers();
    } catch { /* keep last known peers */ }
  }
  async function leaveJam(silent) {
    if (state.session?.user) {
      try {
        await rtdb(`jam/${state.roomId}/${state.session.uid}`, { method: "DELETE", keepalive: true });
      } catch { /* best effort */ }
    }
    if (!silent) {
      state.peers = new Map();
      state.muted = new Set();
    }
  }
  function onRoomChanged(event) {
    const next = event?.detail?.roomId || "plaza";
    if (next === state.roomId) return;
    leaveJam();
    state.roomId = next;
    state.peers = new Map();
    state.anchor = 0;
    if (state.open) {
      pushJam();
      pollJam();
    }
    renderPeers();
  }

  function attach(session) {
    state.session = session;
    state.roomId = roomId();
  }

  // ---------- 3D: tappable instruments at the plaza jam spot ----------
  async function three() {
    let T = window.__snugThree;
    if (typeof T?.BoxGeometry === "function") return T;
    state.threePromise ||= import("./vendor/three/three.module.js");
    return state.threePromise;
  }
  function mat(color, rough = 0.85) {
    return new (threeNS.MeshStandardMaterial)({ color, roughness: rough });
  }
  let threeNS = null;
  function buildInstrument(T, idx) {
    const g = new T.Group();
    g.userData.jamInstrument = idx;
    const conf = INSTRUMENTS[idx];
    const accent = new T.MeshStandardMaterial({ color: conf.color, roughness: 0.7 });
    if (idx === 0) {
      // Sun Drum: wooden shell + cream membrane
      const shell = new T.Mesh(new T.CylinderGeometry(0.42, 0.46, 0.5, 18), mat(0x8a5a33));
      shell.position.y = 0.25; shell.castShadow = true; g.add(shell);
      const skin = new T.Mesh(new T.CylinderGeometry(0.4, 0.4, 0.04, 18), mat(0xf3e3c2, 0.95));
      skin.position.y = 0.51; g.add(skin);
    } else if (idx === 1) {
      // Star Chimes: frame + 5 graduated golden bars
      const frameMat = mat(0x5b4232);
      [-0.32, 0.32].forEach((x) => {
        const post = new T.Mesh(new T.BoxGeometry(0.07, 0.5, 0.07), frameMat);
        post.position.set(x, 0.25, 0); g.add(post);
      });
      for (let i = 0; i < 5; i++) {
        const bar = new T.Mesh(new T.BoxGeometry(0.11, 0.05, 0.5 - i * 0.06), accent);
        bar.position.set(-0.26 + i * 0.13, 0.52 - i * 0.02, 0);
        bar.castShadow = true; g.add(bar);
      }
    } else if (idx === 2) {
      // Moon Bass: body + leaning neck
      const body = new T.Mesh(new T.BoxGeometry(0.55, 0.7, 0.28), accent);
      body.position.y = 0.45; body.castShadow = true; g.add(body);
      const neck = new T.Mesh(new T.BoxGeometry(0.12, 1.1, 0.1), mat(0x4a3526));
      neck.position.set(0.18, 1.15, 0); neck.rotation.z = -0.28; g.add(neck);
    } else if (idx === 4) {
      // Piano: upright cabinet + white key strip
      const cab = new T.Mesh(new T.BoxGeometry(0.95, 0.85, 0.5), mat(0x2f2f3d, 0.5));
      cab.position.y = 0.62; cab.castShadow = true; g.add(cab);
      const keys = new T.Mesh(new T.BoxGeometry(0.8, 0.05, 0.2), mat(0xf2ede0, 0.6));
      keys.position.set(0, 0.66, 0.3); g.add(keys);
      const top = new T.Mesh(new T.BoxGeometry(0.99, 0.06, 0.54), mat(0x23232c, 0.5));
      top.position.y = 1.07; g.add(top);
    } else if (idx === 5) {
      // Harp: pillar + angled neck + 5 strings
      const pillar = new T.Mesh(new T.BoxGeometry(0.1, 1.35, 0.1), mat(0x8a6a3f));
      pillar.position.set(-0.32, 0.67, 0); pillar.castShadow = true; g.add(pillar);
      const neck = new T.Mesh(new T.BoxGeometry(0.8, 0.1, 0.1), mat(0x8a6a3f));
      neck.position.set(0.02, 1.28, 0); neck.rotation.z = -0.32; g.add(neck);
      const base = new T.Mesh(new T.BoxGeometry(0.7, 0.1, 0.24), mat(0x6b4f2f));
      base.position.set(0, 0.05, 0); g.add(base);
      const stringMat = new T.MeshStandardMaterial({ color: 0xe8e4da, roughness: 0.4 });
      for (let i = 0; i < 5; i++) {
        const x = -0.22 + i * 0.13;
        const h = 1.05 - i * 0.09;
        const str = new T.Mesh(new T.CylinderGeometry(0.008, 0.008, h, 6), stringMat);
        str.position.set(x, 0.12 + h / 2, 0); g.add(str);
      }
    } else {
      // Guitar: round body + leaning neck + head
      const body = new T.Mesh(new T.CylinderGeometry(0.3, 0.3, 0.16, 18), accent);
      body.rotation.x = Math.PI / 2; body.position.y = 0.42; body.castShadow = true; g.add(body);
      const hole = new T.Mesh(new T.CylinderGeometry(0.09, 0.09, 0.17, 14), mat(0x1c1410, 0.9));
      hole.rotation.x = Math.PI / 2; hole.position.y = 0.42; g.add(hole);
      const neck = new T.Mesh(new T.BoxGeometry(0.09, 0.85, 0.07), mat(0x4a3526));
      neck.position.set(0.22, 0.95, 0); neck.rotation.z = -0.5; g.add(neck);
      const head = new T.Mesh(new T.BoxGeometry(0.12, 0.22, 0.06), mat(0x3a2a1e));
      head.position.set(0.42, 1.28, 0); head.rotation.z = -0.5; g.add(head);
    }
    return g;
  }
  function buildSign(T) {
    const g = new T.Group();
    const post = new T.Mesh(new T.CylinderGeometry(0.06, 0.08, 1.5, 10), mat(0x5b4232));
    post.position.y = 0.75; g.add(post);
    const canvas = document.createElement("canvas");
    canvas.width = 256; canvas.height = 128;
    const c = canvas.getContext("2d");
    c.fillStyle = "#7a5c3e"; c.fillRect(0, 0, 256, 128);
    c.strokeStyle = "#4a3526"; c.lineWidth = 10; c.strokeRect(5, 5, 246, 118);
    c.fillStyle = "#fff7e8"; c.font = "bold 64px system-ui, sans-serif";
    c.textAlign = "center"; c.textBaseline = "middle";
    c.fillText("\u{1F3B5} JAM", 128, 68);
    const tex = new T.CanvasTexture(canvas);
    tex.colorSpace = T.SRGBColorSpace;
    const board = new T.Mesh(
      new T.BoxGeometry(1.15, 0.58, 0.07),
      new T.MeshStandardMaterial({ map: tex, roughness: 0.9 })
    );
    board.position.y = 1.55; board.castShadow = true; g.add(board);
    return g;
  }
  async function syncWorld(force) {
    const world = window.__snugWorld;
    if (!world?.scene || world.mode === "home") {
      if (state.group) { state.group.parent?.remove(state.group); state.group = null; }
      return;
    }
    if (!force && state.group && state.worldScene === world.scene) return;
    let T;
    try { T = await three(); } catch { return; }
    threeNS = T;
    if (state.group) state.group.parent?.remove(state.group);
    const group = new T.Group();
    group.name = "SnugJamSpot";
    const disc = new T.Mesh(new T.CylinderGeometry(JAM_MAT.r, JAM_MAT.r, 0.07, 28), mat(0x9a7448, 0.95));
    disc.position.set(JAM_MAT.x, 0.035, JAM_MAT.z);
    disc.receiveShadow = true;
    group.add(disc);
    const ring = new T.Mesh(new T.TorusGeometry(JAM_MAT.r - 0.12, 0.05, 10, 40), mat(0xe2b43f, 0.6));
    ring.rotation.x = Math.PI / 2;
    ring.position.set(JAM_MAT.x, 0.09, JAM_MAT.z);
    group.add(ring);
    for (const spot of JAM_SPOT) {
      const inst = buildInstrument(T, spot.inst);
      inst.position.set(spot.x, 0.07, spot.z);
      inst.rotation.y = Math.atan2(JAM_MAT.x - spot.x, JAM_MAT.z - spot.z);
      group.add(inst);
    }
    const sign = buildSign(T);
    sign.position.set(JAM_MAT.x, 0, JAM_MAT.z - JAM_MAT.r - 0.7);
    group.add(sign);
    world.scene.add(group);
    state.group = group;
    state.worldScene = world.scene;
    installPicking(world, T);
  }
  function installPicking(world, T) {
    const element = world.renderer?.domElement;
    if (!element || state.renderer === element) return;
    if (state.renderer && state.pointerHandler) state.renderer.removeEventListener("pointerup", state.pointerHandler, true);
    state.renderer = element;
    state.raycaster = new T.Raycaster();
    state.pointer = new T.Vector2();
    state.pointerHandler = (event) => {
      if (!state.group || state.open) return;
      const rect = element.getBoundingClientRect();
      state.pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      state.raycaster.setFromCamera(state.pointer, world.camera);
      const hit = state.raycaster.intersectObject(state.group, true)[0];
      if (!hit) return;
      let node = hit.object;
      while (node && !Number.isInteger(node.userData?.jamInstrument)) node = node.parent;
      if (Number.isInteger(node?.userData?.jamInstrument)) {
        event.preventDefault();
        event.stopPropagation();
        openPanel(node.userData.jamInstrument);
      }
    };
    element.addEventListener("pointerup", state.pointerHandler, true);
  }

  // ---------- UI ----------
  function seedStarter() {
    if (state.seeded) return;
    state.seeded = true;
    try {
      if (localStorage.getItem("snug-jam-seeded")) return;
      localStorage.setItem("snug-jam-seeded", "1");
    } catch { return; }
    // tiny starter groove: four-on-floor drum + sparse bass
    const grid = patternToGrid(EMPTY_PATTERN);
    for (let s = 0; s < STEPS; s += 4) grid[0][s] = true;
    grid[2][0] = true; grid[2][7] = true; grid[2][10] = true;
    grid[1][4] = true; grid[1][12] = true;
    state.grid = grid;
    state.pattern = gridToPattern(grid);
  }
  function buildUI() {
    if (state.ui) return state.ui;
    const backdrop = document.createElement("div");
    backdrop.className = "jam-backdrop";
    backdrop.hidden = true;
    backdrop.innerHTML = `
      <div class="jam-sheet" role="dialog" aria-label="Jam session">
        <div class="jam-head">
          <h2>\u{1F3B5} Jam<small class="jam-sub"></small></h2>
          <button class="jam-close" aria-label="Close jam">\u00D7</button>
        </div>
        <div class="jam-sec"><small>Play</small><div class="jam-instruments"></div></div>
        <div class="jam-sec"><div class="jam-pads"></div></div>
        <div class="jam-sec"><small>Your loop</small>
          <div class="jam-transport">
            <button class="jam-play primary">\u25B6 Play</button>
            <button class="jam-clear">Clear</button>
          </div>
          <div class="jam-gridwrap"><div class="jam-grid"></div></div>
        </div>
        <div class="jam-sec"><small>Vinyl</small>
          <div class="jam-transport">
            <button class="jam-press primary">💿 Press to vinyl</button>
          </div>
          <div class="jam-vinylform" hidden>
            <label class="vinyl-field"><span>Title</span><input class="vinyl-title" maxlength="24" autocomplete="off"></label>
            <div class="vinyl-sum"></div>
            <div class="jam-transport">
              <button class="vinyl-confirm primary">Press</button>
              <button class="vinyl-cancel">Cancel</button>
            </div>
            <div class="vinyl-status" role="status"></div>
          </div>
        </div>
        <div class="jam-sec"><small>Jammers</small><div class="jam-jammers"></div>
          <div class="jam-note"></div>
        </div>
      </div>`;
    document.body.appendChild(backdrop);
    const ui = {
      backdrop,
      sub: $(".jam-sub", backdrop),
      close: $(".jam-close", backdrop),
      instruments: $(".jam-instruments", backdrop),
      pads: $(".jam-pads", backdrop),
      play: $(".jam-play", backdrop),
      clear: $(".jam-clear", backdrop),
      grid: $(".jam-grid", backdrop),
      jammers: $(".jam-jammers", backdrop),
      note: $(".jam-note", backdrop),
      press: $(".jam-press", backdrop),
      vinylForm: $(".jam-vinylform", backdrop),
      vinylTitle: $(".vinyl-title", backdrop),
      vinylSum: $(".vinyl-sum", backdrop),
      vinylConfirm: $(".vinyl-confirm", backdrop),
      vinylCancel: $(".vinyl-cancel", backdrop),
      vinylStatus: $(".vinyl-status", backdrop),
    };
    ui.close.addEventListener("click", () => closePanel());
    backdrop.addEventListener("pointerdown", (e) => { if (e.target === backdrop) closePanel(); });
    ui.play.addEventListener("click", () => togglePlay());
    ui.press.addEventListener("click", () => {
      if (!state.session?.user) { ui.vinylStatus.textContent = "Sign in to press vinyl."; }
      else ui.vinylStatus.textContent = "";
      ui.vinylForm.hidden = false;
      ui.vinylTitle.value = `${playerName()}'s Jam`;
      const steps = countSteps(state.pattern);
      ui.vinylSum.textContent = `${INSTRUMENTS[state.instrument].name} · ${steps} step${steps === 1 ? "" : "s"}`;
      window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "ui-tap" } }));
    });
    ui.vinylCancel.addEventListener("click", () => {
      ui.vinylForm.hidden = true;
      ui.vinylStatus.textContent = "";
      window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "ui-back" } }));
    });
    ui.vinylConfirm.addEventListener("click", () => {
      const vinyl = pressVinyl(ui.vinylTitle.value);
      if (!vinyl) {
        ui.vinylStatus.textContent = "Add at least one step to your loop first.";
        return;
      }
      ui.vinylForm.hidden = true;
      ui.vinylStatus.textContent = "";
      ui.note.textContent = `Pressed “${vinyl.title}” — play it on your home record player.`;
      window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "achievement-unlock" } }));
    });
    ui.clear.addEventListener("click", () => {
      state.grid = patternToGrid(EMPTY_PATTERN);
      state.pattern = EMPTY_PATTERN;
      renderGrid(); queuePush();
      window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "ui-back" } }));
    });
    // instrument buttons
    INSTRUMENTS.forEach((inst, i) => {
      const b = document.createElement("button");
      b.innerHTML = `<i>${inst.icon}</i><span>${esc(inst.name)}</span>`;
      b.setAttribute("aria-label", inst.name);
      b.addEventListener("click", () => {
        state.instrument = i;
        renderInstruments(); renderPads(); queuePush();
        window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "ui-tap" } }));
      });
      ui.instruments.appendChild(b);
    });
    // note pads
    for (let n = 0; n < 5; n++) {
      const b = document.createElement("button");
      b.addEventListener("pointerdown", (e) => { e.preventDefault(); liveNote(n); });
      ui.pads.appendChild(b);
    }
    // sequencer grid: 4 rows x 16 steps
    for (let t = 0; t < TRACKS; t++) {
      const row = document.createElement("div");
      row.className = "jam-row" + (t === 0 ? " beat" : "");
      const label = document.createElement("span");
      label.textContent = INSTRUMENTS[t].icon;
      row.appendChild(label);
      for (let s = 0; s < STEPS; s++) {
        const cell = document.createElement("button");
        cell.className = "jam-step";
        cell.setAttribute("aria-label", `${INSTRUMENTS[t].name} step ${s + 1}`);
        cell.addEventListener("click", () => {
          state.grid[t][s] = !state.grid[t][s];
          state.pattern = gridToPattern(state.grid);
          renderGrid(); queuePush();
          window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "ui-tap" } }));
        });
        row.appendChild(cell);
      }
      ui.grid.appendChild(row);
    }
    state.ui = ui;
    return ui;
  }
  function renderInstruments() {
    const ui = state.ui; if (!ui) return;
    [...ui.instruments.children].forEach((b, i) => b.classList.toggle("active", i === state.instrument));
  }
  function renderPads() {
    const ui = state.ui; if (!ui) return;
    const inst = INSTRUMENTS[state.instrument];
    [...ui.pads.children].forEach((b, n) => { b.textContent = inst.labels[n]; });
  }
  function renderGrid() {
    const ui = state.ui; if (!ui) return;
    const rows = ui.grid.children;
    for (let t = 0; t < TRACKS; t++) {
      const cells = rows[t].children;
      for (let s = 0; s < STEPS; s++) cells[s + 1].classList.toggle("on", Boolean(state.grid?.[t]?.[s]));
    }
  }
  function paintPlayhead() {
    const ui = state.ui; if (!ui || !state.playing) return;
    const ctx = ensureCtx(); if (!ctx) return;
    const step = Math.floor((ctx.currentTime - state.anchorCtx) / (STEP_MS / 1000)) % STEPS;
    const cur = ((step % STEPS) + STEPS) % STEPS;
    const rows = ui.grid.children;
    for (let t = 0; t < TRACKS; t++) {
      const cells = rows[t].children;
      for (let s = 0; s < STEPS; s++) cells[s + 1].classList.toggle("now", s === cur);
    }
  }
  function clearPlayhead() {
    const ui = state.ui; if (!ui) return;
    ui.grid.querySelectorAll(".jam-step.now").forEach((c) => c.classList.remove("now"));
  }
  function liveNote(n) {
    const ctx = ensureCtx();
    if (!ctx) return;
    playVoice(state.instrument, INSTRUMENTS[state.instrument].notes[n], ctx.currentTime + 0.01, 0.5);
  }
  function togglePlay() {
    const ui = state.ui;
    if (state.playing) {
      state.playing = false;
      stopScheduler();
      clearPlayhead();
      if (ui) ui.play.innerHTML = "\u25B6 Play";
    } else {
      const ctx = ensureCtx();
      if (!ctx) return;
      state.playing = true;
      ensureAnchor();
      startScheduler();
      if (ui) ui.play.innerHTML = "\u23F8 Stop";
      window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "ui-confirm" } }));
    }
  }
  function renderPeers() {
    const ui = state.ui; if (!ui) return;
    ui.jammers.innerHTML = "";
    const mk = (name, color, icon, uid, muted, mine) => {
      const chip = document.createElement("div");
      chip.className = "jam-chip";
      const initial = String(name || "?").trim().slice(0, 1).toUpperCase() || "?";
      chip.innerHTML = `<i style="background:${esc(color)}">${esc(initial)}</i><span>${esc(name)}${mine ? " (you)" : ""}</span>`;
      if (!mine) {
        const b = document.createElement("button");
        b.textContent = muted ? "Muted" : "Mute";
        b.classList.toggle("muted", muted);
        b.setAttribute("aria-label", muted ? `Unmute ${name}` : `Mute ${name}`);
        b.addEventListener("click", () => {
          if (state.muted.has(uid)) state.muted.delete(uid); else state.muted.add(uid);
          renderPeers();
        });
        chip.appendChild(b);
      } else {
        const tag = document.createElement("span");
        tag.textContent = icon;
        chip.appendChild(tag);
      }
      ui.jammers.appendChild(chip);
    };
    mk(playerName(), playerColor(), INSTRUMENTS[state.instrument].icon, "self", false, true);
    for (const [uid, p] of state.peers) {
      mk(p.name || "Player", p.outfit || "#9aa5a5", INSTRUMENTS[p.instrument]?.icon || "", uid, state.muted.has(uid), false);
    }
    const n = state.peers.size;
    ui.sub.textContent = n === 0 ? "just you" : `you + ${n} jammer${n === 1 ? "" : "s"}`;
    ui.note.textContent = state.session?.user
      ? "Loops mingle live. Mute anyone with their chip."
      : "Sign in to jam with others — your loop plays locally for now.";
  }

  // ---------- open / close ----------
  function openPanel(instrument) {
    const ui = buildUI();
    if (Number.isInteger(instrument) && instrument >= 0 && instrument < TRACKS) state.instrument = instrument;
    seedStarter();
    if (!state.grid) state.grid = patternToGrid(state.pattern);
    state.open = true;
    state.roomId = roomId();
    ui.backdrop.hidden = false;
    document.documentElement.classList.add("snug-jam-open");
    renderInstruments(); renderPads(); renderGrid(); renderPeers();
    duckMusic(true);
    ensureAnchor();
    pushJam();
    pollJam();
    clearInterval(state.pollTimer);
    state.pollTimer = setInterval(pollJam, POLL_MS);
    clearInterval(state.heartbeatTimer);
    state.heartbeatTimer = setInterval(pushJam, HEARTBEAT_MS);
    window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "ui-confirm" } }));
  }
  function closePanel() {
    if (!state.open) return;
    state.open = false;
    state.playing = false;
    stopScheduler();
    clearInterval(state.pollTimer); state.pollTimer = null;
    clearInterval(state.heartbeatTimer); state.heartbeatTimer = null;
    clearTimeout(state.pushTimer);
    if (state.ui) {
      state.ui.backdrop.hidden = true;
      state.ui.play.innerHTML = "\u25B6 Play";
    }
    document.documentElement.classList.remove("snug-jam-open");
    duckMusic(false);
    leaveJam();
    window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "ui-back" } }));
  }

  // ================= VINYL: press loops to records, record players, jukebox =================
  // Vinyls store PATTERN DATA only (never audio) — tiny, procedural, re-synthesized on
  // playback through the same jam voices, so a record sounds exactly like the live instruments.

  const JB_ENTRY_MS = 8 * LOOP_MS; // each queued vinyl plays 8 loops (20s @96bpm)
  const JB_EARSHOT = 12;
  const JB_PRESENCE_MS = 35000;
  const JUKEBOX_POS = { x: 22.6, z: 10.5 };
  const MAX_VINYLS = 24;

  const vstate = {
    vinyls: null,
    vinylsLoading: false,
    vDucked: false,
    vSchedTimer: null, vPattern: null, vStepMs: STEP_MS, vStepIdx: 0, vNextCtx: 0,
    rpGroup: null, rpScene: null, rpPos: null, rpPlaying: null, rpWatch: null,
    rpPanel: null, rpSpinOn: false, rpSpinFrame: 0,
    jbGroup: null, jbScene: null, jbPanel: null, jbPanelOpen: false,
    jbPlayingQid: null, jbNode: null, jbWaiting: [], jbTimer: null, jbUiTimer: null, jbPresenceAt: 0,
  };

  function playerPos() {
    const p = window.__snugWorld?.player;
    return p?.position ? { x: p.position.x, z: p.position.z } : null;
  }

  // Duck area music for vinyl playback. The live jam wins ties: if it already
  // ducked, we just ride along; we only restore what we ducked ourselves.
  function vinylDuck(on) {
    const A = window.__snugAudio;
    if (!A?.state || typeof A.syncMusic !== "function") return;
    if (on) {
      if (state.ducked || vstate.vDucked) return;
      if (A.state.musicEnabled) { vstate.vDucked = true; A.state.musicEnabled = false; A.syncMusic(true); }
    } else if (vstate.vDucked) {
      vstate.vDucked = false;
      if (!state.ducked) { A.state.musicEnabled = true; A.syncMusic(true); }
    }
  }

  // ---------- vinyl persistence (player.vinyls via Firestore, like housing/inventory) ----------
  function decodeVinylDoc(w) {
    const f = w?.mapValue?.fields || {};
    const s = (k) => typeof f[k]?.stringValue === "string" ? f[k].stringValue : "";
    const n = (k) => { const v = f[k]?.integerValue ?? f[k]?.doubleValue; const x = Number(v); return Number.isFinite(x) ? x : 0; };
    return { id: s("id"), title: s("title"), artist: s("artist"), instrument: n("instrument"), pattern: s("pattern"), bpm: n("bpm") || BPM, createdAt: n("createdAt") };
  }
  async function loadVinyls(force) {
    if (vstate.vinyls && !force) return vstate.vinyls;
    if (vstate.vinylsLoading) return vstate.vinyls || [];
    vstate.vinylsLoading = true;
    try {
      if (!state.session?.user) throw new Error("no session");
      const token = await state.session.user.getIdToken();
      const uid = state.session.uid;
      const project = state.session?.app?.options?.projectId || state.session?.projectId;
      const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(project)}/databases/(default)/documents/players/${encodeURIComponent(uid)}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) throw new Error(`profile ${res.status}`);
      const fields = (await res.json()).fields || {};
      const arr = fields.vinyls?.arrayValue?.values || [];
      vstate.vinyls = arr.map(decodeVinylDoc).filter(validVinyl).slice(0, MAX_VINYLS);
    } catch { vstate.vinyls = vstate.vinyls || []; }
    vstate.vinylsLoading = false;
    return vstate.vinyls;
  }
  function pressVinyl(title) {
    const clean = String(title || "").trim().slice(0, 24) || `${playerName()}'s Jam`;
    const vinyl = {
      id: "v" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7),
      title: clean,
      artist: playerName().slice(0, 18),
      instrument: state.instrument,
      pattern: state.pattern,
      bpm: BPM,
      createdAt: Date.now(),
    };
    if (!validVinyl(vinyl) || countSteps(vinyl.pattern) === 0) return null;
    window.dispatchEvent(new CustomEvent("snug-player-patch", { detail: (player) => {
      const vinyls = Array.isArray(player.vinyls) ? player.vinyls.slice() : [];
      vinyls.unshift(vinyl);
      return { ...player, vinyls: vinyls.slice(0, MAX_VINYLS) };
    } }));
    vstate.vinyls = [vinyl, ...(vstate.vinyls || [])].slice(0, MAX_VINYLS);
    return vinyl;
  }

  // ---------- shared pattern playback: re-synthesize a stored pattern locally ----------
  function startVinylAudio(pattern, bpm) {
    stopVinylAudio();
    const ctx = ensureCtx();
    if (!ctx) return false;
    ensureBus(ctx);
    vstate.vPattern = expandPattern(pattern);
    vstate.vStepMs = 60000 / (bpm || BPM) / 4;
    vstate.vStepIdx = 0;
    vstate.vNextCtx = ctx.currentTime + 0.06;
    vstate.vSchedTimer = setInterval(vinylTick, 25);
    vinylDuck(true);
    return true;
  }
  function vinylTick() {
    const ctx = ensureCtx();
    if (!ctx || !vstate.vPattern) { stopVinylAudio(); return; }
    const horizon = ctx.currentTime + 0.18;
    let guard = 0;
    while (vstate.vNextCtx < horizon && guard++ < 64) {
      const step = vstate.vStepIdx % STEPS;
      let voices = 0;
      for (let tr = 0; tr < TRACKS && voices < 12; tr++) {
        if (bitSet(vstate.vPattern, tr, step)) {
          playVoice(tr, stepNote(tr, step), Math.max(vstate.vNextCtx, ctx.currentTime + 0.01), 0.42);
          voices++;
        }
      }
      vstate.vStepIdx++;
      vstate.vNextCtx += vstate.vStepMs / 1000;
    }
  }
  function stopVinylAudio() {
    if (vstate.vSchedTimer) clearInterval(vstate.vSchedTimer);
    vstate.vSchedTimer = null;
    vstate.vPattern = null;
    vinylDuck(false);
  }

  // ---------- record player: home furniture, plays your vinyls ----------
  function buildRecordPlayer(T) {
    const g = new T.Group();
    g.userData.vinylProp = "recordplayer";
    const wood = new T.MeshStandardMaterial({ color: 0x6b4a33, roughness: 0.8 });
    const dark = new T.MeshStandardMaterial({ color: 0x1c1c22, roughness: 0.45 });
    const stand = new T.Mesh(new T.BoxGeometry(0.7, 0.5, 0.7), wood);
    stand.position.y = 0.25; stand.castShadow = true; g.add(stand);
    const plinth = new T.Mesh(new T.BoxGeometry(0.62, 0.1, 0.62), dark);
    plinth.position.y = 0.55; g.add(plinth);
    const platter = new T.Mesh(new T.CylinderGeometry(0.24, 0.24, 0.03, 24), dark);
    platter.position.y = 0.62; g.add(platter);
    const label = new T.Mesh(
      new T.CylinderGeometry(0.08, 0.08, 0.034, 16),
      new T.MeshStandardMaterial({ color: 0xd95e4a, roughness: 0.5 })
    );
    label.position.y = 0.62; g.add(label);
    const armBase = new T.Mesh(new T.CylinderGeometry(0.04, 0.05, 0.06, 10), wood);
    armBase.position.set(0.24, 0.63, -0.18); g.add(armBase);
    const arm = new T.Mesh(new T.BoxGeometry(0.035, 0.03, 0.42), new T.MeshStandardMaterial({ color: 0xc0c0c8, roughness: 0.35, metalness: 0.6 }));
    arm.position.set(0.2, 0.66, -0.02); arm.rotation.y = 0.45; g.add(arm);
    g.userData.platter = platter;
    return g;
  }
  function syncRecordPlayer() {
    const world = window.__snugWorld;
    if (!world?.scene || world.mode !== "home") {
      if (vstate.rpGroup) { vstate.rpGroup.parent?.remove(vstate.rpGroup); vstate.rpGroup = null; vstate.rpScene = null; }
      if (vstate.rpPlaying) stopRecordPlayback();
      return;
    }
    if (vstate.rpGroup && vstate.rpScene === world.scene) return;
    let T = window.__snugThree;
    if (typeof T?.BoxGeometry !== "function") return;
    if (vstate.rpGroup) vstate.rpGroup.parent?.remove(vstate.rpGroup);
    const g = buildRecordPlayer(T);
    const p = world.player?.position;
    const px = (p?.x ?? 0) + 1.8, pz = (p?.z ?? 0) + 1.2;
    g.position.set(px, 0, pz);
    g.rotation.y = Math.atan2((p?.x ?? 0) - px, (p?.z ?? 0) - pz);
    world.scene.add(g);
    vstate.rpGroup = g;
    vstate.rpScene = world.scene;
    vstate.rpPos = { x: px, z: pz };
    installVinylPicking(world, T);
  }
  function spinPlatter() {
    const platter = vstate.rpGroup?.userData?.platter;
    if (!platter || !vstate.rpSpinOn) return;
    platter.rotation.y += 0.06;
    vstate.rpSpinFrame = requestAnimationFrame(spinPlatter);
  }
  function startRecordPlayback(vinyl) {
    if (!startVinylAudio(vinyl.pattern, vinyl.bpm)) return false;
    vstate.rpPlaying = vinyl.id;
    vstate.rpSpinOn = true;
    cancelAnimationFrame(vstate.rpSpinFrame);
    spinPlatter();
    clearInterval(vstate.rpWatch);
    vstate.rpWatch = setInterval(() => {
      const world = window.__snugWorld;
      const p = playerPos();
      if (!world || world.mode !== "home") { stopRecordPlayback(); return; }
      if (p && vstate.rpPos && Math.hypot(p.x - vstate.rpPos.x, p.z - vstate.rpPos.z) > 9) stopRecordPlayback();
    }, 2000);
    renderRpList();
    return true;
  }
  function stopRecordPlayback() {
    vstate.rpPlaying = null;
    vstate.rpSpinOn = false;
    cancelAnimationFrame(vstate.rpSpinFrame);
    clearInterval(vstate.rpWatch);
    vstate.rpWatch = null;
    if (vstate.jbPlayingQid == null) stopVinylAudio();
    renderRpList();
  }
  function vinylRowHtml(v, playing, clickable = true) {
    const inst = INSTRUMENTS[v.instrument] || INSTRUMENTS[0];
    const steps = countSteps(v.pattern);
    return `<button class="vinyl-row${playing ? " playing" : ""}"${clickable ? ` data-vinyl="${esc(v.id)}"` : ""}>` +
      `<span class="vicon">${inst.icon}</span>` +
      `<span class="vmeta"><b>${esc(v.title)}</b><small>${esc(v.artist)} · ${steps} step${steps === 1 ? "" : "s"}</small></span>` +
      `<span class="vstate">${playing ? "⏸" : clickable ? "▶" : "♪"}</span></button>`;
  }
  function openRecordPlayer() {
    closeJukebox();
    if (vstate.rpPanel) { vstate.rpPanel.hidden = false; loadVinyls().then(renderRpList); return; }
    const backdrop = document.createElement("div");
    backdrop.className = "jam-backdrop";
    backdrop.innerHTML = `
      <div class="jam-sheet" role="dialog" aria-label="Record player">
        <div class="jam-head">
          <h2>💿 Record Player<small>your vinyl collection</small></h2>
          <button class="jam-close" aria-label="Close record player">×</button>
        </div>
        <div class="jam-sec"><div class="vinyl-list"></div></div>
      </div>`;
    document.body.appendChild(backdrop);
    vstate.rpPanel = backdrop;
    backdrop.querySelector(".jam-close").addEventListener("click", closeRecordPlayer);
    backdrop.addEventListener("pointerdown", (e) => { if (e.target === backdrop) closeRecordPlayer(); });
    backdrop.querySelector(".vinyl-list").addEventListener("click", (e) => {
      const btn = e.target.closest("[data-vinyl]");
      if (!btn) return;
      const vinyl = (vstate.vinyls || []).find((v) => v.id === btn.dataset.vinyl);
      if (!vinyl) return;
      if (vstate.rpPlaying === vinyl.id) stopRecordPlayback();
      else startRecordPlayback(vinyl);
      window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "ui-tap" } }));
    });
    loadVinyls().then(renderRpList);
    window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "ui-confirm" } }));
  }
  function closeRecordPlayer() {
    if (vstate.rpPanel) vstate.rpPanel.hidden = true;
  }
  function renderRpList() {
    if (!vstate.rpPanel) return;
    const list = vstate.rpPanel.querySelector(".vinyl-list");
    const vinyls = vstate.vinyls || [];
    if (!state.session?.user) { list.innerHTML = `<div class="vinyl-empty">Sign in to see your vinyls.</div>`; return; }
    if (!vinyls.length) { list.innerHTML = `<div class="vinyl-empty">No vinyls yet — press one at the plaza jam.</div>`; return; }
    list.innerHTML = vinyls.map((v) => vinylRowHtml(v, vstate.rpPlaying === v.id)).join("");
  }

  // ---------- jukebox: plaza prop, one shared queue, plays for whoever is near ----------
  function validQueueEntry(e) {
    return !!e && typeof e === "object" && typeof e.qid === "string" && !!e.qid &&
      validVinyl(e.vinyl) && typeof e.byUid === "string" && !!e.byUid &&
      typeof e.byName === "string" && typeof e.at === "number";
  }
  // Pure queue math, unit-tested: filters stale owners, keeps/advances the
  // current track deterministically, prunes dead presence. The stored node keeps
  // the FULL current entry (not just its qid) so every client can render the
  // vinyl data on every read without re-resolving it from the queue.
  function computeJukebox(node, nowMs, selfUid) {
    node = node && typeof node === "object" ? node : {};
    const presence = node.presence && typeof node.presence === "object" ? node.presence : {};
    const fresh = (uid) => uid === selfUid ||
      (presence[uid] && typeof presence[uid].at === "number" && (nowMs - presence[uid].at) < JB_PRESENCE_MS);
    const rawQueue = Array.isArray(node.queue) ? node.queue : [];
    const queue = rawQueue.filter((e) => validQueueEntry(e) && fresh(e.byUid));
    let current = null, startedAt = 0;
    const cur = node.current && typeof node.current === "object" ? node.current : null;
    const curEntry = cur && validQueueEntry(cur.entry) && fresh(cur.entry.byUid) ? cur.entry : null;
    if (curEntry && typeof cur.startedAt === "number" && (nowMs - cur.startedAt) < JB_ENTRY_MS) {
      current = curEntry;
      startedAt = cur.startedAt;
    }
    let changed = queue.length !== rawQueue.length;
    if (!current && queue.length) {
      current = queue.shift();
      startedAt = (cur && typeof cur.startedAt === "number") ? cur.startedAt + JB_ENTRY_MS : nowMs;
      changed = true;
    } else if (!current && cur) {
      changed = true; // stale/expired current with nothing waiting -> clear it
    }
    const pruned = {};
    for (const [uid, p] of Object.entries(presence)) {
      if (p && typeof p.at === "number" && (nowMs - p.at) < 60000) pruned[uid] = p;
    }
    if (Object.keys(pruned).length !== Object.keys(presence).length) changed = true;
    return {
      current: current ? { entry: current, startedAt } : null,
      queue,
      writeback: changed ? { queue, current: current ? { entry: current, startedAt } : null, presence: pruned } : null,
    };
  }
  function buildJukebox(T) {
    const g = new T.Group();
    g.userData.vinylProp = "jukebox";
    const cabMat = new T.MeshStandardMaterial({ color: 0x7a2e3f, roughness: 0.45 });
    const base = new T.Mesh(new T.BoxGeometry(1.0, 1.15, 0.72), cabMat);
    base.position.y = 0.575; base.castShadow = true; g.add(base);
    const cap = new T.Mesh(new T.BoxGeometry(1.06, 0.12, 0.78), new T.MeshStandardMaterial({ color: 0x4a1c28, roughness: 0.5 }));
    cap.position.y = 1.2; g.add(cap);
    const glow = new T.Mesh(
      new T.BoxGeometry(0.7, 0.8, 0.06),
      new T.MeshStandardMaterial({ color: 0xffd98a, emissive: 0xff9a3c, emissiveIntensity: 0.75, roughness: 0.4 })
    );
    glow.position.set(0, 0.78, 0.34); g.add(glow);
    const grilleMat = new T.MeshStandardMaterial({ color: 0x241a20, roughness: 0.8 });
    [-0.3, 0.3].forEach((x) => {
      const sp = new T.Mesh(new T.CylinderGeometry(0.13, 0.13, 0.05, 16), grilleMat);
      sp.rotation.x = Math.PI / 2; sp.position.set(x, 0.32, 0.35); g.add(sp);
    });
    const slot = new T.Mesh(new T.BoxGeometry(0.1, 0.03, 0.02), new T.MeshStandardMaterial({ color: 0xd8c26a, metalness: 0.7, roughness: 0.3 }));
    slot.position.set(0, 0.32, 0.37); g.add(slot);
    return g;
  }
  function syncJukeboxProp() {
    const world = window.__snugWorld;
    if (!world?.scene || world.mode === "home") return;
    if (vstate.jbGroup && vstate.jbScene === world.scene) return;
    const T = window.__snugThree;
    if (typeof T?.BoxGeometry !== "function") return;
    if (vstate.jbGroup) vstate.jbGroup.parent?.remove(vstate.jbGroup);
    const g = buildJukebox(T);
    g.position.set(JUKEBOX_POS.x, 0, JUKEBOX_POS.z);
    g.rotation.y = Math.atan2(17 - JUKEBOX_POS.x, 10.5 - JUKEBOX_POS.z);
    world.scene.add(g);
    vstate.jbGroup = g;
    vstate.jbScene = world.scene;
    installVinylPicking(world, T);
  }
  function jbStopAudio() {
    if (vstate.jbPlayingQid != null) {
      vstate.jbPlayingQid = null;
      if (vstate.rpPlaying == null) stopVinylAudio();
    }
  }
  async function jbPoll() {
    if (!state.session?.user) return;
    const world = window.__snugWorld;
    if (!world || world.mode === "home") { jbStopAudio(); return; }
    let node = null;
    try { node = await rtdb(`jukebox/${roomId()}`); } catch { return; }
    const now = serverNow();
    const selfUid = state.session.uid;
    const computed = computeJukebox(node || {}, now, selfUid);
    const { current, writeback } = computed;
    vstate.jbNode = { current };
    vstate.jbWaiting = computed.queue;
    if (writeback) {
      try { await rtdb(`jukebox/${roomId()}`, { method: "PUT", body: JSON.stringify(writeback) }); } catch { /* keep local */ }
    }
    const p = playerPos();
    const near = !!p && Math.hypot(p.x - JUKEBOX_POS.x, p.z - JUKEBOX_POS.z) < JB_EARSHOT;
    if (current && near) {
      if (vstate.jbPlayingQid !== current.entry.qid) {
        vstate.jbPlayingQid = current.entry.qid;
        startVinylAudio(current.entry.vinyl.pattern, current.entry.vinyl.bpm);
      }
    } else {
      jbStopAudio();
    }
    if (vstate.jbPanelOpen) renderJukebox();
    if (now - vstate.jbPresenceAt > 20000) {
      vstate.jbPresenceAt = now;
      rtdb(`jukebox/${roomId()}/presence/${selfUid}`, { method: "PUT", body: JSON.stringify({ at: Date.now() }) }).catch(() => {});
    }
  }
  async function jbQueueAdd(vinyl) {
    if (!state.session?.user || !validVinyl(vinyl)) return false;
    try {
      const node = (await rtdb(`jukebox/${roomId()}`)) || {};
      const queue = Array.isArray(node.queue) ? node.queue.slice() : [];
      if (queue.length >= 12) return false;
      queue.push({
        qid: "q" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        vinyl: { id: vinyl.id, title: vinyl.title, artist: vinyl.artist, instrument: vinyl.instrument, pattern: expandPattern(vinyl.pattern), bpm: vinyl.bpm || BPM, createdAt: vinyl.createdAt || Date.now() },
        byUid: state.session.uid,
        byName: playerName().slice(0, 18),
        at: Date.now(),
      });
      await rtdb(`jukebox/${roomId()}`, { method: "PUT", body: JSON.stringify({ ...node, queue }) });
      jbPoll();
      return true;
    } catch { return false; }
  }
  async function jbSkip() {
    try {
      const node = (await rtdb(`jukebox/${roomId()}`)) || {};
      const curQid = node.current?.entry?.qid;
      const queue = (Array.isArray(node.queue) ? node.queue : []).filter((e) => e?.qid !== curQid);
      await rtdb(`jukebox/${roomId()}`, { method: "PUT", body: JSON.stringify({ ...node, queue, current: null }) });
      jbPoll();
    } catch { /* keep local */ }
  }
  function openJukebox() {
    closeRecordPlayer();
    vstate.jbPanelOpen = true;
    if (!vstate.jbPanel) {
      const backdrop = document.createElement("div");
      backdrop.className = "jam-backdrop";
      backdrop.innerHTML = `
        <div class="jam-sheet" role="dialog" aria-label="Jukebox">
          <div class="jam-head">
            <h2>🎵 Jukebox<small>plaza · shared queue</small></h2>
            <button class="jam-close" aria-label="Close jukebox">×</button>
          </div>
          <div class="jam-sec"><small>Now playing</small><div class="jukebox-now"></div></div>
          <div class="jam-sec"><small>Up next</small><div class="jukebox-queue vinyl-list"></div></div>
          <div class="jam-sec"><small>Queue one of your vinyls</small><div class="jukebox-mine vinyl-list"></div></div>
        </div>`;
      document.body.appendChild(backdrop);
      vstate.jbPanel = backdrop;
      backdrop.querySelector(".jam-close").addEventListener("click", closeJukebox);
      backdrop.addEventListener("pointerdown", (e) => { if (e.target === backdrop) closeJukebox(); });
      backdrop.querySelector(".jukebox-now").addEventListener("click", (e) => {
        if (e.target.closest(".jukebox-skip")) { jbSkip(); window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "ui-tap" } })); }
      });
      backdrop.querySelector(".jukebox-mine").addEventListener("click", async (e) => {
        const btn = e.target.closest("[data-vinyl]");
        if (!btn) return;
        const vinyl = (vstate.vinyls || []).find((v) => v.id === btn.dataset.vinyl);
        if (!vinyl) return;
        const ok = await jbQueueAdd(vinyl);
        renderJukebox(ok ? "Queued!" : "Queue is full — try again soon.");
        window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: ok ? "ui-confirm" : "error" } }));
      });
    }
    vstate.jbPanel.hidden = false;
    loadVinyls().then(() => renderJukebox());
    jbPoll();
    clearInterval(vstate.jbUiTimer);
    vstate.jbUiTimer = setInterval(() => renderJukebox(), 2500);
    window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "ui-confirm" } }));
  }
  function closeJukebox() {
    vstate.jbPanelOpen = false;
    clearInterval(vstate.jbUiTimer);
    vstate.jbUiTimer = null;
    if (vstate.jbPanel) vstate.jbPanel.hidden = true;
  }
  function renderJukebox(status) {
    if (!vstate.jbPanel || !vstate.jbPanelOpen) return;
    const nowEl = vstate.jbPanel.querySelector(".jukebox-now");
    const qEl = vstate.jbPanel.querySelector(".jukebox-queue");
    const mineEl = vstate.jbPanel.querySelector(".jukebox-mine");
    const cur = vstate.jbNode?.current;
    if (cur) {
      nowEl.innerHTML = `<div class="jukebox-pos">${vinylRowHtml(cur.entry.vinyl, false, false)}<button class="jukebox-skip">Skip</button></div>` +
        `<div class="vinyl-sum">queued by ${esc(cur.entry.byName)}</div>`;
    } else {
      nowEl.innerHTML = `<div class="vinyl-empty">Nothing playing — queue something below.</div>`;
    }
    const waiting = vstate.jbWaiting || [];
    qEl.innerHTML = waiting.length
      ? waiting.map((e, i) => `<div class="jukebox-pos"><span class="jukebox-num">${i + 1}</span>${vinylRowHtml(e.vinyl, false, false)}</div>`).join("")
      : `<div class="vinyl-empty">Queue is empty.</div>`;
    const mine = vstate.vinyls || [];
    mineEl.innerHTML = mine.length
      ? mine.map((v) => vinylRowHtml(v, false, true)).join("")
      : `<div class="vinyl-empty">No vinyls yet — press one at the jam.</div>`;
    if (status) {
      let s = vstate.jbPanel.querySelector(".jukebox-status");
      if (!s) { s = document.createElement("div"); s.className = "vinyl-status jukebox-status"; vstate.jbPanel.querySelector(".jam-sheet").appendChild(s); }
      s.textContent = status;
      clearTimeout(renderJukebox.st);
      renderJukebox.st = setTimeout(() => { s.textContent = ""; }, 2500);
    }
  }

  // ---------- vinyl world sync + picking ----------
  function installVinylPicking(world, T) {
    const element = world.renderer?.domElement;
    if (!element || vstate.pickEl === element) return;
    if (vstate.pickEl && vstate.pickHandler) vstate.pickEl.removeEventListener("pointerup", vstate.pickHandler, true);
    vstate.pickEl = element;
    const raycaster = new T.Raycaster();
    const pointer = new T.Vector2();
    vstate.pickHandler = (event) => {
      const rpOpen = vstate.rpPanel && !vstate.rpPanel.hidden;
      if (vstate.jbPanelOpen || rpOpen || state.open) return;
      const rect = element.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(pointer, world.camera);
      const targets = [];
      if (vstate.rpGroup) targets.push(vstate.rpGroup);
      if (vstate.jbGroup) targets.push(vstate.jbGroup);
      if (!targets.length) return;
      const hit = raycaster.intersectObjects(targets, true)[0];
      if (!hit) return;
      let node = hit.object;
      while (node && !node.userData?.vinylProp) node = node.parent;
      const kind = node?.userData?.vinylProp;
      if (!kind) return;
      event.preventDefault();
      event.stopPropagation();
      if (kind === "recordplayer") openRecordPlayer();
      else if (kind === "jukebox") openJukebox();
    };
    element.addEventListener("pointerup", vstate.pickHandler, true);
  }
  function syncVinylWorld() {
    const world = window.__snugWorld;
    if (!world?.scene) return;
    syncRecordPlayer();
    if (world.mode === "home") {
      if (vstate.jbGroup) { vstate.jbGroup.parent?.remove(vstate.jbGroup); vstate.jbGroup = null; vstate.jbScene = null; }
      jbStopAudio();
    } else {
      syncJukeboxProp();
    }
  }

  // ---------- wiring ----------
  window.addEventListener("snug-session", (event) => attach(event.detail));
  window.addEventListener("snug-room-changed", onRoomChanged);
  window.addEventListener("snug-world-ready", () => { syncWorld(true); syncVinylWorld(); });
  window.addEventListener("snug-world-expanded", () => { syncWorld(true); syncVinylWorld(); });
  window.addEventListener("cylindric-world-layout-applied", () => { setTimeout(() => { syncWorld(true); syncVinylWorld(); }, 300); });
  window.addEventListener("keydown", (event) => { if (event.key === "Escape" && state.open) closePanel(); });
  window.addEventListener("pagehide", () => {
    state.playing = false;
    stopScheduler();
    duckMusic(false);
    stopRecordPlayback();
    jbStopAudio();
    closeJukebox();
    leaveJam(true);
  });
  if (window.__snugSession) attach(window.__snugSession);
  if (window.__snugRoomId) state.roomId = window.__snugRoomId;
  // world may already be ready before this chunk loads
  if (window.__snugWorld?.scene) setTimeout(() => { syncWorld(true); syncVinylWorld(); }, 500);
  // vinyl world reconciliation (mode changes) + background jukebox poller
  setInterval(() => syncVinylWorld(), 3000);
  if (!vstate.jbTimer) vstate.jbTimer = setInterval(jbPoll, 5000);

  window.__snugJam = {
    open: openPanel, close: closePanel, get state() { return state; },
    util: { expandPattern, validVinyl, validEntry, validQueueEntry, computeJukebox, gridToPattern, patternToGrid, countSteps, bitSet },
  };
})();

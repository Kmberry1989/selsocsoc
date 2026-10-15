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
  const TRACKS = 4;
  const STEP_MS = 60000 / BPM / 4; // 156.25
  const LOOP_MS = STEP_MS * STEPS; // 2500
  const JAM_CUTOFF_MS = 25000;
  const POLL_MS = 4000;
  const HEARTBEAT_MS = 15000;
  const EMPTY_PATTERN = "0000000000000000";
  const PATTERN_RE = /^[0-9a-f]{16}$/;

  const INSTRUMENTS = [
    { id: "drum",   name: "Drum",   icon: "\u{1F941}", color: "#d95e4a", notes: [130.81, 146.83, 164.81, 196.00, 220.00], labels: ["C", "D", "E", "G", "A"] },
    { id: "chimes", name: "Chimes", icon: "\u{1F3B6}", color: "#e2b43f", notes: [523.25, 587.33, 659.25, 783.99, 880.00], labels: ["C", "D", "E", "G", "A"] },
    { id: "bass",   name: "Bass",   icon: "\u{1F3B8}", color: "#7a68a6", notes: [65.41, 73.42, 82.41, 98.00, 110.00],   labels: ["C", "D", "E", "G", "A"] },
    { id: "flute",  name: "Flute",  icon: "\u{1F3BA}", color: "#5aa9c7", notes: [261.63, 293.66, 329.63, 392.00, 440.00], labels: ["C", "D", "E", "G", "A"] },
  ];

  // Jam spot in the plaza, just south of the festival string lights (x 13..21, z 5).
  const JAM_SPOT = [
    { inst: 0, x: 14.6, z: 9.6 },
    { inst: 1, x: 16.2, z: 11.4 },
    { inst: 2, x: 17.8, z: 11.4 },
    { inst: 3, x: 19.4, z: 9.6 },
  ];
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

  // ---------- pattern encode/decode: 4 tracks x 16 steps -> 16 hex chars ----------
  function gridToPattern(grid) {
    let hex = "";
    for (let t = 0; t < TRACKS; t++) {
      let val = 0;
      for (let s = 0; s < STEPS; s++) val = (val << 1) | (grid?.[t]?.[s] ? 1 : 0);
      hex += val.toString(16).padStart(4, "0");
    }
    return hex;
  }
  function patternToGrid(pattern) {
    const grid = Array.from({ length: TRACKS }, () => Array(STEPS).fill(false));
    if (typeof pattern !== "string" || !PATTERN_RE.test(pattern)) return grid;
    for (let t = 0; t < TRACKS; t++) {
      const val = parseInt(pattern.slice(t * 4, t * 4 + 4), 16);
      for (let s = 0; s < STEPS; s++) grid[t][s] = Boolean((val >> (STEPS - 1 - s)) & 1);
    }
    return grid;
  }
  function bitSet(pattern, track, step) {
    const val = parseInt(pattern.slice(track * 4, track * 4 + 4), 16);
    return Boolean((val >> (STEPS - 1 - step)) & 1);
  }
  function validEntry(e) {
    return !!e && typeof e === "object" && typeof e.uid === "string" && !!e.uid &&
      typeof e.name === "string" && !!e.name && typeof e.pattern === "string" && PATTERN_RE.test(e.pattern) &&
      Number.isInteger(e.instrument) && e.instrument >= 0 && e.instrument < TRACKS &&
      typeof e.anchor === "number" && typeof e.updatedAt === "number";
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
    } else {
      // Cloud Flute: breathy sine with vibrato
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.type = "sine"; o.frequency.setValueAtTime(freq, t);
      const lfo = ctx.createOscillator(), lg = ctx.createGain();
      lfo.type = "sine"; lfo.frequency.setValueAtTime(5.5, t); lg.gain.setValueAtTime(4, t);
      lfo.connect(lg); lg.connect(o.frequency); lfo.start(t); lfo.stop(t + 0.7);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(vol, t + 0.06);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.65);
      o.connect(g); g.connect(dest); o.start(t); o.stop(t + 0.7);
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
    } else {
      // Cloud Flute: horizontal pipe on a stand
      const stand = new T.Mesh(new T.CylinderGeometry(0.05, 0.07, 0.55, 10), mat(0x5b4232));
      stand.position.y = 0.27; g.add(stand);
      const pipe = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 0.85, 12), accent);
      pipe.rotation.z = Math.PI / 2; pipe.position.y = 0.6; pipe.castShadow = true; g.add(pipe);
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
    };
    ui.close.addEventListener("click", () => closePanel());
    backdrop.addEventListener("pointerdown", (e) => { if (e.target === backdrop) closePanel(); });
    ui.play.addEventListener("click", () => togglePlay());
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

  // ---------- wiring ----------
  window.addEventListener("snug-session", (event) => attach(event.detail));
  window.addEventListener("snug-room-changed", onRoomChanged);
  window.addEventListener("snug-world-ready", () => { syncWorld(true); });
  window.addEventListener("snug-world-expanded", () => { syncWorld(true); });
  window.addEventListener("cylindric-world-layout-applied", () => { setTimeout(() => syncWorld(true), 300); });
  window.addEventListener("keydown", (event) => { if (event.key === "Escape" && state.open) closePanel(); });
  window.addEventListener("pagehide", () => {
    state.playing = false;
    stopScheduler();
    duckMusic(false);
    leaveJam(true);
  });
  if (window.__snugSession) attach(window.__snugSession);
  if (window.__snugRoomId) state.roomId = window.__snugRoomId;
  // world may already be ready before this chunk loads
  if (window.__snugWorld?.scene) setTimeout(() => syncWorld(true), 500);

  window.__snugJam = { open: openPanel, close: closePanel, get state() { return state; } };
})();

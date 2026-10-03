/* Selfie Social Society — Housing Construction & Renovation.
 * Peggy Plank's construction counter: lot strips, room dividers, doors,
 * flooring, staircases, extra stories, roof styles, exterior renovation,
 * fences, a lumber mill, and a blueprint editor with mailbox sharing.
 * State lives in players/{uid}.housing. Visible 3D: "SnugPlayerHouse".
 */
(() => {
  if (window.__snugHousingConstruction) return;
  window.__snugHousingConstruction = true;

  /* ================= Constants ================= */

  const HOUSE_POS = { x: -5.5, z: 9.5, rotY: Math.PI / 2 }; // faces the plaza
  const TILE = 0.9;      // meters per tile
  const STORY_H = 2.3;   // meters per story
  const GRID_MAX = 12;   // blueprint editor grid

  const LADDER = [
    { level: 1,  id: "cottage",  name: "Starter cottage",      blurb: "Your cozy 6×6 one-room home." },
    { level: 3,  id: "expand",   name: "Wall push-outs + flooring", blurb: "Buy 2-tile lot strips from the town office. Swap flooring." },
    { level: 6,  id: "rooms",    name: "Room dividers + fences",    blurb: "Split rooms with dividers. Fence your yard." },
    { level: 10, id: "story2",   name: "Second story",         blurb: "Peggy's commission raises the upstairs." },
    { level: 14, id: "porch",    name: "Porch & balcony",      blurb: "A porch below, a balcony above." },
    { level: 25, id: "story3",   name: "Third story",          blurb: "Room for absolutely everything." },
    { level: 35, id: "prestige", name: "Widow's walk + cupola",     blurb: "The prestige crown of Cyclical City." },
  ];
  const ladderLevel = (id) => (LADDER.find((step) => step.id === id) || { level: 1 }).level;
  const unlocked = (id) => (state.data?.level || 1) >= ladderLevel(id);

  const SIDINGS = [
    { id: "cream",  name: "Cream",  color: 0xf3e6cf },
    { id: "sage",   name: "Sage",   color: 0xb9c7a3 },
    { id: "sky",    name: "Sky",    color: 0xaec6d4 },
    { id: "rose",   name: "Rose",   color: 0xe3b7a7 },
    { id: "butter", name: "Butter", color: 0xeed9a4 },
    { id: "brick",  name: "Brick",  color: 0xc0856b },
  ];
  const TRIMS = [
    { id: "terracotta", name: "Terracotta", color: 0xb4552d },
    { id: "forest",     name: "Forest",     color: 0x3f5a3c },
    { id: "navy",       name: "Navy",       color: 0x2e4057 },
    { id: "chocolate",  name: "Chocolate",  color: 0x5d4433 },
    { id: "pearl",      name: "Pearl",      color: 0xf7efdd },
    { id: "plum",       name: "Plum",       color: 0x6b4a63 },
  ];
  const FLOORINGS = {
    hardwood: { name: "Hardwood", color: "#a9744f" },
    carpet:   { name: "Carpet",   color: "#9db48a" },
    tile:     { name: "Tile",     color: "#b9cdd6" },
  };
  const ROOFS = {
    gable:      { name: "Gable",       level: 1 },
    dormer:     { name: "Dormer",      level: 10 },
    widowswalk: { name: "Widow's walk", level: 35 },
  };
  const FENCE_STYLES = {
    picket: { name: "Picket", color: 0xe8e0d0 },
    ranch:  { name: "Ranch",  color: 0x8a6a4a },
    iron:   { name: "Iron",   color: 0x3a3f45 },
  };
  const SHUTTERS = [
    { id: "none",  name: "None" },
    { id: "sage",  name: "Sage",  color: 0x7d9377 },
    { id: "navy",  name: "Navy",  color: 0x2e4057 },
    { id: "rust",  name: "Rust",  color: 0xb4552d },
  ];

  const COST = {
    strip: (n) => ({ shells: 120 + 60 * n, lumber: 6 + 3 * n }),
    divider:  { shells: 40,  lumber: 4 },
    flooring: { shells: 60,  lumber: 0 },
    stairs:   { shells: 200, lumber: 15 },
    story2:   { shells: 800,  lumber: 60 },
    story3:   { shells: 2000, lumber: 150 },
    roof:     { shells: 120, lumber: 0 },
    siding:   { shells: 100, lumber: 0 },
    trim:     { shells: 60,  lumber: 0 },
    shutters: { shells: 80,  lumber: 0 },
    awning:   { shells: 90,  lumber: 0 },
    porch:    { shells: 250, lumber: 20 },
    balcony:  { shells: 200, lumber: 15 },
    fenceSeg: { shells: 25,  lumber: 2 },
    gate:     { shells: 60,  lumber: 5 },
    widowswalk:{ shells: 1500, lumber: 100 },
    lumber10: { shells: 45 },
  };
  const XP = { strip: 25, divider: 10, door: 5, flooring: 8, stairs: 40, story: 150, roof: 20, exterior: 12, fence: 4, gate: 10, blueprintSave: 15, blueprintApply: 40, lumberBuy: 2 };
  const xpNeeded = (level) => 30 + level * 12;

  const PEGGY = { rate: 1.02, pitch: 0.78 };
  const PEGGY_LINES = {
    commission: "Well now, that cottage is bursting at the seams! Take my commission and we'll raise a second story together. Every shell lays a board, and every board gets a proper cheer!",
    commissionDone: "Look at that! A whole second story, raised proper. The street can see it from the plaza. That's bridge-foreman-approved work, friend!",
    noDoor: "Hmm, that room needs a door!",
    floating: "Whoa there — those walls are floating! Every wall needs to connect to something solid.",
    noRoom: "I don't see a room in there yet, friend. Outline some walls and make me a proper room.",
    valid: "Now that's a plan I can build! Solid walls, a proper door — let's raise it!",
    greeting: "Peggy Plank, at your service. If it stands still long enough, I can probably add a story to it.",
  };

  /* ================= State ================= */

  const state = {
    session: null,
    profile: {},
    data: null,
    open: false,
    view: "overview",
    busy: false,
    error: "",
    saveChain: Promise.resolve(),
    group: null,
    worldScene: null,
    renderer: null,
    raycaster: null,
    pointer: null,
    pointerHandler: null,
    peggyBubble: "",
    editor: null,          // blueprint editor draft
    editorTool: "wall",
    editorCursor: { x: 0, y: 0 },
    preview3d: null,
    lastTick: 0,
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = (value) => { const span = document.createElement("span"); span.textContent = String(value ?? ""); return span.innerHTML; };
  const playerName = () => $(".profile-chip b")?.textContent?.trim() || state.session?.playerName || "Player";
  const coinBalance = () => Number(String($(".coin-chip b")?.textContent || "0").replace(/[^0-9.-]/g, "")) || 0;

  function toast(text) {
    let node = $(".housing-toast");
    if (!node) { node = document.createElement("div"); node.className = "housing-toast"; node.setAttribute("role", "status"); document.body.appendChild(node); }
    node.textContent = text; node.classList.add("show");
    clearTimeout(toast.timer); toast.timer = setTimeout(() => node.classList.remove("show"), 2800);
  }

  /* ================= Data model ================= */

  function defaults() {
    return {
      version: 1, level: 1, xp: 0, lumber: 0,
      stories: 1, w: 6, d: 6,
      strips: { n: 0, s: 0, e: 0, w: 0 },
      flooring: { "0": "hardwood" },
      flooringStorage: [],
      dividers: [],   // {x1,y1,x2,y2} grid coords
      doors: [],      // {x,y,side} side: n|s|e|w
      stairs: null,   // {x,y}
      roof: "gable",
      exterior: { siding: "cream", trim: "terracotta", shutters: "none", porch: false, awning: false, balcony: false },
      fences: { style: "picket", n: false, s: false, e: false, w: false, gate: false },
      blueprints: [], // {id,name,w,d,dividers,doors,stairs,createdAt,from?}
      shared: {},     // code -> {name,w,d,dividers,doors,stairs,by,at}
      peggyQuest: { offered: false, accepted: false, done: false },
      barnRaising: null, // {upgradeId,upgradeName,goal,raised,contributors,startedAt,endsAt,status,milestones}
    };
  }
  function normalize(raw) {
    const base = defaults();
    const value = raw && typeof raw === "object" ? raw : {};
    const num = (v, fallback, min, max) => Math.max(min, Math.min(max, Number(v) || fallback));
    return {
      ...base, ...value,
      level: num(value.level, 1, 1, 50),
      xp: Math.max(0, Number(value.xp) || 0),
      lumber: Math.max(0, Math.floor(Number(value.lumber) || 0)),
      stories: num(value.stories, 1, 1, 3),
      w: num(value.w, 6, 4, 16), d: num(value.d, 6, 4, 16),
      strips: { n: 0, s: 0, e: 0, w: 0, ...(value.strips || {}) },
      flooring: { "0": "hardwood", ...(value.flooring || {}) },
      flooringStorage: Array.isArray(value.flooringStorage) ? value.flooringStorage.filter((f) => FLOORINGS[f]) : [],
      dividers: Array.isArray(value.dividers) ? value.dividers.filter((s) => s && Number.isFinite(s.x1)) : [],
      doors: Array.isArray(value.doors) ? value.doors.filter((dr) => dr && Number.isFinite(dr.x)) : [],
      stairs: value.stairs && Number.isFinite(value.stairs.x) ? { x: value.stairs.x, y: value.stairs.y } : null,
      roof: ROOFS[value.roof] ? value.roof : "gable",
      exterior: { ...base.exterior, ...(value.exterior || {}) },
      fences: { ...base.fences, ...(value.fences || {}) },
      blueprints: Array.isArray(value.blueprints) ? value.blueprints.slice(0, 5) : [],
      shared: value.shared && typeof value.shared === "object" ? value.shared : {},
      peggyQuest: { ...base.peggyQuest, ...(value.peggyQuest || {}) },
      barnRaising: value.barnRaising && typeof value.barnRaising === "object" ? value.barnRaising : null,
    };
  }
  function gainXp(amount) {
    if (!(amount > 0) || !state.data) return;
    state.data.xp += amount;
    while (state.data.level < 50 && state.data.xp >= xpNeeded(state.data.level)) {
      state.data.xp -= xpNeeded(state.data.level);
      state.data.level += 1;
      state.data.lumber += 12;
      toast(`Homestead level ${state.data.level} · +12 lumber · new build options may be available`);
      if (state.data.level === ladderLevel("story2") && !state.data.peggyQuest.offered) {
        state.data.peggyQuest.offered = true;
        state.peggyBubble = PEGGY_LINES.commission;
        peggySay(PEGGY_LINES.commission);
      }
    }
  }

  /* ================= Persistence (Firestore REST) ================= */

  function firestoreValue(value) {
    if (value === null || value === undefined) return { nullValue: null };
    if (typeof value === "boolean") return { booleanValue: value };
    if (typeof value === "number") return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
    if (typeof value === "string") return { stringValue: value };
    if (Array.isArray(value)) return { arrayValue: { values: value.map(firestoreValue) } };
    return { mapValue: { fields: Object.fromEntries(Object.entries(value).map(([key, item]) => [key, firestoreValue(item)])) } };
  }
  function decodeValue(value = {}) {
    if ("stringValue" in value) return value.stringValue;
    if ("integerValue" in value) return Number(value.integerValue);
    if ("doubleValue" in value) return Number(value.doubleValue);
    if ("booleanValue" in value) return value.booleanValue;
    if ("nullValue" in value) return null;
    if (value.arrayValue) return (value.arrayValue.values || []).map(decodeValue);
    if (value.mapValue) return Object.fromEntries(Object.entries(value.mapValue.fields || {}).map(([key, item]) => [key, decodeValue(item)]));
    return null;
  }
  const decodeFields = (fields = {}) => Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, decodeValue(value)]));
  async function headers() {
    if (!state.session?.user) throw new Error("Waiting for Firebase sign-in");
    return { "Content-Type": "application/json", Authorization: `Bearer ${await state.session.user.getIdToken()}` };
  }
  function playerUrl(uid = state.session?.uid) {
    const project = state.session?.projectId || state.session?.app?.options?.projectId;
    return `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(project)}/databases/(default)/documents/players/${encodeURIComponent(uid)}`;
  }
  async function loadProfile(uid = state.session?.uid) {
    const response = await fetch(playerUrl(uid), { headers: await headers() });
    if (!response.ok) throw new Error(`Housing profile returned ${response.status}`);
    return decodeFields((await response.json()).fields || {});
  }
  async function patchProfile(fields) {
    const paths = Object.keys(fields).map((key) => `updateMask.fieldPaths=${encodeURIComponent(key)}`).join("&");
    const response = await fetch(`${playerUrl()}?${paths}`, { method: "PATCH", headers: await headers(), body: JSON.stringify({ fields: Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, firestoreValue(value)])) }) });
    if (!response.ok) throw new Error(`Housing save returned ${response.status}`);
  }
  function save(extra = {}) {
    if (!state.session) return Promise.reject(new Error("Waiting for Firebase sign-in"));
    state.busy = true; render();
    const payload = { housing: state.data, ...extra };
    state.saveChain = state.saveChain.catch(() => {}).then(() => patchProfile(payload)).then(() => {
      state.profile = { ...state.profile, ...payload };
      window.dispatchEvent(new CustomEvent("snug-player-patch", { detail: (player) => ({ ...player, ...payload }) }));
      state.error = "";
    }).catch(() => { state.error = "The build site could not reach Firebase. Your last action was not confirmed."; throw new Error(state.error); })
      .finally(() => { state.busy = false; syncWorld(true); render(); });
    return state.saveChain;
  }
  function readPlayer() {
    return new Promise((resolve) => {
      let settled = false;
      const done = (player) => { if (!settled) { settled = true; resolve(player || {}); } };
      try {
        window.dispatchEvent(new CustomEvent("snug-player-patch", { detail: (player) => { done(player); return player; } }));
      } catch (e) { done({}); }
      setTimeout(() => done({}), 1500);
    });
  }

  /* ================= Economy ================= */

  function spendShells(amount, message) {
    window.dispatchEvent(new CustomEvent("snug-award-coins", { detail: { amount: -Math.abs(amount), message } }));
  }
  function canAfford(cost) {
    return coinBalance() >= (cost.shells || 0) && (state.data?.lumber || 0) >= (cost.lumber || 0);
  }
  function costLabel(cost) {
    const parts = [];
    if (cost.shells) parts.push(`${cost.shells} shells`);
    if (cost.lumber) parts.push(`${cost.lumber} lumber`);
    return parts.join(" + ") || "Free";
  }
  async function payFor(cost, message, xp) {
    if (!canAfford(cost)) { toast("Not enough shells or lumber for that build."); return false; }
    if (cost.shells) spendShells(cost.shells, message);
    if (cost.lumber) state.data.lumber -= cost.lumber;
    gainXp(xp || 0);
    try { await save(); } catch (e) { toast(state.error || "Save failed."); return false; }
    return true;
  }

  /* ================= Peggy's voice ================= */

  let peggyVoice = null;
  function ensurePeggyVoice() {
    try {
      const voices = speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang));
      peggyVoice = voices[0] || null;
    } catch (e) { peggyVoice = null; }
  }
  function peggySay(text) {
    state.peggyBubble = text;
    try {
      if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return;
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = PEGGY.rate; utterance.pitch = PEGGY.pitch; utterance.volume = 0.93;
      if (peggyVoice) utterance.voice = peggyVoice;
      setTimeout(() => { try { speechSynthesis.speak(utterance); } catch (e) {} }, 60);
      setTimeout(() => { try { speechSynthesis.cancel(); } catch (e) {} }, Math.max(4000, text.length * 110));
    } catch (e) {}
    renderPeggyBubble();
  }
  function renderPeggyBubble() {
    const node = $(".housing-peggy-bubble");
    if (node && state.peggyBubble) { node.hidden = false; node.querySelector("p").textContent = state.peggyBubble; }
  }

  /* ================= 3D house ================= */

  const colorOf = (list, id) => { const found = list.find((item) => item.id === id); return found ? found.color : list[0].color; };
  function mat(THREE, color, opts = {}) {
    return new THREE.MeshStandardMaterial({ color, roughness: 0.92, metalness: 0.02, ...opts });
  }
  function box(THREE, w, h, d, material, x, y, z) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
    mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true;
    return mesh;
  }
  function addWindow(group, THREE, x, y, z, trimM, winM, shutterId) {
    const frame = box(THREE, 0.9, 1.0, 0.1, trimM, x, y, z);
    const glass = box(THREE, 0.66, 0.76, 0.12, winM, x, y, z);
    group.add(frame, glass);
    const shutter = SHUTTERS.find((s) => s.id === shutterId);
    if (shutter && shutter.color) {
      const sm = mat(THREE, shutter.color);
      group.add(box(THREE, 0.22, 1.0, 0.08, sm, x - 0.58, y, z));
      group.add(box(THREE, 0.22, 1.0, 0.08, sm, x + 0.58, y, z));
    }
  }
  function gableRoof(THREE, W, D, h, material) {
    const g = new THREE.Group();
    const slopeLen = Math.sqrt((W / 2) ** 2 + h ** 2);
    const angle = Math.atan2(h, W / 2);
    [-1, 1].forEach((s) => {
      const slab = new THREE.Mesh(new THREE.BoxGeometry(slopeLen + 0.35, 0.14, D + 0.5), material);
      slab.position.set((s * W) / 4, h / 2, 0); slab.rotation.z = -s * angle;
      slab.castShadow = true; g.add(slab);
    });
    const shape = new THREE.Shape();
    shape.moveTo(-W / 2, 0); shape.lineTo(W / 2, 0); shape.lineTo(0, h); shape.closePath();
    const geo = new THREE.ShapeGeometry(shape);
    const dsMat = material.clone(); dsMat.side = THREE.DoubleSide;
    [-1, 1].forEach((s) => {
      const tri = new THREE.Mesh(geo, dsMat);
      tri.position.set(0, 0.02, (s * D) / 2); if (s < 0) tri.rotation.y = Math.PI;
      g.add(tri);
    });
    return g;
  }
  function railing(THREE, w, d, y, material) {
    const g = new THREE.Group();
    const post = new THREE.BoxGeometry(0.09, 0.85, 0.09);
    const railH = new THREE.BoxGeometry(w, 0.09, 0.09);
    const railD = new THREE.BoxGeometry(0.09, 0.09, d);
    const nx = Math.max(2, Math.round(w / 1.1)), nz = Math.max(2, Math.round(d / 1.1));
    for (let i = 0; i <= nx; i++) [-d / 2, d / 2].forEach((z) => { const p = new THREE.Mesh(post, material); p.position.set(-w / 2 + (w * i) / nx, y + 0.425, z); g.add(p); });
    for (let i = 0; i <= nz; i++) [-w / 2, w / 2].forEach((x) => { const p = new THREE.Mesh(post, material); p.position.set(x, y + 0.425, -d / 2 + (d * i) / nz); g.add(p); });
    [-d / 2, d / 2].forEach((z) => { const r = new THREE.Mesh(railH, material); r.position.set(0, y + 0.85, z); g.add(r); });
    [-w / 2, w / 2].forEach((x) => { const r = new THREE.Mesh(railD, material); r.position.set(x, y + 0.85, 0); g.add(r); });
    return g;
  }

  function buildHouseMesh(THREE, d) {
    const group = new THREE.Group();
    group.name = "SnugPlayerHouse";
    const sidingM = mat(THREE, colorOf(SIDINGS, d.exterior.siding));
    const trimM = mat(THREE, colorOf(TRIMS, d.exterior.trim));
    const roofM = mat(THREE, 0x6b5a4e);
    const doorM = mat(THREE, 0x5d4433);
    const winM = mat(THREE, 0xcfe3ec, { emissive: 0x2a3f4d, emissiveIntensity: 0.35 });
    const W = d.w * TILE, D = d.d * TILE;

    for (let s = 0; s < d.stories; s++) {
      const y0 = s * STORY_H;
      group.add(box(THREE, W, STORY_H, D, sidingM, 0, y0 + STORY_H / 2, 0));
      [[-1, -1], [1, -1], [-1, 1], [1, 1]].forEach(([sx, sz]) => {
        group.add(box(THREE, 0.2, STORY_H, 0.2, trimM, (sx * W) / 2, y0 + STORY_H / 2, (sz * D) / 2));
      });
      group.add(box(THREE, W + 0.14, 0.18, D + 0.14, trimM, 0, y0 + STORY_H - 0.09, 0));
      const wins = s === 0 ? [-W / 4, W / 4] : [-W / 3, 0, W / 3];
      wins.forEach((wx) => addWindow(group, THREE, wx, y0 + 1.45, D / 2, trimM, winM, d.exterior.shutters));
      if (s === 0) {
        group.add(box(THREE, 0.95, 1.75, 0.12, doorM, 0, 0.875, D / 2 + 0.02));
        group.add(box(THREE, 1.25, 0.14, 0.16, trimM, 0, 1.82, D / 2 + 0.02));
        if (d.exterior.balcony && d.stories > 1) {
          const by = STORY_H + 0.02;
          group.add(box(THREE, 2.6, 0.14, 1.1, trimM, 0, by, D / 2 + 0.55));
          const rail = railing(THREE, 2.6, 1.1, by + 0.07, trimM);
          rail.position.z = D / 2 + 0.55; group.add(rail);
          group.add(box(THREE, 0.95, 1.7, 0.1, doorM, 0, STORY_H + 0.85, D / 2 + 0.02));
        }
      }
      if (d.exterior.awning && s === 0) {
        const awn = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.08, 0.9), mat(THREE, colorOf(TRIMS, d.exterior.trim)));
        awn.position.set(0, 2.15, D / 2 + 0.45); awn.rotation.x = 0.32; awn.castShadow = true;
        group.add(awn);
      }
    }
    const topY = d.stories * STORY_H;
    if (d.roof === "widowswalk") {
      group.add(box(THREE, W + 0.3, 0.2, D + 0.3, roofM, 0, topY + 0.1, 0));
      group.add(railing(THREE, W + 0.1, D + 0.1, topY + 0.2, trimM));
      group.add(box(THREE, 1.3, 1.0, 1.3, sidingM, 0, topY + 0.7, 0));
      const pyr = new THREE.Mesh(new THREE.ConeGeometry(1.05, 0.8, 4), roofM);
      pyr.position.set(0, topY + 1.6, 0); pyr.rotation.y = Math.PI / 4; pyr.castShadow = true;
      group.add(pyr);
    } else {
      const roof = gableRoof(THREE, W, D, 1.5, roofM);
      roof.position.y = topY; group.add(roof);
      group.add(box(THREE, 0.5, 1.3, 0.5, mat(THREE, 0x8a6a5a), W / 4, topY + 1.7, -D / 4));
      if (d.roof === "dormer") {
        [-W / 5, W / 5].forEach((dx) => {
          group.add(box(THREE, 1.1, 0.95, 0.9, sidingM, dx, topY + 0.85, D / 4));
          const cap = gableRoof(THREE, 1.2, 0.95, 0.45, roofM);
          cap.position.set(dx, topY + 1.32, D / 4); cap.scale.set(1, 1, 1); group.add(cap);
          group.add(box(THREE, 0.7, 0.6, 0.08, winM, dx, topY + 0.85, D / 4 + 0.46));
        });
      }
    }
    if (d.exterior.porch) {
      const pw = Math.min(W * 0.7, 4.2);
      group.add(box(THREE, pw, 0.18, 1.5, mat(THREE, 0x9a7d5c), 0, 0.09, D / 2 + 0.75));
      [-1, 1].forEach((s) => group.add(box(THREE, 0.16, 2.2, 0.16, trimM, (s * (pw / 2 - 0.15)), 1.2, D / 2 + 1.35)));
      group.add(box(THREE, pw + 0.3, 0.12, 1.8, roofM, 0, 2.32, D / 2 + 0.75));
    }
    // Yard fences (front = +z local, facing the street)
    const fenceM = mat(THREE, colorOf(Object.entries(FENCE_STYLES).map(([id, s]) => ({ id, color: s.color })), d.fences.style));
    const yardW = W / 2 + 1.8, yardD = D / 2 + 1.8;
    const fenceRun = (x1, z1, x2, z2) => {
      const len = Math.hypot(x2 - x1, z2 - z1);
      const n = Math.max(2, Math.round(len / 1.2));
      for (let i = 0; i <= n; i++) {
        const px = x1 + ((x2 - x1) * i) / n, pz = z1 + ((z2 - z1) * i) / n;
        group.add(box(THREE, 0.12, 1.0, 0.12, fenceM, px, 0.5, pz));
      }
      const mid = [(x1 + x2) / 2, (z1 + z2) / 2];
      const alongX = Math.abs(x2 - x1) > Math.abs(z2 - z1);
      [0.35, 0.7].forEach((h) => {
        const rail = alongX ? box(THREE, len, 0.08, 0.08, fenceM, mid[0], h, mid[1]) : box(THREE, 0.08, 0.08, len, fenceM, mid[0], h, mid[1]);
        group.add(rail);
      });
    };
    const F = d.fences;
    if (F.n) fenceRun(-yardW, -yardD, yardW, -yardD);
    if (F.s) fenceRun(-yardW, yardD, yardW, yardD);
    if (F.w) fenceRun(-yardW, -yardD, -yardW, yardD);
    if (F.e) {
      if (F.gate) {
        fenceRun(yardW, -yardD, yardW, -0.7); fenceRun(yardW, 0.7, yardW, yardD);
        const gate = box(THREE, 0.08, 0.85, 1.3, trimM, yardW, 0.45, 0.75);
        gate.rotation.y = -0.7; group.add(gate); // gate stands open for visitors
      } else fenceRun(yardW, -yardD, yardW, yardD);
    }
    group.traverse((node) => { node.userData.housingRoot = true; });
    group.position.set(HOUSE_POS.x, 0, HOUSE_POS.z);
    group.rotation.y = HOUSE_POS.rotY;
    return group;
  }

  function houseSignature(d) {
    return JSON.stringify([d.w, d.d, d.stories, d.roof, d.exterior, d.fences, d.stairs ? 1 : 0]);
  }

  let threePromise = null;
  async function getThree() {
    if (window.__snugThree?.BoxGeometry) return window.__snugThree;
    threePromise ||= import("./vendor/three/three.module.js");
    return threePromise;
  }

  async function syncWorld(force = false) {
    const world = window.__snugWorld;
    if (!world?.scene || world.mode !== "village" || !state.data) return;
    let THREE;
    try { THREE = await getThree(); } catch (e) { return; }
    if (world !== window.__snugWorld || !world.scene) return;
    const signature = houseSignature(state.data);
    if (!force && state.group?.userData.signature === signature && state.worldScene === world.scene) return;
    if (state.group) {
      state.group.parent?.remove(state.group);
      state.group.traverse((node) => { node.geometry?.dispose?.(); if (node.material) { (Array.isArray(node.material) ? node.material : [node.material]).forEach((m) => m.dispose?.()); } });
      state.group = null;
    }
    const group = buildHouseMesh(THREE, state.data);
    group.userData.signature = signature;
    world.scene.add(group);
    state.group = group; state.worldScene = world.scene;
    installPicking(world, THREE);
  }

  function installPicking(world, THREE) {
    const element = world.renderer?.domElement;
    if (!element || state.renderer === element) return;
    if (state.renderer && state.pointerHandler) state.renderer.removeEventListener("pointerup", state.pointerHandler, true);
    state.renderer = element;
    state.raycaster = new THREE.Raycaster(); state.pointer = new THREE.Vector2();
    state.pointerHandler = (event) => {
      if (!state.group || state.open) return;
      const rect = element.getBoundingClientRect();
      state.pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
      state.raycaster.setFromCamera(state.pointer, world.camera);
      const hit = state.raycaster.intersectObject(state.group, true)[0];
      if (!hit) return;
      let node = hit.object;
      while (node && !node.userData?.housingRoot) node = node.parent;
      if (node) { event.preventDefault(); event.stopPropagation(); open("overview"); }
    };
    element.addEventListener("pointerup", state.pointerHandler, true);
  }

  /* ================= UI shell ================= */

  function renderDock() {
    let dock = $(".housing-dock");
    if (!dock) {
      dock = document.createElement("button");
      dock.type = "button"; dock.className = "housing-dock";
      dock.innerHTML = '<i aria-hidden="true"></i><b>Build</b>';
      dock.setAttribute("aria-label", "Open Peggy's construction counter");
      dock.addEventListener("click", () => open("overview"));
      document.body.appendChild(dock);
    }
    const start = document.querySelector(".start-screen,.start-overlay,[data-start-screen],.title-screen");
    dock.hidden = window.__snugWorld?.mode !== "village" || Boolean(start && getComputedStyle(start).display !== "none" && getComputedStyle(start).visibility !== "hidden" && Number(getComputedStyle(start).opacity || 1) > 0.04);
  }

  function open(view) {
    state.open = true; state.view = view || "overview";
    state.peggyBubble = state.peggyBubble || PEGGY_LINES.greeting;
    renderPanel();
  }
  function close() { state.open = false; $(".housing-backdrop")?.remove(); }

  const TABS = [
    ["overview", "Home"], ["expand", "Expand"], ["rooms", "Rooms"],
    ["stories", "Stories"], ["exterior", "Exterior"], ["blueprints", "Plans"], ["mill", "Mill"],
  ];

  function levelCard() {
    const d = state.data;
    const need = xpNeeded(d.level);
    const pct = d.level >= 50 ? 100 : Math.round((d.xp / need) * 100);
    return `<div class="housing-level"><b>${d.level}</b><span><small>Homestead level</small><i style="--housing-xp:${pct}%"></i><small>${d.level >= 50 ? "Max" : `${Math.floor(d.xp)} / ${need} XP`}</small></span></div>
    <div class="housing-stat"><small>Stories</small><b>${d.stories}</b></div>
    <div class="housing-stat"><small>Footprint</small><b>${d.w}×${d.d}</b></div>
    <div class="housing-stat"><small>Lumber</small><b>${d.lumber}</b></div>`;
  }

  function ladderView() {
    return `<div class="housing-ladder">${LADDER.map((step) => {
      const done = (state.data.level || 1) >= step.level;
      const next = !done && (state.data.level || 1) >= step.level - 1;
      return `<div class="housing-rung ${done ? "done" : ""} ${next ? "next" : ""}"><i>${done ? "✓" : `Lv ${step.level}`}</i><span><b>${esc(step.name)}</b><small>${esc(step.blurb)}</small></span></div>`;
    }).join("")}</div>`;
  }

  function overviewView() {
    return `<div class="housing-peggy"><span class="housing-peggy-mark" aria-hidden="true">PP</span><div class="housing-peggy-bubble" role="status"><b>Peggy Plank</b><p>${esc(state.peggyBubble || PEGGY_LINES.greeting)}</p><button type="button" data-peggy-say>Hear it</button></div></div>
    <div class="housing-summary">${levelCard()}</div>
    <h3>Build ladder</h3>${ladderView()}
    <p class="housing-note">Tap your house in the village to open this counter anytime. Old materials are never thrown away — they wait in storage.</p>`;
  }

  function expandView() {
    const d = state.data;
    if (!unlocked("expand")) return lockedView("expand");
    const total = d.strips.n + d.strips.s + d.strips.e + d.strips.w;
    const sides = [["n", "North"], ["s", "South"], ["e", "East"], ["w", "West"]];
    return `<p class="housing-note">Buy 2-tile lot strips from the town office. Each strip pushes one wall outward. Cost grows with every strip you own.</p>
    <div class="housing-strip-grid">${sides.map(([key, label]) => {
      const cost = COST.strip(total);
      const ok = canAfford(cost);
      return `<div class="housing-strip"><span><b>${label}</b><small>${d.strips[key]} strip${d.strips[key] === 1 ? "" : "s"} · +${2 * d.strips[key]} tiles</small><strong>${costLabel(cost)}</strong></span><button type="button" data-buy-strip="${key}" ${ok && !state.busy ? "" : "disabled"}>Buy</button></div>`;
    }).join("")}</div>
    <div class="housing-footprint"><b>Current footprint</b><span>${d.w} × ${d.d} tiles · ${d.stories} ${d.stories === 1 ? "story" : "stories"}</span></div>`;
  }

  function millView() {
    return `<p class="housing-note">The mill saws shells into lumber. Lumber never rots and never expires — cozy building, no pressure.</p>
    <div class="housing-mill-card"><span><b>10 lumber</b><small>You hold ${state.data.lumber} lumber</small><strong>${COST.lumber10.shells} shells</strong></span><button type="button" data-buy-lumber ${coinBalance() >= COST.lumber10.shells && !state.busy ? "" : "disabled"}>Buy</button></div>
    <p class="housing-note">Every Homestead level-up also grants +12 lumber.</p>`;
  }

  function lockedView(id) {
    const need = ladderLevel(id);
    return `<div class="housing-locked"><b>Unlocks at Homestead level ${need}</b><p>Keep building — every wall and floor earns homestead XP. You're at level ${state.data.level}.</p></div>`;
  }

  function renderPanel() {
    $(".housing-backdrop")?.remove();
    if (!state.open || !state.data) return;
    const backdrop = document.createElement("div");
    backdrop.className = "housing-backdrop";
    backdrop.innerHTML = `<section class="housing-sheet" role="dialog" aria-modal="true" aria-label="Peggy's construction counter">
      <div class="housing-grabber" aria-hidden="true"></div>
      <header class="housing-head"><div><small>Peggy Plank · Construction</small><h2>Build &amp; Renovate</h2></div><button type="button" data-housing-close aria-label="Close">×</button></header>
      <nav class="housing-tabs" aria-label="Construction sections"></nav>
      <main class="housing-main"></main>
    </section>`;
    backdrop.querySelector(".housing-tabs").innerHTML = TABS.map(([id, label]) =>
      `<button type="button" data-housing-tab="${id}" class="${state.view === id ? "active" : ""}">${label}</button>`).join("");
    const main = backdrop.querySelector(".housing-main");
    main.innerHTML =
      (state.view === "overview" ? overviewView() : "") +
      (state.view === "expand" ? expandView() : "") +
      (state.view === "rooms" ? roomsView() : "") +
      (state.view === "stories" ? storiesView() : "") +
      (state.view === "exterior" ? exteriorView() : "") +
      (state.view === "blueprints" ? blueprintsView() : "") +
      (state.view === "mill" ? millView() : "") +
      (state.error ? `<p class="housing-alert" role="alert">${esc(state.error)}</p>` : "");
    document.body.appendChild(backdrop);
    bindPanel(backdrop);
    renderPeggyBubble();
    window.dispatchEvent(new CustomEvent("snug-housing-rendered"));
  }

  function bindPanel(root) {
    root.addEventListener("pointerdown", (e) => { if (e.target === root) close(); });
    $("[data-housing-close]", root)?.addEventListener("click", close);
    root.querySelectorAll("[data-housing-tab]").forEach((b) => b.addEventListener("click", () => { state.view = b.dataset.housingTab; state.peggyBubble = ""; renderPanel(); }));
    $("[data-peggy-say]", root)?.addEventListener("click", () => peggySay(state.peggyBubble || PEGGY_LINES.greeting));
    $("[data-buy-lumber]", root)?.addEventListener("click", async () => {
      if (coinBalance() < COST.lumber10.shells) return;
      spendShells(COST.lumber10.shells, "Mill lumber · −45 shells");
      state.data.lumber += 10; gainXp(XP.lumberBuy);
      try { await save(); toast("10 lumber stacked at the mill."); } catch (e) { toast(state.error); }
    });
    root.querySelectorAll("[data-buy-strip]").forEach((b) => b.addEventListener("click", () => buyStrip(b.dataset.buyStrip)));
    bindRooms(root); bindStories(root); bindExterior(root); bindBlueprints(root);
  }

  async function buyStrip(side) {
    const d = state.data;
    const total = d.strips.n + d.strips.s + d.strips.e + d.strips.w;
    const cost = COST.strip(total);
    if (!await payFor(cost, `Lot strip (${side.toUpperCase()}) · −${cost.shells} shells`, XP.strip)) return;
    d.strips[side] += 1;
    if (side === "n" || side === "s") d.d = Math.min(16, d.d + 2); else d.w = Math.min(16, d.w + 2);
    peggySay("A fresh strip of land! Walls are going outward, friend — the neighbors will notice.");
    try { await save(); toast(`New ${side === "n" ? "north" : side === "s" ? "south" : side === "e" ? "east" : "west"} strip added.`); }
    catch (e) { toast(state.error); }
  }

  function render() { renderDock(); if (state.open) renderPanel(); }

  /* ================= Rooms: floor plan, dividers, doors, flooring ================= */

  function blockedEdges(d) {
    // Set of "x1,y1>x2,y2" grid edges blocked by dividers.
    const edges = new Set();
    d.dividers.forEach((s) => {
      const dx = Math.sign(s.x2 - s.x1), dy = Math.sign(s.y2 - s.y1);
      let x = s.x1, y = s.y1, guard = 0;
      while ((x !== s.x2 || y !== s.y2) && guard++ < 40) {
        const nx = x + dx, ny = y + dy;
        edges.add(`${x},${y}>${nx},${ny}`); edges.add(`${nx},${ny}>${x},${y}`);
        x = nx; y = ny;
      }
    });
    return edges;
  }
  function roomRegions(d) {
    const edges = blockedEdges(d);
    const seen = new Set(); const regions = [];
    for (let y = 0; y < d.d; y++) for (let x = 0; x < d.w; x++) {
      const key = `${x},${y}`;
      if (seen.has(key)) continue;
      const region = []; const stack = [[x, y]]; seen.add(key);
      while (stack.length) {
        const [cx, cy] = stack.pop(); region.push([cx, cy]);
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
          const nx = cx + dx, ny = cy + dy;
          if (nx < 0 || ny < 0 || nx >= d.w || ny >= d.d) return;
          const nkey = `${nx},${ny}`;
          // edge between cells (cx,cy)-(nx,ny): grid points (cx+1,cy+1) etc.
          const ex1 = dx === 1 ? cx + 1 : dx === -1 ? cx : cx, ey1 = dy === 1 ? cy + 1 : dy === -1 ? cy : cy;
          const ex2 = dx === 1 ? cx + 1 : dx === -1 ? cx : cx + 1, ey2 = dy === 1 ? cy + 1 : dy === -1 ? cy : cy + 1;
          const ekey = dx !== 0 ? `${ex1},${cy}>${ex1},${cy + 1}` : `${cx},${ey1}>${cx + 1},${ey1}`;
          void ex2; void ey2;
          if (seen.has(nkey) || edges.has(ekey)) return;
          seen.add(nkey); stack.push([nx, ny]);
        });
      }
      regions.push(region);
    }
    return regions;
  }

  function floorPlanSVG(d, opts = {}) {
    const cell = opts.cell || 26;
    const W = d.w * cell, H = d.d * cell;
    const regions = roomRegions(d);
    let svg = `<svg class="housing-plan" viewBox="0 0 ${W} ${H}" style="width:min(100%,${W}px)" role="img" aria-label="House floor plan">`;
    regions.forEach((region, i) => {
      const fill = FLOORINGS[d.flooring[String(i)] || "hardwood"]?.color || "#a9744f";
      region.forEach(([x, y]) => { svg += `<rect x="${x * cell + 1}" y="${y * cell + 1}" width="${cell - 2}" height="${cell - 2}" fill="${fill}" fill-opacity="0.35" data-room="${i}"/>`; });
    });
    svg += `<rect x="2" y="2" width="${W - 4}" height="${H - 4}" fill="none" stroke="#5d4433" stroke-width="5"/>`;
    d.dividers.forEach((s) => { svg += `<line x1="${s.x1 * cell}" y1="${s.y1 * cell}" x2="${s.x2 * cell}" y2="${s.y2 * cell}" stroke="#5d4433" stroke-width="4" stroke-linecap="round"/>`; });
    d.doors.forEach((dr) => {
      const px = dr.side === "w" ? 0 : dr.side === "e" ? W : dr.x * cell;
      const py = dr.side === "n" ? 0 : dr.side === "s" ? H : dr.y * cell;
      svg += `<circle cx="${px}" cy="${py}" r="7" fill="#fff" stroke="#b4552d" stroke-width="3"/>`;
    });
    if (d.stairs) svg += `<rect x="${d.stairs.x * cell + 2}" y="${d.stairs.y * cell + 2}" width="${cell - 4}" height="${cell - 4}" fill="none" stroke="#2e4057" stroke-width="2" stroke-dasharray="4 3"/><text x="${d.stairs.x * cell + cell / 2}" y="${d.stairs.y * cell + cell / 2 + 4}" text-anchor="middle" font-size="9" font-weight="800" fill="#2e4057">UP</text>`;
    if (opts.edit) svg += `<rect class="housing-plan-hit" x="0" y="0" width="${W}" height="${H}" fill="transparent" data-plan-hit/>`;
    return svg + "</svg>";
  }

  function roomsView() {
    const d = state.data;
    if (!unlocked("rooms")) return lockedView("rooms");
    const regions = roomRegions(d);
    return `<p class="housing-note">Rooms are shaped by your dividers — furniture decides what a room <i>is</i>. Tap a wall edge to add a free door.</p>
    <div class="housing-plan-wrap">${floorPlanSVG(d, { edit: true })}
      <div class="housing-plan-tools" role="group" aria-label="Floor plan tools">
        <button type="button" data-plan-tool="divider" class="${state.planTool === "divider" ? "active" : ""}">Divider</button>
        <button type="button" data-plan-tool="door" class="${state.planTool === "door" ? "active" : ""}">Door</button>
        <button type="button" data-plan-tool="off" class="${!state.planTool || state.planTool === "off" ? "active" : ""}">Inspect</button>
      </div></div>
    <h3>Flooring by room</h3>
    <div class="housing-room-list">${regions.map((region, i) => {
      const current = d.flooring[String(i)] || "hardwood";
      return `<div class="housing-room"><span><b>Room ${i + 1}</b><small>${region.length} tiles</small></span><select data-floor-room="${i}" aria-label="Flooring for room ${i + 1}">${Object.entries(FLOORINGS).map(([id, f]) => `<option value="${id}" ${current === id ? "selected" : ""}>${f.name}</option>`).join("")}</select></div>`;
    }).join("")}</div>
    ${d.flooringStorage.length ? `<h3>Storage</h3><div class="housing-storage">${d.flooringStorage.map((f, i) => `<button type="button" data-floor-storage="${i}">${FLOORINGS[f].name} → Room 1</button>`).join("")}</div><p class="housing-note">Stored flooring is free to lay again. Nothing is ever thrown away.</p>` : ""}`;
  }

  function bindRooms(root) {
    if (state.view !== "rooms") return;
    root.querySelectorAll("[data-plan-tool]").forEach((b) => b.addEventListener("click", () => { state.planTool = b.dataset.planTool; renderPanel(); }));
    root.querySelectorAll("[data-floor-room]").forEach((sel) => sel.addEventListener("change", () => setFlooring(Number(sel.dataset.floorRoom), sel.value)));
    root.querySelectorAll("[data-floor-storage]").forEach((b) => b.addEventListener("click", () => {
      const f = state.data.flooringStorage[Number(b.dataset.floorStorage)];
      if (f) { state.data.flooringStorage.splice(Number(b.dataset.floorStorage), 1); state.data.flooring["0"] = f; save().then(() => toast(`${FLOORINGS[f].name} laid again, free of charge.`)); }
    }));
    const hit = $("[data-plan-hit]", root);
    if (!hit) return;
    const svg = hit.closest("svg");
    let dragStart = null;
    const toGrid = (e) => {
      const rect = svg.getBoundingClientRect();
      const cell = rect.width / state.data.w;
      const cx = (e.clientX - rect.left) / cell, cy = (e.clientY - rect.top) / cell;
      return { x: Math.max(0, Math.min(state.data.w, Math.round(cx))), y: Math.max(0, Math.min(state.data.d, Math.round(cy))) };
    };
    hit.addEventListener("pointerdown", (e) => {
      if (state.planTool === "divider") { dragStart = toGrid(e); e.preventDefault(); }
      else if (state.planTool === "door") { const p = toGrid(e); placeDoor(p.x, p.y); }
    });
    hit.addEventListener("pointerup", (e) => {
      if (state.planTool === "divider" && dragStart) { const p = toGrid(e); addDivider(dragStart, p); dragStart = null; }
    });
  }

  async function addDivider(a, b) {
    const d = state.data;
    const dx = Math.abs(b.x - a.x), dy = Math.abs(b.y - a.y);
    if (dx < 1 && dy < 1) return;
    const seg = dx >= dy ? { x1: Math.min(a.x, b.x), y1: a.y, x2: Math.max(a.x, b.x), y2: a.y }
                         : { x1: a.x, y1: Math.min(a.y, b.y), x2: a.x, y2: Math.max(a.y, b.y) };
    if (!await payFor(COST.divider, `Room divider · −${COST.divider.shells} shells`, XP.divider)) return;
    d.dividers.push(seg);
    try { await save(); toast("Divider raised."); } catch (e) { toast(state.error); }
  }

  async function placeDoor(gx, gy) {
    const d = state.data;
    const w = d.w, h = d.d;
    let side = null, x = gx, y = gy;
    if (gy <= 0.5) { side = "n"; y = 0; } else if (gy >= h - 0.5) { side = "s"; y = h; }
    else if (gx <= 0.5) { side = "w"; x = 0; } else if (gx >= w - 0.5) { side = "e"; x = w; }
    else { toast("Doors go on the outer walls — tap an edge."); return; }
    if (d.doors.some((dr) => dr.side === side && Math.abs((side === "n" || side === "s" ? dr.x : dr.y) - (side === "n" || side === "s" ? x : y)) < 1)) { toast("There's already a door there."); return; }
    d.doors.push({ x: Math.round(x), y: Math.round(y), side });
    gainXp(XP.door);
    try { await save(); peggySay("A door! Free of charge, friend — a house should always welcome folks in."); toast("Door placed — free, as doors should be."); }
    catch (e) { toast(state.error); }
  }

  async function setFlooring(roomIndex, flooringId) {
    const d = state.data;
    if (!FLOORINGS[flooringId] || d.flooring[String(roomIndex)] === flooringId) return;
    if (!await payFor(COST.flooring, `${FLOORINGS[flooringId].name} flooring · −${COST.flooring.shells} shells`, XP.flooring)) return;
    const old = d.flooring[String(roomIndex)];
    if (old && old !== flooringId) d.flooringStorage.push(old);
    d.flooring[String(roomIndex)] = flooringId;
    try { await save(); toast(`${FLOORINGS[flooringId].name} laid. The old floor is safe in storage.`); }
    catch (e) { toast(state.error); }
  }

  /* ================= Stories ================= */

  function storiesView() {
    const d = state.data;
    const q = d.peggyQuest;
    let questCard = "";
    if (d.stories < 2) {
      if (q.done) questCard = "";
      else if (unlocked("story2") && q.accepted) questCard = `<div class="housing-quest"><b>Peggy's commission: in progress</b><p>Pay the build cost below to raise the second story.</p></div>`;
      else if (unlocked("story2")) questCard = `<div class="housing-quest"><b>Peggy's commission</b><p>${esc(PEGGY_LINES.commission)}</p><button type="button" data-peggy-accept>Accept commission</button></div>`;
      else questCard = `<div class="housing-locked"><b>Peggy's commission unlocks at Homestead level ${ladderLevel("story2")}</b><p>You're at level ${d.level}.</p></div>`;
    }
    const roofCards = Object.entries(ROOFS).map(([id, r]) => {
      const ok = d.level >= r.level;
      const roofCost = id === "widowswalk" ? COST.widowswalk : COST.roof;
      const barnBtn = barn && id === "widowswalk" && barn.canRaise("widowswalk") && d.roof !== "widowswalk" ? `<div class="barn-call-row"><button type="button" data-barn-call="widowswalk">Call a barn-raising</button></div>` : "";
      return `<div class="housing-card"><span><b>${r.name} roof</b><small>${ok ? costLabel(roofCost) : `Homestead level ${r.level}`}</small></span><button type="button" data-roof="${id}" ${d.roof === id ? "disabled" : ""} ${ok && d.roof !== id && !state.busy ? "" : "disabled"}>${d.roof === id ? "On" : "Set"}</button></div>${barnBtn}`;
    }).join("");
    const canStory2 = d.stories < 2 && q.accepted && canAfford(COST.story2);
    const canStory3 = d.stories === 2 && unlocked("story3") && canAfford(COST.story3);
    const barn = window.__snugBarnRaising;
    const barnPanel = barn ? barn.raisingPanelHtml() : "";
    const barnBtn2 = barn && barn.canRaise("story2") && d.stories < 2 ? `<div class="barn-call-row"><button type="button" data-barn-call="story2">Call a barn-raising</button></div>` : "";
    const barnBtn3 = barn && barn.canRaise("story3") && d.stories < 3 ? `<div class="barn-call-row"><button type="button" data-barn-call="story3">Call a barn-raising</button></div>` : "";
    return `${questCard}${barnPanel}
    <h3>Staircase</h3>
    <div class="housing-card"><span><b>Staircase</b><small>${d.stairs ? `Placed at tile ${d.stairs.x}, ${d.stairs.y}` : "Not placed yet"} · ${costLabel(COST.stairs)}</small></span><button type="button" data-place-stairs ${d.stairs || state.busy ? "disabled" : ""}>${d.stairs ? "Placed" : "Place"}</button></div>
    <h3>New stories</h3>
    <div class="housing-card"><span><b>Second story</b><small>${d.stories >= 2 ? "Built — the street can see it" : q.accepted ? costLabel(COST.story2) : "Requires Peggy's commission"} </small></span><button type="button" data-build-story="2" ${canStory2 && !state.busy ? "" : "disabled"}>${d.stories >= 2 ? "Built" : "Build"}</button></div>${barnBtn2}
    <div class="housing-card"><span><b>Third story</b><small>${d.stories >= 3 ? "Built" : unlocked("story3") ? costLabel(COST.story3) : `Homestead level ${ladderLevel("story3")}`}</small></span><button type="button" data-build-story="3" ${canStory3 && !state.busy ? "" : "disabled"}>${d.stories >= 3 ? "Built" : "Build"}</button></div>${barnBtn3}
    <h3>Roof styles</h3>${roofCards}
    <p class="housing-note">New floors start as one open room — split them with dividers on the Rooms tab.</p>`;
  }

  function bindStories(root) {
    if (state.view !== "stories") return;
    $("[data-peggy-accept]", root)?.addEventListener("click", () => {
      state.data.peggyQuest.accepted = true;
      peggySay("That's the spirit! Pay the build cost when you're ready and we'll raise that second story together.");
      save().catch(() => toast(state.error));
    });
    $("[data-place-stairs]", root)?.addEventListener("click", async () => {
      const d = state.data;
      d.stairs = { x: Math.floor(d.w / 2), y: Math.floor(d.d / 2) };
      if (!await payFor(COST.stairs, `Staircase · −${COST.stairs.shells} shells`, XP.stairs)) { d.stairs = null; return; }
      try { await save(); toast("Staircase placed."); } catch (e) { toast(state.error); }
    });
    root.querySelectorAll("[data-build-story]").forEach((b) => b.addEventListener("click", () => buildStory(Number(b.dataset.buildStory))));
    root.querySelectorAll("[data-barn-call]").forEach((b) => {
      if (b.__barnBound) return;
      b.__barnBound = true;
      b.addEventListener("click", () => window.__snugBarnRaising?.callRaising(b.dataset.barnCall));
    });
    root.querySelectorAll("[data-roof]").forEach((b) => b.addEventListener("click", async () => {
      const id = b.dataset.roof;
      const baseCost = id === "widowswalk" ? COST.widowswalk : COST.roof;
      const discount = window.__snugBarnRaising?.discountFor("widowswalk") || 0;
      const cost = id === "widowswalk" && discount > 0
        ? { shells: Math.max(0, baseCost.shells - discount), lumber: baseCost.lumber }
        : baseCost;
      if (!await payFor(cost, `${ROOFS[id].name} roof · −${cost.shells} shells${discount > 0 ? ` (${discount} off from barn-raising!)` : ""}`, XP.roof)) return;
      state.data.roof = id;
      if (id === "widowswalk") {
        await window.__snugBarnRaising?.consumeRaising("widowswalk");
        peggySay("The widow's walk! Neighbors helped raise this crown — Cyclical City can see it for miles!");
        window.dispatchEvent(new CustomEvent("snug-house-renovation", { detail: { widowswalk: true } }));
      }
      try { await save(); toast(`${ROOFS[id].name} roof set.`); } catch (e) { toast(state.error); }
    }));
  }

  async function buildStory(n) {
    const d = state.data;
    const baseCost = n === 2 ? COST.story2 : COST.story3;
    const upgradeId = n === 2 ? "story2" : "story3";
    const discount = window.__snugBarnRaising?.discountFor(upgradeId) || 0;
    const cost = discount > 0
      ? { shells: Math.max(0, baseCost.shells - discount), lumber: baseCost.lumber }
      : baseCost;
    if (n === 2 && !d.peggyQuest.accepted) { toast("Accept Peggy's commission first."); return; }
    if (!d.stairs) { toast("Place a staircase first — every story needs a way up."); return; }
    if (!await payFor(cost, `Story ${n} · −${cost.shells} shells${discount > 0 ? ` (${discount} off from barn-raising!)` : ""}`, XP.story)) return;
    d.stories = n;
    await window.__snugBarnRaising?.consumeRaising(upgradeId);
    if (n === 2) { d.peggyQuest.done = true; peggySay(PEGGY_LINES.commissionDone); }
    else peggySay("Three stories! You're building a landmark, friend.");
    window.dispatchEvent(new CustomEvent("snug-house-renovation", { detail: { stories: n } }));
    try { await save(); toast(`Story ${n} complete — visible from the street!`); }
    catch (e) { toast(state.error); }
  }

  /* ================= Exterior ================= */

  function swatchRow(label, options, current, attr, cost) {
    return `<div class="housing-swatch-row"><b>${label}</b><div class="housing-swatches">${options.map((o) =>
      `<button type="button" data-exterior="${attr}" data-value="${o.id}" class="${current === o.id ? "active" : ""}" aria-label="${o.name}" title="${o.name}" ${o.color ? `style="--swatch:#${o.color.toString(16).padStart(6, "0")}"` : ""}>${o.color ? "" : esc(o.name)}</button>`).join("")}</div><small>${costLabel(cost)}</small></div>`;
  }

  function exteriorView() {
    const d = state.data, e = d.exterior;
    const toggle = (id, label, cost, on, needsLevel) => {
      const locked = needsLevel && !unlocked(needsLevel);
      return `<div class="housing-card"><span><b>${label}</b><small>${on ? "Installed" : locked ? `Homestead level ${ladderLevel(needsLevel)}` : costLabel(cost)}</small></span><button type="button" data-ext-toggle="${id}" ${on || locked || state.busy ? "disabled" : ""}>${on ? "On" : "Add"}</button></div>`;
    };
    const fences = [["n", "North"], ["s", "South"], ["e", "East"], ["w", "West"]].map(([k, label]) =>
      `<div class="housing-card"><span><b>${label} fence</b><small>${d.fences[k] ? "Raised" : costLabel(COST.fenceSeg)}</small></span><button type="button" data-fence="${k}" ${d.fences[k] || state.busy ? "disabled" : ""}>${d.fences[k] ? "Up" : "Raise"}</button></div>`).join("");
    return `<p class="housing-note">Everything is swappable and everything is stored. The mailbox stays where Stanley put it — by the gate.</p>
    ${swatchRow("Siding", SIDINGS, e.siding, "siding", COST.siding)}
    ${swatchRow("Trim", TRIMS, e.trim, "trim", COST.trim)}
    ${swatchRow("Shutters", SHUTTERS, e.shutters, "shutters", COST.shutters)}
    <h3>Additions</h3>
    ${toggle("porch", "Porch", COST.porch, e.porch, "porch")}
    ${toggle("awning", "Awning", COST.awning, e.awning, null)}
    ${toggle("balcony", "Balcony", COST.balcony, e.balcony, "porch")}
    <h3>Fences</h3>
    <div class="housing-swatch-row"><b>Style</b><div class="housing-swatches">${Object.entries(FENCE_STYLES).map(([id, s]) => `<button type="button" data-fence-style="${id}" class="${d.fences.style === id ? "active" : ""}" style="--swatch:#${s.color.toString(16).padStart(6, "0")}" aria-label="${s.name}" title="${s.name}"></button>`).join("")}</div><small>Free to restyle</small></div>
    ${fences}
    <div class="housing-card"><span><b>Yard gate</b><small>${d.fences.gate ? "Open for visitors" : !d.fences.e ? "Raise the east fence first" : costLabel(COST.gate)}</small></span><button type="button" data-fence-gate ${d.fences.gate || !d.fences.e || state.busy ? "disabled" : ""}>${d.fences.gate ? "Open" : "Hang"}</button></div>`;
  }

  function bindExterior(root) {
    if (state.view !== "exterior") return;
    root.querySelectorAll("[data-exterior]").forEach((b) => b.addEventListener("click", () => setExterior(b.dataset.exterior, b.dataset.value)));
    root.querySelectorAll("[data-ext-toggle]").forEach((b) => b.addEventListener("click", () => addExterior(b.dataset.extToggle)));
    root.querySelectorAll("[data-fence]").forEach((b) => b.addEventListener("click", () => raiseFence(b.dataset.fence)));
    $("[data-fence-gate]", root)?.addEventListener("click", raiseGate);
    root.querySelectorAll("[data-fence-style]").forEach((b) => b.addEventListener("click", () => { state.data.fences.style = b.dataset.fenceStyle; save().then(() => toast("Fence restyled.")); }));
  }

  async function setExterior(attr, value) {
    const cost = COST[attr] || COST.siding;
    if (state.data.exterior[attr] === value) return;
    if (!await payFor(cost, `${attr} · −${cost.shells} shells`, XP.exterior)) return;
    state.data.exterior[attr] = value;
    try { await save(); toast("Exterior updated."); } catch (e) { toast(state.error); }
  }
  async function addExterior(id) {
    const cost = COST[id];
    if (!await payFor(cost, `${id} · −${cost.shells} shells`, XP.exterior)) return;
    state.data.exterior[id] = true;
    try { await save(); toast("Addition built."); } catch (e) { toast(state.error); }
  }
  async function raiseFence(side) {
    if (!unlocked("rooms")) { toast("Fences unlock with room dividers."); return; }
    if (!await payFor(COST.fenceSeg, `${side.toUpperCase()} fence · −${COST.fenceSeg.shells} shells`, XP.fence)) return;
    state.data.fences[side] = true;
    try { await save(); toast("Fence raised."); } catch (e) { toast(state.error); }
  }
  async function raiseGate() {
    if (!await payFor(COST.gate, `Yard gate · −${COST.gate.shells} shells`, XP.gate)) return;
    state.data.fences.gate = true;
    try { await save(); peggySay("A gate that stands open — that's a house that welcomes folks in."); toast("Gate hung — open for visitors."); }
    catch (e) { toast(state.error); }
  }

  /* ================= Blueprints ================= */

  function blankEditor(name) {
    return { name: name || "Untitled plan", walls: new Set(), doors: new Set(), stairs: null };
  }
  function editorCell(e) {
    const svg = e.target.closest("svg");
    const rect = svg.getBoundingClientRect();
    const cell = rect.width / GRID_MAX;
    return {
      x: Math.max(0, Math.min(GRID_MAX - 1, Math.floor((e.clientX - rect.left) / cell))),
      y: Math.max(0, Math.min(GRID_MAX - 1, Math.floor((e.clientY - rect.top) / cell))),
    };
  }
  function validateWalls(wallSet, doorSet) {
    const W = GRID_MAX, H = GRID_MAX;
    const inWall = (x, y) => wallSet.has(`${x},${y}`);
    const outside = new Set(); const stack = [];
    const seed = (x, y) => { if (x < 0 || y < 0 || x >= W || y >= H) return; const k = `${x},${y}`; if (!inWall(x, y) && !outside.has(k)) { outside.add(k); stack.push([x, y]); } };
    for (let x = 0; x < W; x++) { seed(x, 0); seed(x, H - 1); }
    for (let y = 0; y < H; y++) { seed(0, y); seed(W - 1, y); }
    while (stack.length) {
      const [cx, cy] = stack.pop();
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => seed(cx + dx, cy + dy));
    }
    let enclosed = 0;
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const k = `${x},${y}`;
      if (!inWall(x, y) && !outside.has(k)) enclosed++;
    }
    const goodDoors = [...doorSet].filter((k) => {
      const [x, y] = k.split(",").map(Number);
      if (!inWall(x, y)) return false;
      const adj = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => `${x + dx},${y + dy}`);
      const out = (kk) => { const [ax, ay] = kk.split(",").map(Number); return ax >= 0 && ay >= 0 && ax < W && ay < H && !inWall(ax, ay) && outside.has(kk); };
      const inn = (kk) => { const [ax, ay] = kk.split(",").map(Number); return ax >= 0 && ay >= 0 && ax < W && ay < H && !inWall(ax, ay) && !outside.has(kk); };
      return adj.some(out) && adj.some(inn);
    });
    const problems = [];
    if (!wallSet.size) problems.push("empty");
    else if (!enclosed) problems.push("no-room");
    if (wallSet.size && !goodDoors.length) problems.push("no-door");
    return { problems, enclosed, goodDoors: goodDoors.length };
  }
  function wallsToBlueprint(walls, doors, stairs, name) {
    const cells = [...walls].map((k) => k.split(",").map(Number));
    const xs = cells.map((c) => c[0]), ys = cells.map((c) => c[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    const w = Math.min(GRID_MAX, maxX - minX + 1), d = Math.min(GRID_MAX, maxY - minY + 1);
    const onBorder = (x, y) => x === minX || x === maxX || y === minY || y === maxY;
    const interior = cells.filter(([x, y]) => !onBorder(x, y));
    const dividers = [];
    const used = new Set();
    // horizontal runs
    const byRow = new Map();
    interior.forEach(([x, y]) => { if (!byRow.has(y)) byRow.set(y, []); byRow.get(y).push(x); });
    byRow.forEach((rowXs, y) => {
      rowXs.sort((a, b) => a - b);
      let run = [rowXs[0]];
      for (let i = 1; i <= rowXs.length; i++) {
        if (rowXs[i] === run[run.length - 1] + 1) run.push(rowXs[i]);
        else {
          if (run.length >= 1) { dividers.push({ x1: run[0] - minX, y1: y - minY, x2: run[run.length - 1] - minX + 1, y2: y - minY }); run.forEach((x) => used.add(`${x},${y}`)); }
          run = [rowXs[i]];
        }
      }
    });
    // vertical runs for leftovers
    const byCol = new Map();
    interior.forEach(([x, y]) => { if (!used.has(`${x},${y}`)) { if (!byCol.has(x)) byCol.set(x, []); byCol.get(x).push(y); } });
    byCol.forEach((colYs, x) => {
      colYs.sort((a, b) => a - b);
      let run = [colYs[0]];
      for (let i = 1; i <= colYs.length; i++) {
        if (colYs[i] === run[run.length - 1] + 1) run.push(colYs[i]);
        else { dividers.push({ x1: x - minX, y1: run[0] - minY, x2: x - minX, y2: run[run.length - 1] - minY + 1 }); run = [colYs[i]]; }
      }
    });
    const bpDoors = [...doors].map((k) => {
      const [x, y] = k.split(",").map(Number);
      let side = "n";
      if (y === minY) side = "n"; else if (y === maxY) side = "s"; else if (x === minX) side = "w"; else side = "e";
      return { x: x - minX, y: y - minY, side };
    });
    return {
      id: `bp-${Date.now().toString(36)}`,
      name: String(name || "Untitled plan").slice(0, 32),
      w, d, dividers, doors: bpDoors,
      stairs: stairs ? { x: Math.max(0, Math.min(w - 1, stairs.x - minX)), y: Math.max(0, Math.min(d - 1, stairs.y - minY)) } : null,
      createdAt: Date.now(),
    };
  }

  function editorSVG(ed) {
    const cell = 26, S = GRID_MAX * cell;
    let svg = `<svg class="housing-editor" viewBox="0 0 ${S} ${S}" tabindex="0" role="application" aria-label="Blueprint editor. Arrow keys move the cursor, W paints a wall, E erases, D places a door, S places stairs.">`;
    for (let y = 0; y < GRID_MAX; y++) for (let x = 0; x < GRID_MAX; x++) {
      const k = `${x},${y}`;
      const isWall = ed.walls.has(k), isDoor = ed.doors.has(k), isStair = ed.stairs && ed.stairs.x === x && ed.stairs.y === y;
      const isCursor = state.editorCursor.x === x && state.editorCursor.y === y;
      svg += `<rect x="${x * cell}" y="${y * cell}" width="${cell}" height="${cell}" class="housing-ecell${isWall ? " wall" : ""}${isCursor ? " cursor" : ""}" data-ecell="${k}"/>`;
      if (isDoor) svg += `<circle cx="${x * cell + cell / 2}" cy="${y * cell + cell / 2}" r="7" class="housing-edoor"/>`;
      if (isStair) svg += `<text x="${x * cell + cell / 2}" y="${y * cell + cell / 2 + 4}" text-anchor="middle" class="housing-estair">S</text>`;
    }
    return svg + "</svg>";
  }

  function blueprintsView() {
    const d = state.data;
    const list = d.blueprints.map((bp, i) => `<div class="housing-card"><span><b>${esc(bp.name)}</b><small>${bp.w}×${bp.d} · ${bp.dividers.length} dividers · ${bp.doors.length} doors${bp.from ? ` · from ${esc(bp.from)}` : ""}</small></span><span class="housing-card-actions"><button type="button" data-bp-apply="${i}">Build</button><button type="button" data-bp-share="${i}">Share</button><button type="button" data-bp-delete="${i}" aria-label="Delete ${esc(bp.name)}">✕</button></span></div>`).join("");
    const ed = state.editor;
    const editor = ed ? `<div class="housing-editor-wrap">
      <div class="housing-editor-head"><input data-bp-name value="${esc(ed.name)}" maxlength="32" aria-label="Blueprint name"><span class="housing-editor-tools" role="group" aria-label="Editor tools">${[["wall", "Wall"], ["erase", "Erase"], ["door", "Door"], ["stairs", "Stairs"]].map(([t, l]) => `<button type="button" data-ed-tool="${t}" class="${state.editorTool === t ? "active" : ""}">${l}</button>`).join("")}</span></div>
      ${editorSVG(ed)}
      <p class="housing-editor-status" role="status">${esc(state.editorStatus || "Drag to draw walls. Outline a room, then add a door.")}</p>
      <div class="housing-editor-actions"><button type="button" data-bp-validate>Check with Peggy</button><button type="button" data-bp-preview>3D preview</button><button type="button" data-bp-save class="housing-primary" ${d.blueprints.length >= 5 ? "disabled" : ""}>Save plan${d.blueprints.length >= 5 ? " (full)" : ""}</button><button type="button" data-bp-cancel>Done</button></div>
      <div class="housing-bp-preview" hidden><canvas data-bp-preview-canvas></canvas></div>
    </div>` : `<button type="button" class="housing-primary" data-bp-new>New blueprint</button>`;
    return `<p class="housing-note">Draw a floor plan, check it with Peggy, save up to 5 plans, and share them with friends through your mailbox.</p>
    ${list || `<p class="housing-empty">No saved plans yet — your blueprints will live here.</p>`}
    <h3>Editor</h3>${editor}`;
  }

  function bindBlueprints(root) {
    if (state.view !== "blueprints") return;
    $("[data-bp-new]", root)?.addEventListener("click", () => { state.editor = blankEditor(`Plan ${state.data.blueprints.length + 1}`); state.editorStatus = ""; renderPanel(); });
    $("[data-bp-cancel]", root)?.addEventListener("click", () => { state.editor = null; renderPanel(); });
    root.querySelectorAll("[data-ed-tool]").forEach((b) => b.addEventListener("click", () => { state.editorTool = b.dataset.edTool; renderPanel(); }));
    $("[data-bp-name]", root)?.addEventListener("input", (e) => { if (state.editor) state.editor.name = e.target.value; });
    const svg = $(".housing-editor", root);
    if (svg && state.editor) {
      let painting = false;
      const apply = (e) => {
        const { x, y } = editorCell(e); const k = `${x},${y}`; const ed = state.editor;
        if (state.editorTool === "wall") { ed.walls.add(k); ed.doors.delete(k); if (ed.stairs && ed.stairs.x === x && ed.stairs.y === y) ed.stairs = null; }
        else if (state.editorTool === "erase") { ed.walls.delete(k); ed.doors.delete(k); if (ed.stairs && ed.stairs.x === x && ed.stairs.y === y) ed.stairs = null; }
        else if (state.editorTool === "door") { if (ed.walls.has(k)) { ed.doors.has(k) ? ed.doors.delete(k) : ed.doors.add(k); } }
        else if (state.editorTool === "stairs") { ed.stairs = { x, y }; }
        paintEditorCells(svg);
      };
      svg.addEventListener("pointerdown", (e) => { painting = true; svg.setPointerCapture(e.pointerId); apply(e); });
      svg.addEventListener("pointermove", (e) => { if (painting && (state.editorTool === "wall" || state.editorTool === "erase")) apply(e); });
      svg.addEventListener("pointerup", () => { painting = false; });
      svg.addEventListener("keydown", (e) => {
        const c = state.editorCursor; const ed = state.editor;
        const move = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0] }[e.key];
        if (move) { c.x = Math.max(0, Math.min(GRID_MAX - 1, c.x + move[0])); c.y = Math.max(0, Math.min(GRID_MAX - 1, c.y + move[1])); paintEditorCells(svg); e.preventDefault(); return; }
        const k = `${c.x},${c.y}`;
        if (e.key === "w" || e.key === "W" || e.key === "Enter") ed.walls.add(k);
        else if (e.key === "e" || e.key === "E") { ed.walls.delete(k); ed.doors.delete(k); }
        else if (e.key === "d" || e.key === "D") { if (ed.walls.has(k)) ed.doors.has(k) ? ed.doors.delete(k) : ed.doors.add(k); }
        else if (e.key === "s" || e.key === "S") ed.stairs = { x: c.x, y: c.y };
        else return;
        paintEditorCells(svg); e.preventDefault();
      });
    }
    $("[data-bp-validate]", root)?.addEventListener("click", () => {
      const { problems } = validateWalls(state.editor.walls, state.editor.doors);
      if (!problems.length) { state.editorStatus = "Peggy: solid plan!"; peggySay(PEGGY_LINES.valid); }
      else if (problems.includes("empty") || problems.includes("no-room")) { state.editorStatus = "Peggy: " + PEGGY_LINES.noRoom; peggySay(PEGGY_LINES.noRoom); }
      else { state.editorStatus = "Peggy: " + PEGGY_LINES.noDoor; peggySay(PEGGY_LINES.noDoor); }
      renderPanel();
    });
    $("[data-bp-preview]", root)?.addEventListener("click", async () => {
      const wrap = $(".housing-bp-preview", root);
      if (!wrap) return;
      wrap.hidden = !wrap.hidden;
      if (!wrap.hidden) {
        const bp = wallsToBlueprint(state.editor.walls, state.editor.doors, state.editor.stairs, state.editor.name);
        renderBlueprintPreview(wrap, bp);
      }
    });
    $("[data-bp-save]", root)?.addEventListener("click", async () => {
      const d = state.data;
      if (d.blueprints.length >= 5) return;
      const { problems } = validateWalls(state.editor.walls, state.editor.doors);
      if (problems.length) { state.editorStatus = "Peggy: " + (problems.includes("no-door") ? PEGGY_LINES.noDoor : PEGGY_LINES.noRoom); peggySay(state.editorStatus.slice(7)); renderPanel(); return; }
      const bp = wallsToBlueprint(state.editor.walls, state.editor.doors, state.editor.stairs, state.editor.name);
      d.blueprints.push(bp); gainXp(XP.blueprintSave); state.editor = null;
      try { await save(); peggySay("Filed away safe! That's a plan worth building."); toast(`"${bp.name}" saved.`); }
      catch (e) { toast(state.error); }
    });
    root.querySelectorAll("[data-bp-apply]").forEach((b) => b.addEventListener("click", () => applyBlueprint(Number(b.dataset.bpApply))));
    root.querySelectorAll("[data-bp-share]").forEach((b) => b.addEventListener("click", () => shareBlueprint(Number(b.dataset.bpShare))));
    root.querySelectorAll("[data-bp-delete]").forEach((b) => b.addEventListener("click", async () => {
      const [gone] = state.data.blueprints.splice(Number(b.dataset.bpDelete), 1);
      try { await save(); toast(`"${gone?.name || "Plan"}" recycled.`); } catch (e) { toast(state.error); }
    }));
  }

  function paintEditorCells(svg) {
    const ed = state.editor; if (!ed) return;
    svg.querySelectorAll("[data-ecell]").forEach((rect) => {
      const k = rect.dataset.ecell;
      rect.classList.toggle("wall", ed.walls.has(k));
      const [x, y] = k.split(",").map(Number);
      rect.classList.toggle("cursor", state.editorCursor.x === x && state.editorCursor.y === y);
    });
    // doors/stairs/cursor markers re-render cheaply via full re-render on tool change; cell paint is enough for drag
  }

  async function applyBlueprint(index) {
    const d = state.data;
    const bp = d.blueprints[index]; if (!bp) return;
    const dw = Math.max(0, bp.w - d.w), dd = Math.max(0, bp.d - d.d);
    const newStrips = Math.ceil(dw / 2) + Math.ceil(dd / 2);
    const total = d.strips.n + d.strips.s + d.strips.e + d.strips.w;
    let shells = 0, lumber = 0;
    for (let i = 0; i < newStrips; i++) { const c = COST.strip(total + i); shells += c.shells; lumber += c.lumber; }
    const newDividers = bp.dividers.length;
    shells += newDividers * COST.divider.shells; lumber += newDividers * COST.divider.lumber;
    const needStairs = bp.stairs && !d.stairs;
    if (needStairs) { shells += COST.stairs.shells; lumber += COST.stairs.lumber; }
    const cost = { shells, lumber };
    if (!await payFor(cost, `Blueprint "${bp.name}" · −${shells} shells`, XP.blueprintApply)) return;
    d.w = Math.max(d.w, bp.w); d.d = Math.max(d.d, bp.d);
    bp.dividers.forEach((s) => d.dividers.push({ ...s }));
    bp.doors.forEach((dr) => { if (!d.doors.some((e) => e.side === dr.side && e.x === dr.x && e.y === dr.y)) d.doors.push({ ...dr }); });
    if (needStairs) d.stairs = { ...bp.stairs };
    // re-key flooring rooms (room count may change)
    peggySay(`Building "${bp.name}" now — walls up, doors hung, just like the plan!`);
    try { await save(); toast(`"${bp.name}" built.`); } catch (e) { toast(state.error); }
  }

  async function renderBlueprintPreview(wrap, bp) {
    const canvas = $("[data-bp-preview-canvas]", wrap);
    if (!canvas) return;
    let THREE;
    try { THREE = await getThree(); } catch (e) { return; }
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xffffff, 0x24403c, 0.9));
    const key = new THREE.DirectionalLight(0xfff2d0, 1.25); key.position.set(2.5, 3.5, 4); scene.add(key);
    const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 80);
    const fake = { ...defaults(), w: bp.w, d: bp.d, stories: 1, roof: "gable", dividers: bp.dividers, doors: bp.doors, stairs: bp.stairs };
    const house = buildHouseMesh(THREE, fake);
    house.position.set(0, 0, 0); house.rotation.y = 0.6;
    scene.add(house);
    const size = Math.max(bp.w, bp.d) * TILE;
    camera.position.set(size * 0.95, size * 0.85, size * 1.15); camera.lookAt(0, 1, 0);
    const wpx = canvas.clientWidth || 320, hpx = canvas.clientHeight || 190;
    renderer.setSize(wpx, hpx, false);
    camera.aspect = wpx / hpx; camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    house.traverse((n) => { n.geometry?.dispose?.(); if (n.material) (Array.isArray(n.material) ? n.material : [n.material]).forEach((m) => m.dispose?.()); });
    renderer.dispose();
  }

  /* ================= Blueprint sharing via mailbox ================= */

  async function shareBlueprint(index) {
    const d = state.data;
    const bp = d.blueprints[index]; if (!bp || !state.session) return;
    const code = Math.random().toString(36).slice(2, 6);
    const slug = (bp.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 24) || "plan");
    d.shared[code] = { name: bp.name, w: bp.w, d: bp.d, dividers: bp.dividers, doors: bp.doors, stairs: bp.stairs, by: playerName().slice(0, 18), at: Date.now() };
    const keys = Object.keys(d.shared);
    if (keys.length > 20) delete d.shared[keys[0]];
    const itemId = `blueprint-${slug}-${state.session.uid}-${code}`;
    try { await save(); } catch (e) { toast(state.error); return; }
    const player = await readPlayer();
    const inv = [...new Set([...(player.inventory || player.owned || []), itemId])];
    window.dispatchEvent(new CustomEvent("snug-player-patch", { detail: (p) => ({ ...p, inventory: inv, owned: inv }) }));
    try { await save({ inventory: inv }); } catch (e) {}
    toast("Blueprint parcel ready — send it from your mailbox.");
    if (window.__snugMailboxUI) setTimeout(() => window.__snugMailboxUI.openPanel("send"), 900);
  }

  function parseBlueprintItem(id) {
    if (typeof id !== "string" || !id.startsWith("blueprint-")) return null;
    const parts = id.split("-");
    if (parts.length < 4) return null;
    const code = parts.pop(); const uid = parts.pop(); const slug = parts.slice(1).join("-");
    if (!/^[a-z0-9]{4}$/.test(code) || uid.length < 8) return null;
    return { slug, uid, code, itemId: id };
  }

  let pollTimer = null;
  async function pollBlueprintGifts() {
    if (!state.session || !state.data) return;
    try {
      const player = await readPlayer();
      const inv = player.inventory || player.owned || [];
      const items = inv.filter((id) => typeof id === "string" && id.startsWith("blueprint-"));
      if (!items.length) return;
      for (const itemId of items) {
        const parsed = parseBlueprintItem(itemId);
        if (!parsed) continue;
        try {
          const senderDoc = await loadProfile(parsed.uid);
          const shared = senderDoc?.housing?.shared?.[parsed.code];
          if (!shared) continue;
          if (state.data.blueprints.length >= 5) { toast("Blueprint slots are full — make room first."); continue; }
          if (state.data.blueprints.some((b) => b.sharedCode === parsed.code)) continue;
          state.data.blueprints.push({
            id: `bp-${Date.now().toString(36)}`, name: String(shared.name || "Shared plan").slice(0, 32),
            w: shared.w, d: shared.d, dividers: shared.dividers || [], doors: shared.doors || [], stairs: shared.stairs || null,
            createdAt: Date.now(), from: String(shared.by || "a neighbor").slice(0, 18), sharedCode: parsed.code,
          });
          const next = inv.filter((x) => x !== itemId);
          window.dispatchEvent(new CustomEvent("snug-player-patch", { detail: (p) => ({ ...p, inventory: next, owned: next }) }));
          await save({ inventory: next });
          toast(`Blueprint "${shared.name}" arrived from ${shared.by || "a neighbor"}!`);
        } catch (e) { /* keep the parcel for later */ }
      }
    } catch (e) {}
  }

  /* ================= Boot ================= */

  async function attach(session) {
    state.session = session;
    try { state.profile = await loadProfile(); state.data = normalize(state.profile.housing); }
    catch (e) { state.profile = {}; state.data = defaults(); state.error = "The build site could not load your home."; }
    if (state.data.level >= ladderLevel("story2") && !state.data.peggyQuest.offered) {
      state.data.peggyQuest.offered = true;
      state.peggyBubble = PEGGY_LINES.commission;
    }
    renderDock(); syncWorld(true); pollBlueprintGifts();
  }

  window.addEventListener("snug-session", (event) => attach(event.detail));
  window.addEventListener("snug-player-patch", () => { clearTimeout(pollTimer); pollTimer = setTimeout(pollBlueprintGifts, 1500); });
  ["snug-world-ready", "snug-world-expanded", "cylindric-world-layout-applied"].forEach((name) =>
    window.addEventListener(name, () => { [0, 180, 700].forEach((delay) => setTimeout(() => syncWorld(true), delay)); renderDock(); }));
  window.addEventListener("keydown", (event) => { if (event.key === "Escape" && state.open) close(); });
  window.addEventListener("pointerdown", (event) => {
    const button = event.target.closest?.("[data-town-view='build']");
    if (!button) return;
    event.preventDefault(); event.stopPropagation();
    open("overview");
  }, true);

  ensurePeggyVoice();
  try { if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = ensurePeggyVoice; } catch (e) {}
  if (window.__snugSession) attach(window.__snugSession);
  else state.data = defaults();
  renderDock();

  // Debug/test surface (pure logic only).
  window.__snugHousingTest = { normalize, defaults, roomRegions, validateWalls, wallsToBlueprint, xpNeeded, ladderLevel, COST, parseBlueprintItem, houseSignature, buildHouseMesh };

  // Public API for companion modules (barn-raising, etc.)
  window.__snugHousing = {
    getData: () => state.data,
    save: (extra) => save(extra),
    peggySay,
    toast,
    isOpen: () => state.open,
    render: () => renderPanel(),
    open: (view) => open(view),
  };
})();

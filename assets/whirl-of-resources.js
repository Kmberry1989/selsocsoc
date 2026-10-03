(() => {
  if (window.__snugWhirlOfResources) return;
  const audio = () => window.__snugGameShowAudio;

  /* ================= Show data ================= */

  // 12 segments — matches the 12 x 30deg slices of the .whirl-wheel conic-gradient.
  const SEGMENTS = [
    { label: "100", kind: "shells", value: 100 },
    { label: "\u2605", kind: "prize", item: "golden-dice", itemName: "Golden Dice" },
    { label: "150", kind: "shells", value: 150 },
    { label: "BUST", kind: "bankrupt" },
    { label: "200", kind: "shells", value: 200 },
    { label: "SKIP", kind: "lose-turn" },
    { label: "250", kind: "shells", value: 250 },
    { label: "\u2605", kind: "prize", item: "tool-card-folio", itemName: "Card Folio" },
    { label: "300", kind: "shells", value: 300 },
    { label: "500", kind: "shells", value: 500 },
    { label: "\u2605", kind: "prize", item: "keepsake-festival-ticket", itemName: "Festival Ticket" },
    { label: "400", kind: "shells", value: 400 },
  ];
  const SEGMENT_DEG = 360 / SEGMENTS.length;
  const SEGMENT_NAMES = { bankrupt: "BANKRUPT", "lose-turn": "LOSE A TURN" };

  // Greenhouse Round wheel: 12 wedges like the main wheel, values doubled,
  // plus the Golden Sprout jackpot wedge from the original show design.
  const GREENHOUSE_SEGMENTS = [
    { label: "200", kind: "shells", value: 200 },
    { label: "\u2605", kind: "prize", item: "golden-dice", itemName: "Golden Dice" },
    { label: "300", kind: "shells", value: 300 },
    { label: "BUST", kind: "bankrupt" },
    { label: "400", kind: "shells", value: 400 },
    { label: "SKIP", kind: "lose-turn" },
    { label: "500", kind: "shells", value: 500 },
    { label: "\u2605", kind: "prize", item: "tool-card-folio", itemName: "Card Folio" },
    { label: "600", kind: "shells", value: 600 },
    { label: "1000", kind: "shells", value: 1000 },
    { label: "SPROUT", kind: "jackpot", value: 2000, itemName: "Golden Sprout" },
    { label: "800", kind: "shells", value: 800 },
  ];
  const GREENHOUSE_PUZZLES = [
    { category: "Greenhouse Round", phrase: "MOONBLOOM MEADOW" },
    { category: "Greenhouse Round", phrase: "FERN BRAMBLE GREENHOUSE" },
    { category: "Greenhouse Round", phrase: "GOLDEN SPROUT" },
    { category: "Greenhouse Round", phrase: "THE GREENHOUSE GALA" },
  ];

  // Tickets: one free show entry per day; extras are 150 shells in the marquee.
  const TICKET_COST = 150;
  const ROUNDS_PER_GAME = 3;
  const PHASE_LIMITS = { spin: 20, letter: 15 };
  const todayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };

  /* ================= 3D prize wheel (optional; CSS wheel is the fallback) ================= */

  // Procedural GLB: 12 wedges in SEGMENTS order (clockwise from top, matching the
  // CSS conic-gradient), gold rim, hub, knob, and a static stand. Node "Wheel"
  // rotates; node "Stand" does not. If three.js or the GLB fails to load, the
  // CSS wheel keeps working untouched.
  const WHEEL_GLB = "assets/game-shows/whirl-of-resources/prize-wheel.glb";
  let threePromise;
  const getThree = () => (threePromise ||= import("./assets/vendor/three/three.module.js"));

  async function ensureWheel3D() {
    if (state.wheel3d) {
      attachWheel3D();
      return;
    }
    if (state.wheel3dTried) return;
    const wrap = state.root?.querySelector(".whirl-wheel-wrap");
    if (!wrap) return;
    state.wheel3dTried = true;
    try {
      const THREE = await getThree();
      const { GLTFLoader } = await import("./assets/vendor/three/GLTFLoader.js");
      const gltf = await new GLTFLoader().loadAsync(WHEEL_GLB);
      const wheelNode = gltf.scene.getObjectByName("Wheel");
      if (!wheelNode) throw new Error("Wheel node missing in " + WHEEL_GLB);
      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
      const canvas = renderer.domElement;
      canvas.setAttribute("data-whirl-3d", "");
      canvas.setAttribute("aria-hidden", "true");
      Object.assign(canvas.style, {
        position: "absolute", inset: "15px",
        width: "calc(100% - 30px)", height: "calc(100% - 30px)",
        borderRadius: "50%", pointerEvents: "none",
      });
      const scene = new THREE.Scene();
      scene.add(new THREE.HemisphereLight(0xffffff, 0x24403c, 0.9));
      const key = new THREE.DirectionalLight(0xfff2d0, 1.25);
      key.position.set(2.5, 3.5, 4);
      scene.add(key);
      const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 30);
      camera.position.set(0, -0.05, 3.2);
      camera.lookAt(0, -0.12, 0);
      scene.add(gltf.scene);
      state.wheel3d = { THREE, renderer, scene, camera, node: wheelNode, lastSize: 0 };
      attachWheel3D();
    } catch (error) {
      state.wheel3dFailed = true; // CSS wheel stays as-is
    }
  }

  function attachWheel3D() {
    const w3 = state.wheel3d;
    if (!w3) return;
    const wrap = state.root?.querySelector(".whirl-wheel-wrap");
    if (!wrap) return;
    const canvas = w3.renderer.domElement;
    if (!canvas.isConnected) {
      wrap.appendChild(canvas);
      const cssWheel = wrap.querySelector(".whirl-wheel");
      if (cssWheel) cssWheel.style.display = "none";
      const knob = wrap.querySelector(".whirl-knob");
      if (knob) knob.style.display = "none";
    }
    const size = Math.max(60, (wrap.clientWidth || 300) - 30);
    if (Math.abs(size - w3.lastSize) > 2) {
      w3.renderer.setSize(size, size, false);
      w3.lastSize = size;
    }
  }

  function paintWheel3D() {
    const w3 = state.wheel3d;
    if (!w3 || !w3.renderer.domElement.isConnected) return;
    // CSS rotate() is clockwise-positive; three.js rotation.z is CCW-positive
    // viewed from +Z, so negate to keep the segmentAtPointer() mapping exact.
    w3.node.rotation.z = (-state.rotation * Math.PI) / 180;
    w3.renderer.render(w3.scene, w3.camera);
  }

  // Starter puzzle pack — Cyclical City canon only. Exposed for a future show editor.
  const PUZZLES = [
    { category: "Around Cyclical City", phrase: "CYCLICAL CITY" },
    { category: "Town Landmarks", phrase: "MOONLIGHT FOOTBRIDGE" },
    { category: "Show Sayings", phrase: "GIVE THE WHIRL A TWIRL" },
    { category: "Famous Sayings", phrase: "HE IS MR MAYOR MAYOR NOW" },
    { category: "Festivals", phrase: "STARLIGHT JAMBOREE" },
    { category: "Neighborhoods", phrase: "STROLLING STRETCH" },
    { category: "Game Shows", phrase: "NOSY NEIGHBORS" },
    { category: "Game Shows", phrase: "MARKET BASKET MAYHEM" },
    { category: "Around Cyclical City", phrase: "WHISPERING WOOD" },
    { category: "Neighbors", phrase: "CHIP CHANCE" },
    { category: "Neighbors", phrase: "TILLY TURNER" },
    { category: "Neighbors", phrase: "FERN BRAMBLE" },
  ];

  const VOWELS = new Set(["A", "E", "I", "O", "U"]);
  const VOWEL_COST = 100;
  const TURN_INDICATOR = "GIVE THE WHIRL A TWIRL!";

  const TILLY_INTRO = "Welcome to the Whirl of Resources! I\u2019m Tilly Turner! Spin the wheel, call your letters, and solve the puzzle to win big!";
  const CHIP_CATCHPHRASES = {
    shells: (value) => pick([
      `${value} shells! The wheel has spoken, and it speaks fluent fabulous!`,
      `It\u2019s ${value} shells, folks! Call a consonant and make it rain!`,
      `${value} shells! Somebody fan me \u2014 this wheel is on fire tonight!`,
    ]),
    bankrupt: () => pick([
      "BANKRUPT! Oh, the humanity! Your bank goes back to zero, friend.",
      "BANKRUPT! The wheel giveth, and the wheel... well, you know the rest.",
    ]),
    loseTurn: () => pick([
      "Lose a turn! Take a breath, friend \u2014 the wheel will wait for you.",
      "Skip! Even game-show legends need a water break. Spin again!",
    ]),
    prize: (name) => pick([
      `A prize wedge! Call a correct letter and the ${name} is yours!`,
      `It\u2019s prize time! One right letter takes home the ${name}!`,
    ]),
    hit: (letter, gain) => pick([
      `Yes! We have ${gain > 0 ? `a ${letter} \u2014 that\u2019s ${gain} shells` : `a ${letter}`}! The crowd goes wild!`,
      `There\u2019s the magic! ${letter} it is${gain > 0 ? `, worth ${gain} shells` : ""}!`,
    ]),
    miss: (letter) => pick([
      `No ${letter}s on the board. The crowd groans as one!`,
      `Sorry, friend \u2014 no ${letter}s tonight! The wheel remains undefeated.`,
    ]),
    vowel: (letter, hits) => pick([
      hits ? `A fine vowel! The board welcomes your ${letter}!` : `A ${letter}, purchased and... not on the board! Bold strategy!`,
    ]),
    solveWin: () => pick([
      "WE HAVE A SOLVER! Somebody cue the confetti cannon!",
      "Correct! Take a bow, champion of the Whirl!",
    ]),
    solveMiss: () => pick([
      "Not quite! The puzzle keeps its secrets... for now.",
      "Ooh, so close! Back to the wheel, detective.",
    ]),
    greenhouse: () => pick([
      "The Greenhouse Round! Doubled wedges, one legendary puzzle \u2014 this is where legends are made!",
      "Welcome to the Greenhouse, champion! Everything pays double and the Golden Sprout is ripe for the picking!",
    ]),
    jackpot: () => pick([
      "THE GOLDEN SPROUT! Two thousand shells! Somebody water this moment \u2014 it is growing on me!",
      "Golden Sprout jackpot! The rarest wedge on the wheel, and it is all yours!",
    ]),
    ticketBought: () => pick([
      "Another ticket! The wheel loves a return customer!",
      "Ticket secured! The bulbs are already twinkling in anticipation!",
    ]),
    timeWarning: () => "Time's almost up, friend \u2014 give it a whirl!",
  };
  const TILLY_LINES = {
    prizeWon: (name) => `The ${name} is yours \u2014 shining and official!`,
    bankrupt: () => "Oh, tough spin! Shake it off \u2014 the wheel loves a comeback.",
    spinPrompt: () => TURN_INDICATOR,
    greenhouse: () => "You earned this, champion \u2014 the Greenhouse wheel is all yours!",
    champion: (total) => `Our Whirl champion! ${total} shells of pure game-show glory!`,
  };

  /* ================= Puzzle editor ================= */
  // In-show puzzle-pack editor, mirroring the Nosy Neighbors show editor:
  // session-only edits, JSON download/import, restore-starter. The show plays
  // from state.puzzles, so edits take effect immediately in this session.

  let whirlEditorSeq = 0;
  function starterPuzzles() {
    return PUZZLES.map((p) => ({ id: `puzzle-${++whirlEditorSeq}`, category: p.category, phrase: p.phrase }));
  }
  function blankPuzzle() {
    return { id: `puzzle-new-${++whirlEditorSeq}-${Date.now()}`, category: "", phrase: "" };
  }
  function findPuzzle(id) { return state.puzzles.find((p) => p.id === id) || null; }
  function editingPuzzleSource() {
    if (state.puzzleDraft && state.puzzleDraft.id === state.editingPuzzle) return state.puzzleDraft;
    return findPuzzle(state.editingPuzzle) || blankPuzzle();
  }
  // Same normalization the game applies when checking solves.
  const phraseNorm = (value) => String(value || "").toUpperCase().replace(/[^A-Z]+/g, " ").trim().replace(/\s+/g, " ");
  function letterCount(phrase) { return phraseNorm(phrase).replace(/ /g, "").length; }
  function puzzleProblems(puzzle) {
    const problems = [];
    if (!String(puzzle.category || "").trim()) problems.push("Give the puzzle a category.");
    const phrase = phraseNorm(puzzle.phrase);
    if (!phrase) problems.push("Give the puzzle a phrase using letters A–Z.");
    else if (phrase.length > 60) problems.push("Keep the phrase to 60 characters or fewer so it fits the board.");
    return { problems, phrase };
  }
  function savePuzzleForm() {
    const form = state.root?.querySelector("[data-whirl-ed-form]");
    if (!form) return;
    const data = new FormData(form);
    const raw = String(data.get("phrase") || "");
    const draft = {
      id: String(data.get("id") || ""),
      category: String(data.get("category") || "").trim().slice(0, 40),
      phrase: raw.trim().slice(0, 80),
    };
    const { problems, phrase } = puzzleProblems(draft);
    if (problems.length) {
      state.puzzleDraft = draft;
      state.puzzleStatus = problems.join(" ");
      audio()?.wrong?.();
      render();
      return;
    }
    const clean = { id: draft.id, category: draft.category, phrase };
    const stripped = raw.toUpperCase().replace(/[A-Z ]/g, "").length;
    const index = state.puzzles.findIndex((p) => p.id === clean.id);
    if (index >= 0) state.puzzles[index] = clean; else state.puzzles.push(clean);
    state.editingPuzzle = clean.id;
    state.puzzleDraft = null;
    state.puzzleStatus = stripped
      ? `Puzzle saved for this session. (Removed ${stripped} invalid character${stripped === 1 ? "" : "s"}.)`
      : "Puzzle saved for this session.";
    audio()?.ui?.();
    render();
  }
  function puzzleEditorView() {
    const editing = editingPuzzleSource();
    const exists = !!findPuzzle(editing.id);
    const rows = state.puzzles.map((p) => (
      `<button class="whirl-ed-row${p.id === editing.id ? " active" : ""}" type="button" data-whirl-ed-open="${esc(p.id)}"><span><b>${esc(p.phrase || "Untitled puzzle")}</b><small>${esc(p.category)} · ${letterCount(p.phrase)} letters</small></span><i aria-hidden="true">›</i></button>`
    )).join("");
    return `<section class="whirl-ed" aria-label="Puzzle editor"><div class="whirl-ed-head"><span><small>Companion tool</small><h2>Whirl of Resources puzzle editor</h2><p>Add, revise, remove, import, and export every puzzle the wheel needs.</p></span><span class="whirl-ed-count">${state.puzzles.length} puzzles</span></div>` +
      `<div class="whirl-ed-layout"><div class="whirl-ed-list"><div class="whirl-ed-toolbar"><button type="button" data-whirl-ed-new>New puzzle</button><button type="button" data-whirl-ed-export>Download pack</button><label>Import pack<input type="file" accept="application/json" data-whirl-ed-import></label><button type="button" data-whirl-ed-reset>Restore starter</button></div>` +
      `<div class="whirl-ed-rows">${rows || `<div class="whirl-ed-empty">No puzzles yet. Create one to begin.</div>`}</div>` +
      `<p class="whirl-ed-note">Edits stay in this session until you download the puzzle pack. Import that JSON next time to keep working—nothing is stored in this browser.</p></div>` +
      `<form class="whirl-ed-form" data-whirl-ed-form><input type="hidden" name="id" value="${esc(editing.id)}">` +
      `<label class="whirl-ed-field"><span>Category</span><input name="category" maxlength="40" value="${esc(editing.category)}" placeholder="Around Cyclical City"></label>` +
      `<label class="whirl-ed-field"><span>Puzzle phrase (letters A–Z)</span><input name="phrase" data-whirl-ed-phrase maxlength="80" value="${esc(editing.phrase)}" placeholder="GIVE THE WHIRL A TWIRL"></label>` +
      `<p class="whirl-ed-count-line" role="status"><span data-whirl-ed-count>${letterCount(editing.phrase)} letters</span> · spaces separate words on the board</p>` +
      `<div class="whirl-ed-actions"><button class="whirl-ed-danger" type="button" data-whirl-ed-delete${exists ? "" : " disabled"}>Delete</button><button class="whirl-primary" type="submit">Save puzzle</button></div>` +
      `<p class="whirl-ed-status" role="status">${esc(state.puzzleStatus)}</p></form></div>` +
      `<div class="whirl-ed-actions"><button type="button" class="secondary" data-whirl-home>Done editing</button></div></section>`;
  }
  function puzzleExport() {
    const pack = { format: "whirl-of-resources-puzzle-pack", version: 1, title: "Whirl of Resources",
      puzzles: state.puzzles.map((p) => ({ category: p.category, phrase: p.phrase })) };
    const blob = new Blob([JSON.stringify(pack, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob), link = document.createElement("a");
    link.href = url; link.download = "whirl-of-resources-puzzle-pack.json"; link.click();
    setTimeout(() => URL.revokeObjectURL(url), 500);
    state.puzzleStatus = "Puzzle pack downloaded."; state.puzzleDraft = null; render();
  }
  async function puzzleImport(file) {
    try {
      const payload = JSON.parse(await file.text());
      const list = Array.isArray(payload) ? payload : payload.puzzles;
      if (!Array.isArray(list) || !list.length) throw Error("That file has no puzzles.");
      let added = 0, skipped = 0;
      list.slice(0, 300).forEach((raw) => {
        const category = String(raw.category || "").trim().slice(0, 40);
        const candidate = { id: `puzzle-imp-${++whirlEditorSeq}-${added}`, category, phrase: String(raw.phrase || "").trim().slice(0, 80) };
        const { problems, phrase } = puzzleProblems(candidate);
        if (problems.length) { skipped++; return; }
        candidate.phrase = phrase;
        state.puzzles.push(candidate); added++;
      });
      if (!added) throw Error("That file has no usable puzzles (each needs a category and a letter phrase).");
      state.editingPuzzle = state.puzzles[state.puzzles.length - 1].id;
      state.puzzleDraft = null;
      state.puzzleStatus = `Imported ${added} puzzle${added === 1 ? "" : "s"}${skipped ? ` (${skipped} skipped).` : "."}`;
      render();
    } catch (error) {
      state.puzzleStatus = error instanceof Error ? error.message : "That puzzle pack could not be imported.";
      render();
    }
  }

  /* ================= State ================= */

  const state = {
    root: null, view: "home", phase: "idle",
    round: 0, puzzle: null, letters: [], used: new Set(), justRevealed: new Set(),
    bank: 0, pendingPrize: null, lastSegment: null, prizesWon: [],
    spinning: false, spinToken: 0, rotation: 0,
    wheel3d: null, wheel3dTried: false, wheel3dFailed: false,
    solveOpen: false, muted: false, callout: "", banner: "", bannerPhase: "",
    puzzles: starterPuzzles(),
    editingPuzzle: null,
    puzzleDraft: null,
    puzzleStatus: "",
    // Game structure: 3 rounds + Greenhouse Round for the champion.
    game: null, greenhouse: false,
    // Tickets: one free show entry per day, extras cost shells.
    tickets: null, playerCoins: 0, playerName: "",
    // Grab-and-flick + phase timers.
    grab: null, lastGrabEnd: 0,
    timerId: null, phaseEndsAt: 0, phaseWarned: false,
  };
  state.editingPuzzle = state.puzzles[0] ? state.puzzles[0].id : null;

  /* ================= Helpers ================= */

  const esc = (value) => { const node = document.createElement("span"); node.textContent = String(value ?? ""); return node.innerHTML; };
  const pick = (list) => list[Math.floor(Math.random() * list.length)];

  // Voices stay consistent with the npc-roster conventions (per-character rate/pitch,
  // English voice preferred). Chip's rate/pitch match his roster entry exactly.
  const VOICES = {
    chip: { rate: 1.28, pitch: 1.1 },
    tilly: { rate: 1.06, pitch: 1.24 },
  };
  let englishVoice = null;
  function ensureVoices() {
    try {
      const voices = speechSynthesis.getVoices().filter((v) => /^en/i.test(v.lang));
      englishVoice = voices[0] || null;
    } catch (e) { englishVoice = null; }
  }
  function setSpeaking(host, on) {
    state.root?.querySelectorAll(`[data-host="${host}"]`).forEach((el) => el.classList.toggle("speaking", Boolean(on)));
  }
  function speak(host, text) {
    setSpeaking(host, true);
    try {
      if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") { setSpeaking(host, false); return; }
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = VOICES[host].rate;
      utterance.pitch = VOICES[host].pitch;
      utterance.volume = 0.95;
      if (englishVoice) utterance.voice = englishVoice;
      let done = false;
      const finish = () => { if (!done) { done = true; setSpeaking(host, false); } };
      utterance.onend = finish;
      utterance.onerror = finish;
      setTimeout(() => { try { speechSynthesis.speak(utterance); } catch (e) { finish(); } }, 60);
      setTimeout(finish, Math.max(4000, text.length * 110));
    } catch (e) { setSpeaking(host, false); }
  }

  // Economy: shells through the standard coin event, items through the player patch
  // both established patterns used by fishing and the other live systems.
  function awardShells(amount, message) {
    if (!(amount > 0)) return;
    window.dispatchEvent(new CustomEvent("snug-award-coins", { detail: { amount, message } }));
  }
  function awardInventoryItem(itemId) {
    window.dispatchEvent(new CustomEvent("snug-player-patch", {
      detail: (player) => ({
        ...player,
        owned: [...new Set([...(player.owned || []), itemId])],
        inventory: [...new Set([...(player.inventory || player.owned || []), itemId])],
      }),
    }));
    state.prizesWon.push(itemId);
  }
  function itemArt(itemId) {
    try {
      const node = window.__snugCreateInventorySprite?.(itemId, "whirl-prize-sprite");
      if (node) return node;
    } catch (e) { /* fall through */ }
    const fallback = document.createElement("span");
    fallback.className = "whirl-prize-sprite";
    fallback.textContent = "\u2605";
    return fallback;
  }

  // The Greenhouse Round runs on the doubled wheel; regular rounds use the base wheel.
  function activeSegments() { return state.greenhouse ? GREENHOUSE_SEGMENTS : SEGMENTS; }

  // Player save access through the standard patch event. The patch function
  // receives the live player object, so a capture-and-return gives us a read
  // without changing anything.
  function readPlayer() {
    return new Promise((resolve) => {
      let settled = false;
      const done = (player) => { if (!settled) { settled = true; resolve(player || {}); } };
      try {
        window.dispatchEvent(new CustomEvent("snug-player-patch", {
          detail: (player) => { done(player); return player; },
        }));
      } catch (e) { done({}); }
      setTimeout(() => done({}), 1500);
    });
  }
  function writePlayer(patch) {
    window.dispatchEvent(new CustomEvent("snug-player-patch", {
      detail: (player) => ({ ...(player || {}), ...patch }),
    }));
  }
  function spendShells(amount, message) {
    window.dispatchEvent(new CustomEvent("snug-award-coins", { detail: { amount: -Math.abs(amount), message } }));
  }

  // Daily free ticket: granted once per calendar day when the marquee opens.
  async function ensureDailyTicket() {
    const player = await readPlayer();
    const today = todayStr();
    let tickets = Number(player.whirlTickets || 0);
    if (player.whirlTicketDay !== today) {
      tickets = 1;
      writePlayer({ whirlTickets: 1, whirlTicketDay: today });
    }
    state.tickets = tickets;
    state.playerCoins = Math.max(0, Number(player.coins || 0));
    state.playerName = String(player.name || player.displayName || "").slice(0, 18);
    render();
  }
  function buyTicket() {
    if (state.playerCoins < TICKET_COST) {
      setCallout(`A ticket costs <b>${TICKET_COST} shells</b> \u2014 your purse is a little light. Spin tomorrow's free ticket instead!`);
      audio()?.wrong?.();
      return;
    }
    state.playerCoins -= TICKET_COST;
    state.tickets = (state.tickets || 0) + 1;
    spendShells(TICKET_COST, `Whirl of Resources \u00b7 show ticket`);
    writePlayer({ whirlTickets: state.tickets });
    audio()?.solve?.();
    speak("chip", CHIP_CATCHPHRASES.ticketBought());
    setCallout(`Ticket secured! You hold <b>${state.tickets}</b> ticket${state.tickets === 1 ? "" : "s"}.`);
    render();
  }

  /* ================= DOM ================= */

  function hostsHTML() {
    return `<div class="whirl-hosts">` +
      `<div class="whirl-host" data-host="chip"><span class="whirl-host-face chip" aria-hidden="true"></span><span><b>Chip Chance</b><small>Your announcer</small></span></div>` +
      `<div class="whirl-host" data-host="tilly"><span class="whirl-host-face tilly" aria-hidden="true"></span><span><b>Tilly Turner</b><small>Co-host</small></span></div>` +
      `</div>`;
  }

  function tilesHTML() {
    const words = [];
    let current = [];
    state.letters.forEach((entry, i) => {
      if (entry.ch === " ") { if (current.length) { words.push(current); current = []; } }
      else current.push({ ...entry, i });
    });
    if (current.length) words.push(current);
    return words.map((word) =>
      `<span class="whirl-word">${word.map((entry) =>
        `<span class="whirl-tile${entry.revealed ? "" : " blank"}${state.justRevealed.has(entry.i) ? " revealed" : ""}">${entry.revealed ? esc(entry.ch) : ""}</span>`
      ).join("")}</span>`
    ).join("");
  }

  function wheelHTML() {
    const spans = activeSegments().map((seg, i) =>
      `<span style="--r:${(i * SEGMENT_DEG + SEGMENT_DEG / 2).toFixed(1)}deg">${esc(seg.label)}</span>`
    ).join("");
    return `<div class="whirl-wheel-wrap" data-whirl-spin-zone role="button" tabindex="0" aria-label="Spin the wheel">` +
      `<div class="whirl-pointer" aria-hidden="true"></div>` +
      `<div class="whirl-wheel" aria-hidden="true"><div class="whirl-values">${spans}</div></div>` +
      `<div class="whirl-knob" aria-hidden="true">SPIN</div>` +
      `</div>`;
  }

  function lettersHTML() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    return `<div class="whirl-letters" role="group" aria-label="Letter board">${letters.map((letter) => {
      const isVowel = VOWELS.has(letter);
      const used = state.used.has(letter);
      let disabled = true;
      if (!used) {
        if (state.phase === "letter" && !isVowel) disabled = false;
        if (state.phase === "spin" && isVowel && state.bank >= VOWEL_COST) disabled = false;
      }
      return `<button type="button" data-whirl-letter="${letter}" class="${isVowel ? "vowel" : ""}${used ? " used" : ""}"${disabled ? " disabled" : ""} aria-label="${isVowel ? "Vowel " : ""}${letter}${used ? " (used)" : ""}">${letter}</button>`;
    }).join("")}</div>`;
  }

  function actionsHTML() {
    if (state.phase === "spinning") return `<div class="whirl-actions"><button type="button" disabled>Spinning\u2026</button></div>`;
    if (state.phase === "letter") {
      return `<div class="whirl-actions"><button type="button" class="secondary" data-whirl-solve-toggle>Solve the puzzle</button><button type="button" class="secondary" data-whirl-solve-toggle disabled style="visibility:hidden" aria-hidden="true"></button></div>`;
    }
    return `<div class="whirl-actions"><button type="button" data-whirl-spin>SPIN THE WHEEL</button><button type="button" class="secondary" data-whirl-solve-toggle>Solve the puzzle</button></div>`;
  }

  function homeView() {
    const tickets = state.tickets == null ? "\u2026" : state.tickets;
    const canStart = (state.tickets || 0) > 0;
    return `<div class="whirl-set"><div class="whirl-board-side">` +
      `<div class="whirl-logo"><span>WHIRL<br>OF RESOURCES</span></div>` +
      `<div class="whirl-banner">${esc(TURN_INDICATOR)}</div>` +
      hostsHTML() +
      `<div class="whirl-tickets" role="status"><span class="whirl-ticket-count">\u{1F39F} <b>${tickets}</b> ticket${state.tickets === 1 ? "" : "s"}</span><small>One free ticket every day \u00b7 extras ${TICKET_COST} shells</small></div>` +
      `<div class="whirl-callout" role="status">Grab the big wheel and give it a flick, call your letters, and solve the puzzle. Three rounds make a game \u2014 the champion earns a bonus Greenhouse Round on the doubled wheel!</div>` +
      `<div class="whirl-actions"><button type="button" data-whirl-start${canStart ? "" : " disabled"}>Start the show \u00b7 1 ticket</button><button type="button" class="secondary" data-whirl-multiplayer>Play together</button><button type="button" class="secondary" data-whirl-buy-ticket>Buy ticket \u00b7 ${TICKET_COST}</button><button type="button" class="secondary" data-whirl-editor>Puzzle editor</button><button type="button" class="secondary" data-whirl-close>Not now</button></div>` +
      `</div></div>`;
  }

  function roundLabel() {
    if (state.greenhouse) return "GREENHOUSE ROUND";
    return `ROUND ${state.round} OF ${ROUNDS_PER_GAME}`;
  }
  function roundView() {
    const total = state.game ? state.game.totalBank : 0;
    return `<div class="whirl-set">` +
      `<div class="whirl-board-side">` +
      `<div class="whirl-logo"><span>WHIRL<br>OF RESOURCES</span></div>` +
      `<div class="whirl-roundline"><span>${esc(roundLabel())} \u00b7 ${esc(state.puzzle.category)}</span><span class="whirl-timer" data-whirl-timer hidden></span><span class="whirl-score">Bank <b>${state.bank}</b> shells${total ? ` \u00b7 Game <b>${total}</b>` : ""}</span></div>` +
      `<div class="whirl-puzzle"><div class="whirl-category">${esc(state.puzzle.category)}</div><div class="whirl-tiles">${tilesHTML()}</div></div>` +
      `<div class="whirl-banner"${state.bannerPhase ? ` data-phase="${esc(state.bannerPhase)}"` : ""}>${esc(state.banner)}</div>` +
      hostsHTML() +
      `<div class="whirl-callout" role="status" aria-live="polite">${state.callout}</div>` +
      `</div>` +
      `<div class="whirl-wheel-side">` +
      wheelHTML() +
      actionsHTML() +
      `<form class="whirl-solve-form"${state.solveOpen ? "" : " hidden"}><input data-whirl-solve-input autocomplete="off" maxlength="60" placeholder="Type the full puzzle" aria-label="Puzzle solution"><button type="submit">Solve!</button></form>` +
      lettersHTML() +
      `<div class="whirl-help">\u2605 = prize item \u00b7 BUST = lose your bank \u00b7 SKIP = lose your turn \u00b7 Vowels cost ${VOWEL_COST} shells</div>` +
      `</div></div>`;
  }

  function prizeNames() {
    const segs = [...SEGMENTS, ...GREENHOUSE_SEGMENTS];
    return state.prizesWon.map((id) => {
      const seg = segs.find((s) => s.item === id);
      return seg ? seg.itemName : id;
    });
  }

  function roundEndView() {
    const names = prizeNames();
    const nextIsGreenhouse = state.round >= ROUNDS_PER_GAME && !state.greenhouse;
    return `<div class="whirl-set"><div class="whirl-board-side">` +
      `<div class="whirl-logo"><span>WHIRL<br>OF RESOURCES</span></div>` +
      `<div class="whirl-banner">${nextIsGreenhouse ? "CHAMPION!" : "ROUND COMPLETE!"}</div>` +
      hostsHTML() +
      `<div class="whirl-callout" role="status">You solved \u201c${esc(state.puzzle.phrase)}\u201d! Round bank: <b>${state.bank} shells</b> \u00b7 Game total: <b>${state.game ? state.game.totalBank : state.bank} shells</b>${names.length ? ` \u00b7 Prizes: ${esc(names.join(", "))}` : ""}.</div>` +
      (nextIsGreenhouse
        ? `<div class="whirl-callout" role="status">Three rounds, one champion \u2014 that's you! The Greenhouse Round runs on the doubled wheel with the legendary Golden Sprout wedge.</div>`
        : ``) +
      `<div class="whirl-actions"><button type="button" data-whirl-next-round>${nextIsGreenhouse ? "Enter the Greenhouse!" : `Start round ${state.round + 1}`}</button><button type="button" class="secondary" data-whirl-home>Back to marquee</button></div>` +
      `</div></div>`;
  }

  function podiumView() {
    const names = prizeNames();
    const total = state.game ? state.game.totalBank : state.bank;
    const who = state.playerName || "Neighbor";
    const confetti = Array.from({ length: 24 }, (_, i) =>
      `<i style="--x:${((i * 41) % 100)};--d:${(1.6 + (i % 5) * 0.5).toFixed(1)}s;--c:${["#f5cb58", "#e86d53", "#58a78e", "#5d82ba", "#d87892"][i % 5]}" aria-hidden="true"></i>`
    ).join("");
    return `<div class="whirl-set"><div class="whirl-board-side">` +
      `<div class="whirl-logo"><span>WHIRL<br>OF RESOURCES</span></div>` +
      `<div class="whirl-banner" data-phase="podium">WHIRL CHAMPION!</div>` +
      `<div class="whirl-podium" role="img" aria-label="${esc(who)}, Whirl of Resources champion"><div class="whirl-confetti">${confetti}</div>` +
      `<div class="whirl-steps"><div class="whirl-step second"><span>2</span></div><div class="whirl-step first"><span class="whirl-champ-face" aria-hidden="true">${esc(who.slice(0, 1).toUpperCase() || "\u2605")}</span><b>${esc(who)}</b><span>1</span></div><div class="whirl-step third"><span>3</span></div></div></div>` +
      hostsHTML() +
      `<div class="whirl-callout" role="status">Champion of the Whirl! Game total: <b>${total} shells</b>${names.length ? ` \u00b7 Prizes: ${esc(names.join(", "))}` : ""}. Strike a pose \u2014 this moment deserves a snapshot.</div>` +
      `<div class="whirl-actions"><button type="button" data-whirl-snapshot>Save snapshot</button><button type="button" class="secondary" data-whirl-again>Play again \u00b7 1 ticket</button><button type="button" class="secondary" data-whirl-home>Back to marquee</button></div>` +
      `</div></div>`;
  }

  // Winners' podium photo moment: draws a celebratory keepsake card and downloads it.
  function saveSnapshot() {
    try {
      const total = state.game ? state.game.totalBank : state.bank;
      const who = state.playerName || "Neighbor";
      const canvas = document.createElement("canvas");
      canvas.width = 1200; canvas.height = 630;
      const ctx = canvas.getContext("2d");
      const bg = ctx.createLinearGradient(0, 0, 0, 630);
      bg.addColorStop(0, "#366166"); bg.addColorStop(0.5, "#17393b"); bg.addColorStop(1, "#10282a");
      ctx.fillStyle = bg; ctx.fillRect(0, 0, 1200, 630);
      const colors = ["#f5cb58", "#e86d53", "#58a78e", "#5d82ba", "#d87892", "#f8efe0"];
      for (let i = 0; i < 160; i++) {
        ctx.fillStyle = colors[i % colors.length];
        ctx.globalAlpha = 0.85;
        const x = (i * 97) % 1200, y = (i * 61) % 630, r = 3 + (i % 5);
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.textAlign = "center";
      ctx.fillStyle = "#f5cb58";
      ctx.font = "900 84px Georgia, serif";
      ctx.fillText("WHIRL OF RESOURCES", 600, 170);
      ctx.fillStyle = "#fff8d4";
      ctx.font = "700 44px Georgia, serif";
      ctx.fillText("\u2605 CHAMPION \u2605", 600, 260);
      ctx.fillStyle = "#ffffff";
      ctx.font = "900 96px Georgia, serif";
      ctx.fillText(who, 600, 390);
      ctx.fillStyle = "#ffe693";
      ctx.font = "700 52px Georgia, serif";
      ctx.fillText(`${total} shells`, 600, 480);
      ctx.fillStyle = "#bcd3cd";
      ctx.font = "400 30px Georgia, serif";
      ctx.fillText(`Cyclical City \u00b7 ${todayStr()}`, 600, 550);
      const link = document.createElement("a");
      link.download = "whirl-of-resources-champion.png";
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      link.remove();
      setCallout("Snapshot saved \u2014 frame it next to your Moonbloom!");
      audio()?.solve?.();
    } catch (e) {
      setCallout("The snapshot didn't develop \u2014 the moment lives on in memory!");
    }
  }

  function render() {
    if (!state.root) return;
    const panel = state.root.querySelector(".whirl-panel");
    panel.innerHTML = state.view === "home" ? homeView() : state.view === "editor" ? puzzleEditorView() : state.view === "round" ? roundView() : state.view === "roundEnd" ? roundEndView() : podiumView();
    state.justRevealed.clear();
    paintWheel();
    const audioButton = state.root.querySelector("[data-whirl-audio]");
    if (audioButton) {
      audioButton.textContent = state.muted ? "Sound off" : "Sound on";
      audioButton.setAttribute("aria-pressed", String(state.muted));
    }
  }

  function paintWheel() {
    const wheel = state.root?.querySelector(".whirl-wheel");
    if (wheel) wheel.style.transform = `rotate(${state.rotation}deg)`;
    ensureWheel3D();
    paintWheel3D();
  }

  function setCallout(html) {
    state.callout = html;
    const node = state.root?.querySelector(".whirl-callout");
    if (node) node.innerHTML = html;
  }

  function build() {
    if (state.root) return;
    const root = document.createElement("section");
    root.className = "whirl-game";
    root.hidden = true;
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", "Whirl of Resources game show");
    root.innerHTML =
      `<header class="whirl-topbar"><span><small>Cyclical City game show</small><b>Whirl of Resources</b></span>` +
      `<div class="whirl-top-tools"><button type="button" data-whirl-audio aria-pressed="false">Sound on</button><button type="button" data-whirl-close>Leave</button></div></header>` +
      `<div class="whirl-stage"><div class="whirl-panel"></div></div>`;
    root.addEventListener("click", onClick);
    root.addEventListener("submit", (event) => {
      if (event.target.matches(".whirl-solve-form")) {
        event.preventDefault();
        const input = event.target.querySelector("[data-whirl-solve-input]");
        solveAttempt(input ? input.value : "");
      }
    });
    root.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && event.target.matches?.("[data-whirl-spin-zone]")) {
        event.preventDefault();
        if (state.view === "round" && state.phase === "spin") spinWheel();
      }
    });
    // Grab-and-flick: the wheel is a physical knob under the pointer.
    root.addEventListener("pointerdown", (event) => {
      if (event.target.closest?.("[data-whirl-spin-zone]")) onGrabStart(event);
    });
    root.addEventListener("pointermove", (event) => { if (state.grab) onGrabMove(event); });
    root.addEventListener("pointerup", (event) => { if (state.grab) onGrabEnd(event); });
    root.addEventListener("pointercancel", (event) => {
      if (state.grab && event.pointerId === state.grab.id) state.grab = null;
    });
    document.body.appendChild(root);
    state.root = root;
    try {
      if ("speechSynthesis" in window && speechSynthesis.addEventListener) {
        speechSynthesis.addEventListener("voiceschanged", ensureVoices);
      }
    } catch (e) { /* voice list stays best-effort */ }
  }

  /* ================= Flow ================= */

  function open() {
    build();
    ensureVoices();
    try { if ("speechSynthesis" in window) speechSynthesis.getVoices(); } catch (e) { /* voices load async */ }
    clearPhaseTimer();
    state.grab = null;
    state.view = "home";
    state.phase = "idle";
    state.solveOpen = false;
    state.game = null;
    state.greenhouse = false;
    render();
    state.root.hidden = false;
    requestAnimationFrame(() => state.root.classList.add("is-open"));
    audio()?.resume?.();
    audio()?.startTheme?.();
    setTimeout(() => audio()?.stopTheme?.(), 2400);
    speak("tilly", TILLY_INTRO);
    ensureDailyTicket();
  }

  function close() {
    clearPhaseTimer();
    state.grab = null;
    if (state.spinning) state.spinToken++;
    const roundActive = state.view === "round" && state.phase !== "won";
    try { if ("speechSynthesis" in window) speechSynthesis.cancel(); } catch (e) { /* noop */ }
    setSpeaking("chip", false);
    setSpeaking("tilly", false);
    audio()?.stopTheme?.();
    if (roundActive) {
      window.dispatchEvent(new CustomEvent("snug-whirl-result", { detail: { won: false, bank: state.bank } }));
    }
    if (!state.root) return;
    state.root.classList.remove("is-open");
    setTimeout(() => { if (state.root) state.root.hidden = true; }, 240);
  }

  /* ================= Phase timers ================= */
  // The show keeps moving: 20s to spin (then a gentle auto-spin), 15s to call
  // a letter (then Chip picks one for you).

  function clearPhaseTimer() {
    if (state.timerId) { clearInterval(state.timerId); state.timerId = null; }
    const node = state.root?.querySelector("[data-whirl-timer]");
    if (node) node.hidden = true;
  }
  function startPhaseTimer(seconds, onExpire) {
    clearPhaseTimer();
    state.phaseEndsAt = Date.now() + seconds * 1000;
    state.phaseWarned = false;
    const tick = () => {
      const remain = Math.max(0, Math.ceil((state.phaseEndsAt - Date.now()) / 1000));
      const el = state.root?.querySelector("[data-whirl-timer]");
      if (el) { el.hidden = false; el.textContent = `${remain}s`; }
      if (remain <= 5 && remain > 0 && !state.phaseWarned && (state.phase === "spin" || state.phase === "letter")) {
        state.phaseWarned = true;
        speak("chip", CHIP_CATCHPHRASES.timeWarning());
      }
      if (remain <= 0) { clearPhaseTimer(); onExpire(); }
    };
    state.timerId = setInterval(tick, 250);
    tick();
  }
  function onSpinTimeout() {
    if (state.view !== "round" || state.phase !== "spin") return;
    if (state.grab) { startPhaseTimer(10, onSpinTimeout); return; } // still winding — a little more rope
    setCallout("Time! The wheel takes a gentle spin on its own.");
    spinWheel();
  }
  function onLetterTimeout() {
    if (state.view !== "round" || state.phase !== "letter") return;
    const options = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter((l) => !VOWELS.has(l) && !state.used.has(l));
    if (!options.length) return;
    setCallout("Time! Chip picks a letter for you...");
    callConsonant(pick(options));
  }

  /* ================= Game flow ================= */
  // A game is 3 rounds; the champion (you!) earns a bonus Greenhouse Round
  // on the doubled wheel, then takes the podium.

  function tryStartGame() {
    if ((state.tickets || 0) < 1) {
      setCallout(`You're out of tickets, neighbor! One free ticket arrives daily, or pick up an extra for <b>${TICKET_COST} shells</b>.`);
      audio()?.wrong?.();
      return;
    }
    state.tickets -= 1;
    writePlayer({ whirlTickets: state.tickets });
    state.game = { totalBank: 0 };
    state.prizesWon = [];
    state.greenhouse = false;
    audio()?.ui?.();
    startRound(1);
  }

  function setupRoundBoard() {
    state.letters = [...state.puzzle.phrase].map((ch) => ({ ch, revealed: ch === " " }));
    state.used = new Set();
    state.justRevealed = new Set();
    state.bank = 0;
    state.pendingPrize = null;
    state.lastSegment = null;
    state.view = "round";
    state.phase = "spin";
    state.solveOpen = false;
  }

  function startRound(n) {
    state.round = n;
    state.greenhouse = false;
    const valid = state.puzzles.filter((p) => !puzzleProblems(p).problems.length);
    if (!valid.length) {
      state.callout = "Need at least one valid puzzle \u2014 open the puzzle editor to add one.";
      state.view = "home";
      render();
      return;
    }
    state.puzzle = valid[(n - 1) % valid.length];
    setupRoundBoard();
    state.banner = TURN_INDICATOR;
    state.bannerPhase = "";
    state.callout = `Round ${n} of ${ROUNDS_PER_GAME}: <b>${esc(state.puzzle.category)}</b> \u2014 give the wheel a twirl, neighbor!`;
    render();
    audio()?.turn?.();
    speak("tilly", TILLY_LINES.spinPrompt());
    startPhaseTimer(PHASE_LIMITS.spin, onSpinTimeout);
  }

  function startGreenhouse() {
    state.greenhouse = true;
    state.puzzle = { ...pick(GREENHOUSE_PUZZLES) };
    setupRoundBoard();
    state.banner = "GREENHOUSE ROUND!";
    state.bannerPhase = "greenhouse";
    state.callout = `The Greenhouse wheel pays <b>double</b> \u2014 and the Golden Sprout wedge is worth <b>2000 shells</b>!`;
    render();
    audio()?.turn?.();
    speak("chip", CHIP_CATCHPHRASES.greenhouse());
    setTimeout(() => speak("tilly", TILLY_LINES.greenhouse()), 5200);
    startPhaseTimer(PHASE_LIMITS.spin, onSpinTimeout);
  }

  function segmentAtPointer() {
    const angle = (((-(state.rotation % 360)) % 360) + 360) % 360;
    return Math.floor(angle / SEGMENT_DEG) % activeSegments().length;
  }

  function spinWheel() {
    if (state.spinning || state.view !== "round" || state.phase !== "spin") return;
    clearPhaseTimer();
    const target = Math.floor(Math.random() * activeSegments().length);
    state.spinning = true;
    state.spinToken += 1;
    const token = state.spinToken;
    state.phase = "spinning";
    state.solveOpen = false;
    render();
    const reduced = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const current = ((state.rotation % 360) + 360) % 360;
    const targetCenter = (360 - (target * SEGMENT_DEG + SEGMENT_DEG / 2)) % 360;
    const delta = (((targetCenter - current) % 360) + 360) % 360;
    const turns = reduced ? 1 : 5 + Math.floor(Math.random() * 3);
    const total = turns * 360 + delta;
    const start = state.rotation;
    const duration = reduced ? 280 : 4400 + Math.random() * 900;
    const t0 = performance.now();
    let lastBoundary = Math.floor(start / SEGMENT_DEG);
    audio()?.resume?.();
    const frame = (now) => {
      if (token !== state.spinToken) return;
      const progress = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - progress, 4);
      state.rotation = start + total * eased;
      paintWheel();
      const boundary = Math.floor(state.rotation / SEGMENT_DEG);
      if (!reduced && boundary !== lastBoundary) {
        lastBoundary = boundary;
        audio()?.spinTick?.(1 - progress);
      }
      if (progress < 1) requestAnimationFrame(frame);
      else {
        state.spinning = false;
        onLanded(activeSegments()[segmentAtPointer()]);
      }
    };
    requestAnimationFrame(frame);
  }

  /* ================= Grab-and-flick wheel ================= */
  // The wheel is a physical knob: touch and hold to rotate it with your finger,
  // then flick. Release velocity comes from the last ~120ms of pointer motion;
  // friction decays the spin until it settles on a wedge.

  function pointerAngle(event, cx, cy) {
    return (Math.atan2(event.clientY - cy, event.clientX - cx) * 180) / Math.PI;
  }
  function unwrapDelta(delta) {
    return ((delta + 540) % 360) - 180;
  }
  function reducedMotion() {
    return typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function onGrabStart(event) {
    if (state.view !== "round" || state.phase !== "spin" || state.spinning || state.grab) return;
    if (event.isPrimary === false) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const zone = event.target.closest("[data-whirl-spin-zone]");
    if (!zone) return;
    const rect = zone.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const angle = pointerAngle(event, cx, cy);
    state.grab = {
      id: event.pointerId, cx, cy, angle,
      samples: [{ t: performance.now(), a: angle }],
      moved: false,
    };
    try { zone.setPointerCapture(event.pointerId); } catch (e) { /* best effort */ }
  }
  function onGrabMove(event) {
    const g = state.grab;
    if (!g || event.pointerId !== g.id) return;
    const angle = pointerAngle(event, g.cx, g.cy);
    const delta = unwrapDelta(angle - g.angle);
    if (Math.abs(delta) < 0.4) return;
    // CSS rotate() is clockwise-positive; screen atan2 with y-down is also
    // clockwise-positive, so the wheel follows the finger 1:1.
    state.rotation += delta;
    g.angle = angle;
    g.moved = true;
    const now = performance.now();
    g.samples.push({ t: now, a: angle });
    while (g.samples.length > 2 && g.samples[0].t < now - 120) g.samples.shift();
    paintWheel();
  }
  function onGrabEnd(event) {
    const g = state.grab;
    if (!g || event.pointerId !== g.id) return;
    state.grab = null;
    state.lastGrabEnd = Date.now();
    if (state.view !== "round" || state.phase !== "spin" || state.spinning) return;
    if (!g.moved) { spinWheel(); return; } // simple tap — gentle auto-spin
    let travel = 0;
    for (let i = 1; i < g.samples.length; i++) travel += unwrapDelta(g.samples[i].a - g.samples[i - 1].a);
    const span = Math.max(16, g.samples[g.samples.length - 1].t - g.samples[0].t) / 1000;
    const velocity = travel / span; // degrees per second
    if (Math.abs(velocity) < 45) { spinWheel(); return; } // too gentle — gentle auto-spin
    flickSpin(velocity);
  }
  function flickSpin(velocity) {
    if (state.spinning || state.view !== "round" || state.phase !== "spin") return;
    clearPhaseTimer();
    if (reducedMotion()) { spinWheel(); return; }
    state.spinning = true;
    state.spinToken += 1;
    const token = state.spinToken;
    state.phase = "spinning";
    state.solveOpen = false;
    render();
    let v = velocity;
    let last = performance.now();
    let lastBoundary = Math.floor(state.rotation / SEGMENT_DEG);
    audio()?.resume?.();
    const frame = (now) => {
      if (token !== state.spinToken) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      v *= Math.exp(-1.15 * dt); // friction decay
      state.rotation += v * dt;
      paintWheel();
      const boundary = Math.floor(state.rotation / SEGMENT_DEG);
      if (boundary !== lastBoundary) {
        lastBoundary = boundary;
        audio()?.spinTick?.(Math.min(1, Math.abs(v) / 720)); // pitch rises with speed
      }
      if (Math.abs(v) < 9) {
        state.spinning = false;
        onLanded(activeSegments()[segmentAtPointer()]);
      } else {
        requestAnimationFrame(frame);
      }
    };
    requestAnimationFrame(frame);
  }

  function revealLetter(letter) {
    const hits = [];
    state.letters.forEach((entry, i) => {
      if (entry.ch === letter && !entry.revealed) { entry.revealed = true; hits.push(i); }
    });
    state.justRevealed = new Set(hits);
    hits.forEach((_, n) => setTimeout(() => audio()?.reveal?.(n), n * 90));
    return hits.length;
  }

  function onLanded(segment) {
    state.lastSegment = segment;
    if (segment.kind === "bankrupt") {
      state.bank = 0;
      state.phase = "spin";
      state.banner = "BANKRUPT!";
      state.bannerPhase = "";
      audio()?.wrong?.();
      setCallout(`Bankrupt \u2014 the bank is empty.`);
      render();
      speak("chip", CHIP_CATCHPHRASES.bankrupt());
      setTimeout(() => speak("tilly", TILLY_LINES.bankrupt()), 4600);
      startPhaseTimer(PHASE_LIMITS.spin, onSpinTimeout);
      return;
    }
    if (segment.kind === "lose-turn") {
      state.phase = "spin";
      state.banner = "LOSE A TURN";
      state.bannerPhase = "";
      audio()?.turn?.();
      setCallout(`Skip! Take a breath and spin again.`);
      render();
      speak("chip", CHIP_CATCHPHRASES.loseTurn());
      startPhaseTimer(PHASE_LIMITS.spin, onSpinTimeout);
      return;
    }
    state.phase = "letter";
    state.bannerPhase = "letter";
    if (segment.kind === "jackpot") {
      state.pendingPrize = null;
      state.banner = `GOLDEN SPROUT \u2014 ${segment.value} SHELLS!`;
      state.bannerPhase = "jackpot";
      audio()?.jackpot?.();
      setCallout(`The <b>Golden Sprout</b>! Call a correct consonant to harvest <b>${segment.value} shells</b>!`);
      render();
      speak("chip", CHIP_CATCHPHRASES.jackpot());
      startPhaseTimer(PHASE_LIMITS.letter, onLetterTimeout);
      return;
    }
    if (segment.kind === "prize") {
      state.pendingPrize = segment;
      state.banner = `PRIZE: ${segment.itemName.toUpperCase()}!`;
      audio()?.turn?.();
      setCallout(`A \u2605 wedge! Call a correct consonant to take home the <b>${esc(segment.itemName)}</b>.`);
      render();
      speak("chip", CHIP_CATCHPHRASES.prize(segment.itemName));
      startPhaseTimer(PHASE_LIMITS.letter, onLetterTimeout);
      return;
    }
    state.banner = `${segment.value} SHELLS \u2014 CALL A LETTER!`;
    audio()?.turn?.();
    setCallout(`The wheel lands on <b>${segment.value} shells</b> \u2014 call a consonant!`);
    render();
    speak("chip", CHIP_CATCHPHRASES.shells(segment.value));
    startPhaseTimer(PHASE_LIMITS.letter, onLetterTimeout);
  }

  function callConsonant(letter) {
    if (state.used.has(letter) || VOWELS.has(letter)) return;
    state.used.add(letter);
    const hits = revealLetter(letter);
    const prize = state.pendingPrize;
    state.pendingPrize = null;
    if (hits > 0) {
      let line;
      if (prize) {
        awardInventoryItem(prize.item);
        line = `${CHIP_CATCHPHRASES.hit(letter, 0)} ${TILLY_LINES.prizeWon(prize.itemName)}`;
        setCallout(`<b>${esc(prize.itemName)}</b> is yours! Added to your inventory.`);
      } else {
        const gain = (state.lastSegment?.value || 0) * hits;
        state.bank += gain;
        line = CHIP_CATCHPHRASES.hit(letter, gain);
        setCallout(`${hits} \u00d7 <b>${esc(letter)}</b> \u2014 +${gain} shells! Bank: <b>${state.bank}</b>.`);
      }
      audio()?.solve?.();
      state.phase = "spin";
      state.banner = TURN_INDICATOR;
      state.bannerPhase = "";
      render();
      speak("chip", line);
      startPhaseTimer(PHASE_LIMITS.spin, onSpinTimeout);
    } else {
      audio()?.wrong?.();
      state.phase = "spin";
      state.banner = TURN_INDICATOR;
      state.bannerPhase = "";
      setCallout(prize ? `No ${esc(letter)}s \u2014 the ${esc(prize.itemName)} slips away! Spin again.` : `No ${esc(letter)}s. Spin again!`);
      render();
      speak("chip", CHIP_CATCHPHRASES.miss(letter));
      startPhaseTimer(PHASE_LIMITS.spin, onSpinTimeout);
    }
  }

  function buyVowel(letter) {
    if (!VOWELS.has(letter) || state.used.has(letter) || state.bank < VOWEL_COST) return;
    state.bank -= VOWEL_COST;
    state.used.add(letter);
    const hits = revealLetter(letter);
    if (hits > 0) {
      setCallout(`Bought <b>${esc(letter)}</b> for ${VOWEL_COST} shells \u2014 ${hits} on the board! Bank: <b>${state.bank}</b>.`);
      speak("chip", CHIP_CATCHPHRASES.vowel(letter, true));
    } else {
      audio()?.wrong?.();
      setCallout(`Bought <b>${esc(letter)}</b> for ${VOWEL_COST} shells \u2014 not on the board!`);
      speak("chip", CHIP_CATCHPHRASES.vowel(letter, false));
    }
    render();
  }

  function solveAttempt(raw) {
    const normalize = (value) => String(value || "").toUpperCase().replace(/[^A-Z]+/g, " ").trim().replace(/\s+/g, " ");
    const guess = normalize(raw);
    if (!guess) {
      setCallout("Type your solution first, detective.");
      const input = state.root?.querySelector("[data-whirl-solve-input]");
      if (input) input.focus();
      return;
    }
    if (guess === state.puzzle.phrase) {
      clearPhaseTimer();
      state.phase = "won";
      state.solveOpen = false;
      audio()?.solve?.();
      setTimeout(() => audio()?.fanfare?.(true), 500);
      awardShells(state.bank, `Whirl of Resources \u00b7 +${state.bank} shells`);
      if (state.game) state.game.totalBank += state.bank;
      window.dispatchEvent(new CustomEvent("snug-whirl-result", {
        detail: { won: true, bank: state.bank, puzzle: state.puzzle.phrase, prizes: [...state.prizesWon] },
      }));
      // Feeds Dottie Daly's daily quests (game: "whirl" quests track wins).
      window.dispatchEvent(new CustomEvent("snug-minigame-achievement", {
        detail: { game: "whirl", score: state.bank, won: true },
      }));
      speak("chip", CHIP_CATCHPHRASES.solveWin());
      if (state.greenhouse) {
        state.view = "podium";
        render();
        setTimeout(() => speak("tilly", TILLY_LINES.champion(state.game ? state.game.totalBank : state.bank)), 5200);
      } else {
        state.view = "roundEnd";
        render();
      }
    } else {
      audio()?.wrong?.();
      state.phase = "spin";
      state.solveOpen = false;
      state.banner = TURN_INDICATOR;
      state.bannerPhase = "";
      setCallout(`\u201c${esc(raw.trim().slice(0, 40))}\u201d isn\u2019t it \u2014 the puzzle keeps its secrets!`);
      render();
      speak("chip", CHIP_CATCHPHRASES.solveMiss());
      startPhaseTimer(PHASE_LIMITS.spin, onSpinTimeout);
    }
  }

  /* ================= Events ================= */

  function onClick(event) {
    const target = event.target.closest("button, [data-whirl-spin-zone], input");
    if (!target || !state.root?.contains(target)) return;
    if (target.matches("[data-whirl-close]")) { close(); return; }
    if (target.matches("[data-whirl-audio]")) {
      state.muted = !state.muted;
      audio()?.setMuted?.(state.muted);
      if (!state.muted) audio()?.ui?.();
      render();
      return;
    }
    if (target.matches("[data-whirl-start]")) { tryStartGame(); return; }
    if (target.matches("[data-whirl-multiplayer]")) { audio()?.ui?.(); close(); window.__snugWhirlMultiplayer?.open(); return; }
    if (target.matches("[data-whirl-again]")) { tryStartGame(); return; }
    if (target.matches("[data-whirl-next-round]")) {
      audio()?.ui?.();
      if (state.round >= ROUNDS_PER_GAME && !state.greenhouse) startGreenhouse();
      else startRound(state.round + 1);
      return;
    }
    if (target.matches("[data-whirl-buy-ticket]")) { audio()?.ui?.(); buyTicket(); return; }
    if (target.matches("[data-whirl-snapshot]")) { audio()?.ui?.(); saveSnapshot(); return; }
    if (target.matches("[data-whirl-home]")) {
      clearPhaseTimer();
      state.game = null;
      state.greenhouse = false;
      state.view = "home";
      state.phase = "idle";
      state.solveOpen = false;
      render();
      return;
    }
    if (target.matches("[data-whirl-editor]")) { state.view = "editor"; state.puzzleStatus = ""; state.puzzleDraft = null; audio()?.ui?.(); render(); return; }
    if (state.view === "editor") {
      if (target.matches("[data-whirl-ed-new]")) { const b = blankPuzzle(); state.editingPuzzle = b.id; state.puzzleDraft = b; state.puzzleStatus = ""; render(); return; }
      if (target.dataset.whirlEdOpen) { state.editingPuzzle = target.dataset.whirlEdOpen; state.puzzleDraft = null; state.puzzleStatus = ""; render(); return; }
      if (target.matches("[data-whirl-ed-export]")) { puzzleExport(); return; }
      if (target.matches("[data-whirl-ed-reset]")) { state.puzzles = starterPuzzles(); state.editingPuzzle = state.puzzles[0].id; state.puzzleDraft = null; state.puzzleStatus = "Starter puzzles restored for this session."; render(); return; }
      if (target.matches("[data-whirl-ed-delete]")) {
        state.puzzles = state.puzzles.filter((p) => p.id !== state.editingPuzzle);
        state.editingPuzzle = state.puzzles[0] ? state.puzzles[0].id : null;
        state.puzzleDraft = null; state.puzzleStatus = "Puzzle removed from this session."; audio()?.wrong?.(); render(); return;
      }
    }
    if (state.view !== "round") return;
    if (target.matches("[data-whirl-spin]")) {
      if (state.phase === "spin") { audio()?.ui?.(); spinWheel(); }
      return;
    }
    if (target.closest("[data-whirl-spin-zone]")) {
      // Grab/tap already ran through the pointer handlers; ignore the echo click.
      if (Date.now() - state.lastGrabEnd < 400) return;
      if (state.phase === "spin") { audio()?.ui?.(); spinWheel(); }
      return;
    }
    if (target.matches("[data-whirl-solve-toggle]")) {
      state.solveOpen = !state.solveOpen;
      state.bannerPhase = state.solveOpen ? "solve" : (state.phase === "letter" ? "letter" : "");
      audio()?.ui?.();
      render();
      const input = state.root?.querySelector("[data-whirl-solve-input]");
      if (state.solveOpen && input) setTimeout(() => input.focus(), 60);
      return;
    }
    const letterButton = target.closest("[data-whirl-letter]");
    if (letterButton && !letterButton.disabled) {
      const letter = letterButton.dataset.whirlLetter;
      audio()?.ui?.();
      if (state.phase === "letter" && !VOWELS.has(letter)) callConsonant(letter);
      else if (state.phase === "spin" && VOWELS.has(letter)) buyVowel(letter);
    }
  }

  /* ================= Launch integration ================= */

  function install(root = document) {
    root.querySelectorAll?.(".practice-grid").forEach((grid) => {
      if (grid.parentElement?.querySelector(".whirl-practice")) return;
      const section = document.createElement("section");
      section.className = "whirl-practice";
      section.innerHTML =
        `<small>Cyclical City game show</small>` +
        `<button class="whirl-launch" type="button" data-whirl-launch style="display:flex;align-items:center;gap:10px;width:100%;text-align:left">` +
        `<i aria-hidden="true">\u25c9</i><span><b>Whirl of Resources</b><small>Spin the wheel \u00b7 solve the puzzle</small></span></button>`;
      grid.before(section);
    });
    root.querySelectorAll?.(".play-panel").forEach((panel) => {
      if (panel.querySelector("[data-whirl-launch]")) return;
      const button = document.createElement("button");
      button.className = "whirl-launch";
      button.type = "button";
      button.setAttribute("data-whirl-launch", "");
      button.setAttribute("style", "display:flex;align-items:center;gap:10px;width:100%;text-align:left");
      button.innerHTML = `<i aria-hidden="true">\u25c9</i><span><b>Whirl of Resources</b><small>Spin \u00b7 call letters \u00b7 solve</small></span>`;
      panel.appendChild(button);
    });
  }

  document.addEventListener("click", (event) => {
    const launch = event.target.closest?.("[data-whirl-launch]");
    if (launch) { event.preventDefault(); open(); }
  }, true);
  document.addEventListener("submit", (event) => {
    if (event.target.matches?.("[data-whirl-ed-form]")) { event.preventDefault(); savePuzzleForm(); }
  });
  document.addEventListener("change", (event) => {
    if (event.target.matches?.("[data-whirl-ed-import]") && event.target.files?.[0]) puzzleImport(event.target.files[0]);
  });
  document.addEventListener("input", (event) => {
    const field = event.target.matches?.("[data-whirl-ed-phrase]") ? event.target : null;
    if (field) {
      const count = field.closest("form")?.querySelector("[data-whirl-ed-count]");
      if (count) count.textContent = `${letterCount(field.value)} letters`;
    }
  });

  const observer = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
    if (node.nodeType === 1) install(node);
  })));
  observer.observe(document.documentElement, { childList: true, subtree: true });
  install();
  build();

  // Shared game-show utilities for future shows (Nosy Neighbors pattern + show framework).
  window.SnugGameShowUtils = {
    audio,
    speakLine: speak,
    awardShells,
    awardInventoryItem,
    shuffle: (values) => {
      const copy = [...values];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    },
  };
  window.__snugWhirlPuzzles = PUZZLES.map((puzzle) => ({ ...puzzle }));
  window.__snugWhirlOfResources = { open, close };
})();

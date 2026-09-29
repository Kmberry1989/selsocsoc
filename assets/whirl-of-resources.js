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
  };
  const TILLY_LINES = {
    prizeWon: (name) => `The ${name} is yours \u2014 shining and official!`,
    bankrupt: () => "Oh, tough spin! Shake it off \u2014 the wheel loves a comeback.",
    spinPrompt: () => TURN_INDICATOR,
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
    solveOpen: false, muted: false, callout: "", banner: "", bannerPhase: "",
    puzzles: starterPuzzles(),
    editingPuzzle: null,
    puzzleDraft: null,
    puzzleStatus: "",
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
    const spans = SEGMENTS.map((seg, i) =>
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
    return `<div class="whirl-set"><div class="whirl-board-side">` +
      `<div class="whirl-logo"><span>WHIRL<br>OF RESOURCES</span></div>` +
      `<div class="whirl-banner">${esc(TURN_INDICATOR)}</div>` +
      hostsHTML() +
      `<div class="whirl-callout" role="status">Spin the big wheel, call your letters, and solve the puzzle. Shell wedges build your bank \u2014 \u2605 wedges hide real prizes from around town!</div>` +
      `<div class="whirl-actions"><button type="button" data-whirl-start>Start the show</button><button type="button" class="secondary" data-whirl-editor>Puzzle editor</button><button type="button" class="secondary" data-whirl-close>Not now</button></div>` +
      `</div></div>`;
  }

  function roundView() {
    return `<div class="whirl-set">` +
      `<div class="whirl-board-side">` +
      `<div class="whirl-logo"><span>WHIRL<br>OF RESOURCES</span></div>` +
      `<div class="whirl-roundline"><span>ROUND ${state.round} \u00b7 ${esc(state.puzzle.category)}</span><span class="whirl-score">Bank <b>${state.bank}</b> shells</span></div>` +
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

  function finalView() {
    const prizeNames = state.prizesWon.map((id) => {
      const seg = SEGMENTS.find((s) => s.item === id);
      return seg ? seg.itemName : id;
    });
    return `<div class="whirl-set"><div class="whirl-board-side">` +
      `<div class="whirl-logo"><span>WHIRL<br>OF RESOURCES</span></div>` +
      `<div class="whirl-banner">SHOW COMPLETE!</div>` +
      hostsHTML() +
      `<div class="whirl-callout" role="status">You solved \u201c${esc(state.puzzle.phrase)}\u201d! Banked <b>${state.bank} shells</b>${prizeNames.length ? ` plus prizes: ${esc(prizeNames.join(", "))}` : ""}.</div>` +
      `<div class="whirl-actions"><button type="button" data-whirl-again>Another puzzle</button><button type="button" class="secondary" data-whirl-home>Back to marquee</button></div>` +
      `</div></div>`;
  }

  function render() {
    if (!state.root) return;
    const panel = state.root.querySelector(".whirl-panel");
    panel.innerHTML = state.view === "home" ? homeView() : state.view === "editor" ? puzzleEditorView() : state.view === "round" ? roundView() : finalView();
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
    state.view = "home";
    state.phase = "idle";
    state.solveOpen = false;
    render();
    state.root.hidden = false;
    requestAnimationFrame(() => state.root.classList.add("is-open"));
    audio()?.resume?.();
    audio()?.startTheme?.();
    setTimeout(() => audio()?.stopTheme?.(), 2400);
    speak("tilly", TILLY_INTRO);
  }

  function close() {
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

  function startShow() {
    state.round += 1;
    const valid = state.puzzles.filter((p) => !puzzleProblems(p).problems.length);
    if (valid.length < state.round) {
      state.callout = "Need at least one valid puzzle per round — open the puzzle editor to add more.";
      render();
      return;
    }
    state.puzzle = valid[(state.round - 1) % valid.length];
    state.letters = [...state.puzzle.phrase].map((ch) => ({ ch, revealed: ch === " " }));
    state.used = new Set();
    state.justRevealed = new Set();
    state.bank = 0;
    state.pendingPrize = null;
    state.lastSegment = null;
    state.prizesWon = [];
    state.view = "round";
    state.phase = "spin";
    state.solveOpen = false;
    state.banner = TURN_INDICATOR;
    state.bannerPhase = "";
    state.callout = `Round ${state.round}: <b>${esc(state.puzzle.category)}</b> \u2014 give the wheel a twirl, neighbor!`;
    render();
    audio()?.turn?.();
    speak("tilly", TILLY_LINES.spinPrompt());
  }

  function segmentAtPointer() {
    const angle = (((-(state.rotation % 360)) % 360) + 360) % 360;
    return Math.floor(angle / SEGMENT_DEG) % SEGMENTS.length;
  }

  function spinWheel() {
    if (state.spinning || state.view !== "round" || state.phase !== "spin") return;
    const target = Math.floor(Math.random() * SEGMENTS.length);
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
        onLanded(SEGMENTS[segmentAtPointer()]);
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
      return;
    }
    state.phase = "letter";
    state.bannerPhase = "letter";
    if (segment.kind === "prize") {
      state.pendingPrize = segment;
      state.banner = `PRIZE: ${segment.itemName.toUpperCase()}!`;
      audio()?.turn?.();
      setCallout(`A \u2605 wedge! Call a correct consonant to take home the <b>${esc(segment.itemName)}</b>.`);
      render();
      speak("chip", CHIP_CATCHPHRASES.prize(segment.itemName));
      return;
    }
    state.banner = `${segment.value} SHELLS \u2014 CALL A LETTER!`;
    audio()?.turn?.();
    setCallout(`The wheel lands on <b>${segment.value} shells</b> \u2014 call a consonant!`);
    render();
    speak("chip", CHIP_CATCHPHRASES.shells(segment.value));
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
    } else {
      audio()?.wrong?.();
      state.phase = "spin";
      state.banner = TURN_INDICATOR;
      state.bannerPhase = "";
      setCallout(prize ? `No ${esc(letter)}s \u2014 the ${esc(prize.itemName)} slips away! Spin again.` : `No ${esc(letter)}s. Spin again!`);
      render();
      speak("chip", CHIP_CATCHPHRASES.miss(letter));
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
      state.phase = "won";
      state.solveOpen = false;
      audio()?.solve?.();
      setTimeout(() => audio()?.fanfare?.(true), 500);
      awardShells(state.bank, `Whirl of Resources \u00b7 +${state.bank} shells`);
      window.dispatchEvent(new CustomEvent("snug-whirl-result", {
        detail: { won: true, bank: state.bank, puzzle: state.puzzle.phrase, prizes: [...state.prizesWon] },
      }));
      state.view = "final";
      render();
      speak("chip", CHIP_CATCHPHRASES.solveWin());
    } else {
      audio()?.wrong?.();
      state.phase = "spin";
      state.solveOpen = false;
      state.banner = TURN_INDICATOR;
      state.bannerPhase = "";
      setCallout(`\u201c${esc(raw.trim().slice(0, 40))}\u201d isn\u2019t it \u2014 the puzzle keeps its secrets!`);
      render();
      speak("chip", CHIP_CATCHPHRASES.solveMiss());
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
    if (target.matches("[data-whirl-start]")) { audio()?.ui?.(); startShow(); return; }
    if (target.matches("[data-whirl-again]")) { audio()?.ui?.(); startShow(); return; }
    if (target.matches("[data-whirl-home]")) {
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
    if (target.matches("[data-whirl-spin]") || target.closest("[data-whirl-spin-zone]")) {
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

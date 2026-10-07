/* assets/whirl-multiplayer.js — Whirl of Resources shared-room multiplayer.
 *
 * Turn-based multiplayer on an RTDB append-only event log
 * (whirlGames/{roomCode}/events), mirroring the boardGames rules shape.
 * The host is authoritative for: spin targets (seeded), bot AI, turn timeouts.
 * All clients apply the same events to stay in sync.
 *
 * Bots are explicitly NPC game opponents (labeled "BOT" in the UI).
 * Solo play in whirl-of-resources.js is untouched.
 */
(() => {
  if (window.__snugWhirlMultiplayer) return;

  /* ================= Constants ================= */

  // 12 segments — must match the solo show's wheel order.
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
  const VOWELS = new Set(["A", "E", "I", "O", "U"]);
  const VOWEL_COST = 100;
  const ROUNDS_PER_GAME = 3;
  const TURN_SECONDS = 20;
  const POLL_MS = 1200;
  const TURN_INDICATOR = "GIVE THE WHIRL A TWIRL!";

  // English letter frequency, most to least common (consonants weighted for bot AI).
  const LETTER_FREQ = "ETAOINSHRDLCUMWFGYPBVKJXQZ".split("");
  const CHEER_EMOTES = ["wave", "clap", "spin", "cheer"];
  const CHEER_GLYPH = { wave: "\u{1F44B}", clap: "\u{1F44F}", spin: "\u{1F300}", cheer: "\u{1F389}" };

  // NPC opponents that fill empty seats. Explicitly labeled BOT in the UI.
  const WHIRL_BOTS = [
    { uid: "whirl-bot-dot", name: "Dot", color: "teal" },
    { uid: "whirl-bot-watt", name: "Watt", color: "gold" },
    { uid: "whirl-bot-ripple", name: "Ripple", color: "blue" },
  ];
  const PLAYER_COLORS = ["coral", "teal", "gold", "blue", "purple", "green"];
  const ROOM_CODE_CHARS = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

  /* ================= Helpers ================= */

  const esc = (value) => { const n = document.createElement("span"); n.textContent = String(value ?? ""); return n.innerHTML; };
  const $ = (sel, root) => (root || document).querySelector(sel);

  // Seeded RNG (mulberry32) — host generates spin targets all clients share.
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const phraseNorm = (v) => String(v || "").toUpperCase().replace(/[^A-Z]+/g, " ").trim().replace(/\s+/g, " ");
  function makeRoomCode() {
    let code = "";
    const buf = new Uint32Array(6);
    crypto.getRandomValues(buf);
    for (let i = 0; i < 6; i++) code += ROOM_CODE_CHARS[buf[i] % ROOM_CODE_CHARS.length];
    return code;
  }

  /* ================= RTDB REST client ================= */
  // First client write layer for game sessions. Uses the RTDB REST API with
  // the user's ID token, like visit-system.js. Polling (not SSE) for events.

  function getSession() { return window.__snugSession || null; }
  async function getToken() {
    const s = getSession();
    if (!s?.user?.getIdToken) throw new Error("Sign in to play together.");
    return s.user.getIdToken();
  }
  function dbBase() {
    const s = getSession();
    const url = s?.app?.options?.databaseURL || (s?.projectId ? `https://${s.projectId}-default-rtdb.firebaseio.com` : null);
    if (!url) throw new Error("No game database connection.");
    return String(url).replace(/\/$/, "");
  }
  function myUid() { return getSession()?.user?.uid || getSession()?.uid || ""; }
  function myName() {
    const s = getSession();
    return String(s?.profile?.name || s?.profile?.displayName || "Neighbor").slice(0, 18) || "Neighbor";
  }

  async function pushEvent(roomId, event) {
    const token = await getToken();
    const base = dbBase();
    const payload = { game: "whirl-of-resources", uid: myUid(), name: myName(), createdAt: Date.now(), ...event };
    const res = await fetch(`${base}/whirlGames/${encodeURIComponent(roomId)}/events.json?auth=${encodeURIComponent(token)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Couldn't reach the game room (HTTP ${res.status}).`);
    const { name } = await res.json();
    return name; // RTDB push key = event id
  }

  async function fetchEvents(roomId, since) {
    const token = await getToken();
    const base = dbBase();
    // NB: `since` is the max createdAt we've applied, not Date.now() — client
    // clocks skew, so we re-fetch from `since` and dedupe by event id.
    const params = `orderBy="createdAt"&startAt=${since}&limitToLast=80`;
    const res = await fetch(`${base}/whirlGames/${encodeURIComponent(roomId)}/events.json?auth=${encodeURIComponent(token)}&${params}`);
    if (!res.ok) return [];
    const data = await res.json().catch(() => null);
    if (!data) return [];
    return Object.entries(data)
      .map(([id, e]) => ({ id, ...e }))
      .filter((e) => typeof e.createdAt === "number")
      .sort((a, b) => a.createdAt - b.createdAt || (a.id < b.id ? -1 : 1));
  }

  /* ================= State ================= */

  const mp = {
    root: null, view: "closed", // closed | lobbyHome | lobby | game | podium
    roomId: null, lobbyId: null, gameId: null,
    isHost: false, myColor: PLAYER_COLORS[0],
    seats: 4,
    lobby: null, // { totalPlayers, seed, hostUid, hostName }
    members: new Map(), // uid -> { uid, name, color, ready, bot }
    game: null, // { players:[{uid,name,color,order,bot}], seed, puzzles:[{category,phrase}] }
    round: 0, turnOrder: [], turnIndex: 0,
    banks: {}, totals: {},
    letters: [], used: new Set(),
    phase: "idle", // idle | spin | letter | spinning | won
    lastSegment: null, pendingPrize: null,
    spinTarget: null, spinActor: null,
    rotation: 0, spinning: false,
    pollStop: null, lastSeen: 0, seenIds: new Set(),
    hostTimer: null, hostRng: null,
    solveOpen: false, callout: "",
    cheers: [],
  };

  function reset() {
    if (mp.pollStop) { mp.pollStop(); mp.pollStop = null; }
    if (mp.hostTimer) { clearTimeout(mp.hostTimer); mp.hostTimer = null; }
    Object.assign(mp, {
      view: "closed", roomId: null, lobbyId: null, gameId: null,
      isHost: false, lobby: null, game: null,
      round: 0, turnOrder: [], turnIndex: 0, banks: {}, totals: {},
      letters: [], used: new Set(), phase: "idle",
      lastSegment: null, pendingPrize: null, spinTarget: null, spinActor: null,
      rotation: 0, spinning: false, lastSeen: 0, solveOpen: false, callout: "",
      cheers: [],
    });
    mp.members = new Map();
    mp.seenIds = new Set();
  }

  /* ================= Bot AI ================= */
  // Host-side only. Bots are NPC opponents, labeled BOT in the UI.

  function botPickLetter() {
    const avail = LETTER_FREQ.filter((l) => !VOWELS.has(l) && !mp.used.has(l));
    if (!avail.length) return null;
    const weights = avail.map((_, i) => avail.length - i);
    let r = Math.random() * weights.reduce((a, b) => a + b, 0);
    for (let i = 0; i < avail.length; i++) { r -= weights[i]; if (r <= 0) return avail[i]; }
    return avail[0];
  }
  function revealedRatio() {
    const total = mp.letters.filter((e) => e.ch !== " ").length;
    if (!total) return 0;
    return mp.letters.filter((e) => e.revealed).length / total;
  }
  // Bot solve: attempts when 60%+ revealed, success chance scales with knowledge.
  // Bots know the phrase (they're game-show NPCs) but don't always nail it.
  function botSolveDecision() {
    const ratio = revealedRatio();
    if (ratio < 0.6) return null;
    const attemptP = Math.min(0.9, (ratio - 0.6) * 2.2);
    if (Math.random() > attemptP) return null;
    const phrase = mp.game.puzzles[mp.round - 1].phrase;
    return Math.random() < 0.85 ? phrase : phrase.split("").reverse().join("").replace(/[^A-Z ]/g, "");
  }

  /* ================= Event application ================= */
  // Every client applies the same events in createdAt order.

  function currentPlayer() { return mp.turnOrder[mp.turnIndex] || null; }
  function isMyTurn() {
    const p = currentPlayer();
    return p && p.uid === myUid() && !p.bot;
  }
  function playerByUid(uid) { return (mp.game?.players || []).find((p) => p.uid === uid) || null; }

  function applyEvents(events) {
    for (const e of events) {
      if (mp.seenIds.has(e.id)) continue;
      mp.seenIds.add(e.id);
      applyEvent(e);
    }
    render();
  }

  function applyEvent(e) {
    switch (e.type) {
      case "whirl-lobby": {
        mp.lobbyId = e.id;
        mp.lobby = { totalPlayers: e.totalPlayers, seed: e.seed, hostUid: e.uid, hostName: e.name };
        mp.isHost = e.uid === myUid();
        mp.members.set(e.uid, { uid: e.uid, name: e.name, color: e.color, ready: e.uid === mp.lobby.hostUid, bot: false });
        if (mp.view === "lobbyHome" || mp.view === "closed") mp.view = "lobby";
        break;
      }
      case "whirl-join": {
        if (e.lobbyId !== mp.lobbyId) break;
        if (!mp.members.has(e.uid)) mp.members.set(e.uid, { uid: e.uid, name: e.name, color: e.color, ready: false, bot: false });
        break;
      }
      case "whirl-leave": {
        if (e.lobbyId !== mp.lobbyId) break;
        mp.members.delete(e.uid);
        break;
      }
      case "whirl-ready": {
        if (e.lobbyId !== mp.lobbyId) break;
        const m = mp.members.get(e.uid);
        if (m) m.ready = !!e.ready;
        break;
      }
      case "whirl-start": {
        mp.gameId = e.id;
        mp.game = {
          players: Object.entries(e.players)
            .map(([uid, p]) => ({ uid, ...p }))
            .sort((a, b) => a.order - b.order),
          seed: e.seed,
          puzzles: Object.values(e.puzzles),
        };
        mp.hostRng = mulberry32(e.seed);
        mp.turnOrder = mp.game.players.map((p) => p.uid);
        mp.totals = {};
        mp.game.players.forEach((p) => { mp.totals[p.uid] = 0; });
        mp.view = "game";
        startRound(1);
        // Host kicks off the first turn.
        if (mp.isHost) hostBeginTurn();
        break;
      }
      case "whirl-spin": {
        if (e.gameId !== mp.gameId) break;
        if (e.round !== mp.round) startRound(e.round);
        mp.spinTarget = e.target;
        mp.spinActor = e.actorUid;
        mp.turnIndex = Math.max(0, mp.turnOrder.indexOf(e.actorUid));
        mp.phase = "spin";
        mp.solveOpen = false;
        const seg = SEGMENTS[e.target] || SEGMENTS[0];
        mp.lastSegment = seg;
        const actorName = playerByUid(e.actorUid)?.name || "Someone";
        if (seg.kind === "bankrupt") {
          mp.banks[e.actorUid] = 0;
          mp.callout = `${esc(actorName)} hit BANKRUPT! Bank emptied.`;
        } else if (seg.kind === "lose-turn") {
          mp.callout = `${esc(actorName)} hit SKIP! Turn over.`;
        } else {
          mp.callout = `${esc(actorName)}'s turn — ${TURN_INDICATOR}`;
        }
        break;
      }
      case "whirl-letter":
      case "whirl-vowel": {
        if (e.gameId !== mp.gameId) break;
        if (e.round !== mp.round) startRound(e.round);
        applyLetter(e.actorUid, e.letter, e.type === "whirl-vowel");
        break;
      }
      case "whirl-solve": {
        if (e.gameId !== mp.gameId) break;
        if (e.round !== mp.round) startRound(e.round);
        applySolve(e.actorUid, e.guess, e.correct);
        break;
      }
      case "whirl-turn-timeout": {
        if (e.gameId !== mp.gameId) break;
        if (e.round !== mp.round) startRound(e.round);
        mp.callout = `Time! ${esc(playerByUid(e.actorUid)?.name || "Someone")} loses the turn.`;
        endTurn();
        break;
      }
      case "whirl-cheer": {
        if (e.gameId !== mp.gameId) break;
        showCheer(e);
        break;
      }
    }
  }

  function startRound(n) {
    mp.round = n;
    const puzzle = mp.game.puzzles[n - 1];
    mp.letters = [...puzzle.phrase].map((ch) => ({ ch, revealed: ch === " " }));
    mp.used = new Set();
    mp.banks = {};
    mp.game.players.forEach((p) => { mp.banks[p.uid] = 0; });
    mp.turnIndex = 0;
    mp.phase = "idle";
    mp.lastSegment = null;
    mp.pendingPrize = null;
    mp.solveOpen = false;
    mp.callout = `Round ${n} of ${ROUNDS_PER_GAME}: <b>${esc(puzzle.category)}</b>`;
  }

  function applyLetter(actorUid, letter, isVowel) {
    letter = String(letter || "").toUpperCase();
    if (mp.used.has(letter)) return;
    mp.used.add(letter);
    let hits = 0;
    mp.letters.forEach((e) => { if (e.ch === letter && !e.revealed) { e.revealed = true; hits++; } });
    const seg = mp.lastSegment;
    const actor = playerByUid(actorUid);
    if (isVowel) {
      mp.banks[actorUid] = Math.max(0, (mp.banks[actorUid] || 0) - VOWEL_COST);
      mp.callout = hits > 0
        ? `${esc(actor?.name || "Someone")} bought <b>${esc(letter)}</b> — ${hits} on the board!`
        : `${esc(actor?.name || "Someone")} bought <b>${esc(letter)}</b> — not on the board.`;
    } else if (hits > 0) {
      if (mp.pendingPrize) {
        mp.callout = `<b>${esc(actor?.name || "Someone")}</b> wins the ${esc(mp.pendingPrize.itemName)}!`;
        mp.pendingPrize = null;
      } else {
        const gain = (seg?.value || 0) * hits;
        mp.banks[actorUid] = (mp.banks[actorUid] || 0) + gain;
        mp.callout = `${hits} × <b>${esc(letter)}</b> — +${gain} shells for ${esc(actor?.name || "Someone")}!`;
      }
    } else {
      mp.callout = `No ${esc(letter)}s — ${esc(actor?.name || "Someone")}'s turn ends.`;
    }
    // Host decides turn continuation.
    if (mp.isHost) {
      clearTimeout(mp.hostTimer);
      const continues = hits > 0 || isVowel;
      mp.hostTimer = setTimeout(() => {
        if (continues) hostBeginTurn(); // same player spins again
        else hostAdvanceTurn();
      }, continues ? 1200 : 2200);
    }
  }

  function applySolve(actorUid, guess, correct) {
    const actor = playerByUid(actorUid);
    if (correct) {
      const bank = mp.banks[actorUid] || 0;
      mp.totals[actorUid] = (mp.totals[actorUid] || 0) + bank;
      // Award shells to the local player if they solved.
      if (actorUid === myUid() && bank > 0) {
        window.dispatchEvent(new CustomEvent("snug-award-coins", { detail: { amount: bank, message: "Whirl of Resources · multiplayer win" } }));
      }
      window.dispatchEvent(new CustomEvent("snug-whirl-result", { detail: { won: actorUid === myUid(), bank } }));
      window.dispatchEvent(new CustomEvent("snug-minigame-achievement", { detail: { game: "whirl", score: bank, won: actorUid === myUid() } }));
      mp.phase = "won";
      mp.callout = `${esc(actor?.name || "Someone")} solved it! +${bank} shells.`;
      if (mp.isHost) {
        clearTimeout(mp.hostTimer);
        mp.hostTimer = setTimeout(() => {
          if (mp.round >= ROUNDS_PER_GAME) hostEndGame();
          else { startRound(mp.round + 1); hostBeginTurn(); }
        }, 3500);
      }
    } else {
      mp.callout = `\u201c${esc(String(guess).slice(0, 40))}\u201d isn't it — ${esc(actor?.name || "Someone")}'s turn ends.`;
      if (mp.isHost) {
        clearTimeout(mp.hostTimer);
        mp.hostTimer = setTimeout(() => hostAdvanceTurn(), 2200);
      }
    }
  }

  function endTurn() {
    if (mp.isHost) hostAdvanceTurn();
    else {
      // Non-host clients advance locally when they see the timeout; the host
      // will write the next whirl-spin which re-syncs turnIndex.
      mp.turnIndex = (mp.turnIndex + 1) % mp.turnOrder.length;
      mp.phase = "idle";
    }
  }

  /* ================= Host duties ================= */

  function hostBeginTurn() {
    if (!mp.isHost || mp.view !== "game") return;
    clearTimeout(mp.hostTimer);
    const actorUid = mp.turnOrder[mp.turnIndex];
    const target = Math.floor(mp.hostRng() * SEGMENTS.length);
    const seg = SEGMENTS[target];
    mp.lastSegment = seg;
    // Optimistic local apply (the event comes back via poll and dedupes).
    mp.spinTarget = target;
    mp.spinActor = actorUid;
    mp.phase = "spin";
    mp.solveOpen = false;
    if (seg.kind === "bankrupt") {
      mp.banks[actorUid] = 0;
      mp.callout = `${esc(playerByUid(actorUid)?.name || "Someone")} hit BANKRUPT! Bank emptied.`;
    } else if (seg.kind === "lose-turn") {
      mp.callout = `${esc(playerByUid(actorUid)?.name || "Someone")} hit SKIP! Turn over.`;
    } else {
      mp.callout = `${esc(playerByUid(actorUid)?.name || "Someone")}'s turn — ${TURN_INDICATOR}`;
    }
    render();
    pushEvent(mp.roomId, { type: "whirl-spin", gameId: mp.gameId, round: mp.round, target, actorUid })
      .then((id) => { if (id) mp.seenIds.add(id); })
      .catch(() => { mp.callout = "Couldn't reach the game room — check your connection."; render(); });
    if (seg.kind === "bankrupt" || seg.kind === "lose-turn") {
      // Turn ends on its own; give clients time to watch the wheel land.
      mp.hostTimer = setTimeout(() => hostAdvanceTurn(), 5000);
      return;
    }
    // Turn clock: 20s for the current player to call/solve.
    mp.hostTimer = setTimeout(() => hostTimeout(actorUid), TURN_SECONDS * 1000);
    // If it's a bot's turn, drive the bot after a dramatic pause.
    const actor = playerByUid(actorUid);
    if (actor?.bot) setTimeout(() => hostBotAct(actorUid), 2600);
  }

  function hostAdvanceTurn() {
    if (!mp.isHost) return;
    clearTimeout(mp.hostTimer);
    mp.turnIndex = (mp.turnIndex + 1) % mp.turnOrder.length;
    hostBeginTurn();
  }

  function hostTimeout(actorUid) {
    if (!mp.isHost) return;
    pushEvent(mp.roomId, { type: "whirl-turn-timeout", gameId: mp.gameId, round: mp.round, actorUid })
      .then(() => hostAdvanceTurn())
      .catch(() => {});
  }

  function hostBotAct(botUid) {
    if (!mp.isHost || mp.view !== "game") return;
    // Only act if it's still this bot's turn and phase.
    if (mp.turnOrder[mp.turnIndex] !== botUid || mp.phase !== "spin") return;
    clearTimeout(mp.hostTimer); // bot is acting; the turn clock is satisfied
    const seg = SEGMENTS[mp.spinTarget ?? 0];
    if (seg.kind === "bankrupt" || seg.kind === "lose-turn") {
      mp.hostTimer = setTimeout(() => hostAdvanceTurn(), 2200);
      return;
    }
    if (seg.kind === "prize") mp.pendingPrize = seg;
    // Bot may try to solve first.
    const solveGuess = botSolveDecision();
    if (solveGuess) {
      const phrase = mp.game.puzzles[mp.round - 1].phrase;
      const correct = phraseNorm(solveGuess) === phraseNorm(phrase);
      setTimeout(() => {
        pushEvent(mp.roomId, { type: "whirl-solve", gameId: mp.gameId, round: mp.round, actorUid: botUid, guess: solveGuess.slice(0, 60), correct })
          .catch(() => {});
      }, 1800);
      return;
    }
    // Otherwise call a letter (or buy a vowel if flush and stuck).
    setTimeout(() => {
      const bank = mp.banks[botUid] || 0;
      const unknowns = mp.letters.filter((e) => e.ch !== " " && !e.revealed && !VOWELS.has(e.ch)).length;
      if (bank >= VOWEL_COST * 2 && unknowns === 0) {
        const vowel = ["A", "E", "I", "O", "U"].find((v) => !mp.used.has(v));
        if (vowel) {
          pushEvent(mp.roomId, { type: "whirl-vowel", gameId: mp.gameId, round: mp.round, actorUid: botUid, letter: vowel }).catch(() => {});
          return;
        }
      }
      const letter = botPickLetter();
      if (letter) pushEvent(mp.roomId, { type: "whirl-letter", gameId: mp.gameId, round: mp.round, actorUid: botUid, letter }).catch(() => {});
      else hostAdvanceTurn();
    }, 1800);
  }

  function hostEndGame() {
    mp.view = "podium";
    render();
  }

  /* ================= Player actions (local client) ================= */

  function doSpin() {
    if (!isMyTurn() || mp.phase !== "spin" || mp.spinning || mp.spinTarget == null) return;
    mp.spinning = true;
    mp.phase = "spinning";
    render();
    const target = mp.spinTarget;
    const reduced = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const current = ((mp.rotation % 360) + 360) % 360;
    const targetCenter = (360 - (target * SEGMENT_DEG + SEGMENT_DEG / 2)) % 360;
    const delta = (((targetCenter - current) % 360) + 360) % 360;
    const turns = reduced ? 1 : 4 + Math.floor(Math.random() * 2);
    const total = turns * 360 + delta;
    const start = mp.rotation;
    const duration = reduced ? 300 : 3200 + Math.random() * 600;
    const t0 = performance.now();
    const frame = (now) => {
      if (!mp.spinning) return;
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      mp.rotation = start + total * eased;
      paintWheel();
      if (p < 1) requestAnimationFrame(frame);
      else {
        mp.spinning = false;
        onLandedLocal(SEGMENTS[target]);
      }
    };
    requestAnimationFrame(frame);
  }

  function onLandedLocal(segment) {
    // Bankrupt/lose-turn banks were already applied from the whirl-spin event.
    if (segment.kind === "bankrupt" || segment.kind === "lose-turn") {
      mp.phase = "idle";
      render();
      return; // host advances the turn on its own timer
    }
    if (segment.kind === "prize") mp.pendingPrize = segment;
    if (segment.kind === "jackpot") mp.pendingPrize = null;
    mp.phase = "letter";
    mp.callout = segment.kind === "jackpot"
      ? `GOLDEN SPROUT — ${segment.value} shells! Call a consonant!`
      : segment.kind === "prize"
        ? `PRIZE: ${esc(segment.itemName)}! Call a consonant to win it!`
        : `${segment.value} shells — call a consonant!`;
    render();
  }

  async function doLetter(letter) {
    if (!isMyTurn() || mp.phase !== "letter" || mp.used.has(letter)) return;
    try {
      await pushEvent(mp.roomId, { type: "whirl-letter", gameId: mp.gameId, round: mp.round, actorUid: myUid(), letter });
      mp.phase = "idle"; // wait for the event to come back around
      render();
    } catch (e) { mp.callout = "Couldn't send that letter — check your connection."; render(); }
  }

  async function doVowel(letter) {
    if (!isMyTurn() || !VOWELS.has(letter) || mp.used.has(letter)) return;
    if ((mp.banks[myUid()] || 0) < VOWEL_COST) return;
    try {
      await pushEvent(mp.roomId, { type: "whirl-vowel", gameId: mp.gameId, round: mp.round, actorUid: myUid(), letter });
      render();
    } catch (e) { mp.callout = "Couldn't buy that vowel — check your connection."; render(); }
  }

  async function doSolve(raw) {
    if (!isMyTurn()) return;
    const guess = phraseNorm(raw);
    if (!guess) return;
    const phrase = mp.game.puzzles[mp.round - 1].phrase;
    const correct = guess === phraseNorm(phrase);
    try {
      await pushEvent(mp.roomId, { type: "whirl-solve", gameId: mp.gameId, round: mp.round, actorUid: myUid(), guess: guess.slice(0, 60), correct });
      mp.solveOpen = false;
      render();
    } catch (e) { mp.callout = "Couldn't send your solve — check your connection."; render(); }
  }

  async function doCheer(emote) {
    if (!CHEER_EMOTES.includes(emote) || !mp.gameId) return;
    try { await pushEvent(mp.roomId, { type: "whirl-cheer", gameId: mp.gameId, emote }); }
    catch (e) { /* cheers are best-effort */ }
  }

  /* ================= UI ================= */

  function build() {
    if (mp.root) return;
    const root = document.createElement("section");
    root.className = "whirl-game whirl-mp";
    root.hidden = true;
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", "Whirl of Resources multiplayer");
    root.innerHTML =
      `<header class="whirl-topbar"><span><small>Cyclical City game show</small><b>Whirl of Resources · Together</b></span>` +
      `<div class="whirl-top-tools"><button type="button" data-mp-leave>Leave</button></div></header>` +
      `<div class="whirl-stage"><div class="whirl-panel" data-mp-panel></div></div>`;
    root.addEventListener("click", onClick);
    root.addEventListener("submit", (e) => {
      const form = e.target.closest?.("[data-mp-solve-form]");
      if (form) {
        e.preventDefault();
        const input = form.querySelector("input");
        doSolve(input ? input.value : "");
      }
      const joinForm = e.target.closest?.("[data-mp-join-form]");
      if (joinForm) {
        e.preventDefault();
        const input = joinForm.querySelector("input");
        joinLobby((input ? input.value : "").toUpperCase().replace(/[^A-Z0-9]/g, ""));
      }
    });
    document.body.appendChild(root);
    mp.root = root;
  }

  function open() {
    build();
    reset();
    mp.view = "lobbyHome";
    render();
    mp.root.hidden = false;
    requestAnimationFrame(() => mp.root.classList.add("is-open"));
  }

  function close() {
    if (mp.pollStop) { mp.pollStop(); mp.pollStop = null; }
    if (mp.hostTimer) clearTimeout(mp.hostTimer);
    if (!mp.root) return;
    mp.root.classList.remove("is-open");
    setTimeout(() => { if (mp.root) mp.root.hidden = true; }, 240);
    reset();
  }

  function render() {
    if (!mp.root) return;
    const panel = mp.root.querySelector("[data-mp-panel]");
    if (mp.view === "lobbyHome") panel.innerHTML = lobbyHomeView();
    else if (mp.view === "lobby") panel.innerHTML = lobbyView();
    else if (mp.view === "game") panel.innerHTML = gameView();
    else if (mp.view === "podium") panel.innerHTML = podiumView();
    paintWheel();
  }

  function paintWheel() {
    const wheel = mp.root?.querySelector(".whirl-wheel");
    if (wheel) wheel.style.transform = `rotate(${mp.rotation}deg)`;
  }

  /* ---------- Lobby views ---------- */

  function lobbyHomeView() {
    return `<div class="whirl-set"><div class="whirl-board-side">` +
      `<div class="whirl-logo"><span>WHIRL<br>OF RESOURCES</span></div>` +
      `<div class="whirl-banner">PLAY TOGETHER</div>` +
      `<div class="whirl-callout" role="status">Spin the wheel with friends! The host's room code is the ticket in — 2 to 4 players, bots fill empty seats.</div>` +
      `<label class="whirl-callout" style="display:flex;gap:8px;align-items:center;justify-content:center">Seats for my room: <select data-mp-seats aria-label="Player seats">${[2, 3, 4].map((n) => `<option value="${n}"${n === 4 ? " selected" : ""}>${n} players</option>`).join("")}</select></label>` +
      `<div class="whirl-actions" style="grid-template-columns:1fr 1fr">` +
      `<button type="button" data-mp-create>Create a room</button>` +
      `<button type="button" class="secondary" data-mp-join-show>Join a room</button></div>` +
      `<form data-mp-join-form hidden><input maxlength="6" autocomplete="off" placeholder="Room code" aria-label="Room code" style="text-transform:uppercase"><button type="submit">Join</button></form>` +
      `<div class="whirl-actions"><button type="button" class="secondary" data-mp-back>Back</button></div>` +
      `</div></div>`;
  }

  function lobbyView() {
    const members = [...mp.members.values()];
    const allReady = members.length >= 2 && members.every((m) => m.ready);
    const canStart = mp.isHost && allReady && members.length <= (mp.lobby?.totalPlayers || 4);
    const rows = members.map((m) =>
      `<div class="whirl-host"><span class="whirl-host-face" style="background:${esc(m.color === "coral" ? "#e86d53" : m.color === "teal" ? "#58a78e" : m.color === "gold" ? "#f5cb58" : m.color === "blue" ? "#5d82ba" : m.color === "purple" ? "#9b7ede" : "#62a171")}" aria-hidden="true"></span>` +
      `<span><b>${esc(m.name)}${m.bot ? ' <small style="color:#f5cb58">BOT</small>' : ""}${m.uid === mp.lobby?.hostUid ? " ★" : ""}</b><small>${m.ready ? "Ready!" : "Not ready"}</small></span></div>`
    ).join("");
    return `<div class="whirl-set"><div class="whirl-board-side">` +
      `<div class="whirl-logo"><span>WHIRL<br>OF RESOURCES</span></div>` +
      `<div class="whirl-banner">ROOM ${esc(mp.roomId || "")}</div>` +
      `<div class="whirl-callout" role="status">Share the room code with your friends. ${mp.isHost ? "You're the host — start when everyone's ready." : "Tap Ready when you're set!"}</div>` +
      `<div class="whirl-hosts" style="grid-template-columns:1fr">${rows || `<div class="whirl-callout">Waiting for players…</div>`}</div>` +
      `<div class="whirl-actions"><button type="button" data-mp-ready>${(mp.members.get(myUid())?.ready) ? "Not ready" : "Ready!"}</button>` +
      (mp.isHost ? `<button type="button" data-mp-start${canStart ? "" : " disabled"}>Start the show</button>` : ``) +
      `</div>` +
      `<div class="whirl-help">Bots fill empty seats when the host starts. Everyone needs to be ready first.</div>` +
      `</div></div>`;
  }

  /* ---------- Game view ---------- */

  function tilesHTML() {
    const words = [];
    let cur = [];
    mp.letters.forEach((e) => {
      if (e.ch === " ") { if (cur.length) { words.push(cur); cur = []; } }
      else cur.push(e);
    });
    if (cur.length) words.push(cur);
    return words.map((w) =>
      `<span class="whirl-word">${w.map((e) => `<span class="whirl-tile${e.revealed ? "" : " blank"}">${e.revealed ? esc(e.ch) : ""}</span>`).join("")}</span>`
    ).join("");
  }

  function wheelHTML() {
    const spans = SEGMENTS.map((seg, i) =>
      `<span style="--r:${(i * SEGMENT_DEG + SEGMENT_DEG / 2).toFixed(1)}deg">${esc(seg.label)}</span>`
    ).join("");
    return `<div class="whirl-wheel-wrap" role="img" aria-label="Prize wheel">` +
      `<div class="whirl-pointer" aria-hidden="true"></div>` +
      `<div class="whirl-wheel" aria-hidden="true"><div class="whirl-values">${spans}</div></div>` +
      `<div class="whirl-knob" aria-hidden="true">SPIN</div></div>`;
  }

  function scoreboardHTML() {
    return `<div class="whirl-hosts" style="grid-template-columns:repeat(${Math.min(4, mp.turnOrder.length)},1fr)">` +
      mp.turnOrder.map((uid, i) => {
        const p = playerByUid(uid);
        const active = i === mp.turnIndex;
        return `<div class="whirl-host${active ? " speaking" : ""}"><span><b>${esc(p?.name || "?")}${p?.bot ? ' <small style="color:#f5cb58">BOT</small>' : ""}</b><small>${mp.banks[uid] || 0} shells · total ${mp.totals[uid] || 0}</small></span></div>`;
      }).join("") + `</div>`;
  }

  function gameView() {
    const puzzle = mp.game?.puzzles[mp.round - 1] || { category: "", phrase: "" };
    const turn = currentPlayer();
    const mine = isMyTurn();
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const letterBtns = letters.map((l) => {
      const isV = VOWELS.has(l);
      const used = mp.used.has(l);
      const canUse = mine && !used && !mp.spinning &&
        ((mp.phase === "letter" && !isV) || (mp.phase === "spin" && isV && (mp.banks[myUid()] || 0) >= VOWEL_COST));
      return `<button type="button" data-mp-letter="${l}" class="${isV ? "vowel" : ""}${used ? " used" : ""}"${canUse ? "" : " disabled"} aria-label="${l}${used ? " (used)" : ""}">${l}</button>`;
    }).join("");
    const turnName = turn ? (turn.bot ? `${turn.name} (BOT)` : turn.name) : "…";
    return `<div class="whirl-set"><div class="whirl-board-side">` +
      `<div class="whirl-logo"><span>WHIRL<br>OF RESOURCES</span></div>` +
      `<div class="whirl-roundline"><span>ROUND ${mp.round} OF ${ROUNDS_PER_GAME} · ${esc(puzzle.category)}</span><span class="whirl-score">${mine ? "<b>YOUR TURN</b>" : `Turn: <b>${esc(turnName)}</b>`}</span></div>` +
      `<div class="whirl-puzzle"><div class="whirl-category">${esc(puzzle.category)}</div><div class="whirl-tiles">${tilesHTML()}</div></div>` +
      `<div class="whirl-banner"${mp.phase === "letter" ? ` data-phase="letter"` : ""}>${mine ? TURN_INDICATOR : `WAITING ON ${esc(turnName.toUpperCase())}`}</div>` +
      scoreboardHTML() +
      `<div class="whirl-callout" role="status" aria-live="polite">${mp.callout}</div>` +
      `</div><div class="whirl-wheel-side">` +
      wheelHTML() +
      `<div class="whirl-actions">` +
      (mine && mp.phase === "spin" && !mp.spinning
        ? `<button type="button" data-mp-spin>SPIN THE WHEEL</button>`
        : `<button type="button" disabled>${mp.spinning ? "Spinning…" : mine ? "Your turn" : "Watching"}</button>`) +
      (mine ? `<button type="button" class="secondary" data-mp-solve-toggle>Solve</button>` : `<button type="button" class="secondary" data-mp-cheer>Cheer ${CHEER_GLYPH.cheer}</button>`) +
      `</div>` +
      `<form class="whirl-solve-form" data-mp-solve-form${mp.solveOpen && mine ? "" : " hidden"}><input maxlength="60" autocomplete="off" placeholder="Type the full puzzle" aria-label="Puzzle solution"><button type="submit">Solve!</button></form>` +
      `<div class="whirl-letters" role="group" aria-label="Letter board">${letterBtns}</div>` +
      `<div class="whirl-help">★ = prize · BUST = lose bank · SKIP = lose turn · Vowels ${VOWEL_COST} shells</div>` +
      `</div></div><div data-mp-cheers aria-hidden="true"></div>`;
  }

  function podiumView() {
    const ranked = [...(mp.game?.players || [])].sort((a, b) => (mp.totals[b.uid] || 0) - (mp.totals[a.uid] || 0));
    const champ = ranked[0];
    const rows = ranked.map((p, i) =>
      `<div class="whirl-host${i === 0 ? " speaking" : ""}"><span><b>${i + 1}. ${esc(p.name)}${p.bot ? ' <small style="color:#f5cb58">BOT</small>' : ""}</b><small>${mp.totals[p.uid] || 0} shells</small></span></div>`
    ).join("");
    return `<div class="whirl-set"><div class="whirl-board-side">` +
      `<div class="whirl-logo"><span>WHIRL<br>OF RESOURCES</span></div>` +
      `<div class="whirl-banner" data-phase="podium">WHIRL CHAMPION!</div>` +
      `<div class="whirl-callout" role="status">${esc(champ?.name || "Someone")} takes the show with <b>${mp.totals[champ?.uid] || 0} shells</b>!</div>` +
      `<div class="whirl-hosts" style="grid-template-columns:1fr">${rows}</div>` +
      `<div class="whirl-actions"><button type="button" data-mp-leave>Back to marquee</button></div>` +
      `</div></div>`;
  }

  function showCheer(e) {
    const layer = mp.root?.querySelector("[data-mp-cheers]");
    if (!layer) return;
    const s = document.createElement("span");
    s.textContent = CHEER_GLYPH[e.emote] || CHEER_GLYPH.cheer;
    s.title = `${e.name} cheers!`;
    Object.assign(s.style, {
      position: "fixed", zIndex: 999, fontSize: "34px", pointerEvents: "none",
      left: `${8 + Math.random() * 84}vw`, top: "62vh",
      transition: "transform 1.6s ease-out, opacity 1.6s",
    });
    document.body.appendChild(s);
    requestAnimationFrame(() => {
      s.style.transform = "translateY(-38vh) scale(1.4) rotate(18deg)";
      s.style.opacity = "0";
    });
    setTimeout(() => s.remove(), 1700);
  }

  /* ================= Lobby logic ================= */

  async function createLobby() {
    try {
      const roomId = makeRoomCode();
      const seed = (crypto.getRandomValues(new Uint32Array(1))[0] || 1);
      mp.roomId = roomId;
      mp.seats = Number(mp.root.querySelector("[data-mp-seats]")?.value || 4) || 4;
      mp.myColor = PLAYER_COLORS[Math.floor(Math.random() * PLAYER_COLORS.length)];
      const id = await pushEvent(roomId, { type: "whirl-lobby", totalPlayers: mp.seats, seed, color: mp.myColor });
      mp.seenIds.add(id);
      mp.lobbyId = id;
      mp.isHost = true;
      mp.lobby = { totalPlayers: mp.seats, seed, hostUid: myUid(), hostName: myName() };
      mp.members.set(myUid(), { uid: myUid(), name: myName(), color: mp.myColor, ready: true, bot: false });
      mp.view = "lobby";
      mp.lastSeen = 0;
      startListening();
      render();
    } catch (e) {
      mp.view = "lobbyHome";
      render();
      mp.callout = "";
      alert("Couldn't create the room — check your connection and try again.");
    }
  }

  async function joinLobby(rawCode) {
    const code = String(rawCode || "").toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (code.length < 4) return;
    try {
      mp.roomId = code;
      mp.myColor = PLAYER_COLORS[Math.floor(Math.random() * PLAYER_COLORS.length)];
      // Load recent history to find the lobby (and an in-progress game, if any).
      const events = await fetchEvents(code, 0);
      const lobby = events.find((e) => e.type === "whirl-lobby");
      if (!lobby) throw new Error("no-lobby");
      const joinId = await pushEvent(code, { type: "whirl-join", lobbyId: lobby.id, color: mp.myColor });
      mp.seenIds.add(joinId);
      mp.members.set(myUid(), { uid: myUid(), name: myName(), color: mp.myColor, ready: false, bot: false });
      mp.lastSeen = 0;
      mp.view = "lobby";
      applyEvents(events); // replays lobby, joins, readys, and start/spins if mid-game
      startListening();
      render();
    } catch (e) {
      mp.view = "lobbyHome";
      mp.roomId = null;
      render();
      alert("Couldn't find that room — check the code and try again.");
    }
  }

  async function toggleReady() {
    const me = mp.members.get(myUid());
    if (!me || !mp.lobbyId) return;
    try {
      await pushEvent(mp.roomId, { type: "whirl-ready", lobbyId: mp.lobbyId, ready: !me.ready });
    } catch (e) { /* retry on next poll */ }
  }

  async function startGame() {
    if (!mp.isHost || !mp.lobbyId) return;
    const members = [...mp.members.values()];
    if (members.length < 2 || !members.every((m) => m.ready)) return;
    // Fill empty seats with bots (NPC opponents, labeled BOT).
    const players = members.slice(0, mp.lobby.totalPlayers).map((m, i) => ({
      uid: m.uid, name: m.name, color: m.color, order: i, bot: false,
    }));
    let bi = 0;
    while (players.length < mp.lobby.totalPlayers && bi < WHIRL_BOTS.length) {
      const b = WHIRL_BOTS[bi++];
      if (players.some((p) => p.uid === b.uid)) continue;
      players.push({ uid: b.uid, name: b.name, color: b.color, order: players.length, bot: true });
    }
    // Host picks 3 puzzles from the starter pack with the lobby seed.
    const pack = (window.__snugWhirlPuzzles || []).filter((p) => p.phrase);
    const rng = mulberry32(mp.lobby.seed);
    const puzzles = [];
    const usedIdx = new Set();
    while (puzzles.length < ROUNDS_PER_GAME && usedIdx.size < pack.length) {
      const i = Math.floor(rng() * pack.length);
      if (usedIdx.has(i)) continue;
      usedIdx.add(i);
      puzzles.push({ category: pack[i].category, phrase: phraseNorm(pack[i].phrase) });
    }
    while (puzzles.length < ROUNDS_PER_GAME) puzzles.push({ category: "Around Cyclical City", phrase: "CYCLICAL CITY" });
    const playersObj = {};
    players.forEach((p) => { playersObj[p.uid] = { name: p.name, color: p.color, order: p.order, bot: p.bot }; });
    const puzzlesObj = {};
    puzzles.forEach((p, i) => { puzzlesObj[i] = p; });
    try {
      // Host spends one ticket to put on the shared show.
      window.dispatchEvent(new CustomEvent("snug-player-patch", {
        detail: (player) => {
          const t = Number(player?.whirlTickets || 0);
          return { ...(player || {}), whirlTickets: Math.max(0, t - 1) };
        },
      }));
      await pushEvent(mp.roomId, {
        type: "whirl-start", lobbyId: mp.lobbyId, seed: mp.lobby.seed,
        players: playersObj, puzzles: puzzlesObj,
      });
    } catch (e) {
      mp.callout = "Couldn't start the show — check your connection.";
      render();
    }
  }

  function startListening() {
    if (mp.pollStop) mp.pollStop();
    let stopped = false;
    const poll = async () => {
      if (stopped) return;
      try {
        const events = await fetchEvents(mp.roomId, mp.lastSeen);
        if (events.length) {
          mp.lastSeen = Math.max(mp.lastSeen, ...events.map((e) => e.createdAt));
          applyEvents(events);
        }
      } catch (e) { /* keep polling */ }
      if (!stopped) setTimeout(poll, POLL_MS);
    };
    poll();
    mp.pollStop = () => { stopped = true; };
  }

  /* ================= Click handling ================= */

  function onClick(event) {
    const t = event.target.closest("button, input, select, [data-mp-spin]");
    if (!t || !mp.root?.contains(t)) return;
    if (t.matches("[data-mp-leave]")) { doLeave(); return; }
    if (t.matches("[data-mp-back]")) { mp.view = "lobbyHome"; render(); return; }
    if (t.matches("[data-mp-create]")) { createLobby(); return; }
    if (t.matches("[data-mp-join-show]")) {
      const f = mp.root.querySelector("[data-mp-join-form]");
      if (f) { f.hidden = !f.hidden; const i = f.querySelector("input"); if (!f.hidden && i) i.focus(); }
      return;
    }
    if (t.matches("[data-mp-ready]")) { toggleReady(); return; }
    if (t.matches("[data-mp-start]")) { startGame(); return; }
    if (t.matches("[data-mp-spin]")) { doSpin(); return; }
    if (t.matches("[data-mp-solve-toggle]")) { mp.solveOpen = !mp.solveOpen; render(); const i = mp.root.querySelector("[data-mp-solve-form] input"); if (mp.solveOpen && i) setTimeout(() => i.focus(), 60); return; }
    if (t.matches("[data-mp-cheer]")) { doCheer(CHEER_EMOTES[Math.floor(Math.random() * CHEER_EMOTES.length)]); return; }
    const lb = t.closest("[data-mp-letter]");
    if (lb && !lb.disabled) {
      const letter = lb.dataset.mpLetter;
      if (VOWELS.has(letter)) doVowel(letter);
      else doLetter(letter);
    }
  }

  async function doLeave() {
    try {
      if (mp.roomId && mp.lobbyId && mp.view === "lobby") {
        await pushEvent(mp.roomId, { type: "whirl-leave", lobbyId: mp.lobbyId });
      }
    } catch (e) { /* best effort */ }
    close();
  }

  /* ================= Wiring ================= */

  // Expose for the solo show's "Play together" button.
  window.__snugWhirlMultiplayer = { open, close, get view() { return mp.view; } };
})();

(() => {
  const SUITS = ["●", "◆", "✦", "☘"];
  const RANKS = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  let activeStage = null;
  let hiddenPlayer = null;
  let speakingUids = new Set();
  let configuredOpponents = [];

  const cardMarkup = (card, faceUp = true, extra = "") => `<button type="button" class="snug-arcade-card ${faceUp ? "is-face-up" : ""}" ${extra}><span class="snug-arcade-card-inner"><span class="snug-card-face snug-card-back"></span><span class="snug-card-face snug-card-front"><small>${card.rank}</small>${card.suit}</span></span></button>`;
  window.__snugCardTable = {
    cardMarkup,
    setOpponents(players) { configuredOpponents = Array.isArray(players) ? players.filter(Boolean) : []; },
    get doubleSidedCards() { return true; },
  };

  const hidePlayer = () => {
    const player = window.__snugWorld?.player;
    if (player && player.visible) { hiddenPlayer = player; player.visible = false; }
  };
  const restorePlayer = () => { if (hiddenPlayer) hiddenPlayer.visible = true; hiddenPlayer = null; };
  const setExpression = (node, expression) => {
    if (!node) return;
    node.dataset.expression = "";
    requestAnimationFrame(() => { node.dataset.expression = expression; });
    const profile = configuredOpponents[0];
    const avatar = node.querySelector(".snug-opponent-avatar");
    const source = profile?.expressions?.[expression] || profile?.photo || "";
    const safeSource = typeof source === "string" && (/^data:image\/(?:png|jpeg|webp);base64,[a-z0-9+/=]+$/i.test(source) || /^blob:[a-z0-9.+-]+:/i.test(source) || /^\/?assets\/[a-z0-9_./-]+$/i.test(source)) ? source : "";
    if (avatar) {
      avatar.querySelector("img")?.remove();
      if (safeSource) { const image=document.createElement("img"); image.alt=""; image.src=safeSource; avatar.appendChild(image); }
    }
  };
  // The player's own seat at the near side of the table, emoting with their
  // recorded selfie expressions (players/{uid}.expressionPhotos, same source
  // the home-visit directory uses for portraits). Falls back to the drawn
  // face when the player hasn't recorded selfies or is offline.
  const PLAYER_PHOTO_EXPRESSIONS = ["calm", "happy", "sad", "angry", "cheeky", "laughter"];
  const PLAYER_PHOTO_FALLBACK = { smug: "cheeky" };
  let playerPhotoCache = null, playerPhotoPromise = null;
  const decodeFsValue = (value = {}) => {
    if (value && typeof value === "object") {
      if ("stringValue" in value) return value.stringValue;
      if (value.mapValue) return Object.fromEntries(Object.entries(value.mapValue.fields || {}).map(([k, v]) => [k, decodeFsValue(v)]));
      if (value.arrayValue) return (value.arrayValue.values || []).map(decodeFsValue);
    }
    return null;
  };
  const loadPlayerExpressionPhotos = () => {
    if (playerPhotoCache) return Promise.resolve(playerPhotoCache);
    if (playerPhotoPromise) return playerPhotoPromise;
    playerPhotoPromise = (async () => {
      const photos = {};
      try {
        const session = window.__snugSession;
        const user = session?.user;
        const uid = session?.uid || user?.uid;
        const project = session?.projectId || session?.app?.options?.projectId;
        const bucket = session?.app?.options?.storageBucket;
        if (!user?.getIdToken || !uid || !project || !bucket) return photos;
        const token = await user.getIdToken();
        const docRes = await fetch(`https://firestore.googleapis.com/v1/projects/${encodeURIComponent(project)}/databases/(default)/documents/players/${encodeURIComponent(uid)}`, { headers: { Authorization: `Bearer ${token}` } });
        if (!docRes.ok) return photos;
        const fields = decodeFsValue({ mapValue: { fields: (await docRes.json()).fields || {} } }) || {};
        const expressionPhotos = fields.expressionPhotos;
        if (!expressionPhotos || typeof expressionPhotos !== "object") return photos;
        for (const expression of PLAYER_PHOTO_EXPRESSIONS) {
          const path = expressionPhotos[expression]?.path;
          if (!path) continue;
          try {
            const res = await fetch(`https://firebasestorage.googleapis.com/v0/b/${encodeURIComponent(bucket)}/o/${encodeURIComponent(path)}?alt=media`, { headers: { Authorization: `Firebase ${token}` } });
            if (res.ok) photos[expression] = URL.createObjectURL(await res.blob());
          } catch { /* one missing photo never breaks the seat */ }
        }
      } catch { /* offline or signed out: the seat keeps its drawn face */ }
      return photos;
    })().then((photos) => { playerPhotoCache = photos; return photos; });
    return playerPhotoPromise;
  };
  const setPlayerExpression = (seat, expression) => {
    if (!seat) return;
    seat.dataset.expression = "";
    requestAnimationFrame(() => { seat.dataset.expression = expression; });
    loadPlayerExpressionPhotos().then((photos) => {
      if (!seat.isConnected) return;
      const avatar = seat.querySelector(".snug-opponent-avatar");
      if (!avatar) return;
      avatar.querySelector("img")?.remove();
      const src = photos[expression] || photos[PLAYER_PHOTO_FALLBACK[expression]] || photos.calm || "";
      if (src) { const img = document.createElement("img"); img.alt = ""; img.src = src; avatar.appendChild(img); }
    });
  };
  const seatPlayerAtTable = (table, label = "You") => {
    const seat = document.createElement("div");
    seat.className = "snug-opponent snug-player-seat";
    seat.dataset.expression = "calm";
    seat.innerHTML = `<div class="snug-opponent-avatar"></div><span class="snug-opponent-name">${label}</span>`;
    table.appendChild(seat);
    setPlayerExpression(seat, "calm");
    return seat;
  };
  const closeStage = () => {
    if (!activeStage) return;
    activeStage.classList.add("is-leaving");
    setTimeout(() => { activeStage?.remove(); activeStage = null; restorePlayer(); }, 290);
  };
  const stage = (title, kicker) => {
    closeStage(); hidePlayer();
    const root = document.createElement("section"); root.className = "snug-stage"; root.setAttribute("role", "dialog"); root.setAttribute("aria-modal", "true"); root.setAttribute("aria-label", title);
    root.innerHTML = `<header class="snug-stage-head"><span><small>${kicker}</small><b>${title}</b></span><div class="snug-stage-tools"><button type="button" data-stage-voice aria-label="Toggle room voice">Mic</button><button type="button" data-stage-close>Leave</button></div></header><div class="snug-stage-body"></div>`;
    document.body.appendChild(root); activeStage = root;
    root.querySelector("[data-stage-close]").addEventListener("click", closeStage);
    root.querySelector("[data-stage-voice]").addEventListener("click", () => document.querySelector(".voice-toggle-dock button,[data-action='voice']")?.click());
    requestAnimationFrame(() => root.classList.add("is-on"));
    return root.querySelector(".snug-stage-body");
  };
  const setStatus = (body, text) => {
    let status = body.querySelector(".snug-stage-status");
    if (!status) { status = document.createElement("div"); status.className = "snug-stage-status"; status.setAttribute("role", "status"); body.appendChild(status); }
    status.textContent = text;
  };
  const animateCardMove = (table, card, destination = "hand") => {
    const deck = table.querySelector(".snug-table-deck")?.getBoundingClientRect();
    const target = table.querySelector(destination === "discard" ? ".snug-table-discard" : ".snug-hand")?.getBoundingClientRect();
    if (!deck || !target) return;
    const holder = document.createElement("div"); holder.innerHTML = cardMarkup(card, false, 'tabindex="-1"');
    const flying = holder.firstElementChild; flying.classList.add("snug-card-fly"); flying.style.left = `${deck.left}px`; flying.style.top = `${deck.top}px`; document.body.appendChild(flying);
    requestAnimationFrame(() => flying.classList.add("is-face-up"));
    const x = target.left + target.width / 2 - deck.left - 29, y = target.top + target.height / 2 - deck.top - 41;
    flying.animate([{ transform: "translate(0,0) rotateY(0deg) scale(.9)" }, { transform: `translate(${x * .55}px,${y * .35 - 42}px) rotateY(90deg) scale(1.12)`, offset: .5 }, { transform: `translate(${x}px,${y}px) rotateY(180deg) scale(1)` }], { duration: 620, easing: "cubic-bezier(.25,.8,.2,1)" }).finished.finally(() => flying.remove());
  };
  const shuffle = (array) => {
    const values = [...array];
    for (let i = values.length - 1; i > 0; i--) { const bytes = crypto.getRandomValues(new Uint32Array(1)); const j = bytes[0] % (i + 1); [values[i], values[j]] = [values[j], values[i]]; }
    return values;
  };

  const startGoFish = () => {
    const body = stage("Go Fish with Chip Chance", "Top-down card table · Chip deals you in");
    const deck = shuffle(RANKS.flatMap((rank) => SUITS.map((suit) => ({ rank, suit }))));
    const state = { player: deck.splice(0, 7), npc: deck.splice(0, 7), deck, playerBooks: 0, npcBooks: 0, busy: false, discard: null };
    body.innerHTML = `<div class="snug-card-table"><div class="snug-opponent" data-voice-uid="npc-chip-chance" data-expression="calm"><div class="snug-opponent-avatar"></div><span class="snug-opponent-name">Chip Chance</span><span class="snug-opponent-cards"></span></div><div class="snug-table-deck"><b>Draw pile</b></div><div class="snug-table-discard"><b>Books</b></div><div class="snug-books"></div><div class="snug-hand"></div><div class="snug-fish-actions"><button type="button" data-fish-draw>Go Fish</button></div></div>`;
    const table = body.querySelector(".snug-card-table"), opponent = table.querySelector(".snug-opponent");
    const seat = seatPlayerAtTable(table);
    const updateBooks = (who) => {
      const hand = state[who], counts = new Map(); hand.forEach((card) => counts.set(card.rank, (counts.get(card.rank) || 0) + 1));
      for (const [rank, count] of counts) if (count === 4) {
        state[who] = hand.filter((card) => card.rank !== rank); state[`${who}Books`] += 1; state.discard = { rank, suit: "★" };
        animateCardMove(table, state.discard, "discard");
        setExpression(opponent, who === "npc" ? "happy" : "sad");
        setPlayerExpression(seat, who === "player" ? "happy" : "sad");
      }
    };
    const render = () => {
      const hand = table.querySelector(".snug-hand");
      hand.innerHTML = state.player.map((card, index) => cardMarkup(card, true, `data-fish-rank="${card.rank}" style="--fan-angle:${(index - (state.player.length - 1) / 2) * 3.3}deg;--fan-y:${Math.abs(index - (state.player.length - 1) / 2) * 2}px" aria-label="Ask Chip for ${card.rank}s"`)).join("");
      table.querySelector(".snug-opponent-cards").innerHTML = state.npc.map(() => "<i></i>").join("");
      table.querySelector(".snug-books").textContent = `Your books ${state.playerBooks} · Chip ${state.npcBooks}`;
      table.querySelector(".snug-table-discard").innerHTML = `${state.discard ? cardMarkup(state.discard, true, "tabindex=\"-1\"") : ""}<b>Books</b>`;
      hand.querySelectorAll("[data-fish-rank]").forEach((button) => button.addEventListener("click", () => ask(button.dataset.fishRank)));
      if (!state.player.length && state.deck.length) state.player.push(state.deck.pop());
      if (!state.npc.length && state.deck.length) state.npc.push(state.deck.pop());
      if (!state.deck.length || state.playerBooks + state.npcBooks >= 8) {
        setStatus(body, state.playerBooks >= state.npcBooks ? "You won the table! Chip is taking it surprisingly well." : "Chip wins this hand. The cards are ready for another round.");
        setExpression(opponent, state.playerBooks >= state.npcBooks ? "sad" : "happy");
        setPlayerExpression(seat, state.playerBooks >= state.npcBooks ? "laughter" : "sad");
      }
    };
    const npcTurn = () => {
      if (!state.npc.length) return render();
      const rank = state.npc[Math.floor(Math.random() * state.npc.length)].rank;
      const matches = state.player.filter((card) => card.rank === rank);
      if (matches.length) {
        state.player = state.player.filter((card) => card.rank !== rank); state.npc.push(...matches);
        setStatus(body, `Chip asks for ${rank}s and takes ${matches.length}.`); setExpression(opponent, "smug");
      } else if (state.deck.length) {
        state.npc.push(state.deck.pop()); setStatus(body, `Chip asks for ${rank}s. You say “Go fish.”`); setExpression(opponent, "angry");
      }
      updateBooks("npc"); updateBooks("player"); render(); state.busy = false;
    };
    const ask = (rank) => {
      if (state.busy) return; state.busy = true;
      const matches = state.npc.filter((card) => card.rank === rank);
      if (matches.length) {
        state.npc = state.npc.filter((card) => card.rank !== rank); state.player.push(...matches);
        setStatus(body, `Chip hands over ${matches.length} ${rank}${matches.length > 1 ? "s" : ""}.`); setExpression(opponent, "sad");
      } else if (state.deck.length) {
        const drawn = state.deck.pop(); state.player.push(drawn); animateCardMove(table, drawn, "hand");
        setStatus(body, drawn.rank === rank ? `Go Fish — you drew the ${rank} you asked for!` : `Go Fish — you drew ${drawn.rank}.`); setExpression(opponent, drawn.rank === rank ? "angry" : "smug");
      }
      updateBooks("player"); render(); setTimeout(npcTurn, 700);
    };
    table.querySelector("[data-fish-draw]").addEventListener("click", () => { if (!state.busy && state.deck.length) { const drawn=state.deck.pop(); state.player.push(drawn); animateCardMove(table, drawn, "hand"); updateBooks("player"); render(); setTimeout(npcTurn, 450); } });
    setStatus(body, "Tap a card in your hand to ask Chip for that rank."); render();
  };

  const startWar = () => {
    const body = stage("War with Mr. Buck Coinsworth", "Top-down card table · flip for the pot");
    window.__snugCardTable.setOpponents([{ name: "Mr. Buck Coinsworth" }]);
    const deck = shuffle(RANKS.flatMap((rank) => SUITS.map((suit) => ({ rank, suit }))));
    const value = (rank) => rank === "A" ? 14 : RANKS.indexOf(rank) + 1;
    const state = { player: deck.slice(0, 26), npc: deck.slice(26), playerWon: [], npcWon: [], round: 0, busy: false, over: false };
    body.innerHTML = `<div class="snug-card-table"><div class="snug-opponent" data-voice-uid="npc-mr-buck-coinsworth" data-expression="calm"><div class="snug-opponent-avatar"></div><span class="snug-opponent-name">Mr. Buck Coinsworth</span><span class="snug-war-count" data-war-npc></span></div><div class="snug-war-field"><div class="snug-war-slot" data-war-slot="npc" aria-label="Coinsworth's battle card"></div><div class="snug-war-vs" aria-hidden="true">⚔</div><div class="snug-war-slot" data-war-slot="player" aria-label="Your battle card"></div></div><div class="snug-war-tally" data-war-tally></div><div class="snug-fish-actions"><button type="button" data-war-flip>Flip</button><button type="button" data-war-new hidden>New game</button></div></div>`;
    const table = body.querySelector(".snug-card-table"), opponent = table.querySelector(".snug-opponent");
    const seat = seatPlayerAtTable(table);
    const seatCount = document.createElement("span"); seatCount.className = "snug-war-count"; seat.appendChild(seatCount);
    const totals = () => ({ player: state.player.length + state.playerWon.length, npc: state.npc.length + state.npcWon.length });
    const updateCounts = () => {
      const t = totals();
      table.querySelector("[data-war-npc]").textContent = `${t.npc} cards`;
      seatCount.textContent = `${t.player} cards`;
      table.querySelector("[data-war-tally]").textContent = state.over ? "" : `Round ${state.round + 1} of 40`;
    };
    const drawCard = (who) => {
      if (!state[who].length) {
        if (!state[who + "Won"].length) return null;
        state[who] = shuffle(state[who + "Won"]); state[who + "Won"] = [];
        setStatus(body, `${who === "player" ? "You shuffle" : "Coinsworth shuffles"} winnings back into the battle pile.`);
      }
      return state[who].shift();
    };
    const reveal = (p, n) => {
      const pSlot = table.querySelector('[data-war-slot="player"]'), nSlot = table.querySelector('[data-war-slot="npc"]');
      pSlot.innerHTML = cardMarkup(p, false, 'tabindex="-1"');
      nSlot.innerHTML = cardMarkup(n, false, 'tabindex="-1"');
      requestAnimationFrame(() => requestAnimationFrame(() => {
        pSlot.firstElementChild?.classList.add("is-face-up");
        nSlot.firstElementChild?.classList.add("is-face-up");
      }));
    };
    const clearField = () => table.querySelectorAll("[data-war-slot]").forEach((slot) => { slot.innerHTML = ""; });
    const finish = (winner) => {
      state.over = true; state.busy = false;
      const t = totals();
      setStatus(body, winner === "draw" ? "Forty rounds and dead even — the ledger balances and the table calls it a draw." : winner === "player" ? `You take the war, ${t.player} cards to ${t.npc}! Coinsworth notes it in the ledger.` : `Coinsworth takes the war, ${t.npc} to ${t.player}. The house always counts.`);
      setExpression(opponent, winner === "npc" ? "happy" : "sad");
      setPlayerExpression(seat, winner === "player" ? "laughter" : "sad");
      table.querySelector("[data-war-flip]").hidden = true;
      table.querySelector("[data-war-new]").hidden = false;
      updateCounts();
    };
    const checkEnd = () => {
      const t = totals();
      if (t.player === 0 || t.npc === 0 || state.round >= 40) finish(t.player === t.npc ? "draw" : t.player > t.npc ? "player" : "npc");
    };
    const flip = () => {
      if (state.busy || state.over) return;
      state.busy = true;
      const spoils = [];
      const battle = () => {
        const p = drawCard("player"), n = drawCard("npc");
        if (!p || !n) { finish(!p && !n ? "draw" : p ? "player" : "npc"); return; }
        spoils.push(p, n);
        reveal(p, n);
        const diff = value(p.rank) - value(n.rank);
        if (diff === 0) {
          setStatus(body, `Both flip ${p.rank}s — WAR! Three cards down, one to decide it.`);
          setExpression(opponent, "smug"); setPlayerExpression(seat, "cheeky");
          for (let i = 0; i < 3; i++) { const pd = state.player.shift(), nd = state.npc.shift(); if (pd) spoils.push(pd); if (nd) spoils.push(nd); }
          table.querySelector("[data-war-tally]").textContent = `War spoils: ${spoils.length} cards`;
          setTimeout(battle, 1200);
          return;
        }
        const winner = diff > 0 ? "player" : "npc";
        state[winner + "Won"].push(...spoils);
        setStatus(body, winner === "player" ? `Your ${p.rank} beats Coinsworth's ${n.rank} — ${spoils.length} cards to your pile.` : `Coinsworth's ${n.rank} beats your ${p.rank}. The banker collects ${spoils.length} cards.`);
        setExpression(opponent, winner === "npc" ? "happy" : "sad");
        setPlayerExpression(seat, winner === "player" ? "happy" : "sad");
        state.round++;
        updateCounts();
        setTimeout(() => { clearField(); state.busy = false; checkEnd(); }, 1500);
      };
      battle();
    };
    table.querySelector("[data-war-flip]").addEventListener("click", flip);
    table.querySelector("[data-war-new]").addEventListener("click", () => startWar());
    setStatus(body, "Tap Flip to battle a card. High card takes the pot; ties mean war.");
    updateCounts();
  };

  const startOldMaid = () => {
    const body = stage("Old Maid with Agnes Alley", "Top-down card table · don't hold the stray queen");
    window.__snugCardTable.setOpponents([{ name: "Agnes Alley" }]);
    const deck = shuffle(RANKS.flatMap((rank) => SUITS.map((suit) => ({ rank, suit }))).filter((card) => !(card.rank === "Q" && card.suit === "♠")));
    const state = { player: deck.slice(0, 26), npc: deck.slice(26), playerPairs: 0, npcPairs: 0, busy: true, over: false, lastPair: null };
    body.innerHTML = `<div class="snug-card-table"><div class="snug-opponent" data-voice-uid="npc-agnes-alley" data-expression="calm"><div class="snug-opponent-avatar"></div><span class="snug-opponent-name">Agnes Alley</span><span class="snug-opponent-cards" data-om-npc></span></div><div class="snug-table-deck" data-om-deck><b>Deal</b></div><div class="snug-table-discard" data-om-discard><b>Pairs</b></div><div class="snug-books" data-om-books></div><div class="snug-hand" data-om-hand></div></div>`;
    const table = body.querySelector(".snug-card-table"), opponent = table.querySelector(".snug-opponent");
    const seat = seatPlayerAtTable(table);
    const discardPairs = (who) => {
      const byRank = new Map();
      state[who].forEach((card) => { if (!byRank.has(card.rank)) byRank.set(card.rank, []); byRank.get(card.rank).push(card); });
      let pairs = 0;
      const keep = [];
      for (const cards of byRank.values()) { pairs += Math.floor(cards.length / 2); if (cards.length % 2) keep.push(cards[0]); }
      state[who] = keep;
      state[who + "Pairs"] += pairs;
      return pairs;
    };
    const render = () => {
      state.player.sort((a, b) => RANKS.indexOf(a.rank) - RANKS.indexOf(b.rank));
      const hand = table.querySelector("[data-om-hand]");
      hand.innerHTML = state.player.map((card, i) => cardMarkup(card, true, `tabindex="-1" style="--fan-angle:${(i - (state.player.length - 1) / 2) * 3.3}deg;--fan-y:${Math.abs(i - (state.player.length - 1) / 2) * 2}px" aria-label="${card.rank}${card.suit}"`)).join("");
      const npcHand = table.querySelector("[data-om-npc]");
      npcHand.innerHTML = state.npc.map((_, i) => `<button type="button" class="snug-om-back" data-om-pick="${i}" aria-label="Draw a card from Agnes's hand"${state.busy || state.over ? " disabled" : ""}></button>`).join("");
      table.querySelector("[data-om-books]").textContent = `Your pairs ${state.playerPairs} · Agnes's pairs ${state.npcPairs}`;
      table.querySelector("[data-om-discard]").innerHTML = `${state.lastPair ? cardMarkup(state.lastPair, true, 'tabindex="-1"') : ""}<b>Pairs</b>`;
      npcHand.querySelectorAll("[data-om-pick]").forEach((button) => button.addEventListener("click", () => playerDraw(Number(button.dataset.omPick))));
    };
    const checkEnd = () => {
      if (state.player.length === 0 || state.npc.length === 0) {
        state.over = true;
        const playerWins = state.player.length === 0;
        setStatus(body, playerWins ? "You shed every last card — Agnes is left holding the stray queen! You win." : "Agnes sheds her last card. You're holding the stray queen...");
        setExpression(opponent, playerWins ? "sad" : "happy");
        setPlayerExpression(seat, playerWins ? "laughter" : "sad");
        render();
        return true;
      }
      return false;
    };
    const playerDraw = (index) => {
      if (state.busy || state.over || index < 0 || index >= state.npc.length) return;
      state.busy = true;
      const [drawn] = state.npc.splice(index, 1);
      state.player.push(drawn);
      const pairs = discardPairs("player");
      if (pairs) {
        state.lastPair = drawn;
        setStatus(body, `You draw ${drawn.rank}${drawn.suit} and lay down ${pairs === 1 ? "a pair" : pairs + " pairs"}.`);
        setExpression(opponent, "sad"); setPlayerExpression(seat, "happy");
      } else {
        setStatus(body, `You draw ${drawn.rank}${drawn.suit}. No pair — Agnes draws next.`);
        setExpression(opponent, "smug");
      }
      render();
      if (!checkEnd()) setTimeout(npcDraw, 1000);
    };
    const npcDraw = () => {
      if (state.over) return;
      let result;
      if (state.player.length) {
        const [drawn] = state.player.splice(Math.floor(Math.random() * state.player.length), 1);
        state.npc.push(drawn);
        const pairs = discardPairs("npc");
        if (pairs) {
          state.lastPair = drawn;
          result = `Agnes draws from your hand and lays down ${pairs === 1 ? "a pair" : pairs + " pairs"}.`;
          setExpression(opponent, "happy"); setPlayerExpression(seat, "sad");
        } else {
          result = "Agnes draws from your hand. No pair.";
          setExpression(opponent, "smug");
        }
      } else { result = ""; }
      render();
      if (checkEnd()) return;
      state.busy = false;
      setStatus(body, `${result} Your turn — tap one of Agnes's cards to draw.`);
      render();
    };
    const p0 = discardPairs("player"), n0 = discardPairs("npc");
    render();
    [0, 1, 2].forEach((i) => setTimeout(() => { if (!state.over && state.player[i]) animateCardMove(table, state.player[i], "hand"); }, i * 180));
    setTimeout(() => {
      if (!table.isConnected) return;
      table.querySelector("[data-om-deck]").style.visibility = "hidden";
      setStatus(body, `Agnes deals. You lay down ${p0} pair${p0 === 1 ? "" : "s"}; Agnes lays down ${n0}. Tap one of her cards to draw.`);
      state.busy = false;
      render();
      checkEnd();
    }, 750);
  };

  const winner3 = (cells) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const line of lines) if (cells[line[0]] && cells[line[0]] === cells[line[1]] && cells[line[1]] === cells[line[2]]) return cells[line[0]];
    return cells.every(Boolean) ? "draw" : "";
  };
  const startTicTacToe = () => {
    const body = stage("Garden Tic-Tac-Toe", "Flat board · Fern Bramble plays rings");
    const cells = Array(9).fill(""); body.innerHTML = `<div class="snug-grid-board ttt">${cells.map((_,i)=>`<button class="snug-grid-cell" data-cell="${i}" aria-label="Square ${i+1}"></button>`).join("")}</div>`;
    const buttons = [...body.querySelectorAll("[data-cell]")];
    const render = () => buttons.forEach((b,i)=>{b.textContent=cells[i]==="p"?"✿":cells[i]==="n"?"○":"";b.disabled=Boolean(cells[i]);});
    const finish = () => { const win=winner3(cells); if(win){setStatus(body,win==="p"?"You grew three in a row!":win==="n"?"Fern rings three in a row.":"The garden board ends in a draw.");buttons.forEach(b=>b.disabled=true);return true;} return false; };
    buttons.forEach((button)=>button.addEventListener("click",()=>{const i=Number(button.dataset.cell);if(cells[i])return;cells[i]="p";render();if(finish())return;setTimeout(()=>{const open=cells.map((v,j)=>v? -1:j).filter(j=>j>=0);const pick=cells[4]?open[Math.floor(Math.random()*open.length)]:4;cells[pick]="n";render();finish();},320);})); setStatus(body,"Tap a square. You are the flower.");
  };

  const connectWinner = (cells, rows, cols, who) => {
    for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)for(const [dr,dc] of [[0,1],[1,0],[1,1],[1,-1]])if([0,1,2,3].every(k=>cells[(r+dr*k)*cols+c+dc*k]===who&&r+dr*k>=0&&r+dr*k<rows&&c+dc*k>=0&&c+dc*k<cols))return true; return false;
  };
  const startConnectFour = () => {
    const body=stage("Connect Four", "Flat board · Mr. Buck Coinsworth plays slate"); const rows=6,cols=7,cells=Array(rows*cols).fill("");
    body.innerHTML=`<div class="snug-grid-board connect">${cells.map((_,i)=>`<button class="snug-grid-cell" data-cell="${i}" aria-label="Drop in column ${i%cols+1}"></button>`).join("")}</div>`;const buttons=[...body.querySelectorAll("[data-cell]")];
    const drop=(col,who)=>{for(let r=rows-1;r>=0;r--){const i=r*cols+col;if(!cells[i]){cells[i]=who;return true;}}return false;};
    const render=()=>buttons.forEach((b,i)=>b.className=`snug-grid-cell ${cells[i]||""}`);const result=()=>{if(connectWinner(cells,rows,cols,"p")){setStatus(body,"Four coral coins — you win!");return true;}if(connectWinner(cells,rows,cols,"p2")){setStatus(body,"Coinsworth connects four slate coins.");return true;}return false;};
    buttons.forEach(b=>b.addEventListener("click",()=>{const col=Number(b.dataset.cell)%cols;if(!drop(col,"p"))return;render();if(result())return;setTimeout(()=>{const open=[0,1,2,3,4,5,6].filter(c=>!cells[c]);if(open.length){drop(open[Math.floor(Math.random()*open.length)],"p2");render();result();}},280);}));setStatus(body,"Tap any column to drop a coral coin.");
  };

  const startStargazing = () => {
    const body=stage("First-Person Stargazing", "Head-height camera · tap stars through the reticle"); let found=0;
    body.innerHTML=`<div class="snug-stargaze"><div class="snug-reticle"></div>${Array.from({length:12},(_,i)=>`<button class="snug-star" aria-label="Star" style="left:${8+(i*37)%84}%;top:${10+(i*29)%54}%;animation-delay:-${i*.11}s">✦</button>`).join("")}</div>`;const reticle=body.querySelector(".snug-reticle");
    body.querySelectorAll(".snug-star").forEach(star=>star.addEventListener("click",()=>{const box=body.getBoundingClientRect(),s=star.getBoundingClientRect();reticle.style.left=`${s.left+s.width/2-box.left}px`;reticle.style.top=`${s.top+s.height/2-box.top}px`;star.disabled=true;star.style.opacity="0";found++;setStatus(body,found===12?"Constellation complete — twelve stars charted.":`${found} of 12 stars charted`);}));setStatus(body,"Aim by tapping a star. Your avatar is hidden behind the camera.");
  };

  const custom = { "go-fish": startGoFish, "war": startWar, "old-maid": startOldMaid, "tic-tac-toe": startTicTacToe, "connect-four": startConnectFour, "stargazing": startStargazing };
  const installCards = (root=document) => root.querySelectorAll?.(".practice-grid").forEach((grid)=>{
    if(grid.parentElement.querySelector(".snug-custom-games"))return;
    const section=document.createElement("section");section.className="snug-custom-games";section.innerHTML=`<small>Controlled-camera sprite stages</small><div class="snug-custom-game-grid">${[["go-fish","Go Fish","3D-flip sprite cards · Chip Chance","♠"],["war","War","Flip-card battles · Mr. Buck Coinsworth","⚔"],["old-maid","Old Maid","Pairs and the stray queen · Agnes Alley","♛"],["tic-tac-toe","Tic-Tac-Toe","Flat garden board","✿"],["connect-four","Connect Four","Top-down coin board","●"],["stargazing","Stargazing","First-person reticle view","✦"]].map(([id,name,note,icon])=>`<button type="button" data-snug-stage="${id}"><i>${icon}</i><span><b>${name}</b><small>${note}</small></span></button>`).join("")}</div>`;grid.after(section);
    section.querySelectorAll("[data-snug-stage]").forEach(button=>button.addEventListener("click",()=>custom[button.dataset.snugStage]?.()));
  });

  window.addEventListener("snug-speaking-players",event=>{speakingUids=new Set(event.detail?.uids||[]);document.querySelectorAll(".snug-opponent[data-voice-uid]").forEach(node=>node.classList.toggle("speaking",speakingUids.has(node.dataset.voiceUid)));});
  const observer=new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)installCards(node);})));observer.observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener("click",event=>{const button=event.target.closest?.("[data-solo-game]");if(!button)return;const veil=document.createElement("div");veil.className="snug-stage is-on";veil.style.background="#111";veil.style.zIndex="690";document.body.appendChild(veil);hidePlayer();setTimeout(()=>veil.remove(),520);const watch=setInterval(()=>{if(!document.querySelector(".practice-live")){clearInterval(watch);restorePlayer();}},500);setTimeout(()=>{clearInterval(watch);restorePlayer();},180000);},true);
  installCards();
})();

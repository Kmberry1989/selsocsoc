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
    const body = stage("Go Fish with Chip Chance", "Top-down card table · your avatar stays off-screen");
    const deck = shuffle(RANKS.flatMap((rank) => SUITS.map((suit) => ({ rank, suit }))));
    const state = { player: deck.splice(0, 7), npc: deck.splice(0, 7), deck, playerBooks: 0, npcBooks: 0, busy: false, discard: null };
    body.innerHTML = `<div class="snug-card-table"><div class="snug-opponent" data-voice-uid="npc-chip-chance" data-expression="calm"><div class="snug-opponent-avatar"></div><span class="snug-opponent-name">Chip Chance</span><span class="snug-opponent-cards"></span></div><div class="snug-table-deck"><b>Draw pile</b></div><div class="snug-table-discard"><b>Books</b></div><div class="snug-books"></div><div class="snug-hand"></div><div class="snug-fish-actions"><button type="button" data-fish-draw>Go Fish</button></div></div>`;
    const table = body.querySelector(".snug-card-table"), opponent = table.querySelector(".snug-opponent");
    const updateBooks = (who) => {
      const hand = state[who], counts = new Map(); hand.forEach((card) => counts.set(card.rank, (counts.get(card.rank) || 0) + 1));
      for (const [rank, count] of counts) if (count === 4) {
        state[who] = hand.filter((card) => card.rank !== rank); state[`${who}Books`] += 1; state.discard = { rank, suit: "★" };
        animateCardMove(table, state.discard, "discard");
        setExpression(opponent, who === "npc" ? "happy" : "sad");
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

  const custom = { "go-fish": startGoFish, "tic-tac-toe": startTicTacToe, "connect-four": startConnectFour, "stargazing": startStargazing };
  const installCards = (root=document) => root.querySelectorAll?.(".practice-grid").forEach((grid)=>{
    if(grid.parentElement.querySelector(".snug-custom-games"))return;
    const section=document.createElement("section");section.className="snug-custom-games";section.innerHTML=`<small>Controlled-camera sprite stages</small><div class="snug-custom-game-grid">${[["go-fish","Go Fish","3D-flip sprite cards · Chip Chance","♠"],["tic-tac-toe","Tic-Tac-Toe","Flat garden board","✿"],["connect-four","Connect Four","Top-down coin board","●"],["stargazing","Stargazing","First-person reticle view","✦"]].map(([id,name,note,icon])=>`<button type="button" data-snug-stage="${id}"><i>${icon}</i><span><b>${name}</b><small>${note}</small></span></button>`).join("")}</div>`;grid.after(section);
    section.querySelectorAll("[data-snug-stage]").forEach(button=>button.addEventListener("click",()=>custom[button.dataset.snugStage]?.()));
  });

  window.addEventListener("snug-speaking-players",event=>{speakingUids=new Set(event.detail?.uids||[]);document.querySelectorAll(".snug-opponent[data-voice-uid]").forEach(node=>node.classList.toggle("speaking",speakingUids.has(node.dataset.voiceUid)));});
  const observer=new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{if(node.nodeType===1)installCards(node);})));observer.observe(document.documentElement,{childList:true,subtree:true});
  document.addEventListener("click",event=>{const button=event.target.closest?.("[data-solo-game]");if(!button)return;const veil=document.createElement("div");veil.className="snug-stage is-on";veil.style.background="#111";veil.style.zIndex="690";document.body.appendChild(veil);hidePlayer();setTimeout(()=>veil.remove(),520);const watch=setInterval(()=>{if(!document.querySelector(".practice-live")){clearInterval(watch);restorePlayer();}},500);setTimeout(()=>{clearInterval(watch);restorePlayer();},180000);},true);
  installCards();
})();

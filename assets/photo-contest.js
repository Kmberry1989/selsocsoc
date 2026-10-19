/* assets/photo-contest.js — Lyla Lens's weekly themed photo contest.
 *
 * Players submit one selfie from their expression photos each week, everyone
 * votes once, and the winner gets 100 shells + a trophy. Themes rotate weekly.
 * Firestore (photoContestEntries / photoContestVotes / photoContestWinners)
 * when signed in; localStorage fallback when offline or signed out.
 */
(() => {
  if (window.__snugPhotoContest) return;

  const THEMES = [
    "Best sunset selfie",
    "Funniest pet pic",
    "Best festival outfit",
    "Coziest home",
    "Silliest face",
    "Best friend duo",
  ];
  const WEEK_MS = 7 * 24 * 3600 * 1000;
  const WINNER_SHELLS = 100;
  const EXPRESSIONS = ["calm", "happy", "sad", "angry", "cheeky", "laughter"];
  const LS_PREFIX = "snugPhotoContest:";

  const weekId = (when = Date.now()) => Math.floor(when / WEEK_MS);
  const themeFor = (w) => THEMES[((w % THEMES.length) + THEMES.length) % THEMES.length];
  const weekEndsAt = (w) => (w + 1) * WEEK_MS;

  const state = {
    root: null, session: null, view: "entries",
    entries: [], winners: [], myEntry: null, myVote: null,
    myPhotos: {}, trophies: [], status: "", busy: false,
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = (value) => { const n = document.createElement("span"); n.textContent = String(value ?? ""); return n.innerHTML; };
  const signedIn = () => Boolean(state.session?.user && state.session?.uid);

  // ---------- Firestore REST helpers (same pattern as painting-mode.js) ----------
  function firebaseValue(value) {
    if (value === null || value === undefined) return { nullValue: null };
    if (typeof value === "boolean") return { booleanValue: value };
    if (typeof value === "number") return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
    if (typeof value === "string") return { stringValue: value };
    if (Array.isArray(value)) return { arrayValue: { values: value.map(firebaseValue) } };
    return { mapValue: { fields: Object.fromEntries(Object.entries(value).map(([k, v]) => [k, firebaseValue(v)])) } };
  }
  function decodeValue(value = {}) {
    if ("stringValue" in value) return value.stringValue;
    if ("integerValue" in value) return Number(value.integerValue);
    if ("doubleValue" in value) return Number(value.doubleValue);
    if ("booleanValue" in value) return value.booleanValue;
    if ("nullValue" in value) return null;
    if (value.arrayValue) return (value.arrayValue.values || []).map(decodeValue);
    if (value.mapValue) return Object.fromEntries(Object.entries(value.mapValue.fields || {}).map(([k, v]) => [k, decodeValue(v)]));
    return null;
  }
  const decodeFields = (fields) => Object.fromEntries(Object.entries(fields || {}).map(([k, v]) => [k, decodeValue(v)]));
  const project = () => state.session?.projectId || state.session?.app?.options?.projectId;
  const docsBase = () => `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(project())}/databases/(default)/documents`;
  async function headers() {
    if (!state.session?.user) throw Error("Sign in to Firebase to enter the contest.");
    return { "Content-Type": "application/json", Authorization: `Bearer ${await state.session.user.getIdToken()}` };
  }
  const entryUrl = (id) => `${docsBase()}/photoContestEntries/${encodeURIComponent(id)}`;
  const voteUrl = (id) => `${docsBase()}/photoContestVotes/${encodeURIComponent(id)}`;
  const winnerUrl = (id) => `${docsBase()}/photoContestWinners/${encodeURIComponent(id)}`;
  const playerUrl = (uid) => `${docsBase()}/players/${encodeURIComponent(uid)}`;

  async function runQuery(collection, whereField, whereValue, orderField, orderDir, limit) {
    const q = { from: [{ collectionId: collection }], limit: limit || 50 };
    if (whereField) q.where = { fieldFilter: { field: { fieldPath: whereField }, op: "EQUAL", value: firebaseValue(whereValue) } };
    if (orderField) q.orderBy = [{ field: { fieldPath: orderField }, direction: orderDir || "DESCENDING" }];
    const res = await fetch(`${docsBase()}:runQuery`, { method: "POST", headers: await headers(), body: JSON.stringify({ structuredQuery: q }) });
    if (!res.ok) throw Error(`Contest data unavailable (${res.status}).`);
    return (await res.json()).filter((r) => r.document).map((r) => ({ id: r.document.name.split("/").pop(), ...decodeFields(r.document.fields) }));
  }

  // ---------- localStorage fallback ----------
  const lsGet = (key, fallback) => { try { const v = localStorage.getItem(LS_PREFIX + key); return v ? JSON.parse(v) : fallback; } catch { return fallback; } };
  const lsSet = (key, value) => { try { localStorage.setItem(LS_PREFIX + key, JSON.stringify(value)); } catch { /* storage full: ignore */ } };

  // ---------- expression photos ----------
  async function loadMyPhotos() {
    state.myPhotos = {};
    if (!signedIn()) return;
    try {
      const token = await state.session.user.getIdToken();
      const docRes = await fetch(playerUrl(state.session.uid), { headers: { Authorization: `Bearer ${token}` } });
      if (!docRes.ok) return;
      const fields = decodeFields((await docRes.json()).fields || {});
      const photos = fields.expressionPhotos;
      if (!photos || typeof photos !== "object") return;
      const bucket = state.session?.app?.options?.storageBucket;
      if (!bucket) return;
      await Promise.all(EXPRESSIONS.map(async (expression) => {
        const path = photos[expression]?.path;
        if (!path) return;
        try {
          const res = await fetch(`https://firebasestorage.googleapis.com/v0/b/${encodeURIComponent(bucket)}/o/${encodeURIComponent(path)}?alt=media`, { headers: { Authorization: `Firebase ${token}` } });
          if (res.ok) state.myPhotos[expression] = URL.createObjectURL(await res.blob());
        } catch { /* one missing photo never breaks entry */ }
      }));
    } catch { /* offline: entry unavailable */ }
  }

  function thumbnailOf(objectUrl, maxSize = 360) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        try {
          const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(img.width * scale));
          canvas.height = Math.max(1, Math.round(img.height * scale));
          canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
          let quality = 0.72, url = canvas.toDataURL("image/jpeg", quality);
          while (url.length > 150000 && quality > 0.4) { quality -= 0.12; url = canvas.toDataURL("image/jpeg", quality); }
          resolve(url);
        } catch (e) { reject(e); }
      };
      img.onerror = reject;
      img.src = objectUrl;
    });
  }

  // ---------- data load ----------
  async function loadAll() {
    const w = weekId();
    state.entries = []; state.winners = []; state.myEntry = null; state.myVote = null; state.trophies = [];
    if (signedIn()) {
      try {
        const [entries, winners, myVoteDoc] = await Promise.all([
          runQuery("photoContestEntries", "weekId", w, "votes", "DESCENDING", 60).catch(() => []),
          runQuery("photoContestWinners", null, null, "weekId", "DESCENDING", 8).catch(() => []),
          fetch(voteUrl(`${w}_${state.session.uid}`), { headers: await headers() }).then((r) => (r.ok ? r.json() : null)).catch(() => null),
        ]);
        state.entries = entries;
        state.winners = winners;
        state.myEntry = entries.find((e) => e.uid === state.session.uid) || null;
        state.myVote = myVoteDoc ? decodeFields(myVoteDoc.fields || {}).entryId || null : null;
        // trophies from player doc
        try {
          const token = await state.session.user.getIdToken();
          const pr = await fetch(playerUrl(state.session.uid), { headers: { Authorization: `Bearer ${token}` } });
          if (pr.ok) state.trophies = decodeFields((await pr.json()).fields || {}).contestTrophies || [];
        } catch { /* trophies stay empty */ }
      } catch (e) { state.status = e instanceof Error ? e.message : "Contest data unavailable."; }
    } else {
      state.entries = lsGet(`entries:${w}`, []);
      state.winners = lsGet("winners", []);
      state.myEntry = state.entries.find((e) => e.uid === "local") || null;
      state.myVote = lsGet(`vote:${w}`, null);
      state.trophies = lsGet("trophies", []);
    }
  }

  // ---------- actions ----------
  async function submitEntry(expression) {
    if (state.busy) return;
    const objectUrl = state.myPhotos[expression];
    if (!objectUrl) { state.status = "That photo is not available."; renderStatus(); return; }
    state.busy = true; state.status = "Preparing your entry…"; render();
    try {
      const photo = await thumbnailOf(objectUrl);
      const w = weekId();
      const name = state.session?.playerName || state.session?.displayName || "Neighbor";
      if (signedIn()) {
        const id = `${w}_${state.session.uid}`;
        const payload = { fields: firebaseValue({ weekId: w, uid: state.session.uid, playerName: name, expression, photo, votes: state.myEntry?.votes || 0, createdAt: Date.now(), theme: themeFor(w) }) };
        const res = await fetch(entryUrl(id), { method: "PATCH", headers: await headers(), body: JSON.stringify(payload) });
        if (!res.ok) throw Error(`Entry not saved (${res.status}).`);
        state.myEntry = { id, weekId: w, uid: state.session.uid, playerName: name, expression, photo, votes: state.myEntry?.votes || 0, createdAt: Date.now(), theme: themeFor(w) };
      } else {
        state.myEntry = { id: `local:${w}`, weekId: w, uid: "local", playerName: name, expression, photo, votes: 0, createdAt: Date.now(), theme: themeFor(w) };
        const rest = state.entries.filter((e) => e.uid !== "local");
        state.entries = [...rest, state.myEntry];
        lsSet(`entries:${w}`, state.entries);
      }
      state.status = "You're in! Good luck.";
      state.view = "entries";
    } catch (e) { state.status = e instanceof Error ? e.message : "Entry failed."; }
    finally { state.busy = false; render(); }
  }

  async function vote(entryId) {
    if (state.busy || state.myVote) return;
    state.busy = true;
    try {
      const w = weekId();
      if (signedIn()) {
        const voterId = `${w}_${state.session.uid}`;
        const vres = await fetch(voteUrl(voterId), { method: "PATCH", headers: await headers(), body: JSON.stringify({ fields: firebaseValue({ weekId: w, voterUid: state.session.uid, entryId, createdAt: Date.now() }) }) });
        if (!vres.ok) throw Error(`Vote not counted (${vres.status}).`);
        const entry = state.entries.find((e) => e.id === entryId);
        if (entry) {
          const next = (entry.votes || 0) + 1;
          await fetch(`${entryUrl(entryId)}?updateMask.fieldPaths=votes`, { method: "PATCH", headers: await headers(), body: JSON.stringify({ fields: firebaseValue({ votes: next }) }) });
          entry.votes = next;
        }
        state.myVote = entryId;
      } else {
        const entry = state.entries.find((e) => e.id === entryId);
        if (entry) entry.votes = (entry.votes || 0) + 1;
        lsSet(`entries:${w}`, state.entries);
        lsSet(`vote:${w}`, entryId);
        state.myVote = entryId;
      }
      state.status = "Vote counted!";
    } catch (e) { state.status = e instanceof Error ? e.message : "Vote failed."; }
    finally { state.busy = false; render(); }
  }

  // Finalize last week: any client may compute the winner (idempotent).
  async function finalizeLastWeek() {
    const last = weekId() - 1;
    if (last < 0) return;
    try {
      if (signedIn()) {
        const existing = await fetch(winnerUrl(String(last)), { headers: await headers() }).then((r) => (r.ok ? r.json() : null)).catch(() => null);
        if (existing) { await awardIfWinner(decodeFields(existing.fields || {})); return; }
        const entries = await runQuery("photoContestEntries", "weekId", last, "votes", "DESCENDING", 60).catch(() => []);
        if (!entries.length) return;
        const top = entries[0];
        const winner = { weekId: last, theme: themeFor(last), winnerUid: top.uid, winnerName: top.playerName || "Neighbor", votes: top.votes || 0, photo: top.photo || "", awarded: {} };
        await fetch(winnerUrl(String(last)), { method: "PATCH", headers: await headers(), body: JSON.stringify({ fields: firebaseValue(winner) }) }).catch(() => {});
        await awardIfWinner(winner);
      } else {
        const winners = lsGet("winners", []);
        if (winners.some((x) => x.weekId === last)) return;
        const entries = lsGet(`entries:${last}`, []);
        if (!entries.length) return;
        const top = [...entries].sort((a, b) => (b.votes || 0) - (a.votes || 0))[0];
        const winner = { weekId: last, theme: themeFor(last), winnerUid: top.uid, winnerName: top.playerName || "Neighbor", votes: top.votes || 0, photo: top.photo || "" };
        lsSet("winners", [...winners, winner]);
        awardIfWinner(winner);
      }
    } catch { /* finalization is best-effort */ }
  }

  async function awardIfWinner(winner) {
    const me = signedIn() ? state.session.uid : "local";
    if (winner.winnerUid !== me) return;
    if (lsGet(`awarded:${winner.weekId}`, false)) return;
    window.dispatchEvent(new CustomEvent("snug-award-coins", { detail: { amount: WINNER_SHELLS, message: `Photo Contest winner · +${WINNER_SHELLS} shells` } }));
    lsSet(`awarded:${winner.weekId}`, true);
    const trophy = { weekId: winner.weekId, theme: winner.theme, at: Date.now() };
    if (signedIn()) {
      try {
        const token = await state.session.user.getIdToken();
        const pr = await fetch(playerUrl(me), { headers: { Authorization: `Bearer ${token}` } });
        const current = pr.ok ? (decodeFields((await pr.json()).fields || {}).contestTrophies || []) : [];
        if (!current.some((t) => t.weekId === winner.weekId)) {
          await fetch(`${playerUrl(me)}?updateMask.fieldPaths=contestTrophies`, { method: "PATCH", headers: await headers(), body: JSON.stringify({ fields: firebaseValue({ contestTrophies: [...current, trophy] }) }) });
        }
        state.trophies = [...current, trophy].filter((t, i, a) => a.findIndex((x) => x.weekId === t.weekId) === i);
      } catch { /* trophy persisted locally below */ }
    } else {
      const local = lsGet("trophies", []);
      if (!local.some((t) => t.weekId === winner.weekId)) { local.push(trophy); lsSet("trophies", local); }
      state.trophies = local;
    }
  }

  // ---------- UI ----------
  function countdown() {
    const ms = Math.max(0, weekEndsAt(weekId()) - Date.now());
    const d = Math.floor(ms / 86400000), h = Math.floor((ms % 86400000) / 3600000);
    return d > 0 ? `${d}d ${h}h left` : `${h}h left`;
  }

  function entryCard(entry) {
    const mine = signedIn() ? entry.uid === state.session.uid : entry.uid === "local";
    const voted = state.myVote === entry.id;
    return `<article class="pc-entry${mine ? " pc-mine" : ""}">
      ${entry.photo ? `<img src="${entry.photo}" alt="Contest entry by ${esc(entry.playerName)}" loading="lazy">` : `<div class="pc-noimg">No photo</div>`}
      <span><b>${esc(entry.playerName || "Neighbor")}</b><small>${entry.votes || 0} vote${(entry.votes || 0) === 1 ? "" : "s"}${mine ? " · yours" : ""}</small></span>
      ${state.myVote
        ? `<button type="button" disabled>${voted ? "Voted ✓" : "Vote"}</button>`
        : `<button type="button" data-pc-vote="${esc(entry.id)}"${mine ? " disabled title=\"You can't vote for yourself\"" : ""}>Vote</button>`}
    </article>`;
  }

  function entriesView() {
    const w = weekId();
    const sorted = [...state.entries].sort((a, b) => (b.votes || 0) - (a.votes || 0) || (a.createdAt || 0) - (b.createdAt || 0));
    return `<section class="pc-section">
      <div class="pc-theme"><small>This week's theme · ${esc(countdown())}</small><h2>${esc(themeFor(w))}</h2>
      <p>${state.myEntry ? "You're entered — rally your votes!" : "Pick one of your expression photos to enter."}</p></div>
      <div class="pc-actions">
        <button type="button" data-pc-view="enter" class="pc-primary">${state.myEntry ? "Change entry" : "Enter the contest"}</button>
        <button type="button" data-pc-view="winners">Past winners</button>
      </div>
      ${sorted.length ? `<div class="pc-grid">${sorted.map(entryCard).join("")}</div>`
        : `<div class="pc-empty">No entries yet — be the first!</div>`}
      ${!signedIn() ? `<p class="pc-note">Signed out — entries and votes stay on this device. Sign in to share with everyone.</p>` : ""}
    </section>`;
  }

  function enterView() {
    const photos = EXPRESSIONS.filter((e) => state.myPhotos[e]);
    return `<section class="pc-section">
      <div class="pc-theme"><small>Enter · ${esc(themeFor(weekId()))}</small><h2>Choose your shot</h2></div>
      <div class="pc-actions"><button type="button" data-pc-view="entries">← Back to entries</button></div>
      ${photos.length ? `<div class="pc-grid">${photos.map((e) => `
        <article class="pc-entry"><img src="${state.myPhotos[e]}" alt="${esc(e)} expression" loading="lazy">
        <span><b>${esc(e[0].toUpperCase() + e.slice(1))}</b></span>
        <button type="button" data-pc-enter="${esc(e)}" class="pc-primary">Enter this photo</button></article>`).join("")}</div>`
        : `<div class="pc-empty">No expression photos yet.<br>Visit <b>Lyla's Studio</b> in town to take some first.</div>`}
    </section>`;
  }

  function winnersView() {
    return `<section class="pc-section">
      <div class="pc-theme"><small>Hall of fame</small><h2>Past winners</h2></div>
      <div class="pc-actions"><button type="button" data-pc-view="entries">← Back to entries</button></div>
      ${state.trophies.length ? `<div class="pc-trophies"><small>Your trophies</small><div>${state.trophies.map((t) => `<span class="pc-trophy" title="${esc(t.theme)}">🏆<small>Wk ${t.weekId}</small></span>`).join("")}</div></div>` : ""}
      ${state.winners.length ? `<div class="pc-grid">${state.winners.map((x) => `
        <article class="pc-entry">${x.photo ? `<img src="${x.photo}" alt="Winning photo" loading="lazy">` : `<div class="pc-noimg">🏆</div>`}
        <span><b>${esc(x.winnerName || "Neighbor")}</b><small>${esc(x.theme || "")} · ${x.votes || 0} votes</small></span></article>`).join("")}</div>`
        : `<div class="pc-empty">No winners crowned yet.</div>`}
    </section>`;
  }

  function render() {
    if (!state.root) return;
    $(".pc-content", state.root).innerHTML = state.view === "enter" ? enterView() : state.view === "winners" ? winnersView() : entriesView();
    renderStatus();
  }
  function renderStatus() { const n = $(".pc-status", state.root); if (n) n.textContent = state.status; }

  function build() {
    if (state.root) return;
    const style = document.createElement("style");
    style.textContent = `
      .photo-contest{position:fixed;inset:0;z-index:300;display:flex;align-items:flex-end;justify-content:center;background:#17202166;}
      .photo-contest[hidden]{display:none;}
      .pc-sheet{background:#fffdf8;border-radius:26px 26px 0 0;width:100%;max-width:480px;max-height:84dvh;display:flex;flex-direction:column;box-shadow:0 -10px 40px #16202133;}
      .pc-head{display:flex;align-items:center;justify-content:space-between;padding:14px 18px 6px;}
      .pc-head small{text-transform:uppercase;letter-spacing:.1em;color:#5c8d65;font-size:11px;font-weight:900;}
      .pc-head h2{margin:2px 0 0;font-size:20px;}
      .pc-head button{border:0;background:#f5f0e7;border-radius:50%;width:36px;height:36px;font-size:16px;}
      .pc-scroll{overflow:auto;padding:6px 18px calc(18px + env(safe-area-inset-bottom,0px));}
      .pc-theme h2{margin:2px 0 6px;font-size:22px;}
      .pc-theme p{color:#687276;font-size:13px;margin:0 0 10px;}
      .pc-actions{display:flex;gap:8px;margin-bottom:12px;}
      .pc-actions button,.pc-entry button{border:1px solid #d9dedb;background:#fffdf8;border-radius:12px;padding:9px 12px;font-size:12px;font-weight:800;}
      .pc-primary,.pc-actions .pc-primary,.pc-entry .pc-primary{background:#e76854!important;border-color:#e76854!important;color:#fff!important;}
      .pc-entry button:disabled{opacity:.55;}
      .pc-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;}
      .pc-entry{background:#f5f0e7;border-radius:14px;padding:8px;display:grid;gap:6px;}
      .pc-entry.pc-mine{outline:2px solid #e76854;}
      .pc-entry img{width:100%;aspect-ratio:1;object-fit:cover;border-radius:10px;background:#e8ddd0;}
      .pc-noimg{display:grid;place-items:center;aspect-ratio:1;border-radius:10px;background:#e8ddd0;font-size:28px;}
      .pc-entry span{display:grid;line-height:1.25;}
      .pc-entry b{font-size:12px;}
      .pc-entry small{color:#687276;font-size:10px;}
      .pc-empty{background:#f5f0e7;border-radius:14px;padding:22px;text-align:center;color:#687276;font-size:13px;line-height:1.5;}
      .pc-note{color:#687276;font-size:11px;text-align:center;}
      .pc-status{min-height:18px;text-align:center;color:#687276;font-size:12px;padding:6px 0 2px;}
      .pc-trophies{margin-bottom:12px;}
      .pc-trophies small{text-transform:uppercase;letter-spacing:.08em;font-size:10px;font-weight:800;color:#765617;}
      .pc-trophies>div{display:flex;gap:8px;margin-top:6px;flex-wrap:wrap;}
      .pc-trophy{display:grid;place-items:center;background:#fff3d6;border:1px solid #e4ad45;border-radius:12px;width:52px;height:52px;font-size:22px;}
      .pc-trophy small{font-size:8px;color:#765617;}
      .contest-launch{display:flex;align-items:center;gap:8px;width:100%;text-align:left;background:#f5f0e7;border:1px solid #d9dedb;border-radius:13px;min-height:52px;margin-top:8px;padding:8px 11px;}
      .contest-launch i{font-style:normal;font-size:20px;}
      .contest-launch span{display:grid;flex:1;line-height:1.25;}
      .contest-launch b{font-size:12px;}
      .contest-launch small{color:#687276;font-size:10px;}
      .contest-launch strong{color:#b84233;font-size:11px;font-weight:900;}
    `;
    document.head.appendChild(style);
    const root = document.createElement("section");
    root.className = "photo-contest";
    root.hidden = true;
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", "Photo Contest");
    root.innerHTML = `<div class="pc-sheet">
      <div class="pc-head"><span><small>Lyla Lens presents</small><h2>Photo Contest</h2></span><button type="button" data-pc-close aria-label="Close">×</button></div>
      <div class="pc-scroll"><div class="pc-content"></div><p class="pc-status" role="status"></p></div>
    </div>`;
    root.addEventListener("click", (event) => {
      if (event.target === root) { close(); return; }
      const closer = event.target.closest("[data-pc-close]");
      if (closer) { close(); return; }
      const view = event.target.closest("[data-pc-view]");
      if (view) { state.view = view.dataset.pcView; state.status = ""; render(); return; }
      const enter = event.target.closest("[data-pc-enter]");
      if (enter) { submitEntry(enter.dataset.pcEnter); return; }
      const voteBtn = event.target.closest("[data-pc-vote]");
      if (voteBtn && !voteBtn.disabled) { vote(voteBtn.dataset.pcVote); return; }
    });
    document.body.appendChild(root);
    state.root = root;
  }

  async function open() {
    build();
    state.root.hidden = false;
    state.view = "entries";
    state.status = "Loading…";
    render();
    await Promise.all([loadMyPhotos(), loadAll()]);
    state.status = "";
    render();
    finalizeLastWeek().then(() => { if (!state.root.hidden) render(); });
  }
  function close() { if (state.root) state.root.hidden = true; }

  // ---------- install: Photo Contest button in play panels ----------
  function install(root = document) {
    root.querySelectorAll?.(".play-panel").forEach((panel) => {
      if (panel.querySelector("[data-pc-open]")) return;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "contest-launch";
      button.setAttribute("data-pc-open", "");
      button.innerHTML = `<i aria-hidden="true">📸</i><span><b>Photo Contest</b><small>Lyla's weekly theme · vote for winners</small></span><strong>Enter</strong>`;
      button.addEventListener("click", (e) => { e.preventDefault(); open(); });
      panel.appendChild(button);
    });
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-pc-open]")) { event.preventDefault(); open(); }
  }, true);
  window.addEventListener("snug-session", (event) => { state.session = event.detail; });
  const observer = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => { if (node.nodeType === 1) install(node); })));
  observer.observe(document.documentElement, { childList: true, subtree: true });
  build();
  install();
  if (window.__snugSession) state.session = window.__snugSession;

  window.__snugPhotoContest = { open, close, refresh: loadAll, weekId, themeFor };
})();

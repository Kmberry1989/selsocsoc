(() => {
  if (window.__snugSeasonalEvents) return;
  // Seasonal Events: the 4-season cycle (90s each) drives themed activities.
  // Spring: Flower Festival (collect petals, turn in to Fern Bramble).
  // Summer: Fishing Tournament (biggest catch wins).
  // Autumn: Harvest Market (seasonal shop; leaves already fall in multiplayer.js).
  // Winter: Snowball Championship (snowball toss scoring).
  const SEASON_LENGTH = 90000;
  const SEASONS = ["Spring", "Summer", "Autumn", "Winter"];
  const EVENTS = [
    { name: "Flower Festival", emoji: "\u{1F338}", blurb: "Petals are drifting! Tap them to collect, then visit Fern Bramble to turn them in for shells." },
    { name: "Fishing Tournament", emoji: "\u{1F3A3}", blurb: "Biggest catch wins! Every fish you land counts toward the tournament." },
    { name: "Harvest Market", emoji: "\u{1F342}", blurb: "The Harvest Market is open! Autumn-themed decor, only while leaves fall." },
    { name: "Snowball Championship", emoji: "\u2744\uFE0F", blurb: "Snowball fight season! Play Snowball Toss \u2014 most hits takes the crown." },
  ];
  const STORE_KEY = "snug-seasonal-events-v1";
  const state = {
    season: -1,
    session: null,
    petals: 0,          // spring: petals held
    petalsTurnedIn: 0,  // spring: lifetime turn-ins this season
    catches: 0,         // summer: fish caught this season
    biggestCatch: 0,    // summer: largest catch size this season
    snowHits: 0,        // winter: snowball hits this season
    totals: loadTotals(),
    petalTimer: null,
    bannerEl: null,
    panelEl: null,
  };
  function loadTotals() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return { spring: 0, summer: 0, autumn: 0, winter: 0 };
  }
  function saveTotals() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state.totals)); } catch {}
  }
  function getSeason() { return Math.floor(Date.now() / SEASON_LENGTH) % 4; }
  function toast(message) {
    window.dispatchEvent(new CustomEvent("snug-toast", { detail: { message } }));
  }
  function awardShells(amount, message) {
    window.dispatchEvent(new CustomEvent("snug-award-coins", { detail: { amount, message } }));
  }
  // ---- Season banner -------------------------------------------------
  function showBanner(season) {
    const ev = EVENTS[season];
    closeBanner();
    const el = document.createElement("section");
    el.className = "season-banner";
    el.setAttribute("role", "status");
    el.innerHTML = `<div class="season-banner-card"><span class="season-banner-emoji" aria-hidden="true">${ev.emoji}</span><span><small>Pip Parade presents</small><b>${ev.name}</b><i>${SEASONS[season]} has arrived</i></span><button type="button" data-season-details>Details</button><button type="button" data-season-close aria-label="Dismiss">\u00d7</button></div>`;
    document.body.appendChild(el);
    state.bannerEl = el;
    el.addEventListener("click", (e) => {
      if (e.target.closest("[data-season-close]")) closeBanner();
      if (e.target.closest("[data-season-details]")) { closeBanner(); openPanel(); }
    });
    setTimeout(closeBanner, 9000);
  }
  function closeBanner() {
    if (state.bannerEl) { state.bannerEl.remove(); state.bannerEl = null; }
  }
  // ---- Event details panel -------------------------------------------
  function openPanel() {
    closePanel();
    const season = state.season < 0 ? getSeason() : state.season;
    const ev = EVENTS[season];
    const el = document.createElement("section");
    el.className = "season-panel";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", `${ev.name} details`);
    el.innerHTML = `<div class="season-panel-card">
      <header><span><small>Seasonal event</small><b>${ev.emoji} ${ev.name}</b></header><button type="button" data-season-panel-close aria-label="Close">\u00d7</button></div>
      <p>${ev.blurb}</p>
      <div class="season-panel-stats">${seasonStatsHtml(season)}</div>
      <div class="season-panel-actions">${seasonActionsHtml(season)}</div>
      <p class="season-panel-totals">All-time ${SEASONS[season].toLowerCase()} participation: <b>${state.totals[SEASONS[season].toLowerCase()]}</b></p>
    </div>`;
    document.body.appendChild(el);
    state.panelEl = el;
    el.addEventListener("click", onPanelClick);
  }
  function closePanel() {
    if (state.panelEl) { state.panelEl.remove(); state.panelEl = null; }
  }
  function seasonStatsHtml(season) {
    if (season === 0) return `<span><b>${state.petals}</b><small>petals held</small></span><span><b>${state.petalsTurnedIn}</b><small>turned in</small></span>`;
    if (season === 1) return `<span><b>${state.catches}</b><small>fish caught</small></span><span><b>${state.biggestCatch.toFixed(1)}in</b><small>biggest</small></span>`;
    if (season === 2) return `<span><b>${state.totals.autumn}</b><small>market visits</small></span>`;
    return `<span><b>${state.snowHits}</b><small>snowball hits</small></span>`;
  }
  function seasonActionsHtml(season) {
    if (season === 0) return `<button type="button" data-season-turnin ${state.petals ? "" : "disabled"}>Turn in ${state.petals} petals to Fern</button>`;
    if (season === 2) return `<button type="button" data-season-market>Open Harvest Market</button>`;
    return "";
  }
  function onPanelClick(e) {
    if (e.target.closest("[data-season-panel-close]")) { closePanel(); return; }
    if (e.target.closest("[data-season-turnin]")) { turnInPetals(); return; }
    if (e.target.closest("[data-season-market]")) { openMarket(); return; }
    if (e.target.closest("[data-market-buy]")) {
      const btn = e.target.closest("[data-market-buy]");
      buyMarketItem(btn.dataset.marketBuy);
      return;
    }
  }
  // ---- Spring: Flower Festival ----------------------------------------
  const PETAL_COLORS = ["#f4a7c3", "#f9d976", "#c3b2f7", "#f7b267", "#a8e6a3"];
  function spawnPetal() {
    if (getSeason() !== 0) return;
    if (document.querySelectorAll(".season-petal").length >= 6) return;
    const el = document.createElement("button");
    el.type = "button";
    el.className = "season-petal";
    el.setAttribute("aria-label", "Collect flower petal");
    el.textContent = "\u273F";
    el.style.left = `${8 + Math.random() * 84}%`;
    el.style.top = `${18 + Math.random() * 45}%`;
    el.style.color = PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)];
    el.style.fontSize = `${22 + Math.random() * 18}px`;
    el.addEventListener("click", () => {
      state.petals += 1;
      state.totals.spring += 1; saveTotals();
      el.remove();
      toast(`Petal collected \u00b7 ${state.petals} held`);
      window.__snugGameShowAudio?.collect?.();
    });
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 12000);
  }
  function turnInPetals() {
    if (!state.petals) return;
    const shells = state.petals * 3;
    state.petalsTurnedIn += state.petals;
    state.petals = 0;
    awardShells(shells, `Fern Bramble \u00b7 ${shells} shells for petals`);
    toast(`Fern Bramble thanks you \u00b7 +${shells} shells`);
    closePanel(); openPanel();
  }
  // ---- Summer: Fishing Tournament --------------------------------------
  function onFishingLoot(e) {
    if (getSeason() !== 1) return;
    const detail = e.detail || {};
    state.catches += 1;
    state.totals.summer += 1; saveTotals();
    // Size isn't in the event payload; derive a fun tournament size.
    const size = 4 + Math.random() * 20 + (String(detail.name || "").length % 7);
    if (size > state.biggestCatch) {
      state.biggestCatch = size;
      toast(`Tournament! New biggest catch \u00b7 ${size.toFixed(1)}in`);
    }
  }
  // ---- Autumn: Harvest Market ------------------------------------------
  const MARKET_ITEMS = [
    { id: "harvest-wreath", name: "Harvest Wreath", cost: 45, color: "#c9762e", blurb: "Autumn door wreath" },
    { id: "pumpkin-stack", name: "Pumpkin Stack", cost: 60, color: "#e07b2a", blurb: "Porch pumpkin trio" },
    { id: "leaf-garland", name: "Leaf Garland", cost: 38, color: "#a8562a", blurb: "Golden leaf swag" },
    { id: "cornucopia", name: "Cornucopia", cost: 75, color: "#8a5a2b", blurb: "Horn of plenty" },
    { id: "apple-basket", name: "Apple Basket", cost: 30, color: "#b8442f", blurb: "Orchard basket" },
    { id: "scarecrow-mini", name: "Mini Scarecrow", cost: 90, color: "#7a6a3a", blurb: "Tiny field guardian" },
  ];
  function openMarket() {
    closePanel();
    state.totals.autumn += 1; saveTotals();
    const el = document.createElement("section");
    el.className = "season-panel";
    el.setAttribute("role", "dialog");
    el.setAttribute("aria-label", "Harvest Market");
    el.innerHTML = `<div class="season-panel-card">
      <header><span><small>Autumn only</small><b>\u{1F342} Harvest Market</b></header><button type="button" data-season-panel-close aria-label="Close">\u00d7</button></div>
      <p>Pip Parade's autumn stalls. Decor goes to your home inventory.</p>
      <div class="season-market-grid">${MARKET_ITEMS.map(item =>
        `<div class="season-market-item"><span class="season-market-swatch" style="background:${item.color}"></span><span><b>${item.name}</b><small>${item.blurb}</small></span><button type="button" data-market-buy="${item.id}">${item.cost} \u{1F41A}</button></div>`
      ).join("")}</div>
    </div>`;
    document.body.appendChild(el);
    state.panelEl = el;
    el.addEventListener("click", onPanelClick);
  }
  function buyMarketItem(id) {
    const item = MARKET_ITEMS.find(i => i.id === id);
    if (!item) return;
    awardShells(-item.cost, `Harvest Market \u00b7 ${item.name}`);
    toast(`${item.name} added to your home`);
    // Hand off to the home inventory if it can take decor.
    try {
      window.dispatchEvent(new CustomEvent("snug-seasonal-decor", { detail: { id: item.id, name: item.name, color: item.color } }));
    } catch {}
  }
  // ---- Winter: Snowball Championship ------------------------------------
  function onMinigameAchievement(e) {
    if (getSeason() !== 3) return;
    const detail = e.detail || {};
    const game = String(detail.game || detail.name || "").toLowerCase();
    if (!game.includes("snowball")) return;
    const hits = Number(detail.score ?? detail.hits ?? 0);
    if (hits > 0) {
      state.snowHits += hits;
      state.totals.winter += 1; saveTotals();
      toast(`Snowball Championship \u00b7 ${hits} hits (${state.snowHits} total)`);
    }
  }
  // ---- Season lifecycle --------------------------------------------------
  function onSeasonChange(season) {
    // Pay out the previous season's rewards before resetting.
    payoutSeason(state.season);
    state.season = season;
    state.petals = 0; state.petalsTurnedIn = 0;
    state.catches = 0; state.biggestCatch = 0;
    state.snowHits = 0;
    const ev = EVENTS[season];
    showBanner(season);
    // Pip Parade announces it.
    setTimeout(() => toast(`Pip Parade: "${ev.name} is on, neighbor!"`), 1200);
    if (season === 0 && !state.petalTimer) {
      state.petalTimer = setInterval(spawnPetal, 5000);
      spawnPetal();
    }
    if (season !== 0 && state.petalTimer) {
      clearInterval(state.petalTimer); state.petalTimer = null;
      document.querySelectorAll(".season-petal").forEach(el => el.remove());
    }
  }
  function payoutSeason(season) {
    if (season === 1 && state.catches > 0) {
      const prize = 20 + Math.round(state.biggestCatch * 2);
      awardShells(prize, `Fishing Tournament prize \u00b7 +${prize} shells`);
    }
    if (season === 3 && state.snowHits >= 10) {
      const prize = 15 + state.snowHits;
      awardShells(prize, `Snowball Championship prize \u00b7 +${prize} shells`);
    }
    if (season === 0 && state.petalsTurnedIn > 0) {
      const bonus = state.petalsTurnedIn >= 20 ? 25 : 0;
      if (bonus) awardShells(bonus, `Flower Festival bonus \u00b7 +${bonus} shells`);
    }
  }
  function tick() {
    const season = getSeason();
    if (season !== state.season) onSeasonChange(season);
  }
  // ---- Pip Parade notice board hook ---------------------------------------
  // Other modules (or Pip's dialogue) can ask what's on: returns the active event.
  function currentEvent() {
    const season = state.season < 0 ? getSeason() : state.season;
    return { season, seasonName: SEASONS[season], ...EVENTS[season] };
  }
  // ---- Init ----------------------------------------------------------------
  function init() {
    window.addEventListener("snug-fishing-loot", onFishingLoot);
    window.addEventListener("snug-minigame-achievement", onMinigameAchievement);
    window.addEventListener("snug-season", (e) => {
      const s = Number(e.detail?.season);
      if (Number.isInteger(s) && s >= 0 && s < 4 && s !== state.season) onSeasonChange(s);
    });
    window.addEventListener("snug-session", (e) => { state.session = e.detail; });
    if (window.__snugSession) state.session = window.__snugSession;
    // Notice-board button: a small always-available launcher.
    if (!document.querySelector(".season-launcher")) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "season-launcher";
      btn.setAttribute("aria-label", "Seasonal event details");
      btn.textContent = "\u{1F342}";
      btn.addEventListener("click", openPanel);
      document.body.appendChild(btn);
    }
    tick();
    setInterval(tick, 4000);
  }
  // Inject minimal styles matching the game's look.
  function injectStyles() {
    if (document.getElementById("snug-seasonal-styles")) return;
    const css = document.createElement("style");
    css.id = "snug-seasonal-styles";
    css.textContent = `
.season-banner{position:fixed;z-index:120;top:max(env(safe-area-inset-top),10px);left:50%;transform:translateX(-50%);pointer-events:none}
.season-banner-card{pointer-events:auto;display:flex;align-items:center;gap:10px;background:#fffdf8f2;border:1px solid #ffffffb3;border-radius:16px;padding:10px 12px;box-shadow:0 8px 24px #1c2d3226;max-width:min(92vw,420px)}
.season-banner-emoji{font-size:28px}
.season-banner-card span{display:grid;line-height:1.25;flex:1}
.season-banner-card small{text-transform:uppercase;letter-spacing:.08em;color:#687276;font-size:9px;font-weight:800}
.season-banner-card b{font-size:15px}
.season-banner-card i{font-style:normal;color:#687276;font-size:11px}
.season-banner-card button{background:#e76854;color:#fff;border:0;border-radius:10px;padding:8px 12px;font-weight:800;font-size:12px}
.season-banner-card button[data-season-close]{background:transparent;color:#687276;font-size:18px;padding:4px 8px}
.season-panel{position:fixed;z-index:130;inset:0;display:flex;align-items:flex-end;justify-content:center;background:#17202166}
.season-panel-card{background:#fffdf8;border-radius:22px 22px 0 0;padding:16px 16px calc(max(env(safe-area-inset-bottom),14px) + 6px);width:100%;max-width:480px;max-height:82dvh;overflow:auto}
.season-panel-card header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px}
.season-panel-card header span{display:grid;line-height:1.3}
.season-panel-card header small{text-transform:uppercase;letter-spacing:.08em;color:#687276;font-size:9px;font-weight:800}
.season-panel-card header b{font-size:18px}
.season-panel-card header button{background:#f5f0e7;border:0;border-radius:50%;width:32px;height:32px;font-size:16px}
.season-panel-card p{color:#687276;font-size:13px;line-height:1.45;margin:0 0 12px}
.season-panel-stats{display:flex;gap:10px;margin-bottom:12px}
.season-panel-stats span{background:#f5f0e7;border-radius:12px;padding:10px 14px;display:grid;text-align:center;flex:1}
.season-panel-stats b{font-size:18px}
.season-panel-stats small{color:#687276;font-size:10px}
.season-panel-actions button{background:#e76854;color:#fff;border:0;border-radius:12px;padding:12px 16px;font-weight:800;width:100%;font-size:14px}
.season-panel-actions button:disabled{opacity:.5}
.season-panel-totals{margin-top:12px!important;font-size:11px!important}
.season-market-grid{display:grid;gap:8px}
.season-market-item{display:flex;align-items:center;gap:10px;background:#f5f0e7;border-radius:12px;padding:8px 10px}
.season-market-swatch{width:36px;height:36px;border-radius:10px;flex:none}
.season-market-item span:nth-child(2){display:grid;flex:1;line-height:1.25}
.season-market-item b{font-size:13px}
.season-market-item small{color:#687276;font-size:10px}
.season-market-item button{background:#27383b;color:#fff;border:0;border-radius:10px;padding:8px 12px;font-weight:800;font-size:12px;white-space:nowrap}
.season-petal{position:fixed;z-index:110;background:transparent;border:0;cursor:pointer;animation:season-drift 3.2s ease-in-out infinite;filter:drop-shadow(0 2px 4px #0003);padding:8px}
@keyframes season-drift{0%,100%{transform:translateY(0) rotate(-8deg)}50%{transform:translateY(-12px) rotate(8deg)}}
.season-launcher{position:fixed;z-index:100;right:10px;top:110px;width:42px;height:42px;border-radius:50%;background:#fffdf8f2;border:1px solid #ffffffb3;font-size:20px;box-shadow:0 4px 14px #1c2d3226}
@media(prefers-reduced-motion:reduce){.season-petal{animation:none}}`;
    document.head.appendChild(css);
  }
  injectStyles();
  init();
  window.__snugSeasonalEvents = {
    currentEvent,
    openPanel,
    getSeason,
    get stats() {
      return { petals: state.petals, petalsTurnedIn: state.petalsTurnedIn, catches: state.catches, biggestCatch: state.biggestCatch, snowHits: state.snowHits, totals: { ...state.totals } };
    },
  };
})();

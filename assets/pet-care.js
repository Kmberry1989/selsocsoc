(() => {
  if (window.__snugPetCare) return;
  // assets/pet-care.js — Pet care expansion for the adopted cat (Agnes Alley's shelter).
  // Feed, play, and teach tricks. Happy pets follow you; very happy pets bring gifts.
  // State: localStorage + Firebase players/{uid}.pet when signed in.
  const state = { root: null, session: null, pet: null, view: "home", status: "", busy: false, toyTaps: 0, trainingId: null };
  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = value => { const n = document.createElement("span"); n.textContent = String(value ?? ""); return n.innerHTML; };

  const FOODS = [
    { id: "kibble", name: "Kibble", detail: "Everyday crunchies", hunger: 18, happiness: 3, cost: 2, icon: "🍽️" },
    { id: "carrot", name: "Garden carrot", detail: "Fresh from Fern's plots", hunger: 24, happiness: 7, cost: 5, icon: "🥕" },
    { id: "fish", name: "Pond fish", detail: "Bobby would approve", hunger: 32, happiness: 9, cost: 9, icon: "🐟" },
    { id: "treat", name: "Salmon treat", detail: "The good stuff", hunger: 12, happiness: 16, cost: 14, icon: "🍣" },
  ];
  const TRICKS = [
    { id: "sit", name: "Sit", icon: "🪑", needs: 3, reward: 5 },
    { id: "spin", name: "Spin", icon: "🌀", needs: 3, reward: 6 },
    { id: "highfive", name: "High-five", icon: "🐾", needs: 4, reward: 8 },
    { id: "fetch", name: "Fetch", icon: "🎾", needs: 4, reward: 10 },
  ];
  const GIFTS = [
    { kind: "shells", amount: 8, label: "8 shells" },
    { kind: "shells", amount: 14, label: "14 shells" },
    { kind: "shells", amount: 20, label: "20 shells" },
    { kind: "flower", amount: 1, label: "a wildflower" },
  ];

  // ---------- persistence ----------
  const lsKey = () => `snug-pet-care-${state.session?.uid || "guest"}`;
  function defaultPet() {
    return { name: "", hunger: 70, happiness: 60, tricks: {}, foods: { kibble: 3 }, lastTick: Date.now(), lastGiftAt: 0, adoptedAt: Date.now() };
  }
  function loadLocal() {
    try {
      const raw = localStorage.getItem(lsKey());
      if (!raw) return null;
      const pet = { ...defaultPet(), ...JSON.parse(raw) };
      pet.tricks = pet.tricks || {}; pet.foods = pet.foods || {};
      return pet;
    } catch { return null; }
  }
  function saveLocal() {
    try { localStorage.setItem(lsKey(), JSON.stringify(state.pet)); } catch {}
  }
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
  async function loadRemote() {
    try {
      const uid = state.session?.uid, user = state.session?.user;
      if (!uid || !user) return null;
      const project = state.session?.projectId || state.session?.app?.options?.projectId;
      if (!project) return null;
      const token = await user.getIdToken();
      const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(project)}/databases/(default)/documents/players/${encodeURIComponent(uid)}`;
      const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
      if (!res.ok) return null;
      const doc = await res.json();
      const fields = doc.fields || {};
      if (!fields.pet) return null;
      const pet = { ...defaultPet(), ...decodeValue(fields.pet) };
      pet.tricks = pet.tricks || {}; pet.foods = pet.foods || {};
      return pet;
    } catch { return null; }
  }
  async function saveRemote() {
    try {
      const uid = state.session?.uid, user = state.session?.user;
      if (!uid || !user) return;
      const project = state.session?.projectId || state.session?.app?.options?.projectId;
      if (!project) return;
      const token = await user.getIdToken();
      const url = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(project)}/databases/(default)/documents/players/${encodeURIComponent(uid)}?updateMask.fieldPaths=pet`;
      await fetch(url, { method: "PATCH", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }, body: JSON.stringify({ fields: { pet: firebaseValue(state.pet) } }) });
    } catch {}
  }
  function save() { saveLocal(); saveRemote(); }

  // ---------- decay ----------
  function applyDecay() {
    const pet = state.pet; if (!pet) return;
    const mins = (Date.now() - (pet.lastTick || Date.now())) / 60000;
    if (mins < 1) return;
    pet.hunger = Math.max(0, Math.round(pet.hunger - mins / 5));
    pet.happiness = Math.max(0, Math.round(pet.happiness - mins / 12));
    // Hungry cats get grumpy faster
    if (pet.hunger < 25) pet.happiness = Math.max(0, pet.happiness - Math.round(mins / 8));
    pet.lastTick = Date.now();
  }

  // ---------- 3D follower ----------
  function follower() {
    const scene = window.__snugWorld?.scene;
    return scene?.getObjectByName("AdoptedCatFollower") || null;
  }
  function syncFollower() {
    const cat = follower(); if (!cat || !state.pet) return;
    // Happy pets follow; unhappy ones stay home.
    cat.visible = state.pet.happiness > 70;
  }
  function animateTrick(trickId) {
    const cat = follower(); if (!cat) return;
    const start = performance.now(), dur = 900;
    const baseY = cat.position.y, baseRot = cat.rotation.y;
    (function frame(now) {
      const t = Math.min(1, (now - start) / dur);
      if (trickId === "spin") cat.rotation.y = baseRot + t * Math.PI * 2;
      else cat.position.y = baseY + Math.sin(t * Math.PI) * 0.55;
      if (t < 1) requestAnimationFrame(frame);
      else { cat.position.y = baseY; cat.rotation.y = baseRot; }
    })(start);
  }

  // ---------- shells ----------
  function awardShells(amount, message) {
    window.dispatchEvent(new CustomEvent("snug-award-coins", { detail: { amount, message } }));
  }

  // ---------- actions ----------
  function feed(foodId) {
    const pet = state.pet, food = FOODS.find(f => f.id === foodId);
    if (!pet || !food || state.busy) return;
    const count = pet.foods[foodId] || 0;
    if (count <= 0) { // buy one with shells
      state.busy = true; render();
      awardShells(-food.cost, `${food.name} · −${food.cost} shells`);
      setTimeout(() => { state.busy = false; pet.foods[foodId] = (pet.foods[foodId] || 0) + 1; save(); doFeed(food); }, 350);
      return;
    }
    doFeed(food);
  }
  function doFeed(food) {
    const pet = state.pet;
    pet.foods[food.id] -= 1;
    pet.hunger = Math.min(100, pet.hunger + food.hunger);
    pet.happiness = Math.min(100, pet.happiness + food.happiness);
    pet.lastTick = Date.now();
    save(); syncFollower(); render();
    state.status = `${petName()} munches the ${food.name.toLowerCase()}.`;
  }
  function petName() { return state.pet?.name || "Your cat"; }

  function startPlay() { state.view = "play"; state.toyTaps = 0; render(); }
  function tapToy() {
    state.toyTaps += 1;
    const pet = state.pet;
    if (state.toyTaps >= 5) {
      pet.happiness = Math.min(100, pet.happiness + 16);
      pet.hunger = Math.max(0, pet.hunger - 4);
      pet.lastTick = Date.now();
      save(); syncFollower();
      state.view = "home"; state.status = `${petName()} is tuckered out and very pleased.`;

    }
    render();
  }

  function train(trickId) {
    const pet = state.pet, trick = TRICKS.find(t => t.id === trickId);
    if (!pet || !trick || state.busy) return;
    const rec = pet.tricks[trickId] || (pet.tricks[trickId] = { progress: 0, learned: false });
    if (rec.learned) { perform(trickId); return; }
    state.busy = true; render();
    setTimeout(() => {
      state.busy = false;
      if (Math.random() < 0.72) {
        rec.progress += 1;
        pet.happiness = Math.min(100, pet.happiness + 4);
        if (rec.progress >= trick.needs) {
          rec.learned = true;
          pet.happiness = Math.min(100, pet.happiness + 10);
          state.status = `${petName()} learned ${trick.name}! Perform it for shells.`;

        } else {
          state.status = `Good try! ${trick.name}: ${rec.progress}/${trick.needs}.`;
        }
      } else {
        state.status = `${petName()} got distracted. Try again!`;
      }
      save(); syncFollower(); render();
    }, 650);
  }
  function perform(trickId) {
    const pet = state.pet, trick = TRICKS.find(t => t.id === trickId);
    if (!pet || !trick || state.busy) return;
    const rec = pet.tricks[trickId];
    if (!rec?.learned) return;
    state.busy = true;
    animateTrick(trickId);
    setTimeout(() => {
      state.busy = false;
      awardShells(trick.reward, `${petName()} performs ${trick.name} · +${trick.reward} shells`);
      pet.happiness = Math.min(100, pet.happiness + 5);
      pet.hunger = Math.max(0, pet.hunger - 3);
      save(); syncFollower(); render();

    }, 950);
  }

  function maybeGift() {
    const pet = state.pet; if (!pet) return;
    if (pet.happiness < 90) return;
    if (Date.now() - (pet.lastGiftAt || 0) < 12 * 60000) return;
    if (Math.random() > 0.35) return;
    const gift = GIFTS[Math.floor(Math.random() * GIFTS.length)];
    pet.lastGiftAt = Date.now();
    save();
    if (gift.kind === "shells") awardShells(gift.amount, `${petName()} found ${gift.label}!`);
    else awardShells(0, `${petName()} brought you ${gift.label}!`);

    if (state.root && !state.root.hidden) { state.status = `${petName()} dropped ${gift.label} at your feet!`; render(); }
  }

  // ---------- UI ----------
  function bar(value, cls) {
    return `<div class="pet-bar"><i class="${cls}" style="width:${Math.max(0, Math.min(100, value))}%"></i></div>`;
  }
  function home() {
    const pet = state.pet;
    const mood = pet.happiness > 90 ? "Ecstatic" : pet.happiness > 70 ? "Happy" : pet.happiness > 40 ? "Content" : pet.hunger < 25 ? "Hungry" : "Grumpy";
    return `<div class="pet-home">
      <div class="pet-head"><span><small>Agnes Alley's shelter</small><b>${esc(pet.name || "Your cat")}</b></span><span class="pet-mood">${esc(mood)}</span></div>
      <div class="pet-stats">
        <label><span>Hunger <b>${pet.hunger}</b></span>${bar(pet.hunger, "hunger")}</label>
        <label><span>Happiness <b>${pet.happiness}</b></span>${bar(pet.happiness, "happy")}</label>
      </div>
      ${pet.happiness > 70 ? `<p class="pet-note">Following you around town.</p>` : `<p class="pet-note">Raise happiness above 70 and ${esc(pet.name || "your cat")} will follow you.</p>`}
      <div class="pet-section"><small>Feed</small><div class="pet-foods">${FOODS.map(f => {
        const count = pet.foods[f.id] || 0;
        return `<button type="button" data-pet-feed="${f.id}" ${state.busy ? "disabled" : ""}><i aria-hidden="true">${f.icon}</i><span><b>${f.name}</b><small>${f.detail} · +${f.hunger} hunger</small></span><strong>${count > 0 ? `×${count}` : `${f.cost}🐚`}</strong></button>`;
      }).join("")}</div></div>
      <div class="pet-actions"><button type="button" data-pet-play ${state.busy ? "disabled" : ""}>🎾 Play chase</button></div>
      <div class="pet-section"><small>Tricks</small><div class="pet-tricks">${TRICKS.map(t => {
        const rec = pet.tricks[t.id] || { progress: 0, learned: false };
        return `<button type="button" data-pet-train="${t.id}" ${state.busy ? "disabled" : ""}><i aria-hidden="true">${t.icon}</i><span><b>${t.name}</b><small>${rec.learned ? `Learned · perform for +${t.reward}🐚` : `Training ${rec.progress}/${t.needs}`}</small></span><strong>${rec.learned ? "Show" : "Train"}</strong></button>`;
      }).join("")}</div></div>
      <details class="pet-rename"><summary>Rename</summary><label class="pet-field"><span>Name</span><input data-pet-name maxlength="18" value="${esc(pet.name)}" autocomplete="off"></label><button type="button" data-pet-save-name>Save name</button></details>
      ${state.status ? `<p class="pet-status" role="status">${esc(state.status)}</p>` : ""}
    </div>`;
  }
  function playView() {
    const spots = [[8, 22], [42, 8], [70, 30], [30, 55], [58, 62]];
    const [x, y] = spots[state.toyTaps % spots.length];
    return `<div class="pet-play">
      <div class="pet-head"><span><small>Chase the toy</small><b>Tap it ${5 - state.toyTaps} more!</b></span><button type="button" data-pet-back>Done</button></div>
      <div class="pet-toy-arena"><button type="button" data-pet-toy aria-label="Toy" style="left:${x}%;top:${y}%">🧶</button></div>
      <p class="pet-note">Tap the yarn ${5 - state.toyTaps} more time${5 - state.toyTaps === 1 ? "" : "s"}.</p>
    </div>`;
  }
  function render() {
    if (!state.root) return;
    $(".pet-content", state.root).innerHTML = state.view === "play" ? playView() : home();
  }
  function build() {
    if (state.root) return;
    const root = document.createElement("section");
    root.className = "pet-mode"; root.hidden = true;
    root.setAttribute("role", "dialog"); root.setAttribute("aria-modal", "true"); root.setAttribute("aria-label", "Pet care");
    root.innerHTML = `<header class="pet-topbar"><span><small>Agnes Alley's shelter</small><b>Pet Care</b></span><button type="button" data-pet-close>Leave</button></header><div class="pet-scroll"><div class="pet-content"></div></div>
    <style>
      .pet-mode{position:fixed;inset:0;z-index:210;display:flex;flex-direction:column;background:#fffdf8;opacity:0;transition:opacity .2s}
      .pet-mode.is-open{opacity:1}
      .pet-mode[hidden]{display:none}
      .pet-topbar{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;border-bottom:1px solid #e9e2d4;background:#fff8ec}
      .pet-topbar small{display:block;text-transform:uppercase;letter-spacing:.08em;font-size:10px;color:#8a7a5f}
      .pet-topbar b{font-size:18px}
      .pet-topbar button{border:1px solid #d9cfb8;background:#fff;border-radius:12px;padding:8px 14px;font-weight:800}
      .pet-scroll{overflow:auto;flex:1;padding:16px}
      .pet-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
      .pet-head small{display:block;text-transform:uppercase;letter-spacing:.08em;font-size:10px;color:#8a7a5f}
      .pet-head b{font-size:20px}
      .pet-head button{border:1px solid #d9cfb8;background:#fff;border-radius:10px;padding:6px 12px;font-weight:700}
      .pet-mood{background:#e8f3e2;border-radius:20px;padding:6px 12px;font-size:12px;font-weight:800;color:#4f7a45}
      .pet-stats{display:grid;gap:10px;margin-bottom:8px}
      .pet-stats label span{display:flex;justify-content:space-between;font-size:12px;font-weight:800;margin-bottom:4px}
      .pet-bar{height:12px;border-radius:8px;background:#f0e9d8;overflow:hidden}
      .pet-bar i{display:block;height:100%;border-radius:8px;transition:width .3s}
      .pet-bar .hunger{background:linear-gradient(90deg,#ef9a55,#e76854)}
      .pet-bar .happy{background:linear-gradient(90deg,#9ed181,#5c8d65)}
      .pet-note{font-size:12px;color:#8a7a5f;margin:4px 0 12px}
      .pet-section{margin:14px 0}
      .pet-section>small{display:block;text-transform:uppercase;letter-spacing:.08em;font-size:10px;color:#8a7a5f;margin-bottom:8px}
      .pet-foods,.pet-tricks{display:grid;gap:8px}
      .pet-foods button,.pet-tricks button{display:flex;align-items:center;gap:10px;border:1px solid #e4dac2;background:#fffdf6;border-radius:14px;padding:10px;text-align:left}
      .pet-foods button i,.pet-tricks button i{font-size:24px;font-style:normal}
      .pet-foods button span,.pet-tricks button span{flex:1;display:grid}
      .pet-foods button b,.pet-tricks button b{font-size:13px}
      .pet-foods button small,.pet-tricks button small{font-size:11px;color:#8a7a5f}
      .pet-foods button strong,.pet-tricks button strong{font-size:12px;color:#b84233;white-space:nowrap}
      .pet-actions{display:flex;gap:8px;margin:6px 0}
      .pet-actions button{flex:1;border:0;border-radius:14px;background:#e76854;color:#fff;font-weight:900;padding:13px;font-size:14px}
      .pet-rename{margin-top:14px;border-top:1px solid #eee5d2;padding-top:10px}
      .pet-rename summary{font-size:12px;font-weight:800;color:#8a7a5f}
      .pet-field{display:grid;gap:4px;margin:8px 0;font-size:12px;font-weight:800}
      .pet-field input{border:1px solid #d9cfb8;border-radius:10px;padding:9px;font:inherit}
      .pet-rename button{border:1px solid #d9cfb8;background:#fff;border-radius:10px;padding:8px 14px;font-weight:800}
      .pet-status{margin-top:12px;font-size:13px;background:#fff6d9;border-radius:10px;padding:9px 11px;color:#66552c}
      .pet-toy-arena{position:relative;height:220px;border-radius:16px;background:linear-gradient(180deg,#dceaf0,#f5f0e7);overflow:hidden;margin:8px 0}
      .pet-toy-arena button{position:absolute;font-size:34px;background:none;border:0;transform:translate(-50%,-50%);transition:left .25s,top .25s}
    </style>`;
    document.body.appendChild(root);
    state.root = root;
    root.addEventListener("click", click);
  }
  function open() {
    build();
    if (!state.pet) { state.pet = loadLocal() || defaultPet(); applyDecay(); }
    state.view = "home"; state.status = "";
    state.root.hidden = false; render();
    requestAnimationFrame(() => state.root.classList.add("is-open"));
    syncFollower();
  }
  function close() {
    if (!state.root) return;
    state.root.classList.remove("is-open");
    setTimeout(() => state.root && (state.root.hidden = true), 210);
  }
  function click(event) {
    const button = event.target.closest("button");
    if (!button) return;
    if (button.matches("[data-pet-close]")) { close(); return; }
    if (button.matches("[data-pet-back]")) { state.view = "home"; render(); return; }
    if (button.dataset.petFeed) { feed(button.dataset.petFeed); return; }
    if (button.matches("[data-pet-play]")) { startPlay(); return; }
    if (button.matches("[data-pet-toy]")) { tapToy(); return; }
    if (button.dataset.petTrain) { train(button.dataset.petTrain); return; }
    if (button.matches("[data-pet-save-name]")) {
      const input = $("[data-pet-name]", state.root);
      state.pet.name = String(input?.value || "").trim().slice(0, 18);
      save(); state.status = state.pet.name ? `Meet ${state.pet.name}!` : ""; render();
      return;
    }
  }

  // Add a Pet Care button to play/style panels (same pattern as painting-mode).
  function install(root = document) {
    root.querySelectorAll?.(".style-panel,.play-panel").forEach(panel => {
      if (panel.querySelector("[data-pet-open]")) return;
      const button = document.createElement("button");
      button.type = "button"; button.className = "pet-launch";
      button.setAttribute("data-pet-open", "");
      button.innerHTML = `<i aria-hidden="true">🐾</i><span><b>Pet Care</b><small>Feed, play & train your cat</small></span><strong>Visit</strong>`;
      panel.appendChild(button);
    });
  }
  document.addEventListener("click", event => {
    if (event.target.closest("[data-pet-open]")) { event.preventDefault(); open(); }
  }, true);
  const observer = new MutationObserver(records => records.forEach(record => record.addedNodes.forEach(node => { if (node.nodeType === 1) install(node); })));
  observer.observe(document.documentElement, { childList: true, subtree: true });

  // Session + periodic ticks
  window.addEventListener("snug-session", event => {
    state.session = event.detail;
    state.pet = null; // reload per session
  });
  if (window.__snugSession) state.session = window.__snugSession;
  setInterval(() => {
    if (!state.pet) return;
    applyDecay();
    syncFollower();
    maybeGift();
    save();
    if (state.root && !state.root.hidden && state.view === "home") render();
  }, 60000);
  // Keep follower visibility in sync even when panel is closed
  setInterval(() => { if (state.pet) syncFollower(); }, 5000);

  build(); install();
  window.__snugPetCare = { open, close, get pet() { return state.pet; }, feed, train, perform };
})();

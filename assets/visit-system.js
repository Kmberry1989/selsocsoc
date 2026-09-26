(() => {
  const SPOT = { x: 4.2, z: 1.8, radius: 3.8 };
  const state = {
    session: null,
    profile: null,
    friends: [],
    portraits: new Set(),
    open: false,
    loading: false,
    saving: false,
    markerScene: null,
    marker: null,
    poll: 0,
    lastPosition: null,
  };

  const esc = (value) => String(value ?? "").replace(/[&<>'"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[char]);
  const initials = (name) => String(name || "Neighbor").trim().split(/\s+/).slice(0, 2).map((word) => word[0] || "").join("").toUpperCase() || "N";
  const clampName = (name) => String(name || "Neighbor").trim().slice(0, 18) || "Neighbor";
  const appRoot = () => document.querySelector(".app-shell") || document.body;
  const databaseBase = () => String(state.session?.app?.options?.databaseURL || `https://${state.session?.projectId}-default-rtdb.firebaseio.com`).replace(/\/$/, "");
  const firestoreBase = () => `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(state.session.projectId)}/databases/(default)/documents`;

  function decodeValue(value) {
    if (!value || typeof value !== "object") return null;
    if ("stringValue" in value) return value.stringValue;
    if ("booleanValue" in value) return value.booleanValue;
    if ("integerValue" in value) return Number(value.integerValue);
    if ("doubleValue" in value) return Number(value.doubleValue);
    if ("timestampValue" in value) return value.timestampValue;
    if ("nullValue" in value) return null;
    if (value.arrayValue) return (value.arrayValue.values || []).map(decodeValue);
    if (value.mapValue) return decodeFields(value.mapValue.fields || {});
    return null;
  }
  function decodeFields(fields) {
    return Object.fromEntries(Object.entries(fields || {}).map(([key, value]) => [key, decodeValue(value)]));
  }
  async function token() {
    if (!state.session?.user?.getIdToken) throw Error("Sign in to use home visits.");
    return state.session.user.getIdToken();
  }
  async function getDocument(collection, id) {
    const auth = await token();
    const response = await fetch(`${firestoreBase()}/${collection}/${encodeURIComponent(id)}`, { headers: { Authorization: `Bearer ${auth}` } });
    if (response.status === 404) return null;
    if (!response.ok) throw Error("The neighborhood directory could not be reached.");
    const json = await response.json();
    return decodeFields(json.fields || {});
  }
  async function getPresence() {
    const auth = await token();
    const response = await fetch(`${databaseBase()}/presence/plaza.json?orderBy=%22updatedAt%22&limitToLast=50`, { headers: { Authorization: `Bearer ${auth}` } });
    if (!response.ok) return {};
    return response.json().catch(() => ({})) || {};
  }
  async function loadPortrait(profile, mood) {
    if (profile?.shareExpressionPhotos === false) return "";
    const photos = profile?.expressionPhotos;
    if (!photos || typeof photos !== "object") return "";
    const record = photos[mood] || photos.calm || photos.happy;
    if (!record?.path) return "";
    const bucket = state.session?.app?.options?.storageBucket;
    if (!bucket) return "";
    try {
      const auth = await token();
      const url = `https://firebasestorage.googleapis.com/v0/b/${encodeURIComponent(bucket)}/o/${encodeURIComponent(record.path)}?alt=media`;
      const response = await fetch(url, { headers: { Authorization: `Firebase ${auth}` } });
      if (!response.ok) return "";
      const objectUrl = URL.createObjectURL(await response.blob());
      state.portraits.add(objectUrl);
      return objectUrl;
    } catch {
      return "";
    }
  }
  function friendIds(profile) {
    const ids = new Set();
    const collect = (value) => {
      if (Array.isArray(value)) value.forEach((id) => typeof id === "string" && ids.add(id));
      else if (value && typeof value === "object") Object.entries(value).forEach(([id, active]) => active && ids.add(id));
    };
    collect(profile?.friendIds);
    collect(profile?.friends);
    collect(profile?.social?.friends);
    ids.delete(state.session?.uid);
    return [...ids].slice(0, 50);
  }
  function houseFromDocument(house) {
    if (!house) return null;
    return {
      wallpaper: typeof house.wallpaper === "string" ? house.wallpaper : "#fff1db",
      carpet: typeof house.carpet === "string" ? house.carpet : "#d7c29e",
      furniture: (Array.isArray(house.furniturePlacements) ? house.furniturePlacements : []).map((placement) => placement?.itemId).filter((id) => typeof id === "string").slice(0, 32),
    };
  }
  async function refresh() {
    if (!state.session || state.loading) return;
    state.loading = true;
    render();
    for (const url of state.portraits) URL.revokeObjectURL(url);
    state.portraits.clear();
    try {
      const [profile, presence] = await Promise.all([getDocument("players", state.session.uid), getPresence()]);
      state.profile = profile || {};
      const live = new Set(Object.values(presence || {}).filter((entry) => entry?.uid && Date.now() - Number(entry.updatedAt || 0) < 22000).map((entry) => entry.uid));
      const records = await Promise.all(friendIds(state.profile).map(async (uid) => {
        try {
          const friendProfile = await getDocument("players", uid);
          if (!friendProfile) return null;
          const online = live.has(uid);
          const welcoming = friendProfile.visitSettings?.acceptsGuests === true;
          const available = online && welcoming;
          const portrait = await loadPortrait(friendProfile, available ? "happy" : "sad");
          return { uid, name: clampName(friendProfile.displayName), profile: friendProfile, online, welcoming, available, portrait };
        } catch {
          return null;
        }
      }));
      state.friends = records.filter(Boolean).sort((a, b) => Number(b.available) - Number(a.available) || a.name.localeCompare(b.name));
      setStatus("");
    } catch (error) {
      state.friends = [];
      setStatus(error instanceof Error ? error.message : "The neighborhood directory could not be reached.", true);
    } finally {
      state.loading = false;
      render();
    }
  }

  function buildPrompt() {
    if (document.querySelector(".strolling-prompt")) return;
    const prompt = document.createElement("aside");
    prompt.className = "strolling-prompt";
    prompt.hidden = true;
    prompt.setAttribute("aria-label", "Strolling Stretch home visits");
    prompt.innerHTML = '<span class="strolling-prompt-mark" aria-hidden="true">⌂</span><span class="strolling-prompt-copy"><small>Strolling Stretch</small><b>Visit a friend at home</b></span><button type="button">Choose</button>';
    prompt.querySelector("button").addEventListener("click", open);
    appRoot().appendChild(prompt);
  }
  function updatePrompt(position = state.lastPosition) {
    const prompt = document.querySelector(".strolling-prompt");
    if (!prompt) return;
    const world = window.__snugWorld;
    const startOpen = document.documentElement.classList.contains("snug-start-open");
    const near = position && Math.hypot(Number(position.x) - SPOT.x, Number(position.z) - SPOT.z) <= SPOT.radius;
    prompt.hidden = !near || startOpen || world?.mode !== "village" || state.open || !!document.querySelector(".visit-cinematic:not([hidden])");
  }
  function attachMarker(world = window.__snugWorld) {
    if (!world?.scene || world.mode !== "village" || state.markerScene === world.scene) return;
    state.markerScene = world.scene;
    state.marker = null;
    const add = () => {
      const group = world.scene.getObjectByName("SnugExpandedCountryside");
      if (!group || world.scene.getObjectByName("StrollingStretchDirectory")) return false;
      const source = group.children.find((object) => object.isGroup && object.children.length === 3 && object.children.some((child) => child.geometry?.type === "CylinderGeometry") && object.children.some((child) => child.geometry?.type === "BoxGeometry"));
      if (!source) return false;
      const marker = source.clone(true);
      marker.name = "StrollingStretchDirectory";
      marker.position.set(SPOT.x, 0, SPOT.z);
      marker.scale.setScalar(1.18);
      marker.rotation.y = -0.22;
      marker.children.forEach((child) => {
        if (child.material?.clone) child.material = child.material.clone();
        if (child.geometry?.type === "BoxGeometry" && child.material?.color) child.material.color.set("#e88958");
        if (child.material) child.material.outlineParameters = { thickness: 0.0035, color: 0x1f2e31 };
      });
      marker.userData.strollingStretch = true;
      group.add(marker);
      state.marker = marker;
      return true;
    };
    if (!add()) [100, 300, 700, 1500, 3000].forEach((delay) => setTimeout(add, delay));
  }

  function buildSheet() {
    let backdrop = document.querySelector(".visit-backdrop");
    if (backdrop) return backdrop;
    backdrop = document.createElement("div");
    backdrop.className = "visit-backdrop";
    backdrop.hidden = true;
    backdrop.innerHTML = '<section class="visit-sheet" role="dialog" aria-modal="true" aria-labelledby="visit-title"><div class="visit-grabber"></div><div class="visit-head"><div><small>Strolling Stretch</small><h2 id="visit-title">Who would you like to visit?</h2></div><button class="visit-close" type="button" aria-label="Close home visits">×</button></div><p class="visit-intro">Friends who are home and welcoming guests can answer their door. Their shared portrait stays private if they turned expression sharing off.</p><div class="visit-welcome-setting"><span><b>Welcoming guests</b><small>Friends can visit only while you are online and this is on.</small></span><button class="visit-toggle" type="button" role="switch" aria-checked="false" aria-label="Welcoming guests"></button></div><p class="visit-status" role="status"></p><div class="visit-list"></div><button class="visit-refresh" type="button">Refresh friend status</button></section>';
    backdrop.addEventListener("pointerdown", (event) => {
      event.stopPropagation();
      if (event.target === backdrop) close();
    });
    backdrop.querySelector(".visit-close").addEventListener("click", close);
    backdrop.querySelector(".visit-refresh").addEventListener("click", refresh);
    backdrop.querySelector(".visit-toggle").addEventListener("click", toggleWelcoming);
    document.body.appendChild(backdrop);
    return backdrop;
  }
  function setStatus(message, error = false) {
    const node = document.querySelector(".visit-status");
    if (!node) return;
    node.textContent = message || "";
    node.classList.toggle("error", !!error);
  }
  function portraitMarkup(friend) {
    if (friend.portrait) return `<span class="visit-friend-portrait${friend.available ? "" : " sad"}"><img src="${esc(friend.portrait)}" alt="${esc(friend.name)} ${friend.available ? "welcoming" : "sad"} expression"></span>`;
    if (!friend.available) return '<span class="visit-friend-portrait sad" aria-label="Unavailable"><i class="visit-sad-face" aria-hidden="true"></i></span>';
    return `<span class="visit-friend-portrait" aria-label="${esc(friend.name)} has not shared a portrait">${esc(initials(friend.name))}</span>`;
  }
  function render() {
    const sheet = buildSheet();
    const toggle = sheet.querySelector(".visit-toggle");
    toggle.setAttribute("aria-checked", String(state.profile?.visitSettings?.acceptsGuests === true));
    toggle.disabled = !state.session || state.loading || state.saving;
    const list = sheet.querySelector(".visit-list");
    if (state.loading) {
      list.innerHTML = '<div class="visit-empty"><span class="visit-empty-mark" aria-hidden="true">···</span><b>Checking the neighborhood</b><p>Looking for your real friends and their current welcome status.</p></div>';
      return;
    }
    if (!state.session) {
      list.innerHTML = '<div class="visit-empty"><span class="visit-empty-mark" aria-hidden="true">⌂</span><b>Sign in to visit friends</b><p>Your friend list and home availability come from your connected player profile.</p></div>';
      return;
    }
    if (!state.friends.length) {
      list.innerHTML = '<div class="visit-empty"><span class="visit-empty-mark" aria-hidden="true">⌂</span><b>No friends are in your directory yet</b><p>Only real friend connections from your player profile appear here. No substitute neighbors are added.</p></div>';
      return;
    }
    list.innerHTML = state.friends.map((friend) => {
      const availability = friend.available ? "Home · welcoming guests" : friend.online ? "Home · not welcoming guests" : "Offline";
      return `<article class="visit-friend" data-friend="${esc(friend.uid)}">${portraitMarkup(friend)}<span class="visit-friend-copy"><b>${esc(friend.name)}</b><small>${esc(availability)}</small></span><button type="button"${friend.available ? "" : " disabled"}>Visit</button></article>`;
    }).join("");
    list.querySelectorAll(".visit-friend button:not(:disabled)").forEach((button) => button.addEventListener("click", () => visit(button.closest(".visit-friend").dataset.friend)));
  }
  async function toggleWelcoming() {
    if (!state.session || state.saving) return;
    const previous = state.profile?.visitSettings?.acceptsGuests === true;
    const next = !previous;
    state.saving = true;
    state.profile = { ...(state.profile || {}), visitSettings: { ...(state.profile?.visitSettings || {}), acceptsGuests: next } };
    render();
    setStatus("Saving your welcome status…");
    try {
      const auth = await token();
      const body = { fields: { visitSettings: { mapValue: { fields: { acceptsGuests: { booleanValue: next } } } } } };
      const response = await fetch(`${firestoreBase()}/players/${encodeURIComponent(state.session.uid)}?updateMask.fieldPaths=visitSettings&currentDocument.exists=true`, { method: "PATCH", headers: { Authorization: `Bearer ${auth}`, "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!response.ok) throw Error("Your welcome status could not be saved.");
      setStatus(next ? "Friends can visit while you are online." : "Home visits are closed for now.");
    } catch (error) {
      state.profile.visitSettings.acceptsGuests = previous;
      setStatus(error instanceof Error ? error.message : "Your welcome status could not be saved.", true);
    } finally {
      state.saving = false;
      render();
    }
  }
  async function sendArrival(friend) {
    const auth = await token();
    const payload = { type: "knock", from: state.session.uid, fromName: clampName(state.session.playerName || state.profile?.displayName || "A friend"), to: friend.uid, createdAt: Date.now() };
    const response = await fetch(`${databaseBase()}/social/plaza/events.json`, { method: "POST", headers: { Authorization: `Bearer ${auth}`, "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (!response.ok) throw Error("The doorbell could not reach your friend.");
  }
  function doorbell() {
    try {
      const Context = window.AudioContext || window.webkitAudioContext;
      if (!Context) return;
      const context = new Context();
      context.resume?.();
      const now = context.currentTime;
      [[0, 659.25], [.17, 523.25], [.36, 783.99]].forEach(([delay, frequency], index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = index === 2 ? "sine" : "triangle";
        oscillator.frequency.setValueAtTime(frequency, now + delay);
        gain.gain.setValueAtTime(.0001, now + delay);
        gain.gain.exponentialRampToValueAtTime(.12, now + delay + .018);
        gain.gain.exponentialRampToValueAtTime(.0001, now + delay + .38);
        oscillator.connect(gain).connect(context.destination);
        oscillator.start(now + delay);
        oscillator.stop(now + delay + .42);
      });
      setTimeout(() => context.close?.(), 1200);
    } catch {}
  }
  function cinematic(friend, house) {
    close();
    const layer = document.createElement("div");
    layer.className = "visit-cinematic";
    layer.setAttribute("role", "dialog");
    layer.setAttribute("aria-modal", "true");
    layer.setAttribute("aria-label", `Arriving at ${friend.name}'s home`);
    const hostPortrait = friend.portrait ? `<img src="${esc(friend.portrait)}" alt="${esc(friend.name)} welcoming you">` : esc(initials(friend.name));
    layer.innerHTML = `<div class="visit-cinematic-sky"></div><div class="visit-cinematic-house"><div class="visit-house-roof"></div><div class="visit-house-body"></div><div class="visit-doorway"><div class="visit-avatar visit-host">${hostPortrait}</div><div class="visit-door"></div><i class="visit-bell" aria-hidden="true"></i></div><div class="visit-avatar visit-guest">${esc(initials(state.session?.playerName || state.profile?.displayName))}</div><i class="visit-arm" aria-hidden="true"></i></div><div class="visit-caption" aria-live="polite"><small>Walking up</small><b>Heading to ${esc(friend.name)}’s front door…</b></div><button class="visit-skip" type="button">Skip</button>`;
    document.body.appendChild(layer);
    const captionSmall = layer.querySelector(".visit-caption small");
    const caption = layer.querySelector(".visit-caption b");
    let finished = false;
    const timers = [];
    const later = (fn, delay) => timers.push(setTimeout(fn, delay));
    const finish = () => {
      if (finished) return;
      finished = true;
      timers.forEach(clearTimeout);
      window.dispatchEvent(new CustomEvent("snug-enter-visit", { detail: { hostUid: friend.uid, hostName: friend.name, house } }));
      layer.remove();
    };
    layer.querySelector(".visit-skip").addEventListener("click", finish);
    later(() => {
      layer.classList.add("phase-bell");
      captionSmall.textContent = "At the door";
      caption.textContent = "Pressing the doorbell…";
      doorbell();
    }, 1550);
    later(() => {
      layer.classList.remove("phase-bell");
      layer.classList.add("phase-welcome");
      captionSmall.textContent = friend.name;
      caption.textContent = `Welcome in, ${clampName(state.session?.playerName || state.profile?.displayName || "friend")}!`;
    }, 2450);
    later(finish, matchMedia("(prefers-reduced-motion: reduce)").matches ? 1900 : 4300);
  }
  async function visit(uid) {
    const friend = state.friends.find((entry) => entry.uid === uid);
    if (!friend?.available) return;
    setStatus(`Checking ${friend.name}’s front door…`);
    document.querySelectorAll(".visit-friend button").forEach((button) => { button.disabled = true; });
    try {
      const houseDocument = await getDocument("houses", friend.uid);
      const house = houseFromDocument(houseDocument);
      if (!house) throw Error(`${friend.name}’s home is not ready for visitors yet.`);
      await sendArrival(friend);
      cinematic(friend, house);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "The visit could not begin.", true);
      render();
    }
  }
  function open() {
    state.open = true;
    const backdrop = buildSheet();
    backdrop.hidden = false;
    document.documentElement.classList.add("snug-visit-open");
    updatePrompt();
    render();
    refresh();
    clearInterval(state.poll);
    state.poll = setInterval(refresh, 12000);
  }
  function close() {
    state.open = false;
    const backdrop = document.querySelector(".visit-backdrop");
    if (backdrop) backdrop.hidden = true;
    document.documentElement.classList.remove("snug-visit-open");
    clearInterval(state.poll);
    state.poll = 0;
    updatePrompt();
  }
  function interceptInvite(event) {
    const button = event.target.closest?.(".home-banner button");
    if (!button || !/^Invite$/i.test(button.textContent.trim())) return;
    event.preventDefault();
    event.stopPropagation();
    open();
  }

  window.addEventListener("snug-session", (event) => {
    state.session = event.detail;
    state.profile = null;
    state.friends = [];
    render();
    if (state.open) refresh();
  });
  window.addEventListener("snug-world-ready", (event) => { attachMarker(event.detail); updatePrompt(); });
  window.addEventListener("snug-mode-change", (event) => { attachMarker(event.detail || window.__snugWorld); updatePrompt(); });
  window.addEventListener("snug-player-move", (event) => { state.lastPosition = event.detail; updatePrompt(); });
  document.addEventListener("click", interceptInvite, true);
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && state.open) close(); });
  buildPrompt();
  buildSheet();
  attachMarker();
  if (window.__snugSession) {
    state.session = window.__snugSession;
    render();
  }
  window.__strollingStretch = { open, close, refresh, get friends() { return state.friends.slice(); }, spot: { ...SPOT } };
})();

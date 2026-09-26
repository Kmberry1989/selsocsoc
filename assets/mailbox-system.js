(() => {
  if (window.__snugMailboxSystem) return;
  window.__snugMailboxSystem = true;

  const state = {
    session: null,
    profile: { inventory: [], mailbox: {} },
    mail: [],
    players: [],
    remoteProfiles: new Map(),
    view: "inbox",
    panel: null,
    polling: 0,
    saving: false,
    worldScene: null,
    mailboxGroup: null,
    mailboxEntries: new Map(),
    raycaster: null,
    pointer: null,
    rendererElement: null,
    flagFrame: 0,
  };

  const STAMPS = [
    { id: "sprout", name: "Sprout Badge", achievement: "Plant your first seed", subject: "tiny green seedling sprouting from soil mound", glyph: "sprout" },
    { id: "golden-harvest", name: "Golden Harvest", achievement: "Harvest a golden crop", subject: "golden wheat sheaf with sparkles", glyph: "wheat" },
    { id: "master-builder", name: "Master Builder", achievement: "Complete a second story", subject: "tiny house with a second story and a crane hook", glyph: "house" },
    { id: "pen-pal", name: "Pen Pal", achievement: "Send 10 gifts", subject: "envelope with a heart seal", glyph: "letter" },
    { id: "whirl-winner", name: "Whirl Winner", achievement: "Win a round of Whirl of Resources", subject: "colorful spinning prize wheel", glyph: "wheel" },
    { id: "star-sailor", name: "Star Sailor", achievement: "Win a Snug Board game", subject: "gold trophy star on a game board", glyph: "star" },
    { id: "night-owl", name: "Night Owl", achievement: "Play after midnight", subject: "sleepy owl with a crescent moon", glyph: "moon" },
    { id: "festival-friend", name: "Festival Friend", achievement: "Attend all three rotating festivals", subject: "string of triangular bunting flags", glyph: "bunting" },
    { id: "cat-whisperer", name: "Cat Whisperer", achievement: "Adopt a cat", subject: "cat face with a yarn ball", glyph: "cat" },
    { id: "bridge-crew", name: "Bridge Crew", achievement: "Contribute to the Moonlight Footbridge", subject: "arched wooden footbridge over water", glyph: "bridge" },
    { id: "shutterbug", name: "Shutterbug", achievement: "Take 25 photo-mode pictures", subject: "vintage camera with a flash star", glyph: "camera" },
    { id: "cyclical-citizen", name: "Cyclical Citizen", achievement: "Complete the welcoming committee", subject: "town gate with a welcome banner", glyph: "gate" },
  ];
  const BASE_PROMPT = "small circular postage stamp, perforated edge, storybook 3D icon in the center, pastel background, thin black toon outline, centered, plain white background, game collectible";
  const COLORS = ["#cf6655", "#5e8566", "#527f9a", "#d39f42", "#8a6b8d", "#735947"];
  const PLAQUES = [
    { id: "rounded", label: "Friendly", font: "900 34px Nunito, sans-serif" },
    { id: "classic", label: "Classic", font: "700 34px Georgia, serif" },
    { id: "painted", label: "Painted", font: "700 36px cursive" },
  ];
  const POSTS = [
    { id: "simple", label: "Simple" },
    { id: "turned", label: "Turned" },
    { id: "stone", label: "Stone" },
  ];
  const CHARMS = [
    { id: "none", label: "None" },
    { id: "shell", label: "Shell" },
    { id: "star", label: "Star" },
    { id: "gnome", label: "Gnome" },
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = (value) => { const span = document.createElement("span"); span.textContent = String(value ?? ""); return span.innerHTML; };
  const displayName = (id) => String(id || "item").replace(/^__thank_you__.*$/, "Thank-you note").replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  const playerName = () => $(".profile-chip b")?.textContent?.trim() || state.session?.playerName || "Player";
  const inventory = () => Array.isArray(state.profile.inventory) ? state.profile.inventory : Array.isArray(state.profile.owned) ? state.profile.owned : [];
  const mailbox = () => state.profile.mailbox && typeof state.profile.mailbox === "object" ? state.profile.mailbox : {};
  const unlockedStamps = () => new Set(Array.isArray(mailbox().stamps) ? mailbox().stamps : []);
  const unreadMail = () => state.mail.filter((message) => Number(message.createdAt || 0) > Number(mailbox().openedAt || 0));

  const showToast = (message) => {
    let toast = $(".mailbox-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "mailbox-toast";
      toast.setAttribute("role", "status");
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2600);
  };

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
    if (value.timestampValue) return value.timestampValue;
    return null;
  }
  const decodeFields = (fields = {}) => Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, decodeValue(value)]));
  async function authHeaders() {
    if (!state.session?.user) throw Error("Waiting for Firebase sign-in");
    return { "Content-Type": "application/json", Authorization: `Bearer ${await state.session.user.getIdToken()}` };
  }
  function playerUrl(uid = state.session?.uid) {
    const project = state.session?.projectId || state.session?.app?.options?.projectId;
    return `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(project)}/databases/(default)/documents/players/${encodeURIComponent(uid)}`;
  }
  const mailUrl = (uid = state.session?.uid) => `${playerUrl(uid)}/mail`;

  async function loadProfile(uid = state.session?.uid) {
    const response = await fetch(playerUrl(uid), { headers: await authHeaders() });
    if (!response.ok) throw Error(`Player data returned ${response.status}`);
    return decodeFields((await response.json()).fields || {});
  }
  async function loadMail() {
    const response = await fetch(`${mailUrl()}?pageSize=40&orderBy=createdAt%20desc`, { headers: await authHeaders() });
    if (!response.ok) throw Error(`Mailbox returned ${response.status}`);
    const payload = await response.json();
    return (payload.documents || []).map((document) => ({ id: document.name.split("/").pop(), ...decodeFields(document.fields || {}) }));
  }
  async function patchFields(fields) {
    const paths = Object.keys(fields).map((key) => `updateMask.fieldPaths=${encodeURIComponent(key)}`).join("&");
    const response = await fetch(`${playerUrl()}?${paths}`, {
      method: "PATCH",
      headers: await authHeaders(),
      body: JSON.stringify({ fields: Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, firestoreValue(value)])) }),
    });
    if (!response.ok) throw Error(`Player save returned ${response.status}`);
  }
  async function postMail(uid, message) {
    const response = await fetch(mailUrl(uid), {
      method: "POST",
      headers: await authHeaders(),
      body: JSON.stringify({ fields: Object.fromEntries(Object.entries(message).map(([key, value]) => [key, firestoreValue(value)])) }),
    });
    if (!response.ok) throw Error(`Mailbox write returned ${response.status}`);
    return response.json();
  }
  async function deleteMail(id) {
    const response = await fetch(`${mailUrl()}/${encodeURIComponent(id)}`, { method: "DELETE", headers: await authHeaders() });
    if (!response.ok) throw Error(`Mailbox delete returned ${response.status}`);
  }

  function defaultMailbox() {
    return { paint: COLORS[0], plaque: "rounded", post: "simple", charm: "none", stamps: [], sentCount: 0, photoCount: 0, openedAt: 0 };
  }
  function normalizedMailbox(value = mailbox()) {
    const fallback = defaultMailbox();
    return {
      ...fallback,
      ...value,
      paint: COLORS.includes(value.paint) ? value.paint : fallback.paint,
      plaque: PLAQUES.some((item) => item.id === value.plaque) ? value.plaque : fallback.plaque,
      post: POSTS.some((item) => item.id === value.post) ? value.post : fallback.post,
      charm: CHARMS.some((item) => item.id === value.charm) ? value.charm : fallback.charm,
      stamps: [...new Set(Array.isArray(value.stamps) ? value.stamps.filter((id) => STAMPS.some((stamp) => stamp.id === id)) : [])],
    };
  }
  async function saveMailbox(next, notice = "Mailbox updated") {
    if (!state.session || state.saving) return false;
    state.saving = true;
    state.profile.mailbox = normalizedMailbox(next);
    updateMailboxWorld();
    renderDock();
    renderPanel();
    try {
      await patchFields({ mailbox: state.profile.mailbox });
      if (notice) showToast(notice);
      return true;
    } catch {
      showToast("Mailbox changes could not reach Firebase");
      return false;
    } finally {
      state.saving = false;
    }
  }

  function hasAny(source, paths) {
    return paths.some((path) => path.split(".").reduce((value, key) => value?.[key], source));
  }
  function stampConditions(stamp) {
    const profile = state.profile;
    const box = normalizedMailbox();
    const gameplay = profile.gameplay || {};
    const conditions = {
      "sprout": hasAny(profile, ["gardening.plantedCount", "gameplay.gardening.plantedCount"]),
      "golden-harvest": hasAny(profile, ["gardening.goldenHarvests", "gameplay.gardening.goldenHarvests"]),
      "master-builder": Number(profile.house?.stories || profile.housing?.stories || gameplay.housing?.stories || 1) >= 2,
      "pen-pal": Number(box.sentCount || 0) >= 10,
      "whirl-winner": Number(gameplay.whirlWins || 0) >= 1,
      "star-sailor": Number(gameplay.boardWins || gameplay.snugBoardWins || 0) >= 1,
      "night-owl": new Date().getHours() < 5,
      "festival-friend": Object.keys(gameplay.festivalRewards || {}).length >= 3,
      "cat-whisperer": Boolean(profile.cat || profile.adoptedCat || gameplay.cat?.adopted),
      "bridge-crew": Number(gameplay.bridgeContribution || gameplay.projects?.moonlightFootbridge || 0) > 0,
      "shutterbug": Number(box.photoCount || gameplay.photoCount || 0) >= 25,
      "cyclical-citizen": Boolean(profile.onboardingComplete || profile.welcomeComplete || Object.keys(profile.expressionPhotos || profile.facePhotos || {}).length),
    };
    return Boolean(conditions[stamp.id]);
  }
  async function reconcileStamps() {
    if (!state.session) return;
    const current = normalizedMailbox();
    const earned = STAMPS.filter(stampConditions).map((stamp) => stamp.id);
    const nextStamps = [...new Set([...current.stamps, ...earned])];
    if (nextStamps.length === current.stamps.length) return;
    const newNames = nextStamps.filter((id) => !current.stamps.includes(id)).map((id) => STAMPS.find((stamp) => stamp.id === id)?.name).filter(Boolean);
    await saveMailbox({ ...current, stamps: nextStamps }, "");
    if (newNames.length) showToast(`${newNames[0]} stamp unlocked`);
  }

  function stampSvg(glyph) {
    const common = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    const paths = {
      sprout: '<path d="M12 21v-8M12 15c-4 0-7-2-7-6 4 0 7 2 7 6Zm0-3c0-4 3-7 7-7 0 4-3 7-7 7Z"/>',
      wheat: '<path d="M12 22V7m0 3-4-3m4 7 4-3m-4 7-4-3M8 5c2 0 4 1 4 3-2 0-4-1-4-3Zm8-2c0 2-2 4-4 4 0-2 2-4 4-4Z"/>',
      house: '<path d="m3 11 9-7 9 7v9H3Zm6 9v-6h6v6M17 7V3h3v7"/>',
      letter: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6m-5 7c1-2 4-1 4 1 0 2-4 4-4 4s-4-2-4-4c0-2 3-3 4-1Z"/>',
      wheel: '<circle cx="12" cy="12" r="8"/><path d="M12 4v8l6 4M5 8l7 4-6 5m6-5 3-7"/><circle cx="12" cy="12" r="2"/>',
      star: '<path d="m12 3 2.8 5.8 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.7l6.2-.9Z"/>',
      moon: '<path d="M19 15a8 8 0 1 1-9-11 6 6 0 0 0 9 11Z"/><path d="M7 10h2m4 0h2M9 14c2 1 4 1 6 0"/>',
      bunting: '<path d="M3 6c6 3 12 3 18 0M5 7v6l3-2 3 2V8m3 0v6l3-2 3 2V7"/>',
      cat: '<path d="m5 8 2-4 4 3h2l4-3 2 4v7c0 4-3 6-7 6s-7-2-7-6Z"/><path d="M9 13h.01M15 13h.01m-4 3h2"/>',
      bridge: '<path d="M3 18h18M5 18c1-8 13-8 14 0M4 14h16M7 10v8m5-11v11m5-8v8"/>',
      camera: '<path d="M4 8h4l2-3h4l2 3h4v11H4Z"/><circle cx="12" cy="13" r="3"/><path d="m19 3 .5 1.5L21 5l-1.5.5L19 7l-.5-1.5L17 5l1.5-.5Z"/>',
      gate: '<path d="M4 21V8h16v13M2 8h20M6 8V4h12v4M9 21V11h6v10"/>',
    };
    return `<svg viewBox="0 0 24 24" aria-hidden="true" ${common}>${paths[glyph] || paths.star}</svg>`;
  }
  function stampCard(stamp, unlocked, selected = false, selectable = false) {
    return `<button type="button" class="stamp-card ${unlocked ? "unlocked" : "locked"} ${selected ? "selected" : ""}" ${selectable ? `data-pick-stamp="${stamp.id}"` : ""} ${selectable && !unlocked ? "disabled" : ""} aria-label="${esc(stamp.name)}${unlocked ? " unlocked" : " locked"}"><span class="stamp-art stamp-${stamp.id}">${stampSvg(stamp.glyph)}</span><b>${esc(stamp.name)}</b><small>${esc(unlocked ? stamp.achievement : "Locked achievement")}</small></button>`;
  }

  function parseEnvelope(value) {
    const [stamp = "", wrap = "coral"] = String(value || "").split("|");
    return { stamp, wrap };
  }
  function envelopeValue(stamp, wrap) { return `${String(stamp || "")}|${String(wrap || "coral")}`; }

  function inboxMarkup() {
    if (!state.mail.length) return '<div class="mailbox-empty"><span aria-hidden="true"></span><h3>No mail waiting</h3><p>When a friend sends a gift or note, the red flag will rise.</p></div>';
    const lastOpened = Number(mailbox().openedAt || 0);
    return `<ul class="mailbox-list">${state.mail.map((message) => {
      const envelope = parseEnvelope(message.want);
      const stamp = STAMPS.find((item) => item.id === envelope.stamp);
      const thankYou = String(message.item || "").startsWith("__thank_you__");
      return `<li class="${Number(message.createdAt || 0) > lastOpened ? "new" : ""}"><span class="parcel-wrap wrap-${esc(envelope.wrap)}" aria-hidden="true">${stamp ? stampSvg(stamp.glyph) : stampSvg("letter")}</span><div><small>${thankYou ? "Thank-you note" : "Gift parcel"}</small><b>${esc(message.fromName || "Neighbor")}</b><p>${esc(thankYou ? "Sent a little note back." : displayName(message.item))}</p></div><button type="button" data-open-mail="${esc(message.id)}">${thankYou ? "Read" : "Unwrap"}</button></li>`;
    }).join("")}</ul>`;
  }
  function sendMarkup() {
    const people = state.players.map((player) => `<option value="${esc(player.uid)}">${esc(player.name || "Neighbor")}</option>`).join("");
    const items = inventory().map((id) => `<option value="${esc(id)}">${esc(displayName(id))}</option>`).join("");
    const unlocked = unlockedStamps();
    const firstStamp = STAMPS.find((stamp) => unlocked.has(stamp.id));
    return `<div class="mail-compose"><div class="mail-target-mode" role="group" aria-label="Recipients"><button type="button" class="active" data-mail-target="one">One friend</button><button type="button" data-mail-target="room">Whole room</button></div><label><span>Address book</span><select data-mail-person ${people ? "" : "disabled"}><option value="">${people ? "Choose a username" : "No friends are online"}</option>${people}</select></label><label><span>Gift from inventory</span><select data-mail-item ${items ? "" : "disabled"}><option value="">${items ? "Choose a gift" : "Your inventory is empty"}</option>${items}</select></label><fieldset><legend>Wrapping</legend><div class="wrap-picker">${["coral","leaf","gold","sky"].map((wrap, index) => `<button type="button" data-wrap="${wrap}" class="${index === 0 ? "active" : ""}" aria-label="${wrap} wrapping"><i class="wrap-${wrap}"></i>${wrap}</button>`).join("")}</div></fieldset><fieldset><legend>Stamp · unlimited reuse</legend><div class="stamp-picker" data-selected-stamp="${firstStamp?.id || ""}">${STAMPS.map((stamp) => stampCard(stamp, unlocked.has(stamp.id), stamp.id === firstStamp?.id, true)).join("")}</div></fieldset><button type="button" class="mail-send" data-send-gift ${!people || !items || !firstStamp ? "disabled" : ""}>Wrap & send</button><p class="mail-helper">Delivery is instant. Stanley Stamp is on the way.</p></div>`;
  }
  function albumMarkup() {
    const unlocked = unlockedStamps();
    const count = unlocked.size;
    return `<div class="album-summary"><div><small>Stamp collection</small><b>${count} of ${STAMPS.length} unlocked</b><p>Unlocked stamps can be used on as many letters as you like.</p></div><button type="button" data-prompt-guide>Art prompts</button></div><div class="stamp-album" data-page="0"><button type="button" class="album-turn prev" data-album-prev disabled aria-label="Previous album page">‹</button><div class="album-page">${STAMPS.slice(0,6).map((stamp) => stampCard(stamp, unlocked.has(stamp.id))).join("")}</div><button type="button" class="album-turn next" data-album-next aria-label="Next album page">›</button></div>`;
  }
  function customizeMarkup() {
    const current = normalizedMailbox();
    return `<div class="mailbox-preview-card"><span class="mini-mailbox" style="--mail-paint:${esc(current.paint)}"><i></i><b style="font-family:${esc(PLAQUES.find((item) => item.id === current.plaque)?.font.split(" ").slice(2).join(" ") || "Nunito")}">${esc(playerName())}</b><em class="charm-${esc(current.charm)}"></em></span><div><small>Your gate</small><h3>${esc(playerName())}’s mailbox</h3><p>The red flag rises whenever new mail arrives.</p></div></div><div class="mail-customize"><fieldset><legend>Paint color</legend><div class="mail-color-picker">${COLORS.map((color) => `<button type="button" data-mail-paint="${color}" class="${current.paint === color ? "active" : ""}" style="--swatch:${color}" aria-label="Choose ${color} paint"></button>`).join("")}</div></fieldset><fieldset><legend>Plaque lettering</legend><div class="choice-row">${PLAQUES.map((choice) => `<button type="button" data-mail-plaque="${choice.id}" class="${current.plaque === choice.id ? "active" : ""}">${choice.label}</button>`).join("")}</div></fieldset><fieldset><legend>Post shape</legend><div class="choice-row">${POSTS.map((choice) => `<button type="button" data-mail-post="${choice.id}" class="${current.post === choice.id ? "active" : ""}">${choice.label}</button>`).join("")}</div></fieldset><fieldset><legend>Charm</legend><div class="choice-row">${CHARMS.map((choice) => `<button type="button" data-mail-charm="${choice.id}" class="${current.charm === choice.id ? "active" : ""}">${choice.label}</button>`).join("")}</div></fieldset></div>`;
  }
  function promptsMarkup() {
    return `<div class="prompt-intro"><p>Each prompt is ready to paste into an image generator. Keep the plain background so the finished art is easy to cut out.</p><button type="button" data-copy-all-prompts>Copy all 12 prompts</button></div><ol class="prompt-list">${STAMPS.map((stamp, index) => { const prompt = `${BASE_PROMPT}, ${stamp.subject}`; return `<li><span><b>${index + 1}. ${esc(stamp.name)}</b><small>${esc(prompt)}</small></span><button type="button" data-copy-prompt="${esc(prompt)}">Copy</button></li>`; }).join("")}</ol>`;
  }

  function closePanel() {
    state.panel?.remove();
    state.panel = null;
    document.body.classList.remove("mailbox-open");
  }
  async function markOpened() {
    if (!state.session || !unreadMail().length) return;
    const next = { ...normalizedMailbox(), openedAt: Date.now() };
    await saveMailbox(next, "");
  }
  function openPanel(view = state.view) {
    state.view = view;
    closePanel();
    const backdrop = document.createElement("div");
    backdrop.className = "mailbox-backdrop";
    backdrop.innerHTML = `<section class="mailbox-sheet" role="dialog" aria-modal="true" aria-label="Mailbox"><div class="mailbox-grabber"></div><header><div><small>At the town gate</small><h2>${esc(playerName())}’s mailbox</h2></div><button type="button" data-close-mail aria-label="Close mailbox">×</button></header><nav>${[["inbox","Inbox"],["send","Send"],["album","Stamp album"],["customize","Customize"]].map(([id,label]) => `<button type="button" data-mail-view="${id}" class="${view === id ? "active" : ""}">${label}${id === "inbox" && unreadMail().length ? `<i>${unreadMail().length}</i>` : ""}</button>`).join("")}</nav><main>${view === "inbox" ? inboxMarkup() : view === "send" ? sendMarkup() : view === "album" ? albumMarkup() : view === "prompts" ? promptsMarkup() : customizeMarkup()}</main></section>`;
    backdrop.addEventListener("pointerdown", (event) => { if (event.target === backdrop) closePanel(); });
    document.body.appendChild(backdrop);
    state.panel = backdrop;
    document.body.classList.add("mailbox-open");
    bindPanel();
    if (view === "inbox") markOpened();
  }
  function renderPanel() { if (state.panel) openPanel(state.view); }

  function copyText(text, confirmation) {
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(() => showToast(confirmation)).catch(() => fallbackCopy(text, confirmation));
    else fallbackCopy(text, confirmation);
  }
  function fallbackCopy(text, confirmation) {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    try { document.execCommand("copy"); showToast(confirmation); } catch { showToast("Copy was not available"); }
    area.remove();
  }

  async function sendGift() {
    const root = state.panel;
    const mode = $("[data-mail-target].active", root)?.dataset.mailTarget || "one";
    const selectedUid = $("[data-mail-person]", root)?.value;
    const item = $("[data-mail-item]", root)?.value;
    const stamp = $(".stamp-picker", root)?.dataset.selectedStamp;
    const wrap = $("[data-wrap].active", root)?.dataset.wrap || "coral";
    const recipients = mode === "room" ? state.players.map((player) => player.uid) : [selectedUid].filter(Boolean);
    if (!recipients.length) return showToast(mode === "room" ? "No friends are in this room" : "Choose a friend");
    if (!item || !inventory().includes(item)) return showToast("Choose a gift from your inventory");
    if (!stamp || !unlockedStamps().has(stamp)) return showToast("Choose an unlocked stamp");
    const button = $("[data-send-gift]", root);
    if (button) { button.disabled = true; button.textContent = "Wrapping…"; }
    try {
      for (const uid of recipients) {
        await postMail(uid, { type: "gift", from: state.session.uid, fromName: playerName().slice(0,18), to: uid, item, want: envelopeValue(stamp, wrap), createdAt: Date.now() });
      }
      const nextInventory = inventory().filter((id) => id !== item);
      const nextMailbox = { ...normalizedMailbox(), sentCount: Number(mailbox().sentCount || 0) + recipients.length };
      state.profile.inventory = nextInventory;
      state.profile.mailbox = nextMailbox;
      await patchFields({ inventory: nextInventory, mailbox: nextMailbox });
      window.dispatchEvent(new CustomEvent("snug-player-patch", { detail: (player) => ({ ...player, inventory: nextInventory, owned: nextInventory, mailbox: nextMailbox }) }));
      window.dispatchEvent(new CustomEvent("snug-mail-sent", { detail: { recipients: recipients.length, item, stamp } }));
      await reconcileStamps();
      showToast(recipients.length > 1 ? `Stanley is delivering ${recipients.length} parcels` : "Stanley Stamp is on the way");
      openPanel("inbox");
    } catch {
      showToast("The parcel was not sent; your gift is still yours");
      if (button) { button.disabled = false; button.textContent = "Wrap & send"; }
    }
  }

  function showUnwrap(message, stamp, wrap, thankYou) {
    const overlay = document.createElement("div");
    overlay.className = "unwrap-backdrop";
    overlay.innerHTML = `<section class="unwrap-card" role="dialog" aria-modal="true" aria-label="Opened mail"><div class="unwrap-parcel wrap-${esc(wrap)}"><span>${stampSvg(stamp?.glyph || "letter")}</span></div><small>${thankYou ? "A note from" : "A gift from"}</small><h3>${esc(message.fromName || "Neighbor")}</h3><p>${esc(thankYou ? "Thank you! Your parcel made my day." : `${displayName(message.item)} is now in your collection.`)}</p><div><button type="button" data-unwrapped-done>Done</button>${thankYou ? "" : `<button type="button" class="mail-primary" data-send-thanks>Send thanks</button>`}</div></section>`;
    document.body.appendChild(overlay);
    const close = () => overlay.remove();
    $("[data-unwrapped-done]", overlay)?.addEventListener("click", close);
    $("[data-send-thanks]", overlay)?.addEventListener("click", async () => {
      const chosen = [...unlockedStamps()][0] || "cyclical-citizen";
      const button = $("[data-send-thanks]", overlay);
      button.disabled = true;
      try {
        await postMail(message.from, { type: "gift", from: state.session.uid, fromName: playerName().slice(0,18), to: message.from, item: "__thank_you__", want: envelopeValue(chosen, "gold"), createdAt: Date.now() });
        showToast("Thank-you note sent");
        close();
      } catch { showToast("The note could not be sent"); button.disabled = false; }
    });
  }
  async function openMail(id) {
    const message = state.mail.find((item) => item.id === id);
    if (!message) return;
    const { stamp: stampId, wrap } = parseEnvelope(message.want);
    const stamp = STAMPS.find((item) => item.id === stampId);
    const thankYou = String(message.item || "").startsWith("__thank_you__");
    const button = $(`[data-open-mail="${CSS.escape(id)}"]`, state.panel);
    if (button) button.disabled = true;
    try {
      if (!thankYou) {
        const nextInventory = [...new Set([...inventory(), message.item])];
        state.profile.inventory = nextInventory;
        await patchFields({ inventory: nextInventory });
        window.dispatchEvent(new CustomEvent("snug-player-patch", { detail: (player) => ({ ...player, inventory: nextInventory, owned: nextInventory }) }));
      }
      await deleteMail(id);
      state.mail = state.mail.filter((item) => item.id !== id);
      showUnwrap(message, stamp, wrap, thankYou);
      renderDock();
      renderPanel();
    } catch {
      showToast("The mailbox could not open that parcel");
      if (button) button.disabled = false;
    }
  }

  function bindPanel() {
    const root = state.panel;
    $("[data-close-mail]", root)?.addEventListener("click", closePanel);
    root.querySelectorAll("[data-mail-view]").forEach((button) => button.addEventListener("click", () => openPanel(button.dataset.mailView)));
    root.querySelectorAll("[data-open-mail]").forEach((button) => button.addEventListener("click", () => openMail(button.dataset.openMail)));
    root.querySelectorAll("[data-mail-target]").forEach((button) => button.addEventListener("click", () => {
      root.querySelectorAll("[data-mail-target]").forEach((item) => item.classList.toggle("active", item === button));
      $("[data-mail-person]", root).disabled = button.dataset.mailTarget === "room";
    }));
    root.querySelectorAll("[data-wrap]").forEach((button) => button.addEventListener("click", () => root.querySelectorAll("[data-wrap]").forEach((item) => item.classList.toggle("active", item === button))));
    root.querySelectorAll("[data-pick-stamp]").forEach((button) => button.addEventListener("click", () => {
      root.querySelectorAll("[data-pick-stamp]").forEach((item) => item.classList.toggle("selected", item === button));
      $(".stamp-picker", root).dataset.selectedStamp = button.dataset.pickStamp;
    }));
    $("[data-send-gift]", root)?.addEventListener("click", sendGift);
    root.querySelectorAll("[data-mail-paint]").forEach((button) => button.addEventListener("click", () => saveMailbox({ ...normalizedMailbox(), paint: button.dataset.mailPaint })));
    root.querySelectorAll("[data-mail-plaque]").forEach((button) => button.addEventListener("click", () => saveMailbox({ ...normalizedMailbox(), plaque: button.dataset.mailPlaque })));
    root.querySelectorAll("[data-mail-post]").forEach((button) => button.addEventListener("click", () => saveMailbox({ ...normalizedMailbox(), post: button.dataset.mailPost })));
    root.querySelectorAll("[data-mail-charm]").forEach((button) => button.addEventListener("click", () => saveMailbox({ ...normalizedMailbox(), charm: button.dataset.mailCharm })));
    $("[data-prompt-guide]", root)?.addEventListener("click", () => openPanel("prompts"));
    root.querySelectorAll("[data-copy-prompt]").forEach((button) => button.addEventListener("click", () => copyText(button.dataset.copyPrompt, "Stamp prompt copied")));
    $("[data-copy-all-prompts]", root)?.addEventListener("click", () => copyText(STAMPS.map((stamp, index) => `${index + 1}. ${stamp.name}\n${BASE_PROMPT}, ${stamp.subject}`).join("\n\n"), "All stamp prompts copied"));
    $("[data-album-next]", root)?.addEventListener("click", () => flipAlbum(1));
    $("[data-album-prev]", root)?.addEventListener("click", () => flipAlbum(0));
  }
  function flipAlbum(page) {
    const album = $(".stamp-album", state.panel);
    if (!album) return;
    const unlocked = unlockedStamps();
    album.dataset.page = String(page);
    const pageNode = $(".album-page", album);
    pageNode.classList.remove("turning");
    void pageNode.offsetWidth;
    pageNode.classList.add("turning");
    pageNode.innerHTML = STAMPS.slice(page * 6, page * 6 + 6).map((stamp) => stampCard(stamp, unlocked.has(stamp.id))).join("");
    $("[data-album-prev]", album).disabled = page === 0;
    $("[data-album-next]", album).disabled = page === 1;
  }

  function plaqueTexture(THREE, text, fontId) {
    const canvas = document.createElement("canvas");
    canvas.width = 512; canvas.height = 160;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#efd7a7"; ctx.fillRect(0,0,512,160);
    ctx.strokeStyle = "#4b3528"; ctx.lineWidth = 14; ctx.strokeRect(8,8,496,144);
    ctx.fillStyle = "#3b2a22";
    ctx.font = PLAQUES.find((item) => item.id === fontId)?.font || PLAQUES[0].font;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const clean = String(text || "Player").slice(0,18);
    ctx.fillText(clean, 256, 84, 450);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; return texture;
  }
  function disposeGroup(group) {
    group?.traverse((object) => {
      object.geometry?.dispose?.();
      if (Array.isArray(object.material)) object.material.forEach((material) => { material.map?.dispose?.(); material.dispose?.(); });
      else { object.material?.map?.dispose?.(); object.material?.dispose?.(); }
    });
    group?.parent?.remove(group);
  }
  function createMailbox(THREE, data, username, own, unread) {
    const group = new THREE.Group();
    group.name = own ? "SnugPlayerMailbox" : `SnugNeighborMailbox_${String(username).replace(/\W/g, "").slice(0,18)}`;
    group.userData.mailboxInteractive = own;
    const paint = new THREE.MeshStandardMaterial({ color: data.paint, roughness: .68, metalness: .08 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x3a302a, roughness: .88 });
    const wood = new THREE.MeshStandardMaterial({ color: data.post === "stone" ? 0x8f9088 : 0x74533b, roughness: .95 });
    const red = new THREE.MeshStandardMaterial({ color: 0xd94739, roughness: .58 });
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.08,.72,.82), paint); body.position.y = 1.45; body.castShadow = true;
    const roof = new THREE.Mesh(new THREE.CylinderGeometry(.54,.54,.82,18,1,false,0,Math.PI), paint); roof.rotation.x = Math.PI/2; roof.rotation.z = Math.PI/2; roof.position.y = 1.81; roof.castShadow = true;
    const door = new THREE.Mesh(new THREE.BoxGeometry(.88,.5,.045), dark); door.position.set(0,1.38,.433);
    const post = new THREE.Mesh(data.post === "stone" ? new THREE.CylinderGeometry(.24,.34,1.12,8) : new THREE.BoxGeometry(data.post === "turned" ? .2 : .16,1.14,data.post === "turned" ? .2 : .16), wood); post.position.y = .56;
    group.add(body,roof,door,post);
    if (data.post === "turned") {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(.16,.045,8,18), wood); ring.rotation.x = Math.PI/2; ring.position.y=.62; group.add(ring);
    }
    const plaque = new THREE.Mesh(new THREE.PlaneGeometry(.9,.28), new THREE.MeshBasicMaterial({ map: plaqueTexture(THREE, username, data.plaque), transparent:true }));
    plaque.position.set(0,1.37,.46); plaque.renderOrder=4; group.add(plaque);
    const flagPivot = new THREE.Group(); flagPivot.position.set(.63,1.46,.02);
    const flagBar = new THREE.Mesh(new THREE.BoxGeometry(.075,.7,.07), red); flagBar.position.y=.34;
    const flagHead = new THREE.Mesh(new THREE.CircleGeometry(.16,18), red); flagHead.position.set(0,.72,.04);
    flagPivot.add(flagBar,flagHead); flagPivot.rotation.z = unread ? 0 : -Math.PI/2; flagPivot.userData.targetRotation = flagPivot.rotation.z; flagPivot.name="MailboxFlag"; group.add(flagPivot);
    if (data.charm !== "none") {
      const charm = new THREE.Group(); charm.name=`MailboxCharm_${data.charm}`; charm.position.set(-.42,1.02,.46);
      const gold = new THREE.MeshStandardMaterial({color:data.charm==="shell"?0xf0c89d:0xe5b342,roughness:.62});
      if (data.charm === "shell") { const shell=new THREE.Mesh(new THREE.SphereGeometry(.13,12,7,0,Math.PI*2,0,Math.PI/2),gold); shell.scale.y=.62; charm.add(shell); }
      if (data.charm === "star") { const star=new THREE.Mesh(new THREE.TorusGeometry(.12,.045,6,5),gold); star.rotation.z=Math.PI/2; charm.add(star); }
      if (data.charm === "gnome") { const hat=new THREE.Mesh(new THREE.ConeGeometry(.12,.27,12),red); hat.position.y=.13; const face=new THREE.Mesh(new THREE.SphereGeometry(.1,12,8),gold); charm.add(hat,face); }
      group.add(charm);
    }
    group.scale.setScalar(.82);
    return group;
  }

  async function refreshRemoteProfiles() {
    const missing = state.players.filter((player) => !state.remoteProfiles.has(player.uid));
    await Promise.all(missing.map(async (player) => {
      try { state.remoteProfiles.set(player.uid, await loadProfile(player.uid)); }
      catch { state.remoteProfiles.set(player.uid, { mailbox: { paint: player.outfit || COLORS[1] } }); }
    }));
    updateMailboxWorld();
  }
  function updateMailboxWorld() {
    const world = window.__snugWorld;
    const THREE = window.__snugThree;
    if (!world?.scene || world.mode !== "village" || !THREE?.BoxGeometry || !THREE?.MeshStandardMaterial) return;
    if (state.worldScene !== world.scene) {
      disposeGroup(state.mailboxGroup);
      state.worldScene = world.scene;
      state.mailboxGroup = new THREE.Group();
      state.mailboxGroup.name = "SnugGateMailboxes";
      world.scene.add(state.mailboxGroup);
    }
    while (state.mailboxGroup.children.length) disposeGroup(state.mailboxGroup.children[0]);
    state.mailboxEntries.clear();
    const people = [{ uid: state.session?.uid || "local", name: playerName(), mailbox: normalizedMailbox(), own: true }, ...state.players.slice(0,3).map((player) => ({ uid: player.uid, name: player.name || "Neighbor", mailbox: normalizedMailbox(state.remoteProfiles.get(player.uid)?.mailbox || { paint: player.outfit }), own: false }))];
    const slots = people.length === 1 ? [2.25] : [-2.8,-.95,.95,2.8];
    people.forEach((person,index) => {
      const object = createMailbox(THREE, person.mailbox, person.name, person.own, person.own && unreadMail().length > 0);
      object.position.set(slots[index],0,8.85);
      object.rotation.y=Math.PI;
      object.userData.uid=person.uid;
      state.mailboxGroup.add(object);
      state.mailboxEntries.set(person.uid,object);
    });
    installMailboxPicking(world,THREE);
    animateFlags();
    window.__snugMailboxes = { count: people.length, unread: unreadMail().length, localLabel: playerName() };
  }
  function animateFlags() {
    cancelAnimationFrame(state.flagFrame);
    const tick=()=>{
      let moving=false;
      state.mailboxGroup?.traverse((object)=>{
        if(object.name!=="MailboxFlag")return;
        const delta=object.userData.targetRotation-object.rotation.z;
        if(Math.abs(delta)>.003){object.rotation.z+=delta*.1;moving=true;}else object.rotation.z=object.userData.targetRotation;
      });
      if(moving)state.flagFrame=requestAnimationFrame(tick);
    };
    state.flagFrame=requestAnimationFrame(tick);
  }
  function installMailboxPicking(world,THREE) {
    const element=world.renderer?.domElement;
    if(!element||state.rendererElement===element)return;
    if(state.rendererElement&&state._pointerHandler)state.rendererElement.removeEventListener("pointerup",state._pointerHandler,true);
    state.rendererElement=element;
    state.raycaster=new THREE.Raycaster(); state.pointer=new THREE.Vector2();
    state._pointerHandler=(event)=>{
      if(!state.mailboxGroup||document.body.classList.contains("mailbox-open"))return;
      const rect=element.getBoundingClientRect();
      state.pointer.set(((event.clientX-rect.left)/rect.width)*2-1,-((event.clientY-rect.top)/rect.height)*2+1);
      state.raycaster.setFromCamera(state.pointer,world.camera);
      const hits=state.raycaster.intersectObject(state.mailboxGroup,true);
      if(!hits.length)return;
      let object=hits[0].object; while(object&&object.parent!==state.mailboxGroup)object=object.parent;
      if(object?.userData.mailboxInteractive){event.preventDefault();event.stopPropagation();openPanel("inbox");}
    };
    element.addEventListener("pointerup",state._pointerHandler,true);
  }

  function renderDock() {
    let dock=$(".mailbox-dock");
    if(!dock){dock=document.createElement("button");dock.type="button";dock.className="mailbox-dock";dock.innerHTML='<i aria-hidden="true"><span></span></i><b>Mailbox</b><em></em>';dock.addEventListener("click",()=>openPanel("inbox"));document.body.appendChild(dock);}
    dock.hidden=window.__snugWorld?.mode!=="village"||document.documentElement.classList.contains("snug-start-open");
    const count=unreadMail().length; const badge=$("em",dock); badge.textContent=count?String(count):"";badge.hidden=!count;dock.classList.toggle("has-mail",count>0);
  }

  async function poll() {
    if(!state.session)return;
    try{
      const next=await loadMail();
      const priorIds=new Set(state.mail.map((item)=>item.id));
      state.mail=next;
      const fresh=next.find((item)=>!priorIds.has(item.id)&&item.from!==state.session.uid);
      if(fresh&&priorIds.size){showToast(`${fresh.fromName || "A neighbor"} sent mail`);window.dispatchEvent(new CustomEvent("snug-sfx",{detail:{id:"ready"}}));}
      renderDock();updateMailboxWorld();renderPanel();
    }catch{}
  }
  async function attachSession(session) {
    state.session=session;
    try{state.profile={...state.profile,...await loadProfile()};}catch{}
    state.profile.mailbox=normalizedMailbox(state.profile.mailbox);
    await reconcileStamps();
    await poll();
    clearInterval(state.polling);state.polling=setInterval(poll,4000);
    renderDock();updateMailboxWorld();
  }

  window.addEventListener("snug-session",(event)=>attachSession(event.detail));
  window.addEventListener("snug-remote-players",(event)=>{state.players=Array.isArray(event.detail?.players)?event.detail.players:[];refreshRemoteProfiles();renderPanel();});
  ["snug-world-ready","snug-world-expanded","cylindric-world-layout-applied"].forEach((eventName)=>window.addEventListener(eventName,()=>[0,180,700].forEach((delay)=>setTimeout(updateMailboxWorld,delay))));
  window.addEventListener("snug-player-patch",()=>setTimeout(async()=>{try{state.profile={...state.profile,...await loadProfile()};await reconcileStamps();renderPanel();}catch{}},900));
  window.addEventListener("snug-garden-planted",()=>unlockStamp("sprout"));
  window.addEventListener("snug-garden-harvest",(event)=>unlockStamp(event.detail?.golden?"golden-harvest":"sprout"));
  window.addEventListener("snug-house-renovation",(event)=>{if(Number(event.detail?.stories||0)>=2)unlockStamp("master-builder");});
  window.addEventListener("snug-whirl-result",(event)=>{if(event.detail?.won)unlockStamp("whirl-winner");});
  window.addEventListener("snug-board-result",(event)=>{if(event.detail?.won)unlockStamp("star-sailor");});
  window.addEventListener("snug-project-contribution",(event)=>{if(/bridge/i.test(event.detail?.project||""))unlockStamp("bridge-crew");});
  window.addEventListener("snug-photo-captured",()=>{const box=normalizedMailbox();saveMailbox({...box,photoCount:Number(box.photoCount||0)+1},"").then(reconcileStamps);});
  async function unlockStamp(id){const box=normalizedMailbox();if(box.stamps.includes(id))return;await saveMailbox({...box,stamps:[...box.stamps,id]},"");showToast(`${STAMPS.find((stamp)=>stamp.id===id)?.name||"New"} stamp unlocked`);}
  if(window.__snugSession)attachSession(window.__snugSession);
  renderDock();
  setInterval(()=>{
    renderDock();
    const world=window.__snugWorld;
    if(world?.mode==="village"&&(!state.mailboxGroup||state.worldScene!==world.scene))updateMailboxWorld();
  },1800);
})();

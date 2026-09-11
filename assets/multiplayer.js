import * as THREE from "three";

const GAME_DEFS = {
  coin: { name: "Coin Scramble", duration: 30000, note: "Move through the plaza and scoop up the coins." },
  tag: { name: "Plaza Tag", duration: 35000, note: "Stay nimble. If you’re it, catch someone." },
  quiz: { name: "Room Quiz", duration: 36000, note: "Answer in room chat. Fastest correct answer scores two." },
};
const QUIZ = [
  { q: "Which planet is known as the Red Planet?", a: "mars" },
  { q: "How many sides does a hexagon have?", a: "six", also: ["6"] },
  { q: "What is the largest ocean on Earth?", a: "pacific", also: ["pacific ocean"] },
  { q: "What do bees collect from flowers?", a: "nectar" },
  { q: "Which animal is famous for changing color?", a: "chameleon" },
  { q: "What is frozen water called?", a: "ice" },
  { q: "How many days are in a leap year?", a: "366", also: ["three hundred sixty six", "three hundred and sixty six"] },
  { q: "What is the opposite of north?", a: "south" },
  { q: "Which instrument has black and white keys?", a: "piano" },
];

const state = {
  session: null,
  roomId: "plaza",
  roomName: "Village Plaza",
  isPrivate: false,
  players: [],
  messages: [],
  minigameEvents: [],
  currentGame: null,
  position: { x: 0, z: 1.5, rotation: 0 },
  panel: null,
  polling: null,
  heartbeat: null,
  gameClock: null,
  busy: false,
  rolling: false,
  error: "",
  coinGroup: null,
  coinPositions: [],
  coinRoundId: "",
  claiming: new Set(),
  actionBusy: false,
  tagCooldownUntil: 0,
  quizTimers: [],
};

const $ = (selector, root = document) => root.querySelector(selector);
const escPath = (value) => String(value).split("/").map(encodeURIComponent).join("/");
const playerName = () => $(".profile-chip b")?.textContent?.trim() || "Player";
const playerColor = () => $(".avatar-dot")?.style?.background || "#ed765e";

function databaseBase() {
  const options = state.session?.app?.options || {};
  return String(options.databaseURL || `https://${options.projectId || state.session?.projectId}-default-rtdb.firebaseio.com`).replace(/\/$/, "");
}

async function request(path, options = {}) {
  if (!state.session?.user) throw new Error("Waiting for Firebase sign-in");
  const token = await state.session.user.getIdToken();
  const [pathPart, query = ""] = String(path).split("?");
  const response = await fetch(`${databaseBase()}/${escPath(pathPart)}.json${query ? `?${query}` : ""}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const detail = body?.error || `Realtime Database returned ${response.status}`;
    throw new Error(detail);
  }
  return response.json().catch(() => null);
}

function makeRoomCode() {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(10));
  return Array.from(bytes, (byte) => alphabet[byte % alphabet.length]).join("");
}

async function ensureMembership(roomId) {
  await request(`rooms/${roomId}/members/${state.session.uid}`, {
    method: "PUT",
    body: JSON.stringify(true),
  });
}

async function createPrivateRoom() {
  if (state.busy) return;
  state.busy = true;
  state.error = "";
  renderPanel();
  try {
    const roomId = `room-${makeRoomCode()}`;
    await request(`rooms/${roomId}`, {
      method: "PUT",
      body: JSON.stringify({
        name: `${playerName()}’s room`,
        private: true,
        ownerId: state.session.uid,
        createdAt: Date.now(),
        members: { [state.session.uid]: true },
      }),
    });
    await switchRoom(roomId, `${playerName()}’s room`, true);
  } catch (error) {
    state.error = friendlyError(error);
  } finally {
    state.busy = false;
    renderPanel();
  }
}

async function joinPrivateRoom(code) {
  const roomId = String(code || "").trim().toLowerCase();
  if (!/^room-[a-z2-9]{10}$/.test(roomId)) {
    state.error = "That room code doesn’t look right.";
    renderPanel();
    return;
  }
  if (state.busy) return;
  state.busy = true;
  state.error = "";
  renderPanel();
  try {
    await ensureMembership(roomId);
    await switchRoom(roomId, "Private room", true);
  } catch (error) {
    state.error = friendlyError(error);
  } finally {
    state.busy = false;
    renderPanel();
  }
}

async function switchRoom(roomId, roomName, isPrivate) {
  const oldRoom = state.roomId;
  if (state.session && oldRoom !== roomId) {
    request(`presence/${oldRoom}/${state.session.uid}`, { method: "DELETE" }).catch(() => {});
  }
  clearQuizTimers();
  teardownCoins();
  state.roomId = roomId;
  state.roomName = roomName;
  state.isPrivate = isPrivate;
  state.players = [];
  state.messages = [];
  state.minigameEvents = [];
  state.currentGame = null;
  state.error = "";
  if (isPrivate) await ensureMembership(roomId);
  await heartbeat();
  await poll();
  renderDock();
  renderGameHud();
  renderPanel();
}

async function heartbeat() {
  if (!state.session) return;
  await request(`presence/${state.roomId}/${state.session.uid}`, {
    method: "PUT",
    body: JSON.stringify({
      uid: state.session.uid,
      name: playerName().slice(0, 18),
      outfit: playerColor(),
      x: Number(state.position.x.toFixed(3)),
      z: Number(state.position.z.toFixed(3)),
      rotation: Number(state.position.rotation.toFixed(3)),
      updatedAt: Date.now(),
    }),
  });
}

async function poll() {
  if (!state.session) return;
  try {
    const [presence, messages, minigames] = await Promise.all([
      request(`presence/${state.roomId}`),
      request(`messages/${state.roomId}?orderBy=%22createdAt%22&limitToLast=50`),
      request(`minigames/${state.roomId}/events?orderBy=%22createdAt%22&limitToLast=50`),
    ]);
    const cutoff = Date.now() - 20000;
    state.players = Object.values(presence || {}).filter((entry) => entry?.uid && entry.uid !== state.session.uid && Number(entry.updatedAt) > cutoff);
    state.messages = Object.entries(messages || {}).map(([id, entry]) => ({ id, ...entry })).filter((entry) => entry?.text).sort(byCreatedAt).slice(-50);
    state.minigameEvents = Object.entries(minigames || {}).map(([id, entry]) => ({ id, ...entry })).filter((entry) => entry?.type).sort(byCreatedAt).slice(-50);
    deriveCurrentGame();
    state.error = "";
    window.dispatchEvent(new CustomEvent("snug-remote-players", { detail: { players: state.players } }));
    renderDock();
    renderGameHud();
    renderPanel();
  } catch (error) {
    state.error = friendlyError(error);
    renderDock();
    renderGameHud();
    renderPanel();
  }
}

function byCreatedAt(a, b) {
  return Number(a.createdAt || 0) - Number(b.createdAt || 0) || String(a.id).localeCompare(String(b.id));
}

async function sendRoomMessage(text, name = playerName()) {
  const clean = String(text || "").trim().replace(/\s+/g, " ").slice(0, 240);
  if (!clean || !state.session) return;
  return request(`messages/${state.roomId}`, {
    method: "POST",
    body: JSON.stringify({
      uid: state.session.uid,
      name: String(name).slice(0, 18),
      text: clean,
      createdAt: Date.now(),
    }),
  });
}

async function sendMessage(text) {
  const clean = String(text || "").trim().replace(/\s+/g, " ").slice(0, 240);
  if (!clean || !state.session) return;
  try {
    await checkQuizAnswer(clean);
    await sendRoomMessage(clean);
    await poll();
  } catch (error) {
    state.error = friendlyError(error);
    renderPanel();
  }
}

function friendlyError(error) {
  const text = String(error?.message || error || "");
  if (/permission|denied|unauthorized/i.test(text)) return "Realtime Database rules need the included multiplayer rules before rooms and games can connect.";
  if (/failed to fetch|network/i.test(text)) return "Rooms are offline right now. Your solo game still works.";
  return text || "Rooms couldn’t connect.";
}

function copyCode() {
  const code = state.roomId;
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(code).then(() => showToast("Room code copied")).catch(() => fallbackCopy(code));
  } else fallbackCopy(code);
}

function fallbackCopy(value) {
  const input = document.createElement("textarea");
  input.value = value;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
  showToast("Room code copied");
}

function showToast(text) {
  let toast = $(".multiplayer-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "multiplayer-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1900);
}

function dieMarkup() {
  return `<span class="mini-die" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>`;
}

function renderDock() {
  let dock = $(".room-dock");
  if (!dock) {
    dock = document.createElement("button");
    dock.type = "button";
    dock.className = "room-dock";
    dock.addEventListener("click", () => openPanel("rooms"));
    document.body.appendChild(dock);
  }
  const count = state.players.length + 1;
  dock.innerHTML = `<span class="room-live"></span><span>${state.isPrivate ? "Private" : "Plaza"}</span><b>${count}</b>`;
  dock.setAttribute("aria-label", `${state.roomName}, ${count} online. Open rooms`);
  dock.classList.toggle("offline", !state.session || Boolean(state.error));
}

function openPanel(view = "rooms") {
  closePanel();
  document.querySelector(".sheet-backdrop .icon-btn")?.click();
  document.body.classList.add("snug-room-modal-open");
  const backdrop = document.createElement("div");
  backdrop.className = "multiplayer-backdrop";
  backdrop.addEventListener("pointerdown", (event) => {
    if (event.target === backdrop) closePanel();
  });
  const panel = document.createElement("section");
  panel.className = "multiplayer-sheet";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  panel.dataset.view = view;
  backdrop.appendChild(panel);
  document.body.appendChild(backdrop);
  state.panel = backdrop;
  renderPanel();
}

function closePanel() {
  state.panel?.remove();
  state.panel = null;
  document.body.classList.remove("snug-room-modal-open");
}

function renderPanel() {
  const panel = state.panel?.querySelector(".multiplayer-sheet");
  if (!panel) return;
  const view = panel.dataset.view || "rooms";
  const online = state.players.length + 1;
  const header = `<div class="multi-grabber"></div><div class="multi-head"><div><small>${state.isPrivate ? "Invite-only" : "Shared room"}</small><h2>${escapeHtml(state.roomName)}</h2></div><button type="button" class="multi-close" aria-label="Close rooms">×</button></div>`;
  const error = state.error ? `<div class="multi-error" role="status">${escapeHtml(state.error)}</div>` : "";
  if (view === "chat") {
    const messages = state.messages.length ? state.messages.map((message) => `<div class="multi-message ${message.uid === state.session?.uid ? "mine" : ""}"><b>${escapeHtml(message.name || "Player")}</b><p>${escapeHtml(message.text)}</p></div>`).join("") : `<div class="multi-empty">No messages yet. You’re first in the room.</div>`;
    panel.innerHTML = `${header}<div class="multi-switch"><button type="button" data-view="rooms">Room</button><button type="button" class="active" data-view="chat">Chat</button></div>${error}${quizChatPrompt()}<div class="multi-messages">${messages}</div><form class="multi-compose"><input maxlength="240" aria-label="Room message" placeholder="${state.currentGame?.game === "quiz" && !gameExpired() ? "Type your answer…" : "Say something kind…"}" autocomplete="off"><button type="submit" aria-label="Send message">Send</button></form>`;
  } else {
    const people = state.players.length ? state.players.map((player) => `<li><span style="background:${safeColor(player.outfit)}">${escapeHtml(String(player.name || "P").slice(0, 1).toUpperCase())}</span><b>${escapeHtml(player.name || "Player")}</b><small>Here now</small></li>`).join("") : `<li class="multi-empty-row"><span>•</span><b>The room is quiet</b><small>Invite someone in</small></li>`;
    panel.innerHTML = `${header}<div class="multi-switch"><button type="button" class="active" data-view="rooms">Room</button><button type="button" data-view="chat">Chat</button></div>${error}${playEntry()}<div class="room-summary"><span><b>${online}</b> online</span><span>${state.isPrivate ? "Only people with the code can join" : "Open to everyone"}</span></div><ul class="multi-people"><li><span style="background:${safeColor(playerColor())}">${escapeHtml(playerName().slice(0, 1).toUpperCase())}</span><b>${escapeHtml(playerName())}</b><small>You</small></li>${people}</ul>${state.isPrivate ? `<div class="invite-code"><div><small>Invite code</small><b>${state.roomId}</b></div><button type="button" data-action="copy">Copy</button></div>` : ""}<div class="room-actions"><button type="button" class="multi-primary" data-action="${state.isPrivate ? "plaza" : "create"}">${state.busy ? "Connecting…" : state.isPrivate ? "Return to plaza" : "Create private room"}</button>${!state.isPrivate ? `<div class="join-row"><input aria-label="Private room code" placeholder="Room code" autocomplete="off" autocapitalize="none"><button type="button" data-action="join">Join</button></div>` : ""}</div>`;
  }
  $(".multi-close", panel)?.addEventListener("click", closePanel);
  panel.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => {
    panel.dataset.view = button.dataset.view;
    renderPanel();
  }));
  $("[data-action='play']", panel)?.addEventListener("click", startRandomGame);
  $("[data-action='open-chat']", panel)?.addEventListener("click", () => { panel.dataset.view = "chat"; renderPanel(); });
  $("[data-action='copy']", panel)?.addEventListener("click", copyCode);
  $("[data-action='create']", panel)?.addEventListener("click", createPrivateRoom);
  $("[data-action='plaza']", panel)?.addEventListener("click", () => switchRoom("plaza", "Village Plaza", false));
  $("[data-action='join']", panel)?.addEventListener("click", () => joinPrivateRoom($(".join-row input", panel)?.value));
  $(".multi-compose", panel)?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const input = $("input", event.currentTarget);
    const text = input.value;
    input.value = "";
    await sendMessage(text);
  });
  const messages = $(".multi-messages", panel);
  if (messages) messages.scrollTop = messages.scrollHeight;
}

function playEntry() {
  const game = state.currentGame;
  if (game && !gameExpired()) {
    const score = scoreFor(state.session?.uid);
    return `<div class="play-entry active"><span><small>Round in play</small><b>${GAME_DEFS[game.game].name}</b><em>${score} point${score === 1 ? "" : "s"}</em></span>${game.game === "quiz" ? `<button type="button" data-action="open-chat">Chat</button>` : `<strong>${secondsLeft()}s</strong>`}</div>`;
  }
  return `<button type="button" class="play-entry" data-action="play" ${state.rolling || !state.session ? "disabled" : ""}>${dieMarkup()}<span><small>${state.rolling ? "Rolling the room dice…" : "Ready for a round?"}</small><b>${state.rolling ? "Choosing a game" : "Play"}</b></span><strong>${state.rolling ? "" : "Roll"}</strong></button>`;
}

function quizChatPrompt() {
  if (state.currentGame?.game !== "quiz" || gameExpired()) return "";
  const index = currentQuizIndex();
  const item = quizItem(state.currentGame, index);
  return `<div class="quiz-chat-prompt"><small>Question ${index + 1} of 3 · ${secondsLeft()}s left</small><b>${escapeHtml(item.q)}</b></div>`;
}

function safeColor(value) {
  return /^#[0-9a-f]{6}$/i.test(String(value || "")) ? value : "#5c8fd8";
}

function escapeHtml(value) {
  const node = document.createElement("span");
  node.textContent = String(value ?? "");
  return node.innerHTML;
}

function randomIndex(max) {
  const bytes = crypto.getRandomValues(new Uint8Array(1));
  return bytes[0] % max;
}

async function startRandomGame() {
  if (state.rolling || state.busy || !state.session) return;
  if (state.currentGame && !gameExpired()) {
    showToast("This round is still going");
    return;
  }
  if (window.__snugWorld?.mode && window.__snugWorld.mode !== "village") {
    showToast("Head to the village plaza to play");
    return;
  }
  state.rolling = true;
  renderPanel();
  await new Promise((resolve) => setTimeout(resolve, 650));
  try {
    const games = Object.keys(GAME_DEFS);
    const game = games[randomIndex(games.length)];
    const participants = [state.session.uid, ...state.players.map((player) => player.uid)].filter(Boolean);
    const seed = crypto.getRandomValues(new Uint32Array(1))[0];
    const itUid = participants[seed % participants.length];
    const start = {
      type: "start",
      game,
      uid: state.session.uid,
      name: playerName().slice(0, 18),
      createdAt: Date.now(),
      duration: GAME_DEFS[game].duration,
      seed,
      itUid,
      players: participants,
    };
    const result = await request(`minigames/${state.roomId}/events`, { method: "POST", body: JSON.stringify(start) });
    state.minigameEvents.push({ id: result?.name || `local-${start.createdAt}`, ...start });
    deriveCurrentGame();
    const announcement = game === "quiz" ? `The dice picked Room Quiz. Question 1: ${quizItem(state.currentGame, 0).q}` : `The dice picked ${GAME_DEFS[game].name}. ${GAME_DEFS[game].note}`;
    await sendRoomMessage(announcement, "Game Host");
    if (game === "quiz") {
      scheduleQuizMessages(state.currentGame);
      if (state.panel) state.panel.querySelector(".multiplayer-sheet").dataset.view = "chat";
    } else closePanel();
    renderPanel();
    renderGameHud();
    showToast(`${GAME_DEFS[game].name} begins`);
  } catch (error) {
    state.error = friendlyError(error);
    showToast(state.error);
  } finally {
    state.rolling = false;
    renderPanel();
  }
}

function deriveCurrentGame() {
  const starts = state.minigameEvents.filter((event) => event.type === "start" && GAME_DEFS[event.game]);
  const start = starts.at(-1) || null;
  if (!start) {
    state.currentGame = null;
    teardownCoins();
    return;
  }
  const changed = state.currentGame?.id !== start.id;
  state.currentGame = start;
  if (changed) {
    state.tagCooldownUntil = 0;
    if (start.game === "coin") setupCoins(start);
    else teardownCoins();
  } else if (start.game === "coin") updateCoinVisibility();
}

function roundEvents(type) {
  const id = state.currentGame?.id;
  if (!id) return [];
  return state.minigameEvents.filter((event) => event.roundId === id && (!type || event.type === type));
}

function gameExpired() {
  if (!state.currentGame) return true;
  return Date.now() >= Number(state.currentGame.createdAt) + Number(state.currentGame.duration || GAME_DEFS[state.currentGame.game]?.duration || 30000);
}

function secondsLeft() {
  if (!state.currentGame) return 0;
  return Math.max(0, Math.ceil((Number(state.currentGame.createdAt) + Number(state.currentGame.duration || 30000) - Date.now()) / 1000));
}

function scores() {
  if (!state.currentGame) return {};
  const result = {};
  if (state.currentGame.game === "coin") {
    const claimed = new Set();
    roundEvents("coin").forEach((event) => {
      const coin = Number(event.item);
      if (claimed.has(coin)) return;
      claimed.add(coin);
      result[event.uid] = (result[event.uid] || 0) + 1;
    });
  } else if (state.currentGame.game === "tag") {
    roundEvents("tag").forEach((event) => { result[event.uid] = (result[event.uid] || 0) + 1; });
  } else if (state.currentGame.game === "quiz") {
    const first = new Set();
    roundEvents("quiz-answer").forEach((event) => {
      const question = Number(event.question);
      const points = first.has(question) ? 1 : 2;
      first.add(question);
      result[event.uid] = (result[event.uid] || 0) + points;
    });
  }
  return result;
}

function scoreFor(uid) {
  return scores()[uid] || 0;
}

function winnerUid() {
  const entries = Object.entries(scores());
  if (!entries.length) return "";
  return entries.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0][0];
}

function currentItUid() {
  let uid = state.currentGame?.itUid || "";
  roundEvents("tag").forEach((event) => { uid = event.targetUid || uid; });
  return uid;
}

function currentQuizIndex() {
  if (!state.currentGame) return 0;
  const elapsed = Math.max(0, Date.now() - Number(state.currentGame.createdAt));
  return Math.min(2, Math.floor(elapsed / 12000));
}

function quizItem(game, index) {
  const seed = Number(game?.seed || 0);
  return QUIZ[(seed + index * 4) % QUIZ.length];
}

function normalizeAnswer(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9 ]/g, "").replace(/\s+/g, " ").trim();
}

async function checkQuizAnswer(text) {
  if (state.currentGame?.game !== "quiz" || gameExpired()) return;
  const question = currentQuizIndex();
  if (roundEvents("quiz-answer").some((event) => event.uid === state.session.uid && Number(event.question) === question)) return;
  const item = quizItem(state.currentGame, question);
  const answer = normalizeAnswer(text);
  const accepted = [item.a, ...(item.also || [])].map(normalizeAnswer);
  if (!accepted.includes(answer)) return;
  await postGameEvent("quiz-answer", { question });
  showToast("Correct answer");
}

async function postGameEvent(type, extra = {}) {
  if (!state.session || !state.currentGame) return null;
  const event = {
    type,
    game: state.currentGame.game,
    uid: state.session.uid,
    name: playerName().slice(0, 18),
    roundId: state.currentGame.id,
    createdAt: Date.now(),
    ...extra,
  };
  const result = await request(`minigames/${state.roomId}/events`, { method: "POST", body: JSON.stringify(event) });
  state.minigameEvents.push({ id: result?.name || `local-${event.createdAt}`, ...event });
  return event;
}

function seededPositions(seed) {
  let value = (Number(seed) || 1) >>> 0;
  const next = () => {
    value += 0x6d2b79f5;
    let t = value;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return Array.from({ length: 12 }, () => ({ x: -4.4 + next() * 8.8, z: -3.8 + next() * 7.6 }));
}

function setupCoins(game) {
  const world = window.__snugWorld;
  if (!world?.scene || world.mode !== "village") return;
  if (state.coinRoundId === game.id && state.coinGroup) return;
  teardownCoins();
  state.coinRoundId = game.id;
  state.coinPositions = seededPositions(game.seed);
  const group = new THREE.Group();
  group.name = "snug-coin-scramble";
  const geometry = new THREE.CylinderGeometry(0.18, 0.18, 0.055, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xf3bd45, roughness: 0.42, metalness: 0.3, emissive: 0x4b2a00, emissiveIntensity: 0.08 });
  state.coinPositions.forEach((point, index) => {
    const coin = new THREE.Mesh(geometry, material);
    coin.rotation.x = Math.PI / 2;
    coin.position.set(point.x, 0.36, point.z);
    coin.userData.item = index;
    group.add(coin);
  });
  world.scene.add(group);
  state.coinGroup = group;
  updateCoinVisibility();
}

function teardownCoins() {
  if (!state.coinGroup) return;
  state.coinGroup.parent?.remove(state.coinGroup);
  state.coinGroup.traverse((object) => {
    if (object.isMesh) {
      object.geometry?.dispose?.();
      object.material?.dispose?.();
    }
  });
  state.coinGroup = null;
  state.coinRoundId = "";
  state.coinPositions = [];
}

function updateCoinVisibility() {
  if (!state.coinGroup) return;
  const claimed = new Set(roundEvents("coin").map((event) => Number(event.item)));
  state.coinGroup.children.forEach((coin) => { coin.visible = !claimed.has(Number(coin.userData.item)); });
}

async function detectCoinPickup() {
  if (state.actionBusy || gameExpired() || state.currentGame?.game !== "coin") return;
  const claimed = new Set(roundEvents("coin").map((event) => Number(event.item)));
  const index = state.coinPositions.findIndex((point, item) => !claimed.has(item) && Math.hypot(point.x - state.position.x, point.z - state.position.z) < 0.58);
  if (index < 0) return;
  state.actionBusy = true;
  try {
    await postGameEvent("coin", { item: index });
    updateCoinVisibility();
    showToast("Coin collected");
  } catch (error) {
    state.error = friendlyError(error);
  } finally {
    state.actionBusy = false;
  }
}

async function detectTag() {
  if (state.actionBusy || gameExpired() || state.currentGame?.game !== "tag" || currentItUid() !== state.session?.uid || Date.now() < state.tagCooldownUntil) return;
  const target = state.players.find((player) => Math.hypot(Number(player.x) - state.position.x, Number(player.z) - state.position.z) < 0.72);
  if (!target) return;
  state.actionBusy = true;
  state.tagCooldownUntil = Date.now() + 1500;
  try {
    await postGameEvent("tag", { targetUid: target.uid, targetName: String(target.name || "Player").slice(0, 18) });
    showToast(`${target.name || "Player"} is it`);
  } catch (error) {
    state.error = friendlyError(error);
  } finally {
    state.actionBusy = false;
  }
}

function clearQuizTimers() {
  state.quizTimers.forEach(clearTimeout);
  state.quizTimers = [];
}

function scheduleQuizMessages(game) {
  clearQuizTimers();
  [1, 2].forEach((index) => {
    state.quizTimers.push(setTimeout(() => {
      if (state.currentGame?.id !== game.id) return;
      sendRoomMessage(`Question ${index + 1}: ${quizItem(game, index).q}`, "Room Quiz").catch(() => {});
    }, index * 12000));
  });
}

function awardForCurrentGame() {
  const score = scoreFor(state.session.uid);
  const won = winnerUid() === state.session.uid && score > 0;
  const base = state.currentGame.game === "coin" ? 8 : state.currentGame.game === "tag" ? 9 : 10;
  const each = state.currentGame.game === "coin" ? 2 : state.currentGame.game === "tag" ? 3 : 4;
  return base + score * each + (won ? 10 : 0);
}

async function claimReward() {
  const game = state.currentGame;
  if (!game || !gameExpired() || !state.session) return;
  const eligible = Array.isArray(game.players) && game.players.includes(state.session.uid);
  if (!eligible) return;
  const alreadyClaimed = roundEvents("claim").some((event) => event.uid === state.session.uid);
  if (alreadyClaimed || state.claiming.has(game.id)) return;
  state.claiming.add(game.id);
  try {
    const amount = awardForCurrentGame();
    await postGameEvent("claim", { amount });
    window.dispatchEvent(new CustomEvent("snug-award-coins", { detail: { amount, message: `Round complete · +${amount} shells` } }));
    showToast(`Round complete · +${amount} shells`);
  } catch (error) {
    state.error = friendlyError(error);
  }
}

function renderGameHud() {
  let hud = $(".room-game-hud");
  const game = state.currentGame;
  if (!game || (gameExpired() && Date.now() > Number(game.createdAt) + Number(game.duration) + 8000)) {
    hud?.remove();
    return;
  }
  if (!hud) {
    hud = document.createElement("button");
    hud.type = "button";
    hud.className = "room-game-hud";
    hud.addEventListener("click", () => openPanel(state.currentGame?.game === "quiz" ? "chat" : "rooms"));
    document.body.appendChild(hud);
  }
  const score = scoreFor(state.session?.uid);
  if (gameExpired()) {
    const winner = winnerUid();
    hud.innerHTML = `<span><small>Round complete</small><b>${winner === state.session?.uid && score ? "You won" : GAME_DEFS[game.game].name}</b></span><strong>${score} pt</strong>`;
    return;
  }
  let detail = `${score} pt`;
  if (game.game === "tag") detail = currentItUid() === state.session?.uid ? "YOU’RE IT" : `${score} tag${score === 1 ? "" : "s"}`;
  if (game.game === "quiz") detail = `Q${currentQuizIndex() + 1} · ${score} pt`;
  hud.innerHTML = `<span><small>${GAME_DEFS[game.game].name}</small><b>${game.game === "quiz" ? escapeHtml(quizItem(game, currentQuizIndex()).q) : escapeHtml(GAME_DEFS[game.game].note)}</b></span><strong>${secondsLeft()}s · ${detail}</strong>`;
}

function tickGame() {
  const game = state.currentGame;
  if (!game) return;
  if (game.game === "coin") {
    if (!state.coinGroup) setupCoins(game);
    detectCoinPickup();
    if (state.coinGroup) {
      const time = performance.now() * 0.003;
      state.coinGroup.children.forEach((coin, index) => {
        coin.rotation.z = time + index * 0.4;
        coin.position.y = 0.36 + Math.sin(time * 1.4 + index) * 0.07;
      });
    }
  }
  if (game.game === "tag") detectTag();
  if (gameExpired()) {
    teardownCoins();
    claimReward();
  }
  renderGameHud();
}

function attachSession(session) {
  if (!session?.uid || state.session?.uid === session.uid) return;
  state.session = session;
  heartbeat().catch((error) => { state.error = friendlyError(error); renderDock(); });
  clearInterval(state.polling);
  clearInterval(state.heartbeat);
  clearInterval(state.gameClock);
  state.polling = setInterval(poll, 2000);
  state.heartbeat = setInterval(() => heartbeat().catch(() => {}), 5000);
  state.gameClock = setInterval(tickGame, 250);
  poll();
  renderDock();
}

window.addEventListener("snug-session", (event) => attachSession(event.detail));
window.addEventListener("snug-player-move", (event) => {
  state.position = event.detail || state.position;
});
window.addEventListener("snug-world-ready", () => {
  if (state.currentGame?.game === "coin" && !gameExpired()) setupCoins(state.currentGame);
});
window.addEventListener("pointerdown", (event) => {
  const chatButton = event.target.closest?.("button[aria-label='Open local chat'], .nearby-card button");
  if (!chatButton) return;
  event.preventDefault();
  event.stopPropagation();
  openPanel("chat");
}, true);
window.addEventListener("pagehide", () => {
  if (state.session) request(`presence/${state.roomId}/${state.session.uid}`, { method: "DELETE", keepalive: true }).catch(() => {});
});

renderDock();
if (window.__snugSession) attachSession(window.__snugSession);

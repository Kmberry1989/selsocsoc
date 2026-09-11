const state = {
  session: null,
  roomId: "plaza",
  roomName: "Village Plaza",
  isPrivate: false,
  players: [],
  messages: [],
  position: { x: 0, z: 1.5, rotation: 0 },
  panel: null,
  polling: null,
  heartbeat: null,
  busy: false,
  error: "",
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
  state.roomId = roomId;
  state.roomName = roomName;
  state.isPrivate = isPrivate;
  state.players = [];
  state.messages = [];
  state.error = "";
  if (isPrivate) await ensureMembership(roomId);
  await heartbeat();
  await poll();
  renderDock();
  renderPanel();
}

async function heartbeat() {
  if (!state.session) return;
  const now = Date.now();
  await request(`presence/${state.roomId}/${state.session.uid}`, {
    method: "PUT",
    body: JSON.stringify({
      uid: state.session.uid,
      name: playerName().slice(0, 18),
      outfit: playerColor(),
      x: Number(state.position.x.toFixed(3)),
      z: Number(state.position.z.toFixed(3)),
      rotation: Number(state.position.rotation.toFixed(3)),
      updatedAt: now,
    }),
  });
}

async function poll() {
  if (!state.session) return;
  try {
    const [presence, messages] = await Promise.all([
      request(`presence/${state.roomId}`),
      request(`messages/${state.roomId}?orderBy=%22$key%22&limitToLast=50`),
    ]);
    const cutoff = Date.now() - 20000;
    state.players = Object.values(presence || {}).filter((entry) => entry?.uid && entry.uid !== state.session.uid && Number(entry.updatedAt) > cutoff);
    state.messages = Object.entries(messages || {}).map(([id, entry]) => ({ id, ...entry })).filter((entry) => entry?.text).slice(-50);
    state.error = "";
    window.dispatchEvent(new CustomEvent("snug-remote-players", { detail: { players: state.players } }));
    renderDock();
    renderPanel();
  } catch (error) {
    state.error = friendlyError(error);
    renderDock();
    renderPanel();
  }
}

async function sendMessage(text) {
  const clean = String(text || "").trim().replace(/\s+/g, " ").slice(0, 240);
  if (!clean || !state.session) return;
  try {
    await request(`messages/${state.roomId}`, {
      method: "POST",
      body: JSON.stringify({
        uid: state.session.uid,
        name: playerName().slice(0, 18),
        text: clean,
        createdAt: Date.now(),
      }),
    });
    await poll();
  } catch (error) {
    state.error = friendlyError(error);
    renderPanel();
  }
}

function friendlyError(error) {
  const text = String(error?.message || error || "");
  if (/permission|denied|unauthorized/i.test(text)) return "Realtime Database rules need the included multiplayer rules before rooms can connect.";
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
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
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
}

function renderPanel() {
  const panel = state.panel?.querySelector(".multiplayer-sheet");
  if (!panel) return;
  const view = panel.dataset.view || "rooms";
  const online = state.players.length + 1;
  const header = `<div class="multi-grabber"></div><div class="multi-head"><div><small>${state.isPrivate ? "Invite-only" : "Shared room"}</small><h2>${state.roomName}</h2></div><button type="button" class="multi-close" aria-label="Close rooms">×</button></div>`;
  const error = state.error ? `<div class="multi-error" role="status">${escapeHtml(state.error)}</div>` : "";
  if (view === "chat") {
    const messages = state.messages.length ? state.messages.map((message) => `<div class="multi-message ${message.uid === state.session?.uid ? "mine" : ""}"><b>${escapeHtml(message.name || "Player")}</b><p>${escapeHtml(message.text)}</p></div>`).join("") : `<div class="multi-empty">No messages yet. You’re first in the room.</div>`;
    panel.innerHTML = `${header}<div class="multi-switch"><button type="button" data-view="rooms">Room</button><button type="button" class="active" data-view="chat">Chat</button></div>${error}<div class="multi-messages">${messages}</div><form class="multi-compose"><input maxlength="240" aria-label="Room message" placeholder="Say something kind…" autocomplete="off"><button type="submit" aria-label="Send message">Send</button></form>`;
  } else {
    const people = state.players.length ? state.players.map((player) => `<li><span style="background:${safeColor(player.outfit)}">${escapeHtml(String(player.name || "P").slice(0, 1).toUpperCase())}</span><b>${escapeHtml(player.name || "Player")}</b><small>Here now</small></li>`).join("") : `<li class="multi-empty-row"><span>•</span><b>The room is quiet</b><small>Invite someone in</small></li>`;
    panel.innerHTML = `${header}<div class="multi-switch"><button type="button" class="active" data-view="rooms">Room</button><button type="button" data-view="chat">Chat</button></div>${error}<div class="room-summary"><span><b>${online}</b> online</span><span>${state.isPrivate ? "Only people with the code can join" : "Open to everyone"}</span></div><ul class="multi-people"><li><span style="background:${safeColor(playerColor())}">${escapeHtml(playerName().slice(0, 1).toUpperCase())}</span><b>${escapeHtml(playerName())}</b><small>You</small></li>${people}</ul>${state.isPrivate ? `<div class="invite-code"><div><small>Invite code</small><b>${state.roomId}</b></div><button type="button" data-action="copy">Copy</button></div>` : ""}<div class="room-actions"><button type="button" class="multi-primary" data-action="${state.isPrivate ? "plaza" : "create"}">${state.busy ? "Connecting…" : state.isPrivate ? "Return to plaza" : "Create private room"}</button>${!state.isPrivate ? `<div class="join-row"><input aria-label="Private room code" placeholder="Room code" autocomplete="off" autocapitalize="none"><button type="button" data-action="join">Join</button></div>` : ""}</div>`;
  }
  $(".multi-close", panel)?.addEventListener("click", closePanel);
  panel.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => {
    panel.dataset.view = button.dataset.view;
    renderPanel();
  }));
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

function safeColor(value) {
  return /^#[0-9a-f]{6}$/i.test(String(value || "")) ? value : "#5c8fd8";
}

function escapeHtml(value) {
  const node = document.createElement("span");
  node.textContent = String(value ?? "");
  return node.innerHTML;
}

function attachSession(session) {
  if (!session?.uid || state.session?.uid === session.uid) return;
  state.session = session;
  heartbeat().catch((error) => { state.error = friendlyError(error); renderDock(); });
  clearInterval(state.polling);
  clearInterval(state.heartbeat);
  state.polling = setInterval(poll, 2000);
  state.heartbeat = setInterval(() => heartbeat().catch(() => {}), 5000);
  poll();
  renderDock();
}

window.addEventListener("snug-session", (event) => attachSession(event.detail));
window.addEventListener("snug-player-move", (event) => {
  state.position = event.detail || state.position;
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

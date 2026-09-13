import * as THREE from "three";

const GAME_DEFS = {
  coin: { name: "Coin Scramble", duration: 30000, note: "Move through the plaza and scoop up the coins." },
  tag: { name: "Plaza Tag", duration: 35000, note: "Stay nimble. If you’re it, catch someone." },
  quiz: { name: "Room Quiz", duration: 36000, note: "Answer in room chat. Fastest correct answer scores two." },
  floor: { name: "Tumble Tiles", duration: 45000, note: "Blinking tiles are about to drop. Stay on the floor until the end." },
  connect4: { name: "Four in a Row", duration: 90000, note: "Tap a column on the 3D board. First to connect four wins." },
  tictactoe: { name: "Noughts & Crosses", duration: 60000, note: "Tap a square on the 3D board and make a line of three." },
};
const QUIZ = [
  { q: "Which planet is known as the Red Planet?", a: "mars", choices: ["Mars", "Venus", "Jupiter", "Mercury"] },
  { q: "How many sides does a hexagon have?", a: "six", also: ["6"], choices: ["Six", "Five", "Seven", "Eight"] },
  { q: "What is the largest ocean on Earth?", a: "pacific", also: ["pacific ocean"], choices: ["Pacific", "Atlantic", "Indian", "Arctic"] },
  { q: "What do bees collect from flowers?", a: "nectar", choices: ["Nectar", "Dew", "Seeds", "Leaves"] },
  { q: "Which animal is famous for changing color?", a: "chameleon", choices: ["Chameleon", "Otter", "Puffin", "Badger"] },
  { q: "What is frozen water called?", a: "ice", choices: ["Ice", "Steam", "Mist", "Dew"] },
  { q: "How many days are in a leap year?", a: "366", also: ["three hundred sixty six", "three hundred and sixty six"], choices: ["366", "365", "364", "360"] },
  { q: "What is the opposite of north?", a: "south", choices: ["South", "East", "West", "Up"] },
  { q: "Which instrument has black and white keys?", a: "piano", choices: ["Piano", "Flute", "Drum", "Violin"] },
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
  soloRoundId: "",
  soloBalanceBefore: null,
  soloResult: null,
  soloTagGroup: null,
  soloTagTarget: null,
  soloTagHits: 0,
  voiceEnabled: false,
  voiceBusy: false,
  voiceError: "",
  voiceUsers: [],
  localStream: null,
  audioContext: null,
  voicePeers: new Map(),
  voiceMonitors: new Map(),
  speaking: new Set(),
  seenSignals: new Set(),
  signalPolling: null,
  voiceHeartbeat: null,
  voicePollBusy: false,
  voiceMeterRaf: 0,
  partyArena: null,
  arenaRoundId: "",
  arenaRaycaster: new THREE.Raycaster(),
  arenaPointer: new THREE.Vector2(),
  floorEliminated: false,
  pendingInvite: null,
  inviteArrival: false,
  shopWorld: null,
  shopGroup: null,
  shops: [],
  nearbyShop: null,
  environmentWorld: null,
  environment: null,
  lastSafePosition: { x: 0, y: 0, z: 0 },
  audioUnlocked: false,
  boardEvents: [],
  boardGame: null,
  boardOverlay: null,
  boardPolling: null,
  boardClock: null,
  boardBusy: false,
  boardUseBoost: false,
  boardLobby: null,
  boardJoinPending: false,
  boardBotTimer: null,
  boardBotKey: "",
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

function normalizeRoomCode(value) {
  let candidate = String(value || "").trim();
  if (!candidate) return "";
  try {
    const parsed = new URL(candidate);
    candidate = parsed.searchParams.get("room") || parsed.searchParams.get("join") || candidate;
  } catch {}
  candidate = decodeURIComponent(candidate).toLowerCase().replace(/^room-/, "").replace(/[^a-z2-9]/g, "");
  return /^[a-z2-9]{10}$/.test(candidate) ? `room-${candidate}` : "";
}

function displayRoomCode(roomId = state.roomId) {
  const code = String(roomId || "").replace(/^room-/, "").toUpperCase();
  return code.length === 10 ? `${code.slice(0, 5)} ${code.slice(5)}` : code;
}

function incomingInviteCode() {
  try {
    return normalizeRoomCode(new URLSearchParams(window.location.search).get("room") || new URLSearchParams(window.location.search).get("join") || "");
  } catch {
    return "";
  }
}

state.pendingInvite = incomingInviteCode();

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
        name: `${playerName()}’s family room`,
        private: true,
        ownerId: state.session.uid,
        createdAt: Date.now(),
        members: { [state.session.uid]: true },
      }),
    });
    await switchRoom(roomId, `${playerName()}’s family room`, true);
  } catch (error) {
    state.error = friendlyError(error);
  } finally {
    state.busy = false;
    renderPanel();
  }
}

async function joinPrivateRoom(code, options = {}) {
  const roomId = normalizeRoomCode(code);
  if (!roomId) {
    state.error = "That family code doesn’t look right.";
    renderPanel();
    return;
  }
  if (state.busy) return;
  state.busy = true;
  state.error = "";
  renderPanel();
  try {
    await ensureMembership(roomId);
    await switchRoom(roomId, "Family room", true);
    state.pendingInvite = null;
    if (options.arrival) {
      state.inviteArrival = true;
      openPanel("rooms");
      showToast("You’re in the family room");
    }
  } catch (error) {
    state.error = friendlyError(error);
    if (options.arrival) openPanel("rooms");
  } finally {
    state.busy = false;
    renderPanel();
  }
}

async function switchRoom(roomId, roomName, isPrivate) {
  const oldRoom = state.roomId;
  if (state.session && oldRoom !== roomId) {
    request(`presence/${oldRoom}/${state.session.uid}`, { method: "DELETE" }).catch(() => {});
    if (state.voiceEnabled) request(`voicePresence/${oldRoom}/${state.session.uid}`, { method: "DELETE" }).catch(() => {});
  }
  closeVoicePeers();
  state.seenSignals.clear();
  clearQuizTimers();
  teardownCoins();
  teardownPracticeTag();
  state.soloRoundId = "";
  state.soloResult = null;
  document.querySelector(".solo-result-backdrop")?.remove();
  state.roomId = roomId;
  state.roomName = roomName;
  state.isPrivate = isPrivate;
  if (!isPrivate) state.inviteArrival = false;
  state.players = [];
  state.messages = [];
  state.minigameEvents = [];
  state.voiceUsers = [];
  state.currentGame = null;
  state.error = "";
  if (isPrivate) await ensureMembership(roomId);
  await heartbeat();
  if (state.voiceEnabled) await voiceHeartbeat();
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
    const [presence, messages, minigames, voicePresence] = await Promise.all([
      request(`presence/${state.roomId}`),
      request(`messages/${state.roomId}?orderBy=%22createdAt%22&limitToLast=50`),
      request(`minigames/${state.roomId}/events?orderBy=%22createdAt%22&limitToLast=50`),
      request(`voicePresence/${state.roomId}`).catch(() => null),
    ]);
    const cutoff = Date.now() - 20000;
    state.players = Object.values(presence || {}).filter((entry) => entry?.uid && entry.uid !== state.session.uid && Number(entry.updatedAt) > cutoff);
    state.voiceUsers = Object.values(voicePresence || {}).filter((entry) => entry?.uid && Number(entry.updatedAt) > cutoff);
    state.messages = Object.entries(messages || {}).map(([id, entry]) => ({ id, ...entry })).filter((entry) => entry?.text).sort(byCreatedAt).slice(-50);
    state.minigameEvents = Object.entries(minigames || {}).map(([id, entry]) => ({ id, ...entry })).filter((entry) => entry?.type).sort(byCreatedAt).slice(-50);
    deriveCurrentGame();
    if (state.voiceEnabled) reconcileVoicePeers();
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

function copyText(value, confirmation) {
  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(value).then(() => showToast(confirmation)).catch(() => fallbackCopy(value, confirmation));
  } else fallbackCopy(value, confirmation);
}

function copyCode() {
  copyText(displayRoomCode().replace(" ", ""), "Family code copied");
}

function copyInvite() {
  const code = displayRoomCode();
  copyText(`Come join my family room in Snug Society. Open the game, tap Family, and paste this code: ${code}`, "Family invite copied");
}

function fallbackCopy(value, confirmation = "Copied") {
  const input = document.createElement("textarea");
  input.value = value;
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
  showToast(confirmation);
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

function voiceSupported() {
  return Boolean(navigator.mediaDevices?.getUserMedia && window.RTCPeerConnection);
}

function isVoiceUser(uid) {
  return state.voiceUsers.some((entry) => entry.uid === uid);
}

async function voiceHeartbeat() {
  if (!state.voiceEnabled || !state.session) return;
  await request(`voicePresence/${state.roomId}/${state.session.uid}`, {
    method: "PUT",
    body: JSON.stringify({ uid: state.session.uid, name: playerName().slice(0, 18), updatedAt: Date.now() }),
  });
}

async function sendVoiceSignal(to, payload) {
  if (!state.session || !to) return;
  await request(`voiceSignals/${state.roomId}/${to}`, {
    method: "POST",
    body: JSON.stringify({
      from: state.session.uid,
      to,
      type: payload.type,
      sdp: payload.sdp || "",
      candidate: payload.candidate || "",
      createdAt: Date.now(),
    }),
  });
}

function updateSpeakingUi() {
  document.querySelectorAll("[data-voice-uid]").forEach((node) => {
    const speaking = state.speaking.has(node.dataset.voiceUid);
    node.classList.toggle("speaking", speaking);
    node.classList.toggle("live", !speaking && isVoiceUser(node.dataset.voiceUid));
  });
  const dock = $(".voice-toggle-dock");
  dock?.classList.toggle("speaking", state.speaking.has(state.session?.uid));
}

function attachVoiceMonitor(uid, stream) {
  if (!stream || state.voiceMonitors.has(uid)) return;
  try {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return;
    state.audioContext ||= new AudioContextCtor();
    const source = state.audioContext.createMediaStreamSource(stream);
    const analyser = state.audioContext.createAnalyser();
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.72;
    source.connect(analyser);
    state.voiceMonitors.set(uid, { source, analyser, data: new Uint8Array(analyser.frequencyBinCount) });
    if (!state.voiceMeterRaf) runVoiceMeters();
  } catch {}
}

function runVoiceMeters() {
  state.voiceMeterRaf = requestAnimationFrame(runVoiceMeters);
  const next = new Set();
  state.voiceMonitors.forEach((monitor, uid) => {
    monitor.analyser.getByteTimeDomainData(monitor.data);
    let sum = 0;
    for (const value of monitor.data) {
      const centered = (value - 128) / 128;
      sum += centered * centered;
    }
    if (Math.sqrt(sum / monitor.data.length) > 0.035) next.add(uid);
  });
  const changed = next.size !== state.speaking.size || [...next].some((uid) => !state.speaking.has(uid));
  state.speaking = next;
  if (changed) {
    updateSpeakingUi();
    window.dispatchEvent(new CustomEvent("snug-speaking-players", { detail: { uids: [...next] } }));
  }
}

function removeVoiceMonitor(uid) {
  const monitor = state.voiceMonitors.get(uid);
  try { monitor?.source?.disconnect(); } catch {}
  state.voiceMonitors.delete(uid);
  state.speaking.delete(uid);
  if (!state.voiceMonitors.size && state.voiceMeterRaf) {
    cancelAnimationFrame(state.voiceMeterRaf);
    state.voiceMeterRaf = 0;
  }
  updateSpeakingUi();
  window.dispatchEvent(new CustomEvent("snug-speaking-players", { detail: { uids: [...state.speaking] } }));
}

function closeVoicePeer(uid) {
  const record = state.voicePeers.get(uid);
  if (!record) return;
  try { record.audio?.remove(); } catch {}
  try { record.pc?.close(); } catch {}
  state.voicePeers.delete(uid);
  removeVoiceMonitor(uid);
}

function closeVoicePeers() {
  [...state.voicePeers.keys()].forEach(closeVoicePeer);
}

function createVoicePeer(uid) {
  if (!state.voiceEnabled || !state.localStream || !uid || uid === state.session?.uid) return null;
  if (state.voicePeers.has(uid)) return state.voicePeers.get(uid);
  const pc = new RTCPeerConnection({ iceServers: [] });
  const record = { pc, pendingCandidates: [], offered: false, audio: null };
  state.voicePeers.set(uid, record);
  state.localStream.getTracks().forEach((track) => pc.addTrack(track, state.localStream));
  pc.onicecandidate = (event) => {
    if (event.candidate) sendVoiceSignal(uid, { type: "candidate", candidate: JSON.stringify(event.candidate.toJSON()) }).catch(() => {});
  };
  pc.ontrack = (event) => {
    const stream = event.streams[0];
    if (!stream) return;
    let audio = record.audio;
    if (!audio) {
      audio = document.createElement("audio");
      audio.className = "voice-audio";
      audio.autoplay = true;
      audio.playsInline = true;
      document.body.appendChild(audio);
      record.audio = audio;
    }
    audio.srcObject = stream;
    audio.play().catch(() => showToast("Tap the mic once to hear room voice"));
    attachVoiceMonitor(uid, stream);
  };
  pc.onconnectionstatechange = () => {
    if (["failed", "closed"].includes(pc.connectionState)) closeVoicePeer(uid);
    renderDock();
    if (state.panel) renderPanel();
  };
  return record;
}

async function makeVoiceOffer(uid) {
  const record = createVoicePeer(uid);
  if (!record || record.offered || record.pc.signalingState !== "stable") return;
  record.offered = true;
  const offer = await record.pc.createOffer();
  await record.pc.setLocalDescription(offer);
  await sendVoiceSignal(uid, { type: "offer", sdp: offer.sdp });
}

async function handleVoiceSignal(id, signal) {
  if (!signal?.from || signal.to !== state.session?.uid || signal.from === state.session.uid) return;
  const record = createVoicePeer(signal.from);
  if (!record) return;
  if (signal.type === "offer") {
    await record.pc.setRemoteDescription({ type: "offer", sdp: signal.sdp });
    const answer = await record.pc.createAnswer();
    await record.pc.setLocalDescription(answer);
    await sendVoiceSignal(signal.from, { type: "answer", sdp: answer.sdp });
    for (const candidate of record.pendingCandidates.splice(0)) await record.pc.addIceCandidate(candidate).catch(() => {});
  } else if (signal.type === "answer" && record.pc.signalingState === "have-local-offer") {
    await record.pc.setRemoteDescription({ type: "answer", sdp: signal.sdp });
    for (const candidate of record.pendingCandidates.splice(0)) await record.pc.addIceCandidate(candidate).catch(() => {});
  } else if (signal.type === "candidate" && signal.candidate) {
    const candidate = new RTCIceCandidate(JSON.parse(signal.candidate));
    if (record.pc.remoteDescription) await record.pc.addIceCandidate(candidate).catch(() => {});
    else record.pendingCandidates.push(candidate);
  }
  state.seenSignals.add(id);
  request(`voiceSignals/${state.roomId}/${state.session.uid}/${id}`, { method: "DELETE" }).catch(() => {});
}

async function pollVoiceSignals() {
  if (!state.voiceEnabled || !state.session || state.voicePollBusy) return;
  state.voicePollBusy = true;
  try {
    const signals = await request(`voiceSignals/${state.roomId}/${state.session.uid}?orderBy=%22createdAt%22&limitToLast=80`);
    for (const [id, signal] of Object.entries(signals || {}).sort((a, b) => Number(a[1]?.createdAt || 0) - Number(b[1]?.createdAt || 0))) {
      if (state.seenSignals.has(id)) continue;
      await handleVoiceSignal(id, signal);
    }
  } catch (error) {
    state.voiceError = friendlyError(error);
  } finally {
    state.voicePollBusy = false;
  }
}

function reconcileVoicePeers() {
  if (!state.voiceEnabled || !state.session) return;
  const active = new Set(state.voiceUsers.map((entry) => entry.uid).filter((uid) => uid !== state.session.uid));
  [...state.voicePeers.keys()].forEach((uid) => { if (!active.has(uid)) closeVoicePeer(uid); });
  active.forEach((uid) => {
    createVoicePeer(uid);
    if (String(state.session.uid).localeCompare(String(uid)) < 0) makeVoiceOffer(uid).catch(() => closeVoicePeer(uid));
  });
}

async function enableVoice() {
  if (state.voiceBusy || state.voiceEnabled) return;
  if (!voiceSupported()) {
    state.voiceError = "Voice chat isn’t available in this browser.";
    showToast(state.voiceError);
    renderDock();
    renderPanel();
    return;
  }
  state.voiceBusy = true;
  state.voiceError = "";
  renderDock();
  renderPanel();
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, video: false });
    state.localStream = stream;
    state.voiceEnabled = true;
    state.inviteArrival = false;
    attachVoiceMonitor(state.session.uid, stream);
    await state.audioContext?.resume?.();
    await voiceHeartbeat();
    clearInterval(state.signalPolling);
    clearInterval(state.voiceHeartbeat);
    state.signalPolling = setInterval(pollVoiceSignals, 700);
    state.voiceHeartbeat = setInterval(() => voiceHeartbeat().catch(() => {}), 5000);
    await poll();
    await pollVoiceSignals();
    reconcileVoicePeers();
    showToast("Room voice is on");
  } catch (error) {
    state.voiceError = /permission|denied|notallowed/i.test(String(error?.name || error)) ? "Microphone permission was not granted." : friendlyError(error);
    showToast(state.voiceError);
    disableVoice(false);
  } finally {
    state.voiceBusy = false;
    renderDock();
    renderPanel();
  }
}

function disableVoice(announce = true) {
  if (state.session && state.voiceEnabled) request(`voicePresence/${state.roomId}/${state.session.uid}`, { method: "DELETE" }).catch(() => {});
  state.voiceEnabled = false;
  state.voiceUsers = state.voiceUsers.filter((entry) => entry.uid !== state.session?.uid);
  state.localStream?.getTracks().forEach((track) => track.stop());
  state.localStream = null;
  closeVoicePeers();
  removeVoiceMonitor(state.session?.uid);
  clearInterval(state.signalPolling);
  clearInterval(state.voiceHeartbeat);
  state.signalPolling = null;
  state.voiceHeartbeat = null;
  if (announce) showToast("Room voice is off");
  renderDock();
  renderPanel();
}

function toggleVoice() {
  if (state.voiceEnabled) disableVoice();
  else enableVoice();
}

function voicePanelMarkup() {
  const connected = [...state.voicePeers.values()].filter((record) => record.pc.connectionState === "connected").length;
  const detail = !voiceSupported() ? "Unavailable in this browser" : state.voiceEnabled ? `${connected} connected · microphone live` : state.isPrivate ? "Talk together when family arrives" : "Off until you choose to join";
  return `<div class="voice-row"><span><b>${state.isPrivate ? "Family voice chat" : "Room voice chat"}</b><small>${escapeHtml(detail)}</small></span><button type="button" class="${state.voiceEnabled ? "leave" : ""}" data-action="voice" ${state.voiceBusy || !state.session ? "disabled" : ""}>${state.voiceBusy ? "Starting…" : state.voiceEnabled ? "Leave" : "Join voice"}</button></div>${state.voiceError ? `<div class="voice-error" role="status">${escapeHtml(state.voiceError)}</div>` : ""}`;
}

function voicePersonMarkup(uid, fallback) {
  const live = isVoiceUser(uid);
  const speaking = state.speaking.has(uid);
  return `<small><i class="voice-indicator ${speaking ? "speaking" : live ? "live" : ""}" data-voice-uid="${escapeHtml(uid)}"></i><span>${speaking ? "Speaking" : live ? "In voice" : fallback}</span></small>`;
}

function dieMarkup() {
  return `<span class="mini-die" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>`;
}

const BOARD_SPACES = [
  "start", "coin", "event", "coin", "shop", "minigame",
  "coin", "star", "event", "coin", "shop", "minigame",
  "coin", "event", "star", "coin", "shop", "minigame",
  "event", "coin", "star", "shop", "minigame", "coin",
];
const BOARD_LABELS = { start: "Town Gate", coin: "+3 coins", event: "Town event", minigame: "Game space", shop: "Board shop", star: "Star stop" };
const BOARD_MINIGAMES = ["Lantern Timing", "Parcel Pop", "Garden Dash", "Tea Tray Tangle"];
const BOARD_SHOP = { boost: { name: "Dice boost", cost: 5 }, trap: { name: "Puddle trap", cost: 6 }, steal: { name: "Pocket swap", cost: 8 } };
const BOARD_BOTS = [
  { uid: "bot-1", name: "Moss", color: "#5c8d65" },
  { uid: "bot-2", name: "Pip", color: "#d07862" },
  { uid: "bot-3", name: "Juniper", color: "#668fc2" },
];

function boardAccessAllowed() {
  return state.roomId === "plaza" || state.isPrivate;
}

function boardUid() {
  return state.session?.uid || "local-player";
}

function roomBoardPeople() {
  const people = [{ uid: boardUid(), name: playerName(), color: playerColor() }, ...state.players.map((entry) => ({ uid: entry.uid, name: entry.name || "Player", color: safeColor(entry.outfit) }))];
  return [...new Map(people.filter((entry) => entry.uid).map((entry) => [entry.uid, entry])).values()];
}

function deriveBoardLobby() {
  const lobbyEvent = state.boardEvents.filter((event) => event.type === "board-lobby").at(-1);
  const latestStart = state.boardEvents.filter((event) => event.type === "board-start").at(-1);
  if (!lobbyEvent || (latestStart && Number(latestStart.createdAt) > Number(lobbyEvent.createdAt))) return null;
  const people = new Map(roomBoardPeople().map((entry) => [entry.uid, entry]));
  const joined = new Map();
  joined.set(lobbyEvent.uid, { uid: lobbyEvent.uid, name: lobbyEvent.name, color: safeColor(lobbyEvent.color), joinedAt: Number(lobbyEvent.createdAt) });
  const ready = new Map();
  let totalPlayers = Math.max(2, Math.min(4, Number(lobbyEvent.totalPlayers || 4)));
  for (const event of state.boardEvents) {
    if (event.lobbyId !== lobbyEvent.id || Number(event.createdAt) < Number(lobbyEvent.createdAt)) continue;
    if (event.type === "board-join") joined.set(event.uid, { uid: event.uid, name: event.name, color: safeColor(event.color), joinedAt: Number(event.createdAt) });
    if (event.type === "board-leave") { joined.delete(event.uid); ready.delete(event.uid); }
    if (event.type === "board-ready") ready.set(event.uid, event.ready === true);
    if (event.type === "board-settings" && event.uid === lobbyEvent.uid) totalPlayers = Math.max(2, Math.min(4, Number(event.totalPlayers || 4)));
  }
  const activeJoined = [...joined.values()].filter((entry) => people.has(entry.uid)).map((entry) => ({ ...entry, ...(people.get(entry.uid) || {}), ready: ready.get(entry.uid) === true })).sort((a, b) => a.joinedAt - b.joinedAt).slice(0, 4);
  if (!activeJoined.some((entry) => entry.uid === lobbyEvent.uid)) return null;
  if (activeJoined.length > totalPlayers) totalPlayers = activeJoined.length;
  return { id: lobbyEvent.id, hostUid: lobbyEvent.uid, totalPlayers, joined: activeJoined };
}

function pollBoard() {
  if (!state.boardOverlay) return;
  state.boardGame = deriveBoardGame();
  state.boardLobby = deriveBoardLobby();
  renderBoardMode();
  if (!state.boardGame && !state.boardLobby) setTimeout(ensureBoardLobby, 80);
}

function boardRoundEvents(start) {
  return state.boardEvents.filter((event) => Number(event.createdAt) >= Number(start.createdAt) && event.id !== start.id);
}

function deriveBoardGame() {
  const start = state.boardEvents.filter((event) => event.type === "board-start").at(-1);
  const laterLobby = state.boardEvents.filter((event) => event.type === "board-lobby" && Number(event.createdAt) > Number(start?.createdAt || 0)).at(-1);
  if (!start || laterLobby) return null;
  const roster = Object.entries(start.players || {}).map(([uid, value]) => ({ uid, ...(value || {}), bot: value?.bot === true })).sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
  if (!roster.length) return null;
  const game = {
    id: start.id,
    hostUid: start.uid,
    seed: Number(start.seed || 1),
    rounds: 5,
    round: 1,
    phase: "movement",
    turnIndex: 0,
    players: roster.map((entry) => ({ ...entry, pos: 0, coins: 10, stars: 0, minigameWins: 0, items: { boost: 0, trap: 0, steal: 0 } })),
    traps: [],
    scores: {},
    minigameStartedAt: 0,
    shopUid: "",
    shopSpace: -1,
    log: [roster.some((entry) => entry.bot) ? "The empty seats were filled by friendly town players." : "Everyone starts at the Town Gate with 10 coins."],
  };
  const player = (uid) => game.players.find((entry) => entry.uid === uid);
  const currentUid = () => game.players[game.turnIndex]?.uid || "";
  const finishMinigame = () => {
    const ranking = game.players.map((entry) => ({ entry, score: Number(game.scores[entry.uid] ?? 0) })).sort((a, b) => b.score - a.score || a.entry.name.localeCompare(b.entry.name));
    ranking.forEach(({ entry }, index) => { entry.coins += index === 0 ? 10 : index === 1 ? 6 : 3; });
    if (ranking[0]) ranking[0].entry.minigameWins += 1;
    game.log.push(`${ranking[0]?.entry.name || "The room"} won ${BOARD_MINIGAMES[(game.seed + game.round) % BOARD_MINIGAMES.length]}.`);
    if (game.round >= game.rounds) game.phase = "ended";
    else { game.round += 1; game.phase = "movement"; game.turnIndex = 0; }
    game.scores = {};
    game.minigameStartedAt = 0;
    game.shopUid = "";
  };
  for (const event of boardRoundEvents(start)) {
    if (event.boardId !== game.id || game.phase === "ended") continue;
    if (game.phase === "minigame" && game.minigameStartedAt && Number(event.createdAt) >= game.minigameStartedAt + 12000) finishMinigame();
    const actorUid = event.actorUid || event.uid;
    if (game.phase === "movement" && event.type === "board-item" && Number(event.round) === game.round && actorUid === currentUid()) {
      const owner = player(actorUid);
      if (!owner || !BOARD_SHOP[event.item] || owner.items[event.item] < 1) continue;
      if (event.item === "trap") {
        owner.items.trap -= 1;
        game.traps.push({ owner: owner.uid, space: (owner.pos + 4) % BOARD_SPACES.length, active: true });
        game.log.push(`${owner.name} set a trap four spaces ahead.`);
      } else if (event.item === "steal") {
        const target = player(event.targetUid);
        if (!target || target.uid === owner.uid) continue;
        owner.items.steal -= 1;
        const amount = Math.min(5, target.coins);
        target.coins -= amount;
        owner.coins += amount;
        game.log.push(`${owner.name} pocket-swapped ${amount} coins from ${target.name}.`);
      }
      continue;
    }
    if (game.phase === "movement" && event.type === "board-roll" && Number(event.round) === game.round && actorUid === currentUid()) {
      const mover = player(actorUid);
      if (!mover) continue;
      game.shopUid = "";
      if (event.usedBoost && mover.items.boost > 0) mover.items.boost -= 1;
      const roll = Math.max(1, Math.min(9, Number(event.roll || 1)));
      mover.pos = (mover.pos + roll) % BOARD_SPACES.length;
      const trap = game.traps.find((entry) => entry.active && entry.owner !== mover.uid && entry.space === mover.pos);
      if (trap) { trap.active = false; mover.coins = Math.max(0, mover.coins - 5); game.log.push(`${mover.name} splashed into a trap and lost 5 coins.`); }
      const space = BOARD_SPACES[mover.pos];
      if (space === "coin") { mover.coins += 3; game.log.push(`${mover.name} rolled ${roll} and found 3 coins.`); }
      else if (space === "event") {
        const gain = (game.seed + game.round * 11 + mover.pos * 7 + mover.uid.length) % 2 === 0;
        const amount = gain ? 4 : Math.min(3, mover.coins);
        mover.coins += gain ? amount : -amount;
        game.log.push(`${mover.name} met a town surprise and ${gain ? "gained" : "lost"} ${amount} coins.`);
      } else if (space === "minigame") { mover.coins += 2; game.log.push(`${mover.name} warmed up on a game space for 2 coins.`); }
      else if (space === "star" && mover.coins >= 10) { mover.coins -= 10; mover.stars += 1; game.log.push(`${mover.name} traded 10 coins for a star.`); }
      else if (space === "shop") { game.shopUid = mover.uid; game.shopSpace = mover.pos; game.log.push(`${mover.name} reached the Board Shop.`); }
      else game.log.push(`${mover.name} rolled ${roll}.`);
      game.turnIndex += 1;
      if (game.turnIndex >= game.players.length) {
        game.phase = "minigame";
        game.turnIndex = 0;
        game.minigameStartedAt = Number(event.createdAt);
        game.shopUid = "";
      }
      continue;
    }
    if (game.phase === "movement" && event.type === "board-shop" && Number(event.round) === game.round && actorUid === game.shopUid) {
      const shopper = player(actorUid);
      if (!shopper) continue;
      if (event.item === "pass") {
        game.shopUid = "";
        game.log.push(`${shopper.name} saved their coins.`);
        continue;
      }
      const item = BOARD_SHOP[event.item];
      if (!item || shopper.coins < item.cost) continue;
      shopper.coins -= item.cost;
      shopper.items[event.item] += 1;
      game.shopUid = "";
      game.log.push(`${shopper.name} bought ${item.name}.`);
      continue;
    }
    if (game.phase === "minigame" && event.type === "board-score" && Number(event.round) === game.round && player(actorUid) && game.scores[actorUid] == null) {
      game.scores[actorUid] = Math.max(0, Math.min(100, Number(event.score || 0)));
      if (Object.keys(game.scores).length >= game.players.length) finishMinigame();
    }
  }
  if (game.phase === "minigame" && game.minigameStartedAt && Date.now() >= game.minigameStartedAt + 12000) finishMinigame();
  const maxCoins = Math.max(...game.players.map((entry) => entry.coins));
  const maxWins = Math.max(...game.players.map((entry) => entry.minigameWins));
  game.coinBonus = game.phase === "ended" ? game.players.filter((entry) => entry.coins === maxCoins).map((entry) => entry.uid) : [];
  game.gameBonus = game.phase === "ended" ? game.players.filter((entry) => entry.minigameWins === maxWins).map((entry) => entry.uid) : [];
  game.final = game.players.map((entry) => ({ ...entry, finalStars: entry.stars + Number(game.coinBonus.includes(entry.uid)) + Number(game.gameBonus.includes(entry.uid)) })).sort((a, b) => b.finalStars - a.finalStars || b.coins - a.coins || a.name.localeCompare(b.name));
  return game;
}

function appendBoardEvent(event) {
  const id = `local-${event.createdAt}-${Math.random().toString(36).slice(2, 7)}`;
  state.boardEvents.push({ id, ...event });
  state.boardGame = deriveBoardGame();
  state.boardLobby = deriveBoardLobby();
  renderBoardMode();
}

function postBoardLobbyEvent(type, extra = {}) {
  if (!boardUid()) return;
  appendBoardEvent({ type, game: "snug-board", uid: boardUid(), name: playerName().slice(0, 18), createdAt: Date.now(), ...extra });
}

function createBoardLobby(totalPlayers = 4) {
  if (state.boardBusy) return;
  state.boardBusy = true;
  renderBoardMode();
  try {
    postBoardLobbyEvent("board-lobby", { color: safeColor(playerColor()), totalPlayers: Math.max(2, Math.min(4, Number(totalPlayers || 4))), seed: crypto.getRandomValues(new Uint32Array(1))[0] });
  } finally { state.boardBusy = false; renderBoardMode(); }
}

function ensureBoardLobby() {
  if (state.boardGame || state.boardJoinPending) return;
  state.boardJoinPending = true;
  try {
    if (!state.boardLobby) createBoardLobby(4);
    const lobby = state.boardLobby;
    if (lobby && !lobby.joined.some((entry) => entry.uid === boardUid()) && lobby.joined.length < lobby.totalPlayers) {
      postBoardLobbyEvent("board-join", { lobbyId: lobby.id, color: safeColor(playerColor()) });
    }
  } finally { state.boardJoinPending = false; renderBoardMode(); }
}

function setBoardReady() {
  const lobby = state.boardLobby;
  if (!lobby) return;
  const me = lobby.joined.find((entry) => entry.uid === boardUid());
  if (!me) return;
  postBoardLobbyEvent("board-ready", { lobbyId: lobby.id, ready: !me.ready });
  window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "ready" } }));
}

function setBoardPlayerCount(totalPlayers) {
  const lobby = state.boardLobby;
  if (!lobby || lobby.hostUid !== boardUid() || totalPlayers < lobby.joined.length) return;
  postBoardLobbyEvent("board-settings", { lobbyId: lobby.id, totalPlayers });
}

function postBoardEvent(type, extra = {}) {
  if (!state.boardGame) return;
  appendBoardEvent({ type, game: "snug-board", uid: boardUid(), name: playerName().slice(0, 18), boardId: state.boardGame.id, createdAt: Date.now(), ...extra });
}

function startBoardGame() {
  const lobby = state.boardLobby;
  if (state.boardBusy || !lobby || lobby.hostUid !== boardUid()) return;
  if (!lobby.joined.length || lobby.joined.some((entry) => !entry.ready)) return showToast("Everyone in the lobby needs to ready up");
  state.boardBusy = true;
  renderBoardMode();
  try {
    const humans = lobby.joined.slice(0, lobby.totalPlayers);
    const botCount = Math.max(0, lobby.totalPlayers - humans.length);
    const people = [...humans.map((entry) => ({ uid: entry.uid, name: entry.name, color: entry.color, bot: false })), ...BOARD_BOTS.slice(0, botCount).map((entry) => ({ ...entry, bot: true }))];
    const players = Object.fromEntries(people.map((entry, order) => [entry.uid, { name: String(entry.name).slice(0, 18), color: safeColor(entry.color), order, bot: entry.bot === true }]));
    appendBoardEvent({ type: "board-start", game: "snug-board", uid: boardUid(), name: playerName().slice(0, 18), createdAt: Date.now(), seed: crypto.getRandomValues(new Uint32Array(1))[0], rounds: 5, lobbyId: lobby.id, players });
    state.boardLobby = null;
    window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "game-start" } }));
  } finally { state.boardBusy = false; renderBoardMode(); }
}
function closeBoardMode() {
  const lobby = state.boardLobby;
  if (lobby?.joined.some((entry) => entry.uid === boardUid()) && !state.boardGame) {
    postBoardLobbyEvent("board-leave", { lobbyId: lobby.id });
  }
  state.boardOverlay?.remove();
  state.boardOverlay = null;
  clearInterval(state.boardPolling);
  clearInterval(state.boardClock);
  clearTimeout(state.boardBotTimer);
  state.boardPolling = null;
  state.boardClock = null;
  state.boardBotTimer = null;
  state.boardBotKey = "";
  state.boardUseBoost = false;
}

function openBoardMode() {
  closePanel();
  if (state.boardOverlay) return;
  const overlay = document.createElement("div");
  overlay.className = "snug-board-backdrop";
  overlay.innerHTML = `<section class="snug-board-shell" role="dialog" aria-modal="true" aria-labelledby="snug-board-title"></section>`;
  document.body.appendChild(overlay);
  state.boardOverlay = overlay;
  state.boardEvents = [];
  state.boardGame = null;
  state.boardLobby = null;
  state.error = "";
  renderBoardMode();
  pollBoard();
  ensureBoardLobby();
  state.boardClock = setInterval(tickBoardMode, 500);
}

function boardSpaceMarkup(type, index, game) {
  const residents = game.players.filter((entry) => entry.pos === index);
  const tokens = residents.map((entry) => `<i class="snug-board-token ${entry.bot ? "bot" : ""}" style="background:${safeColor(entry.color)}" title="${escapeHtml(entry.name)}">${escapeHtml(String(entry.name || "P").slice(0, 1).toUpperCase())}</i>`).join("");
  const trapped = game.traps.some((entry) => entry.active && entry.space === index);
  return `<div class="snug-board-space ${type} ${trapped ? "snug-board-trap" : ""}"><span class="snug-board-number">${index}</span><b>${BOARD_LABELS[type]}</b><div class="snug-board-tokens">${tokens}</div><small>${type === "star" ? "10 coins" : type === "shop" ? "Items" : type === "start" ? "Start" : ""}</small></div>`;
}

function boardPlayerMarkup(entry, game) {
  const current = game.phase === "movement" && game.players[game.turnIndex]?.uid === entry.uid;
  return `<div class="snug-board-player ${current ? "current" : ""}"><i style="background:${safeColor(entry.color)}">${escapeHtml(String(entry.name || "P").slice(0, 1).toUpperCase())}</i><span><b>${escapeHtml(entry.name)}${entry.bot ? ' <em class="bot-chip">BOT</em>' : ""}</b><small>${entry.minigameWins} minigame win${entry.minigameWins === 1 ? "" : "s"}</small></span><strong>${entry.stars}★ · ${entry.coins} coins</strong></div>`;
}

function lobbyPlayerMarkup(entry, lobby) {
  const host = entry.uid === lobby.hostUid;
  return `<div class="snug-board-player lobby-person ${entry.ready ? "is-ready" : ""}"><i style="background:${safeColor(entry.color)}">${escapeHtml(String(entry.name || "P").slice(0, 1).toUpperCase())}</i><span><b>${escapeHtml(entry.name)}</b><small>${host ? "Host" : "Player"}</small></span><strong>${entry.ready ? "Ready" : "Not ready"}</strong></div>`;
}

function boardActionMarkup(game) {
  const me = game.players.find((entry) => entry.uid === boardUid());
  if (game.phase === "ended") {
    const winner = game.final[0];
    const coinNames = game.players.filter((entry) => game.coinBonus.includes(entry.uid)).map((entry) => escapeHtml(entry.name)).join(", ");
    const winNames = game.players.filter((entry) => game.gameBonus.includes(entry.uid)).map((entry) => escapeHtml(entry.name)).join(", ");
    return `<div class="snug-board-card"><h3>${winner?.uid === boardUid() ? "You win the board!" : `${escapeHtml(winner?.name || "A neighbor")} wins!`}</h3><p>Final stars include two last-minute awards, so the lead can change right at the end.</p><div class="snug-board-bonuses"><div class="snug-board-bonus"><b>Banker Star</b><small>Most coins banked · ${coinNames}</small></div><div class="snug-board-bonus"><b>Minigame Star</b><small>Most wins · ${winNames}</small></div></div><div class="snug-board-stats">${game.final.map((entry) => `<div class="snug-board-player"><i style="background:${safeColor(entry.color)}">${escapeHtml(entry.name.slice(0, 1).toUpperCase())}</i><span><b>${escapeHtml(entry.name)}${entry.bot ? ' <em class="bot-chip">BOT</em>' : ""}</b><small>${entry.coins} coins</small></span><strong>${entry.finalStars}★</strong></div>`).join("")}</div>${game.hostUid === boardUid() ? `<button type="button" class="snug-board-primary" data-board-new-lobby>Return to lobby</button>` : ""}</div>`;
  }
  if (!me) return `<div class="snug-board-card"><h3>Spectating</h3><p>This board started before you arrived. You’ll join the next one.</p></div>`;
  if (game.phase === "minigame") {
    const title = BOARD_MINIGAMES[(game.seed + game.round) % BOARD_MINIGAMES.length];
    const submitted = game.scores[me.uid] != null;
    const seconds = Math.max(0, Math.ceil((game.minigameStartedAt + 12000 - Date.now()) / 1000));
    const scores = game.players.map((entry) => `<span>${escapeHtml(entry.name)}${entry.bot ? " · bot" : ""} · ${game.scores[entry.uid] == null ? "playing" : game.scores[entry.uid]}</span>`).join("");
    return `<div class="snug-board-card"><h3>${escapeHtml(title)}</h3><p>Everyone plays. Stop the marker close to the green center; ranked players earn 10, 6, and 3 coins.</p><div class="snug-board-meter" aria-hidden="true"><i></i></div><div class="snug-board-scores">${scores}</div><p class="snug-board-status"><span class="board-seconds">${seconds}</span>s left</p><button type="button" class="snug-board-primary" data-board-score ${submitted ? "disabled" : ""}>${submitted ? "Score locked" : "Lock my score"}</button></div>`;
  }
  const current = game.players[game.turnIndex];
  const richest = game.players.filter((entry) => entry.uid !== me.uid).sort((a, b) => b.coins - a.coins)[0];
  const shopper = game.players.find((entry) => entry.uid === game.shopUid);
  if (game.shopUid === me.uid) return `<div class="snug-board-card"><h3>Board Shop</h3><p>Spend board coins on one item before the next roll.</p><div class="snug-board-shop">${Object.entries(BOARD_SHOP).map(([id, item]) => `<button type="button" data-board-buy="${id}" ${me.coins < item.cost ? "disabled" : ""}><b>${item.name}</b><br>${item.cost} coins</button>`).join("")}<button type="button" data-board-buy="pass"><b>Keep coins</b><br>Leave shop</button></div></div>`;
  if (shopper?.bot) return `<div class="snug-board-card"><h3>${escapeHtml(shopper.name)} is shopping</h3><p>The town player is weighing up a useful item.</p></div>`;
  if (current?.bot) return `<div class="snug-board-card"><h3>${escapeHtml(current.name)} is rolling</h3><p>The town player is choosing an item and planning a move.</p></div>`;
  if (current?.uid !== me.uid) return `<div class="snug-board-card"><h3>${escapeHtml(current?.name || "Another player")} is up</h3><p>After everyone moves, the whole room faces off in a coin-paying minigame.</p></div>`;
  return `<div class="snug-board-card"><h3>Your turn</h3><p>Roll 1–6 spaces. Stars cost 10 coins when you land on them.</p><div class="snug-board-items"><button type="button" data-board-boost class="${state.boardUseBoost ? "active" : ""}" ${me.items.boost < 1 ? "disabled" : ""}>Boost ×${me.items.boost}<br>+3 roll</button><button type="button" data-board-item="trap" ${me.items.trap < 1 ? "disabled" : ""}>Trap ×${me.items.trap}<br>Lay ahead</button><button type="button" data-board-item="steal" ${me.items.steal < 1 || !richest ? "disabled" : ""}>Swap ×${me.items.steal}<br>Steal 5</button></div><button type="button" class="snug-board-primary" data-board-roll ${state.boardBusy ? "disabled" : ""}>${state.boardUseBoost ? "Roll with +3" : "Roll the dice"}</button></div>`;
}

function boardLobbyMarkup(lobby) {
  if (!lobby) return `<div class="snug-board-lobby"><div class="snug-board-card board-lobby-loading"><h3>Setting the table…</h3><p>Opening a fresh lobby for this room.</p></div></div>`;
  const me = lobby.joined.find((entry) => entry.uid === boardUid());
  const isHost = lobby.hostUid === boardUid();
  const allReady = lobby.joined.length > 0 && lobby.joined.every((entry) => entry.ready);
  const botCount = Math.max(0, lobby.totalPlayers - lobby.joined.length);
  const seats = [...lobby.joined.map((entry) => lobbyPlayerMarkup(entry, lobby)), ...BOARD_BOTS.slice(0, botCount).map((bot) => `<div class="snug-board-player lobby-person bot-seat"><i style="background:${bot.color}">${bot.name[0]}</i><span><b>${bot.name} <em class="bot-chip">BOT</em></b><small>Fills an open seat</small></span><strong>Ready</strong></div>`)].join("");
  const full = !me && lobby.joined.length >= lobby.totalPlayers;
  return `<div class="snug-board-lobby"><div class="board-lobby-copy"><small>Waiting room</small><h3>${isHost ? "You’re hosting the board" : "The host is gathering players"}</h3><p>Choose the party size, ready up, then the host starts. Any open seats become capable town players.</p></div><div class="board-count-row"><span><b>Total players</b><small>Humans first, bots fill the rest</small></span><div class="board-count-picker" role="group" aria-label="Total players">${[2,3,4].map((count) => `<button type="button" data-board-count="${count}" class="${lobby.totalPlayers === count ? "active" : ""}" ${!isHost || count < lobby.joined.length ? "disabled" : ""}>${count}</button>`).join("")}</div></div><div class="snug-board-stats board-lobby-people">${seats}</div>${full ? `<p class="snug-board-status">This lobby is full. You can watch, or return when a seat opens.</p>` : me ? `<button type="button" class="snug-board-ready ${me.ready ? "is-ready" : ""}" data-board-ready>${me.ready ? "Ready ✓" : "Ready up"}</button>` : `<p class="snug-board-status">Joining the waiting room…</p>`}${isHost ? `<button type="button" class="snug-board-primary" data-board-start ${!allReady || state.boardBusy ? "disabled" : ""}>${state.boardBusy ? "Starting…" : allReady ? `Start with ${lobby.joined.length} player${lobby.joined.length === 1 ? "" : "s"} + ${botCount} bot${botCount === 1 ? "" : "s"}` : "Waiting for everyone to ready up"}</button>` : `<p class="snug-board-status">${allReady ? "Everyone’s ready. Waiting for the host to start." : "Ready when you are — the host starts the game."}</p>`}</div>`;
}

function renderBoardMode() {
  const shell = state.boardOverlay?.querySelector(".snug-board-shell");
  if (!shell) return;
  const close = `<button type="button" class="snug-board-close" aria-label="Close board mode">×</button>`;
  const error = state.error ? `<div class="snug-board-error" role="status">${escapeHtml(state.error)}</div>` : "";
  const game = state.boardGame;
  if (!game) {
    shell.innerHTML = `<div class="snug-board-head"><div><small>Five-round party</small><h2 id="snug-board-title">Snug Board</h2></div>${close}</div>${error}${boardLobbyMarkup(state.boardLobby)}`;
  } else {
    shell.innerHTML = `<div class="snug-board-head"><div><small>Round ${game.round} of ${game.rounds} · ${state.isPrivate ? "Family room" : "Village plaza"}</small><h2 id="snug-board-title">Snug Board</h2></div>${close}</div>${error}<div class="snug-board-layout"><div><div class="snug-board-map">${BOARD_SPACES.map((type, index) => boardSpaceMarkup(type, index, game)).join("")}</div><div class="snug-board-legend"><span>Gold: coins</span><span>Blue: events</span><span>Coral: minigames</span><span>Green: shops</span><span>Dark: stars</span></div></div><aside class="snug-board-side"><div class="snug-board-card"><div class="snug-board-stats">${game.players.map((entry) => boardPlayerMarkup(entry, game)).join("")}</div></div>${boardActionMarkup(game)}<div class="snug-board-card"><h3>Town chatter</h3><ul class="snug-board-log">${game.log.slice(-5).reverse().map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul></div></aside></div>`;
  }
  shell.querySelector(".snug-board-close")?.addEventListener("click", closeBoardMode);
  shell.querySelector("[data-board-ready]")?.addEventListener("click", () => setBoardReady());
  shell.querySelectorAll("[data-board-count]").forEach((button) => button.addEventListener("click", () => setBoardPlayerCount(Number(button.dataset.boardCount))));
  shell.querySelector("[data-board-start]")?.addEventListener("click", startBoardGame);
  shell.querySelector("[data-board-new-lobby]")?.addEventListener("click", () => createBoardLobby(4));
  shell.querySelector("[data-board-boost]")?.addEventListener("click", () => { state.boardUseBoost = !state.boardUseBoost; renderBoardMode(); });
  shell.querySelector("[data-board-roll]")?.addEventListener("click", async () => {
    if (state.boardBusy || !state.boardGame) return;
    state.boardBusy = true; renderBoardMode();
    const base = randomIndex(6) + 1;
    window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "dice-roll" } }));
    postBoardEvent("board-roll", { round: state.boardGame.round, roll: base + (state.boardUseBoost ? 3 : 0), usedBoost: state.boardUseBoost });
    state.boardUseBoost = false;
    state.boardBusy = false;
    renderBoardMode();
  });
  shell.querySelectorAll("[data-board-buy]").forEach((button) => button.addEventListener("click", () => {
    const item = button.dataset.boardBuy;
    const cost = item === "pass" ? 0 : BOARD_SHOP[item].cost;
    window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "shop-buy" } }));
    postBoardEvent("board-shop", { round: state.boardGame.round, item, cost });
  }));
  shell.querySelectorAll("[data-board-item]").forEach((button) => button.addEventListener("click", () => {
    const item = button.dataset.boardItem;
    const me = state.boardGame.players.find((entry) => entry.uid === boardUid());
    const target = state.boardGame.players.filter((entry) => entry.uid !== me?.uid).sort((a, b) => b.coins - a.coins)[0];
    postBoardEvent("board-item", { round: state.boardGame.round, item, targetUid: target?.uid || "none" });
  }));
  shell.querySelector("[data-board-score]")?.addEventListener("click", () => {
    const elapsed = Math.max(0, Date.now() - Number(state.boardGame.minigameStartedAt));
    const phase = (elapsed % 3300) / 3300;
    const triangle = phase <= .5 ? phase * 2 : (1 - phase) * 2;
    const score = Math.max(0, Math.round(100 - Math.abs(triangle - .5) * 200));
    postBoardEvent("board-score", { round: state.boardGame.round, score });
  });
  scheduleBoardAutomation();
}

function botScore(game, bot) {
  const value = (game.seed + game.round * 37 + bot.uid.charCodeAt(bot.uid.length - 1) * 19) % 34;
  return 60 + value;
}

function botUsedItemThisTurn(game, bot) {
  return state.boardEvents.some((event) => event.boardId === game.id && Number(event.round) === game.round && event.type === "board-item" && (event.actorUid || event.uid) === bot.uid);
}

function chooseBotShopItem(game, bot) {
  const richest = game.players.filter((entry) => entry.uid !== bot.uid).sort((a, b) => b.coins - a.coins)[0];
  if (bot.coins >= BOARD_SHOP.steal.cost && richest?.coins >= 8 && bot.items.steal < 1) return "steal";
  if (bot.coins >= BOARD_SHOP.boost.cost && bot.items.boost < 2) return "boost";
  if (bot.coins >= BOARD_SHOP.trap.cost) return "trap";
  return "pass";
}

function scheduleBoardAutomation() {
  const game = state.boardGame;
  if (!state.boardOverlay || !game || game.phase === "ended" || game.hostUid !== boardUid() || state.boardBusy) {
    clearTimeout(state.boardBotTimer);
    state.boardBotTimer = null;
    return;
  }
  let key = "";
  let task = null;
  if (game.phase === "movement") {
    const shopper = game.players.find((entry) => entry.uid === game.shopUid);
    const current = game.players[game.turnIndex];
    if (shopper?.bot) {
      const item = chooseBotShopItem(game, shopper);
      key = `${game.id}-${game.round}-shop-${shopper.uid}-${item}`;
      task = () => postBoardEvent("board-shop", { round: game.round, actorUid: shopper.uid, item, cost: item === "pass" ? 0 : BOARD_SHOP[item].cost });
    } else if (current?.bot) {
      const richest = game.players.filter((entry) => entry.uid !== current.uid).sort((a, b) => b.coins - a.coins)[0];
      const useSteal = current.items.steal > 0 && richest?.coins >= 8;
      const useTrap = !useSteal && current.items.trap > 0 && !botUsedItemThisTurn(game, current) && (game.seed + game.round + game.turnIndex) % 2 === 0;
      if (!botUsedItemThisTurn(game, current) && (useSteal || useTrap)) {
        const item = useSteal ? "steal" : "trap";
        key = `${game.id}-${game.round}-item-${current.uid}-${item}`;
        task = () => postBoardEvent("board-item", { round: game.round, actorUid: current.uid, item, targetUid: richest?.uid || "none" });
      } else {
        const distanceToStar = BOARD_SPACES.map((space, index) => ({ space, distance: (index - current.pos + BOARD_SPACES.length) % BOARD_SPACES.length })).filter((entry) => entry.space === "star" && entry.distance > 0).sort((a, b) => a.distance - b.distance)[0]?.distance || 99;
        const usedBoost = current.items.boost > 0 && current.coins >= 10 && distanceToStar > 6 && distanceToStar <= 9;
        const roll = randomIndex(6) + 1 + (usedBoost ? 3 : 0);
        key = `${game.id}-${game.round}-roll-${current.uid}-${game.turnIndex}`;
        task = () => postBoardEvent("board-roll", { round: game.round, actorUid: current.uid, roll, usedBoost });
      }
    }
  } else if (game.phase === "minigame") {
    const bot = game.players.find((entry) => entry.bot && game.scores[entry.uid] == null);
    if (bot) {
      key = `${game.id}-${game.round}-score-${bot.uid}`;
      task = () => postBoardEvent("board-score", { round: game.round, actorUid: bot.uid, score: botScore(game, bot) });
    }
  }
  if (!task) {
    clearTimeout(state.boardBotTimer);
    state.boardBotTimer = null;
    state.boardBotKey = "";
    return;
  }
  if (state.boardBotKey === key && state.boardBotTimer) return;
  clearTimeout(state.boardBotTimer);
  state.boardBotKey = key;
  state.boardBotTimer = setTimeout(async () => {
    state.boardBotTimer = null;
    state.boardBusy = true;
    renderBoardMode();
    window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: key.includes("roll") ? "dice-roll" : "bot-turn" } }));
    task();
    state.boardBusy = false;
    state.boardBotKey = "";
    renderBoardMode();
  }, 720);
}

function tickBoardMode() {
  if (!state.boardOverlay || !state.boardGame) return;
  const before = `${state.boardGame.round}-${state.boardGame.phase}-${state.boardGame.turnIndex}-${state.boardGame.shopUid}-${Object.keys(state.boardGame.scores).length}`;
  state.boardGame = deriveBoardGame();
  const after = `${state.boardGame.round}-${state.boardGame.phase}-${state.boardGame.turnIndex}-${state.boardGame.shopUid}-${Object.keys(state.boardGame.scores).length}`;
  if (before !== after) renderBoardMode();
  else {
    const seconds = state.boardOverlay.querySelector(".board-seconds");
    if (seconds) seconds.textContent = String(Math.max(0, Math.ceil((state.boardGame.minigameStartedAt + 12000 - Date.now()) / 1000)));
    scheduleBoardAutomation();
  }
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
  dock.innerHTML = `<span class="room-live"></span><span>${state.isPrivate ? "Family" : "Plaza"}</span><b>${count}</b>`;
  dock.setAttribute("aria-label", `${state.roomName}, ${count} online. Open rooms`);
  dock.classList.toggle("offline", !state.session || Boolean(state.error));
  let voice = $(".voice-toggle-dock");
  if (!voice) {
    voice = document.createElement("button");
    voice.type = "button";
    voice.className = "voice-toggle-dock off";
    voice.innerHTML = "<span aria-hidden=\"true\"></span>";
    voice.addEventListener("click", toggleVoice);
    document.body.appendChild(voice);
  }
  voice.disabled = state.voiceBusy || !state.session;
  voice.classList.toggle("off", !state.voiceEnabled);
  voice.classList.toggle("busy", state.voiceBusy);
  voice.setAttribute("aria-pressed", String(state.voiceEnabled));
  voice.setAttribute("aria-label", state.voiceEnabled ? "Leave room voice chat" : "Join room voice chat");
  voice.title = state.voiceEnabled ? "Room voice on" : "Join room voice";
  updateSpeakingUi();
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

function panelSwitch(view) {
  return `<div class="multi-switch"><button type="button" class="${view === "rooms" ? "active" : ""}" data-view="rooms">Room</button><button type="button" class="${view === "chat" ? "active" : ""}" data-view="chat">Chat</button><button type="button" class="${view === "practice" ? "active" : ""}" data-view="practice">Practice</button></div>`;
}

function renderPanel() {
  const panel = state.panel?.querySelector(".multiplayer-sheet");
  if (!panel) return;
  const view = panel.dataset.view || "rooms";
  const online = state.players.length + 1;
  const header = `<div class="multi-grabber"></div><div class="multi-head"><div><small>${view === "practice" ? "Solo Practice" : state.isPrivate ? "Family room" : "Shared room"}</small><h2>${view === "practice" ? "Pick a game" : escapeHtml(state.roomName)}</h2></div><button type="button" class="multi-close" aria-label="Close rooms">×</button></div>`;
  const error = state.error ? `<div class="multi-error" role="status">${escapeHtml(state.error)}</div>` : "";
  if (view === "chat") {
    const messages = state.messages.length ? state.messages.map((message) => `<div class="multi-message ${message.uid === state.session?.uid ? "mine" : ""}"><b>${escapeHtml(message.name || "Player")}</b><p>${escapeHtml(message.text)}</p></div>`).join("") : `<div class="multi-empty">No messages yet. You’re first in the room.</div>`;
    panel.innerHTML = `${header}${panelSwitch(view)}${error}${voicePanelMarkup()}${quizChatPrompt()}<div class="multi-messages">${messages}</div><form class="multi-compose"><input maxlength="240" aria-label="Room message" placeholder="${state.currentGame?.game === "quiz" && !gameExpired() ? "Type your answer…" : "Say something kind…"}" autocomplete="off"><button type="submit" aria-label="Send message">Send</button></form>`;
  } else if (view === "practice") {
    panel.innerHTML = `${header}${panelSwitch(view)}${error}${practicePanelMarkup()}`;
  } else {
    const people = state.players.length ? state.players.map((player) => `<li><span style="background:${safeColor(player.outfit)}">${escapeHtml(String(player.name || "P").slice(0, 1).toUpperCase())}</span><b>${escapeHtml(player.name || "Player")}</b>${voicePersonMarkup(player.uid, "Here now")}</li>`).join("") : `<li class="multi-empty-row"><span>•</span><b>The room is quiet</b><small>Invite family in</small></li>`;
    const arrival = state.inviteArrival && state.isPrivate && !state.voiceEnabled ? `<div class="family-arrival"><span><b>You’re in with the family</b><small>Turn on your microphone when you’re ready.</small></span><button type="button" data-action="arrival-voice">Join voice</button></div>` : "";
    const familyInvite = state.isPrivate ? `<div class="family-invite"><div class="family-invite-head"><span><b>Bring family in</b><small>Copy this ready-to-send invitation. They can paste the code and go straight into this room.</small></span></div><button type="button" class="family-code" data-action="copy" aria-label="Copy family code ${displayRoomCode()}"><span><small>Family code</small><strong>${displayRoomCode()}</strong></span><em>Tap to copy</em></button><button type="button" class="family-invite-copy" data-action="copy-invite">Copy family invitation</button></div>` : "";
    const roomActions = state.isPrivate ? `<div class="room-actions"><button type="button" class="multi-primary" data-action="plaza">Return to plaza</button></div>` : `<div class="room-actions"><button type="button" class="multi-primary" data-action="create">${state.busy ? "Connecting…" : "Start a family room"}</button><div class="join-row family-join"><input aria-label="Family room code" placeholder="Paste family code" inputmode="text" autocomplete="off" autocapitalize="characters"><button type="button" data-action="join">Join</button></div><p class="join-helper">Paste a family code and you’ll go straight in.</p></div>`;
    panel.innerHTML = `${header}${panelSwitch(view)}${error}${arrival}${voicePanelMarkup()}${playEntry()}<div class="room-summary"><span><b>${online}</b> online</span><span>${state.isPrivate ? "Only family with this code can join" : "Open to everyone"}</span></div><ul class="multi-people"><li><span style="background:${safeColor(playerColor())}">${escapeHtml(playerName().slice(0, 1).toUpperCase())}</span><b>${escapeHtml(playerName())}</b>${voicePersonMarkup(state.session?.uid || "", "You")}</li>${people}</ul>${familyInvite}${roomActions}`;
  }
  $(".multi-close", panel)?.addEventListener("click", closePanel);
  panel.querySelectorAll("[data-view]").forEach((button) => button.addEventListener("click", () => {
    panel.dataset.view = button.dataset.view;
    renderPanel();
  }));
  $("[data-action='play']", panel)?.addEventListener("click", startRandomGame);
  $("[data-action='board']", panel)?.addEventListener("click", openBoardMode);
  panel.querySelectorAll("[data-solo-game]").forEach((button) => button.addEventListener("click", () => startSoloGame(button.dataset.soloGame)));
  panel.querySelectorAll("[data-quiz-answer]").forEach((button) => button.addEventListener("click", () => answerSoloQuiz(button.dataset.quizAnswer)));
  $("[data-action='close-practice']", panel)?.addEventListener("click", closePanel);
  $("[data-action='voice']", panel)?.addEventListener("click", toggleVoice);
  $("[data-action='arrival-voice']", panel)?.addEventListener("click", toggleVoice);
  $("[data-action='open-chat']", panel)?.addEventListener("click", () => { panel.dataset.view = "chat"; renderPanel(); });
  $("[data-action='copy']", panel)?.addEventListener("click", copyCode);
  $("[data-action='copy-invite']", panel)?.addEventListener("click", copyInvite);
  $("[data-action='create']", panel)?.addEventListener("click", createPrivateRoom);
  $("[data-action='plaza']", panel)?.addEventListener("click", () => switchRoom("plaza", "Village Plaza", false));
  const joinInput = $(".family-join input", panel);
  $("[data-action='join']", panel)?.addEventListener("click", () => joinPrivateRoom(joinInput?.value, { arrival: true }));
  joinInput?.addEventListener("input", () => {
    if (normalizeRoomCode(joinInput.value)) joinPrivateRoom(joinInput.value, { arrival: true });
  });
  joinInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      joinPrivateRoom(joinInput.value, { arrival: true });
    }
  });
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
  return `<div class="board-entry-wrap"><button type="button" class="play-entry" data-action="play" ${state.rolling || !state.session ? "disabled" : ""}>${dieMarkup()}<span><small>${state.rolling ? "Rolling the room dice…" : "Quick round"}</small><b>${state.rolling ? "Choosing a game" : "Play a minigame"}</b></span><strong>${state.rolling ? "" : "Roll"}</strong></button><button type="button" class="play-entry board-party-entry" data-action="board"><i class="board-party-mark" aria-hidden="true">★</i><span><small>Five rounds · everyone plays</small><b>Snug Board</b></span><strong>Open</strong></button></div>`;
}

function practicePanelMarkup() {
  const game = state.currentGame;
  if (game?.practice && !gameExpired()) {
    const score = scoreFor(state.session?.uid);
    if (game.game === "quiz") {
      const index = currentQuizIndex();
      const item = quizItem(game, index);
      const answered = roundEvents("quiz-answer").some((event) => event.uid === state.session?.uid && Number(event.question) === index);
      const answers = item.choices.map((choice) => `<button type="button" data-quiz-answer="${escapeHtml(choice)}" ${answered ? "disabled" : ""}>${escapeHtml(choice)}</button>`).join("");
      return `<div class="practice-live"><span class="practice-status"><small>Live solo round · ${secondsLeft()}s</small><b>Question ${index + 1} of 3</b></span><p>${escapeHtml(item.q)}</p><div class="practice-answers">${answers}</div><strong>${answered ? "Answer locked in" : `${score} point${score === 1 ? "" : "s"}`}</strong></div>`;
    }
    return `<div class="practice-live"><span class="practice-status"><small>Live solo round · ${secondsLeft()}s</small><b>${GAME_DEFS[game.game].name}</b></span><p>${game.game === "coin" ? "Move through the plaza and collect as many coins as you can." : "Chase the glowing practice pal. Each tag sends it to a new spot."}</p><strong>${score} point${score === 1 ? "" : "s"}</strong><button type="button" class="multi-primary" data-action="close-practice">Back to the plaza</button></div>`;
  }
  return `<p class="practice-intro">Play a complete round by yourself. Every start, score, and payout goes through the live game backend.</p><div class="practice-grid"><button type="button" data-solo-game="coin"><span class="practice-mark coin-mark" aria-hidden="true"></span><span><b>Coin Scramble</b><small>Collect all 12 plaza coins</small></span><strong>30s</strong></button><button type="button" data-solo-game="tag"><span class="practice-mark tag-mark" aria-hidden="true"></span><span><b>Plaza Tag</b><small>Chase a lively practice pal</small></span><strong>35s</strong></button><button type="button" data-solo-game="quiz"><span class="practice-mark quiz-mark" aria-hidden="true">?</span><span><b>Room Quiz</b><small>Three questions, four choices</small></span><strong>36s</strong></button></div><p class="practice-foot">No second player needed. Your balance appears before and after every payout.</p>`;
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

function readCoinBalance() {
  const value = document.querySelector(".coin-chip b")?.textContent || "";
  const parsed = Number(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

async function startSoloGame(game) {
  if (!['coin', 'tag', 'quiz'].includes(game) || state.rolling || state.busy || !state.session) return;
  if (state.currentGame && !gameExpired()) {
    showToast("Finish the current round first");
    return;
  }
  if (window.__snugWorld?.mode && window.__snugWorld.mode !== "village") {
    showToast("Head to the village plaza to practice");
    return;
  }
  state.rolling = true;
  state.soloResult = null;
  state.soloBalanceBefore = readCoinBalance();
  renderPanel();
  try {
    const seed = crypto.getRandomValues(new Uint32Array(1))[0];
    const start = {
      type: "start",
      game,
      uid: state.session.uid,
      name: playerName().slice(0, 18),
      createdAt: Date.now(),
      duration: GAME_DEFS[game].duration,
      seed,
      itUid: state.session.uid,
      players: [state.session.uid],
    };
    const result = await request(`minigames/${state.roomId}/events`, { method: "POST", body: JSON.stringify(start) });
    const id = result?.name || `local-${start.createdAt}`;
    state.soloRoundId = id;
    state.minigameEvents.push({ id, ...start });
    deriveCurrentGame();
    if (game === "quiz") {
      if (state.panel) state.panel.querySelector(".multiplayer-sheet").dataset.view = "practice";
    } else closePanel();
    renderPanel();
    renderGameHud();
    showToast(`${GAME_DEFS[game].name} practice begins`);
  } catch (error) {
    state.error = friendlyError(error);
    showToast(state.error);
  } finally {
    state.rolling = false;
    renderPanel();
  }
}

async function answerSoloQuiz(value) {
  if (!state.currentGame?.practice || state.currentGame.game !== "quiz" || gameExpired()) return;
  const question = currentQuizIndex();
  if (roundEvents("quiz-answer").some((event) => event.uid === state.session.uid && Number(event.question) === question)) return;
  const item = quizItem(state.currentGame, question);
  const accepted = [item.a, ...(item.also || [])].map(normalizeAnswer);
  if (!accepted.includes(normalizeAnswer(value))) {
    showToast("Not quite — try another answer");
    return;
  }
  try {
    await postGameEvent("quiz-answer", { question });
    showToast("Correct answer");
    renderPanel();
    renderGameHud();
  } catch (error) {
    state.error = friendlyError(error);
    renderPanel();
  }
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
    teardownPracticeTag();
    teardownPartyArena();
    renderShopEntrance();
    return;
  }
  const changed = state.currentGame?.id !== start.id;
  state.currentGame = { ...start, practice: start.id === state.soloRoundId };
  if (changed) {
    state.tagCooldownUntil = 0;
    if (start.game === "coin") setupCoins(state.currentGame);
    else teardownCoins();
    if (state.currentGame.practice && start.game === "tag") setupPracticeTag(state.currentGame);
    else teardownPracticeTag();
    setupPartyArena(state.currentGame);
    renderShopEntrance();
  } else if (start.game === "coin") updateCoinVisibility();
  else if (state.currentGame.practice && start.game === "tag") updatePracticeTag();
  else updatePartyArena();
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
  } else if (state.currentGame.game === "floor") {
    const eliminated = new Set(roundEvents("floor-out").map((event) => event.uid));
    (state.currentGame.players || []).forEach((uid) => { result[uid] = eliminated.has(uid) ? 0 : 1; });
  } else if (["connect4", "tictactoe"].includes(state.currentGame.game)) {
    const winner = validBoardState().winner;
    (state.currentGame.players || []).forEach((uid) => { result[uid] = uid === winner ? 1 : 0; });
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

function seeded(seed) {
  let value = Math.sin(Number(seed) * 999.91) * 43758.5453;
  return value - Math.floor(value);
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

const SOLO_TAG_SPOTS = [
  [-2.7, -0.8], [2.65, 0.35], [-1.4, 2.9], [1.8, -2.8], [0.2, 2.2], [-2.25, -2.25], [3.05, 2.05], [0.4, -1.5],
];

function setupPracticeTag(game) {
  const world = window.__snugWorld;
  if (!world?.scene || world.mode !== "village") return;
  if (state.soloTagGroup && state.soloTagGroup.userData.roundId === game.id) return;
  teardownPracticeTag();
  const group = new THREE.Group();
  group.name = "SoloPracticeTagPal";
  group.userData.roundId = game.id;
  const coral = new THREE.MeshStandardMaterial({ color: 0xe76854, roughness: 0.58, emissive: 0x6f1f18, emissiveIntensity: 0.15 });
  const cream = new THREE.MeshStandardMaterial({ color: 0xfff5dc, roughness: 0.82 });
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.28, 0.48, 5, 10), coral);
  body.position.y = 0.58;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.25, 14, 10), cream);
  head.position.y = 1.18;
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.055, 10, 28), new THREE.MeshStandardMaterial({ color: 0xf1bd48, roughness: 0.38, metalness: 0.16, emissive: 0x6a4500, emissiveIntensity: 0.2 }));
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.12;
  group.add(body, head, ring);
  world.scene.add(group);
  state.soloTagGroup = group;
  state.soloTagTarget = group;
  state.soloTagHits = roundEvents("tag").filter((event) => event.uid === state.session?.uid).length;
  placePracticeTagTarget();
}

function placePracticeTagTarget() {
  if (!state.soloTagTarget || !state.currentGame) return;
  const index = (Number(state.currentGame.seed || 0) + state.soloTagHits * 3) % SOLO_TAG_SPOTS.length;
  const [x, z] = SOLO_TAG_SPOTS[index];
  state.soloTagTarget.position.set(x, 0, z);
}

function updatePracticeTag() {
  if (!state.soloTagGroup || state.soloTagGroup.userData.roundId !== state.currentGame?.id) return;
  const time = performance.now() * 0.003;
  state.soloTagGroup.position.y = 0.08 + Math.sin(time * 1.7) * 0.08;
  state.soloTagGroup.rotation.y = Math.sin(time * 0.55) * 0.35;
}

function teardownPracticeTag() {
  if (!state.soloTagGroup) return;
  state.soloTagGroup.parent?.remove(state.soloTagGroup);
  disposeObject(state.soloTagGroup);
  state.soloTagGroup = null;
  state.soloTagTarget = null;
  state.soloTagHits = 0;
}

function shopSignTexture(label, color) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 160;
  const context = canvas.getContext("2d");
  context.fillStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "#fffdf8";
  context.lineWidth = 10;
  context.strokeRect(8, 8, canvas.width - 16, canvas.height - 16);
  context.fillStyle = "#fffdf8";
  context.font = "900 48px Arial, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(label, canvas.width / 2, canvas.height / 2);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeStorefront(definition) {
  const group = new THREE.Group();
  group.name = `Storefront_${definition.id}`;
  group.position.set(definition.x, 0, definition.z);
  group.rotation.y = definition.rotation || 0;
  const wall = new THREE.MeshStandardMaterial({ color: definition.wall, roughness: 0.9 });
  const trim = new THREE.MeshStandardMaterial({ color: definition.trim, roughness: 0.8 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x33494c, roughness: 0.78 });
  const building = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.35, 1.55), wall);
  building.position.y = 1.18;
  building.castShadow = true;
  group.add(building);
  const roof = new THREE.Mesh(new THREE.ConeGeometry(1.85, 0.8, 4), trim);
  roof.position.y = 2.72;
  roof.rotation.y = Math.PI / 4;
  roof.scale.z = 0.72;
  group.add(roof);
  const door = new THREE.Mesh(new THREE.BoxGeometry(0.72, 1.45, 0.08), dark);
  door.position.set(0, 0.74, 0.82);
  group.add(door);
  [-0.78, 0.78].forEach((x) => {
    const windowPane = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.7, 0.07), new THREE.MeshStandardMaterial({ color: 0x9dd1d9, roughness: 0.3, metalness: 0.05 }));
    windowPane.position.set(x, 1.35, 0.82);
    group.add(windowPane);
  });
  const awning = new THREE.Mesh(new THREE.BoxGeometry(2.25, 0.12, 0.62), trim);
  awning.position.set(0, 1.92, 1.05);
  awning.rotation.x = -0.18;
  group.add(awning);
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.95, 0.61), new THREE.MeshBasicMaterial({ map: shopSignTexture(definition.sign, definition.signColor), transparent: false }));
  sign.position.set(0, 2.38, 0.81);
  group.add(sign);
  const step = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.12, 0.55), new THREE.MeshStandardMaterial({ color: 0xcbb993, roughness: 1 }));
  step.position.set(0, 0.06, 1.03);
  group.add(step);
  const entrance = new THREE.Vector3(0, 0, 1.35).applyAxisAngle(new THREE.Vector3(0, 1, 0), group.rotation.y).add(group.position);
  group.userData.definition = definition;
  group.userData.entrance = entrance;
  return group;
}

function setupVillageShops() {
  const world = window.__snugWorld;
  if (!world?.scene || world.mode !== "village" || state.shopWorld === world) return;
  if (state.shopGroup) {
    state.shopGroup.parent?.remove(state.shopGroup);
    disposeObject(state.shopGroup);
  }
  const definitions = [
    { id: "salon", name: "Curl & Comb", sign: "SALON", note: "Hairstyles and headwear", x: -4.35, z: -2.8, rotation: Math.PI / 2, wall: 0xf1c9cf, trim: 0xb85f70, signColor: "#a94f63" },
    { id: "mall", name: "Pocket Mall", sign: "MALL", note: "Accessories and outfits", x: 4.35, z: -2.7, rotation: -Math.PI / 2, wall: 0xc7dfea, trim: 0x4e8194, signColor: "#42788b" },
    { id: "furniture", name: "Hearth & Home", sign: "HOME", note: "Furniture, rugs, and wallpaper", x: -4.35, z: 2.75, rotation: Math.PI / 2, wall: 0xe7d2a5, trim: 0x9a704a, signColor: "#845d3d" },
    { id: "garden", name: "Green Nook", sign: "GARDEN", note: "Plants and outdoor decorations", x: 4.35, z: 2.75, rotation: -Math.PI / 2, wall: 0xc9dfb5, trim: 0x5f8555, signColor: "#527747" },
  ];
  const group = new THREE.Group();
  group.name = "SnugVillageShops";
  const shops = definitions.map((definition) => {
    const storefront = makeStorefront(definition);
    group.add(storefront);
    return { ...definition, entrance: storefront.userData.entrance };
  });
  world.scene.add(group);
  state.shopWorld = world;
  state.shopGroup = group;
  state.shops = shops;
}

function openExistingShop(shop) {
  if (!shop) return;
  const closeRoom = $(".multiplayer-backdrop");
  if (closeRoom) closePanel();
  const tab = [...document.querySelectorAll(".tabbar button")].find((button) => button.textContent.trim() === "Style");
  tab?.click();
  setTimeout(() => {
    const browse = $(".shop-link");
    browse?.click();
    setTimeout(() => {
      const sheet = [...document.querySelectorAll(".sheet")].find((item) => item.querySelector(".sheet-head h2")?.textContent.trim() === "Meadow Market");
      if (!sheet) return;
      const wanted = shop.id === "salon" ? new Set(["Hairstyle", "Hat"]) : shop.id === "furniture" ? new Set(["Furniture", "Wallpaper", "Carpet"]) : shop.id === "garden" ? new Set(["Furniture"]) : new Set(["Hat", "Head accessory", "Outfit", "Hand accessory", "Shoes"]);
      sheet.querySelectorAll(".shop-item").forEach((item) => { item.hidden = !wanted.has(item.querySelector("small")?.textContent.trim()); });
      const title = sheet.querySelector(".sheet-head h2");
      if (title) title.textContent = shop.name;
    }, 0);
  }, 0);
}

function renderShopEntrance() {
  let card = $(".shop-entrance");
  if (!card) {
    card = document.createElement("div");
    card.className = "shop-entrance";
    card.hidden = true;
    card.innerHTML = `<span><small></small><b></b></span><button type="button">Walk in</button>`;
    card.querySelector("button").addEventListener("click", () => openExistingShop(state.nearbyShop));
    document.body.appendChild(card);
  }
  card.hidden = !state.nearbyShop || Boolean(state.currentGame && !gameExpired());
  if (state.nearbyShop) {
    card.querySelector("small").textContent = state.nearbyShop.note;
    card.querySelector("b").textContent = state.nearbyShop.name;
    card.querySelector("button").setAttribute("aria-label", `Enter ${state.nearbyShop.name}`);
  }
}

function updateNearbyShop() {
  setupVillageShops();
  if (!state.shops.length || window.__snugWorld?.mode !== "village") {
    state.nearbyShop = null;
    renderShopEntrance();
    return;
  }
  const nearest = state.shops.map((shop) => ({ shop, distance: Math.hypot(shop.entrance.x - state.position.x, shop.entrance.z - state.position.z) })).sort((a, b) => a.distance - b.distance)[0];
  const next = nearest?.distance < 1.35 ? nearest.shop : null;
  if (next?.id !== state.nearbyShop?.id) {
    state.nearbyShop = next;
    renderShopEntrance();
  }
}

function makeWildlife() {
  const group = new THREE.Group();
  const creatures = [];
  const addBird = (color, radius, phase) => {
    const bird = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({ color, roughness: 0.9 });
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), material);
    body.scale.set(1.25, 0.85, 0.9);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.085, 8, 6), material);
    head.position.set(0, 0.08, 0.11);
    const beak = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.1, 5), new THREE.MeshStandardMaterial({ color: 0xe9a84c }));
    beak.rotation.x = Math.PI / 2;
    beak.position.set(0, 0.07, 0.21);
    bird.add(body, head, beak);
    bird.userData = { kind: "bird", radius, phase, speed: 0.00022 + phase * 0.00001, collisionRadius: 0.23 };
    group.add(bird);
    creatures.push(bird);
  };
  const addCat = (coat, radius, phase) => {
    const cat = new THREE.Group();
    cat.name = `VillageCat_${coat.name}`;
    const material = new THREE.MeshStandardMaterial({ color: coat.base, roughness: coat.fluffy ? 1 : 0.92 });
    const body = new THREE.Mesh(new THREE.SphereGeometry(coat.fluffy ? 0.24 : 0.2, coat.fluffy ? 14 : 10, coat.fluffy ? 10 : 7), material);
    body.scale.set(coat.fluffy ? 0.95 : 0.8, coat.fluffy ? 1 : 0.8, coat.fluffy ? 1.45 : 1.35);
    body.position.y = coat.fluffy ? 0.25 : 0.21;
    const head = new THREE.Mesh(new THREE.SphereGeometry(coat.fluffy ? 0.19 : 0.16, coat.fluffy ? 14 : 10, coat.fluffy ? 10 : 7), material);
    head.position.set(0, coat.fluffy ? 0.46 : 0.39, 0.2);
    [-0.08, 0.08].forEach((x) => { const ear = new THREE.Mesh(new THREE.ConeGeometry(coat.fluffy ? 0.075 : 0.065, coat.fluffy ? 0.18 : 0.16, 4), material); ear.position.set(x, coat.fluffy ? 0.65 : 0.55, 0.2); ear.rotation.y = Math.PI / 4; cat.add(ear); });
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(coat.fluffy ? 0.06 : 0.035, coat.fluffy ? 0.075 : 0.045, coat.fluffy ? 0.55 : 0.48, coat.fluffy ? 8 : 6), material);
    tail.position.set(0.18, coat.fluffy ? 0.42 : 0.34, -0.2);
    tail.rotation.z = -0.7;
    cat.add(body, head, tail);
    (coat.patches || []).forEach((color, index) => {
      const patch = new THREE.Mesh(new THREE.SphereGeometry(0.075 + index * 0.012, 8, 6), new THREE.MeshStandardMaterial({ color, roughness: 1 }));
      patch.scale.set(1.35, 0.65, 0.35);
      patch.position.set(index % 2 ? -0.105 : 0.105, index === 0 ? 0.27 : 0.42, index === 0 ? 0.235 : 0.34);
      cat.add(patch);
    });
    if (coat.whiteChest) {
      const chest = new THREE.Mesh(new THREE.SphereGeometry(0.105, 9, 6), new THREE.MeshStandardMaterial({ color: 0xf5f2e9, roughness: 1 }));
      chest.scale.set(0.75, 1.05, 0.35);
      chest.position.set(0, 0.28, 0.31);
      cat.add(chest);
    }
    if (coat.stripes) {
      for (let index = 0; index < 3; index += 1) {
        const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.025, 0.045), new THREE.MeshStandardMaterial({ color: coat.stripes, roughness: 1 }));
        stripe.position.set(0, 0.32 - index * 0.055, -0.02 - index * 0.07);
        cat.add(stripe);
      }
    }
    cat.userData = { kind: "cat", coat: coat.name, radius, phase, speed: 0.00007 + (phase % 3) * 0.000009, collisionRadius: coat.fluffy ? 0.4 : 0.34 };
    group.add(cat);
    creatures.push(cat);
  };
  const addBunny = (color, radius, phase) => {
    const bunny = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({ color, roughness: 1 });
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.17, 9, 7), material);
    body.position.y = 0.17;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 9, 7), material);
    head.position.set(0, 0.36, 0.13);
    [-0.055, 0.055].forEach((x) => { const ear = new THREE.Mesh(new THREE.CapsuleGeometry(0.035, 0.16, 3, 6), material); ear.position.set(x, 0.57, 0.12); bunny.add(ear); });
    bunny.add(body, head);
    bunny.userData = { kind: "bunny", radius, phase, speed: 0.00011 + phase * 0.000005, collisionRadius: 0.3 };
    group.add(bunny);
    creatures.push(bunny);
  };
  addBird(0xd67c55, 2.2, 0.4);
  addBird(0x5f88a7, 3.1, 1.8);
  addCat({ name: "OrangeTabby", base: 0xd9873b, stripes: 0x9b4f23 }, 2.8, 2.9);
  addCat({ name: "Grey", base: 0x777b80 }, 3.6, 4.1);
  addCat({ name: "BlackAndWhite", base: 0x292929, whiteChest: true, patches: [0xf4f0e8] }, 1.7, 0.9);
  addCat({ name: "Tortoiseshell", base: 0x3d2b27, patches: [0xcf7839, 0xd9ad62, 0x171515] }, 3.25, 5.5);
  addCat({ name: "WhiteLonghair", base: 0xf4f2eb, fluffy: true }, 2.35, 3.8);
  addCat({ name: "BlackLonghair", base: 0x202329, fluffy: true, whiteChest: true }, 4.05, 1.4);
  addCat({ name: "Calico", base: 0xf4eee1, patches: [0xd77a38, 0x302b29, 0xd77a38] }, 1.95, 4.65);
  addCat({ name: "BrownTabby", base: 0x8a715a, stripes: 0x4d3b31, whiteChest: true }, 3.9, 6.0);
  addBunny(0xd8d1c6, 2.45, 5.25);
  return { group, creatures };
}

function setupEnvironment() {
  const world = window.__snugWorld;
  if (!world?.scene || world.mode !== "village" || state.environmentWorld === world) return;
  if (state.environment?.group) {
    state.environment.group.parent?.remove(state.environment.group);
    disposeObject(state.environment.group);
  }
  const group = new THREE.Group();
  group.name = "SnugLivingWorld";
  const sun = new THREE.Mesh(new THREE.SphereGeometry(0.72, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffd66f }));
  const moon = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 12), new THREE.MeshBasicMaterial({ color: 0xd9e5ff }));
  group.add(sun, moon);
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = [];
  for (let index = 0; index < 110; index += 1) {
    const angle = seeded(index * 31.7 + 4.2) * Math.PI * 2;
    const radius = 10 + seeded(index * 17.9) * 11;
    starPositions.push(Math.cos(angle) * radius, 7 + seeded(index * 8.4) * 9, Math.sin(angle) * radius);
  }
  starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
  const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xf6f3d0, size: 0.09, transparent: true, opacity: 0 }));
  group.add(stars);
  const clouds = [];
  for (let index = 0; index < 5; index += 1) {
    const cloud = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.82 });
    [[0, 0, 0, 0.55], [0.48, 0.02, 0.04, 0.38], [-0.43, -0.03, 0.02, 0.34], [0.12, 0.18, 0, 0.42]].forEach(([x, y, z, scale]) => {
      const puff = new THREE.Mesh(new THREE.SphereGeometry(scale, 9, 6), material);
      puff.position.set(x, y, z);
      puff.scale.z = 0.75;
      cloud.add(puff);
    });
    cloud.position.set(-8 + index * 3.7, 6.5 + (index % 2) * 1.1, -4 + (index % 3) * 4.2);
    cloud.userData.speed = 0.0007 + index * 0.00008;
    group.add(cloud);
    clouds.push(cloud);
  }
  const weatherCount = 320;
  const weatherGeometry = new THREE.BufferGeometry();
  const weatherPositions = new Float32Array(weatherCount * 3);
  for (let i = 0; i < weatherCount; i += 1) {
    weatherPositions[i * 3] = (seeded(i * 4.73) - 0.5) * 12;
    weatherPositions[i * 3 + 1] = seeded(i * 8.17) * 7;
    weatherPositions[i * 3 + 2] = (seeded(i * 2.41 + 2) - 0.5) * 12;
  }
  weatherGeometry.setAttribute("position", new THREE.BufferAttribute(weatherPositions, 3));
  const weather = new THREE.Points(weatherGeometry, new THREE.PointsMaterial({ color: 0xaed4e9, size: 0.045, transparent: true, opacity: 0 }));
  group.add(weather);
  const wildlife = makeWildlife();
  group.add(wildlife.group);
  world.scene.add(group);
  const ambient = [];
  world.scene.traverse((node) => { if (node.isAmbientLight || node.isHemisphereLight || node.isDirectionalLight) ambient.push({ node, base: node.intensity }); });
  state.environment = { group, sun, moon, stars, clouds, weather, wildlife: wildlife.creatures, lights: ambient, lastLightning: 0, lightningUntil: 0 };
  state.environmentWorld = world;
  const player = world.player?.position;
  if (player) state.lastSafePosition = { x: player.x, y: player.y, z: player.z };
}

function environmentPhase(now = Date.now()) {
  const dayFraction = (now % 180000) / 180000;
  const hour = Math.floor(dayFraction * 24);
  const minute = Math.floor((dayFraction * 24 - hour) * 60);
  const seasonNames = ["Spring", "Summer", "Autumn", "Winter"];
  const seasonIndex = Math.floor(now / 90000) % 4;
  const weatherIndex = Math.floor(now / 28000) % 4;
  const weatherName = weatherIndex === 1 ? (seasonIndex === 3 ? "Snow" : "Rain") : weatherIndex === 3 ? "Thunderstorm" : "Clear";
  const sunHeight = Math.sin((dayFraction - 0.25) * Math.PI * 2);
  return { dayFraction, hour, minute, seasonIndex, season: seasonNames[seasonIndex], weather: weatherName, daylight: Math.max(0, Math.min(1, sunHeight * 0.7 + 0.45)), isNight: sunHeight < -0.08 };
}

function renderWeatherStatus(phase) {
  let pill = $(".world-weather");
  if (!pill) {
    pill = document.createElement("div");
    pill.className = "world-weather";
    document.body.appendChild(pill);
  }
  pill.hidden = window.__snugWorld?.mode !== "village";
  const displayHour = phase.hour % 12 || 12;
  pill.className = `world-weather ${phase.isNight ? "night" : "day"} ${phase.weather === "Thunderstorm" ? "storm" : ""}`;
  pill.innerHTML = `<i></i><span>${phase.season} · ${phase.weather} · ${displayHour}:${String(phase.minute).padStart(2, "0")} ${phase.hour >= 12 ? "PM" : "AM"}</span>`;
}

function playThunder() {
  if (!state.audioUnlocked) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    state.thunderContext ||= new AudioContext();
    const context = state.thunderContext;
    if (context.state === "suspended") context.resume();
    const duration = 1.1;
    const buffer = context.createBuffer(1, context.sampleRate * duration, context.sampleRate);
    const data = buffer.getChannelData(0);
    for (let index = 0; index < data.length; index += 1) data[index] = (Math.random() * 2 - 1) * Math.pow(1 - index / data.length, 2.2);
    const source = context.createBufferSource();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    filter.type = "lowpass";
    filter.frequency.value = 260;
    gain.gain.setValueAtTime(0.16, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
    source.buffer = buffer;
    source.connect(filter).connect(gain).connect(context.destination);
    source.start();
  } catch {}
}

function tickEnvironment(time = performance.now()) {
  setupEnvironment();
  const env = state.environment;
  if (!env || window.__snugWorld?.mode !== "village") {
    const pill = $(".world-weather");
    if (pill) pill.hidden = true;
    return;
  }
  const now = Date.now();
  const phase = environmentPhase(now);
  const angle = phase.dayFraction * Math.PI * 2 - Math.PI;
  env.sun.position.set(Math.cos(angle) * 10, Math.sin(angle) * 8 + 5, -7);
  env.moon.position.set(-env.sun.position.x, 10 - env.sun.position.y, 7);
  env.sun.visible = !phase.isNight;
  env.moon.visible = phase.isNight;
  env.stars.material.opacity = phase.isNight ? Math.min(0.9, (1 - phase.daylight) * 1.3) : 0;
  env.lights.forEach(({ node, base }) => { node.intensity = base * (0.28 + phase.daylight * 0.72); });
  const sky = new THREE.Color(phase.isNight ? 0x17273f : phase.weather === "Thunderstorm" ? 0x65757c : 0x9fd3df);
  window.__snugWorld.scene.background?.lerp?.(sky, 0.025);
  if (window.__snugWorld.scene.fog?.color) window.__snugWorld.scene.fog.color.lerp(sky, 0.025);
  env.clouds.forEach((cloud, index) => {
    cloud.position.x += cloud.userData.speed * 16;
    if (cloud.position.x > 9) cloud.position.x = -9;
    cloud.children[0].material.color.set(phase.weather === "Thunderstorm" ? 0x79878a : 0xffffff);
    cloud.children[0].material.opacity = phase.weather === "Clear" ? 0.72 : 0.95;
    cloud.rotation.y = Math.sin(time * 0.00012 + index) * 0.15;
  });
  const particles = env.weather.geometry.attributes.position;
  const falling = phase.weather !== "Clear";
  env.weather.visible = falling;
  env.weather.material.opacity = falling ? 0.78 : 0;
  env.weather.material.color.set(phase.weather === "Snow" ? 0xffffff : 0x87bbd5);
  env.weather.material.size = phase.weather === "Snow" ? 0.095 : 0.042;
  if (falling) {
    for (let i = 0; i < particles.count; i += 1) {
      let y = particles.getY(i) - (phase.weather === "Snow" ? 0.012 : 0.055);
      if (y < 0.08) y = 6.8;
      particles.setY(i, y);
      if (phase.weather === "Snow") particles.setX(i, particles.getX(i) + Math.sin(time * 0.001 + i) * 0.0015);
    }
    particles.needsUpdate = true;
  }
  env.wildlife.forEach((creature, index) => {
    const t = now * creature.userData.speed + creature.userData.phase;
    creature.position.set(Math.cos(t) * creature.userData.radius, creature.userData.kind === "bird" ? 0.55 + Math.sin(t * 4) * 0.08 : 0, Math.sin(t * 0.88) * creature.userData.radius);
    creature.rotation.y = Math.atan2(-Math.sin(t), Math.cos(t * 0.88));
    if (creature.userData.kind === "bunny") creature.position.y = Math.max(0, Math.sin(t * 5) * 0.08);
  });
  if (phase.weather === "Thunderstorm" && now - env.lastLightning > 6200) {
    env.lastLightning = now;
    env.lightningUntil = now + 140;
    playThunder();
  }
  if (now < env.lightningUntil) {
    window.__snugWorld.scene.background?.set?.(0xdce7e8);
    env.lights.forEach(({ node, base }) => { node.intensity = Math.max(node.intensity, base * 1.7); });
  }
  if (!state.lastWeatherRender || now - state.lastWeatherRender > 1000) {
    state.lastWeatherRender = now;
    renderWeatherStatus(phase);
  }
}

function collidesAt(position) {
  if (!position || window.__snugWorld?.mode !== "village") return false;
  if (Math.abs(position.x) > 5.15 || Math.abs(position.z) > 5.15) return true;
  for (const shop of state.shops) {
    const dx = position.x - shop.x;
    const dz = position.z - shop.z;
    const c = Math.cos(-shop.rotation);
    const s = Math.sin(-shop.rotation);
    const localX = dx * c - dz * s;
    const localZ = dx * s + dz * c;
    if (Math.abs(localX) < 1.38 && Math.abs(localZ) < 0.92) return true;
  }
  const fixed = [[-5, 4.5, 0.65], [5.2, 4.8, 0.75], [1.7, -1.45, 0.28], [-1.7, -2.05, 0.42], [4.8, 1.55, 0.52]];
  if (fixed.some(([x, z, radius]) => Math.hypot(position.x - x, position.z - z) < radius)) return true;
  if (state.players.some((player) => Math.hypot(Number(player.x) - position.x, Number(player.z) - position.z) < 0.58)) return true;
  if (state.environment?.wildlife.some((creature) => Math.hypot(creature.position.x - position.x, creature.position.z - position.z) < creature.userData.collisionRadius + 0.24)) return true;
  return false;
}

function applyPlayerCollision(next) {
  const world = window.__snugWorld;
  if (!world?.player || !next) return next;
  if (collidesAt(next)) {
    const safe = state.lastSafePosition;
    world.player.position.set(safe.x, safe.y ?? world.player.position.y, safe.z);
    return { ...safe };
  }
  state.lastSafePosition = { x: Number(next.x) || 0, y: Number(next.y) || 0, z: Number(next.z) || 0 };
  return next;
}

function disposeObject(object) {
  object?.traverse?.((child) => {
    if (!child.isMesh) return;
    child.geometry?.dispose?.();
    if (Array.isArray(child.material)) child.material.forEach((material) => material.dispose?.());
    else child.material?.dispose?.();
  });
}

function teardownPartyArena() {
  if (!state.partyArena) return;
  state.partyArena.group?.parent?.remove(state.partyArena.group);
  disposeObject(state.partyArena.group);
  state.partyArena = null;
  state.arenaRoundId = "";
  state.floorEliminated = false;
}

function seededOrder(count, seed) {
  const values = Array.from({ length: count }, (_, index) => index);
  let value = (Number(seed) || 1) >>> 0;
  for (let index = values.length - 1; index > 0; index -= 1) {
    value = Math.imul(value ^ (value >>> 15), 2246822519) >>> 0;
    const swap = value % (index + 1);
    [values[index], values[swap]] = [values[swap], values[index]];
  }
  return values;
}

function makeFloorArena(game, group) {
  const tiles = [];
  const order = seededOrder(49, game.seed);
  const rank = new Map(order.map((tile, index) => [tile, index]));
  const colors = [0x6fb6ad, 0xe4b64d, 0xe87863, 0x7799c8];
  for (let row = 0; row < 7; row += 1) {
    for (let column = 0; column < 7; column += 1) {
      const index = row * 7 + column;
      const tile = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.18, 1.08), new THREE.MeshStandardMaterial({ color: colors[(row + column) % colors.length], roughness: 0.72, emissive: 0x000000 }));
      tile.position.set((column - 3) * 1.12, 0.08, (row - 3) * 1.12);
      tile.userData = { index, row, column, dropAt: 6000 + rank.get(index) * 760 };
      tile.castShadow = true;
      tile.receiveShadow = true;
      group.add(tile);
      tiles.push(tile);
    }
  }
  return { tiles, clickTargets: [] };
}

function makeConnectFourArena(group) {
  const frameMaterial = new THREE.MeshStandardMaterial({ color: 0x3e6f94, roughness: 0.7 });
  const slotMaterial = new THREE.MeshStandardMaterial({ color: 0x213b48, roughness: 0.86 });
  const frame = new THREE.Mesh(new THREE.BoxGeometry(5.4, 4.3, 0.28), frameMaterial);
  frame.position.set(0, 2.35, -0.7);
  group.add(frame);
  const clickTargets = [];
  for (let column = 0; column < 7; column += 1) {
    const hit = new THREE.Mesh(new THREE.BoxGeometry(0.7, 4.1, 0.35), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }));
    hit.position.set((column - 3) * 0.72, 2.35, -0.48);
    hit.userData.cell = column;
    group.add(hit);
    clickTargets.push(hit);
    for (let row = 0; row < 6; row += 1) {
      const slot = new THREE.Mesh(new THREE.CircleGeometry(0.25, 24), slotMaterial);
      slot.position.set((column - 3) * 0.72, 0.68 + row * 0.67, -0.52);
      group.add(slot);
    }
  }
  const foot = new THREE.Mesh(new THREE.BoxGeometry(6.1, 0.18, 1.4), frameMaterial);
  foot.position.set(0, 0.14, -0.7);
  group.add(foot);
  return { clickTargets, pieces: new Map() };
}

function makeTicTacToeArena(group) {
  const clickTargets = [];
  const boardMaterial = new THREE.MeshStandardMaterial({ color: 0xe8d6ad, roughness: 0.82 });
  const lineMaterial = new THREE.MeshStandardMaterial({ color: 0x3d5e63, roughness: 0.75 });
  const board = new THREE.Mesh(new THREE.BoxGeometry(4.5, 4.5, 0.24), boardMaterial);
  board.position.set(0, 2.45, -0.7);
  group.add(board);
  [-0.75, 0.75].forEach((offset) => {
    const vertical = new THREE.Mesh(new THREE.BoxGeometry(0.09, 4.25, 0.12), lineMaterial);
    vertical.position.set(offset, 2.45, -0.5);
    group.add(vertical);
    const horizontal = new THREE.Mesh(new THREE.BoxGeometry(4.25, 0.09, 0.12), lineMaterial);
    horizontal.position.set(0, 2.45 + offset, -0.5);
    group.add(horizontal);
  });
  for (let cell = 0; cell < 9; cell += 1) {
    const column = cell % 3;
    const row = Math.floor(cell / 3);
    const hit = new THREE.Mesh(new THREE.BoxGeometry(1.38, 1.38, 0.3), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 }));
    hit.position.set((column - 1) * 1.5, 3.95 - row * 1.5, -0.44);
    hit.userData.cell = cell;
    group.add(hit);
    clickTargets.push(hit);
  }
  return { clickTargets, pieces: new Map() };
}

function setupPartyArena(game) {
  if (!["floor", "connect4", "tictactoe"].includes(game?.game)) {
    teardownPartyArena();
    return;
  }
  const world = window.__snugWorld;
  if (!world?.scene || world.mode !== "village") return;
  if (state.arenaRoundId === game.id && state.partyArena) return;
  teardownPartyArena();
  const group = new THREE.Group();
  group.name = `snug-${game.game}-arena`;
  const parts = game.game === "floor" ? makeFloorArena(game, group) : game.game === "connect4" ? makeConnectFourArena(group) : makeTicTacToeArena(group);
  world.scene.add(group);
  state.partyArena = { group, type: game.game, ...parts };
  state.arenaRoundId = game.id;
  state.floorEliminated = roundEvents("floor-out").some((event) => event.uid === state.session?.uid);
  if (game.game !== "floor") {
    world.player?.position?.set?.(0, 0, 3.6);
    state.position = { x: 0, z: 3.6, rotation: 0 };
  }
  updatePartyArena();
}

function validBoardState() {
  const game = state.currentGame;
  if (!game || !["connect4", "tictactoe"].includes(game.game)) return { cells: [], moves: [], winner: "" };
  const players = Array.isArray(game.players) ? game.players.slice(0, 2) : [];
  const size = game.game === "connect4" ? 42 : 9;
  const cells = Array(size).fill("");
  const moves = [];
  let winner = "";
  const hasLine = (uid) => {
    if (game.game === "tictactoe") {
      return [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]].some((line) => line.every((cell) => cells[cell] === uid));
    }
    for (let row = 0; row < 6; row += 1) for (let column = 0; column < 7; column += 1) {
      const lines = [[[1,0],[2,0],[3,0]],[[0,1],[0,2],[0,3]],[[1,1],[2,2],[3,3]],[[-1,1],[-2,2],[-3,3]]];
      if (cells[row * 7 + column] === uid && lines.some((line) => line.every(([dx,dy]) => { const x=column+dx,y=row+dy; return x>=0&&x<7&&y>=0&&y<6&&cells[y*7+x]===uid; }))) return true;
    }
    return false;
  };
  for (const event of roundEvents("board-move")) {
    if (winner || players.length < 2 || event.uid !== players[moves.length % 2]) continue;
    let cell = Number(event.cell);
    if (game.game === "connect4") {
      if (cell < 0 || cell > 6) continue;
      let row = 0;
      while (row < 6 && cells[row * 7 + cell]) row += 1;
      if (row >= 6) continue;
      cell = row * 7 + cell;
    } else if (cell < 0 || cell > 8 || cells[cell]) continue;
    cells[cell] = event.uid;
    moves.push({ ...event, resolvedCell: cell });
    if (hasLine(event.uid)) winner = event.uid;
  }
  return { cells, moves, winner, players };
}

function boardPiece(game, move) {
  const first = move.uid === game.players?.[0];
  if (game.game === "connect4") {
    const column = move.resolvedCell % 7;
    const row = Math.floor(move.resolvedCell / 7);
    const piece = new THREE.Mesh(new THREE.CircleGeometry(0.245, 24), new THREE.MeshStandardMaterial({ color: first ? 0xf0bd45 : 0xe85f4e, roughness: 0.55, emissive: first ? 0x2d1a00 : 0x2a0804, emissiveIntensity: 0.08 }));
    piece.position.set((column - 3) * 0.72, 0.68 + row * 0.67, -0.44);
    return piece;
  }
  const cell = move.resolvedCell;
  const column = cell % 3;
  const row = Math.floor(cell / 3);
  const material = new THREE.MeshStandardMaterial({ color: first ? 0xe76854 : 0x3f7d87, roughness: 0.6 });
  const piece = first ? new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.09, 12, 28), material) : new THREE.Group();
  if (!first) {
    [-1, 1].forEach((direction) => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.92, 0.12), material);
      bar.rotation.z = direction * Math.PI / 4;
      piece.add(bar);
    });
  }
  piece.position.set((column - 1) * 1.5, 3.95 - row * 1.5, -0.36);
  return piece;
}

function updatePartyArena() {
  const arena = state.partyArena;
  const game = state.currentGame;
  if (!arena || !game || arena.type !== game.game) return;
  const elapsed = Date.now() - Number(game.createdAt);
  if (game.game === "floor") {
    arena.tiles.forEach((tile) => {
      const untilDrop = tile.userData.dropAt - elapsed;
      if (untilDrop <= 0) {
        tile.position.y += (-1.8 - tile.position.y) * 0.12;
        tile.rotation.x += 0.035;
        tile.material.emissive.setHex(0x000000);
      } else if (untilDrop < 1700) {
        tile.material.emissive.setHex(Math.floor(untilDrop / 180) % 2 ? 0x8a2c20 : 0x000000);
      }
    });
  } else {
    const board = validBoardState();
    board.moves.forEach((move) => {
      if (arena.pieces.has(move.id)) return;
      const piece = boardPiece(game, move);
      arena.group.add(piece);
      arena.pieces.set(move.id, piece);
    });
  }
}

async function detectFloorDrop() {
  if (state.actionBusy || state.floorEliminated || gameExpired() || state.currentGame?.game !== "floor" || !state.partyArena) return;
  const elapsed = Date.now() - Number(state.currentGame.createdAt);
  const tile = state.partyArena.tiles.find((entry) => Math.abs(entry.position.x - state.position.x) < 0.54 && Math.abs(entry.position.z - state.position.z) < 0.54);
  if (!tile || elapsed < tile.userData.dropAt) return;
  state.actionBusy = true;
  state.floorEliminated = true;
  try {
    await postGameEvent("floor-out", { cell: tile.userData.index });
    showToast("That tile dropped — you’re out");
  } catch (error) {
    state.voiceError = friendlyError(error);
  } finally {
    state.actionBusy = false;
  }
}

async function submitBoardMove(cell) {
  const game = state.currentGame;
  if (!game || gameExpired() || !["connect4", "tictactoe"].includes(game.game)) return;
  const board = validBoardState();
  if (board.winner) return showToast("That board is already won");
  if (board.players.length < 2) return showToast("Waiting for one more player");
  if (board.players[board.moves.length % 2] !== state.session?.uid) return showToast("It’s the other player’s turn");
  if (game.game === "connect4") {
    if (board.cells.filter((_, index) => index % 7 === Number(cell)).every(Boolean)) return showToast("That column is full");
  } else if (board.cells[Number(cell)]) return showToast("That square is taken");
  try {
    await postGameEvent("board-move", { cell: Number(cell) });
    updatePartyArena();
  } catch (error) {
    showToast(friendlyError(error));
  }
}

function handleArenaPointer(event) {
  const arena = state.partyArena;
  const world = window.__snugWorld;
  if (!arena?.clickTargets?.length || !world?.camera || !world?.renderer || event.target !== world.renderer.domElement) return;
  const rect = world.renderer.domElement.getBoundingClientRect();
  state.arenaPointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
  state.arenaRaycaster.setFromCamera(state.arenaPointer, world.camera);
  const hit = state.arenaRaycaster.intersectObjects(arena.clickTargets, false)[0];
  if (!hit) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  submitBoardMove(hit.object.userData.cell);
}

window.addEventListener("pointerup", handleArenaPointer, true);

async function detectCoinPickup() {
  if (state.actionBusy || gameExpired() || state.currentGame?.game !== "coin") return;
  const claimed = new Set(roundEvents("coin").map((event) => Number(event.item)));
  const index = state.coinPositions.findIndex((point, item) => !claimed.has(item) && Math.hypot(point.x - state.position.x, point.z - state.position.z) < 0.58);
  if (index < 0) return;
  state.actionBusy = true;
  try {
    await postGameEvent("coin", { item: index });
    updateCoinVisibility();
    window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "coin-pickup" } }));
    showToast("Coin collected");
  } catch (error) {
    state.error = friendlyError(error);
  } finally {
    state.actionBusy = false;
  }
}

async function detectPracticeTag() {
  if (state.actionBusy || !state.soloTagTarget || gameExpired() || Date.now() < state.tagCooldownUntil) return;
  if (Math.hypot(state.soloTagTarget.position.x - state.position.x, state.soloTagTarget.position.z - state.position.z) >= 0.78) return;
  state.actionBusy = true;
  state.tagCooldownUntil = Date.now() + 700;
  try {
    const target = `practice-pal-${state.soloTagHits % SOLO_TAG_SPOTS.length}`;
    await postGameEvent("tag", { targetUid: target, targetName: "Practice Pal" });
    state.soloTagHits += 1;
    placePracticeTagTarget();
    showToast(`Tag ${state.soloTagHits}`);
  } catch (error) {
    state.error = friendlyError(error);
  } finally {
    state.actionBusy = false;
  }
}

async function detectTag() {
  if (state.actionBusy || gameExpired() || state.currentGame?.game !== "tag" || Date.now() < state.tagCooldownUntil) return;
  if (state.currentGame.practice) return detectPracticeTag();
  if (currentItUid() !== state.session?.uid) return;
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

function showSoloResult(game, amount, before) {
  window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "win" } }));
  state.soloResult = { game: game.game, amount, before, after: before + amount };
  document.querySelector(".solo-result-backdrop")?.remove();
  const backdrop = document.createElement("div");
  backdrop.className = "solo-result-backdrop";
  backdrop.innerHTML = `<section class="solo-result" role="dialog" aria-modal="true" aria-labelledby="solo-result-title"><small>Solo practice complete</small><h2 id="solo-result-title">${escapeHtml(GAME_DEFS[game.game].name)}</h2><div class="solo-balance"><span><small>Before</small><b>${before}</b></span><i aria-hidden="true">+</i><span class="solo-payout"><small>Payout</small><b>${amount}</b></span><i aria-hidden="true">=</i><span><small>After</small><b>${before + amount}</b></span></div><p>Your payout is now in your shell balance.</p><div class="solo-result-actions"><button type="button" data-action="solo-done">Back to plaza</button><button type="button" class="multi-primary" data-action="solo-again">Practice another</button></div></section>`;
  backdrop.addEventListener("pointerdown", (event) => { if (event.target === backdrop) backdrop.remove(); });
  backdrop.querySelector("[data-action='solo-done']")?.addEventListener("click", () => backdrop.remove());
  backdrop.querySelector("[data-action='solo-again']")?.addEventListener("click", () => { backdrop.remove(); openPanel("practice"); });
  document.body.appendChild(backdrop);
}

function awardForCurrentGame() {
  const score = scoreFor(state.session.uid);
  const won = winnerUid() === state.session.uid && score > 0;
  const base = state.currentGame.game === "coin" ? 8 : state.currentGame.game === "tag" ? 9 : state.currentGame.game === "floor" ? 12 : 10;
  const each = state.currentGame.game === "coin" ? 2 : state.currentGame.game === "tag" ? 3 : ["connect4", "tictactoe"].includes(state.currentGame.game) ? 12 : 4;
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
    const before = game.practice ? Number(state.soloBalanceBefore ?? readCoinBalance()) : null;
    await postGameEvent("claim", { amount });
    window.dispatchEvent(new CustomEvent("snug-award-coins", { detail: { amount, message: `Round complete · +${amount} shells` } }));
    if (game.practice) {
      teardownPracticeTag();
      setTimeout(() => showSoloResult(game, amount, before), 180);
    }
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
    hud.addEventListener("click", () => openPanel(state.currentGame?.practice ? "practice" : state.currentGame?.game === "quiz" ? "chat" : "rooms"));
    document.body.appendChild(hud);
  }
  const score = scoreFor(state.session?.uid);
  if (gameExpired()) {
    const winner = winnerUid();
    hud.innerHTML = `<span><small>${game.practice ? "Solo practice complete" : "Round complete"}</small><b>${game.practice ? GAME_DEFS[game.game].name : winner === state.session?.uid && score ? "You won" : GAME_DEFS[game.game].name}</b></span><strong>${score} pt</strong>`;
    return;
  }
  let detail = `${score} pt`;
  let note = GAME_DEFS[game.game].note;
  if (game.game === "tag") detail = game.practice ? `${score} tag${score === 1 ? "" : "s"}` : currentItUid() === state.session?.uid ? "YOU’RE IT" : `${score} tag${score === 1 ? "" : "s"}`;
  if (game.game === "quiz") detail = `Q${currentQuizIndex() + 1} · ${score} pt`;
  if (game.game === "floor") detail = state.floorEliminated ? "OUT" : "STILL UP";
  if (["connect4", "tictactoe"].includes(game.game)) {
    const board = validBoardState();
    if (board.winner) detail = board.winner === state.session?.uid ? "YOU WON" : "ROUND WON";
    else if (board.players.length < 2) detail = "WAITING";
    else detail = board.players[board.moves.length % 2] === state.session?.uid ? "YOUR TURN" : "THEIR TURN";
    note = board.winner ? "The board has a winner." : GAME_DEFS[game.game].note;
  }
  hud.innerHTML = `<span><small>${game.practice ? "Solo · " : ""}${GAME_DEFS[game.game].name}</small><b>${game.game === "quiz" ? escapeHtml(quizItem(game, currentQuizIndex()).q) : escapeHtml(note)}</b></span><strong>${secondsLeft()}s · ${detail}</strong>`;
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
  if (game.game === "tag") {
    detectTag();
    if (game.practice) updatePracticeTag();
  }
  if (game.game === "floor") detectFloorDrop();
  if (["floor", "connect4", "tictactoe"].includes(game.game)) updatePartyArena();
  if (gameExpired()) {
    teardownCoins();
    claimReward();
    if (Date.now() > Number(game.createdAt) + Number(game.duration) + 8000) teardownPartyArena();
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
  if (state.pendingInvite) {
    const invite = state.pendingInvite;
    state.pendingInvite = null;
    setTimeout(() => joinPrivateRoom(invite, { arrival: true }), 0);
  }
}

window.addEventListener("snug-session", (event) => attachSession(event.detail));
window.addEventListener("snug-player-move", (event) => {
  state.position = applyPlayerCollision(event.detail || state.position);
  updateNearbyShop();
});
window.addEventListener("snug-world-ready", () => {
  setupVillageShops();
  setupEnvironment();
  updateNearbyShop();
  if (state.currentGame?.game === "coin" && !gameExpired()) setupCoins(state.currentGame);
  if (state.currentGame?.practice && state.currentGame?.game === "tag" && !gameExpired()) setupPracticeTag(state.currentGame);
  if (["floor", "connect4", "tictactoe"].includes(state.currentGame?.game) && !gameExpired()) setupPartyArena(state.currentGame);
});
window.addEventListener("pointerdown", (event) => {
  state.audioUnlocked = true;
  const chatButton = event.target.closest?.("button[aria-label='Open local chat'], .nearby-card button");
  if (!chatButton) return;
  event.preventDefault();
  event.stopPropagation();
  openPanel("chat");
}, true);
window.addEventListener("pagehide", () => {
  if (state.session) {
    request(`presence/${state.roomId}/${state.session.uid}`, { method: "DELETE", keepalive: true }).catch(() => {});
    if (state.voiceEnabled) request(`voicePresence/${state.roomId}/${state.session.uid}`, { method: "DELETE", keepalive: true }).catch(() => {});
  }
  state.localStream?.getTracks().forEach((track) => track.stop());
  closeVoicePeers();
});

function environmentFrame(time) {
  if (!state.lastEnvironmentFrame || time - state.lastEnvironmentFrame >= 100) {
    state.lastEnvironmentFrame = time;
    tickEnvironment(time);
  }
  requestAnimationFrame(environmentFrame);
}
requestAnimationFrame(environmentFrame);

renderDock();
if (window.__snugSession) attachSession(window.__snugSession);

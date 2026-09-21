import * as THREE from "./vendor/three/three.module.js";
import { loadSnugAssetPipeline } from "./snug-asset-pipeline.js";

const WAVE0_CONTRACT = Object.freeze({
  lifecycle: ["lobby", "countdown", "play", "results", "payout"],
  roster: { minimum: 2, maximum: 4, botFill: true, disconnects: "keep-score" },
  input: { movement: "tap-to-move", action: "one context action" },
  state: { scope: "room", schema: ["phase", "players", "scores", "timer"] },
  solo: { required: true, receipt: ["before", "payout", "after"] },
  bots: ["racer", "chaser", "guesser", "collector"],
  achievements: ["participate", "win", "personal-best"],
});

const GAME_DEFS = {
  coin: { name: "Coin Scramble", duration: 30000, note: "Move through the plaza and scoop up the coins.", wave: 0, solo: true, bot: "collector", input: "move", payouts: [24, 16, 10, 6], propFolder: "coin-scramble" },
  tag: { name: "Plaza Tag", duration: 35000, note: "Stay nimble. If you’re it, catch someone.", wave: 0, solo: true, bot: "chaser", input: "move", payouts: [26, 17, 11, 6], propFolder: "plaza-tag" },
  quiz: { name: "Room Quiz", duration: 36000, note: "Answer in room chat. Fastest correct answer scores two.", wave: 0, solo: true, bot: "guesser", input: "action", payouts: [26, 17, 11, 6], propFolder: "room-quiz" },
  balloon: { name: "Balloon Pop", duration: 180000, note: "Tap floating balloons before they drift away.", wave: 1, solo: true, bot: "collector", input: "action", payouts: [28, 18, 12, 7], propFolder: "balloon-pop" },
  sprint: { name: "Plaza Sprint", duration: 240000, note: "Race through every glowing gate in order.", wave: 1, solo: true, bot: "racer", input: "move", payouts: [30, 20, 13, 7], propFolder: "plaza-sprint" },
  fishing: { name: "Pond Fishing", duration: 240000, note: "Cast when the pond ripple reaches the golden ring.", wave: 1, solo: true, bot: "collector", input: "action", payouts: [30, 20, 13, 7], propFolder: "pond-fishing" },
  floor: { name: "Tumble Tiles", duration: 45000, note: "Blinking tiles are about to drop. Stay on the floor until the end.", wave: 2, solo: false, bot: "racer", input: "move", payouts: [28, 18, 12, 7], propFolder: "tumble-tiles" },
  connect4: { name: "Four in a Row", duration: 90000, note: "Tap a column on the 3D board. First to connect four wins.", wave: 3, solo: false, bot: "guesser", input: "action", payouts: [34, 22, 14, 8], propFolder: "four-in-a-row" },
  tictactoe: { name: "Noughts & Crosses", duration: 60000, note: "Tap a square on the 3D board and make a line of three.", wave: 3, solo: false, bot: "guesser", input: "action", payouts: [30, 20, 13, 7], propFolder: "noughts-and-crosses" },
  scavenger: { name: "Village Scavenger Hunt", duration: 45000, note: "Search the whole village for eight glowing keepsakes.", wave: 5, solo: false, bot: "collector", input: "move", payouts: [28, 18, 12, 7], propFolder: "village-scavenger" },
  relay: { name: "Obstacle Relay", duration: 45000, note: "Run the six checkpoints in order before time runs out.", wave: 4, solo: false, bot: "racer", input: "move", payouts: [28, 18, 12, 7], propFolder: "obstacle-relay" },
  potato: { name: "Hot Potato", duration: 300000, note: "Pass the sizzling spud before the timer catches you.", wave: 2, solo: true, bot: "chaser", input: "action", payouts: [34, 22, 14, 8], propFolder: "hot-potato" },
  simon: { name: "Mayor Says", duration: 45000, note: "Match the mayor’s emote pattern in the right order.", wave: 3, solo: false, bot: "guesser", input: "action", payouts: [28, 18, 12, 7], propFolder: "mayor-says" },
  hide: { name: "Hide & Seek", duration: 360000, note: "Pick clever hiding spots, then spot every neighbor.", wave: 2, solo: true, bot: "chaser", input: "action", payouts: [36, 24, 15, 8], propFolder: "hide-and-seek" },
  statues: { name: "Musical Statues", duration: 240000, note: "Dance with the music and freeze when it stops.", wave: 2, solo: true, bot: "racer", input: "action", payouts: [30, 20, 13, 7], propFolder: "musical-statues" },
  memory: { name: "Memory Match", duration: 300000, note: "Turn over tiles and remember where every pair is hiding.", wave: 3, solo: true, bot: "guesser", input: "action", payouts: [34, 22, 14, 8], propFolder: "memory-match" },
  pattern: { name: "Pattern Parade", duration: 240000, note: "Watch the glowing-pad sequence, then repeat it.", wave: 3, solo: true, bot: "guesser", input: "action", payouts: [30, 20, 13, 7], propFolder: "pattern-parade" },
  draw: { name: "Draw & Guess", duration: 360000, note: "Read the sketch and make the fastest correct guess.", wave: 3, solo: true, bot: "guesser", input: "action", payouts: [36, 24, 15, 8], propFolder: "draw-and-guess" },
  cats: { name: "Cat Herding", duration: 300000, note: "Guide every wandering cat safely into the pen.", wave: 4, solo: true, bot: "collector", input: "action", payouts: [34, 22, 14, 8], propFolder: "cat-herding" },
  bridge: { name: "Bridge Builders", duration: 360000, note: "Gather planks and pegs for the Moonlight Footbridge.", wave: 4, solo: true, bot: "collector", input: "action", payouts: [36, 24, 15, 8], propFolder: "bridge-builders" },
  curling: { name: "Coin Curling", duration: 300000, note: "Choose your slide power and stop closest to the center.", wave: 4, solo: true, bot: "racer", input: "action", payouts: [34, 22, 14, 8], propFolder: "coin-curling" },
  charades: { name: "Emote Charades", duration: 300000, note: "Read the emote performance and guess the secret word.", wave: 5, solo: true, bot: "guesser", input: "action", payouts: [34, 22, 14, 8], propFolder: "emote-charades" },
  sneaky: { name: "Sneaky Snug", duration: 420000, note: "Watch the table, catch the bluff, and vote for the sneak.", wave: 5, solo: true, bot: "guesser", input: "action", payouts: [38, 25, 16, 9], propFolder: "sneaky-snug" },
  snap: { name: "Scavenger Snap", duration: 360000, note: "Frame each town sight as it appears on the photo list.", wave: 5, solo: true, bot: "collector", input: "action", payouts: [36, 24, 15, 8], propFolder: "scavenger-snap" },
  puffs: { name: "Dodge Puffs", duration: 240000, note: "Switch lanes and stay clear of every rolling puff.", wave: 6, solo: true, bot: "racer", input: "action", payouts: [30, 20, 13, 7], propFolder: "dodge-puffs" },
  freeze: { name: "Freeze Tag", duration: 300000, note: "Unfreeze teammates while keeping away from the tagger.", wave: 6, solo: true, bot: "chaser", input: "action", payouts: [34, 22, 14, 8], propFolder: "freeze-tag" },
  treasure: { name: "Treasure Dig", duration: 300000, note: "Dig the brightest spots and uncover the most treasure.", wave: 6, solo: true, bot: "collector", input: "action", payouts: [34, 22, 14, 8], propFolder: "treasure-dig" },
  snowball: { name: "Snowball Toss", duration: 240000, note: "Line up a snowball and hit the carnival targets.", wave: 7, solo: true, bot: "racer", input: "action", payouts: [30, 20, 13, 7], propFolder: "snowball-toss" },
  lantern: { name: "Lantern Hunt", duration: 300000, note: "Find the lanterns glowing in the festival-night shadows.", wave: 7, solo: true, bot: "collector", input: "action", payouts: [34, 22, 14, 8], propFolder: "lantern-hunt" },
  petal: { name: "Petal Catch", duration: 240000, note: "Catch golden petals and leave the grey ones drifting.", wave: 7, solo: true, bot: "collector", input: "action", payouts: [30, 20, 13, 7], propFolder: "petal-catch" },
};
function durationPayoutBand(duration) {
  const minutes = Math.max(0.5, Number(duration || 30000) / 60000);
  const first = Math.max(12, Math.round(8 * (minutes + 1)));
  return [first, Math.max(8, Math.round(first * 0.68)), Math.max(6, Math.round(first * 0.48)), Math.max(4, Math.round(first * 0.32))];
}
Object.values(GAME_DEFS).forEach(game => { game.payouts = durationPayoutBand(game.duration); });
const RELEASED_GAME_IDS = Object.keys(GAME_DEFS);
const SOLO_GAME_IDS = RELEASED_GAME_IDS.filter((id) => GAME_DEFS[id].solo);
const MINIGAME_BOTS = Object.freeze([
  { uid: "bot-marigold", name: "Marigold", archetype: "racer" },
  { uid: "bot-basil", name: "Basil", archetype: "collector" },
  { uid: "bot-pip", name: "Pip", archetype: "guesser" },
]);
window.CylindricMinigames = Object.freeze({
  contract: WAVE0_CONTRACT,
  get: (id) => GAME_DEFS[id] ? { id, ...GAME_DEFS[id] } : null,
  list: () => RELEASED_GAME_IDS.map((id) => ({ id, ...GAME_DEFS[id] })),
  snapshot: () => ({
    phase: minigamePhase(),
    players: [...(state.currentGame?.players || [])],
    scores: { ...scores() },
    timer: secondsLeft(),
  }),
});
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
  voiceTuned: false,
  microphoneStream: null,
  voiceTuneGraph: null,
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
  wave1Overlay: null,
  wave1RoundId: "",
  wave1Busy: false,
  challengeOverlay: null,
  challengeRoundId: "",
  challengeBusy: false,
  challengeOpenTiles: [],
  challengeMatched: new Set(),
  challengeSequenceProgress: 0,
  challengeMemoryLocked: false,
  minigameAssetGroup: null,
  minigameAssetRoundId: "",
  personalBests: {},
  roundBalanceBefore: {},
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
    state.messages = Object.entries(messages || {}).map(([id, entry]) => ({ id, ...entry })).filter((entry) => entry?.text && !String(entry.text).startsWith("§TL§")).sort(byCreatedAt).slice(-50);
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
  copyText(`Come join my family room in Selfie Social Society. Open the game, tap Family, and paste this code: ${code}`, "Family invite copied");
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

function makeTunedVoiceStream(inputStream) {
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextCtor || !inputStream) return { stream: inputStream, cleanup: () => {} };
  state.audioContext ||= new AudioContextCtor();
  const context = state.audioContext;
  const source = context.createMediaStreamSource(inputStream);
  const dry = context.createGain();
  const wet = context.createGain();
  const delay = context.createDelay(0.04);
  const modulation = context.createOscillator();
  const depth = context.createGain();
  const compressor = context.createDynamicsCompressor();
  const destination = context.createMediaStreamDestination();
  dry.gain.value = 0.78;
  wet.gain.value = 0.22;
  delay.delayTime.value = 0.012;
  modulation.frequency.value = 5.2;
  depth.gain.value = 0.0015;
  compressor.threshold.value = -20;
  compressor.knee.value = 16;
  compressor.ratio.value = 2.2;
  compressor.attack.value = 0.008;
  compressor.release.value = 0.16;
  source.connect(dry).connect(compressor);
  source.connect(delay).connect(wet).connect(compressor);
  modulation.connect(depth).connect(delay.delayTime);
  compressor.connect(destination);
  modulation.start();
  return {
    stream: destination.stream,
    cleanup: () => {
      try { modulation.stop(); } catch {}
      [source, dry, wet, delay, depth, compressor].forEach((node) => { try { node.disconnect(); } catch {} });
      destination.stream.getTracks().forEach((track) => track.stop());
    },
  };
}

function rebuildOutgoingVoice() {
  if (!state.microphoneStream) return;
  const previousStream = state.localStream;
  state.voiceTuneGraph?.cleanup?.();
  state.voiceTuneGraph = null;
  if (state.voiceTuned) {
    state.voiceTuneGraph = makeTunedVoiceStream(state.microphoneStream);
    state.localStream = state.voiceTuneGraph.stream;
  } else {
    state.localStream = state.microphoneStream;
  }
  const nextTrack = state.localStream.getAudioTracks()[0];
  state.voicePeers.forEach((record) => {
    const sender = record.pc.getSenders().find((candidate) => candidate.track?.kind === "audio");
    if (sender && nextTrack) sender.replaceTrack(nextTrack).catch(() => {});
  });
  removeVoiceMonitor(state.session?.uid);
  attachVoiceMonitor(state.session?.uid, state.localStream);
  if (previousStream && previousStream !== state.microphoneStream && previousStream !== state.localStream) previousStream.getTracks().forEach((track) => track.stop());
}

function setVoiceTune(enabled) {
  state.voiceTuned = Boolean(enabled);
  if (state.voiceEnabled) rebuildOutgoingVoice();
  showToast(state.voiceTuned ? "Light voice tune is on" : "Voice tune is off");
  window.dispatchEvent(new CustomEvent("snug-voice-tune-state", { detail: { enabled: state.voiceTuned } }));
  renderPanel();
}

window.__snugVoiceTune = {
  get enabled() { return state.voiceTuned; },
  set: setVoiceTune,
};
window.addEventListener("snug-voice-tune-request", (event) => setVoiceTune(event.detail?.enabled));

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
    state.microphoneStream = stream;
    state.localStream = stream;
    if (state.voiceTuned) rebuildOutgoingVoice();
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
  state.voiceTuneGraph?.cleanup?.();
  state.voiceTuneGraph = null;
  state.microphoneStream?.getTracks().forEach((track) => track.stop());
  if (state.localStream && state.localStream !== state.microphoneStream) state.localStream.getTracks().forEach((track) => track.stop());
  state.microphoneStream = null;
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
  return `<div class="voice-row"><span><b>${state.isPrivate ? "Family voice chat" : "Room voice chat"}</b><small>${escapeHtml(detail)}</small></span><button type="button" class="${state.voiceEnabled ? "leave" : ""}" data-action="voice" ${state.voiceBusy || !state.session ? "disabled" : ""}>${state.voiceBusy ? "Starting…" : state.voiceEnabled ? "Leave" : "Join voice"}</button></div><div class="voice-row voice-tune-row"><span><b>Light voice tune</b><small>Optional musical polish for your microphone. ${state.voiceTuned ? "Your outgoing voice is tuned." : "Your natural voice is unchanged."}</small></span><button type="button" role="switch" aria-checked="${state.voiceTuned}" class="${state.voiceTuned ? "" : "leave"}" data-action="voice-tune">${state.voiceTuned ? "Tune on" : "Off"}</button></div>${state.voiceError ? `<div class="voice-error" role="status">${escapeHtml(state.voiceError)}</div>` : ""}`;
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
  $("[data-action='voice-tune']", panel)?.addEventListener("click", () => setVoiceTune(!state.voiceTuned));
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

function minigameRoster({ solo = false } = {}) {
  const humanIds = [state.session?.uid, ...state.players.map((player) => player.uid)].filter(Boolean);
  const unique = [...new Set(humanIds)].slice(0, WAVE0_CONTRACT.roster.maximum);
  if (solo) return unique.slice(0, 1);
  const target = WAVE0_CONTRACT.roster.maximum;
  while (unique.length < target) unique.push(MINIGAME_BOTS[unique.length - 1]?.uid || `bot-neighbor-${unique.length}`);
  return unique;
}

function minigamePhase(game = state.currentGame) {
  if (!game) return "lobby";
  const elapsed = Date.now() - Number(game.createdAt || 0);
  if (elapsed < 3000) return "countdown";
  if (elapsed < Number(game.duration || GAME_DEFS[game.game]?.duration || 30000)) return "play";
  return roundEvents("claim").length ? "payout" : "results";
}

function gamePlayerName(uid) {
  if (uid === state.session?.uid) return playerName();
  return state.players.find((player) => player.uid === uid)?.name || MINIGAME_BOTS.find((bot) => bot.uid === uid)?.name || "Neighbor";
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
    const practiceNotes = {
      coin: "Move through the plaza and collect as many coins as you can.",
      tag: "Chase the glowing practice pal. Each tag sends it to a new spot.",
      balloon: "Tap balloons as they drift over Cyclical City.",
      sprint: "Tap through every glowing gate in order.",
      fishing: "Watch the ripple and cast inside the golden timing window.",
      potato: "Pass the sizzling potato before the beat runs out.",
      hide: "Search the hiding places and catch every peek.",
      statues: "Freeze the instant the music stops.",
      memory: "Turn two tiles at a time and clear every pair.",
      pattern: "Repeat the glowing color sequence in order.",
      draw: "Study each sketch and pick the matching word.",
      cats: "Tap wandering cats to guide them into the pen.",
      bridge: "Gather the requested planks and pegs for the bridge.",
      curling: "Release each coin with just the right amount of power.",
      charades: "Match the emote performance to its secret word.",
      sneaky: "Watch the suspects and vote for the neighbor who pocketed the shells.",
      snap: "Frame the requested Cyclical City sight.",
      puffs: "Choose the open lane before the puffs roll through.",
      freeze: "Tap frozen teammates to bring them back into play.",
      treasure: "Dig the brightest patch until the treasure pops out.",
      snowball: "Tap the carnival target to land each snowball.",
      lantern: "Find the lanterns hiding in the night scene.",
      petal: "Catch gold petals and let grey petals fall.",
    };
    return `<div class="practice-live"><span class="practice-status"><small>${minigamePhase(game) === "countdown" ? "Get ready" : `Live solo round · ${secondsLeft()}s`}</small><b>${GAME_DEFS[game.game].name}</b></span><p>${practiceNotes[game.game] || GAME_DEFS[game.game].note}</p><strong>${score} point${score === 1 ? "" : "s"}</strong><button type="button" class="multi-primary" data-action="close-practice">Back to the plaza</button></div>`;
  }
  const cards = SOLO_GAME_IDS.map((id) => {
    const gameDef = GAME_DEFS[id];
    const marks = { coin: "coin-mark", tag: "tag-mark", quiz: "quiz-mark", balloon: "balloon-mark", sprint: "sprint-mark", fishing: "fishing-mark" };
    const symbols = { quiz: "?", balloon: "○", sprint: "›", fishing: "⌁", potato: "●", hide: "◉", statues: "Ⅱ", memory: "◇", pattern: "···", draw: "⌁", cats: "△", bridge: "▰", curling: "◎", charades: "!", sneaky: "?", snap: "□", puffs: "○", freeze: "✣", treasure: "×", snowball: "●", lantern: "◌", petal: "✦" };
    const descriptions = { coin: "Collect plaza coins", tag: "Chase a lively practice pal", quiz: "Three questions, four choices", balloon: "Pop drifting targets", sprint: "Race eight plaza gates", fishing: "Time six pond casts", potato: "Pass before the beat", hide: "Find the hidden neighbor", statues: "Freeze on the silence", memory: "Clear matching pairs", pattern: "Repeat the color sequence", draw: "Guess the sketch", cats: "Guide cats to the pen", bridge: "Gather planks and pegs", curling: "Land near the center", charades: "Guess the emote", sneaky: "Catch the bluff", snap: "Frame the town sight", puffs: "Choose the open lane", freeze: "Free frozen teammates", treasure: "Dig glowing spots", snowball: "Hit festival targets", lantern: "Find night lanterns", petal: "Catch only gold" };
    return `<button type="button" data-solo-game="${id}"><span class="practice-mark ${marks[id] || ""}" aria-hidden="true">${symbols[id] || ""}</span><span><b>${escapeHtml(gameDef.name)}</b><small>${descriptions[id]}</small></span><strong>${gameDef.duration >= 60000 ? `${Math.round(gameDef.duration / 60000)} min` : `${Math.round(gameDef.duration / 1000)}s`}</strong></button>`;
  }).join("");
  return `<p class="practice-intro">Pick from the complete seven-wave slate. Every game runs a full solo round and ends with a before + payout = after receipt.</p><div class="practice-grid">${cards}</div><p class="practice-foot">All 24 blueprint games are ready for Solo Practice. The room dice and Snug Board can call the same shared minigame framework.</p>`;
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
  if (!SOLO_GAME_IDS.includes(game) || state.rolling || state.busy || !state.session) return;
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
      players: minigameRoster({ solo: true }),
    };
    const result = await request(`minigames/${state.roomId}/events`, { method: "POST", body: JSON.stringify(start) });
    const id = result?.name || `local-${start.createdAt}`;
    state.soloRoundId = id;
    state.minigameEvents.push({ id, ...start });
    deriveCurrentGame();
    window.dispatchEvent(new CustomEvent("snug-minigame-achievement", { detail: { game, phase: "participate", solo: true } }));
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
  if (!state.currentGame?.practice || state.currentGame.game !== "quiz" || gameExpired() || minigamePhase() !== "play") return;
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
    const games = RELEASED_GAME_IDS;
    const game = games[randomIndex(games.length)];
    const participants = minigameRoster();
    const humanParticipants = participants.filter((uid) => !uid.startsWith("bot-"));
    const seed = crypto.getRandomValues(new Uint32Array(1))[0];
    const itUid = humanParticipants[seed % Math.max(1, humanParticipants.length)] || state.session.uid;
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
    window.dispatchEvent(new CustomEvent("snug-minigame-achievement", { detail: { game, phase: "participate", solo: false } }));
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
    teardownWave1Overlay();
    teardownChallengeOverlay();
    teardownMinigameAssets();
    document.querySelector(".simon-controls")?.remove();
    renderShopEntrance();
    return;
  }
  const changed = state.currentGame?.id !== start.id;
  state.currentGame = { ...start, practice: start.id === state.soloRoundId };
  if (changed) {
    state.tagCooldownUntil = 0;
    if (state.roundBalanceBefore[start.id] == null) state.roundBalanceBefore[start.id] = readCoinBalance();
    if (start.game === "coin") setupCoins(state.currentGame);
    else teardownCoins();
    if (state.currentGame.practice && start.game === "tag") setupPracticeTag(state.currentGame);
    else teardownPracticeTag();
    setupPartyArena(state.currentGame);
    setupWave1Overlay(state.currentGame);
    setupChallengeOverlay(state.currentGame);
    mountMinigameAssets(state.currentGame);
    renderShopEntrance();
  } else if (start.game === "coin") updateCoinVisibility();
  else if (state.currentGame.practice && start.game === "tag") updatePracticeTag();
  else if (["balloon", "fishing"].includes(start.game)) updateWave1Overlay();
  else if (BLUEPRINT_CHALLENGE_GAMES.has(start.game)) renderChallengeOverlay();
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
  } else if (state.currentGame.game === "scavenger") {
    const found = new Set();
    roundEvents("scavenge").forEach((event) => {
      const key = Number(event.item);
      if (found.has(key)) return;
      found.add(key);
      result[event.uid] = (result[event.uid] || 0) + 1;
    });
  } else if (state.currentGame.game === "relay") {
    roundEvents("relay-checkpoint").forEach((event) => { result[event.uid] = Math.max(result[event.uid] || 0, Number(event.item) + 1); });
  } else if (state.currentGame.game === "potato" && !state.currentGame.practice) {
    const holder = currentPotatoUid();
    (state.currentGame.players || []).forEach((uid) => { result[uid] = uid === holder ? 0 : 1; });
  } else if (state.currentGame.game === "simon") {
    const sequence = simonSequence(state.currentGame);
    (state.currentGame.players || []).forEach((uid) => {
      const attempts = roundEvents("simon-step").filter((event) => event.uid === uid);
      let score = 0;
      for (const event of attempts) {
        if (Number(event.item) !== score || String(event.emote) !== sequence[score]) break;
        score += 1;
      }
      result[uid] = score;
    });
  } else if (state.currentGame.game === "balloon") {
    const popped = new Set();
    roundEvents("balloon-pop").forEach((event) => {
      const item = Number(event.item);
      if (popped.has(item)) return;
      popped.add(item);
      result[event.uid] = (result[event.uid] || 0) + 1;
    });
  } else if (state.currentGame.game === "sprint") {
    roundEvents("sprint-checkpoint").forEach((event) => { result[event.uid] = Math.max(result[event.uid] || 0, Number(event.item) + 1); });
  } else if (state.currentGame.game === "fishing") {
    const catches = new Set();
    roundEvents("fishing-catch").forEach((event) => {
      const key = `${event.uid}:${Number(event.item)}`;
      if (catches.has(key)) return;
      catches.add(key);
      result[event.uid] = (result[event.uid] || 0) + 1;
    });
  } else if (BLUEPRINT_CHALLENGE_GAMES.has(state.currentGame.game)) {
    const scored = new Set();
    roundEvents("challenge-point").forEach((event) => {
      const key = `${event.uid}:${Number(event.item)}`;
      if (scored.has(key)) return;
      scored.add(key);
      result[event.uid] = (result[event.uid] || 0) + 1;
    });
  }
  const elapsedSeconds = Math.max(0, (Date.now() - Number(state.currentGame.createdAt || 0)) / 1000);
  const fixedOutcomeGames = new Set(["floor", "connect4", "tictactoe", "potato"]);
  const scoreCeilings = {
    coin: 12, tag: 9, quiz: 6, balloon: 18, sprint: 8, fishing: 6, scavenger: 8, relay: 6, simon: 12,
    hide: 8, statues: 10, memory: 6, pattern: 8, draw: 6, cats: 12, bridge: 12, curling: 7,
    charades: 6, sneaky: 6, snap: 8, puffs: 10, freeze: 10, treasure: 12, snowball: 10, lantern: 10, petal: 12,
  };
  (state.currentGame.players || []).filter((uid) => String(uid).startsWith("bot-")).forEach((uid, index) => {
    if (fixedOutcomeGames.has(state.currentGame.game)) return;
    const ceiling = scoreCeilings[state.currentGame.game] || 6;
    const durationSeconds = Math.max(20, Number(state.currentGame.duration || GAME_DEFS[state.currentGame.game]?.duration || 30000) / 1000);
    const bot = MINIGAME_BOTS.find((entry) => entry.uid === uid);
    const roleMatch = bot?.archetype === GAME_DEFS[state.currentGame.game]?.bot;
    const pace = Math.max(2.4, (durationSeconds - 8) / ceiling * (roleMatch ? 0.86 : 1.04 + index * 0.04));
    const wobble = (Number(state.currentGame.seed || 1) + index * 7) % 5;
    result[uid] = Math.min(ceiling, Math.max(result[uid] || 0, Math.floor(Math.max(0, elapsedSeconds - wobble) / pace)));
  });
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

function currentPotatoUid() {
  let uid = state.currentGame?.itUid || "";
  roundEvents("potato-pass").forEach((event) => { uid = event.targetUid || uid; });
  return uid;
}

const SIMON_EMOTES = ["wave", "clap", "spin", "cheer"];
function simonSequence(game) {
  const order = seededOrder(12, Number(game?.seed || 1));
  return order.map((value) => SIMON_EMOTES[value % SIMON_EMOTES.length]);
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
  if (state.currentGame?.game !== "quiz" || gameExpired() || minigamePhase() !== "play") return;
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
  return Array.from({ length: 16 }, () => ({ x: -13.5 + next() * 27, z: -12 + next() * 24 }));
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
  [-7.5, -2.4], [7.4, 1.1], [-4.2, 8.2], [5.8, -8.1], [0.6, 6.4], [-6.8, -6.5], [9.2, 6.1], [1.4, -4.7],
  [-12.2, 3.6], [12.6, -2.8], [-3.5, 12.4], [4.8, -12.2],
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

function wave1Elapsed(game = state.currentGame) {
  return Math.max(0, Date.now() - Number(game?.createdAt || 0) - 3000);
}

function balloonLayout(seed, count = 18) {
  let value = (Number(seed) || 1) >>> 0;
  const next = () => {
    value = Math.imul(value ^ (value >>> 15), 2246822519) >>> 0;
    return value / 4294967296;
  };
  return Array.from({ length: count }, (_, item) => ({ item, x: 8 + next() * 84, y: 10 + next() * 72, hue: Math.floor(next() * 5) }));
}

async function submitBalloonPop(item) {
  if (state.wave1Busy || state.currentGame?.game !== "balloon" || minigamePhase() !== "play") return;
  const claimed = new Set(roundEvents("balloon-pop").map((event) => Number(event.item)));
  if (claimed.has(Number(item))) return;
  state.wave1Busy = true;
  try {
    await postGameEvent("balloon-pop", { item: Number(item) });
    window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "coin-pickup" } }));
    updateWave1Overlay();
  } catch (error) { showToast(friendlyError(error)); }
  finally { state.wave1Busy = false; }
}

async function submitFishingCast() {
  if (state.wave1Busy || state.currentGame?.game !== "fishing" || minigamePhase() !== "play") return;
  const elapsed = wave1Elapsed();
  const item = Math.floor(elapsed / 38000);
  const phase = (elapsed % 38000) / 38000;
  if (item > 5) return showToast("The pond is resting until results");
  if (phase < .42) return showToast("Too early — wait for the golden ring");
  if (phase > .68) return showToast("Too late — the fish slipped away");
  if (roundEvents("fishing-catch").some((event) => event.uid === state.session?.uid && Number(event.item) === item)) return showToast("That ripple is quiet now");
  state.wave1Busy = true;
  try {
    await postGameEvent("fishing-catch", { item });
    window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "coin-pickup" } }));
    showToast("Fish landed");
    updateWave1Overlay();
  } catch (error) { showToast(friendlyError(error)); }
  finally { state.wave1Busy = false; }
}

const BLUEPRINT_CHALLENGE_GAMES = new Set(["potato", "hide", "statues", "memory", "pattern", "draw", "cats", "bridge", "curling", "charades", "sneaky", "snap", "puffs", "freeze", "treasure", "snowball", "lantern", "petal"]);
const CHALLENGE_CHOICES = {
  draw: [
    { clue: "house", options: ["House", "Cat", "Tree", "Fish"] },
    { clue: "fish", options: ["Balloon", "Fish", "Hat", "Bridge"] },
    { clue: "tree", options: ["Lantern", "Tree", "Coin", "Pond"] },
    { clue: "cat", options: ["Gate", "Cat", "Flower", "Cloud"] },
  ],
  charades: [
    { clue: "wave · point · wave", answer: "Hello", options: ["Hello", "Sleep", "Fishing", "Cold"] },
    { clue: "shiver · hug arms", answer: "Cold", options: ["Dance", "Cold", "Dig", "Laugh"] },
    { clue: "cast · reel · cheer", answer: "Fishing", options: ["Running", "Fishing", "Hiding", "Building"] },
    { clue: "tiptoe · peek · hush", answer: "Sneaking", options: ["Sneaking", "Singing", "Freezing", "Waving"] },
  ],
  sneaky: [
    { clue: "Marigold looked away. Basil jingled. Pip guarded the empty cup.", answer: "Basil", options: ["Marigold", "Basil", "Pip"] },
    { clue: "Pip changed seats. Marigold counted the pot. Basil never moved.", answer: "Pip", options: ["Marigold", "Basil", "Pip"] },
    { clue: "Basil sneezed. Pip watched the door. Marigold hid both hands.", answer: "Marigold", options: ["Marigold", "Basil", "Pip"] },
  ],
  snap: [
    { clue: "Pond ripples", answer: "Pond", options: ["Pond", "Gate", "Market", "Garden"] },
    { clue: "Moonlight Footbridge", answer: "Bridge", options: ["Town hall", "Bridge", "Cottage", "Pavilion"] },
    { clue: "Open town gate", answer: "Gate", options: ["Garden", "Pond", "Gate", "Market"] },
    { clue: "Community garden", answer: "Garden", options: ["Garden", "Bridge", "Cottage", "Town hall"] },
  ],
};
const CHALLENGE_LABELS = {
  potato: ["Marigold", "Basil", "Pip"], hide: ["Barrel", "Hedge", "Bench", "Gate", "Tree", "Stall"],
  statues: ["DANCE", "FREEZE"], cats: ["CAT", "CAT", "CAT", "CAT", "CAT", "CAT"],
  bridge: ["PLANK", "PEG", "PLANK", "PEG", "PLANK", "PEG"], puffs: ["LEFT", "MIDDLE", "RIGHT"],
  freeze: ["TEAMMATE", "TEAMMATE", "TAGGER", "TEAMMATE", "TAGGER", "TEAMMATE"], treasure: ["DIG", "DIG", "DIG", "DIG", "DIG", "DIG"],
  snowball: ["10", "25", "50", "25", "10", "50"], lantern: ["LANTERN", "SHADOW", "LANTERN", "SHADOW", "LANTERN", "SHADOW"],
  petal: ["GOLD", "GREY", "GOLD", "GREY", "GOLD", "GREY"],
};

function challengeSeed(offset = 0) {
  return (Number(state.currentGame?.seed || 1) + scoreFor(state.session?.uid) * 17 + offset * 31) >>> 0;
}

function challengeTargetIndex(count, offset = 0) {
  return challengeSeed(offset) % Math.max(1, count);
}

function challengePrompt(game) {
  const score = scoreFor(state.session?.uid);
  const prompts = {
    potato: "Pass the glowing potato",
    hide: "A neighbor is peeking",
    statues: score % 2 ? "The music stopped" : "The band is playing",
    cats: "Guide the wandering cat",
    bridge: score % 2 ? "The bridge needs a peg" : "The bridge needs a plank",
    puffs: "Move into the open lane",
    freeze: "Free a frozen teammate",
    treasure: "The brightest patch is ready",
    snowball: "Hit the highest-value target",
    lantern: "Find a real lantern",
    petal: "Catch a golden petal",
  };
  return prompts[game] || GAME_DEFS[game]?.note || "Make your move";
}

function choiceChallengeMarkup(game) {
  const list = CHALLENGE_CHOICES[game] || [];
  const puzzle = list[challengeTargetIndex(list.length)] || list[0];
  if (!puzzle) return "";
  const clue = game === "draw" ? `<canvas class="challenge-sketch" width="260" height="112" data-sketch="${puzzle.clue}" aria-label="A neighbor's sketch"></canvas>` : `<div class="challenge-clue">${escapeHtml(puzzle.clue)}</div>`;
  return `${clue}<div class="challenge-choices">${puzzle.options.map((option) => `<button type="button" data-challenge-target data-correct="${String(option === (puzzle.answer || puzzle.clue))}">${escapeHtml(option)}</button>`).join("")}</div>`;
}

function drawChallengeSketch(canvas) {
  if (!canvas) return;
  const context = canvas.getContext("2d");
  const clue = canvas.dataset.sketch;
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue("--text") || "#26383b";
  context.lineWidth = 6;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.beginPath();
  if (clue === "house") { context.moveTo(65, 58); context.lineTo(130, 14); context.lineTo(195, 58); context.lineTo(184, 58); context.lineTo(184, 102); context.lineTo(76, 102); context.lineTo(76, 58); context.closePath(); context.moveTo(116, 102); context.lineTo(116, 69); context.lineTo(144, 69); context.lineTo(144, 102); }
  if (clue === "fish") { context.ellipse(125, 56, 62, 34, 0, 0, Math.PI * 2); context.moveTo(63, 56); context.lineTo(28, 26); context.lineTo(28, 86); context.closePath(); context.moveTo(161, 46); context.arc(162, 46, 2, 0, Math.PI * 2); }
  if (clue === "tree") { context.moveTo(130, 102); context.lineTo(130, 58); context.moveTo(103, 102); context.lineTo(157, 102); context.moveTo(130, 64); context.arc(130, 43, 34, .3, Math.PI * 2 + .3); }
  if (clue === "cat") { context.arc(130, 59, 38, 0, Math.PI * 2); context.moveTo(101, 35); context.lineTo(99, 10); context.lineTo(119, 26); context.moveTo(141, 26); context.lineTo(161, 10); context.lineTo(159, 35); context.moveTo(116, 60); context.arc(116, 60, 2, 0, Math.PI * 2); context.moveTo(144, 60); context.arc(144, 60, 2, 0, Math.PI * 2); context.moveTo(123, 76); context.quadraticCurveTo(130, 82, 137, 76); }
  context.stroke();
}

function memoryChallengeMarkup() {
  const symbols = ["SUN", "CAT", "COIN", "HAT", "FISH", "GATE"];
  const order = [...symbols, ...symbols];
  let seed = challengeSeed(41) || 1;
  for (let index = order.length - 1; index > 0; index -= 1) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const swapIndex = seed % (index + 1);
    [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
  }
  return `<div class="challenge-memory">${order.map((symbol, index) => `<button type="button" data-memory-tile="${index}" data-pair="${symbol}" aria-label="Hidden tile ${index + 1}"><span>${symbol}</span></button>`).join("")}</div>`;
}

function sequenceChallengeMarkup() {
  const colors = ["CORAL", "GOLD", "TEAL", "BLUE"];
  const length = 3 + Math.min(3, scoreFor(state.session?.uid) % 4);
  const sequence = Array.from({ length }, (_, index) => colors[challengeTargetIndex(colors.length, index)]);
  return `<div class="challenge-sequence" data-sequence="${sequence.join(",")}"><div class="challenge-sequence-cue">${sequence.map((color) => `<i data-color="${color.toLowerCase()}">${color.slice(0, 1)}</i>`).join("")}</div><div class="challenge-pads">${colors.map((color) => `<button type="button" data-sequence-pad="${color}" data-color="${color.toLowerCase()}" aria-label="${color} pad"></button>`).join("")}</div></div>`;
}

function targetChallengeMarkup(game) {
  const labels = CHALLENGE_LABELS[game] || ["ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX"];
  const target = challengeTargetIndex(labels.length);
  const requested = game === "bridge" ? (scoreFor(state.session?.uid) % 2 ? "PEG" : "PLANK") : "";
  const correctIndex = game === "bridge" ? labels.findIndex((label, index) => label === requested && index >= target % 2) : game === "statues" ? (scoreFor(state.session?.uid) % 2 ? 1 : 0) : game === "puffs" ? target % 3 : game === "freeze" ? labels.findIndex((label, index) => label === "TEAMMATE" && index >= target % 2) : game === "snowball" ? labels.findIndex((label) => label === "50") : game === "lantern" ? labels.findIndex((label, index) => label === "LANTERN" && index >= target % 2) : game === "petal" ? labels.findIndex((label, index) => label === "GOLD" && index >= target % 2) : target;
  return `<div class="challenge-targets ${game}">${labels.map((label, index) => `<button type="button" data-challenge-target data-correct="${String(index === correctIndex)}" aria-label="${escapeHtml(label.toLowerCase())}"><span>${escapeHtml(label)}</span></button>`).join("")}</div>`;
}

function challengeStageMarkup(game) {
  if (game === "memory") return memoryChallengeMarkup();
  if (game === "pattern") return sequenceChallengeMarkup();
  if (["draw", "charades", "sneaky", "snap"].includes(game)) return choiceChallengeMarkup(game);
  if (game === "curling") return `<div class="challenge-curling"><div class="curling-rings"><i></i></div><label><span>Slide power</span><input type="range" min="0" max="100" value="32" aria-label="Coin slide power"></label><button type="button" data-curl-release>Release coin</button><small>Land between 45 and 65</small></div>`;
  return targetChallengeMarkup(game);
}

function setupChallengeOverlay(game) {
  if (!BLUEPRINT_CHALLENGE_GAMES.has(game?.game) || (game.game === "potato" && !game.practice)) { teardownChallengeOverlay(); return; }
  if (state.challengeRoundId === game.id && state.challengeOverlay) return;
  teardownChallengeOverlay();
  state.challengeRoundId = game.id;
  state.challengeOpenTiles = [];
  state.challengeMatched = new Set();
  state.challengeSequenceProgress = 0;
  state.challengeMemoryLocked = false;
  const overlay = document.createElement("section");
  overlay.className = `challenge-overlay ${game.game}`;
  overlay.dataset.game = game.game;
  overlay.setAttribute("aria-label", `${GAME_DEFS[game.game].name} play area`);
  overlay.innerHTML = `<div class="challenge-countdown" aria-live="polite"></div><div class="challenge-card"><header><span>Wave ${Math.min(7, GAME_DEFS[game.game].wave)}</span><b>${escapeHtml(GAME_DEFS[game.game].name)}</b><strong>0 pt</strong></header><p>${escapeHtml(challengePrompt(game.game))}</p><div class="challenge-stage"></div><div class="challenge-status" aria-live="polite">Ready</div></div>`;
  overlay.addEventListener("click", handleChallengeClick);
  document.body.appendChild(overlay);
  state.challengeOverlay = overlay;
  renderChallengeOverlay();
}

function teardownChallengeOverlay() {
  state.challengeOverlay?.remove();
  state.challengeOverlay = null;
  state.challengeRoundId = "";
  state.challengeBusy = false;
  state.challengeOpenTiles = [];
  state.challengeMatched = new Set();
  state.challengeSequenceProgress = 0;
  state.challengeMemoryLocked = false;
}

function renderChallengeOverlay() {
  const overlay = state.challengeOverlay;
  const game = state.currentGame;
  if (!overlay || !game || overlay.dataset.game !== game.game) return;
  const phase = minigamePhase(game);
  const countdown = overlay.querySelector(".challenge-countdown");
  const left = Math.max(0, Math.ceil((3000 - (Date.now() - Number(game.createdAt))) / 1000));
  if (countdown) { countdown.textContent = phase === "countdown" ? String(Math.max(1, left)) : ""; countdown.hidden = phase !== "countdown"; }
  overlay.classList.toggle("is-playing", phase === "play");
  const score = scoreFor(state.session?.uid);
  const scoreNode = overlay.querySelector("header strong");
  if (scoreNode) scoreNode.textContent = `${score} pt`;
  const prompt = overlay.querySelector(".challenge-card>p");
  if (prompt) prompt.textContent = challengePrompt(game.game);
  const stage = overlay.querySelector(".challenge-stage");
  if (stage && stage.dataset.step !== String(score)) {
    stage.dataset.step = String(score);
    stage.innerHTML = challengeStageMarkup(game.game);
    drawChallengeSketch(stage.querySelector(".challenge-sketch"));
  }
}

async function submitChallengePoint() {
  if (state.challengeBusy || minigamePhase() !== "play" || gameExpired()) return;
  state.challengeBusy = true;
  const status = state.challengeOverlay?.querySelector(".challenge-status");
  try {
    const item = Math.min(99, scoreFor(state.session?.uid));
    await postGameEvent("challenge-point", { item });
    if (status) status.textContent = "Point scored";
    window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "coin-pickup" } }));
    renderChallengeOverlay();
  } catch (error) {
    if (status) status.textContent = friendlyError(error);
  } finally {
    state.challengeBusy = false;
  }
}

function handleChallengeClick(event) {
  if (minigamePhase() !== "play") return;
  const game = state.currentGame?.game;
  const status = state.challengeOverlay?.querySelector(".challenge-status");
  const tile = event.target.closest("[data-memory-tile]");
  if (tile && game === "memory") {
    if (state.challengeMemoryLocked) return;
    const index = Number(tile.dataset.memoryTile);
    if (state.challengeMatched.has(index) || state.challengeOpenTiles.includes(index)) return;
    tile.classList.add("is-open");
    state.challengeOpenTiles.push(index);
    if (state.challengeOpenTiles.length === 2) {
      state.challengeMemoryLocked = true;
      const [first, second] = state.challengeOpenTiles.map((item) => state.challengeOverlay.querySelector(`[data-memory-tile='${item}']`));
      if (first?.dataset.pair === second?.dataset.pair) {
        state.challengeOpenTiles.forEach((item) => state.challengeMatched.add(item));
        state.challengeOpenTiles = [];
        first.classList.add("is-matched"); second.classList.add("is-matched");
        submitChallengePoint().finally(() => { state.challengeMemoryLocked = false; });
      } else {
        if (status) status.textContent = "Try another pair";
        setTimeout(() => {
          first?.classList.remove("is-open");
          second?.classList.remove("is-open");
          state.challengeOpenTiles = [];
          state.challengeMemoryLocked = false;
        }, 520);
      }
    }
    return;
  }
  const pad = event.target.closest("[data-sequence-pad]");
  if (pad && game === "pattern") {
    const sequence = state.challengeOverlay.querySelector(".challenge-sequence")?.dataset.sequence?.split(",") || [];
    const wanted = sequence[state.challengeSequenceProgress];
    if (pad.dataset.sequencePad === wanted) {
      state.challengeSequenceProgress += 1;
      if (state.challengeSequenceProgress >= sequence.length) { state.challengeSequenceProgress = 0; submitChallengePoint(); }
      else if (status) status.textContent = `${state.challengeSequenceProgress}/${sequence.length}`;
    } else {
      state.challengeSequenceProgress = 0;
      if (status) status.textContent = "Sequence reset";
    }
    return;
  }
  const release = event.target.closest("[data-curl-release]");
  if (release && game === "curling") {
    const power = Number(state.challengeOverlay.querySelector(".challenge-curling input")?.value || 0);
    if (power >= 45 && power <= 65) submitChallengePoint();
    else if (status) status.textContent = power < 45 ? "A little more power" : "Ease off the slide";
    return;
  }
  const target = event.target.closest("[data-challenge-target]");
  if (!target) return;
  if (target.dataset.correct === "true") submitChallengePoint();
  else if (status) status.textContent = game === "petal" ? "Grey petal — let it drift" : "Try another";
}

function teardownMinigameAssets() {
  if (state.minigameAssetGroup) {
    state.minigameAssetGroup.parent?.remove(state.minigameAssetGroup);
    disposeObject(state.minigameAssetGroup);
  }
  state.minigameAssetGroup = null;
  state.minigameAssetRoundId = "";
}

async function mountMinigameAssets(game) {
  teardownMinigameAssets();
  const world = window.__snugWorld;
  const folder = GAME_DEFS[game?.game]?.propFolder;
  if (!world?.scene || world.mode !== "village" || !folder) return;
  const roundId = game.id;
  try {
    const pipeline = await loadSnugAssetPipeline();
    const loaded = await pipeline.loadMinigameProps(folder);
    if (!loaded.length || state.currentGame?.id !== roundId || window.__snugWorld !== world) return;
    const group = new THREE.Group();
    group.name = `snug-${game.game}-custom-props`;
    const anchors = game.game === "sprint"
      ? (state.partyArena?.points || [])
      : game.game === "fishing"
        ? [[4.2, -3.8], [5.3, -2.9], [3.2, -2.7]]
        : [[-5, -1], [0, -4], [5, 1], [0, 5]];
    const count = game.game === "sprint" ? anchors.length : loaded.length;
    for (let index = 0; index < count; index += 1) {
      const prop = loaded[index % loaded.length].scene.clone(true);
      const bounds = new THREE.Box3().setFromObject(prop);
      const size = bounds.getSize(new THREE.Vector3());
      const maxSize = Math.max(size.x, size.y, size.z, .001);
      const scale = (game.game === "sprint" ? 1.4 : 1.1) / maxSize;
      prop.scale.multiplyScalar(scale);
      const center = bounds.getCenter(new THREE.Vector3());
      prop.position.set(-center.x * scale, -bounds.min.y * scale, -center.z * scale);
      const holder = new THREE.Group();
      const [x, z] = anchors[index % Math.max(1, anchors.length)] || [0, 0];
      holder.position.set(x, 0, z);
      holder.add(prop);
      group.add(holder);
    }
    world.scene.add(group);
    state.minigameAssetGroup = group;
    state.minigameAssetRoundId = roundId;
  } catch {
    // Primitive gameplay props remain active when a custom GLB cannot load.
  }
}

function setupWave1Overlay(game) {
  if (!["balloon", "fishing", "sprint"].includes(game?.game)) { teardownWave1Overlay(); return; }
  if (state.wave1RoundId === game.id && state.wave1Overlay) return;
  teardownWave1Overlay();
  const overlay = document.createElement("section");
  overlay.className = `wave1-overlay ${game.game}`;
  overlay.dataset.game = game.game;
  overlay.setAttribute("aria-label", `${GAME_DEFS[game.game].name} play area`);
  if (game.game === "balloon") {
    const colors = ["coral", "gold", "teal", "blue", "rose"];
    overlay.innerHTML = `<div class="wave1-countdown" aria-live="polite"></div><div class="balloon-field">${balloonLayout(game.seed).map((balloon) => `<button type="button" class="mini-balloon ${colors[balloon.hue]}" data-balloon="${balloon.item}" style="--balloon-x:${balloon.x}%;--balloon-y:${balloon.y}%;--balloon-delay:${(balloon.item % 6) * -.31}s" aria-label="Pop balloon ${balloon.item + 1}"><i></i></button>`).join("")}</div>`;
    overlay.addEventListener("click", (event) => { const button = event.target.closest("[data-balloon]"); if (button) submitBalloonPop(button.dataset.balloon); });
  } else if (game.game === "fishing") {
    overlay.innerHTML = `<div class="wave1-countdown" aria-live="polite"></div><div class="fishing-action"><span class="pond-ripple" aria-hidden="true"><i></i></span><span><small>Watch the ripple</small><b>Cast in the golden ring</b></span><button type="button" data-fishing-cast>Cast</button></div>`;
    overlay.querySelector("[data-fishing-cast]")?.addEventListener("click", submitFishingCast);
  } else {
    overlay.innerHTML = `<div class="wave1-countdown" aria-live="polite"></div><div class="sprint-action"><span><small>Next gate</small><b>Gate 1 of 8</b></span><strong>Tap the ground to run</strong></div>`;
  }
  document.body.appendChild(overlay);
  state.wave1Overlay = overlay;
  state.wave1RoundId = game.id;
  updateWave1Overlay();
}

function updateWave1Overlay() {
  const overlay = state.wave1Overlay;
  const game = state.currentGame;
  if (!overlay || !game || overlay.dataset.game !== game.game) return;
  const phase = minigamePhase(game);
  const countdown = overlay.querySelector(".wave1-countdown");
  if (countdown) {
    const left = Math.max(0, Math.ceil((3000 - (Date.now() - Number(game.createdAt))) / 1000));
    countdown.textContent = phase === "countdown" ? (left ? String(left) : "GO") : "";
    countdown.hidden = phase !== "countdown";
  }
  overlay.classList.toggle("is-counting", phase === "countdown");
  if (game.game === "balloon") {
    const claimed = new Set(roundEvents("balloon-pop").map((event) => Number(event.item)));
    const available = [...overlay.querySelectorAll("[data-balloon]")].filter((button) => !claimed.has(Number(button.dataset.balloon))).slice(0, 7);
    overlay.querySelectorAll("[data-balloon]").forEach((button) => { button.hidden = !available.includes(button) || phase !== "play"; });
  } else if (game.game === "fishing") {
    const elapsed = wave1Elapsed(game);
    const item = Math.floor(elapsed / 38000);
    const timing = (elapsed % 38000) / 38000;
    const ready = phase === "play" && item <= 5 && timing >= .42 && timing <= .68;
    overlay.classList.toggle("is-ready", ready);
    const button = overlay.querySelector("[data-fishing-cast]");
    if (button) { button.disabled = phase !== "play" || item > 5; button.textContent = item > 5 ? "Done" : ready ? "CAST!" : "Cast"; }
  } else if (game.game === "sprint") {
    const score = scoreFor(state.session?.uid);
    const label = overlay.querySelector(".sprint-action b");
    if (label) label.textContent = score >= 8 ? "Course complete" : `Gate ${score + 1} of 8`;
  }
}

function teardownWave1Overlay() {
  state.wave1Overlay?.remove();
  state.wave1Overlay = null;
  state.wave1RoundId = "";
  state.wave1Busy = false;
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
    { id: "salon", name: "Curl & Comb", sign: "SALON", note: "Hairstyles and headwear", x: -17.5, z: -7.5, rotation: Math.PI / 2, wall: 0xf1c9cf, trim: 0xb85f70, signColor: "#a94f63" },
    { id: "mall", name: "Pocket Mall", sign: "MALL", note: "Accessories and outfits", x: 17.5, z: -7.5, rotation: -Math.PI / 2, wall: 0xc7dfea, trim: 0x4e8194, signColor: "#42788b" },
    { id: "furniture", name: "Hearth & Home", sign: "HOME", note: "Furniture, rugs, and wallpaper", x: -17.5, z: 8.2, rotation: Math.PI / 2, wall: 0xe7d2a5, trim: 0x9a704a, signColor: "#845d3d" },
    { id: "garden", name: "Green Nook", sign: "GARDEN", note: "Plants and outdoor decorations", x: 17.5, z: 8.2, rotation: -Math.PI / 2, wall: 0xc9dfb5, trim: 0x5f8555, signColor: "#527747" },
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
  addBird(0xd67c55, 9.2, 0.4);
  addBird(0x5f88a7, 15.1, 1.8);
  addCat({ name: "OrangeTabby", base: 0xd9873b, stripes: 0x9b4f23 }, 8.8, 2.9);
  addCat({ name: "Grey", base: 0x777b80 }, 13.6, 4.1);
  addCat({ name: "BlackAndWhite", base: 0x292929, whiteChest: true, patches: [0xf4f0e8] }, 6.7, 0.9);
  addCat({ name: "Tortoiseshell", base: 0x3d2b27, patches: [0xcf7839, 0xd9ad62, 0x171515] }, 17.25, 5.5);
  addCat({ name: "WhiteLonghair", base: 0xf4f2eb, fluffy: true }, 11.35, 3.8);
  addCat({ name: "BlackLonghair", base: 0x202329, fluffy: true, whiteChest: true }, 19.05, 1.4);
  addCat({ name: "Calico", base: 0xf4eee1, patches: [0xd77a38, 0x302b29, 0xd77a38] }, 7.95, 4.65);
  addCat({ name: "BrownTabby", base: 0x8a715a, stripes: 0x4d3b31, whiteChest: true }, 15.9, 6.0);
  addBunny(0xd8d1c6, 12.45, 5.25);
  return { group, creatures };
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep01(value) {
  const amount = clamp01(value);
  return amount * amount * (3 - 2 * amount);
}

function makeSkyDome() {
  const material = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    depthTest: false,
    fog: false,
    uniforms: {
      topColor: { value: new THREE.Color(0x78bdd8) },
      horizonColor: { value: new THREE.Color(0xd8edf0) },
      lowerColor: { value: new THREE.Color(0xa6d6df) },
    },
    vertexShader: `
      varying float vSkyHeight;
      void main() {
        vSkyHeight = normalize(position).y;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 horizonColor;
      uniform vec3 lowerColor;
      varying float vSkyHeight;
      void main() {
        float upper = smoothstep(0.0, 0.78, max(vSkyHeight, 0.0));
        float lower = smoothstep(0.0, 0.7, max(-vSkyHeight, 0.0));
        vec3 color = mix(horizonColor, topColor, upper);
        color = mix(color, lowerColor, lower);
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  });
  const dome = new THREE.Mesh(new THREE.SphereGeometry(150, 40, 24), material);
  dome.name = "SnugGradientSky";
  dome.frustumCulled = false;
  dome.renderOrder = -1000;
  return dome;
}

function makeRainbow() {
  const group = new THREE.Group();
  group.name = "SnugAfterRainRainbow";
  const colors = [0xf46b62, 0xf6a64b, 0xf5d65d, 0x71bf78, 0x64a9dc, 0x8874cb, 0xb86fb2];
  colors.forEach((color, index) => {
    const radius = 21.5 - index * 0.72;
    const arc = new THREE.Mesh(
      new THREE.TorusGeometry(radius, 0.34, 14, 128, Math.PI),
      new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide, toneMapped: false })
    );
    arc.renderOrder = -20 + index;
    group.add(arc);
  });
  group.visible = false;
  return group;
}

function makeShootingStarTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 64;
  const context = canvas.getContext("2d");
  const trail = context.createLinearGradient(0, 0, canvas.width, 0);
  trail.addColorStop(0, "rgba(255,255,255,0)");
  trail.addColorStop(0.72, "rgba(225,240,255,.34)");
  trail.addColorStop(0.94, "rgba(255,252,222,.92)");
  trail.addColorStop(1, "rgba(255,255,255,1)");
  context.fillStyle = trail;
  context.fillRect(0, 22, canvas.width, 20);
  const head = context.createRadialGradient(492, 32, 0, 492, 32, 20);
  head.addColorStop(0, "rgba(255,255,255,1)");
  head.addColorStop(0.35, "rgba(255,246,203,.95)");
  head.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = head;
  context.fillRect(470, 10, 42, 44);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeShootingStars() {
  const texture = makeShootingStarTexture();
  return Array.from({ length: 3 }, (_, index) => {
    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending, toneMapped: false, rotation: -0.18 - index * 0.05 });
    const sprite = new THREE.Sprite(material);
    sprite.name = `SnugShootingStar_${index + 1}`;
    sprite.scale.set(6.2, 0.62, 1);
    sprite.visible = false;
    sprite.userData.active = false;
    sprite.raycast = () => {};
    return sprite;
  });
}

function ensureLensFlareOverlay() {
  let overlay = document.getElementById("snug-lens-flare");
  if (overlay) return overlay;
  if (!document.getElementById("snug-lens-flare-style")) {
    const style = document.createElement("style");
    style.id = "snug-lens-flare-style";
    style.textContent = `
      #snug-lens-flare{position:absolute;z-index:3;inset:0;overflow:hidden;pointer-events:none;opacity:0;mix-blend-mode:screen;transition:opacity .18s linear}
      #snug-lens-flare span{position:absolute;display:block;border-radius:50%;transform:translate(-50%,-50%);will-change:left,top,opacity}
      #snug-lens-flare .flare-core{width:clamp(64px,12vw,132px);aspect-ratio:1;background:radial-gradient(circle,rgba(255,255,238,.98) 0 4%,rgba(255,224,130,.52) 22%,rgba(255,190,92,.16) 48%,transparent 72%);filter:blur(.5px)}
      #snug-lens-flare .flare-ghost{width:var(--flare-size);aspect-ratio:1;border:1px solid rgba(255,245,196,.17);background:radial-gradient(circle,rgba(255,244,198,.2),rgba(244,130,93,.09) 42%,transparent 70%)}
      #snug-lens-flare .flare-streak{width:clamp(90px,18vw,220px);height:2px;background:linear-gradient(90deg,transparent,rgba(255,241,191,.42),transparent);transform:translate(-50%,-50%) rotate(-16deg)}
      @media(prefers-reduced-motion:reduce){#snug-lens-flare{transition:none}#snug-lens-flare .flare-ghost,#snug-lens-flare .flare-streak{display:none}}
    `;
    document.head.appendChild(style);
  }
  overlay = document.createElement("div");
  overlay.id = "snug-lens-flare";
  overlay.setAttribute("aria-hidden", "true");
  overlay.innerHTML = `<span class="flare-core"></span><span class="flare-ghost" data-factor="0.62" style="--flare-size:52px"></span><span class="flare-ghost" data-factor="0.18" style="--flare-size:24px"></span><span class="flare-ghost" data-factor="-0.34" style="--flare-size:78px"></span><span class="flare-streak"></span>`;
  (document.querySelector(".app-shell") || document.body).appendChild(overlay);
  return overlay;
}

function updateSkyGradient(env, phase, stormMix, elapsed) {
  if (!env.skyDome || !window.__snugWorld?.camera) return;
  env.skyDome.position.copy(window.__snugWorld.camera.position);
  const sunHeight = Math.sin((phase.dayFraction - 0.25) * Math.PI * 2);
  const twilight = smoothstep01(1 - Math.abs(sunHeight) / 0.44) * (1 - stormMix * 0.82);
  const daylight = smoothstep01(phase.daylight);
  const targetTop = env.colors.skyTopTarget.copy(env.colors.nightSkyTop).lerp(env.colors.daySkyTop, daylight).lerp(env.colors.twilightTop, twilight);
  const targetHorizon = env.colors.skyHorizonTarget.copy(env.colors.nightHorizon).lerp(env.colors.dayHorizon, daylight).lerp(env.colors.twilightHorizon, twilight);
  const targetLower = env.colors.skyLowerTarget.copy(env.colors.nightSky).lerp(env.colors.daySky, daylight).lerp(env.colors.twilightLower, twilight * 0.86);
  targetTop.lerp(env.colors.stormSky, stormMix);
  targetHorizon.lerp(env.colors.stormHorizon, stormMix);
  targetLower.lerp(env.colors.stormSky, stormMix);
  const fade = 1 - Math.exp(-elapsed / 14);
  env.skyDome.material.uniforms.topColor.value.lerp(targetTop, fade);
  env.skyDome.material.uniforms.horizonColor.value.lerp(targetHorizon, fade);
  env.skyDome.material.uniforms.lowerColor.value.lerp(targetLower, fade);
}

function updateRainbow(env, phase, now, elapsed) {
  if (!env.rainbow) return;
  const clearedFromRain = env.lastWeather === "Rain" && phase.weather === "Clear";
  if (clearedFromRain && !phase.isNight) env.rainbowUntil = now + 18000;
  env.lastWeather = phase.weather;
  const clearDay = phase.weather === "Clear" && !phase.isNight && phase.daylight > 0.18;
  if (!clearDay) env.rainbowUntil = 0;
  const target = clearDay && now < env.rainbowUntil ? 1 : 0;
  env.rainbowOpacity += (target - env.rainbowOpacity) * (1 - Math.exp(-elapsed / (target ? 3.5 : 4.8)));
  env.rainbow.visible = env.rainbowOpacity > 0.008;
  env.rainbow.children.forEach((arc, index) => { arc.material.opacity = env.rainbowOpacity * (0.58 - index * 0.025); });
  if (!env.rainbow.visible) return;
  const skyPosition = env.effectScratch.rainbowTarget.set(env.sun.position.x, 0, env.sun.position.z);
  if (skyPosition.lengthSq() < 0.001) skyPosition.set(0, 0, -1);
  skyPosition.normalize().multiplyScalar(-72);
  skyPosition.y = 15;
  env.rainbow.position.copy(skyPosition);
  env.rainbow.rotation.y = Math.atan2(-skyPosition.x, -skyPosition.z);
}

function spawnShootingStar(env, time) {
  const sprite = env.shootingStars.find((item) => !item.userData.active);
  const camera = window.__snugWorld?.camera;
  if (!sprite || !camera) return;
  const forward = env.effectScratch.forward;
  const right = env.effectScratch.right;
  const up = env.effectScratch.up;
  camera.getWorldDirection(forward).normalize();
  right.crossVectors(forward, camera.up).normalize();
  up.crossVectors(right, forward).normalize();
  const start = sprite.userData.start ||= new THREE.Vector3();
  const velocity = sprite.userData.velocity ||= new THREE.Vector3();
  start.copy(camera.position).addScaledVector(forward, 54).addScaledVector(right, (Math.random() - 0.5) * 28).addScaledVector(up, 7 + Math.random() * 13);
  velocity.copy(right).multiplyScalar(8 + Math.random() * 5).addScaledVector(up, -2.1 - Math.random() * 2.2);
  sprite.position.copy(start);
  sprite.userData.active = true;
  sprite.userData.startedAt = time;
  sprite.userData.duration = 900 + Math.random() * 650;
  sprite.visible = true;
}

function updateShootingStars(env, time) {
  if (!env.latestPhase || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
    env.shootingStars?.forEach((sprite) => { sprite.visible = false; sprite.userData.active = false; });
    return;
  }
  if (!env.latestPhase.isNight) {
    env.shootingStars.forEach((sprite) => { sprite.visible = false; sprite.userData.active = false; });
    env.nextShootingStarAt = Math.max(env.nextShootingStarAt || 0, time + 5500);
    return;
  }
  if (time >= env.nextShootingStarAt) {
    spawnShootingStar(env, time);
    env.nextShootingStarAt = time + 11000 + Math.random() * 17000;
  }
  env.shootingStars.forEach((sprite) => {
    if (!sprite.userData.active) return;
    const progress = (time - sprite.userData.startedAt) / sprite.userData.duration;
    if (progress >= 1) {
      sprite.userData.active = false;
      sprite.visible = false;
      return;
    }
    sprite.position.copy(sprite.userData.start).addScaledVector(sprite.userData.velocity, progress);
    sprite.material.opacity = Math.sin(progress * Math.PI) * Math.min(1, (1 - env.latestPhase.daylight) * 1.8);
  });
}

function updateLensFlare(env) {
  const world = window.__snugWorld;
  const overlay = env.lensFlare;
  if (!overlay || !world?.camera || !world?.renderer || !env.latestPhase) return;
  const camera = world.camera;
  const sunWorld = env.effectScratch.sunWorld;
  const projected = env.effectScratch.projected;
  const cameraDirection = env.effectScratch.cameraDirection;
  const toSun = env.effectScratch.toSun;
  env.sun.getWorldPosition(sunWorld);
  camera.getWorldDirection(cameraDirection);
  toSun.copy(sunWorld).sub(camera.position);
  const facing = cameraDirection.dot(toSun.normalize());
  projected.copy(sunWorld).project(camera);
  const inside = facing > 0 && projected.z > -1 && projected.z < 1 && Math.abs(projected.x) < 1.15 && Math.abs(projected.y) < 1.15;
  const edgeFade = clamp01(1 - Math.max(Math.abs(projected.x), Math.abs(projected.y)) / 1.15);
  const altitudeFade = smoothstep01((env.sun.position.y + 2) / 12);
  const stormFade = 1 - (env.latestStormMix || 0) * 0.9;
  const opacity = inside && env.sun.visible ? edgeFade * altitudeFade * stormFade * 0.92 : 0;
  overlay.style.opacity = String(opacity);
  if (opacity <= 0.004) return;
  const canvasRect = world.renderer.domElement.getBoundingClientRect();
  const overlayRect = overlay.getBoundingClientRect();
  const sunX = canvasRect.left - overlayRect.left + (projected.x * 0.5 + 0.5) * canvasRect.width;
  const sunY = canvasRect.top - overlayRect.top + (-projected.y * 0.5 + 0.5) * canvasRect.height;
  const centerX = canvasRect.left - overlayRect.left + canvasRect.width * 0.5;
  const centerY = canvasRect.top - overlayRect.top + canvasRect.height * 0.5;
  const core = overlay.querySelector(".flare-core");
  const streak = overlay.querySelector(".flare-streak");
  [core, streak].forEach((node) => { node.style.left = `${sunX}px`; node.style.top = `${sunY}px`; });
  overlay.querySelectorAll(".flare-ghost").forEach((node) => {
    const factor = Number(node.dataset.factor || 0);
    node.style.left = `${centerX + (sunX - centerX) * factor}px`;
    node.style.top = `${centerY + (sunY - centerY) * factor}px`;
    node.style.opacity = String(clamp01(opacity * (0.65 + Math.abs(factor) * 0.25)));
  });
}

function tickCelestialEffects(time) {
  const env = state.environment;
  if (!env || window.__snugWorld?.mode !== "village") {
    if (env?.lensFlare) env.lensFlare.style.opacity = "0";
    return;
  }
  updateShootingStars(env, time);
  updateLensFlare(env);
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
  const sun = new THREE.Mesh(new THREE.SphereGeometry(0.78, 48, 32), new THREE.MeshBasicMaterial({ color: 0xffd66f, toneMapped: false }));
  sun.name = "SnugRoundSun";
  const moon = new THREE.Mesh(new THREE.SphereGeometry(0.55, 24, 18), new THREE.MeshBasicMaterial({ color: 0xd9e5ff, toneMapped: false }));
  const skyDome = makeSkyDome();
  const rainbow = makeRainbow();
  const shootingStars = makeShootingStars();
  group.add(skyDome, sun, moon, rainbow, ...shootingStars);
  // The walkable village remains level, while this shaded sphere continues below
  // its edge so the town reads as a tiny, rounded world from the title camera.
  const globeRadius = 53;
  const globeJoinRadius = 52;
  const globeJoinOffset = Math.sqrt(globeRadius * globeRadius - globeJoinRadius * globeJoinRadius);
  const globeThetaStart = Math.acos(globeJoinOffset / globeRadius);
  const globe = new THREE.Mesh(
    new THREE.SphereGeometry(globeRadius, 64, 40, 0, Math.PI * 2, globeThetaStart, Math.PI - globeThetaStart),
    new THREE.MeshStandardMaterial({ color: 0x4f8f82, roughness: 0.98, metalness: 0 })
  );
  globe.name = "SnugPlanetGlobe";
  globe.position.y = -0.47 - globeJoinOffset;
  globe.receiveShadow = true;
  group.add(globe);
  const starGeometry = new THREE.BufferGeometry();
  const starPositions = [];
  for (let index = 0; index < 180; index += 1) {
    const angle = seeded(index * 31.7 + 4.2) * Math.PI * 2;
    const radius = 28 + seeded(index * 17.9) * 34;
    starPositions.push(Math.cos(angle) * radius, 14 + seeded(index * 8.4) * 18, Math.sin(angle) * radius);
  }
  starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starPositions, 3));
  const stars = new THREE.Points(starGeometry, new THREE.PointsMaterial({ color: 0xf6f3d0, size: 0.09, transparent: true, opacity: 0 }));
  group.add(stars);
  const clouds = [];
  const cloudPuffGeometry = new THREE.SphereGeometry(1, 10, 7);
  for (let index = 0; index < 24; index += 1) {
    const cloud = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1, transparent: true, opacity: 0.82 });
    const lobeCount = 3 + Math.floor(seeded(index * 7.31 + 2.4) * 4);
    const overall = 0.66 + seeded(index * 4.17 + 8.2) * 0.64;
    for (let lobe = 0; lobe < lobeCount; lobe += 1) {
      const center = (lobeCount - 1) / 2;
      const size = (0.36 + seeded(index * 17.3 + lobe * 3.7) * 0.34) * overall;
      const puff = new THREE.Mesh(cloudPuffGeometry, material);
      puff.position.set((lobe - center) * overall * (0.34 + seeded(lobe * 5.9 + index) * 0.18), (seeded(index * 13.2 + lobe) - 0.35) * overall * 0.34, (seeded(index * 3.4 + lobe * 9.1) - 0.5) * overall * 0.42);
      puff.scale.set(size * (1.05 + seeded(index + lobe * 2.1) * 0.35), size * (0.68 + seeded(index * 2.2 + lobe) * 0.26), size * (0.72 + seeded(index * 6.8 + lobe) * 0.3));
      cloud.add(puff);
    }
    const angle = index / 24 * Math.PI * 2 + (seeded(index * 9.7) - 0.5) * 0.42;
    const radius = 22 + seeded(index * 11.2 + 1) * 31;
    cloud.position.set(Math.cos(angle) * radius, 10.5 + seeded(index * 5.3 + 4) * 8.5, Math.sin(angle) * radius);
    cloud.rotation.y = -angle + (seeded(index * 3.9) - 0.5) * 0.6;
    cloud.userData = { angle, radius, baseY: cloud.position.y, speed: 0.006 + seeded(index * 7.6 + 3) * 0.007, bob: seeded(index * 6.1 + 9) * Math.PI * 2 };
    group.add(cloud);
    clouds.push(cloud);
  }
  const weatherCount = 720;
  const weatherGeometry = new THREE.BufferGeometry();
  const weatherPositions = new Float32Array(weatherCount * 3);
  const weatherData = { baseX: new Float32Array(weatherCount), baseZ: new Float32Array(weatherCount), speed: new Float32Array(weatherCount), phase: new Float32Array(weatherCount) };
  for (let i = 0; i < weatherCount; i += 1) {
    const x = (seeded(i * 4.73) - 0.5) * 92;
    const z = (seeded(i * 2.41 + 2) - 0.5) * 88;
    weatherPositions[i * 3] = weatherData.baseX[i] = x;
    weatherPositions[i * 3 + 1] = -1.4 + seeded(i * 8.17) * 11;
    weatherPositions[i * 3 + 2] = weatherData.baseZ[i] = z;
    weatherData.speed[i] = 0.76 + seeded(i * 12.43 + 7) * 0.42;
    weatherData.phase[i] = seeded(i * 6.77 + 5) * Math.PI * 2;
  }
  weatherGeometry.setAttribute("position", new THREE.BufferAttribute(weatherPositions, 3));
  const weather = new THREE.Points(weatherGeometry, new THREE.PointsMaterial({ color: 0xaed4e9, size: 0.045, transparent: true, opacity: 0, depthWrite: false, sizeAttenuation: true }));
  weather.name = "SnugWeatherParticles";
  group.add(weather);
  const snowCover = new THREE.Mesh(
    new THREE.CircleGeometry(52, 96),
    new THREE.MeshStandardMaterial({ color: 0xf4f8f7, roughness: 1, transparent: true, opacity: 0, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1 })
  );
  snowCover.name = "SnugSnowCover";
  snowCover.rotation.x = -Math.PI / 2;
  snowCover.position.y = 0.036;
  snowCover.renderOrder = 1;
  group.add(snowCover);
  const wildlife = makeWildlife();
  group.add(wildlife.group);
  world.scene.add(group);
  const ambient = [];
  let terrain = null;
  world.scene.traverse((node) => {
    if (node.isAmbientLight || node.isHemisphereLight || node.isDirectionalLight) ambient.push({ node, base: node.intensity });
    const geometry = node.geometry?.parameters;
    if (!terrain && node.isMesh && geometry?.radiusTop >= 8 && geometry?.height <= 1) terrain = node;
  });
  const terrainBaseColor = terrain?.material?.color?.clone?.() || null;
  const globeBaseColor = globe.material.color.clone();
  const startingPhase = environmentPhase();
  state.environment = {
    group, skyDome, sun, moon, stars, shootingStars, rainbow, clouds, weather, weatherData, snowCover, terrain, terrainBaseColor, globe, globeBaseColor,
    wildlife: wildlife.creatures, lights: ambient, lastLightning: 0, lightningUntil: 0,
    displayWeather: startingPhase.weather === "Clear" ? "Rain" : startingPhase.weather,
    weatherIntensity: 0, snowAccumulation: 0, lastTickTime: performance.now(),
    lastWeather: startingPhase.weather, rainbowUntil: 0, rainbowOpacity: 0,
    nextShootingStarAt: performance.now() + 7000 + Math.random() * 9000,
    lensFlare: ensureLensFlareOverlay(), latestPhase: startingPhase, latestStormMix: 0,
    effectScratch: {
      forward: new THREE.Vector3(), right: new THREE.Vector3(), up: new THREE.Vector3(), rainbowTarget: new THREE.Vector3(),
      sunWorld: new THREE.Vector3(), projected: new THREE.Vector3(), cameraDirection: new THREE.Vector3(), toSun: new THREE.Vector3()
    },
    colors: {
      daySky: new THREE.Color(0x9fd3df), nightSky: new THREE.Color(0x17273f), stormSky: new THREE.Color(0x65757c), stormHorizon: new THREE.Color(0x89959a),
      daySkyTop: new THREE.Color(0x74bdd8), dayHorizon: new THREE.Color(0xdaf0ed),
      nightSkyTop: new THREE.Color(0x101a36), nightHorizon: new THREE.Color(0x2e405d),
      twilightTop: new THREE.Color(0xc777a0), twilightHorizon: new THREE.Color(0xff9b62), twilightLower: new THREE.Color(0xf0a277),
      clearCloud: new THREE.Color(0xffffff), stormCloud: new THREE.Color(0x79878a),
      snowGround: new THREE.Color(0xf4f8f7), snow: new THREE.Color(0xffffff), rain: new THREE.Color(0x87bbd5),
      skyTarget: new THREE.Color(), cloudTarget: new THREE.Color(), skyTopTarget: new THREE.Color(), skyHorizonTarget: new THREE.Color(), skyLowerTarget: new THREE.Color()
    }
  };
  state.environmentWorld = world;
  const player = world.player?.position;
  if (player) state.lastSafePosition = { x: player.x, y: player.y, z: player.z };
}

function environmentPhase(now = Date.now()) {
  // One complete in-game day lasts an unhurried two real-world hours.
  const dayFraction = (now % 7200000) / 7200000;
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
  if (document.documentElement.classList.contains("snug-photo-mode")) return;
  const now = Date.now();
  const phase = environmentPhase(now);
  env.latestPhase = phase;
  const elapsed = Math.max(0, Math.min(0.1, (time - env.lastTickTime) / 1000));
  env.lastTickTime = time;
  const targetWeatherIntensity = phase.weather === "Clear" ? 0 : 1;
  const weatherFadeSeconds = targetWeatherIntensity > env.weatherIntensity ? 10 : 8;
  env.weatherIntensity += (targetWeatherIntensity - env.weatherIntensity) * (1 - Math.exp(-elapsed / weatherFadeSeconds));
  if (targetWeatherIntensity === 0 && env.weatherIntensity < 0.025) env.weatherIntensity = 0;
  if (phase.weather !== "Clear" && env.targetWeather !== phase.weather) env.displayWeather = phase.weather;
  if (phase.weather === "Clear" && env.weatherIntensity === 0) env.displayWeather = "Clear";
  env.targetWeather = phase.weather;
  const snowTarget = phase.weather === "Snow" ? 1 : 0;
  const snowRate = snowTarget > env.snowAccumulation ? elapsed / 18 : elapsed / 22;
  env.snowAccumulation = THREE.MathUtils.clamp(env.snowAccumulation + Math.sign(snowTarget - env.snowAccumulation) * Math.min(Math.abs(snowTarget - env.snowAccumulation), snowRate), 0, 1);
  const angle = phase.dayFraction * Math.PI * 2 - Math.PI;
  env.sun.position.set(Math.cos(angle) * 38, Math.sin(angle) * 24 + 17, -28);
  env.moon.position.set(-env.sun.position.x, 34 - env.sun.position.y, 28);
  env.sun.visible = !phase.isNight;
  env.moon.visible = phase.isNight;
  env.stars.material.opacity = phase.isNight ? Math.min(0.9, (1 - phase.daylight) * 1.3) : 0;
  env.lights.forEach(({ node, base }) => { node.intensity = base * (0.28 + phase.daylight * 0.72); });
  const stormMix = phase.weather === "Thunderstorm" ? env.weatherIntensity : 0;
  env.latestStormMix = stormMix;
  const sunHeight = Math.sin((phase.dayFraction - 0.25) * Math.PI * 2);
  const twilightMix = smoothstep01(1 - Math.abs(sunHeight) / 0.44) * (1 - stormMix * 0.82);
  const sky = env.colors.skyTarget.copy(phase.isNight ? env.colors.nightSky : env.colors.daySky).lerp(env.colors.twilightLower, twilightMix * 0.52).lerp(env.colors.stormSky, stormMix);
  const skyFade = 1 - Math.exp(-elapsed / 10);
  window.__snugWorld.scene.background?.lerp?.(sky, skyFade);
  if (window.__snugWorld.scene.fog?.color) window.__snugWorld.scene.fog.color.lerp(sky, skyFade);
  updateSkyGradient(env, phase, stormMix, elapsed);
  updateRainbow(env, phase, now, elapsed);
  const cloudTarget = env.colors.cloudTarget.copy(env.colors.clearCloud).lerp(env.colors.stormCloud, stormMix);
  const cloudOpacityTarget = 0.72 + env.weatherIntensity * 0.23;
  const cloudFade = 1 - Math.exp(-elapsed / 9);
  env.clouds.forEach((cloud, index) => {
    cloud.userData.angle = (cloud.userData.angle + cloud.userData.speed * elapsed) % (Math.PI * 2);
    cloud.position.x = Math.cos(cloud.userData.angle) * cloud.userData.radius;
    cloud.position.z = Math.sin(cloud.userData.angle) * cloud.userData.radius;
    cloud.position.y = cloud.userData.baseY + Math.sin(time * 0.00018 + cloud.userData.bob) * 0.18;
    cloud.children[0].material.color.lerp(cloudTarget, cloudFade);
    cloud.children[0].material.opacity += (cloudOpacityTarget - cloud.children[0].material.opacity) * cloudFade;
    cloud.rotation.y = -cloud.userData.angle + Math.sin(time * 0.00009 + index) * 0.12;
  });
  if (env.terrainBaseColor && env.terrain?.material?.color) {
    env.terrain.material.color.copy(env.terrainBaseColor).lerp(env.colors.snowGround, env.snowAccumulation * 0.86);
  }
  if (env.globeBaseColor && env.globe?.material?.color) {
    env.globe.material.color.copy(env.globeBaseColor).lerp(env.colors.snowGround, env.snowAccumulation * 0.48);
  }
  env.snowCover.material.opacity = Math.max(0, env.snowAccumulation - 0.18) / 0.82 * 0.52;
  env.snowCover.visible = env.snowAccumulation > 0.002;
  const particles = env.weather.geometry.attributes.position;
  const falling = env.weatherIntensity > 0.006;
  const visibleWeather = phase.weather !== "Clear" ? phase.weather : env.displayWeather;
  env.weather.visible = falling;
  env.weather.material.opacity = env.weatherIntensity * 0.78;
  env.weather.material.color.lerp(visibleWeather === "Snow" ? env.colors.snow : env.colors.rain, 1 - Math.exp(-elapsed / 4));
  env.weather.material.size += ((visibleWeather === "Snow" ? 0.095 : 0.042) - env.weather.material.size) * (1 - Math.exp(-elapsed / 4));
  if (falling) {
    const isSnow = visibleWeather === "Snow";
    const lower = -1.4;
    const span = 11;
    for (let i = 0; i < particles.count; i += 1) {
      let y = particles.getY(i) - env.weatherData.speed[i] * (isSnow ? 0.92 : 4.15) * elapsed;
      while (y < lower) y += span;
      const phaseOffset = time * (isSnow ? 0.00055 : 0.00018) + env.weatherData.phase[i];
      particles.setY(i, y);
      particles.setX(i, env.weatherData.baseX[i] + Math.sin(phaseOffset) * (isSnow ? 0.42 : 0.1));
      particles.setZ(i, env.weatherData.baseZ[i] + Math.cos(phaseOffset * 0.73) * (isSnow ? 0.28 : 0.06));
    }
    particles.needsUpdate = true;
  }
  env.wildlife.forEach((creature, index) => {
    const t = now * creature.userData.speed + creature.userData.phase;
    creature.position.set(Math.cos(t) * creature.userData.radius, creature.userData.kind === "bird" ? 0.55 + Math.sin(t * 4) * 0.08 : 0, Math.sin(t * 0.88) * creature.userData.radius);
    creature.rotation.y = Math.atan2(-Math.sin(t), Math.cos(t * 0.88));
    if (creature.userData.kind === "bunny") creature.position.y = Math.max(0, Math.sin(t * 5) * 0.08);
  });
  if (phase.weather === "Thunderstorm" && env.weatherIntensity > 0.68 && now - env.lastLightning > 6200) {
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
  if (Math.abs(position.x) > 36.25 || Math.abs(position.z) > 34.25) return true;
  for (const shop of state.shops) {
    const dx = position.x - shop.x;
    const dz = position.z - shop.z;
    const c = Math.cos(-shop.rotation);
    const s = Math.sin(-shop.rotation);
    const localX = dx * c - dz * s;
    const localZ = dx * s + dz * c;
    if (Math.abs(localX) < 1.08 && Math.abs(localZ) < 0.66) return true;
  }
  const fixed = [[-8.35, 7.65, 0.34], [9.15, 8, 0.38], [3.4, -3.35, 0.16], [-3.7, -4.45, 0.22], [8.45, 2.8, 0.28], [-10.55, -5.8, 0.36], [10.65, -4.9, 0.34], [-10.1, 4.75, 0.38], [10.45, 5.85, 0.36], [-3.75, 10.15, 0.32], [5.45, -10.15, 0.36]];
  if (fixed.some(([x, z, radius]) => Math.hypot(position.x - x, position.z - z) < radius)) return true;
  if (state.players.some((player) => Math.hypot(Number(player.x) - position.x, Number(player.z) - position.z) < 0.38)) return true;
  return false;
}

function applyPlayerCollision(next) {
  const world = window.__snugWorld;
  if (!world?.player || !next) return next;
  if (collidesAt(next)) {
    const safe = state.lastSafePosition;
    const slideX = { ...next, z: safe.z };
    const slideZ = { ...next, x: safe.x };
    const resolved = !collidesAt(slideX) ? slideX : !collidesAt(slideZ) ? slideZ : safe;
    world.player.position.set(resolved.x, resolved.y ?? world.player.position.y, resolved.z);
    state.lastSafePosition = { x: Number(resolved.x) || 0, y: Number(resolved.y) || 0, z: Number(resolved.z) || 0 };
    return { ...resolved };
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

function makeCourseArena(game, group) {
  const scavengerSpots = [[-25,-18],[24,-20],[-31,8],[30,15],[-12,27],[10,-29],[0,19],[18,2]];
  const relaySpots = [[0,5],[8,9],[15,2],[10,-8],[-2,-13],[-12,-4]];
  const sprintSpots = [[0,6],[9,8],[16,1],[12,-9],[2,-14],[-10,-10],[-16,0],[-8,8]];
  const points = game.game === "scavenger" ? scavengerSpots : game.game === "sprint" ? sprintSpots : relaySpots;
  const markers = points.map(([x,z], index) => {
    const isScavenger = game.game === "scavenger";
    const material = new THREE.MeshStandardMaterial({ color: isScavenger ? 0xf2c84e : game.game === "sprint" ? 0xe87863 : 0x64b1a4, roughness: .58, emissive: isScavenger ? 0x4c2c00 : game.game === "sprint" ? 0x5a1710 : 0x123c37, emissiveIntensity: .2 });
    const marker = isScavenger
      ? new THREE.Mesh(new THREE.OctahedronGeometry(.32, 0), material)
      : new THREE.Mesh(new THREE.TorusGeometry(game.game === "sprint" ? .7 : .55, .09, 10, 24), material);
    marker.position.set(x, isScavenger ? .62 : .7, z);
    marker.rotation.x = !isScavenger ? Math.PI / 2 : 0;
    marker.userData.item = index;
    group.add(marker);
    return marker;
  });
  return { markers, points, clickTargets: [] };
}

function setupPartyArena(game) {
  if (!["floor", "connect4", "tictactoe", "scavenger", "relay", "sprint"].includes(game?.game)) {
    teardownPartyArena();
    return;
  }
  const world = window.__snugWorld;
  if (!world?.scene || world.mode !== "village") return;
  if (state.arenaRoundId === game.id && state.partyArena) return;
  teardownPartyArena();
  const group = new THREE.Group();
  group.name = `snug-${game.game}-arena`;
  const parts = game.game === "floor" ? makeFloorArena(game, group) : game.game === "connect4" ? makeConnectFourArena(group) : game.game === "tictactoe" ? makeTicTacToeArena(group) : makeCourseArena(game, group);
  world.scene.add(group);
  state.partyArena = { group, type: game.game, ...parts };
  state.arenaRoundId = game.id;
  state.floorEliminated = roundEvents("floor-out").some((event) => event.uid === state.session?.uid);
  if (["connect4", "tictactoe"].includes(game.game)) {
    world.player?.position?.set?.(0, 0, 3.6);
    state.position = { x: 0, z: 6.2, rotation: 0 };
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
  } else if (game.game === "scavenger") {
    const found = new Set(roundEvents("scavenge").map((event) => Number(event.item)));
    arena.markers.forEach((marker) => { marker.visible = !found.has(marker.userData.item); marker.rotation.y += .025; });
  } else if (["relay", "sprint"].includes(game.game)) {
    const eventType = game.game === "sprint" ? "sprint-checkpoint" : "relay-checkpoint";
    const mine = roundEvents(eventType).filter((event) => event.uid === state.session?.uid);
    const next = mine.length;
    arena.markers.forEach((marker) => { marker.visible = marker.userData.item === next; marker.rotation.z += .02; });
    if (game.game === "sprint") updateWave1Overlay();
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

async function detectCourseProgress() {
  const game = state.currentGame;
  const arena = state.partyArena;
  if (state.actionBusy || !arena || gameExpired() || minigamePhase(game) !== "play" || !["scavenger", "relay", "sprint"].includes(game?.game)) return;
  if (game.game === "scavenger") {
    const found = new Set(roundEvents("scavenge").map((event) => Number(event.item)));
    const marker = arena.markers.find((entry) => entry.visible && !found.has(entry.userData.item) && Math.hypot(entry.position.x - state.position.x, entry.position.z - state.position.z) < .8);
    if (!marker) return;
    state.actionBusy = true;
    try { await postGameEvent("scavenge", { item: marker.userData.item }); showToast(`Keepsake found · ${found.size + 1}/8`); updatePartyArena(); }
    catch (error) { state.error = friendlyError(error); }
    finally { state.actionBusy = false; }
  } else {
    const sprinting = game.game === "sprint";
    const eventType = sprinting ? "sprint-checkpoint" : "relay-checkpoint";
    const total = sprinting ? 8 : 6;
    const mine = roundEvents(eventType).filter((event) => event.uid === state.session?.uid);
    const next = mine.length;
    const marker = arena.markers[next];
    if (!marker || Math.hypot(marker.position.x - state.position.x, marker.position.z - state.position.z) >= .95) return;
    state.actionBusy = true;
    try { await postGameEvent(eventType, { item: next }); showToast(next === total - 1 ? `${sprinting ? "Sprint" : "Relay"} finished` : `Gate ${next + 1}/${total}`); updatePartyArena(); }
    catch (error) { state.error = friendlyError(error); }
    finally { state.actionBusy = false; }
  }
}

async function detectPotatoPass() {
  if (state.actionBusy || gameExpired() || state.currentGame?.game !== "potato" || currentPotatoUid() !== state.session?.uid || Date.now() < state.tagCooldownUntil) return;
  const target = state.players.find((player) => Math.hypot(Number(player.x) - state.position.x, Number(player.z) - state.position.z) < .85);
  if (!target) return;
  state.actionBusy = true;
  state.tagCooldownUntil = Date.now() + 1200;
  try {
    await postGameEvent("potato-pass", { targetUid: target.uid, targetName: String(target.name || "Player").slice(0,18) });
    window.dispatchEvent(new CustomEvent("snug-procedural-sfx", { detail: { id: "ball-whoosh" } }));
    setTimeout(() => window.dispatchEvent(new CustomEvent("snug-procedural-sfx", { detail: { id: "ball-catch" } })), 120);
    showToast(`Potato passed to ${target.name || "Player"}`);
  }
  catch (error) { state.error = friendlyError(error); }
  finally { state.actionBusy = false; }
}

async function submitSimonStep(emote) {
  if (state.actionBusy || gameExpired() || state.currentGame?.game !== "simon") return;
  const mine = roundEvents("simon-step").filter((event) => event.uid === state.session?.uid);
  const index = mine.length;
  const expected = simonSequence(state.currentGame)[index];
  if (emote !== expected) return showToast("Not that one — watch the pattern");
  state.actionBusy = true;
  try { await postGameEvent("simon-step", { item: index, emote }); showToast(index === 11 ? "Mayor Says complete" : `${index + 1}/12`); }
  catch (error) { state.error = friendlyError(error); }
  finally { state.actionBusy = false; }
}

function renderSimonControls() {
  let controls = document.querySelector(".simon-controls");
  const game = state.currentGame;
  if (!game || game.game !== "simon" || gameExpired()) { controls?.remove(); return; }
  if (!controls) {
    controls = document.createElement("div");
    controls.className = "simon-controls";
    controls.addEventListener("click", (event) => { const button = event.target.closest("[data-emote]"); if (button) submitSimonStep(button.dataset.emote); });
    document.body.appendChild(controls);
  }
  const score = scoreFor(state.session?.uid);
  const expected = simonSequence(game)[score] || "cheer";
  controls.innerHTML = `<small>Mayor says ${escapeHtml(expected)}</small><div>${SIMON_EMOTES.map((emote) => `<button type="button" data-emote="${emote}">${emote}</button>`).join("")}</div>`;
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
  if (state.actionBusy || gameExpired() || minigamePhase() !== "play" || state.currentGame?.game !== "coin") return;
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
  if (state.actionBusy || gameExpired() || minigamePhase() !== "play" || state.currentGame?.game !== "tag" || Date.now() < state.tagCooldownUntil) return;
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
  state.soloResult = { game: game.game, amount, before, after: before + amount };
  document.querySelector(".solo-result-backdrop")?.remove();
  const backdrop = document.createElement("div");
  backdrop.className = "solo-result-backdrop";
  const solo = game.practice === true;
  const payoutNote = amount > 0 ? "Your payout is now in your shell balance." : "Finish one objective next round to unlock the participation payout.";
  backdrop.innerHTML = `<section class="solo-result" role="dialog" aria-modal="true" aria-labelledby="solo-result-title"><small>${solo ? "Solo practice complete" : "Round payout"}</small><h2 id="solo-result-title">${escapeHtml(GAME_DEFS[game.game].name)}</h2><div class="solo-balance"><span><small>Before</small><b>${before}</b></span><i aria-hidden="true">+</i><span class="solo-payout"><small>Payout</small><b>${amount}</b></span><i aria-hidden="true">=</i><span><small>After</small><b>${before + amount}</b></span></div><p>${payoutNote}</p><div class="solo-result-actions"><button type="button" data-action="solo-done">Back to plaza</button><button type="button" class="multi-primary" data-action="solo-again">${solo ? "Practice another" : "View games"}</button></div></section>`;
  backdrop.addEventListener("pointerdown", (event) => { if (event.target === backdrop) backdrop.remove(); });
  backdrop.querySelector("[data-action='solo-done']")?.addEventListener("click", () => backdrop.remove());
  backdrop.querySelector("[data-action='solo-again']")?.addEventListener("click", () => { backdrop.remove(); openPanel("practice"); });
  document.body.appendChild(backdrop);
}

function awardForCurrentGame() {
  const game = state.currentGame;
  const payouts = GAME_DEFS[game?.game]?.payouts || [24, 16, 10, 6];
  const table = scores();
  const ranked = (game?.players || []).map((uid) => ({ uid, score: Number(table[uid] || 0) })).sort((a, b) => b.score - a.score || String(a.uid).localeCompare(String(b.uid)));
  const placement = Math.max(0, ranked.findIndex((entry) => entry.uid === state.session?.uid));
  const score = scoreFor(state.session?.uid);
  const participationFloor = Math.max(4, Math.min(8, Math.round((game?.duration || 30000) / 30000)));
  return score > 0 ? Number(payouts[Math.min(placement, payouts.length - 1)] || participationFloor) : 0;
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
    const before = Number(state.roundBalanceBefore[game.id] ?? state.soloBalanceBefore ?? readCoinBalance());
    await postGameEvent("claim", { amount });
    window.dispatchEvent(new CustomEvent("snug-award-coins", { detail: { amount, message: `Round complete · +${amount} shells` } }));
    const finalScore = scoreFor(state.session.uid);
    const previousBest = Number(state.personalBests[game.game] || 0);
    state.personalBests[game.game] = Math.max(previousBest, finalScore);
    window.dispatchEvent(new CustomEvent("snug-minigame-achievement", { detail: { game: game.game, score: finalScore, won: winnerUid() === state.session.uid && finalScore > 0, personalBest: finalScore > previousBest, payout: amount } }));
    if (game.practice) teardownPracticeTag();
    setTimeout(() => showSoloResult(game, amount, before), 180);
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
    hud.innerHTML = `<span><small>${game.practice ? "Solo practice complete" : "Round complete"}</small><b>${game.practice ? GAME_DEFS[game.game].name : winner === state.session?.uid && score ? "You won" : winner ? `${escapeHtml(gamePlayerName(winner))} won` : GAME_DEFS[game.game].name}</b></span><strong>${score} pt</strong>`;
    return;
  }
  let detail = `${score} pt`;
  let note = GAME_DEFS[game.game].note;
  if (game.game === "tag") detail = game.practice ? `${score} tag${score === 1 ? "" : "s"}` : currentItUid() === state.session?.uid ? "YOU’RE IT" : `${score} tag${score === 1 ? "" : "s"}`;
  if (game.game === "quiz") detail = `Q${currentQuizIndex() + 1} · ${score} pt`;
  if (game.game === "floor") detail = state.floorEliminated ? "OUT" : "STILL UP";
  if (game.game === "scavenger") detail = `${score}/8 found`;
  if (game.game === "relay") detail = `${score}/6 gates`;
  if (game.game === "balloon") detail = `${score} popped`;
  if (game.game === "sprint") detail = `${score}/8 gates`;
  if (game.game === "fishing") detail = `${score} caught`;
  if (game.game === "potato") detail = game.practice ? `${score} passes` : currentPotatoUid() === state.session?.uid ? "PASS IT!" : "KEEP AWAY";
  if (BLUEPRINT_CHALLENGE_GAMES.has(game.game) && game.game !== "potato") detail = `${score} pt`;
  if (game.game === "simon") detail = `${score}/12 moves`;
  if (["connect4", "tictactoe"].includes(game.game)) {
    const board = validBoardState();
    if (board.winner) detail = board.winner === state.session?.uid ? "YOU WON" : "ROUND WON";
    else if (board.players.length < 2) detail = "WAITING";
    else detail = board.players[board.moves.length % 2] === state.session?.uid ? "YOUR TURN" : "THEIR TURN";
    note = board.winner ? "The board has a winner." : GAME_DEFS[game.game].note;
  }
  const phase = minigamePhase(game);
  hud.innerHTML = `<span><small>${game.practice ? "Solo · " : ""}${GAME_DEFS[game.game].name}</small><b>${phase === "countdown" ? "Get ready…" : game.game === "quiz" ? escapeHtml(quizItem(game, currentQuizIndex()).q) : escapeHtml(note)}</b></span><strong>${phase === "countdown" ? Math.max(1, Math.ceil((3000 - (Date.now() - Number(game.createdAt))) / 1000)) : `${secondsLeft()}s · ${detail}`}</strong>`;
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
  if (["scavenger", "relay", "sprint"].includes(game.game)) detectCourseProgress();
  if (game.game === "potato" && !game.practice) detectPotatoPass();
  if (["floor", "connect4", "tictactoe", "scavenger", "relay", "sprint"].includes(game.game)) updatePartyArena();
  if (["balloon", "fishing", "sprint"].includes(game.game)) updateWave1Overlay();
  if (BLUEPRINT_CHALLENGE_GAMES.has(game.game)) renderChallengeOverlay();
  renderSimonControls();
  if (gameExpired()) {
    teardownCoins();
    claimReward();
    if (Date.now() > Number(game.createdAt) + Number(game.duration) + 8000) { teardownPartyArena(); teardownWave1Overlay(); teardownChallengeOverlay(); }
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
  if (["floor", "connect4", "tictactoe", "scavenger", "relay", "sprint"].includes(state.currentGame?.game) && !gameExpired()) setupPartyArena(state.currentGame);
  if (["balloon", "fishing", "sprint"].includes(state.currentGame?.game) && !gameExpired()) setupWave1Overlay(state.currentGame);
  if (BLUEPRINT_CHALLENGE_GAMES.has(state.currentGame?.game) && !gameExpired()) setupChallengeOverlay(state.currentGame);
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
  tickCelestialEffects(time);
  requestAnimationFrame(environmentFrame);
}
requestAnimationFrame(environmentFrame);

renderDock();
if (window.__snugSession) attachSession(window.__snugSession);

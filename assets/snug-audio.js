const AUDIO_MANIFEST = "assets/audio/manifest.json";
const audioState = { manifest: { music: [], sfx: [] }, unlocked: false, musicEnabled: true, sfxEnabled: true, context: "", music: null, fade: null, footstepAt: 0 };

const byId = (group, id) => audioState.manifest[group]?.find((entry) => entry.id === id)?.file || "";

async function loadManifest() {
  try {
    const response = await fetch(AUDIO_MANIFEST, { cache: "no-cache" });
    if (!response.ok) throw new Error(`Audio manifest ${response.status}`);
    audioState.manifest = await response.json();
  } catch (error) {
    console.warn("Snug audio manifest unavailable", error);
  }
}

function musicContext() {
  if (document.querySelector(".snug-start-screen:not(.is-leaving)")) return "title-screen";
  if (document.querySelector(".snug-board-backdrop")) return "board-game";
  if (document.querySelector(".room-game-hud,.party-arena-backdrop,.solo-result-backdrop")) return "minigames";
  const shopTitle = [...document.querySelectorAll(".sheet-head h2")].find((node) => /Meadow Market|Curl & Comb|Pocket Mall|Hearth & Home|Green Nook/.test(node.textContent || ""));
  if (shopTitle) return "shops";
  if (window.__snugWorld?.mode === "home") return "home";
  return "plaza";
}

function fadeOut(audio) {
  if (!audio) return;
  const started = performance.now();
  const original = audio.volume;
  const step = (now) => {
    const ratio = Math.max(0, Math.min(1, (now - started) / 1400));
    audio.volume = Math.max(0, Math.min(1, original * (1 - ratio)));
    if (ratio < 1) requestAnimationFrame(step);
    else { audio.pause(); audio.remove(); }
  };
  requestAnimationFrame(step);
}

function syncMusic(force = false) {
  const next = musicContext();
  if (!force && next === audioState.context) return;
  audioState.context = next;
  const src = byId("music", next);
  const previous = audioState.music;
  audioState.music = null;
  if (!audioState.unlocked || !audioState.musicEnabled || !src) { fadeOut(previous); return; }
  const music = new Audio(src);
  music.loop = true;
  music.preload = "auto";
  music.volume = 0;
  music.dataset.snugMusic = next;
  document.body.appendChild(music);
  music.play().then(() => {
    const started = performance.now();
    const step = (now) => {
      const ratio = Math.max(0, Math.min(1, (now - started) / 1800));
      music.volume = Math.max(0, Math.min(1, .18 * ratio));
      if (ratio < 1 && !music.paused) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }).catch(() => music.remove());
  audioState.music = music;
  fadeOut(previous);
}

function playSfx(id, volume = .42) {
  if (!audioState.unlocked || !audioState.sfxEnabled) return;
  const src = byId("sfx", id);
  if (!src) return;
  const sound = new Audio(src);
  sound.volume = volume;
  sound.preload = "auto";
  sound.addEventListener("ended", () => sound.remove(), { once: true });
  document.body.appendChild(sound);
  sound.play().catch(() => sound.remove());
}

function updateToggles() {
  document.querySelectorAll(".snug-help-music-toggle").forEach((button) => {
    button.setAttribute("aria-pressed", String(audioState.musicEnabled));
    button.textContent = audioState.musicEnabled ? "Music on" : "Music off";
  });
  document.querySelectorAll(".snug-help-sfx-toggle").forEach((button) => {
    button.setAttribute("aria-pressed", String(audioState.sfxEnabled));
    button.textContent = audioState.sfxEnabled ? "Sounds on" : "Sounds off";
  });
}

function toggleMusic() {
  audioState.musicEnabled = !audioState.musicEnabled;
  if (!audioState.musicEnabled) fadeOut(audioState.music);
  audioState.music = null;
  if (audioState.musicEnabled) syncMusic(true);
  updateToggles();
}

function toggleSfx() {
  audioState.sfxEnabled = !audioState.sfxEnabled;
  updateToggles();
  if (audioState.sfxEnabled) playSfx("ui-select");
}

function unlockAudio() {
  if (audioState.unlocked) return;
  audioState.unlocked = true;
  syncMusic(true);
}

function describeClick(target) {
  if (target.closest("[data-board-roll]")) return "dice-roll";
  if (target.closest("[data-board-buy],.shop-item button")) return "shop-buy";
  if (target.closest("[data-board-start]")) return "game-start";
  if (target.closest("[data-board-ready]")) return "ready";
  if (target.closest("select,[role=option],[data-board-count]")) return "ui-select";
  if (target.closest("button,[role=button],a")) return "ui-click";
  return "";
}

document.addEventListener("pointerdown", (event) => {
  unlockAudio();
  const id = describeClick(event.target);
  if (id) playSfx(id);
}, true);

document.addEventListener("click", (event) => {
  const music = event.target.closest(".snug-help-music-toggle");
  if (music) { event.preventDefault(); toggleMusic(); }
  const sfx = event.target.closest(".snug-help-sfx-toggle");
  if (sfx) { event.preventDefault(); toggleSfx(); }
}, true);

window.addEventListener("snug-sfx", (event) => playSfx(event.detail?.id || "ui-select"));
window.addEventListener("snug-footstep", () => {
  if (performance.now() - audioState.footstepAt < 250) return;
  audioState.footstepAt = performance.now();
  playSfx("footsteps", .16);
});

let lastPlayerPosition = null;
setInterval(() => {
  const position = window.__snugWorld?.player?.position;
  if (!position) { lastPlayerPosition = null; return; }
  if (lastPlayerPosition) {
    const distance = Math.hypot(position.x - lastPlayerPosition.x, position.z - lastPlayerPosition.z);
    if (distance > .035) window.dispatchEvent(new CustomEvent("snug-footstep"));
  }
  lastPlayerPosition = { x: position.x, z: position.z };
}, 180);

let syncTimer = 0;
new MutationObserver(() => {
  clearTimeout(syncTimer);
  syncTimer = setTimeout(() => { syncMusic(); updateToggles(); }, 80);
}).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["class", "hidden"] });

window.__snugAudio = { playSfx, syncMusic, toggleMusic, toggleSfx, updateToggles, state: audioState };
loadManifest().then(() => syncMusic(true));

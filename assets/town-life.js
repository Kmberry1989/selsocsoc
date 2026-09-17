import * as THREE from "three";

const MARKER = "§TL§";
const PROJECT = { id: "moonlight-footbridge", name: "Moonlight Footbridge", goal: 240 };
const CAT_COATS = {
  OrangeTabby: { name: "Orange tabby", color: "#d9873b" },
  Grey: { name: "Silver gray", color: "#777b80" },
  BlackAndWhite: { name: "Black & white", color: "#292929", accent: "#f4f0e8" },
  Tortoiseshell: { name: "Tortoiseshell", color: "#3d2b27", accent: "#cf7839" },
  WhiteLonghair: { name: "White longhair", color: "#f4f2eb" },
  Calico: { name: "Calico", color: "#f4eee1", accent: "#d77a38" },
};
const FESTIVALS = {
  fireworks: { name: "Fireworks Night", note: "Color blooms over the square after dark." },
  meteors: { name: "Meteor Shower", note: "Watch bright trails skim the little planet." },
  parade: { name: "Costume Parade", note: "Neighbors loop the plaza in handmade hats." },
};
const PLANT_TYPES = {
  moonflower: { name: "Moonflower", kind: "Flower", color: 0xe7d8ff, leaf: 0x5f9364, stages: [["Seed", 0], ["Sprout", 2 * 60000], ["Bud", 10 * 60000], ["Bloom", 25 * 60000]] },
  fern: { name: "Button fern", kind: "Plant", color: 0x71a964, leaf: 0x4f8d58, stages: [["Seed", 0], ["Shoot", 3 * 60000], ["Young fern", 15 * 60000], ["Full fern", 45 * 60000]] },
  oak: { name: "Cozy oak", kind: "Tree", color: 0x6e9b59, leaf: 0x5a8c50, stages: [["Acorn", 0], ["Sapling", 10 * 60000], ["Young tree", 60 * 60000], ["Mature tree", 4 * 60 * 60000]] },
};
const GARDEN_PLOTS = [[4.1, 6.7], [6.55, 6.7], [9, 6.7], [4.1, 9.5], [6.55, 9.5], [9, 9.5]];
const WATERING_BONUS = 5 * 60000;

const town = {
  session: null,
  world: null,
  open: false,
  view: "projects",
  projectTotal: 0,
  projectContributors: [],
  cat: null,
  catFollower: null,
  catHearts: null,
  catReactUntil: 0,
  catFeedBusy: false,
  festival: null,
  festivalGroup: null,
  festivalKind: "",
  festivalStartedAt: 0,
  garden: [],
  gardenGroup: null,
  gardenSignature: "",
  gardenBusySlot: -1,
  gardenLastTick: 0,
  backend: "direct",
  loading: false,
  busy: false,
  error: "",
  photoMode: false,
  photoFrozenAt: 0,
  photoFrozenPosition: null,
  photoCamera: null,
  photoAzimuth: 30,
  photoDistance: 6.8,
  photoHeight: 2.7,
  photoPose: "calm",
  photoPreviewUrl: "",
  cameraControls: null,
  occlusionWorld: null,
  occlusionLastCheck: 0,
  occlusionFaded: new Map(),
};

const $ = (selector, root = document) => root.querySelector(selector);
const escapeHtml = (value) => {
  const span = document.createElement("span");
  span.textContent = String(value ?? "");
  return span.innerHTML;
};
const safeName = (value) => String(value || "").trim().replace(/\s+/g, " ").replace(/[<>]/g, "").slice(0, 18);
const playerName = () => $(".profile-chip b")?.textContent?.trim() || "Player";
const coinBalance = () => {
  const parsed = Number(String($(".coin-chip b")?.textContent || "0").replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

function databaseBase() {
  const options = town.session?.app?.options || {};
  return String(options.databaseURL || `https://${options.projectId || town.session?.projectId}-default-rtdb.firebaseio.com`).replace(/\/$/, "");
}

async function request(path, options = {}) {
  if (!town.session?.user) throw new Error("Waiting for Firebase sign-in");
  const token = await town.session.user.getIdToken();
  const [pathPart, query = ""] = String(path).split("?");
  const encoded = pathPart.split("/").map(encodeURIComponent).join("/");
  const response = await fetch(`${databaseBase()}/${encoded}.json${query ? `?${query}` : ""}`, {
    ...options,
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}`, ...(options.headers || {}) },
  });
  if (!response.ok) throw new Error(`Town Life data returned ${response.status}`);
  return response.json().catch(() => null);
}

async function journalWrite(payload) {
  const text = `${MARKER}${JSON.stringify(payload)}`.slice(0, 240);
  return request("messages/plaza", {
    method: "POST",
    body: JSON.stringify({ uid: town.session.uid, name: "Town Life", text, createdAt: Date.now() }),
  });
}

async function loadJournal() {
  const raw = await request("messages/plaza?orderBy=%22createdAt%22&limitToLast=200");
  const entries = Object.entries(raw || {}).map(([id, value]) => ({ id, ...value }))
    .filter((entry) => String(entry.text || "").startsWith(MARKER))
    .sort((a, b) => Number(a.createdAt || 0) - Number(b.createdAt || 0));
  const contributions = [];
  let cat = null;
  let festival = null;
  const garden = [];
  entries.forEach((entry) => {
    try {
      const value = JSON.parse(entry.text.slice(MARKER.length));
      if (value.t === "project" && [5, 10, 25].includes(Number(value.a))) contributions.push({ uid: entry.uid, name: value.n || entry.name, amount: Number(value.a), createdAt: entry.createdAt });
      if (value.t === "cat" && entry.uid === town.session.uid && CAT_COATS[value.coat]) cat = { coat: value.coat, name: safeName(value.name) || "Marmalade", affection: Math.max(0, Math.min(100, Number(value.affection) || 0)), feeds: Math.max(0, Number(value.feeds) || 0), updatedAt: entry.createdAt };
      if (value.t === "festival" && FESTIVALS[value.id]) festival = { id: value.id, startedAt: Number(value.startedAt) || Number(entry.createdAt), startedBy: value.startedBy || entry.name };
      if (value.t === "garden" && entry.uid === town.session.uid && Number.isInteger(value.slot) && value.slot >= 0 && value.slot < GARDEN_PLOTS.length) garden[value.slot] = value.clear ? null : normalizePlant(value);
    } catch {}
  });
  applyLoadedData(contributions, cat, festival, garden);
}

function normalizePlant(value) {
  if (!value || !PLANT_TYPES[value.kind]) return null;
  return {
    kind: value.kind,
    plantedAt: Math.max(0, Number(value.plantedAt) || Date.now()),
    waterings: Math.max(0, Math.min(20, Number(value.waterings) || 0)),
    wateredStage: Math.max(-1, Math.min(3, Number(value.wateredStage ?? -1))),
    updatedAt: Math.max(0, Number(value.updatedAt) || Date.now()),
  };
}

function normalizeGarden(value) {
  const garden = [];
  Object.entries(value || {}).forEach(([slot, plant]) => {
    const index = Number(slot);
    if (Number.isInteger(index) && index >= 0 && index < GARDEN_PLOTS.length) garden[index] = normalizePlant(plant);
  });
  return garden;
}

function applyLoadedData(contributions, cat, festival, garden = []) {
  town.projectTotal = contributions.reduce((sum, entry) => sum + Number(entry.amount || 0), 0);
  const people = new Map();
  contributions.forEach((entry) => people.set(entry.uid || entry.name, { name: entry.name || "Neighbor", amount: (people.get(entry.uid || entry.name)?.amount || 0) + Number(entry.amount || 0) }));
  town.projectContributors = [...people.values()].sort((a, b) => b.amount - a.amount).slice(0, 4);
  town.cat = cat;
  town.festival = festival && Date.now() - Number(festival.startedAt) < 600000 ? festival : null;
  town.garden = normalizeGarden(garden);
  syncCatFollower();
  syncFestival();
  syncGardenVisuals(true);
  renderPanel();
}

async function loadTownLife() {
  if (!town.session || town.loading) return;
  town.loading = true;
  town.error = "";
  try {
    const [projectRaw, cat, festival, garden] = await Promise.all([
      request(`townLife/projects/${PROJECT.id}/contributions?orderBy=%22createdAt%22&limitToLast=300`),
      request(`townLife/profiles/${town.session.uid}/cat`),
      request("townLife/festival/current"),
      request(`townLife/profiles/${town.session.uid}/garden`),
    ]);
    town.backend = "direct";
    const contributions = Object.values(projectRaw || {});
    applyLoadedData(contributions, cat, festival, garden);
  } catch {
    town.backend = "journal";
    try {
      await loadJournal();
    } catch {
      town.error = "Town Life could not reach the village network.";
    }
  } finally {
    town.loading = false;
    renderPanel();
  }
}

async function saveContribution(amount) {
  const value = Number(amount);
  if (![5, 10, 25].includes(value) || town.busy) return;
  if (coinBalance() < value) return showToast(`You need ${value} shells to help`);
  town.busy = true;
  town.error = "";
  renderPanel();
  const contribution = { uid: town.session.uid, name: playerName().slice(0, 18), amount: value, createdAt: Date.now() };
  try {
    if (town.backend === "direct") await request(`townLife/projects/${PROJECT.id}/contributions`, { method: "POST", body: JSON.stringify(contribution) });
    else await journalWrite({ t: "project", a: value, n: contribution.name });
    window.dispatchEvent(new CustomEvent("snug-award-coins", { detail: { amount: -value, message: `${value} shells given to the bridge` } }));
    town.projectTotal += value;
    const existing = town.projectContributors.find((entry) => entry.name === contribution.name);
    if (existing) existing.amount += value;
    else town.projectContributors.push({ name: contribution.name, amount: value });
    town.projectContributors.sort((a, b) => b.amount - a.amount);
    showToast(`You added ${value} shells`);
    window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "coin-pickup" } }));
  } catch {
    town.error = "That contribution did not go through. Your shells were not spent.";
  } finally {
    town.busy = false;
    renderPanel();
  }
}

async function persistCat(next) {
  if (town.backend === "direct") {
    await request(`townLife/profiles/${town.session.uid}/cat`, { method: "PUT", body: JSON.stringify(next) });
  } else {
    await journalWrite({ t: "cat", coat: next.coat, name: next.name, affection: next.affection, feeds: next.feeds });
  }
}

async function adoptCat() {
  if (town.busy || !town.session) return;
  const panel = $(".town-life-sheet");
  const coat = panel?.querySelector("[name='cat-coat']:checked")?.value || "OrangeTabby";
  const name = safeName(panel?.querySelector("[name='cat-name']")?.value) || "Marmalade";
  const next = { coat, name, affection: town.cat?.affection || 15, feeds: town.cat?.feeds || 0, updatedAt: Date.now() };
  town.busy = true;
  renderPanel();
  try {
    await persistCat(next);
    town.cat = next;
    syncCatFollower(true);
    reactCat();
    showToast(`${name} is coming home with you`);
  } catch {
    town.error = "The adoption could not be saved yet.";
  } finally {
    town.busy = false;
    renderPanel();
  }
}

async function feedCat() {
  if (!town.cat || town.catFeedBusy) return;
  const cost = 3;
  if (coinBalance() < cost) return showToast("You need 3 shells for a snack");
  town.catFeedBusy = true;
  renderPanel();
  const next = { ...town.cat, affection: Math.min(100, Number(town.cat.affection || 0) + 12), feeds: Number(town.cat.feeds || 0) + 1, updatedAt: Date.now() };
  try {
    await persistCat(next);
    town.cat = next;
    window.dispatchEvent(new CustomEvent("snug-award-coins", { detail: { amount: -cost, message: `${town.cat.name} enjoyed a snack · −3 shells` } }));
    reactCat();
    showToast(`${town.cat.name} is purring`);
  } catch {
    town.error = "The snack was not saved. Your shells were not spent.";
  } finally {
    town.catFeedBusy = false;
    renderPanel();
  }
}

async function startFestival(id) {
  if (!FESTIVALS[id] || town.busy || !town.session) return;
  const next = { id, startedAt: Date.now(), startedBy: playerName().slice(0, 18) };
  town.busy = true;
  renderPanel();
  try {
    if (town.backend === "direct") await request("townLife/festival/current", { method: "PUT", body: JSON.stringify(next) });
    else await journalWrite({ t: "festival", ...next });
    town.festival = next;
    syncFestival();
    showToast(`${FESTIVALS[id].name} has begun`);
  } catch {
    town.error = "The festival could not start on the village network.";
  } finally {
    town.busy = false;
    renderPanel();
  }
}

function scheduledFestivalId() {
  return Object.keys(FESTIVALS)[Math.floor(Date.now() / 3600000) % 3];
}

function plantStage(plant, now = Date.now()) {
  const type = PLANT_TYPES[plant?.kind];
  if (!type) return { index: 0, name: "Empty", progress: 0, nextMs: 0 };
  const age = Math.max(0, now - Number(plant.plantedAt || now)) + Math.max(0, Number(plant.waterings || 0)) * WATERING_BONUS;
  let index = 0;
  type.stages.forEach((stage, candidate) => { if (age >= stage[1]) index = candidate; });
  const next = type.stages[index + 1];
  const currentAt = type.stages[index][1];
  const progress = next ? Math.max(0, Math.min(1, (age - currentAt) / (next[1] - currentAt))) : 1;
  return { index, name: type.stages[index][0], progress, nextMs: next ? Math.max(0, next[1] - age) : 0 };
}

function durationLabel(milliseconds) {
  if (milliseconds <= 0) return "Ready";
  const minutes = Math.max(1, Math.ceil(milliseconds / 60000));
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainder = minutes % 60;
  return remainder ? `${hours} hr ${remainder} min` : `${hours} hr`;
}

async function persistGardenSlot(slot, plant) {
  if (town.backend === "direct") {
    await request(`townLife/profiles/${town.session.uid}/garden/${slot}`, { method: plant ? "PUT" : "DELETE", body: plant ? JSON.stringify(plant) : undefined });
  } else {
    await journalWrite(plant ? { t: "garden", slot, ...plant } : { t: "garden", slot, clear: true });
  }
}

async function plantGarden(slot, kind) {
  const index = Number(slot);
  if (!town.session || town.gardenBusySlot >= 0 || !Number.isInteger(index) || index < 0 || index >= GARDEN_PLOTS.length || town.garden[index] || !PLANT_TYPES[kind]) return;
  const plant = { kind, plantedAt: Date.now(), waterings: 0, wateredStage: -1, updatedAt: Date.now() };
  town.gardenBusySlot = index;
  renderPanel();
  try {
    await persistGardenSlot(index, plant);
    town.garden[index] = plant;
    syncGardenVisuals(true);
    showToast(`${PLANT_TYPES[kind].name} planted in plot ${index + 1}`);
    window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "select" } }));
  } catch {
    town.error = "That seed could not be planted yet.";
  } finally {
    town.gardenBusySlot = -1;
    renderPanel();
  }
}

async function waterGarden(slot) {
  const index = Number(slot);
  const current = town.garden[index];
  if (!current || town.gardenBusySlot >= 0) return;
  const stage = plantStage(current);
  if (current.wateredStage === stage.index) return showToast("This plot is already watered for this stage");
  const next = { ...current, waterings: Number(current.waterings || 0) + 1, wateredStage: stage.index, updatedAt: Date.now() };
  town.gardenBusySlot = index;
  renderPanel();
  try {
    await persistGardenSlot(index, next);
    town.garden[index] = next;
    syncGardenVisuals(true);
    showToast(`Plot ${index + 1} watered · growth moved ahead 5 minutes`);
    window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "select" } }));
  } catch {
    town.error = "The watering did not save yet.";
  } finally {
    town.gardenBusySlot = -1;
    renderPanel();
  }
}

async function clearGarden(slot) {
  const index = Number(slot);
  if (!town.garden[index] || town.gardenBusySlot >= 0) return;
  town.gardenBusySlot = index;
  renderPanel();
  try {
    await persistGardenSlot(index, null);
    town.garden[index] = null;
    syncGardenVisuals(true);
    showToast(`Plot ${index + 1} is ready for a new seed`);
  } catch {
    town.error = "That plot could not be cleared yet.";
  } finally {
    town.gardenBusySlot = -1;
    renderPanel();
  }
}

function renderDock() {
  let dock = $(".town-life-dock");
  if (!dock) {
    dock = document.createElement("button");
    dock.type = "button";
    dock.className = "town-life-dock";
    dock.innerHTML = `<i aria-hidden="true"><span></span></i><b>Town Life</b>`;
    dock.addEventListener("click", () => openPanel());
    document.body.appendChild(dock);
  }
  const worldReady = town.world?.mode === "village";
  dock.hidden = !worldReady || town.photoMode;
  renderCameraControls();
}

function cameraSettings() {
  return window.__snugCameraSettings || (window.__snugCameraSettings = {
    azimuth: Math.atan2(7, 9.2),
    distance: 14,
    height: 8.2,
  });
}

function renderCameraControls() {
  let controls = town.cameraControls || $(".snug-camera-controls");
  if (!controls) {
    controls = document.createElement("div");
    controls.className = "snug-camera-controls";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "Camera controls");
    controls.innerHTML = `<button type="button" data-camera-control="left" aria-label="Rotate camera left" title="Rotate camera left">↶</button><button type="button" data-camera-control="out" aria-label="Zoom camera out" title="Zoom camera out">−</button><button type="button" data-camera-control="in" aria-label="Zoom camera in" title="Zoom camera in">+</button><button type="button" data-camera-control="right" aria-label="Rotate camera right" title="Rotate camera right">↷</button>`;
    controls.addEventListener("click", (event) => {
      const button = event.target.closest("[data-camera-control]");
      if (!button) return;
      const settings = cameraSettings();
      if (button.dataset.cameraControl === "left") settings.azimuth -= THREE.MathUtils.degToRad(18);
      if (button.dataset.cameraControl === "right") settings.azimuth += THREE.MathUtils.degToRad(18);
      if (button.dataset.cameraControl === "out") settings.distance = THREE.MathUtils.clamp(settings.distance + 1.15, 7.5, 18);
      if (button.dataset.cameraControl === "in") settings.distance = THREE.MathUtils.clamp(settings.distance - 1.15, 7.5, 18);
      window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "select" } }));
    });
    document.body.appendChild(controls);
    town.cameraControls = controls;
  }
  controls.hidden = town.world?.mode !== "village" || town.photoMode || document.documentElement.classList.contains("snug-start-open");
}

function isDescendantOf(object, root) {
  for (let node = object; node; node = node.parent) if (node === root) return true;
  return false;
}

function restoreOccluder(mesh) {
  const saved = town.occlusionFaded.get(mesh);
  if (!saved) return;
  const faded = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
  faded.forEach((material) => material?.dispose?.());
  mesh.material = saved.original;
  town.occlusionFaded.delete(mesh);
}

function restoreAllOccluders() {
  [...town.occlusionFaded.keys()].forEach(restoreOccluder);
}

function fadeOccluder(mesh) {
  if (town.occlusionFaded.has(mesh) || !mesh.material) return;
  const original = mesh.material;
  const materials = (Array.isArray(original) ? original : [original]).map((material) => {
    const faded = material.clone();
    faded.transparent = true;
    faded.opacity = Math.min(Number.isFinite(material.opacity) ? material.opacity : 1, 0.22);
    faded.depthWrite = false;
    faded.needsUpdate = true;
    return faded;
  });
  town.occlusionFaded.set(mesh, { original, materials });
  mesh.material = Array.isArray(original) ? materials : materials[0];
}

const occlusionRaycaster = new THREE.Raycaster();
const occlusionCameraPosition = new THREE.Vector3();
const occlusionTarget = new THREE.Vector3();
const occlusionDirection = new THREE.Vector3();
function updateCameraOcclusion(time) {
  const world = town.world;
  if (town.occlusionWorld !== world) {
    restoreAllOccluders();
    town.occlusionWorld = world;
  }
  if (!world?.scene || !world?.camera || !world?.player || world.mode !== "village" || town.photoMode || document.documentElement.classList.contains("snug-start-open")) {
    restoreAllOccluders();
    return;
  }
  if (time - town.occlusionLastCheck < 90) return;
  town.occlusionLastCheck = time;
  world.camera.getWorldPosition(occlusionCameraPosition);
  const remoteRoots = world.remotes instanceof Map ? [...world.remotes.values()] : [];
  const blockers = new Set();
  [0.7, 1.25].forEach((height) => {
    world.player.getWorldPosition(occlusionTarget);
    occlusionTarget.y += height;
    occlusionDirection.copy(occlusionTarget).sub(occlusionCameraPosition);
    const targetDistance = occlusionDirection.length();
    if (targetDistance < 0.5) return;
    occlusionDirection.normalize();
    occlusionRaycaster.set(occlusionCameraPosition, occlusionDirection);
    occlusionRaycaster.near = 0.2;
    occlusionRaycaster.far = Math.max(0.2, targetDistance - 0.35);
    occlusionRaycaster.intersectObjects(world.scene.children, true).forEach(({ object, distance }) => {
      if (!object?.isMesh || distance >= targetDistance - 0.35 || isDescendantOf(object, world.player) || remoteRoots.some((root) => isDescendantOf(object, root))) return;
      let named = "";
      for (let node = object; node; node = node.parent) named += ` ${node.name || ""}`;
      if (/SnugWeather|SnugSnowCover|SnugPlanetGlobe|TapMarker|CatReactionHearts|TownFestival|Star|Sun|Moon/i.test(named)) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      if (!materials.some((material) => material && (material.opacity ?? 1) >= 0.58)) return;
      blockers.add(object);
    });
  });
  [...town.occlusionFaded.keys()].forEach((mesh) => { if (!blockers.has(mesh)) restoreOccluder(mesh); });
  blockers.forEach(fadeOccluder);
}

function closePanel() {
  $(".town-life-backdrop")?.remove();
  town.open = false;
  document.body.classList.remove("town-life-open");
}

function openPanel(view = town.view) {
  if (!town.world || town.world.mode !== "village") return showToast("Town Life is waiting in the village plaza");
  closePanel();
  document.querySelector(".sheet-backdrop .icon-btn")?.click();
  document.querySelector(".multiplayer-backdrop .multi-close")?.click();
  town.view = view;
  town.open = true;
  document.body.classList.add("town-life-open");
  const backdrop = document.createElement("div");
  backdrop.className = "town-life-backdrop";
  backdrop.addEventListener("pointerdown", (event) => { if (event.target === backdrop) closePanel(); });
  const panel = document.createElement("section");
  panel.className = "town-life-sheet";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-modal", "true");
  backdrop.appendChild(panel);
  document.body.appendChild(backdrop);
  renderPanel();
  if (!town.loading) loadTownLife();
}

function projectMarkup() {
  const goal = PROJECT.goal;
  const total = Math.min(goal, town.projectTotal);
  const percent = Math.min(100, Math.round(total / goal * 100));
  const people = town.projectContributors.length
    ? `<ul class="town-contributors">${town.projectContributors.map((entry) => `<li><span>${escapeHtml(entry.name)}</span><b>${entry.amount} shells</b></li>`).join("")}</ul>`
    : `<p class="town-muted">No one has added a shell yet. The first lantern is waiting.</p>`;
  return `<div class="project-visual" aria-hidden="true"><div class="project-moon"></div><div class="project-bridge"><i></i><i></i><i></i><i></i><i></i></div></div><div class="town-section-head"><div><small>Shared town project</small><h3>${PROJECT.name}</h3></div><strong>${percent}%</strong></div><p class="town-copy">Build a lantern-lit shortcut across the creek. Every neighbor’s contribution moves the same project forward.</p><div class="town-progress" role="progressbar" aria-label="Bridge progress" aria-valuemin="0" aria-valuemax="${goal}" aria-valuenow="${total}"><span style="width:${percent}%"></span></div><div class="town-progress-label"><span>${total} shells raised</span><b>${Math.max(0, goal - total)} to go</b></div><div class="contribute-row">${[5,10,25].map((amount) => `<button type="button" data-contribute="${amount}" ${town.busy || total >= goal ? "disabled" : ""}><small>Give</small><b>${amount}</b></button>`).join("")}</div><div class="town-subhead"><b>Top helpers</b><span>Shared by the whole plaza</span></div>${people}`;
}

function catMarkup() {
  const cat = town.cat;
  const selected = cat?.coat || "OrangeTabby";
  const name = cat?.name || "";
  const coatOptions = Object.entries(CAT_COATS).map(([id, coat]) => `<label class="cat-coat" style="--coat:${coat.color};--patch:${coat.accent || coat.color}"><input type="radio" name="cat-coat" value="${id}" ${selected === id ? "checked" : ""}><span aria-hidden="true"><i></i></span><b>${coat.name}</b></label>`).join("");
  if (!cat) return `<div class="cat-intro"><div class="cat-silhouette" aria-hidden="true"><i></i></div><div><small>Stray at the garden gate</small><h3>Choose a companion</h3><p>A village cat has decided you look interesting.</p></div></div><div class="cat-coats">${coatOptions}</div><label class="town-field"><span>What will you call them?</span><input name="cat-name" maxlength="18" placeholder="Marmalade" autocomplete="off"></label><button type="button" class="town-primary" data-action="adopt" ${town.busy ? "disabled" : ""}>Adopt this cat</button>`;
  const affection = Math.max(0, Math.min(100, Number(cat.affection || 0)));
  return `<div class="cat-family"><div class="cat-portrait" style="--coat:${CAT_COATS[cat.coat].color};--patch:${CAT_COATS[cat.coat].accent || CAT_COATS[cat.coat].color}" aria-hidden="true"><i></i><span></span></div><div><small>Your companion</small><h3>${escapeHtml(cat.name)}</h3><p>${affection >= 80 ? "Completely devoted" : affection >= 45 ? "Trusting and playful" : "Still getting to know you"}</p></div></div><div class="affection-row"><span><b>Bond</b><small>${affection}/100</small></span><div class="affection-meter"><i style="width:${affection}%"></i></div></div><div class="cat-actions"><button type="button" data-action="feed" ${town.catFeedBusy ? "disabled" : ""}><span aria-hidden="true" class="bowl-mark"></span><span><b>${town.catFeedBusy ? "Saving…" : "Give a snack"}</b><small>3 shells · +12 bond</small></span></button><button type="button" data-action="cat-wave"><span aria-hidden="true" class="paw-mark"></span><span><b>Wave hello</b><small>${escapeHtml(cat.name)} reacts</small></span></button></div><details class="cat-rename"><summary>Change name or coat</summary><div class="cat-coats">${coatOptions}</div><label class="town-field"><span>Name</span><input name="cat-name" maxlength="18" value="${escapeHtml(name)}" autocomplete="off"></label><button type="button" class="town-secondary" data-action="adopt" ${town.busy ? "disabled" : ""}>Save changes</button></details>`;
}

function festivalMarkup() {
  const active = town.festival?.id || "";
  const scheduled = scheduledFestivalId();
  return `<div class="festival-banner"><span class="festival-sparks" aria-hidden="true"><i></i><i></i><i></i></span><div><small>Rotating town events</small><h3>${active ? FESTIVALS[active].name : "Pick tonight’s celebration"}</h3><p>${active ? `Started by ${escapeHtml(town.festival.startedBy || "a neighbor")}. It runs for ten minutes.` : `${FESTIVALS[scheduled].name} is next in the town rotation.`}</p></div></div><div class="festival-list">${Object.entries(FESTIVALS).map(([id, festival]) => `<button type="button" data-festival="${id}" class="${active === id ? "active" : ""}" ${town.busy ? "disabled" : ""}><span class="festival-mark ${id}" aria-hidden="true"><i></i></span><span><b>${festival.name}</b><small>${festival.note}</small></span><strong>${active === id ? "Live" : scheduled === id ? "Next" : "Start"}</strong></button>`).join("")}</div>`;
}

function gardenMarkup() {
  const options = Object.entries(PLANT_TYPES).map(([id, plant]) => `<option value="${id}">${plant.name} · ${plant.kind}</option>`).join("");
  const plots = GARDEN_PLOTS.map((_, index) => {
    const plant = town.garden[index];
    if (!plant) return `<article class="garden-plot empty"><span class="garden-stage-mark seed" aria-hidden="true"><i></i></span><div><small>Plot ${index + 1}</small><b>Fresh soil</b><span>Choose a seed and start something new.</span></div><button type="button" data-plant-slot="${index}" ${town.gardenBusySlot >= 0 ? "disabled" : ""}>Plant</button></article>`;
    const type = PLANT_TYPES[plant.kind];
    const stage = plantStage(plant);
    const watered = plant.wateredStage === stage.index;
    return `<article class="garden-plot"><span class="garden-stage-mark ${plant.kind} stage-${stage.index}" aria-hidden="true"><i></i></span><div><small>Plot ${index + 1} · ${type.kind}</small><b>${type.name}</b><span>${stage.name}${stage.nextMs ? ` · next phase in ${durationLabel(stage.nextMs)}` : " · fully grown"}</span><div class="garden-progress" role="progressbar" aria-label="${escapeHtml(type.name)} growth" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(stage.progress * 100)}"><i style="width:${Math.round(stage.progress * 100)}%"></i></div></div><div class="garden-actions"><button type="button" data-water-slot="${index}" ${watered || town.gardenBusySlot >= 0 ? "disabled" : ""}>${watered ? "Watered" : "Water"}</button><button type="button" data-clear-slot="${index}" ${town.gardenBusySlot >= 0 ? "disabled" : ""}>Clear</button></div></article>`;
  }).join("");
  return `<div class="garden-intro"><span class="garden-intro-mark" aria-hidden="true"><i></i></span><div><small>Community garden</small><h3>Plant, water, and watch it grow</h3><p>Flowers, leafy plants, and trees develop through visible phases over real time. Water once per phase to move growth ahead by five minutes.</p></div></div><label class="garden-seed-picker"><span>Seed for the next empty plot</span><select name="garden-seed">${options}</select></label><div class="garden-plots">${plots}</div>`;
}

function photoMarkup() {
  return `<div class="photo-intro"><div class="photo-frame-mark" aria-hidden="true"><i></i></div><div><small>Photo mode</small><h3>Hold the whole world still</h3><p>Pose your avatar, circle the camera, then keep a clean picture of the plaza.</p></div></div><ul class="photo-notes"><li><i aria-hidden="true"></i><span><b>Freeze the moment</b><small>Walking, wildlife, and festival motion pause while you frame the shot.</small></span></li><li><i aria-hidden="true"></i><span><b>Direct the pose</b><small>Choose a calm stance, a wave, a cheer, or a laugh.</small></span></li><li><i aria-hidden="true"></i><span><b>Save or share</b><small>Your picture stays on this device unless you choose Share.</small></span></li></ul><button type="button" class="town-primary" data-action="photo-start">Open photo mode</button>`;
}

function renderPanel() {
  const panel = $(".town-life-sheet");
  if (!panel) return;
  const views = [["projects","Projects"],["garden","Garden"],["cat","My Cat"],["festivals","Festivals"],["photo","Photos"]];
  const content = town.view === "projects" ? projectMarkup() : town.view === "garden" ? gardenMarkup() : town.view === "cat" ? catMarkup() : town.view === "festivals" ? festivalMarkup() : photoMarkup();
  panel.innerHTML = `<div class="town-grabber"></div><header class="town-head"><div><small>Village activities</small><h2>Town Life</h2></div><button type="button" class="town-close" aria-label="Close Town Life">×</button></header><nav class="town-tabs" aria-label="Town Life sections">${views.map(([id,label]) => `<button type="button" data-town-view="${id}" class="${town.view === id ? "active" : ""}">${label}</button>`).join("")}</nav>${town.error ? `<div class="town-error" role="status">${escapeHtml(town.error)}</div>` : ""}<div class="town-content">${town.loading ? `<div class="town-loading">Checking the notice board…</div>` : content}</div>`;
  panel.querySelector(".town-close")?.addEventListener("click", closePanel);
  panel.querySelectorAll("[data-town-view]").forEach((button) => button.addEventListener("click", () => { town.view = button.dataset.townView; renderPanel(); }));
  panel.querySelectorAll("[data-contribute]").forEach((button) => button.addEventListener("click", () => saveContribution(button.dataset.contribute)));
  panel.querySelectorAll("[data-action='adopt']").forEach((button) => button.addEventListener("click", adoptCat));
  panel.querySelector("[data-action='feed']")?.addEventListener("click", feedCat);
  panel.querySelector("[data-action='cat-wave']")?.addEventListener("click", () => { reactCat(); showToast(`${town.cat?.name || "Your cat"} hops in reply`); });
  panel.querySelectorAll("[data-festival]").forEach((button) => button.addEventListener("click", () => startFestival(button.dataset.festival)));
  panel.querySelectorAll("[data-plant-slot]").forEach((button) => button.addEventListener("click", () => plantGarden(button.dataset.plantSlot, panel.querySelector("[name='garden-seed']")?.value || "moonflower")));
  panel.querySelectorAll("[data-water-slot]").forEach((button) => button.addEventListener("click", () => waterGarden(button.dataset.waterSlot)));
  panel.querySelectorAll("[data-clear-slot]").forEach((button) => button.addEventListener("click", () => clearGarden(button.dataset.clearSlot)));
  panel.querySelector("[data-action='photo-start']")?.addEventListener("click", enterPhotoMode);
}

function showToast(text) {
  let toast = $(".town-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "town-toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = text;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

function disposeGroup(group) {
  group?.traverse?.((node) => {
    if (!node.isMesh) return;
    node.geometry?.dispose?.();
    const materials = Array.isArray(node.material) ? node.material : [node.material];
    materials.forEach((material) => material?.dispose?.());
  });
}

function plantMesh(geometry, color, x, y, z) {
  const object = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color, roughness: 0.9 }));
  object.position.set(x, y, z);
  object.castShadow = true;
  return object;
}

function makeGardenPlant(plant, stageIndex) {
  const type = PLANT_TYPES[plant.kind];
  const group = new THREE.Group();
  group.userData.stage = stageIndex;
  const soilColor = 0x6b4934;
  if (stageIndex === 0) {
    group.add(plantMesh(new THREE.SphereGeometry(0.09, 8, 6), soilColor, 0, 0.07, 0));
    return group;
  }
  if (plant.kind === "oak") {
    const height = [0, 0.42, 0.95, 1.75][stageIndex];
    const trunk = plantMesh(new THREE.CylinderGeometry(0.06 + stageIndex * 0.035, 0.09 + stageIndex * 0.04, height, 7), 0x76513b, 0, height / 2, 0);
    group.add(trunk);
    const crownCount = stageIndex === 1 ? 1 : stageIndex === 2 ? 3 : 5;
    for (let index = 0; index < crownCount; index += 1) {
      const angle = index / crownCount * Math.PI * 2;
      const radius = stageIndex === 1 ? 0 : 0.2 + stageIndex * 0.055;
      const crown = plantMesh(new THREE.IcosahedronGeometry(0.18 + stageIndex * 0.14, 1), type.leaf, Math.cos(angle) * radius, height + (index % 2) * 0.12, Math.sin(angle) * radius);
      group.add(crown);
    }
    return group;
  }
  if (plant.kind === "fern") {
    const leafCount = 2 + stageIndex * 2;
    for (let index = 0; index < leafCount; index += 1) {
      const angle = index / leafCount * Math.PI * 2;
      const length = 0.18 + stageIndex * 0.16;
      const leaf = plantMesh(new THREE.SphereGeometry(0.12, 8, 5), type.leaf, Math.cos(angle) * length * 0.55, 0.12 + length * 0.45, Math.sin(angle) * length * 0.55);
      leaf.scale.set(0.52, 1.65 + stageIndex * 0.16, 0.38);
      leaf.rotation.set(Math.cos(angle) * 0.42, -angle, Math.sin(angle) * 0.42);
      group.add(leaf);
    }
    return group;
  }
  const stemHeight = 0.18 + stageIndex * 0.21;
  group.add(plantMesh(new THREE.CylinderGeometry(0.025, 0.035, stemHeight, 7), type.leaf, 0, stemHeight / 2, 0));
  if (stageIndex >= 1) {
    [-1, 1].forEach((side) => {
      const leaf = plantMesh(new THREE.SphereGeometry(0.095, 8, 5), type.leaf, side * 0.1, stemHeight * 0.52, 0);
      leaf.scale.set(1.4, 0.5, 0.65);
      leaf.rotation.z = side * 0.45;
      group.add(leaf);
    });
  }
  if (stageIndex >= 2) group.add(plantMesh(new THREE.SphereGeometry(stageIndex === 2 ? 0.12 : 0.09, 10, 7), stageIndex === 2 ? 0x8f72ae : 0xf3c55e, 0, stemHeight + 0.08, 0));
  if (stageIndex >= 3) {
    for (let index = 0; index < 7; index += 1) {
      const angle = index / 7 * Math.PI * 2;
      const petal = plantMesh(new THREE.SphereGeometry(0.1, 9, 6), type.color, Math.cos(angle) * 0.16, stemHeight + 0.08, Math.sin(angle) * 0.16);
      petal.scale.set(1.25, 0.48, 0.72);
      petal.rotation.y = -angle;
      group.add(petal);
    }
  }
  return group;
}

function syncGardenVisuals(force = false) {
  const world = town.world;
  if (!world?.scene || world.mode !== "village") return;
  const signature = town.garden.map((plant) => plant ? `${plant.kind}:${plantStage(plant).index}` : "-").join("|");
  if (!force && signature === town.gardenSignature && town.gardenGroup?.parent) return;
  if (town.gardenGroup) {
    town.gardenGroup.parent?.remove(town.gardenGroup);
    disposeGroup(town.gardenGroup);
  }
  const garden = new THREE.Group();
  garden.name = "PlayerGardenGrowth";
  town.garden.forEach((plant, index) => {
    if (!plant || !GARDEN_PLOTS[index]) return;
    const stage = plantStage(plant);
    const growth = makeGardenPlant(plant, stage.index);
    growth.name = `Growing_${plant.kind}_${index + 1}`;
    growth.position.set(GARDEN_PLOTS[index][0], 0.22, GARDEN_PLOTS[index][1]);
    growth.userData.plot = index;
    growth.userData.baseScale = 0.86 + stage.progress * 0.14;
    growth.scale.setScalar(growth.userData.baseScale);
    garden.add(growth);
  });
  world.scene.add(garden);
  town.gardenGroup = garden;
  town.gardenSignature = signature;
}

function tickGarden(time) {
  if (time - town.gardenLastTick < 1000) return;
  town.gardenLastTick = time;
  const previousSignature = town.gardenSignature;
  syncGardenVisuals();
  if (town.gardenSignature !== previousSignature && town.open && town.view === "garden") renderPanel();
  town.gardenGroup?.children.forEach((plantGroup) => {
    const plant = town.garden[plantGroup.userData.plot];
    if (!plant) return;
    const stage = plantStage(plant);
    const base = 0.86 + stage.progress * 0.14;
    plantGroup.userData.baseScale = base;
    plantGroup.scale.set(base * (1 + Math.sin(time * 0.0014 + plantGroup.userData.plot) * 0.012), base, base);
  });
}

function makeHeartGeometry() {
  const shape = new THREE.Shape();
  shape.moveTo(0, -0.12);
  shape.bezierCurveTo(-0.32, -0.34, -0.48, 0.08, -0.22, 0.2);
  shape.bezierCurveTo(-0.08, 0.28, 0, 0.15, 0, 0.08);
  shape.bezierCurveTo(0, 0.15, 0.08, 0.28, 0.22, 0.2);
  shape.bezierCurveTo(0.48, 0.08, 0.32, -0.34, 0, -0.12);
  return new THREE.ShapeGeometry(shape, 8);
}

function syncCatFollower(force = false) {
  const world = town.world;
  if (!world?.scene || world.mode !== "village") return;
  if (town.catFollower && (!town.cat || force || town.catFollower.userData.coat !== town.cat.coat)) {
    town.catFollower.parent?.remove(town.catFollower);
    town.catFollower = null;
    town.catHearts = null;
  }
  if (!town.cat || town.catFollower) return;
  const source = world.scene.getObjectByName(`VillageCat_${town.cat.coat}`) || world.scene.getObjectByName("VillageCat_OrangeTabby");
  if (!source) return;
  const cat = source.clone(true);
  cat.name = "AdoptedCatFollower";
  cat.userData = { ...source.userData, coat: town.cat.coat, adopted: true };
  cat.scale.multiplyScalar(1.12);
  const hearts = new THREE.Group();
  hearts.name = "CatReactionHearts";
  const geometry = makeHeartGeometry();
  [0, 1, 2].forEach((index) => {
    const heart = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: index === 1 ? 0xf3a6a8 : 0xe76872, side: THREE.DoubleSide, transparent: true, opacity: 0 }));
    heart.scale.setScalar(0.34 - index * 0.04);
    heart.position.set((index - 1) * 0.24, 0.8 + index * 0.13, 0);
    hearts.add(heart);
  });
  cat.add(hearts);
  world.scene.add(cat);
  town.catFollower = cat;
  town.catHearts = hearts;
}

function reactCat() {
  town.catReactUntil = performance.now() + 2400;
}

function makeFireworks() {
  const group = new THREE.Group();
  group.name = "TownFestivalFireworks";
  for (let burst = 0; burst < 5; burst += 1) {
    const count = 48;
    const positions = new Float32Array(count * 3);
    const directions = [];
    for (let index = 0; index < count; index += 1) {
      const phi = Math.acos(1 - 2 * ((index + 0.5) / count));
      const theta = index * 2.399963;
      directions.push(new THREE.Vector3(Math.sin(phi) * Math.cos(theta), Math.cos(phi), Math.sin(phi) * Math.sin(theta)));
    }
    const colors = [0xf4c64e, 0xed765e, 0x78c0cc, 0xf4a6b8, 0x9ed181];
    const points = new THREE.Points(new THREE.BufferGeometry(), new THREE.PointsMaterial({ color: colors[burst], size: 0.11, transparent: true, opacity: 0, depthWrite: false }));
    points.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    points.position.set(-4 + burst * 2, 5.2 + (burst % 2) * 1.2, -3.5 - (burst % 3));
    points.userData = { directions, delay: burst * 720, duration: 1900 };
    group.add(points);
  }
  return group;
}

function makeMeteors() {
  const group = new THREE.Group();
  group.name = "TownFestivalMeteors";
  const material = new THREE.LineBasicMaterial({ color: 0xd9f4ff, transparent: true, opacity: 0.9 });
  for (let index = 0; index < 16; index += 1) {
    const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0,0,0), new THREE.Vector3(-1.4,0.55,0)]);
    const line = new THREE.Line(geometry, material.clone());
    line.userData = { start: (index / 16) * 1.8, speed: 0.55 + (index % 4) * 0.08, lane: index };
    group.add(line);
  }
  return group;
}

function makeParade() {
  const group = new THREE.Group();
  group.name = "TownFestivalParade";
  const colors = [0xe76854, 0x5c8d65, 0x567fa6, 0xe0aa40, 0xb86d8c];
  for (let index = 0; index < 5; index += 1) {
    const walker = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.24, 0.45, 4, 8), new THREE.MeshStandardMaterial({ color: colors[index], roughness: 0.75 }));
    body.position.y = 0.58;
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.31, 0.13, 24), new THREE.MeshStandardMaterial({ color: 0xe5b38a, roughness: 0.8 }));
    head.rotation.x = Math.PI / 2;
    head.position.y = 1.18;
    const hat = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.58, 8), new THREE.MeshStandardMaterial({ color: colors[(index + 2) % colors.length], roughness: 0.7 }));
    hat.position.y = 1.58;
    walker.add(body, head, hat);
    walker.userData.phase = index / 5 * Math.PI * 2;
    group.add(walker);
  }
  return group;
}

function syncFestival() {
  const world = town.world;
  if (!world?.scene || world.mode !== "village") return;
  const id = town.festival && Date.now() - Number(town.festival.startedAt) < 600000 ? town.festival.id : "";
  if (town.festivalGroup && town.festivalKind !== id) {
    town.festivalGroup.parent?.remove(town.festivalGroup);
    town.festivalGroup.traverse((node) => {
      if (node.isMesh || node.isPoints || node.isLine) {
        node.geometry?.dispose?.();
        node.material?.dispose?.();
      }
    });
    town.festivalGroup = null;
  }
  town.festivalKind = id;
  town.festivalStartedAt = town.festival?.startedAt || Date.now();
  if (!id || town.festivalGroup) return;
  town.festivalGroup = id === "fireworks" ? makeFireworks() : id === "meteors" ? makeMeteors() : makeParade();
  world.scene.add(town.festivalGroup);
}

function tickFestival(time) {
  const group = town.festivalGroup;
  if (!group || town.photoMode) return;
  const elapsed = (Date.now() - town.festivalStartedAt) / 1000;
  if (town.festivalKind === "fireworks") {
    group.children.forEach((points) => {
      const cycle = ((time - points.userData.delay) % 3100 + 3100) % 3100;
      const progress = Math.min(1, cycle / points.userData.duration);
      const position = points.geometry.attributes.position;
      points.userData.directions.forEach((direction, index) => {
        const radius = progress * 2.15;
        position.setXYZ(index, direction.x * radius, direction.y * radius - progress * progress * 0.9, direction.z * radius);
      });
      position.needsUpdate = true;
      points.material.opacity = cycle < points.userData.duration ? Math.sin(progress * Math.PI) * 0.95 : 0;
    });
  } else if (town.festivalKind === "meteors") {
    group.children.forEach((line) => {
      const p = (elapsed * line.userData.speed + line.userData.start) % 2;
      line.position.set(8 - p * 15, 8 + (line.userData.lane % 5) * 0.65 - p * 2.7, -7 + (line.userData.lane % 8) * 1.7);
      line.material.opacity = p > 1.78 ? (2 - p) / 0.22 : 0.88;
    });
  } else if (town.festivalKind === "parade") {
    group.children.forEach((walker, index) => {
      const angle = elapsed * 0.42 + walker.userData.phase;
      walker.position.set(Math.cos(angle) * 2.8, Math.abs(Math.sin(elapsed * 7 + index)) * 0.055, Math.sin(angle) * 2.15);
      walker.rotation.y = -angle;
    });
  }
}

function tickCat(time) {
  const cat = town.catFollower;
  const player = town.world?.player;
  if (!cat || !player || town.photoMode) return;
  const behind = new THREE.Vector3(-0.75, 0, -0.95).applyAxisAngle(new THREE.Vector3(0,1,0), player.rotation.y).add(player.position);
  const distance = cat.position.distanceTo(behind);
  cat.position.lerp(behind, distance > 3 ? 0.2 : 0.055);
  cat.rotation.y += (Math.atan2(player.position.x - cat.position.x, player.position.z - cat.position.z) - cat.rotation.y) * 0.12;
  cat.position.y = Math.max(0, Math.sin(time * 0.009) * (distance > 0.25 ? 0.045 : 0.012));
  const reacting = time < town.catReactUntil;
  if (reacting) {
    cat.position.y += Math.abs(Math.sin(time * 0.014)) * 0.22;
    cat.rotation.y += 0.05;
  }
  town.catHearts?.children.forEach((heart, index) => {
    heart.material.opacity = reacting ? Math.max(0, Math.sin((town.catReactUntil - time) / 2400 * Math.PI + index * 0.35)) : 0;
    heart.position.y = 0.75 + index * 0.16 + (reacting ? ((time / 500 + index * 0.2) % 0.5) : 0);
    heart.lookAt(town.world.camera.position);
  });
}

function enterPhotoMode() {
  if (!town.world?.camera || !town.world?.renderer) return;
  closePanel();
  town.photoMode = true;
  town.photoFrozenAt = Date.now();
  town.photoFrozenPosition = town.world.player.position.clone();
  town.photoCamera = { position: town.world.camera.position.clone(), quaternion: town.world.camera.quaternion.clone() };
  document.documentElement.classList.add("snug-photo-mode");
  renderDock();
  const overlay = document.createElement("div");
  overlay.className = "photo-mode-ui";
  overlay.innerHTML = `<div class="photo-top"><button type="button" data-photo="close" aria-label="Exit photo mode">×</button><span><small>Photo mode</small><b>World paused</b></span></div><div class="photo-controls"><div class="pose-row"><button type="button" data-pose="calm" class="active">Calm</button><button type="button" data-pose="wave">Wave</button><button type="button" data-pose="cheer">Cheer</button><button type="button" data-pose="laugh">Laugh</button></div><div class="camera-row"><button type="button" data-camera="left" aria-label="Rotate camera left">↶</button><label><span>Zoom</span><input type="range" min="3.8" max="9.5" step="0.1" value="${town.photoDistance}"></label><button type="button" data-camera="right" aria-label="Rotate camera right">↷</button><button type="button" class="photo-shutter" data-photo="capture"><i aria-hidden="true"></i><b>Take photo</b></button></div></div>`;
  document.body.appendChild(overlay);
  overlay.querySelector("[data-photo='close']")?.addEventListener("click", exitPhotoMode);
  overlay.querySelector("[data-photo='capture']")?.addEventListener("click", capturePhoto);
  overlay.querySelectorAll("[data-pose]").forEach((button) => button.addEventListener("click", () => {
    town.photoPose = button.dataset.pose;
    overlay.querySelectorAll("[data-pose]").forEach((item) => item.classList.toggle("active", item === button));
    reactCat();
  }));
  overlay.querySelector("[data-camera='left']")?.addEventListener("click", () => { town.photoAzimuth -= 15; updatePhotoCamera(); });
  overlay.querySelector("[data-camera='right']")?.addEventListener("click", () => { town.photoAzimuth += 15; updatePhotoCamera(); });
  overlay.querySelector("input[type='range']")?.addEventListener("input", (event) => { town.photoDistance = Number(event.target.value); updatePhotoCamera(); });
  updatePhotoCamera();
}

function updatePhotoCamera() {
  if (!town.photoMode || !town.world?.camera) return;
  const player = town.world.player;
  const angle = THREE.MathUtils.degToRad(town.photoAzimuth);
  town.world.camera.position.set(player.position.x + Math.sin(angle) * town.photoDistance, town.photoHeight, player.position.z + Math.cos(angle) * town.photoDistance);
  town.world.camera.lookAt(player.position.x, 0.95, player.position.z);
}

function applyPhotoPose(time) {
  if (!town.photoMode || !town.world?.player) return;
  const player = town.world.player;
  player.position.copy(town.photoFrozenPosition);
  const data = player.userData || {};
  const pulse = Math.sin(time * 0.004);
  if (data.coinHead) data.coinHead.rotation.z = town.photoPose === "laugh" ? pulse * 0.08 : 0;
  data.hands?.forEach((hand, index) => {
    const base = data.handBases?.[index];
    if (!base) return;
    hand.position.set(base.x, base.y, base.z);
    hand.rotation.z = 0;
    if (town.photoPose === "wave" && index === 1) {
      hand.position.y = base.y + 0.58;
      hand.position.x = base.x + 0.12;
      hand.rotation.z = pulse * 0.45;
    } else if (town.photoPose === "cheer") {
      hand.position.y = base.y + 0.62;
      hand.position.x = base.x + (index ? 0.18 : -0.18);
      hand.rotation.z = index ? -0.4 : 0.4;
    } else if (town.photoPose === "laugh") {
      hand.position.y = base.y + 0.28;
      hand.position.x = base.x + (index ? -0.1 : 0.1);
    }
  });
  updatePhotoCamera();
}

function exitPhotoMode() {
  if (!town.photoMode) return;
  town.photoMode = false;
  if (town.photoCamera && town.world?.camera) {
    town.world.camera.position.copy(town.photoCamera.position);
    town.world.camera.quaternion.copy(town.photoCamera.quaternion);
  }
  $(".photo-mode-ui")?.remove();
  $(".photo-preview-backdrop")?.remove();
  if (town.photoPreviewUrl) URL.revokeObjectURL(town.photoPreviewUrl);
  town.photoPreviewUrl = "";
  document.documentElement.classList.remove("snug-photo-mode");
  renderDock();
}

function capturePhoto() {
  const { renderer, scene, camera } = town.world || {};
  if (!renderer?.domElement) return;
  try { renderer.render(scene, camera); } catch {}
  renderer.domElement.toBlob((blob) => {
    if (!blob) return showToast("The camera missed that frame. Try once more.");
    if (town.photoPreviewUrl) URL.revokeObjectURL(town.photoPreviewUrl);
    town.photoPreviewUrl = URL.createObjectURL(blob);
    const backdrop = document.createElement("div");
    backdrop.className = "photo-preview-backdrop";
    backdrop.innerHTML = `<section class="photo-preview" role="dialog" aria-modal="true" aria-labelledby="photo-preview-title"><div class="photo-preview-head"><div><small>Photo ready</small><h2 id="photo-preview-title">A moment in the plaza</h2></div><button type="button" data-preview="close" aria-label="Close photo preview">×</button></div><img src="${town.photoPreviewUrl}" alt="Captured Snug Society plaza scene"><div class="photo-preview-actions"><a download="snug-society-photo.png" href="${town.photoPreviewUrl}">Download</a>${navigator.share && typeof File !== "undefined" ? `<button type="button" data-preview="share">Share</button>` : ""}</div></section>`;
    backdrop.addEventListener("pointerdown", (event) => { if (event.target === backdrop) backdrop.remove(); });
    backdrop.querySelector("[data-preview='close']")?.addEventListener("click", () => backdrop.remove());
    backdrop.querySelector("[data-preview='share']")?.addEventListener("click", async () => {
      try {
        const file = new File([blob], "snug-society-photo.png", { type: "image/png" });
        if (navigator.canShare && !navigator.canShare({ files: [file] })) throw new Error("unsupported");
        await navigator.share({ files: [file], title: "Snug Society photo" });
      } catch (error) {
        if (error?.name !== "AbortError") showToast("Sharing is not available here. You can download instead.");
      }
    });
    document.body.appendChild(backdrop);
    window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "camera" } }));
  }, "image/png");
}

function guardPhotoInput(event) {
  if (!town.photoMode) return;
  if (event.target.closest?.(".photo-mode-ui,.photo-preview-backdrop")) return;
  event.preventDefault();
  event.stopImmediatePropagation();
}
window.addEventListener("pointerdown", guardPhotoInput, true);
window.addEventListener("pointerup", guardPhotoInput, true);
window.addEventListener("keydown", (event) => {
  if (!town.photoMode) return;
  if (event.key === "Escape") exitPhotoMode();
  else if (["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","w","a","s","d"].includes(event.key)) {
    event.preventDefault();
    event.stopImmediatePropagation();
  }
}, true);

window.addEventListener("pointerdown", (event) => {
  if (!town.cat || town.photoMode) return;
  const button = event.target.closest?.("button");
  const label = button?.textContent?.trim() || "";
  if (/^(Happy|Calm|Cheeky|Angry|Sad|Laughter|Laugh|Yawn|Side-eye|Wave)$/i.test(label)) reactCat();
}, true);

function frame(time) {
  town.world = window.__snugWorld || town.world;
  if (town.world?.mode === "village") {
    syncCatFollower();
    syncFestival();
    tickCat(time);
    tickFestival(time);
    tickGarden(time);
    if (town.festivalKind === "fireworks" && town.world.scene?.background) {
      town.world.scene.background.set(0x14233a);
      if (town.world.scene.fog?.color) town.world.scene.fog.color.set(0x14233a);
    }
    applyPhotoPose(time);
  }
  updateCameraOcclusion(time);
  if (!frame.lastDock || time - frame.lastDock > 1000) {
    frame.lastDock = time;
    renderDock();
    if (town.festival && Date.now() - Number(town.festival.startedAt) >= 600000) {
      town.festival = null;
      syncFestival();
      renderPanel();
    }
  }
  requestAnimationFrame(frame);
}

window.addEventListener("snug-session", (event) => {
  town.session = event.detail;
  loadTownLife();
});
window.addEventListener("snug-world-ready", (event) => {
  town.world = event.detail || window.__snugWorld;
  syncCatFollower(true);
  syncFestival();
  syncGardenVisuals(true);
  renderDock();
});
window.addEventListener("pagehide", () => { if (town.photoPreviewUrl) URL.revokeObjectURL(town.photoPreviewUrl); });

if (window.__snugSession) {
  town.session = window.__snugSession;
  loadTownLife();
}
town.world = window.__snugWorld || null;
renderDock();
requestAnimationFrame(frame);

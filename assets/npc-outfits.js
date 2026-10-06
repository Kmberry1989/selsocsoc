/* Signature outfits for every NPC in Cyclical City.
   Additive: the roster (assets/npc-roster.js) and the welcome bundle are never edited.
   Each NPC's body gets a painted-outfit overlay from assets/npc-outfits/ using a
   2x2 atlas grid (front/right on the top row, back/left on the bottom row).
   These outfits are NPC-only and never appear in the player's Style menu. */
(() => {
  "use strict";

  const BASE = "assets/npc-outfits/";
  const MANIFEST_PATH = BASE + "manifest.json";
  const OVERLAY_NAME = "SnugNpcOutfitOverlay";

  // 2x2 atlas bands: [uMin, uMax, vBase] — v = vBase + vertical * 0.371
  const BANDS = {
    front: { uMin: 0.03, uMax: 0.47, vBase: 0.523 },
    right: { uMin: 0.53, uMax: 0.97, vBase: 0.523 },
    back:  { uMin: 0.03, uMax: 0.47, vBase: 0.023 },
    left:  { uMin: 0.53, uMax: 0.97, vBase: 0.023 },
  };
  const BAND_ORDER = ["front", "right", "back", "left"];
  const V_SPAN = 0.371;

  // In-town NPC id -> roster mark (PrimitiveOutfit_<mark> under the roster group).
  const TOWN = {
    "lyla-lens": "LL",
    "chip-chance": "CC",
    "barnaby-bargain": "BB",
    "pip-parade": "PP",
    "agnes-alley": "AA",
    "dottie-daly": "DD",
    "peggy-plank": "PG",
    "mr-buck-coinsworth": "BC",
    "fern-bramble": "FB",
    "stanley-stamp": "SS",
    "bobby-gill": "BG",
  };

  // Welcome-bundle body mesh names -> outfit file ids.
  const WELCOME = {
    "PrimitiveOutfit_MayorMayor": "npc-mayor-mayor",
    "PrimitiveOutfit_Gideon": "npc-gideon",
    "PrimitiveOutfit_LylaLens": "npc-lyla-lens",
  };

  const state = {
    outfits: new Map(), // npcId -> { id, path }
    textureCache: new Map(),
  };

  const wrapAngle = (angle) => {
    let w = angle;
    while (w > Math.PI) w -= Math.PI * 2;
    while (w < -Math.PI) w += Math.PI * 2;
    return w;
  };

  async function loadManifest() {
    try {
      const res = await fetch(MANIFEST_PATH, { cache: "no-store" });
      if (!res.ok) throw new Error("manifest " + res.status);
      const data = await res.json();
      for (const item of data.outfits || []) {
        if (item && item.npcId && item.path) state.outfits.set(item.npcId, item);
      }
    } catch (err) {
      console.warn("[npc outfits] manifest unavailable", err);
    }
  }

  function loadImage(item) {
    if (!state.textureCache.has(item.id)) {
      state.textureCache.set(item.id, new Promise((resolve, reject) => {
        const im = new Image();
        im.decoding = "async";
        im.onload = () => resolve(im);
        im.onerror = reject;
        im.src = item.path;
      }));
    }
    return state.textureCache.get(item.id);
  }

  function makeAtlasGeometry(body) {
    const source = body.geometry.index ? body.geometry.toNonIndexed() : body.geometry.clone();
    const position = source.getAttribute("position");
    const normal = source.getAttribute("normal");
    const uv = source.getAttribute("uv");
    if (!position || !normal || !uv) return source;

    let minY = Infinity, maxY = -Infinity;
    for (let i = 0; i < position.count; i++) {
      const y = position.getY(i);
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    const height = Math.max(0.0001, maxY - minY);

    for (let start = 0; start < position.count; start += 3) {
      let nx = 0, ny = 0, nz = 0;
      for (let c = 0; c < 3; c++) {
        nx += normal.getX(start + c);
        ny += normal.getY(start + c);
        nz += normal.getZ(start + c);
      }
      if (Math.abs(ny / 3) > 0.55) {
        for (let c = 0; c < 3; c++) uv.setXY(start + c, 0.995, 0.995);
        continue;
      }
      const triAngle = Math.atan2(nx, nz);
      let sector = Math.round(triAngle / (Math.PI / 2));
      sector = ((sector % 4) + 4) % 4;
      const band = BANDS[BAND_ORDER[sector]];
      for (let c = 0; c < 3; c++) {
        const idx = start + c;
        const vAngle = Math.atan2(position.getX(idx), position.getZ(idx));
        const local = Math.max(-0.5, Math.min(0.5, wrapAngle(vAngle - sector * Math.PI / 2) / (Math.PI / 2)));
        const u = band.uMin + (local + 0.5) * (band.uMax - band.uMin);
        const vertical = (position.getY(idx) - minY) / height;
        uv.setXY(idx, u, band.vBase + vertical * V_SPAN);
      }
    }
    uv.needsUpdate = true;
    if (source.computeBoundingSphere) source.computeBoundingSphere();
    return source;
  }

  function removeOverlay(body) {
    const old = body.userData.snugNpcOutfitOverlay;
    if (old && old.parent) old.parent.remove(old);
    if (old) {
      old.geometry && old.geometry.dispose && old.geometry.dispose();
      old.material && old.material.map && old.material.map.dispose && old.material.map.dispose();
      old.material && old.material.dispose && old.material.dispose();
    }
    body.userData.snugNpcOutfitOverlay = null;
  }

  async function applyOutfit(body, npcId) {
    if (!body || !body.geometry || !body.material) return;
    const item = state.outfits.get(npcId);
    if (!item) return;
    if (body.userData.snugNpcOutfitId === item.id) return;
    removeOverlay(body);
    try {
      const image = await loadImage(item);
      if (body.userData.snugNpcOutfitId) return; // re-fired while loading
      const baseMap = Array.isArray(body.material) ? body.material[0] && body.material[0].map : body.material.map;
      const TextureCtor = (baseMap && baseMap.constructor) || (window.THREE && window.THREE.Texture);
      if (!TextureCtor) return;
      const texture = new TextureCtor(image);
      texture.name = "NpcOutfitAtlas_" + item.id;
      if (baseMap && baseMap.colorSpace !== undefined) texture.colorSpace = baseMap.colorSpace;
      texture.flipY = true;
      texture.needsUpdate = true;
      const baseMaterial = Array.isArray(body.material) ? body.material[0] : body.material;
      const material = baseMaterial.clone();
      material.name = "NpcOutfit_" + item.id;
      material.map = texture;
      material.bumpMap = null;
      material.normalMap = null;
      material.roughnessMap = null;
      material.metalnessMap = null;
      material.transparent = true;
      material.alphaTest = 0.02;
      material.depthWrite = false;
      if (material.color && material.color.set) material.color.set("#ffffff");
      material.needsUpdate = true;
      const overlay = new body.constructor(makeAtlasGeometry(body), material);
      overlay.name = OVERLAY_NAME;
      overlay.scale.set(1.012, 1.004, 1.012);
      overlay.renderOrder = 4;
      overlay.castShadow = false;
      overlay.receiveShadow = false;
      body.add(overlay);
      body.userData.snugNpcOutfitOverlay = overlay;
      body.userData.snugNpcOutfitId = item.id;
    } catch (err) {
      console.warn("[npc outfits] could not apply " + item.id, err);
    }
  }

  function findMesh(root, name) {
    let found = null;
    if (root && root.traverse) {
      root.traverse((o) => { if (!found && o.name === name) found = o; });
    }
    return found;
  }

  // In-town NPCs: re-applied every time the roster rebuilds.
  window.addEventListener("snug-npc-roster-ready", (e) => {
    const group = e.detail && e.detail.group;
    if (!group) return;
    for (const [npcId, mark] of Object.entries(TOWN)) {
      const body = findMesh(group, "PrimitiveOutfit_" + mark);
      if (body) applyOutfit(body, npcId);
    }
  });

  // Welcome bundle: poll like npc-faces.js does (no ready event, lazy build).
  let welcomeTries = 0;
  const welcomeTimer = setInterval(() => {
    const scene = window.__snugWorld && window.__snugWorld.scene;
    let remaining = 0;
    if (scene) {
      for (const [meshName, outfitId] of Object.entries(WELCOME)) {
        const npcId = outfitId.replace(/^npc-/, "");
        const body = findMesh(scene, meshName);
        const want = state.outfits.get(npcId);
        if (body && want && body.userData.snugNpcOutfitId !== want.id) {
          applyOutfit(body, npcId);
          remaining += 1;
        } else if (!body) {
          remaining += 1;
        }
      }
    } else {
      remaining = 3;
    }
    if (remaining === 0 || (welcomeTries > 150 && !window.__snugWelcomeActive)) {
      clearInterval(welcomeTimer);
      return;
    }
    if (!window.__snugWelcomeActive) welcomeTries += 1;
    else welcomeTries = 0;
  }, 2000);

  loadManifest();
})();

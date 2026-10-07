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
    panelRects: new Map(),
  };

  // Panel inset regions in image px (y down), per quadrant. The insets already
  // crop the baked-in labels, gutters and "TOP" markers.
  function quadrantRegions(w, h) {
    const q = Math.min(w, h) / 2;
    const quads = [
      { x: 0, y: 0 }, { x: q, y: 0 }, { x: 0, y: q }, { x: q, y: q }
    ];
    return quads.map((quad) => ({
      x0: Math.floor(quad.x + 0.03 * w),
      x1: Math.ceil(quad.x + 0.47 * w),
      y0: Math.floor(quad.y + (1 - 0.894) * h),
      y1: Math.ceil(quad.y + (1 - 0.523) * h)
    }));
  }

  // Garment-fit: find each quadrant's painted garment bounds (excluding the
  // panel backing) so the garment stretches edge-to-edge on the cube faces.
  function analyzePanels(image) {
    const w = image.naturalWidth || image.width;
    const h = image.naturalHeight || image.height;
    if (!w || !h) return null;
    const regions = quadrantRegions(w, h);
    const scale = Math.min(1, 256 / w);
    const cw = Math.max(1, Math.round(w * scale));
    const ch = Math.max(1, Math.round(h * scale));
    const canvas = document.createElement("canvas");
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    ctx.drawImage(image, 0, 0, cw, ch);
    let data;
    try {
      data = ctx.getImageData(0, 0, cw, ch).data;
    } catch (err) {
      return null;
    }
    const px = (x, y) => {
      const i = (y * cw + x) * 4;
      return [data[i], data[i + 1], data[i + 2]];
    };
    return regions.map((r) => {
      const x0 = Math.floor(r.x0 * scale), x1 = Math.ceil(r.x1 * scale);
      const y0 = Math.floor(r.y0 * scale), y1 = Math.ceil(r.y1 * scale);
      const border = [];
      for (let x = x0; x < x1; x += 2) border.push(px(x, y0), px(x, y1 - 1));
      for (let y = y0; y < y1; y += 2) border.push(px(x0, y), px(x1 - 1, y));
      const med = [0, 1, 2].map((c) => {
        const vals = border.map((v) => v[c]).sort((a, b) => a - b);
        return vals[Math.floor(vals.length / 2)] || 0;
      });
      const diff = (v) => Math.max(Math.abs(v[0] - med[0]), Math.abs(v[1] - med[1]), Math.abs(v[2] - med[2]));
      // Connected components of non-background pixels: keeps the garment while
      // dropping baked-in labels and markers (separate, much smaller blobs).
      const rw = x1 - x0, rh = y1 - y0;
      const cmask = new Uint8Array(rw * rh);
      for (let yy = 0; yy < rh; yy += 1) {
        for (let xx = 0; xx < rw; xx += 2) {
          if (diff(px(x0 + xx, y0 + yy)) > 28) cmask[yy * rw + xx] = 1;
        }
      }
      const cseen = new Uint8Array(rw * rh);
      const ccomps = [];
      const cstack = [];
      for (let ci = 0; ci < rw * rh; ci += 1) {
        if (!cmask[ci] || cseen[ci]) continue;
        let cbx0 = rw, cby0 = rh, cbx1 = -1, cby1 = -1, carea = 0;
        cstack.push(ci); cseen[ci] = 1;
        while (cstack.length) {
          const cc = cstack.pop();
          const ccx = cc % rw, ccy = (cc / rw) | 0;
          carea += 1;
          if (ccx < cbx0) cbx0 = ccx; if (ccx > cbx1) cbx1 = ccx;
          if (ccy < cby0) cby0 = ccy; if (ccy > cby1) cby1 = ccy;
          if (ccx > 0 && cmask[cc - 1] && !cseen[cc - 1]) { cseen[cc - 1] = 1; cstack.push(cc - 1); }
          if (ccx < rw - 1 && cmask[cc + 1] && !cseen[cc + 1]) { cseen[cc + 1] = 1; cstack.push(cc + 1); }
          if (ccy > 0 && cmask[cc - rw] && !cseen[cc - rw]) { cseen[cc - rw] = 1; cstack.push(cc - rw); }
          if (ccy < rh - 1 && cmask[cc + rw] && !cseen[cc + rw]) { cseen[cc + rw] = 1; cstack.push(cc + rw); }
        }
        ccomps.push({ area: carea, bx0: cbx0, by0: cby0, bx1: cbx1, by1: cby1 });
      }
      ccomps.sort((a, b) => b.area - a.area);
      const biggest = ccomps.length ? ccomps[0].area : 0;
      const keep = ccomps.filter((c) => c.area >= biggest * 0.4);
      let bx0 = x1, by0 = y1, bx1 = x0, by1 = y0;
      for (const kc of keep) {
        if (kc.bx0 < bx0) bx0 = kc.bx0;
        if (kc.by0 < by0) by0 = kc.by0;
        if (kc.bx1 > bx1) bx1 = kc.bx1;
        if (kc.by1 > by1) by1 = kc.by1;
      }
      bx0 += x0; by0 += y0; bx1 += x0; by1 += y0;
      const area = (bx1 - bx0) * (by1 - by0);
      if (!keep.length || area < (x1 - x0) * (y1 - y0) * 0.12) {
        bx0 = x0; by0 = y0; bx1 = x1; by1 = y1;
      }
      const padX = Math.max(1, Math.round((bx1 - bx0) * 0.02));
      const padY = Math.max(1, Math.round((by1 - by0) * 0.02));
      bx0 = Math.max(x0, bx0 - padX); by0 = Math.max(y0, by0 - padY);
      bx1 = Math.min(x1, bx1 + padX); by1 = Math.min(y1, by1 + padY);
      const corners = [[x0 + 2, y0 + 2], [x1 - 3, y0 + 2], [x0 + 2, y1 - 3], [x1 - 3, y1 - 3]];
      let cap = corners[0], capD = Infinity;
      for (const cpt of corners) {
        const d = diff(px(cpt[0], cpt[1]));
        if (d < capD) { capD = d; cap = cpt; }
      }
      const S = 1 / scale;
      return {
        uMin: (bx0 * S) / w,
        uMax: (bx1 * S) / w,
        vMin: 1 - (by1 * S) / h,
        vMax: 1 - (by0 * S) / h,
        capU: (cap[0] * S) / w,
        capV: 1 - (cap[1] * S) / h
      };
    });
  }

  function panelRectsFor(item, image) {
    if (!state.panelRects.has(item.id)) {
      state.panelRects.set(item.id, analyzePanels(image));
    }
    return state.panelRects.get(item.id);
  }

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

  function makeAtlasGeometry(body, rects) {
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
      const triAngle = Math.atan2(nx, nz);
      let sector = Math.round(triAngle / (Math.PI / 2));
      sector = ((sector % 4) + 4) % 4;
      const bandName = BAND_ORDER[sector];
      const band = BANDS[bandName];
      const rect = rects && rects[sector];
      if (Math.abs(ny / 3) > 0.55) {
        const cu = rect ? rect.capU : 0.995;
        const cv = rect ? rect.capV : 0.995;
        for (let c = 0; c < 3; c++) uv.setXY(start + c, cu, cv);
        continue;
      }
      for (let c = 0; c < 3; c++) {
        const idx = start + c;
        const vAngle = Math.atan2(position.getX(idx), position.getZ(idx));
        const local = Math.max(-0.5, Math.min(0.5, wrapAngle(vAngle - sector * Math.PI / 2) / (Math.PI / 2)));
        const u = rect
          ? rect.uMin + (local + 0.5) * (rect.uMax - rect.uMin)
          : band.uMin + (local + 0.5) * (band.uMax - band.uMin);
        const vertical = (position.getY(idx) - minY) / height;
        const v = rect
          ? rect.vMin + vertical * (rect.vMax - rect.vMin)
          : band.vBase + vertical * V_SPAN;
        uv.setXY(idx, u, v);
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
      const overlay = new body.constructor(makeAtlasGeometry(body, panelRectsFor(item, image)), material);
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

(() => {
  'use strict';

  const MANIFEST_PATH = 'assets/outfit-textures/manifest.json';
  const OVERLAY_NAME = 'SnugPaintedOutfitOverlay';
  const ROW_ID = 'snug-painted-outfit-row';
  const atlasBands = [
    { name: 'front', min: 0.047, max: 0.234, center: 0 },
    { name: 'right', min: 0.281, max: 0.469, center: Math.PI / 2 },
    { name: 'back', min: 0.531, max: 0.719, center: Math.PI },
    { name: 'left', min: 0.766, max: 0.953, center: -Math.PI / 2 }
  ];

  const state = {
    outfits: [],
    selectedId: '',
    activeBody: null,
    activeOverlay: null,
    textureCache: new Map(),
    panelRects: new Map()
  };

  // Garment-fit: find each panel's painted garment bounds (excluding the panel
  // backing, labels and gutters) so the garment stretches edge-to-edge on the
  // cube body faces instead of floating in backing-colored margins.
  function analyzePanels(image) {
    const w = image.naturalWidth || image.width;
    const h = image.naturalHeight || image.height;
    if (!w || !h) return null;
    const regions = atlasBands.map((band) => ({
      // inset band region in image px (y down); insets already crop labels/gutters
      x0: Math.floor(band.min * w),
      x1: Math.ceil(band.max * w),
      y0: Math.floor((1 - 0.907) * h),
      y1: Math.ceil((1 - 0.094) * h)
    }));
    const scale = Math.min(1, 256 / w);
    const cw = Math.max(1, Math.round(w * scale));
    const ch = Math.max(1, Math.round(h * scale));
    const canvas = document.createElement('canvas');
    canvas.width = cw;
    canvas.height = ch;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
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
    const rects = regions.map((r) => {
      const x0 = Math.floor(r.x0 * scale), x1 = Math.ceil(r.x1 * scale);
      const y0 = Math.floor(r.y0 * scale), y1 = Math.ceil(r.y1 * scale);
      // background = median of region border pixels (robust to art touching edges)
      const border = [];
      for (let x = x0; x < x1; x += 2) {
        border.push(px(x, y0), px(x, y1 - 1));
      }
      for (let y = y0; y < y1; y += 2) {
        border.push(px(x0, y), px(x1 - 1, y));
      }
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
      const regionArea = (x1 - x0) * (y1 - y0);
      if (!keep.length || area < regionArea * 0.12) {
        bx0 = x0; by0 = y0; bx1 = x1; by1 = y1; // fallback: whole inset region
      }
      // pad slightly so anti-aliased garment edges are not clipped
      const padX = Math.max(1, Math.round((bx1 - bx0) * 0.02));
      const padY = Math.max(1, Math.round((by1 - by0) * 0.02));
      bx0 = Math.max(x0, bx0 - padX); by0 = Math.max(y0, by0 - padY);
      bx1 = Math.min(x1, bx1 + padX); by1 = Math.min(y1, by1 + padY);
      // cap sample: inset corner closest to the background color
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
    return rects;
  }

  function panelRectsFor(item, image) {
    if (!state.panelRects.has(item.id)) {
      state.panelRects.set(item.id, analyzePanels(image));
    }
    return state.panelRects.get(item.id);
  }

  const escapeText = (value) => String(value ?? '');
  const wrapAngle = (angle) => {
    let wrapped = angle;
    while (wrapped > Math.PI) wrapped -= Math.PI * 2;
    while (wrapped < -Math.PI) wrapped += Math.PI * 2;
    return wrapped;
  };

  function validOutfit(item) {
    if (item?.npcOnly === true) return null; // NPC signature outfits never enter the player selector
    const id = String(item?.id || '');
    const name = String(item?.name || '');
    const path = String(item?.path || '');
    return id && name && /^assets\/outfit-textures\/[a-z0-9][a-z0-9-]*\.(?:png|webp)$/i.test(path)
      ? { ...item, id, name, path, type: 'texture-outfit' }
      : null;
  }

  async function loadManifest() {
    try {
      const response = await fetch(MANIFEST_PATH, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Texture outfit manifest ${response.status}`);
      const source = await response.json();
      const seen = new Set();
      state.outfits = (Array.isArray(source?.outfits) ? source.outfits : [])
        .map(validOutfit)
        .filter((item) => item && !seen.has(item.id) && seen.add(item.id))
        .sort((a, b) => a.name.localeCompare(b.name));
      window.__snugTextureOutfits = state.outfits;
      window.dispatchEvent(new CustomEvent('snug-texture-outfits-ready', { detail: state.outfits }));
    } catch (error) {
      state.outfits = [];
      console.warn('[painted outfits] manifest unavailable', error);
    }
  }

  function currentAvatar() {
    return window.__snugPlayerAvatar || window.__snugWorld?.player || null;
  }

  function removeOverlay() {
    const overlay = state.activeOverlay;
    if (overlay?.parent) overlay.parent.remove(overlay);
    overlay?.geometry?.dispose?.();
    overlay?.material?.map?.dispose?.();
    overlay?.material?.dispose?.();
    state.activeOverlay = null;
    state.activeBody = null;
  }

  function loadImage(item) {
    if (!state.textureCache.has(item.id)) {
      state.textureCache.set(item.id, new Promise((resolve, reject) => {
        const image = new Image();
        image.decoding = 'async';
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error(`Could not load ${item.path}`));
        image.src = item.path;
      }));
    }
    return state.textureCache.get(item.id);
  }

  function makeAtlasGeometry(body, rects) {
    const source = body.geometry.index ? body.geometry.toNonIndexed() : body.geometry.clone();
    const position = source.getAttribute('position');
    const normal = source.getAttribute('normal');
    const uv = source.getAttribute('uv');
    if (!position || !normal || !uv) return source;

    let minY = Infinity;
    let maxY = -Infinity;
    for (let index = 0; index < position.count; index += 1) {
      const y = position.getY(index);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }
    const height = Math.max(0.0001, maxY - minY);

    for (let start = 0; start < position.count; start += 3) {
      let nx = 0;
      let ny = 0;
      let nz = 0;
      for (let corner = 0; corner < 3; corner += 1) {
        nx += normal.getX(start + corner);
        ny += normal.getY(start + corner);
        nz += normal.getZ(start + corner);
      }
      const isCap = Math.abs(ny / 3) > 0.55;
      const triangleAngle = Math.atan2(nx, nz);
      let sector = Math.round(triangleAngle / (Math.PI / 2));
      sector = ((sector % 4) + 4) % 4;
      const bandIndex = sector === 0 ? 0 : sector === 1 ? 1 : sector === 2 ? 2 : 3;
      const band = atlasBands[bandIndex];
      const rect = rects && rects[bandIndex];
      if (isCap) {
        const cu = rect ? rect.capU : 0.995;
        const cv = rect ? rect.capV : 0.995;
        for (let corner = 0; corner < 3; corner += 1) uv.setXY(start + corner, cu, cv);
        continue;
      }

      for (let corner = 0; corner < 3; corner += 1) {
        const index = start + corner;
        const vertexAngle = Math.atan2(position.getX(index), position.getZ(index));
        const local = Math.max(-0.5, Math.min(0.5, wrapAngle(vertexAngle - band.center) / (Math.PI / 2)));
        const u = rect
          ? rect.uMin + (local + 0.5) * (rect.uMax - rect.uMin)
          : band.min + (local + 0.5) * (band.max - band.min);
        const vertical = (position.getY(index) - minY) / height;
        const v = rect
          ? rect.vMin + vertical * (rect.vMax - rect.vMin)
          : 0.094 + vertical * 0.813;
        uv.setXY(index, u, v);
      }
    }
    uv.needsUpdate = true;
    source.computeBoundingSphere?.();
    return source;
  }

  function makeTexture(body, image) {
    const baseMap = Array.isArray(body.material) ? body.material[0]?.map : body.material?.map;
    if (!baseMap?.constructor) return null;
    const texture = new baseMap.constructor(image);
    texture.name = 'PaintedOutfitAtlas';
    texture.colorSpace = baseMap.colorSpace;
    texture.flipY = true;
    texture.premultiplyAlpha = false;
    texture.anisotropy = baseMap.anisotropy || 1;
    texture.needsUpdate = true;
    return texture;
  }

  async function applyCurrentOutfit(force = false) {
    const avatar = currentAvatar();
    const body = avatar?.userData?.body;
    if (!body?.geometry || !body?.material) return;

    if (!state.selectedId) {
      if (state.activeOverlay) removeOverlay();
      return;
    }
    if (!force && state.activeBody === body && state.activeOverlay?.parent === body) return;

    const item = state.outfits.find((entry) => entry.id === state.selectedId);
    if (!item) return;
    removeOverlay();

    try {
      const image = await loadImage(item);
      if (state.selectedId !== item.id || currentAvatar()?.userData?.body !== body) return;
      const texture = makeTexture(body, image);
      if (!texture) return;
      const rects = panelRectsFor(item, image);
      const geometry = makeAtlasGeometry(body, rects);
      const baseMaterial = Array.isArray(body.material) ? body.material[0] : body.material;
      const material = baseMaterial.clone();
      material.name = `PaintedOutfit_${item.id}`;
      material.map = texture;
      material.bumpMap = null;
      material.normalMap = null;
      material.roughnessMap = null;
      material.metalnessMap = null;
      material.transparent = true;
      material.alphaTest = 0.02;
      material.depthWrite = false;
      material.premultipliedAlpha = false;
      material.color?.set?.('#ffffff');
      material.roughness = 0.9;
      material.metalness = 0;
      material.needsUpdate = true;

      const overlay = new body.constructor(geometry, material);
      overlay.name = OVERLAY_NAME;
      overlay.userData.snugTextureOutfit = item.id;
      overlay.scale.set(1.012, 1.004, 1.012);
      overlay.renderOrder = 4;
      overlay.castShadow = false;
      overlay.receiveShadow = false;
      body.add(overlay);
      state.activeBody = body;
      state.activeOverlay = overlay;
    } catch (error) {
      console.warn('[painted outfits] texture unavailable', error);
    }
  }

  function originalOutfitSelect(root = document) {
    return Array.from(root.querySelectorAll('.cosmetic-select-row')).find((row) => {
      return row.id !== ROW_ID && row.querySelector(':scope > span')?.textContent?.trim() === 'Outfit';
    })?.querySelector('select') || null;
  }

  function clearThreeDimensionalOutfit() {
    const select = originalOutfitSelect();
    if (!select || !select.value) return;
    select.value = '';
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  // Seasonal outfits (manifest `unlock.season`) stay hidden until owned.
  // Free outfits are always visible. Never invents ownership.
  function visibleOutfits() {
    const owns = window.__snugWardrobe?.owns;
    return state.outfits.filter((item) => {
      if (!item?.unlock?.season) return true;
      return typeof owns === 'function' ? owns(item.id) === true : false;
    });
  }

  function persistSelection() {
    try { window.__snugWardrobe?.setPaintedOutfit?.(state.selectedId); } catch (_) {}
  }

  function restoreSelection() {
    if (state.selectedId) return;
    let saved = '';
    try { saved = String(window.__snugWardrobe?.profile?.()?.equippedAppearance?.paintedOutfit || ''); } catch (_) {}
    if (saved && visibleOutfits().some((item) => item.id === saved)) {
      state.selectedId = saved;
    }
  }

  function refreshPaintedOutfitOptions() {
    const select = document.querySelector(`#${ROW_ID} select`);
    if (!select) return;
    const visible = visibleOutfits();
    // Keep the current selection only if it's still visible.
    if (state.selectedId && !visible.some((item) => item.id === state.selectedId)) {
      state.selectedId = '';
      persistSelection();
    }
    while (select.options.length > 1) select.remove(1);
    visible.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;
      select.appendChild(option);
    });
    select.value = state.selectedId;
  }

  function buildPaintedOutfitRow(container) {
    let row = container.querySelector(`#${ROW_ID}`);
    if (row) return row;
    row = document.createElement('label');
    row.id = ROW_ID;
    row.className = 'cosmetic-select-row snug-painted-outfit-row';

    const label = document.createElement('span');
    label.textContent = 'Painted outfit';
    const select = document.createElement('select');
    select.setAttribute('aria-label', 'Painted outfit texture');
    const none = document.createElement('option');
    none.value = '';
    none.textContent = 'None · use 3D outfit';
    select.appendChild(none);
    visibleOutfits().forEach((item) => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;
      select.appendChild(option);
    });
    select.value = state.selectedId;
    select.addEventListener('change', () => {
      state.selectedId = select.value;
      if (state.selectedId) clearThreeDimensionalOutfit();
      persistSelection();
      applyCurrentOutfit(true);
      window.dispatchEvent(new CustomEvent('snug-texture-outfit-change', {
        detail: state.outfits.find((item) => item.id === state.selectedId) || null
      }));
    });
    row.append(label, select);

    const outfitRow = Array.from(container.querySelectorAll('.cosmetic-select-row')).find((candidate) => {
      return candidate.querySelector(':scope > span')?.textContent?.trim() === 'Outfit';
    });
    if (outfitRow?.nextSibling) container.insertBefore(row, outfitRow.nextSibling);
    else container.appendChild(row);
    return row;
  }

  function syncStyleMenu() {
    document.querySelectorAll('.cosmetic-selects').forEach(buildPaintedOutfitRow);
  }

  document.addEventListener('change', (event) => {
    const select = event.target?.closest?.('.cosmetic-select-row select');
    if (!select || select.closest(`#${ROW_ID}`)) return;
    const row = select.closest('.cosmetic-select-row');
    if (row?.querySelector(':scope > span')?.textContent?.trim() === 'Outfit' && select.value && state.selectedId) {
      state.selectedId = '';
      const paintedSelect = document.querySelector(`#${ROW_ID} select`);
      if (paintedSelect) paintedSelect.value = '';
      removeOverlay();
    }
  }, true);

  window.addEventListener('snug-world-ready', () => applyCurrentOutfit(true));
  window.addEventListener('snug-session', () => {
    restoreSelection();
    refreshPaintedOutfitOptions();
    applyCurrentOutfit(true);
  });
  // Inventory changes (e.g. claiming a seasonal outfit) reveal newly owned outfits.
  window.addEventListener('snug-player-patch', () => {
    refreshPaintedOutfitOptions();
  });
  window.__snugApplyTextureOutfit = (id = '') => {
    state.selectedId = visibleOutfits().some((item) => item.id === id) ? id : '';
    syncStyleMenu();
    const select = document.querySelector(`#${ROW_ID} select`);
    if (select) select.value = state.selectedId;
    if (state.selectedId) clearThreeDimensionalOutfit();
    persistSelection();
    return applyCurrentOutfit(true);
  };

  loadManifest().finally(() => {
    restoreSelection();
    syncStyleMenu();
    refreshPaintedOutfitOptions();
    // Throttled (was 600ms): skip while the tab is hidden.
    setInterval(() => {
      if (document.hidden) return;
      syncStyleMenu();
      refreshPaintedOutfitOptions();
      applyCurrentOutfit();
    }, 2000);
  });
})();

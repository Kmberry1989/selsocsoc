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
    textureCache: new Map()
  };

  const escapeText = (value) => String(value ?? '');
  const wrapAngle = (angle) => {
    let wrapped = angle;
    while (wrapped > Math.PI) wrapped -= Math.PI * 2;
    while (wrapped < -Math.PI) wrapped += Math.PI * 2;
    return wrapped;
  };

  function validOutfit(item) {
    const id = String(item?.id || '');
    const name = String(item?.name || '');
    const path = String(item?.path || '');
    return id && name && /^assets\/outfit-textures\/[a-z0-9][a-z0-9-]*\.png$/i.test(path)
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

  function makeAtlasGeometry(body) {
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
      const cap = Math.abs(ny / 3) > 0.55;
      if (cap) {
        for (let corner = 0; corner < 3; corner += 1) uv.setXY(start + corner, 0.995, 0.995);
        continue;
      }

      const triangleAngle = Math.atan2(nx, nz);
      let sector = Math.round(triangleAngle / (Math.PI / 2));
      sector = ((sector % 4) + 4) % 4;
      const band = atlasBands[sector === 0 ? 0 : sector === 1 ? 1 : sector === 2 ? 2 : 3];

      for (let corner = 0; corner < 3; corner += 1) {
        const index = start + corner;
        const vertexAngle = Math.atan2(position.getX(index), position.getZ(index));
        const local = Math.max(-0.5, Math.min(0.5, wrapAngle(vertexAngle - band.center) / (Math.PI / 2)));
        const u = band.min + (local + 0.5) * (band.max - band.min);
        const vertical = (position.getY(index) - minY) / height;
        const v = 0.094 + vertical * 0.813;
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
      const geometry = makeAtlasGeometry(body);
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
    state.outfits.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;
      select.appendChild(option);
    });
    select.value = state.selectedId;
    select.addEventListener('change', () => {
      state.selectedId = select.value;
      if (state.selectedId) clearThreeDimensionalOutfit();
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
  window.__snugApplyTextureOutfit = (id = '') => {
    state.selectedId = state.outfits.some((item) => item.id === id) ? id : '';
    syncStyleMenu();
    const select = document.querySelector(`#${ROW_ID} select`);
    if (select) select.value = state.selectedId;
    if (state.selectedId) clearThreeDimensionalOutfit();
    return applyCurrentOutfit(true);
  };

  loadManifest().finally(() => {
    syncStyleMenu();
    setInterval(() => {
      syncStyleMenu();
      applyCurrentOutfit();
    }, 600);
  });
})();

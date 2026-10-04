/* snug-painted-accessories-v1
 * Painted 2D accessories that fit by construction — no 3D geometry, no fit review.
 *
 * Two overlay techniques:
 *  - Face wear: clones the avatar's face plane (0.82m quad, standard UVs),
 *    offsets it +4mm in head-local space, and paints glasses/masks/headbands
 *    with transparency. Follows the head automatically.
 *  - Neckwear: clones the body geometry with the same 4-band atlas UV remap
 *    as painted outfits, painting scarves/ties/necklaces at the neck region.
 *    Follows body-mass and height changes automatically.
 *
 * Style menu rows ("Painted face wear", "Painted neckwear") are injected after
 * the matching 3D slots. Selecting a painted accessory clears the 3D slot and
 * vice versa. Tint pickers are auto-injected by accessory-tinting.js; tinting
 * works because overlays carry userData.snugCosmeticId.
 */
(() => {
  'use strict';

  const MANIFEST_PATH = 'assets/painted-accessories/manifest.json';
  const FACE_ROW_ID = 'snug-painted-facewear-row';
  const NECK_ROW_ID = 'snug-painted-neckwear-row';
  const FACE_OVERLAY_NAME = 'SnugPaintedFaceWearOverlay';
  const NECK_OVERLAY_NAME = 'SnugPaintedNeckWearOverlay';
  const FACE_Z_LIFT = 0.004;

  const atlasBands = [
    { name: 'front', min: 0.047, max: 0.234, center: 0 },
    { name: 'right', min: 0.281, max: 0.469, center: Math.PI / 2 },
    { name: 'back', min: 0.531, max: 0.719, center: Math.PI },
    { name: 'left', min: 0.766, max: 0.953, center: -Math.PI / 2 }
  ];

  const state = {
    faceWear: [],
    neckwear: [],
    selectedFaceWear: '',
    selectedNeckwear: '',
    activeFace: null,
    activeFaceOverlay: null,
    activeNeckBody: null,
    activeNeckOverlay: null,
    textureCache: new Map()
  };

  const currentAvatar = () => window.__snugPlayerAvatar || window.__snugWorld?.player || null;
  const wrapAngle = (angle) => {
    let wrapped = angle;
    while (wrapped > Math.PI) wrapped -= Math.PI * 2;
    while (wrapped < -Math.PI) wrapped += Math.PI * 2;
    return wrapped;
  };

  function validItem(item) {
    const id = String(item?.id || '');
    const name = String(item?.name || '');
    const path = String(item?.path || '');
    return id && name && /^assets\/painted-accessories\/(face-wear|neckwear)\/[a-z0-9][a-z0-9-]*\.(?:png|webp)$/i.test(path)
      ? { ...item, id, name, path, type: 'painted-accessory' }
      : null;
  }

  async function loadManifest() {
    try {
      const response = await fetch(MANIFEST_PATH, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Painted accessory manifest ${response.status}`);
      const source = await response.json();
      const seenFace = new Set();
      const seenNeck = new Set();
      state.faceWear = (Array.isArray(source?.faceWear) ? source.faceWear : [])
        .map(validItem)
        .filter((item) => item && !seenFace.has(item.id) && seenFace.add(item.id))
        .sort((a, b) => a.name.localeCompare(b.name));
      state.neckwear = (Array.isArray(source?.neckwear) ? source.neckwear : [])
        .map(validItem)
        .filter((item) => item && !seenNeck.has(item.id) && seenNeck.add(item.id))
        .sort((a, b) => a.name.localeCompare(b.name));
      window.__snugPaintedAccessories = { faceWear: state.faceWear, neckwear: state.neckwear };
      window.dispatchEvent(new CustomEvent('snug-painted-accessories-ready',
        { detail: { faceWear: state.faceWear, neckwear: state.neckwear } }));
    } catch (error) {
      state.faceWear = [];
      state.neckwear = [];
      console.warn('[painted accessories] manifest unavailable', error);
    }
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

  /* ---------- face-wear overlay ---------- */

  function removeFaceOverlay() {
    const overlay = state.activeFaceOverlay;
    if (overlay?.parent) overlay.parent.remove(overlay);
    overlay?.geometry?.dispose?.();
    overlay?.material?.map?.dispose?.();
    overlay?.material?.dispose?.();
    state.activeFaceOverlay = null;
    state.activeFace = null;
  }

  async function applyFaceWear(force = false) {
    const avatar = currentAvatar();
    const face = avatar?.userData?.face;
    const head = avatar?.userData?.coinHead;
    if (!face?.geometry || !head) {
      if (state.activeFaceOverlay) removeFaceOverlay();
      return;
    }
    if (!state.selectedFaceWear) {
      if (state.activeFaceOverlay) removeFaceOverlay();
      return;
    }
    if (!force && state.activeFace === face && state.activeFaceOverlay?.parent) return;

    const item = state.faceWear.find((entry) => entry.id === state.selectedFaceWear);
    if (!item) return;
    removeFaceOverlay();

    try {
      const image = await loadImage(item);
      if (state.selectedFaceWear !== item.id || currentAvatar()?.userData?.face !== face) return;
      const baseMap = face.material?.map;
      const TextureCtor = baseMap?.constructor || window.THREE?.Texture;
      if (!TextureCtor) return;
      const texture = new TextureCtor(image);
      texture.name = `PaintedFaceWear_${item.id}`;
      if (baseMap?.colorSpace !== undefined) texture.colorSpace = baseMap.colorSpace;
      texture.flipY = true;
      texture.premultiplyAlpha = false;
      texture.anisotropy = baseMap?.anisotropy || 1;
      texture.needsUpdate = true;

      const geometry = face.geometry.clone();
      const material = face.material.clone();
      material.name = `PaintedFaceWear_${item.id}`;
      material.map = texture;
      material.transparent = true;
      material.alphaTest = 0.02;
      material.depthWrite = false;
      if (material.color?.set) material.color.set('#ffffff');
      material.needsUpdate = true;

      const overlay = new face.constructor(geometry, material);
      overlay.name = FACE_OVERLAY_NAME;
      overlay.position.copy(face.position);
      overlay.position.z += FACE_Z_LIFT;
      overlay.rotation.copy(face.rotation);
      overlay.scale.copy(face.scale);
      overlay.renderOrder = (face.renderOrder || 3) + 1;
      overlay.castShadow = false;
      overlay.receiveShadow = false;
      overlay.userData.snugCosmeticId = item.id;
      overlay.userData.snugPaintedFaceWear = item.id;
      head.add(overlay);
      state.activeFace = face;
      state.activeFaceOverlay = overlay;
      reapplyStoredTints();
    } catch (error) {
      console.warn('[painted accessories] face-wear texture unavailable', error);
    }
  }

  /* ---------- neckwear overlay (body atlas) ---------- */

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
      let nx = 0, ny = 0, nz = 0;
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

  function removeNeckOverlay() {
    const overlay = state.activeNeckOverlay;
    if (overlay?.parent) overlay.parent.remove(overlay);
    overlay?.geometry?.dispose?.();
    overlay?.material?.map?.dispose?.();
    overlay?.material?.dispose?.();
    state.activeNeckOverlay = null;
    state.activeNeckBody = null;
  }

  async function applyNeckwear(force = false) {
    const avatar = currentAvatar();
    const body = avatar?.userData?.body;
    if (!body?.geometry || !body?.material) {
      if (state.activeNeckOverlay) removeNeckOverlay();
      return;
    }
    if (!state.selectedNeckwear) {
      if (state.activeNeckOverlay) removeNeckOverlay();
      return;
    }
    if (!force && state.activeNeckBody === body && state.activeNeckOverlay?.parent === body) return;

    const item = state.neckwear.find((entry) => entry.id === state.selectedNeckwear);
    if (!item) return;
    removeNeckOverlay();

    try {
      const image = await loadImage(item);
      if (state.selectedNeckwear !== item.id || currentAvatar()?.userData?.body !== body) return;
      const baseMap = Array.isArray(body.material) ? body.material[0]?.map : body.material?.map;
      const TextureCtor = baseMap?.constructor || window.THREE?.Texture;
      if (!TextureCtor) return;
      const texture = new TextureCtor(image);
      texture.name = `PaintedNeckwear_${item.id}`;
      if (baseMap?.colorSpace !== undefined) texture.colorSpace = baseMap.colorSpace;
      texture.flipY = true;
      texture.premultiplyAlpha = false;
      texture.anisotropy = baseMap?.anisotropy || 1;
      texture.needsUpdate = true;

      const geometry = makeAtlasGeometry(body);
      const baseMaterial = Array.isArray(body.material) ? body.material[0] : body.material;
      const material = baseMaterial.clone();
      material.name = `PaintedNeckwear_${item.id}`;
      material.map = texture;
      material.bumpMap = null;
      material.normalMap = null;
      material.roughnessMap = null;
      material.metalnessMap = null;
      material.transparent = true;
      material.alphaTest = 0.02;
      material.depthWrite = false;
      if (material.color?.set) material.color.set('#ffffff');
      material.roughness = 0.9;
      material.metalness = 0;
      material.needsUpdate = true;

      const overlay = new body.constructor(geometry, material);
      overlay.name = NECK_OVERLAY_NAME;
      overlay.userData.snugCosmeticId = item.id;
      overlay.userData.snugPaintedNeckwear = item.id;
      // Sit just proud of the painted-outfit overlay (1.012) to avoid z-fighting.
      overlay.scale.set(1.017, 1.007, 1.017);
      overlay.renderOrder = 5;
      overlay.castShadow = false;
      overlay.receiveShadow = false;
      body.add(overlay);
      state.activeNeckBody = body;
      state.activeNeckOverlay = overlay;
      reapplyStoredTints();
    } catch (error) {
      console.warn('[painted accessories] neckwear texture unavailable', error);
    }
  }

  /* ---------- Style menu rows ---------- */

  function find3DRow(container, label) {
    return Array.from(container.querySelectorAll('.cosmetic-select-row')).find((row) => {
      return row.id !== FACE_ROW_ID && row.id !== NECK_ROW_ID
        && row.querySelector(':scope > span')?.textContent?.trim() === label;
    }) || null;
  }

  function clear3DSlot(label) {
    const select = find3DRow(document, label)?.querySelector('select');
    if (!select || !select.value) return;
    select.value = '';
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function persistSelections() {
    try {
      window.__snugWardrobe?.setPaintedFaceWear?.(state.selectedFaceWear);
      window.__snugWardrobe?.setPaintedNeckwear?.(state.selectedNeckwear);
    } catch (_) { /* wardrobe not ready yet */ }
  }

  function restoreSelections() {
    try {
      const saved = window.__snugWardrobe?.profile?.()?.equippedAppearance || {};
      if (!state.selectedFaceWear && saved.paintedFaceWear
        && state.faceWear.some((item) => item.id === saved.paintedFaceWear)) {
        state.selectedFaceWear = saved.paintedFaceWear;
      }
      if (!state.selectedNeckwear && saved.paintedNeckwear
        && state.neckwear.some((item) => item.id === saved.paintedNeckwear)) {
        state.selectedNeckwear = saved.paintedNeckwear;
      }
    } catch (_) { /* wardrobe not ready yet */ }
  }

  function buildRow(container, rowId, label, items, getSelected, setSelected, clearLabel, apply) {
    let row = container.querySelector(`#${rowId}`);
    if (row) {
      const select = row.querySelector('select');
      if (select && select.value !== getSelected()) select.value = getSelected();
      return row;
    }
    row = document.createElement('label');
    row.id = rowId;
    row.className = 'cosmetic-select-row snug-painted-accessory-row';

    const span = document.createElement('span');
    span.textContent = label;
    const select = document.createElement('select');
    select.setAttribute('aria-label', label);
    const none = document.createElement('option');
    none.value = '';
    none.textContent = 'None';
    select.appendChild(none);
    items.forEach((item) => {
      const option = document.createElement('option');
      option.value = item.id;
      option.textContent = item.name;
      if (item.description) option.title = item.description;
      select.appendChild(option);
    });
    select.value = getSelected();
    select.addEventListener('change', () => {
      setSelected(select.value);
      if (select.value) clear3DSlot(clearLabel);
      persistSelections();
      apply(true);
      window.dispatchEvent(new CustomEvent('snug-painted-accessory-change', {
        detail: { slot: rowId, item: items.find((entry) => entry.id === select.value) || null }
      }));
    });
    row.append(span, select);

    const anchor = find3DRow(container, clearLabel);
    if (anchor?.nextSibling) container.insertBefore(row, anchor.nextSibling);
    else container.appendChild(row);
    return row;
  }

  function syncStyleMenu() {
    document.querySelectorAll('.cosmetic-selects').forEach((container) => {
      buildRow(container, FACE_ROW_ID, 'Painted face wear', state.faceWear,
        () => state.selectedFaceWear, (v) => { state.selectedFaceWear = v; },
        'Face wear', applyFaceWear);
      buildRow(container, NECK_ROW_ID, 'Painted neckwear', state.neckwear,
        () => state.selectedNeckwear, (v) => { state.selectedNeckwear = v; },
        'Neckwear', applyNeckwear);
    });
  }

  // A 3D slot selection clears the matching painted layer (mirror of outfit behavior).
  document.addEventListener('change', (event) => {
    const select = event.target?.closest?.('.cosmetic-select-row select');
    if (!select || select.closest(`#${FACE_ROW_ID}`) || select.closest(`#${NECK_ROW_ID}`)) return;
    const label = select.closest('.cosmetic-select-row')?.querySelector(':scope > span')?.textContent?.trim();
    if (!select.value) return;
    if (label === 'Face wear' && state.selectedFaceWear) {
      state.selectedFaceWear = '';
      const painted = document.querySelector(`#${FACE_ROW_ID} select`);
      if (painted) painted.value = '';
      removeFaceOverlay();
      persistSelections();
    } else if (label === 'Neckwear' && state.selectedNeckwear) {
      state.selectedNeckwear = '';
      const painted = document.querySelector(`#${NECK_ROW_ID} select`);
      if (painted) painted.value = '';
      removeNeckOverlay();
      persistSelections();
    }
  }, true);

  // Re-apply stored tints after an overlay is (re)created — the fresh mesh
  // starts white, and accessory-tinting.js exposes reapplyAll() for exactly this.
  function reapplyStoredTints() {
    try {
      setTimeout(() => window.__snugAccessoryTinting?.reapplyAll?.(), 60);
    } catch (_) { /* tint module not ready */ }
  }

  window.addEventListener('snug-world-ready', () => {
    applyFaceWear(true);
    applyNeckwear(true);
  });
  window.addEventListener('snug-session', () => {
    restoreSelections();
    syncStyleMenu();
    applyFaceWear(true);
    applyNeckwear(true);
  });

  window.__snugApplyPaintedFaceWear = (id = '') => {
    state.selectedFaceWear = state.faceWear.some((item) => item.id === id) ? id : '';
    syncStyleMenu();
    const select = document.querySelector(`#${FACE_ROW_ID} select`);
    if (select) select.value = state.selectedFaceWear;
    if (state.selectedFaceWear) clear3DSlot('Face wear');
    persistSelections();
    return applyFaceWear(true);
  };
  window.__snugApplyPaintedNeckwear = (id = '') => {
    state.selectedNeckwear = state.neckwear.some((item) => item.id === id) ? id : '';
    syncStyleMenu();
    const select = document.querySelector(`#${NECK_ROW_ID} select`);
    if (select) select.value = state.selectedNeckwear;
    if (state.selectedNeckwear) clear3DSlot('Neckwear');
    persistSelections();
    return applyNeckwear(true);
  };

  loadManifest().finally(() => {
    restoreSelections();
    syncStyleMenu();
    // Throttled: re-apply if the avatar was rebuilt (body mass/height change).
    setInterval(() => {
      if (document.hidden) return;
      syncStyleMenu();
      applyFaceWear();
      applyNeckwear();
    }, 2000);
  });
})();

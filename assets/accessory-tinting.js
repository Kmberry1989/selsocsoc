/* snug-accessory-tinting-v1
 * Curated swatch tints for equipped cosmetics in the Style menu.
 *
 * Works with the cosmetic-tints.js engine (window.__snugApplyCosmeticTint)
 * for 3D GLB cosmetics, and tints the painted-outfit overlay for 2D texture
 * outfits (outfit-textures.js). Tints are color multiplies over the authored
 * look — textures and shading are preserved. Fit review stays untinted;
 * tints apply only to the equipped avatar in-game.
 *
 * Tints persist per slot on the player doc (field: tints) via the standard
 * snug-player-patch save pattern. Changing a tint never needs re-approval.
 */
(() => {
  'use strict';

  const FIELD = 'tints';
  const WHITE = '#ffffff';
  const PAINTED_ROW_ID = 'snug-painted-outfit-row';
  const OVERLAY_NAME = 'SnugPaintedOutfitOverlay';

  // Cozy storybook palette — swatches only, no raw color sliders.
  const PALETTE = [
    { name: 'None', hex: WHITE, reset: true },
    { name: 'Cream', hex: '#faf3e3' },
    { name: 'Butter', hex: '#f9e7a1' },
    { name: 'Honey', hex: '#f2c14e' },
    { name: 'Sunset', hex: '#f2935c' },
    { name: 'Blush', hex: '#f7b8c4' },
    { name: 'Rose', hex: '#e98aa0' },
    { name: 'Strawberry', hex: '#d94f5c' },
    { name: 'Sage', hex: '#a8c686' },
    { name: 'Mint', hex: '#8fd6b4' },
    { name: 'Teal', hex: '#5fb3a1' },
    { name: 'Sky', hex: '#8ecae6' },
    { name: 'Periwinkle', hex: '#9aa8e8' },
    { name: 'Lilac', hex: '#c3a9e0' },
    { name: 'Cocoa', hex: '#8a5a44' },
    { name: 'Charcoal', hex: '#4a4a52' },
  ];

  const state = {
    session: null,
    profile: {},
    tints: {}, // slotKey -> { item, tint }
    saveTimer: 0,
    saveChain: Promise.resolve(),
    attached: new WeakSet(),
    scanQueued: false,
  };

  /* ---------- helpers ---------- */

  const normalizeHex = (value) => (/^#[0-9a-f]{6}$/i.test(String(value || '')) ? String(value).toLowerCase() : WHITE);
  const currentAvatar = () => window.__snugPlayerAvatar || window.__snugWorld?.player || null;

  function rowLabel(row) {
    return row.querySelector(':scope > span')?.textContent?.trim() || 'Item';
  }

  function slotKey(row) {
    if (row.id) return row.id;
    return 'slot-' + rowLabel(row).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  const isPaintedRow = (row) => row.id === PAINTED_ROW_ID;

  function rowItemId(row) {
    if (isPaintedRow(row)) {
      const avatar = currentAvatar();
      const overlay = avatar ? findOverlay(avatar) : null;
      return overlay?.userData?.snugTextureOutfit
        || row.querySelector('select')?.value
        || '';
    }
    return row.querySelector('select')?.value || '';
  }

  function findOverlay(root) {
    let found = null;
    root?.traverse?.((node) => {
      if (!found && (node?.name === OVERLAY_NAME || node?.userData?.snugTextureOutfit)) found = node;
    });
    return found;
  }

  /* ---------- save / load ---------- */

  function firestoreValue(value) {
    if (value === null || value === undefined) return { nullValue: null };
    if (typeof value === 'boolean') return { booleanValue: value };
    if (typeof value === 'number') return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
    if (typeof value === 'string') return { stringValue: value };
    if (Array.isArray(value)) return { arrayValue: { values: value.map(firestoreValue) } };
    return { mapValue: { fields: Object.fromEntries(Object.entries(value).map(([k, v]) => [k, firestoreValue(v)])) } };
  }

  function decodeValue(value = {}) {
    if ('stringValue' in value) return value.stringValue;
    if ('integerValue' in value) return Number(value.integerValue);
    if ('doubleValue' in value) return Number(value.doubleValue);
    if ('booleanValue' in value) return value.booleanValue;
    if ('nullValue' in value) return null;
    if (value.arrayValue) return (value.arrayValue.values || []).map(decodeValue);
    if (value.mapValue) return Object.fromEntries(Object.entries(value.mapValue.fields || {}).map(([k, v]) => [k, decodeValue(v)]));
    return null;
  }

  const decodeFields = (fields = {}) =>
    Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, decodeValue(v)]));

  async function headers() {
    if (!state.session?.user) throw new Error('Waiting for Firebase sign-in');
    return { 'Content-Type': 'application/json', Authorization: `Bearer ${await state.session.user.getIdToken()}` };
  }

  function playerUrl(uid = state.session?.uid) {
    const project = state.session?.projectId || state.session?.app?.options?.projectId;
    return `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(project)}/databases/(default)/documents/players/${encodeURIComponent(uid)}`;
  }

  function saveTints() {
    clearTimeout(state.saveTimer);
    state.saveTimer = setTimeout(() => {
      if (!state.session?.user) return;
      const payload = { [FIELD]: state.tints };
      state.saveChain = state.saveChain.catch(() => {}).then(async () => {
        const paths = `updateMask.fieldPaths=${encodeURIComponent(FIELD)}`;
        const response = await fetch(`${playerUrl()}?${paths}`, {
          method: 'PATCH',
          headers: await headers(),
          body: JSON.stringify({ fields: { [FIELD]: firestoreValue(state.tints) } }),
        });
        if (!response.ok) throw new Error(`Tint save returned ${response.status}`);
        state.profile = { ...state.profile, ...payload };
        window.dispatchEvent(new CustomEvent('snug-player-patch', { detail: (player) => ({ ...player, ...payload }) }));
      }).catch(() => {});
    }, 800);
  }

  async function loadTints() {
    try {
      const response = await fetch(playerUrl(), { headers: await headers() });
      if (!response.ok) throw new Error(`Tint profile returned ${response.status}`);
      state.profile = decodeFields((await response.json()).fields || {});
      const stored = state.profile[FIELD];
      state.tints = stored && typeof stored === 'object' ? stored : {};
    } catch {
      state.tints = {};
    }
  }

  /* ---------- tint application ---------- */

  function applyRowTint(row, hex) {
    const avatar = currentAvatar();
    if (!avatar) return false;
    const tint = normalizeHex(hex);
    if (isPaintedRow(row)) {
      const overlay = findOverlay(avatar);
      if (overlay?.material?.color?.set) {
        overlay.material.color.set(tint);
        overlay.material.needsUpdate = true;
        return true;
      }
      return false;
    }
    const id = row.querySelector('select')?.value || '';
    if (!id || typeof window.__snugApplyCosmeticTint !== 'function') return false;
    window.__snugApplyCosmeticTint(avatar, id, tint);
    return true;
  }

  function storedFor(row) {
    const entry = state.tints[slotKey(row)];
    return entry && typeof entry === 'object' ? entry : null;
  }

  function reapplyRow(row) {
    const entry = storedFor(row);
    if (!entry || !entry.item) return;
    const current = rowItemId(row);
    if (current && current === entry.item && normalizeHex(entry.tint) !== WHITE) {
      applyRowTint(row, entry.tint);
    }
  }

  function reapplyAll() {
    document.querySelectorAll('.cosmetic-selects .cosmetic-select-row').forEach(reapplyRow);
  }

  function retryTintOverlay(attempt = 0) {
    const avatar = currentAvatar();
    const overlay = avatar ? findOverlay(avatar) : null;
    if (overlay?.material?.color?.set) {
      const row = document.getElementById(PAINTED_ROW_ID);
      const entry = row ? storedFor(row) : null;
      const item = overlay.userData?.snugTextureOutfit || '';
      if (entry && entry.item === item && normalizeHex(entry.tint) !== WHITE) {
        overlay.material.color.set(normalizeHex(entry.tint));
        overlay.material.needsUpdate = true;
      }
      return;
    }
    if (attempt < 15) setTimeout(() => retryTintOverlay(attempt + 1), 200);
  }

  /* ---------- picker UI ---------- */

  function chooseTint(row, entry) {
    const item = rowItemId(row);
    if (!item) return; // nothing equipped in this slot yet
    const key = slotKey(row);
    const hex = normalizeHex(entry.hex);
    applyRowTint(row, hex);
    if (entry.reset || hex === WHITE) delete state.tints[key];
    else state.tints[key] = { item, tint: hex };
    saveTints();
    syncPicker(row);
  }

  function syncPicker(row) {
    const picker = row.querySelector('[data-tint-picker]');
    if (!picker) return;
    const entry = storedFor(row);
    const item = rowItemId(row);
    const active = entry && entry.item === item ? normalizeHex(entry.tint) : WHITE;
    picker.querySelectorAll('.snug-tint-swatch').forEach((button) => {
      button.setAttribute('aria-pressed', normalizeHex(button.dataset.tint) === active ? 'true' : 'false');
    });
  }

  function buildPicker(row) {
    if (state.attached.has(row)) return;
    state.attached.add(row);

    const wrap = document.createElement('div');
    wrap.className = 'snug-tint-picker';
    wrap.dataset.tintPicker = '1';

    const label = document.createElement('span');
    label.className = 'snug-tint-label';
    label.textContent = 'Tint';

    const swatches = document.createElement('div');
    swatches.className = 'snug-tint-swatches';
    swatches.setAttribute('role', 'group');
    swatches.setAttribute('aria-label', `Tint color for ${rowLabel(row)}`);

    PALETTE.forEach((entry) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'snug-tint-swatch' + (entry.reset ? ' snug-tint-none' : '');
      button.dataset.tint = entry.hex;
      button.title = entry.name;
      button.setAttribute('aria-label', `${entry.name} tint`);
      button.setAttribute('aria-pressed', 'false');
      const dot = document.createElement('span');
      dot.className = 'snug-tint-dot';
      dot.style.background = entry.hex;
      dot.setAttribute('aria-hidden', 'true');
      button.appendChild(dot);
      button.addEventListener('click', () => chooseTint(row, entry));
      swatches.appendChild(button);
    });

    wrap.append(label, swatches);
    row.appendChild(wrap);
    syncPicker(row);
  }

  function scanRows() {
    state.scanQueued = false;
    document.querySelectorAll('.cosmetic-selects .cosmetic-select-row').forEach(buildPicker);
  }

  function queueScan() {
    if (state.scanQueued) return;
    state.scanQueued = true;
    requestAnimationFrame(scanRows);
  }

  /* ---------- wiring ---------- */

  document.addEventListener('change', (event) => {
    const select = event.target?.closest?.('.cosmetic-select-row select');
    if (!select) return;
    const row = select.closest('.cosmetic-select-row');
    // Let the game's equip flow finish, then re-apply the stored tint (or white for a fresh item).
    setTimeout(() => {
      const entry = storedFor(row);
      const current = rowItemId(row);
      if (entry && entry.item === current && normalizeHex(entry.tint) !== WHITE) {
        applyRowTint(row, entry.tint);
      } else if (!isPaintedRow(row)) {
        applyRowTint(row, WHITE);
      }
      if (isPaintedRow(row)) retryTintOverlay(0);
      syncPicker(row);
    }, 250);
  }, true);

  window.addEventListener('snug-texture-outfit-change', () => retryTintOverlay(0));
  window.addEventListener('snug-world-ready', () => {
    setTimeout(() => { scanRows(); reapplyAll(); }, 400);
  });

  // Re-apply tint after the painted-outfit module recreates its overlay.
  function wrapTextureOutfit() {
    const original = window.__snugApplyTextureOutfit;
    if (typeof original !== 'function' || original.__snugTintWrapped) return;
    const wrapped = function (...args) {
      const result = original.apply(this, args);
      Promise.resolve(result).catch(() => {}).finally(() => retryTintOverlay(0));
      return result;
    };
    wrapped.__snugTintWrapped = true;
    window.__snugApplyTextureOutfit = wrapped;
  }

  function boot() {
    scanRows();
    wrapTextureOutfit();
    const observer = new MutationObserver(queueScan);
    const startObserving = () => {
      observer.observe(document.body, { childList: true, subtree: true });
    };
    startObserving();
    // If no Style menu exists, the observer is pure overhead: disconnect it
    // once idle, and re-attach on the next user gesture (the menu opens via
    // taps/keys, so the picker still injects when needed).
    const idleCheck = () => {
      if (document.querySelector('.cosmetic-selects .cosmetic-select-row')) return;
      observer.disconnect();
      const reattach = () => {
        startObserving();
        queueScan();
      };
      window.addEventListener('pointerdown', reattach, { once: true, passive: true });
      window.addEventListener('keydown', reattach, { once: true });
    };
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(idleCheck, { timeout: 15000 });
    } else {
      setTimeout(idleCheck, 8000);
    }
    setInterval(() => {
      if (document.hidden) return;
      scanRows();
      wrapTextureOutfit();
    }, 2000);
  }

  async function attach(session) {
    state.session = session;
    await loadTints();
    setTimeout(() => { scanRows(); reapplyAll(); }, 600);
  }

  window.addEventListener('snug-session', (event) => attach(event.detail));
  if (window.__snugSession) attach(window.__snugSession);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();

  window.__snugAccessoryTinting = { PALETTE, applyRowTint, reapplyAll, syncPicker };
})();

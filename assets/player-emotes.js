/* Player Emotes — town-wide emote picker with emoji bursts.
 *
 * Fires a DOM emoji burst above the player's avatar (Whirl-cheer style),
 * nudges the adopted cat to react when one is around, and dispatches
 * `snug-player-emote` for other systems to hook into.
 * Local-only v1: no fake presence, no simulated other players.
 */
(() => {
  'use strict';

  const EMOTES = [
    { id: 'wave', glyph: '👋', label: 'Wave' },
    { id: 'dance', glyph: '💃', label: 'Dance' },
    { id: 'cheer', glyph: '🎉', label: 'Cheer' },
    { id: 'laugh', glyph: '😂', label: 'Laugh' },
    { id: 'love', glyph: '😍', label: 'Love' },
    { id: 'sleep', glyph: '😴', label: 'Sleepy' },
    { id: 'party', glyph: '🥳', label: 'Party' },
    { id: 'heart', glyph: '💖', label: 'Heart' },
  ];

  const BTN_ID = 'snug-emote-fab';
  const SHEET_ID = 'snug-emote-sheet';

  function playerScreenPos() {
    try {
      const world = window.__snugWorld;
      const player = window.__snugPlayerAvatar || world?.player;
      if (!player || !world) return null;
      // Find the camera: prefer an explicitly exposed one, else scan the scene.
      let camera = world.camera || window.__snugCamera;
      if (!camera && world.scene) {
        world.scene.traverse((o) => { if (!camera && o?.isCamera) camera = o; });
      }
      if (!camera || !player.getWorldPosition) return null;
      const THREE = window.THREE;
      if (!THREE?.Vector3) return null;
      const v = new THREE.Vector3();
      player.getWorldPosition(v);
      v.y += 1.6; // above the coin head
      v.project(camera);
      if (v.z > 1) return null; // behind camera
      return {
        x: (v.x * 0.5 + 0.5) * window.innerWidth,
        y: (-v.y * 0.5 + 0.5) * window.innerHeight,
      };
    } catch { return null; }
  }

  function burst(emote) {
    const pos = playerScreenPos() || { x: window.innerWidth / 2, y: window.innerHeight * 0.55 };
    const s = document.createElement('span');
    s.className = 'snug-emote-burst';
    s.textContent = emote.glyph;
    s.setAttribute('aria-hidden', 'true');
    s.style.left = `${pos.x}px`;
    s.style.top = `${pos.y}px`;
    document.body.appendChild(s);
    // A couple of satellite sparkles for delight.
    for (let i = 0; i < 2; i++) {
      const p = document.createElement('span');
      p.className = 'snug-emote-burst snug-emote-spark';
      p.textContent = ['✨', '💫', '⭐'][i % 3];
      p.setAttribute('aria-hidden', 'true');
      p.style.left = `${pos.x + (Math.random() * 80 - 40)}px`;
      p.style.top = `${pos.y + (Math.random() * 30 - 15)}px`;
      p.style.animationDelay = `${0.12 * (i + 1)}s`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1800);
    }
    requestAnimationFrame(() => s.classList.add('go'));
    setTimeout(() => s.remove(), 1700);
  }

  function nudgeCat() {
    // Adopted cats react to emotes: reuse the existing pet-reaction path.
    const petBtn = document.querySelector("[data-action='cat-pet']");
    if (petBtn) petBtn.click();
  }

  function fireEmote(emote) {
    burst(emote);
    nudgeCat();
    window.dispatchEvent(new CustomEvent('snug-player-emote', { detail: { emote: emote.id } }));
    closeSheet();
  }

  function closeSheet() {
    document.getElementById(SHEET_ID)?.remove();
  }

  function openSheet() {
    closeSheet();
    const sheet = document.createElement('div');
    sheet.id = SHEET_ID;
    sheet.className = 'snug-emote-sheet';
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-label', 'Choose an emote');
    sheet.innerHTML = `
      <div class="snug-emote-grabber"></div>
      <p class="snug-emote-title">Emote</p>
      <div class="snug-emote-grid" role="group" aria-label="Emotes">
        ${EMOTES.map((e) => `
          <button type="button" class="snug-emote-btn" data-emote="${e.id}"
                  aria-label="${e.label}">
            <span aria-hidden="true">${e.glyph}</span><small>${e.label}</small>
          </button>`).join('')}
      </div>
      <button type="button" class="snug-emote-close" aria-label="Close emotes">Close</button>`;
    sheet.addEventListener('click', (ev) => {
      if (ev.target === sheet) { closeSheet(); return; }
      const btn = ev.target.closest('[data-emote]');
      if (btn) {
        const emote = EMOTES.find((e) => e.id === btn.dataset.emote);
        if (emote) fireEmote(emote);
        return;
      }
      if (ev.target.closest('.snug-emote-close')) closeSheet();
    });
    document.body.appendChild(sheet);
    sheet.querySelector('.snug-emote-btn')?.focus();
  }

  function ensureFab() {
    if (document.getElementById(BTN_ID)) return;
    const btn = document.createElement('button');
    btn.id = BTN_ID;
    btn.type = 'button';
    btn.className = 'snug-emote-fab';
    btn.setAttribute('aria-label', 'Open emotes');
    btn.textContent = '😊';
    btn.addEventListener('click', () => {
      if (document.getElementById(SHEET_ID)) closeSheet();
      else openSheet();
    });
    document.body.appendChild(btn);
  }

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') closeSheet();
  });

  // Show the FAB once the town world is up.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureFab, { once: true });
  } else {
    ensureFab();
  }
  window.addEventListener('snug-world-ready', ensureFab);
})();

/* Selfie Social Society — persistent town UI shell.
 * Owns collapse behavior for the persistent town chrome only:
 *   - the village dock fan (.snug-dock-fan, toggled by .snug-dock-cluster)
 *   - the town directory sheet (.snug-dir-sheet, toggled by .snug-dir-fab)
 *   - the minimap wrap (.snug-minimap-wrap, toggled by .snug-minimap-toggle)
 * Every panel starts collapsed: each owning module creates its panel
 * hidden/closed, and the shell additionally closes any open panel whenever
 * the player leaves village mode, so town re-entry always starts collapsed.
 *
 * An open panel collapses when:
 *   (a) the player character actually moves — the player position is polled
 *       every animation frame and a horizontal move bigger than ~0.01 units
 *       counts as movement. Position polling covers joystick, keys, and
 *       tap-to-move alike without hooking any input system.
 *   (b) the player pointer-downs anywhere outside all open panels and their
 *       toggle buttons (capture phase). The listener never calls
 *       preventDefault or stopPropagation, so canvas taps still drive the
 *       game (tap-to-move, path taps) as usual.
 * Presentation and collapse only: no gameplay, dialogue, shop, minigame,
 * or flow behavior is changed. Transient activity UIs (dialogue cards,
 * shops, minigames, board, photo mode, tutorial, ceremony) are not panels
 * and are left alone.
 *
 * Load-order independent: panels and toggles are looked up lazily, so it
 * does not matter whether this module loads before or after the modules
 * that create them. Closing always prefers the owning module's own close
 * path (so its internal open-state stays in sync) and falls back to the
 * equivalent DOM change if that hook is not present yet.
 */
(() => {
  "use strict";
  if (window.__snugUiShell) return;

  const MOVE_EPS = 0.01; // world units; smaller moves are jitter, not walking

  // Panel descriptors. isOpen/close are written against the owning module's
  // own state where a hook exists, so no module's bookkeeping is bypassed.
  const PANELS = [
    {
      name: "dock-fan",
      panelSel: ".snug-dock-fan",
      toggleSel: ".snug-dock-cluster",
      isOpen: (panel) => panel.classList.contains("open"),
      close: (panel, toggle) => {
        if (typeof window.__snugDockClusterClose === "function") {
          window.__snugDockClusterClose();
          return;
        }
        // Fallback: mirror snug-dock-cluster.js closeFan().
        panel.classList.remove("open");
        if (toggle) {
          toggle.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        }
        panel.setAttribute("aria-hidden", "true");
      },
    },
    {
      name: "directory-sheet",
      panelSel: ".snug-dir-sheet",
      toggleSel: ".snug-dir-fab",
      isOpen: (panel) => !panel.hidden,
      close: (panel) => {
        if (window.__snugDirectory && typeof window.__snugDirectory.close === "function") {
          window.__snugDirectory.close();
          return;
        }
        // Fallback: mirror town-directory.js toggleDirectory(false).
        panel.hidden = true;
        document.body.classList.remove("snug-dir-open");
      },
    },
    {
      name: "minimap-wrap",
      panelSel: ".snug-minimap-wrap",
      toggleSel: ".snug-minimap-toggle",
      isOpen: (panel) => !panel.hidden,
      close: (panel, toggle) => {
        if (window.__snugDirectory && typeof window.__snugDirectory.toggleMinimap === "function") {
          window.__snugDirectory.toggleMinimap(false);
          return;
        }
        // Fallback: mirror town-directory.js toggleMinimap(false).
        panel.hidden = true;
        if (toggle) toggle.setAttribute("aria-pressed", "false");
      },
    },
  ];

  // Lazily cached element refs; refreshed if an element is ever replaced.
  const els = new Map(); // panel name -> { panel, toggle }
  function lookup(p) {
    let entry = els.get(p.name);
    if (entry && entry.panel && entry.panel.isConnected) return entry;
    const panel = document.querySelector(p.panelSel);
    const toggle = document.querySelector(p.toggleSel);
    entry = { panel, toggle };
    els.set(p.name, entry);
    return entry;
  }

  function anyOpen() {
    return PANELS.some((p) => {
      const { panel } = lookup(p);
      return panel && p.isOpen(panel);
    });
  }

  function closeAll() {
    for (const p of PANELS) {
      const { panel, toggle } = lookup(p);
      if (panel && p.isOpen(panel)) p.close(panel, toggle);
    }
  }

  function insideChrome(target) {
    // Taps inside a panel or on its toggle belong to that panel; the panel
    // (or its toggle) handles them itself.
    for (const p of PANELS) {
      const { panel, toggle } = lookup(p);
      if (panel && panel.contains(target)) return true;
      if (toggle && toggle.contains(target)) return true;
    }
    return false;
  }

  /* ---------- (b) tap outside collapses ---------- */
  document.addEventListener(
    "pointerdown",
    (e) => {
      if (!anyOpen()) return;
      if (insideChrome(e.target)) return;
      closeAll();
    },
    true // capture: collapse before the tap's own handler runs, without blocking it
  );

  /* ---------- (a) movement collapses + town-entry starts collapsed ---------- */
  let lastPos = null; // { x, z }
  function tick() {
    requestAnimationFrame(tick);
    const world = window.__snugWorld;
    const root = document.documentElement;

    // Leaving village mode (or the start screen / photo mode taking over)
    // collapses everything, so town re-entry always starts collapsed.
    const outOfTown =
      (world && world.mode && world.mode !== "village") ||
      root.classList.contains("snug-start-open") ||
      root.classList.contains("snug-photo-mode");
    if (outOfTown) {
      if (anyOpen()) closeAll();
      lastPos = null;
      return;
    }

    const player = world && world.player;
    const pos = player && player.position;
    if (!pos) {
      lastPos = null;
      return;
    }
    if (lastPos) {
      const dx = pos.x - lastPos.x;
      const dz = pos.z - lastPos.z;
      if (dx * dx + dz * dz > MOVE_EPS * MOVE_EPS) closeAll();
    }
    lastPos = { x: pos.x, z: pos.z };
  }
  requestAnimationFrame(tick);

  window.__snugUiShell = {
    closeAll,
    isAnyOpen: anyOpen,
  };
})();

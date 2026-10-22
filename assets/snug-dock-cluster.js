/* Selfie Social Society — village dock cluster.
 * Groups the five floating village-mode buttons (Town Life, Garden,
 * Build, Mailbox, Journal) into one expandable cluster button.
 * Tap the cluster to fan the buttons out in an arc; tap again, tap
 * outside, or pick a button to collapse. Each button keeps its own
 * behavior and visibility logic — only presentation changes.
 */
(() => {
  if (window.__snugDockCluster) return;
  window.__snugDockCluster = true;

  const SELECTORS = [
    ".town-life-dock",
    ".garden-dock",
    ".housing-dock",
    ".mailbox-dock",
    ".society-dock",
  ];
  const ITEM = 48;          // fan button diameter (min tap target)
  const RADIUS = 130;       // arc radius
  const SPREAD = 90;        // arc spread in degrees
  const NARROW_PX = 340;    // at/below: vertical stack fallback

  let clusterBtn = null;
  let fan = null;
  let open = false;

  const docks = () => SELECTORS.map((s) => document.querySelector(s)).filter(Boolean);
  const visibleDocks = () => docks().filter((d) => !d.hidden);

  function adoptDocks() {
    if (!fan) return false;
    let moved = false;
    for (const d of docks()) {
      if (d.parentElement !== fan) { fan.appendChild(d); moved = true; }
    }
    return moved;
  }

  function clusterCenter() {
    const r = clusterBtn.getBoundingClientRect();
    return {
      x: r.left + r.width / 2,                    // from left
      y: window.innerHeight - (r.top + r.height / 2), // from bottom
    };
  }

  function layout() {
    if (!clusterBtn) return;
    const items = visibleDocks();
    const c = clusterCenter();
    const narrow = window.innerWidth <= NARROW_PX;
    items.forEach((d, i) => {
      let dx, dy; // offsets from cluster center; dy up (from-bottom)
      if (narrow || items.length === 1) {
        // Vertical stack fallback (also used for a single item).
        // Keeps the stack below the HUD even on short screens.
        const hudBottom = window.innerHeight - 70; // from-bottom
        const totalH = items.length * ITEM + (items.length - 1) * 10;
        let startDy = 74;
        if (c.y + startDy + totalH > hudBottom) {
          startDy = Math.max(58, hudBottom - totalH - c.y);
        }
        dx = 0;
        dy = startDy + i * (ITEM + 10);
      } else {
        const step = items.length > 1 ? SPREAD / (items.length - 1) : 0;
        const a = (i * step * Math.PI) / 180;
        dx = Math.cos(a) * RADIUS;
        dy = Math.sin(a) * RADIUS;
      }
      d.style.left = `${(c.x + dx - ITEM / 2).toFixed(1)}px`;
      d.style.bottom = `${(c.y + dy - ITEM / 2).toFixed(1)}px`;
      d.style.top = "auto";
      d.style.right = "auto";
    });
  }

  function openFan() {
    adoptDocks();
    layout();
    open = true;
    fan.classList.add("open");
    clusterBtn.classList.add("open");
    clusterBtn.setAttribute("aria-expanded", "true");
    fan.setAttribute("aria-hidden", "false");
  }

  function closeFan() {
    open = false;
    if (!fan || !clusterBtn) return;
    fan.classList.remove("open");
    clusterBtn.classList.remove("open");
    clusterBtn.setAttribute("aria-expanded", "false");
    fan.setAttribute("aria-hidden", "true");
  }

  // Public close for the UI shell (assets/snug-ui-shell.js). Collapsing the
  // fan from outside must go through closeFan so the internal `open` flag
  // stays in sync; stripping the classes directly would leave `open` true
  // and cost the player an extra tap to re-open.
  window.__snugDockClusterClose = closeFan;

  function toggle() {
    if (open) closeFan();
    else openFan();
  }

  function sync() {
    adoptDocks();
    const ds = docks();
    if (!clusterBtn || !ds.length) return;
    const village = window.__snugWorld?.mode === "village";
    const startOpen = document.documentElement.classList.contains("snug-start-open");
    const photoMode = document.documentElement.classList.contains("snug-photo-mode");
    const anyVisible = ds.some((d) => !d.hidden);
    const show = Boolean(village && !startOpen && !photoMode && anyVisible);
    clusterBtn.hidden = !show;
    if (!show && open) closeFan();
    if (open) layout();
  }

  function init() {
    clusterBtn = document.createElement("button");
    clusterBtn.type = "button";
    clusterBtn.className = "snug-dock-cluster";
    clusterBtn.setAttribute("aria-label", "Village actions");
    clusterBtn.setAttribute("aria-expanded", "false");
    clusterBtn.innerHTML = "<span>+</span>";
    clusterBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle();
    });
    document.body.appendChild(clusterBtn);

    fan = document.createElement("div");
    fan.className = "snug-dock-fan";
    fan.setAttribute("aria-hidden", "true");
    document.body.appendChild(fan);

    adoptDocks();

    // Tap outside the fan closes it.
    document.addEventListener(
      "click",
      (e) => {
        if (!open) return;
        if (fan.contains(e.target) || clusterBtn.contains(e.target)) return;
        closeFan();
      },
      true
    );

    // Picking a fan button collapses the fan (its own handler runs first).
    fan.addEventListener("click", () => {
      setTimeout(closeFan, 0);
    });

    window.addEventListener("resize", () => { if (open) layout(); }, { passive: true });

    setInterval(sync, 800);
    sync();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

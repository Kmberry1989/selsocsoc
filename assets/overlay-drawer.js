/* snug-overlay-drawer-v1
 * Tucks the always-on floating buttons (room dock, voice toggle, seasonal
 * event launcher) into a slide-out side drawer, per Kyle 2026-10-20.
 * One slim edge handle stays on screen; everything else lives in the drawer.
 * The original elements are MOVED (same nodes, same handlers) so other
 * systems that query .room-dock / .voice-toggle-dock / .season-launcher
 * keep working, including programmatic .click() calls.
 */
(() => {
  if (window.__snugOverlayDrawer) return;
  window.__snugOverlayDrawer = true;

  const style = document.createElement("style");
  style.textContent = `
    .snug-drawer-handle{position:fixed;z-index:144;right:0;top:50%;transform:translateY(-50%);
      width:22px;height:64px;border:1px solid #d3ddd9;border-right:0;border-radius:12px 0 0 12px;
      background:#fffdf8f2;color:#426d4b;font-size:15px;font-weight:900;cursor:pointer;
      box-shadow:-3px 4px 14px #1c2d3226;display:grid;place-items:center;padding:0}
    .snug-drawer-scrim{position:fixed;inset:0;z-index:148;background:#17202159;opacity:0;pointer-events:none;transition:opacity .22s ease}
    .snug-drawer{position:fixed;z-index:149;top:0;right:0;height:100dvh;width:min(240px,72vw);
      background:#fffdf8;color:#26383b;box-shadow:-12px 0 34px #16202133;
      transform:translateX(105%);transition:transform .24s ease;display:flex;flex-direction:column;
      padding:max(14px,env(safe-area-inset-top)) 14px calc(max(14px,env(safe-area-inset-bottom))) }
    .snug-drawer.open{transform:translateX(0)}
    .snug-drawer-scrim.open{opacity:1;pointer-events:auto}
    .snug-drawer-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
    .snug-drawer-head b{font-size:15px}
    .snug-drawer-close{width:34px;height:34px;border:0;border-radius:50%;background:#eef2ec;font-size:17px;cursor:pointer}
    .snug-drawer-row{display:grid;gap:5px;padding:10px 0;border-top:1px solid #e3e9e2}
    .snug-drawer-row>small{font-size:10px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#7a8a80}
    .snug-drawer .room-dock,.snug-drawer .voice-toggle-dock,.snug-drawer .season-launcher{
      position:static!important;inset:auto!important;transform:none!important;margin:0!important}
    .snug-drawer .room-dock{width:100%;justify-content:flex-start;min-height:42px}
    .snug-drawer .voice-toggle-dock{width:42px;height:42px}
    .snug-drawer .season-launcher{width:42px;height:42px}
    html.snug-start-open .snug-drawer-handle{display:none}
  `;
  document.head.appendChild(style);

  const handle = document.createElement("button");
  handle.type = "button";
  handle.className = "snug-drawer-handle";
  handle.textContent = "‹";
  handle.setAttribute("aria-label", "Open side drawer");

  const scrim = document.createElement("div");
  scrim.className = "snug-drawer-scrim";

  const drawer = document.createElement("aside");
  drawer.className = "snug-drawer";
  drawer.setAttribute("aria-label", "Town tools");
  drawer.innerHTML = `
    <div class="snug-drawer-head"><b>Town tools</b><button type="button" class="snug-drawer-close" aria-label="Close drawer">×</button></div>
    <div class="snug-drawer-row" data-slot="rooms"><small>Rooms</small></div>
    <div class="snug-drawer-row" data-slot="voice"><small>Voice chat</small></div>
    <div class="snug-drawer-row" data-slot="season"><small>Season event</small></div>
  `;

  const open = () => { drawer.classList.add("open"); scrim.classList.add("open"); };
  const close = () => { drawer.classList.remove("open"); scrim.classList.remove("open"); };
  handle.addEventListener("click", open);
  scrim.addEventListener("click", close);
  drawer.querySelector(".snug-drawer-close").addEventListener("click", close);
  // Tapping an adopted control opens its own UI — get the drawer out of the way.
  drawer.addEventListener("click", (event) => {
    if (event.target.closest(".room-dock,.voice-toggle-dock,.season-launcher")) setTimeout(close, 60);
  });

  const SLOTS = [
    [".room-dock", "rooms"],
    [".voice-toggle-dock", "voice"],
    [".season-launcher", "season"],
  ];
  function adopt() {
    for (const [selector, slot] of SLOTS) {
      const el = document.querySelector(selector);
      const target = drawer.querySelector(`[data-slot="${slot}"]`);
      if (el && target && !target.contains(el)) target.appendChild(el);
    }
    // If a modal/sheet opens while the drawer is up, close the drawer.
    if (drawer.classList.contains("open") &&
        document.querySelector(".multiplayer-backdrop,.sheet-backdrop,.portrait-camera-backdrop,.season-panel")) close();
    // Hide the handle under full-screen overlays so it never floats on top.
    const covered = document.querySelector(".multiplayer-backdrop,.sheet-backdrop,.portrait-camera-backdrop");
    handle.style.display = covered ? "none" : "";
  }

  function install() {
    if (!document.body) return;
    document.body.append(handle, scrim, drawer);
    adopt();
    new MutationObserver(adopt).observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", install);
  else install();

  window.__snugOverlayDrawerApi = { open, close };
})();

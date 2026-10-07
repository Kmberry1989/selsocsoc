/* Town Directory + Minimap + Path Lighting.
   - Directory: bottom sheet listing all in-town NPCs (real roster data) + key places.
   - Minimap: small toggleable 2D canvas overlay; dots from REAL scene positions.
   - Path lighting: glowing ground markers in the 3D world from player to destination.
   NPCs not currently spawned show "out and about" — never faked. */
(() => {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const reducedMotion = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Key places mapped to their anchor NPC's live position.
  const PLACES = [
    { id: "place-whirl", name: "Whirl Venue", job: "Chip's game-show pavilion", anchorNpc: "chip-chance", icon: "◉" },
    { id: "place-garden", name: "Garden Plots", job: "Fern's seedlings", anchorNpc: "fern-bramble", icon: "✿" },
    { id: "place-mailbox", name: "Mailbox", job: "Stanley's post", anchorNpc: "stanley-stamp", icon: "✉" },
    { id: "place-pond", name: "Pond", job: "Bobby's fishing spot", anchorNpc: "bobby-gill", icon: "◓" },
  ];

  const state = {
    characters: [],      // [{id, name, role, object?}] from snug-npc-roster-ready
    dirOpen: false,
    mapOpen: false,
    path: null,          // {destId, destName, markers: [], dest: {x, z}}
    lastPathCalc: 0,
  };

  const initials = (name) =>
    name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  /* ---------- NPC data ---------- */
  function refreshCharacters(detail) {
    if (!detail || !Array.isArray(detail.characters)) return;
    // Merge: keep existing objects where possible, update from event.
    const byId = new Map(state.characters.map((c) => [c.id, c]));
    state.characters = detail.characters.map((c) => {
      const prev = byId.get(c.id) || {};
      return { ...prev, ...c };
    });
    // The roster attaches .object to its internal records; our copies need the
    // live object reference. Re-resolve via the group if available.
    if (detail.group) {
      const objs = new Map();
      detail.group.children.forEach((o) => {
        const id = o.userData && o.userData.npcId;
        if (id) objs.set(id, o);
      });
      state.characters.forEach((c) => { c.object = objs.get(c.id) || c.object || null; });
    }
    if (state.dirOpen) renderDirectoryList();
    drawMinimap();
  }

  function npcPos(c) {
    if (c.object && c.object.position) return { x: c.object.position.x, z: c.object.position.z };
    return null;
  }
  function playerPos() {
    const p = window.__snugWorld && window.__snugWorld.player;
    if (p && p.position) return { x: p.position.x, z: p.position.z };
    return null;
  }
  function findNpc(id) { return state.characters.find((c) => c.id === id); }

  /* ---------- directory button ---------- */
  let dirBtn = null;
  function ensureDirButton() {
    if (dirBtn) return dirBtn;
    dirBtn = document.createElement("button");
    dirBtn.type = "button";
    dirBtn.className = "snug-dir-fab";
    dirBtn.setAttribute("aria-label", "Open town directory");
    dirBtn.innerHTML = `<span aria-hidden="true">🗺</span>`;
    dirBtn.addEventListener("click", () => toggleDirectory());
    document.body.appendChild(dirBtn);
    updateFabVisibility();
    return dirBtn;
  }
  function updateFabVisibility() {
    if (!dirBtn) return;
    const inWorld = window.__snugWorld && window.__snugWorld.mode === "village" &&
      !document.documentElement.classList.contains("snug-start-open");
    dirBtn.hidden = !inWorld;
  }

  /* ---------- directory sheet ---------- */
  let sheet = null;
  function ensureSheet() {
    if (sheet) return sheet;
    sheet = document.createElement("section");
    sheet.className = "snug-dir-sheet";
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-label", "Town directory");
    sheet.hidden = true;
    sheet.innerHTML =
      `<div class="snug-dir-head"><b>Town Directory</b>` +
      `<button type="button" class="snug-dir-close" aria-label="Close directory">×</button></div>` +
      `<div class="snug-dir-list"></div>` +
      `<p class="snug-dir-note">Tap someone to light a path to them.</p>`;
    $(".snug-dir-close", sheet).addEventListener("click", () => toggleDirectory(false));
    sheet.addEventListener("click", (e) => {
      const row = e.target.closest?.("[data-dir-dest]");
      if (!row) return;
      lightPathTo(row.dataset.dirDest);
      toggleDirectory(false);
    });
    document.body.appendChild(sheet);
    return sheet;
  }

  function renderDirectoryList() {
    const list = $(".snug-dir-list", ensureSheet());
    if (!list) return;
    const rows = [];
    state.characters.forEach((c) => {
      const pos = npcPos(c);
      rows.push(
        `<button type="button" class="snug-dir-row" data-dir-dest="npc:${c.id}">` +
        `<i class="snug-dir-mark" aria-hidden="true">${initials(c.name)}</i>` +
        `<span><b>${escapeHtml(c.name)}</b><small>${escapeHtml(c.role)}${pos ? "" : " · out and about"}</small></span>` +
        `<em aria-hidden="true">→</em></button>`
      );
    });
    if (state.characters.length === 0) {
      rows.push(`<p class="snug-dir-empty">The town is still waking up…</p>`);
    }
    rows.push(`<div class="snug-dir-subhead">Places</div>`);
    PLACES.forEach((p) => {
      rows.push(
        `<button type="button" class="snug-dir-row" data-dir-dest="place:${p.id}">` +
        `<i class="snug-dir-mark is-place" aria-hidden="true">${p.icon}</i>` +
        `<span><b>${escapeHtml(p.name)}</b><small>${escapeHtml(p.job)}</small></span>` +
        `<em aria-hidden="true">→</em></button>`
      );
    });
    // My Home opens the home tab (different view, no 3D path).
    rows.push(
      `<button type="button" class="snug-dir-row" data-dir-dest="tab:home">` +
      `<i class="snug-dir-mark is-place" aria-hidden="true">⌂</i>` +
      `<span><b>My Home</b><small>Your house & plot</small></span>` +
      `<em aria-hidden="true">→</em></button>`
    );
    list.innerHTML = rows.join("");
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  function toggleDirectory(force) {
    const open = typeof force === "boolean" ? force : !state.dirOpen;
    state.dirOpen = open;
    const sh = ensureSheet();
    sh.hidden = !open;
    document.body.classList.toggle("snug-dir-open", open);
    if (open) { renderDirectoryList(); drawMinimap(); }
  }

  /* ---------- minimap ---------- */
  let mapWrap = null, mapCanvas = null, mapToggle = null;
  function ensureMinimap() {
    if (mapWrap) return mapWrap;
    mapWrap = document.createElement("div");
    mapWrap.className = "snug-minimap-wrap";
    mapWrap.hidden = true;
    mapWrap.innerHTML =
      `<canvas class="snug-minimap" width="220" height="220" aria-label="Town minimap"></canvas>` +
      `<div class="snug-minimap-bar">` +
      `<button type="button" class="snug-minimap-clear" hidden>Clear path</button>` +
      `</div>`;
    mapCanvas = $(".snug-minimap", mapWrap);
    $(".snug-minimap-clear", mapWrap).addEventListener("click", clearPath);
    mapCanvas.addEventListener("click", (e) => {
      // Tap an NPC dot to light a path there.
      const hit = hitTestDot(e);
      if (hit) lightPathTo(`npc:${hit}`);
    });
    document.body.appendChild(mapWrap);

    mapToggle = document.createElement("button");
    mapToggle.type = "button";
    mapToggle.className = "snug-minimap-toggle";
    mapToggle.setAttribute("aria-label", "Toggle minimap");
    mapToggle.setAttribute("aria-pressed", "false");
    mapToggle.innerHTML = `<span aria-hidden="true">◈</span>`;
    mapToggle.addEventListener("click", () => toggleMinimap());
    document.body.appendChild(mapToggle);
    updateMapVisibility();
    return mapWrap;
  }

  function toggleMinimap(force) {
    const open = typeof force === "boolean" ? force : !state.mapOpen;
    state.mapOpen = open;
    ensureMinimap().hidden = !open;
    if (mapToggle) mapToggle.setAttribute("aria-pressed", String(open));
    if (open) drawMinimap();
  }
  function updateMapVisibility() {
    const inWorld = window.__snugWorld && window.__snugWorld.mode === "village" &&
      !document.documentElement.classList.contains("snug-start-open");
    if (mapToggle) mapToggle.hidden = !inWorld;
    if (!inWorld && state.mapOpen) toggleMinimap(false);
  }

  // Cached dot geometry for tap hits: [{id, cx, cy, r}]
  let dotHits = [];
  function hitTestDot(e) {
    const rect = mapCanvas.getBoundingClientRect();
    const scaleX = mapCanvas.width / rect.width, scaleY = mapCanvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX, y = (e.clientY - rect.top) * scaleY;
    for (const d of dotHits) {
      if (Math.hypot(x - d.cx, y - d.cy) < d.r + 6) return d.id;
    }
    return null;
  }

  function drawMinimap() {
    if (!state.mapOpen || !mapCanvas) return;
    const ctx = mapCanvas.getContext("2d");
    const W = mapCanvas.width, H = mapCanvas.height;
    ctx.clearRect(0, 0, W, H);
    dotHits = [];

    const pp = playerPos();
    const pts = [];
    state.characters.forEach((c) => {
      const p = npcPos(c);
      if (p) pts.push({ ...p });
    });
    if (pp) pts.push({ ...pp });
    if (pts.length === 0) {
      ctx.fillStyle = "#8a9496"; ctx.font = "11px sans-serif"; ctx.textAlign = "center";
      ctx.fillText("…", W / 2, H / 2);
      return;
    }
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    pts.forEach((p) => {
      minX = Math.min(minX, p.x); maxX = Math.max(maxX, p.x);
      minZ = Math.min(minZ, p.z); maxZ = Math.max(maxZ, p.z);
    });
    const pad = 6;
    minX -= pad; maxX += pad; minZ -= pad; maxZ += pad;
    const sx = W / Math.max(1, maxX - minX), sz = H / Math.max(1, maxZ - minZ);
    const s = Math.min(sx, sz);
    const ox = (W - (maxX - minX) * s) / 2, oz = (H - (maxZ - minZ) * s) / 2;
    const X = (x) => ox + (x - minX) * s;
    const Z = (z) => oz + (z - minZ) * s;

    // Ground
    ctx.fillStyle = "#dcebd4";
    ctx.beginPath(); ctx.roundRect(0, 0, W, H, 14); ctx.fill();

    // NPC dots
    state.characters.forEach((c) => {
      const p = npcPos(c);
      if (!p) return;
      const cx = X(p.x), cy = Z(p.z);
      const isDest = state.path && state.path.destId === `npc:${c.id}`;
      ctx.beginPath(); ctx.arc(cx, cy, isDest ? 8 : 5, 0, Math.PI * 2);
      ctx.fillStyle = isDest ? "#e76854" : "#5c8d65";
      ctx.fill();
      ctx.lineWidth = 2; ctx.strokeStyle = "#fff"; ctx.stroke();
      dotHits.push({ id: c.id, cx, cy, r: isDest ? 8 : 5 });
    });

    // Player dot (on top)
    if (pp) {
      const cx = X(pp.x), cy = Z(pp.z);
      ctx.beginPath(); ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#26383b"; ctx.fill();
      ctx.lineWidth = 2.5; ctx.strokeStyle = "#ffd75e"; ctx.stroke();
    }
  }

  /* ---------- path lighting (3D) ---------- */
  let pathGroup = null;
  let pulseT = 0;

  function three() { return window.__snugThree; }
  function worldScene() {
    const w = window.__snugWorld;
    return w && w.mode === "village" ? w.scene : null;
  }

  function resolveDest(destId) {
    // destId like "npc:chip-chance" | "place:place-garden" | "tab:home"
    const [kind, id] = destId.split(":");
    if (kind === "tab") return { kind, id, pos: null };
    if (kind === "npc") {
      const c = findNpc(id);
      const p = c && npcPos(c);
      return p ? { kind, id, name: c.name, pos: p } : null;
    }
    if (kind === "place") {
      const pl = PLACES.find((p) => p.id === id);
      const c = pl && findNpc(pl.anchorNpc);
      const p = c && npcPos(c);
      return p ? { kind, id, name: pl.name, pos: p } : null;
    }
    return null;
  }

  function lightPathTo(destId) {
    const dest = resolveDest(destId);
    if (!dest) return;
    if (dest.kind === "tab") {
      // My Home: switch tabs instead of a 3D path.
      const tab = [...document.querySelectorAll(".tabbar button")]
        .find((b) => /^My Home$/i.test(b.textContent?.trim() || ""));
      tab?.click();
      return;
    }
    clearPath();
    state.path = { destId, destName: dest.name, dest: dest.pos, markers: [] };
    buildPathMarkers();
    state.lastPathCalc = performance.now();
    const clearBtn = $(".snug-minimap-clear");
    if (clearBtn) clearBtn.hidden = false;
    try {
      window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "select" } }));
    } catch (_) {}
    drawMinimap();
  }

  function buildPathMarkers() {
    const T = three(), scene = worldScene();
    const pp = playerPos();
    if (!T || !scene || !pp || !state.path) return;
    clearMarkers();
    const dest = state.path.dest;
    const dx = dest.x - pp.x, dz = dest.z - pp.z;
    const dist = Math.hypot(dx, dz);
    if (dist < 3) { arrive(); return; }
    // Cap markers; spacing ~1.2m.
    const count = Math.min(36, Math.max(4, Math.floor(dist / 1.2)));
    if (!pathGroup) {
      pathGroup = new T.Group();
      pathGroup.name = "SnugDirectoryPath";
    }
    const geo = new T.CircleGeometry(0.32, 20);
    const mat = new T.MeshBasicMaterial({ color: 0xffd75e, transparent: true, opacity: 0.85, depthWrite: false });
    for (let i = 1; i <= count; i++) {
      const t = i / (count + 1);
      const m = new T.Mesh(geo, mat.clone());
      m.rotation.x = -Math.PI / 2;
      m.position.set(pp.x + dx * t, 0.06, pp.z + dz * t);
      m.userData.phase = t * Math.PI * 2;
      pathGroup.add(m);
      state.path.markers.push(m);
    }
    // Destination beacon: a taller glowing pillar.
    const beaconGeo = new T.CylinderGeometry(0.28, 0.42, 2.2, 12, 1, true);
    const beaconMat = new T.MeshBasicMaterial({ color: 0xe76854, transparent: true, opacity: 0.55, side: T.DoubleSide, depthWrite: false });
    const beacon = new T.Mesh(beaconGeo, beaconMat);
    beacon.position.set(dest.x, 1.1, dest.z);
    beacon.userData.isBeacon = true;
    pathGroup.add(beacon);
    state.path.markers.push(beacon);
    if (!pathGroup.parent) scene.add(pathGroup);
  }

  function clearMarkers() {
    if (!pathGroup) return;
    pathGroup.children.forEach((m) => {
      m.geometry?.dispose?.();
      m.material?.dispose?.();
    });
    pathGroup.clear();
  }
  function clearPath() {
    clearMarkers();
    if (pathGroup && pathGroup.parent) pathGroup.parent.remove(pathGroup);
    pathGroup = null;
    state.path = null;
    const clearBtn = $(".snug-minimap-clear");
    if (clearBtn) clearBtn.hidden = true;
    drawMinimap();
  }
  function arrive() {
    const name = state.path ? state.path.destName : "destination";
    clearPath();
    try {
      window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "fanfare" } }));
    } catch (_) {}
    // Gentle toast via existing multiplayer toast style if present, else skip.
    console.info(`[directory] arrived at ${name}`);
  }

  // Pulse animation + throttled recalc + arrival check.
  function tick(now) {
    if (state.path && state.path.markers.length) {
      const pp = playerPos();
      const dest = state.path.dest;
      if (pp && dest) {
        const dist = Math.hypot(dest.x - pp.x, dest.z - pp.z);
        if (dist < 3) { arrive(); }
        else if (now - state.lastPathCalc > 2000) {
          state.lastPathCalc = now;
          buildPathMarkers(); // rebuild from current player pos
        }
      }
      if (!reducedMotion()) {
        pulseT = now / 450;
        state.path.markers.forEach((m) => {
          if (m.userData.isBeacon) {
            m.material.opacity = 0.45 + 0.2 * Math.sin(pulseT * 2);
          } else {
            const s = 1 + 0.22 * Math.sin(pulseT * 2 + m.userData.phase);
            m.scale.set(s, s, 1);
          }
        });
      }
    }
    // Throttled minimap refresh (player dot moves).
    if (state.mapOpen && (!tick.lastMap || now - tick.lastMap > 1500)) {
      tick.lastMap = now;
      drawMinimap();
    }
    requestAnimationFrame(tick);
  }

  /* ---------- wiring ---------- */
  function init() {
    window.addEventListener("snug-npc-roster-ready", (e) => refreshCharacters(e.detail));
    window.addEventListener("snug-world-ready", () => {
      setTimeout(() => { updateFabVisibility(); updateMapVisibility(); }, 800);
    });
    // Player taps elsewhere in the world clears the path (but not minimap taps).
    window.addEventListener("pointerup", (e) => {
      if (!state.path) return;
      const t = e.target;
      if (t && t.closest && (t.closest(".snug-dir-sheet") || t.closest(".snug-minimap-wrap") || t.closest(".snug-dir-fab"))) return;
      // Only clear on taps to the 3D canvas (walking elsewhere).
      const canvas = window.__snugWorld && window.__snugWorld.renderer && window.__snugWorld.renderer.domElement;
      if (canvas && (t === canvas || canvas.contains(t))) clearPath();
    }, true);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (state.dirOpen) toggleDirectory(false);
        else if (state.path) clearPath();
      }
    });

    ensureDirButton();
    ensureMinimap();
    updateFabVisibility();
    updateMapVisibility();
    requestAnimationFrame(tick);

    window.__snugDirectory = {
      open: () => toggleDirectory(true),
      close: () => toggleDirectory(false),
      lightPathTo,
      clearPath,
      toggleMinimap: (f) => toggleMinimap(f),
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

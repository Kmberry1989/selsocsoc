/* Selfie Social Society — versioned fresh start.
 *
 * When FRESH_START_VERSION is bumped, every player boots into a wipe:
 *  1. All local player data is cleared (localStorage + IndexedDB), EXCEPT
 *     Firebase Auth state (never signs anyone out).
 *  2. The player's own Firestore doc (players/{uid}) is deleted via the
 *     REST API using their own ID token. No other docs or collections
 *     are touched.
 *  3. The game reloads into the brand-new-player path, which runs the
 *     welcoming committee onboarding from scratch.
 *
 * The wipe is idempotent: a version flag + pending flag in localStorage
 * guarantee it runs exactly once per version bump, and a second boot
 * never wipes again.
 */
(() => {
  if (window.__snugFreshStart) return;
  window.__snugFreshStart = true;

  const FRESH_START_VERSION = 1;
  const VERSION_KEY = "snug-fresh-start-version";
  const PENDING_KEY = "snug-fresh-start-pending";

  const readVersion = () => {
    try { return parseInt(localStorage.getItem(VERSION_KEY) || "0", 10) || 0; }
    catch { return 0; }
  };
  const isPending = () => {
    try { return localStorage.getItem(PENDING_KEY) === "1"; }
    catch { return false; }
  };

  let splashEl = null;
  function showSplash(text) {
    hideSplash();
    splashEl = document.createElement("div");
    splashEl.setAttribute("role", "status");
    splashEl.setAttribute("aria-live", "polite");
    splashEl.style.cssText = [
      "position:fixed", "inset:0", "z-index:99999",
      "display:grid", "place-items:center",
      "background:#172021", "color:#fffdf8",
      "font:600 15px/1.5 system-ui,sans-serif",
    ].join(";");
    const box = document.createElement("div");
    box.style.cssText = "text-align:center;padding:24px;max-width:min(420px,90vw)";
    box.textContent = text;
    splashEl.appendChild(box);
    (document.body || document.documentElement).appendChild(splashEl);
  }
  function hideSplash() {
    if (splashEl && splashEl.parentNode) splashEl.parentNode.removeChild(splashEl);
    splashEl = null;
  }

  async function wipeLocal() {
    // localStorage: keep Firebase Auth keys so nobody gets signed out.
    try {
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const k = localStorage.key(i);
        if (!k || k.indexOf("firebase:") === 0) continue;
        try { localStorage.removeItem(k); } catch { /* next */ }
      }
    } catch { /* storage unavailable */ }
    // IndexedDB: drop every game database except Firebase Auth's own.
    try {
      if (indexedDB && typeof indexedDB.databases === "function") {
        const dbs = await indexedDB.databases();
        for (const db of dbs || []) {
          const name = db && db.name;
          if (!name || name === "firebaseLocalStorageDb") continue;
          await new Promise((resolve) => {
            let req;
            try { req = indexedDB.deleteDatabase(name); }
            catch { resolve(); return; }
            req.onsuccess = req.onerror = req.onblocked = () => resolve();
          });
        }
      }
    } catch { /* indexedDB unavailable */ }
  }

  function waitForSession(timeoutMs) {
    return new Promise((resolve) => {
      if (window.__snugSession && window.__snugSession.user) {
        resolve(window.__snugSession);
        return;
      }
      let done = false;
      const finish = (session) => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        window.removeEventListener("snug-session", onSession);
        resolve(session || window.__snugSession || null);
      };
      const onSession = (e) => finish(e && e.detail);
      const timer = setTimeout(() => finish(null), timeoutMs);
      window.addEventListener("snug-session", onSession);
    });
  }

  async function deletePlayerDoc(session) {
    const user = session && session.user;
    const uid = (session && session.uid) || (user && user.uid);
    const projectId = (session && (session.projectId || (session.app && session.app.options && session.app.options.projectId))) || null;
    if (!uid || !projectId || !user || typeof user.getIdToken !== "function") return false;
    const token = await user.getIdToken();
    const url = "https://firestore.googleapis.com/v1/projects/" +
      encodeURIComponent(projectId) + "/databases/(default)/documents/players/" +
      encodeURIComponent(uid);
    const res = await fetch(url, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });
    return res.ok || res.status === 404;
  }

  async function run() {
    const needsWipe = readVersion() < FRESH_START_VERSION;
    if (!needsWipe && !isPending()) return; // normal boot: nothing to do

    showSplash("Starting fresh…");
    if (needsWipe) {
      await wipeLocal();
      try {
        localStorage.setItem(VERSION_KEY, String(FRESH_START_VERSION));
        localStorage.setItem(PENDING_KEY, "1");
      } catch { /* storage unavailable */ }
    }

    // Delete the player's own Firestore doc, then reload into the
    // new-player path (welcoming committee). Retry a few times so a
    // slow network never leaves a half-wiped state.
    for (let attempt = 0; attempt < 4; attempt++) {
      try {
        const session = await waitForSession(20000);
        if (session && session.user) {
          const ok = await deletePlayerDoc(session);
          if (ok) {
            try { localStorage.removeItem(PENDING_KEY); } catch { /* next */ }
            location.reload();
            return;
          }
        }
      } catch { /* retry */ }
      await new Promise((r) => setTimeout(r, 2500));
    }
    showSplash("Could not reach the server to finish the fresh start. Check your connection and reload.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();

/* First-time town tour — Gideon leads new neighbors through six stops.
   Hooks in after the welcome-committee onboarding completes. State lives in
   profile.tutorial (Firestore players/{uid} via snug-player-patch) with a
   localStorage backup. Never replays once complete or skipped. */
(() => {
  "use strict";

  const GIDEON = { name: "Gideon", role: "Tour guide", mark: "G", color: "#b07a3f" };
  const REWARD_SHELLS = 50;
  const LS_KEY = "snug-tutorial-walkthrough";

  const STOPS = [
    {
      id: "move", title: "Stretch your legs",
      line: "First, your feet! Tap anywhere on the ground and you'll stroll right over. Go on \u2014 pick a spot. The town is very walkable and only mildly judgmental.",
      hint: "Tap the ground to walk",
    },
    {
      id: "camera", title: "Look around",
      line: "Lovely footwork! Now the eyes: drag to look around, pinch to zoom \u2014 or tap the camera buttons if your fingers feel traditional. Give it a try!",
      hint: "Drag, pinch, or use the camera buttons",
    },
    {
      id: "whirl", title: "Whirl of Resources",
      line: "See that pavilion? That's the Whirl of Resources, where Chip Chance spins the wheel and remembers every winner. Pop in and take a peek \u2014 the wheel's friendlier than it looks.",
      hint: "Open the Whirl of Resources",
    },
    {
      id: "shop", title: "Shells & shopping",
      line: "Shells are our local currency \u2014 earn them playing games, spend them at Meadow Market with Barnaby Bargain. His prices rotate daily; his dramatic flair is permanent. Have a browse!",
      hint: "Browse Barnaby's Meadow Market",
    },
    {
      id: "style", title: "Dress the part",
      line: "Now, fashion! Open your Style menu and try something on. Hats, outfits, accessories \u2014 this town judges only kindly, I promise.",
      hint: "Open Style and try something on",
    },
    {
      id: "garden", title: "Home & garden",
      line: "Last stop: home sweet home! Your garden bed is all yours, and Fern Bramble's seedlings gossip after rain, you know. Open Town Life and visit the garden.",
      hint: "Open Town Life \u2192 Garden",
    },
    {
      id: "gameshub", title: "Every game in town",
      line: "But wait \u2014 there's more! Tap the Play tab and you'll find the Games Hub: every game in town on one board \u2014 Whirl, Snug Board, card games, the whole arcade. Give it a look!",
      hint: "Open the Play tab \u2192 Games Hub",
    },
    {
      id: "directory", title: "Never get lost",
      line: "And if you ever get turned around, tap the little map button: the Town Directory lists every neighbor and lights a glowing path right to their doorstep. Lost? I'll light your way!",
      hint: "Open the Town Directory",
    },
  ];

  const INTRO_LINE = "Well butter my biscuit \u2014 a new neighbor, all moved in and photo-ready! I'm Gideon, Cyclical City's tour guide and purveyor of fine facts. Eight little stops and you'll know this town like the back of my hand. Ready?";
  const FAREWELL_LINE = "And that's the grand tour! Fifty shells for the road, courtesy of the Cyclical City welcoming committee \u2014 which is me. I am the committee. Oh \u2014 and tap the Story button when you get a chance. Every neighbor's got a tale, and yours is just getting started. Go make yourself at home, neighbor!";

  const state = {
    active: false,          // tutorial running this session
    phase: "idle",          // idle | intro | stop | farewell | done
    stopIndex: 0,
    doneStops: [],
    sawWelcome: false,
    started: false,
    tut: {},                // persisted {started, step, complete, skipped}
    uid: "",
    cleanup: [],
  };

  const $ = (s, r = document) => r.querySelector(s);
  const reducedMotion = () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- persistence ---------- */
  function readProfileTutorial() {
    try {
      const p = window.__snugWardrobe && window.__snugWardrobe.profile ? window.__snugWardrobe.profile() : null;
      if (p && p.tutorial && typeof p.tutorial === "object") return p.tutorial;
    } catch (_) { /* fall through */ }
    return null;
  }
  function readLocal() {
    try {
      const raw = localStorage.getItem(LS_KEY + (state.uid ? ":" + state.uid : ""));
      return raw ? JSON.parse(raw) : null;
    } catch (_) { return null; }
  }
  function loadTut() {
    const fromProfile = readProfileTutorial();
    const fromLocal = readLocal();
    // Prefer whichever has more progress; profile wins ties.
    const score = (t) => (t ? (t.complete ? 100 : t.skipped ? 90 : (t.started ? 10 + (t.step || 0) : 0)) : -1);
    state.tut = score(fromProfile) >= score(fromLocal) ? (fromProfile || {}) : (fromLocal || {});
  }
  function saveTut(patch) {
    state.tut = { ...state.tut, ...patch };
    try {
      const snap = { ...state.tut };
      window.dispatchEvent(new CustomEvent("snug-player-patch", {
        detail: (player) => ({ ...player, tutorial: { ...((player && player.tutorial) || {}), ...snap } }),
      }));
    } catch (_) { /* bundle not ready; localStorage still covers us */ }
    try {
      localStorage.setItem(LS_KEY + (state.uid ? ":" + state.uid : ""), JSON.stringify(state.tut));
    } catch (_) { /* private mode etc. */ }
  }
  const isDone = () => !!(state.tut.complete || state.tut.skipped);

  /* ---------- Gideon voice ---------- */
  let voice = null;
  function pickVoice() {
    try {
      const voices = speechSynthesis.getVoices() || [];
      const en = voices.filter((v) => /^en/i.test(v.lang));
      // Lower-pitched masculine voice for the older tour guide.
      const pick = en.find((v) => /male|david|daniel|george|fred/i.test(v.name)) || en[0] || voices[0];
      return pick || null;
    } catch (_) { return null; }
  }
  function speak(text) {
    try {
      if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return;
      speechSynthesis.cancel();
      if (!voice) voice = pickVoice();
      const u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95; u.pitch = 0.7; u.volume = 0.9;
      if (voice) u.voice = voice;
      speechSynthesis.speak(u);
    } catch (_) { /* voice is garnish, never load-bearing */ }
  }
  function hush() {
    try { if ("speechSynthesis" in window) speechSynthesis.cancel(); } catch (_) {}
  }
  if ("speechSynthesis" in window) {
    try {
      speechSynthesis.getVoices();
      if (typeof speechSynthesis.onvoiceschanged !== "undefined") speechSynthesis.onvoiceschanged = () => { voice = null; };
    } catch (_) {}
  }

  /* ---------- panel ---------- */
  let panel = null;
  function ensurePanel() {
    if (panel) return panel;
    panel = document.createElement("section");
    panel.className = "snug-tutorial-dialogue";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-live", "polite");
    panel.setAttribute("aria-label", "Town tour with Gideon");
    panel.hidden = true;
    panel.innerHTML =
      '<div class="snug-tutorial-progress" aria-hidden="true"></div>' +
      '<div class="snug-tutorial-main">' +
        `<div class="snug-tutorial-portrait" style="--tut-color:${GIDEON.color}" aria-hidden="true"><span>${GIDEON.mark}</span></div>` +
        '<div class="snug-tutorial-copy">' +
          `<small>${GIDEON.role}</small><b>${GIDEON.name}</b>` +
          '<p class="snug-tutorial-line"></p>' +
          '<p class="snug-tutorial-hint"></p>' +
        "</div>" +
      "</div>" +
      '<div class="snug-tutorial-actions">' +
        '<button type="button" class="snug-tutorial-skip">Skip tour</button>' +
        '<button type="button" class="snug-tutorial-primary" hidden></button>' +
        '<button type="button" class="snug-tutorial-manual" hidden>Continue anyway</button>' +
      "</div>";
    $(".snug-tutorial-skip", panel).addEventListener("click", skipTour);
    $(".snug-tutorial-manual", panel).addEventListener("click", () => completeStep());
    document.body.appendChild(panel);
    return panel;
  }
  function renderProgress() {
    const el = $(".snug-tutorial-progress", panel);
    el.innerHTML = "";
    const total = STOPS.length;
    const label = document.createElement("span");
    label.className = "snug-tutorial-step-label";
    if (state.phase === "intro") label.textContent = "Town tour";
    else if (state.phase === "farewell" || state.phase === "done") label.textContent = "Tour complete";
    else label.textContent = `Stop ${Math.min(state.stopIndex + 1, total)} of ${total}`;
    el.appendChild(label);
    const dots = document.createElement("span");
    dots.className = "snug-tutorial-dots";
    STOPS.forEach((s, i) => {
      const d = document.createElement("i");
      if (state.doneStops.includes(s.id)) d.className = "is-done";
      else if (state.phase === "stop" && i === state.stopIndex) d.className = "is-current";
      dots.appendChild(d);
    });
    el.appendChild(dots);
  }
  function showLine(text, hint, primaryLabel, primaryFn) {
    ensurePanel();
    panel.hidden = false;
    document.body.classList.add("snug-tutorial-talking");
    renderProgress();
    const lineEl = $(".snug-tutorial-line", panel);
    const hintEl = $(".snug-tutorial-hint", panel);
    hintEl.textContent = hint || "";
    hintEl.hidden = !hint;
    const primary = $(".snug-tutorial-primary", panel);
    const manual = $(".snug-tutorial-manual", panel);
    if (manual && !manual.hidden && state.phase !== "stop") manual.hidden = true;
    if (primaryLabel) {
      primary.hidden = false;
      primary.textContent = primaryLabel;
      primary.onclick = primaryFn || null;
      setTimeout(() => { try { primary.focus({ preventScroll: true }); } catch (_) {} }, 60);
    } else {
      primary.hidden = true;
      primary.onclick = null;
    }
    if (reducedMotion()) {
      lineEl.textContent = text;
    } else {
      lineEl.classList.remove("is-in");
      lineEl.textContent = text;
      requestAnimationFrame(() => requestAnimationFrame(() => lineEl.classList.add("is-in")));
    }
    speak(text);
  }
  function hidePanel() {
    hush();
    if (panel) panel.hidden = true;
    document.body.classList.remove("snug-tutorial-talking");
  }

  /* ---------- step completion wiring ---------- */
  function on(cleanup) { state.cleanup.push(cleanup); }
  function clearStepWatchers() {
    state.cleanup.forEach((fn) => { try { fn(); } catch (_) {} });
    state.cleanup = [];
  }
  function completeStep() {
    if (state.phase !== "stop") return;
    const stop = STOPS[state.stopIndex];
    if (!stop || state.doneStops.includes(stop.id)) return;
    clearStepWatchers();
    state.doneStops.push(stop.id);
    saveTut({ step: state.stopIndex + 1 });
    renderProgress();
    const dots = panel && panel.querySelectorAll(".snug-tutorial-dots i");
    if (dots && dots[state.stopIndex]) dots[state.stopIndex].className = "is-done";
    try { window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "select" } })); } catch (_) {}
    setTimeout(advance, reducedMotion() ? 200 : 1400);
  }
  function overlaysOpen() {
    const selectors = [
      ".whirl-game:not([hidden])",
      ".society-backdrop",
      ".town-life-backdrop",
      ".multiplayer-backdrop",
      ".snug-board-backdrop",
    ];
    return selectors.some((s) => {
      const el = document.querySelector(s);
      return el && el.offsetParent !== null;
    });
  }
  function advance() {
    if (!state.active) return;
    // Let the player finish browsing before Gideon continues.
    if (overlaysOpen()) {
      setTimeout(advance, 800);
      return;
    }
    state.stopIndex += 1;
    if (state.stopIndex >= STOPS.length) return farewell();
    showStop(state.stopIndex);
  }

  function watchMove() {
    let start = null;
    const handler = (e) => {
      const p = e && e.detail;
      if (!p || typeof p.x !== "number") return;
      if (!start) { start = { x: p.x, z: p.z || 0 }; return; }
      if (Math.hypot(p.x - start.x, (p.z || 0) - start.z) > 2) completeStep();
    };
    window.addEventListener("snug-player-move", handler);
    on(() => window.removeEventListener("snug-player-move", handler));
  }
  function watchCamera() {
    const snap = () => {
      const s = window.__snugCameraSettings;
      return s ? { a: s.azimuth, d: s.distance, h: s.height } : null;
    };
    const before = snap();
    const clickHandler = (e) => {
      if (e.target && e.target.closest && e.target.closest("[data-camera-control]")) completeStep();
    };
    document.addEventListener("click", clickHandler, true);
    on(() => document.removeEventListener("click", clickHandler, true));
    const timer = setInterval(() => {
      const now = snap();
      if (before && now && (Math.abs(now.a - before.a) > 0.02 || Math.abs(now.d - before.d) > 0.05 || Math.abs(now.h - before.h) > 0.05)) {
        clearInterval(timer);
        completeStep();
      }
    }, 400);
    on(() => clearInterval(timer));
  }
  function watchWhirl() {
    let done = false;
    const fire = () => { if (!done) { done = true; completeStep(); } };
    const wrap = () => {
      const w = window.__snugWhirlOfResources;
      if (w && !w.__snugTutWrapped) {
        const orig = w.open.bind(w);
        w.open = (...args) => { fire(); return orig(...args); };
        w.__snugTutWrapped = true;
      }
      return !!w;
    };
    wrap();
    const timer = setInterval(() => {
      if (wrap()) { /* wrapped */ }
      const root = document.querySelector(".whirl-game");
      if (root && !root.hidden) { clearInterval(timer); fire(); }
    }, 500);
    on(() => clearInterval(timer));
  }
  function watchShop() {
    const timer = setInterval(() => {
      const sheet = [...document.querySelectorAll(".sheet")].find((s) => {
        const h = s.querySelector(".sheet-head h2");
        return h && h.textContent.trim() === "Meadow Market";
      });
      if (sheet && sheet.offsetParent !== null) { clearInterval(timer); completeStep(); }
    }, 500);
    on(() => clearInterval(timer));
  }
  function watchStyle() {
    const handler = (e) => {
      const t = e.target;
      if (t && t.closest) {
        if (t.closest(".tabbar") && /^\s*Style\s*$/i.test(t.textContent || "")) { completeStep(); return; }
        if (t.closest(".cosmetic-selects")) { /* opened style UI; a change completes it */ }
      }
    };
    const changeHandler = (e) => {
      if (e.target && e.target.closest && e.target.closest(".cosmetic-selects")) completeStep();
    };
    document.addEventListener("click", handler, true);
    document.addEventListener("change", changeHandler, true);
    on(() => {
      document.removeEventListener("click", handler, true);
      document.removeEventListener("change", changeHandler, true);
    });
  }
  function watchGarden() {
    const handler = (e) => {
      const t = e.target && e.target.closest && e.target.closest('[data-town-view="garden"]');
      if (t) completeStep();
    };
    document.addEventListener("click", handler, true);
    on(() => document.removeEventListener("click", handler, true));
  }
  function watchGamesHub() {
    let done = false;
    const fire = () => { if (!done) { done = true; completeStep(); } };
    const timer = setInterval(() => {
      const hub = document.querySelector("#snug-games-hub");
      if (hub && hub.offsetParent !== null) { clearInterval(timer); fire(); }
    }, 500);
    on(() => clearInterval(timer));
  }
  function watchDirectory() {
    let done = false;
    const fire = () => { if (!done) { done = true; completeStep(); } };
    const timer = setInterval(() => {
      const sheet = document.querySelector(".snug-dir-sheet");
      if (sheet && !sheet.hidden) { clearInterval(timer); fire(); }
    }, 500);
    on(() => clearInterval(timer));
  }

  const WATCHERS = { move: watchMove, camera: watchCamera, whirl: watchWhirl, shop: watchShop, style: watchStyle, garden: watchGarden, gameshub: watchGamesHub, directory: watchDirectory };

  function showStop(i) {
    const stop = STOPS[i];
    if (!stop) return farewell();
    state.phase = "stop";
    clearStepWatchers();
    showLine(stop.line, stop.hint, null, null);
    // Soft-lock safety: if the action isn't detected in 45s, offer a manual continue.
    const manual = panel && $(".snug-tutorial-manual", panel);
    if (manual) {
      manual.hidden = true;
      const t = setTimeout(() => {
        if (state.phase === "stop" && state.active) manual.hidden = false;
      }, 45000);
      on(() => { clearTimeout(t); if (manual) manual.hidden = true; });
    }
    try { WATCHERS[stop.id](); } catch (err) { console.warn("Snug tutorial watcher failed:", err); }
  }

  function startTour() {
    if (state.active) return;
    state.active = true;
    state.phase = "intro";
    state.stopIndex = 0;
    state.doneStops = [];
    saveTut({ started: true, step: 0 });
    showLine(INTRO_LINE, "", "Start the tour", () => showStop(0));
  }
  function resumeTour() {
    if (state.active) return;
    state.active = true;
    const idx = Math.min(Math.max(0, Number(state.tut.step) || 0), STOPS.length - 1);
    state.stopIndex = idx;
    state.doneStops = STOPS.slice(0, idx).map((s) => s.id);
    state.phase = "intro";
    showLine("Welcome back! We were right in the middle of your grand tour. Shall we pick up where we left off?", "", "Continue the tour", () => showStop(idx));
  }
  function farewell() {
    state.phase = "farewell";
    clearStepWatchers();
    showLine(FAREWELL_LINE, "", "Finish", finishTour);
  }
  function finishTour() {
    state.phase = "done";
    state.active = false;
    clearStepWatchers();
    hidePanel();
    saveTut({ complete: true, step: STOPS.length });
    try {
      window.dispatchEvent(new CustomEvent("snug-award-coins", {
        detail: { amount: REWARD_SHELLS, message: `Tour complete! +${REWARD_SHELLS} shells` },
      }));
    } catch (_) {}
    try {
      window.dispatchEvent(new CustomEvent("snug-tutorial-complete", { detail: { reward: REWARD_SHELLS } }));
    } catch (_) {}
  }
  function skipTour() {
    if (!state.active) return;
    state.active = false;
    state.phase = "idle";
    clearStepWatchers();
    hidePanel();
    saveTut({ skipped: true });
    try {
      window.dispatchEvent(new CustomEvent("snug-tutorial-skipped", {}));
    } catch (_) {}
  }

  /* ---------- trigger: after welcome onboarding ---------- */
  function villageReady() {
    return window.__snugWorld && window.__snugWorld.mode === "village" &&
      !document.documentElement.classList.contains("snug-start-open");
  }
  function maybeStart() {
    if (state.started || isDone()) return;
    loadTut();
    if (isDone()) return;
    // Resume an in-progress tour on reload.
    if (state.tut.started && !state.tut.complete && !state.tut.skipped && villageReady()) {
      state.started = true;
      setTimeout(resumeTour, 2500);
      return;
    }
    // Fresh tour: only in the session where onboarding just completed.
    if (state.tut.started) return; // started before, handled above or done
    if (state.sawWelcome && villageReady()) {
      state.started = true;
      setTimeout(() => { if (!isDone() && villageReady()) startTour(); }, 2500);
    }
  }

  function init() {
    try {
      const sess = window.__snugSession;
      if (sess && sess.uid) state.uid = String(sess.uid);
    } catch (_) {}
    window.addEventListener("snug-session", (e) => {
      try { if (e && e.detail && e.detail.uid) state.uid = String(e.detail.uid); } catch (_) {}
      loadTut();
    });
    window.addEventListener("snug-player-patch", () => { /* profile may now carry tutorial */ });

    const checkWelcome = () => {
      if (document.documentElement.classList.contains("snug-start-open")) state.sawWelcome = true;
    };
    checkWelcome();
    const watchTimer = setInterval(() => {
      checkWelcome();
      maybeStart();
      if (state.started) clearInterval(watchTimer);
    }, 700);
    setTimeout(() => clearInterval(watchTimer), 5 * 60 * 1000); // don't poll forever

    window.addEventListener("snug-world-ready", () => setTimeout(maybeStart, 1200));

    // Keyboard: Escape skips (the Skip tour button is the primary path).
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && state.active && panel && !panel.hidden) skipTour();
    });

    // Public API for debugging / external hooks.
    window.__snugTutorial = {
      start: startTour,
      skip: skipTour,
      state: () => ({ active: state.active, phase: state.phase, stop: state.stopIndex, tut: { ...state.tut } }),
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

(() => {
  "use strict";

  const configured = new WeakSet();
  const nativeFetch = window.fetch.bind(window);
  const nativeWarn = console.warn.bind(console);
  const metrics = window.__snugRendererStartupMetrics = window.__snugRendererStartupMetrics || {
    configured: false,
    prepared: false,
    prepareMs: null,
    renderedFrames: 0,
    pausedFrames: 0,
    townPrepareMs: null,
    menuFrameRendered: false,
    suppressedEngineWarnings: 0,
    localPresenceFallbacks: 0,
  };
  console.warn = (...args) => {
    const message = args.map(String).join(" ");
    if (message.includes("THREE.WARNING: Multiple instances of Three.js") || message.includes("THREE.Clock: This module has been deprecated")) {
      metrics.suppressedEngineWarnings += 1;
      return;
    }
    nativeWarn(...args);
  };
  // The bundled ceremony watches the portrait sheet and starts its own second
  // WebGL scene. Suppress that path; the staged, accessible ceremony below is
  // launched by the explicit entry event instead.
  window.__snugSkipWelcome = true;

  const coordinate = (value) => Number.isFinite(value) ? Math.round(value * 1000) / 1000 : null;
  const readState = () => {
    const world = window.__snugWorld;
    const position = world?.player?.position;
    return {
      coordinateSystem: "Three.js world coordinates; +x right, +y up, +z toward camera",
      mode: world?.mode || null,
      player: position ? { x: coordinate(position.x), y: coordinate(position.y), z: coordinate(position.z) } : null,
      startOpen: document.documentElement.classList.contains("snug-start-open"),
      welcomeActive: Boolean(window.__snugWelcomeActive || window.__snugWelcomePending),
      featureChunksReady: window.__snugFeatureChunksReady === true,
      renderer: { ...metrics },
    };
  };
  window.render_game_to_text = window.render_game_to_text || (() => JSON.stringify(readState()));
  window.advanceTime = window.advanceTime || ((milliseconds = 0) => new Promise((resolve) => setTimeout(resolve, Math.max(0, Number(milliseconds) || 0))));

  const configure = (world) => {
    const renderer = world?.renderer;
    if (!renderer || configured.has(renderer)) return;
    configured.add(renderer);

    renderer.setPixelRatio(Math.min(Number(window.devicePixelRatio) || 1, 1));
    renderer.shadowMap.enabled = false;
    if (renderer.debug) renderer.debug.checkShaderErrors = false;

    const render = renderer.render.bind(renderer);
    renderer.render = (scene, camera) => {
      const menuOpen = document.documentElement.classList.contains("snug-start-open");
      if (window.__snugWorldRenderPaused || (menuOpen && metrics.menuFrameRendered)) {
        metrics.pausedFrames += 1;
        return;
      }
      metrics.renderedFrames += 1;
      const result = render(scene, camera);
      if (menuOpen) metrics.menuFrameRendered = true;
      return result;
    };

    window.__snugPrepareWorld = async () => {
      if (metrics.prepared) return metrics;
      window.__snugWorldRenderPaused = true;
      await new Promise((resolve) => setTimeout(resolve, 0));
      const started = performance.now();
      world.scene.updateMatrixWorld?.(true);
      world.camera.updateMatrixWorld?.(true);
      metrics.prepareMs = Math.round(performance.now() - started);
      metrics.prepared = true;
      return metrics;
    };

    window.__snugResumeWorld = async () => {
      if (!window.__snugWorldRenderPaused) return metrics;
      const started = performance.now();
      window.__snugWorldRenderPaused = false;
      // Let the game's own animation loop paint the first town frame. Forcing
      // it inside the welcome button handler makes the click wait on WebGL.
      await new Promise((resolve) => setTimeout(resolve, 120));
      metrics.townPrepareMs = Math.round(performance.now() - started);
      dispatchEvent(new CustomEvent("snug-world-render-resumed", { detail: metrics }));
      return metrics;
    };

    metrics.configured = true;
    dispatchEvent(new CustomEvent("snug-renderer-startup-ready", { detail: metrics }));
  };

  window.fetch = (input, init = {}) => {
    const url = typeof input === "string" || input instanceof URL ? String(input) : input?.url;
    if (/\.firebaseio\.com\//i.test(String(url))) {
      const firebaseUrl = new URL(String(url));
      if (/^\/presence(?:\/|\.json)/.test(firebaseUrl.pathname)) {
        metrics.localPresenceFallbacks += 1;
        const method = String(init.method || (input instanceof Request ? input.method : "GET")).toUpperCase();
        const body = method === "POST" ? '{"name":"local-presence"}' : method === "GET" ? "{}" : "null";
        return Promise.resolve(new Response(body, { status: 200, headers: { "Content-Type": "application/json" } }));
      }
      const headers = new Headers(input instanceof Request ? input.headers : undefined);
      new Headers(init.headers || {}).forEach((value, key) => headers.set(key, value));
      const authorization = headers.get("Authorization") || "";
      const token = authorization.match(/^Bearer\s+(.+)$/i)?.[1];
      if (token) {
        const authenticatedUrl = new URL(String(url));
        if (!authenticatedUrl.searchParams.has("auth")) authenticatedUrl.searchParams.set("auth", token);
        headers.delete("Authorization");
        return nativeFetch(authenticatedUrl, { ...init, headers });
      }
    }
    return nativeFetch(input, init);
  };
  const showLightweightWelcome = () => {
    if (window.__snugWelcomeActive) return;
    const scenes = [
      ["MAYOR MAYOR", "Welcome, neighbor. Cyclical City is brighter with you in it."],
      ["GIDEON GAZETTE", "We saved you a front-page place in today’s new-neighbor edition."],
      ["LYLA LENS", "Whenever you’re ready, step into town and make yourself at home."],
    ];
    let sceneIndex = 0;
    const welcome = document.createElement("div");
    welcome.className = "welcome-cinematic is-mayor gesture-arrival";
    welcome.setAttribute("role", "dialog");
    welcome.setAttribute("aria-modal", "true");
    welcome.setAttribute("aria-label", "The welcoming committee");
    welcome.innerHTML = `<div class="welcome-scene"><div class="welcome-canvas-host"></div><div class="welcome-fallback"><div class="welcome-bunting"></div><div class="welcome-paper">THE CYCLICAL CITY GAZETTE · NEW NEIGHBOR EDITION</div><div class="welcome-figures" aria-hidden="true"><div class="welcome-figure gideon"><i class="figure-head"></i><i class="figure-body"></i><i class="figure-hand left"></i><i class="figure-hand right"></i><i class="figure-foot left"></i><i class="figure-foot right"></i></div><div class="welcome-figure mayor"><i class="figure-head"></i><i class="figure-body"></i><i class="figure-hand left"></i><i class="figure-hand right"></i><i class="figure-foot left"></i><i class="figure-foot right"></i></div><div class="welcome-figure press"><i class="figure-head"></i><i class="figure-body"></i><i class="figure-hand left"></i><i class="figure-hand right"></i><i class="figure-foot left"></i><i class="figure-foot right"></i></div></div></div></div><section class="welcome-dialogue"><div class="welcome-speaker-row"><div class="welcome-speaker"></div><button class="welcome-help" type="button" aria-label="Pause and help" title="Pause and help">?</button></div><p class="welcome-line dialogue-caption" tabindex="0" aria-live="polite"></p><div class="welcome-actions"><div class="welcome-progress" aria-hidden="true"></div><button class="welcome-next" type="button"></button></div></section>`;
    const speaker = welcome.querySelector(".welcome-speaker");
    const line = welcome.querySelector(".welcome-line");
    const progress = welcome.querySelector(".welcome-progress");
    const next = welcome.querySelector(".welcome-next");
    const finish = () => {
      document.removeEventListener("click", skipFromHelp, true);
      document.removeEventListener("pointerdown", shieldHelpPointer, true);
      document.removeEventListener("pointerup", shieldHelpPointer, true);
      document.querySelector(".snug-help-overlay")?.remove();
      welcome.remove();
      document.documentElement.classList.remove("snug-welcome-active");
      window.__snugWelcomeActive = false;
      [0, 250, 750, 1500].forEach((delay) => setTimeout(() => {
        document.querySelector('button[aria-label="Close Town Hall portraits"]')?.click();
      }, delay));
    };
    const skipFromHelp = (event) => {
      if (!event.target.closest?.(".snug-help-skip")) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      finish();
    };
    const shieldHelpPointer = (event) => {
      if (event.target.closest?.(".snug-help-overlay")) event.stopImmediatePropagation();
    };
    document.addEventListener("click", skipFromHelp, true);
    document.addEventListener("pointerdown", shieldHelpPointer, true);
    document.addEventListener("pointerup", shieldHelpPointer, true);
    window.__snugFinishWelcome = finish;
    const renderScene = () => {
      [speaker.textContent, line.textContent] = scenes[sceneIndex];
      progress.innerHTML = scenes.map((_, index) => `<i class="${index === sceneIndex ? "active" : ""}"></i>`).join("");
      next.textContent = sceneIndex === scenes.length - 1 ? "Enter Cyclical City" : "Continue";
    };
    next.addEventListener("click", () => sceneIndex === scenes.length - 1 ? finish() : (sceneIndex += 1, renderScene()));
    welcome.querySelector(".welcome-help").addEventListener("click", () => {
      const overlay = document.createElement("div");
      overlay.className = "snug-help-overlay";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-label", "Welcome help");
      overlay.innerHTML = '<section class="snug-help-card"><button class="snug-help-close" type="button" aria-label="Close help">×</button><h2>Welcome to Cyclical City</h2><p>Continue the short introduction, or head straight into town.</p><button class="snug-help-skip" type="button">Skip welcoming ceremony</button></section>';
      overlay.querySelector(".snug-help-close").addEventListener("click", () => overlay.remove());
      overlay.querySelector(".snug-help-skip").addEventListener("click", finish);
      document.body.appendChild(overlay);
      overlay.querySelector(".snug-help-skip").focus();
    });
    document.documentElement.classList.add("snug-welcome-active");
    window.__snugWelcomeActive = true;
    metrics.lightweightWelcome = true;
    document.body.appendChild(welcome);
    document.querySelector('button[aria-label="Close Town Hall portraits"]')?.click();
    renderScene();
    next.focus();
    console.info("Using the lightweight welcoming ceremony.");
  };
  addEventListener("snug-start-welcome", (event) => {
    event.stopImmediatePropagation();
    showLightweightWelcome();
  });
  addEventListener("snug-start-entered", () => {
    if (window.__snugWelcomeActive || window.__snugWelcomePending) return;
    const resume = () => window.__snugResumeWorld?.().catch((error) => {
      window.__snugWorldRenderPaused = false;
      console.error("Could not resume the Cyclical City renderer.", error);
    });
    resume();
  });

  addEventListener("snug-world-ready", (event) => configure(event.detail), { passive: true });
  if (window.__snugWorld) configure(window.__snugWorld);
})();

// assets/lazy-features.js — Loads non-critical feature scripts after first
// interaction (or idle), so they never execute during the boot critical path.
// Public APIs are unchanged: each module self-registers on load exactly as
// before; a click that arrives before its script finishes is replayed.
(() => {
  if (window.__snugLazyFeatures) return;
  window.__snugLazyFeatures = { version: 1 };

  const LAZY = [
    'assets/painting-mode.js',
    'assets/family-feud-show.js',
    'assets/nosy-neighbors.js',
  ];
  // Trigger selectors per module, for clicks that land before the script loads.
  const TRIGGERS = [
    { selector: '[data-paint-open],[data-paint-wall]', src: 'assets/painting-mode.js' },
    { selector: '[data-nosy-launch]', src: 'assets/nosy-neighbors.js' },
    { selector: '[data-feud-launch]', src: 'assets/family-feud-show.js' },
  ];

  const loaded = (window.__snugLazyLoaded ||= {});
  const pending = new Map();

  function load(src) {
    if (loaded[src]) return Promise.resolve();
    if (pending.has(src)) return pending.get(src);
    const promise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      // Preserve execution order for dynamically inserted scripts.
      script.async = false;
      script.onload = () => {
        loaded[src] = true;
        // Modules that missed the snug-session event get it re-dispatched.
        if (window.__snugSession) {
          window.dispatchEvent(new CustomEvent('snug-session', { detail: window.__snugSession }));
        }
        resolve();
      };
      script.onerror = () => {
        pending.delete(src);
        reject(new Error(`lazy feature failed to load: ${src}`));
      };
      document.head.appendChild(script);
    });
    pending.set(src, promise);
    return promise;
  }
  window.__snugLazyLoad = load;

  let kicked = false;
  function kick() {
    if (kicked) return;
    kicked = true;
    LAZY.forEach((src) => load(src).catch(() => {}));
  }

  // If the user taps a feature trigger before its script is ready, hold the
  // click, load the script, then replay it so the module handles it normally.
  document.addEventListener('click', (event) => {
    for (const { selector, src } of TRIGGERS) {
      let target = null;
      try { target = event.target?.closest?.(selector); } catch { target = null; }
      if (!target || loaded[src]) continue;
      event.preventDefault();
      event.stopImmediatePropagation();
      load(src).then(() => {
        try { target.click(); } catch { /* ignore */ }
      }).catch(() => {});
      return;
    }
  }, true);

  // Start loading on first user gesture, or when the main thread idles.
  window.addEventListener('pointerdown', kick, { once: true, passive: true });
  window.addEventListener('keydown', kick, { once: true });
  if (typeof window.requestIdleCallback === 'function') {
    window.requestIdleCallback(kick, { timeout: 9000 });
  } else {
    setTimeout(kick, 5000);
  }
})();

(() => {
  if (window.__snugOrientationFix) return;
  window.__snugOrientationFix = true;
  let frame = 0;
  const fit = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const viewport = window.visualViewport;
      const width = Math.max(240, Math.round(viewport?.width || document.documentElement.clientWidth || innerWidth));
      const height = Math.max(240, Math.round(viewport?.height || document.documentElement.clientHeight || innerHeight));
      const root = document.documentElement;
      root.style.setProperty("--snug-viewport-width", `${width}px`);
      root.style.setProperty("--snug-viewport-height", `${height}px`);
      root.style.setProperty("--snug-viewport-top", `${Math.max(0, Math.round(viewport?.offsetTop || 0))}px`);
      root.style.setProperty("--snug-viewport-left", `${Math.max(0, Math.round(viewport?.offsetLeft || 0))}px`);
      const orientation = width >= height ? "landscape" : "portrait";
      document.querySelectorAll(".snug-start-screen").forEach((screen) => { screen.dataset.snugOrientation = orientation; });
      const world = window.__snugWorld;
      if (world?.renderer && world?.camera) {
        const canvas = world.renderer.domElement;
        const bounds = canvas?.parentElement?.getBoundingClientRect?.();
        const renderWidth = Math.max(1, Math.round(bounds?.width || width));
        const renderHeight = Math.max(1, Math.round(bounds?.height || height));
        world.renderer.setPixelRatio?.(Math.min(window.devicePixelRatio || 1, 2));
        world.renderer.setSize?.(renderWidth, renderHeight, false);
        world.camera.aspect = renderWidth / renderHeight;
        world.camera.updateProjectionMatrix?.();
      }
      document.querySelectorAll("canvas.snug-menu-shader").forEach((canvas) => {
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      });
      window.dispatchEvent(new CustomEvent("snug-viewport-change", { detail: { width, height, orientation } }));
    });
  };
  const settle = () => [0, 60, 180, 420, 800].forEach((delay) => setTimeout(fit, delay));
  window.addEventListener("resize", settle, { passive: true });
  window.addEventListener("orientationchange", settle, { passive: true });
  window.visualViewport?.addEventListener("resize", settle, { passive: true });
  window.visualViewport?.addEventListener("scroll", fit, { passive: true });
  window.addEventListener("snug-world-ready", settle);
  window.addEventListener("snug-mode-change", settle);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) settle(); });
  settle();
})();

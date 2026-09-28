(() => {
  const selectors = ['.app-shell', '.room-dock', '.voice-toggle-dock'];
  const sync = () => {
    const blocked = document.documentElement.classList.contains('snug-welcome-active');
    selectors.forEach((selector) => document.querySelectorAll(selector).forEach((element) => {
      if (blocked) element.setAttribute('inert', '');
      else element.removeAttribute('inert');
    }));
  };
  const isolateWelcome = (event) => {
    if (!document.documentElement.classList.contains('snug-welcome-active')) return;
    if (event.target instanceof Element && event.target.closest('.welcome-cinematic')) return;
    event.preventDefault();
    event.stopImmediatePropagation();
  };
  ['pointerdown', 'pointerup', 'click', 'touchstart', 'touchend'].forEach((type) => {
    document.addEventListener(type, isolateWelcome, { capture: true, passive: false });
  });
  new MutationObserver(sync).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  new MutationObserver(sync).observe(document.body, { childList: true, subtree: true });
  window.addEventListener('snug-start-welcome', () => queueMicrotask(sync));
  sync();
})();

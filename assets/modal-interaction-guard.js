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
  // Failsafe: if the welcome-is-active class ever sticks around with no
  // welcome cinematic in the DOM, taps would be swallowed forever — clear it.
  setTimeout(() => {
    if (document.documentElement.classList.contains('snug-welcome-active')
        && !document.querySelector('.welcome-cinematic')) {
      document.documentElement.classList.remove('snug-welcome-active');
      try { console.warn('[snug] cleared stuck snug-welcome-active (failsafe)'); } catch { /* ignore */ }
      sync();
    }
  }, 30000);
  sync();
})();

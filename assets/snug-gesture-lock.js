/* Selfie Social Society — device gesture lockdown.
 * Disables browser-level gestures that fight the game on touch devices:
 * pinch-zoom, double-tap zoom, text selection/highlight, long-press
 * callout + context menu, pull-to-refresh / overscroll chaining.
 * The game's OWN camera zoom/rotate (custom touch handlers on the 3D
 * canvas) keeps working — touch-action:none only stops the BROWSER
 * from stealing the gestures, the game's handlers still get everything.
 */
(() => {
  if (window.__snugGestureLock) return;
  window.__snugGestureLock = true;

  // iOS Safari pinch-zoom (non-standard gesture events).
  for (const type of ["gesturestart", "gesturechange", "gestureend"]) {
    document.addEventListener(type, (e) => e.preventDefault(), { passive: false });
  }
  // Double-tap zoom fallback.
  document.addEventListener("dblclick", (e) => e.preventDefault(), { passive: false });
  // Long-press context menu — kept working inside text inputs so chat
  // can still paste.
  document.addEventListener("contextmenu", (e) => {
    const t = e.target;
    if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
    e.preventDefault();
  });
})();

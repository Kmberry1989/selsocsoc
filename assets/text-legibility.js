/* Text legibility pass — runs after every other deferred script.
 *
 * Two rules, enforced at runtime so they hold for current and future UI:
 *  1. Any text that is NOT inside a text container gets bold weight plus a
 *     contrast outline (dark outline on light text, light outline on dark).
 *  2. Every text container's effective background is at least 80% opaque.
 *     Containers already at/above 80% (including ghost buttons sitting on
 *     an opaque panel) are left untouched; only genuinely translucent
 *     containers floating over the scene get their background raised.
 *
 * Backdrops/scrims are deliberately NOT treated as text containers — they
 * are meant to dim the scene, and text sitting directly on one is treated
 * as floating text (rule 1).
 */
(() => {
  "use strict";

  const FLOAT_CLASS = "snug-floattext";
  const BOX_DONE = "data-snug-box80";

  // Elements that are text containers by role, plus the game's known panels.
  // Anything else counts as a container when it paints its own background
  // or border around the text.
  const BOX_SELECTORS = [
    "button", "input", "select", "textarea", "label",
    "dialog", '[role="dialog"]', '[role="button"]', '[role="alert"]', '[role="status"]',
    ".city-npc-dialogue", ".city-npc-nearby",
    ".snug-start-panel", ".snug-start-signin",
    ".whirl-callout", ".photo-top",
  ].join(",");

  // Scrims dim the scene on purpose — never treat them as text containers
  // and never raise their opacity.
  const SCRIM_SELECTORS = [
    '[class*="backdrop"]', '[class*="scrim"]', '[class*="veil"]',
    ".society-backdrop", ".town-life-backdrop", ".mailbox-backdrop",
    ".unwrap-backdrop", ".garden-system-backdrop", ".fit-review-backdrop",
    ".visit-backdrop", ".photo-preview-backdrop",
  ].join(",");

  const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEMPLATE", "CANVAS", "HEAD", "OPTION"]);

  const boxCache = new WeakMap();

  function parseNum(raw) {
    const v = parseFloat(raw);
    return Number.isFinite(v) ? v : 0;
  }

  function parseAlpha(raw) {
    const v = String(raw).trim();
    if (v.endsWith("%")) return Math.min(1, Math.max(0, parseNum(v) / 100));
    return Math.min(1, Math.max(0, parseNum(v)));
  }

  // Parses rgb()/rgba() in comma or space/slash syntax, plus #rrggbb[aa].
  // getComputedStyle() always serializes to one of the rgb() forms.
  function parseColor(value) {
    if (!value) return null;
    const v = String(value).trim().toLowerCase();
    let m = v.match(/^rgba?\(\s*([^)]+)\)$/);
    if (m) {
      const inner = m[1].trim();
      let parts;
      let alpha = 1;
      if (inner.includes(",")) {
        parts = inner.split(",").map((s) => s.trim());
        if (parts.length === 4) alpha = parseAlpha(parts.pop());
      } else {
        const slash = inner.split("/");
        parts = slash[0].trim().split(/\s+/);
        if (slash[1] !== undefined) alpha = parseAlpha(slash[1]);
      }
      if (parts.length < 3) return null;
      return { r: parseNum(parts[0]), g: parseNum(parts[1]), b: parseNum(parts[2]), a: alpha };
    }
    m = v.match(/^#([0-9a-f]{6})([0-9a-f]{2})?$/);
    if (m) {
      return {
        r: parseInt(m[1].slice(0, 2), 16),
        g: parseInt(m[1].slice(2, 4), 16),
        b: parseInt(m[1].slice(4, 6), 16),
        a: m[2] ? parseInt(m[2], 16) / 255 : 1,
      };
    }
    return null;
  }

  function luminance(c) {
    const f = (x) => {
      x /= 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  }

  function isScrim(el) {
    try {
      return el.matches(SCRIM_SELECTORS);
    } catch {
      return false;
    }
  }

  function isBox(el) {
    if (!el || el.nodeType !== 1) return false;
    const hit = boxCache.get(el);
    if (hit !== undefined) return hit;
    let result = false;
    if (!isScrim(el)) {
      try {
        if (el.matches(BOX_SELECTORS)) {
          result = true;
        } else {
          const cs = getComputedStyle(el);
          const bg = parseColor(cs.backgroundColor);
          if (bg && bg.a > 0.02) {
            result = true;
          } else if (cs.borderStyle !== "none" && parseNum(cs.borderWidth) > 0) {
            result = true;
          }
        }
      } catch {
        result = false;
      }
    }
    boxCache.set(el, result);
    return result;
  }

  // Nearest text-container ancestor, or null when the text floats free.
  function nearestBox(node) {
    let el = node.nodeType === 3 ? node.parentElement : node;
    while (el && el.nodeType === 1 && el !== document.body && el !== document.documentElement) {
      if (isBox(el)) return el;
      el = el.parentElement;
    }
    return null;
  }

  // Composite background alpha from the element up through its ancestors.
  function effectiveAlpha(el) {
    let alpha = 0;
    let node = el;
    while (node && node.nodeType === 1 && alpha < 0.999) {
      const bg = parseColor(getComputedStyle(node).backgroundColor);
      if (bg && bg.a > 0) alpha = bg.a + alpha * (1 - bg.a);
      if (node === document.body) break;
      node = node.parentElement;
    }
    return alpha;
  }

  function nearestOpaqueColor(el) {
    let node = el;
    while (node && node.nodeType === 1) {
      const c = parseColor(getComputedStyle(node).backgroundColor);
      if (c && c.a > 0.02) return c;
      if (node === document.body) break;
      node = node.parentElement;
    }
    return null;
  }

  // Rule 2: raise a genuinely translucent container to 80% opacity.
  function ensureBoxOpacity(box) {
    if (box.hasAttribute(BOX_DONE)) return;
    box.setAttribute(BOX_DONE, "");
    if (effectiveAlpha(box) >= 0.8) return;
    const own = parseColor(getComputedStyle(box).backgroundColor);
    let rgb = own && own.a > 0.02 ? own : nearestOpaqueColor(box.parentElement);
    if (!rgb) {
      // No painted ancestor at all: pick a neutral that contrasts the text.
      const ink = parseColor(getComputedStyle(box).color);
      rgb = ink && luminance(ink) > 0.5 ? { r: 23, g: 32, b: 33 } : { r: 255, g: 253, b: 248 };
    }
    box.style.setProperty(
      "background-color",
      `rgba(${Math.round(rgb.r)},${Math.round(rgb.g)},${Math.round(rgb.b)},0.8)`
    );
  }

  // Rule 1: bold + contrast outline for floating text.
  function wrapFloating(textNode) {
    const parent = textNode.parentElement;
    if (!parent || parent.closest(`.${FLOAT_CLASS}`)) return;
    const span = document.createElement("span");
    span.className = FLOAT_CLASS;
    const ink = parseColor(getComputedStyle(parent).color);
    span.classList.add(luminance(ink || { r: 44, g: 52, b: 55 }) > 0.5 ? "snug-ot-dark" : "snug-ot-light");
    parent.insertBefore(span, textNode);
    span.appendChild(textNode);
  }

  function processRoot(root) {
    let walker;
    try {
      walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent || !parent.isConnected) return NodeFilter.FILTER_REJECT;
          if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
          if (parent.closest("svg")) return NodeFilter.FILTER_REJECT;
          if (parent.closest(`.${FLOAT_CLASS}`)) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        },
      });
    } catch {
      return;
    }
    const nodes = [];
    let next;
    while ((next = walker.nextNode())) nodes.push(next);
    for (const textNode of nodes) {
      if (!textNode.isConnected) continue;
      const parent = textNode.parentElement;
      if (!parent || parent.closest(`.${FLOAT_CLASS}`)) continue;
      const box = nearestBox(textNode);
      if (box) ensureBoxOpacity(box);
      else wrapFloating(textNode);
    }
  }

  const pending = [];
  let scheduled = false;
  function schedule(root) {
    if (!root || root.nodeType !== 1) return;
    pending.push(root);
    if (scheduled) return;
    scheduled = true;
    const run = () => {
      scheduled = false;
      const roots = pending.splice(0);
      for (const r of roots) {
        if (r.isConnected) {
          try {
            processRoot(r);
          } catch {
            /* keep the pass non-fatal */
          }
        }
      }
    };
    if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(run, { timeout: 900 });
    else setTimeout(run, 0);
  }

  function boot() {
    try {
      processRoot(document.body);
    } catch {
      /* keep the pass non-fatal */
    }
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "characterData") {
          if (m.target.parentElement) schedule(m.target.parentElement);
        } else {
          m.addedNodes.forEach((node) => {
            if (node.nodeType === 1) schedule(node);
            else if (node.nodeType === 3 && node.parentElement) schedule(node.parentElement);
          });
        }
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

/* TEMPORARY hang diagnostic (2026-10-06). Reports main-thread blocks >2s via the
   Long Task API and shows an on-screen readout. Remove once the freeze is fixed. */
(() => {
  "use strict";
  const overlay = document.createElement("div");
  overlay.id = "snug-hang-watch";
  overlay.style.cssText = [
    "position:fixed", "left:8px", "bottom:8px", "z-index:999999",
    "max-width:92vw", "max-height:40vh", "overflow:auto",
    "background:rgba(20,0,0,.92)", "color:#ffd9d9",
    "font:12px/1.45 monospace", "padding:10px 12px", "border-radius:8px",
    "border:2px solid #ff5252", "display:none", "white-space:pre-wrap",
    "word-break:break-word"
  ].join(";");
  const log = (msg) => {
    overlay.style.display = "block";
    const line = document.createElement("div");
    line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    overlay.appendChild(line);
    while (overlay.children.length > 12) overlay.removeChild(overlay.firstChild);
  };
  const memInfo = () => {
    const m = performance && performance.memory;
    if (!m) return "mem:n/a";
    return `mem:used=${Math.round(m.usedJSHeapSize / 1048576)}MB total=${Math.round(m.totalJSHeapSize / 1048576)}MB limit=${Math.round(m.jsHeapSizeLimit / 1048576)}MB`;
  };
  // Heartbeat: if rAF stops advancing, the main thread is blocked.
  let lastBeat = performance.now();
  let beatCount = 0;
  const beat = () => {
    lastBeat = performance.now();
    beatCount += 1;
    requestAnimationFrame(beat);
  };
  requestAnimationFrame(beat);
  // Watchdog on a worker thread (keeps running when the main thread blocks).
  try {
    const workerSrc = `let last=Date.now();onmessage=e=>{if(e.data&&e.data.ping)last=Date.now()};setInterval(()=>{const gap=Date.now()-last;if(gap>4000)postMessage({blockedMs:gap})},1000);`;
    const worker = new Worker(URL.createObjectURL(new Blob([workerSrc], { type: "text/javascript" })));
    worker.onmessage = (e) => {
      if (e.data && e.data.blockedMs) {
        log(`MAIN THREAD BLOCKED ~${Math.round(e.data.blockedMs)}ms | beats=${beatCount} | ${memInfo()} | url=${location.pathname}`);
      }
    };
    setInterval(() => { try { worker.postMessage({ ping: 1 }); } catch (_) {} }, 1000);
  } catch (_) { /* workers unavailable */ }
  // Long Task API: attribution for what blocked, delivered after the block ends.
  try {
    if ("PerformanceObserver" in window) {
      const po = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration >= 2000) {
            const attr = (entry.attribution || []).map((a) =>
              `${a.containerName || "?"}|${a.containerSrc || "?"}`
            ).join(",");
            log(`LONGTASK ${Math.round(entry.duration)}ms name=${entry.name} attr=[${attr}] | ${memInfo()}`);
          }
        }
      });
      po.observe({ entryTypes: ["longtask"] });
    }
  } catch (_) { /* longtask unsupported */ }
  window.addEventListener("DOMContentLoaded", () => {
    try { document.body.appendChild(overlay); } catch (_) {}
  });
})();

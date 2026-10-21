// Temporary diagnostic panel — active ONLY when the page URL contains
// "snugdiag" (e.g. ?snugdiag=1). It reports live state so a verification
// run can tell whether the plant/flare chunks loaded and built anything.
// It changes nothing about the game for normal players.
(() => {
  if (!/[?&]snugdiag\b/.test(location.search)) return;

  const panel = document.createElement("div");
  panel.id = "snug-diag-panel";
  panel.setAttribute("role", "status");
  panel.style.cssText = [
    "position:fixed", "top:8px", "left:8px", "z-index:99999",
    "max-width:92vw", "padding:10px 12px", "border-radius:10px",
    "background:rgba(0,0,0,0.82)", "color:#fff",
    "font:12px/1.5 system-ui,sans-serif", "white-space:pre-line",
    "pointer-events:none",
  ].join(";");
  document.body.appendChild(panel);

  const errors = [];
  window.addEventListener("error", (event) => {
    errors.push(String(event.message || event.error || "unknown error"));
    if (errors.length > 5) errors.shift();
  });

  const countSprites = (scene) => {
    let sprites = 0;
    let billboards = 0;
    let flare = 0;
    scene?.traverse?.((object) => {
      if (!object.isSprite) return;
      sprites += 1;
      if ((object.name || "").startsWith("Snug")) {
        if (object.name.startsWith("SnugBokehSprite")) flare += 1;
        else billboards += 1;
      }
    });
    return { sprites, billboards, flare };
  };

  const tick = () => {
    const loaded = window.__snugChunkLoader?.loaded;
    const world = window.__snugWorld;
    const counts = countSprites(world?.scene);
    const group = world?.scene?.getObjectByName?.("SnugPlantBillboards");
    const bill = window.__snugPlantBillboards;
    const flareState = window.__snugBokehFlareState;
    const lines = [
      "SNUG DIAG",
      `chunks: billboards=${loaded?.has("assets/plant-billboards.js") ?? "?"} flare=${loaded?.has("assets/bokeh-flare.js") ?? "?"} envUpgrade=${loaded?.has("assets/environment-upgrade.js") ?? "?"} total=${loaded?.size ?? "?"}`,
      `world: mode=${world?.mode ?? "?"} scene=${Boolean(world?.scene)} camera=${Boolean(world?.camera)}`,
      `billboards: state=${bill ? `trees=${bill.trees} bushes=${bill.bushes} flowers=${bill.flowers} grass=${bill.grass} decor=${bill.decor} count=${bill.count}` : "absent"} groupChildren=${group ? group.children.length : "no-group"}`,
      `sprites in scene: total=${counts.sprites} snug=${counts.billboards} flare=${counts.flare}`,
      `flare: ${flareState ? `count=${flareState.count} visible=${flareState.visible} strength=${flareState.strength}` : "absent"}`,
      `errors: ${errors.length ? errors.join(" | ") : "none captured"}`,
    ];
    panel.textContent = lines.join("\n");
  };
  setInterval(tick, 2000);
  tick();
})();

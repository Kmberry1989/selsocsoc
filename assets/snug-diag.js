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
    // Sample a few billboard sprites: are they full-size or stuck tiny, and
    // how far are they from the player? Plus sun candidates for the flare.
    let scaleSample = "none";
    let nearest = "none";
    const player = world?.player;
    if (group && player) {
      const samples = [];
      let best = Infinity;
      group.children.forEach((child) => {
        const data = child.userData || {};
        const base = data.baseScale ? data.baseScale[1] : 0;
        const cur = child.scale ? child.scale.y : 0;
        if (base > 0) samples.push(`${child.name || "?"} scale=${cur.toFixed(2)}/${base.toFixed(2)}`);
        const dx = (child.position?.x || 0) - (player.position?.x || 0);
        const dz = (child.position?.z || 0) - (player.position?.z || 0);
        const d = Math.hypot(dx, dz);
        if (d < best) best = d;
      });
      scaleSample = samples.slice(0, 4).join(" ; ") || "none";
      nearest = best === Infinity ? "none" : `${best.toFixed(1)}u`;
    }
    const sunNames = [];
    let lightInfo = "none";
    world?.scene?.traverse?.((object) => {
      if (/sun|sky|disc|glow/i.test(object.name || "") && sunNames.length < 10) {
        sunNames.push(`${object.name}(${object.type || "?"})`);
      }
      if (object.isDirectionalLight && lightInfo === "none") {
        const p = object.position || {};
        const t = object.target?.position || {};
        lightInfo = `pos=(${Number(p.x || 0).toFixed(1)},${Number(p.y || 0).toFixed(1)},${Number(p.z || 0).toFixed(1)}) target=(${Number(t.x || 0).toFixed(1)},${Number(t.y || 0).toFixed(1)},${Number(t.z || 0).toFixed(1)})`;
      }
    });
    // What plant objects remain in the countryside group (and are they hidden)?
    const countryside = world?.scene?.getObjectByName?.("SnugExpandedCountryside");
    const countrysideKids = (countryside?.children || []).slice(0, 20).map((child) => {
      const geo = child.geometry?.type || child.type || "?";
      return `${child.name || "?"}[${geo}${child.isInstancedMesh ? ` x${child.count}` : ""} vis=${child.visible !== false}]`;
    });
    const hiddenCount = (countryside?.children || []).filter((child) => child.visible === false).length;
    // Scene-wide: where do the OTHER visible trees live (second tree system)?
    const treeLike = [];
    let expandedGroups = 0;
    world?.scene?.traverse?.((object) => {
      if (object.name === "SnugExpandedCountryside") expandedGroups += 1;
      if (/tree|pine|canopy|blossom|bush|flower|grass/i.test(object.name || "") && treeLike.length < 30) {
        const geo = object.geometry?.type || object.type || "?";
        treeLike.push(`${object.name || "?"}[parent=${object.parent?.name || "?"} ${geo}${object.isInstancedMesh ? ` x${object.count}` : ""} vis=${object.visible !== false}]`);
      }
    });
    const sceneRoots = (world?.scene?.children || []).slice(0, 25).map((child) => child.name || "?");
    // Flare anchor check: every sun disc in traversal order — the FIRST is
    // the one the flare anchors to. Position comes from matrixWorld so no
    // Vector3 is needed; a hidden or oddly placed first disc means the
    // flare is tracking the wrong sun.
    const sunDiscs = [];
    const camPos = world?.camera?.position;
    world?.scene?.traverse?.((object) => {
      if (object.name !== "SnugRoundSun") return;
      const e = object.matrixWorld?.elements;
      const wx = e ? e[12] : NaN;
      const wy = e ? e[13] : NaN;
      const wz = e ? e[14] : NaN;
      const dist = (camPos && Number.isFinite(wx))
        ? Math.hypot(wx - camPos.x, wy - camPos.y, wz - camPos.z).toFixed(1)
        : "?";
      sunDiscs.push(`disc[parent=${object.parent?.name || "?"} vis=${object.visible !== false} pos=(${Number(wx).toFixed(1)},${Number(wy).toFixed(1)},${Number(wz).toFixed(1)}) dist=${dist}u]`);
    });
    const lines = [
      "SNUG DIAG",
      `chunks: billboards=${loaded?.has("assets/plant-billboards.js") ?? "?"} flare=${loaded?.has("assets/bokeh-flare.js") ?? "?"} envUpgrade=${loaded?.has("assets/environment-upgrade.js") ?? "?"} total=${loaded?.size ?? "?"}`,
      `world: mode=${world?.mode ?? "?"} scene=${Boolean(world?.scene)} camera=${Boolean(world?.camera)} playerPos=${player ? `(${Number(player.position?.x || 0).toFixed(1)},${Number(player.position?.z || 0).toFixed(1)})` : "?"}`,
      `billboards: state=${bill ? `trees=${bill.trees} bushes=${bill.bushes} flowers=${bill.flowers} grass=${bill.grass} decor=${bill.decor} count=${bill.count}` : "absent"} groupChildren=${group ? group.children.length : "no-group"}`,
      `sprites in scene: total=${counts.sprites} snug=${counts.billboards} flare=${counts.flare}`,
      `sprite scales: ${scaleSample}`,
      `nearest sprite: ${nearest}`,
      `sun candidates: ${sunNames.length ? sunNames.join(" ; ") : "none"}`,
      `sun discs: ${sunDiscs.length ? sunDiscs.join(" ; ") : "none"}`,
      `dir light: ${lightInfo}`,
      `countryside: ${countryside ? `children=${countryside.children.length} hidden=${hiddenCount}` : "no-group"}`,
      `countryside kids: ${countrysideKids.length ? countrysideKids.join(" ; ") : "none"}`,
      `expanded groups: ${expandedGroups}`,
      `scene roots: ${sceneRoots.join(" ; ")}`,
      `tree-like: ${treeLike.length ? treeLike.join(" ; ") : "none"}`,
      `flare: ${flareState ? `count=${flareState.count} visible=${flareState.visible} strength=${flareState.strength}` : "absent"}`,
      `errors: ${errors.length ? errors.join(" | ") : "none captured"}`,
    ];
    panel.textContent = lines.join("\n");
  };
  setInterval(tick, 2000);
  tick();
})();

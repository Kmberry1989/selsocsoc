/* Temporary NPC dressing diagnostic — only activates with ?npcdebug=1.
 * Round 3: timestamps the dressing timeline, then manually performs the
 * faces module's own steps for Stanley and reports every outcome. */
(() => {
  if (!/[?&]npcdebug=1/.test(location.search)) return;
  const t0 = performance.now();
  const stamp = () => Math.round((performance.now() - t0) / 1000) + "s";
  const panel = document.createElement("div");
  panel.id = "npc-debug-panel";
  panel.style.cssText = "position:fixed;left:8px;top:8px;z-index:99999;background:#111;color:#7dff8a;font:12px/1.5 monospace;padding:8px 10px;border-radius:8px;max-width:84vw;white-space:pre-wrap;";
  panel.textContent = "npcdebug: starting…";
  const mount = () => document.body && document.body.appendChild(panel);
  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount, { once: true });

  const mapType = (mesh) => {
    if (!mesh) return "no-mesh";
    const map = mesh.material && mesh.material.map;
    if (!map) return "no-map";
    const img = map.image;
    if (!img) return "map-noimg";
    if (typeof HTMLCanvasElement !== "undefined" && img instanceof HTMLCanvasElement) return "CANVAS(generic)";
    if (typeof HTMLImageElement !== "undefined" && img instanceof HTMLImageElement) return "PNG(painted)";
    return img.constructor ? img.constructor.name : "unknown";
  };

  const events = [];
  let firstModuleAt = null;
  let firstDressedAt = null;
  let manualResult = "not run yet";
  let manualStarted = false;

  const runManual = async (group) => {
    if (manualStarted) return;
    manualStarted = true;
    const steps = [];
    try {
      const THREE = window.__snugThree;
      steps.push("three=" + !!THREE + " Texture=" + (THREE && typeof THREE.Texture));
      const npc = group.children.find((c) => c.userData && c.userData.npcId === "stanley-stamp");
      steps.push("npc=" + !!npc);
      const mesh = npc && npc.getObjectByName("PrimitiveFace_SS");
      steps.push("mesh=" + !!mesh);
      const img = await new Promise((resolve) => {
        const i = new Image();
        i.onload = () => resolve(i);
        i.onerror = () => resolve(null);
        i.src = "assets/npc-faces/npc-stanley-stamp-face-v2.png";
      });
      steps.push("img=" + (img ? img.naturalWidth + "x" + img.naturalHeight : "NULL"));
      if (THREE && mesh && img) {
        const tex = new THREE.Texture(img);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;
        mesh.material.map = tex;
        mesh.material.needsUpdate = true;
        steps.push("ASSIGNED");
      }
    } catch (error) {
      steps.push("ERROR: " + (error && error.message));
    }
    manualResult = steps.join(" | ");
  };

  const tick = () => {
    try {
      if (firstModuleAt === null && window.__snugNpcFaces) { firstModuleAt = stamp(); events.push("modules@" + firstModuleAt); }
      const scene = window.__snugWorld && window.__snugWorld.scene;
      const group = scene && scene.getObjectByName ? scene.getObjectByName("CylindricalCityNPCs") : null;
      let stanleyFace = "nogroup";
      if (group) {
        const npc = group.children.find((c) => c.userData && c.userData.npcId === "stanley-stamp");
        stanleyFace = npc ? mapType(npc.getObjectByName("PrimitiveFace_SS")) : "nonpc";
        if (firstDressedAt === null && stanleyFace.startsWith("PNG")) { firstDressedAt = stamp(); events.push("dressed@" + firstDressedAt); }
        // Once everything the module needs has existed for 25s without the
        // module dressing Stanley, try the steps manually.
        if (firstModuleAt !== null && firstDressedAt === null && !manualStarted) {
          const moduleAge = (performance.now() - t0) / 1000 - parseInt(firstModuleAt, 10);
          if (moduleAge > 25) runManual(group);
        }
      }
      const lines = [];
      lines.push("t=" + stamp() + " events: " + (events.join(" ") || "none"));
      lines.push("modFaces=" + !!window.__snugNpcFaces + " three=" + !!window.__snugThree + " chunksReady=" + !!window.__snugFeatureChunksReady);
      lines.push("stanley face=" + stanleyFace);
      lines.push("manual: " + manualResult);
      panel.textContent = "NPC DEBUG\n" + lines.join("\n");
    } catch (error) {
      panel.textContent = "npcdebug error: " + (error && error.message);
    }
  };
  setInterval(tick, 1500);
  tick();
})();

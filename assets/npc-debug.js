/* Temporary NPC dressing diagnostic — only activates with ?npcdebug=1.
 * Renders a small readout panel so a visual checker can report the
 * internal state of the NPC face/outfit/accessory pipeline. */
(() => {
  if (!/[?&]npcdebug=1/.test(location.search)) return;
  const panel = document.createElement("div");
  panel.id = "npc-debug-panel";
  panel.style.cssText = "position:fixed;left:8px;top:8px;z-index:99999;background:#111;color:#7dff8a;font:12px/1.5 monospace;padding:8px 10px;border-radius:8px;max-width:78vw;white-space:pre-wrap;";
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

  const tick = () => {
    try {
      const scene = window.__snugWorld && window.__snugWorld.scene;
      const group = scene && scene.getObjectByName ? scene.getObjectByName("CylindricalCityNPCs") : null;
      const lines = [];
      lines.push("mode=" + (window.__snugWorld ? window.__snugWorld.mode : "?"));
      lines.push("modFaces=" + !!window.__snugNpcFaces + " modOutfits=" + !!window.__snugNpcOutfits + " modAcc=" + !!window.__snugNpcAccessories);
      lines.push("three=" + !!window.__snugThree + " chunksReady=" + !!window.__snugFeatureChunksReady);
      lines.push("group=" + !!group + " npcs=" + (group ? group.children.length : 0));
      if (group) {
        for (const [id, mark] of [["stanley-stamp", "SS"], ["fern-bramble", "FB"], ["lyla-lens", "LL"]]) {
          const npc = group.children.find((c) => c.userData && c.userData.npcId === id);
          if (!npc) { lines.push(id + ": MISSING"); continue; }
          const slot = npc.getObjectByName("HeldItemSlot_" + mark);
          lines.push(id + ": face=" + mapType(npc.getObjectByName("PrimitiveFace_" + mark)) +
            " outfit=" + mapType(npc.getObjectByName("PrimitiveOutfit_" + mark)) +
            " held=" + (slot ? slot.children.length : "noslot"));
        }
      }
      panel.textContent = "NPC DEBUG\n" + lines.join("\n");
    } catch (error) {
      panel.textContent = "npcdebug error: " + (error && error.message);
    }
  };
  setInterval(tick, 1500);
  tick();
})();

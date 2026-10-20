/* Temporary NPC dressing diagnostic — only activates with ?npcdebug=1.
 * Reports the internal state of the NPC face/outfit/accessory pipeline,
 * tracks whether the roster group object is replaced over time, and
 * test-loads a face PNG the same way the faces module does. */
(() => {
  if (!/[?&]npcdebug=1/.test(location.search)) return;
  const panel = document.createElement("div");
  panel.id = "npc-debug-panel";
  panel.style.cssText = "position:fixed;left:8px;top:8px;z-index:99999;background:#111;color:#7dff8a;font:12px/1.5 monospace;padding:8px 10px;border-radius:8px;max-width:82vw;white-space:pre-wrap;";
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

  // Track group identity + test-load the Stanley face exactly like the module.
  let groupUuid = null;
  let groupChanges = 0;
  let imgTest = "untested";
  const testImg = new Image();
  testImg.onload = () => { imgTest = `OK ${testImg.naturalWidth}x${testImg.naturalHeight} src=${testImg.src.slice(-48)}`; };
  testImg.onerror = () => { imgTest = `FAILED src=${testImg.src.slice(-48)}`; };
  testImg.src = "assets/npc-faces/npc-stanley-stamp-face-v2.png";

  const tick = () => {
    try {
      const scene = window.__snugWorld && window.__snugWorld.scene;
      const group = scene && scene.getObjectByName ? scene.getObjectByName("CylindricalCityNPCs") : null;
      if (group) {
        if (groupUuid !== null && group.uuid !== groupUuid) groupChanges += 1;
        groupUuid = group.uuid;
      }
      const lines = [];
      lines.push("base=" + document.baseURI.slice(0, 60));
      lines.push("modFaces=" + !!window.__snugNpcFaces + " modOutfits=" + !!window.__snugNpcOutfits + " modAcc=" + !!window.__snugNpcAccessories);
      lines.push("three=" + !!window.__snugThree + " chunksReady=" + !!window.__snugFeatureChunksReady);
      lines.push("group=" + !!group + " npcs=" + (group ? group.children.length : 0) + " groupChanges=" + groupChanges);
      lines.push("imgTest=" + imgTest);
      if (group) {
        for (const [id, mark] of [["stanley-stamp", "SS"], ["fern-bramble", "FB"]]) {
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

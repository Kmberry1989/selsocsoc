/* Unique painted faces for every NPC in Cyclical City.
   Additive: the roster (assets/npc-roster.js) and the welcome bundle are never edited.
   Each NPC's procedural PrimitiveFace texture is swapped for a hand-painted PNG
   in the same cartoon/toon style. The animated speaking mouth is untouched —
   every face keeps its mouth zone clear of static features. */
(() => {
  "use strict";

  const BASE = "assets/npc-faces/";

  // In-town NPC id -> roster mark (PrimitiveFace_<mark> under the roster group).
  const TOWN = {
    "lyla-lens": "LL",
    "chip-chance": "CC",
    "barnaby-bargain": "BB",
    "pip-parade": "PP",
    "agnes-alley": "AA",
    "dottie-daly": "DD",
    "peggy-plank": "PG",
    "mr-buck-coinsworth": "BC",
    "fern-bramble": "FB",
    "stanley-stamp": "SS",
    "bobby-gill": "BG",
  };

  // Welcome-bundle face mesh names -> face file ids.
  const WELCOME = {
    "PrimitiveFace_MayorMayor": "mayor-mayor",
    "PrimitiveFace_Gideon": "gideon",
    "PrimitiveFace_LylaLens": "lyla-lens",
  };

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = reject;
      im.src = src;
    });
  }

  async function swapFace(mesh, file) {
    if (!mesh || mesh.userData.snugFaceSwapped === file) return;
    const mat = mesh.material;
    const baseMap = mat && mat.map;
    const TextureCtor =
      (baseMap && baseMap.constructor) || (window.THREE && window.THREE.Texture);
    if (!TextureCtor || !mat) return;
    try {
      const image = await loadImage(file);
      if (mesh.userData.snugFaceSwapped) return; // re-fired while loading
      const tex = new TextureCtor(image);
      if (baseMap && baseMap.colorSpace !== undefined) tex.colorSpace = baseMap.colorSpace;
      tex.needsUpdate = true;
      mat.map = tex;
      mat.needsUpdate = true;
      mesh.userData.snugFaceSwapped = file;
    } catch (err) {
      /* keep the procedural face */
    }
  }

  function findFace(root, name) {
    let found = null;
    if (root && root.traverse) {
      root.traverse((o) => {
        if (!found && o.name === name) found = o;
      });
    }
    return found;
  }

  // In-town NPCs: the roster re-fires this event every time the village loads,
  // so re-entries re-apply faces to the freshly built meshes.
  window.addEventListener("snug-npc-roster-ready", (e) => {
    const group = e.detail && e.detail.group;
    if (!group) return;
    for (const [id, mark] of Object.entries(TOWN)) {
      const mesh = findFace(group, "PrimitiveFace_" + mark);
      if (mesh) swapFace(mesh, BASE + "face-" + id + ".png");
    }
  });

  // Welcome bundle: no ready event exists and its characters build lazily when
  // the welcome starts, so poll for the face meshes. Cheap scene scan every 2s;
  // stops once all three are swapped, or after 5 quiet minutes.
  let welcomeTries = 0;
  const welcomeTimer = setInterval(() => {
    const scene = window.__snugWorld && window.__snugWorld.scene;
    let remaining = 0;
    if (scene) {
      for (const [meshName, id] of Object.entries(WELCOME)) {
        const mesh = findFace(scene, meshName);
        const file = BASE + "face-welcome-" + id + ".png";
        if (mesh && mesh.userData.snugFaceSwapped !== file) {
          swapFace(mesh, file);
          remaining += 1;
        } else if (!mesh) {
          remaining += 1;
        }
      }
    } else {
      remaining = 3;
    }
    if (remaining === 0 || (welcomeTries > 150 && !window.__snugWelcomeActive)) {
      clearInterval(welcomeTimer);
      return;
    }
    // While the welcome is (or may soon be) active, don't count down.
    if (!window.__snugWelcomeActive) welcomeTries += 1;
    else welcomeTries = 0;
  }, 2000);
})();

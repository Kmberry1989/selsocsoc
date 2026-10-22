/* snug-npc-faces-v1
 * Gives each of the 13 roster NPCs their own unique face artwork.
 * Replaces the generic procedural canvas face on `PrimitiveFace_<MARK>`
 * with the NPC's painted face PNG from assets/npc-faces/.
 * Mayor Mayor and Gideon are full 3D NPCs now; their welcome-cinematic
 * figures still use window.__snugCinematicFaceDraw, hooked into the
 * cinematic bundle.
 */
(() => {
  if (window.__snugNpcFaces) return;
  window.__snugNpcFaces = true;

  const FACES = {
    'mayor-mayor': 'MM',
    'gideon': 'GD',
    'lyla-lens': 'LL',
    'chip-chance': 'CC',
    'barnaby-bargain': 'BB',
    'pip-parade': 'PP',
    'agnes-alley': 'AA',
    'dottie-daly': 'DD',
    'peggy-plank': 'PG',
    'mr-buck-coinsworth': 'BC',
    'fern-bramble': 'FB',
    'stanley-stamp': 'SS',
    'bobby-gill': 'BG',
  };

  // The shared window.__snugThree can be a partial shim planted by the app
  // bundle (no Texture constructor), so load the real Three module directly.
  let realThreePromise = null;
  const getRealThree = () => {
    if (!realThreePromise) {
      realThreePromise = import(new URL("assets/vendor/three/three.module.js", document.baseURI).href)
        .catch(() => null);
    }
    return realThreePromise;
  };

  function loadImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  /* ---- Welcome-ceremony faces: see assets/ceremony-face-hook.js ----
   * The ceremony builds BEFORE feature chunks load (loadFeatures waits
   * for snug-start-entered, which fires after the ceremony closes), so
   * a hook registered here could never reach the ceremony figures.
   * The early script registers window.__snugCinematicFaceDraw at page
   * parse time and preloads the three v2 face PNGs. This module keeps
   * only the town-roster dressing below.
   */
  async function applyFaces(group) {
    const THREE = (await getRealThree()) || window.__snugThree;
    if (!THREE || !group) return;
    for (const [id, mark] of Object.entries(FACES)) {
      try {
        const npc = (group.children || []).find((child) => child.userData?.npcId === id);
        const mesh = npc ? npc.getObjectByName(`PrimitiveFace_${mark}`) : null;
        if (!mesh || !mesh.material) continue;
        const img = await loadImage(`assets/npc-faces/npc-${id}-face-v2.png`);
        if (!img) continue;
        const texture = new THREE.Texture(img);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = true;
        texture.anisotropy = 4;
        texture.needsUpdate = true;
        if (mesh.material.map) mesh.material.map.dispose();
        mesh.material.map = texture;
        mesh.material.needsUpdate = true;
      } catch (error) {
        console.warn('[npc faces] could not apply face', id, error);
      }
    }
  }


  window.addEventListener('snug-npc-roster-ready', (event) => {
    applyFaces(event.detail?.group);
  });

  // Fallback: the roster chunk can build the NPC group before this module
  // loads (chunk order), missing the one-shot event. Poll the scene and
  // dress any group instance that appears.
  const dressedGroups = new WeakSet();
  const dressWhenFound = () => {
    const group = window.__snugWorld?.scene?.getObjectByName?.('CylindricalCityNPCs');
    if (!group || dressedGroups.has(group)) return;
    dressedGroups.add(group);
    applyFaces(group);
  };
  let attempts = 0;
  const timer = setInterval(() => {
    dressWhenFound();
    if (++attempts >= 90) clearInterval(timer);
  }, 2000);
})();

/* snug-npc-outfits-v2
 * Dresses the 13 roster NPCs in their painted outfit textures.
 * Each outfit is a single wraparound texture: the capsule body's built-in
 * UVs already wrap u 0->1 around the body and v 0->1 bottom->top, so no
 * custom UV work is needed. texture.offset.x = 0.25 puts FRONT at the
 * image center and splits BACK across the left/right seam (least visible).
 * Image layout left->right: BACK (seam) | RIGHT SIDE | FRONT | LEFT SIDE.
 * NPC outfits stay untinted (white material color = tint renderer
 * identity); only the player's outfit uses the tint renderer.
 */
(() => {
  if (window.__snugNpcOutfits) return;
  window.__snugNpcOutfits = true;

  const MARKS = {
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

  function loadImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  async function dress(group) {
    const THREE = window.__snugThree;
    if (!THREE || !group) return;
    for (const [id, mark] of Object.entries(MARKS)) {
      try {
        const npc = (group.children || []).find((child) => child.userData?.npcId === id);
        const mesh = npc ? npc.getObjectByName(`PrimitiveOutfit_${mark}`) : null;
        if (!mesh || !mesh.geometry || !mesh.material) continue;
        const img = await loadImage(`assets/npc-outfits/npc-${id}-v2.png`);
        if (!img) continue;
        const texture = new THREE.Texture(img);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = true;
        texture.wrapS = THREE.RepeatWrapping;
        texture.offset.x = 0.25; // FRONT at image center, BACK split at the seam
        texture.anisotropy = 4;
        texture.needsUpdate = true;
        mesh.material.map = texture;
        if (mesh.material.color && typeof mesh.material.color.set === 'function') {
          mesh.material.color.set('#ffffff');
        }
        mesh.material.needsUpdate = true;
      } catch (error) {
        console.warn('[npc outfits] could not dress', id, error);
      }
    }
  }

  window.addEventListener('snug-npc-roster-ready', (event) => {
    dress(event.detail?.group);
  });

  // Fallback: the roster chunk can build the NPC group before this module
  // loads (chunk order), missing the one-shot event. Poll the scene and
  // dress any group instance that appears.
  const dressedGroups = new WeakSet();
  const dressWhenFound = () => {
    if (!window.__snugThree) return;
    const group = window.__snugWorld?.scene?.getObjectByName?.('CylindricalCityNPCs');
    if (!group || dressedGroups.has(group)) return;
    dressedGroups.add(group);
    dress(group);
  };
  let attempts = 0;
  const timer = setInterval(() => {
    dressWhenFound();
    if (++attempts >= 90) clearInterval(timer);
  }, 2000);
})();

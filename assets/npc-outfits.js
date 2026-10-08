/* snug-npc-outfits-v1
 * Dresses the 11 roster NPCs in their painted outfit textures.
 * Reuses the player outfit atlas geometry (window.__snugPaintedOutfitAtlas)
 * so the 4-island UV layout maps onto each NPC's primitive body.
 * NPC outfits stay untinted (grayscale as authored); only the player's
 * outfit uses the tint renderer.
 */
(() => {
  if (window.__snugNpcOutfits) return;
  window.__snugNpcOutfits = true;

  const MARKS = {
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
    const atlas = window.__snugPaintedOutfitAtlas;
    const THREE = window.__snugThree;
    if (!atlas || !THREE || !group) return;
    for (const [id, mark] of Object.entries(MARKS)) {
      try {
        const npc = (group.children || []).find((child) => child.userData?.npcId === id);
        const mesh = npc ? npc.getObjectByName(`PrimitiveOutfit_${mark}`) : null;
        if (!mesh || !mesh.geometry || !mesh.material) continue;
        const img = await loadImage(`assets/npc-outfits/npc-${id}.png`);
        if (!img) continue;
        const texture = new THREE.Texture(img);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = true;
        texture.anisotropy = 4;
        texture.needsUpdate = true;
        mesh.geometry = atlas.geometry(mesh);
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
})();

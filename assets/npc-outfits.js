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

  async function dress(group) {
    const THREE = (await getRealThree()) || window.__snugThree;
    if (!THREE || !group) return;
    for (const [id, mark] of Object.entries(MARKS)) {
      try {
        const npc = (group.children || []).find((child) => child.userData?.npcId === id);
        const mesh = npc ? npc.getObjectByName(`PrimitiveOutfit_${mark}`) : null;
        if (!mesh || !mesh.geometry || !mesh.material) continue;
        const img = await loadImage(`assets/npc-outfits/npc-${id}-outfit-v2.png`);
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

  /* ---- Welcome-ceremony outfits (classic bundle figures) ----
   * The ceremony players actually see is the CLASSIC bundle, whose
   * builder puts a cylinder body (r 0.35/0.39, h 0.9) in
   * OutfitSlot_<Name> inside each WelcomeCharacter_<Name> group.
   * Cylinder UVs wrap u 0->1 around once like the roster capsule, so
   * the same wraparound treatment applies (FRONT at image center,
   * BACK split at the seam). The body material is created per figure
   * inside the builder, so swapping its map is safe; its old map is
   * the SHARED noise texture, so it is NOT disposed. The flat body
   * color must go white or it tints the whole outfit texture.
   * Hat (Mayor), beard (Gideon), and camera (Lyla) are separate meshes
   * and are untouched. Polls the scene like the roster pattern.
   */
  const CEREMONY_OUTFIT_NAMES = {
    'WelcomeCharacter_MayorMayor': 'mayor-mayor',
    'WelcomeCharacter_Gideon': 'gideon',
    'WelcomeCharacter_LylaLens': 'lyla-lens',
  };
  const ceremonyOutfitDressing = new Set();

  async function dressCeremonyOutfits() {
    const THREE = (await getRealThree()) || window.__snugThree;
    const scene = window.__snugWorld?.scene;
    if (!THREE || !scene) return;
    for (const [groupName, id] of Object.entries(CEREMONY_OUTFIT_NAMES)) {
      if (ceremonyOutfitDressing.has(groupName)) continue;
      try {
        const group = scene.getObjectByName?.(groupName);
        if (!group || group.userData?.snugCeremonyOutfitDressed) continue;
        const mark = groupName.replace('WelcomeCharacter_', '');
        const slot = group.getObjectByName(`OutfitSlot_${mark}`);
        if (!slot) continue;
        // Body = the tall cylinder (h 0.9); collars are short (0.07/0.075).
        const kids = slot.children || [];
        const body = kids.find((m) => m.geometry && m.geometry.parameters &&
          Math.abs(m.geometry.parameters.height - 0.9) < 0.01) || kids[0];
        if (!body || !body.material) continue;
        ceremonyOutfitDressing.add(groupName);
        const img = await loadImage(`assets/npc-outfits/npc-${id}-outfit-v2.png`);
        ceremonyOutfitDressing.delete(groupName);
        if (!img) continue;
        const texture = new THREE.Texture(img);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = true;
        texture.wrapS = THREE.RepeatWrapping;
        texture.offset.x = 0.25; // FRONT at image center, BACK split at the seam
        texture.anisotropy = 4;
        texture.needsUpdate = true;
        body.material.map = texture;
        if (body.material.color && typeof body.material.color.set === 'function') {
          body.material.color.set('#ffffff');
        }
        body.material.needsUpdate = true;
        group.userData.snugCeremonyOutfitDressed = true;
      } catch (error) {
        ceremonyOutfitDressing.delete(groupName);
        console.warn('[npc outfits] could not dress ceremony outfit', id, error);
      }
    }
  }

  window.addEventListener('snug-start-welcome', () => {
    dressCeremonyOutfits();
  });
  let ceremonyOutfitAttempts = 0;
  const ceremonyOutfitTimer = setInterval(() => {
    dressCeremonyOutfits();
    if (++ceremonyOutfitAttempts >= 90) clearInterval(ceremonyOutfitTimer);
  }, 2000);

  window.addEventListener('snug-npc-roster-ready', (event) => {
    dress(event.detail?.group);
  });

  // Fallback: the roster chunk can build the NPC group before this module
  // loads (chunk order), missing the one-shot event. Poll the scene and
  // dress any group instance that appears.
  const dressedGroups = new WeakSet();
  const dressWhenFound = () => {
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

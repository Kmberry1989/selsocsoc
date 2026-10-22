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

  /* ---- Welcome-ceremony faces: preload + hook + map-swap safety net ----
   * The ceremony players actually see is the CLASSIC bundle
   * (selfie-social-society-welcome.bundle.js), not the fallback 3D file.
   * Its builder draws each figure's face on a 256px canvas through
   * window.__snugCinematicFaceDraw(ctx, kind), then textures a 0.98 plane
   * from that canvas (PrimitiveFace_<Name> in FaceSlot_<Name>). Two
   * mechanisms land the detailed v2 art, no bundle edit needed:
   *  1. Hook: the three ceremony face PNGs are preloaded when this
   *     module loads (the ceremony builds seconds later, after user
   *     clicks), so the hook can drawImage the PNG synchronously at
   *     build time. If an image is not ready yet, the primitive
   *     drawing below runs instead (never a blank face).
   *  2. Map swap: once the ceremony figures exist in the scene, swap
   *     each PrimitiveFace_<Name> material.map to the v2 texture
   *     (roster pattern). This covers slow loads and late chunk loads
   *     — the face pops from primitive to detailed instead of staying
   *     primitive. The old map is per-figure (its own CanvasTexture),
   *     so disposing it is safe.
   * Figure groups are WelcomeCharacter_MayorMayor / _Gideon /
   * _LylaLens; kinds are mayor | gideon | press.
   */
  const CEREMONY_KIND_TO_ID = { mayor: 'mayor-mayor', gideon: 'gideon', press: 'lyla-lens' };
  const CEREMONY_FACE_NAMES = {
    'WelcomeCharacter_MayorMayor': 'mayor-mayor',
    'WelcomeCharacter_Gideon': 'gideon',
    'WelcomeCharacter_LylaLens': 'lyla-lens',
  };
  const ceremonyFaceImgs = {};
  for (const id of Object.values(CEREMONY_KIND_TO_ID)) {
    const img = new Image();
    img.src = `assets/npc-faces/npc-${id}-face-v2.png`;
    ceremonyFaceImgs[id] = img;
  }
  const ceremonyFaceDressing = new Set();

  async function dressCeremonyFaces() {
    const THREE = (await getRealThree()) || window.__snugThree;
    const scene = window.__snugWorld?.scene;
    if (!THREE || !scene) return;
    for (const [groupName, id] of Object.entries(CEREMONY_FACE_NAMES)) {
      if (ceremonyFaceDressing.has(groupName)) continue;
      try {
        const group = scene.getObjectByName?.(groupName);
        if (!group || group.userData?.snugCeremonyFaceDressed) continue;
        const mark = groupName.replace('WelcomeCharacter_', '');
        const mesh = group.getObjectByName(`PrimitiveFace_${mark}`);
        if (!mesh || !mesh.material) continue;
        ceremonyFaceDressing.add(groupName);
        const img = await loadImage(`assets/npc-faces/npc-${id}-face-v2.png`);
        ceremonyFaceDressing.delete(groupName);
        if (!img) continue;
        const texture = new THREE.Texture(img);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = true;
        texture.anisotropy = 4;
        texture.needsUpdate = true;
        if (mesh.material.map) mesh.material.map.dispose();
        mesh.material.map = texture;
        mesh.material.needsUpdate = true;
        group.userData.snugCeremonyFaceDressed = true;
      } catch (error) {
        ceremonyFaceDressing.delete(groupName);
        console.warn('[npc faces] could not dress ceremony face', id, error);
      }
    }
  }

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

  /* ---- Welcome-cinematic faces (Mayor Mayor + Gideon) ----
   * The cinematic bundle draws its shared face on a 256px canvas and calls
   * window.__snugCinematicFaceDraw(ctx, kind) if present, so each figure
   * gets a distinct face. kind is "mayor" | "gideon" | "press".
   */
  window.__snugCinematicFaceDraw = function (ctx, kind) {
    const id = CEREMONY_KIND_TO_ID[kind];
    const img = id && ceremonyFaceImgs[id];
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, 256, 256);
      ctx.drawImage(img, 0, 0, 256, 256);
      return;
    }
    // Image not ready yet: primitive face (the map-swap safety net
    // replaces it with the detailed PNG once the image arrives).
    const ink = '#2c3437';
    ctx.strokeStyle = ink;
    ctx.fillStyle = ink;
    ctx.lineCap = 'round';
    const eye = (x, y, rx, ry) => {
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
    };
    const brow = (x1, y1, cx, cy, x2, y2, w) => {
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(cx, cy, x2, y2);
      ctx.stroke();
    };
    if (kind === 'mayor') {
      // Showman: big arched brows, wide starry eyes, beauty mark.
      brow(52, 66, 82, 44, 112, 62, 13);
      brow(144, 62, 174, 44, 204, 66, 13);
      eye(82, 108, 13, 16);
      eye(174, 108, 13, 16);
      ctx.fillStyle = '#fffdf8';
      ctx.beginPath(); ctx.arc(86, 102, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(178, 102, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = ink;
      ctx.beginPath(); ctx.arc(208, 148, 5, 0, Math.PI * 2); ctx.fill();
    } else if (kind === 'gideon') {
      // Older tour guide: bushy brows, kind droopy eyes, smile lines.
      ctx.lineWidth = 16;
      ctx.beginPath(); ctx.moveTo(54, 78); ctx.quadraticCurveTo(82, 62, 112, 76); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(144, 76); ctx.quadraticCurveTo(174, 62, 202, 78); ctx.stroke();
      eye(82, 112, 12, 10);
      eye(174, 112, 12, 10);
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(62, 132); ctx.quadraticCurveTo(82, 140, 102, 132); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(154, 132); ctx.quadraticCurveTo(174, 140, 194, 132); ctx.stroke();
    } else {
      // Press (Lyla) + fallback: the classic two-dot gaze.
      ctx.lineWidth = 15;
      ctx.beginPath(); ctx.arc(82, 102, 10, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(174, 102, 10, 0, Math.PI * 2); ctx.fill();
    }
  };

  // Ceremony figures build on snug-start-welcome; poll for them the same
  // way the roster is polled (covers chunk-order races either way).
  window.addEventListener('snug-start-welcome', () => {
    dressCeremonyFaces();
  });
  let ceremonyAttempts = 0;
  const ceremonyTimer = setInterval(() => {
    dressCeremonyFaces();
    if (++ceremonyAttempts >= 90) clearInterval(ceremonyTimer);
  }, 2000);

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

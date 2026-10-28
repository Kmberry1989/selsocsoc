/* snug-npc-blinking-v1
 * Simple blinking for all 13 roster NPCs. The v2 face art paints the
 * eyes onto the face circle, so a blink is two small skin-colored lid
 * planes over the eyes on the same FaceSlot the mouths use. Each lid
 * stays hidden (a fully open eye) and sweeps down and back up on a
 * random 2.5-6.5 second timer per NPC, both eyes together.
 *
 * Eye positions were measured from the v2 face PNGs (dark-iris blob
 * centroids, converted from image fractions to face-disc coordinates:
 * disc radius 0.30, x = (2*fx - 1) * 0.30, y = (1 - 2*fy) * 0.30).
 * Lid color copies the NPC's own face-circle material color at dress
 * time, so it matches whatever tint the game applies; the baked skin
 * tone sampled from each PNG is the fallback. If a face PNG is ever
 * redrawn, re-measure the eyes — stale coordinates blink the wrong
 * spot. Under prefers-reduced-motion, no blinking happens at all.
 */
(() => {
  if (window.__snugNpcBlinking) return;

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
  // fx, fy: eye center as fractions of the PNG (fy from the top).
  // w, h: eye blob size as fractions of the PNG.
  const EYES = {
    'mayor-mayor': { l: [0.29, 0.55], r: [0.71, 0.545], w: 0.22, h: 0.105, skin: '#c88c5e' },
    'gideon': { l: [0.33, 0.42], r: [0.68, 0.42], w: 0.135, h: 0.065, skin: '#b27b59' },
    'lyla-lens': { l: [0.29, 0.47], r: [0.73, 0.45], w: 0.25, h: 0.10, skin: '#ca8d5f' },
    'chip-chance': { l: [0.32, 0.62], r: [0.68, 0.62], w: 0.14, h: 0.035, skin: '#cc9a6c' },
    'barnaby-bargain': { l: [0.28, 0.46], r: [0.71, 0.46], w: 0.22, h: 0.06, skin: '#c88c5c' },
    'pip-parade': { l: [0.31, 0.435], r: [0.69, 0.43], w: 0.18, h: 0.07, skin: '#ca8d5f' },
    'agnes-alley': { l: [0.29, 0.53], r: [0.70, 0.53], w: 0.22, h: 0.11, skin: '#ca8d5f' },
    'dottie-daly': { l: [0.30, 0.51], r: [0.70, 0.51], w: 0.19, h: 0.03, skin: '#daa576' },
    'peggy-plank': { l: [0.28, 0.40], r: [0.72, 0.40], w: 0.245, h: 0.09, skin: '#ca8d5f' },
    'mr-buck-coinsworth': { l: [0.30, 0.46], r: [0.72, 0.46], w: 0.22, h: 0.05, skin: '#c68a5d' },
    'fern-bramble': { l: [0.28, 0.46], r: [0.71, 0.46], w: 0.20, h: 0.04, skin: '#ce986f' },
    'stanley-stamp': { l: [0.29, 0.445], r: [0.70, 0.44], w: 0.195, h: 0.10, skin: '#d29567' },
    'bobby-gill': { l: [0.29, 0.43], r: [0.71, 0.43], w: 0.19, h: 0.07, skin: '#be815a' },
  };
  const FACE_R = 0.30;
  const CLOSE_MS = 60;
  const HOLD_MS = 90;
  const OPEN_MS = 60;

  // Same real-Three dodge as the mouth module: the shared
  // window.__snugThree can be a partial shim with no real constructors.
  let realThreePromise = null;
  const getRealThree = () => {
    if (!realThreePromise) {
      realThreePromise = import(new URL("assets/vendor/three/three.module.js", document.baseURI).href)
        .catch(() => null);
    }
    return realThreePromise;
  };

  const reducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // npcId -> { lids: [mesh, mesh], nextBlink, blinkStart }
  const registry = new Map();

  const toDisc = ([fx, fy]) => [(2 * fx - 1) * FACE_R, (1 - 2 * fy) * FACE_R];

  async function dress(group) {
    const THREE = (await getRealThree()) || window.__snugThree;
    if (!THREE || !group) return;
    for (const [id, mark] of Object.entries(MARKS)) {
      try {
        if (registry.has(id)) continue;
        const npc = (group.children || []).find((child) => child.userData?.npcId === id);
        const slot = npc ? npc.getObjectByName(`FaceSlot_${mark}`) : null;
        const spec = EYES[id];
        if (!slot || !spec) continue;
        // Match the face's own tint when available; fall back to the
        // skin tone sampled from this NPC's face PNG.
        const faceMesh = npc.getObjectByName(`PrimitiveFace_${mark}`);
        const faceColor = faceMesh?.material?.color;
        const lidColor = faceColor ? `#${faceColor.getHexString()}` : spec.skin;
        const lidW = spec.w * FACE_R * 2 * 1.3;
        const lidH = Math.max(spec.h * FACE_R * 2 * 1.8, 0.05);
        const geometry = new THREE.PlaneGeometry(lidW, lidH);
        const material = new THREE.MeshStandardMaterial({
          color: lidColor,
          roughness: 1,
        });
        const lids = [];
        for (const key of ['l', 'r']) {
          const [x, y] = toDisc(spec[key]);
          const lid = new THREE.Mesh(geometry, material);
          lid.name = `Eyelid_${key === 'l' ? 'L' : 'R'}_${mark}`;
          lid.position.set(x, y, 0.012);
          lid.visible = false;
          lid.frustumCulled = false;
          lid.castShadow = false;
          slot.add(lid);
          lids.push(lid);
        }
        registry.set(id, {
          lids,
          nextBlink: performance.now() + 1500 + Math.random() * 4000,
          blinkStart: 0,
        });
      } catch (error) {
        console.warn('[npc blinking] could not dress', id, error);
      }
    }
    if (!dress.loopStarted) {
      dress.loopStarted = true;
      const sync = (now) => {
        requestAnimationFrame(sync);
        if (reducedMotion) return;
        for (const entry of registry.values()) {
          if (!entry.blinkStart && now >= entry.nextBlink) {
            entry.blinkStart = now;
          }
          if (!entry.blinkStart) continue;
          const elapsed = now - entry.blinkStart;
          let openness = null; // lid scaleY: 0 = open, 1 = closed
          if (elapsed < CLOSE_MS) {
            openness = elapsed / CLOSE_MS;
          } else if (elapsed < CLOSE_MS + HOLD_MS) {
            openness = 1;
          } else if (elapsed < CLOSE_MS + HOLD_MS + OPEN_MS) {
            openness = 1 - (elapsed - CLOSE_MS - HOLD_MS) / OPEN_MS;
          } else {
            openness = 0;
            entry.blinkStart = 0;
            entry.nextBlink = now + 2500 + Math.random() * 4000;
          }
          const show = openness > 0;
          for (const lid of entry.lids) {
            lid.visible = show;
            if (show) lid.scale.set(1, Math.max(openness, 0.02), 1);
          }
        }
      };
      requestAnimationFrame(sync);
    }
  }

  window.__snugNpcBlinking = Object.freeze({
    dressed: () => registry.size,
  });

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

/* snug-npc-mouth-states-v2
 * Gives each of the 13 roster NPCs a real mouth when they are NOT speaking.
 * The v2 face art deliberately leaves the mouth area blank (brows + eyes
 * only), and the speaking mouth paints just a small resting blob when
 * idle — so at rest the neighbors looked mouthless. This module adds an
 * idle mouth plane to each NPC's FaceSlot, in front of the face circle,
 * at the same anchor the speaking mouth uses. While an NPC speaks, the
 * idle mouth hides and the speaking mouth takes over; when they stop,
 * the idle mouth returns.
 *
 * Mouths are ALIVE, not fixed, and follow three rules:
 *  - Distance: farther than 8 units from the player, the mouth relaxes
 *    to neutral. Walk up and the NPC's real expression returns.
 *  - Interaction: walking right up to a smiling NPC (within ~2.2 units)
 *    earns a brief laugh greeting (once a minute per NPC); finishing a
 *    conversation ends on a short laugh too. Speaking always wins over
 *    both while the NPC talks.
 *  - Idle animation: even at rest the mouth gently breathes (a slow
 *    scale pulse), so no neighbor ever sits frozen. Under
 *    prefers-reduced-motion the breathing is skipped; states still
 *    change, they just do not pulse.
 *
 * States: neutral, smile, laugh, grin, frown, surprise, smirk, ooh.
 * Every NPC's base expression defaults to "smile". Change a base any
 * time, or set a temporary mood that expires on its own:
 *   window.__snugNpcMouths.set('lyla-lens', 'frown')
 *   window.__snugNpcMouths.setMood('gideon', 'laugh', 20)  // 20 seconds
 *   window.__snugNpcMouths.get('mayor-mayor')  // currently displayed
 */
(() => {
  if (window.__snugNpcMouths) return;

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
  const STATES = ['neutral', 'smile', 'laugh', 'grin', 'frown', 'surprise', 'smirk', 'ooh'];
  const DEFAULT_STATE = 'smile';
  const FAR_UNITS = 8;        // beyond this, the mouth relaxes to neutral
  const GREET_UNITS = 2.2;    // walking this close earns a laugh greeting
  const GREET_COOLDOWN_MS = 60000;
  const GREET_SECONDS = 4;
  const POST_TALK_SECONDS = 6;
  const EVAL_MS = 500;        // distance/mood re-evaluation interval
  const POP_MS = 320;         // greeting / state-change scale pop

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

  const reducedMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const INK = '#2b2118';
  const MOUTH_DARK = '#3a1214';
  const TONGUE = '#e0787a';
  const TEETH = '#fffdf8';

  // Every state is drawn on a 256x128 canvas, centered, toon style.
  function drawState(state) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const arc = (x1, y1, cx, cy, x2, y2, width) => {
      ctx.lineWidth = width;
      ctx.strokeStyle = INK;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(cx, cy, x2, y2);
      ctx.stroke();
    };
    const openMouth = (withTeeth) => {
      // Open smile: corners slightly up, big lower curve, dark interior.
      ctx.beginPath();
      ctx.moveTo(58, 46);
      ctx.quadraticCurveTo(128, 66, 198, 46);
      ctx.quadraticCurveTo(128, 122, 58, 46);
      ctx.closePath();
      ctx.fillStyle = MOUTH_DARK;
      ctx.fill();
      if (withTeeth) {
        ctx.beginPath();
        ctx.moveTo(66, 48);
        ctx.quadraticCurveTo(128, 64, 190, 48);
        ctx.lineTo(186, 72);
        ctx.quadraticCurveTo(128, 86, 70, 72);
        ctx.closePath();
        ctx.fillStyle = TEETH;
        ctx.fill();
      } else {
        // Tongue peeking at the bottom of the laugh.
        ctx.beginPath();
        ctx.ellipse(128, 96, 34, 15, 0, 0, Math.PI * 2);
        ctx.fillStyle = TONGUE;
        ctx.fill();
      }
      ctx.lineWidth = 9;
      ctx.strokeStyle = INK;
      ctx.beginPath();
      ctx.moveTo(58, 46);
      ctx.quadraticCurveTo(128, 66, 198, 46);
      ctx.quadraticCurveTo(128, 122, 58, 46);
      ctx.closePath();
      ctx.stroke();
    };
    if (state === 'neutral') arc(80, 68, 128, 74, 176, 68, 10);
    else if (state === 'smile') arc(68, 50, 128, 108, 188, 50, 11);
    else if (state === 'laugh') openMouth(false);
    else if (state === 'grin') openMouth(true);
    else if (state === 'frown') arc(68, 86, 128, 34, 188, 86, 11);
    else if (state === 'surprise') {
      ctx.beginPath();
      ctx.ellipse(128, 66, 26, 32, 0, 0, Math.PI * 2);
      ctx.fillStyle = MOUTH_DARK;
      ctx.fill();
      ctx.lineWidth = 9;
      ctx.strokeStyle = INK;
      ctx.stroke();
    } else if (state === 'smirk') arc(78, 62, 140, 86, 188, 42, 11);
    else if (state === 'ooh') {
      ctx.beginPath();
      ctx.ellipse(128, 64, 15, 19, 0, 0, Math.PI * 2);
      ctx.fillStyle = MOUTH_DARK;
      ctx.fill();
      ctx.lineWidth = 8;
      ctx.strokeStyle = INK;
      ctx.stroke();
    }
    return canvas;
  }

  // npcId -> { npc, mesh, speakingMesh, base, mood, moodUntil, effective,
  //            wasSpeaking, wasNear, lastGreet, phase, popUntil }
  const registry = new Map();
  let textures = null;

  function playerPosition() {
    const p = window.__snugWorld?.player?.position;
    return (p && typeof p.x === 'number' && typeof p.z === 'number') ? p : null;
  }

  function applyState(entry, state) {
    if (!textures || entry.effective === state) return;
    entry.effective = state;
    entry.mesh.material.map = textures[state];
    entry.mesh.material.needsUpdate = true;
    entry.popUntil = performance.now() + POP_MS;
  }

  // One re-evaluation: mood wins, then distance, then base.
  function resolveEntry(entry, now) {
    if (entry.mood && now >= entry.moodUntil) entry.mood = null;
    const player = playerPosition();
    const npcPos = entry.npc.position;
    let dist = 0;
    if (player && npcPos) {
      dist = Math.hypot(player.x - npcPos.x, player.z - npcPos.z);
    }
    const isNear = dist <= GREET_UNITS;
    if (isNear && !entry.wasNear &&
        entry.base === 'smile' && now >= entry.lastGreet + GREET_COOLDOWN_MS) {
      entry.mood = 'laugh';
      entry.moodUntil = now + GREET_SECONDS * 1000;
      entry.lastGreet = now;
    }
    entry.wasNear = isNear;
    const far = player && npcPos && dist > FAR_UNITS;
    const next = entry.mood || (far ? 'neutral' : entry.base);
    applyState(entry, next);
  }

  async function dress(group) {
    const THREE = (await getRealThree()) || window.__snugThree;
    if (!THREE || !group) return;
    if (!textures) {
      textures = {};
      for (const state of STATES) {
        const texture = new THREE.CanvasTexture(drawState(state));
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = 4;
        textures[state] = texture;
      }
    }
    let index = 0;
    for (const [id, mark] of Object.entries(MARKS)) {
      try {
        if (registry.has(id)) continue;
        const npc = (group.children || []).find((child) => child.userData?.npcId === id);
        const slot = npc ? npc.getObjectByName(`FaceSlot_${mark}`) : null;
        if (!slot) continue;
        const material = new THREE.MeshStandardMaterial({
          map: textures[DEFAULT_STATE],
          transparent: true,
          depthWrite: false,
          alphaTest: 0.02,
          roughness: 0.92,
          color: '#ffffff',
        });
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(0.26, 0.13), material);
        mesh.name = `IdleMouth_${mark}`;
        mesh.position.set(0, -0.135, 0.02);
        mesh.renderOrder = 13;
        mesh.frustumCulled = false;
        mesh.castShadow = false;
        slot.add(mesh);
        registry.set(id, {
          npc,
          mesh,
          speakingMesh: npc.userData?.mouth?.mesh || null,
          base: DEFAULT_STATE,
          mood: null,
          moodUntil: 0,
          effective: DEFAULT_STATE,
          wasSpeaking: false,
          wasNear: false,
          lastGreet: 0,
          phase: index * 1.7,
          popUntil: 0,
        });
        index += 1;
      } catch (error) {
        console.warn('[npc mouths] could not dress', id, error);
      }
    }
    if (!dress.loopStarted) {
      dress.loopStarted = true;
      let lastEval = 0;
      const sync = (now) => {
        requestAnimationFrame(sync);
        const t = now / 1000;
        if (now - lastEval >= EVAL_MS) {
          lastEval = now;
          for (const entry of registry.values()) {
            const speaking = !!entry.npc.userData?.voiceSpeaking;
            // Finishing a conversation ends on a short laugh.
            if (entry.wasSpeaking && !speaking && entry.base === 'smile') {
              entry.mood = 'laugh';
              entry.moodUntil = now + POST_TALK_SECONDS * 1000;
            }
            entry.wasSpeaking = speaking;
            resolveEntry(entry, now);
          }
        }
        for (const entry of registry.values()) {
          const speaking = !!entry.npc.userData?.voiceSpeaking;
          entry.mesh.visible = !speaking;
          if (entry.speakingMesh) entry.speakingMesh.visible = speaking;
          if (reducedMotion || speaking) {
            entry.mesh.scale.set(1, 1, 1);
            continue;
          }
          // Idle breathing: a slow, subtle pulse so no mouth sits frozen.
          let scale = 1 + 0.03 * Math.sin(t * 1.1 + entry.phase);
          if (now < entry.popUntil) {
            const progress = 1 - (entry.popUntil - now) / POP_MS;
            scale *= 1 + 0.25 * Math.sin(Math.PI * progress);
          }
          entry.mesh.scale.set(scale, scale, 1);
        }
      };
      requestAnimationFrame(sync);
    }
  }

  function set(id, state) {
    if (!STATES.includes(state)) return false;
    const entry = registry.get(id);
    if (!entry || !textures) return false;
    entry.base = state;
    resolveEntry(entry, performance.now());
    return true;
  }

  function setMood(id, state, seconds) {
    if (!STATES.includes(state)) return false;
    const entry = registry.get(id);
    if (!entry || !textures) return false;
    entry.mood = state;
    entry.moodUntil = performance.now() + Math.max(0, seconds || 0) * 1000;
    resolveEntry(entry, performance.now());
    return true;
  }

  function get(id) {
    return registry.get(id)?.effective || null;
  }

  window.__snugNpcMouths = Object.freeze({ set, get, setMood, states: [...STATES] });

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

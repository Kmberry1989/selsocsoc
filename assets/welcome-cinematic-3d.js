/* 3D welcoming committee cinematic — Selfie Social Society.
   Stages the onboarding trio as animated 3D characters with staged camera
   work: Mayor Mayor walks out of the town hall doors, Gideon joins from
   the side, and Lyla Lens joins with her camera. Dialogue is the approved
   verbatim script; the DOM overlay reuses the existing welcome-cinematic
   CSS (the .is-three / .is-three-dimensional hooks already in index.html).
   Characters are charming primitive builds (cube body, disc head, matching
   the game's avatar style) with the named attachment slots from
   assets/welcome-committee/README.md so developer-authored art can replace
   each primitive later without changing cinematic code. */
(() => {
  "use strict";

  /* ---------- approved dialogue (verbatim) ---------- */
  const DIALOGUE = [
    {
      speaker: "MAYOR MAYOR",
      line: "Welcome, neighbor. Cyclical City is brighter with you in it.",
      shot: "mayor",
      voice: { pitch: 0.7, rate: 0.9, voiceIndex: 3 },
      gesture: "welcome",
    },
    {
      speaker: "GIDEON GAZETTE",
      line: "We saved you a front-page place in today\u2019s new-neighbor edition.",
      shot: "duo",
      voice: { pitch: 0.58, rate: 0.85, voiceIndex: 10 },
      gesture: "story",
    },
    {
      speaker: "LYLA LENS",
      line: "Whenever you\u2019re ready, step into town and make yourself at home.",
      shot: "group",
      voice: { pitch: 1.12, rate: 1.0, voiceIndex: 5 },
      gesture: "camera",
    },
  ];

  const reducedMotion = () =>
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- THREE loading ---------- */
  let threePromise = null;
  const getThree = () => {
    if (window.__snugThree) return Promise.resolve(window.__snugThree);
    if (!threePromise) {
      // Dynamic import resolves against the document base URL, so use the
      // full assets-relative path (same as the inline snug-cloud-billboards).
      threePromise = import("./assets/vendor/three/three.module.js")
        .then((mod) => mod)
        .catch(() => null);
    }
    return threePromise;
  };
  const webglAvailable = () => {
    try {
      const canvas = document.createElement("canvas");
      return Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
    } catch {
      return false;
    }
  };

  /* ---------- speech ---------- */
  let voiceEnabled = true;
  let speechTimer = 0;
  const stopSpeech = () => {
    clearTimeout(speechTimer);
    if ("speechSynthesis" in window) {
      try { window.speechSynthesis.cancel(); } catch { /* noop */ }
    }
  };
  const pickVoice = (index) => {
    try {
      const all = window.speechSynthesis.getVoices() || [];
      if (!all.length) return null;
      const en = all.filter((v) => /^en/i.test(v.lang));
      const pool = en.length ? en : all;
      return pool[index % pool.length] || null;
    } catch { return null; }
  };
  const speak = (voice, text) => {
    stopSpeech();
    if (!voiceEnabled) return;
    const fallbackMs = Math.max(900, String(text).length * 48);
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") return;
    try {
      const utterance = new SpeechSynthesisUtterance(String(text));
      utterance.rate = Math.min(2, voice.rate);
      utterance.pitch = voice.pitch;
      utterance.volume = 0.93;
      const v = pickVoice(voice.voiceIndex);
      if (v) utterance.voice = v;
      utterance.onend = () => clearTimeout(speechTimer);
      utterance.onerror = () => clearTimeout(speechTimer);
      window.speechSynthesis.speak(utterance);
      speechTimer = setTimeout(() => { try { window.speechSynthesis.cancel(); } catch { /* noop */ } },
        Math.max(6000, String(text).length * 160));
    } catch { /* voice is optional */ }
  };

  /* ---------- primitive character builder ---------- */
  const mat = (THREE, color, opts = {}) =>
    new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0, ...opts });

  function buildCharacter(THREE, spec) {
    const group = new THREE.Group();
    group.name = spec.prefix;
    const skin = mat(THREE, spec.skin);
    const outfit = mat(THREE, spec.outfit);

    // Cube body (game avatar style).
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.58, 0.78, 0.36), outfit);
    body.position.y = 0.98;
    body.name = `PrimitiveOutfit_${spec.prefix}`;
    group.add(body);

    // Disc head (game avatar style): cylinder facing the camera.
    const head = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.24, 24), skin);
    head.rotation.x = Math.PI / 2;
    head.position.y = 1.75;
    head.name = `PrimitiveFace_${spec.prefix}`;
    group.add(head);

    // Face slot: front-facing plane for developer-authored face art.
    const faceSlot = new THREE.Group();
    faceSlot.name = `FaceSlot_${spec.prefix}`;
    faceSlot.position.set(0, 1.75, 0.13);
    // Placeholder eyes + smile so the primitive reads as a face.
    const eyeGeo = new THREE.SphereGeometry(0.035, 10, 10);
    const eyeMat = mat(THREE, 0x2b2b2b, { roughness: 0.4 });
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat); eyeL.position.set(-0.1, 0.05, 0.02);
    const eyeR = new THREE.Mesh(eyeGeo, eyeMat); eyeR.position.set(0.1, 0.05, 0.02);
    const smile = new THREE.Mesh(
      new THREE.TorusGeometry(0.07, 0.016, 8, 16, Math.PI * 1.1),
      mat(THREE, 0x5b3a2a, { roughness: 0.6 })
    );
    smile.position.set(0, -0.05, 0.02);
    smile.rotation.z = Math.PI * 1.05;
    faceSlot.add(eyeL, eyeR, smile);
    group.add(faceSlot);

    // Outfit slot wraps the body so accessories can replace it.
    const outfitSlot = new THREE.Group();
    outfitSlot.name = `OutfitSlot_${spec.prefix}`;
    group.add(outfitSlot);

    // Arms: pivoted at the shoulder for swing animation.
    const armGeo = new THREE.BoxGeometry(0.15, 0.6, 0.15);
    const mkArm = (side) => {
      const pivot = new THREE.Group();
      pivot.position.set(0.37 * side, 1.32, 0);
      const armMesh = new THREE.Mesh(armGeo, outfit);
      armMesh.position.y = -0.26;
      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 10), skin);
      hand.position.y = -0.58;
      pivot.add(armMesh, hand);
      pivot.name = `HandSlot_${spec.prefix}_${side < 0 ? "Left" : "Right"}`;
      group.add(pivot);
      return pivot;
    };
    const armL = mkArm(-1);
    const armR = mkArm(1);

    // Legs: pivoted at the hip for walk animation.
    const legGeo = new THREE.BoxGeometry(0.17, 0.55, 0.17);
    const mkLeg = (side) => {
      const pivot = new THREE.Group();
      pivot.position.set(0.15 * side, 0.62, 0);
      const legMesh = new THREE.Mesh(legGeo, mat(THREE, spec.trousers));
      legMesh.position.y = -0.26;
      const shoe = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.12, 0.3), mat(THREE, 0x3a3f45));
      shoe.position.set(0, -0.55, 0.05);
      shoe.name = `ShoeSlot_${spec.prefix}_${side < 0 ? "Left" : "Right"}`;
      pivot.add(legMesh, shoe);
      group.add(pivot);
      return pivot;
    };
    const legL = mkLeg(-1);
    const legR = mkLeg(1);

    // Head accessory slot (hats, hair).
    const headSlot = new THREE.Group();
    headSlot.name = `HeadAccessorySlot_${spec.prefix}`;
    headSlot.position.y = 1.91;
    group.add(headSlot);

    // Held-item slot, parented to the right hand.
    const heldSlot = new THREE.Group();
    heldSlot.name = `HeldItemSlot_${spec.prefix}`;
    heldSlot.position.set(0, -0.62, 0.12);
    armR.add(heldSlot);

    group.userData.attachmentSlots = {
      face: faceSlot, outfit: outfitSlot, head: headSlot,
      handL: armL, handR: armR, held: heldSlot,
    };
    group.userData.rig = { body, head, faceSlot, armL, armR, legL, legR, headSlot, heldSlot };
    group.userData.spec = spec;
    return group;
  }

  function addMayorHat(THREE, character) {
    const { headSlot } = character.userData.rig;
    const dark = mat(THREE, 0x313c42);
    const band = mat(THREE, 0xe76854);
    const crown = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.3, 18), dark);
    crown.position.y = 0.15;
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.05, 18), dark);
    brim.position.y = 0.0;
    const ribbon = new THREE.Mesh(new THREE.CylinderGeometry(0.205, 0.205, 0.07, 18), band);
    ribbon.position.y = 0.04;
    headSlot.add(crown, brim, ribbon);
    // Gold epaulets on the shoulders.
    const gold = mat(THREE, 0xd9a441, { roughness: 0.5 });
    [-1, 1].forEach((side) => {
      const ep = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.06, 0.24), gold);
      ep.position.set(0.36 * side, 1.4, 0);
      character.add(ep);
    });
  }

  function addGideonBeard(THREE, character) {
    const { faceSlot } = character.userData.rig;
    const beard = new THREE.Mesh(
      new THREE.ConeGeometry(0.16, 0.34, 12),
      mat(THREE, 0xf3eee3, { roughness: 1 })
    );
    beard.position.set(0, -0.2, 0.03);
    beard.rotation.x = Math.PI;
    faceSlot.add(beard);
    // Walking cane in the left hand.
    const cane = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.03, 1.1, 8),
      mat(THREE, 0x6b4a2f)
    );
    cane.position.set(0, -0.5, 0.1);
    character.userData.rig.armL.add(cane);
  }

  function addLylaCamera(THREE, character) {
    const { heldSlot } = character.userData.rig;
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.3, 0.2, 0.16),
      mat(THREE, 0x2e3c40, { roughness: 0.5 })
    );
    const lens = new THREE.Mesh(
      new THREE.CylinderGeometry(0.07, 0.08, 0.14, 14),
      mat(THREE, 0x506268, { roughness: 0.35 })
    );
    lens.rotation.x = Math.PI / 2;
    lens.position.z = 0.14;
    const flash = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.06, 0.04),
      mat(THREE, 0xfff6d9, { emissive: 0xfff2b0, emissiveIntensity: 0 })
    );
    flash.position.set(0, 0.14, 0);
    flash.name = "LylaFlash";
    heldSlot.add(body, lens, flash);
    character.userData.flash = flash;
  }

  /* ---------- set dressing ---------- */
  function buildSet(THREE) {
    const set = new THREE.Group();
    set.name = "WelcomeSet";

    // Ground.
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(30, 40),
      mat(THREE, 0x7fae6d, { roughness: 1 })
    );
    ground.rotation.x = -Math.PI / 2;
    set.add(ground);
    // Path from the town hall doors.
    const path = new THREE.Mesh(
      new THREE.PlaneGeometry(2.4, 12),
      mat(THREE, 0xd9c49b, { roughness: 1 })
    );
    path.rotation.x = -Math.PI / 2;
    path.position.set(0, 0.01, -2);
    set.add(path);

    // Town hall facade.
    const hall = new THREE.Group();
    hall.position.set(0, 0, -9);
    const wallMat = mat(THREE, 0xd9c49b);
    const trimMat = mat(THREE, 0x684e43);
    const bodyH = new THREE.Mesh(new THREE.BoxGeometry(7, 3.2, 4), wallMat);
    bodyH.position.y = 1.6;
    const roof = new THREE.Mesh(new THREE.ConeGeometry(4.6, 1.7, 4), mat(THREE, 0x78908a));
    roof.position.y = 4.05;
    roof.rotation.y = Math.PI / 4;
    roof.scale.z = 0.72;
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.0, 0.14), trimMat);
    door.position.set(0, 1.0, 2.02);
    door.name = "TownHallDoor";
    const step = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.16, 0.8), mat(THREE, 0xb6a485));
    step.position.set(0, 0.08, 2.5);
    hall.add(bodyH, roof, door, step);
    // Sign board.
    const signCanvas = document.createElement("canvas");
    signCanvas.width = 512; signCanvas.height = 96;
    const ctx = signCanvas.getContext("2d");
    ctx.fillStyle = "#f2e3c2"; ctx.fillRect(0, 0, 512, 96);
    ctx.fillStyle = "#6e4c39"; ctx.font = "900 44px Georgia, serif";
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText("CYCLICAL CITY HALL", 256, 50);
    const signTex = new THREE.CanvasTexture(signCanvas);
    const sign = new THREE.Mesh(
      new THREE.BoxGeometry(3.4, 0.62, 0.1),
      new THREE.MeshStandardMaterial({ map: signTex, roughness: 0.9 })
    );
    sign.position.set(0, 2.75, 2.06);
    hall.add(sign);
    set.add(hall);

    // Bunting strung across the front.
    const buntColors = [0xe76854, 0xf2c14e, 0x4e9af2, 0x6fbf73];
    const buntGroup = new THREE.Group();
    for (let i = 0; i <= 24; i++) {
      const t = i / 24;
      const x = -6 + t * 12;
      const y = 3.6 - Math.sin(t * Math.PI) * 0.9;
      const flag = new THREE.Mesh(
        new THREE.ConeGeometry(0.14, 0.3, 4),
        mat(THREE, buntColors[i % buntColors.length], { side: THREE.DoubleSide })
      );
      flag.position.set(x, y, -6.4);
      flag.rotation.x = Math.PI;
      flag.rotation.y = Math.PI / 4;
      buntGroup.add(flag);
    }
    set.add(buntGroup);

    // Puffy low-poly clouds.
    const cloudMat = mat(THREE, 0xffffff, { roughness: 1 });
    [[-9, 8, -16], [7, 9.5, -18], [0, 10.5, -22]].forEach(([x, y, z]) => {
      const cloud = new THREE.Group();
      for (let i = 0; i < 4; i++) {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(0.9 - i * 0.14, 10, 10), cloudMat);
        puff.position.set(i * 0.9 - 1.2, (i % 2) * 0.3, 0);
        puff.scale.y = 0.6;
        cloud.add(puff);
      }
      cloud.position.set(x, y, z);
      set.add(cloud);
    });

    // Lighting.
    set.add(new THREE.HemisphereLight(0xcfe8ff, 0x6f8f5e, 0.95));
    const sun = new THREE.DirectionalLight(0xfff2d9, 1.15);
    sun.position.set(6, 10, 7);
    set.add(sun);
    return set;
  }

  /* ---------- camera shots ---------- */
  const SHOTS = {
    establish: { pos: [0, 2.6, 10.5], look: [0, 1.4, -6] },
    mayor: { pos: [0.4, 1.7, 4.6], look: [0, 1.35, -0.5] },
    duo: { pos: [-2.2, 1.9, 5.6], look: [-0.6, 1.25, -0.5] },
    group: { pos: [0, 2.1, 7.2], look: [0, 1.3, -0.5] },
  };

  /* ---------- the cinematic ---------- */
  let active = null;

  async function launch() {
    if (active || window.__snugWelcomeActive) return;
    if (!webglAvailable()) throw new Error("WebGL unavailable");

    // All failure-prone setup happens BEFORE any DOM is created so the
    // caller can fall back to the lightweight ceremony cleanly.
    const THREE = await getThree();
    if (!THREE) throw new Error("Three.js unavailable");
    const still = reducedMotion();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(Number(window.devicePixelRatio) || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace || undefined;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x9bcada);
    scene.fog = new THREE.Fog(0x9bcada, 18, 42);
    scene.add(buildSet(THREE));

    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);

    // Cast.
    const mayor = buildCharacter(THREE, {
      prefix: "MayorMayor", skin: 0xedc16c, outfit: 0x8a2f3c, trousers: 0x313c42,
    });
    addMayorHat(THREE, mayor);
    const gideon = buildCharacter(THREE, {
      prefix: "Gideon", skin: 0xdca56f, outfit: 0x8a6749, trousers: 0x4a3b2c,
    });
    addGideonBeard(THREE, gideon);
    const lyla = buildCharacter(THREE, {
      prefix: "LylaLens", skin: 0xc78257, outfit: 0x9a8f5a, trousers: 0x5c5640,
    });
    addLylaCamera(THREE, lyla);

    // Blocking: mayor starts just inside the hall doors, the others off-screen.
    const MARK = { mayor: [0, 0, -1.2], gideon: [-1.9, 0, -0.6], lyla: [1.9, 0, -0.6] };
    mayor.position.set(0, 0, -6.4);
    mayor.rotation.y = 0;
    gideon.position.set(-7.5, 0, -0.6);
    gideon.rotation.y = Math.PI / 2.4;
    lyla.position.set(7.5, 0, -0.6);
    lyla.rotation.y = -Math.PI / 2.4;
    [mayor, gideon, lyla].forEach((c) => { c.visible = false; scene.add(c); });
    mayor.visible = true;

    /* ----- DOM overlay (same CSS hooks as the lightweight ceremony) ----- */
    const overlay = document.createElement("div");
    overlay.className = "welcome-cinematic is-three-dimensional gesture-arrival";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "The welcoming committee");
    overlay.innerHTML = `
      <div class="welcome-scene is-three">
        <div class="welcome-canvas-host"></div>
      </div>
      <section class="welcome-dialogue">
        <div class="welcome-speaker-row">
          <div class="welcome-speaker"></div>
          <div class="welcome-tools">
            <button class="welcome-voice-toggle" type="button" aria-pressed="true">Voice: on</button>
            <button class="welcome-help" type="button" aria-label="Pause and help" title="Pause and help">?</button>
          </div>
        </div>
        <p class="welcome-line dialogue-caption" tabindex="0" aria-live="polite"></p>
        <div class="welcome-actions">
          <div class="welcome-progress" aria-hidden="true"></div>
          <button class="welcome-next" type="button"></button>
          <button class="welcome-skip" type="button">Skip</button>
        </div>
      </section>`;
    const host = overlay.querySelector(".welcome-canvas-host");
    host.appendChild(renderer.domElement);
    const speakerEl = overlay.querySelector(".welcome-speaker");
    const lineEl = overlay.querySelector(".welcome-line");
    const progressEl = overlay.querySelector(".welcome-progress");
    const nextEl = overlay.querySelector(".welcome-next");
    const skipEl = overlay.querySelector(".welcome-skip");
    const helpEl = overlay.querySelector(".welcome-help");
    const voiceEl = overlay.querySelector(".welcome-voice-toggle");
    if (!("speechSynthesis" in window)) voiceEl.disabled = true;

    const state = {
      THREE, renderer, scene, camera, overlay, host,
      mayor, gideon, lyla,
      index: -1, raf: 0, startTime: performance.now(),
      walkers: [], // { char, from, to, t, dur, done }
      camFrom: null, camTo: null, camT: 1, camDur: 1.2,
      lookFrom: new THREE.Vector3(), lookTo: new THREE.Vector3(), lookCur: new THREE.Vector3(),
      speaker: null, finished: false,
    };
    active = state;

    /* ----- camera ----- */
    const snapCamera = (shot) => {
      const s = SHOTS[shot];
      camera.position.set(...s.pos);
      state.lookCur.set(...s.look);
      camera.lookAt(state.lookCur);
      state.camT = 1;
    };
    const moveCamera = (shot, dur = 1.4) => {
      const s = SHOTS[shot];
      state.camFrom = camera.position.clone();
      state.camTo = new THREE.Vector3(...s.pos);
      state.lookFrom.copy(state.lookCur);
      state.lookTo.set(...s.look);
      state.camT = 0;
      state.camDur = still ? 0.01 : dur;
    };

    /* ----- walking ----- */
    const walkTo = (char, to, faceTo, dur = 1.6) => {
      char.visible = true;
      state.walkers.push({
        char,
        from: char.position.clone(),
        to: new THREE.Vector3(to[0], 0, to[2]),
        faceTo: faceTo || new THREE.Vector3(0, 0, 5),
        t: 0, dur: still ? 0.01 : dur,
      });
    };

    /* ----- per-frame animation ----- */
    const clock = { last: performance.now() };
    const animate = (now) => {
      if (!active || state.finished) return;
      state.raf = requestAnimationFrame(animate);
      const dt = Math.min(0.05, (now - clock.last) / 1000);
      clock.last = now;
      const t = (now - state.startTime) / 1000;

      // Walkers: position lerp + procedural walk cycle.
      state.walkers = state.walkers.filter((w) => {
        w.t += dt / w.dur;
        const k = Math.min(1, w.t);
        const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        w.char.position.lerpVectors(w.from, w.to, e);
        // Face travel direction, then settle toward the audience.
        const dir = new THREE.Vector3().subVectors(w.to, w.from);
        if (k < 1 && dir.lengthSq() > 0.001) {
          w.char.rotation.y = Math.atan2(dir.x, dir.z);
        } else {
          const toFace = new THREE.Vector3().subVectors(w.faceTo, w.char.position);
          const target = Math.atan2(toFace.x, toFace.z);
          let d = target - w.char.rotation.y;
          while (d > Math.PI) d -= Math.PI * 2;
          while (d < -Math.PI) d += Math.PI * 2;
          w.char.rotation.y += d * Math.min(1, dt * 6);
        }
        if (!still && k < 1) {
          const { legL, legR, armL, armR, body } = w.char.userData.rig;
          const sw = Math.sin(t * 11) * 0.55;
          legL.rotation.x = sw; legR.rotation.x = -sw;
          armL.rotation.x = -sw * 0.7; armR.rotation.x = sw * 0.7;
          body.position.y = 0.98 + Math.abs(Math.sin(t * 11)) * 0.05;
        }
        if (k >= 1) {
          const { legL, legR, armL, armR, body } = w.char.userData.rig;
          legL.rotation.x = legR.rotation.x = 0;
          armL.rotation.x = armR.rotation.x = 0;
          body.position.y = 0.98;
          return false;
        }
        return true;
      });

      // Idle life for on-stage characters.
      if (!still) {
        [mayor, gideon, lyla].forEach((c, i) => {
          if (!c.visible) return;
          const { body, head, armL, armR } = c.userData.rig;
          const ph = t * 1.6 + i * 2.1;
          body.rotation.z = Math.sin(ph) * 0.02;
          head.rotation.y = Math.sin(t * 0.7 + i * 1.3) * (c === state.speaker ? 0.08 : 0.3);
          // Speaker bobs gently while talking.
          if (c === state.speaker) {
            body.position.y = 0.98 + Math.abs(Math.sin(t * 5)) * 0.03;
            armR.rotation.x = -0.5 + Math.sin(t * 5) * 0.18;
            armL.rotation.x = -0.15 + Math.cos(t * 4.2) * 0.12;
          } else {
            armL.rotation.x *= 0.9; armR.rotation.x *= 0.9;
          }
        });
        // Lyla's camera flash when she speaks her line.
        if (lyla.userData.flash) {
          const flashing = state.speaker === lyla && state.index === 2;
          lyla.userData.flash.material.emissiveIntensity = flashing
            ? (Math.sin(t * 9) > 0.6 ? 2.2 : 0)
            : 0;
        }
      }

      // Camera drift / transitions.
      if (state.camT < 1) {
        state.camT = Math.min(1, state.camT + dt / state.camDur);
        const k = state.camT;
        const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        camera.position.lerpVectors(state.camFrom, state.camTo, e);
        state.lookCur.lerpVectors(state.lookFrom, state.lookTo, e);
        camera.lookAt(state.lookCur);
      } else if (!still) {
        // Settle the camera on the held shot (no accumulating drift).
        camera.lookAt(state.lookCur);
      }

      renderer.render(scene, camera);
    };

    const resize = () => {
      const w = Math.max(1, host.clientWidth || window.innerWidth);
      const h = Math.max(1, host.clientHeight || window.innerHeight);
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", resize);
    resize();
    snapCamera("establish");

    /* ----- dialogue flow ----- */
    const renderScene = () => {
      const d = DIALOGUE[state.index];
      speakerEl.textContent = d.speaker;
      lineEl.textContent = d.line;
      progressEl.innerHTML = DIALOGUE.map((_, i) =>
        `<i class="${i === state.index ? "active" : ""}"></i>`).join("");
      const last = state.index >= DIALOGUE.length - 1;
      nextEl.textContent = last ? "Enter Cyclical City" : "Continue";
      overlay.className = `welcome-cinematic is-three-dimensional gesture-${d.gesture}` +
        (state.index === 0 ? " is-mayor" : state.index === 1 ? " is-gideon" : " is-press");
      // Stage the shot + entrances for this beat.
      state.speaker = state.index === 0 ? mayor : state.index === 1 ? gideon : lyla;
      if (state.index === 0) {
        moveCamera("mayor", 1.6);
      } else if (state.index === 1) {
        gideon.visible = true;
        walkTo(gideon, MARK.gideon, new THREE.Vector3(0, 0, 6), 1.4);
        moveCamera("duo", 1.6);
      } else {
        lyla.visible = true;
        walkTo(lyla, MARK.lyla, new THREE.Vector3(0, 0, 6), 1.4);
        moveCamera("group", 1.8);
      }
      speak(d.voice, d.line);
    };

    const advance = () => {
      if (state.finished) return;
      stopSpeech();
      if (state.index >= DIALOGUE.length - 1) { finish(); return; }
      state.index += 1;
      renderScene();
    };

    const finish = () => {
      if (state.finished) return;
      state.finished = true;
      stopSpeech();
      cancelAnimationFrame(state.raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("keydown", onKey, true);
      try {
        scene.traverse((o) => {
          if (o.geometry) o.geometry.dispose();
          if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        });
        renderer.dispose();
      } catch { /* noop */ }
      overlay.remove();
      document.documentElement.classList.remove("snug-welcome-active");
      window.__snugWelcomeActive = false;
      window.__snugWelcomePending = false;
      window.__snugWorldRenderPaused = false;
      active = null;
      document.querySelector('button[aria-label="Close Town Hall portraits"]')?.click();
    };
    window.__snugFinishWelcome = finish;

    const onKey = (e) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      if (!e.target.closest || !e.target.closest(".welcome-cinematic")) return;
      // Focused buttons (Continue/Skip/Help/Voice) activate natively; only
      // advance when the key lands elsewhere in the overlay.
      if (e.target.closest("button")) return;
      e.preventDefault();
      advance();
    };
    document.addEventListener("keydown", onKey, true);

    nextEl.addEventListener("click", advance);
    skipEl.addEventListener("click", finish);
    voiceEl.addEventListener("click", () => {
      voiceEnabled = !voiceEnabled;
      voiceEl.setAttribute("aria-pressed", String(voiceEnabled));
      voiceEl.textContent = voiceEnabled ? "Voice: on" : "Voice: off";
      if (!voiceEnabled) stopSpeech();
      else if (state.index >= 0) speak(DIALOGUE[state.index].voice, DIALOGUE[state.index].line);
    });
    helpEl.addEventListener("click", () => {
      const help = document.createElement("div");
      help.className = "snug-help-overlay";
      help.setAttribute("role", "dialog");
      help.setAttribute("aria-label", "Welcome help");
      help.innerHTML = `<section class="snug-help-card">
        <button class="snug-help-close" type="button" aria-label="Close help">×</button>
        <h2>Welcome to Cyclical City</h2>
        <p>Continue the short introduction, or head straight into town.</p>
        <button class="snug-help-skip" type="button">Skip welcoming ceremony</button>
      </section>`;
      help.querySelector(".snug-help-close").addEventListener("click", () => help.remove());
      help.querySelector(".snug-help-skip").addEventListener("click", () => { help.remove(); finish(); });
      document.body.appendChild(help);
      help.querySelector(".snug-help-skip").focus();
    });

    /* ----- go live ----- */
    document.documentElement.classList.add("snug-welcome-active");
    window.__snugWelcomeActive = true;
    window.__snugWelcomePending = true;
    window.__snugWorldRenderPaused = true;
    document.body.appendChild(overlay);
    document.querySelector('button[aria-label="Close Town Hall portraits"]')?.click();
    resize(); // host now has real dimensions
    state.raf = requestAnimationFrame(animate);

    // Beat 0: Mayor walks out of the hall doors; his line lands as he arrives.
    walkTo(mayor, MARK.mayor, new THREE.Vector3(0, 0, 6), 1.8);
    setTimeout(() => { if (active && !state.finished && state.index < 0) { state.index = 0; renderScene(); } },
      still ? 60 : 900);
    nextEl.focus();
    console.info("Using the 3D welcoming ceremony.");
  }

  window.__snugWelcomeCinematic3d = { launch };
})();

(() => {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const TAU = Math.PI * 2;
  const rand = (min, max) => min + Math.random() * (max - min);
  const MORPH_KEYS = ["w1", "w2", "w3", "p1", "p2", "p3", "wide", "tall"];
  const REST_MORPH = { w1: 1, w2: 0.55, w3: 0.4, p1: 0, p2: 0, p3: 0, wide: 1.18, tall: 0.92 };
  const newMorphTargets = () => ({
    w1: rand(0.5, 1.35), w2: rand(0.15, 0.95), w3: rand(0.08, 0.7),
    p1: rand(0, TAU), p2: rand(0, TAU), p3: rand(0, TAU),
    wide: rand(1.0, 1.38), tall: rand(0.72, 1.06),
  });

  function paint(mouth, level, now) {
    const { canvas, context, texture, phase, morph } = mouth;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const settledRadius = canvas.width * 0.16;
    const radius = settledRadius + canvas.width * 0.075 * level;
    // Morphing squiggle blob: harmonic weights, phases, and the wide/tall
    // aspect drift toward random targets while talking, so the mouth
    // smoothly changes shape instead of replaying one wobble.
    const wave = canvas.width * (0.02 + 0.075 * level);
    const t = now * 0.001;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    const steps = 48;
    for (let index = 0; index < steps; index += 1) {
      const angle = index / steps * TAU;
      const squiggle = Math.sin(angle * 5 + t * 11 + phase + morph.p1) * wave * morph.w1
        + Math.sin(angle * 8 - t * 7.3 + phase * 1.7 + morph.p2) * wave * morph.w2
        + Math.sin(angle * 3 + t * 3.1 + phase * 0.6 + morph.p3) * wave * morph.w3;
      const distance = radius + squiggle;
      // Slightly wider than tall so it reads as a mouth, never a nose.
      const x = cx + Math.cos(angle) * distance * morph.wide;
      const y = cy + Math.sin(angle) * distance * morph.tall;
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.closePath();
    context.fillStyle = "#090b0c";
    context.fill();
    context.lineWidth = Math.max(4, canvas.width * 0.045);
    context.strokeStyle = "#352a25";
    context.stroke();
    texture.needsUpdate = true;
  }

  function attach(parent, constructors = {}) {
    if (!parent || !constructors.Mesh || !constructors.PlaneGeometry || !constructors.Material || !constructors.Texture) return null;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const context = canvas.getContext("2d");
    const texture = new constructors.Texture(canvas);
    texture.needsUpdate = true;
    const material = new constructors.Material({
      map: texture,
      transparent: true,
      depthWrite: false,
      alphaTest: 0.02,
      roughness: 0.92,
      color: "#ffffff",
    });
    const size = Number(constructors.size) || 0.235;
    const mesh = new constructors.Mesh(new constructors.PlaneGeometry(size, size), material);
    mesh.name = "CylindricSpeakingMouth";
    mesh.position.set(Number(constructors.x) || 0, Number(constructors.y) || -0.145, Number(constructors.z) || 0.142);
    mesh.renderOrder = 12;
    mesh.frustumCulled = false;
    mesh.castShadow = false;
    parent.add(mesh);
    const mouth = {
      canvas, context, texture, mesh, level: 0, phase: Math.random() * TAU,
      morphTimer: 0, scaleTimer: 0, randScale: 1, scaleTarget: 1,
      morph: { ...REST_MORPH, target: { ...REST_MORPH } },
    };
    paint(mouth, 0, 0);
    return mouth;
  }

  function tick(mouth, speaking, now = performance.now(), delta = 1 / 60) {
    if (!mouth?.mesh || !mouth.context) return;
    const reduced = reducedMotion.matches;
    const cadence = 0.5 + 0.5 * Math.sin(now * 0.013 + mouth.phase);
    const breathPause = Math.sin(now * 0.0031 + mouth.phase * 1.7) < -0.72;
    const target = speaking ? (breathPause ? 0.1 : reduced ? 0.32 : 0.55 + cadence * 0.45) : 0;
    const response = Math.min(1, Math.max(0.08, Number(delta) * (speaking ? 11 : 7)));
    mouth.level += (target - mouth.level) * response;

    // Random shape morphing + random scale while talking (smoothly lerped).
    const morph = mouth.morph;
    mouth.morphTimer -= Number(delta);
    mouth.scaleTimer -= Number(delta);
    if (speaking && !reduced) {
      if (mouth.morphTimer <= 0) {
        mouth.morphTimer = rand(0.35, 0.8);
        Object.assign(morph.target, newMorphTargets());
      }
      if (mouth.scaleTimer <= 0) {
        mouth.scaleTimer = rand(0.3, 0.65);
        mouth.scaleTarget = rand(0.82, 1.2);
      }
      const blend = Math.min(1, Number(delta) * 6);
      for (const key of MORPH_KEYS) morph[key] += (morph.target[key] - morph[key]) * blend;
    } else {
      const blend = Math.min(1, Number(delta) * 4);
      for (const key of MORPH_KEYS) morph[key] += (REST_MORPH[key] - morph[key]) * blend;
      mouth.scaleTarget = 1;
    }
    mouth.randScale += (mouth.scaleTarget - mouth.randScale) * Math.min(1, Number(delta) * 7);

    paint(mouth, reduced ? Math.min(0.3, mouth.level) : mouth.level, now);
    if (!reduced && speaking) mouth.mesh.rotation.z += Number(delta) * 0.62;
    else if (!speaking && Math.abs(mouth.mesh.rotation.z) > 0.001) mouth.mesh.rotation.z *= Math.pow(0.16, Number(delta));
    const scale = (0.94 + mouth.level * 0.16) * mouth.randScale;
    mouth.mesh.scale.set(scale, scale, 1);
  }

  window.CylindricSpeakingMouth = Object.freeze({ attach, tick });
})();

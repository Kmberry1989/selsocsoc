(() => {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const TAU = Math.PI * 2;

  function paint(mouth, level, now) {
    const { canvas, context, texture, phase } = mouth;
    const center = canvas.width / 2;
    const settledRadius = canvas.width * 0.16;
    const radius = settledRadius + canvas.width * 0.075 * level;
    const wave = canvas.width * 0.045 * level;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    for (let index = 0; index < 36; index += 1) {
      const angle = index / 36 * TAU;
      const ripple = Math.sin(angle * 5 + now * 0.011 + phase) * wave
        + Math.sin(angle * 3 - now * 0.006 + phase * 0.7) * wave * 0.38;
      const distance = radius + ripple;
      const x = center + Math.cos(angle) * distance;
      const y = center + Math.sin(angle) * distance;
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
    mesh.position.set(Number(constructors.x) || 0, Number(constructors.y) || -0.105, Number(constructors.z) || 0.142);
    mesh.renderOrder = 12;
    mesh.frustumCulled = false;
    mesh.castShadow = false;
    parent.add(mesh);
    const mouth = { canvas, context, texture, mesh, level: 0, phase: Math.random() * TAU };
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
    paint(mouth, reduced ? Math.min(0.3, mouth.level) : mouth.level, now);
    if (!reduced && speaking) mouth.mesh.rotation.z += Number(delta) * 0.62;
    else if (!speaking && Math.abs(mouth.mesh.rotation.z) > 0.001) mouth.mesh.rotation.z *= Math.pow(0.16, Number(delta));
    const scale = 0.94 + mouth.level * 0.16;
    mouth.mesh.scale.set(scale, scale, 1);
  }

  window.CylindricSpeakingMouth = Object.freeze({ attach, tick });
})();

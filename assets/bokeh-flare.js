/* Subtle bokeh lens flare — three translucent solar sprites that share one
   slow alignment fade and gently lift the screen exposure. */
(() => {
  if (window.__snugBokehFlare) return;
  window.__snugBokehFlare = true;

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const state = {
    ready: false,
    scene: null,
    group: null,
    sprites: [],
    brighten: null,
    sun: null,
    lastTime: performance.now(),
    strength: 0,
    tmp: null,
    THREE: null,
  };
  let threePromise;
  const getThree = () => threePromise ||= import("./vendor/three/three.module.js");

  const clamp01 = (value) => Math.max(0, Math.min(1, value));
  const smoothstep = (edge0, edge1, value) => {
    const t = clamp01((value - edge0) / (edge1 - edge0));
    return t * t * (3 - 2 * t);
  };

  const makeSolarTexture = (THREE, size, warmth) => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    const radius = size / 2;
    const gradient = ctx.createRadialGradient(radius, radius, 0, radius, radius, radius);
    gradient.addColorStop(0, `rgba(255,253,244,${0.7 * warmth})`);
    gradient.addColorStop(0.18, `rgba(255,241,205,${0.44 * warmth})`);
    gradient.addColorStop(0.43, `rgba(255,220,166,${0.2 * warmth})`);
    gradient.addColorStop(0.7, `rgba(255,205,142,${0.055 * warmth})`);
    gradient.addColorStop(1, "rgba(255,200,140,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    ctx.strokeStyle = `rgba(255,248,220,${0.26 * warmth})`;
    ctx.lineWidth = size * 0.014;
    ctx.beginPath();
    ctx.arc(radius, radius, size * 0.215, 0, Math.PI * 2);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  };

  const findSun = (scene) => {
    const namedSun = scene.getObjectByName?.("SnugRoundSun");
    if (namedSun) return namedSun;
    let light = null;
    scene.traverse((object) => {
      if (!light && object.isDirectionalLight) light = object;
    });
    return light;
  };

  const installForWorld = (THREE, world) => {
    if (state.scene === world.scene && state.group?.parent) return;

    state.group?.parent?.remove(state.group);
    state.sprites.forEach((sprite) => {
      sprite.material?.map?.dispose?.();
      sprite.material?.dispose?.();
    });
    state.scene = world.scene;
    state.sun = findSun(world.scene);
    state.sprites = [];

    const group = new THREE.Group();
    group.name = "SnugBokehFlare";
    group.renderOrder = 998;
    const specs = [
      { scale: 2.4, opacity: 0.24, fraction: -0.22, warmth: 1 },
      { scale: 1.65, opacity: 0.19, fraction: -0.58, warmth: 0.88 },
      { scale: 1.05, opacity: 0.15, fraction: -0.94, warmth: 0.76 },
    ];

    specs.forEach((spec, index) => {
      const material = new THREE.SpriteMaterial({
        map: makeSolarTexture(THREE, 256, spec.warmth),
        transparent: true,
        opacity: 0,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
      });
      const sprite = new THREE.Sprite(material);
      sprite.name = `SnugBokehSprite_${index + 1}`;
      sprite.scale.set(spec.scale, spec.scale, 1);
      sprite.renderOrder = 998 + index;
      sprite.frustumCulled = false;
      sprite.raycast = () => {};
      sprite.userData.flareSpec = spec;
      group.add(sprite);
      state.sprites.push(sprite);
    });

    world.scene.add(group);
    state.group = group;
    window.__snugBokehFlareState = { count: 3, visible: false, strength: 0 };
  };

  const ensureBrightenLayer = () => {
    if (state.brighten?.isConnected) return;
    const brighten = document.createElement("div");
    brighten.className = "snug-bokeh-brighten";
    brighten.setAttribute("aria-hidden", "true");
    document.body.appendChild(brighten);
    state.brighten = brighten;
  };

  const init = async () => {
    const world = window.__snugWorld;
    if (!world?.scene || !world?.camera) {
      setTimeout(init, 400);
      return;
    }
    const THREE = state.THREE || await getThree();
    state.THREE = THREE;
    window.__snugThree = THREE;

    if (!state.ready) {
      state.ready = true;
      state.tmp = {
        sunWorld: new THREE.Vector3(),
        ndc: new THREE.Vector3(),
        camDir: new THREE.Vector3(),
        toSun: new THREE.Vector3(),
        ray: new THREE.Vector3(),
      };
      ensureBrightenLayer();
      requestAnimationFrame(update);
    }
    installForWorld(THREE, world);
  };

  const update = (now) => {
    requestAnimationFrame(update);
    const world = window.__snugWorld;
    const THREE = state.THREE;
    if (!world?.camera || !world?.scene || !THREE) return;
    if (state.scene !== world.scene || !state.group?.parent) installForWorld(THREE, world);

    const camera = world.camera;
    const tmp = state.tmp;
    state.sun ||= findSun(world.scene);

    if (state.sun?.getWorldPosition) {
      state.sun.getWorldPosition(tmp.sunWorld);
      tmp.toSun.copy(tmp.sunWorld).sub(camera.position);
    } else {
      tmp.toSun.set(0.42, 0.62, -0.66).normalize();
      tmp.sunWorld.copy(camera.position).addScaledVector(tmp.toSun, 180);
    }

    camera.getWorldDirection(tmp.camDir);
    const facing = tmp.camDir.dot(tmp.toSun.clone().normalize());
    tmp.ndc.copy(tmp.sunWorld).project(camera);
    const onCameraSide = facing > 0 && tmp.ndc.z > -1 && tmp.ndc.z < 1;
    const distanceFromCenter = Math.hypot(tmp.ndc.x, tmp.ndc.y);
    const alignment = 1 - clamp01(distanceFromCenter / 1.15);
    const targetStrength = onCameraSide
      ? smoothstep(0.18, 0.9, alignment) * smoothstep(0.18, 0.72, facing)
      : 0;

    const delta = Math.min(0.1, Math.max(0.001, (now - state.lastTime) / 1000));
    state.lastTime = now;
    const fadeSeconds = targetStrength > state.strength ? 1.15 : 1.55;
    const blend = reducedMotion.matches ? 1 : 1 - Math.exp(-delta / fadeSeconds);
    state.strength += (targetStrength - state.strength) * blend;
    if (state.strength < 0.0005 && targetStrength === 0) state.strength = 0;

    const placementDistance = 16;
    state.sprites.forEach((sprite) => {
      const spec = sprite.userData.flareSpec;
      const ghostX = tmp.ndc.x * spec.fraction;
      const ghostY = tmp.ndc.y * spec.fraction;
      tmp.ray.set(ghostX, ghostY, 0.35).unproject(camera).sub(camera.position).normalize();
      sprite.position.copy(camera.position).addScaledVector(tmp.ray, placementDistance);
      sprite.material.opacity = state.strength * spec.opacity;
      sprite.visible = sprite.material.opacity > 0.003;
    });

    if (state.brighten) {
      const brightness = state.strength * 0.065;
      state.brighten.style.opacity = String(brightness);
      state.brighten.style.display = brightness > 0.002 ? "block" : "none";
    }

    window.__snugBokehFlareState = {
      count: state.sprites.length,
      visible: state.strength > 0.015,
      strength: Number(state.strength.toFixed(3)),
    };
  };

  const css = document.createElement("style");
  css.id = "snug-subtle-sun-effects";
  css.textContent = `
    /* Preserve the older weather flare, but make its colorful wash far less prominent. */
    #snug-lens-flare{filter:opacity(.24) saturate(.45);transition:opacity 1.35s ease-out!important}
    #snug-lens-flare .flare-core{opacity:.5}
    #snug-lens-flare .flare-streak{opacity:.32}
    .snug-bokeh-brighten{position:fixed;z-index:640;pointer-events:none;inset:0;background:rgba(255,246,226,.72);opacity:0;display:none}
    @media(prefers-reduced-motion:reduce){#snug-lens-flare{transition:none!important}}
  `;
  document.head.appendChild(css);

  ["snug-world-ready", "snug-world-expanded", "snug-mode-change"].forEach((eventName) => {
    window.addEventListener(eventName, () => setTimeout(init, 450));
  });
  window.addEventListener("load", () => setTimeout(init, 1000), { once: true });
  setTimeout(init, 1800);
})();

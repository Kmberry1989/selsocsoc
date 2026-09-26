(() => {
  const builtScenes = new WeakSet();
  const styledNpcGroups = new WeakSet();
  const badgeTextures = new Map();
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let parachuteState = null;

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const easeOutCubic = (value) => 1 - Math.pow(1 - clamp(value, 0, 1), 3);

  const wordSpill = (() => {
    let layer = null;
    const runs = new Map();
    const ensureLayer = () => {
      if (layer?.isConnected) return layer;
      layer = document.createElement("div");
      layer.className = "snug-word-spill-layer";
      layer.setAttribute("aria-hidden", "true");
      document.body.appendChild(layer);
      return layer;
    };
    const stop = (target) => {
      const run = runs.get(target);
      if (!run) return;
      run.cancelled = true;
      cancelAnimationFrame(run.raf);
      run.chips.forEach((chip) => chip.remove());
      runs.delete(target);
    };
    const start = ({ text, target, source, duration = 2600 }) => {
      if (!target || !text) return { stop() {} };
      stop(target);
      const words = String(text).match(/\S+/g) || [];
      target.textContent = "";
      target.setAttribute("aria-label", String(text));
      if (reducedMotion.matches || !words.length) {
        target.textContent = text;
        return { stop() {} };
      }
      const run = { cancelled: false, chips: [], raf: 0, startedAt: performance.now(), next: 0 };
      runs.set(target, run);
      const interval = clamp((duration - 350) / Math.max(1, words.length), 54, 240);
      const falling = [];
      const settle = (item) => {
        if (item.settled) return;
        item.settled = true;
        item.chip.remove();
        const word = document.createElement("span");
        word.className = "snug-settled-word";
        word.textContent = `${item.word} `;
        target.appendChild(word);
      };
      const spawn = (word, index, now) => {
        const point = source?.() || { x: innerWidth / 2, y: innerHeight * 0.42 };
        const targetRect = target.getBoundingClientRect();
        const chip = document.createElement("span");
        chip.className = "snug-falling-word";
        chip.textContent = word;
        ensureLayer().appendChild(chip);
        const destinationX = clamp(targetRect.left + 18 + (index * 43) % Math.max(60, targetRect.width - 36), 8, innerWidth - 46);
        const destinationY = clamp(targetRect.top + 8 + Math.floor((index * 43) / Math.max(60, targetRect.width - 36)) * 21, 8, innerHeight - 30);
        const flight = clamp(520 + Math.abs(destinationY - point.y) * 1.15, 620, 1180);
        const item = { chip, word, start: now, x: point.x, y: point.y, dx: destinationX - point.x, dy: destinationY - point.y, flight, settled: false };
        chip.style.transform = `translate3d(${item.x}px,${item.y}px,0) scale(.72)`;
        run.chips.push(chip);
        falling.push(item);
      };
      const tick = (now) => {
        if (run.cancelled) return;
        const elapsed = now - run.startedAt;
        while (run.next < words.length && elapsed >= run.next * interval) {
          spawn(words[run.next], run.next, now);
          run.next += 1;
        }
        for (let index = falling.length - 1; index >= 0; index -= 1) {
          const item = falling[index];
          const progress = clamp((now - item.start) / item.flight, 0, 1);
          const arc = 86 * Math.sin(progress * Math.PI);
          const x = item.x + item.dx * progress + Math.sin(progress * Math.PI * 3) * 7;
          const y = item.y + item.dy * progress - arc + 42 * progress * progress;
          const scale = 0.72 + progress * 0.28;
          item.chip.style.opacity = String(Math.min(1, progress * 4));
          item.chip.style.transform = `translate3d(${x}px,${y}px,0) rotate(${(1 - progress) * 8}deg) scale(${scale})`;
          if (progress >= 1) {
            settle(item);
            falling.splice(index, 1);
          }
        }
        if (run.next >= words.length && falling.length === 0) {
          runs.delete(target);
          target.removeAttribute("aria-label");
          return;
        }
        run.raf = requestAnimationFrame(tick);
      };
      run.raf = requestAnimationFrame(tick);
      return { stop: () => stop(target) };
    };
    return { start, stop };
  })();
  window.__snugWordSpill = wordSpill;

  const makeTexture = (THREE, kind, color = "#e76854") => {
    const key = `${kind}:${color}`;
    if (badgeTextures.has(key)) return badgeTextures.get(key);
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 256, 256);
    if (kind === "visitor") {
      ctx.fillStyle = "#fff7df"; ctx.strokeStyle = "#263432"; ctx.lineWidth = 16;
      ctx.beginPath(); ctx.roundRect(38, 52, 180, 146, 28); ctx.fill(); ctx.stroke();
      ctx.fillStyle = color; ctx.fillRect(52, 70, 152, 30);
      ctx.fillStyle = "#263432"; ctx.beginPath(); ctx.arc(92, 143, 25, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(130, 125, 58, 14); ctx.fillRect(130, 153, 42, 12);
    } else if (kind === "crest") {
      ctx.fillStyle = color; ctx.strokeStyle = "#263432"; ctx.lineWidth = 16;
      ctx.beginPath(); ctx.moveTo(128, 26); ctx.lineTo(216, 65); ctx.lineTo(197, 174); ctx.lineTo(128, 230); ctx.lineTo(59, 174); ctx.lineTo(40, 65); ctx.closePath(); ctx.fill(); ctx.stroke();
      ctx.fillStyle = "#fff3c6"; ctx.beginPath(); ctx.arc(128, 112, 34, 0, Math.PI * 2); ctx.fill();
      ctx.fillRect(113, 142, 30, 47);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    badgeTextures.set(key, texture);
    return texture;
  };

  const makeBiomeTexture = (THREE, colors, motif) => {
    const canvas = document.createElement("canvas"); canvas.width = canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const gradient = ctx.createRadialGradient(128, 128, 24, 128, 128, 128);
    gradient.addColorStop(0, colors[0]); gradient.addColorStop(.56, colors[1]); gradient.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = gradient; ctx.fillRect(0, 0, 256, 256); ctx.globalAlpha = .42;
    for (let index = 0; index < 76; index += 1) {
      const x = (index * 73) % 224 + 16, y = (index * 47) % 224 + 16;
      ctx.fillStyle = colors[2];
      if (motif === "needles") { ctx.save(); ctx.translate(x, y); ctx.rotate((index % 9) * .34); ctx.fillRect(-1, -7, 2, 14); ctx.restore(); }
      else if (motif === "petals") { ctx.beginPath(); ctx.arc(x, y, 2 + index % 3, 0, Math.PI * 2); ctx.fill(); }
      else if (motif === "ripples") { ctx.strokeStyle = colors[2]; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(x, y, 7, 3, 0, 0, Math.PI * 2); ctx.stroke(); }
      else ctx.fillRect(x, y, 3, 3);
    }
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; return texture;
  };

  const buildBiomes = (world) => {
    const THREE = window.__snugThree;
    if (!THREE || !world?.scene || world.mode !== "village" || builtScenes.has(world.scene)) return false;
    const group = new THREE.Group(); group.name = "CyclicalCityBiomes";
    const specs = [
      [-17, -10, 24, ["rgba(162,201,107,.72)", "rgba(126,177,91,.45)", "#e5df7b"], "petals", "Clover Commons"],
      [16, -13, 26, ["rgba(82,135,88,.78)", "rgba(54,108,72,.42)", "#315b43"], "needles", "Whispering Wood"],
      [-15, 18, 23, ["rgba(221,189,113,.7)", "rgba(198,149,82,.38)", "#885f3e"], "speckles", "Sunmeadow"],
      [18, 19, 25, ["rgba(91,156,145,.68)", "rgba(73,130,128,.38)", "#e6f1ce"], "ripples", "Pondmarsh"],
    ];
    specs.forEach(([x, z, size, colors, motif, label]) => {
      const material = new THREE.MeshStandardMaterial({ map: makeBiomeTexture(THREE, colors, motif), transparent: true, depthWrite: false, opacity: .72, roughness: 1 });
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size, 1, 1), material);
      mesh.name = `SnugBiome_${label.replace(/\s/g, "")}`; mesh.rotation.x = -Math.PI / 2; mesh.position.set(x, .018, z); mesh.renderOrder = 0;
      mesh.userData = { biome: label, featheredBorder: true }; group.add(mesh);
    });
    world.scene.add(group); builtScenes.add(world.scene);
    window.__snugBiomes = specs.map((entry) => entry[5]);
    window.dispatchEvent(new CustomEvent("snug-biomes-ready", { detail: { names: window.__snugBiomes, group } }));
    return true;
  };

  const addBadge = (THREE, root, kind, color, name, position, scale) => {
    if (!root || root.getObjectByName(name)) return;
    const material = new THREE.MeshStandardMaterial({ map: makeTexture(THREE, kind, color), transparent: true, alphaTest: .08, depthWrite: false, roughness: .9 });
    const badge = new THREE.Mesh(new THREE.PlaneGeometry(scale, scale), material);
    badge.name = name; badge.position.set(...position); badge.renderOrder = 5; badge.raycast = () => {}; root.add(badge);
  };

  const styleCharacters = (world) => {
    const THREE = window.__snugThree;
    if (!THREE || !world?.scene || world.mode !== "village") return;
    const npcs = world.scene.getObjectByName("CylindricalCityNPCs");
    if (npcs && !styledNpcGroups.has(npcs)) {
      const colors = ["#e76854", "#5c8d65", "#e1a64e", "#5e8db8", "#c66f71", "#79946b"];
      npcs.children.forEach((npc, index) => {
        npc.userData.characterClass = "Cyclical City resident";
        npc.userData.faceLanguage = "coin portrait, dot eyes, arched brows, warm cheek marks";
        addBadge(THREE, npc, "crest", colors[index % colors.length], `TownCrest_${index}`, [.23, .82, .22], .22);
      });
      styledNpcGroups.add(npcs);
    }
    if (world.player) {
      world.player.userData.characterClass = "visitor";
      addBadge(THREE, world.player, "visitor", "#5aaab0", "VisitorPassportBadge", [-.26, .8, .3], .26);
    }
    (world.remotes?.children || []).forEach((remote, index) => {
      remote.userData.characterClass = "visitor";
      addBadge(THREE, remote, "visitor", index % 2 ? "#e76854" : "#5aaab0", `VisitorPassportBadge_${index}`, [-.26, .8, .3], .26);
    });
  };

  const safeVisualClone = (source) => {
    if (!source) return null;
    const saved = [];
    source.traverse((object) => { saved.push([object, object.userData]); object.userData = {}; });
    let clone = null;
    try { clone = source.clone(true); }
    finally { saved.forEach(([object, userData]) => { object.userData = userData; }); }
    clone?.traverse((object) => { object.userData = {}; object.castShadow = false; object.receiveShadow = false; });
    return clone;
  };

  const createParachuteResources = (THREE, world) => {
    const canopyGeometry = new THREE.SphereGeometry(1.55, 20, 10, 0, Math.PI * 2, 0, Math.PI * .52);
    const canopyMaterial = new THREE.MeshStandardMaterial({ color: 0xe76854, roughness: .76, metalness: 0, side: 2 });
    const lineGeometry = new THREE.BufferGeometry();
    const positions = [];
    [[-1.28, 2.95, 0], [1.28, 2.95, 0], [0, 2.95, -1.28], [0, 2.95, 1.28]].forEach(([x, y, z], index) => {
      const harnessX = index < 2 ? x * .14 : (index === 2 ? -.18 : .18);
      const harnessZ = index < 2 ? (index ? .15 : -.15) : z * .12;
      positions.push(x, y, z, harnessX, .95, harnessZ);
    });
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x313a3a, transparent: true, opacity: .78 });
    let template = null;
    try { template = THREE.buildPegAvatar?.("#5c8fd8", undefined, undefined, "calm", { skinTone: "#c98f69", bodyMass: 1, height: 1 }); } catch {}
    if (!template) template = world.player;
    return { canopyGeometry, canopyMaterial, lineGeometry, lineMaterial, template };
  };

  const createParachutist = (THREE, resources, figureSource, name) => {
    const rig = new THREE.Group(); rig.name = name; rig.visible = false;
    const canopy = new THREE.Mesh(resources.canopyGeometry, resources.canopyMaterial);
    canopy.name = "ParachuteCanopy3D"; canopy.position.y = 3; canopy.castShadow = true;
    const shrouds = new THREE.LineSegments(resources.lineGeometry, resources.lineMaterial);
    shrouds.name = "ParachuteShrouds3D";
    const figure = safeVisualClone(figureSource || resources.template);
    if (figure) { figure.name = "PegBodyParachutist3D"; figure.position.y = 0; figure.scale.multiplyScalar(.82); rig.add(figure); }
    rig.add(canopy, shrouds);
    rig.userData.motion = { age: 0, moving: false, readyFrame: 0, speed: 0, drift: 0, phase: 0 };
    return rig;
  };

  const resetAmbient = (rig, index, frame, initial = false) => {
    const motion = rig.userData.motion;
    rig.visible = false;
    if (initial) {
      // Seed the first six across the menu camera's visible airspace; later
      // respawns stay organic while the fixed population keeps streaming.
      const initialX = [-7.5, -4.5, -1.4, 1.8, 4.8, 7.3];
      const initialY = [9.2, 12.1, 15.4, 10.7, 17.2, 13.6];
      const initialZ = [-13, -19, -25, -29, -17, -23];
      rig.position.set(initialX[index], initialY[index], initialZ[index]);
    } else {
      rig.position.set(-9 + Math.random() * 18, 15 + Math.random() * 9, -31 + Math.random() * 25);
    }
    rig.rotation.set(0, Math.random() * Math.PI * 2, 0);
    // Every descent starts from rest. The rigs are already staggered vertically,
    // so varying age here would make some of them jump straight to full speed.
    motion.age = 0;
    motion.speed = 2.1 + Math.random() * 1.15;
    motion.drift = (Math.random() - .5) * .72;
    motion.phase = Math.random() * Math.PI * 2;
    motion.readyFrame = frame + 1;
    motion.motionFrame = frame + 2;
    motion.moving = false;
  };

  const stopAmbient = ({ keepResources = false } = {}) => {
    const state = parachuteState;
    if (!state) return;
    state.ambientActive = false;
    state.ambient.forEach((rig) => rig.parent?.remove(rig));
    state.ambient.length = 0;
    if (!keepResources && !state.introActive) {
      state.group.parent?.remove(state.group);
      state.resources.canopyGeometry.dispose();
      state.resources.canopyMaterial.dispose();
      state.resources.lineGeometry.dispose();
      state.resources.lineMaterial.dispose();
      parachuteState = null;
    }
    window.__snugArrivalDebug = { ambientCount: 0, active: Boolean(state.introActive), sharedResources: true, mode: state.introActive ? "player-glide" : "idle" };
  };

  const ensureParachutes = () => {
    const THREE = window.__snugThree;
    const world = window.__snugWorld;
    if (!THREE || !world?.scene || !world.player || world.mode !== "village") return false;
    if (parachuteState?.world === world && parachuteState.ambientActive) return true;
    if (parachuteState) stopAmbient();
    const group = new THREE.Group(); group.name = "SnugParachuting3D";
    const resources = createParachuteResources(THREE, world);
    const ambient = [];
    for (let index = 0; index < 6; index += 1) {
      const rig = createParachutist(THREE, resources, resources.template, `AmbientParachutist3D_${index + 1}`);
      group.add(rig); ambient.push(rig);
    }
    world.scene.add(group);
    const state = { THREE, world, group, resources, ambient, ambientActive: true, introActive: false, frame: 0, lastTime: performance.now(), raf: 0 };
    parachuteState = state;
    ambient.forEach((rig, index) => resetAmbient(rig, index, 0, true));
    const tick = (now) => {
      if (parachuteState !== state) return;
      state.raf = requestAnimationFrame(tick);
      const delta = clamp((now - state.lastTime) / 1000, 0, .034);
      state.lastTime = now; state.frame += 1;
      if (state.ambientActive && document.documentElement.classList.contains("snug-start-open") && !state.introActive) {
        state.ambient.forEach((rig, index) => {
          const motion = rig.userData.motion;
          if (state.frame === motion.readyFrame) rig.visible = true;
          if (state.frame < motion.motionFrame || reducedMotion.matches) return;
          motion.moving = true; motion.age += delta;
          const ramp = easeOutCubic(motion.age / .9);
          rig.position.y -= motion.speed * ramp * delta;
          rig.position.x += (motion.drift + Math.sin(motion.age * .72 + motion.phase) * .18) * delta;
          rig.rotation.z = Math.sin(motion.age * 1.25 + motion.phase) * .065;
          if (rig.position.y < 1.6) resetAmbient(rig, index, state.frame);
        });
      } else if (state.ambientActive && !document.documentElement.classList.contains("snug-start-open")) stopAmbient();
    };
    requestAnimationFrame(() => {
      if (parachuteState !== state) return;
      ambient.forEach((rig) => { rig.visible = true; });
      try { world.renderer?.compile?.(world.scene, world.camera); } catch {}
      ambient.forEach((rig) => { rig.visible = false; });
      state.raf = requestAnimationFrame(tick);
    });
    window.__snugArrivalDebug = { ambientCount: ambient.length, active: true, sharedResources: true, mode: "ambient" };
    return true;
  };

  const cleanupParachutes = () => {
    const state = parachuteState;
    if (!state) return;
    cancelAnimationFrame(state.raf);
    state.group.parent?.remove(state.group);
    state.resources.canopyGeometry.dispose();
    state.resources.canopyMaterial.dispose();
    state.resources.lineGeometry.dispose();
    state.resources.lineMaterial.dispose();
    parachuteState = null;
    window.__snugArrivalDebug = { ambientCount: 0, active: false, sharedResources: true, mode: "complete" };
  };

  const waitForWorld = (limit = 180) => new Promise((resolve) => {
    let attempts = 0;
    const check = () => {
      const world = window.__snugWorld, THREE = window.__snugThree;
      if (world?.scene && world?.camera && world?.renderer && world?.player && THREE) resolve({ world, THREE });
      else if (attempts++ >= limit) resolve(null);
      else requestAnimationFrame(check);
    };
    check();
  });

  window.__snugArrivalIntro = async (mode = "town") => {
    if (window.__snugArrivalPromise) return window.__snugArrivalPromise;
    window.__snugArrivalPromise = (async () => {
      const ready = await waitForWorld();
      const fade = document.createElement("div");
      fade.className = "snug-arrival-fade";
      fade.setAttribute("aria-hidden", "true");
      document.body.appendChild(fade);
      document.documentElement.classList.add("snug-arrival-active");
      stopAmbient({ keepResources: true });
      if (!ready) {
        fade.classList.add("is-black");
        await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        return { mode, sequence: "parachute-arrival-3d-fallback" };
      }
      const { world, THREE } = ready;
      let state = parachuteState;
      if (!state || state.world !== world) {
        const group = new THREE.Group(); group.name = "SnugParachuting3D"; world.scene.add(group);
        state = { THREE, world, group, resources: createParachuteResources(THREE, world), ambient: [], ambientActive: false, introActive: false, frame: 0, lastTime: performance.now(), raf: 0 };
        parachuteState = state;
      }
      state.introActive = true;
      const hall = world.scene.getObjectByName("NorthTownHall");
      const hallPosition = new THREE.Vector3(0, 0, -33);
      hall?.getWorldPosition?.(hallPosition);
      const start = new THREE.Vector3(hallPosition.x - 4.2, hallPosition.y + 12.5, hallPosition.z + 10.5);
      const finish = new THREE.Vector3(hallPosition.x, hallPosition.y + 1.35, hallPosition.z + 4.2);
      const hero = createParachutist(THREE, state.resources, window.__snugPlayerAvatar || world.player, "PlayerArrivalParachutist3D");
      hero.position.copy(start); state.group.add(hero);
      const originalVisible = world.player.visible;
      world.player.visible = false;
      const cameraStart = world.camera.position.clone();
      const cameraQuaternion = world.camera.quaternion.clone();
      const duration = reducedMotion.matches ? .24 : 4.35;
      const verticalDistance = start.y - finish.y;
      const baseSpeed = verticalDistance / Math.max(.2, duration - Math.min(.225, duration * .25));
      let elapsed = 0, last = performance.now(), frame = 0, fading = false;
      hero.visible = false;
      // The shared parachute resources were compiled during menu prewarm.
      // Recompiling the entire live town here stalls mode confirmation.
      window.__snugArrivalDebug = { ambientCount: 0, active: true, sharedResources: true, mode: "player-glide", target: "NorthTownHall" };
      await new Promise((resolve) => {
        let done = false;
        const finishGlide = () => { if (done) return; done = true; resolve(); };
        // Always release the existing enter(mode) contract, even if an embedded
        // browser temporarily suspends animation frames during the transition.
        const watchdog = setTimeout(() => {
          fade.classList.add("is-black");
          finishGlide();
        }, reducedMotion.matches ? 700 : 6200);
        const glide = (now) => {
          if (done) return;
          const delta = clamp((now - last) / 1000, 0, .05); last = now; frame += 1;
          if (frame === 1) { hero.visible = true; requestAnimationFrame(glide); return; }
          // Use a clamped simulation delta so both motion and completion remain
          // stable when the host's frame clock jumps, pauses, or is virtualized.
          elapsed = Math.min(duration, elapsed + delta);
          if (!fading) {
            const progress = clamp(elapsed / duration, 0, 1);
            const horizontal = easeOutCubic(progress);
            const ramp = reducedMotion.matches ? 1 : easeOutCubic(elapsed / .9);
            hero.position.y = Math.max(finish.y, hero.position.y - baseSpeed * ramp * delta);
            hero.position.x = start.x + (finish.x - start.x) * horizontal;
            hero.position.z = start.z + (finish.z - start.z) * horizontal;
            hero.rotation.z = reducedMotion.matches ? 0 : Math.sin(elapsed * 1.75) * .075 * (1 - progress);
            const cameraGoal = new THREE.Vector3(hero.position.x + 7.4, hero.position.y + 4.8, hero.position.z + 10.2);
            const follow = reducedMotion.matches ? 1 : 1 - Math.exp(-delta * 3.8);
            world.camera.position.lerp(cameraGoal, follow);
            world.camera.lookAt(new THREE.Vector3(hero.position.x, hero.position.y + 1.8, hero.position.z));
            if (progress >= 1 || hero.position.y <= finish.y + .02) {
              hero.position.copy(finish); fading = true; fade.classList.add("is-black");
              // The handoff must not depend on foreground rAF cadence: browsers
              // can throttle frames while the full-screen fade is opaque.
              setTimeout(() => { clearTimeout(watchdog); finishGlide(); }, reducedMotion.matches ? 80 : 460);
              return;
            }
          }
          requestAnimationFrame(glide);
        };
        requestAnimationFrame(glide);
      });
      world.player.visible = originalVisible;
      world.camera.position.copy(cameraStart); world.camera.quaternion.copy(cameraQuaternion);
      hero.parent?.remove(hero);
      state.introActive = false;
      cleanupParachutes();
      // Reveal the next scene without waiting for another rAF while the page is
      // fully covered; some embedded WebViews pause opaque-frame callbacks.
      document.documentElement.classList.remove("snug-arrival-active");
      fade.classList.add("is-out");
      setTimeout(() => fade.remove(), reducedMotion.matches ? 80 : 520);
      return { mode, sequence: "parachute-arrival-3d" };
    })().finally(() => { window.__snugArrivalPromise = null; });
    return window.__snugArrivalPromise;
  };

  const applyPass = () => {
    const world = window.__snugWorld;
    if (!world || world.mode !== "village") return;
    if (!buildBiomes(world) && !window.__snugThree) return setTimeout(applyPass, 120);
    styleCharacters(world);
    if (document.documentElement.classList.contains("snug-start-open") && !document.documentElement.classList.contains("snug-arrival-active")) ensureParachutes();
  };

  const classObserver = new MutationObserver(() => {
    if (document.documentElement.classList.contains("snug-start-open") && !document.documentElement.classList.contains("snug-arrival-active")) ensureParachutes();
    else if (parachuteState?.ambientActive && !parachuteState.introActive) stopAmbient();
  });
  classObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  ["snug-world-ready", "snug-world-expanded", "snug-npc-roster-ready", "snug-mode-change", "snug-plant-billboards-ready", "snug-avatar-ready"].forEach((name) => window.addEventListener(name, () => [0, 120, 520].forEach((delay) => setTimeout(applyPass, delay))));
  window.addEventListener("load", applyPass, { once: true });
  setInterval(applyPass, 1800);
})();

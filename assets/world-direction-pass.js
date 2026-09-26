(() => {
  const builtScenes = new WeakSet();
  const styledNpcGroups = new WeakSet();
  const badgeTextures = new Map();

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
    const g = ctx.createRadialGradient(128, 128, 24, 128, 128, 128);
    g.addColorStop(0, colors[0]); g.addColorStop(.56, colors[1]); g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256);
    ctx.globalAlpha = .42;
    for (let i = 0; i < 76; i++) {
      const x = (i * 73) % 224 + 16, y = (i * 47) % 224 + 16;
      ctx.fillStyle = colors[2];
      if (motif === "needles") { ctx.save(); ctx.translate(x, y); ctx.rotate((i % 9) * .34); ctx.fillRect(-1, -7, 2, 14); ctx.restore(); }
      else if (motif === "petals") { ctx.beginPath(); ctx.arc(x, y, 2 + i % 3, 0, Math.PI * 2); ctx.fill(); }
      else if (motif === "ripples") { ctx.strokeStyle = colors[2]; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(x, y, 7, 3, 0, 0, Math.PI * 2); ctx.stroke(); }
      else { ctx.fillRect(x, y, 3, 3); }
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
      const material = new THREE.MeshBasicMaterial({ map: makeBiomeTexture(THREE, colors, motif), transparent: true, depthWrite: false, opacity: .72, polygonOffset: true, polygonOffsetFactor: -1 });
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
    const material = new THREE.SpriteMaterial({ map: makeTexture(THREE, kind, color), transparent: true, alphaTest: .08, depthWrite: false });
    const sprite = new THREE.Sprite(material); sprite.name = name; sprite.position.set(...position); sprite.scale.set(scale, scale, 1); sprite.renderOrder = 5; sprite.raycast = () => {}; root.add(sprite);
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

  const applyPass = () => {
    const world = window.__snugWorld;
    if (!world || world.mode !== "village") return;
    if (!buildBiomes(world) && !window.__snugThree) return setTimeout(applyPass, 120);
    styleCharacters(world);
  };

  window.__snugArrivalIntro = (mode = "town") => new Promise((resolve) => {
    if (document.querySelector(".snug-arrival-film")) return resolve();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const film = document.createElement("div"); film.className = "snug-arrival-film"; film.setAttribute("aria-label", "Arrival over Cyclical City");
    const people = [1,2,3,4,2,1,3].map((variant, index) => `<span class="snug-parachutist ${index === 2 ? "hero" : ""}" style="--x:${12 + index * 13}%;--duration:${3.1 + (index % 3) * .5}s;--delay:${index * .43}s"><img src="assets/sprites/parachutist-${variant}.png" alt=""></span>`).join("");
    film.innerHTML = `<div class="snug-arrival-cloud c1"></div><div class="snug-arrival-cloud c2"></div><div class="snug-arrival-horizon"></div><div class="snug-arrival-office"></div><div class="snug-arrival-label">Arrivals over Cyclical City</div>${people}`;
    document.body.appendChild(film); requestAnimationFrame(() => film.classList.add("is-on"));
    const followAt = reduced ? 180 : 2350, blackAt = reduced ? 700 : 4500, finishAt = reduced ? 980 : 5100;
    setTimeout(() => film.classList.add("is-following"), followAt);
    setTimeout(() => film.classList.add("is-black"), blackAt);
    setTimeout(() => { film.classList.add("is-out"); setTimeout(() => { film.remove(); resolve({ mode, sequence: "parachute-arrival" }); }, reduced ? 120 : 430); }, finishAt);
  });

  ["snug-world-ready", "snug-world-expanded", "snug-npc-roster-ready", "snug-mode-change", "snug-plant-billboards-ready"].forEach((name) => window.addEventListener(name, () => [0, 120, 520].forEach((delay) => setTimeout(applyPass, delay))));
  window.addEventListener("load", applyPass, { once: true });
  setInterval(applyPass, 1800);
})();

(() => {
  const SPRITES = {
    trees: ["tree-oak.png", "tree-apple.png", "tree-birch.png", "tree-maple.png", "tree-pine.png", "tree-willow.png"],
    bushes: ["bush-1.png", "bush-2.png", "bush-3.png", "bush-4.png"],
    flowers: ["flower-mixed-1.png", "flower-mixed-2.png", "flower-mixed-3.png", "flower-mixed-4.png", "flower-mixed-5.png", "flower-branch-3.png", "flower-branch-5.png", "flower-branch-6.png"],
    grass: ["grass-tuft-1.png"],
    garden: {
      fern: ["bush-2.png", "bush-3.png", "bush-1.png"],
      moonflower: ["flower-branch-2.png", "flower-branch-6.png", "flower-mixed-4.png"],
      oak: ["tree-oak.png", "tree-apple.png", "tree-oak.png"],
    },
    decor: ["decor-lantern.png", "decor-mushrooms.png", "decor-reeds.png", "decor-cairn.png", "decor-signpost.png", "decor-birdhouse.png"],
  };
  const DECOR = [
    [-28,-16,0,1.3],[-22,18,1,0.75],[-16,-25,2,1.25],[-10,26,3,0.8],[-4,-23,4,1.2],[3,29,5,1.1],
    [9,-27,1,0.7],[15,24,0,1.15],[22,-18,3,0.75],[27,15,2,1.1],[31,-6,5,1.15],[-31,4,4,1.05],
    [-24,-3,1,0.7],[-19,10,2,1.15],[-13,-15,3,0.65],[-7,17,5,1.0],[1,-18,0,1.15],[7,21,1,0.7],
    [13,-11,4,1.05],[19,8,2,1.2],[25,-3,3,0.72],[29,26,5,1.1],[-28,27,0,1.15],[-33,-25,2,1.2],
    [-20,30,3,0.72],[-2,34,1,0.68],[18,31,4,1.1],[34,8,5,1.0],[34,-24,0,1.15],[-35,18,2,1.15],
  ];
  const sceneGroups = new WeakMap();
  const patchedGardens = new WeakSet();
  let threePromise;
  let layoutPromise;
  let assetsPromise;

  const getThree = () => threePromise ||= import("./vendor/three/three.module.js");
  const getLayout = () => layoutPromise ||= fetch("assets/world/default-layout.json", { cache: "no-store" })
    .then((response) => response.ok ? response.json() : Promise.reject(new Error(String(response.status))))
    .then((layout) => Array.isArray(layout?.objects) ? layout.objects : []);

  const prepareAssets = async () => {
    if (assetsPromise) return assetsPromise;
    assetsPromise = (async () => {
      const THREE = await getThree();
      const loader = new THREE.TextureLoader();
      const names = [...new Set([
        ...SPRITES.trees,
        ...SPRITES.bushes,
        ...SPRITES.flowers,
        ...SPRITES.grass,
        ...Object.values(SPRITES.garden).flat(),
        ...SPRITES.decor,
      ])];
      const entries = await Promise.all(names.map(async (name) => {
        const texture = await loader.loadAsync(`assets/sprites/${name}`);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.anisotropy = Math.min(4, window.__snugWorld?.renderer?.capabilities?.getMaxAnisotropy?.() || 1);
        const image = texture.image;
        const aspect = Math.max(0.25, Math.min(3, (image?.naturalWidth || image?.width || 1) / (image?.naturalHeight || image?.height || 1)));
        const material = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          alphaTest: 0.08,
          depthWrite: false,
          fog: true,
          toneMapped: true,
        });
        const crossMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          transparent: true,
          alphaTest: 0.08,
          depthWrite: true,
          side: THREE.DoubleSide,
          fog: true,
          toneMapped: true,
        });
        return [name, { texture, material, crossMaterial, aspect }];
      }));
      window.__snugThree = THREE;
      return { THREE, assets: new Map(entries) };
    })();
    return assetsPromise;
  };

  function makeSprite(THREE, assets, name, record, height, label) {
    const asset = assets.get(name);
    if (!asset) return null;
    const sprite = new THREE.Sprite(asset.material);
    sprite.name = label;
    sprite.position.set(Number(record.x) || 0, Number(record.y) || 0, Number(record.z) || 0);
    sprite.scale.set(height * asset.aspect, height, 1);
    sprite.center.set(0.5, 0);
    sprite.renderOrder = 1;
    sprite.raycast = () => {};
    sprite.userData = {
      cameraFacingPlant: true,
      layoutId: record.id || "",
      source: record.props?.source || "",
      spritePath: `assets/sprites/${name}`,
      baseScale: [height * asset.aspect, height],
      baseY: Number(record.y) || 0,
      bloom: 0.16,
    };
    return sprite;
  }

  function makeCrossPlaneTree(THREE, assets, name, record, height, label) {
    const asset = assets.get(name);
    if (!asset) return null;
    const tree = new THREE.Group();
    tree.name = label;
    tree.position.set(Number(record.x) || 0, Number(record.y) || 0, Number(record.z) || 0);
    const geometry = new THREE.PlaneGeometry(height * asset.aspect, height);
    geometry.translate(0, height * 0.5, 0);
    [0, Math.PI / 2].forEach((rotation, index) => {
      const plane = new THREE.Mesh(geometry, asset.crossMaterial);
      plane.name = `${label}_Plane_${index + 1}`;
      plane.rotation.y = rotation;
      plane.renderOrder = 1;
      plane.raycast = () => {};
      tree.add(plane);
    });
    tree.userData = {
      crossPlaneTree: true,
      matchedPlaneCount: 2,
      layoutId: record.id || "",
      source: record.props?.source || "",
      spritePath: `assets/sprites/${name}`,
      baseScale: [1, 1],
      baseY: Number(record.y) || 0,
      treeHeight: height,
      bloom: 0.16,
    };
    return tree;
  }

  function choose(list, index) {
    return list[Math.abs(Number(index) || 0) % list.length];
  }

  function hideOriginalPlants(scene) {
    scene.children.forEach((object) => {
      if (/^snug-environment-(tree-|flower-patch$|bush-round$)/.test(object.name || "")) object.visible = false;
    });

    const expanded = scene.getObjectByName("SnugExpandedCountryside");
    (expanded?.children || []).forEach((object) => {
      if (!object.isInstancedMesh) return;
      const type = object.geometry?.type || "";
      const radius = object.geometry?.parameters?.radius || 0;
      const isTreePart = (type === "CylinderGeometry" && object.count > 30) || (type === "IcosahedronGeometry" && object.count > 30 && radius > 0.7);
      const isFlower = type === "IcosahedronGeometry" && radius > 0.07 && radius < 0.14;
      if (isTreePart || isFlower) object.visible = false;
    });

    const upgrade = scene.getObjectByName("CylindricalCityEnvironmentUpgrade");
    (upgrade?.children || []).forEach((object) => {
      if (/^PathEdgeFlowerPatch_/.test(object.name || "") || object.name === "PathEdgeGrassTufts") object.visible = false;
    });
  }

  async function buildWorldSprites(world) {
    if (!world?.scene || world.mode !== "village") return;
    const [{ THREE, assets }, records] = await Promise.all([prepareAssets(), getLayout()]);
    if (!world.scene || world.mode !== "village") return;
    hideOriginalPlants(world.scene);

    let group = sceneGroups.get(world.scene);
    if (!group) {
      group = new THREE.Group();
      group.name = "SnugPlantBillboards";
      const counters = { trees: 0, bushes: 0, flowers: 0, grass: 0, decor: 0 };
      records.forEach((record, recordIndex) => {
        const source = record.props?.source;
        const scale = Math.max(0.05, Number(record.scale) || 1);
        let sprite = null;
        if (source === "expanded-tree") {
          sprite = makeCrossPlaneTree(THREE, assets, choose(SPRITES.trees, record.props?.instanceIndex), record, 3.45 * scale, `SnugTreeCrossPair_${record.id}`);
          counters.trees += Boolean(sprite);
        } else if (source === "base-environment" && /^tree-/.test(record.props?.asset || "")) {
          const requested = `${record.props.asset}.png`;
          const name = assets.has(requested) ? requested : "tree-oak.png";
          sprite = makeCrossPlaneTree(THREE, assets, name, record, 3.05 * scale, `SnugTreeCrossPair_${record.id}`);
          counters.trees += Boolean(sprite);
        } else if (source === "base-environment" && record.props?.asset === "bush-round") {
          sprite = makeSprite(THREE, assets, choose(SPRITES.bushes, recordIndex), record, 1.3 * scale, `SnugBushSprite_${record.id}`);
          counters.bushes += Boolean(sprite);
        } else if (source === "base-environment" && record.props?.asset === "flower-patch") {
          sprite = makeSprite(THREE, assets, choose(SPRITES.flowers, recordIndex), record, 0.78 * scale, `SnugFlowerSprite_${record.id}`);
          counters.flowers += Boolean(sprite);
        } else if (source === "expanded-flower") {
          sprite = makeSprite(THREE, assets, choose(SPRITES.flowers, (record.props?.meshIndex || 0) * 31 + (record.props?.instanceIndex || 0)), { ...record, y: Math.max(0, Number(record.y) || 0) }, 0.42 * scale, `SnugFlowerSprite_${record.id}`);
          counters.flowers += Boolean(sprite);
        } else if (source === "ground-flower") {
          sprite = makeSprite(THREE, assets, choose(SPRITES.flowers, (record.props?.meshIndex || 0) * 17 + (record.props?.instanceIndex || 0)), { ...record, y: 0.02 }, 0.38 * scale, `SnugFlowerSprite_${record.id}`);
          counters.flowers += Boolean(sprite);
        } else if (source === "ground-grass") {
          sprite = makeSprite(THREE, assets, "grass-tuft-1.png", { ...record, y: 0.015 }, 0.3 * scale, `SnugGrassSprite_${record.id}`);
          counters.grass += Boolean(sprite);
        }
        if (sprite) group.add(sprite);
      });
      DECOR.forEach(([x, z, kind, scale], index) => {
        const name = SPRITES.decor[kind % SPRITES.decor.length];
        const sprite = makeSprite(THREE, assets, name, { id: `decor-${index + 1}`, x, y: 0.02, z, props: { source: "sprite-decor" } }, 1.15 * scale, `SnugDecorSprite_${index + 1}`);
        if (sprite) {
          sprite.userData.decorPurpose = ["wayfinding light", "forage patch", "waterside habitat", "trail landmark", "direction marker", "bird habitat"][kind % 6];
          group.add(sprite);
          counters.decor += 1;
        }
      });
      world.scene.add(group);
      sceneGroups.set(world.scene, group);
      window.__snugPlantBillboards = {
        world: world.scene,
        ...counters,
        count: group.children.length,
        cameraFacing: false,
        treeConstruction: "matched-cross-plane-pairs",
        treePlaneCount: counters.trees * 2,
        textureFolder: "assets/sprites/",
      };
      window.dispatchEvent(new CustomEvent("snug-plant-billboards-ready", { detail: window.__snugPlantBillboards }));
    }
    patchGarden(world.scene, THREE, assets);
  }

  function patchGarden(scene, THREE, assets) {
    const garden = scene.getObjectByName("PlayerGardenGrowth");
    if (!garden || patchedGardens.has(garden)) return;
    garden.children.forEach((plant, index) => {
      const match = /^Growing_(moonflower|fern|oak)_/.exec(plant.name || "");
      const stage = Number(plant.userData?.stage || 0);
      if (!match || stage < 1) return;
      const kind = match[1];
      const names = SPRITES.garden[kind];
      const name = names[Math.min(names.length - 1, stage - 1)];
      const heights = kind === "oak" ? [0, 0.7, 1.55, 2.75] : kind === "fern" ? [0, 0.38, 0.65, 0.9] : [0, 0.38, 0.62, 0.86];
      plant.children.forEach((child) => { child.visible = false; });
      const height = heights[stage] || heights[3];
      const sprite = kind === "oak"
        ? makeCrossPlaneTree(THREE, assets, name, { id: plant.name, x: 0, y: 0, z: 0, props: { source: "player-garden" } }, height, `SnugGardenTreeCrossPair_${index + 1}`)
        : makeSprite(THREE, assets, name, { id: plant.name, x: 0, y: 0, z: 0, props: { source: "player-garden" } }, height, `SnugGardenSprite_${index + 1}`);
      if (sprite) plant.add(sprite);
    });
    patchedGardens.add(garden);
  }

  let lastFrame = 0;
  const animateBillboards = (now) => {
    requestAnimationFrame(animateBillboards);
    if (now - lastFrame < 33) return;
    lastFrame = now;
    const world = window.__snugWorld;
    const group = world?.scene && sceneGroups.get(world.scene);
    const player = world?.player;
    if (!group || !player || world.mode !== "village") return;
    group.children.forEach((sprite) => {
      const data = sprite.userData;
      if (!data?.baseScale) return;
      const distance = Math.hypot(player.position.x - sprite.position.x, player.position.z - sprite.position.z);
      const target = Math.max(0.16, Math.min(1, (34 - distance) / 13));
      data.bloom += (target - data.bloom) * 0.11;
      const eased = data.bloom * data.bloom * (3 - 2 * data.bloom);
      if (data.crossPlaneTree) {
        const scale = .18 + eased * .82;
        sprite.scale.setScalar(scale);
        sprite.position.y = data.baseY - (1 - eased) * Math.min(1.6, data.treeHeight * .48);
      } else {
        sprite.scale.set(data.baseScale[0] * (.18 + eased * .82), data.baseScale[1] * (.18 + eased * .82), 1);
        sprite.position.y = data.baseY - (1 - eased) * Math.min(1.6, data.baseScale[1] * .48);
      }
    });
  };
  requestAnimationFrame(animateBillboards);

  const schedulePass = () => [0, 100, 280, 750, 1700, 3400].forEach((delay) => {
    setTimeout(() => buildWorldSprites(window.__snugWorld).catch((error) => console.error("Plant billboard setup failed.", error)), delay);
  });

  window.addEventListener("snug-world-ready", schedulePass);
  window.addEventListener("snug-world-expanded", schedulePass);
  window.addEventListener("cylindric-environment-upgrade-ready", schedulePass);
  window.addEventListener("snug-mode-change", schedulePass);
  window.addEventListener("load", schedulePass, { once: true });
  setInterval(() => {
    const world = window.__snugWorld;
    if (!world?.scene || world.mode !== "village") return;
    prepareAssets().then(({ THREE, assets }) => patchGarden(world.scene, THREE, assets)).catch(() => {});
  }, 1600);
  schedulePass();
})();

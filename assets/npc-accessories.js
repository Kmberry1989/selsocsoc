/* snug-npc-accessories-v2
 * Dresses every roster NPC with their real accessory GLBs from
 * assets/npc-accessories/manifest.json (head + right hand + left hand
 * + back). The v1 primitive held items are built first as the fallback;
 * each GLB swaps its primitive in on load, so a failed load simply
 * keeps the primitive and the scene never breaks. Kyle's guitar GLB
 * keeps its v1 placement; the double-add race is fixed with a pending
 * flag on the slot. Kyle has no hat (his portrait has hair) — his
 * generic head cone is removed.
 */
(() => {
  if (window.__snugNpcAccessories) return;
  window.__snugNpcAccessories = true;

  // The shared window.__snugThree can be a partial shim planted by the app
  // bundle (missing e.g. BoxGeometry/TorusGeometry), so load the real
  // Three module directly.
  let realThreePromise = null;
  const getRealThree = () => {
    if (!realThreePromise) {
      realThreePromise = import(new URL("assets/vendor/three/three.module.js", document.baseURI).href)
        .catch(() => null);
    }
    return realThreePromise;
  };

  function mat(THREE, color, roughness = 0.6) {
    return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.05 });
  }
  function mesh(THREE, geo, material, x = 0, y = 0, z = 0) {
    const m = new THREE.Mesh(geo, material);
    m.position.set(x, y, z);
    m.castShadow = true;
    return m;
  }

  const BUILDERS = {
    // Mayor Mayor: a ceremonial gavel (upright redesign 2026-10-27:
    // vertical handle through the grip, larger head centred on top).
    'mayor-mayor'(THREE) {
      const g = new THREE.Group();
      const handle = mesh(THREE, new THREE.CylinderGeometry(0.022, 0.026, 0.42, 10), mat(THREE, 0x411a09, 0.8), 0, 0.08, 0);
      const head = mesh(THREE, new THREE.CylinderGeometry(0.075, 0.075, 0.22, 20), mat(THREE, 0x280f05, 0.8), 0, 0.30, 0);
      head.rotation.z = Math.PI / 2;
      const band1 = mesh(THREE, new THREE.CylinderGeometry(0.078, 0.078, 0.024, 20), mat(THREE, 0xc6670a, 0.35), -0.075, 0.30, 0);
      band1.rotation.z = Math.PI / 2;
      const band2 = mesh(THREE, new THREE.CylinderGeometry(0.078, 0.078, 0.024, 20), mat(THREE, 0xc6670a, 0.35), 0.075, 0.30, 0);
      band2.rotation.z = Math.PI / 2;
      g.add(handle, head, band1, band2);
      return g;
    },
    // Gideon (tour guide): a tour pennant flag.
    'gideon'(THREE) {
      const g = new THREE.Group();
      const pole = mesh(THREE, new THREE.CylinderGeometry(0.016, 0.016, 0.85, 8), mat(THREE, 0x8a6a4a, 0.7), 0, 0.32, 0);
      const flagShape = new THREE.Shape();
      flagShape.moveTo(0, 0);
      flagShape.lineTo(0.34, 0.09);
      flagShape.lineTo(0, 0.18);
      flagShape.lineTo(0, 0);
      const flagGeo = new THREE.ShapeGeometry(flagShape);
      const flag = new THREE.Mesh(flagGeo, mat(THREE, 0xb07a3f, 0.7));
      flag.position.set(0.016, 0.58, 0);
      flag.castShadow = true;
      const tip = mesh(THREE, new THREE.SphereGeometry(0.028, 10, 8), mat(THREE, 0xe4aa38, 0.4), 0, 0.76, 0);
      g.add(pole, flag, tip);
      return g;
    },
    // Barnaby Bargain (shopkeeper): a fat gold coin.
    'barnaby-bargain'(THREE) {
      const g = new THREE.Group();
      const coin = mesh(THREE, new THREE.CylinderGeometry(0.085, 0.085, 0.028, 24), mat(THREE, 0xe4aa38, 0.35));
      coin.rotation.x = Math.PI / 2.4;
      const rim = mesh(THREE, new THREE.TorusGeometry(0.085, 0.012, 10, 24), mat(THREE, 0xc78f2a, 0.4));
      rim.rotation.x = Math.PI / 2.4;
      g.add(coin, rim);
      return g;
    },
    // Pip Parade (festival organizer): a balloon with string.
    'pip-parade'(THREE) {
      const g = new THREE.Group();
      const balloon = mesh(THREE, new THREE.SphereGeometry(0.14, 20, 16), mat(THREE, 0xe76854, 0.45), 0, 0.22, 0);
      balloon.scale.y = 1.15;
      const knot = mesh(THREE, new THREE.ConeGeometry(0.03, 0.05, 10), mat(THREE, 0xc74f3d), 0, 0.06, 0);
      knot.rotation.x = Math.PI;
      const string = mesh(THREE, new THREE.CylinderGeometry(0.006, 0.006, 0.22, 6), mat(THREE, 0xf5f0e7, 0.8), 0, -0.06, 0);
      g.add(balloon, knot, string);
      return g;
    },
    // Agnes Alley (cat shelter keeper): a ball of yarn.
    'agnes-alley'(THREE) {
      const g = new THREE.Group();
      const ball = mesh(THREE, new THREE.SphereGeometry(0.11, 20, 16), mat(THREE, 0xd9a7c7, 0.85));
      const wrap1 = mesh(THREE, new THREE.TorusGeometry(0.11, 0.014, 8, 24), mat(THREE, 0xc48fb5, 0.85));
      const wrap2 = mesh(THREE, new THREE.TorusGeometry(0.11, 0.014, 8, 24), mat(THREE, 0xc48fb5, 0.85));
      wrap2.rotation.x = Math.PI / 2;
      wrap2.rotation.y = 0.5;
      const tail = mesh(THREE, new THREE.CylinderGeometry(0.008, 0.008, 0.2, 6), mat(THREE, 0xd9a7c7, 0.85), 0.1, -0.12, 0.03);
      tail.rotation.z = 0.7;
      g.add(ball, wrap1, wrap2, tail);
      return g;
    },
    // Dottie Daly (quest giver): a rolled quest scroll.
    'dottie-daly'(THREE) {
      const g = new THREE.Group();
      const scroll = mesh(THREE, new THREE.CylinderGeometry(0.05, 0.05, 0.32, 16), mat(THREE, 0xf3e6cf, 0.8));
      scroll.rotation.z = Math.PI / 2;
      const band = mesh(THREE, new THREE.CylinderGeometry(0.056, 0.056, 0.05, 16), mat(THREE, 0xb4552d, 0.6));
      band.rotation.z = Math.PI / 2;
      const seal = mesh(THREE, new THREE.SphereGeometry(0.028, 12, 10), mat(THREE, 0xe4aa38, 0.4), 0, 0.062, 0);
      g.add(scroll, band, seal);
      return g;
    },
    // Mr. Buck Coinsworth (banker): a gold bar.
    'mr-buck-coinsworth'(THREE) {
      const g = new THREE.Group();
      const bar = mesh(THREE, new THREE.BoxGeometry(0.2, 0.09, 0.1), mat(THREE, 0xe4aa38, 0.3));
      bar.scale.set(1, 1, 1);
      const top = mesh(THREE, new THREE.BoxGeometry(0.16, 0.02, 0.08), mat(THREE, 0xf2c86f, 0.25), 0, 0.055, 0);
      g.add(bar, top);
      return g;
    },
    // Fern Bramble (gardener): a potted flower.
    'fern-bramble'(THREE) {
      const g = new THREE.Group();
      const pot = mesh(THREE, new THREE.CylinderGeometry(0.075, 0.06, 0.1, 14), mat(THREE, 0xb4552d, 0.8), 0, -0.02, 0);
      const stem = mesh(THREE, new THREE.CylinderGeometry(0.012, 0.012, 0.14, 8), mat(THREE, 0x5c8d65, 0.8), 0, 0.1, 0);
      const bloom = mesh(THREE, new THREE.SphereGeometry(0.055, 14, 12), mat(THREE, 0xe78bb0, 0.6), 0, 0.2, 0);
      const leaf = mesh(THREE, new THREE.SphereGeometry(0.035, 10, 8), mat(THREE, 0x5c8d65, 0.7), 0.045, 0.12, 0);
      leaf.scale.set(1.4, 0.5, 0.7);
      g.add(pot, stem, bloom, leaf);
      return g;
    },
    // Stanley Stamp (mail carrier): an envelope.
    'stanley-stamp'(THREE) {
      const g = new THREE.Group();
      const env = mesh(THREE, new THREE.BoxGeometry(0.24, 0.15, 0.025), mat(THREE, 0xfbf7ec, 0.85));
      const flap = mesh(THREE, new THREE.BoxGeometry(0.24, 0.07, 0.028), mat(THREE, 0xefe6d2, 0.85), 0, 0.035, 0);
      flap.rotation.x = 0.0;
      const stamp = mesh(THREE, new THREE.BoxGeometry(0.045, 0.05, 0.03), mat(THREE, 0x7fb3d5, 0.7), 0.085, 0.045, 0);
      g.add(env, flap, stamp);
      g.rotation.x = -0.15;
      return g;
    },
    // Bobby Gill (fishing mentor): a fishing rod with bobber.
    'bobby-gill'(THREE) {
      const g = new THREE.Group();
      const rod = mesh(THREE, new THREE.CylinderGeometry(0.014, 0.02, 1.15, 8), mat(THREE, 0x8a6a4a, 0.7), 0, 0.45, 0);
      rod.rotation.z = 0.35;
      rod.rotation.x = -0.2;
      const line = mesh(THREE, new THREE.CylinderGeometry(0.004, 0.004, 0.5, 6), mat(THREE, 0xf5f0e7, 0.9), 0.28, 0.72, -0.12);
      line.rotation.z = 0.15;
      const bobber = mesh(THREE, new THREE.SphereGeometry(0.035, 12, 10), mat(THREE, 0xe76854, 0.5), 0.32, 0.48, -0.13);
      const bobberTop = mesh(THREE, new THREE.SphereGeometry(0.036, 12, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat(THREE, 0xfbf7ec, 0.5), 0.32, 0.48, -0.13);
      g.add(rod, line, bobber, bobberTop);
      return g;
    },
  };

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
    'kyle-busker': 'KB',
  };

  // Real accessory GLBs per NPC, from assets/npc-accessories/manifest.json.
  // head: replaces the generic PrimitiveHeadAccessory cone in
  // HeadAccessorySlot_<MARK>. y lifts the hat so its base sits on the coin
  // head top (slot is 0.27 above head centre; GLB bases sit 0..-0.09 below
  // their origin, measured 2026-11-22).
  // hand: replaces the primitive held item in HeldItemSlot_<MARK>.
  // handL: left-hand item, in a HeldItemSlotLeft_<MARK> created under
  // HandSlot_<MARK>_Left. cane y lowers it so the tip touches the ground.
  // back: in a BackSlot_<MARK> created on the NPC group at (0, 0.66, -0.30),
  // just behind the torso; y/z tune each piece onto the back.
  const DRESS = {
    'mayor-mayor': { head: { file: 'tophat.glb' }, hand: { file: 'gavel.glb' }, back: { file: 'cape.glb', y: -0.29, z: -0.02 } },
    'gideon': { head: { file: 'tourcap.glb', y: -0.01 }, hand: { file: 'flag.glb' }, handL: { file: 'cane.glb', y: -0.44 }, back: { file: 'tour-backpack.glb', y: -0.15 } },
    'lyla-lens': { head: { file: 'press-fedora.glb' }, hand: { file: 'camera.glb' }, back: { file: 'press-satchel.glb' } },
    'chip-chance': { head: { file: 'showman-bowler.glb', y: 0.06 }, hand: { file: 'die.glb' }, handL: { file: 'microphone.glb' }, back: { file: 'dice-pouch.glb' } },
    'barnaby-bargain': { head: { file: 'bargain-bowler.glb', y: 0.06 }, hand: { file: 'coin.glb' }, back: { file: 'merchant-satchel.glb' } },
    'pip-parade': { head: { file: 'confetti-crown.glb' }, hand: { file: 'balloon.glb' }, back: { file: 'festival-banner.glb' } },
    'agnes-alley': { head: { file: 'cat-ears.glb' }, hand: { file: 'yarn.glb' }, back: { file: 'cat-carrier.glb' } },
    'dottie-daly': { head: { file: 'quest-beret.glb', y: 0.05 }, hand: { file: 'scroll.glb' }, back: { file: 'quest-tube.glb' } },
    'peggy-plank': { head: { file: 'hardhat.glb', y: 0.08 }, hand: { file: 'hammer.glb' }, back: { file: 'tool-roll.glb' } },
    'mr-buck-coinsworth': { head: { file: 'banker-bowler.glb', y: 0.06 }, hand: { file: 'goldbar.glb' }, back: { file: 'money-bag.glb' } },
    'fern-bramble': { head: { file: 'strawhat.glb', y: -0.01 }, hand: { file: 'flower.glb' }, back: { file: 'seed-pack.glb' } },
    'stanley-stamp': { head: { file: 'mailcap.glb' }, hand: { file: 'envelope.glb' }, back: { file: 'mailbag.glb' } },
    'bobby-gill': { head: { file: 'buckethat.glb', y: 0.01 }, hand: { file: 'rod.glb' }, back: { file: 'creel.glb' } },
    'kyle-busker': { hand: { file: 'guitar.glb', guitar: true } },
  };

  // The real guitar GLB (the game's own guitar instrument, exported by
  // selsocsoc-instrument-export). Loaded once and attached to Kyle's hand.
  let gltfLoaderPromise = null;
  const getGLTFLoader = () => {
    if (!gltfLoaderPromise) {
      gltfLoaderPromise = import(new URL('assets/vendor/three/GLTFLoader.js', document.baseURI).href)
        .then((mod) => new mod.GLTFLoader())
        .catch(() => null);
    }
    return gltfLoaderPromise;
  };

  async function dressGuitar(group, THREE) {
    const npc = (group.children || []).find((child) => child.userData?.npcId === 'kyle-busker');
    const slot = npc ? npc.getObjectByName('HeldItemSlot_KB') : null;
    if (!slot || slot.getObjectByName('NPCAccessory_KB') || slot.userData?.__guitarPending) return;
    if (slot.userData) slot.userData.__guitarPending = true;
    try {
      const loader = await getGLTFLoader();
      if (!loader) return;
      const loaded = await loader.loadAsync('assets/npc-accessories/guitar.glb');
      const guitar = loaded.scene;
      guitar.name = 'NPCAccessory_KB';
      // The GLB is ~1.4 m tall, Y-up, body at the bottom. Shrink it to hand
      // size and lean it across the body like a busker holding it to play:
      // body at the right hand, neck up across the chest toward the left.
      guitar.scale.setScalar(0.7);
      guitar.rotation.set(-0.18, 0.15, 0.65);
      guitar.position.set(0, -0.3, 0.14);
      guitar.traverse((child) => { if (child.isMesh) child.castShadow = true; });
      slot.add(guitar);
    } catch (error) {
      console.warn('[npc accessories] could not dress kyle-busker guitar', error);
    } finally {
      if (slot.userData) slot.userData.__guitarPending = false;
    }
  }

  // The die GLB now carries its own pips in its texture (swapped in
  // 2026-11-23 from the optimized set), so no code pips are added.
  // addDiePips below is unused since then; kept in case the plain
  // cube ever comes back. The die is a ~0.2 cube centred on the slot
  // origin, faces at about ±0.1.
  function addDiePips(THREE, model) {
    const geo = new THREE.SphereGeometry(0.014, 10, 8);
    const material = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.6 });
    const group = new THREE.Group();
    group.name = 'DiePips';
    const half = 0.05;
    const layouts = {
      1: [[0, 0]],
      2: [[-half, half], [half, -half]],
      3: [[-half, half], [0, 0], [half, -half]],
      4: [[-half, half], [half, half], [-half, -half], [half, -half]],
      5: [[-half, half], [half, half], [0, 0], [-half, -half], [half, -half]],
      6: [[-half, half], [half, half], [-half, 0], [half, 0], [-half, -half], [half, -half]],
    };
    // [value, normal, u axis, v axis]
    const faces = [
      [1, [1, 0, 0], [0, 1, 0], [0, 0, 1]],
      [6, [-1, 0, 0], [0, 1, 0], [0, 0, -1]],
      [2, [0, 1, 0], [1, 0, 0], [0, 0, 1]],
      [5, [0, -1, 0], [1, 0, 0], [0, 0, -1]],
      [3, [0, 0, 1], [1, 0, 0], [0, 1, 0]],
      [4, [0, 0, -1], [-1, 0, 0], [0, 1, 0]],
    ];
    for (const [value, n, u, v] of faces) {
      for (const [a, b] of layouts[value]) {
        const pip = new THREE.Mesh(geo, material);
        pip.position.set(
          n[0] * 0.0945 + u[0] * a + v[0] * b,
          n[1] * 0.0945 + u[1] * a + v[1] * b,
          n[2] * 0.0945 + u[2] * a + v[2] * b
        );
        pip.castShadow = true;
        group.add(pip);
      }
    }
    model.add(group);
  }

  // Swap one real GLB into a slot, removing the primitive it replaces.
  // On any load failure the primitive stays, so the scene never breaks.
  async function swapGlb(loader, THREE, slot, name, file, pos, onLoad) {
    if (!slot || slot.getObjectByName(name)) return;
    try {
      const loaded = await loader.loadAsync('assets/npc-accessories/' + file);
      if (slot.getObjectByName(name)) return; // dressed while loading
      const model = loaded.scene;
      model.name = name;
      if (pos) model.position.set(pos[0] || 0, pos[1] || 0, pos[2] || 0);
      model.traverse((child) => { if (child.isMesh) child.castShadow = true; });
      if (onLoad) onLoad(model);
      // Remove the primitive this GLB replaces (all children for the hand
      // slot, the named cone for the head slot); back/left slots are new.
      if (name.endsWith('_hand')) {
        [...slot.children].forEach((child) => slot.remove(child));
      } else if (name.endsWith('_head')) {
        const old = slot.children.find((child) => child.name.startsWith('PrimitiveHeadAccessory_'));
        if (old) slot.remove(old);
      }
      slot.add(model);
    } catch (error) {
      console.warn('[npc accessories] could not load', file, error);
    }
  }

  async function dressGlbs(group, THREE) {
    const loader = await getGLTFLoader();
    if (!loader) return;
    for (const [id, cfg] of Object.entries(DRESS)) {
      try {
        const mark = MARKS[id];
        const npc = (group.children || []).find((child) => child.userData?.npcId === id);
        if (!npc) continue;
        if (cfg.head) {
          const slot = npc.getObjectByName(`HeadAccessorySlot_${mark}`);
          swapGlb(loader, THREE, slot, `NPCAccessoryGLB_${mark}_head`, cfg.head.file,
            [0, cfg.head.y || 0, cfg.head.z || 0], null);
        } else {
          // No hat for this NPC: drop the generic cone (Kyle's portrait
          // has hair; the cone reads as a hat he doesn't wear).
          const slot = npc.getObjectByName(`HeadAccessorySlot_${mark}`);
          const old = slot && slot.children.find((child) => child.name.startsWith('PrimitiveHeadAccessory_'));
          if (old) slot.remove(old);
        }
        if (cfg.hand && !cfg.hand.guitar) {
          const slot = npc.getObjectByName(`HeldItemSlot_${mark}`);
          swapGlb(loader, THREE, slot, `NPCAccessoryGLB_${mark}_hand`, cfg.hand.file,
            [0, cfg.hand.y || 0, cfg.hand.z || 0],
            cfg.hand.pips ? (model) => addDiePips(THREE, model) : null);
        }
        if (cfg.handL) {
          let slot = npc.getObjectByName(`HeldItemSlotLeft_${mark}`);
          if (!slot) {
            const hand = npc.getObjectByName(`HandSlot_${mark}_Left`);
            if (hand) {
              slot = new THREE.Group();
              slot.name = `HeldItemSlotLeft_${mark}`;
              slot.position.set(0, -0.04, 0.14);
              hand.add(slot);
            }
          }
          swapGlb(loader, THREE, slot, `NPCAccessoryGLB_${mark}_handL`, cfg.handL.file,
            [0, cfg.handL.y || 0, cfg.handL.z || 0], null);
        }
        if (cfg.back) {
          let slot = npc.getObjectByName(`BackSlot_${mark}`);
          if (!slot) {
            slot = new THREE.Group();
            slot.name = `BackSlot_${mark}`;
            slot.position.set(0, 0.66, -0.30);
            npc.add(slot);
          }
          swapGlb(loader, THREE, slot, `NPCAccessoryGLB_${mark}_back`, cfg.back.file,
            [0, cfg.back.y || 0, cfg.back.z || 0], null);
        }
      } catch (error) {
        console.warn('[npc accessories] could not dress', id, error);
      }
    }
  }

  async function dress(group) {
    const THREE = (await getRealThree()) || window.__snugThree;
    if (!THREE || !group) return;
    for (const [id, build] of Object.entries(BUILDERS)) {
      try {
        const mark = MARKS[id];
        const npc = (group.children || []).find((child) => child.userData?.npcId === id);
        const slot = npc ? npc.getObjectByName(`HeldItemSlot_${mark}`) : null;
        if (!slot) continue;
        if (slot.getObjectByName(`NPCAccessory_${mark}`)) continue; // already dressed
        const prop = build(THREE);
        prop.name = `NPCAccessory_${mark}`;
        slot.add(prop);
      } catch (error) {
        console.warn('[npc accessories] could not dress', id, error);
      }
    }
    // Kyle (busker): the real guitar GLB, not a primitive.
    await dressGuitar(group, THREE);
    // Everyone: the real accessory GLBs (head, hand, left hand, back).
    dressGlbs(group, THREE);
  }

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

/* snug-npc-accessories-v1
 * Gives the 8 roster NPCs who lack one a signature held accessory.
 * Lyla (camera), Chip (die) and Peggy (hammer) already have theirs from
 * the roster bundle; this adds Barnaby, Pip, Agnes, Dottie, Buck, Fern,
 * Stanley and Bobby. Built from primitives in the game's toon style,
 * attached to each NPC's HeldItemSlot_<MARK> (right hand).
 */
(() => {
  if (window.__snugNpcAccessories) return;
  window.__snugNpcAccessories = true;

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
    'barnaby-bargain': 'BB',
    'pip-parade': 'PP',
    'agnes-alley': 'AA',
    'dottie-daly': 'DD',
    'mr-buck-coinsworth': 'BC',
    'fern-bramble': 'FB',
    'stanley-stamp': 'SS',
    'bobby-gill': 'BG',
  };

  function dress(group) {
    const THREE = window.__snugThree;
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
  }

  window.addEventListener('snug-npc-roster-ready', (event) => {
    dress(event.detail?.group);
  });
})();

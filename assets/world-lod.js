// assets/world-lod.js — Draw distance, THREE.LOD buildings, and shadow scaling
// for the Cyclical City 3D village. Keeps the up-close look identical; only
// distant detail is simplified or culled (fog masks the transitions).
(() => {
  if (window.__snugWorldLOD) return;
  window.__snugWorldLOD = { version: 1 };

  const state = {
    THREE: null,
    world: null,
    culled: [],       // { object, pos, baseVisible, hiddenByLOD, shadowBase }
    instanced: [],    // { mesh, base: Float32Array, positions: [], hidden: [] }
    wrappedBuildings: new WeakSet(),
    timer: 0,
    isMobile: false,
    drawDistance: 105,
    shadowDistance: 60,
    lodDistance: 55,
  };

  // Scenery safe to hide at distance. Never matches interactive/unique things.
  const CULLABLE_RE = /tree|plant|grass|flower|bush|cloud|lantern|decor|reed|mushroom|cairn|signpost|birdhouse|rock|fence/i;
  const PROTECTED_RE = /npc|player|avatar|mailbox|garden|house|home|door|button|hitbox|interact|light|dome|pond|cottage|townhall|pavilion|lod/i;

  const isMobileDevice = () => {
    try {
      if (window.matchMedia('(pointer: coarse)').matches) return true;
    } catch { /* ignore */ }
    return Math.min(window.innerWidth || 9999, window.innerHeight || 9999) < 700;
  };

  function protectedAncestors(object) {
    let p = object.parent;
    while (p) {
      if (PROTECTED_RE.test(p.name || '')) return true;
      p = p.parent;
    }
    return false;
  }

  // --- THREE.LOD for decorative buildings (cottages / town hall / pavilion) ---
  function simplifyBuilding(THREE, group) {
    const far = group.clone(true);
    far.traverse((o) => {
      if (!o.isMesh) return;
      o.castShadow = false;
      o.receiveShadow = false;
      // Hide small detail meshes (window panes, frames) at distance.
      try {
        o.geometry.computeBoundingSphere();
        if (o.geometry.boundingSphere.radius < 0.45) o.visible = false;
      } catch { /* keep mesh on any geometry error */ }
    });
    return far;
  }

  function wrapBuildingLOD(THREE, group) {
    if (state.wrappedBuildings.has(group)) return null;
    const parent = group.parent;
    if (!parent) return null;
    try {
      const far = simplifyBuilding(THREE, group);
      const lod = new THREE.LOD();
      lod.name = `${group.name || 'Building'}_LOD`;
      lod.position.copy(group.position);
      lod.quaternion.copy(group.quaternion);
      lod.scale.copy(group.scale);
      parent.remove(group);
      group.position.set(0, 0, 0);
      group.quaternion.identity();
      group.scale.set(1, 1, 1);
      lod.addLevel(group, 0);
      lod.addLevel(far, state.lodDistance);
      parent.add(lod);
      state.wrappedBuildings.add(group);
      return lod;
    } catch {
      return null;
    }
  }

  function applyBuildingLOD(THREE, scene) {
    // Decorative expansion buildings: groups under SnugExpandedCountryside
    // containing a CottageBody / TownHallBody mesh.
    const expansion = scene.getObjectByName('SnugExpandedCountryside');
    if (!expansion) return;
    [...expansion.children].forEach((child) => {
      if (!child.isGroup || child.isLOD) return;
      let isBuilding = false;
      child.traverse((o) => {
        if (/CottageBody|TownHallBody/.test(o.name || '')) isBuilding = true;
      });
      if (isBuilding) wrapBuildingLOD(THREE, child);
    });
  }

  // --- Distance culling registry ---
  function registerCullables(THREE, scene) {
    state.culled.length = 0;
    state.instanced.length = 0;
    const v = new THREE.Vector3();
    scene.traverse((object) => {
      if (object.isLOD) return;
      if (object.isInstancedMesh) {
        const name = object.name || '';
        if (/tree/i.test(name) && !PROTECTED_RE.test(name) && !protectedAncestors(object)) {
          registerInstanced(THREE, object);
        }
        return;
      }
      if (!object.isMesh && !object.isSprite) return;
      const name = object.name || '';
      if (!CULLABLE_RE.test(name)) return;
      if (PROTECTED_RE.test(name) || protectedAncestors(object)) return;
      object.getWorldPosition(v);
      state.culled.push({
        object,
        pos: { x: v.x, y: v.y, z: v.z },
        baseVisible: object.visible,
        hiddenByLOD: false,
        shadowBase: object.isMesh ? object.castShadow : false,
      });
    });
  }

  function registerInstanced(THREE, mesh) {
    const count = mesh.count;
    const base = new Float32Array(count * 16);
    const positions = [];
    const m = new THREE.Matrix4();
    for (let i = 0; i < count; i++) {
      mesh.getMatrixAt(i, m);
      m.toArray(base, i * 16);
      positions.push(new THREE.Vector3().setFromMatrixPosition(m));
    }
    state.instanced.push({ mesh, base, positions, hidden: new Array(count).fill(false) });
  }

  // --- Mobile shadow tuning ---
  function tuneShadows(world) {
    world.scene.traverse((o) => {
      if (o.isDirectionalLight && o.castShadow && o.shadow && o.shadow.mapSize) {
        if (state.isMobile && o.shadow.mapSize.x > 1024) {
          o.shadow.mapSize.set(1024, 1024);
          if (o.shadow.map) {
            try { o.shadow.map.dispose(); } catch { /* ignore */ }
            o.shadow.map = null;
          }
        }
      }
    });
  }

  // --- Throttled cull pass ---
  const camPos = { x: 0, y: 0, z: 0 };
  const tmpMatrix = { m: null };
  let tmpVec = null;
  function cullPass() {
    const world = state.world;
    const THREE = state.THREE;
    if (!world || !THREE || !tmpVec || !tmpMatrix.m || document.hidden) return;
    const camera = world.camera;
    if (!camera) return;
    camera.getWorldPosition(tmpVec);
    camPos.x = tmpVec.x; camPos.y = tmpVec.y; camPos.z = tmpVec.z;
    const dd2 = state.drawDistance * state.drawDistance;
    const sd2 = state.shadowDistance * state.shadowDistance;

    for (const entry of state.culled) {
      const dx = entry.pos.x - camPos.x;
      const dz = entry.pos.z - camPos.z;
      const d2 = dx * dx + dz * dz;
      if (d2 > dd2) {
        if (entry.object.visible) {
          entry.object.visible = false;
          entry.hiddenByLOD = true;
        }
      } else if (entry.hiddenByLOD) {
        entry.object.visible = entry.baseVisible;
        entry.hiddenByLOD = false;
      }
      // Shadow LOD: distant casters skip the shadow pass.
      if (entry.shadowBase && entry.object.isMesh) {
        const wantShadow = d2 <= sd2;
        if (entry.object.castShadow !== wantShadow) entry.object.castShadow = wantShadow;
      }
    }

    for (const entry of state.instanced) {
      let changed = false;
      for (let i = 0; i < entry.positions.length; i++) {
        const p = entry.positions[i];
        const dx = p.x - camPos.x;
        const dz = p.z - camPos.z;
        const far = dx * dx + dz * dz > dd2;
        if (far !== entry.hidden[i]) {
          if (far) {
            entry.mesh.setMatrixAt(i, tmpMatrix.m);
          } else {
            tmpMatrix.m.fromArray(entry.base, i * 16);
            entry.mesh.setMatrixAt(i, tmpMatrix.m);
          }
          entry.hidden[i] = far;
          changed = true;
        }
      }
      if (changed) entry.mesh.instanceMatrix.needsUpdate = true;
    }
  }

  let threePromise = null;
  const getThree = () => (threePromise ||= import('./vendor/three/three.module.js'));

  async function init(world) {
    if (state.world) return;
    if (world && world.mode && world.mode !== 'village') return;
    state.world = world || window.__snugWorld;
    if (!state.world?.scene) { state.world = null; return; }
    try {
      state.THREE = await getThree();
    } catch { return; }
    const THREE = state.THREE;
    tmpVec = new THREE.Vector3();
    tmpMatrix.m = new THREE.Matrix4().makeScale(0, 0, 0);

    state.isMobile = isMobileDevice();
    state.drawDistance = state.isMobile ? 85 : 105;

    // Align the far plane just past the fog end (fog far = 112).
    try {
      const camera = state.world.camera;
      if (camera && camera.far > 125) {
        camera.far = 120;
        camera.updateProjectionMatrix();
      }
    } catch { /* ignore */ }

    tuneShadows(state.world);
    applyBuildingLOD(THREE, state.world.scene);
    registerCullables(THREE, state.world.scene);

    if (!state.timer) {
      state.timer = setInterval(cullPass, 400);
    }
    // Run once right away so distant objects cull on entry.
    cullPass();
  }

  window.addEventListener('snug-world-ready', (event) => {
    state.world = null;
    init(event.detail || window.__snugWorld);
  });
  window.addEventListener('snug-world-expanded', () => {
    // World rebuilt: re-register (keeps LOD wraps via WeakSet).
    if (!state.world) return;
    const THREE = state.THREE;
    if (!THREE || !state.world.scene) return;
    try {
      applyBuildingLOD(THREE, state.world.scene);
      registerCullables(THREE, state.world.scene);
    } catch { /* keep running */ }
  });
  // If the world already exists (late load), init now.
  if (window.__snugWorld?.scene) init(window.__snugWorld);
})();

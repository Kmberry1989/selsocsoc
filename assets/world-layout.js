import('./vendor/three/three.module.js').then((THREE) => {
const FORMAT = 'cylindric-world-layout';
const FORMAT_VERSION = 1;
const WORLD_X_LIMIT = 36;
const WORLD_Z_LIMIT = 34;
const PLAYER_RADIUS = 0.3;
const state = {
  scene: null,
  defaults: [],
  effective: [],
  targets: new Map(),
  claimed: new WeakSet(),
  warned: new Set(),
  overridden: new Set(),
  source: 'defaults',
};
const yAxis = new THREE.Vector3(0, 1, 0);
const scratchMatrix = new THREE.Matrix4();
const scratchPosition = new THREE.Vector3();
const scratchQuaternion = new THREE.Quaternion();
const scratchScale = new THREE.Vector3();

const finite = (value) => Number.isFinite(Number(value));
const clampX = (value) => Math.max(-WORLD_X_LIMIT, Math.min(WORLD_X_LIMIT, Number(value)));
const clampZ = (value) => Math.max(-WORLD_Z_LIMIT, Math.min(WORLD_Z_LIMIT, Number(value)));
const radians = (clockwiseDegrees) => -Number(clockwiseDegrees || 0) * Math.PI / 180;
const distance = (object, record) => Math.hypot(object.position.x - record.x, object.position.z - record.z);
const near = (a, b, tolerance = 0.08) => Math.abs(a - b) <= tolerance;

function validLayout(data) {
  if (!data || data.format !== FORMAT || data.version !== FORMAT_VERSION || data.units !== 'meters' || !Array.isArray(data.objects)) return false;
  const ids = new Set();
  for (const object of data.objects) {
    if (!object || typeof object.id !== 'string' || !object.id || ids.has(object.id)) return false;
    if (typeof object.type !== 'string' || !finite(object.x) || !finite(object.y) || !finite(object.z) || !finite(object.rotY) || !finite(object.scale) || Number(object.scale) <= 0) return false;
    if (object.props != null && (typeof object.props !== 'object' || Array.isArray(object.props))) return false;
    ids.add(object.id);
  }
  return true;
}

function normalize(record, clampToWalkableBounds = false) {
  return {
    ...record,
    x: clampToWalkableBounds ? clampX(record.x) : Number(record.x),
    y: Math.max(-12, Math.min(24, Number(record.y))),
    z: clampToWalkableBounds ? clampZ(record.z) : Number(record.z),
    rotY: Number(record.rotY),
    scale: Math.max(0.05, Math.min(8, Number(record.scale))),
    props: record.props || {},
  };
}

async function readJson(url) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(String(response.status));
  return response.json();
}

async function loadLayouts() {
  let defaults;
  try {
    defaults = await readJson('assets/world/default-layout.json');
  } catch (error) {
    console.error('Cyclical City default world layout could not be read.', error);
    return;
  }
  if (!validLayout(defaults)) {
    console.error('Cyclical City default world layout is invalid.');
    return;
  }
  state.defaults = defaults.objects.map((object) => normalize(object));
  const defaultById = new Map(state.defaults.map((object) => [object.id, object]));
  let override = null;
  try {
    const candidate = await readJson('assets/world/layout.json');
    if (validLayout(candidate)) override = candidate;
  } catch {
    // A missing or unreadable override intentionally falls back without player-facing noise.
  }
  const overrideById = new Map();
  if (override) {
    for (const object of override.objects) {
      if (!defaultById.has(object.id)) {
        if (!state.warned.has(object.id)) {
          console.warn(`Cyclical City layout ignored unknown object id: ${object.id}`);
          state.warned.add(object.id);
        }
        continue;
      }
      const base = defaultById.get(object.id);
      overrideById.set(object.id, normalize({ ...base, ...object, props: { ...base.props, ...(object.props || {}) } }, true));
    }
    state.overridden = new Set(overrideById.keys());
    state.source = 'layout.json';
  }
  state.effective = state.defaults.map((base) => overrideById.get(base.id) || base);
  publishDiagnostics();
  scheduleApply();
}

function publishDiagnostics() {
  window.__cylindricWorldLayout = {
    format: FORMAT,
    version: FORMAT_VERSION,
    gameVersion: '0.9.45',
    source: state.source,
    objectCount: state.effective.length,
    appliedCount: state.targets.size,
    bounds: { x: WORLD_X_LIMIT, z: WORLD_Z_LIMIT },
  };
}

function resetForWorld(world) {
  if (!world?.scene || world.mode !== 'village') return false;
  if (state.scene !== world.scene) {
    state.scene = world.scene;
    state.targets = new Map();
    state.claimed = new WeakSet();
  }
  return true;
}

function closest(objects, record, maxDistance = 0.8) {
  const available = objects.filter((object) => object && !state.claimed.has(object));
  const match = available.sort((a, b) => distance(a, record) - distance(b, record))[0];
  return match && distance(match, record) <= maxDistance ? match : null;
}

function objectTransformTarget(objects, base) {
  const list = objects.filter(Boolean);
  if (!list.length) return null;
  list.forEach((object) => state.claimed.add(object));
  const initial = list.map((object) => ({
    object,
    x: object.position.x,
    y: object.position.y,
    z: object.position.z,
    rotationY: object.rotation.y,
    scale: object.scale.clone(),
    baseY: Number.isFinite(object.userData?.baseY) ? object.userData.baseY : null,
  }));
  return {
    apply(record) {
      const dx = record.x - base.x;
      const dy = record.y - base.y;
      const dz = record.z - base.z;
      const rotationDelta = radians(record.rotY - base.rotY);
      const scaleRatio = record.scale / base.scale;
      initial.forEach((entry) => {
        entry.object.position.set(entry.x + dx, entry.y + dy, entry.z + dz);
        entry.object.rotation.y = entry.rotationY + rotationDelta;
        entry.object.scale.copy(entry.scale).multiplyScalar(scaleRatio);
        if (entry.baseY != null) entry.object.userData.baseY = entry.baseY + dy;
        entry.object.updateMatrixWorld?.(true);
      });
    },
  };
}

function namedTarget(base, name = base.props.name) {
  const object = state.scene.getObjectByName(name);
  return object ? objectTransformTarget([object], base) : null;
}

function baseEnvironmentTarget(base) {
  const name = `snug-environment-${base.props.asset}`;
  const candidates = state.scene.children.filter((object) => object.name === name);
  const object = closest(candidates, base, 1.2);
  return object ? objectTransformTarget([object], base) : null;
}

function baseCottageTarget(base) {
  const candidates = state.scene.children.filter((object) => object.isGroup && !object.name && object.children.some((child) => child.isMesh && child.geometry?.type === 'BoxGeometry' && near(child.geometry?.parameters?.width || 0, 2.4, 0.05)));
  const object = closest(candidates, base, 0.25);
  return object ? objectTransformTarget([object], base) : null;
}

function expandedCottageTarget(base) {
  const group = state.scene.getObjectByName('SnugExpandedCountryside');
  const candidates = (group?.children || []).filter((object) => object.isGroup && object.getObjectByName?.('CottageBody'));
  const object = closest(candidates, base, 0.25);
  return object ? objectTransformTarget([object], base) : null;
}

function districtMarkerTarget(base) {
  const group = state.scene.getObjectByName('SnugExpandedCountryside');
  const candidates = (group?.children || []).filter((object) => object.isGroup && !object.name && object.children.length === 3 && object.children.some((child) => child.geometry?.type === 'BoxGeometry'));
  const object = closest(candidates, base, 0.25);
  return object ? objectTransformTarget([object], base) : null;
}

function gardenTarget(base) {
  const garden = state.scene.getObjectByName('CommunityGardenBeds');
  if (!garden) return null;
  if (base.props.source === 'garden-sign') {
    const sign = closest(garden.children.filter((object) => object.isGroup), base, 0.2);
    return sign ? objectTransformTarget([sign], base) : null;
  }
  const matches = garden.children.filter((object) => !state.claimed.has(object) && near(object.position.x, base.x, 0.06) && near(object.position.z, base.z, 0.06));
  return objectTransformTarget(matches, base);
}

function pondTarget(base) {
  const matches = [];
  state.scene.traverse((object) => {
    if (object.name === 'CountrysidePond' || /^CountrysidePondRipple_/.test(object.name)) matches.push(object);
    else if (object.isMesh && object.geometry?.type === 'CylinderGeometry') {
      const parameters = object.geometry.parameters || {};
      const position = object.getWorldPosition(scratchPosition);
      if (Math.max(parameters.radiusTop || 0, parameters.radiusBottom || 0) > 2 && parameters.height < 0.4 && near(position.x, base.x, 0.15) && near(position.z, base.z, 0.15)) matches.push(object);
    }
  });
  return objectTransformTarget(matches, base);
}

function baseNpcTarget(base) {
  const candidates = state.scene.children.filter((object) => object.isGroup && object !== window.__snugPlayerAvatar && object.userData?.coinHead && !object.userData?.npcId);
  const object = closest(candidates, base, 0.35);
  return object ? objectTransformTarget([object], base) : null;
}

function rosterNpcTarget(base) {
  let object = null;
  state.scene.getObjectByName('CylindricalCityNPCs')?.traverse((candidate) => {
    if (candidate.userData?.npcId === base.id.replace(/^npc-/, '')) object = candidate;
  });
  return object ? objectTransformTarget([object], base) : null;
}

function minigameAnchorTarget(base) {
  const candidates = state.scene.children.filter((object) => object.isMesh && object.geometry?.type === 'IcosahedronGeometry' && near(object.position.y, 0.62, 0.04));
  const object = closest(candidates, { ...base, x: base.x, z: base.z }, 0.25);
  return object ? objectTransformTarget([object], base) : null;
}

function instanceTarget(meshes, index, base, options = {}) {
  if (!meshes.length || meshes.some((mesh) => !mesh || index >= mesh.count)) return null;
  const initial = meshes.map((mesh) => {
    mesh.getMatrixAt(index, scratchMatrix);
    scratchMatrix.decompose(scratchPosition, scratchQuaternion, scratchScale);
    return {
      mesh,
      position: scratchPosition.clone(),
      quaternion: scratchQuaternion.clone(),
      scale: scratchScale.clone(),
    };
  });
  return {
    apply(record) {
      const scaleRatio = record.scale / base.scale;
      const yOffset = record.y - base.y;
      initial.forEach((entry) => {
        const position = entry.position.clone();
        position.x = record.x;
        position.z = record.z;
        position.y += yOffset;
        const quaternion = new THREE.Quaternion().setFromAxisAngle(yAxis, radians(record.rotY));
        const scale = entry.scale.clone().multiplyScalar(scaleRatio);
        scratchMatrix.compose(position, quaternion, scale);
        entry.mesh.setMatrixAt(index, scratchMatrix);
        entry.mesh.instanceMatrix.needsUpdate = true;
        entry.mesh.computeBoundingSphere?.();
      });
    },
  };
}

function expandedTreeTarget(base) {
  const group = state.scene.getObjectByName('SnugExpandedCountryside');
  const trunk = (group?.children || []).find((object) => object.isInstancedMesh && object.geometry?.type === 'CylinderGeometry' && object.count > 30);
  const crown = (group?.children || []).find((object) => object.isInstancedMesh && object.geometry?.type === 'IcosahedronGeometry' && object.count === trunk?.count);
  return instanceTarget([trunk, crown], base.props.instanceIndex, base);
}

function expandedFlowerTarget(base) {
  const group = state.scene.getObjectByName('SnugExpandedCountryside');
  const meshes = (group?.children || []).filter((object) => object.isInstancedMesh && object.geometry?.type === 'IcosahedronGeometry' && near(object.geometry?.parameters?.radius || 0, 0.1, 0.02));
  return instanceTarget([meshes[base.props.meshIndex]], base.props.instanceIndex, base);
}

function groundDetailTarget(base) {
  const group = state.scene.getObjectByName('CylindricalCityEnvironmentUpgrade');
  const mesh = base.props.source === 'ground-grass'
    ? group?.getObjectByName('PathEdgeGrassTufts')
    : group?.getObjectByName(`PathEdgeFlowerPatch_${base.props.meshIndex + 1}`);
  return instanceTarget([mesh], base.props.instanceIndex, base);
}

function lanternTarget(base) {
  const group = state.scene.getObjectByName('CylindricalCityEnvironmentUpgrade');
  const posts = group?.getObjectByName('CylindricalCityLanternPosts');
  const caps = group?.getObjectByName('CylindricalCityLanternPostCaps');
  const target = instanceTarget([posts, caps], base.props.instanceIndex, base);
  if (!target) return null;
  return {
    apply(record) {
      target.apply(record);
      window.__cylindricEnvironmentUpgrade?.setLanternPost?.(base.props.instanceIndex, record);
    },
  };
}

function stringLightTarget(base) {
  if (!window.__cylindricEnvironmentUpgrade?.setStringLightRun) return null;
  return { apply: (record) => window.__cylindricEnvironmentUpgrade.setStringLightRun(base.props.sectionIndex, record) };
}

function resolveTarget(base) {
  const source = base.props.source;
  if (source === 'base-cottage') return baseCottageTarget(base);
  if (source === 'expanded-cottage') return expandedCottageTarget(base);
  if (source === 'base-environment') return baseEnvironmentTarget(base);
  if (source === 'named-object') return namedTarget(base);
  if (source === 'pond-cluster') return pondTarget(base);
  if (source === 'district-marker') return districtMarkerTarget(base);
  if (source === 'garden-plot' || source === 'garden-sign') return gardenTarget(base);
  if (source === 'expanded-tree') return expandedTreeTarget(base);
  if (source === 'expanded-flower') return expandedFlowerTarget(base);
  if (source === 'ground-grass' || source === 'ground-flower') return groundDetailTarget(base);
  if (source === 'environment-lantern') return lanternTarget(base);
  if (source === 'string-light') return stringLightTarget(base);
  if (source === 'base-npc') return baseNpcTarget(base);
  if (source === 'roster-npc') return rosterNpcTarget(base);
  if (source === 'base-minigame-anchor') return minigameAnchorTarget(base);
  if (source === 'base-gate') return namedTarget(base, 'OpenTownGate');
  return null;
}

function applyLayout(world = window.__snugWorld) {
  if (!state.effective.length || !resetForWorld(world)) return;
  const defaults = new Map(state.defaults.map((object) => [object.id, object]));
  for (const record of state.effective) {
    if (!state.overridden.has(record.id)) continue;
    let target = state.targets.get(record.id);
    if (!target) {
      target = resolveTarget(defaults.get(record.id));
      if (target) state.targets.set(record.id, target);
    }
    target?.apply(record);
  }
  publishDiagnostics();
  window.dispatchEvent(new CustomEvent('cylindric-world-layout-applied', { detail: window.__cylindricWorldLayout }));
}

function scheduleApply(world = window.__snugWorld) {
  [0, 80, 250, 700, 1600, 3200].forEach((delay) => setTimeout(() => applyLayout(world || window.__snugWorld), delay));
}

function collisionRadius(record) {
  const radius = Number(record.props?.collisionRadius || 0);
  return Number.isFinite(radius) && radius > 0 ? radius * record.scale / (state.defaults.find((base) => base.id === record.id)?.scale || 1) : 0;
}

function isBlocked(x, z) {
  for (const object of state.effective) {
    const radius = collisionRadius(object);
    if (radius && Math.hypot(x - object.x, z - object.z) < radius + PLAYER_RADIUS) return true;
  }
  return false;
}

window.__cylindricResolveMovement = (oldX, oldZ, nextX, nextZ) => {
  if (!state.effective.length || isBlocked(oldX, oldZ) || !isBlocked(nextX, nextZ)) return { x: nextX, z: nextZ };
  if (!isBlocked(nextX, oldZ)) return { x: nextX, z: oldZ };
  if (!isBlocked(oldX, nextZ)) return { x: oldX, z: nextZ };
  return { x: oldX, z: oldZ };
};

window.__cylindricResolveTarget = (oldX, oldZ, targetX, targetZ) => {
  if (!state.effective.length || isBlocked(oldX, oldZ)) return { x: targetX, z: targetZ };
  const length = Math.hypot(targetX - oldX, targetZ - oldZ);
  const steps = Math.max(1, Math.ceil(length / 0.28));
  let safeX = oldX;
  let safeZ = oldZ;
  for (let step = 1; step <= steps; step += 1) {
    const t = step / steps;
    const x = oldX + (targetX - oldX) * t;
    const z = oldZ + (targetZ - oldZ) * t;
    if (isBlocked(x, z)) break;
    safeX = x;
    safeZ = z;
  }
  return { x: safeX, z: safeZ };
};

function invalidateSources(...sources) {
  const sourceSet = new Set(sources);
  state.defaults.forEach((record) => {
    if (sourceSet.has(record.props?.source)) state.targets.delete(record.id);
  });
}

window.addEventListener('snug-world-ready', (event) => scheduleApply(event.detail));
window.addEventListener('snug-world-expanded', () => {
  invalidateSources('expanded-cottage', 'named-object', 'pond-cluster', 'district-marker', 'garden-plot', 'garden-sign', 'expanded-tree', 'expanded-flower');
  scheduleApply();
});
window.addEventListener('snug-npc-roster-ready', () => {
  invalidateSources('roster-npc');
  scheduleApply();
});
window.addEventListener('cylindric-environment-ready', () => {
  invalidateSources('pond-cluster', 'environment-lantern', 'string-light', 'ground-grass', 'ground-flower');
  scheduleApply();
});
if (window.__snugWorld) scheduleApply(window.__snugWorld);
loadLayouts();
}).catch((error) => console.error('Cyclical City world layout could not start.', error));

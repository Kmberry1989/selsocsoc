import('./vendor/three/three.module.js').then((THREE) => {
const PATH_SEGMENTS = [
  { a: [0, -29.7], b: [0, 37], width: 2.15 },
  { a: [-36, 0], b: [36, 0], width: 2.15 },
  { a: [-7, 0], b: [-25, -16], width: 1.5 },
  { a: [7, 0], b: [24, -19], width: 1.5 },
  { a: [-7, 0], b: [-25, 19], width: 1.5 },
  { a: [7, 0], b: [24, 21], width: 1.5 },
  { a: [0, 7.5], b: [-11.25, 7.5], width: 1.35 },
  { a: [0, 4.8], b: [13.35, 4.8], width: 1.35 },
  { a: [0, 9], b: [2.8, 9], width: 1.15 },
];

const STRANDS = [
  { name: 'PlazaNorth', a: [-7.1, 4.55, -3.1], b: [7.1, 4.55, -3.1], bulbs: 14 },
  { name: 'PlazaSouth', a: [-7.1, 4.45, 3.1], b: [7.1, 4.45, 3.1], bulbs: 14 },
  { name: 'FestivalWest', a: [13, 4.5, 1], b: [13, 4.5, 9], bulbs: 10 },
  { name: 'FestivalEast', a: [21, 4.5, 1], b: [21, 4.5, 9], bulbs: 10 },
  { name: 'ShopRowNorth', a: [7.5, 4.15, -5.1], b: [17, 4.15, -5.1], bulbs: 11 },
  { name: 'ShopRowSouth', a: [7.5, 4.15, 1.15], b: [17, 4.15, 1.15], bulbs: 11 },
  { name: 'BridgeApproachNorth', a: [-10.2, 4.05, 4.3], b: [-16.8, 4.05, 4.3], bulbs: 9 },
  { name: 'BridgeApproachSouth', a: [-10.2, 4.05, 8.1], b: [-16.8, 4.05, 8.1], bulbs: 9 },
];

const POST_POSITIONS = [
  [-7.1, -3.1], [7.1, -3.1], [-7.1, 3.1], [7.1, 3.1],
  [13, 1], [13, 9], [21, 1], [21, 9], [7.5, -5.1], [17, -5.1],
  [7.5, 1.15], [17, 1.15], [-10.2, 4.3], [-16.8, 4.3], [-10.2, 8.1], [-16.8, 8.1],
];

const state = {
  world: null,
  group: null,
  raf: 0,
  reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches,
  roofNames: new Set(),
  diagnostics: { roofCorrections: 0, stringLightSections: 0, lanternPosts: 0, pondRipples: 0 },
};

const dummy = new THREE.Object3D();
const scratch = new THREE.Vector3();
const seeded = (seed) => {
  const value = Math.sin(seed * 91.731 + 17.13) * 43758.5453;
  return value - Math.floor(value);
};

function disposeTree(root) {
  if (!root) return;
  root.traverse((node) => {
    node.geometry?.dispose?.();
    if (Array.isArray(node.material)) node.material.forEach((material) => material.dispose?.());
    else node.material?.dispose?.();
  });
  root.parent?.remove(root);
}

function roofDimensions(mesh) {
  const parameters = mesh.geometry?.parameters || {};
  if (!/ConeGeometry|CylinderGeometry/.test(mesh.geometry?.type || '')) return null;
  const radius = Math.max(parameters.radius || 0, parameters.radiusTop || 0, parameters.radiusBottom || 0);
  const height = parameters.height || 0;
  const segments = parameters.radialSegments || 0;
  if (radius < 0.55 || height < 0.5 || segments < 4 || segments > 12 || mesh.position.y < 1.45) return null;
  return { radius, height: height * Math.abs(mesh.scale.y || 1) };
}

function supportDimensions(mesh) {
  const p = mesh.geometry?.parameters || {};
  if (mesh.geometry?.type === 'BoxGeometry') {
    const width = (p.width || 0) * Math.abs(mesh.scale.x || 1);
    const height = (p.height || 0) * Math.abs(mesh.scale.y || 1);
    const depth = (p.depth || 0) * Math.abs(mesh.scale.z || 1);
    if (width >= 1.2 && height >= 0.3 && depth >= 1.2) return { width, height, depth };
  }
  if (mesh.geometry?.type === 'CylinderGeometry') {
    const radius = Math.max(p.radiusTop || 0, p.radiusBottom || 0);
    const height = (p.height || 0) * Math.abs(mesh.scale.y || 1);
    if (radius >= 1.45 && height >= 0.15) return { width: radius * 2, height, depth: radius * 2 };
  }
  return null;
}

function centerBuildingRoofs(world) {
  if (!world?.scene) return;
  const corrected = [];
  world.scene.traverse((roof) => {
    const roofSize = roof.isMesh && roofDimensions(roof);
    const parentName = `${roof.parent?.name || ''} ${roof.name || ''}`;
    if (!roofSize || /avatar|npc|character|marker|tree/i.test(parentName)) return;
    const candidates = (roof.parent?.children || [])
      .filter((candidate) => candidate !== roof && candidate.isMesh)
      .map((candidate) => ({ candidate, size: supportDimensions(candidate) }))
      .filter(({ candidate, size }) => size && candidate.position.y <= roof.position.y)
      .map(({ candidate, size }) => {
        const supportTop = candidate.position.y + size.height / 2;
        const roofBottom = roof.position.y - roofSize.height / 2;
        const horizontal = Math.hypot(candidate.position.x - roof.position.x, candidate.position.z - roof.position.z);
        return { candidate, score: Math.abs(supportTop - roofBottom) * 4 + horizontal };
      })
      .sort((a, b) => a.score - b.score);
    const support = candidates[0]?.candidate;
    if (!support || candidates[0].score > 7) return;
    roof.position.x = support.position.x;
    roof.position.z = support.position.z;
    roof.name ||= `CenteredBuildingRoof_${state.roofNames.size + 1}`;
    roof.userData.centeredRoof = true;
    roof.userData.centeredOver = support.name || support.geometry.type;
    state.roofNames.add(roof.uuid);
    corrected.push(roof);
  });
  state.diagnostics.roofCorrections = state.roofNames.size;
  return corrected;
}

function catenaryPoint(a, b, t, sway = 0) {
  const x = THREE.MathUtils.lerp(a[0], b[0], t);
  const z = THREE.MathUtils.lerp(a[2], b[2], t);
  const y = THREE.MathUtils.lerp(a[1], b[1], t) - Math.sin(Math.PI * t) * 0.72 + sway;
  return new THREE.Vector3(x, y, z);
}

function buildStringLights(group) {
  const cableMaterial = new THREE.LineBasicMaterial({ color: 0x3e322c, transparent: true, opacity: 0.8 });
  const bulbMaterial = new THREE.MeshStandardMaterial({
    color: 0xffd796,
    emissive: 0xffa83d,
    emissiveIntensity: 0.15,
    roughness: 0.46,
    transparent: true,
    opacity: 0.82,
  });
  const bulbCount = STRANDS.reduce((total, strand) => total + strand.bulbs, 0);
  const bulbs = new THREE.InstancedMesh(new THREE.SphereGeometry(0.085, 7, 5), bulbMaterial, bulbCount);
  bulbs.name = 'CylindricalCityStringLightBulbs';
  bulbs.frustumCulled = false;
  let bulbIndex = 0;
  const strandData = [];
  STRANDS.forEach((strand, strandIndex) => {
    const points = Array.from({ length: 25 }, (_, index) => catenaryPoint(strand.a, strand.b, index / 24));
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), cableMaterial);
    line.name = `StringLights_${strand.name}`;
    line.userData.stringLightSection = strand.name;
    group.add(line);
    const indices = [];
    for (let index = 0; index < strand.bulbs; index += 1) {
      const t = (index + 0.5) / strand.bulbs;
      const position = catenaryPoint(strand.a, strand.b, t);
      dummy.position.copy(position);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(index % 3 === 1 ? 1.12 : 1);
      dummy.updateMatrix();
      bulbs.setMatrixAt(bulbIndex, dummy.matrix);
      indices.push({ index: bulbIndex, t, base: position.clone(), strandIndex });
      bulbIndex += 1;
    }
    const start = new THREE.Vector3(strand.a[0], strand.a[1], strand.a[2]);
    const end = new THREE.Vector3(strand.b[0], strand.b[1], strand.b[2]);
    strandData.push({ ...strand, a: start, b: end, line, indices, pathPoints: [start.clone(), end.clone()] });
  });
  bulbs.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  group.add(bulbs);

  const postMaterial = new THREE.MeshStandardMaterial({ color: 0x5d4539, roughness: 0.88 });
  const postCapsMaterial = new THREE.MeshStandardMaterial({ color: 0x9a704b, roughness: 0.72 });
  const posts = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.07, 0.1, 4.05, 7), postMaterial, POST_POSITIONS.length);
  const caps = new THREE.InstancedMesh(new THREE.CylinderGeometry(0.16, 0.11, 0.16, 8), postCapsMaterial, POST_POSITIONS.length);
  posts.name = 'CylindricalCityLanternPosts';
  caps.name = 'CylindricalCityLanternPostCaps';
  POST_POSITIONS.forEach(([x, z], index) => {
    dummy.position.set(x, 2.02, z);
    dummy.rotation.set(0, 0, 0);
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    posts.setMatrixAt(index, dummy.matrix);
    dummy.position.y = 4.08;
    dummy.updateMatrix();
    caps.setMatrixAt(index, dummy.matrix);
  });
  group.add(posts, caps);

  const lanternLocations = [[0, -3.1], [0, 3.1], [17, 1], [17, 9], [12.25, -5.1], [-13.5, 4.3]];
  const glowLights = lanternLocations.map(([x, z]) => {
    const light = new THREE.PointLight(0xffb75e, 0, 9, 2.1);
    light.position.set(x, 3.72, z);
    light.name = 'WarmLanternGlow';
    group.add(light);
    return light;
  });

  state.diagnostics.stringLightSections = STRANDS.length;
  state.diagnostics.lanternPosts = POST_POSITIONS.length;
  return {
    bulbs,
    bulbMaterial,
    cableMaterial,
    strandData,
    glowLights,
    posts,
    caps,
    postPositions: POST_POSITIONS.map(([x, z]) => ({ x, y: 0, z, rotY: 0, scale: 1 })),
  };
}

function buildGroundDetails(group) {
  const grass = new THREE.InstancedMesh(
    new THREE.ConeGeometry(0.045, 0.26, 3),
    new THREE.MeshStandardMaterial({ color: 0x4d8a51, roughness: 1 }),
    210
  );
  grass.name = 'PathEdgeGrassTufts';
  const flowerMaterials = [0xf3d067, 0xe87b80, 0xa78bc8].map((color) => new THREE.MeshStandardMaterial({ color, roughness: 0.86 }));
  const flowers = flowerMaterials.map((material, index) => {
    const mesh = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.085, 0), material, 32);
    mesh.name = `PathEdgeFlowerPatch_${index + 1}`;
    return mesh;
  });
  let grassIndex = 0;
  const flowerIndices = [0, 0, 0];
  PATH_SEGMENTS.forEach((segment, segmentIndex) => {
    const [ax, az] = segment.a;
    const [bx, bz] = segment.b;
    const dx = bx - ax;
    const dz = bz - az;
    const length = Math.hypot(dx, dz) || 1;
    const nx = -dz / length;
    const nz = dx / length;
    const count = Math.min(30, Math.max(8, Math.floor(length / 1.6)));
    for (let index = 0; index < count; index += 1) {
      const t = (index + 0.5) / count;
      [-1, 1].forEach((side) => {
        if (grassIndex >= grass.count) return;
        const jitter = (seeded(segmentIndex * 80 + index * 3.7 + side) - 0.5) * 0.28;
        const offset = segment.width / 2 + 0.44 + jitter;
        dummy.position.set(THREE.MathUtils.lerp(ax, bx, t) + nx * offset * side, 0.13, THREE.MathUtils.lerp(az, bz, t) + nz * offset * side);
        dummy.rotation.set(0, seeded(index * 7.7 + segmentIndex) * Math.PI, (seeded(index * 4.2) - 0.5) * 0.16);
        const scale = 0.72 + seeded(index * 11.3 + side * 4 + segmentIndex) * 0.62;
        dummy.scale.set(scale, scale, scale);
        dummy.updateMatrix();
        grass.setMatrixAt(grassIndex++, dummy.matrix);
      });
      if (index % 4 === segmentIndex % 3) {
        const colorIndex = (segmentIndex + index) % flowers.length;
        const flower = flowers[colorIndex];
        const flowerIndex = flowerIndices[colorIndex];
        if (flowerIndex < flower.count) {
          const side = index % 2 ? -1 : 1;
          const offset = segment.width / 2 + 0.65;
          dummy.position.set(THREE.MathUtils.lerp(ax, bx, t) + nx * offset * side, 0.16, THREE.MathUtils.lerp(az, bz, t) + nz * offset * side);
          dummy.rotation.set(0, seeded(index + segmentIndex * 9) * Math.PI, 0);
          dummy.scale.setScalar(0.85 + seeded(index * 2.2) * 0.45);
          dummy.updateMatrix();
          flower.setMatrixAt(flowerIndex, dummy.matrix);
          flowerIndices[colorIndex] += 1;
        }
      }
    }
  });
  grass.count = grassIndex;
  flowers.forEach((flower, index) => { flower.count = flowerIndices[index]; });
  group.add(grass, ...flowers);
  return { grass, flowers };
}

function makeButterflyGeometry() {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([
    0, 0, 0, -0.2, 0.04, 0.11, -0.16, 0.02, -0.12,
    0, 0, 0, 0.2, 0.04, 0.11, 0.16, 0.02, -0.12,
  ], 3));
  geometry.computeVertexNormals();
  return geometry;
}

function buildAmbientLife(group) {
  const butterflies = new THREE.InstancedMesh(
    makeButterflyGeometry(),
    new THREE.MeshStandardMaterial({ color: 0xf1bb4f, emissive: 0x8f4d1d, emissiveIntensity: 0.1, side: THREE.DoubleSide, roughness: 0.72 }),
    14
  );
  butterflies.name = 'DayButterflies';
  butterflies.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  const butterflyData = Array.from({ length: 14 }, (_, index) => ({
    center: new THREE.Vector3(index < 8 ? 6.5 : -18, 0.8 + seeded(index * 3) * 0.65, index < 8 ? 8.2 : 7.5),
    radius: 1.1 + seeded(index * 4.8) * 3.4,
    phase: seeded(index * 7.1) * Math.PI * 2,
    speed: 0.28 + seeded(index * 9.2) * 0.22,
  }));
  group.add(butterflies);

  const fireflyPositions = new Float32Array(42 * 3);
  const fireflyData = Array.from({ length: 42 }, (_, index) => ({
    centerX: index < 22 ? 6.5 : -18,
    centerZ: index < 22 ? 8.2 : 7.5,
    radius: 0.8 + seeded(index * 5.3) * 4.5,
    phase: seeded(index * 4.9) * Math.PI * 2,
    y: 0.45 + seeded(index * 2.6) * 1.5,
  }));
  const fireflyGeometry = new THREE.BufferGeometry();
  fireflyGeometry.setAttribute('position', new THREE.BufferAttribute(fireflyPositions, 3));
  const fireflies = new THREE.Points(fireflyGeometry, new THREE.PointsMaterial({ color: 0xffe47f, size: 0.105, transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending }));
  fireflies.name = 'NightFireflies';
  group.add(fireflies);

  const petalPositions = new Float32Array(28 * 3);
  const petalData = Array.from({ length: 28 }, (_, index) => ({
    radius: 0.7 + seeded(index * 8.7) * 3.5,
    phase: seeded(index * 6.2) * Math.PI * 2,
    height: 0.3 + seeded(index * 3.1) * 1.4,
  }));
  const petalGeometry = new THREE.BufferGeometry();
  petalGeometry.setAttribute('position', new THREE.BufferAttribute(petalPositions, 3));
  const petals = new THREE.Points(petalGeometry, new THREE.PointsMaterial({ color: 0xf7c5c6, size: 0.085, transparent: true, opacity: 0.74, depthWrite: false }));
  petals.name = 'GardenPetals';
  group.add(petals);
  return { butterflies, butterflyData, fireflies, fireflyData, petals, petalData };
}

function buildPondShimmer(group, world) {
  const pond = world.scene.getObjectByName('CountrysidePond');
  const center = pond?.getWorldPosition(scratch) || scratch.set(-18, 0.03, 7.5);
  if (pond?.material) {
    pond.material = pond.material.clone();
    pond.material.roughness = 0.2;
    pond.material.metalness = 0.08;
    pond.material.emissive = new THREE.Color(0x16424d);
    pond.material.emissiveIntensity = 0.12;
  }
  const rippleMaterial = new THREE.MeshBasicMaterial({ color: 0xc9f2ef, transparent: true, opacity: 0.22, side: THREE.DoubleSide, depthWrite: false });
  const ripples = Array.from({ length: 3 }, (_, index) => {
    const ripple = new THREE.Mesh(new THREE.RingGeometry(0.45, 0.5, 48), rippleMaterial.clone());
    ripple.name = `CountrysidePondRipple_${index + 1}`;
    ripple.position.set(center.x + (index - 1) * 0.65, center.y + 0.075 + index * 0.002, center.z + (index % 2 ? 0.32 : -0.24));
    ripple.rotation.x = -Math.PI / 2;
    ripple.scale.z = 0.58;
    ripple.userData.phase = index / 3;
    group.add(ripple);
    return ripple;
  });
  state.diagnostics.pondRipples = ripples.length;
  return { pond, ripples };
}

function strandPoint(points, t, sway = 0) {
  if (!Array.isArray(points) || points.length < 2) return new THREE.Vector3();
  const lengths = [];
  let total = 0;
  for (let index = 1; index < points.length; index += 1) {
    const length = points[index - 1].distanceTo(points[index]);
    lengths.push(length);
    total += length;
  }
  let remaining = Math.max(0, Math.min(1, t)) * (total || 1);
  let segmentIndex = 0;
  while (segmentIndex < lengths.length - 1 && remaining > lengths[segmentIndex]) {
    remaining -= lengths[segmentIndex];
    segmentIndex += 1;
  }
  const segmentLength = lengths[segmentIndex] || 1;
  const localT = Math.max(0, Math.min(1, remaining / segmentLength));
  const point = new THREE.Vector3().lerpVectors(points[segmentIndex], points[segmentIndex + 1], localT);
  point.y -= 0.52 * Math.sin(Math.PI * localT) + sway;
  return point;
}

function refreshLanternGlows() {
  const lights = state.effects?.lights;
  if (!lights) return;
  const pairs = [[0, 1], [2, 3], [4, 6], [5, 7], [8, 9], [12, 13]];
  pairs.forEach(([a, b], index) => {
    const first = lights.postPositions[a];
    const second = lights.postPositions[b];
    const glow = lights.glowLights[index];
    if (!first || !second || !glow) return;
    glow.position.set((first.x + second.x) / 2, 3.72 + (first.y + second.y) / 2, (first.z + second.z) / 2);
  });
}

function setLanternPost(index, record) {
  const lights = state.effects?.lights;
  if (!lights || !lights.posts || !lights.caps || index < 0 || index >= lights.posts.count) return;
  const scale = Number(record.scale) || 1;
  const rotation = -(Number(record.rotY) || 0) * Math.PI / 180;
  const groundY = Number(record.y) || 0;
  dummy.position.set(Number(record.x) || 0, groundY + 2.02 * scale, Number(record.z) || 0);
  dummy.rotation.set(0, rotation, 0);
  dummy.scale.set(scale, scale, scale);
  dummy.updateMatrix();
  lights.posts.setMatrixAt(index, dummy.matrix);
  dummy.position.y = groundY + 4.08 * scale;
  dummy.updateMatrix();
  lights.caps.setMatrixAt(index, dummy.matrix);
  lights.posts.instanceMatrix.needsUpdate = true;
  lights.caps.instanceMatrix.needsUpdate = true;
  lights.postPositions[index] = { x: Number(record.x) || 0, y: groundY, z: Number(record.z) || 0, rotY: Number(record.rotY) || 0, scale };
  refreshLanternGlows();
}

function setStringLightRun(index, record) {
  const lights = state.effects?.lights;
  const strand = lights?.strandData?.[index];
  if (!strand) return;
  const localPoints = Array.isArray(record.props?.points) && record.props.points.length >= 2
    ? record.props.points.filter((point) => Array.isArray(point) && Number.isFinite(Number(point[0])) && Number.isFinite(Number(point[1])))
    : [];
  if (localPoints.length < 2) return;
  const angle = -(Number(record.rotY) || 0) * Math.PI / 180;
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  const scale = Number(record.scale) || 1;
  const height = Number(record.props?.height) || strand.a.y;
  const points = localPoints.map(([localX, localZ]) => {
    const x = Number(localX) * scale;
    const z = Number(localZ) * scale;
    return new THREE.Vector3(
      (Number(record.x) || 0) + x * cosine + z * sine,
      (Number(record.y) || 0) + height * scale,
      (Number(record.z) || 0) - x * sine + z * cosine
    );
  });
  strand.pathPoints = points;
  strand.a.copy(points[0]);
  strand.b.copy(points[points.length - 1]);
  strand.line.geometry.dispose();
  strand.line.geometry = new THREE.BufferGeometry().setFromPoints(Array.from({ length: 33 }, (_, pointIndex) => strandPoint(points, pointIndex / 32)));
  strand.indices.forEach(({ index: bulbIndex, t }, localIndex) => {
    const position = strandPoint(points, t);
    dummy.position.copy(position);
    dummy.rotation.set(0, angle, 0);
    dummy.scale.setScalar((localIndex % 3 === 1 ? 1.12 : 1) * scale);
    dummy.updateMatrix();
    lights.bulbs.setMatrixAt(bulbIndex, dummy.matrix);
  });
  lights.bulbs.instanceMatrix.needsUpdate = true;
  lights.bulbs.computeBoundingSphere?.();
}

function currentPhase() {
  const now = Date.now();
  const dayFraction = (now % 7200000) / 7200000;
  const sun = Math.sin((dayFraction - 0.25) * Math.PI * 2);
  const weatherIndex = Math.floor(now / 28000) % 4;
  const season = Math.floor(now / 90000) % 4;
  const weather = weatherIndex === 1 ? (season === 3 ? 'Snow' : 'Rain') : weatherIndex === 3 ? 'Thunderstorm' : 'Clear';
  const badge = document.querySelector('.world-weather');
  return {
    isNight: badge?.classList.contains('night') ?? sun < -0.08,
    weather: badge?.classList.contains('storm') ? 'Thunderstorm' : (badge?.textContent.match(/Clear|Rain|Snow|Thunderstorm/)?.[0] || weather),
  };
}

function updateAnimation(time) {
  state.raf = requestAnimationFrame(updateAnimation);
  const effects = state.effects;
  if (!effects || !state.world || state.world.mode !== 'village' || !state.group?.parent) return;
  const phase = currentPhase();
  const clear = phase.weather === 'Clear';
  const seconds = time / 1000;
  const motion = state.reducedMotion ? 0 : 1;

  const nightGlow = phase.isNight ? 1 : 0;
  effects.lights.bulbMaterial.emissiveIntensity = 0.15 + nightGlow * 3.4;
  effects.lights.bulbMaterial.opacity = 0.78 + nightGlow * 0.22;
  effects.lights.cableMaterial.opacity = phase.isNight ? 0.95 : 0.68;
  effects.lights.glowLights.forEach((light, index) => {
    light.intensity = nightGlow * (clear ? 1.05 : 0.78) * (0.92 + Math.sin(seconds * 2.4 + index) * 0.08);
  });
  if (motion) {
    effects.lights.strandData.forEach((strand) => {
      strand.indices.forEach(({ index, t, strandIndex }) => {
        const sway = Math.sin(seconds * 0.72 + strandIndex * 0.8 + t * Math.PI) * 0.028 * Math.sin(Math.PI * t);
        const position = strandPoint(strand.pathPoints || [strand.a, strand.b], t, sway);
        dummy.position.copy(position);
        dummy.rotation.set(0, 0, sway * 1.8);
        dummy.scale.setScalar(index % 3 === 1 ? 1.12 : 1);
        dummy.updateMatrix();
        effects.lights.bulbs.setMatrixAt(index, dummy.matrix);
      });
    });
    effects.lights.bulbs.instanceMatrix.needsUpdate = true;
  }

  effects.life.butterflies.visible = !phase.isNight && clear;
  if (effects.life.butterflies.visible && motion) {
    effects.life.butterflyData.forEach((butterfly, index) => {
      const angle = seconds * butterfly.speed + butterfly.phase;
      dummy.position.set(
        butterfly.center.x + Math.cos(angle) * butterfly.radius,
        butterfly.center.y + Math.sin(seconds * 2.1 + butterfly.phase) * 0.22,
        butterfly.center.z + Math.sin(angle * 1.17) * butterfly.radius * 0.62
      );
      dummy.rotation.set(0.25 + Math.sin(seconds * 7 + butterfly.phase) * 0.24, -angle, Math.sin(seconds * 10 + butterfly.phase) * 0.42);
      dummy.scale.setScalar(0.8 + seeded(index) * 0.45);
      dummy.updateMatrix();
      effects.life.butterflies.setMatrixAt(index, dummy.matrix);
    });
    effects.life.butterflies.instanceMatrix.needsUpdate = true;
  }

  effects.life.fireflies.visible = phase.isNight && clear;
  effects.life.fireflies.material.opacity = effects.life.fireflies.visible ? 0.72 + Math.sin(seconds * 1.7) * 0.16 : 0;
  if (effects.life.fireflies.visible && motion) {
    const positions = effects.life.fireflies.geometry.attributes.position.array;
    effects.life.fireflyData.forEach((firefly, index) => {
      const angle = seconds * (0.16 + (index % 5) * 0.018) + firefly.phase;
      positions[index * 3] = firefly.centerX + Math.cos(angle) * firefly.radius;
      positions[index * 3 + 1] = firefly.y + Math.sin(seconds * 1.4 + firefly.phase) * 0.25;
      positions[index * 3 + 2] = firefly.centerZ + Math.sin(angle * 1.23) * firefly.radius;
    });
    effects.life.fireflies.geometry.attributes.position.needsUpdate = true;
  }

  effects.life.petals.visible = !phase.isNight && clear;
  if (effects.life.petals.visible && motion) {
    const positions = effects.life.petals.geometry.attributes.position.array;
    effects.life.petalData.forEach((petal, index) => {
      const angle = seconds * 0.14 + petal.phase;
      positions[index * 3] = 6.5 + Math.cos(angle) * petal.radius;
      positions[index * 3 + 1] = 0.24 + ((petal.height + seconds * 0.13 + index * 0.04) % 1.65);
      positions[index * 3 + 2] = 8.2 + Math.sin(angle * 1.31) * petal.radius;
    });
    effects.life.petals.geometry.attributes.position.needsUpdate = true;
  }

  effects.pond.ripples.forEach((ripple, index) => {
    const progress = state.reducedMotion ? 0.45 + index * 0.12 : (seconds * 0.16 + ripple.userData.phase) % 1;
    const scale = 0.72 + progress * 3.2;
    ripple.scale.set(scale, scale, scale * 0.58);
    ripple.material.opacity = clear ? (1 - progress) * (phase.isNight ? 0.16 : 0.28) : 0.04;
  });
  if (effects.pond.pond?.material) {
    effects.pond.pond.material.emissiveIntensity = phase.isNight ? 0.2 : 0.08 + Math.sin(seconds * 0.6) * 0.025 * motion;
  }
}

function buildUpgrade(world = window.__snugWorld) {
  if (!world?.scene || world.mode !== 'village') return;
  centerBuildingRoofs(world);
  if (state.world === world && state.group?.parent) return;
  disposeTree(state.group);
  state.world = world;
  const group = new THREE.Group();
  group.name = 'CylindricalCityEnvironmentUpgrade';
  const lights = buildStringLights(group);
  const ground = buildGroundDetails(group);
  const life = buildAmbientLife(group);
  const pond = buildPondShimmer(group, world);
  group.traverse((node) => { node.raycast = () => {}; });
  world.scene.add(group);
  state.group = group;
  state.effects = { lights, ground, life, pond };
  window.__cylindricEnvironmentUpgrade = {
    version: '0.9.45',
    diagnostics: state.diagnostics,
    group,
    centerBuildingRoofs: () => centerBuildingRoofs(world),
    setLanternPost,
    setStringLightRun,
  };
  window.dispatchEvent(new CustomEvent('cylindric-environment-ready', { detail: window.__cylindricEnvironmentUpgrade }));
  if (!state.raf) state.raf = requestAnimationFrame(updateAnimation);
}

function scheduleBuild(world) {
  requestAnimationFrame(() => {
    buildUpgrade(world || window.__snugWorld);
    requestAnimationFrame(() => {
      centerBuildingRoofs(world || window.__snugWorld);
      if (state.effects?.pond && !state.effects.pond.pond) state.effects.pond = buildPondShimmer(state.group, world || window.__snugWorld);
    });
  });
}

window.addEventListener('snug-world-ready', (event) => scheduleBuild(event.detail));
window.addEventListener('snug-world-expanded', () => scheduleBuild(window.__snugWorld));
window.addEventListener('snug-npc-roster-ready', () => centerBuildingRoofs(window.__snugWorld));
matchMedia('(prefers-reduced-motion: reduce)').addEventListener?.('change', (event) => { state.reducedMotion = event.matches; });
if (window.__snugWorld) scheduleBuild(window.__snugWorld);
}).catch((error) => console.error('Cyclical City environment upgrade could not start.', error));

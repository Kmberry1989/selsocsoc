import * as THREE from 'three';

const WORLD_RADIUS = 52;
const WALK_BOUNDS = { x: 36, z: 34 };
const PATH_SEGMENTS = [
  { a: [0, -29.7], b: [0, 37], width: 2.15, destination: 'town gate and town hall' },
  { a: [-36, 0], b: [36, 0], width: 2.15, destination: 'east and west shops' },
  { a: [-7, 0], b: [-25, -16], width: 1.5, destination: 'southwest cottages' },
  { a: [7, 0], b: [24, -19], width: 1.5, destination: 'southeast cottages' },
  { a: [-7, 0], b: [-25, 19], width: 1.5, destination: 'northwest cottages' },
  { a: [7, 0], b: [24, 21], width: 1.5, destination: 'northeast cottages' },
  { a: [0, 7.5], b: [-11.25, 7.5], width: 1.35, destination: 'pond bank' },
  { a: [0, 4.8], b: [13.35, 4.8], width: 1.35, destination: 'pavilion' },
  { a: [0, 9], b: [2.8, 9], width: 1.15, destination: 'community garden' },
];
const COTTAGES = [
  [-25, -17, 0xd99678, 0.72], [-29, -12, 0xe6bd68, 0.83], [-19, -23, 0x8eb8cd, 0.32],
  [24, -19, 0xb59fd0, -0.62], [29, -13, 0x91b977, -0.82], [19, -25, 0xd9a0ad, -0.36],
  [-25, 19, 0xb7a2d7, 2.38], [-18, 25, 0xe2bb70, 2.75], [-30, 13, 0x87b6ac, 2.16],
  [24, 21, 0xd78874, -2.42], [30, 15, 0x86aec8, -2.13], [18, 27, 0xd5aa70, -2.72],
];
let activeExpansion = null;

function seeded(seed) {
  const value = Math.sin(seed * 91.731 + 17.13) * 43758.5453;
  return value - Math.floor(value);
}

function mesh(geometry, material, x, y, z) {
  const object = new THREE.Mesh(geometry, material);
  object.position.set(x, y, z);
  object.castShadow = true;
  object.receiveShadow = true;
  return object;
}

function pointSegmentDistance(x, z, segment) {
  const [ax, az] = segment.a;
  const [bx, bz] = segment.b;
  const dx = bx - ax;
  const dz = bz - az;
  const lengthSq = dx * dx + dz * dz || 1;
  const t = Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / lengthSq));
  return Math.hypot(x - (ax + dx * t), z - (az + dz * t));
}

function isReserved(x, z, padding = 0) {
  if (PATH_SEGMENTS.some((segment) => pointSegmentDistance(x, z, segment) < segment.width / 2 + padding)) return true;
  if (Math.hypot(x + 18, (z - 7.5) / 0.58) < 6.2 + padding) return true;
  if (Math.hypot(x - 17, z - 5) < 4 + padding) return true;
  if (x > 2.7 - padding && x < 10.2 + padding && z > 5.5 - padding && z < 10.8 + padding) return true;
  if (Math.abs(x) < 4.2 + padding && z > -36.5 - padding && z < -29.5 + padding) return true;
  return COTTAGES.some(([cx, cz]) => Math.hypot(x - cx, z - cz) < 3.2 + padding);
}

function moveBasePondOffPath(world) {
  world.scene.traverse((object) => {
    if (!object?.isMesh || object.geometry?.type !== 'CylinderGeometry') return;
    const { radiusTop = 0, radiusBottom = 0, height = 0 } = object.geometry.parameters || {};
    const worldPosition = object.getWorldPosition(new THREE.Vector3());
    const isBasePondPiece = Math.abs(worldPosition.x) < 0.05
      && Math.abs(worldPosition.z + 6.1) < 0.05
      && radiusTop > 2
      && radiusBottom > 2
      && height < 0.4;
    if (isBasePondPiece) object.position.set(-18, object.position.y, 7.5);
  });
}

function addPathBetween(group, segment) {
  const [ax, az] = segment.a;
  const [bx, bz] = segment.b;
  const dx = bx - ax;
  const dz = bz - az;
  const length = Math.hypot(dx, dz);
  const path = mesh(
    new THREE.BoxGeometry(segment.width, 0.035, length),
    new THREE.MeshStandardMaterial({ color: 0xd8bd86, roughness: 1 }),
    (ax + bx) / 2, 0.035, (az + bz) / 2
  );
  path.rotation.y = Math.atan2(dx, dz);
  path.castShadow = false;
  path.name = `PathTo_${segment.destination.replace(/\s+/g, '_')}`;
  path.userData.destination = segment.destination;
  group.add(path);
}

function addCottage(group, x, z, color, rotation = 0) {
  const cottage = new THREE.Group();
  cottage.position.set(x, 0, z);
  cottage.rotation.y = rotation;
  const wall = new THREE.MeshStandardMaterial({ color, roughness: 0.9 });
  const trim = new THREE.MeshStandardMaterial({ color: 0x6f5146, roughness: 0.82 });
  const body = mesh(new THREE.BoxGeometry(2.8, 1.85, 2.45), wall, 0, 0.93, 0);
  const roof = mesh(new THREE.ConeGeometry(2.02, 1.15, 4), trim, 0, 2.43, 0);
  roof.rotation.y = Math.PI / 4;
  roof.scale.z = 0.76;
  const door = mesh(new THREE.BoxGeometry(0.62, 1.15, 0.09), new THREE.MeshStandardMaterial({ color: 0x42666c, roughness: 0.75 }), 0, 0.58, 1.27);
  const step = mesh(new THREE.BoxGeometry(1.25, 0.12, 0.5), new THREE.MeshStandardMaterial({ color: 0xb7a78b, roughness: 1 }), 0, 0.06, 1.45);
  cottage.add(body, roof, door, step);
  [-0.78, 0.78].forEach((windowX) => {
    const frame = mesh(new THREE.BoxGeometry(0.55, 0.62, 0.08), trim, windowX, 1.08, 1.26);
    const pane = mesh(new THREE.BoxGeometry(0.42, 0.49, 0.09), new THREE.MeshStandardMaterial({ color: 0x9ed0dd, roughness: 0.35 }), windowX, 1.08, 1.31);
    cottage.add(frame, pane);
  });
  group.add(cottage);
}

function addTownHall(group) {
  const hall = new THREE.Group();
  hall.name = 'NorthTownHall';
  hall.position.set(0, 0, -33);
  const wall = new THREE.MeshStandardMaterial({ color: 0xd9c49b, roughness: 0.9 });
  const trim = new THREE.MeshStandardMaterial({ color: 0x684e43, roughness: 0.84 });
  const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x78908a, roughness: 0.82 });
  const body = mesh(new THREE.BoxGeometry(6.2, 2.9, 4.7), wall, 0, 1.45, 0);
  const roof = mesh(new THREE.ConeGeometry(4.2, 1.55, 4), roofMaterial, 0, 3.75, 0);
  roof.rotation.y = Math.PI / 4;
  roof.scale.z = 0.78;
  const tower = mesh(new THREE.BoxGeometry(1.55, 1.7, 1.55), wall, 0, 4.35, 0.15);
  const towerRoof = mesh(new THREE.ConeGeometry(1.25, 1.25, 4), roofMaterial, 0, 5.65, 0.15);
  towerRoof.rotation.y = Math.PI / 4;
  const door = mesh(new THREE.BoxGeometry(1.12, 1.65, 0.12), trim, 0, 0.83, 2.39);
  const step = mesh(new THREE.BoxGeometry(2.15, 0.14, 0.72), new THREE.MeshStandardMaterial({ color: 0xb6a485, roughness: 1 }), 0, 0.07, 2.7);
  hall.add(body, roof, tower, towerRoof, door, step);
  [-2, -1, 1, 2].forEach((windowX) => {
    const frame = mesh(new THREE.BoxGeometry(0.72, 0.82, 0.1), trim, windowX, 1.58, 2.38);
    const pane = mesh(new THREE.BoxGeometry(0.56, 0.66, 0.11), new THREE.MeshStandardMaterial({ color: 0xa9d1d5, roughness: 0.35 }), windowX, 1.58, 2.44);
    hall.add(frame, pane);
  });
  group.add(hall);
}

function addDistrictMarker(group, x, z, color) {
  const marker = new THREE.Group();
  marker.position.set(x, 0, z);
  const poleMaterial = new THREE.MeshStandardMaterial({ color: 0x654a3c, roughness: 0.9 });
  const pole = mesh(new THREE.CylinderGeometry(0.07, 0.085, 1.8, 8), poleMaterial, 0, 0.9, 0);
  const board = mesh(new THREE.BoxGeometry(1.25, 0.48, 0.12), new THREE.MeshStandardMaterial({ color, roughness: 0.84 }), 0, 1.45, 0);
  const cap = mesh(new THREE.ConeGeometry(0.13, 0.24, 6), poleMaterial, 0, 1.94, 0);
  marker.add(pole, board, cap);
  group.add(marker);
}

function addGardenBeds(group) {
  const garden = new THREE.Group();
  garden.name = 'CommunityGardenBeds';
  const soil = new THREE.MeshStandardMaterial({ color: 0x76543b, roughness: 1 });
  const edging = new THREE.MeshStandardMaterial({ color: 0xb39361, roughness: 0.95 });
  [[4.1, 6.7], [6.55, 6.7], [9, 6.7], [4.1, 9.5], [6.55, 9.5], [9, 9.5]].forEach(([x, z], index) => {
    const bed = mesh(new THREE.BoxGeometry(1.75, 0.14, 1.7), edging, x, 0.07, z);
    const earth = mesh(new THREE.BoxGeometry(1.5, 0.17, 1.45), soil, x, 0.13, z);
    bed.name = `GardenPlot_${index + 1}`;
    garden.add(bed, earth);
  });
  const sign = new THREE.Group();
  sign.position.set(3.15, 0, 8.1);
  sign.add(mesh(new THREE.CylinderGeometry(0.045, 0.055, 1.1, 7), edging, 0, 0.55, 0));
  sign.add(mesh(new THREE.BoxGeometry(1.1, 0.4, 0.1), new THREE.MeshStandardMaterial({ color: 0x6f955e, roughness: 0.9 }), 0, 1, 0));
  garden.add(sign);
  group.add(garden);
}

function buildExpansion(world) {
  if (!world?.scene || world.mode !== 'village') return;
  if (activeExpansion?.parent) activeExpansion.parent.remove(activeExpansion);

  world.camera.far = 180;
  world.camera.updateProjectionMatrix();
  if (world.scene.fog) {
    world.scene.fog.near = 36;
    world.scene.fog.far = 112;
  }
  world.mapBounds = { ...WALK_BOUNDS, radius: WORLD_RADIUS };

  moveBasePondOffPath(world);

  const group = new THREE.Group();
  group.name = 'SnugExpandedCountryside';
  PATH_SEGMENTS.forEach((segment) => addPathBetween(group, segment));

  const treeTrunks = new THREE.InstancedMesh(
    new THREE.CylinderGeometry(0.18, 0.26, 1.7, 7),
    new THREE.MeshStandardMaterial({ color: 0x78513b, roughness: 0.94 }),
    72
  );
  const treeCrowns = new THREE.InstancedMesh(
    new THREE.IcosahedronGeometry(1.05, 1),
    new THREE.MeshStandardMaterial({ color: 0x4f8d58, roughness: 0.9 }),
    72
  );
  const dummy = new THREE.Object3D();
  let treeIndex = 0;
  for (let ring = 0; ring < 3; ring += 1) {
    const count = [18, 24, 30][ring];
    const baseRadius = [20, 29, 39][ring];
    for (let step = 0; step < count; step += 1) {
      const angle = step / count * Math.PI * 2 + seeded(step + ring * 80) * 0.18;
      const radius = baseRadius + (seeded(step * 3.2 + ring) - 0.5) * 4.4;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      if (isReserved(x, z, 1.2)) continue;
      const scale = 0.78 + seeded(step * 8.7 + ring * 4) * 0.68;
      dummy.position.set(x, 0.84 * scale, z);
      dummy.rotation.set(0, angle * 1.7, 0);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      treeTrunks.setMatrixAt(treeIndex, dummy.matrix);
      dummy.position.y = 2.05 * scale;
      dummy.scale.set(scale * (0.88 + seeded(step * 4.1) * 0.22), scale, scale * (0.88 + seeded(step * 5.2) * 0.22));
      dummy.updateMatrix();
      treeCrowns.setMatrixAt(treeIndex, dummy.matrix);
      treeIndex += 1;
    }
  }
  treeTrunks.count = treeCrowns.count = treeIndex;
  treeTrunks.castShadow = treeCrowns.castShadow = true;
  treeTrunks.receiveShadow = treeCrowns.receiveShadow = true;
  group.add(treeTrunks, treeCrowns);

  const flowerColors = [0xf3d067, 0xeb7c7a, 0xb7a2d8, 0xf2f0df];
  flowerColors.forEach((color, colorIndex) => {
    const flowers = new THREE.InstancedMesh(
      new THREE.IcosahedronGeometry(0.1, 0),
      new THREE.MeshStandardMaterial({ color, roughness: 0.82 }),
      28
    );
    let flowerIndex = 0;
    for (let i = 0; i < 28; i += 1) {
      const angle = seeded(i * 3.6 + colorIndex * 40) * Math.PI * 2;
      const radius = 12 + seeded(i * 9.2 + colorIndex) * 24;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      if (isReserved(x, z, 0.35)) continue;
      dummy.position.set(x, 0.12, z);
      dummy.rotation.set(0, angle, 0);
      const scale = 0.75 + seeded(i * 5.7 + colorIndex) * 0.65;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      flowers.setMatrixAt(flowerIndex, dummy.matrix);
      flowerIndex += 1;
    }
    flowers.count = flowerIndex;
    flowers.castShadow = true;
    group.add(flowers);
  });

  COTTAGES.forEach((definition) => addCottage(group, ...definition));
  addTownHall(group);
  addDistrictMarker(group, -13, -10, 0xd9826c);
  addDistrictMarker(group, 14, -9, 0xe1ba63);
  addDistrictMarker(group, -14, 12, 0x78aeb7);
  addDistrictMarker(group, 14, 13, 0xa78bc2);

  const pond = mesh(
    new THREE.CylinderGeometry(5.2, 5.6, 0.12, 48),
    new THREE.MeshStandardMaterial({ color: 0x70afc3, roughness: 0.28, metalness: 0.06 }),
    -18, 0.02, 7.5
  );
  pond.scale.z = 0.58;
  pond.name = 'CountrysidePond';
  group.add(pond);

  const pavilion = new THREE.Group();
  pavilion.position.set(17, 0, 5);
  pavilion.name = 'TownPavilion';
  const platform = mesh(new THREE.CylinderGeometry(3.1, 3.35, 0.35, 10), new THREE.MeshStandardMaterial({ color: 0xd4bd8c, roughness: 0.95 }), 0, 0.1, 0);
  const roof = mesh(new THREE.ConeGeometry(3.4, 1.2, 8), new THREE.MeshStandardMaterial({ color: 0xb96050, roughness: 0.8 }), 0, 3.2, 0);
  pavilion.add(platform, roof);
  for (let i = 0; i < 8; i += 1) {
    const angle = i / 8 * Math.PI * 2;
    pavilion.add(mesh(new THREE.CylinderGeometry(0.09, 0.11, 2.8, 7), new THREE.MeshStandardMaterial({ color: 0x775540, roughness: 0.9 }), Math.cos(angle) * 2.55, 1.55, Math.sin(angle) * 2.55));
  }
  group.add(pavilion);
  addGardenBeds(group);

  world.scene.add(group);
  activeExpansion = group;
  // The base village creates its original pond just after the world-ready event.
  // Re-check on the next two frames so both water meshes are relocated before they can block the main walk.
  requestAnimationFrame(() => {
    moveBasePondOffPath(world);
    requestAnimationFrame(() => moveBasePondOffPath(world));
  });
  window.dispatchEvent(new CustomEvent('snug-world-expanded', { detail: { radius: WORLD_RADIUS, bounds: WALK_BOUNDS, group, paths: PATH_SEGMENTS } }));
}

window.addEventListener('snug-world-ready', (event) => buildExpansion(event.detail));
if (window.__snugWorld) buildExpansion(window.__snugWorld);

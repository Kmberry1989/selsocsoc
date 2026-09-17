import * as THREE from 'three';

const WORLD_RADIUS = 52;
const WALK_BOUNDS = { x: 36, z: 34 };
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

function addPath(group, x, z, width, length, rotation = 0) {
  const path = mesh(
    new THREE.BoxGeometry(width, 0.035, length),
    new THREE.MeshStandardMaterial({ color: 0xd8bd86, roughness: 1 }),
    x, 0.035, z
  );
  path.rotation.y = rotation;
  path.castShadow = false;
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

  const group = new THREE.Group();
  group.name = 'SnugExpandedCountryside';

  addPath(group, 0, 3, 2.15, 68);
  addPath(group, 0, 0, 2.15, 72, Math.PI / 2);
  addPath(group, -19, -16, 1.5, 25, -0.72);
  addPath(group, 20, -14, 1.5, 23, 0.78);
  addPath(group, -21, 16, 1.5, 24, 0.72);
  addPath(group, 21, 17, 1.5, 23, -0.77);

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
    for (let i = 0; i < 28; i += 1) {
      const angle = seeded(i * 3.6 + colorIndex * 40) * Math.PI * 2;
      const radius = 12 + seeded(i * 9.2 + colorIndex) * 24;
      dummy.position.set(Math.cos(angle) * radius, 0.12, Math.sin(angle) * radius);
      dummy.rotation.set(0, angle, 0);
      const scale = 0.75 + seeded(i * 5.7 + colorIndex) * 0.65;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      flowers.setMatrixAt(i, dummy.matrix);
    }
    flowers.castShadow = true;
    group.add(flowers);
  });

  const cottages = [
    [-25, -17, 0xd99678, 0.72], [-29, -12, 0xe6bd68, 0.83], [-19, -23, 0x8eb8cd, 0.32],
    [24, -19, 0xb59fd0, -0.62], [29, -13, 0x91b977, -0.82], [19, -25, 0xd9a0ad, -0.36],
    [-25, 19, 0xb7a2d7, 2.38], [-18, 25, 0xe2bb70, 2.75], [-30, 13, 0x87b6ac, 2.16],
    [24, 21, 0xd78874, -2.42], [30, 15, 0x86aec8, -2.13], [18, 27, 0xd5aa70, -2.72]
  ];
  cottages.forEach((definition) => addCottage(group, ...definition));

  addDistrictMarker(group, -13, -10, 0xd9826c);
  addDistrictMarker(group, 14, -9, 0xe1ba63);
  addDistrictMarker(group, -14, 12, 0x78aeb7);
  addDistrictMarker(group, 14, 13, 0xa78bc2);

  const pond = mesh(
    new THREE.CylinderGeometry(5.2, 5.6, 0.12, 48),
    new THREE.MeshStandardMaterial({ color: 0x70afc3, roughness: 0.28, metalness: 0.06 }),
    -17, 0.02, 4
  );
  pond.scale.z = 0.58;
  group.add(pond);

  const pavilion = new THREE.Group();
  pavilion.position.set(17, 0, 5);
  const platform = mesh(new THREE.CylinderGeometry(3.1, 3.35, 0.35, 10), new THREE.MeshStandardMaterial({ color: 0xd4bd8c, roughness: 0.95 }), 0, 0.1, 0);
  const roof = mesh(new THREE.ConeGeometry(3.4, 1.2, 8), new THREE.MeshStandardMaterial({ color: 0xb96050, roughness: 0.8 }), 0, 3.2, 0);
  pavilion.add(platform, roof);
  for (let i = 0; i < 8; i += 1) {
    const angle = i / 8 * Math.PI * 2;
    pavilion.add(mesh(new THREE.CylinderGeometry(0.09, 0.11, 2.8, 7), new THREE.MeshStandardMaterial({ color: 0x775540, roughness: 0.9 }), Math.cos(angle) * 2.55, 1.55, Math.sin(angle) * 2.55));
  }
  group.add(pavilion);

  world.scene.add(group);
  activeExpansion = group;
  window.dispatchEvent(new CustomEvent('snug-world-expanded', { detail: { radius: WORLD_RADIUS, bounds: WALK_BOUNDS, group } }));
}

window.addEventListener('snug-world-ready', (event) => buildExpansion(event.detail));
if (window.__snugWorld) buildExpansion(window.__snugWorld);

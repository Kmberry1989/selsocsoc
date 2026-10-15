/* Headless test: mayor + gideon join the NPC identity pass.
 * Mocks window/THREE/DOM enough for npc-faces.js, npc-outfits.js and
 * npc-accessories.js, fires snug-npc-roster-ready, and asserts:
 *  - 13/13 face swaps applied
 *  - 13/13 outfit textures applied
 *  - 10/10 accessories built (mayor gavel, gideon pennant + the 8 existing)
 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const ROSTER = [
  ['mayor-mayor', 'MM'], ['gideon', 'GD'], ['lyla-lens', 'LL'], ['chip-chance', 'CC'],
  ['barnaby-bargain', 'BB'], ['pip-parade', 'PP'], ['agnes-alley', 'AA'], ['dottie-daly', 'DD'],
  ['peggy-plank', 'PG'], ['mr-buck-coinsworth', 'BC'], ['fern-bramble', 'FB'],
  ['stanley-stamp', 'SS'], ['bobby-gill', 'BG'],
];

// ---- mocks ----
const loadedImages = [];
class FakeImage {
  set src(v) { loadedImages.push(v); setTimeout(() => this.onload && this.onload(), 0); }
}
class FakeTexture {
  constructor(img) { this.image = img; this.needsUpdate = false; }
}
function fakeMesh() {
  return {
    material: { map: null, needsUpdate: false, color: { set() {} }, dispose() {} },
    geometry: {},
    name: '',
    position: { set() {}, copy() {} },
    rotation: { set() {}, copy() {}, x: 0, y: 0, z: 0 },
    scale: { set() {}, copy() {}, multiplyScalar() { return this; } },
    castShadow: false, receiveShadow: false,
  };
}
function fakeGroup() {
  const kids = [];
  return {
    children: kids,
    name: '',
    position: { set() {}, copy() {} },
    rotation: { set() {}, copy() {}, x: 0, y: 0, z: 0 },
    scale: { set() {}, copy() {}, multiplyScalar() { return this; } },
    add(...m) { kids.push(...m); return this; },
    getObjectByName(n) { return kids.find((k) => k.name === n) || null; },
  };
}
const THREE = {
  SRGBColorSpace: 'srgb',
  Texture: FakeTexture,
  MeshStandardMaterial: function () { return {}; },
  Mesh: function () { const m = fakeMesh(); const g = fakeGroup(); Object.assign(m, g); return m; },
  Group: fakeGroup,
  CylinderGeometry: function () { return {}; },
  TorusGeometry: function () { return {}; },
  SphereGeometry: function () { return {}; },
  BoxGeometry: function () { return {}; },
  ConeGeometry: function () { return {}; },
  Shape: function () { return { moveTo() {}, lineTo() {} }; },
  ShapeGeometry: function () { return {}; },
};

function makeNpc(id, mark) {
  const face = fakeMesh(); face.name = `PrimitiveFace_${mark}`;
  const outfit = fakeMesh(); outfit.name = `PrimitiveOutfit_${mark}`;
  const slot = fakeGroup(); slot.name = `HeldItemSlot_${mark}`;
  return {
    userData: { npcId: id },
    getObjectByName(n) {
      if (n === `PrimitiveFace_${mark}`) return face;
      if (n === `PrimitiveOutfit_${mark}`) return outfit;
      if (n === `HeldItemSlot_${mark}`) return slot;
      return null;
    },
    __face: face, __outfit: outfit, __slot: slot,
  };
}

const listeners = {};
const sandbox = {
  console,
  setTimeout, clearTimeout,
  window: null,
  document: { createElement: () => ({}), querySelector: () => null },
  Image: FakeImage,
};
// window === global proxy for these scripts
sandbox.window = new Proxy(sandbox, {
  get(t, k) {
    if (k === '__snugThree') return THREE;
    if (k === '__snugPaintedOutfitAtlas') return { geometry: () => ({}) };
    return t[k];
  },
  set(t, k, v) { t[k] = v; return true; },
});
sandbox.window.addEventListener = (type, fn) => { (listeners[type] = listeners[type] || []).push(fn); };
sandbox.window.dispatchEvent = (ev) => { (listeners[ev.type] || []).forEach((fn) => fn(ev)); return true; };
sandbox.globalThis = sandbox.window;
vm.createContext(sandbox);

for (const f of ['assets/npc-faces.js', 'assets/npc-outfits.js', 'assets/npc-accessories.js']) {
  vm.runInContext(fs.readFileSync(path.join('/home/hatch/workspace/selsocsoc', f), 'utf8'), sandbox, { filename: f });
}

const npcs = ROSTER.map(([id, mark]) => makeNpc(id, mark));
const group = { children: npcs };
sandbox.window.dispatchEvent({ type: 'snug-npc-roster-ready', detail: { group } });

setTimeout(() => {
  let fails = 0;
  const ok = (cond, label) => { console.log(cond ? 'PASS' : 'FAIL', '-', label); if (!cond) fails++; };

  // faces: every NPC's PrimitiveFace mesh got a texture from the right URL
  for (const [id, mark] of ROSTER) {
    const npc = npcs.find((n) => n.userData.npcId === id);
    ok(npc.__face.material.map instanceof FakeTexture, `face swap ${id}`);
  }
  const faceUrls = loadedImages.filter((u) => u.includes('npc-faces'));
  ok(faceUrls.length === 13, `13 face PNGs requested (got ${faceUrls.length})`);
  ok(faceUrls.includes('assets/npc-faces/npc-mayor-mayor-face.png'), 'mayor face URL requested');
  ok(faceUrls.includes('assets/npc-faces/npc-gideon-face.png'), 'gideon face URL requested');

  // outfits
  for (const [id] of ROSTER) {
    const npc = npcs.find((n) => n.userData.npcId === id);
    ok(npc.__outfit.material.map instanceof FakeTexture, `outfit applied ${id}`);
  }
  const outfitUrls = loadedImages.filter((u) => u.includes('npc-outfits'));
  ok(outfitUrls.length === 13, `13 outfit PNGs requested (got ${outfitUrls.length})`);

  // accessories: 10 builders (mayor, gideon + 8)
  const accMarks = { 'mayor-mayor': 'MM', 'gideon': 'GD', 'barnaby-bargain': 'BB', 'pip-parade': 'PP', 'agnes-alley': 'AA', 'dottie-daly': 'DD', 'mr-buck-coinsworth': 'BC', 'fern-bramble': 'FB', 'stanley-stamp': 'SS', 'bobby-gill': 'BG' };
  for (const [id, mark] of Object.entries(accMarks)) {
    const npc = npcs.find((n) => n.userData.npcId === id);
    const prop = npc.__slot.getObjectByName(`NPCAccessory_${mark}`);
    ok(!!prop, `accessory built ${id} (${prop ? prop.children.length + ' parts' : 'missing'})`);
  }

  // image files actually exist on disk
  for (const u of [...faceUrls, ...outfitUrls]) {
    ok(fs.existsSync(path.join('/home/hatch/workspace/selsocsoc', u)), `file exists ${u}`);
  }

  console.log(fails === 0 ? '\nALL TESTS PASSED' : `\n${fails} FAILURES`);
  process.exit(fails === 0 ? 0 : 1);
}, 300);

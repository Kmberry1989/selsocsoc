import { Box3, Vector3 } from './vendor/three/three.module.js';
import { DRACOLoader } from './vendor/three/DRACOLoader.js';

const CATEGORY_FOLDERS = {
  hairstyles: 'hairstyles',
  headAccessories: 'head-accessories',
  outfits: 'outfits',
  handAccessories: 'hand-accessories',
  shoes: 'shoes'
};

const ENVIRONMENT_FOLDERS = {
  buildings: 'buildings',
  trees: 'trees',
  props: 'props'
};

const EMPTY_OPTIONS = {
  hairstyles: { id: '', name: 'None', path: '' },
  headAccessories: { id: '', name: 'None', path: '' },
  outfits: { id: '', name: 'Built-in', path: '' },
  handAccessories: { id: '', name: 'None', path: '' },
  shoes: { id: '', name: 'Built-in', path: '' }
};

function displayName(filename) {
  return filename
    .replace(/\.glb$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase());
}

function normalizeItem(item, folder, base = 'cosmetics') {
  const filename = String(item?.path || item?.name || '').split('/').pop();
  if (!filename || !/\.glb$/i.test(filename)) return null;
  const id = filename.replace(/\.glb$/i, '');
  return {
    id,
    name: displayName(filename),
    path: item.path || `assets/${base}/${folder}/${filename}`
  };
}

function normalizeCatalog(source = {}) {
  return Object.fromEntries(Object.entries(CATEGORY_FOLDERS).map(([category, folder]) => {
    const seen = new Set();
    const entries = (Array.isArray(source[category]) ? source[category] : [])
      .map((item) => normalizeItem(item, folder))
      .filter((item) => item && !seen.has(item.id) && seen.add(item.id))
      .sort((a, b) => a.name.localeCompare(b.name));
    return [category, [EMPTY_OPTIONS[category], ...entries]];
  }));
}

async function loadManifest() {
  try {
    const response = await fetch('assets/cosmetics/manifest.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`manifest ${response.status}`);
    return normalizeCatalog(await response.json());
  } catch {
    return normalizeCatalog();
  }
}

function normalizeEnvironment(source = {}) {
  return Object.fromEntries(Object.entries(ENVIRONMENT_FOLDERS).map(([category, folder]) => {
    const seen = new Set();
    const entries = (Array.isArray(source[category]) ? source[category] : [])
      .map((item) => normalizeItem(item, folder, 'environment-props'))
      .filter((item) => item && !seen.has(item.id) && seen.add(item.id))
      .map((item) => ({ ...item, category }))
      .sort((a, b) => a.name.localeCompare(b.name));
    return [category, entries];
  }));
}

async function loadEnvironmentManifest() {
  try {
    const response = await fetch('assets/environment-props/manifest.json', { cache: 'no-store' });
    if (!response.ok) throw new Error(`manifest ${response.status}`);
    return normalizeEnvironment(await response.json());
  } catch {
    return normalizeEnvironment();
  }
}

const COSMETIC_TEMPLATE_BOUNDS = {
  hairstyles: new Vector3(0.92, 0.55, 0.34),
  headAccessories: new Vector3(1.00, 0.70, 0.46),
  outfits: new Vector3(0.78, 1.10, 0.54),
  handAccessories: new Vector3(0.26, 0.08, 0.26),
  shoes: new Vector3(0.28, 0.16, 0.42)
};

function assetCategory(path = '') {
  const normalized = String(path).replace(/\\/g, '/').toLowerCase();
  const cosmetic = Object.entries(CATEGORY_FOLDERS)
    .find(([, folder]) => normalized.includes(`/cosmetics/${folder}/`));
  if (cosmetic) return { kind: 'cosmetic', category: cosmetic[0] };

  const environment = Object.entries(ENVIRONMENT_FOLDERS)
    .find(([, folder]) => normalized.includes(`/environment-props/${folder}/`));
  return environment ? { kind: 'environment', category: environment[0] } : null;
}

function proportionScore(size, template) {
  const sizeScale = Math.cbrt(size.x * size.y * size.z);
  const templateScale = Math.cbrt(template.x * template.y * template.z);
  if (!Number.isFinite(sizeScale) || sizeScale <= 1e-6) return Number.POSITIVE_INFINITY;
  return ['x', 'y', 'z'].reduce((score, axis) => {
    const actual = size[axis] / sizeScale;
    const expected = template[axis] / templateScale;
    return score + Math.abs(Math.log(Math.max(actual, 1e-6) / expected));
  }, 0);
}

function shouldCorrectZUp(size, type) {
  if (type?.kind === 'cosmetic') {
    const template = COSMETIC_TEMPLATE_BOUNDS[type.category];
    if (!template) return false;
    const yUpScore = proportionScore(size, template);
    const zUpScore = proportionScore(new Vector3(size.x, size.z, size.y), template);
    return zUpScore + 0.22 < yUpScore;
  }

  // World assets vary too much for a single template. A clear Z-versus-Y height
  // mismatch is still safe to correct; near-square props are left untouched.
  if (type?.kind === 'environment') return size.z > size.y * 1.22;
  return false;
}

function orientAsset(scene, path) {
  const type = assetCategory(path);
  if (!scene || !type) return false;

  scene.updateMatrixWorld(true);
  const size = new Box3().setFromObject(scene).getSize(new Vector3());

  // Only rotate when the geometry makes the mismatch clear. Ordinary glTF
  // Y-up exports stay untouched; Blender-authored Z-up cosmetics and world
  // models can be dropped into their folders without manual reorientation.
  if (shouldCorrectZUp(size, type)) {
    scene.rotation.x -= Math.PI / 2;
    scene.userData.snugOrientationCorrection = 'z-up-to-y-up';
    scene.updateMatrixWorld(true);
    return true;
  }

  scene.userData.snugOrientationCorrection = 'none';
  return false;
}

export async function loadSnugAssetPipeline() {
  // The Vercel build regenerates these same-origin manifests from the asset
  // folders. Runtime repository discovery is intentionally avoided.
  const [catalog, environment] = await Promise.all([loadManifest(), loadEnvironmentManifest()]);

  const draco = new DRACOLoader();
  draco.setDecoderPath('assets/vendor/draco/');

  return { catalog, environment, draco, orientAsset, orientCosmetic: orientAsset };
}

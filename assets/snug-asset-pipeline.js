import { Box3, Vector3 } from './vendor/three/three.module.js';
import { DRACOLoader } from './vendor/three/DRACOLoader.js';
import { GLTFLoader } from './vendor/three/GLTFLoader.js';

const CATEGORY_FOLDERS = {
  hairstyles: 'hairstyles',
  headAccessories: 'head-accessories',
  outfits: 'outfits',
  handAccessories: 'hand-accessories',
  shoes: 'shoes',
  faceWear: 'face-wear',
  facialHair: 'facial-hair',
  heldItems: 'held-items',
  backItems: 'back-items',
  neckwear: 'neckwear'
};

const ENVIRONMENT_FOLDERS = {
  buildings: 'buildings',
  trees: 'trees',
  props: 'props'
};

const EMPTY_OPTIONS = {
  hairstyles: { id: '', name: 'None', path: '', fitPending: false },
  headAccessories: { id: '', name: 'None', path: '', fitPending: false },
  outfits: { id: '', name: 'Built-in', path: '', fitPending: false },
  handAccessories: { id: '', name: 'None', path: '', fitPending: false },
  shoes: { id: '', name: 'Built-in', path: '', fitPending: false },
  faceWear: { id: '', name: 'None', path: '', fitPending: false },
  facialHair: { id: '', name: 'None', path: '', fitPending: false },
  heldItems: { id: '', name: 'Empty hand', path: '', fitPending: false },
  backItems: { id: '', name: 'None', path: '', fitPending: false },
  neckwear: { id: '', name: 'None', path: '', fitPending: false }
};

function displayName(filename) {
  return filename
    .replace(/\.glb$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase());
}

function normalizeFit(fit = {}) {
  return {
    approved: fit.approved === true,
    scale: Number.isFinite(Number(fit.scale)) ? Number(fit.scale) : 1,
    x: Number.isFinite(Number(fit.x)) ? Number(fit.x) : 0,
    y: Number.isFinite(Number(fit.y)) ? Number(fit.y) : 0,
    z: Number.isFinite(Number(fit.z)) ? Number(fit.z) : 0,
    rx: Number.isFinite(Number(fit.rx)) ? Number(fit.rx) : 0,
    ry: Number.isFinite(Number(fit.ry)) ? Number(fit.ry) : 0,
    rz: Number.isFinite(Number(fit.rz)) ? Number(fit.rz) : 0
  };
}

function normalizeItem(item, folder, base = 'cosmetics', reviews = {}) {
  const filename = String(item?.path || item?.name || '').split('/').pop();
  if (!filename || !/\.glb$/i.test(filename)) return null;
  const id = filename.replace(/\.glb$/i, '');
  const path = item.path || `assets/${base}/${folder}/${filename}`;
  const fitReview = normalizeFit(reviews[path] || item.fitReview || {});
  return {
    id,
    name: displayName(filename),
    path,
    fitReview,
    fitPending: base === 'cosmetics' && !fitReview.approved
  };
}

function normalizeCatalog(source = {}, reviews = {}) {
  return Object.fromEntries(Object.entries(CATEGORY_FOLDERS).map(([category, folder]) => {
    const seen = new Set();
    const entries = (Array.isArray(source[category]) ? source[category] : [])
      .map((item) => normalizeItem(item, folder, 'cosmetics', reviews))
      .filter((item) => item && !seen.has(item.id) && seen.add(item.id))
      .sort((a, b) => a.name.localeCompare(b.name));
    return [category, [EMPTY_OPTIONS[category], ...entries]];
  }));
}

async function loadJSON(path, fallback = {}) {
  try {
    const response = await fetch(path, { cache: 'no-store' });
    if (!response.ok) throw new Error(`${path} ${response.status}`);
    return await response.json();
  } catch {
    return fallback;
  }
}

async function loadManifest() {
  // Fit approvals are embedded into the generated catalogue. Keeping them in
  // the manifest means a missing optional fit-reviews.json never causes a
  // browser request or a visible 404; an absent approvals file is simply {}.
  const source = await loadJSON('assets/cosmetics/manifest.json', { fitReviews: {} });
  const reviews = source?.fitReviews && !Array.isArray(source.fitReviews) && typeof source.fitReviews === 'object'
    ? source.fitReviews
    : {};
  return normalizeCatalog(source, reviews);
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
  return normalizeEnvironment(await loadJSON('assets/environment-props/manifest.json'));
}

async function loadMinigameManifest() {
  const source = await loadJSON('assets/minigames/manifest.json', { games: {} });
  const games = source?.games && typeof source.games === 'object' ? source.games : {};
  return Object.fromEntries(Object.entries(games).map(([id, entry]) => [id, {
    id,
    name: String(entry?.name || id),
    props: (Array.isArray(entry?.props) ? entry.props : []).filter((item) => typeof item?.path === 'string' && /\.glb$/i.test(item.path)),
  }]));
}

const COSMETIC_TEMPLATE_BOUNDS = {
  hairstyles: new Vector3(0.92, 0.55, 0.34),
  headAccessories: new Vector3(1.00, 0.70, 0.46),
  outfits: new Vector3(0.78, 1.10, 0.54),
  handAccessories: new Vector3(0.26, 0.08, 0.26),
  shoes: new Vector3(0.28, 0.16, 0.42),
  faceWear: new Vector3(0.82, 0.42, 0.28),
  facialHair: new Vector3(0.62, 0.42, 0.12),
  heldItems: new Vector3(0.72, 0.92, 0.32),
  backItems: new Vector3(0.90, 1.15, 0.40),
  neckwear: new Vector3(0.82, 0.36, 0.42)
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

  if (type?.kind === 'environment') return size.z > size.y * 1.22;
  return false;
}

function orientAsset(scene, path) {
  const type = assetCategory(path);
  if (!scene || !type) return false;

  scene.updateMatrixWorld(true);
  const size = new Box3().setFromObject(scene).getSize(new Vector3());
  if (shouldCorrectZUp(size, type)) {
    scene.rotation.x -= Math.PI / 2;
    scene.userData.snugOrientationCorrection = 'z-up-to-y-up';
    scene.updateMatrixWorld(true);
    return true;
  }

  scene.userData.snugOrientationCorrection = 'none';
  return false;
}

let pipelinePromise;

export function loadSnugAssetPipeline() {
  if (pipelinePromise) return pipelinePromise;
  pipelinePromise = (async () => {
    const [catalog, environment, minigames] = await Promise.all([loadManifest(), loadEnvironmentManifest(), loadMinigameManifest()]);
    const pendingReviews = Object.entries(catalog).flatMap(([category, items]) =>
      items.filter((item) => item.id && item.fitPending).map((item) => ({ ...item, category }))
    );

    const draco = new DRACOLoader();
    draco.setDecoderPath('assets/vendor/draco/');
    const gltf = new GLTFLoader();
    gltf.setDRACOLoader(draco);
    const minigamePropCache = new Map();
    const loadMinigameProps = async (gameId) => {
      const entries = minigames[gameId]?.props || [];
      if (!minigamePropCache.has(gameId)) {
        minigamePropCache.set(gameId, Promise.all(entries.map(async (entry) => {
          try {
            const loaded = await gltf.loadAsync(entry.path);
            return { ...entry, scene: loaded.scene };
          } catch {
            return null;
          }
        })).then((items) => items.filter(Boolean)));
      }
      const loaded = await minigamePropCache.get(gameId);
      return loaded.map((item) => ({ ...item, scene: item.scene.clone(true) }));
    };

    const approveReview = (category, id, fit) => {
      const item = catalog[category]?.find((entry) => entry.id === id);
      if (!item) return null;
      item.fitReview = { ...normalizeFit(fit), approved: true };
      item.fitPending = false;
      const pending = pendingReviews.find((entry) => entry.category === category && entry.id === id);
      if (pending) {
        pending.fitReview = item.fitReview;
        pending.fitPending = false;
      }
      return item;
    };

    const mergeReviews = (reviews = {}) => {
      if (!reviews || Array.isArray(reviews) || typeof reviews !== 'object') return {};
      const merged = {};
      Object.values(catalog).flat().forEach((item) => {
        const source = item.path && reviews[item.path];
        if (!source?.approved) return;
        const fit = { ...normalizeFit(source), approved: true };
        item.fitReview = fit;
        item.fitPending = false;
        merged[item.path] = fit;
        const pending = pendingReviews.find((entry) => entry.path === item.path);
        if (pending) {
          pending.fitReview = fit;
          pending.fitPending = false;
        }
      });
      return merged;
    };

    return {
      catalog,
      environment,
      minigames,
      loadMinigameProps,
      pendingReviews,
      approveReview,
      mergeReviews,
      templateBounds: COSMETIC_TEMPLATE_BOUNDS,
      draco,
      orientAsset,
      orientCosmetic: orientAsset
    };
  })();
  return pipelinePromise;
}

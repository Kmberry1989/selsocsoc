import { DRACOLoader } from './vendor/three/DRACOLoader.js';

const CATEGORY_FOLDERS = {
  hairstyles: 'hairstyles',
  headAccessories: 'head-accessories',
  outfits: 'outfits',
  handAccessories: 'hand-accessories',
  shoes: 'shoes'
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

function normalizeItem(item, folder) {
  const filename = String(item?.path || item?.name || '').split('/').pop();
  if (!filename || !/\.glb$/i.test(filename)) return null;
  const id = filename.replace(/\.glb$/i, '');
  return {
    id,
    name: displayName(filename),
    path: item.path || `assets/cosmetics/${folder}/${filename}`
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

export async function loadSnugAssetPipeline() {
  // The Vercel build regenerates this same-origin manifest from the five
  // cosmetic folders. Runtime repository discovery is intentionally avoided:
  // it is slower, exposes repository details, and is unnecessary after build.
  const catalog = await loadManifest();

  const draco = new DRACOLoader();
  draco.setDecoderPath('assets/vendor/draco/');

  return { catalog, draco };
}

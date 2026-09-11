import { DRACOLoader } from './vendor/three/DRACOLoader.js';

const CATEGORY_FOLDERS = {
  hairstyles: 'hairstyles',
  outfits: 'outfits',
  handAccessories: 'hand-accessories',
  shoes: 'shoes'
};

const EMPTY_OPTIONS = {
  hairstyles: { id: '', name: 'None', path: '' },
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

function githubRepositoryFromPage() {
  const host = location.hostname.toLowerCase();
  if (!host.endsWith('.github.io')) return null;
  const owner = host.slice(0, -'.github.io'.length);
  const firstPath = location.pathname.split('/').filter(Boolean)[0] || '';
  const repo = firstPath && !firstPath.includes('.') ? firstPath : `${owner}.github.io`;
  return { owner, repo };
}

async function discoverGithubCatalog(repository) {
  const entries = await Promise.all(Object.entries(CATEGORY_FOLDERS).map(async ([category, folder]) => {
    const endpoint = `https://api.github.com/repos/${encodeURIComponent(repository.owner)}/${encodeURIComponent(repository.repo)}/contents/assets/cosmetics/${folder}`;
    const response = await fetch(endpoint, { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) throw new Error(`GitHub catalogue ${response.status}`);
    const files = await response.json();
    return [category, files
      .filter((item) => item.type === 'file' && /\.glb$/i.test(item.name))
      .map((item) => ({ name: item.name, path: item.path }))];
  }));
  return normalizeCatalog(Object.fromEntries(entries));
}

export async function loadSnugAssetPipeline() {
  const fallbackCatalog = await loadManifest();
  const repository = githubRepositoryFromPage();
  let catalog = fallbackCatalog;

  if (repository) {
    try {
      catalog = await discoverGithubCatalog(repository);
    } catch (error) {
      console.warn('Snug Society: using the bundled cosmetic catalogue.', error);
    }
  }

  const draco = new DRACOLoader();
  draco.setDecoderPath('assets/vendor/draco/');

  return { catalog, draco };
}

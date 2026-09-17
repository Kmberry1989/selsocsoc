import * as THREE from 'three';
import { GLTFLoader } from './vendor/three/GLTFLoader.js';
import { loadSnugAssetPipeline } from './snug-asset-pipeline.js';

const DEV_EMAIL = 'kylematthewberry@gmail.com';

const labels = {
  hairstyles: 'Hairstyle',
  headAccessories: 'Head accessory',
  outfits: 'Outfit',
  handAccessories: 'Hand accessory',
  shoes: 'Shoes',
  faceWear: 'Face-wear',
  facialHair: 'Facial hair',
  heldItems: 'Held item',
  backItems: 'Back item',
  neckwear: 'Neckwear'
};

const baseOffsets = {
  hairstyles: { x: 0, y: 0.25, z: 0 },
  headAccessories: { x: 0, y: 0, z: 0 },
  outfits: { x: 0, y: 0, z: 0 },
  handAccessories: { x: 0, y: 0, z: 0 },
  shoes: { x: 0, y: 0, z: 0 },
  faceWear: { x: 0, y: 0, z: 0.24 },
  facialHair: { x: 0, y: -0.10, z: 0.14 },
  heldItems: { x: 0, y: -0.08, z: 0.12 },
  backItems: { x: 0, y: 0.04, z: -0.42 },
  neckwear: { x: 0, y: 0.48, z: 0.04 }
};

const pipeline = await loadSnugAssetPipeline();
const queue = pipeline.pendingReviews.filter((item) => item.fitPending);
const approved = Object.fromEntries(
  Object.values(pipeline.catalog).flat()
    .filter((item) => item.path && item.fitReview?.approved)
    .map((item) => [item.path, item.fitReview])
);
let sourceAvatar = window.__snugPlayerAvatar || null;
let index = 0;
let open = false;
let renderer;
let scene;
let camera;
let previewRoot;
let mounted = [];
let baseSize = new THREE.Vector3(1, 1, 1);
let frameHandle = 0;
let reloadTimer = 0;
let automaticReviewDismissed = false;
let gameplayReady = Boolean(sourceAvatar && window.__snugWorld?.player);
let dragStart = null;
let yaw = 0;
let currentSettings = { scale: 1, x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 };
let currentSession = window.__snugSession || null;
let cloudDirty = false;

const launcher = document.createElement('button');
launcher.type = 'button';
launcher.className = 'fit-review-launch';
launcher.hidden = queue.length === 0;
launcher.innerHTML = `Fit review <span>${queue.length}</span>`;
launcher.setAttribute('aria-label', `${queue.length} new accessories need a fit review`);
document.body.appendChild(launcher);

const overlay = document.createElement('div');
overlay.className = 'fit-review-backdrop';
overlay.hidden = true;
overlay.innerHTML = `
  <section class="fit-review-sheet" role="dialog" aria-modal="true" aria-labelledby="fit-review-title">
    <header class="fit-review-head">
      <span><span class="fit-review-eyebrow">New GLB detected</span><h2 id="fit-review-title">Accessory fit check</h2></span>
      <button class="fit-review-close" type="button" aria-label="Close fit review">×</button>
    </header>
    <div class="fit-review-progress"><b></b><span></span></div>
    <div class="fit-review-stage"><canvas aria-label="Your avatar wearing the new accessory"></canvas><div class="fit-review-loading">Preparing your avatar…</div></div>
    <div class="fit-review-details">
      <div class="fit-review-copy"><h3></h3><p></p></div>
      <div class="fit-review-notes" aria-live="polite"></div>
      <div class="fit-review-error" role="alert"></div>
      <div class="fit-review-cloud-status" role="status"></div>
      <div class="fit-review-controls" hidden>
        <label class="fit-review-control"><span>Overall size</span><input data-fit="scale" type="range" min="0.55" max="1.65" value="1" step="0.01"><output>100%</output></label>
        <label class="fit-review-control"><span>Left / right</span><input data-fit="x" type="range" min="-0.6" max="0.6" value="0" step="0.01"><output>Centered</output></label>
        <label class="fit-review-control"><span>Up / down</span><input data-fit="y" type="range" min="-0.7" max="0.7" value="0" step="0.01"><output>Centered</output></label>
        <label class="fit-review-control"><span>Forward / back</span><input data-fit="z" type="range" min="-0.55" max="0.55" value="0" step="0.01"><output>Centered</output></label>
        <div class="fit-review-control-group" role="group" aria-label="Accessory rotation"><b>Rotate accessory</b><span>Set each axis independently</span></div>
        <label class="fit-review-control"><span>X axis</span><input data-fit="rx" type="range" min="-180" max="180" value="0" step="1"><output>0°</output></label>
        <label class="fit-review-control"><span>Y axis</span><input data-fit="ry" type="range" min="-180" max="180" value="0" step="1"><output>0°</output></label>
        <label class="fit-review-control"><span>Z axis</span><input data-fit="rz" type="range" min="-180" max="180" value="0" step="1"><output>0°</output></label>
      </div>
      <div class="fit-review-actions">
        <button class="fit-review-adjust" type="button">Adjust fit</button>
        <button class="fit-review-approve" type="button">Approve for Style</button>
        <button class="fit-review-cloud-save" type="button" hidden>Save fits to cloud</button>
        <button class="fit-review-defer" type="button">Keep out for now</button>
      </div>
    </div>
  </section>`;
document.body.appendChild(overlay);

const sheet = overlay.querySelector('.fit-review-sheet');
const canvas = overlay.querySelector('canvas');
const loading = overlay.querySelector('.fit-review-loading');
const notes = overlay.querySelector('.fit-review-notes');
const errorBox = overlay.querySelector('.fit-review-error');
const controls = overlay.querySelector('.fit-review-controls');
const progressName = overlay.querySelector('.fit-review-progress b');
const progressCount = overlay.querySelector('.fit-review-progress span');
const title = overlay.querySelector('.fit-review-copy h3');
const copy = overlay.querySelector('.fit-review-copy p');
const countBadge = launcher.querySelector('span');
const cloudStatus = overlay.querySelector('.fit-review-cloud-status');
const cloudSaveButton = overlay.querySelector('.fit-review-cloud-save');

function developerCanSave() {
  const configuredEmail = window.__snugFitCloud?.DEV_EMAIL || DEV_EMAIL;
  return configuredEmail === DEV_EMAIL && window.__snugFitCloud?.canWrite?.(currentSession) === true;
}

function refreshCloudMode() {
  const canSave = developerCanSave();
  cloudStatus.classList.toggle('is-dev', canSave);
  cloudStatus.textContent = canSave
    ? (cloudDirty ? 'Developer mode · approved changes are ready to save to the shared cloud fit file.' : 'Developer mode · cloud fit settings are synced for every player.')
    : 'Session-only mode · only the developer Google account can publish shared fit settings.';
  cloudSaveButton.hidden = !canSave;
  cloudSaveButton.disabled = !canSave || !cloudDirty;
}

async function saveReviewsToCloud(button = cloudSaveButton) {
  if (!developerCanSave()) return;
  const original = button.textContent;
  button.disabled = true;
  button.textContent = 'Saving…';
  try {
    await window.__snugFitCloud.save(currentSession, approved);
    cloudDirty = false;
    button.textContent = 'Saved to cloud';
    refreshCloudMode();
    setTimeout(() => { if (button.isConnected) button.textContent = original; }, 1100);
  } catch (error) {
    cloudStatus.classList.remove('is-dev');
    cloudStatus.textContent = 'Cloud save was blocked. Publish the bundled Firestore rules, then try again while signed in with the developer Google account.';
    button.disabled = false;
    button.textContent = 'Try cloud save again';
  }
}

function cloneReference(original, originalRoot, cloneRoot) {
  if (!original || !originalRoot || !cloneRoot) return null;
  const path = [];
  let node = original;
  while (node && node !== originalRoot) {
    const parent = node.parent;
    if (!parent) return null;
    path.unshift(parent.children.indexOf(node));
    node = parent;
  }
  return path.reduce((current, childIndex) => current?.children?.[childIndex], cloneRoot);
}

function targetRefs(category) {
  if (!sourceAvatar || !previewRoot) return [];
  const data = sourceAvatar.userData || {};
  if (category === 'hairstyles' || category === 'headAccessories' || category === 'faceWear' || category === 'facialHair') {
    return [cloneReference(data.coinHead, sourceAvatar, previewRoot)].filter(Boolean);
  }
  if (category === 'handAccessories') {
    return (data.hands || []).map((hand) => cloneReference(hand, sourceAvatar, previewRoot)).filter(Boolean);
  }
  if (category === 'heldItems') {
    const hand = (data.hands || [])[1] || (data.hands || [])[0];
    return [cloneReference(hand, sourceAvatar, previewRoot)].filter(Boolean);
  }
  if (category === 'shoes') {
    return (data.feet || []).map((foot) => cloneReference(foot, sourceAvatar, previewRoot)).filter(Boolean);
  }
  if (category === 'backItems' || category === 'neckwear') {
    return [cloneReference(data.body, sourceAvatar, previewRoot)].filter(Boolean);
  }
  return [previewRoot];
}

function clearMounted() {
  mounted.forEach((node) => node.parent?.remove(node));
  mounted = [];
}

function cleanupPreview() {
  cancelAnimationFrame(frameHandle);
  frameHandle = 0;
  renderer?.dispose();
  renderer = null;
  scene = null;
  previewRoot = null;
  clearMounted();
}

function formatOffset(value, positive, negative) {
  if (Math.abs(value) < 0.015) return 'Centered';
  return `${Math.abs(value).toFixed(2)} m ${value > 0 ? positive : negative}`;
}

function updateControlLabels() {
  controls.querySelector('[data-fit="scale"] + output').textContent = `${Math.round(currentSettings.scale * 100)}%`;
  controls.querySelector('[data-fit="x"] + output').textContent = formatOffset(currentSettings.x, 'right', 'left');
  controls.querySelector('[data-fit="y"] + output').textContent = formatOffset(currentSettings.y, 'up', 'down');
  controls.querySelector('[data-fit="z"] + output').textContent = formatOffset(currentSettings.z, 'forward', 'back');
  controls.querySelector('[data-fit="rx"] + output').textContent = `${Math.round(currentSettings.rx)}°`;
  controls.querySelector('[data-fit="ry"] + output').textContent = `${Math.round(currentSettings.ry)}°`;
  controls.querySelector('[data-fit="rz"] + output').textContent = `${Math.round(currentSettings.rz)}°`;
}

function applyFit() {
  const item = queue[index];
  if (!item || !mounted.length) return;
  const bodyMass = Number(sourceAvatar?.userData?.bodyMass) || 1;
  const height = Number(sourceAvatar?.userData?.heightScale) || 1;
  const baseScale = item.category === 'outfits' ? new THREE.Vector3(bodyMass, height, bodyMass) : new THREE.Vector3(1, 1, 1);
  const offset = baseOffsets[item.category] || baseOffsets.headAccessories;
  if (item.category === 'outfits') offset.y = Number(sourceAvatar?.userData?.bodyBase) || 0;
  mounted.forEach((node) => {
    node.scale.set(baseScale.x * currentSettings.scale, baseScale.y * currentSettings.scale, baseScale.z * currentSettings.scale);
    node.position.set(offset.x + currentSettings.x, offset.y + currentSettings.y, offset.z + currentSettings.z);
    const baseRotation = node.userData.snugFitBaseRotation || { x: 0, y: 0, z: 0 };
    node.rotation.set(
      baseRotation.x + THREE.MathUtils.degToRad(currentSettings.rx),
      baseRotation.y + THREE.MathUtils.degToRad(currentSettings.ry),
      baseRotation.z + THREE.MathUtils.degToRad(currentSettings.rz)
    );
    node.updateMatrixWorld(true);
  });
  updateControlLabels();
  updateNotes();
  renderPreview();
}

function intersectionRatio(a, b) {
  const overlap = a.clone().intersect(b);
  if (overlap.isEmpty()) return 0;
  const size = overlap.getSize(new THREE.Vector3());
  const assetVolume = Math.max(0.000001, a.getSize(new THREE.Vector3()).x * a.getSize(new THREE.Vector3()).y * a.getSize(new THREE.Vector3()).z);
  return (size.x * size.y * size.z) / assetVolume;
}

function addNote(label, text, warn = false) {
  const row = document.createElement('div');
  row.className = `fit-review-note${warn ? ' warn' : ''}`;
  row.innerHTML = `<b>${label}</b><span>${text}</span>`;
  notes.appendChild(row);
}

function updateNotes() {
  const item = queue[index];
  if (!item) return;
  notes.replaceChildren();
  const expected = pipeline.templateBounds[item.category];
  const scaled = baseSize.clone().multiplyScalar(currentSettings.scale);
  const actualSpan = Math.max(scaled.x, scaled.y, scaled.z);
  const expectedSpan = expected ? Math.max(expected.x, expected.y, expected.z) : actualSpan;
  const ratio = expectedSpan ? actualSpan / expectedSpan : 1;
  if (ratio > 1.28) addNote('Scale', 'Looks large beside the avatar. Try reducing Overall size.', true);
  else if (ratio < 0.72) addNote('Scale', 'Looks small beside the avatar. Try increasing Overall size.', true);
  else addNote('Scale', 'Looks close to the expected size for this slot.');

  if (currentSettings.y > 0.1) addNote('Sit point', 'The model is sitting high. Check the gap beneath it.', true);
  else if (currentSettings.y < -0.1) addNote('Sit point', 'The model is sitting low. Check that it does not sink into the body.', true);
  else addNote('Sit point', 'The attachment origin sits close to the expected anchor.');

  let ratioClip = 0;
  if (mounted[0] && previewRoot) {
    const assetBox = new THREE.Box3().setFromObject(mounted[0]);
    let target = previewRoot.userData?.body || previewRoot;
    if (item.category === 'hairstyles' || item.category === 'headAccessories' || item.category === 'faceWear' || item.category === 'facialHair') target = targetRefs(item.category)[0] || target;
    if (item.category === 'handAccessories' || item.category === 'heldItems') target = targetRefs(item.category)[0] || target;
    if (item.category === 'shoes' || item.category === 'backItems' || item.category === 'neckwear') target = targetRefs(item.category)[0] || target;
    const targetBox = new THREE.Box3().setFromObject(target);
    ratioClip = intersectionRatio(assetBox, targetBox);
  }
  if (ratioClip > 0.48 && item.category !== 'outfits') addNote('Clipping', 'A noticeable part enters the avatar. Turn the preview, then move or rotate the accessory outward.', true);
  else if (item.category === 'outfits') addNote('Clipping', 'Turn the preview and check shoulders, sides, and feet at the body extremes.');
  else addNote('Clipping', 'No heavy overlap is visible from the current fit. Turn the preview to double-check.');

  const rotationAmount = Math.max(Math.abs(currentSettings.rx), Math.abs(currentSettings.ry), Math.abs(currentSettings.rz));
  if (rotationAmount > 0) addNote('Rotation', `Manual X, Y, and Z rotation is included in the approved fit (${Math.round(currentSettings.rx)}°, ${Math.round(currentSettings.ry)}°, ${Math.round(currentSettings.rz)}°).`);
  else addNote('Rotation', 'Use the X, Y, and Z controls when the accessory needs to turn on its attachment point.');
}

function setupRenderer() {
  cleanupPreview();
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(30, 1, 0.05, 100);
  camera.position.set(3.1, 2.2, 4.3);
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x6f8f64, 2.2));
  const key = new THREE.DirectionalLight(0xfff2d5, 2.6);
  key.position.set(3, 6, 4);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xaedcff, 1.3);
  fill.position.set(-4, 2, 2);
  scene.add(fill);
  const ground = new THREE.Mesh(new THREE.CircleGeometry(1.45, 48), new THREE.MeshBasicMaterial({ color: 0x7aa568, transparent: true, opacity: 0.45 }));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.02;
  scene.add(ground);
}

function resizeRenderer() {
  if (!renderer || !camera) return;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, Math.round(rect.width));
  const height = Math.max(1, Math.round(rect.height));
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderPreview();
}

function frameAvatar() {
  if (!previewRoot || !camera) return;
  const box = new THREE.Box3().setFromObject(previewRoot);
  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  previewRoot.position.sub(center);
  previewRoot.position.y += size.y * 0.48;
  const distance = Math.max(3.3, size.y * 2.05);
  camera.position.set(distance * 0.62, size.y * 0.55, distance);
  camera.lookAt(0, size.y * 0.47, 0);
}

function renderPreview() {
  if (!renderer || !scene || !camera) return;
  if (previewRoot) previewRoot.rotation.y = yaw;
  renderer.render(scene, camera);
}

async function loadCurrent() {
  const item = queue[index];
  if (!item) return showDone();
  errorBox.classList.remove('show');
  overlay.querySelector('.fit-review-approve').disabled = false;
  loading.hidden = false;
  progressName.textContent = labels[item.category] || 'Accessory';
  progressCount.textContent = `${index + 1} of ${queue.length}`;
  title.textContent = item.name;
  copy.textContent = `Previewing ${item.name} on your current avatar. It stays out of Style until you approve it.`;
  currentSettings = { scale: 1, x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 };
  controls.hidden = true;
  overlay.querySelector('.fit-review-adjust').textContent = 'Adjust fit';
  refreshCloudMode();
  [...controls.querySelectorAll('input')].forEach((input) => { input.value = currentSettings[input.dataset.fit]; });
  setupRenderer();

  if (!sourceAvatar) {
    loading.textContent = 'Waiting for your avatar…';
    return;
  }

  previewRoot = sourceAvatar.clone(true);
  previewRoot.userData = { ...sourceAvatar.userData };
  previewRoot.traverse((node) => {
    if (node.name === 'snug-cosmetic-overlay') node.parent?.remove(node);
  });
  scene.add(previewRoot);

  try {
    const loader = new GLTFLoader();
    if (pipeline.draco) loader.setDRACOLoader(pipeline.draco);
    const gltf = await loader.loadAsync(item.path);
    const asset = gltf.scene || gltf.scenes?.[0];
    if (!asset) throw new Error('This GLB has no scene.');
    pipeline.orientAsset?.(asset, item.path);
    asset.updateMatrixWorld(true);
    baseSize = new THREE.Box3().setFromObject(asset).getSize(new THREE.Vector3());
    const targets = targetRefs(item.category);
    if (!targets.length) throw new Error('The avatar attachment point is unavailable.');
    targets.forEach((target, targetIndex) => {
      const instance = targetIndex === 0 ? asset : asset.clone(true);
      instance.name = 'snug-fit-review-asset';
      instance.userData.snugFitBaseRotation = {
        x: instance.rotation.x,
        y: instance.rotation.y,
        z: instance.rotation.z
      };
      instance.traverse((node) => {
        if (node.isMesh) {
          node.castShadow = true;
          node.receiveShadow = true;
        }
      });
      target.add(instance);
      mounted.push(instance);
    });
    applyFit();
    frameAvatar();
    resizeRenderer();
    loading.hidden = true;
    renderPreview();
  } catch (error) {
    loading.textContent = 'Preview unavailable';
    errorBox.textContent = 'This GLB could not be previewed. Keep it out for now and check that it is a valid embedded or Draco-compressed GLB.';
    errorBox.classList.add('show');
    overlay.querySelector('.fit-review-approve').disabled = true;
  }
}

function refreshLauncher() {
  const remaining = queue.filter((item) => item.fitPending).length;
  countBadge.textContent = remaining;
  launcher.hidden = remaining === 0;
  launcher.setAttribute('aria-label', `${remaining} new accessories need a fit review`);
}

function reviewIsBlocked() {
  return !gameplayReady
    || document.documentElement.classList.contains('snug-start-open')
    || Boolean(document.querySelector('.welcome-cinematic'));
}

function syncReviewGate() {
  launcher.classList.toggle('fit-review-gated', reviewIsBlocked());
}

function scheduleAutomaticReview(delay = 550) {
  clearTimeout(reloadTimer);
  syncReviewGate();
  reloadTimer = setTimeout(() => {
    syncReviewGate();
    if (open || automaticReviewDismissed || !sourceAvatar || !queue.some((item) => item.fitPending)) return;
    if (reviewIsBlocked()) {
      scheduleAutomaticReview(300);
      return;
    }
    openReview();
  }, delay);
}

function openReview() {
  if (!queue.some((item) => item.fitPending) || reviewIsBlocked()) return;
  index = Math.max(0, queue.findIndex((item) => item.fitPending));
  open = true;
  overlay.hidden = false;
  document.documentElement.classList.add('snug-fit-review-open');
  loadCurrent();
  setTimeout(() => overlay.querySelector('.fit-review-close').focus(), 0);
}

function closeReview() {
  open = false;
  automaticReviewDismissed = true;
  overlay.hidden = true;
  document.documentElement.classList.remove('snug-fit-review-open');
  cleanupPreview();
}

function nextPending() {
  const next = queue.findIndex((item, itemIndex) => itemIndex > index && item.fitPending);
  const wrapped = queue.findIndex((item) => item.fitPending);
  index = next >= 0 ? next : wrapped;
  if (index < 0) showDone();
  else loadCurrent();
}

function showDone() {
  cleanupPreview();
  refreshLauncher();
  const canSave = developerCanSave();
  sheet.innerHTML = `<div class="fit-review-done"><span class="fit-review-done-mark">✓</span><h3>Fit checks complete</h3><p>${canSave ? 'Approved transforms include move, scale, and X/Y/Z rotation. Save them to the shared cloud fit file, and keep a JSON backup.' : 'Approved accessories are available in Style for this session. Download the fit file and keep it in <b>assets/cosmetics/fit-reviews.json</b> so the approvals carry into future builds.'}</p>${canSave ? '<button class="fit-review-cloud-save" type="button">Save fits to cloud</button>' : '<div class="fit-review-cloud-status">Session-only mode · only the developer Google account can publish shared fit settings.</div>'}<button class="fit-review-download" type="button">Download fit settings</button><button class="fit-review-close" type="button">Close</button></div>`;
  sheet.querySelector('.fit-review-cloud-save')?.addEventListener('click', (event) => saveReviewsToCloud(event.currentTarget));
  sheet.querySelector('.fit-review-download').addEventListener('click', downloadReviews);
  sheet.querySelector('.fit-review-close').addEventListener('click', closeReview);
}

function downloadReviews() {
  const blob = new Blob([`${JSON.stringify(approved, null, 2)}\n`], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'fit-reviews.json';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 0);
}

launcher.addEventListener('click', openReview);
overlay.querySelector('.fit-review-close').addEventListener('click', closeReview);
overlay.addEventListener('click', (event) => { if (event.target === overlay) closeReview(); });
overlay.querySelector('.fit-review-adjust').addEventListener('click', (event) => {
  controls.hidden = !controls.hidden;
  event.currentTarget.textContent = controls.hidden ? 'Adjust fit' : 'Hide adjustments';
});
overlay.querySelector('.fit-review-approve').addEventListener('click', () => {
  const item = queue[index];
  if (!item) return;
  const saved = { approved: true, ...currentSettings };
  approved[item.path] = saved;
  pipeline.approveReview(item.category, item.id, saved);
  (window.__snugCosmetics?.[item.category] || []).forEach((entry) => {
    if (entry.id === item.id) Object.assign(entry, { fitPending: false, fitReview: saved });
  });
  (window.__snugShopCosmetics || []).forEach((entry) => {
    if (entry.id === item.id) Object.assign(entry, { fitPending: false, fitReview: saved });
  });
  window.__snugFitSettings ||= {};
  window.__snugFitSettings[item.path] = saved;
  item.fitPending = false;
  cloudDirty = true;
  refreshCloudMode();
  refreshLauncher();
  nextPending();
});
cloudSaveButton.addEventListener('click', () => saveReviewsToCloud());
overlay.querySelector('.fit-review-defer').addEventListener('click', () => {
  const current = queue[index];
  const next = queue.findIndex((item, itemIndex) => itemIndex > index && item.fitPending);
  if (next < 0) {
    closeReview();
    return;
  }
  index = next;
  loadCurrent();
});
controls.addEventListener('input', (event) => {
  const input = event.target.closest('input[data-fit]');
  if (!input) return;
  currentSettings[input.dataset.fit] = Number(input.value);
  applyFit();
});
canvas.addEventListener('pointerdown', (event) => {
  dragStart = { x: event.clientX, yaw };
  canvas.setPointerCapture(event.pointerId);
});
canvas.addEventListener('pointermove', (event) => {
  if (!dragStart) return;
  yaw = dragStart.yaw + (event.clientX - dragStart.x) * 0.012;
  renderPreview();
});
canvas.addEventListener('pointerup', () => { dragStart = null; });
canvas.addEventListener('pointercancel', () => { dragStart = null; });
window.addEventListener('resize', resizeRenderer);
window.addEventListener('snug-session', (event) => {
  currentSession = event.detail || null;
  refreshCloudMode();
});
window.addEventListener('snug-fit-settings-ready', (event) => {
  const reviews = event.detail?.reviews || {};
  Object.assign(approved, reviews);
  refreshLauncher();
  if (open && queue[index] && !queue[index].fitPending) nextPending();
});
window.addEventListener('snug-avatar-ready', (event) => {
  sourceAvatar = event.detail?.avatar || sourceAvatar;
  clearTimeout(reloadTimer);
  if (open) reloadTimer = setTimeout(loadCurrent, 180);
});
window.addEventListener('snug-world-ready', (event) => {
  sourceAvatar = event.detail?.player || sourceAvatar;
  gameplayReady = Boolean(sourceAvatar);
  syncReviewGate();
  if (queue.some((item) => item.fitPending)) scheduleAutomaticReview();
});

const gateObserver = new MutationObserver(syncReviewGate);
gateObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'], childList: true, subtree: true });
syncReviewGate();
refreshCloudMode();
if (gameplayReady && queue.length) scheduleAutomaticReview();

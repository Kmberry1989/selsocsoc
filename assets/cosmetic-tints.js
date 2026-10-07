(() => {
  const WHITE = '#ffffff';
  const HEX = /^#[0-9a-f]{6}$/i;
  const NO_TINT_NAME = /(?:^|[\s_.-])(?:no[\s_.-]?tint|untinted)(?:$|[\s_.-])/i;

  function normalizeTint(value) {
    return HEX.test(String(value || '')) ? String(value).toLowerCase() : WHITE;
  }

  function srgbChannel(byte) {
    const value = byte / 255;
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  }

  function tintChannels(value) {
    const tint = normalizeTint(value);
    const packed = Number.parseInt(tint.slice(1), 16);
    return {
      value: tint,
      r: srgbChannel((packed >> 16) & 255),
      g: srgbChannel((packed >> 8) & 255),
      b: srgbChannel(packed & 255),
    };
  }

  function tintIsDisabled(mesh, material) {
    return mesh?.userData?.snugTint === false
      || material?.userData?.snugTint === false
      || NO_TINT_NAME.test(String(mesh?.name || ''))
      || NO_TINT_NAME.test(String(material?.name || ''));
  }

  function cloneTintedMaterial(mesh, material, tint) {
    if (!material?.clone) return material;
    const clone = material.clone();
    clone.userData = { ...(material.userData || {}) };
    const stored = Array.isArray(material.userData?.snugTintBaseColor)
      ? material.userData.snugTintBaseColor
      : material.color
        ? [material.color.r, material.color.g, material.color.b]
        : null;

    if (stored) clone.userData.snugTintBaseColor = [...stored];
    clone.userData.snugTintClone = true;

    if (clone.color && stored) {
      if (tintIsDisabled(mesh, material)) clone.color.setRGB(stored[0], stored[1], stored[2]);
      else clone.color.setRGB(stored[0] * tint.r, stored[1] * tint.g, stored[2] * tint.b);
    }
    clone.needsUpdate = true;
    return clone;
  }

  function tintMesh(mesh, value, cosmeticId = mesh?.userData?.snugCosmeticId || '') {
    if (!mesh?.isMesh || !mesh.material) return;
    const tint = tintChannels(value);
    const previous = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    const next = previous.map((material) => cloneTintedMaterial(mesh, material, tint));
    mesh.material = Array.isArray(mesh.material) ? next : next[0];
    mesh.userData.snugCosmeticId = cosmeticId;
    mesh.userData.snugCosmeticTint = tint.value;
    previous.forEach((material) => {
      if (material?.userData?.snugTintClone && !next.includes(material)) material.dispose?.();
    });
  }

  function applyTint(root, cosmeticId, value) {
    if (!root?.traverse || !cosmeticId) return 0;
    let changed = 0;
    root.traverse((node) => {
      if (node?.isMesh && node.userData?.snugCosmeticId === cosmeticId) {
        tintMesh(node, value, cosmeticId);
        changed += 1;
      }
    });
    return changed;
  }

  function selectedCosmeticId(input) {
    return input?.closest('.cosmetic-select-row')?.querySelector('select')?.value || '';
  }

  function previewInputTint(input) {
    const cosmeticId = selectedCosmeticId(input);
    if (!cosmeticId) return;
    applyTint(window.__snugPlayerAvatar || window.__snugWorld?.player, cosmeticId, input.value);
  }

  document.addEventListener('input', (event) => {
    const input = event.target?.closest?.('.accessory-tint');
    if (input) previewInputTint(input);
  }, true);
  document.addEventListener('change', (event) => {
    const input = event.target?.closest?.('.accessory-tint');
    if (input) requestAnimationFrame(() => previewInputTint(input));
  }, true);

  window.__snugTintMesh = tintMesh;
  window.__snugApplyCosmeticTint = applyTint;
  window.__snugNormalizeTint = normalizeTint;
})();

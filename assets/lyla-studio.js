/* snug-lyla-studio-v1
 * Lyla's Studio — a revisitable photography studio in the world.
 * Lyla Lens (newspaper photographer) runs the onboarding photo shoot
 * ("Town Hall portraits" sheet, Lyla-branded by party-night-upgrade.js).
 * This adds her physical studio next to her world position so players can
 * walk up after onboarding and redo the shoot for new face sets.
 *
 * The re-shoot entry reuses the exact chain as Lyla's NPC "Portraits"
 * action: open the profile sheet, then click "Portrait appointment".
 * New captures overwrite players/{uid}.expressionPhotos per expression,
 * so the avatar atlas and minigame cards pick up the new face set.
 */
(() => {
  if (window.__snugLylaStudio) return;
  window.__snugLylaStudio = true;

  const STUDIO = { x: -8.0, z: -30.0, promptRadius: 3.2 };
  // Lyla's world spot: (-4.8, -25.4). The studio's open side faces her.
  const FACE_ANGLE = Math.atan2(-4.8 - STUDIO.x, -25.4 - STUDIO.z);

  // ---------- re-shoot entry ----------
  function openReshoot() {
    const chip = document.querySelector(".profile-chip");
    if (!chip) return false;
    chip.click();
    const started = Date.now();
    const poll = setInterval(() => {
      const button = [...document.querySelectorAll("button")]
        .find((entry) => /portrait|expression photos/i.test((entry.textContent || "").trim()));
      if (button) {
        clearInterval(poll);
        button.click();
      } else if (Date.now() - started >= 3000) {
        clearInterval(poll);
      }
    }, 100);
    return true;
  }

  // ---------- proximity prompt card ----------
  let card = null;
  function ensureCard() {
    if (card) return card;
    card = document.createElement("div");
    card.className = "lyla-studio-nearby";
    card.hidden = true;
    card.innerHTML = '<span class="lyla-studio-mark" aria-hidden="true">LL</span><span><b>Lyla\u2019s Studio</b><small>Retake expression photos</small></span><button type="button">Photo shoot</button>';
    card.querySelector("button").addEventListener("click", openReshoot);
    document.body.appendChild(card);
    return card;
  }

  function overlayOpen() {
    return Boolean(
      document.querySelector(".city-npc-dialogue") ||
      document.querySelector(".city-npc-nearby:not([hidden])") ||
      document.querySelector(".sheet") ||
      document.querySelector('[class*="backdrop"]')
    );
  }

  function shouldShow(playerPosition) {
    if (!playerPosition) return false;
    if (window.__snugWorld?.mode !== "village") return false;
    if (document.documentElement.classList.contains("snug-start-open")) return false;
    if (overlayOpen()) return false;
    return Math.hypot(playerPosition.x - STUDIO.x, playerPosition.z - STUDIO.z) <= STUDIO.promptRadius;
  }

  function tick() {
    const show = shouldShow(window.__snugWorld?.player?.position);
    if (show) ensureCard();
    if (card) card.hidden = !show;
  }
  setInterval(tick, 220);

  // ---------- 3D studio build ----------
  function signTexture() {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 192;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#7a5a38";
    ctx.fillRect(0, 0, 512, 192);
    ctx.strokeStyle = "#f5e9d2";
    ctx.lineWidth = 10;
    ctx.strokeRect(14, 14, 484, 164);
    ctx.fillStyle = "#fdf6e3";
    ctx.font = "900 64px Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("LYLA'S STUDIO", 256, 100);
    return canvas;
  }

  function buildStudio(THREE) {
    const world = window.__snugWorld;
    if (!world?.scene || world.mode !== "village" || world.scene.getObjectByName("LylaStudio")) return;
    const group = new THREE.Group();
    group.name = "LylaStudio";
    group.position.set(STUDIO.x, 0, STUDIO.z);
    group.rotation.y = FACE_ANGLE;

    const mat = (color, opts = {}) => new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.02, ...opts });
    const box = (w, h, d, color, x, y, z) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color));
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);
      return mesh;
    };
    const cyl = (rt, rb, h, color, x, y, z, seg = 12) => {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg), mat(color));
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      group.add(mesh);
      return mesh;
    };

    // Backdrop wall on two posts (back of the studio, local -z)
    box(0.16, 3.0, 0.16, 0x6b4a2e, -1.9, 1.5, -1.2);
    box(0.16, 3.0, 0.16, 0x6b4a2e, 1.9, 1.5, -1.2);
    box(3.9, 2.6, 0.12, 0xf5e9d2, 0, 1.55, -1.2);
    box(4.0, 0.34, 0.14, 0xc76b65, 0, 2.95, -1.2); // dusty-rose valance, Lyla's accent

    // Subject rug (the mark to stand on)
    cyl(1.05, 1.05, 0.05, 0xb98a5e, 0, 0.025, 0.7, 24);

    // Tripod + camera facing the rug
    const tz = 2.4;
    [[-0.28, 0.22], [0.28, 0.22], [0, -0.3]].forEach(([ox, oz]) => {
      const leg = cyl(0.03, 0.03, 1.5, 0x3a4145, ox, 0.7, tz + oz, 8);
      leg.rotation.z = ox * 0.9;
      leg.rotation.x = -oz * 0.9;
    });
    cyl(0.04, 0.04, 0.5, 0x3a4145, 0, 1.45, tz, 8);
    box(0.36, 0.24, 0.3, 0x2e3438, 0, 1.72, tz);
    const lens = cyl(0.09, 0.11, 0.22, 0x1c2124, 0, 1.72, tz - 0.24, 16);
    lens.rotation.x = Math.PI / 2;

    // Light stands with warm heads
    [-2.1, 2.1].forEach((lx) => {
      cyl(0.035, 0.05, 1.9, 0x4a4f53, lx, 0.95, 0.4, 8);
      const head = box(0.3, 0.3, 0.18, 0xfff3c4, lx, 2.0, 0.4);
      head.material = new THREE.MeshStandardMaterial({ color: 0xfff3c4, emissive: 0xffedb5, emissiveIntensity: 0.7, roughness: 0.6 });
      head.rotation.y = -Math.sign(lx) * 0.5;
    });

    // Wooden sign
    const sign = new THREE.Group();
    const board = new THREE.Mesh(
      new THREE.BoxGeometry(2.1, 0.8, 0.08),
      new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(signTexture()), roughness: 0.85 })
    );
    board.position.y = 1.6;
    board.castShadow = true;
    sign.add(board);
    [-0.85, 0.85].forEach((px) => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.0, 0.12), mat(0x6b4a2e));
      post.position.set(px, 1.0, 0);
      post.castShadow = true;
      sign.add(post);
    });
    sign.position.set(3.0, 0, 1.6);
    sign.rotation.y = 0.55;
    group.add(sign);

    world.scene.add(group);
  }

  function init() {
    import("./vendor/three/three.module.js")
      .then((THREE) => buildStudio(THREE))
      .catch((error) => console.error("Lyla's Studio could not start.", error));
  }
  window.addEventListener("snug-world-ready", init);
  if (window.__snugWorld) init();

  // Hooks for headless tests and debugging.
  window.__lylaStudio = { openReshoot, shouldShow, overlayOpen, STUDIO };
})();

(() => {
  if (window.__snugHomeMailbox) return;

  // The player's home mailbox: residential cottage district of Cyclical City,
  // just off the southwest cottage path (kept clear of the path itself).
  const HOME_POS = [-19.5, 0, -14.5];
  const HOME_FOCUS = [-21.18, -12.6]; // nearest point on the cottage path; mailbox faces it
  const HOME_ROT_Y = Math.atan2(HOME_FOCUS[0] - HOME_POS[0], HOME_FOCUS[1] - HOME_POS[2]);
  const GLB_PATH = "assets/mailbox/home-mailbox.glb";
  const FLAG_UP = 0;
  const FLAG_DOWN = -Math.PI / 2;

  const state = {
    group: null,
    flag: null,
    paintColor: "",
    worldScene: null,
    loading: false,
    flagFrame: 0,
    raycaster: null,
    pointer: null,
    rendererElement: null,
  };

  const mailboxUI = () => window.__snugMailboxUI || null;
  const unreadCount = () => { try { return mailboxUI()?.unreadCount() || 0; } catch { return 0; } };
  const playerPaint = () => { try { return mailboxUI()?.mailbox()?.paint || ""; } catch { return ""; } };

  function clearGroup() {
    if (state.group) {
      state.group.traverse((object) => {
        object.geometry?.dispose?.();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose?.());
        else object.material?.dispose?.();
      });
      state.group.parent?.remove(state.group);
    }
    state.group = null;
    state.flag = null;
    state.paintColor = "";
  }

  function applyPaint() {
    const paint = playerPaint();
    if (!paint || paint === state.paintColor || !state.group) return;
    state.paintColor = paint;
    state.group.getObjectByName("PaintShellNode")?.traverse((object) => {
      if (object.isMesh && object.material?.name === "SnugPaint") object.material.color.set(paint);
    });
  }

  function updateFlagTarget() {
    const target = unreadCount() > 0 ? FLAG_UP : FLAG_DOWN;
    if (state.flag) state.flag.userData.targetRotation = target;
  }

  function animateFlag() {
    cancelAnimationFrame(state.flagFrame);
    const tick = () => {
      const flag = state.flag;
      if (!flag) return;
      const target = flag.userData.targetRotation ?? FLAG_DOWN;
      const delta = target - flag.rotation.z;
      if (Math.abs(delta) > 0.004) {
        flag.rotation.z += delta * 0.12;
        state.flagFrame = requestAnimationFrame(tick);
      } else {
        flag.rotation.z = target;
      }
    };
    state.flagFrame = requestAnimationFrame(tick);
  }

  function installPicking(world, THREE) {
    const element = world.renderer?.domElement;
    if (!element || state.rendererElement === element) return;
    if (state.rendererElement && state._pointerHandler) {
      state.rendererElement.removeEventListener("pointerup", state._pointerHandler, true);
    }
    state.rendererElement = element;
    state.raycaster = new THREE.Raycaster();
    state.pointer = new THREE.Vector2();
    state._pointerHandler = (event) => {
      if (!state.group || document.body.classList.contains("mailbox-open")) return;
      const rect = element.getBoundingClientRect();
      state.pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );
      state.raycaster.setFromCamera(state.pointer, world.camera);
      const hits = state.raycaster.intersectObject(state.group, true);
      if (!hits.length) return;
      event.preventDefault();
      event.stopPropagation();
      mailboxUI()?.openPanel("inbox");
    };
    element.addEventListener("pointerup", state._pointerHandler, true);
  }

  // Primitive fallback so the home mailbox always exists even if the GLB
  // cannot load. Mirrors the shipped gate-mailbox look.
  function buildFallbackMailbox(world, THREE) {
    clearGroup();
    const group = new THREE.Group();
    group.name = "MailboxHome";
    const paint = new THREE.MeshStandardMaterial({ color: playerPaint() || 0xcf6655, roughness: 0.68, metalness: 0.08 });
    paint.name = "SnugPaint";
    const dark = new THREE.MeshStandardMaterial({ color: 0x3a302a, roughness: 0.88 });
    const wood = new THREE.MeshStandardMaterial({ color: 0x8a6a4a, roughness: 0.95 });
    const red = new THREE.MeshStandardMaterial({ color: 0xd94739, roughness: 0.58 });
    const add = (geometry, material, x, y, z) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      group.add(mesh);
      return mesh;
    };
    add(new THREE.BoxGeometry(0.18, 1.05, 0.18), wood, 0, 0.525, 0);
    const shell = new THREE.Group();
    shell.name = "PaintShellNode";
    const body = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.62, 0.72), paint);
    body.position.y = 1.36; body.castShadow = true;
    const roof = new THREE.Mesh(new THREE.CylinderGeometry(0.37, 0.37, 0.74, 14, 1, false, 0, Math.PI), paint);
    roof.rotation.x = Math.PI / 2; roof.rotation.z = Math.PI / 2; roof.position.y = 1.67; roof.castShadow = true;
    shell.add(body, roof);
    group.add(shell);
    add(new THREE.BoxGeometry(0.8, 0.5, 0.05), dark, 0, 1.33, 0.375);
    const flag = new THREE.Group();
    flag.name = "MailboxFlag";
    flag.position.set(0.55, 1.12, 0.12);
    const bar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.56, 0.06), red);
    bar.position.y = 0.28;
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.16, 0.26), red);
    head.position.set(0, 0.6, 0.1);
    flag.add(bar, head);
    flag.rotation.z = FLAG_DOWN;
    flag.userData.targetRotation = FLAG_DOWN;
    group.add(flag);
    group.position.set(HOME_POS[0], HOME_POS[1], HOME_POS[2]);
    group.rotation.y = HOME_ROT_Y;
    world.scene.add(group);
    state.group = group;
    state.flag = flag;
    installPicking(world, THREE);
    updateFlagTarget();
    animateFlag();
  }

  async function ensureHomeMailbox() {
    const world = window.__snugWorld;
    const THREE = window.__snugThree;
    if (!world?.scene || world.mode !== "village" || !THREE) return;
    if (state.worldScene !== world.scene) {
      clearGroup();
      state.worldScene = world.scene;
    }
    if (state.group) {
      applyPaint();
      updateFlagTarget();
      return;
    }
    if (state.loading) return;
    state.loading = true;
    try {
      const { GLTFLoader } = await import("./vendor/three/GLTFLoader.js");
      const gltf = await new GLTFLoader().loadAsync(GLB_PATH);
      const root = gltf.scene.getObjectByName("MailboxHome") || gltf.scene;
      root.position.set(HOME_POS[0], HOME_POS[1], HOME_POS[2]);
      root.rotation.y = HOME_ROT_Y;
      const paint = playerPaint();
      root.getObjectByName("PaintShellNode")?.traverse((object) => {
        if (object.isMesh) {
          object.material = object.material.clone();
          object.material.name = "SnugPaint";
          if (paint) object.material.color.set(paint);
        }
      });
      if (paint) state.paintColor = paint;
      root.traverse((object) => { if (object.isMesh) object.castShadow = true; });
      state.flag = root.getObjectByName("MailboxFlag");
      if (state.flag) {
        state.flag.rotation.z = FLAG_DOWN;
        state.flag.userData.targetRotation = FLAG_DOWN;
      }
      world.scene.add(root);
      state.group = root;
      installPicking(world, THREE);
      applyPaint();
      updateFlagTarget();
      animateFlag();
      window.__snugHomeMailbox.ready = true;
    } catch {
      try { buildFallbackMailbox(world, THREE); window.__snugHomeMailbox.ready = true; }
      catch { /* world not ready; retry on next tick */ }
    } finally {
      state.loading = false;
    }
  }

  window.__snugHomeMailbox = {
    ready: false,
    position: HOME_POS.slice(),
    open: () => mailboxUI()?.openPanel("inbox"),
    refresh: () => ensureHomeMailbox(),
  };

  ["snug-world-ready", "snug-world-expanded", "cylindric-world-layout-applied"].forEach((eventName) =>
    window.addEventListener(eventName, () => [0, 250, 800].forEach((delay) => setTimeout(ensureHomeMailbox, delay)))
  );
  window.addEventListener("snug-session", () => setTimeout(ensureHomeMailbox, 600));
  if (window.__snugWorld) ensureHomeMailbox();
  setInterval(() => {
    const world = window.__snugWorld;
    if (world?.mode === "village" && (!state.group || state.worldScene !== world.scene)) ensureHomeMailbox();
    else if (state.group) { applyPaint(); updateFlagTarget(); }
  }, 2500);
})();

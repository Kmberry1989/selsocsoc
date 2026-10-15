/* snug-npc-faces-v1
 * Gives each of the 13 roster NPCs their own unique face artwork.
 * Replaces the generic procedural canvas face on `PrimitiveFace_<MARK>`
 * with the NPC's painted face PNG from assets/npc-faces/.
 * Mayor Mayor and Gideon are full 3D NPCs now; their welcome-cinematic
 * figures still use window.__snugCinematicFaceDraw, hooked into the
 * cinematic bundle.
 */
(() => {
  if (window.__snugNpcFaces) return;
  window.__snugNpcFaces = true;

  const FACES = {
    'mayor-mayor': 'MM',
    'gideon': 'GD',
    'lyla-lens': 'LL',
    'chip-chance': 'CC',
    'barnaby-bargain': 'BB',
    'pip-parade': 'PP',
    'agnes-alley': 'AA',
    'dottie-daly': 'DD',
    'peggy-plank': 'PG',
    'mr-buck-coinsworth': 'BC',
    'fern-bramble': 'FB',
    'stanley-stamp': 'SS',
    'bobby-gill': 'BG',
  };

  function loadImage(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  }

  async function applyFaces(group) {
    const THREE = window.__snugThree;
    if (!THREE || !group) return;
    for (const [id, mark] of Object.entries(FACES)) {
      try {
        const npc = (group.children || []).find((child) => child.userData?.npcId === id);
        const mesh = npc ? npc.getObjectByName(`PrimitiveFace_${mark}`) : null;
        if (!mesh || !mesh.material) continue;
        const v2 = new Set(['lyla-lens','barnaby-bargain','pip-parade','agnes-alley','dottie-daly','peggy-plank','fern-bramble','stanley-stamp','bobby-gill','chip-chance','mr-buck-coinsworth']);
        const img = await loadImage(`assets/npc-faces/npc-${id}-face${v2.has(id) ? '-v2' : ''}.png`);
        if (!img) continue;
        const texture = new THREE.Texture(img);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.flipY = true;
        texture.anisotropy = 4;
        texture.needsUpdate = true;
        if (mesh.material.map) mesh.material.map.dispose();
        mesh.material.map = texture;
        mesh.material.needsUpdate = true;
      } catch (error) {
        console.warn('[npc faces] could not apply face', id, error);
      }
    }
  }

  /* ---- Welcome-cinematic faces (Mayor Mayor + Gideon) ----
   * The cinematic bundle draws its shared face on a 256px canvas and calls
   * window.__snugCinematicFaceDraw(ctx, kind) if present, so each figure
   * gets a distinct face. kind is "mayor" | "gideon" | "press".
   */
  window.__snugCinematicFaceDraw = function (ctx, kind) {
    const ink = '#2c3437';
    ctx.strokeStyle = ink;
    ctx.fillStyle = ink;
    ctx.lineCap = 'round';
    const eye = (x, y, rx, ry) => {
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
    };
    const brow = (x1, y1, cx, cy, x2, y2, w) => {
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(cx, cy, x2, y2);
      ctx.stroke();
    };
    if (kind === 'mayor') {
      // Showman: big arched brows, wide starry eyes, beauty mark.
      brow(52, 66, 82, 44, 112, 62, 13);
      brow(144, 62, 174, 44, 204, 66, 13);
      eye(82, 108, 13, 16);
      eye(174, 108, 13, 16);
      ctx.fillStyle = '#fffdf8';
      ctx.beginPath(); ctx.arc(86, 102, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(178, 102, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = ink;
      ctx.beginPath(); ctx.arc(208, 148, 5, 0, Math.PI * 2); ctx.fill();
    } else if (kind === 'gideon') {
      // Older tour guide: bushy brows, kind droopy eyes, smile lines.
      ctx.lineWidth = 16;
      ctx.beginPath(); ctx.moveTo(54, 78); ctx.quadraticCurveTo(82, 62, 112, 76); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(144, 76); ctx.quadraticCurveTo(174, 62, 202, 78); ctx.stroke();
      eye(82, 112, 12, 10);
      eye(174, 112, 12, 10);
      ctx.lineWidth = 6;
      ctx.beginPath(); ctx.moveTo(62, 132); ctx.quadraticCurveTo(82, 140, 102, 132); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(154, 132); ctx.quadraticCurveTo(174, 140, 194, 132); ctx.stroke();
    } else {
      // Press (Lyla) + fallback: the classic two-dot gaze.
      ctx.lineWidth = 15;
      ctx.beginPath(); ctx.arc(82, 102, 10, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(174, 102, 10, 0, Math.PI * 2); ctx.fill();
    }
  };

  window.addEventListener('snug-npc-roster-ready', (event) => {
    applyFaces(event.detail?.group);
  });
})();

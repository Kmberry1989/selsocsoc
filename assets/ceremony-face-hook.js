/* Ceremony face hook — MUST stay a plain early script, not a feature chunk.
 *
 * Why: the chunk loader's loadFeatures() waits for 'snug-start-entered',
 * which fires only AFTER the welcoming ceremony closes. A feature chunk
 * (npc-faces.js) therefore loads after the ceremony is already built and
 * disposed, so a hook registered there can never reach the ceremony
 * figures. This script runs at page parse time — before any user click —
 * so the hook is registered and the three PNGs are preloading long
 * before the ceremony builds.
 *
 * How: the classic ceremony bundle draws each figure's face on a 256px
 * canvas through window.__snugCinematicFaceDraw(ctx, kind) when present
 * (kinds: mayor | gideon | press). This hook drawImages the detailed
 * v2 face PNG synchronously when it is complete, and falls back to the
 * primitive drawing (same faces the bundle draws on its own) when the
 * image is not ready yet — never a blank face.
 *
 * Limit: only faces have a hook. The ceremony figures' bodies are built
 * with flat colors inside the bundle's private scene (disposed when the
 * ceremony closes), so there is no reachable way to texture them without
 * editing the bundle itself. Faces = v2, bodies = flat colors.
 */
(function () {
  var KIND_TO_ID = { mayor: 'mayor-mayor', gideon: 'gideon', press: 'lyla-lens' };
  var imgs = {};
  Object.keys(KIND_TO_ID).forEach(function (kind) {
    var img = new Image();
    img.src = 'assets/npc-faces/npc-' + KIND_TO_ID[kind] + '-face-v2.png';
    imgs[kind] = img;
  });

  function drawPrimitive(ctx, kind) {
    var ink = '#2c3437';
    ctx.strokeStyle = ink;
    ctx.fillStyle = ink;
    ctx.lineCap = 'round';
    function eye(x, y, rx, ry) {
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    function brow(x1, y1, cx, cy, x2, y2, w) {
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.quadraticCurveTo(cx, cy, x2, y2);
      ctx.stroke();
    }
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
  }

  window.__snugCinematicFaceDraw = function (ctx, kind) {
    if (!ctx) return;
    var img = imgs[kind];
    if (img && img.complete && img.naturalWidth > 0) {
      ctx.clearRect(0, 0, 256, 256);
      ctx.drawImage(img, 0, 0, 256, 256);
      return;
    }
    drawPrimitive(ctx, kind);
  };
})();

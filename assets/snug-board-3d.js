// Snug Board 3D — board layout, movement mapping, and the THREE renderer.
//
// The pure helpers at the top have no DOM or THREE dependency so they can be
// unit-tested in plain node. The renderer at the bottom is loaded lazily:
// THREE is imported dynamically only when a 3D view is actually mounted, and
// a mount failure falls back to the flat DOM map (the caller supplies it).
//
// Movement mapping (protocol-preserving): tapping a tile or dragging your
// piece onto a tile posts exactly the same board-roll event the old roll
// button posted — { round, roll, usedBoost, route } — with roll set to the
// number of spaces along the route to the tapped tile. Reach is capped at
// the same 1..6 die (1..9 with a boost) the derivation already clamps to,
// so a tapped tile is always the tile the piece lands on. No derivation,
// shop, item, or score code changes.

// Structural constants. These mirror assets/multiplayer.js (BOARD_*); the
// verification harness asserts they match, so a drift fails loudly instead
// of silently moving pieces to the wrong tiles.
export const BOARD_MAIN_LENGTH = 24;
export const BOARD_ROUTE_JUNCTION = 4;
export const BOARD_NEIGHBORHOOD_END = 9;
export const BOARD_MARKET_START = 24;
export const BOARD_MARKET_END = 26;
export const BOARD_TILE_SPACING = 1.35;
export const BOARD_TILE_SIZE = 1.05;

export function boardNextSpace3d(position, route = 'neighborhood') {
  if (position === BOARD_ROUTE_JUNCTION) {
    return route === 'market' ? BOARD_MARKET_START : BOARD_ROUTE_JUNCTION + 1;
  }
  if (position >= BOARD_MARKET_START && position < BOARD_MARKET_END) return position + 1;
  if (position === BOARD_NEIGHBORHOOD_END || position === BOARD_MARKET_END) return 10;
  return (position + 1) % BOARD_MAIN_LENGTH;
}

// Grid coordinates for every tile, in board units. The main loop is a
// rectangle (bottom 0-6, right 7-11, top 12-18, left 19-23); the market
// shortcut is a chord inside the loop from the junction (tile 4) toward
// the rejoin (tile 10). Every pair of tile centers sits at least one tile
// width apart — the harness checks this, so tiles never overlap.
const TILE_GRID = [];
for (let index = 0; index <= 6; index += 1) TILE_GRID.push([index, 0]);
for (let index = 7; index <= 11; index += 1) TILE_GRID.push([6, index - 6]);
for (let index = 12; index <= 18; index += 1) TILE_GRID.push([17 - index, 5]);
for (let index = 19; index <= 23; index += 1) TILE_GRID.push([-1, 23 - index]);
TILE_GRID.push([4.5, 1.0]);
TILE_GRID.push([5.0, 2.0]);
TILE_GRID.push([5.0, 3.4]);

export function boardTilePosition(index) {
  const grid = TILE_GRID[index];
  if (!grid) return null;
  return { x: (grid[0] - 2.5) * BOARD_TILE_SPACING, z: (grid[1] - 2.5) * BOARD_TILE_SPACING };
}

export function boardTileGrid(index) {
  return TILE_GRID[index] ? [...TILE_GRID[index]] : null;
}

// Every tile reachable from `from` within maxSteps, with the route and
// distance that gets there. When both routes reach a tile, the shorter
// distance wins; ties go to the neighborhood path.
export function boardReachableTiles(from, maxSteps) {
  const found = new Map();
  for (const route of ['neighborhood', 'market']) {
    let position = from;
    for (let step = 1; step <= maxSteps; step += 1) {
      position = boardNextSpace3d(position, route);
      const existing = found.get(position);
      if (!existing || step < existing.distance) {
        found.set(position, { distance: step, route });
      }
    }
  }
  return found;
}

// Map a tapped/dropped tile to the board-roll event payload, or null when
// the move is not legal right now (not your turn, shop pending, or the
// tile is out of reach). The caller posts the returned payload unchanged.
export function boardMoveForTile(game, uid, tileIndex, useBoost = false) {
  if (!game || game.phase !== 'movement') return null;
  const me = game.players?.find((entry) => entry.uid === uid);
  if (!me) return null;
  if (game.players[game.turnIndex]?.uid !== uid) return null;
  if (game.shopUid === uid) return null;
  const hasBoost = (me.items?.boost || 0) > 0;
  const maxSteps = 6 + (useBoost && hasBoost ? 3 : 0);
  const hit = boardReachableTiles(me.pos, maxSteps).get(tileIndex);
  if (!hit) return null;
  return { roll: hit.distance, route: hit.route, usedBoost: Boolean(useBoost && hasBoost) };
}

const TILE_COLORS = {
  start: 0xdcebd4,
  coin: 0xf6e4a7,
  event: 0xd8e4f2,
  minigame: 0xf3d3c9,
  shop: 0xd8e7de,
  star: 0x26383b,
};

const PIECE_STACK_OFFSETS = [
  [0, 0],
  [0.3, 0],
  [-0.3, 0],
  [0, 0.3],
];

// The controller owns one THREE scene and one canvas. The canvas survives
// the board shell's innerHTML rebuilds: every sync re-appends it into the
// fresh wrap element, so the GL context is never recreated mid-game.
export function createBoard3dController({ fallbackHtml, onHover, onMove }) {
  let three = null;
  let renderer = null;
  let scene = null;
  let camera = null;
  let canvas = null;
  let tiles = [];
  let pieces = new Map();
  let starMarker = null;
  let raf = 0;
  let disposed = false;
  let failed = false;
  let starting = null;
  let wrapEl = null;
  let readoutEl = null;
  let resizeObserver = null;
  let hoverLabel = '';
  let hoverTile = -1;
  let drag = null;
  let lastGame = null;
  let lastOpts = null;
  let lastFallbackKey = '';

  function safeThreeColor(value, fallback = 0x888888) {
    try {
      return new three.Color(value);
    } catch {
      return new three.Color(fallback);
    }
  }

  function setReadout(text) {
    hoverLabel = text || '';
    if (readoutEl) readoutEl.textContent = hoverLabel;
  }

  function tileWorld(index) {
    const pos = boardTilePosition(index);
    return pos ? { x: pos.x, z: pos.z } : null;
  }

  function pieceTarget(player, residents) {
    const pos = tileWorld(player.pos);
    if (!pos) return null;
    const slot = Math.max(0, residents.indexOf(player.uid));
    const offset = PIECE_STACK_OFFSETS[slot % PIECE_STACK_OFFSETS.length];
    return { x: pos.x + offset[0], z: pos.z + offset[1] };
  }

  async function ensureStarted() {
    if (starting) return starting;
    starting = (async () => {
      three = await import('./vendor/three/three.module.js');
      renderer = new three.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      scene = new three.Scene();
      scene.background = new three.Color(0xcfe0bd);
      camera = new three.PerspectiveCamera(42, 4 / 3, 0.1, 100);
      scene.add(new three.HemisphereLight(0xffffff, 0x9db98a, 1.0));
      const sun = new three.DirectionalLight(0xffffff, 1.2);
      sun.position.set(5, 10, 4);
      scene.add(sun);
      const ground = new three.Mesh(
        new three.PlaneGeometry(14, 11),
        new three.MeshStandardMaterial({ color: 0xd7e5c4 }),
      );
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = -0.13;
      ground.userData.ground = true;
      scene.add(ground);
      canvas = renderer.domElement;
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.touchAction = 'none';
      canvas.addEventListener('pointerdown', handlePointerDown);
      canvas.addEventListener('pointermove', handlePointerMove);
      canvas.addEventListener('pointerup', handlePointerUp);
      canvas.addEventListener('pointercancel', handlePointerUp);
      const loop = () => {
        if (disposed) return;
        raf = requestAnimationFrame(loop);
        const time = performance.now() / 1000;
        if (starMarker) {
          starMarker.rotation.y = time * 1.4;
          starMarker.position.y = 1.05 + Math.sin(time * 2.2) * 0.08;
        }
        for (const piece of pieces.values()) {
          if (drag && drag.uid === piece.userData.uid) continue;
          const target = piece.userData.target;
          if (!target) continue;
          piece.position.x += (target.x - piece.position.x) * 0.16;
          piece.position.z += (target.z - piece.position.z) * 0.16;
        }
        if (renderer && scene && camera) renderer.render(scene, camera);
      };
      raf = requestAnimationFrame(loop);
    })();
    return starting;
  }

  function buildTiles(tileTypes) {
    for (const tile of tiles) scene.remove(tile);
    tiles = [];
    for (let index = 0; index < tileTypes.length; index += 1) {
      const pos = tileWorld(index);
      if (!pos) continue;
      const material = new three.MeshStandardMaterial({
        color: TILE_COLORS[tileTypes[index]] ?? 0xdcebd4,
        emissive: 0x000000,
        emissiveIntensity: 0,
      });
      const mesh = new three.Mesh(new three.BoxGeometry(BOARD_TILE_SIZE, 0.25, BOARD_TILE_SIZE), material);
      mesh.position.set(pos.x, 0, pos.z);
      mesh.userData.tileIndex = index;
      mesh.userData.baseEmissive = 0x000000;
      scene.add(mesh);
      tiles.push(mesh);
    }
    const markerMaterial = new three.MeshStandardMaterial({
      color: 0xffcf3d, emissive: 0xffb400, emissiveIntensity: 0.7,
    });
    starMarker = new three.Mesh(new three.OctahedronGeometry(0.28), markerMaterial);
    starMarker.visible = false;
    scene.add(starMarker);
  }

  function syncPieces(game) {
    const residentsByTile = new Map();
    for (const player of game.players) {
      if (!residentsByTile.has(player.pos)) residentsByTile.set(player.pos, []);
      residentsByTile.get(player.pos).push(player.uid);
    }
    const seen = new Set();
    for (const player of game.players) {
      seen.add(player.uid);
      let piece = pieces.get(player.uid);
      if (!piece) {
        piece = new three.Group();
        const body = new three.Mesh(
          new three.CapsuleGeometry(0.2, 0.35, 4, 12),
          new three.MeshStandardMaterial({ color: safeThreeColor(player.color) }),
        );
        body.position.y = 0.42;
        const head = new three.Mesh(
          new three.CylinderGeometry(0.16, 0.16, 0.12, 20),
          new three.MeshStandardMaterial({ color: 0xfff6e8 }),
        );
        head.position.y = 0.88;
        piece.add(body, head);
        piece.userData.uid = player.uid;
        scene.add(piece);
        const start = pieceTarget(player, residentsByTile.get(player.pos) || [player.uid]);
        if (start) piece.position.set(start.x, 0.25, start.z);
        pieces.set(player.uid, piece);
      }
      piece.userData.target = pieceTarget(player, residentsByTile.get(player.pos) || [player.uid]);
      const bodyMaterial = piece.children[0]?.material;
      if (bodyMaterial) bodyMaterial.color = safeThreeColor(player.color);
    }
    for (const [uid, piece] of pieces) {
      if (!seen.has(uid)) {
        scene.remove(piece);
        pieces.delete(uid);
      }
    }
  }

  function syncHighlights(game, opts) {
    const reachable = opts.reachable || new Map();
    for (const tile of tiles) {
      const index = tile.userData.tileIndex;
      const hit = reachable.get(index);
      const material = tile.material;
      if (hit) {
        material.emissive = new three.Color(0xffd94d);
        material.emissiveIntensity = index === hoverTile ? 0.95 : 0.55;
        tile.position.y = 0.08;
      } else {
        material.emissive = new three.Color(0x000000);
        material.emissiveIntensity = 0;
        tile.position.y = 0;
      }
      const trapped = (game.traps || []).some((entry) => entry.active && entry.space === index);
      tile.userData.trapped = trapped;
      if (trapped) {
        material.emissive = new three.Color(0xc0392b);
        material.emissiveIntensity = 0.35;
      }
    }
    if (starMarker) {
      const prizePos = game.prizePos;
      const prizeTile = tiles.find((tile) => tile.userData.tileIndex === prizePos);
      if (prizeTile && game.phase !== 'ended') {
        starMarker.visible = true;
        starMarker.position.set(prizeTile.position.x, 1.05, prizeTile.position.z);
      } else {
        starMarker.visible = false;
      }
    }
  }

  function fitCamera() {
    if (!renderer || !camera || !wrapEl) return;
    const width = wrapEl.clientWidth || 1;
    const height = wrapEl.clientHeight || 1;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    const distance = 15.2 * Math.max(1, 1.05 / camera.aspect);
    camera.position.set(0, distance * 0.75, distance * 0.66);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }

  function attach() {
    if (!canvas || !wrapEl) return;
    if (canvas.parentElement !== wrapEl) wrapEl.appendChild(canvas);
    if (!resizeObserver) {
      resizeObserver = new ResizeObserver(() => fitCamera());
    }
    resizeObserver.disconnect();
    resizeObserver.observe(wrapEl);
    fitCamera();
  }

  function pointerToGround(event) {
    const rect = canvas.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const raycaster = new three.Raycaster();
    raycaster.setFromCamera({ x: nx, y: ny }, camera);
    const plane = new three.Plane(new three.Vector3(0, 1, 0), -0.25);
    const point = new three.Vector3();
    return raycaster.ray.intersectPlane(plane, point) ? point : null;
  }

  function pickTile(event) {
    const rect = canvas.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const raycaster = new three.Raycaster();
    raycaster.setFromCamera({ x: nx, y: ny }, camera);
    const hits = raycaster.intersectObjects(tiles, false);
    return hits.length ? hits[0].object.userData.tileIndex : -1;
  }

  function pickOwnPiece(event) {
    if (!lastGame || !lastOpts?.canMove) return null;
    const rect = canvas.getBoundingClientRect();
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    const raycaster = new three.Raycaster();
    raycaster.setFromCamera({ x: nx, y: ny }, camera);
    const piece = pieces.get(lastOpts.myUid);
    if (!piece) return null;
    const hits = raycaster.intersectObjects(piece.children, true);
    return hits.length ? piece : null;
  }

  function nearestReachableTile(point) {
    if (!lastOpts?.reachable) return -1;
    let best = -1;
    let bestDistance = 0.9;
    for (const index of lastOpts.reachable.keys()) {
      const pos = tileWorld(index);
      if (!pos) continue;
      const distance = Math.hypot(point.x - pos.x, point.z - pos.z);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = index;
      }
    }
    return best;
  }

  function handlePointerDown(event) {
    if (!lastGame || !lastOpts?.canMove) return;
    const piece = pickOwnPiece(event);
    if (piece) {
      drag = {
        uid: lastOpts.myUid,
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
      };
      try {
        canvas.setPointerCapture(event.pointerId);
      } catch {
        // Pointer capture is best-effort; dragging still works without it.
      }
      return;
    }
    drag = {
      tap: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startAt: performance.now(),
      tile: pickTile(event),
    };
  }

  function handlePointerMove(event) {
    if (!lastGame || !lastOpts?.canMove) return;
    if (drag && !drag.tap && drag.pointerId === event.pointerId) {
      const point = pointerToGround(event);
      const piece = pieces.get(drag.uid);
      if (point && piece) {
        piece.position.x = Math.max(-5.5, Math.min(5.5, point.x));
        piece.position.z = Math.max(-4.2, Math.min(4.2, point.z));
        const target = nearestReachableTile(point);
        if (target !== hoverTile) {
          hoverTile = target;
          if (lastGame) syncHighlights(lastGame, lastOpts);
        }
      }
      return;
    }
    if (!drag) {
      const tile = pickTile(event);
      const nextHover = lastOpts.reachable?.has(tile) ? tile : -1;
      if (nextHover !== hoverTile) {
        hoverTile = nextHover;
        if (lastGame) syncHighlights(lastGame, lastOpts);
      }
      canvas.style.cursor = nextHover >= 0 ? 'pointer' : 'default';
      if (tile >= 0) {
        const type = lastOpts.tileTypes?.[tile];
        const label = type === 'star'
          ? `Tile ${tile}: prize stop${tile === lastGame.prizePos ? ' — the live prize star' : ''}`
          : `Tile ${tile}: ${type || 'space'}`;
        setReadout(label);
        if (onHover) onHover(label);
      } else {
        setReadout(lastOpts.canMove ? 'Tap a glowing tile or drag your piece to move.' : '');
        if (onHover) onHover('');
      }
    }
  }

  function handlePointerUp(event) {
    if (!drag || drag.pointerId !== event.pointerId) return;
    const finished = drag;
    drag = null;
    hoverTile = -1;
    if (lastGame) syncHighlights(lastGame, lastOpts);
    if (finished.tap) {
      const moved = Math.hypot(event.clientX - finished.startX, event.clientY - finished.startY);
      const quick = performance.now() - finished.startAt < 500;
      if (moved < 8 && quick && finished.tile >= 0 && lastOpts?.reachable?.has(finished.tile)) {
        onMove?.(finished.tile);
      }
      return;
    }
    const point = pointerToGround(event);
    if (!point) return;
    const target = nearestReachableTile(point);
    if (target >= 0) onMove?.(target);
  }

  function sync(wrap, readout, game, opts) {
    wrapEl = wrap;
    readoutEl = readout;
    lastGame = game;
    lastOpts = opts;
    if (failed) {
      const key = `${game.id}-${game.round}-${game.phase}-${game.turnIndex}`;
      if (wrapEl && lastFallbackKey !== key) {
        lastFallbackKey = key;
        wrapEl.innerHTML = fallbackHtml(game);
      }
      return;
    }
    if (!starting) {
      starting = ensureStarted().catch(() => {
        failed = true;
        lastFallbackKey = '';
        sync(wrap, readout, game, opts);
      });
      return;
    }
    starting.then(() => {
      if (disposed || failed) return;
      if (wrapEl !== wrap) return;
      attach();
      if (!tiles.length) buildTiles(opts.tileTypes || []);
      syncPieces(game);
      syncHighlights(game, opts);
      setReadout(hoverLabel || (opts.canMove ? 'Tap a glowing tile or drag your piece to move.' : ''));
    }).catch(() => {
      failed = true;
      lastFallbackKey = '';
      sync(wrap, readout, game, opts);
    });
  }

  function dispose() {
    disposed = true;
    if (raf) cancelAnimationFrame(raf);
    if (resizeObserver) resizeObserver.disconnect();
    if (canvas) {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointercancel', handlePointerUp);
      canvas.remove();
    }
    if (renderer) renderer.dispose();
    if (scene) {
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        for (const material of materials) {
          if (material) material.dispose();
        }
      });
    }
    tiles = [];
    pieces.clear();
    starMarker = null;
    renderer = null;
    scene = null;
    camera = null;
    canvas = null;
  }

  return { dispose, sync };
}

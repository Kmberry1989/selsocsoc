/* roster-player-override.js — interim town-player roster unification.
 *
 * User decision (2026-10-27): players and NPCs share the game roster
 * anatomy. This file converts ONLY town player groups to roster
 * proportions, in place, without editing the minified bundle.
 *
 * Roster canon (scale 1): capsule body r 0.29 / cyl 0.54, centre y 0.66;
 * coin-head cylinder r 0.34 / depth 0.15 at y 1.66; face circle r 0.30 at
 * z 0.083; shoulder disc r 0.27 / thickness 0.045 at y 0.97; hands sphere
 * r 0.13 at x ±0.46, y 0.68; feet boxes 0.25 x 0.14 x 0.42 at x ±0.19,
 * y 0.15. Outfit wrap offset.x = 0.25 is a roster-builder concern and is
 * NOT applied here (see KNOWN GAPS).
 *
 * SCALING DECISION (explicit): the peg builder bakes bodyMass (P, clamped
 * 0.78–1.28) and heightScale (L, clamped 0.82–1.22) into geometry. This
 * override mirrors the peg's own scaling semantics instead of dropping
 * them: horizontal roster dimensions scale by P, vertical ones by L,
 * and part sizes that the peg did NOT scale (head radius, hand/foot
 * sizes, face circle) stay fixed. Body radius scales by P because mass
 * defines body width in the peg, and shoulder radius scales by P to stay
 * proportional to the body. At P = L = 1 every number is exactly roster
 * canon: body centre 0.66, head 1.66, hands (±0.46, 0.68), feet (±0.19,
 * 0.15), shoulder 0.97.
 *
 * NPC SAFETY (non-negotiable): NPC roster groups already fit their v2
 * wraparound outfits and must stay exactly as they are. This file NEVER
 * traverses the scene graph looking for figures to convert, because
 * scene traversal cannot reliably tell a remote player from an NPC or
 * from a demo figure. A group is converted only if it passes the strict
 * peg-contract gate in isPlayerGroup() AND it is either the local
 * avatar (snug-avatar-ready detail / window.__snugPlayerAvatar) or a
 * value of window.__snugWorld.remotes. Everything else — NPCs, demo
 * figures, ceremony figures — is left untouched.
 *
 * TIMING: the bundle dispatches snug-avatar-ready synchronously, then
 * attaches cosmetics (hairstyle, outfit, faceWear at z 0.24, facialHair
 * at y −0.1 / z 0.14) in the same flow. So the bases/positions swap
 * runs synchronously inside the event listener (before cosmetics), and
 * the face-cosmetic re-anchor runs deferred (setTimeout 0 / 500 ms),
 * after attachment. Geometry replacement is async only because THREE
 * must be imported; it swaps mesh geometry inside the existing groups,
 * so the per-frame tick and cosmetic parents keep working.
 *
 * KNOWN GAPS (deliberately not guessed away):
 *  - GLB outfits (and GLB shoes) are authored for the peg cylinder and
 *    will misfit a capsule body. There is no PNG wraparound path for
 *    the town player in the bundle (0 references to outfit-textures),
 *    so this file does not retarget outfits. Only a source rebuild
 *    fixes outfit fit.
 *  - Demo/village figures built with the same peg builder but stored
 *    nowhere (not the local avatar, not in __snugWorld.remotes) are NOT
 *    converted, because converting arbitrary peg-contract groups would
 *    risk NPCs. They stay peg-shaped until a source rebuild.
 *  - Showcase/Accessory hat and accessory anchors are editor-invented
 *    and are not re-anchored here; in-town hats ride on coinHead and
 *    survive automatically.
 */
(function () {
  'use strict';

  var ROSTER = {
    bodyRadius: 0.29, bodyLength: 0.54, bodyCentre: 0.66,
    headRadius: 0.34, headDepth: 0.15, headY: 1.66,
    faceRadius: 0.30, faceZ: 0.083,
    shoulderRadius: 0.27, shoulderThick: 0.045, shoulderY: 0.97,
    handRadius: 0.13, thumbRadius: 0.052, handX: 0.46, handY: 0.68,
    footW: 0.25, footH: 0.14, footD: 0.42, footX: 0.19, footY: 0.15,
    footZ: 0.045, footMeshZ: 0.08
  };

  // THREE: prefer the real module (Capsule/Box/Circle geometry). The
  // bundle's window.__snugThree exposes only Sphere/Cylinder/Plane, so
  // it is a fallback, not the primary source (see swapGeometry()).
  var threePromise = null;
  try {
    threePromise = import('./assets/vendor/three/three.module.js');
  } catch (err) { threePromise = Promise.reject(err); }
  threePromise = threePromise.catch(function () { return null; });

  function isFiniteNum(v) { return typeof v === 'number' && isFinite(v); }
  function approx(v, target, tol) {
    return isFiniteNum(v) && Math.abs(v - target) <= (tol || 0.02);
  }

  function isPlayerGroup(g) {
    if (!g || !g.userData) return false;
    var ud = g.userData;
    // NPC markers: reject outright, whatever else matches.
    if (ud.attachmentSlots || ud.npcId) return false;
    if (ud.head && !ud.coinHead) return false; // roster groups: head, not coinHead
    if (g.parent && g.parent.name === 'CylindricalCityNPCs') return false;
    // Strict peg contract from buildPegAvatar (kM).
    if (!ud.body || !ud.body.isMesh) return false;
    if (!ud.coinHead) return false;
    if (!isFiniteNum(ud.bodyBase) || !isFiniteNum(ud.headBase)) return false;
    if (!Array.isArray(ud.hands) || ud.hands.length !== 2) return false;
    if (!Array.isArray(ud.handBases) || ud.handBases.length !== 2) return false;
    if (!Array.isArray(ud.feet) || ud.feet.length !== 2) return false;
    if (!Array.isArray(ud.footBases) || ud.footBases.length !== 2) return false;
    if (!isFiniteNum(ud.bodyMass) || !isFiniteNum(ud.heightScale)) return false;
    if (!ud.contactShadow) return false;
    // NPC children carry Primitive*/FaceSlot_/InteractionHitbox_ names;
    // peg groups never do. Cheap guard for any group that slipped through.
    var npcNamed = false;
    try {
      g.traverse(function (child) {
        if (typeof child.name === 'string' && (
          child.name.indexOf('Primitive') === 0 ||
          child.name.indexOf('FaceSlot_') === 0 ||
          child.name.indexOf('InteractionHitbox_') === 0
        )) npcNamed = true;
      });
    } catch (err) { /* traverse failure -> treat as not a player */ return false; }
    if (npcNamed) return false;
    return true;
  }

  function isAuthoritativePlayer(g) {
    if (!g) return false;
    if (g === window.__snugPlayerAvatar) return true;
    var remotes = window.__snugWorld && window.__snugWorld.remotes;
    if (remotes) {
      try {
        var values = typeof remotes.values === 'function'
          ? Array.from(remotes.values()) : Object.values(remotes);
        if (values.indexOf(g) !== -1) return true;
      } catch (err) { /* fall through */ }
    }
    return false;
  }

  function scales(ud) {
    return { P: ud.bodyMass, L: ud.heightScale };
  }

  // Phase A (synchronous, runs inside snug-avatar-ready before the
  // bundle attaches cosmetics): positions + userData bases only.
  function swapBases(g) {
    var ud = g.userData, s = scales(ud);
    var bodyY = ROSTER.bodyCentre * s.L;
    var headY = ROSTER.headY * s.L;
    ud.bodyBase = bodyY;
    ud.headBase = headY;
    if (ud.body) ud.body.position.y = bodyY;
    if (ud.coinHead) ud.coinHead.position.y = headY;
    ud.hands.forEach(function (hand, i) {
      var side = hand.position.x < 0 ? -1 : (hand.position.x > 0 ? 1 : (i === 0 ? -1 : 1));
      hand.position.set(side * ROSTER.handX * s.P, ROSTER.handY * s.L, 0);
    });
    ud.handBases = ud.hands.map(function (h) { return h.position.clone(); });
    ud.feet.forEach(function (foot, i) {
      var side = foot.position.x < 0 ? -1 : (foot.position.x > 0 ? 1 : (i === 0 ? -1 : 1));
      foot.position.set(side * ROSTER.footX * s.P, ROSTER.footY, ROSTER.footZ);
    });
    ud.footBases = ud.feet.map(function (f) { return f.position.clone(); });
    // Speaking mouth rides inside coinHead; bring it in front of the
    // 0.15-deep coin head (front face z 0.075) instead of the peg's 0.142.
    var mouth = ud.speakingMouth;
    if (mouth && mouth.position && approx(mouth.position.z, 0.142, 0.01)) {
      mouth.position.z = 0.09;
    }
    ud.rosterOverride = 'bases';
  }

  function isPegDetail(child) {
    // Peg body caps (radius ~0.365–0.415, height < 0.1) and rim pegs
    // (radius <= 0.012). GLB cosmetic groups are Groups, not meshes
    // with cylinder geometry, so this does not eat cosmetics.
    if (!child || !child.isMesh || !child.geometry) return false;
    if (child.geometry.type !== 'CylinderGeometry') return false;
    var p = child.geometry.parameters || {};
    var r = p.radiusTop;
    if (typeof r !== 'number') return false;
    if (r <= 0.012) return true;
    return r >= 0.35 && r <= 0.42 && (p.height || 0) < 0.1;
  }

  function isPegHeadDisc(child) {
    // The three peg head discs sit at the head-group origin; the hat
    // disc (r 0.43, y 0.34) and cone are NOT at the origin and survive.
    if (!child || !child.isMesh || !child.geometry) return false;
    if (child.geometry.type !== 'CylinderGeometry') return false;
    var p = child.geometry.parameters || {};
    var r = p.radiusTop;
    if (typeof r !== 'number') return false;
    if (r <= 0.012) return true; // rim pegs
    if (Math.abs(child.position.x) > 0.01 || Math.abs(child.position.y) > 0.01) return false;
    return approx(r, 0.425, 0.01) || approx(r, 0.40, 0.01) || approx(r, 0.412, 0.01);
  }

  // Phase B: geometry replacement inside the existing groups.
  function swapGeometry(g, THREE) {
    var ud = g.userData, s = scales(ud);
    var lib = THREE || window.__snugThree || {};
    if (!lib.Mesh || !lib.CylinderGeometry || !lib.SphereGeometry) return false;

    // --- Body: capsule (or cylinder + sphere caps fallback) ---
    var bodyMat = ud.body.material;
    ud.body.children.slice().forEach(function (child) {
      if (isPegDetail(child)) ud.body.remove(child);
    });
    if (lib.CapsuleGeometry) {
      ud.body.geometry = new lib.CapsuleGeometry(
        ROSTER.bodyRadius * s.P, ROSTER.bodyLength * s.L, 6, 20);
    } else {
      ud.body.geometry = new lib.CylinderGeometry(
        ROSTER.bodyRadius * s.P, ROSTER.bodyRadius * s.P,
        ROSTER.bodyLength * s.L, 24);
      [-1, 1].forEach(function (side) {
        var cap = new lib.Mesh(
          new lib.SphereGeometry(ROSTER.bodyRadius * s.P, 20, 14), bodyMat);
        cap.position.y = side * (ROSTER.bodyLength * s.L) / 2;
        cap.castShadow = true;
        ud.body.add(cap);
      });
    }
    // --- Shoulder disc ---
    if (!ud.body.parent || !g.getObjectByName('RosterShoulderDisc')) {
      var shoulder = new lib.Mesh(
        new lib.CylinderGeometry(ROSTER.shoulderRadius * s.P,
          ROSTER.shoulderRadius * s.P, ROSTER.shoulderThick, 24), bodyMat);
      shoulder.rotation.x = Math.PI / 2;
      shoulder.position.y = ROSTER.shoulderY * s.L;
      shoulder.name = 'RosterShoulderDisc';
      shoulder.castShadow = true;
      g.add(shoulder);
    }
    // --- Head: single coin cylinder, keep hat/face/mouth/cosmetics ---
    var head = ud.coinHead;
    var skinMat = null;
    head.children.slice().forEach(function (child) {
      if (isPegHeadDisc(child)) {
        if (!skinMat && child.material) skinMat = child.material;
        head.remove(child);
      }
    });
    if (!skinMat) skinMat = bodyMat;
    var coin = new lib.Mesh(
      new lib.CylinderGeometry(ROSTER.headRadius, ROSTER.headRadius,
        ROSTER.headDepth, 32), skinMat);
    coin.rotation.x = Math.PI / 2;
    coin.castShadow = true;
    head.add(coin);
    // --- Face: same material/atlas, circle instead of 0.82 square ---
    // Texture offset frame switching operates on the texture, not the
    // geometry, so the 3x3 selfie atlas keeps working on the circle.
    if (ud.face && ud.face.isMesh) {
      if (lib.CircleGeometry) {
        ud.face.geometry = new lib.CircleGeometry(ROSTER.faceRadius, 40);
      } else if (lib.PlaneGeometry) {
        // Fallback only (module import failed): smaller square, not a
        // circle, at roster face depth. Documented, not silent.
        ud.face.geometry = new lib.PlaneGeometry(0.60, 0.60);
      }
      ud.face.position.z = ROSTER.faceZ;
    }
    // --- Hands: sphere 0.13 + thumb 0.052, no wrist cylinder ---
    ud.hands.forEach(function (hand) {
      hand.children.slice().forEach(function (child) {
        if (!child.isMesh || !child.geometry) return;
        var t = child.geometry.type, p = child.geometry.parameters || {};
        if (t === 'SphereGeometry' && approx(p.radius, 0.14, 0.01)) {
          child.geometry = new lib.SphereGeometry(ROSTER.handRadius, 18, 12);
        } else if (t === 'SphereGeometry' && approx(p.radius, 0.065, 0.01)) {
          child.geometry = new lib.SphereGeometry(ROSTER.thumbRadius, 14, 10);
        } else if (t === 'CylinderGeometry' && approx(p.radiusTop, 0.105, 0.01)) {
          hand.remove(child); // peg wrist cylinder; roster has no wrist
        }
      });
    });
    // --- Feet: box 0.25 x 0.14 x 0.42 (or 4-sided prism fallback) ---
    ud.feet.forEach(function (foot) {
      var footMat = null;
      foot.children.slice().forEach(function (child) {
        if (child.isMesh && child.geometry &&
            child.geometry.type === 'CylinderGeometry') {
          if (!footMat && child.material) footMat = child.material;
          foot.remove(child);
        }
      });
      if (!footMat) footMat = bodyMat;
      var box;
      if (lib.BoxGeometry) {
        box = new lib.Mesh(
          new lib.BoxGeometry(ROSTER.footW, ROSTER.footH, ROSTER.footD), footMat);
        box.position.set(0, 0, ROSTER.footMeshZ);
        box.rotation.x = -0.08;
      } else {
        box = new lib.Mesh(
          new lib.CylinderGeometry(0.177, 0.177, ROSTER.footH, 4), footMat);
        box.rotation.y = Math.PI / 4;
        box.position.set(0, 0, ROSTER.footMeshZ);
      }
      box.castShadow = true;
      foot.add(box);
    });
    ud.rosterOverride = 'full';
    return true;
  }

  // Phase C (deferred, after the bundle attaches cosmetics): re-anchor
  // face/body cosmetics from peg offsets to coin-head offsets.
  function reanchorCosmetics(g) {
    var ud = g.userData;
    if (ud.coinHead) {
      ud.coinHead.children.forEach(function (child) {
        if (!child || child.userData.rosterReanchored) return;
        if (child === ud.face || child === ud.speakingMouth) return;
        if (approx(child.position.z, 0.24, 0.02) && approx(child.position.y, 0, 0.02)) {
          child.position.z = 0.10; // faceWear: was 0.24, coin front is 0.075
          child.userData.rosterReanchored = true;
        } else if (approx(child.position.z, 0.14, 0.02) && approx(child.position.y, -0.1, 0.02)) {
          child.position.z = 0.10; // facialHair: was 0.14
          child.userData.rosterReanchored = true;
        }
      });
    }
    if (ud.body) {
      ud.body.children.forEach(function (child) {
        if (!child || child.userData.rosterReanchored) return;
        if (approx(child.position.z, -0.42, 0.02) && approx(child.position.y, 0.04, 0.02)) {
          child.position.z = -0.31; // backItem: peg back was -0.40, capsule back is -0.29
          child.userData.rosterReanchored = true;
        }
      });
    }
  }

  function convert(g) {
    if (!g || g.userData.rosterOverride) return false;
    if (!isPlayerGroup(g) || !isAuthoritativePlayer(g)) return false;
    try { swapBases(g); } catch (err) {
      console.warn('[roster-override] base swap failed', err);
      return false;
    }
    var geometryDone = false;
    var runGeometry = function (THREE) {
      if (geometryDone) return;
      try {
        if (swapGeometry(g, THREE)) geometryDone = true;
      } catch (err) {
        console.warn('[roster-override] geometry swap failed', err);
      }
    };
    threePromise.then(function (THREE) { if (THREE) runGeometry(THREE); });
    // If the module import has not resolved 1.5 s after conversion,
    // fall back to the bundle's exposed THREE classes (capsule/box/
    // circle approximated, see swapGeometry). The figure must not stay
    // peg-shaped indefinitely on a slow import.
    setTimeout(function () {
      if (!geometryDone) runGeometry(null);
    }, 1500);
    setTimeout(function () { try { reanchorCosmetics(g); } catch (err) {} }, 0);
    setTimeout(function () { try { reanchorCosmetics(g); } catch (err) {} }, 500);
    return true;
  }

  function sweepRemotes() {
    try {
      var avatar = window.__snugPlayerAvatar;
      if (avatar) convert(avatar);
      var remotes = window.__snugWorld && window.__snugWorld.remotes;
      if (remotes) {
        var values = typeof remotes.values === 'function'
          ? Array.from(remotes.values()) : Object.values(remotes);
        values.forEach(function (group) { convert(group); });
      }
    } catch (err) {
      console.warn('[roster-override] remote sweep failed', err);
    }
  }

  window.addEventListener('snug-avatar-ready', function (event) {
    var avatar = (event && event.detail && event.detail.avatar) ||
      window.__snugPlayerAvatar;
    if (avatar) convert(avatar);
    setTimeout(sweepRemotes, 0);
  });
  // The bundle's snug-remote-players handler creates remote groups
  // during dispatch; our deferred sweep runs after it, so the groups
  // exist by then. Listener registration order therefore does not matter.
  window.addEventListener('snug-remote-players', function () {
    setTimeout(sweepRemotes, 0);
  });
  window.addEventListener('snug-world-ready', function () {
    setTimeout(sweepRemotes, 0);
  });
  // Cheap late-join safety net: the remotes Map is tiny (one entry per
  // remote player), so a 5 s scan of the map — never the scene graph —
  // costs nothing and catches players created outside the events above.
  // It never converts a group that is not already in the remotes Map.
  setInterval(sweepRemotes, 5000);

  // If this script loads after the avatar already exists (e.g. a
  // re-injection), convert what is already there instead of waiting
  // for an event that will not fire again.
  setTimeout(sweepRemotes, 0);

  window.__snugRosterOverride = {
    version: 1,
    convert: convert,
    sweepRemotes: sweepRemotes,
    isPlayerGroup: isPlayerGroup,
    ROSTER: ROSTER
  };
})();

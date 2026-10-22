/* snug-cinematic-player-v1
 * Plays Cinematic Studio sequences (schema selsocsoc.cinematic.v1) in town.
 * A sequence JSON dropped into assets/cinematics/ plays with:
 *   window.__snugCinematicPlayer.playFile('<id>')
 * or by opening the game with ?cine=<id>.
 *
 * Playback runs in its own overlay scene (same pattern as the welcome
 * cinematic) so it never fights the town camera, the roster bob tick, or
 * player input: figures are roster-style (capsule body, floating coin head
 * at 1.66, painted face + wraparound outfit from the live NPC manifest),
 * poses are the studio's 8 poses, camera keys drive an overlay camera,
 * lighting keys scale the overlay lights, and dialogue lines show as
 * subtitles. Input locks during playback (Skip button + Esc end early)
 * unless playback.nonInteractive is false. Everything is guarded: a bad
 * file, a missing texture, or no WebGL ends with a warning, never a crash.
 */
(function () {
  'use strict';
  if (window.__snugCinematicPlayer) return;

  var DEFAULT_SKIN = 0xc99a56;
  var SPAWNS = {
    'stage-left': [-2.5, 0, 0.5], 'stage-right': [2.5, 0, 0.5],
    'center': [0, 0, 0], 'stage-center': [0, 0, 0]
  };
  var FRAME_FOV = { wide: 46, medium: 38, close: 30 };

  var threePromise = null;
  function getThree() {
    if (!threePromise) {
      threePromise = import(new URL('assets/vendor/three/three.module.js', document.baseURI).href)
        .catch(function () { return null; });
    }
    return threePromise;
  }

  var manifestPromise = null;
  function getManifest() {
    if (!manifestPromise) {
      manifestPromise = fetch(new URL('assets/npc/manifest.json', document.baseURI).href)
        .then(function (r) { if (!r.ok) throw new Error('manifest ' + r.status); return r.json(); })
        .catch(function () { return null; });
    }
    return manifestPromise;
  }

  function toast(msg) {
    try {
      var el = document.createElement('div');
      el.textContent = msg;
      el.style.cssText = 'position:fixed;left:50%;bottom:84px;transform:translateX(-50%);background:rgba(20,20,20,.92);color:#fff;font:600 14px system-ui;padding:10px 16px;border-radius:12px;z-index:100000;max-width:88vw;text-align:center;';
      document.body.appendChild(el);
      setTimeout(function () { el.remove(); }, 3500);
    } catch (_) { /* ignore */ }
    try { console.warn('[cinematic-player]', msg); } catch (_) {}
  }

  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp01(x) { return x < 0 ? 0 : x > 1 ? 1 : x; }
  function smooth(x) { return x * x * (3 - 2 * x); }
  // Envelope: ramps a beat's pose in over 0.25s and out over its last 0.25s.
  function envelope(local, dur) {
    if (dur <= 0) return 1;
    var inn = clamp01(local / 0.25);
    var out = clamp01((dur - local) / 0.25);
    return Math.min(inn, out);
  }

  function wraparoundUVs(THREE, geo) {
    var src = geo.index ? geo.toNonIndexed() : geo.clone();
    var pos = src.getAttribute('position');
    var uv = new Float32Array(pos.count * 2);
    var minY = Infinity, maxY = -Infinity, i;
    for (i = 0; i < pos.count; i++) {
      minY = Math.min(minY, pos.getY(i));
      maxY = Math.max(maxY, pos.getY(i));
    }
    var h = Math.max(0.0001, maxY - minY);
    for (i = 0; i < pos.count; i++) {
      var theta = Math.atan2(pos.getX(i), pos.getZ(i));
      var u = 0.5 - theta / (Math.PI * 2);
      uv[i * 2] = ((u % 1) + 1) % 1;
      uv[i * 2 + 1] = (pos.getY(i) - minY) / h;
    }
    src.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    src.computeVertexNormals();
    return src;
  }

  function makeTexture(THREE, url) {
    return new Promise(function (res, rej) {
      new THREE.TextureLoader().load(url, function (t) {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 4;
        res(t);
      }, undefined, rej);
    });
  }

  // One roster-style figure: capsule body, floating coin head (1.66, as in
  // the game), painted face, hands, shoes. Returns part refs for poses.
  async function buildFigure(THREE, scene, spec, manifest) {
    var g = new THREE.Group();
    var skin = new THREE.MeshStandardMaterial({ color: DEFAULT_SKIN, roughness: 0.7 });
    var char = null;
    if (manifest && spec.id !== 'player') {
      char = (manifest.characters || []).find(function (c) { return c.id === spec.id; }) || null;
    }
    var outfitTex = null, faceTex = null;
    try {
      if (char && char.outfitUrl) {
        outfitTex = await makeTexture(THREE, new URL(char.outfitUrl, document.baseURI).href);
        outfitTex.wrapS = THREE.RepeatWrapping;
      }
    } catch (_) { outfitTex = null; }
    try {
      if (char && char.faceUrl) {
        faceTex = await makeTexture(THREE, new URL(char.faceUrl, document.baseURI).href);
      }
    } catch (_) { faceTex = null; }

    var bodyMat = outfitTex
      ? new THREE.MeshStandardMaterial({ map: outfitTex, roughness: 0.85 })
      : new THREE.MeshStandardMaterial({ color: 0x4a6b8a, roughness: 0.85 });
    var bodyGeo = wraparoundUVs(THREE, new THREE.CapsuleGeometry(0.29, 0.54, 8, 20));
    var body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.66; body.castShadow = true; g.add(body);
    var shoulders = new THREE.Mesh(
      new THREE.CylinderGeometry(0.27, 0.27, 0.045, 22), bodyMat);
    shoulders.rotation.x = Math.PI / 2; shoulders.position.y = 0.97; g.add(shoulders);

    var head = new THREE.Group();
    head.position.y = 1.66; g.add(head);
    var coin = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.15, 32), skin);
    coin.rotation.x = Math.PI / 2; coin.castShadow = true; head.add(coin);
    var faceMat = faceTex
      ? new THREE.MeshBasicMaterial({ map: faceTex, transparent: true })
      : new THREE.MeshBasicMaterial({ color: DEFAULT_SKIN });
    var face = new THREE.Mesh(new THREE.CircleGeometry(0.30, 40), faceMat);
    face.position.z = 0.083; head.add(face);

    function hand(side) {
      var h = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 10), skin);
      h.position.set(0.46 * side, 0.68, 0); h.castShadow = true; g.add(h); return h;
    }
    function shoe(side) {
      var s = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.14, 0.42),
        new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.9 }));
      s.position.set(0.19 * side, 0.15, 0.045); g.add(s); return s;
    }
    var fig = {
      group: g, head: head, handL: hand(-1), handR: hand(1),
      shoeL: shoe(-1), shoeR: shoe(1),
      base: { x: 0, y: 0, z: 0, rotY: 0 },
      home: null
    };
    fig.home = snapshot(fig);
    scene.add(g);
    return fig;
  }

  function snapshot(fig) {
    return {
      groupX: fig.group.position.x, groupY: fig.group.position.y, groupZ: fig.group.position.z,
      groupRX: fig.group.rotation.x, groupRY: fig.group.rotation.y, groupRZ: fig.group.rotation.z,
      headRX: fig.head.rotation.x, headRY: fig.head.rotation.y, headRZ: fig.head.rotation.z,
      handLX: fig.handL.position.x, handLY: fig.handL.position.y, handLZ: fig.handL.position.z,
      handLRX: fig.handL.rotation.x, handLRY: fig.handL.rotation.y, handLRZ: fig.handL.rotation.z,
      handRX: fig.handR.position.x, handRY: fig.handR.position.y, handRZ: fig.handR.position.z,
      handRRX: fig.handR.rotation.x, handRRY: fig.handR.rotation.y, handRRZ: fig.handR.rotation.z
    };
  }

  function resetPose(fig) {
    var h = fig.home, g = fig.group;
    g.position.set(h.groupX, h.groupY, h.groupZ);
    g.rotation.set(h.groupRX, h.groupRY, h.groupRZ);
    fig.head.rotation.set(h.headRX, h.headRY, h.headRZ);
    fig.handL.position.set(h.handLX, h.handLY, h.handLZ);
    fig.handL.rotation.set(h.handLRX, h.handLRY, h.handLRZ);
    fig.handR.position.set(h.handRX, h.handRY, h.handRZ);
    fig.handR.rotation.set(h.handRRX, h.handRRY, h.handRRZ);
  }

  // Pose offsets. t is seconds into the beat (for oscillations), env is the
  // beat envelope (0..1). All offsets add on top of the base pose.
  function applyPose(fig, pose, t, env, base) {
    var g = fig.group;
    switch (pose) {
      case 'bow':
        g.rotation.x = 0.30 * env;
        fig.head.rotation.x = 0.45 * env;
        break;
      case 'wave':
        fig.handR.position.y = 0.68 + 0.38 * env;
        fig.handR.rotation.z = (-0.5 + Math.sin(t * 10) * 0.5) * env;
        break;
      case 'cheer':
        g.position.y = Math.abs(Math.sin(t * 6)) * 0.25 * env;
        fig.handL.position.y = 0.68 + 0.32 * env; fig.handL.rotation.z = 0.9 * env;
        fig.handR.position.y = 0.68 + 0.32 * env; fig.handR.rotation.z = -0.9 * env;
        break;
      case 'point':
        fig.handR.position.z = 0.38 * env;
        fig.handR.rotation.x = -1.2 * env;
        fig.head.rotation.y = 0.25 * env;
        break;
      case 'shrug':
        fig.handL.position.x = -0.46 - 0.14 * env;
        fig.handR.position.x = 0.46 + 0.14 * env;
        fig.head.rotation.z = 0.12 * env;
        break;
      case 'think':
        fig.head.rotation.x = -0.15 * env;
        fig.head.rotation.z = 0.18 * env;
        fig.handR.position.set(0.30 * env + 0.46 * (1 - env), 0.68 + 0.62 * env, 0.25 * env);
        break;
      case 'curtsy':
        g.position.y = -0.12 * env;
        g.rotation.x = 0.18 * env;
        break;
      case 'dance':
        g.rotation.y = base.rotY + Math.sin(t * 4) * 0.4 * env;
        g.position.y = Math.abs(Math.sin(t * 8)) * 0.15 * env;
        break;
      default: /* neutral and unknown poses: base pose */
        break;
    }
  }

  function sortedKeys(keys) {
    return (keys || []).slice().sort(function (a, b) { return (a.time || 0) - (b.time || 0); });
  }

  // Interpolated camera state at time t. Keys without a field keep the
  // previous value, so sparse keyframes (lens-only, like the studio's
  // defaults) never snap the shot.
  function cameraAt(cam, t) {
    var keys = cam.keys;
    var pos = cam.basePos.slice(), rot = cam.baseRot.slice(), fov = cam.baseFov;
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if ((k.time || 0) > t) break;
      var next = null;
      for (var j = i + 1; j < keys.length; j++) {
        if (keys[j].position || keys[j].rotationDegrees || keys[j].lens !== undefined || keys[j].frame) { next = keys[j]; break; }
      }
      var span = next ? Math.max(0.001, (next.time || 0) - (k.time || 0)) : 1;
      var f = next ? clamp01((t - (k.time || 0)) / span) : 1;
      if (k.position) {
        var target = next && next.position ? next.position : k.position;
        pos = [lerp(k.position[0], target[0], f), lerp(k.position[1], target[1], f), lerp(k.position[2], target[2], f)];
      }
      if (k.rotationDegrees) {
        var rtarget = next && next.rotationDegrees ? next.rotationDegrees : k.rotationDegrees;
        rot = [lerp(k.rotationDegrees[0], rtarget[0], f), lerp(k.rotationDegrees[1], rtarget[1], f), lerp(k.rotationDegrees[2], rtarget[2], f)];
      }
      if (k.lens !== undefined) fov = k.lens;
      else if (k.frame && FRAME_FOV[k.frame]) fov = FRAME_FOV[k.frame];
    }
    return { pos: pos, rot: rot, fov: fov };
  }

  function lightFactor(keys, t) {
    var ks = sortedKeys(keys);
    var cur = ks.length ? (ks[0].intensity !== undefined ? ks[0].intensity : 1) : 1;
    for (var i = 0; i < ks.length; i++) {
      if ((ks[i].time || 0) > t) break;
      var next = ks[i + 1];
      if (next && next.intensity !== undefined && ks[i].intensity !== undefined) {
        var f = clamp01((t - (ks[i].time || 0)) / Math.max(0.001, (next.time || 0) - (ks[i].time || 0)));
        cur = lerp(ks[i].intensity, next.intensity, f);
      } else if (ks[i].intensity !== undefined) {
        cur = ks[i].intensity;
      }
    }
    return cur;
  }

  var current = null;

  function stop() {
    if (!current) return;
    var c = current; current = null;
    try { cancelAnimationFrame(c.raf); } catch (_) {}
    try { window.removeEventListener('keydown', c.onKey); } catch (_) {}
    try { document.removeEventListener('visibilitychange', c.onVis); } catch (_) {}
    try { if (c._cleanupResize) c._cleanupResize(); } catch (_) {}
    try { c.renderer.dispose(); } catch (_) {}
    try { c.overlay.remove(); } catch (_) {}
    try {
      window.dispatchEvent(new CustomEvent('snug-cinematic-complete', { detail: { id: c.seq.id || null } }));
    } catch (_) {}
  }

  async function play(seq) {
    if (!seq || typeof seq !== 'object') { toast('That cinematic file looks empty.'); return false; }
    if (current) stop();
    var THREE = await getThree();
    if (!THREE) { toast('3D is not available right now, so the cinematic cannot play.'); return false; }
    var manifest = await getManifest();

    var overlay = document.createElement('div');
    overlay.id = 'snug-cine-overlay';
    var locked = !seq.playback || seq.playback.nonInteractive !== false;
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#14262e;' +
      (locked ? '' : 'pointer-events:none;');
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'display:block;width:100%;height:100%;';
    overlay.appendChild(canvas);
    var title = document.createElement('div');
    title.textContent = seq.title || seq.id || 'Cinematic';
    title.style.cssText = 'position:absolute;top:14px;left:16px;color:#fff;font:700 15px system-ui;text-shadow:0 1px 6px #000;';
    overlay.appendChild(title);
    var subs = document.createElement('div');
    subs.style.cssText = 'position:absolute;left:50%;bottom:56px;transform:translateX(-50%);color:#fff;font:700 19px system-ui;text-align:center;text-shadow:0 2px 8px #000,0 0 2px #000;background:rgba(0,0,0,.45);padding:8px 18px;border-radius:12px;max-width:86vw;display:none;';
    overlay.appendChild(subs);
    var skip = null;
    if (locked) {
      skip = document.createElement('button');
      skip.type = 'button'; skip.textContent = 'Skip';
      skip.style.cssText = 'position:absolute;right:16px;bottom:16px;min-height:44px;padding:0 20px;border:0;border-radius:12px;background:#fff;color:#14262e;font:700 15px system-ui;cursor:pointer;';
      skip.addEventListener('click', stop);
      overlay.appendChild(skip);
    }
    document.body.appendChild(overlay);

    var renderer, scene, camera;
    try {
      renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.shadowMap.enabled = true;
      if ('outputColorSpace' in renderer) renderer.outputColorSpace = THREE.SRGBColorSpace;
      else renderer.outputEncoding = THREE.sRGBEncoding;
    } catch (e) {
      overlay.remove();
      toast('3D is not available right now, so the cinematic cannot play.');
      return false;
    }
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x14262e);
    scene.fog = new THREE.Fog(0x14262e, 14, 30);
    camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.rotation.order = 'YXZ';

    var ambient = new THREE.AmbientLight(0x8a97a8, 0.55); scene.add(ambient);
    var keyLight = new THREE.SpotLight(0xffd9a0, 1.15, 32, Math.PI / 5, 0.45, 1);
    keyLight.position.set(4.5, 6.5, 5.5); keyLight.castShadow = true;
    keyLight.target.position.set(0, 1, 0);
    scene.add(keyLight, keyLight.target);
    var fill = new THREE.DirectionalLight(0x9db8d6, 0.35);
    fill.position.set(-5, 3.5, 4); scene.add(fill);
    var ground = new THREE.Mesh(new THREE.CircleGeometry(16, 48),
      new THREE.MeshStandardMaterial({ color: 0x2c3838, roughness: 1 }));
    ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

    // Cast: one figure per actor. Roster NPCs resolve through the manifest;
    // 'player' gets a plain figure. Spawn positions are studio-stage spots.
    var actors = [];
    var list = Array.isArray(seq.actors) ? seq.actors : [];
    for (var ai = 0; ai < list.length; ai++) {
      var spec = list[ai] || {};
      try {
        var fig = await buildFigure(THREE, scene, spec, manifest);
        var spawn = SPAWNS[spec.spawn] || [0, 0, 0];
        fig.group.position.set(spawn[0], spawn[1], spawn[2]);
        fig.base = { x: spawn[0], y: spawn[1], z: spawn[2], rotY: 0 };
        fig.home = snapshot(fig);
        actors.push({
          spec: spec, fig: fig,
          beats: (spec.beats || []).slice().sort(function (a, b) { return (a.time || 0) - (b.time || 0); }),
          movedHome: false
        });
      } catch (e) {
        console.warn('[cinematic-player] could not stage actor', spec.id, e);
      }
    }
    if (!actors.length) {
      // Still play camera/lighting/dialogue over an empty stage rather
      // than failing: the sequence itself remains viewable.
      console.warn('[cinematic-player] sequence has no stageable actors');
    }

    var camDef = seq.camera || {};
    var camT = camDef.transform || {};
    var cam = {
      keys: sortedKeys(camDef.keys || []),
      basePos: camT.position || [0, 1.6, 6.5],
      baseRot: camT.rotationDegrees || [-8, 0, 0],
      baseFov: 38
    };
    var lightKeys = (seq.lighting && seq.lighting.keys) || [];
    var dialogue = Array.isArray(seq.dialogue) ? seq.dialogue : [];
    var duration = seq.duration || 0;
    actors.forEach(function (a) {
      a.beats.forEach(function (b) {
        duration = Math.max(duration, (b.time || 0) + (b.duration || 0));
      });
    });
    if (!duration) duration = 6;

    var lastW = 0, lastH = 0;
    function resize() {
      var w = overlay.clientWidth || window.innerWidth;
      var h = overlay.clientHeight || window.innerHeight;
      if (w === lastW && h === lastH) return;
      lastW = w; lastH = h;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    var state = { seq: seq, raf: 0, overlay: overlay, renderer: renderer, onKey: null, t: 0 };
    state.onKey = function (e) { if (e.key === 'Escape') stop(); };
    if (locked) window.addEventListener('keydown', state.onKey);
    // Wall-clock playback: t comes from elapsed real time, so slow frames
    // (software rendering, background tabs) never stretch the sequence.
    // Hidden time is excluded so a backgrounded tab resumes in sync.
    var startAt = performance.now(), hiddenAt = 0;
    state.onVis = function () {
      var now = performance.now();
      if (document.hidden) hiddenAt = now;
      else if (hiddenAt) { startAt += now - hiddenAt; hiddenAt = 0; }
    };
    document.addEventListener('visibilitychange', state.onVis);
    current = state;

    function frame(now) {
      if (current !== state) return;
      state.t = Math.max(0, (now - startAt) / 1000);
      var t = state.t;

      actors.forEach(function (a) {
        resetPose(a.fig);
        var g = a.fig.group;
        // Start from the spawn spot; a beat with move:true walks the actor
        // to center stage over its duration, and they stay there after.
        g.position.set(a.fig.base.x, a.fig.base.y, a.fig.base.z);
        var active = null;
        for (var i = 0; i < a.beats.length; i++) {
          var b = a.beats[i];
          if (t >= (b.time || 0) && t <= (b.time || 0) + (b.duration || 0)) { active = b; break; }
          if (t > (b.time || 0) + (b.duration || 0) && b.move) a.movedHome = true;
        }
        if (a.movedHome) g.position.set(0, 0, 0);
        if (active) {
          var local = t - (active.time || 0);
          var dur = active.duration || 0;
          var env = envelope(local, dur);
          if (active.move && dur > 0) {
            var f = smooth(clamp01(local / dur));
            g.position.set(
              lerp(a.fig.base.x, 0, f),
              lerp(a.fig.base.y, 0, f),
              lerp(a.fig.base.z, 0, f));
          }
          if (active.hop) g.position.y += Math.abs(Math.sin(local * 8)) * 0.3 * env;
          applyPose(a.fig, active.action || active.pose || 'neutral', local, env, a.fig.base);
        }
      });

      var cs = cameraAt(cam, t);
      camera.position.set(cs.pos[0], cs.pos[1], cs.pos[2]);
      camera.rotation.set(
        cs.rot[0] * Math.PI / 180, cs.rot[1] * Math.PI / 180, cs.rot[2] * Math.PI / 180);
      if (camera.fov !== cs.fov) { camera.fov = cs.fov; camera.updateProjectionMatrix(); }

      var lf = lightFactor(lightKeys, t);
      ambient.intensity = 0.55 * lf;
      keyLight.intensity = 1.15 * lf;
      fill.intensity = 0.35 * lf;

      var line = null;
      for (var di = 0; di < dialogue.length; di++) {
        var d = dialogue[di];
        var start = d.time !== undefined ? d.time : d.start;
        var end = d.end !== undefined ? d.end : (start !== undefined ? start + 3 : undefined);
        if (start !== undefined && t >= start && t <= end) { line = d; break; }
      }
      if (line) {
        subs.textContent = (line.speaker ? line.speaker + ': ' : '') + (line.text || '');
        subs.style.display = 'block';
      } else {
        subs.style.display = 'none';
      }

      resize();
      renderer.render(scene, camera);
      if (t >= duration) { stop(); return; }
      state.raf = requestAnimationFrame(frame);
    }
    state.raf = requestAnimationFrame(frame);
    state._cleanupResize = function () { window.removeEventListener('resize', resize); };
    return true;
  }

  async function playFile(id) {
    if (typeof id !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(id)) {
      toast('That cinematic name is not valid.');
      return false;
    }
    var url = new URL('assets/cinematics/' + id + '.sequence.json', document.baseURI).href;
    var res;
    try { res = await fetch(url); } catch (e) { res = null; }
    if (!res || !res.ok) {
      toast('No cinematic named "' + id + '" was found.');
      return false;
    }
    var seq;
    try { seq = await res.json(); } catch (e) {
      toast('That cinematic file could not be read.');
      return false;
    }
    return play(seq);
  }

  window.__snugCinematicPlayer = { play: play, playFile: playFile, stop: stop,
    playing: function () { return !!current; } };

  // Auto-play ?cine=<id> once the game is past its welcome flow, so a
  // shared link never fights the onboarding ceremony.
  try {
    var params = new URLSearchParams(window.location.search);
    var cineId = params.get('cine');
    if (cineId) {
      var waited = 0;
      var timer = setInterval(function () {
        waited += 500;
        var startOpen = !!document.querySelector('.snug-start-screen');
        var welcomeBusy = !!window.__snugWelcomePending || !!window.__snugWelcomeActive ||
          document.documentElement.classList.contains('snug-start-open');
        if ((!startOpen && !welcomeBusy) || waited >= 60000) {
          clearInterval(timer);
          if (!startOpen && !welcomeBusy) playFile(cineId);
        }
      }, 500);
    }
  } catch (_) { /* URL parsing unavailable; API still works */ }
})();

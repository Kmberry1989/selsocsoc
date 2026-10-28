/* SnugPoseLibrary — game module.
 * Portable pose data (identical to Render Studio's) adapted to the game's
 * procedural avatar structure (userData.body / coinHead / hands[] / feet[]).
 * Additive: attach to any avatar; the controller takes over part transforms
 * via onBeforeRender so it always wins over the procedural idle animation.
 */
(() => {
  'use strict';

  const ZERO = { position: [0, 0, 0], rotation: [0, 0, 0] };
  const part = (position, rotation) => ({
    position: position || ZERO.position.slice(),
    rotation: rotation || ZERO.rotation.slice()
  });
  const complete = (duration, body, head, leftHand, rightHand, leftFoot, rightFoot, label) => ({
    label, duration,
    parts: {
      body: body || part(), head: head || part(),
      leftHand: leftHand || part(), rightHand: rightHand || part(),
      leftFoot: leftFoot || part(), rightFoot: rightFoot || part()
    }
  });

  // Additive transforms relative to the avatar's rest pose.
  const REDUCED_MOTION = typeof window !== 'undefined' &&
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const POSES = Object.freeze({
    neutral: complete(420, part(), part(), part(), part(), part(), part(), 'Neutral'),
    wave: complete(520,
      part([-.018, .01, 0], [0, 0, -.025]), part([0, .015, 0], [0, 0, .11]),
      part([-.02, .03, 0], [0, 0, .05]), part([.08, .82, .04], [.05, 0, -.22]),
      part(), part(), 'Wave'),
    bow: complete(620,
      part([0, -.055, .075], [.32, 0, 0]), part([0, -.105, .16], [.27, 0, 0]),
      part([.05, -.05, .11], [.18, 0, -.05]), part([-.05, -.05, .11], [.18, 0, .05]),
      part([0, 0, .025], [0, 0, 0]), part([0, 0, .025], [0, 0, 0]), 'Bow'),
    cheer: complete(480,
      part([0, .025, 0], [0, 0, 0]), part([0, .04, 0], [0, 0, 0]),
      part([-.12, .84, .015], [0, 0, .18]), part([.12, .84, .015], [0, 0, -.18]),
      part([-.025, .025, 0], [0, 0, -.04]), part([.025, .025, 0], [0, 0, .04]), 'Cheer'),
    point: complete(540,
      part([-.025, .01, 0], [0, -.08, -.025]), part([0, .01, 0], [0, -.26, -.035]),
      part([-.03, .04, 0], [0, 0, .04]), part([.23, .16, .52], [-.18, -.05, -.18]),
      part(), part(), 'Point'),
    shrug: complete(500,
      part([0, .01, 0], [0, 0, .02]), part([0, .02, 0], [0, 0, -.12]),
      part([-.28, .36, .06], [0, 0, -.17]), part([.28, .36, .06], [0, 0, .17]),
      part(), part(), 'Shrug'),
    think: complete(560,
      part([0, 0, 0], [0, .04, 0]), part([0, -.025, 0], [.1, .12, -.12]),
      part([-.03, .02, 0], [0, 0, .04]), part([-.40, .52, .20], [-.15, 0, .10]),
      part(), part(), 'Think'),
    curtsy: complete(600,
      part([.025, -.10, 0], [0, 0, .09]), part([.03, -.07, 0], [0, 0, -.04]),
      part([-.12, .06, .02], [0, 0, .16]), part([.06, .18, .02], [0, 0, -.12]),
      part([.11, 0, .035], [0, 0, .08]), part([-.09, -.025, -.07], [0, 0, -.12]), 'Curtsy'),
    dance: complete(500,
      part([0, .03, 0], [0, .12, 0]), part([0, .02, 0], [0, -.12, .06]),
      part([-.20, .48, .10], [0, 0, -.30]), part([.20, .48, .10], [0, 0, .30]),
      part([-.05, .04, 0], [0, 0, -.06]), part([.05, .04, 0], [0, 0, .06]), 'Dance'),
    sit: complete(600,
      part([0, -.26, .10], [.18, 0, 0]), part([0, -.30, .12], [.12, 0, 0]),
      part([-.08, -.08, .14], [.22, 0, 0]), part([.08, -.08, .14], [.22, 0, 0]),
      part([0, -.14, .30], [.55, 0, 0]), part([0, -.14, .30], [.55, 0, 0]), 'Sit')
  });

  const PART_KEYS = ['body', 'head', 'leftHand', 'rightHand', 'leftFoot', 'rightFoot'];
  const clamp01 = n => Math.max(0, Math.min(1, n));
  const ease = n => { n = clamp01(n); return n * n * (3 - 2 * n); };
  const cloneOffsets = source => {
    const out = {};
    PART_KEYS.forEach(k => {
      const p = source[k] || ZERO;
      out[k] = { position: p.position.slice(), rotation: p.rotation.slice() };
    });
    return out;
  };
  const mixOffsets = (a, b, t) => {
    const out = {};
    PART_KEYS.forEach(k => {
      out[k] = {
        position: [0, 1, 2].map(i => a[k].position[i] + (b[k].position[i] - a[k].position[i]) * t),
        rotation: [0, 1, 2].map(i => a[k].rotation[i] + (b[k].rotation[i] - a[k].rotation[i]) * t)
      };
    });
    return out;
  };

  function resolveParts(avatar) {
    const ud = avatar && avatar.userData;
    if (!ud || !ud.body || !ud.coinHead || !Array.isArray(ud.hands) || !Array.isArray(ud.feet)) return null;
    if (ud.hands.length < 2 || ud.feet.length < 2) return null;
    return {
      body: ud.body, head: ud.coinHead,
      leftHand: ud.hands[0], rightHand: ud.hands[1],
      leftFoot: ud.feet[0], rightFoot: ud.feet[1]
    };
  }

  class GamePoseController {
    constructor(avatar, options) {
      options = options || {};
      const parts = resolveParts(avatar);
      if (!parts) throw new Error('Avatar is missing poseable parts (body/coinHead/hands/feet).');
      this.avatar = avatar;
      this.parts = parts;
      this.base = {};
      PART_KEYS.forEach(key => {
        const node = parts[key];
        this.base[key] = {
          position: [node.position.x, node.position.y, node.position.z],
          rotation: [node.rotation.x, node.rotation.y, node.rotation.z]
        };
      });
      this.phase = Number.isFinite(options.phase) ? options.phase : Math.random() * Math.PI * 2;
      // Reduced motion: no idle sway, poses snap instead of easing.
      this.alive = options.alive !== false && !REDUCED_MOTION;
      this.pose = 'neutral';
      this.from = cloneOffsets(POSES.neutral.parts);
      this.to = cloneOffsets(POSES.neutral.parts);
      this.current = cloneOffsets(POSES.neutral.parts);
      this.started = performance.now();
      this.duration = POSES.neutral.duration;
      this._hook = null;
    }
    setAlive(on) { this.alive = !!on; }
    setPose(name, now) {
      if (!POSES[name]) name = 'neutral';
      now = Number.isFinite(now) ? now : performance.now();
      this._sample(now);
      this.from = cloneOffsets(this.current);
      this.to = cloneOffsets(POSES[name].parts);
      this.pose = name;
      this.started = now;
      this.duration = POSES[name].duration;
    }
    _sample(now) {
      // Reduced motion: snap to the target pose instead of easing.
      const t = REDUCED_MOTION ? 1 : (this.duration ? ease((now - this.started) / this.duration) : 1);
      this.current = mixOffsets(this.from, this.to, t);
    }
    update(now) {
      this._sample(now);
      const seconds = now * .001, phase = this.phase;
      const motion = {};
      PART_KEYS.forEach(key => motion[key] = { position: [0, 0, 0], rotation: [0, 0, 0] });
      if (this.alive) {
        motion.body.position[0] = Math.sin(now * .00115 + phase) * .009;
        motion.body.position[1] = Math.sin(now * .00155 + phase) * .035;
        motion.body.rotation[2] = Math.sin(now * .00115 + phase) * .014;
        motion.body.rotation[1] = Math.sin(now * .00095 + phase) * .011;
        motion.head.position[1] = Math.sin(now * .0022 + phase) * .025;
        motion.head.rotation[2] = Math.sin(now * .00115 + phase + .4) * .012;
        motion.leftHand.position[1] = Math.sin(now * .0025 + phase) * .025;
        motion.rightHand.position[1] = Math.sin(now * .0025 + phase + 1) * .025;
        motion.leftFoot.position[1] = Math.max(0, Math.sin(now * .0022 + phase)) * 0.018;
        motion.rightFoot.position[1] = Math.max(0, Math.sin(now * .0022 + phase + Math.PI)) * 0.018;
        if (this.pose === 'wave') motion.rightHand.rotation[2] = Math.sin(seconds * 6.6 + phase) * .12;
        if (this.pose === 'cheer') {
          const hop = Math.max(0, Math.sin(seconds * 4.2 + phase)) * .034;
          PART_KEYS.forEach(key => motion[key].position[1] += hop);
          motion.leftHand.rotation[2] += Math.sin(seconds * 5.2 + phase) * .035;
          motion.rightHand.rotation[2] -= Math.sin(seconds * 5.2 + phase) * .035;
        }
        if (this.pose === 'dance') {
          const beat = Math.sin(seconds * 7 + phase);
          motion.body.position[1] += Math.abs(beat) * .04;
          motion.body.rotation[2] += beat * .06;
          motion.leftHand.position[1] += Math.max(0, beat) * .10;
          motion.rightHand.position[1] += Math.max(0, -beat) * .10;
          motion.head.rotation[2] += beat * .05;
        }
      }
      PART_KEYS.forEach(key => {
        const node = this.parts[key], base = this.base[key],
              pose = this.current[key], add = motion[key];
        node.position.set(
          base.position[0] + pose.position[0] + add.position[0],
          base.position[1] + pose.position[1] + add.position[1],
          base.position[2] + pose.position[2] + add.position[2]);
        node.rotation.set(
          base.rotation[0] + pose.rotation[0] + add.rotation[0],
          base.rotation[1] + pose.rotation[1] + add.rotation[1],
          base.rotation[2] + pose.rotation[2] + add.rotation[2]);
      });
    }
    start() {
      if (this._hook) return;
      const body = this.parts.body;
      const prev = body.onBeforeRender;
      this._hook = () => this.update(performance.now());
      body.onBeforeRender = (...args) => {
        if (typeof prev === 'function') { try { prev.apply(body, args); } catch (_) {} }
        this._hook();
      };
    }
    stop() {
      if (!this._hook) return;
      this._hook = null;
      // Restore base pose so the procedural animation resumes cleanly.
      PART_KEYS.forEach(key => {
        const node = this.parts[key], b = this.base[key];
        node.position.set(b.position[0], b.position[1], b.position[2]);
        node.rotation.set(b.rotation[0], b.rotation[1], b.rotation[2]);
      });
    }
  }

  const attached = new WeakMap();
  function attach(avatar, options) {
    if (attached.has(avatar)) return attached.get(avatar);
    const controller = new GamePoseController(avatar, options);
    controller.start();
    attached.set(avatar, controller);
    return controller;
  }
  function setPose(avatar, name) {
    const controller = attached.get(avatar) || attach(avatar);
    controller.setPose(name);
    return controller;
  }
  function detach(avatar) {
    const controller = attached.get(avatar);
    if (controller) { controller.stop(); attached.delete(avatar); }
  }

  // NPC contextual pose presets.
  const NPC_POSES = Object.freeze({
    'chip-chance': 'cheer', 'pip-parade': 'cheer', 'dottie-daly': 'wave',
    'lyla-lens': 'point', 'stanley-stamp': 'wave', 'peggy-plank': 'think',
    'mr-buck-coinsworth': 'shrug', 'agnes-alley': 'bow', 'barnaby-bargain': 'shrug',
    'fern-bramble': 'bow', 'bobby-gill': 'think'
  });

  // Game emote bar (wave, dance, cheer, laugh, love, sleepy, party, heart)
  // mapped onto the pose library. Call triggerEmote(name) with the player avatar.
  const EMOTE_POSES = Object.freeze({
    wave: 'wave', dance: 'dance', cheer: 'cheer', laugh: 'cheer',
    love: 'bow', sleepy: 'neutral', party: 'dance', heart: 'bow'
  });
  function triggerEmote(emoteName, avatar) {
    const target = avatar || (window.__snugWorld && window.__snugWorld.player) || window.__snugPlayerAvatar;
    if (!target) return null;
    return setPose(target, EMOTE_POSES[String(emoteName || '').toLowerCase()] || 'neutral');
  }

  // Explicit opt-in only: call attach()/setPose() when a system (photo mode,
  // emotes, cutscenes) wants pose control. No auto-attach, so the game's
  // own avatar animation is never fought.

  window.__snugPoses = Object.freeze({
    POSES, GamePoseController, NPC_POSES, EMOTE_POSES,
    attach, detach, setPose, triggerEmote,
    poseNames: Object.freeze(Object.keys(POSES))
  });
})();

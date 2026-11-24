(() => {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const TAU = Math.PI * 2;

  // Standard mouth (2026-11-22): the same mouth for every NPC — the
  // welcome ceremony's makeMouth design. Idle: a smile arc. Speaking:
  // the arc opens into a filled ellipse whose height follows the talk
  // level. No per-NPC random morphing, no rotation: every character
  // reads with the same mouth. Canvas 256x160 and plane 0.36x0.22 match
  // the welcome ceremony exactly.
  function paint(mouth, level, now) {
    const { canvas, context, texture } = mouth;
    const open = Math.max(0, Math.min(1, level));
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (open < 0.12) {
      context.strokeStyle = "#5b3a2a";
      context.lineWidth = 10;
      context.lineCap = "round";
      context.beginPath();
      context.arc(128, 62, 52, Math.PI * 0.15, Math.PI * 0.85);
      context.stroke();
    } else {
      context.fillStyle = "#5b3a2a";
      context.beginPath();
      context.ellipse(128, 80, 52, 12 + open * 52, 0, 0, Math.PI * 2);
      context.fill();
    }
    texture.needsUpdate = true;
  }

  function attach(parent, constructors = {}) {
    if (!parent || !constructors.Mesh || !constructors.PlaneGeometry || !constructors.Material || !constructors.Texture) return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 160;
    const context = canvas.getContext("2d");
    const texture = new constructors.Texture(canvas);
    texture.needsUpdate = true;
    // The canvas is drawn in sRGB; without this the renderer treats it as
    // linear and the dark brown mouth renders washed-out grey.
    texture.colorSpace = 'srgb';
    const material = new constructors.Material({
      map: texture,
      transparent: true,
      depthWrite: false,
      alphaTest: 0.02,
      roughness: 0.92,
      color: "#ffffff",
    });
    // Standard size (welcome ceremony): 0.36 wide, 0.22 tall. The legacy
    // size param (0.19, sized for the old blob dot) is ignored on purpose.
    const mesh = new constructors.Mesh(new constructors.PlaneGeometry(0.36, 0.22), material);
    mesh.name = "CylindricSpeakingMouth";
    mesh.position.set(Number(constructors.x) || 0, Number(constructors.y) || -0.145, Number(constructors.z) || 0.142);
    mesh.renderOrder = 12;
    mesh.frustumCulled = false;
    mesh.castShadow = false;
    parent.add(mesh);
    const mouth = {
      canvas, context, texture, mesh, level: 0, phase: Math.random() * TAU,
      // Talking-mix state (user-directed 2026-10-28: a mix of all four
      // demo styles). Word index / line / mood arrive from the dialogue
      // speaker via window.__snugTalk* (see npc-roster.js y8); when they
      // are absent the tick falls back to the plain lip-flap cadence.
      lastWord: -1, wordStart: 0, wordSyllables: 1, avgWordMs: 400,
      lastBoundaryAt: 0, popStart: 0,
    };
    paint(mouth, 0, 0);
    return mouth;
  }

  function tick(mouth, speaking, now = performance.now(), delta = 1 / 60) {
    if (!mouth?.mesh || !mouth.context) return;
    const reduced = reducedMotion.matches;
    const cadence = 0.5 + 0.5 * Math.sin(now * 0.013 + mouth.phase);
    const breathPause = Math.sin(now * 0.0031 + mouth.phase * 1.7) < -0.72;
    // --- talking mix: word-pop + syllable bounce ---
    // Word index comes from speech-synthesis boundary events; a new word
    // pops the mouth (word-pop) and restarts the syllable clock.
    let syllableBoost = 0, popBoost = 0;
    const talkWord = window.__snugTalkWord;
    const talkLine = window.__snugTalkLine;
    if (speaking && !reduced && typeof talkWord === 'number' && talkLine) {
      if (talkWord !== mouth.lastWord) {
        if (mouth.lastWord >= 0 && mouth.lastBoundaryAt) {
          const gap = now - mouth.lastBoundaryAt;
          if (gap > 80 && gap < 2000) mouth.avgWordMs = mouth.avgWordMs * 0.7 + gap * 0.3;
        }
        mouth.lastBoundaryAt = now;
        mouth.lastWord = talkWord;
        mouth.popStart = now;
        const words = String(talkLine).split(/\s+/).filter(Boolean);
        const word = words[talkWord] || '';
        const syl = (word.toLowerCase().match(/[aeiouy]+/g) || []).length;
        mouth.wordSyllables = Math.max(1, syl);
        mouth.wordStart = now;
      }
      const elapsed = now - mouth.wordStart;
      const progress = Math.min(1, elapsed / Math.max(120, mouth.avgWordMs));
      syllableBoost = 0.22 * Math.max(0, Math.sin(progress * mouth.wordSyllables * Math.PI * 2));
      if (now - mouth.popStart < 180) {
        popBoost = 0.30 * Math.sin(Math.PI * (now - mouth.popStart) / 180);
      }
    } else if (!speaking) {
      mouth.lastWord = -1;
    }
    const target = speaking ? (breathPause ? 0.1 : reduced ? 0.32 : Math.min(1, 0.55 + cadence * 0.45 + syllableBoost)) : 0;
    const response = Math.min(1, Math.max(0.08, Number(delta) * (speaking ? 11 : 7)));
    mouth.level += (target - mouth.level) * response;

    paint(mouth, reduced ? Math.min(0.3, mouth.level) : mouth.level, now);
    // Gentle scale with the talk level, no rotation, no random morph.
    const scale = (0.94 + mouth.level * 0.16) * (1 + popBoost);
    mouth.mesh.scale.set(scale, scale, 1);
  }

  window.CylindricSpeakingMouth = Object.freeze({ attach, tick });
})();

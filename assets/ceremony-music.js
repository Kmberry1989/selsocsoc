// assets/ceremony-music.js — soft synth pad under the welcoming ceremony dialogue.
//
// Plain early script (page-parse time, next to ceremony-face-hook.js): the ceremony
// runs before feature chunks load, so this cannot live in snug-audio.js, which only
// loads after the ceremony closes. Procedural only — no audio file.
//
// Lifecycle: armed when the ceremony opens (snug-start-welcome), started on the
// first gesture inside the ceremony (pointerdown, or Enter/Space — autoplay policy
// forbids starting before a gesture), faded out on ceremony close (the
// snug-welcome-active class coming off) or on snug-start-entered, whichever comes
// first, so it never overlaps the town plaza track. Restartable for ceremony replays.
(function () {
  'use strict';

  // Gentle, consonant cycle, one chord roughly every 8 seconds, no melody.
  var CHORDS = [
    [130.81, 261.63, 329.63, 392.00], // C major
    [110.00, 220.00, 261.63, 329.63], // A minor
    [174.61, 220.00, 261.63, 349.23], // F major
    [196.00, 246.94, 293.66, 392.00]  // G major
  ];
  var CHORD_SECS = 8;
  var FADE_IN_SECS = 1.8;
  var FADE_OUT_SECS = 1.4;
  var PEAK = 0.11; // Sits under TTS dialogue; below the town music cap of 0.18.
  var NOTE_GAIN = 0.30;

  var ctx = null;
  var master = null;
  var voices = []; // [{osc, gain}]
  var chordTimer = null;
  var chordIndex = 0;
  var teardownTimer = null;
  var armed = false;
  var playing = false;
  var stopping = false;

  function ensureCtx() {
    if (ctx) return true;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.connect(ctx.destination);
    return true;
  }

  function playChord(freqs) {
    if (!ctx) return;
    var now = ctx.currentTime;
    var outgoing = voices;
    voices = [];
    outgoing.forEach(function (v) {
      try {
        v.gain.gain.cancelScheduledValues(now);
        v.gain.gain.setValueAtTime(v.gain.gain.value, now);
        v.gain.gain.linearRampToValueAtTime(0, now + 1.5);
        v.osc.stop(now + 1.6);
      } catch (e) { /* already stopped */ }
    });
    freqs.forEach(function (freq, i) {
      var osc = ctx.createOscillator();
      var gain = ctx.createGain();
      osc.type = i < 2 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(NOTE_GAIN, now + 2.0);
      osc.connect(gain);
      gain.connect(master);
      osc.start(now);
      voices.push({ osc: osc, gain: gain });
    });
  }

  function advanceChord() {
    chordIndex = (chordIndex + 1) % CHORDS.length;
    playChord(CHORDS[chordIndex]);
  }

  function start() {
    if (playing || !armed) return;
    if (!ensureCtx()) return;
    if (ctx.state === 'suspended') ctx.resume();
    if (teardownTimer) {
      clearTimeout(teardownTimer);
      teardownTimer = null;
    }
    stopping = false;
    var now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(PEAK, now + FADE_IN_SECS);
    if (!voices.length) {
      chordIndex = 0;
      playChord(CHORDS[0]);
    }
    if (chordTimer) clearInterval(chordTimer);
    chordTimer = setInterval(advanceChord, CHORD_SECS * 1000);
    playing = true;
  }

  function stop() {
    if (!playing && !stopping) return;
    armed = false;
    if (chordTimer) {
      clearInterval(chordTimer);
      chordTimer = null;
    }
    if (!ctx || !master) {
      playing = false;
      stopping = false;
      return;
    }
    stopping = true;
    playing = false;
    var now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(master.gain.value, now);
    master.gain.linearRampToValueAtTime(0, now + FADE_OUT_SECS);
    if (teardownTimer) clearTimeout(teardownTimer);
    teardownTimer = setTimeout(function () {
      teardownTimer = null;
      voices.forEach(function (v) {
        try { v.osc.stop(); } catch (e) { /* already stopped */ }
        try { v.gain.disconnect(); } catch (e) { /* already gone */ }
      });
      voices = [];
      var old = ctx;
      ctx = null;
      master = null;
      stopping = false;
      if (old) {
        try {
          var p = old.close();
          if (p && p.catch) p.catch(function () {});
        } catch (e) { /* ignore */ }
      }
    }, FADE_OUT_SECS * 1000 + 150);
  }

  function arm() {
    armed = true;
  }

  function onGesture(e) {
    if (!armed || playing) return;
    if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
    // Only start while a ceremony is actually open (bundle sets both of these
    // when it builds; a stray welcome event without a ceremony must not start
    // music over the start screen or town).
    var open = window.__snugWelcomeActive === true ||
      (document.documentElement && document.documentElement.classList.contains('snug-welcome-active'));
    if (!open) return;
    start();
  }

  window.addEventListener('snug-start-welcome', arm);
  window.addEventListener('snug-start-entered', stop);
  document.addEventListener('pointerdown', onGesture);
  document.addEventListener('keydown', onGesture);

  // Close path also removes the welcome class; stop on that too, whichever first.
  if (window.MutationObserver && document.documentElement) {
    var observer = new MutationObserver(function () {
      if (playing && !document.documentElement.classList.contains('snug-welcome-active')) {
        stop();
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  }

  // Already inside a ceremony (e.g. script evaluated late): arm immediately.
  if (window.__snugWelcomeActive === true ||
      (document.documentElement && document.documentElement.classList.contains('snug-welcome-active'))) {
    arm();
  }

  window.__snugCeremonyMusic = { start: start, stop: stop };
})();

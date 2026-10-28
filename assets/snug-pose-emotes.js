/* Snug pose emotes — wires game events to 3D avatar poses.
 * - Emote bar: observes emoji buttons, triggers matching 3D pose on tap.
 * - Rewards: listens for snug-award-coins, celebrates with a cheer.
 * Poses are momentary: the avatar returns to neutral after a few seconds.
 */
(() => {
  'use strict';
  if (window.__snugPoseEmotes) return;
  window.__snugPoseEmotes = true;

  const EMOJI_TO_EMOTE = {
    '👋': 'wave',
    '💃': 'dance', '🕺': 'dance',
    '🎉': 'cheer', '📣': 'cheer',
    '😂': 'laugh', '🤣': 'laugh',
    '❤️': 'love', '😍': 'love', '♥️': 'love', '♥': 'love',
    '😴': 'sleepy', '💤': 'sleepy',
    '🎊': 'party', '🥳': 'party',
    '💖': 'heart', '💝': 'heart', '💗': 'heart'
  };

  let revertTimer = 0;
  function playerAvatar() {
    return (window.__snugWorld && window.__snugWorld.player) || window.__snugPlayerAvatar || null;
  }
  function pose(name, holdMs) {
    if (!window.__snugPoses) return;
    const player = playerAvatar();
    if (!player) return;
    try { window.__snugPoses.setPose(player, name); } catch (_) { return; }
    clearTimeout(revertTimer);
    revertTimer = setTimeout(() => {
      try { window.__snugPoses.setPose(player, 'neutral'); } catch (_) {}
    }, holdMs || 2600);
  }
  function emotePose(emoteName) {
    // Map game emotes onto the pose library (dance/sit added in v2).
    const map = {
      wave: 'wave', dance: 'dance', cheer: 'cheer', laugh: 'cheer',
      love: 'bow', sleepy: 'neutral', party: 'dance', heart: 'bow'
    };
    pose(map[String(emoteName || '').toLowerCase()] || 'neutral', 2600);
  }

  // Celebrate shell rewards (daily check, quest/minigame payouts).
  window.addEventListener('snug-award-coins', () => pose('cheer', 3000));

  // Find emote buttons by their emoji and wire them once.
  const wired = new WeakSet();
  function scan() {
    if (!window.__snugPoses) return;
    document.querySelectorAll('button').forEach((btn) => {
      if (wired.has(btn)) return;
      const text = (btn.textContent || '').trim();
      const emote = EMOJI_TO_EMOTE[text];
      if (!emote) return;
      wired.add(btn);
      btn.addEventListener('click', () => emotePose(emote));
    });
  }
  const timer = setInterval(scan, 1500);
  scan();
  // Stop scanning after 5 minutes; the bar is long since found by then.
  setTimeout(() => clearInterval(timer), 5 * 60 * 1000);
})();

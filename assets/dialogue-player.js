// Dialogue player: plays Dialogue Scripter packs in town.
// A pack is the editor's export: {scenes:[{id,title,location,nodes:[
// {id,speaker,line,emotion,animation,condition,advance,next,
// choices:[{label,next,condition}]}]}]}.
// Drop a pack at assets/dialogue/<packId>.json, then open the game with
// ?dialogue=<packId> or ?dialogue=<packId>:<sceneId>.
// v1 notes: conditions are not evaluated (every branch is offered);
// animation/audioCue are carried in the data but not performed.
(function () {
  'use strict';

  var current = null;

  function toast(msg) {
    try {
      var t = document.createElement('div');
      t.textContent = msg;
      t.style.cssText = 'position:fixed;left:50%;bottom:120px;transform:translateX(-50%);background:#1d2b22;color:#f3f5f1;padding:10px 16px;border-radius:10px;font:600 14px system-ui;z-index:10001;box-shadow:0 8px 30px rgba(0,0,0,.4);';
      document.body.appendChild(t);
      setTimeout(function () { t.remove(); }, 3500);
    } catch (_) {}
    console.warn('[dialogue-player] ' + msg);
  }

  function el(tag, css, text) {
    var n = document.createElement(tag);
    if (css) n.style.cssText = css;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function stop(reason) {
    var c = current;
    if (!c) return;
    current = null;
    try { if (c.timer) clearTimeout(c.timer); } catch (_) {}
    try { window.removeEventListener('keydown', c.onKey); } catch (_) {}
    try { c.overlay.remove(); } catch (_) {}
    try {
      window.dispatchEvent(new CustomEvent('snug-dialogue-complete', {
        detail: { pack: c.packId, scene: c.sceneId, reason: reason || 'done' }
      }));
    } catch (_) {}
  }

  function playPack(pack, sceneId) {
    if (!pack || !Array.isArray(pack.scenes) || !pack.scenes.length) {
      toast('Dialogue pack has no scenes.');
      return false;
    }
    var scene = null;
    if (sceneId) {
      for (var i = 0; i < pack.scenes.length; i++) {
        if (pack.scenes[i].id === sceneId) { scene = pack.scenes[i]; break; }
      }
      if (!scene) { toast('Scene not found in dialogue pack: ' + sceneId); return false; }
    } else scene = pack.scenes[0];
    if (!Array.isArray(scene.nodes) || !scene.nodes.length) {
      toast('Dialogue scene has no lines.');
      return false;
    }
    stop('replaced');

    var byId = {};
    scene.nodes.forEach(function (n) { if (n && n.id) byId[n.id] = n; });

    var overlay = el('div', 'position:fixed;inset:0;z-index:9999;pointer-events:none;');
    overlay.id = 'snug-dialogue-overlay';
    var panel = el('div', 'position:absolute;left:50%;bottom:24px;transform:translateX(-50%);width:min(680px,92vw);background:rgba(16,26,20,.92);color:#f3f5f1;border:1px solid rgba(255,255,255,.18);border-radius:16px;padding:18px 20px;box-shadow:0 18px 50px rgba(0,0,0,.45);pointer-events:auto;font-family:system-ui,sans-serif;');
    var title = el('div', 'font-size:12px;letter-spacing:.08em;text-transform:uppercase;opacity:.65;margin-bottom:6px;', scene.title || 'Dialogue');
    var speaker = el('div', 'font-weight:800;font-size:18px;margin-bottom:6px;color:#ffd166;');
    var line = el('div', 'font-size:17px;line-height:1.5;margin-bottom:14px;');
    var actions = el('div', 'display:flex;flex-wrap:wrap;gap:8px;');
    var close = el('button', 'margin-left:auto;background:transparent;border:1px solid rgba(255,255,255,.3);color:#f3f5f1;border-radius:999px;padding:8px 14px;font-size:14px;cursor:pointer;', 'Close');
    close.addEventListener('click', function () { stop('closed'); });
    panel.appendChild(title);
    panel.appendChild(speaker);
    panel.appendChild(line);
    panel.appendChild(actions);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    var state = {
      overlay: overlay, onKey: null, timer: 0, steps: 0,
      packId: pack.id || packIdOf(pack), sceneId: scene.id
    };
    state.onKey = function (e) { if (e.key === 'Escape') stop('closed'); };
    window.addEventListener('keydown', state.onKey);
    current = state;

    function packIdOf(p) {
      return (p && (p.id || (p.scenes && p.scenes[0] && p.scenes[0].id))) || 'pack';
    }

    function go(nodeId) {
      if (!current) return;
      if (current.timer) { clearTimeout(current.timer); current.timer = 0; }
      if (state.steps > 200) { stop('done'); return; }
      state.steps += 1;
      var node = byId[nodeId];
      if (!node) { stop('done'); return; }
      speaker.textContent = node.speaker || '';
      // Emoticon signals (user-directed 2026-10-28): a :) :D :P ;) :O :(
      // etc. in the line sets the speaker's mouth expression, and the
      // emoticon itself is stripped from the displayed line.
      var rawLine = node.line || '';
      var emo = null;
      var emoMap = [[':-)', 'smile'], [':)', 'smile'], [':-D', 'laugh'], [':D', 'laugh'], ['XD', 'grin'], ['xD', 'grin'], [':-P', 'tongue'], [':P', 'tongue'], [';-)', 'wink'], [';)', 'wink'], [':-O', 'surprise'], [':O', 'surprise'], [':-(', 'frown'], [':(', 'frown'], [':-|', 'neutral'], [':|', 'neutral'], [':-/', 'smirk'], [':/', 'smirk']];
      for (var ei = 0; ei < emoMap.length; ei++) {
        if (rawLine.indexOf(emoMap[ei][0]) >= 0) { emo = emoMap[ei]; break; }
      }
      var mouth = node.mouth || (emo && emo[1]);
      if (mouth && window.__snugNpcMouths && window.__snugNpcMouths.set) {
        var speakerId = String(node.speaker || '').toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
        window.__snugNpcMouths.set(speakerId, mouth);
      }
      var shownLine = rawLine;
      if (emo) shownLine = rawLine.split(emo[0]).join('').replace(/\s{2,}/g, ' ').trim();
      line.textContent = shownLine;
      while (actions.firstChild) actions.removeChild(actions.firstChild);
      var choices = Array.isArray(node.choices) ? node.choices : [];
      if (choices.length) {
        choices.forEach(function (ch) {
          var b = el('button', 'background:#ffd166;border:0;color:#1d2b22;border-radius:999px;padding:10px 16px;font-size:15px;font-weight:700;cursor:pointer;', ch.label || 'Continue');
          b.addEventListener('click', function () {
            if (ch.next) go(ch.next); else stop('done');
          });
          actions.appendChild(b);
        });
      } else if (node.next) {
        var nextBtn = el('button', 'background:#ffd166;border:0;color:#1d2b22;border-radius:999px;padding:10px 18px;font-size:15px;font-weight:700;cursor:pointer;', 'Next');
        nextBtn.addEventListener('click', function () { go(node.next); });
        actions.appendChild(nextBtn);
        if (node.advance === 'auto') {
          state.timer = setTimeout(function () { go(node.next); }, 2800);
        }
      } else {
        var doneBtn = el('button', 'background:#ffd166;border:0;color:#1d2b22;border-radius:999px;padding:10px 18px;font-size:15px;font-weight:700;cursor:pointer;', 'Done');
        doneBtn.addEventListener('click', function () { stop('done'); });
        actions.appendChild(doneBtn);
      }
      actions.appendChild(close);
    }

    go(scene.nodes[0].id);
    return true;
  }

  function playFile(id, sceneId) {
    var clean = String(id || '').replace(/[^A-Za-z0-9._-]/g, '');
    if (!clean || clean !== String(id)) {
      toast('Invalid dialogue pack id.');
      return Promise.resolve(false);
    }
    return fetch('assets/dialogue/' + clean + '.json', { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('dialogue pack ' + r.status);
        return r.json();
      })
      .then(function (pack) {
        pack.id = clean;
        return playPack(pack, sceneId || null);
      })
      .catch(function (err) {
        toast('Could not load dialogue pack: ' + clean);
        console.warn('[dialogue-player] ' + (err && err.message));
        return false;
      });
  }

  window.__snugDialoguePlayer = {
    play: playPack,
    playFile: playFile,
    stop: stop,
    playing: function () { return !!current; }
  };

  // ?dialogue=<packId> or ?dialogue=<packId>:<sceneId> — waits out the
  // welcome flow the same way ?cine= does, so it never fights it.
  try {
    var params = new URLSearchParams(window.location.search);
    var wanted = params.get('dialogue');
    if (wanted) {
      var parts = wanted.split(':');
      var packId = parts[0];
      var sceneId = parts[1] || null;
      var waited = 0;
      var tick = setInterval(function () {
        waited += 500;
        var startOpen = document.documentElement.classList.contains('snug-start-open') ||
          !!document.querySelector('.snug-start-screen');
        var welcomeBusy = !!window.__snugWelcomePending || !!window.__snugWelcomeActive;
        if (!startOpen && !welcomeBusy) {
          clearInterval(tick);
          playFile(packId, sceneId);
        } else if (waited > 60000) {
          clearInterval(tick);
        }
      }, 500);
    }
  } catch (_) {}
})();

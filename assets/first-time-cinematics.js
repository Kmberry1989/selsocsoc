/* First-time cinematic moments — a short spotlight the first time a player
   meets an NPC, walks into a store, or tries an interactable (paint studio,
   jukebox, mailbox, ...). Once per player, skippable, never replays.
   Persistence mirrors tutorial-walkthrough.js: localStorage + snug-player-patch.
   NPC lines come from the roster object itself (existing game copy) — this
   module writes no character dialogue. Place hints are functional UI copy. */
(function () {
  "use strict";
  var LS_KEY = "snug-first-cine";
  var NPC_IDS = ["mayor-mayor", "gideon", "lyla-lens", "chip-chance", "barnaby-bargain",
    "pip-parade", "agnes-alley", "dottie-daly", "peggy-plank", "mr-buck-coinsworth",
    "fern-bramble", "stanley-stamp", "bobby-gill"];
  /* Place moments. title/hint are UI copy; face is optional art. */
  var PLACES = {
    "shop-salon": { title: "Salon", hint: "Hats, hairstyles, and head-turning accessories — tap an item to try it on." },
    "shop-furniture": { title: "Furniture Shop", hint: "Furniture, wallpaper, and carpet for your home — tap an item to preview it." },
    "shop-garden": { title: "Garden Shop", hint: "Supplies for your garden beds — tap an item to buy it with shells." },
    "shop-default": { title: "Meadow Market", hint: "Barnaby's shelves rotate daily — tap an item to buy it with shells." },
    "paint-studio": { title: "Painting Studio", hint: "Pick a canvas, paint with your finger, and hang it on a home wall. Paint only shows near an easel." },
    "jukebox": { title: "Jukebox", hint: "Queue one of your vinyls — the whole plaza hears it." },
    "mailbox": { title: "Mailbox", hint: "Parcels and letters from neighbors land here — tap one to open it." },
    "garden": { title: "Garden", hint: "Plant seedlings, water them, and harvest when they bloom." },
    "home": { title: "Home", hint: "Your house, your rules — furnish it from Meadow Market." },
    "fishing": { title: "Fishing", hint: "Cast at the pond — every catch is a prize or a keepsake, never just a fish." }
  };
  var state = { uid: null, seen: {} };

  function storeKey() { return LS_KEY + (state.uid ? ":" + state.uid : ""); }
  function load() {
    var merged = {};
    try {
      [LS_KEY, storeKey()].forEach(function (k) {
        var raw = localStorage.getItem(k);
        if (raw) { var o = JSON.parse(raw); Object.keys(o).forEach(function (key) { merged[key] = true; }); }
      });
    } catch (_) { /* private mode etc. */ }
    state.seen = merged;
  }
  function save() {
    try { localStorage.setItem(storeKey(), JSON.stringify(state.seen)); } catch (_) {}
    try {
      window.dispatchEvent(new CustomEvent("snug-player-patch", {
        detail: function (player) {
          var next = Object.assign({}, player);
          next.firstCine = Object.assign({}, (player && player.firstCine) || {}, state.seen);
          return next;
        }
      }));
    } catch (_) { /* bundle not ready; localStorage still covers us */ }
  }
  function mark(key) { if (!state.seen[key]) { state.seen[key] = true; save(); } }
  function markAll() {
    NPC_IDS.forEach(function (id) { state.seen["npc-" + id] = true; });
    Object.keys(PLACES).forEach(function (k) { state.seen[k] = true; });
    save();
  }
  function isSeen(key) { return !!state.seen[key]; }

  var overlay = null;
  function closeOverlay() {
    if (overlay) { overlay.remove(); overlay = null; }
    document.removeEventListener("keydown", onKey, true);
  }
  function onKey(e) { if (e.key === "Escape") { closeOverlay(); } }

  /* Show the moment. Marks seen at show-time so the onDone re-entry passes
     the call-site guard. Returns nothing; callers use the play() wrapper. */
  function show(def, onDone) {
    closeOverlay();
    overlay = document.createElement("div");
    overlay.className = "snug-first-cine";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", def.title);
    var face = def.face ? '<div class="snug-first-cine-face"><img src="' + def.face + '" alt=""></div>' : "";
    var role = def.role ? '<div class="snug-first-cine-role">' + def.role + "</div>" : "";
    var line = def.line ? '<p class="snug-first-cine-line">' + def.line + "</p>" : "";
    overlay.innerHTML = '<div class="snug-first-cine-card">' + face +
      '<div class="snug-first-cine-kicker">First time here</div>' +
      '<h2>' + def.title + "</h2>" + role + line +
      '<div class="snug-first-cine-hint">' + def.hint + "</div>" +
      '<div class="snug-first-cine-actions">' +
      '<button type="button" class="snug-first-cine-go">Let\u2019s go</button>' +
      '<button type="button" class="snug-first-cine-skip">Skip all intros</button>' +
      "</div></div>";
    overlay.querySelector(".snug-first-cine-go").addEventListener("click", function () {
      closeOverlay();
      if (onDone) onDone();
    });
    overlay.querySelector(".snug-first-cine-skip").addEventListener("click", function () {
      markAll();
      closeOverlay();
      if (onDone) onDone();
    });
    document.body.appendChild(overlay);
    document.addEventListener("keydown", onKey, true);
    try {
      window.dispatchEvent(new CustomEvent("snug-first-cinematic", { detail: { key: def.key } }));
    } catch (_) {}
  }

  /* Generic gate for call sites: returns true when the moment played
     (caller returns early); false when already seen (caller proceeds). */
  function play(key, def, onDone) {
    if (isSeen(key)) return false;
    mark(key);
    var base = PLACES[key] || { title: key, hint: "" };
    var merged = {
      key: key,
      title: (def && def.title) || base.title,
      role: (def && def.role) || base.role || "",
      line: (def && def.line) || "",
      hint: (def && def.hint) || base.hint || "",
      face: (def && def.face) || base.face || ""
    };
    show(merged, onDone);
    return true;
  }

  /* NPC gate for the roster dialogue opener. Only the default intro call
     gets a moment — contextual lines (minigame results, mayor specials)
     pass straight through. onDone re-enters the opener from the caller's
     own scope, now that this moment is marked seen. */
  function playNpc(npc, line, onDone) {
    if (!npc || !npc.id) return false;
    if (line !== npc.intro) return false;
    var key = "npc-" + npc.id;
    if (isSeen(key)) return false;
    mark(key);
    show({
      key: key,
      title: npc.name,
      role: npc.role,
      line: npc.intro,
      hint: npc.action ? npc.action + " — tap Continue when you\u2019re ready." : "Tap Continue when you\u2019re ready.",
      face: "assets/npc-faces/npc-" + npc.id + "-face-v2.png"
    }, onDone);
    return true;
  }

  window.addEventListener("snug-session", function (e) {
    if (e && e.detail && e.detail.uid) { state.uid = e.detail.uid; load(); }
  });
  load();
  window.__snugFirstCine = { play: play, playNpc: playNpc, isSeen: isSeen };
})();

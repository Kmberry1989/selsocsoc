/* Selfie Social Society — Town Storyline
   A 6-chapter main quest arc for Cyclical City. Progress lives in
   profile.storyline (Firestore players/{uid} via snug-player-patch)
   with a localStorage backup. The story never blocks other play.
   Steps are completed by REAL game events — never faked. */

(() => {
  "use strict";

  const LS_KEY = "snug-storyline";

  /* ---------------- Story definition ---------------- */

  // Step types:
  //  {type:"event", event:"snug-whirl-result", count:1, filter:(d)=>true}
  //  {type:"npc", ids:["pip-parade"], count:1}  (distinct NPCs via snug-npc-role)
  //  {type:"profile", check:(p)=>bool}
  //  {type:"story"}  (completed by reading the beat in the story panel)

  const CHAPTERS = [
    {
      id: "new-neighbor",
      title: "New Neighbor",
      subtitle: "The committee has spoken.",
      reward: 100,
      stamp: "story-new-neighbor",
      intro: {
        speaker: "Gideon",
        role: "Tour guide",
        lines: [
          "Well, butter my biscuit — a new neighbor! The committee's done its fussing, the photos are taken, and Cyclical City is officially your town too.",
          "But a neighbor isn't just someone with a mailbox, oh no. Stick with me, and I'll show you what being part of this town really means.",
        ],
      },
      steps: [
        { id: "nn-welcome", text: "Finish the welcoming committee", hint: "Lyla's photo shoot", type: "profile",
          check: (p) => Boolean(p && (p.onboardingComplete || p.welcomeComplete || Object.keys(p.expressionPhotos || p.facePhotos || {}).length)) },
        { id: "nn-tour", text: "Complete Gideon's town tour", hint: "The 8-stop grand tour", type: "profile",
          check: (p) => Boolean(p && p.tutorial && p.tutorial.complete) },
        { id: "nn-hellos", text: "Say hello to 3 neighbors", hint: "Talk to anyone in town", type: "npc", count: 3 },
      ],
    },
    {
      id: "mayors-request",
      title: "The Mayor's Request",
      subtitle: "Razzle-dazzle, by proclamation.",
      reward: 150,
      stamp: "story-mayors-request",
      intro: {
        speaker: "Mayor Mayor",
        role: "Mayor",
        lines: [
          "My fellow Cyclicalians! And you — our splendid new neighbor! I have a PROCLAMATION!",
          "Our town is lovely. But is it LIVELY? I used to pack houses from here to the county line! ...Well. One house. Several times.",
          "What Cyclical City needs is razzle-dazzle, and our attractions need an audience. That's you, neighbor. Show me what our amusements can do!",
        ],
      },
      steps: [
        { id: "mr-whirl", text: "Play a round of Whirl of Resources", hint: "Play tab → Whirl", type: "event", event: "snug-whirl-result", count: 1 },
        { id: "mr-board", text: "Play a game of Snug Board", hint: "Play tab → Games Hub → Snug Board", type: "event", event: "snug-board-result", count: 1 },
        { id: "mr-chip", text: "Talk to Chip Chance about the shows", hint: "Find him in town", type: "npc", ids: ["chip-chance"], count: 1 },
      ],
    },
    {
      id: "landslide-anniversary",
      title: "The Landslide Anniversary",
      subtitle: "The most decisive election in municipal history.",
      reward: 200,
      stamp: "story-landslide",
      intro: {
        speaker: "Pip Parade",
        role: "Festival organizer",
        lines: [
          "It's almost the anniversary of the most decisive election in municipal history! One candidate! Zero opponents! One extremely well-timed landslide!",
          "We're throwing the Landslide Anniversary Festival and I need EVERYTHING perfect. The footbridge, the feast, the photos — that's where you come in, neighbor!",
        ],
      },
      steps: [
        { id: "la-pip", text: "Talk to Pip Parade about the festival", hint: "Find her in town", type: "npc", ids: ["pip-parade"], count: 1 },
        { id: "la-bridge", text: "Contribute to the Moonlight Footbridge", hint: "Peggy's town project", type: "event", event: "snug-project-contribution", count: 1,
          filter: (d) => /bridge/i.test(String((d && d.project) || "")) },
        { id: "la-crop", text: "Plant a crop for the festival feast", hint: "Fern's garden", type: "event", event: "snug-garden-planted", count: 1 },
        { id: "la-photo", text: "Take a festival photo", hint: "Photo mode", type: "event", event: "snug-photo-captured", count: 1 },
      ],
    },
    {
      id: "gideons-lost-tour",
      title: "Gideon's Lost Tour",
      subtitle: "Forty years of material. Mostly blank pages.",
      reward: 200,
      stamp: "story-lost-tour",
      intro: {
        speaker: "Gideon",
        role: "Tour guide",
        lines: [
          "Disaster! Calamity! My tour script — forty years of material, GONE!",
          "...Well. Mostly blank pages and a drawing of a sandwich. But the sandwich drawing was VERY good.",
          "Someone must have seen where I left it. Retrace my steps, neighbor — ask around!",
        ],
      },
      steps: [
        { id: "gl-tale", text: "Hear Gideon's tale", hint: "Read his story", type: "story",
          beat: { speaker: "Gideon", role: "Tour guide", lines: [
            "Last I had it was Tuesday. Or was it Thursday? I did the old route — pond, garden, the Whirl marquee — and then... nothing. My pockets are full of lint and good intentions, and neither is the script.",
          ] } },
        { id: "gl-ask", text: "Ask 3 neighbors about the script", hint: "Talk to anyone in town", type: "npc", count: 3 },
        { id: "gl-stanley", text: "Check with Stanley Stamp — lost post!", hint: "The mail carrier sees everything", type: "npc", ids: ["stanley-stamp"], count: 1 },
        { id: "gl-return", text: "Return the script to Gideon", hint: "He's waiting...", type: "story",
          beat: { speaker: "Gideon", role: "Tour guide", lines: [
            "The script! The sandwich drawing! You beautiful, wonderful neighbor!",
            "Stanley found it wedged behind the mail cart, you say? Of course. The mail cart eats everything. Last week it ate my hat.",
            "He's Mr. Mayor Mayor now! ...And you're the finest neighbor this town's ever toured. Thank you.",
          ] } },
      ],
    },
    {
      id: "cease-and-desist",
      title: "The Cease-and-Desist",
      subtitle: "Thick envelopes never contain good news. Or coupons.",
      reward: 250,
      stamp: "story-encore",
      intro: {
        speaker: "Stanley Stamp",
        role: "Mail carrier",
        lines: [
          "Special delivery! ...It's for the Mayor. It's from lawyers. It's THICK.",
          "I don't like thick envelopes. They never contain good news. Or coupons.",
        ],
      },
      steps: [
        { id: "cd-letter", text: "Read Stanley's letter", hint: "It's addressed to the Mayor...", type: "story",
          beat: { speaker: "Mayor Mayor", role: "Mayor", lines: [
            "A cease-and-desist?! For my MUSIC?! After all these years?!",
            "...Hold on. Let me read the fine print. '...hereby ordered to cease and desist... leaving his guitar out in the rain.'",
            "Oh. Well. That's fair, honestly. BUT — it gave me an idea! It's time this town heard the act that ALMOST made it big. One night only! Tell everyone!",
          ] } },
        { id: "cd-rally", text: "Rally the town — talk to 4 neighbors", hint: "Spread the word", type: "npc", count: 4 },
        { id: "cd-fish", text: "Catch a fish for the morale fish-fry", hint: "Bobby Gill's pond", type: "event", event: "snug-fishing-loot", count: 1 },
        { id: "cd-encore", text: "Attend the Mayor's encore", hint: "The show must go on", type: "story",
          beat: { speaker: "Mayor Mayor", role: "Mayor", lines: [
            "(He walks out, plants his feet, tips his hat, waves, and hops.)",
            "Thank you! Thank you! For those who don't know me — I'm Mayor Mayor, and I used to be almost famous!",
            "(He plays. The town cheers. Somewhere, Gideon is crying. Happy tears. Probably.)",
            "He's Mr. Mayor Mayor now! ...That's my boy. That's my boy.",
          ] } },
      ],
    },
    {
      id: "citizen",
      title: "Citizen of Cyclical City",
      subtitle: "All in favor?",
      reward: 300,
      stamp: "story-citizen",
      intro: {
        speaker: "Mayor Mayor",
        role: "Mayor",
        lines: [
          "By the power vested in me by an overwhelming majority of one landslide, I hereby convene a town vote!",
          "All in favor of naming our new neighbor an Honorary Citizen of Cyclical City?",
        ],
      },
      steps: [
        { id: "cz-vote", text: "Hear the town's vote", hint: "It's unanimous. Probably.", type: "story",
          beat: { speaker: "Gideon", role: "Tour guide", lines: [
            "AYE! A thousand times aye!",
            "(The whole town: AYE!)",
            "He's Mr. Mayor Mayor now! ...And you're officially one of us now, neighbor.",
          ] } },
        { id: "cz-photo", text: "Pose for Lyla's commemorative photo", hint: "Photo mode — say CHEESE", type: "event", event: "snug-photo-captured", count: 1 },
        { id: "cz-bow", text: "Take your bow", hint: "The finale", type: "story", finale: true,
          beat: { speaker: "Lyla Lens", role: "Newspaper photographer", lines: [
            "Hold that smile — perfect! Front page of the Gazette: 'Cyclical City's Newest Citizen!'",
            "This town was a nice place before you got here. Now it's a story worth telling.",
          ] } },
      ],
    },
  ];

  const STAMPS = [
    { id: "story-new-neighbor", name: "New Neighbor", achievement: "Complete Chapter 1 of the town story", glyph: "gate" },
    { id: "story-mayors-request", name: "Razzle-Dazzle", achievement: "Complete Chapter 2 of the town story", glyph: "star" },
    { id: "story-landslide", name: "Landslide Day", achievement: "Complete Chapter 3 of the town story", glyph: "bunting" },
    { id: "story-lost-tour", name: "Script Finder", achievement: "Complete Chapter 4 of the town story", glyph: "letter" },
    { id: "story-encore", name: "Encore!", achievement: "Complete Chapter 5 of the town story", glyph: "moon" },
    { id: "story-citizen", name: "Honorary Citizen", achievement: "Complete the town story", glyph: "camera", rare: true },
  ];

  /* ---------------- State ---------------- */

  const state = {
    story: null,       // {chapter, step, done:{}, complete, dismissed:{}}
    npcSeen: {},       // npcId -> true (per current step counting)
    eventCounts: {},   // stepId -> count
    panel: null,
    uid: null,
  };

  function readProfile() {
    try {
      const p = window.__snugWardrobe && window.__snugWardrobe.profile ? window.__snugWardrobe.profile() : null;
      if (p) return p;
    } catch (_) {}
    try {
      const s = window.__snugSession;
      if (s && s.profile) return s.profile;
    } catch (_) {}
    return null;
  }

  function loadStory() {
    const fromProfile = readProfile()?.storyline;
    let fromLocal = null;
    try { fromLocal = JSON.parse(localStorage.getItem(LS_KEY) || "null"); } catch (_) {}
    const score = (s) => (s ? (s.complete ? 1000 : (s.chapter || 0) * 10 + (s.step || 0)) : -1);
    state.story = score(fromProfile) >= score(fromLocal) ? { ...(fromProfile || {}) } : { ...(fromLocal || {}) };
    if (typeof state.story.chapter !== "number") state.story.chapter = 0;
    if (typeof state.story.step !== "number") state.story.step = 0;
    if (!state.story.done || typeof state.story.done !== "object") state.story.done = {};
    state.npcSeen = {};
    state.eventCounts = {};
  }

  function saveStory() {
    const snap = JSON.parse(JSON.stringify(state.story));
    try {
      window.dispatchEvent(new CustomEvent("snug-player-patch", {
        detail: (player) => ({ ...player, storyline: { ...((player && player.storyline) || {}), ...snap } }),
      }));
    } catch (_) {}
    try { localStorage.setItem(LS_KEY, JSON.stringify(snap)); } catch (_) {}
  }

  /* ---------------- Progress ---------------- */

  const currentChapter = () => CHAPTERS[Math.min(state.story.chapter, CHAPTERS.length - 1)];
  const currentStep = () => currentChapter().steps[Math.min(state.story.step, currentChapter().steps.length - 1)];
  const isDone = () => !!state.story.complete;
  const stepKey = (ci, si) => `${ci}:${si}`;

  function markStepDone(ci, si) {
    const key = stepKey(ci, si);
    if (state.story.done[key]) return;
    state.story.done[key] = true;
    state.npcSeen = {};
    state.eventCounts = {};
    // Advance
    const ch = CHAPTERS[ci];
    if (si + 1 < ch.steps.length) {
      state.story.step = si + 1;
    } else {
      // Chapter complete: reward + stamp + advance chapter
      const reward = ch.reward;
      try {
        window.dispatchEvent(new CustomEvent("snug-award-coins", {
          detail: { amount: reward, message: `Chapter complete: ${ch.title}! +${reward} shells` },
        }));
      } catch (_) {}
      try {
        window.dispatchEvent(new CustomEvent("snug-story-chapter", {
          detail: { chapter: ci, chapterId: ch.id, stamp: ch.stamp },
        }));
      } catch (_) {}
      if (ci + 1 < CHAPTERS.length) {
        state.story.chapter = ci + 1;
        state.story.step = 0;
        setTimeout(() => showChapterIntro(ci + 1), 1200);
      } else {
        state.story.complete = true;
      }
    }
    saveStory();
    renderPanel();
  }

  function checkStep(ci, si) {
    // Called when something happens; returns true if the current step was completed.
    if (isDone()) return false;
    if (ci !== state.story.chapter || si !== state.story.step) return false;
    markStepDone(ci, si);
    return true;
  }

  /* ---------------- Event listeners ---------------- */

  function onGameEvent(eventName, detail) {
    if (isDone()) return;
    const ci = state.story.chapter, si = state.story.step;
    const step = CHAPTERS[ci]?.steps[si];
    if (!step || step.type !== "event" || step.event !== eventName) return;
    if (step.filter && !step.filter(detail)) return;
    const key = stepKey(ci, si);
    state.eventCounts[key] = (state.eventCounts[key] || 0) + 1;
    if (state.eventCounts[key] >= (step.count || 1)) checkStep(ci, si);
    else renderPanel();
  }

  const GAME_EVENTS = ["snug-whirl-result", "snug-board-result", "snug-garden-planted",
    "snug-photo-captured", "snug-fishing-loot", "snug-project-contribution"];
  GAME_EVENTS.forEach((name) => window.addEventListener(name, (e) => onGameEvent(name, e.detail)));

  window.addEventListener("snug-npc-role", (e) => {
    if (isDone()) return;
    const id = e.detail && e.detail.id;
    if (!id) return;
    const ci = state.story.chapter, si = state.story.step;
    const step = CHAPTERS[ci]?.steps[si];
    if (!step || step.type !== "npc") return;
    if (step.ids && !step.ids.includes(id)) return;
    state.npcSeen[id] = true;
    const seen = Object.keys(state.npcSeen).length;
    if (seen >= (step.count || 1)) checkStep(ci, si);
    else renderPanel();
  });

  window.addEventListener("snug-tutorial-complete", () => {
    if (isDone()) return;
    const ci = state.story.chapter, si = state.story.step;
    const step = CHAPTERS[ci]?.steps[si];
    if (step && step.type === "profile" && step.check(readProfile())) checkStep(ci, si);
  });

  window.addEventListener("snug-player-patch", () => {
    // Profile may now satisfy a profile-type step (e.g. welcoming committee).
    if (isDone()) return;
    const ci = state.story.chapter, si = state.story.step;
    const step = CHAPTERS[ci]?.steps[si];
    if (step && step.type === "profile" && step.check(readProfile())) checkStep(ci, si);
  });

  /* ---------------- UI ---------------- */

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

  function ensureButton() {
    if (document.querySelector(".snug-story-dock")) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "snug-story-dock";
    btn.setAttribute("aria-label", "Open the town story");
    btn.innerHTML = `<i aria-hidden="true">📖</i><b>Story</b>`;
    btn.addEventListener("click", () => openPanel());
    document.body.appendChild(btn);
  }

  function stepStatus(ci, si) {
    if (state.story.done[stepKey(ci, si)]) return "done";
    if (ci === state.story.chapter && si === state.story.step && !isDone()) return "active";
    return "locked";
  }

  function stepProgressText(step, ci, si) {
    if (step.type === "npc") {
      const seen = (ci === state.story.chapter && si === state.story.step) ? Object.keys(state.npcSeen).length : 0;
      return `${Math.min(seen, step.count || 1)} / ${step.count || 1}`;
    }
    if (step.type === "event" && (step.count || 1) > 1) {
      const n = (ci === state.story.chapter && si === state.story.step) ? (state.eventCounts[stepKey(ci, si)] || 0) : 0;
      return `${Math.min(n, step.count)} / ${step.count}`;
    }
    return "";
  }

  function chapterMarkup(ch, ci) {
    const isCurrent = ci === state.story.chapter && !isDone();
    const isPast = isDone() || ci < state.story.chapter;
    const steps = ch.steps.map((s, si) => {
      const st = stepStatus(ci, si);
      const prog = stepProgressText(s, ci, si);
      const beatBtn = (st === "active" && s.type === "story")
        ? `<button type="button" class="snug-story-beat" data-beat="${ci}:${si}">${s.finale ? "Take your bow" : "Continue"}</button>` : "";
      return `<li class="snug-story-step ${st}">
        <span class="snug-story-check" aria-hidden="true">${st === "done" ? "✓" : st === "active" ? "→" : "·"}</span>
        <span><b>${esc(s.text)}</b>${s.hint ? `<small>${esc(s.hint)}</small>` : ""}${prog ? `<em>${esc(prog)}</em>` : ""}</span>
        ${beatBtn}
      </li>`;
    }).join("");
    return `<section class="snug-story-chapter ${isCurrent ? "current" : ""} ${isPast ? "past" : ""}">
      <header><small>Chapter ${ci + 1} of ${CHAPTERS.length}</small><h3>${esc(ch.title)}</h3><p>${esc(ch.subtitle)}</p></header>
      <ol>${steps}</ol>
      <footer><span>Reward: +${ch.reward} shells</span><span class="snug-story-stampref">📮 ${esc(STAMPS[ci].name)} stamp</span></footer>
    </section>`;
  }

  function openPanel() {
    closePanel();
    loadStory();
    const panel = document.createElement("div");
    panel.className = "snug-story-backdrop";
    const chapters = CHAPTERS.map((ch, ci) => chapterMarkup(ch, ci)).join("");
    const head = isDone()
      ? `<small>Town story</small><h2>Honorary Citizen!</h2><p>You completed the Cyclical City story. The town is lucky to have you, neighbor.</p>`
      : `<small>Town story</small><h2>Cyclical City Chronicles</h2><p>Follow the town's tale — it never blocks your play.</p>`;
    panel.innerHTML = `<section class="snug-story-sheet" role="dialog" aria-modal="true" aria-label="Town story">
      <div class="snug-story-grabber"></div>
      <header><div>${head}</div><button type="button" class="snug-story-close" aria-label="Close story">×</button></header>
      <main>${chapters}</main>
    </section>`;
    panel.querySelector(".snug-story-close").addEventListener("click", closePanel);
    panel.addEventListener("click", (e) => { if (e.target === panel) closePanel(); });
    panel.querySelectorAll("[data-beat]").forEach((b) => b.addEventListener("click", () => {
      const [ci, si] = b.dataset.beat.split(":").map(Number);
      showBeat(ci, si);
    }));
    document.body.appendChild(panel);
    state.panel = panel;
    // Scroll to current chapter
    const cur = panel.querySelector(".snug-story-chapter.current");
    if (cur) cur.scrollIntoView({ block: "start" });
  }

  function closePanel() {
    if (state.panel) { state.panel.remove(); state.panel = null; }
  }

  function renderPanel() { if (state.panel) openPanel(); updateDockBadge(); }

  function updateDockBadge() {
    const btn = document.querySelector(".snug-story-dock");
    if (!btn) return;
    btn.classList.toggle("complete", isDone());
  }

  /* Chapter intro + story beats */

  function showChapterIntro(ci) {
    const ch = CHAPTERS[ci];
    if (!ch) return;
    showDialogue(ch.intro.speaker, ch.intro.role, ch.intro.lines, "Begin Chapter " + (ci + 1), () => {
      // Mark intro as seen so we don't reshown on reload mid-chapter
      state.story["intro_" + ch.id] = true;
      saveStory();
    });
  }

  function showBeat(ci, si) {
    const step = CHAPTERS[ci]?.steps[si];
    if (!step || step.type !== "story" || !step.beat) return;
    const done = () => {
      checkStep(ci, si);
      if (step.finale) showCredits();
    };
    showDialogue(step.beat.speaker, step.beat.role, step.beat.lines, step.finale ? "Take your bow" : "Continue", done);
  }

  function showDialogue(speaker, role, lines, cta, onDone) {
    closePanel();
    const overlay = document.createElement("div");
    overlay.className = "snug-story-beat-backdrop";
    let li = 0;
    const render = () => {
      overlay.innerHTML = `<section class="snug-story-beat-sheet" role="dialog" aria-modal="true" aria-label="Story">
        <div class="snug-story-grabber"></div>
        <header><span class="snug-story-portrait" aria-hidden="true">${esc(speaker[0])}</span>
        <div><small>${esc(role)}</small><b>${esc(speaker)}</b></div>
        <button type="button" class="snug-story-close" aria-label="Close">×</button></header>
        <p class="snug-story-line">${esc(lines[li])}</p>
        <footer><span>${li + 1} / ${lines.length}</span>
        <button type="button" class="snug-story-next">${li + 1 < lines.length ? "Continue" : esc(cta)}</button></footer>
      </section>`;
      overlay.querySelector(".snug-story-close").addEventListener("click", () => { overlay.remove(); });
      overlay.querySelector(".snug-story-next").addEventListener("click", () => {
        if (li + 1 < lines.length) { li++; render(); }
        else { overlay.remove(); if (onDone) onDone(); }
      });
    };
    render();
    document.body.appendChild(overlay);
  }

  function showCredits() {
    const overlay = document.createElement("div");
    overlay.className = "snug-story-beat-backdrop";
    overlay.innerHTML = `<section class="snug-story-beat-sheet snug-story-credits" role="dialog" aria-modal="true" aria-label="Credits">
      <div class="snug-story-grabber"></div>
      <header><div><small>Cyclical City</small><b>Fin</b></div>
      <button type="button" class="snug-story-close" aria-label="Close">×</button></header>
      <div class="snug-story-credit-list">
        <p><b>Mayor Mayor</b> — himself, at last</p>
        <p><b>Gideon</b> — tour guide, father, sandwich artist</p>
        <p><b>Lyla Lens</b> — front page photography</p>
        <p><b>Chip Chance</b> — dice, roof-raising</p>
        <p><b>Barnaby Bargain</b> — dramatic deals</p>
        <p><b>Pip Parade</b> — confetti coordination</p>
        <p><b>Agnes Alley</b> — punctual welcome bowls</p>
        <p><b>Dottie Daly</b> — straightened adventures</p>
        <p><b>Peggy Plank</b> — proper cheers</p>
        <p><b>Mr. Buck Coinsworth</b> — tasteful locks &amp; keys</p>
        <p><b>Fern Bramble</b> — gossiping seedlings</p>
        <p><b>Stanley Stamp</b> — thick envelopes, thin patience</p>
        <p><b>Bobby Gill</b> — quiet ripples</p>
        <p><b>You</b> — Honorary Citizen of Cyclical City</p>
      </div>
      <footer><button type="button" class="snug-story-next">Back to town</button></footer>
    </section>`;
    overlay.querySelector(".snug-story-close").addEventListener("click", () => overlay.remove());
    overlay.querySelector(".snug-story-next").addEventListener("click", () => overlay.remove());
    document.body.appendChild(overlay);
  }

  /* ---------------- Boot ---------------- */

  function boot() {
    loadStory();
    ensureButton();
    updateDockBadge();
    // Auto-check profile-type steps on load (e.g. returning player already did the tour)
    if (!isDone()) {
      const ci = state.story.chapter, si = state.story.step;
      const step = CHAPTERS[ci]?.steps[si];
      if (step && step.type === "profile" && step.check(readProfile())) {
        // Don't auto-fire chapter intro for a step completed before first open;
        // just advance quietly.
        const key = stepKey(ci, si);
        state.story.done[key] = true;
        const ch = CHAPTERS[ci];
        if (si + 1 < ch.steps.length) state.story.step = si + 1;
        else if (ci + 1 < CHAPTERS.length) { state.story.chapter = ci + 1; state.story.step = 0; }
        else state.story.complete = true;
        saveStory();
      }
      // Show chapter intro for a fresh chapter the player hasn't seen
      const ch = CHAPTERS[state.story.chapter];
      if (!isDone() && ch && !state.story["intro_" + ch.id] && state.story.step === 0 && !state.story.done[stepKey(state.story.chapter, 0)]) {
        // Only auto-show for chapter 0 on first ever open; otherwise show on chapter advance (handled in markStepDone)
        if (state.story.chapter === 0) setTimeout(() => { if (!state.panel) showChapterIntro(0); }, 4000);
      }
    }
    window.__snugStoryline = {
      open: openPanel,
      chapters: CHAPTERS,
      state: () => JSON.parse(JSON.stringify(state.story)),
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

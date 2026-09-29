/* NPC service fronts — voiced, in-game scenes for Bobby Gill, Dottie Daly,
   and Barnaby Bargain, wired to the real fishing / daily-loop systems.
   Additive: the roster (assets/npc-roster.js) is never edited. When the
   player reaches the final line of one of these three NPCs' intro dialogue
   and taps the action button, this file takes over first (capture phase),
   closes the roster dialogue through its own teardown, and opens an
   extended front that speaks live quest/streak/shop content before routing
   to the same destination the roster would have used. */
(() => {
  "use strict";

  // Canon roster facts, copied verbatim from assets/npc-roster.js.
  const FRONTS = {
    "Bobby Gill": {
      id: "bobby-gill", role: "Fishing mentor", mark: "BG", color: "#477a85",
      rate: 0.8, pitch: 0.72, voiceIndex: 10,
      action: "Visit fishing practice",
      buildLines: buildBobbyLines, route: routeFishing,
    },
    "Dottie Daly": {
      id: "dottie-daly", role: "Quest giver", mark: "DD", color: "#4f8a68",
      rate: 1.15, pitch: 1.0, voiceIndex: 5,
      action: "Check today’s quests",
      buildLines: buildDottieLines, route: () => routeToday(null),
    },
    "Barnaby Bargain": {
      id: "barnaby-bargain", role: "Shopkeeper", mark: "BB", color: "#527e8d",
      rate: 0.9, pitch: 0.82, voiceIndex: 2,
      action: "Browse today’s shop",
      buildLines: buildBarnabyLines, route: () => routeToday("#daily-market-shelf"),
    },
  };

  const api = () => window.__snugDailyLoop || null;

  /* ---------- content builders (all values come from live game state) ---------- */

  function buildBobbyLines() {
    const lines = [
      "Six casts a round, neighbor. Watch the ripple and cast the moment it sits inside the golden ring — cast too early and the pond just chuckles; too late, and the fish have slipped away.",
      "Each ripple runs about thirty-eight seconds. Don’t chase it. Sit with it — the pond respects a quiet neighbor.",
      "Meadow Market sometimes stocks a Casting Bell, thirty-four shells, that chimes your timing cue. And a Lucky Bobber never hurt a patient angler.",
    ];
    const loop = api();
    const quest = loop?.quests().find((q) => q.game === "fishing" || (q.games || []).includes("fishing"));
    if (!loop || !quest) {
      lines.push("No fishing on Dottie’s board today, but the pond always pays practice.");
    } else {
      const progress = loop.questProgress(quest.id);
      const claimed = loop.questClaimed(quest.id);
      if (claimed) lines.push(`Dottie’s pinned “${quest.label}” today, and you’ve already landed the bonus. Fine angling, neighbor.`);
      else if (progress >= quest.goal) lines.push(`Dottie’s pinned “${quest.label}” today — that’s done! Go see Dottie and claim your ${quest.reward} shells.`);
      else lines.push(`Dottie’s pinned “${quest.label}” today — ${Math.floor(progress)} of ${quest.goal} so far, with ${quest.reward} shells of bonus waiting. The pond’s ready when you are.`);
    }
    return lines;
  }

  function buildDottieLines() {
    const loop = api();
    if (!loop) return ["The journal’s still waking up, neighbor — open it from your dock and I’ll have today’s board pinned in a moment."];
    const streak = loop.streak();
    const reward = loop.loginReward();
    const lines = [
      streak > 1
        ? `Day ${streak} of your streak, neighbor! I’ve pinned today’s little adventures — and yes, I straightened them twice.`
        : "Welcome to the board, neighbor! I’ve pinned today’s little adventures — and yes, I straightened them twice.",
      loop.loginClaimed()
        ? `Today’s ${reward}-shell welcome is already sitting in your balance.`
        : `Your ${reward}-shell welcome is waiting on the board below — don’t wander off without it.`,
    ];
    for (const quest of loop.quests()) {
      const value = loop.questProgress(quest.id);
      const done = value >= quest.goal;
      const claimed = loop.questClaimed(quest.id);
      lines.push(
        done
          ? claimed
            ? `${quest.label} — done and claimed. Lovely.`
            : `${quest.label} — all done! Your ${quest.reward}-shell bonus is ready to claim.`
          : `${quest.label} — ${Math.floor(value)} of ${quest.goal} so far.`
      );
    }
    return lines;
  }

  function buildBarnabyLines() {
    const loop = api();
    if (!loop) return ["The shelves are still waking up — give me a breath and I’ll have today’s deals laid out."];
    const deals = loop.rotatingShop();
    if (!deals.length) return ["The shelves are bare today, friend — check back after the artisans deliver."];
    const lines = ["Three rotating deals, neighbor, and these prices only sit still till midnight!"];
    for (const item of deals) {
      const price = loop.dailyPrice(item);
      const bought = loop.dailyBought(item.id);
      const markdown = !bought && Number(item.cost) > price ? `, marked down from ${item.cost}` : "";
      const purpose = !bought && item.purpose ? ` ${String(item.purpose).replace(/^\s*\S/, (c) => c.toUpperCase())}` : "";
      lines.push(
        bought
          ? `${item.name} — already yours, you sharp-eyed deal-hunter.`
          : `${item.name} — ${price} shells today${markdown}!${purpose}`
      );
    }
    return lines;
  }

  /* ---------- routing (same destinations the roster uses) ---------- */

  function routeFishing() {
    [...document.querySelectorAll(".tabbar button")]
      .find((button) => /^Play$/i.test(button.textContent?.trim() || ""))?.click();
    setTimeout(() => {
      [...document.querySelectorAll("button")]
        .find((button) => /Solo Practice/i.test(button.textContent?.trim() || ""))?.click();
    }, 90);
  }

  function routeToday(scrollTarget) {
    document.querySelector(".society-dock")?.click();
    setTimeout(() => {
      document.querySelector('.society-sheet [data-view="today"]')?.click();
      if (scrollTarget) setTimeout(() => document.querySelector(scrollTarget)?.scrollIntoView({ block: "start" }), 400);
    }, 60);
  }

  /* ---------- speech (mirrors the roster's voice/rate/pitch per NPC) ---------- */

  let speechFallback = 0;

  function stopSpeech() {
    clearTimeout(speechFallback);
    if ("speechSynthesis" in window) { try { speechSynthesis.cancel(); } catch { /* noop */ } }
  }

  function pickVoice(index) {
    try {
      const all = speechSynthesis.getVoices() || [];
      if (!all.length) return null;
      const en = all.filter((voice) => /^en/i.test(voice.lang));
      const pool = en.length ? en : all;
      return pool[index % pool.length] || null;
    } catch { return null; }
  }

  function speak(front, text, onEnd) {
    stopSpeech();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      clearTimeout(speechFallback);
      onEnd?.();
    };
    const fallbackMs = Math.max(900, String(text).length * 48);
    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      speechFallback = setTimeout(finish, fallbackMs);
      return;
    }
    try {
      const utterance = new SpeechSynthesisUtterance(String(text));
      utterance.rate = Math.min(2, front.rate);
      utterance.pitch = front.pitch;
      utterance.volume = 0.93;
      const voice = pickVoice(front.voiceIndex);
      if (voice) utterance.voice = voice;
      utterance.onend = finish;
      utterance.onerror = (event) => { if (!event || (event.error !== "canceled" && event.error !== "interrupted")) finish(); };
      speechSynthesis.speak(utterance);
      // Watchdog: never strand the dialogue if the voice engine goes quiet.
      speechFallback = setTimeout(finish, Math.max(6000, String(text).length * 160));
    } catch {
      speechFallback = setTimeout(finish, fallbackMs);
    }
  }

  /* ---------- the front dialogue ---------- */

  let active = null;

  function closeFront() {
    stopSpeech();
    if (window.__snugWordSpill && active?.lineEl) { try { window.__snugWordSpill.stop(active.lineEl); } catch { /* noop */ } }
    active?.section.remove();
    active = null;
    document.body.classList.remove("city-npc-talking");
  }

  function showLine() {
    if (!active) return;
    const { front, lines, index, section, lineEl, actionEl } = active;
    const line = lines[index];
    try {
      window.__snugWordSpill?.stop?.(lineEl);
      const handle = window.__snugWordSpill?.start?.({
        text: line, target: lineEl, source: () => null,
        duration: Math.max(1100, String(line).length * 54),
      });
      if (!handle) lineEl.textContent = line;
    } catch { lineEl.textContent = line; }
    setTimeout(() => { if (active && !lineEl.textContent) lineEl.textContent = line; }, 500);
    const last = index >= lines.length - 1;
    actionEl.textContent = last ? front.action : "Continue";
    actionEl.disabled = false;
    speak(front, line, () => { /* player advances when ready */ });
  }

  function openFront(front) {
    if (active) closeFront();
    const lines = front.buildLines().filter(Boolean);
    if (!lines.length) { front.route(); return; }
    const section = document.createElement("section");
    section.className = "city-npc-dialogue";
    section.dataset.snugFront = front.id;
    section.setAttribute("role", "dialog");
    section.setAttribute("aria-live", "polite");
    section.innerHTML =
      `<button type="button" class="city-npc-close" aria-label="Close conversation">×</button>` +
      `<div class="city-npc-portrait" style="--npc-color:${front.color}" aria-hidden="true"><span>${front.mark}</span></div>` +
      `<div class="city-npc-copy"><small>${front.role}</small><b>${frontName(front)}</b><p></p><em>Continue when you’re ready</em></div>` +
      `<button type="button" class="city-npc-action"></button>`;
    const lineEl = section.querySelector(".city-npc-copy p");
    const actionEl = section.querySelector(".city-npc-action");
    section.querySelector(".city-npc-close").addEventListener("click", closeFront);
    actionEl.addEventListener("click", () => {
      if (!active) return;
      stopSpeech();
      if (active.index < active.lines.length - 1) {
        active.index += 1;
        showLine();
      } else {
        const route = active.front.route;
        closeFront();
        route();
      }
    });
    document.body.appendChild(section);
    document.body.classList.add("city-npc-talking");
    active = { front, lines, index: 0, section, lineEl, actionEl };
    showLine();
  }

  function frontName(front) {
    return Object.keys(FRONTS).find((name) => FRONTS[name] === front) || front.id;
  }

  /* ---------- interception: take over the roster's final action tap ---------- */

  document.addEventListener("click", (event) => {
    const button = event.target?.closest?.(".city-npc-action");
    if (!button) return;
    const dialog = button.closest(".city-npc-dialogue");
    if (!dialog || dialog.hasAttribute("data-snug-front")) return; // our own dialogue
    const npcName = dialog.querySelector(".city-npc-copy b")?.textContent?.trim();
    const front = FRONTS[npcName];
    if (!front) return; // not one of ours — the roster handles it
    if (button.textContent.trim() !== front.action) return; // only the final line
    event.preventDefault();
    event.stopImmediatePropagation();
    // Tear down the roster dialogue through its own path (clears its timers/voice state).
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    openFront(front);
  }, true);

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && active) closeFront();
  });

  // Debug/verification handle (also handy for live browser checks).
  window.__snugNpcFronts = {
    fronts: FRONTS,
    buildBobbyLines,
    buildDottieLines,
    buildBarnabyLines,
    open: (name) => { const front = FRONTS[name]; if (front) openFront(front); },
    close: closeFront,
  };
})();

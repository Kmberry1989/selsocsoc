/* Selfie Social Society — Barn-Raising Co-op Events.
 * Extends the Moonlight Footbridge co-op pattern to housing construction.
 * When a player calls a barn-raising for a major upgrade (second story,
 * third story, widow's walk), NPC neighbors chip in over 24 hours and the
 * player can contribute too. Raised shells discount the upgrade's cost.
 * Peggy Plank foremen every raising in her voice.
 * State lives in players/{uid}.housing.barnRaising.
 */
(() => {
  if (window.__snugBarnRaising) return;
  window.__snugBarnRaising = true;

  /* ================= Constants ================= */

  // Major upgrades eligible for barn-raising. Goal = 40% of shell cost.
  const RAISABLE = {
    story2:     { name: "Second story",       shells: 800,  lumber: 60,  goal: 320 },
    story3:     { name: "Third story",        shells: 2000, lumber: 150, goal: 800 },
    widowswalk: { name: "Widow's walk",       shells: 1500, lumber: 100, goal: 600 },
  };
  const DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

  // NPC neighbors who chip in (labeled as neighbors, never fake humans).
  const NEIGHBORS = [
    "Barnaby Bargain", "Pip Parade", "Agnes Alley", "Dottie Daly",
    "Fern Bramble", "Stanley Stamp", "Bobby Gill", "Lyla Lens",
    "Chip Chance", "Mr. Buck Coinsworth",
  ];

  const PEGGY_LINES = {
    call: (upgrade, goal) => `Barn-raising! We're putting up a ${upgrade} the old-fashioned way — neighbors helping neighbors! Raise ${goal} shells together and I'll knock it off the build cost. Every shell lays a board!`,
    milestone: (pct, upgrade) => `${pct}% there on the ${upgrade} barn-raising! The neighbors are showing up — keep those shells coming!`,
    complete: (upgrade) => `That's a barn-raising! The ${upgrade} fund is full — every shell raised comes straight off your build cost. Let's put that roof over your head!`,
    expired: (upgrade, raised) => `The ${upgrade} barn-raising wound down with ${raised} shells raised. That's ${raised} shells off your build cost whenever you're ready — neighbors already did their part.`,
    neighbor: (name, amount, upgrade) => `${name} pitched in ${amount} shells for the ${upgrade}!`,
  };

  /* ================= State ================= */

  const state = {
    session: null,
    housing: null, // reference to housing module's public API
    timer: null,
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const esc = (value) => {
    const span = document.createElement("span");
    span.textContent = String(value ?? "");
    return span.innerHTML;
  };

  function toast(message) {
    window.dispatchEvent(new CustomEvent("snug-toast", { detail: { message } }));
    // Fallback: housing module's toast if available
    if (window.__snugHousing?.toast) window.__snugHousing.toast(message);
  }

  function peggySay(text) {
    // Route through housing module's Peggy voice if available
    if (window.__snugHousing?.peggySay) window.__snugHousing.peggySay(text);
  }

  /* ================= Housing integration ================= */

  function housingApi() {
    return window.__snugHousing || null;
  }

  function getRaising() {
    const api = housingApi();
    if (!api || !api.getData()) return null;
    return api.getData().barnRaising || null;
  }

  function saveRaising(raising) {
    const api = housingApi();
    if (!api) return Promise.reject(new Error("Housing not ready"));
    api.getData().barnRaising = raising;
    return api.save();
  }

  function clearRaising() {
    const api = housingApi();
    if (!api || !api.getData()) return Promise.resolve();
    api.getData().barnRaising = null;
    return api.save().catch(() => {});
  }

  /* ================= Barn-raising lifecycle ================= */

  function canRaise(upgradeId) {
    const spec = RAISABLE[upgradeId];
    if (!spec) return false;
    const api = housingApi();
    if (!api || !api.getData()) return false;
    const d = api.getData();
    // Already built?
    if (upgradeId === "story2" && d.stories >= 2) return false;
    if (upgradeId === "story3" && d.stories >= 3) return false;
    if (upgradeId === "widowswalk" && d.roof === "widowswalk") return false;
    // Already have an active raising?
    const raising = d.barnRaising;
    if (raising && raising.status === "active") return false;
    // Must meet level requirement
    const level = d.level || 1;
    if (upgradeId === "story2" && level < 10) return false;
    if (upgradeId === "story3" && level < 25) return false;
    if (upgradeId === "widowswalk" && level < 35) return false;
    // Story 2 needs Peggy's commission accepted
    if (upgradeId === "story2" && !d.peggyQuest?.accepted) return false;
    return true;
  }

  async function callRaising(upgradeId) {
    const spec = RAISABLE[upgradeId];
    if (!spec || !canRaise(upgradeId)) return;
    const now = Date.now();
    const raising = {
      upgradeId,
      upgradeName: spec.name,
      goal: spec.goal,
      raised: 0,
      contributors: [], // {name, amount, isNPC, at}
      startedAt: now,
      endsAt: now + DURATION_MS,
      status: "active",
      milestones: [], // 25, 50, 75 already announced
    };
    try {
      await saveRaising(raising);
    } catch (e) {
      toast("The barn-raising couldn't be saved yet.");
      return;
    }
    peggySay(PEGGY_LINES.call(spec.name, spec.goal));
    toast(`Barn-raising called for the ${spec.name}! Neighbors will chip in over 24 hours.`);
    window.dispatchEvent(new CustomEvent("snug-barn-raising-started", { detail: { upgradeId, upgradeName: spec.name, goal: spec.goal } }));
    scheduleNeighborTick();
    renderRaisingPanel();
  }

  async function contribute(amount, contributorName, isNPC = false) {
    const raising = getRaising();
    if (!raising || raising.status !== "active") return false;
    if (Date.now() > raising.endsAt) { await expireRaising(); return false; }

    amount = Math.max(1, Math.floor(Number(amount) || 0));
    if (amount <= 0) return false;

    // Player contributions spend shells
    if (!isNPC) {
      const balance = coinBalance();
      if (balance < amount) { toast(`You need ${amount} shells to contribute.`); return false; }
      window.dispatchEvent(new CustomEvent("snug-award-coins", { detail: { amount: -amount, message: `${amount} shells to the barn-raising` } }));
    }

    raising.raised += amount;
    const existing = raising.contributors.find((c) => c.name === contributorName && c.isNPC === isNPC);
    if (existing) existing.amount += amount;
    else raising.contributors.push({ name: contributorName, amount, isNPC, at: Date.now() });

    // Dispatch contribution event (fires Barn Crew stamp via /barn/i)
    window.dispatchEvent(new CustomEvent("snug-project-contribution", {
      detail: { project: `Barn-raising: ${raising.upgradeName}`, amount, contributor: contributorName },
    }));
    window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "coin-pickup" } }));

    if (isNPC) peggySay(PEGGY_LINES.neighbor(contributorName, amount, raising.upgradeName));

    // Milestones
    const pct = Math.floor((raising.raised / raising.goal) * 100);
    [25, 50, 75].forEach((m) => {
      if (pct >= m && !raising.milestones.includes(m)) {
        raising.milestones.push(m);
        peggySay(PEGGY_LINES.milestone(m, raising.upgradeName));
      }
    });

    // Complete?
    if (raising.raised >= raising.goal) {
      await completeRaising();
    } else {
      try { await saveRaising(raising); } catch (e) {}
      renderRaisingPanel();
    }
    return true;
  }

  async function completeRaising() {
    const raising = getRaising();
    if (!raising) return;
    raising.status = "complete";
    raising.raised = Math.min(raising.raised, raising.goal);
    try { await saveRaising(raising); } catch (e) {}
    peggySay(PEGGY_LINES.complete(raising.upgradeName));
    toast(`Barn-raising complete! ${raising.raised} shells off the ${raising.upgradeName} build cost.`);
    window.dispatchEvent(new CustomEvent("snug-barn-raising-complete", {
      detail: { upgradeId: raising.upgradeId, upgradeName: raising.upgradeName, raised: raising.raised, contributors: raising.contributors },
    }));
    renderRaisingPanel();
  }

  async function expireRaising() {
    const raising = getRaising();
    if (!raising || raising.status !== "active") return;
    raising.status = "expired";
    try { await saveRaising(raising); } catch (e) {}
    peggySay(PEGGY_LINES.expired(raising.upgradeName, raising.raised));
    toast(`Barn-raising ended — ${raising.raised} shells still come off the build cost.`);
    window.dispatchEvent(new CustomEvent("snug-barn-raising-expired", {
      detail: { upgradeId: raising.upgradeId, upgradeName: raising.upgradeName, raised: raising.raised },
    }));
    renderRaisingPanel();
  }

  // Discount available for an upgrade (from completed or expired raising)
  function discountFor(upgradeId) {
    const raising = getRaising();
    if (!raising || raising.upgradeId !== upgradeId) return 0;
    if (raising.status === "active") return 0; // not yet available
    return Math.min(raising.raised, RAISABLE[upgradeId]?.goal || 0);
  }

  // Called after a discounted build completes — clears the used raising
  async function consumeRaising(upgradeId) {
    const raising = getRaising();
    if (raising && raising.upgradeId === upgradeId && raising.status !== "active") {
      await clearRaising();
      renderRaisingPanel();
    }
  }

  /* ================= NPC neighbor contributions ================= */

  function scheduleNeighborTick() {
    if (state.timer) clearTimeout(state.timer);
    const raising = getRaising();
    if (!raising || raising.status !== "active") return;
    // Next neighbor contribution in 1-3 hours
    const delay = (1 + Math.random() * 2) * 60 * 60 * 1000;
    // Don't schedule past the end
    const untilEnd = raising.endsAt - Date.now();
    if (untilEnd <= 0) { expireRaising(); return; }
    state.timer = setTimeout(neighborContribute, Math.min(delay, untilEnd));
  }

  async function neighborContribute() {
    const raising = getRaising();
    if (!raising || raising.status !== "active") return;
    if (Date.now() > raising.endsAt) { await expireRaising(); return; }
    // Pick a random neighbor who hasn't contributed yet (or any if all have)
    const fresh = NEIGHBORS.filter((n) => !raising.contributors.some((c) => c.isNPC && c.name.startsWith(n)));
    const pool = fresh.length > 0 ? fresh : NEIGHBORS;
    const name = pool[Math.floor(Math.random() * pool.length)];
    const amount = 10 + Math.floor(Math.random() * 21); // 10-30 shells
    await contribute(amount, `${name} (neighbor)`, true);
    scheduleNeighborTick();
  }

  function coinBalance() {
    const el = document.querySelector(".coin-chip b");
    const parsed = Number(String(el?.textContent || "0").replace(/[^0-9.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function playerName() {
    return document.querySelector(".profile-chip b")?.textContent?.trim() || "Player";
  }

  /* ================= UI ================= */

  function raisingPanelHtml() {
    const raising = getRaising();
    if (!raising) return "";
    const spec = RAISABLE[raising.upgradeId];
    if (!spec) return "";
    const pct = Math.min(100, Math.floor((raising.raised / raising.goal) * 100));
    const remaining = Math.max(0, raising.goal - raising.raised);
    const hoursLeft = Math.max(0, (raising.endsAt - Date.now()) / (60 * 60 * 1000));
    const statusLabel = raising.status === "active"
      ? `${hoursLeft.toFixed(1)}h left`
      : raising.status === "complete" ? "Complete!" : "Ended";
    const contributors = raising.contributors
      .slice().sort((a, b) => b.amount - a.amount).slice(0, 5)
      .map((c) => `<div class="barn-contributor"><span>${esc(c.name)}</span><b>${c.amount} shells</b></div>`)
      .join("");
    return `<div class="barn-raising-panel" role="region" aria-label="Barn-raising">
      <div class="barn-head"><div><small>${raising.status === "active" ? "Barn-raising in progress" : "Barn-raising"}</small><h3>${esc(raising.upgradeName)}</h3></div><strong>${pct}%</strong></div>
      <p class="barn-copy">Neighbors are chipping in! Every shell raised comes off the build cost.</p>
      <div class="barn-progress" role="progressbar" aria-label="Barn-raising progress" aria-valuemin="0" aria-valuemax="${raising.goal}" aria-valuenow="${raising.raised}"><span style="width:${pct}%"></span></div>
      <div class="barn-progress-label"><span>${raising.raised} / ${raising.goal} shells</span><b>${statusLabel}</b></div>
      ${raising.status === "active" ? `<div class="barn-contribute-row">${[10, 25, 50].map((a) => `<button type="button" data-barn-give="${a}"><small>Give</small><b>${a}</b></button>`).join("")}</div>` : ""}
      ${raising.status !== "active" && remaining === 0 ? `<p class="barn-note">Build the ${esc(raising.upgradeName)} now — ${raising.raised} shells come straight off!</p>` : ""}
      ${raising.status === "expired" && remaining > 0 ? `<p class="barn-note">${raising.raised} shells banked toward the ${esc(raising.upgradeName)}.</p>` : ""}
      ${contributors ? `<div class="barn-subhead"><b>Top helpers</b></div>${contributors}` : ""}
    </div>`;
  }

  function renderRaisingPanel() {
    // Re-render housing panel if it's open (housing module re-renders on state change)
    const api = housingApi();
    if (api?.isOpen?.()) api.render?.();
    // Also update any standalone barn panel
    document.querySelectorAll(".barn-raising-panel").forEach((panel) => {
      const tmp = document.createElement("div");
      tmp.innerHTML = raisingPanelHtml();
      const fresh = tmp.firstElementChild;
      if (fresh) panel.replaceWith(fresh);
      else panel.remove();
    });
    bindGiveButtons();
  }

  function bindGiveButtons() {
    document.querySelectorAll("[data-barn-give]").forEach((b) => {
      if (b.__barnBound) return;
      b.__barnBound = true;
      b.addEventListener("click", () => contribute(Number(b.dataset.barnGive), playerName(), false));
    });
  }

  /* ================= Public API ================= */

  window.__snugBarnRaising = {
    RAISABLE,
    canRaise,
    callRaising,
    contribute,
    discountFor,
    consumeRaising,
    getRaising,
    raisingPanelHtml,
    renderRaisingPanel,
    bindGiveButtons,
  };

  /* ================= Session & lifecycle ================= */

  function attach(session) {
    state.session = session;
    // Resume active raising: schedule neighbor ticks, check expiry
    const raising = getRaising();
    if (raising && raising.status === "active") {
      if (Date.now() > raising.endsAt) expireRaising();
      else scheduleNeighborTick();
    }
    bindGiveButtons();
  }

  if (window.__snugSession) attach(window.__snugSession);
  window.addEventListener("snug-session", (e) => attach(e.detail));

  // Re-bind when housing panel renders
  window.addEventListener("snug-housing-rendered", () => bindGiveButtons());

  // Periodic expiry check (every 5 minutes)
  setInterval(() => {
    const raising = getRaising();
    if (raising && raising.status === "active" && Date.now() > raising.endsAt) expireRaising();
  }, 5 * 60 * 1000);
})();

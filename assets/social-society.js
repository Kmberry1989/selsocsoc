/* snug-social-society-daily-v1
 * Daily "Social Society check", delivered to every player's mailbox on login.
 * A 7-day login streak multiplies the shells: 1x, 1.25x, 1.5x, 1.75x, 2x, 2.5x, 3x.
 * Delivery is guarded once per calendar day via gameplay.socialSociety.
 */
(() => {
  if (window.__snugSocialSociety) return;
  window.__snugSocialSociety = true;

  const BASE_SHELLS = 25;
  const MULTIPLIERS = [1, 1.25, 1.5, 1.75, 2, 2.5, 3];
  const MAX_STREAK = MULTIPLIERS.length;

  const dayKey = (d = new Date()) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const shiftKey = (key, delta) => {
    const [y, m, d] = String(key).split("-").map(Number);
    return dayKey(new Date(y, m - 1, d + delta));
  };
  const readProfile = () => {
    try { return window.__snugWardrobe?.profile?.() || {}; } catch { return {}; }
  };

  async function deliver() {
    try {
      const session = window.__snugSession;
      if (!session?.uid) return;
      const mailboxUI = window.__snugMailboxUI;
      if (typeof mailboxUI?.post !== "function") return;

      const key = dayKey();
      const prev = readProfile().gameplay?.socialSociety || {};
      if (prev.date === key) return; // already delivered today

      const streak = prev.date === shiftKey(key, -1)
        ? Math.min(MAX_STREAK, Number(prev.streak || 0) + 1)
        : 1;
      const multiplier = MULTIPLIERS[streak - 1];
      const shells = Math.round(BASE_SHELLS * multiplier);

      // Persist the once-per-day guard before posting.
      window.__snugWardrobe?.updateGameplay?.((gameplay) => ({
        ...gameplay,
        socialSociety: { date: key, streak },
      }));

      await mailboxUI.post({
        type: "social-society",
        from: "cyclical-city",
        fromName: "Cyclical City",
        item: "__social_society__",
        shells,
        day: streak,
        multiplier,
      });

      window.dispatchEvent(new CustomEvent("snug-toast", {
        detail: { message: `Your Social Society check is in the mailbox · Day ${streak} (${multiplier}x)` },
      }));
    } catch (error) {
      console.warn("[social society] delivery skipped", error);
    }
  }

  // Retry until the session and mailbox UI are both ready, so a missed
  // snug-session event or slow module init can't silently skip delivery.
  // Gives up after ~30s; the once-per-day guard prevents duplicates.
  function attemptDelivery(attempt = 0) {
    const session = window.__snugSession;
    const mailboxUI = window.__snugMailboxUI;
    if (!session?.uid || typeof mailboxUI?.post !== "function") {
      if (attempt < 20) setTimeout(() => attemptDelivery(attempt + 1), 1500);
      return;
    }
    deliver();
  }

  window.addEventListener("snug-session", () => setTimeout(() => attemptDelivery(), 2500));
  // Fallback in case the session event fired before this module loaded.
  setTimeout(() => attemptDelivery(), 8000);
})();

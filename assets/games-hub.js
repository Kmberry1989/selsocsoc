/* Games Hub — one consolidated listing of every playable game.
   Injects a hub section at the top of the Play panel. Each card launches via
   the game's existing entry point; contextual shortcuts (room dice, board
   rounds, Solo Practice) keep working untouched. */
(() => {
  "use strict";

  const HUB_ID = "snug-games-hub";

  const GAMES = [
    {
      id: "whirl", name: "Whirl of Resources",
      desc: "Spin the wheel, call letters, solve the puzzle. Solo daily or play together.",
      tags: ["Solo", "Room multiplayer"],
      icon: "◉",
      launch() { window.__snugWhirlOfResources?.open(); },
    },
    {
      id: "board", name: "Snug Board",
      desc: "Party board: roll, shop, set traps, chase stars across 5+ rounds.",
      tags: ["Room multiplayer"],
      icon: "★",
      launch() {
        if (window.__snugBoard?.open) { window.__snugBoard.open(); return; }
        // Fallback: open the room sheet and click its Snug Board entry.
        document.querySelector(".room-dock")?.click();
        setTimeout(() => {
          document.querySelector("[data-action='board']")?.click();
        }, 250);
      },
    },
    {
      id: "cards", name: "Card Table",
      desc: "Go Fish, War, Old Maid — staged card games vs town neighbors.",
      tags: ["Solo"],
      icon: "♠",
      launch() {
        // Open the custom-games grid and let the player pick a card game.
        const tab = [...document.querySelectorAll(".tabbar button")]
          .find((b) => /^Play$/i.test(b.textContent?.trim() || ""));
        tab?.click();
        setTimeout(() => {
          const grid = document.querySelector(".snug-custom-game-grid");
          if (grid) grid.scrollIntoView({ block: "start", behavior: "smooth" });
          else document.querySelector("[data-snug-stage='go-fish']")?.click();
        }, 300);
      },
    },
    {
      id: "feud", name: "Survey Showdown",
      desc: "Family-feud style survey showdown vs a bot. Pick your difficulty.",
      tags: ["Solo"],
      icon: "⚡",
      launch() { window.__snugFeudShow?.open(); },
    },
    {
      id: "nosy", name: "Nosy Neighbors",
      desc: "Pass-and-play prediction show for two humans, one phone.",
      tags: ["Pass-and-play"],
      icon: "👀",
      launch() { window.__snugNosyNeighbors?.open(); },
    },
    {
      id: "arcade", name: "Minigame Arcade",
      desc: "All 24 quick minigames — Coin Scramble, Plaza Tag, Pond Fishing and more.",
      tags: ["Solo", "Board round"],
      icon: "🎮",
      launch() {
        const tab = [...document.querySelectorAll(".tabbar button")]
          .find((b) => /^Play$/i.test(b.textContent?.trim() || ""));
        tab?.click();
        setTimeout(() => {
          const grid = document.querySelector(".practice-grid");
          if (grid) grid.scrollIntoView({ block: "start", behavior: "smooth" });
        }, 300);
      },
    },
  ];

  function tagMarkup(tags) {
    return tags.map((t) => `<em class="snug-hub-tag">${t}</em>`).join("");
  }

  function buildHub() {
    const hub = document.createElement("section");
    hub.id = HUB_ID;
    hub.className = "snug-games-hub";
    hub.setAttribute("aria-label", "Games hub");
    hub.innerHTML =
      `<div class="snug-hub-head"><b>Games Hub</b><small>Every game in town, one board</small></div>` +
      `<div class="snug-hub-grid">` +
      GAMES.map((g) =>
        `<button type="button" class="snug-hub-card" data-hub-game="${g.id}">` +
        `<i aria-hidden="true">${g.icon}</i>` +
        `<span><b>${g.name}</b><small>${g.desc}</small>` +
        `<span class="snug-hub-tags">${tagMarkup(g.tags)}</span></span>` +
        `</button>`
      ).join("") +
      `</div>`;
    hub.addEventListener("click", (e) => {
      const card = e.target.closest?.("[data-hub-game]");
      if (!card) return;
      const game = GAMES.find((g) => g.id === card.dataset.hubGame);
      if (!game) return;
      try {
        window.dispatchEvent(new CustomEvent("snug-sfx", { detail: { id: "select" } }));
      } catch (_) {}
      try { game.launch(); } catch (err) { console.warn("Games hub launch failed:", game.id, err); }
    });
    return hub;
  }

  function install(root = document) {
    root.querySelectorAll?.(".play-panel").forEach((panel) => {
      if (panel.querySelector(`#${HUB_ID}`)) return;
      panel.prepend(buildHub());
    });
  }

  const observer = new MutationObserver((records) =>
    records.forEach((record) =>
      record.addedNodes.forEach((node) => {
        if (node.nodeType === 1) install(node);
      })
    )
  );

  function init() {
    install();
    observer.observe(document.documentElement, { childList: true, subtree: true });
    // Public API: tutorial + directory can open the hub.
    window.__snugGamesHub = {
      open() {
        const tab = [...document.querySelectorAll(".tabbar button")]
          .find((b) => /^Play$/i.test(b.textContent?.trim() || ""));
        tab?.click();
        setTimeout(() => {
          document.querySelector(`#${HUB_ID}`)?.scrollIntoView({ block: "start", behavior: "smooth" });
        }, 300);
      },
      games: GAMES.map((g) => ({ id: g.id, name: g.name, tags: [...g.tags] })),
    };
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

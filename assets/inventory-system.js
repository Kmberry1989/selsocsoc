(() => {
  const ITEMS = [
    { id: "keepsake-lantern-charm", name: "Lantern Charm", cost: 34, color: "#e4ad45", purpose: "A pocket-sized keepsake to collect, gift, or trade." },
    { id: "keepsake-pond-lure-pin", name: "Pond Lure Pin", cost: 32, color: "#58a2ad", purpose: "A fishing-day pin for your keepsake collection." },
    { id: "keepsake-garden-ribbon", name: "Garden Society Ribbon", cost: 38, color: "#6f9a62", purpose: "An aesthetic ribbon celebrating the community garden." },
    { id: "keepsake-mayor-button", name: "Mayor’s Brass Button", cost: 46, color: "#c69135", purpose: "A civic curio that can be collected, gifted, or traded." },
    { id: "keepsake-postage-stamp", name: "Cyclical City Stamp", cost: 28, color: "#d16c61", purpose: "A tiny postal collectible for neighbor-to-neighbor trades." },
    { id: "keepsake-festival-ticket", name: "Festival Ticket", cost: 30, color: "#9a76a9", purpose: "A colorful memento of festival nights in the plaza." },
    { id: "keepsake-cat-paw-token", name: "Cat Paw Token", cost: 36, color: "#c98863", purpose: "A cheerful cat-lover token for gifting or collecting." },
    { id: "keepsake-bridge-bolt", name: "Moonlight Bridge Bolt", cost: 42, color: "#718895", purpose: "A project souvenir marking the town’s shared bridge build." },
    { id: "keepsake-lucky-pebble", name: "Lucky Pond Pebble", cost: 24, color: "#6f8d87", purpose: "A small good-luck curio to keep or pass to a friend." },
    { id: "keepsake-music-badge", name: "Music Note Badge", cost: 34, color: "#dd7a72", purpose: "An aesthetic badge for fans of plaza performances." },
    { id: "keepsake-scarecrow-patch", name: "Tiny Scarecrow Patch", cost: 40, color: "#c78043", purpose: "A seasonal patch made for collecting and friendly trades." },
    { id: "keepsake-housewarming-card", name: "Housewarming Card", cost: 26, color: "#df8a72", purpose: "A neighborly keepsake designed to be sent as a gift." },
    { id: "tool-biome-compass", name: "Biome Compass", cost: 48, color: "#4f8b78", purpose: "A functional trail compass that points toward the four landscape regions." },
    { id: "tool-field-journal", name: "Field Journal", cost: 36, color: "#789a59", purpose: "Records flowers, trees, and decorative finds discovered on walks." },
    { id: "tool-pocket-spyglass", name: "Pocket Spyglass", cost: 44, color: "#5d849e", purpose: "Improves the stargazing reticle and doubles as a brass outfit prop." },
    { id: "tool-bug-jar", name: "Bug Jar", cost: 32, color: "#d8b34f", purpose: "Carries harmless bug finds back to Fern for garden research." },
    { id: "tool-card-folio", name: "Card Folio", cost: 40, color: "#b85d50", purpose: "Stores alternate card backs earned at Chip Chance’s table." },
    { id: "tool-trail-lantern", name: "Trail Lantern", cost: 46, color: "#e4ad45", purpose: "A wearable light for dusk walks through Whispering Wood." },
    { id: "tool-cast-bell", name: "Casting Bell", cost: 34, color: "#4d929c", purpose: "Provides an audible timing cue during fishing practice." },
    { id: "decor-picnic-cloth", name: "Sunmeadow Picnic Cloth", cost: 38, color: "#d86d60", purpose: "An aesthetic furnishing for lawns, porches, and photo scenes." },
    { id: "starlight-crown", name: "Starlight Crown", color: "#d8a83e", purpose: "Wearable glowing festival crown from Pip Parade’s Starlight Jamboree.", slot: "head-accessory", action: "wear", sprite: "assets/inventory/items/starlight-crown.png", shop: false, collection: "purpose-items" },
    { id: "lucky-bobber", name: "Lucky Bobber", color: "#57a7a5", purpose: "Equippable bobber that boosts luck for rarer pond surprises.", slot: "fishing-tool", action: "equip", sprite: "assets/inventory/items/lucky-bobber.png", shop: false, collection: "purpose-items" },
    { id: "snapshot-lens", name: "Snapshot Lens", color: "#6886ad", purpose: "Unlocks Lyla Lens’s starburst photo filter.", slot: "photo-filter", action: "unlock", sprite: "assets/inventory/items/snapshot-lens.png", shop: false, collection: "purpose-items" },
    { id: "moonlight-lantern", name: "Moonlight Lantern", color: "#e5ad43", purpose: "Holdable lantern that glows softly at night and lights the avatar.", slot: "held-item", action: "hold", sprite: "assets/inventory/items/moonlight-lantern.png", shop: false, collection: "purpose-items" },
    { id: "cat-treat-tin", name: "Cat Treat Tin", color: "#bf7654", purpose: "Shake it to attract a stray-cat follower for a while, courtesy of Agnes Alley.", slot: "held-item", action: "use", sprite: "assets/inventory/items/cat-treat-tin.png", shop: false, collection: "purpose-items" },
    { id: "golden-dice", name: "Golden Dice", color: "#d6a43b", purpose: "Snug Board consumable from Chip Chance: one free reroll per game.", slot: "board-consumable", action: "use", sprite: "assets/inventory/items/golden-dice.png", shop: false, collection: "purpose-items" },
    { id: "gideons-guitar-pick", name: "Gideon’s Guitar Pick", color: "#c56e55", purpose: "Holdable pick that strums a cheerful chord on tap.", slot: "held-item", action: "hold", sprite: "assets/inventory/items/gideons-guitar-pick.png", shop: false, collection: "purpose-items" },
    { id: "barnabys-bargain-tag", name: "Barnaby’s Bargain Tag", color: "#c98542", purpose: "Wearable price tag that floats above the head and shows joke prices.", slot: "head-accessory", action: "wear", sprite: "assets/inventory/items/barnabys-bargain-tag.png", shop: false, collection: "purpose-items" },
    { id: "dotties-streak-ribbon", name: "Dottie’s Streak Ribbon", color: "#d46c64", purpose: "Wearable ribbon that displays the login streak.", slot: "neckwear", action: "wear", sprite: "assets/inventory/items/dotties-streak-ribbon.png", shop: false, collection: "purpose-items" },
    { id: "bubble-wand", name: "Bubble Wand", color: "#689cc0", purpose: "Emote prop that blows a stream of bubbles.", slot: "held-item", action: "hold", sprite: "assets/inventory/items/bubble-wand.png", shop: false, collection: "purpose-items" },
    { id: "pips-parade-kazoo", name: "Pip’s Parade Kazoo", color: "#c65d69", purpose: "Holdable kazoo that toots a merry tune with confetti.", slot: "held-item", action: "hold", sprite: "assets/inventory/items/pips-parade-kazoo.png", shop: false, collection: "purpose-items" },
    { id: "wishing-coin", name: "Wishing Coin", color: "#caa03e", purpose: "Toss it into the pond for a random small gift.", slot: "keepsake", action: "use", sprite: "assets/inventory/items/wishing-coin.png", shop: false, collection: "purpose-items" },
    { id: "mayors-mini-top-hat", name: "Mayor’s Mini Top Hat", color: "#4f6470", purpose: "Wearable tiny star-spangled top hat from Mayor Mayor.", slot: "head-accessory", action: "wear", sprite: "assets/inventory/items/mayors-mini-top-hat.png", shop: false, collection: "purpose-items" },
    { id: "mystery-left-boot", name: "Mystery Left Boot", color: "#7b604c", purpose: "Joke trophy and the pond’s most common unbelievable catch; display it in the house.", slot: "house-display", action: "display", sprite: "assets/inventory/items/mystery-left-boot.png", shop: false, collection: "purpose-items" },
  ];

  const ITEM_BY_NAME = new Map(ITEMS.map((item) => [item.name, item]));
  const ITEM_BY_ID = new Map(ITEMS.map((item) => [item.id, item]));
  const earnedInSession = new Set();
  const WILD_CATCHES = [
    { name: "a rubber duck wearing a crown", note: "It squeaked with surprising authority.", shells: 4 },
    { name: "a ringing telephone", note: "Nobody was on the other end, but it knew your name.", shells: 7 },
    { name: "an unopened umbrella", note: "Bone dry. Somehow.", shells: 5 },
    { name: "a teacup that was still warm", note: "The pond declined to explain.", shells: 6 },
    { name: "a boot containing a smaller boot", note: "A deeply impractical nesting set.", shells: 5 },
    { name: "a tiny brass moon", note: "It hummed when held up to the sky.", shells: 9 },
    { name: "three polite keys on one ring", note: "None of them open anything in town.", shells: 6 },
    { name: "a postcard from next Tuesday", note: "The weather report looks promising.", shells: 8 },
    { name: "a spoon bent into a question mark", note: "An excellent question, honestly.", shells: 5 },
    { name: "a single extremely long shoelace", note: "It was still tied at both ends.", shells: 4 },
    { name: "a snow globe containing this pond", note: "The tiny you inside also just caught it.", shells: 10 },
    { name: "a pocket watch ticking backward", note: "It gained three minutes while you stared.", shells: 8 },
  ];
  const INVENTORY_CATCH_LINES = {
    "keepsake-lantern-charm": "a Lantern Charm glowing underwater",
    "keepsake-pond-lure-pin": "a Pond Lure Pin hooked onto your hook",
    "keepsake-garden-ribbon": "a perfectly dry Garden Society Ribbon",
    "keepsake-mayor-button": "Mayor’s missing Brass Button",
    "keepsake-postage-stamp": "a Cyclical City Stamp mailed by the pond",
    "keepsake-festival-ticket": "a Festival Ticket dated tomorrow",
    "keepsake-cat-paw-token": "a Cat Paw Token with a fresh paw print",
    "keepsake-bridge-bolt": "a Moonlight Bridge Bolt humming a tune",
    "keepsake-lucky-pebble": "a Lucky Pond Pebble that tugged back",
    "keepsake-music-badge": "a Music Note Badge playing one tiny note",
    "keepsake-scarecrow-patch": "a Tiny Scarecrow Patch stuffed with seaweed",
    "keepsake-housewarming-card": "a Housewarming Card addressed to you",
    "tool-biome-compass": "a Biome Compass still pointing north",
    "tool-field-journal": "a Field Journal sealed in waxed cloth",
    "tool-pocket-spyglass": "a Pocket Spyglass reflecting the moon",
    "tool-bug-jar": "an empty Bug Jar with its lid on tight",
    "tool-card-folio": "Chip Chance’s waterproof Card Folio",
    "tool-trail-lantern": "a Trail Lantern glowing underwater",
    "tool-cast-bell": "a Casting Bell ringing beneath the surface",
    "decor-picnic-cloth": "a neatly folded Sunmeadow Picnic Cloth",
    "starlight-crown": "Pip Parade’s glowing Starlight Crown",
    "lucky-bobber": "a Lucky Bobber that pulled itself up",
    "snapshot-lens": "Lyla Lens’s waterproof Snapshot Lens",
    "moonlight-lantern": "a Moonlight Lantern shining beneath the surface",
    "cat-treat-tin": "Agnes Alley’s sealed Cat Treat Tin",
    "golden-dice": "Chip Chance’s Golden Dice, still rolling",
    "gideons-guitar-pick": "Gideon’s Guitar Pick strumming underwater",
    "barnabys-bargain-tag": "Barnaby’s Bargain Tag marked at zero shells",
    "dotties-streak-ribbon": "Dottie’s Streak Ribbon, perfectly dry",
    "bubble-wand": "a Bubble Wand blowing bubbles on its own",
    "pips-parade-kazoo": "Pip’s Parade Kazoo tooting beneath the pond",
    "wishing-coin": "a Wishing Coin that already knows your wish",
    "mayors-mini-top-hat": "Mayor’s Mini Top Hat floating brim-up",
    "mystery-left-boot": "the Mystery Left Boot, naturally",
  };
  const svg = (kind) => {
    const common = 'viewBox="0 0 64 64" aria-hidden="true" focusable="false"';
    const art = {
      "keepsake-lantern-charm": '<path d="M23 22h18v27H23z"/><path d="M27 22c0-8 10-8 10 0M20 30h24M27 35h10v9H27zM28 49l-3 7m11-7 3 7"/>',
      "keepsake-pond-lure-pin": '<path d="M19 21c16-9 28 2 23 14-4 9-16 9-23 2 8 1 12-2 13-7-4 3-9 1-13-9Z"/><circle cx="37" cy="27" r="2"/><path d="M43 34c8 4 5 15-2 16-6 1-8-5-5-9"/>',
      "keepsake-garden-ribbon": '<circle cx="32" cy="25" r="14"/><path d="m24 37-3 18 11-7 11 7-3-18M32 15v20m-10-10h20"/>',
      "keepsake-mayor-button": '<circle cx="32" cy="32" r="20"/><circle cx="25" cy="27" r="2"/><circle cx="39" cy="27" r="2"/><circle cx="25" cy="39" r="2"/><circle cx="39" cy="39" r="2"/>',
      "keepsake-postage-stamp": '<path d="M16 15h32v34H16z"/><path d="M16 21h-4m4 8h-4m4 8h-4m4 8h-4m40-24h-4m4 8h-4m4 8h-4m4 8h-4"/><path d="M25 38c10-2 15-8 13-17-9 3-14 9-13 17Z"/>',
      "keepsake-festival-ticket": '<path d="M12 22h40v8c-6 1-6 7 0 8v8H12v-8c6-1 6-7 0-8Z"/><path d="M34 23v22M40 30h6m-6 7h6"/>',
      "keepsake-cat-paw-token": '<circle cx="32" cy="32" r="22"/><ellipse cx="32" cy="38" rx="10" ry="8"/><circle cx="21" cy="29" r="4"/><circle cx="29" cy="23" r="4"/><circle cx="38" cy="23" r="4"/><circle cx="45" cy="30" r="4"/>',
      "keepsake-bridge-bolt": '<path d="m20 13 24 7 7 24-20 9-19-14Z"/><circle cx="32" cy="33" r="9"/><path d="M26 33h12M32 27v12"/>',
      "keepsake-lucky-pebble": '<path d="M12 37c0-13 11-24 24-22 10 1 17 11 16 22-1 10-11 14-21 13-11 0-19-4-19-13Z"/><path d="M23 31c4-6 12-7 18-2"/>',
      "keepsake-music-badge": '<circle cx="32" cy="32" r="22"/><path d="M29 40V20l15-3v18M29 40c0 5-9 7-11 2-2-4 4-8 11-6m15-1c0 5-9 7-11 2-2-4 4-8 11-6"/>',
      "keepsake-scarecrow-patch": '<path d="M17 22h30l-5 30H22Z"/><path d="M26 22c0-8 12-8 12 0M14 22h36M24 33l6 3 5-4 6 4"/>',
      "keepsake-housewarming-card": '<path d="M12 18h40v30H12z"/><path d="m12 21 20 16 20-16M24 47V35h16v12"/>',
      "tool-biome-compass": '<circle cx="32" cy="32" r="22"/><path d="m37 19-4 16-14 10 6-16Z"/><circle cx="32" cy="32" r="3"/>',
      "tool-field-journal": '<path d="M15 11h33v44H15z"/><path d="M21 11v44M28 23h13M28 31h13M28 39h9"/>',
      "tool-pocket-spyglass": '<path d="m14 42 25-25 8 8-25 25Z"/><path d="m36 14 6-6 14 14-6 6M12 43l9 9"/>',
      "tool-bug-jar": '<path d="M20 18h24v7l5 7v22H15V32l5-7Z"/><path d="M19 14h26M24 38h16M32 30v17"/>',
      "tool-card-folio": '<path d="M12 17h40v34H12z"/><path d="M20 13h28v34M17 24h29M34 30l7 5-7 5Z"/>',
      "tool-trail-lantern": '<path d="M20 24h24v28H20z"/><path d="M24 24c0-11 16-11 16 0M16 29h32M27 34h10v12H27z"/>',
      "tool-cast-bell": '<path d="M19 43h26l-4-7V25c0-12-18-12-18 0v11Z"/><circle cx="32" cy="49" r="4"/><path d="M14 21c-4 6-4 15 0 21m36-21c4 6 4 15 0 21"/>',
      "decor-picnic-cloth": '<path d="m13 20 34-8 6 34-34 8Z"/><path d="m16 30 34-8M19 42l34-8M30 16l6 34M41 14l6 34"/>',
    };
    return `<svg ${common}>${art[kind] || '<circle cx="32" cy="32" r="18"/>'}</svg>`;
  };
  const itemArt = (item, className = "") => item?.sprite
    ? `<img${className ? ` class="${className}"` : ""} src="${item.sprite}" alt="" draggable="false" decoding="async">`
    : svg(item?.id);

  const installCatalog = () => {
    if (!window.__snugCosmetics || !Array.isArray(window.__snugShopCosmetics)) return false;
    const normalized = ITEMS.map((item) => ({
      ...item,
      category: item.collection === "purpose-items" ? "Purpose item" : "Pocket keepsake",
      slot: item.slot || "keepsake",
      fitPending: false,
      renderMode: item.sprite ? "transparent-sprite" : "placeholder-svg",
      preserveAlpha: Boolean(item.sprite),
    }));
    window.__snugCosmetics.keepsakes = normalized.filter((item) => item.collection !== "purpose-items");
    window.__snugCosmetics["purpose-items"] = normalized.filter((item) => item.collection === "purpose-items");
    const known = new Set(window.__snugShopCosmetics.map((item) => item.id));
    normalized.forEach((item) => { if (item.shop !== false && !known.has(item.id)) window.__snugShopCosmetics.push(item); });
    window.__snugInventoryCatalog = normalized;
    window.__snugInventorySprites = Object.fromEntries(normalized.filter((item) => item.sprite).map((item) => [item.id, {
      src: item.sprite,
      transparent: true,
      alphaTest: 0.01,
      depthWrite: false,
      premultipliedAlpha: false,
      slot: item.slot,
      action: item.action,
    }]));
    window.__snugCreateInventorySprite = (itemId, className = "snug-item-sprite") => {
      const item = ITEM_BY_ID.get(itemId);
      if (!item) return null;
      if (!item.sprite) {
        const holder = document.createElement("span");
        holder.className = className;
        holder.innerHTML = svg(item.id);
        return holder;
      }
      const image = document.createElement("img");
      image.className = className;
      image.src = item.sprite;
      image.alt = "";
      image.draggable = false;
      image.decoding = "async";
      image.dataset.inventoryItem = item.id;
      return image;
    };
    return true;
  };

  const enhanceInventory = (root = document) => {
    root.querySelectorAll?.('.society-sheet nav button').forEach((button) => {
      if (button.textContent.trim() === "Collection") button.textContent = "Inventory";
    });
    root.querySelectorAll?.('.collection-group').forEach((group) => {
      const heading = group.querySelector('h3');
      if (heading && /^Keepsakes/i.test(heading.textContent.trim())) {
        const count = heading.querySelector('small')?.outerHTML || '';
        heading.innerHTML = `Pocket keepsakes${count}`;
        group.classList.add('inventory-keepsakes');
      } else if (heading && /^Purpose Items/i.test(heading.textContent.trim())) {
        const count = heading.querySelector('small')?.outerHTML || '';
        heading.innerHTML = `Purpose items${count}`;
        group.classList.add('inventory-keepsakes', 'inventory-purpose-items');
      }
      group.querySelectorAll(':scope > div > span').forEach((card) => {
        const label = card.textContent.trim();
        const item = ITEM_BY_NAME.get(label);
        if (!item || card.dataset.inventorySprite) return;
        card.dataset.inventorySprite = item.id;
        card.dataset.renderMode = item.sprite ? 'transparent-sprite' : 'placeholder-svg';
        card.innerHTML = `<span class="inventory-sprite" style="--sprite-color:${item.color}">${itemArt(item)}</span><span class="inventory-copy"><b>${item.name}</b><small>${item.purpose}</small></span>`;
        if (earnedInSession.has(item.id)) card.classList.remove('missing'), card.classList.add('owned');
        card.title = card.classList.contains('owned') ? `${item.name} · Owned` : `${item.name} · Not owned yet`;
      });
    });
  };

  const choose = (list) => list[Math.floor(Math.random() * list.length)];
  const surpriseSvg = () => '<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M18 18c8-9 25-8 29 3 5 14-15 13-15 24"/><path d="M32 54h.01"/><path d="M11 32c-4-3-5-8-2-12m44 4c3 4 3 9 0 13"/></svg>';
  const revealCatch = (catchData) => {
    document.querySelector('.fishing-loot-reveal')?.remove();
    const panel = document.createElement('section');
    panel.className = 'fishing-loot-reveal';
    panel.setAttribute('role', 'status');
    const item = catchData.item;
    panel.innerHTML = `<span class="fishing-loot-sprite" style="--sprite-color:${item?.color || '#557f88'}">${item ? itemArt(item) : surpriseSvg()}</span><span><small>${item ? 'Inventory catch' : 'Impossible catch'}</small><b>You pulled up ${catchData.name}!</b><em>${item ? 'Added to your inventory.' : `${catchData.note} · +${catchData.shells} shells`}</em></span>`;
    document.body.appendChild(panel);
    requestAnimationFrame(() => panel.classList.add('show'));
    setTimeout(() => { panel.classList.remove('show'); setTimeout(() => panel.remove(), 220); }, 3800);
    const action = document.querySelector('.fishing-action');
    if (action) {
      const small = action.querySelector('small');
      const label = action.querySelector('b');
      if (small) small.textContent = item ? 'Stored in inventory' : 'Unbelievable catch';
      if (label) label.textContent = catchData.name.replace(/^a /, '');
    }
  };
  const awardCatch = () => {
    const getsItem = Math.random() < 0.36;
    if (getsItem) {
      const item = choose(ITEMS);
      earnedInSession.add(item.id);
      window.dispatchEvent(new CustomEvent('snug-player-patch', { detail: (player) => ({
        ...player,
        owned: [...new Set([...(player.owned || []), item.id])],
        inventory: [...new Set([...(player.inventory || player.owned || []), item.id])],
      }) }));
      const result = { item, name: INVENTORY_CATCH_LINES[item.id] || item.name };
      revealCatch(result);
      window.dispatchEvent(new CustomEvent('snug-fishing-loot', { detail: result }));
    } else {
      const result = choose(WILD_CATCHES);
      window.dispatchEvent(new CustomEvent('snug-award-coins', { detail: { amount: result.shells, message: `${result.name} · +${result.shells} shells` } }));
      revealCatch(result);
      window.dispatchEvent(new CustomEvent('snug-fishing-loot', { detail: result }));
    }
    enhanceInventory(document);
  };
  const watchFishingResults = () => {
    let handledText = '';
    const scan = () => {
      const toast = document.querySelector('.multiplayer-toast');
      const text = toast?.textContent?.trim() || '';
      if (text === 'Fish landed' && text !== handledText) {
        handledText = text;
        toast.textContent = 'Something is on the line…';
        awardCatch();
      } else if (/fish slipped away/i.test(text)) {
        toast.textContent = 'Whatever was down there slipped away';
        handledText = '';
      } else if (text !== 'Fish landed') handledText = '';
    };
    new MutationObserver(scan).observe(document.body, { childList: true, subtree: true, characterData: true });
  };

  const installWhenReady = () => {
    if (installCatalog()) enhanceInventory();
    else setTimeout(installWhenReady, 120);
  };
  const start = () => { installWhenReady(); watchFishingResults(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
  new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
    if (node.nodeType === 1) enhanceInventory(node);
  }))).observe(document.documentElement, { childList: true, subtree: true });
})();

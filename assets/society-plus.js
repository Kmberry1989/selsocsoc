const state = {
  session: null,
  profile: { inventory: [], coinBalance: 0, equippedAppearance: {}, gameplay: {} },
  gameplay: {},
  presence: [],
  socialEvents: [],
  mail: [],
  panel: null,
  view: "today",
  lastPosition: null,
  saveTimer: 0,
  polling: 0,
  busy: false,
  seen: new Set(),
};

const $ = (selector, root = document) => root.querySelector(selector);
const esc = (value) => { const span = document.createElement("span"); span.textContent = String(value ?? ""); return span.innerHTML; };
const name = () => $(".profile-chip b")?.textContent?.trim() || state.session?.playerName || "Player";
const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };
const dayNumber = (key = today()) => Math.floor(new Date(`${key}T12:00:00`).getTime() / 86400000);
const inventory = () => Array.isArray(state.profile.inventory) ? state.profile.inventory : [];
const showToast = (message) => {
  let toast = $(".society-toast");
  if (!toast) { toast = document.createElement("div"); toast.className = "society-toast"; toast.setAttribute("role", "status"); document.body.appendChild(toast); }
  toast.textContent = message; toast.classList.add("show"); clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove("show"), 2300);
};

function firestoreValue(value) {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === "boolean") return { booleanValue: value };
  if (typeof value === "number") return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  if (typeof value === "string") return { stringValue: value };
  if (Array.isArray(value)) return { arrayValue: { values: value.map(firestoreValue) } };
  return { mapValue: { fields: Object.fromEntries(Object.entries(value).map(([key, item]) => [key, firestoreValue(item)])) } };
}
function decodeValue(value = {}) {
  if ("stringValue" in value) return value.stringValue;
  if ("integerValue" in value) return Number(value.integerValue);
  if ("doubleValue" in value) return Number(value.doubleValue);
  if ("booleanValue" in value) return value.booleanValue;
  if ("nullValue" in value) return null;
  if (value.arrayValue) return (value.arrayValue.values || []).map(decodeValue);
  if (value.mapValue) return Object.fromEntries(Object.entries(value.mapValue.fields || {}).map(([key, item]) => [key, decodeValue(item)]));
  if (value.timestampValue) return value.timestampValue;
  return null;
}
function decodeFields(fields = {}) { return Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, decodeValue(value)])); }
async function authHeaders() {
  if (!state.session?.user) throw Error("Waiting for Firebase sign-in");
  return { "Content-Type": "application/json", Authorization: `Bearer ${await state.session.user.getIdToken()}` };
}
function firestoreUrl(uid = state.session?.uid) {
  const project = state.session?.projectId || state.session?.app?.options?.projectId;
  return `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(project)}/databases/(default)/documents/players/${encodeURIComponent(uid)}`;
}
function firestoreCollectionUrl(uid, collection = "mail") {
  return `${firestoreUrl(uid)}/${encodeURIComponent(collection)}`;
}
async function listMail() {
  const response = await fetch(`${firestoreCollectionUrl(state.session.uid)}?pageSize=30&orderBy=createdAt%20desc`, { headers: await authHeaders() });
  if (!response.ok) throw Error(`Mailbox returned ${response.status}`);
  const payload = await response.json();
  return (payload.documents || []).map(document => ({ id: document.name.split("/").pop(), ...decodeFields(document.fields || {}) }));
}
async function postMail(uid, message) {
  const response = await fetch(firestoreCollectionUrl(uid), { method: "POST", headers: await authHeaders(), body: JSON.stringify({ fields: Object.fromEntries(Object.entries(message).map(([key,value]) => [key, firestoreValue(value)])) }) });
  if (!response.ok) throw Error(`Mailbox write returned ${response.status}`);
  return response.json();
}
async function deleteMail(id) {
  const response = await fetch(`${firestoreCollectionUrl(state.session.uid)}/${encodeURIComponent(id)}`, { method: "DELETE", headers: await authHeaders() });
  if (!response.ok) throw Error(`Mailbox delete returned ${response.status}`);
}
async function loadProfile() {
  const response = await fetch(firestoreUrl(), { headers: await authHeaders() });
  if (!response.ok) throw Error(`Player data returned ${response.status}`);
  state.profile = { ...state.profile, ...decodeFields((await response.json()).fields || {}) };
  state.gameplay = state.profile.gameplay && typeof state.profile.gameplay === "object" ? state.profile.gameplay : {};
  ensureDaily();
}
async function saveGameplay() {
  clearTimeout(state.saveTimer);
  state.profile.gameplay = state.gameplay;
  const url = `${firestoreUrl()}?updateMask.fieldPaths=gameplay`;
  const response = await fetch(url, { method: "PATCH", headers: await authHeaders(), body: JSON.stringify({ fields: { gameplay: firestoreValue(state.gameplay) } }) });
  if (!response.ok) throw Error(`Progress save returned ${response.status}`);
}
function queueSave() { clearTimeout(state.saveTimer); state.saveTimer = setTimeout(() => saveGameplay().catch(() => showToast("Progress will retry when Firebase reconnects")), 500); }
function patchPlayer(updater) {
  const updated = typeof updater === "function" ? updater(state.profile) : { ...state.profile, ...updater };
  state.profile = updated;
  window.dispatchEvent(new CustomEvent("snug-player-patch", { detail: player => ({ ...player, ...updated, owned: updated.inventory || player.owned || [] }) }));
}
function award(amount, message) {
  state.profile.coinBalance = Math.max(0, Number(state.profile.coinBalance || 0) + amount);
  window.dispatchEvent(new CustomEvent("snug-award-coins", { detail: { amount, message } }));
}

const QUESTS = [
  { id: "coin-collector", label: "Gather 8 coins in Coin Scramble", game: "coin", goal: 8, reward: 18 },
  { id: "tag-two", label: "Make 2 tags in Plaza Tag", game: "tag", goal: 2, reward: 20 },
  { id: "quiz-four", label: "Score 4 points in Room Quiz", game: "quiz", goal: 4, reward: 20 },
  { id: "balloon-eight", label: "Pop 8 balloons", game: "balloon", goal: 8, reward: 24 },
  { id: "race-winner", label: "Win a race", games: ["sprint", "relay"], goal: 1, reward: 30, requireWin: true },
  { id: "fish-three", label: "Catch 3 fish", game: "fishing", goal: 3, reward: 24 },
  { id: "tiles-winner", label: "Win a Tumble Tiles round", game: "floor", goal: 1, reward: 22, requireWin: true },
  { id: "four-row-winner", label: "Win at Four in a Row", game: "connect4", goal: 1, reward: 28, requireWin: true },
  { id: "noughts-winner", label: "Win at Noughts & Crosses", game: "tictactoe", goal: 1, reward: 24, requireWin: true },
  { id: "keepsake-five", label: "Find 5 village keepsakes", game: "scavenger", goal: 5, reward: 22 },
  { id: "relay-six", label: "Clear 6 relay gates", game: "relay", goal: 6, reward: 22 },
  { id: "potato-three", label: "Make 3 hot-potato passes", game: "potato", goal: 3, reward: 26 },
  { id: "mayor-eight", label: "Match 8 Mayor Says moves", game: "simon", goal: 8, reward: 22 },
  { id: "hide-four", label: "Score 4 points in Hide & Seek", game: "hide", goal: 4, reward: 28 },
  { id: "statues-three", label: "Hold 3 musical-statue freezes", game: "statues", goal: 3, reward: 24 },
  { id: "memory-three", label: "Match 3 memory pairs", game: "memory", goal: 3, reward: 26 },
  { id: "pattern-six", label: "Repeat 6 parade steps", game: "pattern", goal: 6, reward: 24 },
  { id: "draw-two", label: "Make 2 sketch guesses", game: "draw", goal: 2, reward: 28 },
  { id: "cats-three", label: "Herd 3 cats", game: "cats", goal: 3, reward: 26 },
  { id: "bridge-five", label: "Gather 5 bridge supplies", game: "bridge", goal: 5, reward: 28 },
  { id: "curling-one", label: "Land a scoring curl", game: "curling", goal: 1, reward: 24 },
  { id: "charades-two", label: "Guess 2 emote charades", game: "charades", goal: 2, reward: 26 },
  { id: "sneaky-one", label: "Catch 1 sneaky bluff", game: "sneaky", goal: 1, reward: 28 },
  { id: "snap-three", label: "Frame 3 scavenger sights", game: "snap", goal: 3, reward: 26 },
  { id: "puffs-three", label: "Dodge 3 puffs", game: "puffs", goal: 3, reward: 24 },
  { id: "freeze-two", label: "Make 2 Freeze Tag saves", game: "freeze", goal: 2, reward: 26 },
  { id: "treasure-three", label: "Dig up 3 treasures", game: "treasure", goal: 3, reward: 26 },
  { id: "snowball-four", label: "Hit 4 snowball targets", game: "snowball", goal: 4, reward: 24 },
  { id: "lantern-five", label: "Find 5 lanterns", game: "lantern", goal: 5, reward: 26 },
  { id: "petal-five", label: "Catch 5 golden petals", game: "petal", goal: 5, reward: 24 },
];
const ACHIEVEMENTS = [
  { id: "first-round", name: "Game Night", note: "Finish a minigame", reward: 20, test: g => (g.totals?.rounds || 0) >= 1 },
  { id: "trail-shoes", name: "Trail Shoes", note: "Walk 1,000 steps", reward: 35, test: g => (g.totals?.steps || 0) >= 1000 },
  { id: "good-neighbor", name: "Good Neighbor", note: "Send 10 friendly reactions", reward: 30, test: g => (g.totals?.social || 0) >= 10 },
  { id: "collector", name: "Curio Cabinet", note: "Own five unlocks", reward: 40, test: () => inventory().length >= 5 },
  { id: "festival-friend", name: "Festival Friend", note: "Claim a festival keepsake", reward: 30, test: g => Object.keys(g.festivalRewards || {}).length >= 1 },
];
const FESTIVAL_REWARDS = {
  Fireworks: { id: "festival-sparkler-pin", name: "Sparkler Pin" },
  Meteors: { id: "festival-stargazer-scarf", name: "Stargazer Scarf" },
  Parade: { id: "festival-parade-rosette", name: "Parade Rosette" },
};

function ensureDaily() {
  const key = today();
  const previous = state.gameplay.daily || {};
  const yesterday = dayNumber(key) - 1;
  let streak = Number(previous.streak || 0);
  if (previous.date !== key) streak = dayNumber(previous.date) === yesterday ? Math.min(7, streak + 1) : 1;
  const picks = Array.from({ length: 3 }, (_, index) => QUESTS[(dayNumber(key) * 3 + index * 2) % QUESTS.length]);
  const progress = previous.date === key ? (previous.progress || {}) : {};
  const claimed = previous.date === key ? (previous.claimed || {}) : {};
  state.gameplay.daily = { date: key, streak, loginClaimed: previous.date === key && previous.loginClaimed === true, progress, claimed, questIds: picks.map(q => q.id) };
  state.gameplay.totals ||= { steps: 0, rounds: 0, emotes: 0, social: 0 };
  state.gameplay.achievements ||= {};
  state.gameplay.festivalRewards ||= {};
  state.gameplay.shopPurchases ||= {};
  queueSave();
}
function dailyQuests() { return (state.gameplay.daily?.questIds || []).map(id => QUESTS.find(q => q.id === id)).filter(Boolean); }
function progress(unit, amount = 1) {
  if (!state.session) return;
  ensureDaily();
  state.gameplay.totals[unit] = Number(state.gameplay.totals[unit] || 0) + amount;
  queueSave();
  renderPanel();
}
function recordMinigame(detail = {}) {
  if (!state.session || !detail.game) return;
  ensureDaily();
  const score = Math.max(0, Number(detail.score || 0));
  const daily = state.gameplay.daily;
  dailyQuests().forEach(quest => {
    const games = quest.games || [quest.game];
    if (!games.includes(detail.game) || (quest.requireWin && !detail.won)) return;
    const earned = quest.requireWin ? 1 : score;
    if (earned > 0) daily.progress[quest.id] = Math.min(quest.goal, Number(daily.progress[quest.id] || 0) + earned);
  });
  queueSave();
  renderPanel();
}
function claimLogin() {
  const daily = state.gameplay.daily;
  if (daily.loginClaimed) return;
  const reward = 5 + Math.min(6, daily.streak - 1) * 3;
  daily.loginClaimed = true; queueSave(); award(reward, `${daily.streak}-day welcome · +${reward} shells`); renderPanel();
}
function showQuestReceipt(quest, amount, before) {
  document.querySelector(".solo-result-backdrop")?.remove();
  const backdrop = document.createElement("div");
  backdrop.className = "solo-result-backdrop society-reward-backdrop";
  backdrop.innerHTML = `<section class="solo-result" role="dialog" aria-modal="true" aria-labelledby="quest-result-title"><small>Daily quest complete</small><h2 id="quest-result-title">${esc(quest.label)}</h2><div class="solo-balance"><span><small>Before</small><b>${before}</b></span><i aria-hidden="true">+</i><span class="solo-payout"><small>Bonus</small><b>${amount}</b></span><i aria-hidden="true">=</i><span><small>After</small><b>${before + amount}</b></span></div><p>Dottie’s bonus is now in your shell balance.</p><div class="solo-result-actions"><button type="button" data-quest-done>Done</button><button type="button" class="multi-primary" data-quest-today>Today’s quests</button></div></section>`;
  const close = () => backdrop.remove();
  backdrop.addEventListener("pointerdown", event => { if (event.target === backdrop) close(); });
  $("[data-quest-done]", backdrop)?.addEventListener("click", close);
  $("[data-quest-today]", backdrop)?.addEventListener("click", () => { close(); openPanel("today"); });
  document.body.appendChild(backdrop);
}
function claimQuest(id) {
  const quest = QUESTS.find(q => q.id === id); const daily = state.gameplay.daily;
  if (!quest || daily.claimed[id] || Number(daily.progress[id] || 0) < quest.goal) return;
  const before = Number(state.profile.coinBalance || 0);
  daily.claimed[id] = true; queueSave(); award(quest.reward, `${quest.label} · +${quest.reward} shells`); renderPanel();
  showQuestReceipt(quest, quest.reward, before);
}
function claimAchievement(id) {
  const achievement = ACHIEVEMENTS.find(a => a.id === id);
  if (!achievement || state.gameplay.achievements[id] || !achievement.test(state.gameplay)) return;
  state.gameplay.achievements[id] = Date.now(); queueSave(); award(achievement.reward, `${achievement.name} · +${achievement.reward} shells`);
  window.dispatchEvent(new CustomEvent("snug-achievement-unlocked", { detail: { id: achievement.id } }));
  renderPanel();
}
function activeFestival() {
  const scene = window.__snugWorld?.scene;
  if (!scene) return null;
  return Object.entries(FESTIVAL_REWARDS).find(([key]) => scene.getObjectByName(`TownFestival${key}`))?.[1] || null;
}
function claimFestivalReward() {
  const reward = activeFestival();
  if (!reward || state.gameplay.festivalRewards[reward.id]) return;
  state.gameplay.festivalRewards[reward.id] = Date.now();
  patchPlayer(profile => ({ ...profile, inventory: [...new Set([...(profile.inventory || []), reward.id])] }));
  queueSave(); showToast(`${reward.name} added to your collection`); renderPanel();
}

function databaseBase() {
  const options = state.session?.app?.options || {};
  return String(options.databaseURL || `https://${options.projectId || state.session?.projectId}-default-rtdb.firebaseio.com`).replace(/\/$/, "");
}
async function rtdb(path, options = {}) {
  const [pathPart, query = ""] = String(path).split("?");
  const encoded = pathPart.split("/").map(encodeURIComponent).join("/");
  const response = await fetch(`${databaseBase()}/${encoded}.json${query ? `?${query}` : ""}`, { ...options, headers: { ...(await authHeaders()), ...(options.headers || {}) } });
  if (!response.ok) throw Error(`Village network returned ${response.status}`);
  return response.json().catch(() => null);
}
async function pollSocial() {
  if (!state.session) return;
  try {
    const [presence, events, mail] = await Promise.all([
      rtdb("presence/plaza?orderBy=%22updatedAt%22&limitToLast=30"),
      rtdb("social/plaza/events?orderBy=%22createdAt%22&limitToLast=50"),
      listMail(),
    ]);
    state.presence = Object.values(presence || {}).filter(p => p.uid && p.uid !== state.session.uid && Date.now() - Number(p.updatedAt || 0) < 20000);
    state.socialEvents = Object.entries(events || {}).map(([id, value]) => ({ id, ...value })).filter(e => e.to === state.session.uid || e.from === state.session.uid).sort((a,b) => a.createdAt-b.createdAt);
    state.mail = Array.isArray(mail) ? mail.sort((a,b) => Number(b.createdAt)-Number(a.createdAt)) : [];
    for (const event of [...state.socialEvents.slice(-8), ...state.mail.slice(0, 5)]) {
      if (state.seen.has(event.id)) continue;
      state.seen.add(event.id);
      if (event.to === state.session.uid && event.from !== state.session.uid) showToast(event.type === "knock" ? `${event.fromName} has arrived at your door` : event.type === "reaction" ? `${event.fromName} sent a ${event.reaction}` : event.type === "trade" ? `${event.fromName} offered a trade` : event.type === "gift" ? `${event.fromName} sent a gift` : "A neighbor reached out");
      if (event.type === "trade-accepted" && event.to === state.session.uid && event.item) {
        patchPlayer(profile => ({ ...profile, inventory: [...new Set((profile.inventory || []).filter(id => id !== event.item).concat(event.want || []))] }));
        deleteMail(event.id).catch(() => {});
      }
    }
    renderPanel();
  } catch {}
}
async function sendSocial(type, targetUid, extra = {}) {
  if (!targetUid || state.busy) return;
  state.busy = true;
  try {
    await rtdb("social/plaza/events", { method: "POST", body: JSON.stringify({ type, from: state.session.uid, fromName: name().slice(0,18), to: targetUid, createdAt: Date.now(), ...extra }) });
    if (["reaction","knock"].includes(type)) progress("social", 1);
    showToast(type === "knock" ? "Doorbell sent" : type === "trade" ? "Trade offered" : "Reaction sent");
  } catch { showToast("That did not reach the village network"); }
  finally { state.busy = false; pollSocial(); }
}
async function sendGift(targetUid, item) {
  if (!targetUid || !item || !inventory().includes(item) || state.busy) return;
  state.busy = true;
  try {
    await postMail(targetUid, { type: "gift", from: state.session.uid, fromName: name().slice(0,18), to: targetUid, item, createdAt: Date.now() });
    patchPlayer(profile => ({ ...profile, inventory: (profile.inventory || []).filter(id => id !== item) }));
    progress("social", 1); showToast("Gift placed in their mailbox");
  } catch { showToast("The gift was not sent; your item is still yours"); }
  finally { state.busy = false; renderPanel(); }
}
async function acceptGift(message) {
  if (!message?.item) return;
  patchPlayer(profile => ({ ...profile, inventory: [...new Set([...(profile.inventory || []), message.item])] }));
  await deleteMail(message.id).catch(() => {});
  showToast(`${displayName(message.item)} added to your collection`); pollSocial();
}
async function acceptTrade(event) {
  if (!event?.item || !inventory().includes(event.want)) return showToast(`You need ${displayName(event.want)} to accept`);
  patchPlayer(profile => ({ ...profile, inventory: [...new Set((profile.inventory || []).filter(id => id !== event.want).concat(event.item))] }));
  await postMail(event.from, { type:"trade-accepted", from:state.session.uid, fromName:name().slice(0,18), to:event.from, item:event.item, want:event.want, createdAt:Date.now() });
  await deleteMail(event.id).catch(() => {});
  showToast("Trade complete"); pollSocial();
}
const displayName = (id) => String(id || "item").replace(/[-_]+/g," ").replace(/\b\w/g, c => c.toUpperCase());

function rotatingShop() {
  const catalog = (window.__snugShopCosmetics || []).filter(item => !item.fitPending);
  if (!catalog.length) return [];
  const seed = dayNumber();
  return Array.from({ length: Math.min(3, catalog.length) }, (_, index) => catalog[(seed * 7 + index * 3) % catalog.length]);
}
function buyDaily(item) {
  const bought = state.gameplay.shopPurchases[today()] || [];
  if (!item || bought.includes(item.id) || inventory().includes(item.id)) return;
  const price = Math.max(10, Number(item.cost || 40) - 10);
  if (Number(state.profile.coinBalance || 0) < price) return showToast("Play a round to earn more shells");
  state.gameplay.shopPurchases[today()] = [...bought, item.id]; queueSave();
  patchPlayer(profile => ({ ...profile, inventory: [...new Set([...(profile.inventory || []), item.id])] }));
  award(-price, `${item.name} · −${price} shells`); renderPanel();
}

function todayMarkup() {
  const daily = state.gameplay.daily || {};
  const loginReward = 5 + Math.min(6, Number(daily.streak || 1) - 1) * 3;
  const quests = dailyQuests().map(q => { const value = Number(daily.progress?.[q.id] || 0); const done = value >= q.goal; const claimed = daily.claimed?.[q.id]; return `<article class="society-task"><div><b>${esc(q.label)}</b><small>${Math.floor(value)} / ${q.goal}</small><i><span style="width:${Math.min(100,value/q.goal*100)}%"></span></i></div><button data-claim-quest="${q.id}" ${!done || claimed ? "disabled" : ""}>${claimed ? "Claimed" : `+${q.reward}`}</button></article>`; }).join("");
  const shop = rotatingShop().map(item => { const bought = (state.gameplay.shopPurchases?.[today()] || []).includes(item.id) || inventory().includes(item.id); const price = Math.max(10, Number(item.cost || 40) - 10); return `<article class="daily-item"><span style="--item-color:${item.color || '#7ca083'}"></span><div><small>${esc(item.category)}</small><b>${esc(item.name)}</b></div><button data-daily-buy="${esc(item.id)}" ${bought ? "disabled" : ""}>${bought ? "Owned" : `${price} shells`}</button></article>`; }).join("") || `<p class="society-empty">Approved daily stock will appear after cosmetic files are added.</p>`;
  return `<section class="streak-card"><div><small>Login streak</small><b>${daily.streak || 1} day${daily.streak === 1 ? "" : "s"}</b><p>Tomorrow’s welcome grows a little more.</p></div><button data-login ${daily.loginClaimed ? "disabled" : ""}>${daily.loginClaimed ? "Collected" : `Collect ${loginReward}`}</button></section><div class="society-section"><h3>Today’s quests</h3>${quests}</div><div class="society-section"><h3>Daily market shelf</h3><div class="daily-shop">${shop}</div></div>`;
}
function playerOptions() { return state.presence.map(player => `<option value="${esc(player.uid)}">${esc(player.name || "Neighbor")}</option>`).join(""); }
function socialMarkup() {
  const online = state.presence.length;
  const ownedOptions = inventory().map(id => `<option value="${esc(id)}">${esc(displayName(id))}</option>`).join("");
  const activity = state.socialEvents.slice(-8).reverse().map(event => `<li><b>${esc(event.from === state.session.uid ? `To ${event.targetName || "neighbor"}` : event.fromName)}</b><span>${esc(event.type === "reaction" ? event.reaction : event.type.replace(/-/g," "))}</span>${event.type === "reaction" && event.to === state.session.uid ? `<button data-return-reaction="${esc(event.from)}" data-reaction-kind="${esc(event.reaction || 'wave')}">Return</button>` : event.type === "trade" && event.to === state.session.uid ? `<button data-accept-trade="${esc(event.id)}">Accept</button>` : ""}</li>`).join("") || `<li class="society-empty">Wave, knock, or offer a trade when a neighbor arrives.</li>`;
  const mail = state.mail.filter(message => message.type !== "trade-accepted").map(message => message.type === "trade" ? `<li><div><b>${esc(message.fromName)} offers ${esc(displayName(message.item))}</b><small>For your ${esc(displayName(message.want))}</small></div><button data-accept-trade="${esc(message.id)}">Accept trade</button></li>` : `<li><div><b>${esc(message.fromName)} sent ${esc(displayName(message.item))}</b><small>Waiting in your mailbox</small></div><button data-accept-gift="${esc(message.id)}">Open gift</button></li>`).join("") || `<li class="society-empty">Your mailbox is empty.</li>`;
  return `<div class="social-status"><b>${online} neighbor${online === 1 ? "" : "s"} nearby</b><small>Live in the village plaza</small></div><div class="society-section"><h3>Quick reaction</h3><div class="social-compose"><select data-person><option value="">Choose a neighbor</option>${playerOptions()}</select><button data-reaction="wave">Wave</button><button data-reaction="high-five">High-five</button><button data-knock>Knock</button></div></div><div class="society-section"><h3>Trade or gift</h3><div class="trade-grid"><select data-trade-person><option value="">Neighbor</option>${playerOptions()}</select><select data-offer><option value="">Your item</option>${ownedOptions}</select><select data-want><option value="">Ask for…</option>${ownedOptions}</select><button data-trade>Offer trade</button><button data-gift>Mailbox gift</button></div></div><div class="society-section"><h3>Mailbox</h3><ul class="mail-list">${mail}</ul></div><div class="society-section"><h3>Recent exchanges</h3><ul class="activity-list">${activity}</ul></div>`;
}
function collectionMarkup() {
  const groups = Object.entries(window.__snugCosmetics || {}).map(([category, items]) => {
    const real = items.filter(item => item.id && !item.fitPending); if (!real.length) return "";
    return `<section class="collection-group"><h3>${esc(displayName(category))}<small>${real.filter(item => inventory().includes(item.id)).length}/${real.length}</small></h3><div>${real.map(item => `<span class="${inventory().includes(item.id) ? "owned" : "missing"}"><i></i>${esc(item.name)}</span>`).join("")}</div></section>`;
  }).join("");
  const rewards = Object.values(FESTIVAL_REWARDS).map(item => `<span class="${inventory().includes(item.id) ? "owned" : "missing"}"><i></i>${esc(item.name)}</span>`).join("");
  return `${groups || `<p class="society-empty">Approved customization pieces will fill this catalog.</p>`}<section class="collection-group"><h3>Festival keepsakes<small>${Object.keys(state.gameplay.festivalRewards || {}).length}/3</small></h3><div>${rewards}</div></section>`;
}
function achievementsMarkup() {
  const cards = ACHIEVEMENTS.map(a => { const unlocked = a.test(state.gameplay); const claimed = Boolean(state.gameplay.achievements?.[a.id]); return `<article class="achievement ${unlocked ? "ready" : ""}"><span aria-hidden="true"></span><div><b>${esc(a.name)}</b><small>${esc(a.note)}</small></div><button data-achievement="${a.id}" ${!unlocked || claimed ? "disabled" : ""}>${claimed ? "Earned" : unlocked ? `Claim ${a.reward}` : "Locked"}</button></article>`; }).join("");
  const festival = activeFestival();
  return `<div class="society-section"><h3>Achievements</h3>${cards}</div><section class="festival-reward"><div><small>Festival exclusive</small><b>${festival ? esc(festival.name) : "Visit during a festival"}</b><p>${festival ? "A limited keepsake is ready while the celebration is live." : "Fireworks Night, Meteor Shower, and the Costume Parade each carry one keepsake."}</p></div><button data-festival-reward ${!festival || state.gameplay.festivalRewards?.[festival.id] ? "disabled" : ""}>${festival && state.gameplay.festivalRewards?.[festival.id] ? "Collected" : "Claim"}</button></section>`;
}

function closePanel() { state.panel?.remove(); state.panel = null; document.body.classList.remove("society-open"); }
function openPanel(view = state.view) {
  state.view = view;
  closePanel();
  const backdrop = document.createElement("div"); backdrop.className = "society-backdrop";
  backdrop.innerHTML = `<section class="society-sheet" role="dialog" aria-modal="true" aria-label="Society journal"><div class="society-grabber"></div><header><div><small>Neighbor journal</small><h2>Life around town</h2></div><button data-close aria-label="Close journal">×</button></header><nav>${[["today","Today"],["social","Social"],["collection","Collection"],["awards","Awards"]].map(([id,label]) => `<button data-view="${id}" class="${view===id?"active":""}">${label}</button>`).join("")}</nav><main>${view === "today" ? todayMarkup() : view === "social" ? socialMarkup() : view === "collection" ? collectionMarkup() : achievementsMarkup()}</main></section>`;
  backdrop.addEventListener("pointerdown", event => { if (event.target === backdrop) closePanel(); });
  document.body.appendChild(backdrop); state.panel = backdrop; document.body.classList.add("society-open"); bindPanel();
}
function renderPanel() { if (state.panel) openPanel(state.view); renderDock(); }
function bindPanel() {
  const root = state.panel;
  $("[data-close]", root)?.addEventListener("click", closePanel);
  root.querySelectorAll("[data-view]").forEach(button => button.addEventListener("click", () => openPanel(button.dataset.view)));
  $("[data-login]", root)?.addEventListener("click", claimLogin);
  root.querySelectorAll("[data-claim-quest]").forEach(button => button.addEventListener("click", () => claimQuest(button.dataset.claimQuest)));
  root.querySelectorAll("[data-daily-buy]").forEach(button => button.addEventListener("click", () => buyDaily(rotatingShop().find(item => item.id === button.dataset.dailyBuy))));
  root.querySelectorAll("[data-achievement]").forEach(button => button.addEventListener("click", () => claimAchievement(button.dataset.achievement)));
  $("[data-festival-reward]", root)?.addEventListener("click", claimFestivalReward);
  root.querySelectorAll("[data-reaction]").forEach(button => button.addEventListener("click", () => sendSocial("reaction", $("[data-person]",root)?.value, { reaction: button.dataset.reaction })));
  $("[data-knock]",root)?.addEventListener("click", () => sendSocial("knock", $("[data-person]",root)?.value));
  $("[data-trade]",root)?.addEventListener("click", async () => {
    const target = $("[data-trade-person]",root)?.value, item = $("[data-offer]",root)?.value, want = $("[data-want]",root)?.value;
    if (!target || !item || !want || item === want) return showToast("Choose two different items for the trade");
    try { await postMail(target, { type:"trade", from:state.session.uid, fromName:name().slice(0,18), to:target, item, want, createdAt:Date.now() }); progress("social",1); showToast("Trade offer sent"); pollSocial(); }
    catch { showToast("The trade offer was not sent"); }
  });
  $("[data-gift]",root)?.addEventListener("click", () => sendGift($("[data-trade-person]",root)?.value, $("[data-offer]",root)?.value));
  root.querySelectorAll("[data-return-reaction]").forEach(button => button.addEventListener("click", () => sendSocial("reaction", button.dataset.returnReaction, { reaction: button.dataset.reactionKind || "wave" })));
  root.querySelectorAll("[data-accept-gift]").forEach(button => button.addEventListener("click", () => acceptGift(state.mail.find(item => item.id === button.dataset.acceptGift))));
  root.querySelectorAll("[data-accept-trade]").forEach(button => button.addEventListener("click", () => acceptTrade(state.mail.find(item => item.id === button.dataset.acceptTrade))));
}
function renderDock() {
  let dock = $(".society-dock");
  if (!dock) { dock = document.createElement("button"); dock.type = "button"; dock.className = "society-dock"; dock.innerHTML = `<i aria-hidden="true"></i><b>Journal</b><span></span>`; dock.addEventListener("click", () => openPanel()); document.body.appendChild(dock); }
  dock.hidden = window.__snugWorld?.mode !== "village" || document.documentElement.classList.contains("snug-start-open");
  const ready = dailyQuests().filter(q => Number(state.gameplay.daily?.progress?.[q.id] || 0) >= q.goal && !state.gameplay.daily?.claimed?.[q.id]).length + (state.gameplay.daily && !state.gameplay.daily.loginClaimed ? 1 : 0);
  const badge = $("span", dock); badge.textContent = ready ? String(ready) : ""; badge.hidden = !ready;
}

window.addEventListener("snug-session", async event => {
  state.session = event.detail;
  try { await loadProfile(); } catch { ensureDaily(); }
  clearInterval(state.polling); state.polling = setInterval(pollSocial, 3000); pollSocial(); renderDock();
});
window.addEventListener("snug-world-ready", renderDock);
window.addEventListener("snug-player-move", event => {
  const p = event.detail; if (!p) return;
  if (state.lastPosition) { const distance = Math.hypot(Number(p.x)-state.lastPosition.x, Number(p.z)-state.lastPosition.z); if (distance > .03 && distance < 2) progress("steps", distance * 2.2); }
  state.lastPosition = { x:Number(p.x)||0, z:Number(p.z)||0 };
});
window.addEventListener("snug-award-coins", event => { if (/Round complete/i.test(event.detail?.message || "")) progress("rounds", 1); });
window.addEventListener("snug-minigame-achievement", event => recordMinigame(event.detail));
window.addEventListener("pointerdown", event => { if (/^(Happy|Calm|Cheeky|Angry|Sad|Laughter|Laugh|Yawn|Side-eye|Wave)$/i.test(event.target.closest?.("button")?.textContent?.trim() || "")) progress("emotes", 1); }, true);
if (window.__snugSession) window.dispatchEvent(new CustomEvent("snug-session", { detail: window.__snugSession }));
renderDock();

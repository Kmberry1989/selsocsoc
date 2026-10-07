// Firebase Console → Project settings → Cloud Messaging → Web Push certificates.
// Replace this value with the public Web Push certificate key pair before deploying.
const FAMILY_PING_VAPID_KEY = "BPg8SlQynzc71UagsAiv4SikTX8nsc8HuqkdzAlN-ICaLEor_vq9CQgYRWPFUjLiRE1Q3BRokTRAa_KazWfHToc";
const FIREBASE_MODULE_VERSION = "11.0.2";

const state = {
  session: window.__snugSession || null,
  messaging: null,
  messagingApi: null,
  registration: null,
  currentToken: "",
  busy: false,
  refreshTimer: 0,
};

const vapidConfigured = () => FAMILY_PING_VAPID_KEY && !FAMILY_PING_VAPID_KEY.startsWith("PASTE_");
const supportsPush = () => "Notification" in window && "serviceWorker" in navigator && "PushManager" in window;
const playerName = () => document.querySelector(".profile-chip b")?.textContent?.trim().slice(0, 18) || "Player";
const escPath = (value) => String(value).split("/").map(encodeURIComponent).join("/");

function databaseBase() {
  const options = state.session?.app?.options || {};
  return String(options.databaseURL || `https://${options.projectId || state.session?.projectId}-default-rtdb.firebaseio.com`).replace(/\/$/, "");
}

async function databaseRequest(path, options = {}) {
  if (!state.session?.user) throw new Error("Waiting for Firebase sign-in");
  const token = await state.session.user.getIdToken();
  const response = await fetch(`${databaseBase()}/${escPath(path)}.json`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body?.error || `Realtime Database returned ${response.status}`);
  }
  return response.json().catch(() => null);
}

function showStatus(message) {
  let toast = document.querySelector(".multiplayer-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "multiplayer-toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showStatus.timer);
  showStatus.timer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function roomIdFromPanel() {
  const code = document.querySelector(".multiplayer-sheet[data-view='rooms'] .family-code strong")?.textContent || "";
  const compact = code.toLowerCase().replace(/[^a-z2-9]/g, "");
  return /^[a-z2-9]{10}$/.test(compact) ? `room-${compact}` : "";
}

function updateToggle() {
  document.querySelectorAll(".snug-help-push-toggle").forEach((button) => {
    const on = Boolean(state.currentToken);
    button.disabled = state.busy || !supportsPush();
    button.setAttribute("aria-checked", String(on));
    button.setAttribute("aria-pressed", String(on));
    if (!supportsPush()) button.textContent = "Unavailable";
    else if (!vapidConfigured()) button.textContent = "Set up key";
    else if (Notification.permission === "denied") button.textContent = "Blocked";
    else if (state.busy) button.textContent = "Working…";
    else button.textContent = on ? "Pings on" : "Pings off";
  });
}

async function loadMessaging() {
  if (state.messaging && state.messagingApi) return state.messagingApi;
  if (!state.session?.app?.options) throw new Error("Firebase is still connecting");
  const [{ initializeApp, getApps }, messagingApi] = await Promise.all([
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_MODULE_VERSION}/firebase-app.js`),
    import(`https://www.gstatic.com/firebasejs/${FIREBASE_MODULE_VERSION}/firebase-messaging.js`),
  ]);
  const app = getApps().find((candidate) => candidate.name === "cylindric-family-pings") || initializeApp(state.session.app.options, "cylindric-family-pings");
  state.messaging = messagingApi.getMessaging(app);
  state.messagingApi = messagingApi;
  messagingApi.onMessage(state.messaging, showForegroundPing);
  return messagingApi;
}

async function registerToken({ requestPermission = false, quiet = false } = {}) {
  if (state.busy || !state.session?.user || !supportsPush()) return;
  if (!vapidConfigured()) {
    if (!quiet) showStatus("Add the Web Push VAPID key in push-notifications.js first");
    return;
  }
  if (Notification.permission === "denied") {
    if (!quiet) showStatus("Notifications are blocked in this browser’s site settings");
    updateToggle();
    return;
  }
  state.busy = true;
  updateToggle();
  try {
    if (requestPermission && Notification.permission !== "granted") {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") throw new Error("Notification permission wasn’t granted");
    }
    if (Notification.permission !== "granted") return;
    const messagingApi = await loadMessaging();
    if (!state.registration) {
      try {
        state.registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", { scope: "/" });
      } catch {
        // Muse static artifacts only publish files under assets/. The downloadable
        // Vercel project includes the preferred root copy; this fallback keeps
        // opt-in notifications functional in the artifact preview too.
        state.registration = await navigator.serviceWorker.register("assets/firebase-messaging-sw.js");
      }
    }
    const nextToken = await messagingApi.getToken(state.messaging, {
      vapidKey: FAMILY_PING_VAPID_KEY,
      serviceWorkerRegistration: state.registration,
    });
    if (!nextToken) throw new Error("Firebase did not return a notification token");
    if (state.currentToken && state.currentToken !== nextToken) {
      await databaseRequest(`users/${state.session.uid}/fcmTokens/${state.currentToken}`, { method: "DELETE" }).catch(() => {});
    }
    state.currentToken = nextToken;
    await databaseRequest(`users/${state.session.uid}/fcmTokens/${nextToken}`, {
      method: "PUT",
      body: JSON.stringify({ updatedAt: Date.now() }),
    });
    if (!quiet) showStatus("Family pings are on");
    scheduleRefresh();
  } catch (error) {
    if (!quiet) showStatus(String(error?.message || "Couldn’t turn on family pings"));
  } finally {
    state.busy = false;
    updateToggle();
  }
}

async function disableNotifications() {
  if (state.busy) return;
  state.busy = true;
  updateToggle();
  try {
    if (state.currentToken && state.session?.uid) {
      await databaseRequest(`users/${state.session.uid}/fcmTokens/${state.currentToken}`, { method: "DELETE" });
    }
    if (state.messaging && state.messagingApi) await state.messagingApi.deleteToken(state.messaging).catch(() => false);
    state.currentToken = "";
    clearTimeout(state.refreshTimer);
    showStatus("Family pings are off");
  } catch (error) {
    showStatus(String(error?.message || "Couldn’t turn off family pings"));
  } finally {
    state.busy = false;
    updateToggle();
  }
}

function scheduleRefresh() {
  clearTimeout(state.refreshTimer);
  state.refreshTimer = setTimeout(() => registerToken({ quiet: true }), 30 * 60 * 1000);
}

function showForegroundPing(payload) {
  const roomId = String(payload?.data?.roomId || "");
  if (!/^room-[a-z2-9]{10}$/.test(roomId)) return;
  const senderName = String(payload?.data?.senderName || "Someone").slice(0, 18);
  const roomName = String(payload?.data?.roomName || "the family room").slice(0, 36);
  document.querySelector(".family-ping-toast")?.remove();
  const toast = document.createElement("div");
  toast.className = "family-ping-toast";
  toast.setAttribute("role", "status");
  const copy = document.createElement("span");
  const title = document.createElement("b");
  const detail = document.createElement("small");
  const join = document.createElement("button");
  title.textContent = `${senderName} pinged the family room`;
  detail.textContent = `Tap to join ${roomName}`;
  join.type = "button";
  join.textContent = "Join";
  join.addEventListener("click", () => {
    window.location.assign(`/?room=${encodeURIComponent(roomId)}`);
  });
  copy.append(title, detail);
  toast.append(copy, join);
  document.body.appendChild(toast);
  clearTimeout(showForegroundPing.timer);
  showForegroundPing.timer = setTimeout(() => toast.remove(), 9000);
}

async function pingFamily(button) {
  const roomId = roomIdFromPanel();
  if (!roomId || !state.session?.uid || button.disabled) return;
  button.disabled = true;
  button.textContent = "Pinging…";
  try {
    await databaseRequest(`pings/${roomId}`, {
      method: "POST",
      body: JSON.stringify({
        senderUid: state.session.uid,
        senderName: playerName(),
        sentAt: Date.now(),
      }),
    });
    showStatus("Family ping sent");
    button.textContent = "Ping sent";
  } catch (error) {
    showStatus(String(error?.message || "Couldn’t ping the family room"));
    button.disabled = false;
    button.textContent = "Ping family";
  }
}

function enhanceUi() {
  document.querySelectorAll(".snug-help-card").forEach((card) => {
    if (card.querySelector(".snug-help-push-row")) return;
    const row = document.createElement("div");
    row.className = "snug-help-voice-row snug-help-push-row";
    row.innerHTML = '<span><b>Notify me about family pings</b><small>Alerts when someone calls the room together.</small></span><button class="snug-help-push-toggle" type="button" role="switch" aria-checked="false">Pings off</button>';
    row.querySelector("button").addEventListener("click", () => state.currentToken ? disableNotifications() : registerToken({ requestPermission: true }));
    const skip = card.querySelector(".snug-help-skip");
    card.insertBefore(row, skip || null);
  });

  document.querySelectorAll(".multiplayer-sheet[data-view='rooms']").forEach((panel) => {
    if (!panel.querySelector(".family-code") || panel.querySelector(".family-ping-button")) return;
    const actions = panel.querySelector(".room-actions");
    if (!actions) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "family-ping-button";
    button.textContent = "Ping family";
    button.disabled = !state.session;
    button.addEventListener("click", () => pingFamily(button));
    actions.prepend(button);
  });
  updateToggle();
}

const observer = new MutationObserver(enhanceUi);
observer.observe(document.documentElement, { childList: true, subtree: true });
enhanceUi();

window.addEventListener("snug-session", (event) => {
  state.session = event.detail;
  enhanceUi();
  if (Notification.permission === "granted") registerToken({ quiet: true });
});
window.addEventListener("online", () => {
  if (Notification.permission === "granted") registerToken({ quiet: true });
});
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && state.currentToken) registerToken({ quiet: true });
});

if (state.session && Notification.permission === "granted") registerToken({ quiet: true });

const { onValueCreated } = require("firebase-functions/v2/database");
const { initializeApp } = require("firebase-admin/app");
const { getDatabase } = require("firebase-admin/database");
const { getMessaging } = require("firebase-admin/messaging");

initializeApp();

const INVALID_TOKEN_CODES = new Set([
  "messaging/registration-token-not-registered",
  "messaging/invalid-registration-token",
]);

function siteOrigin() {
  const configured = String(process.env.SITE_URL || "").trim();
  if (!configured) throw new Error("SITE_URL is not configured in functions/.env");
  const url = new URL(configured);
  if (url.protocol !== "https:" && url.hostname !== "localhost") {
    throw new Error("SITE_URL must use HTTPS");
  }
  url.pathname = "/";
  url.search = "";
  url.hash = "";
  return url;
}

exports.sendFamilyRoomPing = onValueCreated(
  {
    ref: "/pings/{roomId}/{pingId}",
    region: "us-central1",
  },
  async (event) => {
    const database = getDatabase();
    const pingRef = event.data.ref;
    const ping = event.data.val() || {};
    const roomId = String(event.params.roomId || "");
    const senderUid = String(ping.senderUid || "");
    const senderName = String(ping.senderName || "Someone").slice(0, 18);

    try {
      const roomSnapshot = await database.ref(`rooms/${roomId}`).get();
      const room = roomSnapshot.val();
      if (!room || room.private !== true || room.members?.[senderUid] !== true) return;

      const memberUids = Object.entries(room.members || {})
        .filter(([uid, joined]) => joined === true && uid !== senderUid)
        .map(([uid]) => uid);
      if (!memberUids.length) return;

      const tokenSnapshots = await Promise.all(
        memberUids.map((uid) => database.ref(`users/${uid}/fcmTokens`).get())
      );
      const tokenOwners = new Map();
      tokenSnapshots.forEach((snapshot, index) => {
        Object.keys(snapshot.val() || {}).forEach((token) => tokenOwners.set(token, memberUids[index]));
      });
      const tokens = [...tokenOwners.keys()];
      if (!tokens.length) return;

      const roomName = String(room.name || "the family room").slice(0, 36);
      const joinUrl = siteOrigin();
      joinUrl.searchParams.set("room", roomId);
      const response = await getMessaging().sendEachForMulticast({
        tokens,
        notification: {
          title: `${senderName} pinged the family room`,
          body: `Tap to join ${roomName}`,
        },
        data: {
          roomId,
          roomName,
          senderName,
          joinUrl: joinUrl.href,
        },
        webpush: {
          fcmOptions: { link: joinUrl.href },
        },
      });

      const removals = {};
      response.responses.forEach((result, index) => {
        if (!result.success && INVALID_TOKEN_CODES.has(result.error?.code)) {
          const token = tokens[index];
          const ownerUid = tokenOwners.get(token);
          if (ownerUid) removals[`users/${ownerUid}/fcmTokens/${token}`] = null;
        }
      });
      if (Object.keys(removals).length) await database.ref().update(removals);
    } finally {
      await pingRef.remove();
    }
  }
);

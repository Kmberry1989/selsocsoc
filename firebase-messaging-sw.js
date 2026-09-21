self.addEventListener("push", (event) => {
  if (!event.data) return;
  let payload = {};
  try {
    payload = event.data.json();
  } catch {
    payload = { notification: { body: event.data.text() } };
  }
  const data = payload.data || {};
  const notification = payload.notification || {};
  const roomId = /^room-[a-z2-9]{10}$/.test(String(data.roomId || "")) ? String(data.roomId) : "";
  const title = notification.title || `${data.senderName || "Someone"} pinged the family room`;
  const body = notification.body || `Tap to join ${data.roomName || "the family room"}`;
  event.waitUntil(self.registration.showNotification(title, {
    body,
    tag: roomId ? `family-ping-${roomId}` : "family-ping",
    renotify: true,
    data: { roomId },
  }));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const roomId = String(event.notification.data?.roomId || "");
  if (!/^room-[a-z2-9]{10}$/.test(roomId)) return;
  const joinUrl = new URL("/", self.location.origin);
  joinUrl.searchParams.set("room", roomId);
  event.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    const existing = windows.find((client) => new URL(client.url).origin === self.location.origin);
    if (existing) {
      await existing.navigate(joinUrl.href);
      return existing.focus();
    }
    return self.clients.openWindow(joinUrl.href);
  })());
});

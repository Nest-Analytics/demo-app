import { useState } from "react";
import { makeNotification } from "./storage.js";

export function useNotifications() {
  const [notifications, setNotifications] = useState(() => [
    makeNotification("Welcome", "Your workspace is ready."),
  ]);
  const [unreadCount, setUnreadCount] = useState(1);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  function pushNotification(label, value) {
    setNotifications((current) => [
      makeNotification(label, value),
      ...current,
    ].slice(0, 8));
    setUnreadCount((current) => current + 1);
  }

  function toggleNotifications() {
    setNotificationsOpen((value) => {
      const next = !value;
      if (next) setUnreadCount(0);
      return next;
    });
  }

  function closeNotifications() {
    setNotificationsOpen(false);
  }

  return {
    notifications,
    unreadCount,
    notificationsOpen,
    pushNotification,
    toggleNotifications,
    closeNotifications,
  };
}

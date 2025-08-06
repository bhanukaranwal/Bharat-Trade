import React, { createContext, useState, useEffect } from "react";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(() => {
    // Load notifications from localStorage if available
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("notifications");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    // Persist notifications to localStorage whenever changed
    if (typeof window !== "undefined") {
      localStorage.setItem("notifications", JSON.stringify(notifications));
    }
  }, [notifications]);

  const addNotification = (notification) => {
    const id = Date.now();
    const newNotification = { id, ...notification, date: new Date().toISOString() };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, addNotification, removeNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

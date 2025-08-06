import React, { useContext } from "react";
import { NotificationContext } from "../context/NotificationContext";

const Notifications = () => {
  const { notifications, removeNotification } = useContext(NotificationContext);

  if (!notifications.length) return null;

  return (
    <div
      className="fixed top-4 right-4 max-w-sm space-y-2 z-50"
      aria-live="polite"
      aria-atomic="true"
    >
      {notifications.map(({ id, title, message, date }) => (
        <div
          key={id}
          className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow rounded p-4 animate-slide-in"
          role="alert"
          tabIndex={0}
        >
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">{title}</h4>
            <button
              onClick={() => removeNotification(id)}
              aria-label="Dismiss notification"
              className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>
          <p>{message}</p>
          <small className="text-gray-400 dark:text-gray-500">{new Date(date).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
};

export default Notifications;

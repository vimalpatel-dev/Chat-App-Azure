const express = require("express");
const notificationsController = require("../Controllers/notification_controller");
const notificationRouter = express.Router();

// Store Notification
notificationRouter.post(
  "/notifications",
  notificationsController.storeNotification
);

// Notification list with pagination
notificationRouter.get(
  "/notifications",
  notificationsController.getNotifications
);

// Read all notification
notificationRouter.patch(
  "/notifications/read-all",
  notificationsController.readAllNotifications
);

// Clear All notification
notificationRouter.delete(
  "/notifications",
  notificationsController.clearAllNotifications
);

// Unread count
notificationRouter.get(
  "/notifications/unread-count",
  notificationsController.getUnreadCount
);

module.exports = notificationRouter;

const express = require("express");
const notificationsController = require("../Controllers/notification_controller");
const validateStoreNotificationRequest = require("../Middleware/notification.middleware");
const notificationRouter = express.Router();

// Store Notification
notificationRouter.post(
  "/notifications/store",
  // validateStoreNotificationRequest,
  notificationsController.storeNotification
);

// Notification list with pagination
notificationRouter.get(
  "/notifications/list",
  notificationsController.getNotifications
);

// Read all notification
notificationRouter.post(
  "/notifications/read/all",
  notificationsController.readAllNotifications
);

// Clear All notification
notificationRouter.delete(
  "/notifications/clear/all",
  notificationsController.clearAllNotifications
);

// Unread count
notificationRouter.get(
  "/notifications/unread-count",
  notificationsController.getUnreadCount
);

module.exports = notificationRouter;

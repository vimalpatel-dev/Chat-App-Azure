const express = require("express");
const notificationsController = require("../Controllers/notification_controller");
const router = express.Router();

router.post("/notifications", notificationsController.storeNotification);

// Notification list with pagination
router.get("/notifications", notificationsController.getNotifications);

// Read all notification
router.patch(
  "/notifications/read-all",
  notificationsController.readAllNotifications
);

// Clear All notification
router.delete("/notifications", notificationsController.clearAllNotifications);

// Unread count
router.get(
  "/notifications/unread-count",
  notificationsController.getUnreadCount
);

module.exports = router;

const Notification = require("../Models/notification.schema");

// Store notification
exports.storeNotification = async (req, res) => {
  try {
    const { title, message } = req.body;
    const notification = new Notification({ title, message });
    await notification.save();
    res.status(201).json({ data: notification, statusCode: 201 });
  } catch (error) {
    next({ statusCode: 500, message: error.message });
    // res.status(500).json({ error: error.message });
  }
};

//  Notification list with pagination
exports.getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skipCount = (page - 1) * limit;

    const notifications = await Notification.find({ deleted: false })
      .skip(skipCount)
      .limit(parseInt(limit));
    res.json({ data: notification, statusCode: 200 });
  } catch (error) {
    next({ statusCode: 500, message: error.message });
    // res.status(500).json({ error: error.message });
  }
};

// Read all notification
exports.readAllNotifications = async (req, res) => {
  try {
    await Notification.updateMany(
      { deleted: false, read: false },
      { read: true }
    );
    res.json({
      message: "All notifications marked as read",
      data: [],
      statusCode: 200,
    });
  } catch (error) {
    next({ statusCode: 500, message: error.message });
    // res.status(500).json({ error: error.message });
  }
};

//  Clear All notification
exports.clearAllNotifications = async (req, res) => {
  try {
    await Notification.updateMany({ deleted: false }, { deleted: true });
    res.json({
      message: "All notifications soft deleted",
      data: [],
      statusCode: 200,
    });
  } catch (error) {
    next({ statusCode: 500, message: error.message });
    // res.status(500).json({ error: error.message });
  }
};

// Unread count
exports.getUnreadCount = async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({
      read: false,
      deleted: false,
    });
    res.json({ data: unreadCount, statusCode: 201 });
  } catch (error) {
    next({ statusCode: 500, message: error.message });
    // res.status(500).json({ error: error.message });
  }
};

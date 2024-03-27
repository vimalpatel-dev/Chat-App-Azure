const Notification = require("../Models/notification.schema");

// Store notification
exports.storeNotification = async (req, res) => {
  try {
    const { title, message, user_id } = req.body;
    const notification = new Notification({ title, message, user_id });
    await notification.save();
    res.status(201).json({
      statusCode: 201,
      message: "Notification stored successfully",
      data: notification,
    });
  } catch (error) {
    next({ statusCode: 500, message: error.message });
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
    res.json({
      statusCode: 200,
      message: "Notifications retrieved successfully",
      data: notifications,
    });
  } catch (error) {
    next({ statusCode: 500, message: error.message });
  }
};

// Read all notification
exports.readAllNotifications = async (req, res) => {
  try {
    await Notification.updateMany(
      { deleted: false, read: false },
      { read: true, read_datetime: new Date() }
    );
    res.json({
      statusCode: 200,
      message: "All notifications marked as read",
      data: [],
    });
  } catch (error) {
    next({ statusCode: 500, message: error.message });
  }
};

//  Clear All notification
exports.clearAllNotifications = async (req, res) => {
  try {
    await Notification.updateMany(
      { deleted: false },
      { deleted: true, deleted_time: new Date() }
    );
    res.json({
      statusCode: 200,
      message: "All notifications soft deleted",
      data: [],
    });
  } catch (error) {
    next({ statusCode: 500, message: error.message });
  }
};

// Unread count
exports.getUnreadCount = async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({
      read: false,
      deleted: false,
    });
    res.json({
      statusCode: 200,
      message: "Unread count retrieved successfully",
      data: unreadCount,
    });
  } catch (error) {
    next({ statusCode: 500, message: error.message });
  }
};

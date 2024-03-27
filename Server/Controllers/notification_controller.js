const Notification = require("../Models/notification.schema");

storeNotificationUsingFrontEnd = async (
  title = "default title",
  message = "default message",
  user_id = "default_uuid"
) => {
  try {
    const notification = new Notification({ title, message, user_id });
    await notification.save();
    return notification;
  } catch (error) {
    next({ statusCode: 500, message: error.message });
  }
};

// Store notification
storeNotification = async (req, res, next) => {
  try {
    const { title, message, user_id } = req.body;
    const notification = new Notification({ title, message, user_id });
    await notification.save();
    //send notification
    res.status(201).json({
      statusCode: 200,
      message: "Notification stored successfully",
      data: [],
    });
  } catch (error) {
    next({ statusCode: 500, message: error.message });
  }
};

//  Notification list with pagination
getNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 10, userId } = req.query;
    if (!userId) {
      return next({ statusCode: 400, message: "Provide the user ID" });
    }
    const skipCount = (page - 1) * limit;

    const notifications = await Notification.find({
      deleted: false,
      user_id: userId,
    })
      .skip(skipCount)
      .limit(parseInt(limit));

    const totalRecords = await Notification.countDocuments({
      deleted: false,
      user_id: userId,
    });
    const totalUnreadCounts = await totalUnreadCount(userId);
    res.json({
      statusCode: 200,
      message: "Notifications retrieved successfully",
      data: notifications,
      pagination: {
        current_page: parseInt(page),
        total_records: totalRecords,
        total_unread_counts: totalUnreadCounts,
      },
    });
  } catch (error) {
    next({ statusCode: 500, message: error.message });
  }
};

// Read all notification
readAllNotifications = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return next({ statusCode: 400, message: "Provide the user ID" });
    }
    const nDate = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Calcutta",
    });
    console.log(nDate);

    await Notification.updateMany(
      { deleted: false, read: false, user_id: userId },
      { read: true, read_datetime: nDate }
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
clearAllNotifications = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return next({ statusCode: 400, message: "Provide the user ID" });
    }
    await Notification.updateMany(
      { deleted: false, user_id: userId },
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
getUnreadCount = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return next({ statusCode: 400, message: "Provide the user ID" });
    }

    const unreadCount = await Notification.countDocuments({
      read: false,
      deleted: false,
      user_id: userId,
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

const totalUnreadCount = async (userId) => {
  try {
    if (!userId) {
      return next({ statusCode: 400, message: "Provide the user ID" });
    }
    const unreadCount = await Notification.countDocuments({
      read: false,
      deleted: false,
      user_id: userId,
    });
    return unreadCount;
  } catch (error) {
    next({ statusCode: 500, message: error.message });
  }
};

module.exports = {
  storeNotificationUsingFrontEnd,
  storeNotification,
  getNotifications,
  readAllNotifications,
  clearAllNotifications,
  getUnreadCount,
};

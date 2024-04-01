const Notification = require("../Models/notification.schema");

const totalUnreadCount = async (userId) => {
  try {
    const unreadCount = await Notification.countDocuments({
      read: false,
      deleted: false,
      user_id: userId,
    });
    return unreadCount;
  } catch (error) {
    throw error;
  }
};

module.exports = totalUnreadCount;

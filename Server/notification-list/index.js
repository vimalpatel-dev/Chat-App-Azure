const Notification = require("../Models/notification.schema");
const totalUnreadCount = require("../SharedCode/total_unredcount");
const sendErrorResponse = require("../SharedCode/errorResponse");

module.exports = async function (context, req) {
  try {
    const { page = 1, limit = 10, userId } = req.query;
    if (!userId) {
      sendErrorResponse(
        context,
        "user ID not provided",
        "user ID not provided",
        400
      );
      return;
    }
    const skipCount = (page - 1) * limit;

    const notifications = await Notification.find({
      deleted: false,
      user_id: userId,
    })
      .sort({ datetime: -1 })
      .skip(skipCount)
      .limit(parseInt(limit))
      .select("-__v");

    const totalRecords = await Notification.countDocuments({
      deleted: false,
      user_id: userId,
    });
    const totalUnreadCounts = await totalUnreadCount(userId);

    context.res = {
      status: 200,
      body: {
        ResponseStatus: "Success",
        Message: "Notifications retrieved successfully",
        ResponseData: notifications,
        pagination: {
          current_page: parseInt(page),
          total_records: totalRecords,
          total_unread_counts: totalUnreadCounts,
        },
      },
    };
    return;
  } catch (error) {
    sendErrorResponse(
      context,
      "An error occurred while getting notifications",
      "An error occurred while getting notifications",
      500
    );
    return;
  }
};

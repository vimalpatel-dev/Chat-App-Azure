const Notification = require("../Models/notification.schema");
const sendErrorResponse = require("../SharedCode/errorResponse");

module.exports = async function (context, req) {
  try {
    const notificationId = req.params.notificationId;

    if (!notificationId) {
      sendErrorResponse(
        context,
        "notification ID not provided",
        "notification ID not provided",
        400
      );
      return;
    }

    // Retrieve the notification details based on ID and user ID
    let notification = await Notification.findOne({
      _id: notificationId,
    }).select("-__v");

    if (!notification) {
      sendErrorResponse(
        context,
        "Notification not found",
        "Notification not found",
        404
      );
      return;
    }

    // Mark the notification as read if it's unread
    if (!notification.read) {
      notification = await Notification.updateOne(
        { _id: notificationId },
        { read: true, read_datetime: new Date() }
      );
    }

    context.res = {
      status: 200,
      body: {
        ResponseStatus: "Success",
        Message: "Notification retrieved successfully",
        ResponseData: notification,
      },
    };
  } catch (error) {
    sendErrorResponse(
      context,
      "An error occurred while getting notification",
      "An error occurred while getting notification",
      500
    );
    return;
  }
};

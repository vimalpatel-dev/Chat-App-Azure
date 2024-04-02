const Notification = require("../Models/notification.schema");

module.exports = async function (context, req) {
  try {
    const notificationId = req.params.notificationId;

    if (!notificationId) {
      context.res = {
        status: 400,
        body: {
          statusCode: 400,
          message: "Provide the notification ID",
        },
      };
      context.done();
      return;
    }

    // Retrieve the notification details based on ID and user ID
    let notification = await Notification.findOne({
      _id: notificationId,
    }).select("-__v");

    if (!notification) {
      context.res = {
        status: 404,
        body: {
          statusCode: 404,
          message: "Notification not found",
          data: null,
        },
      };
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
        statusCode: 200,
        message: "Notification retrieved successfully",
        data: notification,
      },
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: {
        statusCode: 500,
        message: "An error occurred while getting notification",
      },
    };
    context.done();
  }
};

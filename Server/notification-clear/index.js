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
      return;
    }

    // Retrieve the notification details based on ID and user ID
    let notification = await Notification.findOne({
      _id: notificationId,
      deleted: false,
    }).select("-__v");

    if (!notification) {
      context.res = {
        status: 404,
        body: {
          statusCode: 404,
          message: "Notification not found or Already deleted",
          data: null,
        },
      };
      return;
    }

    await Notification.updateOne(
      { _id: notificationId, deleted: false },
      { deleted: true, deleted_time: new Date() }
    );

    context.res = {
      status: 200,
      body: {
        statusCode: 200,
        message: "notification soft deleted",
        data: [],
      },
    };
    return;
  } catch (error) {
    context.res = {
      status: 500,
      body: {
        statusCode: 500,
        message: "An error occurred while clearing notification",
      },
    };
    return;
  }
};

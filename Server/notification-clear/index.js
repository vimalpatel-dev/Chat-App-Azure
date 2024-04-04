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
      deleted: false,
    }).select("-__v");

    if (!notification) {
      sendErrorResponse(
        context,
        "Notification not found or Already deleted",
        "Notification not found or Already deleted",
        404
      );
      return;
    }

    await Notification.updateOne(
      { _id: notificationId, deleted: false },
      { deleted: true, deleted_time: new Date() }
    );

    context.res = {
      status: 200,
      body: {
        ResponseStatus: "Success",
        Message: "notification soft deleted",
        ResponseData: [],
      },
    };
    return;
  } catch (error) {
    sendErrorResponse(
      context,
      "An error occurred while clearing notification",
      "An error occurred while clearing notification",
      500
    );
    // context.res = {
    //   status: 500,
    //   body: {
    //     statusCode: 500,
    //     message: "An error occurred while clearing notification",
    //   },
    // };
    return;
  }
};

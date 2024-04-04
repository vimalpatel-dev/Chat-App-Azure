const Notification = require("../Models/notification.schema");
const sendErrorResponse = require("../SharedCode/errorResponse");

module.exports = async function (context, req) {
  try {
    const { userId } = req.query;
    if (!userId) {
      sendErrorResponse(
        context,
        "user  ID not provided",
        "user ID not provided",
        400
      );
      return;
    }

    await Notification.updateMany(
      { deleted: false, read: false, user_id: userId },
      { read: true, read_datetime: new Date() }
    );

    context.res = {
      status: 200,
      body: {
        ResponseStatus: "Success",
        Message: "All notifications marked as read",
        ResponseData: [],
      },
    };
    return;
  } catch (error) {
    sendErrorResponse(
      context,
      "An error occurred while marking all notifications as read",
      "An error occurred while marking all notifications as read",
      500
    );
    return;
  }
};

const Notification = require("../Models/notification.schema");
const sendErrorResponse = require("../SharedCode/errorResponse");

module.exports = async function (context, req) {
  try {
    const { userId } = req.query;
    if (!userId) {
      sendErrorResponse(
        context,
        "User ID not provided ",
        "User ID not provided",
        400
      );
      return;
    }

    await Notification.updateMany(
      { deleted: false, user_id: userId },
      { deleted: true, deleted_time: new Date() }
    );
    context.res = {
      status: 200,
      body: {
        ResponseStatus: "Success",
        Message: "All notifications soft deleted",
        ResponseData: [],
      },
    };
    return;
  } catch (error) {
    sendErrorResponse(
      context,
      "An error occurred while clearing all notifications",
      "An error occurred while clearing all notifications",
      500
    );
    return;
  }
};

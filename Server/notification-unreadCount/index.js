const totalUnreadCount = require("../SharedCode/total_unredcount");
const sendErrorResponse = require("../SharedCode/errorResponse");

module.exports = async function (context, req) {
  try {
    const userId = req.query.userId;
    if (!userId) {
      sendErrorResponse(
        context,
        "user ID not provided",
        "user ID not provided",
        400
      );
      return;
    }

    const unreadCount = await totalUnreadCount(userId);

    context.res = {
      status: 200,
      body: {
        ResponseStatus: "Success",
        Message: "Unread count retrieved successfully",
        ResponseData: unreadCount,
      },
    };
    return;
  } catch (error) {
    sendErrorResponse(
      context,
      "An error occurred while retrieving unread count ",
      "An error occurred while retrieving unread count ",
      500
    );
    return;
  }
};

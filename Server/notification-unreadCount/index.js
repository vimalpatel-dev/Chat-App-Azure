const totalUnreadCount = require("../SharedCode/total_unredcount");

module.exports = async function (context, req) {
  try {
    const userId = req.query.userId;
    if (!userId) {
      context.res = {
        status: 400,
        body: {
          statusCode: 400,
          message: "Provide the user ID",
        },
      };
      return;
    }

    const unreadCount = await totalUnreadCount(userId);

    context.res = {
      status: 200,
      body: {
        statusCode: 200,
        message: "Unread count retrieved successfully",
        data: unreadCount,
      },
    };
    return;
  } catch (error) {
    context.res = {
      status: 500,
      body: {
        statusCode: 500,
        message: "An error occurred while retrieving unread count ",
      },
    };
    return;
  }
};

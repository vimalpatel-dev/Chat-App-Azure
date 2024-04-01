const Notification = require("../Models/notification.schema");

module.exports = async function (context, req) {
  try {
    const { userId } = req.query;
    if (!userId) {
      context.res = {
        status: 400,
        body: {
          statusCode: 400,
          message: "Provide the user ID",
        },
      };
      context.done();
    }

    await Notification.updateMany(
      { deleted: false, user_id: userId },
      { deleted: true, deleted_time: new Date() }
    );
    context.res = {
      status: 200,
      body: {
        statusCode: 200,
        message: "All notifications soft deleted",
        data: [],
      },
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: {
        statusCode: 500,
        message: "An error occurred while clearing all notifications",
      },
    };
    context.done();
  }
};

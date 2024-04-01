const Notification = require("../Models/notification.schema");
const connectDB = require("../SharedCode/mongo_connection");

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
      return;
    }

    await connectDB();

    await Notification.updateMany(
      { deleted: false, read: false, user_id: userId },
      { read: true, read_datetime: new Date() }
    );

    context.res = {
      status: 200,
      body: {
        statusCode: 200,
        message: "All notifications marked as read",
        data: [],
      },
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: {
        statusCode: 500,
        message: "An error occurred while marking all notifications as read",
      },
    };
    context.done();
  }
};

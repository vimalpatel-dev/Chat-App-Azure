const sendToUserId = require("../SharedCode/send_to_user_id");
const Notification = require("../Models/notification.schema");
const connectDB = require("../SharedCode/mongo_connection");

module.exports = async function (context, req) {
  try {
    await connectDB();
    const { title, message, user_id } = req.body;

    const notifications = user_id.map((id) => ({
      title,
      message,
      user_id: id,
    }));

    await Notification.insertMany(notifications);

    // const sendPromises = notifications.map(async (notification) => {
    //   const notificationSendResponse = await sendToUserId(
    //     notification.user_id,
    //     notification
    //   );
    //   if (!notificationSendResponse.success) {
    //     console.error(
    //       "Failed to send notification to user ID:",
    //       notification.user_id
    //     );
    //   }
    //   return notificationSendResponse;
    // });
    // await Promise.all(sendPromises);

    context.res = {
      status: 200,
      body: {
        statusCode: 200,
        message: "Notifications stored and sent successfully",
        data: [],
      },
    };
    context.done();
  } catch (error) {
    console.error("Error storing notifications:", error);
    context.res = {
      status: 500,
      body: {
        statusCode: 500,
        message: error.message,
      },
    };
    context.done();
  }
};

const Notification = require("../Models/notification.schema");
const mongoose = require("mongoose");

// Store notification
async function storeNotification(title, message, user_id) {
  try {
    if (!title || !message || !user_id) {
      context.res = {
        status: 400,
        body: {
          statusCode: 400,
          message: "Provide the all notification data correctly",
        },
      };
      context.done();
    }

    const notifications = user_id.map((id) => ({
      title,
      message,
      user_id: id,
    }));

    await mongoose.connect(process.env.MONGODB_URL);

    await Notification.insertMany(notifications);

    return notifications;

    // // Send notifications
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

    // context.res = {
    //   status: 200,
    //   body: {
    //     statusCode: 200,
    //     message: "Notifications stored and sent successfully",
    //     data: [],
    //   },
    // };
    // context.done();
  } catch (error) {
    return error;
    // context.res = {
    //   status: 500,
    //   body: {
    //     statusCode: 500,
    //     message: error.message,
    //   },
    // };
    // context.done();
  }
}

module.exports = {
  storeNotification,
};

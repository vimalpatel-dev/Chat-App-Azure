const sendToUserId = require("../SharedCode/send_to_user_id");
const Notification = require("../Models/notification.schema");
const connectDB = require("../SharedCode/mongo_connection");
const Joi = require("joi");

const notificationSchema = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required(),
  user_id: Joi.array().items(Joi.number()).min(1).required(),
});

module.exports = async function (context, req) {
  try {
    const { error } = notificationSchema.validate(req.body);
    if (error) {
      context.res = {
        status: 400,
        body: {
          statusCode: 400,
          message: error.details[0].message,
        },
      };
      context.done();
      return;
    }

    const { title, message, user_id } = req.body;
    await connectDB();

    const notifications = user_id.map((id) => ({
      title,
      message,
      user_id: id,
    }));

    await Notification.insertMany(notifications);

    const sendPromises = notifications.map(async (notification) => {
      const notificationSendResponse = await sendToUserId(
        notification.user_id,
        notification
      );
      if (!notificationSendResponse.success) {
        console.error(
          "Failed to send notification to user ID:",
          notification.user_id
        );
      }
      return notificationSendResponse;
    });
    await Promise.all(sendPromises);

    context.res = {
      status: 200,
      body: {
        statusCode: 200,
        message: "Notifications stored and sent successfully",
        data: [],
      },
    };
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

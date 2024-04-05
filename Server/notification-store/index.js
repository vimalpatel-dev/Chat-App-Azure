const sendToUserId = require("../SharedCode/send_to_user_id");
const sendErrorResponse = require("../SharedCode/errorResponse");
const Notification = require("../Models/notification.schema");
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
      sendErrorResponse(
        context,
        "Validation Failed",
        error.details[0].message.replace(/"/g, ""),
        400
      );
      return;
    }
    const { title, message, user_id } = req.body;

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
        ResponseStatus: "Success",
        Message: "Notifications stored and sent successfully",
        ResponseData: [],
      },
    };
    return;
  } catch (error) {
    console.error("Error storing notifications:", error);
    sendErrorResponse(
      context,
      "An error occurred while storing notifications ",
      "An error occurred while storing notifications ",
      500
    );
    return;
  }
};

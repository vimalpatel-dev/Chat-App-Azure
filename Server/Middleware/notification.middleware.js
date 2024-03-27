const Joi = require("joi");

const notificationSchema = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required(),
});

const validateStoreNotificationRequest = (req, res, next) => {
  const { error } = notificationSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: error.details[0].message,
      statusCode: 400,
    });
  }
  next();
};

module.exports = validateStoreNotificationRequest;

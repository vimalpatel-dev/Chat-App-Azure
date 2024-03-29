const Joi = require("joi");

const notificationSchema = Joi.object({
  title: Joi.string().required(),
  message: Joi.string().required(),
  user_id: Joi.array().items(Joi.number()).min(1).required(),
});

const validateStoreNotification = (req, res, next) => {
  try {
    const { error } = notificationSchema.validate(req.body, {
      abortEarly: true,
    });
    if (error) {
      return res.status(400).json({
        statusCode: 400,
        message: error.details[0].message.replace(/"/g, ""),
      });
    }
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = validateStoreNotification;

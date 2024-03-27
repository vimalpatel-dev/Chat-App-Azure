const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
  read_datetime: {
    type: Date,
    default: null,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  deleted_time: {
    type: Date,
    default: null,
  },
});

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;

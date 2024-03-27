const express = require("express");
const notificationRouter = require("./notificatios.route");
const eventRoute = require("./stream_event.route");

const routes = express.Router();

//Notification Routes
routes.use(notificationRouter);

//Event Routes
routes.use(eventRoute);

module.exports = routes;

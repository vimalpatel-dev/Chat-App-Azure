const express = require("express");
const getClientAccessUrl = require("../Controllers/get_access_token_controller");
// const sendToAll = require("../Controllers/send_to_all_controller");
// const sendToUserId = require("../Controllers/send_to_userId_controller");

const eventRoute = express.Router();

eventRoute.get("/get-access-token", getClientAccessUrl);
// eventRoute.get("/send-to-all", sendToAll);
// eventRoute.post("/send-to-userId", sendToUserId);

module.exports = eventRoute;

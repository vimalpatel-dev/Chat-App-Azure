const express = require("express");
const getClientAccessUrl = require("../Controllers/get_access_token_controller");
const sendToAll = require("../Controllers/send_to_all_controller");
const sendToUserId = require("../Controllers/send_to_userId_controller");

const routes = express.Router();

routes.get("/get-access-token", getClientAccessUrl);
routes.get("/send-to-all", sendToAll);
routes.post("/send-to-userId", sendToUserId);

module.exports = routes;

const express = require("express");
const getClientAccessUrl = require("../Controllers/get_access_token");
const sendToAll = require("../Controllers/send_to_all");
const sendToUserId = require("../Controllers/send_to_userId");

const routes = express.Router();

routes.get("/get-access-token", getClientAccessUrl);
routes.get("/send-to-all", sendToAll);
routes.get("/send-to-userId", sendToUserId);

module.exports = routes;

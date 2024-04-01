require("dotenv").config();
const { WebPubSubServiceClient } = require("@azure/web-pubsub");

const hubName = process.env.HUB_NAME;

const serviceClient = new WebPubSubServiceClient(
  process.env.ENDPOINT_URL,
  hubName
);

module.exports = serviceClient;

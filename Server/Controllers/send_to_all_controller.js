const serviceClient = require("../Util/service_client");

async function sendToAll(req, res) {
  await serviceClient.sendToAll("Hi there, This is Server Message!", {
    contentType: "text/plain",
  });
  res.status(200).json({});
}

module.exports = sendToAll;

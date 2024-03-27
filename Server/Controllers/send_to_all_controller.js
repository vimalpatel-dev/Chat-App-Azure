const serviceClient = require("../Util/service_client");

async function sendToAll(req, res) {
  try {
    await serviceClient.sendToAll("Hi there, This is Server Message!", {
      contentType: "text/plain",
    });
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = sendToAll;

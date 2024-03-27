const serviceClient = require("../Util/service_client");

async function getClientAccessUrl(req, res) {
  try {
    let token = await serviceClient.getClientAccessToken({
      roles: ["webpubsub.sendToGroup.chat", "webpubsub.joinLeaveGroup.chat"],
      userId: req.query?.user,
    });
    res.status(200).send(token.url);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = getClientAccessUrl;

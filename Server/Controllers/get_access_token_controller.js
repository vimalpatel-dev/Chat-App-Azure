const serviceClient = require("../Util/service_client");

async function getClientAccessUrl(req, res) {
  let token = await serviceClient.getClientAccessToken({
    roles: ["webpubsub.sendToGroup.chat", "webpubsub.joinLeaveGroup.chat"],
    userId: req.query?.user,
  });

  res.status(200).send(token.url);
}

module.exports = getClientAccessUrl;

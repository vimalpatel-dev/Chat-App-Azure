const serviceClient = require("../SharedCode/service_client");

module.exports = async function (context, req) {
  try {
    let token = await serviceClient.getClientAccessToken({
      roles: ["webpubsub.sendToGroup.chat", "webpubsub.joinLeaveGroup.chat"],
      userId: req.query?.user,
    });
    context.res = {
      status: 200,
      body: token.url,
    };
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message,
    };
  }
};

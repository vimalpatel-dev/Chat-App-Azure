const serviceClient = require("../SharedCode/service_client");

module.exports = async function (context, req) {
  try {
    if (!req.query?.userId) {
      context.res = {
        status: 400,
        body: {
          statusCode: 400,
          message: "Provide the user ID",
        },
      };
      return;
    }

    let token = await serviceClient.getClientAccessToken({
      roles: ["webpubsub.sendToGroup.chat", "webpubsub.joinLeaveGroup.chat"],
      userId: req.query?.userId,
    });

    context.res = {
      status: 200,
      body: token.url,
    };
    return;
  } catch (error) {
    context.res = {
      status: 500,
      body: error.message,
    };
    return;
  }
};

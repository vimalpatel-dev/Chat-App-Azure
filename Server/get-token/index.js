const serviceClient = require("../SharedCode/service_client");
const sendErrorResponse = require("../SharedCode/errorResponse");

module.exports = async function (context, req) {
  try {
    if (!req.query?.userId) {
      sendErrorResponse(
        context,
        "user Id not provided",
        "user Id not provided",
        400
      );
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
    sendErrorResponse(context, error.message, error.message, 500);
    return;
  }
};

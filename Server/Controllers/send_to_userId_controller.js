const serviceClient = require("../Util/service_client");

async function sendToUserId(req, res, next) {
  try {
    console.log("request body", req.body);
    const userExists = await serviceClient.userExists(req.query?.userId);
    console.log(`${req.query?.userId} exist`, userExists);
    if (userExists) {
      await serviceClient.sendToUser(req.query?.userId, req.body);
    }
    res.status(200).send({});
  } catch (error) {
    next({ statusCode: 500, message: error.message });
    // res.status(500).json({ error: error.message });
  }
}

module.exports = sendToUserId;

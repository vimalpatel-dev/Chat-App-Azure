const serviceClient = require("../SharedCode/service_client");
const { storeNotificationUsingFrontEnd } = require("./notification_controller");

// async function sendToUserId(req, res, next) {
//   try {
//     console.log("request body", req.body);
//     const userExists = await serviceClient.userExists(req.query?.userId);
//     console.log(`${req.query?.userId} exist`, userExists);
//     if (userExists) {
//       // Store Chats
//       await storeNotificationUsingFrontEnd(
//         req.body.from,
//         req.body.message,
//         req.query?.userId
//       );
//       await serviceClient.sendToUser(req.query?.userId, req.body);
//     }
//     res.status(200).send({});
//   } catch (error) {
//     next({ statusCode: 500, message: error.message });
//   }
// }

async function sendToUserId(userId, dataPayload) {
  try {
    console.log("request body", dataPayload);
    const userExists = await serviceClient.userExists(userId);
    console.log(`${userId} exist`, userExists);
    if (userExists) {
      await serviceClient.sendToUser(userId, dataPayload);
    } else {
      return {
        success: false,
        error: "User does not exist in connection",
      };
    }
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}

module.exports = sendToUserId;

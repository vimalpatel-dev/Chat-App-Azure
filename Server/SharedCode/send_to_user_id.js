const serviceClient = require("../SharedCode/service_client");

async function sendToUserId(userId, dataPayload) {
  try {
    const userExists = await serviceClient.userExists(userId);
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

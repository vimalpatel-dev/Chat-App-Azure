function sendErrorResponse(context, message, errorMessage, errorCode = 400) {
  context.res = {
    status: errorCode,
    body: {
      ResponseStatus: "Failure",
      Message: message,
      ResponseData: null,
      ErrorData: {
        ErrorCode: errorCode,
        Error: errorMessage,
        ErrorDetail: null,
      },
    },
  };
}

module.exports = sendErrorResponse;

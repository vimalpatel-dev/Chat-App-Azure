const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err?.statusCode || 500)
    .json({
      error: err?.message || "Internal Server Error",
      statusCode: err?.statusCode || 500,
    });
  return;
};

module.exports = globalErrorHandler;

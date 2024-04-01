module.exports = async function (context, req) {
  try {
    // await connectToDatabase();
    const { userId } = req.query;
    if (!userId) {
      context.res = {
        status: 400,
        body: "Provide the user ID",
      };
      context.done();
      return;
    }
    await Notification.updateMany(
      { deleted: false, read: false, user_id: userId },
      { read: true, read_datetime: new Date() }
    );
    context.res = {
      status: 200,
      body: {
        statusCode: 200,
        message: "All notifications marked as read",
        data: [],
      },
    };
  } catch (error) {
    console.error("Error reading all notifications:", error);
    context.res = {
      status: 500,
      body: "An error occurred while marking all notifications as read",
    };
  }
};

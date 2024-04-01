module.exports = async function (context, req) {
  try {
    // await connectToDatabase();
    const { userId } = req.query;
    if (!userId) {
      context.res = {
        status: 400,
        body: "Provide the user ID",
      };
      return;
    }
    await Notification.updateMany(
      { deleted: false, user_id: userId },
      { deleted: true, deleted_time: new Date() }
    );
    context.res = {
      status: 200,
      body: {
        statusCode: 200,
        message: "All notifications soft deleted",
        data: [],
      },
    };
  } catch (error) {
    console.error("Error clearing all notifications:", error);
    context.res = {
      status: 500,
      body: "An error occurred while clearing all notifications",
    };
  }
};

module.exports = async function (context, req) {
  try {
    await connectToDatabase();
    const { page = 1, limit = 10, userId } = req.query;
    if (!userId) {
      context.res = {
        status: 400,
        body: "Provide the user ID",
      };
      return;
    }
    const skipCount = (page - 1) * limit;

    const notifications = await Notification.find({
      deleted: false,
      user_id: userId,
    })
      .sort({ datetime: -1 })
      .skip(skipCount)
      .limit(parseInt(limit))
      .select("-__v");

    const totalRecords = await Notification.countDocuments({
      deleted: false,
      user_id: userId,
    });
    const totalUnreadCounts = await totalUnreadCount(userId);

    context.res = {
      status: 200,
      body: {
        statusCode: 200,
        message: "Notifications retrieved successfully",
        data: notifications,
        pagination: {
          current_page: parseInt(page),
          total_records: totalRecords,
          total_unread_counts: totalUnreadCounts,
        },
      },
    };
  } catch (error) {
    console.error("Error getting notifications:", error);
    context.res = {
      status: 500,
      body: "An error occurred while getting notifications",
    };
  }
};

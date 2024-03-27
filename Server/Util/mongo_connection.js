const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const mongoURL = process.env.MONGODB_URL;
    const dbName = process.env.DBNAME || "notification";

    const conn = await mongoose.connect(`${mongoURL}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: dbName,
    });
    console.log(`MongoDB Connected at : ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

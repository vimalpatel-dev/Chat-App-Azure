const mongoose = require("mongoose");
require("dotenv").config();

let conn = null;

const connectDB = async () => {
  try {
    if (!conn) {
      const mongoURL = process.env.MONGODB_URL;
      const dbName = process.env.DBNAME || "notification";

      conn = await mongoose.connect(`${mongoURL}`, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        dbName: dbName,
      });
      console.log(`MongoDB Connected at : ${conn.connection.host}`);
    }
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};

module.exports = connectDB;

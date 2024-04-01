const { MongoClient } = require("mongodb");

let client = null;

async function connectToDatabase() {
  try {
    if (!client) {
      const uri = process.env.MONGODB_URL;
      client = new MongoClient(uri, {});
      await client.connect();
      console.log("Connected to the MongoDB database");
      return client;
    }
    return client;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
}

module.exports = connectToDatabase;

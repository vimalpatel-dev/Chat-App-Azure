const connectDB = require("./SharedCode/mongo_connection");

async function connnectMongodbDatabase() {
  await connectDB();
  console.log("server js file");
}

connnectMongodbDatabase();

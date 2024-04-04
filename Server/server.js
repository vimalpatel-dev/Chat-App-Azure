const connectAzureDB = require("./SharedCode/azure_mssql_connect");

async function connnectMongodbDatabase() {
  await connectAzureDB();
  console.log("azure database connected!");
}

connnectMongodbDatabase();

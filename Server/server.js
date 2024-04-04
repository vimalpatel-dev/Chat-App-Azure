const connectAzureDB = require("./SharedCode/azure_mssql_connect");

async function connnectAzurebDatabase() {
  await connectAzureDB();
}

connnectAzurebDatabase();

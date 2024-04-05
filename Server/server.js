const { connectAzureDB } = require("./SharedCode/azure_mssql_connect");

async function connnectAzurebDatabase() {
  console.log("server js file");
  await connectAzureDB();
}

connnectAzurebDatabase();

const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: parent(process.env.DB_PORT),
  database: process.env.DB_NAME,
  authentication: {
    type: "default",
  },
  options: {
    encrypt: true,
  },
};

console.log("Starting...");

async function connectAzureDB() {
  try {
    var poolConnection = await sql.connect(config);
    console.log("Databse Connected");
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = connectAzureDB;

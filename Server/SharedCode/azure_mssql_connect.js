const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  authentication: {
    type: "default",
  },
  options: {
    encrypt: true,
  },
};

let connection = null;

async function connectAzureDB() {
  try {
    if (!connection) {
      connection = await sql.connect(config);
      console.log("Databse Connected Successfully");
    }
  } catch (err) {
    console.error(err.message, "Database Connection Error");
  }
}

module.exports = connectAzureDB;

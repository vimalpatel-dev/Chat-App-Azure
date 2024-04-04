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

let connectionPool = null;

async function connectAzureDB() {
  try {
    if (!connectionPool) {
      connectionPool = await sql.connect(config);
      console.log("Databse Connected Successfully");
    }
  } catch (err) {
    console.error("Database Connection Error", err.message);
  }
}

module.exports = {
  connectAzureDB,
  connectionPool,
};

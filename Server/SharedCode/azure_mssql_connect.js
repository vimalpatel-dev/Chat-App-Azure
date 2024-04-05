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

let poolConnection = null;

async function connectAzureDB() {
  try {
    if (!poolConnection) {
      poolConnection = await sql.connect(config);
      console.log("Databse Connected Successfully");

      var resultSet = await poolConnection.request()
        .query(`IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'notifications')
                  BEGIN
                      CREATE TABLE notifications (
                      id BIGINT NOT NULL PRIMARY KEY IDENTITY(1, 1),
                      user_id VARCHAR(150) NOT NULL,
                      title VARCHAR(255) NOT NULL,
                      message TEXT NOT NULL,
                      datetime DATETIME DEFAULT CURRENT_TIMESTAMP,
                      is_read BIT DEFAULT 0,
                      read_datetime DATETIME DEFAULT NULL,
                      deleted BIT DEFAULT 0,
                      deleted_datetime DATETIME DEFAULT NULL
                    ); 
                  END;
        `);
      console.log(resultSet);
    }
  } catch (err) {
    console.error("Database Connection Error", err.message);
  }
}

module.exports = {
  connectAzureDB,
  poolConnection,
};

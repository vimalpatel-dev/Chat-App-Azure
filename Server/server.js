const express = require("express");
const cors = require("cors");
const routes = require("./Routes/index.route");
const connectDB = require("./Util/mongo_connection");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

//Index Routes
app.use(routes);

connectDB();
app.listen(port, () =>
  console.log(`Application server listening at http://localhost:${port}`)
);
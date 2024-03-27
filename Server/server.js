const express = require("express");
const cors = require("cors");
const routes = require("./Routes/index.route");
const connectDB = require("./Util/mongo_connection");
const globalErrorHandler = require("./Middleware/global_error_handler");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

//Index Routes
app.use(routes);

//Global Error Habdler
app.use(globalErrorHandler);

connectDB();
app.listen(port, () =>
  console.log(`Application server listening at http://localhost:${port}`)
);

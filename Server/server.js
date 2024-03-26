const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sendToAll = require("./Controller/send_to_all");
const getClientAccessUrl = require("./Controller/getAccessToken");

const serviceClient = require("./util/ServiceClient");

const app = express();
const port = process.env.PORT;

app.use(cors());

app.get("/get-access-token", getClientAccessUrl);

app.get("/send-to-all", sendToAll);

app.get("/test", async (req, res) => {
  const userExists = await serviceClient.userExists("user123");
  console.log("user exist", userExists);
  serviceClient.sendToUser("user123");
  res.status(200).send({});
});

app.listen(port, () =>
  console.log(`Application server listening at http://localhost:${port}`)
);

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sendToAll = require("./Controller/send_to_all");
const getClientAccessUrl = require("./Controller/getAccessToken");

const serviceClient = require("./util/ServiceClient");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.get("/get-access-token", getClientAccessUrl);

app.get("/send-to-all", sendToAll);

app.post("/test", async (req, res) => {
  console.log("request body", req.body);
  const userExists = await serviceClient.userExists(req.query?.userId);
  console.log("user exist", userExists);
  if (userExists) {
    await serviceClient.sendToUser(req.query?.userId, req.body);
  }
  res.status(200).send({});
});

app.listen(port, () =>
  console.log(`Application server listening at http://localhost:${port}`)
);

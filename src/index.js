import * as express from "express";
import bodyParser from "body-parser";
import { handleWebhook } from "src/routes";

// a port should be specified in the environement
const port = process.env.PORT || 8080;

// create server and configure it. Here we are using bodyParser.
const webhookServer = express();
webhookServer.use(bodyParser.json());

// declare webhooks routes and the associated router function
webhookServer.post("/hello-webhook", handleWebhook);

webhookServer.listen(port, function() {
  console.info("Server is up and running...");
});

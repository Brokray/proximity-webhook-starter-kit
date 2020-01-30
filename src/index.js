import bodyParser from "body-parser";
import express from "express";
import routes from "./routes";

// A port should be specified in the environement
const port = process.env.PORT || 8080;

// Create server and configure it. Here we are also using bodyParser.
const webhookServer = express();
webhookServer.use(bodyParser.json());

// Below you can define all your webhooks
webhookServer.post("/search/qwant", routes.qwant);

// Start the server
webhookServer.listen(port, function() {
  console.info("Webhook server is up and running...");
});

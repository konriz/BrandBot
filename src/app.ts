import express from "express";
import { urlencoded, json } from "body-parser";
import { config } from "./services/config";
import { AddressInfo } from "net";
import { NodesTreeParser } from "./data/nodes-parser";
import { NodesTable } from "./data/nodes-table";
import { WebHandler } from "./services/web-handler";
import { User } from "./services/user";

const app = express();
export var users: Map<string, User> = new Map();
var nodesParser = new NodesTreeParser();
export var nodesTable = new NodesTable(nodesParser);

app.use(
    urlencoded({
        extended: true
    })
);

app.use(json());

app.use(express.static('static'));

app.set("view engine", "ejs");

app.get("/", function(_req, res) {
    res.render("index");
});

// Adds support for GET requests to our webhook
app.get("/webhook", WebHandler.getWebhook);

  // Creates the endpoint for your webhook
app.post("/webhook", WebHandler.postWebhook);

  // Set up your App's Messenger Profile
app.get("/profile", WebHandler.getProfile);

app.get("/nodes", WebHandler.getNodes);

app.get("/users", WebHandler.getUsers)
  
var listener = app.listen(config.port, function() {
  let address = <AddressInfo>listener.address();
  console.log(`Your app is listening on port: ${address.port}`);
});



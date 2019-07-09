import express from "express";
import { urlencoded, json } from "body-parser";
import { config } from "./services/config";
import { AddressInfo } from "net";
import { WebHandler } from "./services/web-handler";
import { WebhookHandler } from "./services/webhook-handler";
import { UsersRepository, MemoryUsersRepository } from "./user/users-repository";
import { NodesRepository, MemoryNodesRepository } from "./nodesTree/nodes-repository";
import { OrdersRepository, MemoryOrdersRepository } from "./orders/orders-repository";
import { DeliveriesRepository, FileDeliveriesRepository } from "./orders/deliveries-repository";
import { PaymentsRepository, FilePaymentsRepository } from "./orders/payments-repository";

const app = express();
export var deliveriesRepository: DeliveriesRepository = new FileDeliveriesRepository();
export var paymentsRepository: PaymentsRepository = new FilePaymentsRepository();
export var usersRepository: UsersRepository = new MemoryUsersRepository();
export var nodesRepository: NodesRepository = new MemoryNodesRepository();
export var ordersRepository: OrdersRepository = new MemoryOrdersRepository();

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
app.get("/webhook", WebhookHandler.getWebhook);

  // Creates the endpoint for your webhook
app.post("/webhook", WebhookHandler.postWebhook);

  // Set up your App's Messenger Profile
app.get("/profile", WebHandler.getProfile);

app.get("/nodes", WebHandler.getNodes);

app.get("/users", WebHandler.getUsers);

app.get("/orders", WebHandler.getOrders);

app.get("/settings", WebHandler.getSettings);
  
var listener = app.listen(config.port, function() {
  let address = <AddressInfo>listener.address();
  console.log(`Your app is listening on port: ${address.port}`);
});

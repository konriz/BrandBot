"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const config_1 = require("./services/config");
const web_handler_1 = require("./services/web-handler");
const users_repository_1 = require("./user/users-repository");
const nodes_repository_1 = require("./nodesTree/nodes-repository");
const app = express_1.default();
exports.users = new users_repository_1.UsersMemoryRepository();
exports.nodes = new nodes_repository_1.NodesMemoryRepository();
app.use(body_parser_1.urlencoded({
    extended: true
}));
app.use(body_parser_1.json());
app.use(express_1.default.static('static'));
app.set("view engine", "ejs");
app.get("/", function (_req, res) {
    res.render("index");
});
// Adds support for GET requests to our webhook
app.get("/webhook", web_handler_1.WebHandler.getWebhook);
// Creates the endpoint for your webhook
app.post("/webhook", web_handler_1.WebHandler.postWebhook);
// Set up your App's Messenger Profile
app.get("/profile", web_handler_1.WebHandler.getProfile);
app.get("/nodes", web_handler_1.WebHandler.getNodes);
app.get("/users", web_handler_1.WebHandler.getUsers);
var listener = app.listen(config_1.config.port, function () {
    let address = listener.address();
    console.log(`Your app is listening on port: ${address.port}`);
});
//# sourceMappingURL=app.js.map
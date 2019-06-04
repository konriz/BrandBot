"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const config_1 = require("./services/config");
const graph_api_1 = require("./services/graph-api");
const user_1 = require("./services/user");
const receive_1 = require("./services/receive");
const profile_1 = require("./services/profile");
const app = express_1.default();
var users = {};
app.use(body_parser_1.urlencoded({
    extended: true
}));
app.use(body_parser_1.json());
app.set("view engine", "ejs");
app.get("/", function (_req, res) {
    res.render("index");
});
// Adds support for GET requests to our webhook
app.get("/webhook", (req, res) => {
    // Parse the query params
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
        // Checks the mode and token sent is correct
        if (mode === "subscribe" && token === config_1.config.verifyToken) {
            // Responds with the challenge token from the request
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        }
        else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});
// Creates the endpoint for your webhook
app.post("/webhook", (req, res) => {
    let body = req.body;
    // Checks if this is an event from a page subscription
    if (body.object === "page") {
        // Returns a '200 OK' response to all requests
        res.status(200).send("EVENT_RECEIVED");
        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {
            // Gets the body of the webhook event
            let webhookEvent = entry.messaging[0];
            // console.log(webhookEvent);
            // Discard uninteresting events
            if ("read" in webhookEvent) {
                // console.log("Got a read event");
                return;
            }
            if ("delivery" in webhookEvent) {
                // console.log("Got a delivery event");
                return;
            }
            // Get the sender PSID
            let senderPsid = webhookEvent.sender.id;
            if (!(senderPsid in users)) {
                let user = new user_1.User(senderPsid);
                graph_api_1.GraphAPi.getUserProfile(senderPsid)
                    .then(userProfile => {
                    user.setProfile(userProfile);
                })
                    .catch(error => {
                    // The profile is unavailable
                    console.log("Profile is unavailable:", error);
                })
                    .finally(() => {
                    users[senderPsid] = user;
                    console.log("New Profile PSID:", senderPsid);
                    let receiveMessage = new receive_1.Receive(users[senderPsid], webhookEvent);
                    return receiveMessage.handleMessage();
                });
            }
            else {
                console.log("Profile already exists PSID:", senderPsid);
                let receiveMessage = new receive_1.Receive(users[senderPsid], webhookEvent);
                return receiveMessage.handleMessage();
            }
        });
    }
    else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
});
// Set up your App's Messenger Profile
app.get("/profile", (req, res) => {
    let token = req.query["verify_token"];
    if (!config_1.config.webhookUrl.startsWith("https://")) {
        res.status(200).send("ERROR - Need a proper API_URL in the .env file");
    }
    let profile = new profile_1.Profile();
    // Checks if a token and mode is in the query string of the request
    if (token) {
        if (token === config_1.config.verifyToken) {
            profile.setWebhook();
            res.write(`<p>Set app ${config_1.config.appId} call to ${config_1.config.webhookUrl}</p>`);
            profile.setThread();
            res.write(`<p>Set Messenger Profile of Page ${config_1.config.pageId}</p>`);
            res.write(`<p>Set Get Started postback: ${JSON.stringify(profile.getGetStarted())}</p>`);
            res.write(`<p>Set Greeting text: ${JSON.stringify(profile.getGreetingText())}</p>`);
            res.write(`<p>Set Persistent Menu ${JSON.stringify(profile.getPersistentMenu())}</p>`);
            res.status(200).end();
        }
        else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
    else {
        // Returns a '404 Not Found' if token are missing
        res.sendStatus(404);
    }
});
var listener = app.listen(config_1.config.port, function () {
    let address = listener.address();
    console.log(`Your app is listening on port: ${address.port}`);
});
//# sourceMappingURL=app.js.map
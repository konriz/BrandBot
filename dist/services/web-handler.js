"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const profile_1 = require("./profile");
const user_1 = require("./user");
const graph_api_1 = require("./graph-api");
const receive_1 = require("./receive");
const app_1 = require("../app");
const nodesFile = __importStar(require("../data/nodes.json"));
class WebHandler {
    static getProfile(req, res) {
        let token = req.query["verify_token"];
        if (!config_1.config.webhookUrl.startsWith("https://")) {
            res.status(200).send("ERROR - Need a proper API_URL in the .env file");
            return;
        }
        let profile = new profile_1.Profile();
        // Checks if a token and mode is in the query string of the request
        if (token) {
            if (token === config_1.config.verifyToken) {
                profile.setWebhook();
                profile.setThread();
                res.render("profile", {
                    pageId: config_1.config.pageId,
                    getStarted: JSON.stringify(profile.getGetStarted()),
                    greeting: JSON.stringify(profile.getGreetingText()),
                    menu: JSON.stringify(profile.getPersistentMenu())
                });
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
    }
    ;
    static getWebhook(req, res) {
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
        else {
            res.sendStatus(404);
        }
    }
    ;
    static postWebhook(req, res) {
        let body = req.body;
        // Checks if this is an event from a page subscription
        if (body.object === "page") {
            // Returns a '200 OK' response to all requests
            res.status(200).send("EVENT_RECEIVED");
            // Iterates over each entry - there may be multiple if batched
            body.entry.forEach((entry) => {
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
                if (!(senderPsid in app_1.users)) {
                    let user = new user_1.User(senderPsid);
                    graph_api_1.GraphAPI.getUserProfile(senderPsid)
                        .then(userProfile => {
                        user.setProfile(userProfile);
                    })
                        .catch(error => {
                        // The profile is unavailable
                        console.log(`Profile is unavailable: ${error}`);
                    })
                        .finally(() => {
                        app_1.users[senderPsid] = user;
                        console.log(`New Profile PSID: ${senderPsid}`);
                        let receiveMessage = new receive_1.Receive(app_1.users[senderPsid], webhookEvent);
                        return receiveMessage.handleMessage();
                    });
                }
                else {
                    console.log(`Profile already exists PSID: ${senderPsid}`);
                    let receiveMessage = new receive_1.Receive(app_1.users[senderPsid], webhookEvent);
                    return receiveMessage.handleMessage();
                }
            });
        }
        else {
            // Returns a '404 Not Found' if event is not from a page subscription
            res.sendStatus(404);
        }
    }
    static getNodes(req, res) {
        if (nodesFile) {
            res.send(nodesFile);
        }
        else {
            res.sendStatus(404);
        }
    }
    ;
}
exports.WebHandler = WebHandler;
//# sourceMappingURL=web-handler.js.map
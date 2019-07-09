"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const app_1 = require("../app");
const user_1 = require("../user/user");
const graph_api_1 = require("./graph-api");
const receive_1 = require("./receive");
class WebhookHandler {
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
                if (!(app_1.usersRepository.isUser(senderPsid))) {
                    let user = new user_1.User(senderPsid);
                    graph_api_1.GraphAPI.getUserProfile(senderPsid)
                        .then(userProfile => {
                        user.setProfile(userProfile);
                    })
                        .catch(error => {
                        console.log(`Profile is unavailable: ${error}`);
                    })
                        .finally(() => {
                        app_1.usersRepository.addUser(user);
                        console.log(`New Profile PSID: ${senderPsid}`);
                        let receiveMessage = new receive_1.Receive(webhookEvent);
                        return receiveMessage.handleMessage();
                    });
                }
                else {
                    console.log(`Profile already exists PSID: ${senderPsid}`);
                    let receiveMessage = new receive_1.Receive(webhookEvent);
                    return receiveMessage.handleMessage();
                }
            });
        }
        else {
            // Returns a '404 Not Found' if event is not from a page subscription
            res.sendStatus(404);
        }
    }
}
exports.WebhookHandler = WebhookHandler;
//# sourceMappingURL=webhook-handler.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graph_api_1 = require("./graph-api");
const event_handler_1 = require("./event-handler");
class Receive {
    constructor(user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }
    handleMessage() {
        let event = this.webhookEvent;
        let response;
        try {
            response = this.handleEvent(event);
        }
        catch (error) {
            console.error(error);
            response = {
                text: `An error has occured: '${error}'. We have been notified and \
        will fix the issue shortly!`
            };
        }
        this.sendMessage(response);
    }
    handleEvent(event) {
        console.log("Received event:", `${JSON.stringify(event)} for ${this.user.psid}`);
        return event_handler_1.EventHandler.handle(event);
    }
    sendMessage(response) {
        // Construct the message body
        let requestBody = {
            recipient: {
                id: this.user.psid
            },
            message: response
        };
        graph_api_1.GraphAPi.callSendAPI(requestBody);
    }
}
exports.Receive = Receive;
;
//# sourceMappingURL=receive.js.map
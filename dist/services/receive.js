"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graph_api_1 = require("./graph-api");
const event_handler_1 = require("./event-handler");
const config_1 = require("./config");
class Receive {
    constructor(user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }
    handleMessage() {
        let response;
        try {
            response = this.handleEvent();
        }
        catch (error) {
            console.error(error);
            response = {
                text: `An error has occured: '${error}'. We have been notified and will fix the issue shortly!`
            };
        }
        if (response) {
            this.sendMessage(response);
        }
    }
    handleEvent() {
        console.log(`Received event: ${JSON.stringify(this.webhookEvent)} for ${this.user.psid}`);
        let eventHandler = new event_handler_1.EventHandler(this.user, this.webhookEvent);
        return eventHandler.handle();
    }
    sendMessage(response) {
        let requestBody = {
            recipient: {
                id: this.user.psid
            },
            message: response
        };
        if (config_1.config.messageDebug) {
            console.log(`Sending : ${JSON.stringify(requestBody)}`);
        }
        graph_api_1.GraphAPI.callSendAPI(requestBody);
    }
}
exports.Receive = Receive;
;
//# sourceMappingURL=receive.js.map
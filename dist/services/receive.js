"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graph_api_1 = require("./graph-api");
const event_handler_1 = require("./event-handler");
const config_1 = require("./config");
class Receive {
    constructor(webhookEvent) {
        this._webhookEvent = webhookEvent;
    }
    handleMessage() {
        let response;
        try {
            response = this.handleEvent();
        }
        catch (error) {
            console.error(error);
            response = {
                recipient: {
                    id: this._webhookEvent.sender.id
                },
                message: `An error has occured: '${error}'. We have been notified and will fix the issue shortly!`
            };
        }
        if (response) {
            this.sendMessage(response);
        }
    }
    handleEvent() {
        console.log(`Received event: ${JSON.stringify(this._webhookEvent)} for ${this._webhookEvent.sender.id}`);
        let eventHandler = new event_handler_1.EventHandler(this._webhookEvent);
        return eventHandler.handle();
    }
    sendMessage(response) {
        if (config_1.config.messageDebug) {
            console.log(`Sending : ${JSON.stringify(response)}`);
        }
        graph_api_1.GraphAPI.callSendAPI(response);
    }
}
exports.Receive = Receive;
;
//# sourceMappingURL=receive.js.map
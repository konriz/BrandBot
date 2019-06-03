"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graph_api_1 = require("./graph-api");
class Receive {
    constructor(user, webhookEvent) {
        this.user = user;
        this.webhookEvent = webhookEvent;
    }
    // Check if the event is a message or postback and
    // call the appropriate handler function
    handleMessage() {
        let event = this.webhookEvent;
        let responses;
        try {
            responses = this.handleEvent(event);
        }
        catch (error) {
            console.error(error);
            responses = {
                text: `An error has occured: '${error}'. We have been notified and \
        will fix the issue shortly!`
            };
        }
        if (Array.isArray(responses)) {
            let delay = 0;
            for (let response of responses) {
                this.sendMessage(response, delay * 2000);
                delay++;
            }
        }
        else {
            this.sendMessage(responses);
        }
    }
    handleEvent(event) {
        console.log("Received event:", `${this.webhookEvent} for ${this.user.psid}`);
        let message = JSON.stringify(this.webhookEvent);
        let response = this.handlePayload(message);
        return response;
    }
    handlePayload(payload) {
        console.log("Received Payload:", `${payload} for ${this.user.psid}`);
        // Log CTA event in FBA
        // GraphAPi.callFBAEventsAPI(this.user.psid, payload);
        let response = {
            text: `Payload: ${payload}`
        };
        return response;
    }
    sendMessage(response, delay = 0) {
        // Check if there is delay in the response
        if ("delay" in response) {
            delay = response["delay"];
            delete response["delay"];
        }
        // Construct the message body
        let requestBody = {
            recipient: {
                id: this.user.psid
            },
            message: response
        };
        setTimeout(() => graph_api_1.GraphAPi.callSendAPI(requestBody), delay);
    }
}
exports.Receive = Receive;
;
//# sourceMappingURL=receive.js.map
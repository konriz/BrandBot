"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_builder_1 = require("./response-builder");
class EventHandler {
    constructor(event) {
        this.event = event;
        this.responseBuilder = new response_builder_1.ResponseBuilder();
    }
    handle() {
        try {
            if (this.event.message) {
                console.log("Handling message");
                return this.handleMessage();
            }
            else if (this.event.postback) {
                console.log("Handling postback");
                return this.handlePostback();
            }
            else if (this.event.referral) {
                console.log("Handling referral");
                return this.handleRefferal();
            }
            else {
                throw new Error("Event type error");
            }
        }
        catch (error) {
            console.error(error);
            return {
                text: `ERROR : ${error}`
            };
        }
    }
    handleMessage() {
        let response;
        let message = this.event.message;
        if (message.quick_reply) {
            console.log("Handling quick reply");
            response = this.handleQuickReply(message);
        }
        else if (message.attachments) {
            console.log("Handling attachment");
            response = this.handleAttachment(message);
        }
        else if (message.text) {
            console.log("Handling text");
            response = this.handleText(message);
        }
        return response;
    }
    handleText(message) {
        return this.responseBuilder.getErrorMessage();
    }
    handleAttachment(message) {
        return this.responseBuilder.getErrorMessage();
    }
    handleQuickReply(message) {
        return this.responseBuilder.getNodeView(message.quick_reply.payload);
    }
    handlePostback() {
        return this.responseBuilder.getHomeNode();
    }
    handleRefferal() {
        return this.responseBuilder.getErrorMessage();
    }
}
exports.EventHandler = EventHandler;
//# sourceMappingURL=event-handler.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_builder_1 = require("./response-builder");
class EventHandler {
    static handle(event) {
        try {
            if (event.message) {
                console.log("Handling message");
                return this.handleMessage(event.message);
            }
            else if (event.postback) {
                console.log("Handling postback");
                return this.handlePostback(event.postback);
            }
            else if (event.referral) {
                console.log("Handling referral");
                return this.handleRefferal(event.refferal);
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
    static handleMessage(message) {
        let response;
        if (message.text) {
            console.log("Handling text");
            response = this.handleText(message);
        }
        else if (message.attachments) {
            console.log("Handling attachment");
            response = this.handleAttachment(message);
        }
        else if (message.quick_reply) {
            console.log("Handling quick reply");
            response = this.handleQuickReply(message);
        }
        return response;
    }
    static handleText(message) {
        return response_builder_1.ResponseBuilder.getSorryMessage();
    }
    static handleAttachment(attachment) {
        return response_builder_1.ResponseBuilder.getSorryMessage();
    }
    static handleQuickReply(quickReply) {
        return response_builder_1.ResponseBuilder.getSorryMessage();
    }
    static handlePostback(postback) {
        return response_builder_1.ResponseBuilder.getSorryMessage();
    }
    static handleRefferal(referral) {
        return response_builder_1.ResponseBuilder.getSorryMessage();
    }
}
exports.EventHandler = EventHandler;
//# sourceMappingURL=event-handler.js.map
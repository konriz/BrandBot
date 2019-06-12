"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_builder_1 = require("./response-builder");
class EventHandler {
    constructor(user, event) {
        this._user = user;
        this._event = event;
        this._responseBuilder = new response_builder_1.ResponseBuilder(user);
    }
    get user() {
        return this._user;
    }
    get event() {
        return this._event;
    }
    get responseBuilder() {
        return this._responseBuilder;
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
        return;
    }
    handleAttachment(message) {
        return this.responseBuilder.getResponse("ERROR");
    }
    handleQuickReply(message) {
        return this.responseBuilder.getResponse(message.quick_reply.payload);
    }
    handlePostback() {
        return this.responseBuilder.getResponse("HOME");
    }
    handleRefferal() {
        return this.responseBuilder.getResponse("ERROR");
    }
}
exports.EventHandler = EventHandler;
//# sourceMappingURL=event-handler.js.map
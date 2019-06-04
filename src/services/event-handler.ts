import { ResponseBuilder } from "./response-builder";

export class EventHandler {

    event: any;
    responseBuilder : ResponseBuilder;

    constructor(event: any) {
        this.event = event;
        this.responseBuilder = new ResponseBuilder();
    }
    
    handle() {

        try {
            if(this.event.message) {
                console.log("Handling message");
                return this.handleMessage();
            } else if (this.event.postback) {
                console.log("Handling postback");
                return this.handlePostback();
            } else if (this.event.referral) {
                console.log("Handling referral");
                return this.handleRefferal();
            } else {
                throw new Error("Event type error");
            }
        } catch (error) {
            console.error(error);
            return {
                text: `ERROR : ${error}`
            };
        }
    }

    private handleMessage() {
        let response;
        let message = this.event.message;
        if (message.quick_reply) {
            console.log("Handling quick reply");
            response = this.handleQuickReply(message);
        } else if (message.attachments) {
            console.log("Handling attachment");
            response = this.handleAttachment(message);
        } else if (message.text) {
            console.log("Handling text");
            response = this.handleText(message);
        } 
        return response;
    }

    private handleText(message: any){
        return this.responseBuilder.getErrorMessage();
    }

    private handleAttachment(message: any){
        return this.responseBuilder.getErrorMessage();
    }

    private handleQuickReply(message: any){
        return this.responseBuilder.getNodeView(message.quick_reply.payload);
    }

    private handlePostback() {
        return this.responseBuilder.getHomeNode();
    }

    private handleRefferal() {
        return this.responseBuilder.getErrorMessage();
    }
}
import { ResponseBuilder } from "./response-builder";

export class EventHandler {
    
    static handle(event: any) {

        try {
            if(event.message) {
                console.log("Handling message");
                return this.handleMessage(event.message);
            } else if (event.postback) {
                console.log("Handling postback");
                return this.handlePostback(event.postback);
            } else if (event.referral) {
                console.log("Handling referral");
                return this.handleRefferal(event.refferal);
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

    private static handleMessage(message: any) {
        let response;
        if (message.text) {
            console.log("Handling text");
            response = this.handleText(message);
        } else if (message.attachments) {
            console.log("Handling attachment");
            response = this.handleAttachment(message);
        } else if (message.quick_reply) {
            console.log("Handling quick reply");
            response = this.handleQuickReply(message);
        }
        return response;
    }

    private static handleText(message: any){
        return ResponseBuilder.getSorryMessage();
    }

    private static handleAttachment(attachment: any){
        return ResponseBuilder.getSorryMessage();
    }

    private static handleQuickReply(quickReply: any){
        return ResponseBuilder.getSorryMessage();
    }

    private static handlePostback(postback: any) {
        return ResponseBuilder.getSorryMessage();
    }

    private static handleRefferal(referral: any) {
        return ResponseBuilder.getSorryMessage();
    }
}
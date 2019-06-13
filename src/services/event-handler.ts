import { ResponseBuilder } from "./response-builder";
import { User } from "../user/user";

export class EventHandler {

    private _user: User;
    private _event: any;
    private _responseBuilder : ResponseBuilder;

    constructor(user: User, event: any) {
        this._user = user;
        this._event = event;
        this._responseBuilder = new ResponseBuilder(user);
    }

    get user(): User {
        return this._user;
    }

    get event(): any {
        return this._event;
    }

    get responseBuilder(): ResponseBuilder {
        return this._responseBuilder;
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
        return;
    }

    private handleAttachment(message: any){
        return this.responseBuilder.getResponse("ERROR");
    }

    private handleQuickReply(message: any){
        return this.responseBuilder.getResponse(message.quick_reply.payload);
    }

    private handlePostback() {
        return this.responseBuilder.getResponse("HOME");
    }

    private handleRefferal() {
        return this.responseBuilder.getResponse("ERROR");
    }
}
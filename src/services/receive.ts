import { User } from "../user/user";
import { GraphAPI } from "./graph-api";
import { EventHandler } from "./event-handler";
import { config } from "./config";

export class Receive {

  private user: User;
  private webhookEvent: any;

  constructor(user: User, webhookEvent: any) {
    this.user = user;
    this.webhookEvent = webhookEvent;
  }

  handleMessage() {
    let response;

    try {
      response = this.handleEvent();
    } catch (error) {
      console.error(error);
      response = {
        recipient: {
          id: this.user.psid
        },
        message: `An error has occured: '${error}'. We have been notified and will fix the issue shortly!`
      };
    }
    if(response){
      this.sendMessage(response);
    }
  }

  private handleEvent() {
    console.log(`Received event: ${JSON.stringify(this.webhookEvent)} for ${this.user.psid}`);
    let eventHandler = new EventHandler(this.user, this.webhookEvent);
    return eventHandler.handle();
  }

  private sendMessage(response: any) {

    if(config.messageDebug){
      console.log(`Sending : ${JSON.stringify(response)}`);
    }
    GraphAPI.callSendAPI(response);
  }
};

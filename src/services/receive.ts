import { User } from "./user";
import { GraphAPi } from "./graph-api";
import { EventHandler } from "./event-handler";

export class Receive {

  user: User;
  webhookEvent: any;

  constructor(user: User, webhookEvent: any) {
    this.user = user;
    this.webhookEvent = webhookEvent;
  }

  handleMessage() {
    let event = this.webhookEvent;
    let response;

    try {
      response = this.handleEvent(event);
    } catch (error) {
      console.error(error);
      response = {
        text: `An error has occured: '${error}'. We have been notified and \
        will fix the issue shortly!`
      };
    }
    this.sendMessage(response);
  }

  handleEvent(event: any) {
    console.log(
      "Received event:",
      `${JSON.stringify(event)} for ${this.user.psid}`
    );
    let eventHandler = new EventHandler(event);
    return eventHandler.handle();
  }

  sendMessage(response: any) {

    // Construct the message body
    let requestBody = {
      recipient: {
        id: this.user.psid
      },
      message: response
    };
    GraphAPi.callSendAPI(requestBody);
  }
};

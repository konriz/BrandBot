import { GraphAPI } from "./graph-api";
import { EventHandler } from "./event-handler";
import { config } from "./config";

export class Receive {

  private _webhookEvent: any;

  constructor(webhookEvent: any) {
    this._webhookEvent = webhookEvent;
  }

  handleMessage() {
    let response;

    try {
      response = this.handleEvent();
    } catch (error) {
      console.error(error);
      response = {
        recipient: {
          id: this._webhookEvent.sender.id
        },
        message: `An error has occured: '${error}'. We have been notified and will fix the issue shortly!`
      };
    }
    if(response){
      this.sendMessage(response);
    }
  }

  private handleEvent() {
    console.log(`Received event: ${JSON.stringify(this._webhookEvent)} for ${this._webhookEvent.sender.id}`);
    let eventHandler = new EventHandler(this._webhookEvent);
    return eventHandler.handle();
  }

  private sendMessage(response: any) {

    if(config.messageDebug){
      console.log(`Sending : ${JSON.stringify(response)}`);
    }
    GraphAPI.callSendAPI(response);
  }
};

import { QuickReply } from "../nodesTree/quick-reply";
import * as res from "../resources/locales/resources.json";

export class MessageBuilder {

    static getQuickReplyMessage(text: string, buttons: QuickReply[]) {
        return {
            text: text,
            quick_replies: buttons
        };
    }

    static getItemReplyMessage(message: string, buttons: QuickReply[], url: string) {
      return {
        quick_replies: buttons,
        attachment: {
          type: "template",
          payload: {
              template_type: "button",
              text: message,
              buttons: [
                  {
                      type: "web_url",
                      title: res.nodes.site,
                      url: url
                  }
              ]
          }
        }
      }
    }

    static getTextMessage(text: string) {
        return {
            text: text
        };
    }
} 
import { QuickReply } from "../data/quick-reply";

export class ResponseApi {

    static getQuickReplyMessage(text: string, buttons: QuickReply[]) {

        let quickReplies: any[] = [];
        buttons.forEach((btn) => quickReplies.push(btn));

        return {
            text: text,
            quick_replies: quickReplies
        };
    }

    static getButtonTemplate(title: string, buttons: any[]) {
        return {
          attachment: {
            type: "template",
            payload: {
              template_type: "button",
              text: title,
              buttons: buttons
            }
          }
        };
    }

    static getWebUrlButton(title: string, url: string){
        return {
            type: "web_url",
            title: title,
            url: url
        };
    }

    static getTextMessage(text: string) {
        return {
            text: text
              };
        }
} 
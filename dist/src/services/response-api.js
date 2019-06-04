"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseApi {
    static getQuickReplyMessage(text, buttons) {
        let quickReplies = [];
        buttons.forEach((btn) => quickReplies.push(btn));
        return {
            text: text,
            quick_replies: quickReplies
        };
    }
    static getButtonTemplate(title, buttons) {
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
    static getWebUrlButton(title, url) {
        return {
            type: "web_url",
            title: title,
            url: url
        };
    }
    static getTextMessage(text) {
        return {
            text: text
        };
    }
}
exports.ResponseApi = ResponseApi;
//# sourceMappingURL=response-api.js.map
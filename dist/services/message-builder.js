"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const res = __importStar(require("../locales/resources.json"));
class MessageBuilder {
    static getQuickReplyMessage(text, buttons) {
        return {
            text: text,
            quick_replies: buttons
        };
    }
    static getItemReplyMessage(message, buttons, url) {
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
        };
    }
    static getTextMessage(text) {
        return {
            text: text
        };
    }
}
exports.MessageBuilder = MessageBuilder;
//# sourceMappingURL=message-builder.js.map
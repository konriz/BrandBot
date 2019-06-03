"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodes_1 = require("../data/nodes");
class ResponseBuilder {
    static getSorryMessage() {
        return this.getNode(ResponseBuilder.nodes.getNode("HOME"));
    }
    static getNode(node) {
        return node.getMessage();
    }
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
ResponseBuilder.nodes = new nodes_1.NodesTable();
exports.ResponseBuilder = ResponseBuilder;
//# sourceMappingURL=response-builder.js.map
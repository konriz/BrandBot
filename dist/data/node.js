"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const quick_reply_1 = require("../services/quick-reply");
const response_api_1 = require("../services/response-api");
class SimpleNode {
    constructor(name, buttonText, message, parent, children) {
        this.name = name;
        this.buttonText = buttonText;
        this.message = message;
        this.parent = parent;
        this.children = children;
    }
    getName() {
        return this.name;
    }
    getButtonText() {
        return this.buttonText;
    }
    setParent(parent) {
        this.parent = parent;
    }
    setChildren(children) {
        this.children = children;
    }
    getView() {
        let message = response_api_1.ResponseApi.getQuickReplyMessage(this.message, this.getQuickReplies());
        return message;
    }
    getQuickReplies() {
        let quickReplies = [];
        let homeReply = new quick_reply_1.QuickReply("Go home", "HOME");
        quickReplies.push(homeReply);
        if (this.children) {
            this.children.forEach((child) => quickReplies.push(new quick_reply_1.QuickReply(child.getButtonText(), child.getName())));
        }
        if (this.parent) {
            quickReplies.push(new quick_reply_1.QuickReply("Back", this.parent.getName()));
        }
        return quickReplies;
    }
}
SimpleNode.errorNode = new SimpleNode("ERROR", "Error", "There was an unknown error. Please go back.");
exports.SimpleNode = SimpleNode;
//# sourceMappingURL=node.js.map
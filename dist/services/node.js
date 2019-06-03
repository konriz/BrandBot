"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_builder_1 = require("./response-builder");
const quick_reply_1 = require("./quick-reply");
class SimpleNode {
    constructor(name, buttonText, message, parent, children) {
        this.name = name;
        this.buttonText = buttonText;
        this.message = message;
        this.parent = parent;
        this.children = children;
    }
    getMessage() {
        let message = response_builder_1.ResponseBuilder.getQuickReplyMessage(this.message, [new quick_reply_1.QuickReply(this.buttonText, this.name)]);
        return message;
    }
}
exports.SimpleNode = SimpleNode;
class UrlNode extends SimpleNode {
    constructor(name, buttonText, message, url, parent, children) {
        super(name, buttonText, message, parent, children);
        this.url = url;
    }
    getMessage() {
        let message = response_builder_1.ResponseBuilder.getQuickReplyMessage(this.message, [new quick_reply_1.QuickReply(this.buttonText, this.name)]);
        return message;
    }
}
exports.UrlNode = UrlNode;
class WelcomeNode extends SimpleNode {
    constructor(name = "WELCOME", buttonText = "Start", message = "Welcome", children) {
        super(name, buttonText, message, null, children);
    }
}
exports.WelcomeNode = WelcomeNode;
//# sourceMappingURL=node.js.map
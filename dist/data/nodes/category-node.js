"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_node_1 = require("./abstract-node");
const message_builder_1 = require("../../services/message-builder");
class LinkNode extends abstract_node_1.AbstractNode {
    constructor(data) {
        super(data);
        this.setType("Link");
        this.url = data["url"];
    }
    getView() {
        return message_builder_1.MessageBuilder.getItemReplyMessage(this.getMessage(), this.getQuickReplies(), this.url);
    }
}
exports.LinkNode = LinkNode;
//# sourceMappingURL=category-node.js.map
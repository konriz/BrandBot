"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_node_1 = require("./abstract-node");
const message_builder_1 = require("../../services/message-builder");
class SimpleNode extends abstract_node_1.AbstractNode {
    constructor(data, parent) {
        super(data, parent);
        this.type = "Simple";
    }
    getView() {
        return message_builder_1.MessageBuilder.getQuickReplyMessage(this.message, this.getQuickReplies());
    }
}
exports.SimpleNode = SimpleNode;
//# sourceMappingURL=simple-node.js.map
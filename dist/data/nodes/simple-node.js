"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_api_1 = require("../../services/response-api");
const abstract_node_1 = require("./abstract-node");
class SimpleNode extends abstract_node_1.AbstractNode {
    constructor(name, buttonText, message) {
        super(name, buttonText, message);
    }
    getView() {
        return response_api_1.ResponseApi.getQuickReplyMessage(this.getMessage(), this.getQuickReplies());
    }
}
exports.SimpleNode = SimpleNode;
//# sourceMappingURL=simple-node.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_node_1 = require("./abstract-node");
class SimpleNode extends abstract_node_1.AbstractNode {
    constructor(data) {
        super(data);
        this.setType("Simple");
    }
    getView() {
        return {
            text: this.getMessage(),
            quick_replies: this.getQuickReplies()
        };
    }
}
exports.SimpleNode = SimpleNode;
//# sourceMappingURL=simple-node.js.map
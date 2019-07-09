"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_node_1 = require("./abstract-node");
class SimpleNode extends abstract_node_1.AbstractNode {
    constructor(data, parent) {
        super(data, parent);
        this.type = "Simple";
    }
}
exports.SimpleNode = SimpleNode;
//# sourceMappingURL=simple-node.js.map
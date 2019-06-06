"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simple_node_1 = require("./nodes/simple-node");
class NodesFactory {
    static createNode(data) {
        let node;
        if (true) {
            node = this.createSimpleNode(data);
        }
        return node;
    }
    static createSimpleNode(data) {
        let node = new simple_node_1.SimpleNode(data["name"], data["buttonText"], data["message"]);
        console.log(`Node '${node.getName()}' created as '${node.getType()}'.`);
        return node;
    }
}
exports.NodesFactory = NodesFactory;
//# sourceMappingURL=node-factory.js.map
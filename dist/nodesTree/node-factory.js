"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simple_node_1 = require("./nodes/simple-node");
const item_node_1 = require("./nodes/item-node");
const category_node_1 = require("./nodes/category-node");
class NodesFactory {
    static createNode(nodeData, parent) {
        let node;
        if (nodeData["url"] && nodeData["price"]) {
            node = new item_node_1.ItemNode(nodeData, parent);
        }
        else if (nodeData["url"]) {
            node = new category_node_1.LinkNode(nodeData, parent);
        }
        else {
            node = new simple_node_1.SimpleNode(nodeData, parent);
        }
        console.log(`Node '${node.name}' created as '${node.type}'.`);
        return node;
    }
}
exports.NodesFactory = NodesFactory;
//# sourceMappingURL=node-factory.js.map
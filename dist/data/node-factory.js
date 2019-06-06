"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simple_node_1 = require("./nodes/simple-node");
const item_node_1 = require("./nodes/item-node");
const category_node_1 = require("./nodes/category-node");
class NodesFactory {
    static createNode(data) {
        let node;
        if (data["url"] && data["price"]) {
            node = new item_node_1.ItemNode(data);
        }
        else if (data["url"]) {
            node = new category_node_1.CategoryNode(data);
        }
        else {
            node = new simple_node_1.SimpleNode(data);
        }
        console.log(`Node '${node.getName()}' created as '${node.getType()}'.`);
        return node;
    }
}
exports.NodesFactory = NodesFactory;
//# sourceMappingURL=node-factory.js.map
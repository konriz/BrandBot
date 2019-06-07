"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simple_node_1 = require("./nodes/simple-node");
const item_node_1 = require("./nodes/item-node");
const category_node_1 = require("./nodes/category-node");
const buy_node_1 = require("./nodes/buy-node");
class NodesFactory {
    static createNode(nodeData, parent) {
        let node;
        let childrenNodes = [];
        if (nodeData["url"] && nodeData["price"]) {
            node = new item_node_1.ItemNode(nodeData);
            childrenNodes.push(this.getBuyNode(nodeData));
        }
        else if (nodeData["url"]) {
            node = new category_node_1.LinkNode(nodeData);
        }
        else {
            node = new simple_node_1.SimpleNode(nodeData);
        }
        if (nodeData["children"])
            childrenNodes.push(...this.getChildrenNodes(nodeData, node));
        node.setChildren(childrenNodes);
        if (parent)
            node.setParent(parent);
        console.log(`Node '${node.getName()}' created as '${node.getType()}'.`);
        return node;
    }
    static getBuyNode(nodeData) {
        console.log(`Node '${nodeData["name"]}' - setting buy node.`);
        return new buy_node_1.BuyNode(nodeData);
    }
    static getChildrenNodes(data, node) {
        console.log(`Node '${node.getName()}' - setting children.`);
        let childrenNodes = [];
        data["children"].forEach((childData) => {
            childrenNodes.push(this.createNode(childData, node));
        });
        return childrenNodes;
    }
}
exports.NodesFactory = NodesFactory;
//# sourceMappingURL=node-factory.js.map
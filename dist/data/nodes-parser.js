"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodes_json_1 = __importDefault(require("./nodes.json"));
const node_factory_js_1 = require("./node-factory.js");
const buy_node_js_1 = require("./nodes/buy-node.js");
class NodesTreeParser {
    getNodes() {
        if (!this.nodes) {
            this.populateNodes();
        }
        return this.nodes;
    }
    populateNodes() {
        let tree = [];
        for (let nodeData of nodes_json_1.default["nodes"]) {
            let node = this.createNode(nodeData);
            tree.push(node);
            console.log(`Root node '${nodeData["name"]}' created.`);
        }
        this.nodes = new Map();
        tree.forEach((node) => node.getMap().forEach((value, key) => {
            this.nodes.set(key, value);
        }));
    }
    createNode(nodeData, parent) {
        let node = node_factory_js_1.NodesFactory.createNode(nodeData);
        if (parent) {
            console.log(`Node '${node.getName()}' - setting parent '${parent.getName()}'.`);
            node.setParent(parent);
        }
        let childrenNodes = [];
        if (nodeData["price"]) {
            console.log(`Node '${node.getName()}' - setting buy node.`);
            childrenNodes.push(new buy_node_js_1.BuyNode(node));
        }
        if (nodeData["children"]) {
            console.log(`Node '${node.getName()}' - setting children.`);
            let data = nodeData["children"];
            data.forEach((childData) => {
                childrenNodes.push(this.createNode(childData, node));
            });
        }
        node.setChildren(childrenNodes);
        return node;
    }
}
exports.NodesTreeParser = NodesTreeParser;
//# sourceMappingURL=nodes-parser.js.map
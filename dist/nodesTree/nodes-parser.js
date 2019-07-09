"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodes_json_1 = __importDefault(require("../resources/nodes.json"));
const node_factory_1 = require("./node-factory");
class NodesTreeParser {
    get nodes() {
        if (!this._nodes)
            this.populateNodes();
        return this._nodes;
    }
    populateNodes() {
        let tree = [];
        nodes_json_1.default["nodes"].forEach(nodeData => {
            let node = this.createNode(nodeData);
            tree.push(node);
            console.log(`Root node '${nodeData["name"]}' created.`);
        });
        this._nodes = new Map();
        tree.forEach((node) => node.getMap().forEach((value, key) => {
            this._nodes.set(key, value);
        }));
    }
    createNode(nodeData, parent) {
        let node;
        if (parent) {
            console.log(`Node '${node.name}' - setting parent '${parent.name}'.`);
            node = node_factory_1.NodesFactory.createNode(nodeData, parent);
        }
        else {
            node = node_factory_1.NodesFactory.createNode(nodeData);
        }
        return node;
    }
}
exports.NodesTreeParser = NodesTreeParser;
//# sourceMappingURL=nodes-parser.js.map
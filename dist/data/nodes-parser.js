"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodes_json_1 = __importDefault(require("./nodes.json"));
const Nodes = __importStar(require("./node.js"));
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
            console.log(`Root node ${nodeData["name"]} created.`);
        }
        this.nodes = new Map();
        tree.forEach((node) => node.getMap().forEach((value, key) => {
            this.nodes.set(key, value);
        }));
    }
    createNode(nodeData, parent) {
        let node = new Nodes.SimpleNode(nodeData["name"], nodeData["buttonText"], nodeData["message"]);
        console.log(`Node ${node.getName()} initialised.`);
        if (parent) {
            console.log(`Node ${node.getName()} - setting parent ${parent.getName()}.`);
            node.setParent(parent);
        }
        if (nodeData["children"]) {
            console.log(`Node ${node.getName()} - setting children.`);
            let childrenNodes = [];
            let data = nodeData["children"];
            data.forEach((childData) => {
                childrenNodes.push(this.createNode(childData, node));
            });
            node.setChildren(childrenNodes);
        }
        return node;
    }
}
exports.NodesTreeParser = NodesTreeParser;
//# sourceMappingURL=nodes-parser.js.map
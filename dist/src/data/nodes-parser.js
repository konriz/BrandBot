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
const Nodes = __importStar(require("./node"));
class NodesParser {
    static getNodes() {
        if (!this.nodes) {
            this.populateNodes();
        }
        return this.nodes;
    }
    static populateNodes() {
        let nodes = new Map();
        for (let nodeData of nodes_json_1.default["nodes"]) {
            let node = new Nodes.SimpleNode(nodeData["name"], nodeData["buttonText"], nodeData["message"]);
            nodes.set(node.getName(), node);
            console.log(`Node named : '${node.getName()}' saved.`);
        }
        this.nodes = nodes;
        this.nodes.forEach((node) => {
            this.assignParents(node);
            this.assignChildren(node);
        });
    }
    static assignParents(node) {
        let parentName = this.getParentName(node);
        if (parentName) {
            let parent = this.findNode(parentName);
            node.setParent(parent);
            console.log(`Node named : '${node.getName()}' parent assigned.`);
        }
        else {
            console.log(`Node named : '${node.getName()}' has no parrent.`);
        }
    }
    static getParentName(node) {
        for (let nodeData of nodes_json_1.default["nodes"]) {
            if (nodeData["name"] == node.getName()) {
                return nodeData["parent"];
            }
        }
    }
    static assignChildren(node) {
        let childrenNames = this.getChildrenNames(node);
        if (childrenNames) {
            let children = [];
            childrenNames.forEach((name) => {
                let child = this.findNode(name);
                children.push(child);
            });
            node.setChildren(children);
            console.log(`Node named : '${node.getName()}' children assigned.`);
        }
        else {
            console.log(`Node named : '${node.getName()}' has no children.`);
        }
    }
    static getChildrenNames(node) {
        for (let nodeData of nodes_json_1.default["nodes"]) {
            if (nodeData["name"] == node.getName()) {
                return nodeData["children"];
            }
        }
    }
    static findNode(name) {
        let node = this.nodes.get(name);
        return node;
    }
}
exports.NodesParser = NodesParser;
//# sourceMappingURL=nodes-parser.js.map
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodes = __importStar(require("../services/node"));
const nodes_json_1 = __importDefault(require("./nodes.json"));
class NodesTable {
    constructor() {
        this.nodes = new Map();
    }
    printNodes() {
        return JSON.stringify(nodes_json_1.default);
    }
    getNode(name) {
        let node;
        try {
            console.log(`Node named : '${name}' found`);
            node = this.nodes.get(name);
        }
        catch (error) {
            console.log(`Node named : '${name}' not found, returning welcome`);
            node = new Nodes.WelcomeNode();
        }
        return node;
    }
}
exports.NodesTable = NodesTable;
//# sourceMappingURL=nodes.js.map
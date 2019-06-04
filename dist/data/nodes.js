"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodes = __importStar(require("./node"));
const nodes_parser_1 = require("./nodes-parser");
class NodesTable {
    constructor() {
        this.nodes = nodes_parser_1.NodesParser.getNodes();
    }
    getNode(name) {
        let node = this.nodes.get(name);
        if (node) {
            console.log(`Node named : '${name}' found`);
        }
        else {
            console.log(`Node named : '${name}' not found`);
            node = new Nodes.WelcomeNode();
        }
        return node;
    }
}
exports.NodesTable = NodesTable;
//# sourceMappingURL=nodes.js.map
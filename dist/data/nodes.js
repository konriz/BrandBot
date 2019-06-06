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
class NodesTable {
    constructor(parser) {
        this.nodes = parser.getNodes();
        this.nodes.set(Nodes.SimpleNode.errorNode.getName(), Nodes.SimpleNode.errorNode);
    }
    getView(name) {
        return this.getNode(name).getView();
    }
    getNode(name) {
        let node = this.nodes.get(name);
        if (node) {
            console.log(`Node named : '${name}' found`);
        }
        else {
            console.log(`Node named : '${name}' not found`);
            node = this.getError();
        }
        return node;
    }
    getError() {
        return this.getNode("ERROR");
    }
}
exports.NodesTable = NodesTable;
//# sourceMappingURL=nodes.js.map
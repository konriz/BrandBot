"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defined_nodes_1 = require("./nodes/defined-nodes");
class NodesTable {
    constructor(parser) {
        this.nodes = parser.getNodes();
        this.nodes.set(defined_nodes_1.DefinedNodes.ERROR.getName(), defined_nodes_1.DefinedNodes.ERROR);
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
//# sourceMappingURL=nodes-table.js.map
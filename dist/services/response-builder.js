"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodes_1 = require("../data/nodes");
class ResponseBuilder {
    constructor() {
        this.nodes = new nodes_1.NodesTable();
    }
    getSorryMessage() {
        return this.getNodeView("HOME");
    }
    getNodeView(name) {
        return this.nodes.getNode(name).getView();
    }
}
exports.ResponseBuilder = ResponseBuilder;
//# sourceMappingURL=response-builder.js.map
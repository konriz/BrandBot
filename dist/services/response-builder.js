"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodes_1 = require("../data/nodes");
class ResponseBuilder {
    constructor() {
        this.nodes = new nodes_1.NodesTable();
    }
    getErrorMessage() {
        return this.getNodeView("ERROR");
    }
    getHomeNode() {
        return this.getNodeView("HOME");
    }
    getNodeView(name) {
        return this.nodes.getView(name);
    }
}
exports.ResponseBuilder = ResponseBuilder;
//# sourceMappingURL=response-builder.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodes_parser_1 = require("./nodes-parser");
const nodes_table_1 = require("./nodes-table");
class NodesMemoryRepository {
    constructor() {
        let nodesParser = new nodes_parser_1.NodesTreeParser();
        this._nodesTable = new nodes_table_1.NodesTable(nodesParser);
    }
    getNode(name) {
        return this._nodesTable.getNode(name);
    }
    getAll() {
        let nodes = [];
        this._nodesTable.getAll().forEach(node => nodes.push(node));
        return nodes;
    }
}
exports.NodesMemoryRepository = NodesMemoryRepository;
//# sourceMappingURL=nodes-repository.js.map
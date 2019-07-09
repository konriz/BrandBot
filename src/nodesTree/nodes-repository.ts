import { NodesTreeParser } from "./nodes-parser";
import { NodesTable } from "./nodes-table";
import { BotNode } from "./nodes/abstract-node";

export interface NodesRepository {
    findNode(name: string): BotNode;
    nodes: BotNode[];
}

export class MemoryNodesRepository implements NodesRepository {

    private _nodesTable: NodesTable;

    constructor() {
        let nodesParser = new NodesTreeParser();
        this._nodesTable = new NodesTable(nodesParser);
    }

    findNode(name: string): BotNode {
        return this._nodesTable.getNode(name);
    }

    get nodes(): BotNode[] {
        let nodes: BotNode[] = [];
        this._nodesTable.getAll().forEach(node => nodes.push(node));
        return nodes;
    }

}

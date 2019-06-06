import { NodesParser } from "./nodes-parser";
import { BotNode } from "./nodes/abstract-node";
import { SimpleNode } from "./nodes/simple-node";
import { DefinedNodes } from "./nodes/defined-nodes";

export class NodesTable {

    nodes: Map<string, BotNode>;

    constructor(parser: NodesParser) {
        this.nodes = parser.getNodes();
        this.nodes.set(DefinedNodes.ERROR.getName(), DefinedNodes.ERROR)
    }

    getView(name: string) {
        return this.getNode(name).getView();
    }

    getNode(name: string) {
        let node: BotNode = this.nodes.get(name);
        if (node) {
            console.log(`Node named : '${name}' found`);
        } else {
            console.log(`Node named : '${name}' not found`);
            node = this.getError();
        }
        return node;
    }

    private getError(): BotNode {
        return this.getNode("ERROR");
    }

}
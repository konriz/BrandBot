import * as Nodes from "./node";
import { NodesParser } from "./nodes-parser";

export class NodesTable {

    nodes: Map<string, Nodes.BotNode>;

    constructor() {
        this.nodes = NodesParser.getNodes();
        this.nodes.set("ERROR", Nodes.SimpleNode.errorNode)
    }

    getView(name: string) {
        return this.getNode(name).getView();
    }

    getNode(name: string) {
        let node: Nodes.BotNode = this.nodes.get(name);
        if (node) {
            console.log(`Node named : '${name}' found`);
        } else {
            console.log(`Node named : '${name}' not found`);
            node = this.getError();
        }
        return node;
    }

    private getError(): Nodes.BotNode {
        return this.getNode("ERROR");
    }

}
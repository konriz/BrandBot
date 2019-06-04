import * as Nodes from "./node";
import { NodesParser } from "./nodes-parser";

export class NodesTable {

    nodes: Map<string, Nodes.BotNode>;

    constructor() {
        this.nodes = NodesParser.getNodes();
    }

    getNode(name: string) {
        let node: Nodes.BotNode = this.nodes.get(name);
        if (node) {
            console.log(`Node named : '${name}' found`);
        } else {
            console.log(`Node named : '${name}' not found`);
            node = new Nodes.WelcomeNode();
        }
        return node;
    }

}
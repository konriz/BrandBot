import * as Nodes from "../services/node";
import data from "./nodes.json";

export class NodesTable {

    nodes: Map<string, Nodes.BotNode> = new Map();

    constructor() {

    }

    printNodes() {
        return JSON.stringify(data);
    }

    getNode(name: string) {
        let node: Nodes.BotNode;
        try {
            console.log(`Node named : '${name}' found`)
            node = this.nodes.get(name);
        } catch (error) {
            console.log(`Node named : '${name}' not found, returning welcome`)
            node = new Nodes.WelcomeNode();
        }
        return node;
    }

}
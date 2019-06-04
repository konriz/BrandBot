import { QuickReply } from "./quick-reply";
import { config } from "./config";
import { BotNode } from "../data/node";
import { NodesTable } from "../data/nodes";

export class ResponseBuilder {

    nodes: NodesTable;

    constructor() {
        this.nodes = new NodesTable();
    }
    
    getSorryMessage() {
        return this.getNodeView("HOME");
    }

    getNodeView(name: string) {
        return this.nodes.getNode(name).getView();
    }

    
    
}
import { NodesTable } from "../data/nodes";

export class ResponseBuilder {

    nodes: NodesTable;

    constructor() {
        this.nodes = new NodesTable();
    }
    
    getErrorMessage() {
        return this.getNodeView("ERROR");
    }

    getHomeNode() {
        return this.getNodeView("HOME");
    }

    getNodeView(name: string) {
        return this.nodes.getView(name);
    }
}
import { nodesTable } from "../app";

export class ResponseBuilder {

    constructor() {
    }
    
    getErrorMessage() {
        return this.getNodeView("ERROR");
    }

    getHomeNode() {
        return this.getNodeView("HOME");
    }

    getNodeView(name: string) {
        return nodesTable.getView(name);
    }
}
import { AbstractNode } from "./abstract-node";

export class SimpleNode extends AbstractNode {

    constructor(data: any, parent?: any){
        super(data, parent);
        this.type = "Simple";
    }
}

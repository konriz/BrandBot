import { AbstractNode } from "./abstract-node";

export class SimpleNode extends AbstractNode {

    constructor(data: any){
        super(data);
        this.setType("Simple");
    }

    getView() {
        return {
            text: this.getMessage(),
            quick_replies: this.getQuickReplies()
        };
    }
    
}


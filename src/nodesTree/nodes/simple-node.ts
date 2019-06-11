import { AbstractNode } from "./abstract-node";
import { MessageBuilder } from "../../services/message-builder";

export class SimpleNode extends AbstractNode {

    constructor(data: any, parent?: any){
        super(data, parent);
        this.type = "Simple";
    }
    
    getView() {
        return MessageBuilder.getQuickReplyMessage(this.message, this.getQuickReplies());
    }
}


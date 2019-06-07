import { AbstractNode } from "./abstract-node";
import { MessageBuilder } from "../../services/message-builder";

export class SimpleNode extends AbstractNode {

    constructor(data: any){
        super(data);
        this.setType("Simple");
    }
    
    getView() {
        return MessageBuilder.getQuickReplyMessage(this.getMessage(), this.getQuickReplies());
    }
}


import { AbstractNode } from "./abstract-node";
import { MessageBuilder } from "../../services/message-builder";


export class LinkNode extends AbstractNode {

    private url: string;

    constructor(data: any, parent?: any)
    {
        super(data, parent);
        this.type = "Link";
        this.url = data["url"];
    }

    getView(): any {
        return MessageBuilder.getItemReplyMessage(this.message, this.getQuickReplies(), this.url);
    }
}
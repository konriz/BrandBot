import { AbstractNode } from "./abstract-node";
import { MessageBuilder } from "../../services/message-builder";


export class LinkNode extends AbstractNode {

    private url: string;

    constructor(data: any)
    {
        super(data);
        this.setType("Link");
        this.url = data["url"];
    }

    getView() {
        return MessageBuilder.getItemReplyMessage(this.getMessage(), this.getQuickReplies(), this.url);
    }
}
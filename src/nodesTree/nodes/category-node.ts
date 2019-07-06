import { AbstractNode } from "./abstract-node";
import { MessageBuilder } from "../../services/message-builder";


export class LinkNode extends AbstractNode {

    private _url: string;

    constructor(data: any, parent?: any)
    {
        super(data, parent);
        this.type = "Link";
        this._url = data["url"];
    }

    getView(): any {
        return MessageBuilder.getItemReplyMessage(this.message, this.getQuickReplies(), this._url);
    }
}
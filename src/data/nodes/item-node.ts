import { AbstractNode } from "./abstract-node";
import { MessageBuilder } from "../../services/message-builder";


export class ItemNode extends AbstractNode {

    private url: string;
    private price: string;

    constructor(data: any)
    {
        super(data);
        this.setType("Item");
        this.url = data["url"];
        this.price = data["price"];
    }

    getPrice(): string {
        return this.price;
    }

    getMessage(): string {
        return `${super.getMessage()} - cena : ${this.price}`;
    }

    getView() {
        return MessageBuilder.getItemReplyMessage(this.getMessage(), this.getQuickReplies(), this.url);
    }
}
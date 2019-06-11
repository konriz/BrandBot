import { AbstractNode } from "./abstract-node";
import { MessageBuilder } from "../../services/message-builder";
import { Item } from "../../item/item";


export class ItemNode extends AbstractNode {

    private _url: string;
    private _price: string;
    private _item: Item;

    constructor(data: any, parent?: AbstractNode)
    {
        super(data, parent);
        this.type = "Item";
        this._url = data["url"];
        this._price = data["price"];
        this._item = new Item(super.message, this._price, this._url)
    }

    get price(): string {
        return this._price;
    }

    get item(): Item {
        return this._item;
    }

    getMessage(): string {
        return `${super.message} - cena : ${this.price}`;
    }

    getView(): any {
        return MessageBuilder.getItemReplyMessage(this.getMessage(), this.getQuickReplies(), this._url);
    }
}
import { AbstractNode } from "./abstract-node";
import { ItemNode } from "./item-node";
import * as res from "../../locales/resources.json";

export class BuyNode extends AbstractNode {

    constructor(item: ItemNode) {
        super({
            name: `BUY_${item.getName()}`,
            buttonText: `Kup za ${item.getPrice()}`,
            message: res.nodes.thanks
        });
        this.setType("Buy");
        this.setParent(item);
    }

    getView() {
        return {
            text: this.getMessage(),
            quick_replies: this.getQuickReplies()
        };
    }
}
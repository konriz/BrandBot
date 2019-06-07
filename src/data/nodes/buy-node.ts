import { AbstractNode } from "./abstract-node";
import { ItemNode } from "./item-node";
import * as res from "../../locales/resources.json";

export class BuyNode extends AbstractNode {

    constructor(data: any) {
        super({
            name: `BUY_${data["name"]}`,
            buttonText: `Kup za ${data["price"]}`,
            message: res.nodes.thanks
        });
        this.setType("Buy");
        this.setParent(new ItemNode(data));
    }

    getView() {
        return {
            text: this.getMessage(),
            quick_replies: this.getQuickReplies()
        };
    }
}
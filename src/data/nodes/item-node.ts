import { AbstractNode } from "./abstract-node";
import * as res from "../../locales/resources.json";


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

    getMessage(): string {
        return `${super.getMessage()} - cena : ${this.price}`;
    }

    getView() {

        let message = {
            quick_replies: this.getQuickReplies(),
            attachment: this.getAttachment()
        };

        return message;
    }

    private getAttachment(): any {
        return {
            type: "template",
            payload: {
                template_type: "button",
                text: this.getMessage(),
                buttons: [
                    {
                        type: "web_url",
                        title: res.nodes.site,
                        url: this.url
                    }
                ]
            }
        }
    }
}
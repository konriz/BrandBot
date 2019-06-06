import { AbstractNode } from "./abstract-node";

export class ItemNode extends AbstractNode {

    private url: string;
    private price: string;

    constructor(name: string, buttonText:string, message: string, url: string, price: string)
    {
        super(name, buttonText, message);
        this.setType("Item");
        this.url = url;
        this.price = price;
    }

    getView() {

        let message = {
            text: this.getMessage(),
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
                        title: "Strona",
                        url: this.url
                    }
                ]
            }
        }
    }
}
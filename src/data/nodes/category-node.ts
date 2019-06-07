import { AbstractNode } from "./abstract-node";
import * as res from "../../locales/resources.json";


export class LinkNode extends AbstractNode {

    private url: string;

    constructor(data: any)
    {
        super(data);
        this.setType("Link");
        this.url = data["url"];
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
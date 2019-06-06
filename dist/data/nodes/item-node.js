"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_node_1 = require("./abstract-node");
class ItemNode extends abstract_node_1.AbstractNode {
    constructor(name, buttonText, message, url, price) {
        super(name, buttonText, message);
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
    getAttachment() {
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
        };
    }
}
exports.ItemNode = ItemNode;
//# sourceMappingURL=item-node.js.map
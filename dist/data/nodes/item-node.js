"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_node_1 = require("./abstract-node");
const res = __importStar(require("../../locales/resources.json"));
class ItemNode extends abstract_node_1.AbstractNode {
    constructor(data) {
        super(data);
        this.setType("Item");
        this.url = data["url"];
        this.price = data["price"];
    }
    getMessage() {
        return `${super.getMessage()} - cena : ${this.price}`;
    }
    getView() {
        let message = {
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
                        title: res.nodes.site,
                        url: this.url
                    }
                ]
            }
        };
    }
}
exports.ItemNode = ItemNode;
//# sourceMappingURL=item-node.js.map
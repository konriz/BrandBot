"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_node_1 = require("./abstract-node");
const message_builder_1 = require("../../services/message-builder");
class ItemNode extends abstract_node_1.AbstractNode {
    constructor(data) {
        super(data);
        this.setType("Item");
        this.url = data["url"];
        this.price = data["price"];
    }
    getPrice() {
        return this.price;
    }
    getMessage() {
        return `${super.getMessage()} - cena : ${this.price}`;
    }
    getView() {
        return message_builder_1.MessageBuilder.getItemReplyMessage(this.getMessage(), this.getQuickReplies(), this.url);
    }
}
exports.ItemNode = ItemNode;
//# sourceMappingURL=item-node.js.map
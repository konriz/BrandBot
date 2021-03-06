"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_node_1 = require("./abstract-node");
const message_builder_1 = require("../../services/message-builder");
const item_1 = require("../../item/item");
const order_nodes_1 = require("./order-nodes");
class ItemNode extends abstract_node_1.AbstractNode {
    constructor(data, parent) {
        super(data, parent);
        this.type = "Item";
        this._url = data["url"];
        this._price = data["price"];
        this._item = new item_1.Item(super.message, this._price, this._url);
        this.children = [new order_nodes_1.SendNode(this)];
    }
    get price() {
        return this._price;
    }
    get item() {
        return this._item;
    }
    getMessage() {
        return `${this.item.name} - cena : ${this.item.price}`;
    }
    getView() {
        return message_builder_1.MessageBuilder.getItemReplyMessage(this.getMessage(), this.getQuickReplies(), this._url);
    }
}
exports.ItemNode = ItemNode;
//# sourceMappingURL=item-node.js.map
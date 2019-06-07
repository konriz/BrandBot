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
const item_node_1 = require("./item-node");
const res = __importStar(require("../../locales/resources.json"));
const message_builder_1 = require("../../services/message-builder");
class BuyNode extends abstract_node_1.AbstractNode {
    constructor(data) {
        super({
            name: `BUY_${data["name"]}`,
            buttonText: `Kup za ${data["price"]}`,
            message: res.nodes.thanks
        });
        this.setType("Buy");
        this.setParent(new item_node_1.ItemNode(data));
    }
    getView() {
        return message_builder_1.MessageBuilder.getQuickReplyMessage(this.getMessage(), this.getQuickReplies());
    }
}
exports.BuyNode = BuyNode;
//# sourceMappingURL=buy-node.js.map
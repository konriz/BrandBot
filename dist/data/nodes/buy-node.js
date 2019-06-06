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
class BuyNode extends abstract_node_1.AbstractNode {
    constructor(item) {
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
exports.BuyNode = BuyNode;
//# sourceMappingURL=buy-node.js.map
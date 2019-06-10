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
const res = __importStar(require("../../resources/locales/resources.json"));
class BuyNode extends abstract_node_1.AbstractNode {
    constructor(data) {
        super({
            name: `BUY_${data["name"]}`,
            buttonText: `Kup za ${data["price"]}`,
            message: res.nodes.send
        });
        this.setType("Buy");
        this.setParent(new item_node_1.ItemNode(data));
        this.setChildren([new SendNode(this, data)]);
    }
}
exports.BuyNode = BuyNode;
class SendNode extends abstract_node_1.AbstractNode {
    constructor(parent, data) {
        super({
            name: `SEND_${data["name"]}`,
            buttonText: `Kurier (+15,00)`,
            message: res.nodes.pay
        });
        this.setType("Buy");
        this.setParent(parent);
        this.setChildren([new PayNode(this, data)]);
    }
}
class PayNode extends abstract_node_1.AbstractNode {
    constructor(parent, data) {
        super({
            name: `PAY_${data["name"]}`,
            buttonText: `Przelew (+0,00)`,
            message: res.nodes.address
        });
        this.setType("Buy");
        this.setParent(parent);
        this.setChildren([new AddressNode(this, data)]);
    }
}
class AddressNode extends abstract_node_1.AbstractNode {
    constructor(parent, data) {
        super({
            name: `ADDRESS_${data["name"]}`,
            buttonText: `Podano adres`,
            message: res.nodes.confirm
        });
        this.setType("Buy");
        this.setParent(parent);
        this.setChildren([new ConfirmNode(this, data)]);
    }
}
class ConfirmNode extends abstract_node_1.AbstractNode {
    constructor(parent, data) {
        super({
            name: `CONFIRM_${data["name"]}`,
            buttonText: `Zatwierdź`,
            message: res.nodes.thanks
        });
        this.setType("Buy");
        this.setParent(parent);
    }
}
//# sourceMappingURL=buy-node.js.map
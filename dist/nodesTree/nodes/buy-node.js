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
const res = __importStar(require("../../resources/locales/resources.json"));
const order_1 = require("../../order/order");
const delivery_1 = require("../../order/delivery");
const payment_1 = require("../../order/payment");
class OrderNode extends abstract_node_1.AbstractNode {
    constructor(parent, resources) {
        super({
            name: `${resources.prefix}_${parent.name}`,
            buttonText: resources.btn,
            message: resources.message
        });
        this._itemNode = parent;
        this.parent = parent;
    }
    get order() {
        return this._order;
    }
    set order(order) {
        this._order = order;
    }
    get itemNode() {
        return this._itemNode;
    }
}
class BuyNode extends OrderNode {
    constructor(parent) {
        super(parent, res.nodes.buy);
        this.parent = parent;
        this.type = "Buy";
        this.order = new order_1.Order(null, parent.item);
        this.children = [new SendNode(parent, this.order)];
    }
}
exports.BuyNode = BuyNode;
class SendNode extends OrderNode {
    constructor(parent, order) {
        super(parent, res.nodes.send);
        this.parent = parent;
        this.type = "Send";
        this.order = order;
        this.order.delivery = new delivery_1.Delivery("Kurier");
        this.children = [new PayNode(parent, this.order)];
    }
}
class PayNode extends OrderNode {
    constructor(parent, order) {
        super(parent, res.nodes.pay);
        this.parent = parent;
        this.type = "Pay";
        this.order = order;
        this.order.payment = new payment_1.Payment("Przelew");
        this.children = [new AddressNode(parent, this.order)];
    }
}
class AddressNode extends OrderNode {
    constructor(parent, order) {
        super(parent, res.nodes.pay);
        this.parent = parent;
        this.type = "Address";
        this.order = order;
        this.order.address = "New address";
        this.children = [new ConfirmNode(parent, this.order)];
    }
}
class ConfirmNode extends OrderNode {
    constructor(parent, order) {
        super(parent, res.nodes.pay);
        this.type = "Confirm";
        this.parent = parent;
        this.order = order;
        console.log(JSON.stringify(this.order));
    }
}
//# sourceMappingURL=buy-node.js.map
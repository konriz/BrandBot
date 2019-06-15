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
const order_1 = require("../../orders/order");
const res = __importStar(require("../../resources/locales/resources.json"));
const delivery_1 = require("../../orders/delivery");
const payment_1 = require("../../orders/payment");
class OrderNode extends abstract_node_1.AbstractNode {
    constructor(parent, resources) {
        super({
            name: `${resources.prefix}_${parent.name}`,
            buttonText: resources.btn,
            message: resources.message
        });
        this.parent = parent;
    }
}
class SendNode extends OrderNode {
    constructor(parent) {
        super(parent, {
            prefix: res.nodes.send.prefix,
            btn: `${res.nodes.buy.btn} : ${parent.item.price}`,
            message: `${res.nodes.send.message}`
        });
        this.parent = parent;
        this.type = "Send";
        this.children = [];
        delivery_1.Delivery.getDeliveries().forEach((delivery) => {
            this.children.push(new PayNode(this, parent, delivery));
        });
    }
}
exports.SendNode = SendNode;
class PayNode extends OrderNode {
    constructor(parent, itemNode, delivery) {
        super(itemNode, {
            prefix: `${res.nodes.pay.prefix}_${delivery.name}`,
            btn: `${delivery.string}`,
            message: `${res.nodes.pay.message}`
        });
        this.parent = parent;
        this.type = "Pay";
        this._delivery = delivery;
        this.children = [];
        payment_1.Payment.getPayments().forEach((payment) => {
            this.children.push(new ConfirmNode(this, itemNode, delivery, payment));
        });
    }
}
class ConfirmNode extends OrderNode {
    constructor(parent, itemNode, delivery, payment) {
        let order = new order_1.Order(null, itemNode.item);
        order.delivery = delivery;
        order.payment = payment;
        super(itemNode, {
            prefix: `${payment.name}_${delivery.name}`,
            btn: `${payment.string}`,
            message: order.getMessage()
        });
        this._order = order;
        this.parent = parent;
        this.type = "Confirm";
    }
    setUser(user) {
        super.setUser(user);
        this._order.user = user;
        this.message = this._order.getMessage();
        console.log(`Order node DEBUG: ${JSON.stringify(this._order)}`);
    }
}
//# sourceMappingURL=order-nodes.js.map
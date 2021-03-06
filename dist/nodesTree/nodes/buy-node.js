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
const order_1 = require("../../order/order");
const res = __importStar(require("../../resources/locales/resources.json"));
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
class SendNode extends OrderNode {
    constructor(parent) {
        super(parent, {
            prefix: res.nodes.send.prefix,
            btn: `${res.nodes.buy.btn} (${parent.item.price})`,
            message: `${res.nodes.send.message}`
        });
        this.parent = parent;
        this.type = "Send";
        this.order = new order_1.Order(null, parent.item);
        this._deliveries = delivery_1.Send.getDeliveries();
        this.children = [];
        this._deliveries.forEach((delivery) => {
            this.children.push(new PayNode(parent, this, delivery));
        });
    }
}
class PayNode extends OrderNode {
    constructor(item, parent, delivery) {
        super(item, {
            prefix: res.nodes.pay.prefix,
            btn: `${delivery.name} (${delivery.price})`,
            message: `${res.nodes.pay.message}`
        });
        this.parent = parent;
        this.type = "Pay";
        this.order = parent.order;
        this.order.delivery = delivery;
        this._payments = payment_1.Payment.getPayments();
        this.children = [];
        this._payments.forEach((payment) => {
            this.children.push(new ConfirmNode(item, this, payment));
        });
    }
}
class ConfirmNode extends OrderNode {
    constructor(item, parent, payment) {
        super(item, {
            prefix: res.nodes.pay.prefix,
            btn: `${payment.name} (${payment.price})`,
            message: `${res.nodes.pay.message}`
        });
        this.parent = parent;
        this.type = "Pay";
        this.order = parent.order;
        this.order.payment = payment;
        console.log(JSON.stringify(this.order));
    }
}
//# sourceMappingURL=buy-node.js.map